import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import {
  authenticateUser,
  createApiToken,
  getUserByApiToken,
  getUserById,
  initializeAuth,
  registerUser,
  revokeApiTokens,
} from "./auth.js";
import { loadEnv } from "./env.js";
import {
  addFriend,
  claimChallenge,
  getProfile,
  getPublicCard,
  initializeProfile,
  regenerateShareId,
  removeFriend,
  searchCaptains,
  updateProfile,
} from "./profile.js";
import { deleteQuest, initializeQuests, listQuests, saveQuest } from "./quests.js";
import { deleteNote, getNote, initializeStorage, listNotes, noteOwnedByUser, noteVisibleToUser, saveNote } from "./storage.js";
import {
  advanceExpenseDate,
  bookmarkOwnedByUser,
  bookmarks,
  bookmarkVisibleToUser,
  expenses,
  focusSessions,
  initializeToolkit,
  materializeRecurringExpenses,
  ownedByUser,
  ownedVisibleToUser,
  signals,
  snippets,
  toolkitStats,
} from "./toolkit.js";
import {
  deleteVaultEntry,
  generatePassword,
  getVaultEntry,
  initializeVault,
  listVaultEntries,
  saveVaultEntry,
} from "./vault.js";

loadEnv();

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(rootDir, "public");
const app = express();
const port = Number(process.env.PORT || 4173);
const vaultPassword = process.env.NOTES_PASSWORD || "";
const sessionSecret = process.env.SESSION_SECRET || crypto.randomBytes(32).toString("hex");
const appPublicUrl = String(process.env.APP_PUBLIC_URL || `http://localhost:${port}`).replace(/\/$/, "");
const isProd = process.env.NODE_ENV === "production" || appPublicUrl.startsWith("https://");

// Required behind Caddy / nginx so secure cookies and client IPs work.
app.set("trust proxy", 1);

app.use(express.json({ limit: "2mb" }));

app.use((request, response, next) => {
  const origin = request.headers.origin || "*";
  // Extension popups (moz-extension://…) need an explicit ACAO echo; never pair * with credentials.
  response.setHeader("Access-Control-Allow-Origin", origin === "null" ? "*" : origin);
  response.setHeader("Vary", "Origin");
  response.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  if (request.method === "OPTIONS") return response.status(204).end();
  next();
});

function parseCookies(request) {
  return Object.fromEntries((request.headers.cookie || "").split(";").filter(Boolean).map((part) => {
    const [name, ...value] = part.trim().split("=");
    return [name, decodeURIComponent(value.join("="))];
  }));
}

function cookieOptions(maxAge = 30 * 24 * 60 * 60 * 1000) {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    maxAge,
    path: "/",
  };
}

function signSession(userId) {
  const stamp = String(Date.now());
  const payload = `${userId}.${stamp}`;
  const signature = crypto.createHmac("sha256", sessionSecret).update(payload).digest("hex");
  return `${payload}.${signature}`;
}

function readSessionUserId(request) {
  const raw = parseCookies(request).notes_session || "";
  const parts = raw.split(".");
  if (parts.length !== 3) return null;
  const [userId, stamp, signature] = parts;
  const payload = `${userId}.${stamp}`;
  const expected = crypto.createHmac("sha256", sessionSecret).update(payload).digest("hex");
  try {
    const left = Buffer.from(signature);
    const right = Buffer.from(expected);
    if (left.length !== right.length || !crypto.timingSafeEqual(left, right)) return null;
  } catch {
    return null;
  }
  return userId || null;
}

function readBearerToken(request) {
  const header = String(request.headers.authorization || "");
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : "";
}

async function currentUser(request) {
  const bearer = readBearerToken(request);
  if (bearer) return getUserByApiToken(bearer);
  const userId = readSessionUserId(request);
  if (!userId) return null;
  return getUserById(userId);
}

function setSessionCookie(response, userId) {
  response.cookie("notes_session", signSession(userId), cookieOptions());
}

function clearSessionCookie(response) {
  response.clearCookie("notes_session", cookieOptions(0));
}

async function requireAuth(request, response, next) {
  const user = await currentUser(request);
  if (!user) return response.status(401).json({ error: "Locked" });
  request.user = user;
  next();
}

function renderMarkdown(markdown) {
  return sanitizeHtml(marked.parse(String(markdown || "")), {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2", "iframe"]),
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title"],
      code: ["class"],
      pre: ["class"],
      iframe: ["src", "width", "height", "title", "frameborder", "allow", "allowfullscreen", "referrerpolicy"],
      "*": ["class"],
    },
    allowedIframeHostnames: ["www.youtube.com", "youtube.com", "www.youtube-nocookie.com"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer", target: "_blank" }),
    },
  });
}

function mountCrud(basePath, store) {
  app.use(basePath, requireAuth);
  app.get(basePath, async (_request, response, next) => {
    try { response.json(await store.list()); }
    catch (error) { next(error); }
  });
  app.post(basePath, async (request, response, next) => {
    try { response.status(201).json(await store.save(request.body)); }
    catch (error) { next(error); }
  });
  app.put(`${basePath}/:id`, async (request, response, next) => {
    try { response.json(await store.save({ ...request.body, id: request.params.id })); }
    catch (error) { next(error); }
  });
  app.delete(`${basePath}/:id`, async (request, response, next) => {
    try {
      if (!(await store.remove(request.params.id))) {
        return response.status(404).json({ error: "Not found" });
      }
      response.status(204).end();
    } catch (error) { next(error); }
  });
}

app.post("/api/auth/register", async (request, response, next) => {
  try {
    const user = await registerUser(request.body || {});
    setSessionCookie(response, user.id);
    response.status(201).json({ ok: true, user });
  } catch (error) {
    if (error.status) return response.status(error.status).json({ error: error.message });
    next(error);
  }
});

app.post("/api/auth/login", async (request, response, next) => {
  try {
    const user = await authenticateUser(request.body?.username, request.body?.password);
    const wantsToken = ["extension", "mobile", "api"].includes(String(request.body?.client || "").toLowerCase())
      || ["extension", "mobile", "api"].includes(String(request.headers["x-glt-client"] || "").toLowerCase());
    if (wantsToken) {
      const issued = await createApiToken(user.id, "extension");
      return response.json({
        ok: true,
        token: issued.token,
        user: issued.user,
        appUrl: appPublicUrl,
      });
    }
    setSessionCookie(response, user.id);
    response.json({ ok: true, user });
  } catch (error) {
    if (error.status) return response.status(error.status).json({ error: error.message });
    next(error);
  }
});

app.post("/api/auth/logout", (_request, response) => {
  clearSessionCookie(response);
  response.json({ ok: true });
});

/** Legacy unlock alias — username + password only (no demo shortcuts). */
app.post("/api/unlock", async (request, response, next) => {
  try {
    const user = await authenticateUser(request.body?.username, request.body?.password);
    setSessionCookie(response, user.id);
    response.json({ ok: true, user });
  } catch (error) {
    if (error.status) return response.status(error.status).json({ error: error.message });
    next(error);
  }
});

app.get("/api/health", (_request, response) => {
  response.json({
    ok: true,
    service: "grand-line-tools",
    publicUrl: appPublicUrl,
  });
});

app.get("/api/session", async (request, response, next) => {
  try {
    const user = await currentUser(request);
    response.json({
      authenticated: Boolean(user),
      unlocked: Boolean(user),
      user,
      appUrl: appPublicUrl,
    });
  } catch (error) { next(error); }
});

/** Extension / API client login — returns a bearer token bound to the user id. */
app.post("/api/auth/extension/login", async (request, response, next) => {
  try {
    const user = await authenticateUser(request.body?.username, request.body?.password);
    const issued = await createApiToken(user.id, "extension");
    response.json({
      ok: true,
      token: issued.token,
      user: issued.user,
      appUrl: appPublicUrl,
    });
  } catch (error) {
    if (error.status) return response.status(error.status).json({ error: error.message });
    next(error);
  }
});

app.post("/api/auth/token", async (request, response, next) => {
  try {
    const user = await authenticateUser(request.body?.username, request.body?.password);
    const issued = await createApiToken(user.id, "extension");
    response.json({
      ok: true,
      token: issued.token,
      user: issued.user,
      appUrl: appPublicUrl,
    });
  } catch (error) {
    if (error.status) return response.status(error.status).json({ error: error.message });
    next(error);
  }
});

app.post("/api/auth/extension/logout", requireAuth, async (request, response, next) => {
  try {
    await revokeApiTokens(request.user.id);
    response.json({ ok: true });
  } catch (error) { next(error); }
});

app.post("/api/lock", (_request, response) => {
  clearSessionCookie(response);
  response.json({ ok: true });
});

app.get("/api/stats", requireAuth, async (_request, response, next) => {
  try {
    const [notes, vault, quests, toolkit] = await Promise.all([
      listNotes(),
      listVaultEntries(vaultPassword),
      listQuests(),
      toolkitStats(),
    ]);
    response.json({
      notes: notes.length,
      vault: vault.length,
      quests: quests.length,
      questsOpen: quests.filter((quest) => !quest.done).length,
      ...toolkit,
    });
  } catch (error) { next(error); }
});

app.get("/api/search", requireAuth, async (request, response, next) => {
  try {
    const q = String(request.query.q || "").trim().toLowerCase();
    if (!q) return response.json([]);
    const [notes, vault, questItems, bookmarkItems, snippetItems, expenseItems, signalItems] = await Promise.all([
      listNotes({ ownerId: request.user.id }),
      listVaultEntries(vaultPassword),
      listQuests(),
      bookmarks.list(),
      snippets.list(),
      expenses.list(),
      signals.list(),
    ]);
    const hit = (text) => String(text || "").toLowerCase().includes(q);
    const results = [
      ...notes.filter((n) => hit(n.title) || hit(n.content) || n.tags?.some(hit)).slice(0, 8).map((n) => ({
        type: "notes", id: n.id, title: n.title, subtitle: "Logbook",
      })),
      ...vault.filter((v) => hit(v.title) || hit(v.username) || hit(v.url)).slice(0, 6).map((v) => ({
        type: "vault", id: v.id, title: v.title, subtitle: v.username || "Treasure vault",
      })),
      ...questItems.filter((item) => hit(item.title) || hit(item.description) || hit(item.notes) || item.subquests?.some((sub) => hit(sub.title) || hit(sub.description))).slice(0, 6).map((item) => ({
        type: "quests", id: item.id, title: item.title, subtitle: item.done ? `Done · Rank ${item.level || "C"}` : `Open · Rank ${item.level || "C"}`,
      })),
      ...bookmarkItems
        .filter((item) => bookmarkVisibleToUser(item, request.user.id))
        .filter((item) => hit(item.title) || hit(item.url) || item.tags?.some(hit)).slice(0, 6).map((item) => ({
        type: "charts", id: item.id, title: item.title, subtitle: item.url,
      })),
      ...snippetItems.filter((item) => hit(item.title) || hit(item.code) || item.tags?.some(hit)).slice(0, 6).map((item) => ({
        type: "snippets", id: item.id, title: item.title, subtitle: item.language,
      })),
      ...expenseItems
        .filter((item) => ownedVisibleToUser(item, request.user.id))
        .filter((item) => hit(item.title) || hit(item.category) || hit(item.note) || hit(item.flow)).slice(0, 6).map((item) => ({
        type: "berries", id: item.id, title: item.title, subtitle: `${item.flow === "income" ? "+" : "−"}${item.amount} · ${item.category}`,
      })),
      ...signalItems
        .filter((item) => ownedVisibleToUser(item, request.user.id))
        .filter((item) => hit(item.title) || hit(item.note) || hit(item.kind)).slice(0, 6).map((item) => ({
        type: "watchtower", id: item.id, title: item.title, subtitle: `${item.kind} · ${item.status}`,
      })),
    ];
    response.json(results.slice(0, 24));
  } catch (error) { next(error); }
});

app.use("/api/notes", requireAuth);

app.get("/api/notes", async (request, response, next) => {
  try {
    const notes = await listNotes({
      query: request.query.q,
      tag: request.query.tag,
      ownerId: request.user.id,
    });
    response.json(notes);
  } catch (error) { next(error); }
});

app.get("/api/notes/:id", async (request, response, next) => {
  try {
    const note = await getNote(request.params.id);
    if (!note || !noteVisibleToUser(note, request.user.id)) {
      return response.status(404).json({ error: "Note not found" });
    }
    response.json(note);
  } catch (error) { next(error); }
});

app.post("/api/notes", async (request, response, next) => {
  try {
    response.status(201).json(await saveNote({ ...request.body, ownerId: request.user.id }));
  } catch (error) { next(error); }
});

app.put("/api/notes/:id", async (request, response, next) => {
  try {
    const existing = await getNote(request.params.id);
    if (!existing || !noteOwnedByUser(existing, request.user.id)) {
      return response.status(404).json({ error: "Note not found" });
    }
    response.json(await saveNote({
      ...request.body,
      id: request.params.id,
      ownerId: existing.ownerId || request.user.id,
    }));
  } catch (error) { next(error); }
});

app.delete("/api/notes/:id", async (request, response, next) => {
  try {
    const existing = await getNote(request.params.id);
    if (!existing || !noteOwnedByUser(existing, request.user.id)) {
      return response.status(404).json({ error: "Note not found" });
    }
    if (!(await deleteNote(request.params.id))) {
      return response.status(404).json({ error: "Note not found" });
    }
    response.status(204).end();
  } catch (error) { next(error); }
});

app.post("/api/preview", requireAuth, (request, response) => {
  response.json({ html: renderMarkdown(request.body.markdown) });
});

app.use("/api/vault", requireAuth);

app.get("/api/vault", async (_request, response, next) => {
  try { response.json(await listVaultEntries(vaultPassword)); }
  catch (error) { next(error); }
});

app.post("/api/vault/generate", (request, response) => {
  response.json({ password: generatePassword(request.body?.length) });
});

app.get("/api/vault/:id", async (request, response, next) => {
  try {
    const entry = await getVaultEntry(vaultPassword, request.params.id);
    if (!entry) return response.status(404).json({ error: "Entry not found" });
    response.json(entry);
  } catch (error) { next(error); }
});

app.post("/api/vault", async (request, response, next) => {
  try { response.status(201).json(await saveVaultEntry(vaultPassword, request.body)); }
  catch (error) { next(error); }
});

app.put("/api/vault/:id", async (request, response, next) => {
  try {
    if (!(await getVaultEntry(vaultPassword, request.params.id))) {
      return response.status(404).json({ error: "Entry not found" });
    }
    response.json(await saveVaultEntry(vaultPassword, { ...request.body, id: request.params.id }));
  } catch (error) { next(error); }
});

app.delete("/api/vault/:id", async (request, response, next) => {
  try {
    if (!(await deleteVaultEntry(vaultPassword, request.params.id))) {
      return response.status(404).json({ error: "Entry not found" });
    }
    response.status(204).end();
  } catch (error) { next(error); }
});

app.use("/api/quests", requireAuth);

app.get("/api/quests", async (_request, response, next) => {
  try { response.json(await listQuests()); }
  catch (error) { next(error); }
});

app.post("/api/quests", async (request, response, next) => {
  try { response.status(201).json(await saveQuest(request.body)); }
  catch (error) { next(error); }
});

app.put("/api/quests/:id", async (request, response, next) => {
  try {
    response.json(await saveQuest({ ...request.body, id: request.params.id }));
  } catch (error) { next(error); }
});

app.delete("/api/quests/:id", async (request, response, next) => {
  try {
    if (!(await deleteQuest(request.params.id))) {
      return response.status(404).json({ error: "Quest not found" });
    }
    response.status(204).end();
  } catch (error) { next(error); }
});

app.use("/api/bookmarks", requireAuth);

app.get("/api/bookmarks", async (request, response, next) => {
  try {
    const items = await bookmarks.list();
    response.json(items.filter((item) => bookmarkVisibleToUser(item, request.user.id)));
  } catch (error) { next(error); }
});

app.post("/api/bookmarks", async (request, response, next) => {
  try {
    const body = request.body || {};
    const saved = await bookmarks.save({
      ...body,
      ownerId: request.user.id,
      source: body.source || "app",
    });
    response.status(201).json(saved);
  } catch (error) { next(error); }
});

app.put("/api/bookmarks/:id", async (request, response, next) => {
  try {
    const existing = (await bookmarks.list()).find((item) => item.id === request.params.id);
    if (!existing || !bookmarkOwnedByUser(existing, request.user.id)) {
      return response.status(404).json({ error: "Not found" });
    }
    response.json(await bookmarks.save({
      ...request.body,
      id: request.params.id,
      ownerId: existing.ownerId || request.user.id,
    }));
  } catch (error) { next(error); }
});

app.delete("/api/bookmarks/:id", async (request, response, next) => {
  try {
    const existing = (await bookmarks.list()).find((item) => item.id === request.params.id);
    if (!existing || !bookmarkOwnedByUser(existing, request.user.id)) {
      return response.status(404).json({ error: "Not found" });
    }
    if (!(await bookmarks.remove(request.params.id))) {
      return response.status(404).json({ error: "Not found" });
    }
    response.status(204).end();
  } catch (error) { next(error); }
});

mountCrud("/api/snippets", snippets);
mountCrud("/api/focus", focusSessions);

function mountOwnedCrud(basePath, store, { defaultSource = "app", beforeList = null, recurring = false } = {}) {
  app.use(basePath, requireAuth);
  app.get(basePath, async (request, response, next) => {
    try {
      if (beforeList) await beforeList(request.user.id);
      const items = await store.list();
      response.json(items.filter((item) => ownedVisibleToUser(item, request.user.id)));
    } catch (error) { next(error); }
  });
  app.post(basePath, async (request, response, next) => {
    try {
      const body = request.body || {};
      const payload = {
        ...body,
        ownerId: request.user.id,
        source: body.source || defaultSource,
      };
      if (recurring) {
        const repeat = String(body.repeat || "none").toLowerCase();
        const date = String(body.date || new Date().toISOString().slice(0, 10)).slice(0, 10);
        if (["daily", "weekly", "monthly", "yearly"].includes(repeat) && !body.nextDate) {
          payload.nextDate = advanceExpenseDate(date, repeat);
        }
        if (repeat === "none") payload.nextDate = null;
      }
      response.status(201).json(await store.save(payload));
    } catch (error) { next(error); }
  });
  app.put(`${basePath}/:id`, async (request, response, next) => {
    try {
      const existing = (await store.list()).find((item) => item.id === request.params.id);
      if (!existing || !ownedByUser(existing, request.user.id)) {
        return response.status(404).json({ error: "Not found" });
      }
      const body = request.body || {};
      const payload = {
        ...body,
        id: request.params.id,
        ownerId: existing.ownerId || request.user.id,
      };
      if (recurring) {
        const repeat = String(body.repeat ?? existing.repeat ?? "none").toLowerCase();
        if (["daily", "weekly", "monthly", "yearly"].includes(repeat) && body.nextDate == null && !existing.nextDate) {
          const date = String(body.date || existing.date || new Date().toISOString().slice(0, 10)).slice(0, 10);
          payload.nextDate = advanceExpenseDate(date, repeat);
        }
        if (repeat === "none") payload.nextDate = null;
      }
      response.json(await store.save(payload));
    } catch (error) { next(error); }
  });
  app.delete(`${basePath}/:id`, async (request, response, next) => {
    try {
      const existing = (await store.list()).find((item) => item.id === request.params.id);
      if (!existing || !ownedByUser(existing, request.user.id)) {
        return response.status(404).json({ error: "Not found" });
      }
      if (!(await store.remove(request.params.id))) {
        return response.status(404).json({ error: "Not found" });
      }
      response.status(204).end();
    } catch (error) { next(error); }
  });
}

mountOwnedCrud("/api/expenses", expenses, {
  recurring: true,
  beforeList: async (userId) => {
    await materializeRecurringExpenses(userId);
  },
});
mountOwnedCrud("/api/signals", signals);

app.use("/api/profile", requireAuth);

app.get("/api/profile", async (request, response, next) => {
  try { response.json(await getProfile(request.user.id)); }
  catch (error) { next(error); }
});

app.put("/api/profile", async (request, response, next) => {
  try { response.json(await updateProfile(request.user.id, request.body || {})); }
  catch (error) { next(error); }
});

app.post("/api/profile/share-id", async (request, response, next) => {
  try { response.json(await regenerateShareId(request.user.id)); }
  catch (error) {
    if (error.status) return response.status(error.status).json({ error: error.message });
    next(error);
  }
});

app.post("/api/profile/friends", async (request, response, next) => {
  try { response.status(201).json(await addFriend(request.user.id, request.body || {})); }
  catch (error) {
    if (error.status) return response.status(error.status).json({ error: error.message });
    next(error);
  }
});

app.delete("/api/profile/friends/:id", async (request, response, next) => {
  try {
    const profile = await removeFriend(request.user.id, request.params.id);
    if (!profile) return response.status(404).json({ error: "Friend not found" });
    response.json(profile);
  } catch (error) { next(error); }
});

app.post("/api/profile/challenges/:key/claim", async (request, response, next) => {
  try { response.json(await claimChallenge(request.user.id, request.params.key)); }
  catch (error) {
    if (error.status) return response.status(error.status).json({ error: error.message });
    next(error);
  }
});

app.get("/api/profile/discover", async (request, response, next) => {
  try {
    const query = String(request.query.q || "").trim();
    const mine = await getProfile(request.user.id);
    const captains = await searchCaptains(query, {
      excludeShareId: mine.shareId,
      limit: Math.min(Number(request.query.limit) || 24, 48),
    });
    response.json({ captains });
  } catch (error) { next(error); }
});

app.get("/api/captains/:shareId", async (request, response, next) => {
  try {
    const card = await getPublicCard(request.params.shareId);
    if (!card) return response.status(404).json({ error: "Captain not found on this ship" });
    response.json(card);
  } catch (error) { next(error); }
});

app.get("/login", async (request, response) => {
  if (await currentUser(request)) return response.redirect("/app");
  response.sendFile(path.join(publicDir, "login.html"));
});

app.get("/app", async (request, response) => {
  if (!(await currentUser(request))) return response.redirect("/login");
  response.sendFile(path.join(publicDir, "index.html"));
});

app.get("/", async (request, response) => {
  if (await currentUser(request)) return response.redirect("/app");
  response.sendFile(path.join(publicDir, "landing.html"));
});

app.use(express.static(publicDir, { index: false }));

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(error.status || 500).json({ error: error.message || "Something went wrong" });
});

await Promise.all([
  initializeAuth(),
  initializeStorage(),
  initializeVault(),
  initializeQuests(),
  initializeToolkit(),
  initializeProfile(),
]);
app.listen(port, "0.0.0.0", () => {
  console.log(`Grand Line Tools is running at http://0.0.0.0:${port}`);
  console.log(`Landing at ${appPublicUrl}/`);
  console.log(`Login at ${appPublicUrl}/login`);
  console.log(`App at ${appPublicUrl}/app`);
  console.log(`Public URL: ${appPublicUrl}`);
  console.log(`Vault key (NOTES_PASSWORD): ${vaultPassword ? "set" : "missing — set NOTES_PASSWORD"}`);
  if (process.env.ALLOW_DEMO_USER === "true") {
    console.log("Demo user seeding enabled (ALLOW_DEMO_USER=true)");
  }
});
