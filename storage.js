import { DatabaseSync } from "node:sqlite";
import { mkdir, readFile, readdir, rename, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const NOTES_DIR = path.join(ROOT, "notes");
const DATA_DIR = path.join(ROOT, "data");
const DB_PATH = path.join(DATA_DIR, "search.sqlite");

let database;

// Convert a title into a readable filename and add an ID so names never collide.
function noteFilename(title, id) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50) || "untitled";
  return `${slug}-${id}.md`;
}

function safeId(id) {
  return typeof id === "string" && /^[a-f0-9-]{36}$/.test(id);
}

function readNoteFile(text, filename, modified) {
  const parsed = matter(text);
  const filenameId = filename.match(/([a-f0-9-]{36})\.md$/)?.[1];
  const ownerId = String(parsed.data.ownerId || "").trim().slice(0, 64) || null;
  return {
    id: String(parsed.data.id || filenameId || ""),
    ownerId,
    title: String(parsed.data.title || "Untitled"),
    tags: Array.isArray(parsed.data.tags) ? parsed.data.tags.map(String) : [],
    createdAt: String(parsed.data.createdAt || modified),
    updatedAt: String(parsed.data.updatedAt || modified),
    content: parsed.content.replace(/^\n/, ""),
    filename,
  };
}

export function noteVisibleToUser(note, userId) {
  if (!note) return false;
  if (!note.ownerId) return true;
  return note.ownerId === userId;
}

export function noteOwnedByUser(note, userId) {
  if (!note || !userId) return false;
  if (!note.ownerId) return true;
  return note.ownerId === userId;
}

async function loadFiles() {
  const filenames = (await readdir(NOTES_DIR)).filter((name) => name.endsWith(".md"));
  return Promise.all(filenames.map(async (filename) => {
    const filePath = path.join(NOTES_DIR, filename);
    const [text, details] = await Promise.all([readFile(filePath, "utf8"), stat(filePath)]);
    return readNoteFile(text, filename, details.mtime.toISOString());
  }));
}

function indexNote(note) {
  database.prepare("DELETE FROM notes_fts WHERE id = ?").run(note.id);
  database.prepare(
    "INSERT INTO notes_fts (id, title, content, tags) VALUES (?, ?, ?, ?)",
  ).run(note.id, note.title, note.content, note.tags.join(" "));
}

export async function initializeStorage() {
  await Promise.all([mkdir(NOTES_DIR, { recursive: true }), mkdir(DATA_DIR, { recursive: true })]);
  database = new DatabaseSync(DB_PATH);
  database.exec(`
    CREATE VIRTUAL TABLE IF NOT EXISTS notes_fts USING fts5(
      id UNINDEXED,
      title,
      content,
      tags,
      tokenize = 'unicode61'
    );
  `);

  // The files are the source of truth, so rebuilding this small index is safe.
  database.exec("DELETE FROM notes_fts");
  const notes = await loadFiles();
  for (const note of notes) indexNote(note);
}

export async function listNotes({ query = "", tag = "", ownerId = null } = {}) {
  let notes = await loadFiles();

  if (ownerId) {
    notes = notes.filter((note) => noteVisibleToUser(note, ownerId));
  }

  if (query.trim()) {
    // Search each word safely and allow partial matches, such as "meet" for "meeting".
    const words = query.trim().match(/[\p{L}\p{N}_]+/gu) || [];
    if (!words.length) return [];
    const ftsQuery = words.map((word) => `"${word.replaceAll('"', '""')}"*`).join(" AND ");
    const rows = database.prepare(
      "SELECT id FROM notes_fts WHERE notes_fts MATCH ? ORDER BY rank",
    ).all(ftsQuery);
    const rank = new Map(rows.map((row, index) => [row.id, index]));
    notes = notes.filter((note) => rank.has(note.id));
    notes.sort((a, b) => rank.get(a.id) - rank.get(b.id));
  } else {
    notes.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  if (tag) notes = notes.filter((note) => note.tags.includes(tag));
  return notes;
}

export async function getNote(id) {
  if (!safeId(id)) return null;
  return (await loadFiles()).find((note) => note.id === id) || null;
}

export async function saveNote(input) {
  const existing = input.id ? await getNote(input.id) : null;
  const now = new Date().toISOString();
  const id = existing?.id || crypto.randomUUID();
  const ownerId = String(input.ownerId || existing?.ownerId || "").trim().slice(0, 64) || null;
  const note = {
    id,
    ownerId,
    title: String(input.title || "Untitled").trim().slice(0, 200) || "Untitled",
    tags: [...new Set((input.tags || []).map((tag) => String(tag).trim().toLowerCase()).filter(Boolean))],
    createdAt: existing?.createdAt || now,
    updatedAt: now,
    content: String(input.content || ""),
  };

  const filename = noteFilename(note.title, id);
  const frontmatter = {
    id: note.id,
    title: note.title,
    tags: note.tags,
    createdAt: note.createdAt,
    updatedAt: note.updatedAt,
  };
  if (note.ownerId) frontmatter.ownerId = note.ownerId;
  const text = matter.stringify(note.content, frontmatter);
  const finalPath = path.join(NOTES_DIR, filename);
  const temporaryPath = `${finalPath}.tmp`;
  await writeFile(temporaryPath, text, "utf8");
  await rename(temporaryPath, finalPath);

  if (existing && existing.filename !== filename) {
    await unlink(path.join(NOTES_DIR, existing.filename));
  }
  indexNote(note);
  return { ...note, filename };
}

export async function deleteNote(id) {
  const note = await getNote(id);
  if (!note) return false;
  await unlink(path.join(NOTES_DIR, note.filename));
  database.prepare("DELETE FROM notes_fts WHERE id = ?").run(id);
  return true;
}
