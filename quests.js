import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const DATA_DIR = path.join(ROOT, "data");
const QUESTS_PATH = path.join(DATA_DIR, "quests.json");

export const QUEST_LEVELS = ["D", "C", "B", "A", "S"];
const LEVEL_RANK = { D: 1, C: 2, B: 3, A: 4, S: 5 };

function safeId(id) {
  return typeof id === "string" && /^[a-f0-9-]{36}$/.test(id);
}

function normalizeLevel(level) {
  const value = String(level || "C").trim().toUpperCase();
  return QUEST_LEVELS.includes(value) ? value : "C";
}

function normalizeSubquests(input, existing = []) {
  const list = Array.isArray(input) ? input : [];
  return list.slice(0, 40).map((item, index) => {
    const prior = existing.find((entry) => entry.id && entry.id === item?.id);
    return {
      id: safeId(item?.id) ? item.id : prior?.id || crypto.randomUUID(),
      title: String(item?.title || "").trim().slice(0, 200) || `Subquest ${index + 1}`,
      description: String(item?.description || "").trim().slice(0, 1000),
      done: Boolean(item?.done),
    };
  });
}

function withProgress(quest) {
  const subs = Array.isArray(quest.subquests) ? quest.subquests : [];
  const total = subs.length;
  const completed = subs.filter((item) => item.done).length;
  const progress = total ? Math.round((completed / total) * 100) : quest.done ? 100 : 0;
  return { ...quest, subquestTotal: total, subquestDone: completed, progress };
}

async function readQuests() {
  try {
    const data = JSON.parse(await readFile(QUESTS_PATH, "utf8"));
    return Array.isArray(data.quests) ? data.quests : [];
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function writeQuests(quests) {
  await mkdir(DATA_DIR, { recursive: true });
  const temporary = `${QUESTS_PATH}.tmp`;
  await writeFile(temporary, JSON.stringify({ quests }, null, 2), "utf8");
  await rename(temporary, QUESTS_PATH);
}

export async function initializeQuests() {
  await mkdir(DATA_DIR, { recursive: true });
}

export async function listQuests() {
  const quests = await readQuests();
  return quests
    .map((quest) => withProgress({
      ...quest,
      level: normalizeLevel(quest.level),
      description: String(quest.description || ""),
      notes: String(quest.notes || ""),
      dueDate: quest.dueDate ? String(quest.dueDate).slice(0, 10) : "",
      subquests: Array.isArray(quest.subquests) ? quest.subquests : [],
    }))
    .sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1;
      const levelDiff = (LEVEL_RANK[b.level] || 0) - (LEVEL_RANK[a.level] || 0);
      if (levelDiff) return levelDiff;
      return String(b.updatedAt).localeCompare(String(a.updatedAt));
    });
}

export async function saveQuest(input) {
  const quests = await readQuests();
  const now = new Date().toISOString();
  const existing = input.id && safeId(input.id) ? quests.find((item) => item.id === input.id) : null;
  const subquests = normalizeSubquests(input.subquests, existing?.subquests || []);

  let done = Boolean(input.done);
  if (subquests.length > 0) {
    if (input.done === true) {
      for (const sub of subquests) sub.done = true;
      done = true;
    } else if (input.done === false) {
      done = false;
    } else {
      done = subquests.every((sub) => sub.done);
    }
  }

  const quest = {
    id: existing?.id || crypto.randomUUID(),
    title: String(input.title || "").trim().slice(0, 200) || "Untitled quest",
    description: String(input.description ?? existing?.description ?? "").trim().slice(0, 2000),
    notes: String(input.notes ?? existing?.notes ?? "").trim().slice(0, 2000),
    level: normalizeLevel(input.level ?? existing?.level),
    dueDate: String(input.dueDate ?? existing?.dueDate ?? "").trim().slice(0, 10),
    done,
    subquests,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };

  const next = existing
    ? quests.map((item) => (item.id === existing.id ? quest : item))
    : [...quests, quest];
  await writeQuests(next);
  return withProgress(quest);
}

export async function deleteQuest(id) {
  if (!safeId(id)) return false;
  const quests = await readQuests();
  const next = quests.filter((item) => item.id !== id);
  if (next.length === quests.length) return false;
  await writeQuests(next);
  return true;
}
