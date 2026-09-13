const DEFAULT_SERVER = "https://onepiece.prayushadhikari.com.np";
const ext = globalThis.browser ?? globalThis.chrome;
let cachedServerUrl = DEFAULT_SERVER;
let activeTab = "charts";

const els = {
  loginView: document.querySelector("#view-login"),
  homeView: document.querySelector("#view-home"),
  serverUrl: document.querySelector("#server-url"),
  username: document.querySelector("#username"),
  password: document.querySelector("#password"),
  loginBtn: document.querySelector("#login-btn"),
  loginError: document.querySelector("#login-error"),
  displayName: document.querySelector("#display-name"),
  homeStatus: document.querySelector("#home-status"),
  chartTitle: document.querySelector("#chart-title"),
  chartUrl: document.querySelector("#chart-url"),
  chartNote: document.querySelector("#chart-note"),
  saveChartBtn: document.querySelector("#save-chart-btn"),
  berryFlow: document.querySelector("#berry-flow"),
  berryAmount: document.querySelector("#berry-amount"),
  berryTitle: document.querySelector("#berry-title"),
  berryCategory: document.querySelector("#berry-category"),
  berryDate: document.querySelector("#berry-date"),
  saveBerryBtn: document.querySelector("#save-berry-btn"),
  noteTitle: document.querySelector("#note-title"),
  noteBody: document.querySelector("#note-body"),
  saveNoteBtn: document.querySelector("#save-note-btn"),
  signalTitle: document.querySelector("#signal-title"),
  signalDue: document.querySelector("#signal-due"),
  signalKind: document.querySelector("#signal-kind"),
  saveSignalBtn: document.querySelector("#save-signal-btn"),
  openAppBtn: document.querySelector("#open-app-btn"),
  logoutBtn: document.querySelector("#logout-btn"),
};

function normalizeServer(url) {
  let value = String(url || DEFAULT_SERVER).trim().replace(/\/$/, "") || DEFAULT_SERVER;
  value = value.replace(/^http:\/\/localhost(?=:|\/|$)/i, "http://127.0.0.1");
  return value;
}

function isUnsaveableUrl(url) {
  return /^(about:|chrome:|chrome-extension:|moz-extension:|resource:|view-source:)/i.test(String(url || ""));
}

function friendlyNetworkError(message, serverUrl) {
  if (/NetworkError|Failed to fetch|Network error|NetworkError when attempting to fetch/i.test(String(message || ""))) {
    return `Can't reach ${normalizeServer(serverUrl)}. Confirm the site opens in a tab, then reload this add-on.`;
  }
  return message || "Request failed";
}

function todayDate() {
  return new Date().toISOString().slice(0, 10);
}

function defaultDueLocal() {
  const date = new Date(Date.now() + 60 * 60 * 1000);
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

async function loadSession() {
  const data = await ext.storage.local.get(["serverUrl", "token", "user", "appUrl"]);
  const serverUrl = normalizeServer(data.serverUrl || DEFAULT_SERVER);
  cachedServerUrl = serverUrl;
  return {
    serverUrl,
    token: data.token || "",
    user: data.user || null,
    appUrl: normalizeServer(data.appUrl || data.serverUrl || DEFAULT_SERVER),
  };
}

async function saveSession(partial) {
  if (partial.serverUrl) partial.serverUrl = normalizeServer(partial.serverUrl);
  if (partial.appUrl) partial.appUrl = normalizeServer(partial.appUrl);
  await ext.storage.local.set(partial);
}

async function clearSession() {
  await ext.storage.local.remove(["token", "user", "appUrl"]);
}

async function api(serverUrl, path, { method = "GET", token = "", body } = {}) {
  const url = normalizeServer(serverUrl);
  let result;
  try {
    result = await ext.runtime.sendMessage({
      type: "api",
      url,
      path,
      method,
      token,
      body,
    });
  } catch (error) {
    throw new Error(friendlyNetworkError(String(error?.message || error), url));
  }
  if (!result) throw new Error(friendlyNetworkError("Network error", url));
  if (!result.ok) throw new Error(friendlyNetworkError(result.error || `Request failed (${result.status})`, url));
  return result.data;
}

async function activeBrowserTab() {
  const tabs = await ext.tabs.query({ active: true, currentWindow: true });
  return tabs[0] || null;
}

function setTab(name) {
  activeTab = name;
  document.querySelectorAll(".tab").forEach((button) => {
    const on = button.dataset.tab === name;
    button.classList.toggle("active", on);
    button.setAttribute("aria-selected", on ? "true" : "false");
  });
  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.hidden = panel.dataset.panel !== name;
  });
  els.homeStatus.textContent = "";
}

function showLogin(session) {
  els.loginView.hidden = false;
  els.homeView.hidden = true;
  els.serverUrl.value = session.serverUrl;
  els.loginError.textContent = "";
}

function showHome(session) {
  els.loginView.hidden = true;
  els.homeView.hidden = false;
  els.displayName.textContent = session.user?.displayName || session.user?.username || "Crew";
  els.homeStatus.textContent = "";
  els.berryDate.value = els.berryDate.value || todayDate();
  els.signalDue.value = els.signalDue.value || defaultDueLocal();
  setTab(activeTab || "charts");
}

async function prefillsFromTab() {
  try {
    const tab = await activeBrowserTab();
    if (!tab?.url || isUnsaveableUrl(tab.url)) return;
    if (!els.chartTitle.value) els.chartTitle.value = tab.title || "";
    if (!els.chartUrl.value) els.chartUrl.value = tab.url || "";
    if (!els.noteTitle.value) els.noteTitle.value = tab.title || "Voyage note";
    if (!els.noteBody.value) els.noteBody.value = `Source: ${tab.url}\n\n`;
    if (!els.signalTitle.value) els.signalTitle.value = `Follow up: ${(tab.title || "page").slice(0, 80)}`;
  } catch {
    /* ignore */
  }
}

async function refreshUi() {
  const session = await loadSession();
  if (session.token && session.user) {
    try {
      const live = await api(session.serverUrl, "/api/session", { token: session.token });
      if (!live.authenticated) throw new Error("Session expired");
      await saveSession({ user: live.user, appUrl: live.appUrl || session.serverUrl });
      showHome({ ...session, user: live.user, appUrl: live.appUrl || session.serverUrl });
      await prefillsFromTab();
      return;
    } catch {
      await clearSession();
    }
  }
  showLogin(session);
}

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => setTab(button.dataset.tab));
});

els.loginBtn.addEventListener("click", async () => {
  els.loginError.textContent = "";
  els.loginBtn.disabled = true;
  try {
    const serverUrl = normalizeServer(els.serverUrl.value);
    cachedServerUrl = serverUrl;
    const data = await api(serverUrl, "/api/auth/login", {
      method: "POST",
      body: {
        username: els.username.value.trim(),
        password: els.password.value,
        client: "extension",
      },
    });
    if (!data?.token) throw new Error("Server did not return an API token.");
    await saveSession({
      serverUrl,
      token: data.token,
      user: data.user,
      appUrl: data.appUrl || serverUrl,
    });
    els.password.value = "";
    showHome({
      serverUrl,
      token: data.token,
      user: data.user,
      appUrl: data.appUrl || serverUrl,
    });
    await prefillsFromTab();
  } catch (error) {
    els.loginError.textContent = error.message || "Could not sign in";
  } finally {
    els.loginBtn.disabled = false;
  }
});

els.saveChartBtn.addEventListener("click", async () => {
  els.homeStatus.textContent = "Charting…";
  els.saveChartBtn.disabled = true;
  try {
    const session = await loadSession();
    const tab = await activeBrowserTab();
    const title = els.chartTitle.value.trim() || tab?.title || "Untitled chart";
    const url = els.chartUrl.value.trim() || tab?.url || "";
    if (!url || isUnsaveableUrl(url)) throw new Error("This page can't be saved as a chart.");
    await api(session.serverUrl, "/api/bookmarks", {
      method: "POST",
      token: session.token,
      body: {
        title,
        url,
        tags: ["extension"],
        notes: els.chartNote.value.trim() || "Saved from the companion extension.",
        source: "extension",
      },
    });
    els.homeStatus.textContent = "Sea chart sealed.";
  } catch (error) {
    els.homeStatus.textContent = error.message || "Could not save chart";
  } finally {
    els.saveChartBtn.disabled = false;
  }
});

els.saveBerryBtn.addEventListener("click", async () => {
  els.homeStatus.textContent = "Logging…";
  els.saveBerryBtn.disabled = true;
  try {
    const session = await loadSession();
    const amount = Number(els.berryAmount.value);
    if (!Number.isFinite(amount) || amount < 0) throw new Error("Enter a valid amount.");
    await api(session.serverUrl, "/api/expenses", {
      method: "POST",
      token: session.token,
      body: {
        flow: els.berryFlow.value === "income" ? "income" : "expense",
        amount,
        title: els.berryTitle.value.trim() || (els.berryFlow.value === "income" ? "Income" : "Expense"),
        category: els.berryCategory.value || "other",
        date: els.berryDate.value || todayDate(),
        note: "Logged from companion extension.",
        source: "extension",
      },
    });
    els.berryAmount.value = "";
    els.homeStatus.textContent = "Berry entry sealed.";
  } catch (error) {
    els.homeStatus.textContent = error.message || "Could not log berries";
  } finally {
    els.saveBerryBtn.disabled = false;
  }
});

els.saveNoteBtn.addEventListener("click", async () => {
  els.homeStatus.textContent = "Writing…";
  els.saveNoteBtn.disabled = true;
  try {
    const session = await loadSession();
    const title = els.noteTitle.value.trim() || "Voyage note";
    const content = els.noteBody.value.trim();
    if (!content) throw new Error("Write a short log entry first.");
    await api(session.serverUrl, "/api/notes", {
      method: "POST",
      token: session.token,
      body: {
        title,
        content,
        tags: ["extension"],
      },
    });
    els.homeStatus.textContent = "Log entry sealed.";
  } catch (error) {
    els.homeStatus.textContent = error.message || "Could not save note";
  } finally {
    els.saveNoteBtn.disabled = false;
  }
});

els.saveSignalBtn.addEventListener("click", async () => {
  els.homeStatus.textContent = "Arming bell…";
  els.saveSignalBtn.disabled = true;
  try {
    const session = await loadSession();
    const title = els.signalTitle.value.trim();
    const due = els.signalDue.value;
    if (!title || !due) throw new Error("Title and time are required.");
    await api(session.serverUrl, "/api/signals", {
      method: "POST",
      token: session.token,
      body: {
        title,
        dueAt: new Date(due).toISOString(),
        kind: els.signalKind.value === "alarm" ? "alarm" : "reminder",
        enabled: true,
        status: "scheduled",
        source: "extension",
      },
    });
    els.homeStatus.textContent = "Watchtower bell set.";
  } catch (error) {
    els.homeStatus.textContent = error.message || "Could not set signal";
  } finally {
    els.saveSignalBtn.disabled = false;
  }
});

els.openAppBtn.addEventListener("click", async () => {
  const session = await loadSession();
  const hash = activeTab === "berries" ? "berries"
    : activeTab === "logbook" ? "notes"
      : activeTab === "bell" ? "watchtower"
        : "charts";
  await ext.tabs.create({ url: `${normalizeServer(session.appUrl || session.serverUrl)}/app#/${hash}` });
});

els.logoutBtn.addEventListener("click", async () => {
  const session = await loadSession();
  try {
    if (session.token) {
      await api(session.serverUrl, "/api/auth/extension/logout", {
        method: "POST",
        token: session.token,
        body: {},
      });
    }
  } catch {
    /* clear local anyway */
  }
  await clearSession();
  showLogin(session);
});

refreshUi().catch((error) => {
  els.loginError.textContent = error.message || "Could not load session";
  showLogin({ serverUrl: DEFAULT_SERVER });
});
