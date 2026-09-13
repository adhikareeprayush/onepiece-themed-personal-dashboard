import crypto from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createProfileForUser } from "./profile.js";

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)));
const dataDir = path.join(rootDir, "data");
const usersPath = path.join(dataDir, "users.json");

const DEMO_USERNAME = "captain";
const DEMO_PASSWORD = "1234";

function normalizeUsername(value) {
  return String(value || "").trim().toLowerCase();
}

function hashPassword(password, salt = crypto.randomBytes(16)) {
  const hash = crypto.scryptSync(String(password), salt, 64, { N: 16384, r: 8, p: 1 });
  return { salt: salt.toString("hex"), hash: hash.toString("hex") };
}

function verifyPassword(password, saltHex, hashHex) {
  try {
    const hash = crypto.scryptSync(String(password), Buffer.from(saltHex, "hex"), 64, { N: 16384, r: 8, p: 1 });
    const expected = Buffer.from(hashHex, "hex");
    return hash.length === expected.length && crypto.timingSafeEqual(hash, expected);
  } catch {
    return false;
  }
}

function hashToken(raw) {
  return crypto.createHash("sha256").update(String(raw)).digest("hex");
}

async function readUsers() {
  try {
    return JSON.parse(await readFile(usersPath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return { users: [] };
    throw error;
  }
}

async function writeUsers(payload) {
  await mkdir(dataDir, { recursive: true });
  const temp = `${usersPath}.${process.pid}.tmp`;
  await writeFile(temp, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  await rename(temp, usersPath);
}

function publicUser(user) {
  return {
    id: user.id,
    username: user.username,
    displayName: user.displayName || user.username,
    createdAt: user.createdAt,
  };
}

function allowDemoSeed() {
  return process.env.ALLOW_DEMO_USER === "true";
}

export async function initializeAuth() {
  await mkdir(dataDir, { recursive: true });
  const store = await readUsers();
  if (!Array.isArray(store.users)) store.users = [];

  if (!allowDemoSeed()) {
    await writeUsers(store);
    return;
  }

  const seedName = normalizeUsername(DEMO_USERNAME);
  const existing = store.users.find((user) => user.username === seedName);
  if (!existing) {
    const { salt, hash } = hashPassword(DEMO_PASSWORD);
    store.users.push({
      id: crypto.randomUUID(),
      username: seedName,
      displayName: "Captain",
      salt,
      hash,
      tokens: [],
      createdAt: new Date().toISOString(),
    });
    await writeUsers(store);
    console.log("Demo user seeded (ALLOW_DEMO_USER=true). Credentials are not printed.");
  }
}

export async function registerUser({ username, password, displayName }) {
  const name = normalizeUsername(username);
  if (!/^[a-z0-9_]{3,24}$/.test(name)) {
    const error = new Error("Username must be 3–24 characters (letters, numbers, underscore).");
    error.status = 400;
    throw error;
  }
  if (String(password || "").length < 4) {
    const error = new Error("Password must be at least 4 characters.");
    error.status = 400;
    throw error;
  }

  const store = await readUsers();
  if (store.users.some((user) => user.username === name)) {
    const error = new Error("That username is already claimed.");
    error.status = 409;
    throw error;
  }

  const { salt, hash } = hashPassword(password);
  const user = {
    id: crypto.randomUUID(),
    username: name,
    displayName: String(displayName || name).trim().slice(0, 40) || name,
    salt,
    hash,
    tokens: [],
    createdAt: new Date().toISOString(),
  };
  store.users.push(user);
  await writeUsers(store);
  await createProfileForUser(user.id, {
    username: user.displayName,
    displayName: user.displayName,
  }).catch(() => null);
  return publicUser(user);
}

export async function authenticateUser(username, password) {
  const store = await readUsers();
  const user = store.users.find((entry) => entry.username === normalizeUsername(username));
  if (!user || !verifyPassword(password, user.salt, user.hash)) {
    const error = new Error("Incorrect username or password.");
    error.status = 401;
    throw error;
  }
  return publicUser(user);
}

export async function getUserById(id) {
  const store = await readUsers();
  const user = store.users.find((entry) => entry.id === id);
  return user ? publicUser(user) : null;
}

/** Create a bearer token for the extension / external clients. Returns plaintext once. */
export async function createApiToken(userId, label = "extension") {
  const store = await readUsers();
  const user = store.users.find((entry) => entry.id === userId);
  if (!user) {
    const error = new Error("User not found.");
    error.status = 404;
    throw error;
  }
  const raw = `glt_${crypto.randomBytes(32).toString("hex")}`;
  const token = {
    id: crypto.randomUUID(),
    label: String(label || "extension").slice(0, 40),
    hash: hashToken(raw),
    createdAt: new Date().toISOString(),
  };
  user.tokens = Array.isArray(user.tokens) ? user.tokens : [];
  user.tokens.push(token);
  // Keep the last few tokens so re-login from the extension stays tidy.
  user.tokens = user.tokens.slice(-8);
  await writeUsers(store);
  return { token: raw, tokenId: token.id, user: publicUser(user) };
}

export async function revokeApiTokens(userId, { tokenId = null } = {}) {
  const store = await readUsers();
  const user = store.users.find((entry) => entry.id === userId);
  if (!user) return false;
  user.tokens = Array.isArray(user.tokens) ? user.tokens : [];
  if (tokenId) {
    user.tokens = user.tokens.filter((entry) => entry.id !== tokenId);
  } else {
    user.tokens = [];
  }
  await writeUsers(store);
  return true;
}

export async function getUserByApiToken(rawToken) {
  const raw = String(rawToken || "").trim();
  if (!raw.startsWith("glt_")) return null;
  const digest = hashToken(raw);
  const store = await readUsers();
  for (const user of store.users) {
    const tokens = Array.isArray(user.tokens) ? user.tokens : [];
    if (tokens.some((entry) => entry.hash === digest)) {
      return publicUser(user);
    }
  }
  return null;
}
