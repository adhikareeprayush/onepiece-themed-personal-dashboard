import crypto from "node:crypto";
import { mkdir, readdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { listQuests } from "./quests.js";
import { focusSessions } from "./toolkit.js";

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const DATA_DIR = path.join(ROOT, "data");
const PROFILES_DIR = path.join(DATA_DIR, "profiles");
const INDEX_PATH = path.join(PROFILES_DIR, "index.json");
const LEGACY_PROFILE_PATH = path.join(DATA_DIR, "profile.json");
const USERS_PATH = path.join(DATA_DIR, "users.json");

const QUEST_POINTS = { D: 10, C: 25, B: 50, A: 90, S: 150 };

const LEAGUES = [
  { id: "cabin-boy", name: "Cabin Boy", min: 0, rank: "E" },
  { id: "east-blue", name: "East Blue", min: 100, rank: "D" },
  { id: "grand-line", name: "Grand Line", min: 300, rank: "C" },
  { id: "new-world", name: "New World", min: 650, rank: "B" },
  { id: "warlord", name: "Warlord", min: 1100, rank: "A" },
  { id: "yonko", name: "Yonko", min: 1800, rank: "S" },
  { id: "pirate-king", name: "Pirate King", min: 2800, rank: "SS" },
];

const DEFAULT_CHALLENGES = [
  {
    key: "clear-3-quests",
    title: "Clear 3 quests",
    description: "Complete any 3 quests on the swordsman's board.",
    kind: "quests_completed",
    target: 3,
    rewardPoints: 40,
  },
  {
    key: "legendary-hunt",
    title: "Legendary hunt",
    description: "Finish one S-rank quest.",
    kind: "quests_s_rank",
    target: 1,
    rewardPoints: 80,
  },
  {
    key: "gear-second-sprint",
    title: "Gear Second sprint",
    description: "Log 60 minutes of focus voyages.",
    kind: "focus_minutes",
    target: 60,
    rewardPoints: 50,
  },
  {
    key: "subquest-sweep",
    title: "Subquest sweep",
    description: "Complete 10 subquests across any missions.",
    kind: "subquests_completed",
    target: 10,
    rewardPoints: 45,
  },
];

function safeId(id) {
  return typeof id === "string" && /^[a-f0-9-]{36}$/.test(id);
}

function makeShareId() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.randomBytes(6);
  let code = "";
  for (let i = 0; i < 6; i += 1) code += alphabet[bytes[i] % alphabet.length];
  return `CAPT-${code}`;
}

function profilePath(userId) {
  return path.join(PROFILES_DIR, `${userId}.json`);
}

function leagueForPoints(points) {
  let current = LEAGUES[0];
  for (const league of LEAGUES) {
    if (points >= league.min) current = league;
  }
  const index = LEAGUES.findIndex((item) => item.id === current.id);
  const next = LEAGUES[index + 1] || null;
  return {
    leagueId: current.id,
    league: current.name,
    rank: current.rank,
    nextLeague: next?.name || null,
    nextLeagueAt: next?.min || null,
    progressToNext: next
      ? Math.min(100, Math.round(((points - current.min) / (next.min - current.min)) * 100))
      : 100,
  };
}

function defaultProfile(userId, seed = {}) {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    userId,
    shareId: makeShareId(),
    username: seed.username || seed.displayName || "Captain",
    bio: "Sailing the Grand Line with notes, quests, and treasure.",
    avatarUrl: "/assets/crew-captain.png?v=2",
    title: "Rookie pirate",
    location: "",
    favoriteCrew: "Straw Hats",
    statusMessage: "Set sail!",
    bounty: "",
    links: [],
    friends: [],
    challengeClaims: {},
    createdAt: now,
    updatedAt: now,
  };
}

async function readUsersFile() {
  try {
    const payload = JSON.parse(await readFile(USERS_PATH, "utf8"));
    return Array.isArray(payload.users) ? payload.users : [];
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function readIndex() {
  try {
    const payload = JSON.parse(await readFile(INDEX_PATH, "utf8"));
    return payload && typeof payload === "object" ? payload : {};
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw error;
  }
}

async function writeIndex(index) {
  await mkdir(PROFILES_DIR, { recursive: true });
  const temporary = `${INDEX_PATH}.tmp`;
  await writeFile(temporary, JSON.stringify(index, null, 2), "utf8");
  await rename(temporary, INDEX_PATH);
}

async function readUserProfileRaw(userId) {
  if (!safeId(userId)) return null;
  try {
    return JSON.parse(await readFile(profilePath(userId), "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function writeUserProfile(profile) {
  await mkdir(PROFILES_DIR, { recursive: true });
  const file = profilePath(profile.userId);
  const temporary = `${file}.tmp`;
  await writeFile(temporary, JSON.stringify(profile, null, 2), "utf8");
  await rename(temporary, file);
}

function normalizeLinks(input) {
  const list = Array.isArray(input) ? input : [];
  return list.slice(0, 8).map((item) => ({
    label: String(item?.label || "").trim().slice(0, 40) || "Link",
    url: String(item?.url || "").trim().slice(0, 500),
  })).filter((item) => item.url);
}

function normalizeFriends(input) {
  const list = Array.isArray(input) ? input : [];
  return list.slice(0, 80).map((item) => ({
    id: safeId(item?.id) ? item.id : crypto.randomUUID(),
    shareId: String(item?.shareId || "").trim().toUpperCase().slice(0, 24),
    username: String(item?.username || "").trim().slice(0, 40) || "Unknown captain",
    note: String(item?.note || "").trim().slice(0, 200),
    avatarUrl: String(item?.avatarUrl || "/assets/crew-navigator.png?v=2").trim().slice(0, 500),
    status: item?.status === "pending" ? "pending" : "accepted",
    createdAt: item?.createdAt || new Date().toISOString(),
    updatedAt: item?.updatedAt || new Date().toISOString(),
  })).filter((item) => /^CAPT-[A-Z0-9]{6}$/.test(item.shareId));
}

function normalizeProfile(raw, userId) {
  const base = defaultProfile(userId);
  return {
    ...base,
    ...raw,
    userId,
    links: normalizeLinks(raw?.links),
    friends: normalizeFriends(raw?.friends),
    challengeClaims: raw?.challengeClaims && typeof raw.challengeClaims === "object"
      ? raw.challengeClaims
      : {},
    bounty: String(raw?.bounty ?? base.bounty).trim().slice(0, 40),
  };
}

function publicProfile(profile, extras = {}) {
  return {
    shareId: profile.shareId,
    username: profile.username,
    bio: profile.bio,
    avatarUrl: profile.avatarUrl,
    title: profile.title,
    location: profile.location,
    favoriteCrew: profile.favoriteCrew,
    statusMessage: profile.statusMessage,
    bounty: profile.bounty || "",
    links: profile.links || [],
    ...extras,
  };
}

async function indexProfile(profile, previousShareId = null) {
  const index = await readIndex();
  if (previousShareId && previousShareId !== profile.shareId) {
    delete index[previousShareId];
  }
  index[profile.shareId] = profile.userId;
  await writeIndex(index);
}

async function readLegacyProfile() {
  try {
    return JSON.parse(await readFile(LEGACY_PROFILE_PATH, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function migrateLegacyProfile() {
  const legacy = await readLegacyProfile();
  if (!legacy?.shareId) return;

  const users = await readUsersFile();
  const owner = users[0];
  if (!owner?.id) return;

  const existing = await readUserProfileRaw(owner.id);
  if (existing?.shareId) return;

  const profile = normalizeProfile({
    ...legacy,
    userId: owner.id,
    username: legacy.username || owner.displayName || owner.username,
  }, owner.id);

  await writeUserProfile(profile);
  await indexProfile(profile);
}

async function ensureAllUsersHaveProfiles() {
  const users = await readUsersFile();
  for (const user of users) {
    if (!safeId(user.id)) continue;
    const existing = await readUserProfileRaw(user.id);
    if (existing?.shareId) {
      await indexProfile(normalizeProfile(existing, user.id));
      continue;
    }
    const profile = defaultProfile(user.id, {
      username: user.displayName || user.username,
      displayName: user.displayName,
    });
    await writeUserProfile(profile);
    await indexProfile(profile);
  }
}

async function ensureUserProfile(userId, seed = {}) {
  if (!safeId(userId)) {
    throw Object.assign(new Error("Invalid user id"), { status: 400 });
  }
  const existing = await readUserProfileRaw(userId);
  if (existing?.shareId) {
    const profile = normalizeProfile(existing, userId);
    await indexProfile(profile);
    return profile;
  }
  const profile = defaultProfile(userId, seed);
  await writeUserProfile(profile);
  await indexProfile(profile);
  return profile;
}

async function computeActivity() {
  const [quests, focus] = await Promise.all([
    listQuests(),
    focusSessions.list(),
  ]);

  const completedQuests = quests.filter((quest) => quest.done);
  const questPoints = completedQuests.reduce((sum, quest) => {
    return sum + (QUEST_POINTS[quest.level] || QUEST_POINTS.C);
  }, 0);

  const focusMinutes = focus.reduce((sum, session) => sum + Number(session.minutes || 0), 0);
  const focusPoints = Math.floor(focusMinutes / 2);
  const subquestsCompleted = quests.reduce((sum, quest) => {
    return sum + (quest.subquests || []).filter((sub) => sub.done).length;
  }, 0);
  const sRankDone = completedQuests.filter((quest) => quest.level === "S").length;

  return {
    questsCompleted: completedQuests.length,
    questsOpen: quests.filter((quest) => !quest.done).length,
    subquestsCompleted,
    sRankDone,
    focusMinutes,
    focusSessions: focus.length,
    activityPoints: questPoints + focusPoints,
    questPoints,
    focusPoints,
  };
}

function challengeProgress(challenge, activity) {
  if (challenge.kind === "quests_completed") return Math.min(challenge.target, activity.questsCompleted);
  if (challenge.kind === "quests_s_rank") return Math.min(challenge.target, activity.sRankDone);
  if (challenge.kind === "focus_minutes") return Math.min(challenge.target, activity.focusMinutes);
  if (challenge.kind === "subquests_completed") return Math.min(challenge.target, activity.subquestsCompleted);
  return 0;
}

function buildChallenges(profile, activity) {
  return DEFAULT_CHALLENGES.map((challenge) => {
    const progress = challengeProgress(challenge, activity);
    const claimed = Boolean(profile.challengeClaims?.[challenge.key]);
    const complete = progress >= challenge.target;
    return {
      ...challenge,
      progress,
      complete,
      claimed,
      canClaim: complete && !claimed,
      percent: Math.round((progress / challenge.target) * 100),
    };
  });
}

async function enrichProfile(profile) {
  const activity = await computeActivity();
  const challenges = buildChallenges(profile, activity);
  const claimedBonus = challenges
    .filter((item) => item.claimed)
    .reduce((sum, item) => sum + item.rewardPoints, 0);
  const points = activity.activityPoints + claimedBonus;
  const league = leagueForPoints(points);

  return {
    ...profile,
    friends: profile.friends,
    points,
    ...league,
    activity,
    challenges,
    leagues: LEAGUES,
    publicCard: publicProfile(profile, { points, ...league }),
  };
}

export async function initializeProfile() {
  await mkdir(PROFILES_DIR, { recursive: true });
  await migrateLegacyProfile();
  await ensureAllUsersHaveProfiles();
}

export async function createProfileForUser(userId, seed = {}) {
  const profile = await ensureUserProfile(userId, seed);
  return enrichProfile(profile);
}

export async function getProfile(userId) {
  const profile = await ensureUserProfile(userId);
  return enrichProfile(profile);
}

export async function updateProfile(userId, input = {}) {
  const current = await ensureUserProfile(userId);
  const now = new Date().toISOString();
  // Poster is system-inked except the captain name — ignore other client fields.
  const next = {
    ...current,
    username: String(input.username ?? current.username).trim().slice(0, 40) || "Captain",
    updatedAt: now,
  };
  await writeUserProfile(next);
  await indexProfile(next);
  return getProfile(userId);
}

export async function regenerateShareId(_userId) {
  throw Object.assign(new Error("Captain ID cannot be changed"), { status: 403 });
}

export async function addFriend(userId, input = {}) {
  const current = await ensureUserProfile(userId);
  const shareId = String(input.shareId || "").trim().toUpperCase();
  if (!/^CAPT-[A-Z0-9]{6}$/.test(shareId)) {
    throw Object.assign(new Error("Captain ID should look like CAPT-ABC123"), { status: 400 });
  }
  if (shareId === current.shareId) {
    throw Object.assign(new Error("You cannot add your own Captain ID"), { status: 400 });
  }
  if (current.friends.some((friend) => friend.shareId === shareId)) {
    throw Object.assign(new Error("That captain is already on your crew list"), { status: 409 });
  }

  const captain = await getPublicCard(shareId);
  if (!captain) {
    throw Object.assign(new Error("No captain found with that ID on this ship"), { status: 404 });
  }

  const friend = {
    id: crypto.randomUUID(),
    shareId,
    username: String(input.username || captain.username || shareId).trim().slice(0, 40) || shareId,
    note: String(input.note || "").trim().slice(0, 200),
    avatarUrl: String(input.avatarUrl || captain.avatarUrl || "/assets/crew-navigator.png?v=2").trim().slice(0, 500),
    status: "accepted",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  current.friends = normalizeFriends([friend, ...current.friends]);
  current.updatedAt = new Date().toISOString();
  await writeUserProfile(current);
  return getProfile(userId);
}

export async function removeFriend(userId, id) {
  const current = await ensureUserProfile(userId);
  const before = current.friends.length;
  current.friends = current.friends.filter((friend) => friend.id !== id);
  if (current.friends.length === before) return null;
  current.updatedAt = new Date().toISOString();
  await writeUserProfile(current);
  return getProfile(userId);
}

export async function claimChallenge(userId, key) {
  const current = await ensureUserProfile(userId);
  const activity = await computeActivity();
  const challenges = buildChallenges(current, activity);
  const challenge = challenges.find((item) => item.key === key);
  if (!challenge) {
    throw Object.assign(new Error("Challenge not found"), { status: 404 });
  }
  if (!challenge.complete) {
    throw Object.assign(new Error("Challenge is not complete yet"), { status: 400 });
  }
  if (challenge.claimed) {
    throw Object.assign(new Error("Reward already claimed"), { status: 409 });
  }
  current.challengeClaims = {
    ...current.challengeClaims,
    [key]: {
      claimedAt: new Date().toISOString(),
      rewardPoints: challenge.rewardPoints,
    },
  };
  current.updatedAt = new Date().toISOString();
  await writeUserProfile(current);
  return getProfile(userId);
}

async function findUserIdByShareId(shareId) {
  const wanted = String(shareId || "").trim().toUpperCase();
  if (!/^CAPT-[A-Z0-9]{6}$/.test(wanted)) return null;
  const index = await readIndex();
  if (index[wanted]) return index[wanted];

  const files = await readdir(PROFILES_DIR).catch(() => []);
  for (const file of files) {
    if (!file.endsWith(".json") || file === "index.json") continue;
    const userId = file.replace(/\.json$/, "");
    const profile = await readUserProfileRaw(userId);
    if (profile?.shareId === wanted) {
      await indexProfile(normalizeProfile(profile, userId));
      return userId;
    }
  }
  return null;
}

export async function getPublicCard(shareId) {
  const userId = await findUserIdByShareId(shareId);
  if (!userId) return null;
  const profile = await ensureUserProfile(userId);
  const full = await enrichProfile(profile);
  return full.publicCard;
}

export async function searchCaptains(query = "", { excludeShareId = null, limit = 24 } = {}) {
  const q = String(query || "").trim().toLowerCase();
  const index = await readIndex();
  const results = [];
  const seen = new Set();

  for (const [shareId, userId] of Object.entries(index)) {
    if (excludeShareId && shareId === excludeShareId) continue;
    if (seen.has(userId)) continue;
    seen.add(userId);

    const profile = normalizeProfile(await readUserProfileRaw(userId), userId);
    if (!profile?.shareId) continue;

    const haystack = [
      profile.username,
      profile.title,
      profile.location,
      profile.favoriteCrew,
      profile.bio,
      profile.shareId,
    ].join(" ").toLowerCase();

    if (q && !haystack.includes(q)) continue;

    const card = await enrichProfile(profile);
    results.push(card.publicCard);
    if (results.length >= limit) break;
  }

  if (!q) {
    results.sort((a, b) => String(a.username).localeCompare(String(b.username)));
  }

  return results;
}
