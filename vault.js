import crypto from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const DATA_DIR = path.join(ROOT, "data");
const VAULT_PATH = path.join(DATA_DIR, "vault.enc.json");

function safeId(id) {
  return typeof id === "string" && /^[a-f0-9-]{36}$/.test(id);
}

function deriveKey(password, salt) {
  return crypto.scryptSync(String(password), salt, 32, { N: 16384, r: 8, p: 1 });
}

function emptyPayload() {
  return { entries: [] };
}

function encryptPayload(password, payload) {
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);
  const key = deriveKey(password, salt);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const plaintext = Buffer.from(JSON.stringify(payload), "utf8");
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();
  return {
    version: 1,
    salt: salt.toString("base64"),
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
    ciphertext: encrypted.toString("base64"),
  };
}

function decryptFile(password, file) {
  if (!file || file.version !== 1) return emptyPayload();
  const salt = Buffer.from(file.salt, "base64");
  const iv = Buffer.from(file.iv, "base64");
  const tag = Buffer.from(file.tag, "base64");
  const ciphertext = Buffer.from(file.ciphertext, "base64");
  const key = deriveKey(password, salt);
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return JSON.parse(plaintext.toString("utf8"));
}

async function readVaultFile() {
  try {
    return JSON.parse(await readFile(VAULT_PATH, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function writeVaultFile(password, payload) {
  await mkdir(DATA_DIR, { recursive: true });
  const sealed = encryptPayload(password, payload);
  const temporary = `${VAULT_PATH}.tmp`;
  await writeFile(temporary, JSON.stringify(sealed, null, 2), "utf8");
  await rename(temporary, VAULT_PATH);
}

async function withVault(password, mutator) {
  const file = await readVaultFile();
  const payload = file ? decryptFile(password, file) : emptyPayload();
  if (!Array.isArray(payload.entries)) payload.entries = [];
  const result = await mutator(payload);
  await writeVaultFile(password, payload);
  return result;
}

function publicEntry(entry, { includeSecret = false } = {}) {
  return {
    id: entry.id,
    title: entry.title,
    username: entry.username,
    url: entry.url,
    notes: entry.notes,
    icon: entry.icon || "",
    updatedAt: entry.updatedAt,
    createdAt: entry.createdAt,
    ...(includeSecret ? { password: entry.password } : { hasPassword: Boolean(entry.password) }),
  };
}

export async function initializeVault() {
  await mkdir(DATA_DIR, { recursive: true });
}

export async function listVaultEntries(password) {
  const file = await readVaultFile();
  const payload = file ? decryptFile(password, file) : emptyPayload();
  return [...(payload.entries || [])]
    .sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)))
    .map((entry) => publicEntry(entry));
}

export async function getVaultEntry(password, id) {
  if (!safeId(id)) return null;
  const file = await readVaultFile();
  const payload = file ? decryptFile(password, file) : emptyPayload();
  const entry = (payload.entries || []).find((item) => item.id === id);
  return entry ? publicEntry(entry, { includeSecret: true }) : null;
}

export async function saveVaultEntry(password, input) {
  return withVault(password, (payload) => {
    const now = new Date().toISOString();
    const existing = input.id ? payload.entries.find((item) => item.id === input.id) : null;
    const entry = {
      id: existing?.id || crypto.randomUUID(),
      title: String(input.title || "Untitled").trim().slice(0, 120) || "Untitled",
      username: String(input.username || "").trim().slice(0, 200),
      password: String(input.password ?? existing?.password ?? ""),
      url: String(input.url || "").trim().slice(0, 500),
      notes: String(input.notes || "").trim().slice(0, 2000),
      icon: String(input.icon || "").trim().slice(0, 500),
      createdAt: existing?.createdAt || now,
      updatedAt: now,
    };
    if (existing) {
      payload.entries = payload.entries.map((item) => (item.id === existing.id ? entry : item));
    } else {
      payload.entries.push(entry);
    }
    return publicEntry(entry, { includeSecret: true });
  });
}

export async function deleteVaultEntry(password, id) {
  if (!safeId(id)) return false;
  let removed = false;
  await withVault(password, (payload) => {
    const before = payload.entries.length;
    payload.entries = payload.entries.filter((item) => item.id !== id);
    removed = payload.entries.length < before;
  });
  return removed;
}

export function generatePassword(length = 20) {
  const size = Math.min(64, Math.max(12, Number(length) || 20));
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*-_";
  const bytes = crypto.randomBytes(size);
  let out = "";
  for (let i = 0; i < size; i += 1) out += alphabet[bytes[i] % alphabet.length];
  return out;
}
