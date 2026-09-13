import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const DATA_DIR = path.join(ROOT, "data");

function safeId(id) {
  return typeof id === "string" && /^[a-f0-9-]{36}$/.test(id);
}

function createStore(filename, collectionKey, normalize) {
  const filePath = path.join(DATA_DIR, filename);

  async function readAll() {
    try {
      const data = JSON.parse(await readFile(filePath, "utf8"));
      return Array.isArray(data[collectionKey]) ? data[collectionKey] : [];
    } catch (error) {
      if (error.code === "ENOENT") return [];
      throw error;
    }
  }

  async function writeAll(items) {
    await mkdir(DATA_DIR, { recursive: true });
    const temporary = `${filePath}.tmp`;
    await writeFile(temporary, JSON.stringify({ [collectionKey]: items }, null, 2), "utf8");
    await rename(temporary, filePath);
  }

  return {
    async list() {
      const items = await readAll();
      return items.sort((a, b) => String(b.updatedAt || b.createdAt).localeCompare(String(a.updatedAt || a.createdAt)));
    },
    async save(input) {
      const items = await readAll();
      const now = new Date().toISOString();
      const existing = input.id && safeId(input.id) ? items.find((item) => item.id === input.id) : null;
      const item = normalize({
        ...input,
        id: existing?.id || crypto.randomUUID(),
        createdAt: existing?.createdAt || now,
        updatedAt: now,
      }, existing);
      const next = existing
        ? items.map((entry) => (entry.id === existing.id ? item : entry))
        : [...items, item];
      await writeAll(next);
      return item;
    },
    async remove(id) {
      if (!safeId(id)) return false;
      const items = await readAll();
      const next = items.filter((item) => item.id !== id);
      if (next.length === items.length) return false;
      await writeAll(next);
      return true;
    },
  };
}

export const bookmarks = createStore("bookmarks.json", "bookmarks", (input, existing) => {
  const ownerId = String(input.ownerId || existing?.ownerId || "").trim().slice(0, 64);
  return {
    id: input.id,
    ownerId: ownerId || null,
    title: String(input.title || "").trim().slice(0, 160) || "Untitled link",
    url: String(input.url || "").trim().slice(0, 800),
    tags: [...new Set((Array.isArray(input.tags) ? input.tags : String(input.tags || "").split(","))
      .map((tag) => String(tag).trim().toLowerCase()).filter(Boolean))].slice(0, 12),
    notes: String(input.notes || "").trim().slice(0, 1000),
    source: String(input.source || existing?.source || "app").trim().slice(0, 40) || "app",
    createdAt: input.createdAt,
    updatedAt: input.updatedAt,
  };
});

export function ownedVisibleToUser(item, userId) {
  if (!item) return false;
  if (!item.ownerId) return true;
  return item.ownerId === userId;
}

export function ownedByUser(item, userId) {
  if (!item || !userId) return false;
  if (!item.ownerId) return true;
  return item.ownerId === userId;
}

export function bookmarkVisibleToUser(item, userId) {
  return ownedVisibleToUser(item, userId);
}

export function bookmarkOwnedByUser(item, userId) {
  return ownedByUser(item, userId);
}

export const snippets = createStore("snippets.json", "snippets", (input) => ({
  id: input.id,
  title: String(input.title || "").trim().slice(0, 160) || "Untitled snippet",
  language: String(input.language || "text").trim().slice(0, 40) || "text",
  code: String(input.code || "").slice(0, 100000),
  tags: [...new Set((Array.isArray(input.tags) ? input.tags : String(input.tags || "").split(","))
    .map((tag) => String(tag).trim().toLowerCase()).filter(Boolean))].slice(0, 12),
  createdAt: input.createdAt,
  updatedAt: input.updatedAt,
}));

export const expenses = createStore("expenses.json", "expenses", (input, existing) => {
  const amount = Number(input.amount);
  const flow = String(input.flow || existing?.flow || "expense").toLowerCase() === "income" ? "income" : "expense";
  const ownerId = String(input.ownerId || existing?.ownerId || "").trim().slice(0, 64);
  const repeatRaw = String(input.repeat ?? existing?.repeat ?? "none").toLowerCase();
  const repeat = ["daily", "weekly", "monthly", "yearly"].includes(repeatRaw) ? repeatRaw : "none";
  const date = String(input.date || existing?.date || new Date().toISOString().slice(0, 10)).slice(0, 10);
  const nextDateRaw = String(input.nextDate ?? existing?.nextDate ?? "").slice(0, 10);
  const nextDate = repeat === "none"
    ? null
    : (/^\d{4}-\d{2}-\d{2}$/.test(nextDateRaw) ? nextDateRaw : advanceExpenseDate(date, repeat));
  const recurringParentId = String(input.recurringParentId || existing?.recurringParentId || "").trim().slice(0, 64);
  return {
    id: input.id,
    ownerId: ownerId || null,
    title: String(input.title || "").trim().slice(0, 160) || (flow === "income" ? "Income" : "Expense"),
    amount: Number.isFinite(amount) ? Math.abs(Math.round(amount * 100) / 100) : 0,
    flow,
    category: String(input.category || (flow === "income" ? "bounty" : "other")).trim().slice(0, 40) || "other",
    date,
    note: String(input.note || "").trim().slice(0, 500),
    source: String(input.source || existing?.source || "app").trim().slice(0, 40) || "app",
    repeat,
    nextDate,
    recurringParentId: recurringParentId || null,
    createdAt: input.createdAt,
    updatedAt: input.updatedAt,
  };
});

export function advanceExpenseDate(iso, repeat) {
  const date = new Date(`${String(iso).slice(0, 10)}T12:00:00`);
  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString().slice(0, 10);
  }
  if (repeat === "daily") date.setDate(date.getDate() + 1);
  else if (repeat === "weekly") date.setDate(date.getDate() + 7);
  else if (repeat === "monthly") date.setMonth(date.getMonth() + 1);
  else if (repeat === "yearly") date.setFullYear(date.getFullYear() + 1);
  else return String(iso).slice(0, 10);
  return date.toISOString().slice(0, 10);
}

/** Create due recurring expense/income rows for a user (or all users). */
export async function materializeRecurringExpenses(userId = null) {
  const today = new Date().toISOString().slice(0, 10);
  const items = await expenses.list();
  const templates = items.filter((item) => {
    if (!item || item.repeat === "none" || !item.nextDate) return false;
    if (userId && item.ownerId && item.ownerId !== userId) return false;
    return String(item.nextDate) <= today;
  });

  let created = 0;
  for (const template of templates) {
    let nextDate = String(template.nextDate);
    let guard = 0;
    let latest = template;
    while (nextDate <= today && guard < 36) {
      guard += 1;
      const already = items.some(
        (item) =>
          (item.recurringParentId === template.id && item.date === nextDate) ||
          (item.id === template.id && item.date === nextDate),
      );
      if (!already) {
        const child = await expenses.save({
          ownerId: template.ownerId,
          title: template.title,
          amount: template.amount,
          flow: template.flow,
          category: template.category,
          date: nextDate,
          note: template.note,
          source: "recurring",
          repeat: "none",
          nextDate: null,
          recurringParentId: template.id,
        });
        items.push(child);
        created += 1;
      }
      nextDate = advanceExpenseDate(nextDate, template.repeat);
      latest = await expenses.save({
        ...latest,
        id: template.id,
        ownerId: template.ownerId,
        title: template.title,
        amount: template.amount,
        flow: template.flow,
        category: template.category,
        date: template.date,
        note: template.note,
        source: template.source,
        repeat: template.repeat,
        nextDate,
        recurringParentId: null,
      });
    }
  }
  return created;
}

export const focusSessions = createStore("focus.json", "sessions", (input) => ({
  id: input.id,
  kind: String(input.kind || "focus").slice(0, 20),
  minutes: Math.min(180, Math.max(1, Number(input.minutes) || 25)),
  label: String(input.label || "Focus voyage").trim().slice(0, 120),
  completedAt: String(input.completedAt || input.updatedAt),
  createdAt: input.createdAt,
  updatedAt: input.updatedAt,
}));

function parseDueAt(value, fallback) {
  const raw = String(value || fallback || "").trim();
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) {
    return new Date(Date.now() + 60 * 60 * 1000).toISOString();
  }
  return date.toISOString();
}

export const signals = createStore("signals.json", "signals", (input, existing) => {
  const kind = String(input.kind || existing?.kind || "reminder").toLowerCase() === "alarm" ? "alarm" : "reminder";
  const repeatRaw = String(input.repeat || existing?.repeat || "none").toLowerCase();
  const repeat = ["daily", "weekly"].includes(repeatRaw) ? repeatRaw : "none";
  const statusRaw = String(input.status || existing?.status || "scheduled").toLowerCase();
  const status = ["scheduled", "fired", "snoozed", "done"].includes(statusRaw) ? statusRaw : "scheduled";
  const snooze = Math.min(60, Math.max(1, Number(input.snoozeMinutes) || existing?.snoozeMinutes || 5));
  const ownerId = String(input.ownerId || existing?.ownerId || "").trim().slice(0, 64);
  return {
    id: input.id,
    ownerId: ownerId || null,
    kind,
    title: String(input.title || "").trim().slice(0, 160) || (kind === "alarm" ? "Ship alarm" : "Reminder"),
    note: String(input.note || "").trim().slice(0, 500),
    dueAt: parseDueAt(input.dueAt, existing?.dueAt),
    enabled: input.enabled === undefined ? (existing?.enabled ?? true) : Boolean(input.enabled),
    repeat,
    status,
    sound: input.sound === undefined ? (existing?.sound ?? kind === "alarm") : Boolean(input.sound),
    snoozeMinutes: snooze,
    lastFiredAt: input.lastFiredAt || existing?.lastFiredAt || null,
    source: String(input.source || existing?.source || "app").trim().slice(0, 40) || "app",
    createdAt: input.createdAt,
    updatedAt: input.updatedAt,
  };
});

export async function initializeToolkit() {
  await mkdir(DATA_DIR, { recursive: true });
}

export async function toolkitStats() {
  await materializeRecurringExpenses();
  const [bookmarkItems, snippetItems, expenseItems, focusItems, signalItems] = await Promise.all([
    bookmarks.list(),
    snippets.list(),
    expenses.list(),
    focusSessions.list(),
    signals.list(),
  ]);
  const month = new Date().toISOString().slice(0, 7);
  const monthItems = expenseItems.filter((item) => String(item.date).startsWith(month));
  const monthIncome = monthItems
    .filter((item) => item.flow === "income")
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const monthSpend = monthItems
    .filter((item) => item.flow !== "income")
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const focusMinutes = focusItems.reduce((sum, item) => sum + Number(item.minutes || 0), 0);
  const upcoming = signalItems.filter((item) => item.enabled && item.status === "scheduled").length;
  return {
    bookmarks: bookmarkItems.length,
    snippets: snippetItems.length,
    expenses: expenseItems.length,
    monthSpend: Math.round(monthSpend * 100) / 100,
    monthIncome: Math.round(monthIncome * 100) / 100,
    monthBalance: Math.round((monthIncome - monthSpend) * 100) / 100,
    focusMinutes,
    focusSessions: focusItems.length,
    signals: signalItems.length,
    signalsUpcoming: upcoming,
  };
}
