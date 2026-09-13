const elements = {
  app: document.querySelector("#app"),
  lockButton: document.querySelector("#lock-button"),
  newButton: document.querySelector("#new-button"),
  emptyNewButton: document.querySelector("#empty-new-button"),
  backButton: document.querySelector("#back-button"),
  search: document.querySelector("#search"),
  searchShell: document.querySelector("#search-shell"),
  tagFilters: document.querySelector("#tag-filters"),
  sidebarTags: document.querySelector("#sidebar-tags"),
  sidebarTagsEmpty: document.querySelector("#sidebar-tags-empty"),
  notesSidebarExtras: document.querySelector("#notes-sidebar-extras"),
  sidebar: document.querySelector("#sidebar"),
  sidebarBackdrop: document.querySelector("#sidebar-backdrop"),
  sidebarClose: document.querySelector("#sidebar-close"),
  menuButton: document.querySelector("#menu-button"),
  notesList: document.querySelector("#notes-list"),
  headerStatus: document.querySelector("#header-status"),
  headerHello: document.querySelector("#header-hello"),
  headerAvatar: document.querySelector("#header-avatar"),
  headerProfileBtn: document.querySelector("#header-profile-btn"),
  menuProfileBtn: document.querySelector("#menu-profile-btn"),
  emptyList: document.querySelector("#empty-list"),
  title: document.querySelector("#note-title"),
  tags: document.querySelector("#note-tags"),
  content: document.querySelector("#note-content"),
  saveButton: document.querySelector("#save-button"),
  deleteButton: document.querySelector("#delete-button"),
  saveStatus: document.querySelector("#save-status"),
  writeTab: document.querySelector("#write-tab"),
  splitTab: document.querySelector("#split-tab"),
  previewTab: document.querySelector("#preview-tab"),
  preview: document.querySelector("#preview"),
  previewPane: document.querySelector(".preview-pane"),
  previewMeta: document.querySelector("#preview-meta"),
  previewToc: document.querySelector("#preview-toc"),
  previewTocBtn: document.querySelector("#preview-toc-btn"),
  previewWidthBtn: document.querySelector("#preview-width-btn"),
  previewFullscreenBtn: document.querySelector("#preview-fullscreen-btn"),
  previewLightbox: document.querySelector("#preview-lightbox"),
  previewLightboxImage: document.querySelector("#preview-lightbox-image"),
  previewLightboxClose: document.querySelector("#preview-lightbox-close"),
  editorPanel: document.querySelector("#editor-panel"),
  editorSplit: document.querySelector(".editor-split"),
  toast: document.querySelector("#toast"),
  toastMessage: document.querySelector("#toast-message"),
  voyageAlert: document.querySelector("#voyage-alert"),
  voyageAlertBanner: document.querySelector("#voyage-alert-banner"),
  voyageAlertTitle: document.querySelector("#voyage-alert-title"),
  voyageAlertMessage: document.querySelector("#voyage-alert-message"),
  voyageAlertCancel: document.querySelector("#voyage-alert-cancel"),
  voyageAlertConfirm: document.querySelector("#voyage-alert-confirm"),
  voyageAlertIconUse: document.querySelector("#voyage-alert-icon-use"),
  overviewStats: document.querySelector("#overview-stats"),
  crewCards: document.querySelector("#crew-cards"),
  vaultList: document.querySelector("#vault-list"),
  vaultEmpty: document.querySelector("#vault-empty"),
  vaultForm: document.querySelector("#vault-form"),
  vaultModal: document.querySelector("#vault-modal"),
  vaultNew: document.querySelector("#vault-new"),
  vaultId: document.querySelector("#vault-id"),
  vaultTitle: document.querySelector("#vault-title"),
  vaultUsername: document.querySelector("#vault-username"),
  vaultPassword: document.querySelector("#vault-password"),
  vaultUrl: document.querySelector("#vault-url"),
  vaultNotes: document.querySelector("#vault-notes"),
  vaultIcon: document.querySelector("#vault-icon"),
  vaultIconUrl: document.querySelector("#vault-icon-url"),
  vaultIconPreview: document.querySelector("#vault-icon-preview"),
  vaultIconPicks: document.querySelector("#vault-icon-picks"),
  vaultIconAuto: document.querySelector("#vault-icon-auto"),
  vaultIconClear: document.querySelector("#vault-icon-clear"),
  vaultGenerate: document.querySelector("#vault-generate"),
  vaultCopy: document.querySelector("#vault-copy"),
  vaultDelete: document.querySelector("#vault-delete"),
  vaultCancel: document.querySelector("#vault-cancel"),
  questForm: document.querySelector("#quest-form"),
  questModal: document.querySelector("#quest-modal"),
  questNew: document.querySelector("#quest-new"),
  questId: document.querySelector("#quest-id"),
  questTitle: document.querySelector("#quest-title"),
  questLevel: document.querySelector("#quest-level"),
  questDue: document.querySelector("#quest-due"),
  questDescription: document.querySelector("#quest-description"),
  questNotes: document.querySelector("#quest-notes"),
  questDone: document.querySelector("#quest-done"),
  questSubquests: document.querySelector("#quest-subquests"),
  questAddSub: document.querySelector("#quest-add-sub"),
  questDelete: document.querySelector("#quest-delete"),
  questCancel: document.querySelector("#quest-cancel"),
  questLevelFilters: document.querySelector("#quest-level-filters"),
  questsList: document.querySelector("#quests-list"),
  questsEmpty: document.querySelector("#quests-empty"),
  chartsList: document.querySelector("#charts-list"),
  chartsForm: document.querySelector("#charts-form"),
  chartsModal: document.querySelector("#charts-modal"),
  chartsNew: document.querySelector("#charts-new"),
  chartsId: document.querySelector("#charts-id"),
  chartsTitle: document.querySelector("#charts-title"),
  chartsUrl: document.querySelector("#charts-url"),
  chartsTags: document.querySelector("#charts-tags"),
  chartsNotes: document.querySelector("#charts-notes"),
  chartsDelete: document.querySelector("#charts-delete"),
  chartsCancel: document.querySelector("#charts-cancel"),
  chartsEmpty: document.querySelector("#charts-empty"),
  snippetsList: document.querySelector("#snippets-list"),
  snippetForm: document.querySelector("#snippet-form"),
  snippetModal: document.querySelector("#snippet-modal"),
  snippetsNew: document.querySelector("#snippets-new"),
  snippetId: document.querySelector("#snippet-id"),
  snippetTitle: document.querySelector("#snippet-title"),
  snippetLanguage: document.querySelector("#snippet-language"),
  snippetTags: document.querySelector("#snippet-tags"),
  snippetCode: document.querySelector("#snippet-code"),
  snippetDelete: document.querySelector("#snippet-delete"),
  snippetCancel: document.querySelector("#snippet-cancel"),
  snippetsEmpty: document.querySelector("#snippets-empty"),
  berryForm: document.querySelector("#berry-form"),
  berryModal: document.querySelector("#berry-modal"),
  berryNew: document.querySelector("#berry-new"),
  berryId: document.querySelector("#berry-id"),
  berryFlow: document.querySelector("#berry-flow"),
  berryTitle: document.querySelector("#berry-title"),
  berryAmount: document.querySelector("#berry-amount"),
  berryCategory: document.querySelector("#berry-category"),
  berryDate: document.querySelector("#berry-date"),
  berryRepeat: document.querySelector("#berry-repeat"),
  berryRepeatHint: document.querySelector("#berry-repeat-hint"),
  berryNote: document.querySelector("#berry-note"),
  berryDelete: document.querySelector("#berry-delete"),
  berryCancel: document.querySelector("#berry-cancel"),
  berrySubmit: document.querySelector("#berry-submit"),
  berryFormHeading: document.querySelector("#berry-form-heading"),
  berryMonthBalance: document.querySelector("#berry-month-balance"),
  berryMonthIncome: document.querySelector("#berry-month-income"),
  berryMonthSpend: document.querySelector("#berry-month-spend"),
  berryCount: document.querySelector("#berry-count"),
  berryTopCategory: document.querySelector("#berry-top-category"),
  berryFlowFilters: document.querySelector("#berry-flow-filters"),
  berryCategoryFilters: document.querySelector("#berry-category-filters"),
  berryChartTrend: document.querySelector("#berry-chart-trend"),
  berryChartCats: document.querySelector("#berry-chart-cats"),
  berriesList: document.querySelector("#berries-list"),
  berriesEmpty: document.querySelector("#berries-empty"),
  signalsList: document.querySelector("#signals-list"),
  signalsEmpty: document.querySelector("#signals-empty"),
  signalForm: document.querySelector("#signal-form"),
  signalModal: document.querySelector("#signal-modal"),
  signalNew: document.querySelector("#signal-new"),
  signalId: document.querySelector("#signal-id"),
  signalTitle: document.querySelector("#signal-title"),
  signalKind: document.querySelector("#signal-kind"),
  signalDue: document.querySelector("#signal-due"),
  voyageClock: document.querySelector("#voyage-clock"),
  voyageClockReadout: document.querySelector("#voyage-clock-readout"),
  voyageClockDays: document.querySelector("#voyage-clock-days"),
  voyageClockFace: document.querySelector("#voyage-clock-face"),
  voyageClockHand: document.querySelector("#voyage-clock-hand"),
  voyageClockBrand: document.querySelector("#voyage-clock-brand"),
  signalRepeat: document.querySelector("#signal-repeat"),
  signalNote: document.querySelector("#signal-note"),
  signalSound: document.querySelector("#signal-sound"),
  signalEnabled: document.querySelector("#signal-enabled"),
  signalSnooze: document.querySelector("#signal-snooze"),
  signalDelete: document.querySelector("#signal-delete"),
  signalCancel: document.querySelector("#signal-cancel"),
  signalNotifyBtn: document.querySelector("#signal-notify-btn"),
  focusDisplay: document.querySelector("#focus-display"),
  focusLabel: document.querySelector("#focus-label"),
  focusStart: document.querySelector("#focus-start"),
  focusPause: document.querySelector("#focus-pause"),
  focusReset: document.querySelector("#focus-reset"),
  focusHistory: document.querySelector("#focus-history"),
  focusEmpty: document.querySelector("#focus-empty"),
  focusWidget: document.querySelector("#focus-widget"),
  focusWidgetToggle: document.querySelector("#focus-widget-toggle"),
  focusWidgetPanel: document.querySelector("#focus-widget-panel"),
  focusWidgetTime: document.querySelector("#focus-widget-time"),
  focusWidgetState: document.querySelector("#focus-widget-state"),
  focusWidgetDisplay: document.querySelector("#focus-widget-display"),
  focusWidgetStart: document.querySelector("#focus-widget-start"),
  focusWidgetPause: document.querySelector("#focus-widget-pause"),
  focusWidgetReset: document.querySelector("#focus-widget-reset"),
  focusWidgetOpen: document.querySelector("#focus-widget-open"),
  commandPalette: document.querySelector("#command-palette"),
  commandPaletteBackdrop: document.querySelector("#command-palette-backdrop"),
  commandPaletteInput: document.querySelector("#command-palette-input"),
  commandPaletteResults: document.querySelector("#command-palette-results"),
  commandPaletteBtn: document.querySelector("#command-palette-btn"),
  profileEditBtn: document.querySelector("#profile-edit-btn"),
  profileAvatar: document.querySelector("#profile-avatar"),
  profileStatusMessage: document.querySelector("#profile-status-message"),
  profileUsername: document.querySelector("#profile-username"),
  profileBounty: document.querySelector("#profile-bounty"),
  profileTitle: document.querySelector("#profile-title"),
  profileBio: document.querySelector("#profile-bio"),
  profileLocation: document.querySelector("#profile-location"),
  profileCrew: document.querySelector("#profile-crew"),
  profileShareId: document.querySelector("#profile-share-id"),
  profileCopyId: document.querySelector("#profile-copy-id"),
  profileRegenId: document.querySelector("#profile-regen-id"),
  profileLeague: document.querySelector("#profile-league"),
  profileRank: document.querySelector("#profile-rank"),
  profileRankBar: document.querySelector("#profile-rank-bar"),
  profileRankNext: document.querySelector("#profile-rank-next"),
  profilePoints: document.querySelector("#profile-points"),
  profilePointsBreakdown: document.querySelector("#profile-points-breakdown"),
  profileRecord: document.querySelector("#profile-record"),
  profileRecordSub: document.querySelector("#profile-record-sub"),
  profileChallenges: document.querySelector("#profile-challenges"),
  friendForm: document.querySelector("#friend-form"),
  friendShareId: document.querySelector("#friend-share-id"),
  friendUsername: document.querySelector("#friend-username"),
  friendNote: document.querySelector("#friend-note"),
  friendPreview: document.querySelector("#friend-preview"),
  friendLookupBtn: document.querySelector("#friend-lookup-btn"),
  friendsList: document.querySelector("#friends-list"),
  friendsEmpty: document.querySelector("#friends-empty"),
  discoverForm: document.querySelector("#discover-form"),
  discoverQuery: document.querySelector("#discover-query"),
  discoverList: document.querySelector("#discover-list"),
  discoverEmpty: document.querySelector("#discover-empty"),
  captainModal: document.querySelector("#captain-modal"),
  captainModalCard: document.querySelector("#captain-modal-card"),
  profileLinks: document.querySelector("#profile-links"),
  profileLinksEmpty: document.querySelector("#profile-links-empty"),
  profileModal: document.querySelector("#profile-modal"),
  profileForm: document.querySelector("#profile-form"),
  profileFormCancel: document.querySelector("#profile-form-cancel"),
  profileEditUsername: document.querySelector("#profile-edit-username"),
  profileEditTitle: document.querySelector("#profile-edit-title"),
  profileEditBounty: document.querySelector("#profile-edit-bounty"),
  profileEditStatus: document.querySelector("#profile-edit-status"),
  profileEditBio: document.querySelector("#profile-edit-bio"),
  profileEditLocation: document.querySelector("#profile-edit-location"),
  profileEditCrew: document.querySelector("#profile-edit-crew"),
  profileEditAvatar: document.querySelector("#profile-edit-avatar"),
  profileAvatarPicks: document.querySelector("#profile-avatar-picks"),
  profileEditLinks: document.querySelector("#profile-edit-links"),
};

const TAG_COLORS = ["#f5c518", "#c41e3a", "#1e7ef0", "#22c55e", "#f97316", "#a855f7", "#06b6d4", "#ec4899"];
const VIEWS = ["overview", "profile", "notes", "vault", "quests", "charts", "snippets", "berries", "watchtower", "focus"];
const SEARCHABLE_VIEWS = ["overview", "profile", "notes", "vault", "quests", "charts", "snippets", "berries", "watchtower", "focus"];
const VIEW_STATE_KEY = "glt-view-state-v1";

function emptyViewState() {
  return {
    overview: { search: "" },
    profile: { search: "", formOpen: false },
    notes: {
      search: "",
      selectedTag: "",
      editing: false,
      noteId: null,
      editorMode: null,
      readerWidth: false,
      tocOpen: false,
      draft: null,
    },
    vault: { search: "", openId: null, draft: null },
    quests: { search: "", openId: null, level: "", expanded: [] },
    charts: { search: "", openId: null, draft: null },
    snippets: { search: "", openId: null, draft: null },
    berries: { search: "", openId: null, category: "", flow: "all", draft: null },
    watchtower: { search: "", openId: null, filter: "all", draft: null },
    focus: { search: "" },
  };
}

function loadViewState() {
  try {
    const raw = sessionStorage.getItem(VIEW_STATE_KEY);
    if (!raw) return emptyViewState();
    const parsed = JSON.parse(raw);
    const base = emptyViewState();
    for (const view of VIEWS) {
      base[view] = { ...base[view], ...(parsed[view] || {}) };
    }
    return base;
  } catch {
    return emptyViewState();
  }
}

function persistViewState() {
  try {
    sessionStorage.setItem(VIEW_STATE_KEY, JSON.stringify(viewState));
  } catch {
    /* ignore quota / private mode */
  }
}

let viewState = loadViewState();

function parseAppRoute() {
  const raw = (window.location.hash || "").replace(/^#\/?/, "").trim();
  if (!raw) return { view: "overview", noteId: null };
  const [view, noteId] = raw.split("/");
  if (!VIEWS.includes(view)) return { view: "overview", noteId: null };
  return { view, noteId: view === "notes" && noteId ? decodeURIComponent(noteId) : null };
}

function syncAppRoute({ push = false } = {}) {
  let path = currentView;
  if (currentView === "notes" && elements.app.classList.contains("editing") && currentId) {
    path = `notes/${encodeURIComponent(currentId)}`;
  } else if (currentView === "notes" && elements.app.classList.contains("editing")) {
    path = "notes";
  }
  const next = `#/${path}`;
  if (window.location.hash === next) return;
  if (push) history.pushState({ view: currentView, noteId: currentId }, "", next);
  else history.replaceState({ view: currentView, noteId: currentId }, "", next);
}

let applyingRoute = false;

async function snapshotView(view) {
  if (!VIEWS.includes(view)) return;
  const state = viewState[view] || (viewState[view] = {});
  state.search = elements.search.value;

  if (view === "notes") {
    const editing = elements.app.classList.contains("editing");
    state.editing = editing;
    state.selectedTag = selectedTag;
    state.editorMode = editorMode;
    state.readerWidth = previewReaderWidth;
    state.tocOpen = previewTocOpen;
    if (editing) {
      await finishPendingSave();
      state.noteId = currentId;
      state.draft = currentId
        ? null
        : {
            title: elements.title.value,
            tags: elements.tags.value,
            content: elements.content.value,
          };
      setPreviewFullscreen(false);
      closePreviewLightbox();
      elements.app.classList.remove("editing");
    } else {
      state.noteId = null;
      state.draft = null;
    }
  } else if (view === "profile") {
    state.formOpen = isToolModalOpen(elements.profileModal);
    if (state.formOpen) closeToolModal(elements.profileModal);
  } else if (view === "vault") {
    if (isToolModalOpen(elements.vaultModal)) {
      state.openId = selectedVaultId;
      state.draft = selectedVaultId
        ? null
        : {
            label: elements.vaultTitle.value,
            username: elements.vaultUsername.value,
            password: elements.vaultPassword.value,
            url: elements.vaultUrl?.value || "",
            notes: elements.vaultNotes?.value || "",
            icon: elements.vaultIcon?.value || "",
          };
      closeToolModal(elements.vaultModal);
    } else {
      state.openId = null;
      state.draft = null;
    }
  } else if (view === "quests") {
    state.level = selectedQuestLevel;
    state.expanded = [...expandedQuestIds];
    if (isToolModalOpen(elements.questModal)) {
      state.openId = selectedQuestId;
      closeToolModal(elements.questModal);
    } else {
      state.openId = null;
    }
  } else if (view === "charts") {
    if (isToolModalOpen(elements.chartsModal)) {
      state.openId = selectedChartId;
      state.draft = selectedChartId
        ? null
        : {
            title: elements.chartsTitle.value,
            url: elements.chartsUrl.value,
            tags: elements.chartsTags.value,
            notes: elements.chartsNotes.value,
          };
      closeToolModal(elements.chartsModal);
    } else {
      state.openId = null;
      state.draft = null;
    }
  } else if (view === "snippets") {
    if (isToolModalOpen(elements.snippetModal)) {
      state.openId = selectedSnippetId;
      state.draft = selectedSnippetId
        ? null
        : {
            title: elements.snippetTitle.value,
            language: elements.snippetLanguage.value,
            tags: elements.snippetTags.value,
            code: elements.snippetCode.value,
          };
      closeToolModal(elements.snippetModal);
    } else {
      state.openId = null;
      state.draft = null;
    }
  } else if (view === "berries") {
    state.category = selectedBerryCategory;
    state.flow = selectedBerryFlow;
    if (isToolModalOpen(elements.berryModal)) {
      state.openId = selectedBerryId;
      state.draft = selectedBerryId
        ? null
        : {
            flow: elements.berryFlow.value,
            title: elements.berryTitle.value,
            amount: elements.berryAmount.value,
            category: elements.berryCategory.value,
            date: elements.berryDate.value,
            repeat: elements.berryRepeat?.value || "none",
            note: elements.berryNote.value,
          };
      closeToolModal(elements.berryModal);
    } else {
      state.openId = null;
      state.draft = null;
    }
  } else if (view === "watchtower") {
    state.filter = selectedSignalFilter;
    if (isToolModalOpen(elements.signalModal)) {
      state.openId = selectedSignalId;
      state.draft = selectedSignalId
        ? null
        : {
            title: elements.signalTitle.value,
            kind: elements.signalKind.value,
            due: elements.signalDue.value,
            repeat: elements.signalRepeat.value,
            note: elements.signalNote.value,
            sound: elements.signalSound.checked,
            enabled: elements.signalEnabled.checked,
            snooze: elements.signalSnooze.value,
          };
      closeToolModal(elements.signalModal);
    } else {
      state.openId = null;
      state.draft = null;
    }
  }

  persistViewState();
}

async function restoreView(view, { fromRoute = false, noteId = null } = {}) {
  const state = viewState[view] || {};
  elements.search.value = state.search || "";

  if (view === "overview") {
    elements.search.placeholder = "Search deck & tools...";
    elements.headerStatus.textContent = captainProfile
      ? `${captainProfile.league} · ${captainProfile.points} pts`
      : "Captain's deck";
    await loadOverview();
  } else if (view === "profile") {
    elements.search.placeholder = "Search challenges & crew...";
    await loadCaptainProfile();
    elements.headerStatus.textContent = captainProfile?.shareId || "Captain profile";
    if (state.formOpen) showProfileForm();
  } else if (view === "notes") {
    elements.search.placeholder = "Search the Grand Line...";
    selectedTag = state.selectedTag || "";
    if (state.editorMode) setEditorMode(state.editorMode);
    setPreviewReaderWidth(Boolean(state.readerWidth));
    await loadNotes();

    const resumeId = fromRoute && noteId ? noteId : state.editing ? state.noteId : null;
    const resumeEditing = Boolean((fromRoute && noteId) || state.editing);
    if (resumeEditing) {
      if (resumeId) {
        await openNote(resumeId);
      } else if (state.draft) {
        fillEditor({
          id: null,
          title: state.draft.title || "",
          tags: String(state.draft.tags || "").split(",").map((t) => t.trim()).filter(Boolean),
          content: state.draft.content || "",
        });
        elements.app.classList.add("editing");
      } else {
        elements.app.classList.add("editing");
      }
      setPreviewToc(Boolean(state.tocOpen));
    }
  } else if (view === "vault") {
    elements.search.placeholder = "Search vault...";
    await loadVault();
    if (state.openId) {
      const entry = vaultEntries.find((item) => item.id === state.openId)
        || await api(`/api/vault/${state.openId}`).catch(() => null);
      if (entry) showVaultForm(entry);
    } else if (state.draft) {
      showVaultForm();
      elements.vaultTitle.value = state.draft.label || "";
      elements.vaultUsername.value = state.draft.username || "";
      elements.vaultPassword.value = state.draft.password || "";
      if (elements.vaultUrl) elements.vaultUrl.value = state.draft.url || "";
      if (elements.vaultNotes) elements.vaultNotes.value = state.draft.notes || "";
      setVaultIconValue(state.draft.icon || "");
    }
  } else if (view === "quests") {
    elements.search.placeholder = "Search quests...";
    selectedQuestLevel = state.level || "";
    expandedQuestIds = new Set(state.expanded || []);
    await loadQuests();
    if (state.openId) {
      const quest = quests.find((item) => item.id === state.openId);
      if (quest) showQuestForm(quest);
    }
  } else if (view === "charts") {
    elements.search.placeholder = "Search charts...";
    await loadCharts();
    if (state.openId) {
      const item = bookmarks.find((entry) => entry.id === state.openId);
      if (item) showChartForm(item);
    } else if (state.draft) {
      showChartForm();
      elements.chartsTitle.value = state.draft.title || "";
      elements.chartsUrl.value = state.draft.url || "";
      elements.chartsTags.value = state.draft.tags || "";
      elements.chartsNotes.value = state.draft.notes || "";
    }
  } else if (view === "snippets") {
    elements.search.placeholder = "Search snippets...";
    await loadSnippets();
    if (state.openId) {
      const item = snippets.find((entry) => entry.id === state.openId);
      if (item) showSnippetForm(item);
    } else if (state.draft) {
      showSnippetForm();
      elements.snippetTitle.value = state.draft.title || "";
      elements.snippetLanguage.value = state.draft.language || "text";
      elements.snippetTags.value = state.draft.tags || "";
      elements.snippetCode.value = state.draft.code || "";
    }
  } else if (view === "berries") {
    elements.search.placeholder = "Search income & expenses...";
    selectedBerryCategory = state.category || "";
    selectedBerryFlow = state.flow || "all";
    await loadBerries();
    if (state.openId) {
      const item = expenses.find((entry) => entry.id === state.openId);
      if (item) showBerryForm(item);
    } else if (state.draft) {
      showBerryForm();
      elements.berryFlow.value = state.draft.flow || "expense";
      syncBerryCategoryOptions(state.draft.category || "");
      elements.berryTitle.value = state.draft.title || "";
      elements.berryAmount.value = state.draft.amount || "";
      elements.berryDate.value = state.draft.date || "";
      if (elements.berryRepeat) elements.berryRepeat.value = state.draft.repeat || "none";
      elements.berryNote.value = state.draft.note || "";
      updateBerryRepeatHint();
      updateBerryFormChrome();
    }
  } else if (view === "watchtower") {
    elements.search.placeholder = "Search reminders & alarms...";
    selectedSignalFilter = state.filter || "all";
    await loadSignals();
    if (state.openId) {
      const item = signals.find((entry) => entry.id === state.openId);
      if (item) showSignalForm(item);
    } else if (state.draft) {
      showSignalForm();
      elements.signalTitle.value = state.draft.title || "";
      elements.signalKind.value = state.draft.kind || "reminder";
      elements.signalDue.value = state.draft.due || "";
      elements.signalRepeat.value = state.draft.repeat || "none";
      elements.signalNote.value = state.draft.note || "";
      elements.signalSound.checked = Boolean(state.draft.sound);
      elements.signalEnabled.checked = state.draft.enabled !== false;
      elements.signalSnooze.value = state.draft.snooze || 5;
      syncVoyageClock(false);
    }
  } else if (view === "focus") {
    elements.search.placeholder = "Search session log...";
    await loadFocus();
  }
}

async function applyAppRoute({ push = false } = {}) {
  const { view, noteId } = parseAppRoute();
  applyingRoute = true;
  try {
    await setView(view, { fromRoute: true, noteId });
  } catch (error) {
    showToast(error.message, "error");
    await setView("overview", { fromRoute: true });
    syncAppRoute({ push: false });
  } finally {
    applyingRoute = false;
    syncAppRoute({ push });
  }
}

const PROFILE_AVATARS = [
  "/assets/crew-captain.png?v=2",
  "/assets/crew-swordsman.png?v=2",
  "/assets/crew-navigator.png?v=2",
  "/assets/crew-cook.png?v=2",
  "/assets/jolly-roger.png?v=2",
  "/assets/ship-hero.png?v=2",
];

const CREW_TOOLS = [
  { view: "overview", role: "Captain", name: "Overview", img: "/assets/crew-captain.png?v=2", desc: "Captain's deck & stats" },
  { view: "profile", role: "Wanted", name: "Captain", img: "/assets/crew-captain.png?v=2", desc: "Rank, friends & challenges" },
  { view: "notes", role: "Chronicler", name: "Logbook", img: "/assets/crew-captain.png?v=2", desc: "Markdown voyage logs" },
  { view: "vault", role: "Treasurer", name: "Vault", img: "/assets/jolly-roger.png", desc: "Encrypted secrets" },
  { view: "quests", role: "Swordsman", name: "Quests", img: "/assets/crew-swordsman.png?v=2", desc: "Todo bounties" },
  { view: "charts", role: "Navigator", name: "Sea charts", img: "/assets/crew-navigator.png?v=2", desc: "Bookmark library" },
  { view: "snippets", role: "Shipwright", name: "Snippets", img: "/assets/crew-navigator.png?v=2", desc: "Code stash" },
  { view: "berries", role: "Cook", name: "Berry pouch", img: "/assets/crew-cook.png?v=2", desc: "Income & expense ledger" },
  { view: "watchtower", role: "Lookout", name: "Watchtower", img: "/assets/ship-hero.png?v=2", desc: "Reminders & alarms" },
  { view: "focus", role: "Gear Second", name: "Focus timer", img: "/assets/ship-hero.png", desc: "Pomodoro voyages" },
];

let currentView = "overview";
let captainProfile = null;
let notes = [];
let vaultEntries = [];
let quests = [];
let selectedQuestId = null;
let selectedQuestLevel = "";
let expandedQuestIds = new Set();
let bookmarks = [];
let snippets = [];
let expenses = [];
let focusSessions = [];
let signals = [];
let selectedSignalId = null;
let selectedSignalFilter = "all";
let signalCheckTimer = null;
let alarmAudioCtx = null;
let alarmOscTimer = null;
let firingSignalIds = new Set();
let currentId = null;
let selectedVaultId = null;
let selectedChartId = null;
let selectedSnippetId = null;
let selectedBerryId = null;
let selectedBerryCategory = "";
let selectedBerryFlow = "all";
let selectedTag = "";
let editorMode = window.matchMedia("(min-width: 1024px)").matches ? "split" : "write";
let searchTimer;
let previewTimer;
let previewFullscreen = false;
let previewTocOpen = false;
let previewReaderWidth = false;
let modeBeforeFullscreen = "split";
let autosaveTimer;
let changed = false;
let editVersion = 0;
let savePromise = null;
let paletteResults = [];
let paletteIndex = 0;
let paletteTimer;

const focusTimer = {
  status: "idle",
  totalSeconds: 25 * 60,
  remainingSeconds: 25 * 60,
  minutes: 25,
  kind: "focus",
  label: "Focus voyage",
  tickId: null,
};

if (window.marked?.use) {
  const escapeAttr = (value) => String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;");

  window.marked.use({
    gfm: true,
    breaks: true,
    html: true,
    renderer: {
      code({ text, lang }) {
        const language = lang && window.hljs?.getLanguage?.(lang) ? lang : "";
        const highlighted = window.hljs
          ? (language
            ? window.hljs.highlight(text, { language }).value
            : window.hljs.highlightAuto(text).value)
          : escapeAttr(text).replaceAll("\n", "<br>");
        const className = language ? `hljs language-${escapeAttr(language)}` : "hljs";
        return `<pre class="md-code"><code class="${className}">${highlighted}</code></pre>`;
      },
      image({ href, title, text }) {
        const url = String(href || "");
        const safeHref = escapeAttr(url);
        const safeTitle = escapeAttr(title || text || "");
        const safeAlt = escapeAttr(text || "");
        if (/\.(mp4|webm|ogg)(\?|#|$)/i.test(url)) {
          return `<video class="md-video" controls playsinline preload="metadata" src="${safeHref}" title="${safeTitle}"></video>`;
        }
        if (/\.(mp3|wav|m4a|ogg)(\?|#|$)/i.test(url)) {
          return `<audio class="md-audio" controls preload="metadata" src="${safeHref}" title="${safeTitle}"></audio>`;
        }
        const gifClass = /\.gif(\?|#|$)/i.test(url) ? " md-gif" : "";
        return `<img class="md-image${gifClass}" src="${safeHref}" alt="${safeAlt}" title="${safeTitle}" loading="lazy">`;
      },
    },
  });
}

function extractYouTubeId(value) {
  const raw = String(value || "").trim();
  if (/^[\w-]{11}$/.test(raw)) return raw;
  const match = raw.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/i);
  return match ? match[1] : null;
}

function extractVimeoId(value) {
  const raw = String(value || "").trim();
  if (/^\d+$/.test(raw)) return raw;
  const match = raw.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  return match ? match[1] : null;
}

function youtubeEmbedHtml(id) {
  return `<div class="md-embed md-embed-video"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="YouTube video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>`;
}

function vimeoEmbedHtml(id) {
  return `<div class="md-embed md-embed-video"><iframe src="https://player.vimeo.com/video/${id}" title="Vimeo video" loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;
}

function preprocessMarkdownEmbeds(markdown) {
  return String(markdown || "")
    .replace(/@\[youtube\]\(([^)\n]+)\)/gi, (_, ref) => {
      const id = extractYouTubeId(ref);
      return id ? `\n\n${youtubeEmbedHtml(id)}\n\n` : _;
    })
    .replace(/@\[vimeo\]\(([^)\n]+)\)/gi, (_, ref) => {
      const id = extractVimeoId(ref);
      return id ? `\n\n${vimeoEmbedHtml(id)}\n\n` : _;
    });
}

function embedStandaloneMediaLinks(html) {
  return String(html || "")
    .replace(/<p>\s*<a href="(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?[^"]+|youtu\.be\/[^"]+|youtube\.com\/(?:shorts|embed|live)\/[^"]+))"[^>]*>[\s\S]*?<\/a>\s*<\/p>/gi, (full, url) => {
      const id = extractYouTubeId(url);
      return id ? youtubeEmbedHtml(id) : full;
    })
    .replace(/<p>\s*<a href="(https?:\/\/(?:www\.)?vimeo\.com\/[^"]+)"[^>]*>[\s\S]*?<\/a>\s*<\/p>/gi, (full, url) => {
      const id = extractVimeoId(url);
      return id ? vimeoEmbedHtml(id) : full;
    });
}

function configureDomPurify() {
  if (!window.DOMPurify || window.DOMPurify.__grandLineConfigured) return;
  window.DOMPurify.__grandLineConfigured = true;
  window.DOMPurify.addHook("uponSanitizeElement", (node, data) => {
    if (data.tagName !== "iframe") return;
    const src = node.getAttribute("src") || "";
    const ok = /^https:\/\/(www\.)?(youtube-nocookie\.com|youtube\.com|player\.vimeo\.com)\//i.test(src);
    if (!ok) node.remove();
  });
}

function renderMarkdownLive(markdown) {
  configureDomPurify();
  const raw = String(markdown || "").trim();
  if (!raw) return '<p class="preview-placeholder">Live preview — start writing Markdown…</p>';
  const prepared = preprocessMarkdownEmbeds(raw);
  const parsed = window.marked.parse(prepared);
  const withEmbeds = embedStandaloneMediaLinks(parsed);
  return window.DOMPurify.sanitize(withEmbeds, {
    ADD_TAGS: ["iframe", "video", "audio", "source"],
    ADD_ATTR: [
      "allow", "allowfullscreen", "frameborder", "referrerpolicy", "loading",
      "controls", "playsinline", "preload", "autoplay", "loop", "muted",
      "target", "rel", "class", "title",
    ],
  });
}

async function api(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  if (response.status === 401 && !url.startsWith("/api/auth/") && url !== "/api/session") {
    window.location.href = "/login";
    throw new Error("Session expired");
  }
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || "Request failed");
  }
  if (response.status === 204) return null;
  return response.json();
}

function syncModalBodyLock() {
  const open = [...document.querySelectorAll(".tool-modal")].some((modal) => !modal.hidden);
  document.body.classList.toggle("modal-open", open);
}

function openToolModal(modal) {
  if (!modal) return;
  if (modal.parentElement !== document.body) {
    document.body.appendChild(modal);
  }
  modal.hidden = false;
  syncModalBodyLock();
}

function closeToolModal(modal) {
  if (!modal) return;
  modal.hidden = true;
  syncModalBodyLock();
}

function isToolModalOpen(modal) {
  return Boolean(modal && !modal.hidden);
}

/** Keep tool modals outside overflow/stacking traps (header + tool-view). */
function mountToolModalsToBody() {
  document.querySelectorAll(".tool-modal").forEach((modal) => {
    if (modal.parentElement !== document.body) {
      document.body.appendChild(modal);
    }
  });
}

mountToolModalsToBody();

function showApp() {
  elements.app.hidden = false;
  elements.focusWidget.hidden = false;
  loadCaptainProfile().catch(() => {});
}

const TOAST_ICONS = {
  info: "op-flag",
  success: "op-sun",
  error: "op-skull",
  danger: "op-skull",
  warn: "op-compass",
};

const ALERT_ICONS = {
  info: "op-flag",
  success: "op-sun",
  error: "op-skull",
  danger: "op-skull",
  warn: "op-compass",
  confirm: "op-wanted",
};

let toastTimer;
let voyageAlertResolver = null;

function showToast(message, type = "info") {
  const tone = TOAST_ICONS[type] ? type : "info";
  clearTimeout(toastTimer);
  elements.toast.classList.remove("success", "error", "danger", "warn", "info");
  elements.toast.classList.add(tone);
  const use = elements.toast.querySelector("use");
  if (use) use.setAttribute("href", `#${TOAST_ICONS[tone]}`);
  if (elements.toastMessage) elements.toastMessage.textContent = message;
  else elements.toast.textContent = message;
  elements.toast.hidden = false;
  toastTimer = setTimeout(() => { elements.toast.hidden = true; }, 2600);
}

function closeVoyageAlert(result = false) {
  if (!elements.voyageAlert || elements.voyageAlert.hidden) return;
  elements.voyageAlert.hidden = true;
  document.body.classList.remove("voyage-alert-open");
  const resolve = voyageAlertResolver;
  voyageAlertResolver = null;
  if (resolve) resolve(result);
}

function openVoyageAlert({
  title = "Ahoy",
  message = "",
  mode = "confirm",
  tone = "confirm",
  confirmLabel = "Aye",
  cancelLabel = "Nay",
  banner = mode === "confirm" ? "WANTED · DECIDE" : "WANTED · NOTICE",
} = {}) {
  return new Promise((resolve) => {
    if (voyageAlertResolver) closeVoyageAlert(false);
    voyageAlertResolver = resolve;

    const kind = ALERT_ICONS[tone] ? tone : mode === "confirm" ? "confirm" : "info";
    elements.voyageAlert.classList.remove("success", "error", "danger", "warn", "info", "confirm");
    elements.voyageAlert.classList.add(kind === "confirm" ? "danger" : kind);
    elements.voyageAlert.dataset.mode = mode;
    elements.voyageAlertBanner.textContent = banner;
    elements.voyageAlertTitle.textContent = title;
    elements.voyageAlertMessage.textContent = message;
    elements.voyageAlertConfirm.textContent = confirmLabel;
    elements.voyageAlertCancel.textContent = cancelLabel;
    if (elements.voyageAlertIconUse) {
      elements.voyageAlertIconUse.setAttribute("href", `#${ALERT_ICONS[kind] || "op-skull"}`);
    }
    elements.voyageAlert.hidden = false;
    document.body.classList.add("voyage-alert-open");
    elements.voyageAlertConfirm.focus();
  });
}

function showAlert(message, options = {}) {
  const text = typeof message === "string" ? message : options.message || "";
  return openVoyageAlert({
    mode: "alert",
    title: options.title || "Ship notice",
    message: text,
    tone: options.tone || "info",
    confirmLabel: options.confirmLabel || "Aye",
    banner: options.banner || "WANTED · NOTICE",
  });
}

function showConfirm(message, options = {}) {
  const text = typeof message === "string" ? message : options.message || "";
  return openVoyageAlert({
    mode: "confirm",
    title: options.title || "Confirm course",
    message: text,
    tone: options.tone || "danger",
    confirmLabel: options.confirmLabel || "Aye",
    cancelLabel: options.cancelLabel || "Nay",
    banner: options.banner || "WANTED · DECIDE",
  });
}

function goToLogin() {
  window.location.href = "/";
}

function openSidebar() {
  elements.sidebar.classList.add("open");
  elements.sidebarBackdrop.hidden = false;
}

function closeSidebar() {
  elements.sidebar.classList.remove("open");
  elements.sidebarBackdrop.hidden = true;
}

function countPreviewStats(markdown) {
  const text = String(markdown || "").trim();
  if (!text) return { words: 0, minutes: 0 };
  const words = text.split(/\s+/).filter(Boolean).length;
  return { words, minutes: Math.max(1, Math.ceil(words / 200)) };
}

function slugifyHeading(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 64) || "section";
}

function enhancePreviewDocument() {
  const headings = [...elements.preview.querySelectorAll("h1, h2, h3")];
  const used = new Set();
  elements.previewToc.replaceChildren();

  for (const heading of headings) {
    let id = slugifyHeading(heading.textContent);
    let n = 1;
    while (used.has(id)) {
      n += 1;
      id = `${slugifyHeading(heading.textContent)}-${n}`;
    }
    used.add(id);
    heading.id = id;

    const link = document.createElement("button");
    link.type = "button";
    link.className = `preview-toc-link level-${heading.tagName.toLowerCase()}`;
    link.textContent = heading.textContent;
    link.addEventListener("click", () => {
      heading.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    elements.previewToc.append(link);
  }

  elements.previewTocBtn.hidden = headings.length < 2;
  if (headings.length < 2) {
    previewTocOpen = false;
    elements.previewToc.hidden = true;
    elements.previewTocBtn.setAttribute("aria-pressed", "false");
    elements.previewPane.classList.remove("toc-open");
  }

  elements.preview.querySelectorAll("img.md-image, img").forEach((img) => {
    if (img.closest("a")) return;
    img.classList.add("preview-zoomable");
    img.addEventListener("click", () => openPreviewLightbox(img.src, img.alt || "Preview image"));
  });

  elements.preview.querySelectorAll("a[href]").forEach((anchor) => {
    const href = anchor.getAttribute("href") || "";
    if (/^https?:\/\//i.test(href)) {
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
    }
  });
}

function updatePreviewChrome() {
  const { words, minutes } = countPreviewStats(elements.content.value);
  elements.previewMeta.textContent = words
    ? `${words}w · ${minutes}m`
    : "";
  const fullBtn = elements.previewFullscreenBtn;
  const fullIcon = document.querySelector("#preview-fullscreen-icon");
  fullBtn.setAttribute("aria-pressed", String(previewFullscreen));
  fullBtn.setAttribute("aria-label", previewFullscreen ? "Exit fullscreen" : "Fullscreen");
  fullBtn.title = previewFullscreen ? "Exit fullscreen (F)" : "Fullscreen (F)";
  if (fullIcon) fullIcon.setAttribute("href", previewFullscreen ? "#ui-compress" : "#ui-expand");
  elements.previewWidthBtn.setAttribute("aria-pressed", String(previewReaderWidth));
  elements.previewTocBtn.setAttribute("aria-pressed", String(previewTocOpen));
}

function updateLivePreview() {
  elements.preview.innerHTML = renderMarkdownLive(elements.content.value);
  enhancePreviewDocument();
  updatePreviewChrome();
}

function scheduleLivePreview() {
  clearTimeout(previewTimer);
  previewTimer = setTimeout(updateLivePreview, 80);
}

function setPreviewToc(open) {
  previewTocOpen = Boolean(open) && !elements.previewTocBtn.hidden;
  elements.previewToc.hidden = !previewTocOpen;
  elements.previewPane.classList.toggle("toc-open", previewTocOpen);
  updatePreviewChrome();
}

function setPreviewReaderWidth(on) {
  previewReaderWidth = Boolean(on);
  elements.previewPane.classList.toggle("reader-width", previewReaderWidth);
  updatePreviewChrome();
}

function setPreviewFullscreen(on) {
  const next = Boolean(on);
  if (next === previewFullscreen) {
    updatePreviewChrome();
    return;
  }

  if (next) {
    modeBeforeFullscreen = editorMode;
    previewFullscreen = true;
    document.body.classList.add("preview-fullscreen-active");
    elements.app.classList.add("preview-fullscreen");
    setEditorMode("preview");
    if (!previewReaderWidth) setPreviewReaderWidth(true);
  } else {
    previewFullscreen = false;
    document.body.classList.remove("preview-fullscreen-active");
    elements.app.classList.remove("preview-fullscreen");
    setEditorMode(modeBeforeFullscreen || "split");
  }
  updatePreviewChrome();
}

function openPreviewLightbox(src, alt = "") {
  elements.previewLightboxImage.src = src;
  elements.previewLightboxImage.alt = alt;
  elements.previewLightbox.hidden = false;
  document.body.classList.add("lightbox-open");
}

function closePreviewLightbox() {
  elements.previewLightbox.hidden = true;
  elements.previewLightboxImage.removeAttribute("src");
  document.body.classList.remove("lightbox-open");
}

function setEditorMode(mode) {
  editorMode = mode;
  const split = elements.editorSplit;
  split.classList.remove("write-only", "preview-only", "split-mode");
  if (mode === "write") split.classList.add("write-only");
  if (mode === "preview") split.classList.add("preview-only");
  if (mode === "split") split.classList.add("split-mode");

  for (const [tab, name] of [
    [elements.writeTab, "write"],
    [elements.splitTab, "split"],
    [elements.previewTab, "preview"],
  ]) {
    const active = name === mode;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  }
  updateLivePreview();
}

function insertMarkdown(snippet) {
  const area = elements.content;
  const start = area.selectionStart;
  const end = area.selectionEnd;
  const selected = area.value.slice(start, end);
  const map = {
    bold: [`**${selected || "bold"}**`, selected ? 0 : 2],
    italic: [`*${selected || "italic"}*`, selected ? 0 : 1],
    h2: [`## ${selected || "Heading"}`, 0],
    ul: [`- ${selected || "item"}`, 0],
    ol: [`1. ${selected || "item"}`, 0],
    check: [`- [ ] ${selected || "task"}`, 0],
    code: selected.includes("\n")
      ? [`\`\`\`\n${selected || "code"}\n\`\`\``, 0]
      : [`\`${selected || "code"}\``, selected ? 0 : 1],
    link: [`[${selected || "label"}](https://)`, selected ? 0 : 1],
    image: [`![${selected || "alt text"}](https://example.com/image.gif)`, 0],
    youtube: [`@[youtube](${selected || "https://youtu.be/dQw4w9WgXcQ"})`, 0],
    table: ["| Column | Column |\n| --- | --- |\n| Cell | Cell |", 0],
    quote: [`> ${selected || "quote"}`, 0],
  };
  const [text] = map[snippet] || [selected, 0];
  area.setRangeText(text, start, end, "end");
  area.focus();
  scheduleAutosave();
  scheduleLivePreview();
}

function formatTimer(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function updateFocusUI() {
  const time = formatTimer(focusTimer.remainingSeconds);
  const running = focusTimer.status === "running";
  const paused = focusTimer.status === "paused";
  const stateLabel = running ? "Running" : paused ? "Paused" : "Idle";

  elements.focusDisplay.textContent = time;
  elements.focusLabel.textContent = focusTimer.label;
  elements.focusStart.hidden = running;
  const heroStart = document.querySelector("#focus-hero-start");
  if (heroStart) heroStart.hidden = running;
  elements.focusPause.hidden = !running;
  elements.focusWidgetTime.textContent = time;
  elements.focusWidgetDisplay.textContent = time;
  elements.focusWidgetState.textContent = stateLabel;
  elements.focusWidgetStart.hidden = running;
  elements.focusWidgetPause.hidden = !running;
  elements.focusWidget.classList.toggle("running", running);
  elements.focusWidget.classList.toggle("paused", paused);

  document.querySelectorAll(".focus-preset").forEach((btn) => {
    btn.classList.toggle("active", Number(btn.dataset.minutes) === focusTimer.minutes && btn.dataset.kind === focusTimer.kind);
  });
}

function selectFocusPreset(minutes, kind, label) {
  if (focusTimer.status === "running") return;
  focusTimer.minutes = minutes;
  focusTimer.kind = kind;
  focusTimer.label = label;
  focusTimer.totalSeconds = minutes * 60;
  focusTimer.remainingSeconds = minutes * 60;
  focusTimer.status = "idle";
  updateFocusUI();
}

function startFocusTimer() {
  if (focusTimer.status === "running") return;
  focusTimer.status = "running";
  updateFocusUI();
  clearInterval(focusTimer.tickId);
  focusTimer.tickId = setInterval(() => {
    focusTimer.remainingSeconds -= 1;
    updateFocusUI();
    if (focusTimer.remainingSeconds <= 0) {
      clearInterval(focusTimer.tickId);
      focusTimer.tickId = null;
      focusTimer.status = "idle";
      completeFocusSession();
    }
  }, 1000);
}

function pauseFocusTimer() {
  if (focusTimer.status !== "running") return;
  clearInterval(focusTimer.tickId);
  focusTimer.tickId = null;
  focusTimer.status = "paused";
  updateFocusUI();
}

function resetFocusTimer() {
  clearInterval(focusTimer.tickId);
  focusTimer.tickId = null;
  focusTimer.status = "idle";
  focusTimer.remainingSeconds = focusTimer.totalSeconds;
  updateFocusUI();
}

async function completeFocusSession() {
  try {
    await api("/api/focus", {
      method: "POST",
      body: JSON.stringify({
        kind: focusTimer.kind,
        minutes: focusTimer.minutes,
        label: focusTimer.label,
      }),
    });
    showToast(`${focusTimer.label} complete — logged!`, "success");
    if (currentView === "focus") await loadFocus();
    if (currentView === "overview") await loadOverview();
    if (currentView === "profile" || captainProfile) await loadCaptainProfile().catch(() => {});
  } catch (error) {
    showToast(error.message, "error");
  }
  focusTimer.remainingSeconds = focusTimer.totalSeconds;
  updateFocusUI();
}

function applyHeaderProfile(profile) {
  if (!profile) return;
  elements.headerAvatar.src = profile.avatarUrl || "/assets/crew-captain.png?v=2";
  elements.headerHello.textContent = `Hello, ${profile.username || "Captain"}!`;
}

function linksToTextarea(links = []) {
  return links.map((link) => `${link.label} | ${link.url}`).join("\n");
}

function linksFromTextarea(value) {
  return String(value || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...rest] = line.split("|");
      const url = rest.join("|").trim() || label.trim();
      return { label: (rest.length ? label : "Link").trim(), url };
    });
}

function hideProfileForm() {
  closeToolModal(elements.profileModal);
}

function showProfileForm() {
  const profile = captainProfile || {};
  elements.profileEditUsername.value = profile.username || "";
  openToolModal(elements.profileModal);
  elements.profileEditUsername.focus();
}

function renderProfileAvatarPicks(selected) {
  if (!elements.profileAvatarPicks) return;
  elements.profileAvatarPicks.replaceChildren();
  for (const src of PROFILE_AVATARS) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `profile-avatar-pick${src === selected ? " active" : ""}`;
    const img = document.createElement("img");
    img.src = src;
    img.alt = "";
    button.append(img);
    button.addEventListener("click", () => {
      if (elements.profileEditAvatar) elements.profileEditAvatar.value = src;
      renderProfileAvatarPicks(src);
    });
    elements.profileAvatarPicks.append(button);
  }
}

function renderCaptainProfile() {
  const profile = captainProfile;
  if (!profile) return;
  applyHeaderProfile(profile);

  elements.profileAvatar.src = profile.avatarUrl || "/assets/crew-captain.png?v=2";
  elements.profileStatusMessage.textContent = profile.statusMessage || "Set sail!";
  elements.profileUsername.textContent = profile.username || "Captain";
  elements.profileBounty.textContent = profile.bounty
    ? profile.bounty
    : `Bounty ${(profile.points || 0).toLocaleString()} pts · ${profile.league || "Cabin Boy"}`;
  elements.profileTitle.textContent = profile.title || "Rookie pirate";
  elements.profileBio.textContent = profile.bio || "";
  elements.profileLocation.textContent = profile.location || "Unknown seas";
  elements.profileCrew.textContent = profile.favoriteCrew || "Independent";
  elements.profileShareId.textContent = profile.shareId || "CAPT-------";
  elements.profileLeague.textContent = profile.league || "Cabin Boy";
  elements.profileRank.textContent = `Rank ${profile.rank || "E"}`;
  elements.profileRankBar.style.width = `${Math.max(6, profile.progressToNext || 0)}%`;
  elements.profileRankNext.textContent = profile.nextLeague
    ? `${profile.nextLeague} at ${profile.nextLeagueAt} pts`
    : "Top of the Grand Line";
  elements.profilePoints.textContent = String(profile.points || 0);
  elements.profilePointsBreakdown.textContent = `${profile.activity?.questPoints || 0} quests · ${profile.activity?.focusPoints || 0} focus · claims included`;
  elements.profileRecord.textContent = `${profile.activity?.questsCompleted || 0} quests cleared`;
  elements.profileRecordSub.textContent = `${profile.activity?.focusMinutes || 0} focus min · ${profile.friends?.length || 0} friends`;

  elements.profileChallenges.replaceChildren();
  const profileQuery = currentView === "profile" ? elements.search.value.trim().toLowerCase() : "";
  for (const challenge of profile.challenges || []) {
    if (profileQuery && ![challenge.title, challenge.description, challenge.key].join(" ").toLowerCase().includes(profileQuery)) continue;
    const card = document.createElement("article");
    card.className = `challenge-card${challenge.complete ? " complete" : ""}${challenge.claimed ? " claimed" : ""}`;
    card.innerHTML = `
      <div class="challenge-copy">
        <h4>${escapeHtml(challenge.title)}</h4>
        <p>${escapeHtml(challenge.description)}</p>
        <div class="challenge-progress"><span style="width:${challenge.percent}%"></span></div>
        <p class="challenge-meta">${challenge.progress}/${challenge.target} · +${challenge.rewardPoints} pts</p>
      </div>
    `;
    const action = document.createElement("button");
    action.type = "button";
    action.className = challenge.canClaim ? "btn-primary challenge-claim" : "secondary-btn challenge-claim";
    action.textContent = challenge.claimed ? "Claimed" : challenge.canClaim ? "Claim" : "In progress";
    action.disabled = !challenge.canClaim;
    action.addEventListener("click", async () => {
      captainProfile = await api(`/api/profile/challenges/${challenge.key}/claim`, { method: "POST", body: "{}" });
      renderCaptainProfile();
      showToast(`+${challenge.rewardPoints} bounty claimed`, "success");
    });
    card.append(action);
    elements.profileChallenges.append(card);
  }

  elements.friendsList.replaceChildren();
  const friends = (profile.friends || []).filter((friend) => {
    if (!profileQuery) return true;
    return [friend.username, friend.shareId, friend.note].join(" ").toLowerCase().includes(profileQuery);
  });
  elements.friendsEmpty.hidden = friends.length > 0;
  for (const friend of friends) {
    const row = document.createElement("article");
    row.className = "friend-card";
    row.innerHTML = `
      <img class="friend-avatar" src="${escapeHtml(friend.avatarUrl || "/assets/crew-navigator.png?v=2")}" alt="">
      <div class="friend-copy">
        <h4>${escapeHtml(friend.username)}</h4>
        <p class="friend-id">${escapeHtml(friend.shareId)}</p>
        <p class="friend-note">${escapeHtml(friend.note || "Crew ally")}</p>
      </div>
    `;
    row.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      openCaptainModal(friend.shareId);
    });
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "danger-text";
    remove.textContent = "Remove";
    remove.addEventListener("click", async () => {
      if (!(await showConfirm(`Remove ${friend.username} from your crew list?`, {
        title: "Cut the rope?",
        confirmLabel: "Remove",
        cancelLabel: "Keep",
        tone: "danger",
      }))) return;
      captainProfile = await api(`/api/profile/friends/${friend.id}`, { method: "DELETE" });
      renderCaptainProfile();
      showToast("Friend removed", "warn");
    });
    row.append(remove);
    elements.friendsList.append(row);
  }

  elements.profileLinks.replaceChildren();
  const links = (profile.links || []).filter((link) => {
    if (!profileQuery) return true;
    return [link.label, link.url].join(" ").toLowerCase().includes(profileQuery);
  });
  elements.profileLinksEmpty.hidden = links.length > 0;
  for (const link of links) {
    const anchor = document.createElement("a");
    anchor.className = "profile-link-chip";
    anchor.href = link.url;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.textContent = link.label || link.url;
    elements.profileLinks.append(anchor);
  }
}

function captainCardHtml(card, { compact = false } = {}) {
  const bounty = card.bounty || `${(card.points || 0).toLocaleString()} pts · ${card.league || "Cabin Boy"}`;
  return `
    <div class="captain-card-inner${compact ? " compact" : ""}">
      <p class="wanted-kicker">WANTED</p>
      <img class="captain-card-avatar" src="${escapeHtml(card.avatarUrl || "/assets/crew-captain.png?v=2")}" alt="">
      <h4 class="captain-card-name">${escapeHtml(card.username || "Captain")}</h4>
      <p class="captain-card-bounty">${escapeHtml(bounty)}</p>
      <p class="captain-card-title">${escapeHtml(card.title || "Rookie pirate")}</p>
      ${compact ? "" : `<p class="captain-card-bio">${escapeHtml(card.bio || "")}</p>`}
      <p class="captain-card-meta">${escapeHtml(card.location || "Unknown seas")} · ${escapeHtml(card.favoriteCrew || "Independent")}</p>
      <p class="captain-card-id">${escapeHtml(card.shareId || "")}</p>
    </div>
  `;
}

function renderDiscoverCaptains(captains = []) {
  elements.discoverList.replaceChildren();
  elements.discoverEmpty.hidden = captains.length > 0;
  for (const card of captains) {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "discover-card parchment-card";
    tile.innerHTML = captainCardHtml(card, { compact: true });
    tile.addEventListener("click", () => openCaptainModal(card.shareId));
    elements.discoverList.append(tile);
  }
}

async function loadDiscoverCaptains(query = "") {
  const payload = await api(`/api/profile/discover?q=${encodeURIComponent(query.trim())}`);
  renderDiscoverCaptains(payload.captains || []);
  return payload.captains || [];
}

async function previewFriendCaptain() {
  const shareId = elements.friendShareId.value.trim().toUpperCase();
  if (!/^CAPT-[A-Z0-9]{6}$/.test(shareId)) {
    elements.friendPreview.hidden = true;
    showToast("Enter a Captain ID like CAPT-ABC123", "warn");
    return null;
  }
  try {
    const card = await api(`/api/captains/${encodeURIComponent(shareId)}`);
    elements.friendPreview.hidden = false;
    elements.friendPreview.innerHTML = captainCardHtml(card, { compact: true });
    if (!elements.friendUsername.value.trim()) {
      elements.friendUsername.value = card.username || "";
    }
    return card;
  } catch {
    elements.friendPreview.hidden = true;
    showToast("Captain not found on this ship", "warn");
    return null;
  }
}

function closeCaptainModal() {
  elements.captainModal.hidden = true;
}

async function openCaptainModal(shareId) {
  try {
    const card = await api(`/api/captains/${encodeURIComponent(String(shareId || "").trim().toUpperCase())}`);
    elements.captainModalCard.innerHTML = `
      ${captainCardHtml(card)}
      <div class="captain-modal-actions">
        <button type="button" class="secondary-btn" data-close-modal="captain">Close</button>
        <button type="button" class="btn-primary" id="captain-add-friend">Add to crew</button>
      </div>
    `;
    elements.captainModal.hidden = false;
    elements.captainModalCard.querySelector("#captain-add-friend")?.addEventListener("click", async () => {
      captainProfile = await api("/api/profile/friends", {
        method: "POST",
        body: JSON.stringify({ shareId: card.shareId, username: card.username }),
      });
      closeCaptainModal();
      renderCaptainProfile();
      showToast("Friend added", "success");
    });
  } catch {
    showToast("Could not load captain poster", "warn");
  }
}

async function loadCaptainProfile() {
  captainProfile = await api("/api/profile");
  renderCaptainProfile();
  loadDiscoverCaptains(elements.discoverQuery?.value || "").catch(() => {});
  return captainProfile;
}

async function setView(view, { fromRoute = false, noteId = null } = {}) {
  if (!VIEWS.includes(view)) return;

  if (currentView !== view) {
    await snapshotView(currentView);
  } else if (fromRoute && view === "notes" && noteId) {
    /* same view, deep-link into a note */
  } else if (!fromRoute) {
    return;
  }

  currentView = view;
  closeSidebar();

  for (const name of VIEWS) {
    const panel = document.querySelector(`#view-${name}`);
    if (panel) panel.hidden = name !== view;
  }

  document.querySelectorAll(".nav-item[data-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === view);
  });

  elements.notesSidebarExtras.hidden = view !== "notes";
  elements.searchShell.hidden = false;
  elements.searchShell.style.visibility = "visible";

  await restoreView(view, { fromRoute, noteId });

  if (!fromRoute && !applyingRoute) syncAppRoute({ push: true });
  else if (!applyingRoute) syncAppRoute({ push: false });
}

function makeWantedStrip(label, iconId = "op-skull") {
  const strip = document.createElement("span");
  strip.className = "card-wanted-strip";
  strip.setAttribute("aria-hidden", "true");
  strip.append(opSvg(iconId, "op-ico"), document.createTextNode(` ${label} `), opSvg("op-xmark", "op-ico"));
  return strip;
}

async function loadOverview() {
  const [stats] = await Promise.all([
    api("/api/stats"),
    loadCaptainProfile().catch(() => null),
  ]);
  const query = elements.search.value.trim().toLowerCase();
  elements.overviewStats.replaceChildren();
  const cards = [
    { label: "Bounty points", value: captainProfile?.points ?? 0, view: "profile", action: "Captain profile", icon: "op-wanted" },
    { label: "League", value: captainProfile?.league || "Cabin Boy", view: "profile", action: "View rank", icon: "op-hat" },
    { label: "Notes", value: stats.notes, view: "notes", action: "Open logbook", icon: "op-quill" },
    { label: "Vault secrets", value: stats.vault, view: "vault", action: "Open vault", icon: "op-chest" },
    { label: "Open quests", value: stats.questsOpen, view: "quests", action: "View quests", icon: "op-sword" },
    { label: "Sea charts", value: stats.bookmarks, view: "charts", action: "View charts", icon: "op-map" },
    { label: "Snippets", value: stats.snippets, view: "snippets", action: "View snippets", icon: "op-hammer" },
    { label: "Month balance", value: `${stats.monthBalance ?? (Number(stats.monthIncome || 0) - Number(stats.monthSpend || 0))} ₿`, view: "berries", action: "Berry pouch", icon: "op-berry" },
    { label: "Month income", value: `${stats.monthIncome ?? 0} ₿`, view: "berries", action: "Berry pouch", icon: "op-chest" },
    { label: "Month spend", value: `${stats.monthSpend} ₿`, view: "berries", action: "Berry pouch", icon: "op-berry" },
    { label: "Watchtower", value: stats.signalsUpcoming ?? 0, view: "watchtower", action: "Upcoming bells", icon: "op-compass" },
    { label: "Focus minutes", value: stats.focusMinutes, view: "focus", action: "Gear Second", icon: "op-bolt" },
    { label: "Focus sessions", value: stats.focusSessions, view: "focus", action: "Session log", icon: "op-flag" },
  ];
  for (const [index, card] of cards.entries()) {
    if (query && ![card.label, card.value, card.action, card.view].join(" ").toLowerCase().includes(query)) continue;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "stat-card page-card-pad";
    button.style.animationDelay = `${Math.min(index, 8) * 40}ms`;
    button.style.setProperty("--tilt", `${((index % 5) - 2) * 0.4}deg`);
    button.append(makeWantedStrip(card.label.toUpperCase(), card.icon));
    const label = document.createElement("span");
    label.className = "stat-label";
    label.append(opSvg(card.icon, "op-ico"), document.createTextNode(` ${card.label}`));
    const value = document.createElement("span");
    value.className = "stat-value";
    value.textContent = card.value;
    const action = document.createElement("span");
    action.className = "stat-action";
    action.textContent = `${card.action} →`;
    button.append(label, value, action);
    button.addEventListener("click", () => setView(card.view));
    elements.overviewStats.append(button);
  }

  elements.crewCards.replaceChildren();
  for (const [index, tool] of CREW_TOOLS.entries()) {
    if (query && ![tool.role, tool.name, tool.desc, tool.view].join(" ").toLowerCase().includes(query)) continue;
    const card = document.createElement("button");
    card.type = "button";
    card.className = "crew-card page-card-pad";
    card.style.animationDelay = `${Math.min(index, 8) * 45}ms`;
    card.append(makeWantedStrip(tool.role.toUpperCase(), "op-flag"));
    card.insertAdjacentHTML("beforeend", `
      <img class="crew-card-portrait" src="${tool.img}" alt="">
      <span class="crew-card-role">${tool.role}</span>
      <span class="crew-card-name">${tool.name}</span>
      <span class="crew-card-desc">${tool.desc}</span>
    `);
    card.addEventListener("click", () => setView(tool.view));
    elements.crewCards.append(card);
  }

  elements.headerStatus.textContent = `${stats.notes} notes · ${stats.bookmarks} charts · ${stats.focusMinutes} focus min`;
}

function plainPreview(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!?(\[[^\]]*\])\([^)]*\)/g, "$1")
    .replace(/[#>*_`~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim() || "Blank page — adventure awaits";
}

function displayDate(isoDate) {
  const date = new Date(isoDate);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return new Intl.DateTimeFormat(undefined, { day: "numeric", month: "long", year: "numeric" }).format(date);
}

function tagColor(tag) {
  let hash = 0;
  for (const char of tag) hash = (hash + char.charCodeAt(0) * 17) % TAG_COLORS.length;
  return TAG_COLORS[hash];
}

function opSvg(iconId, className = "op-ico") {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", className);
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", `#${iconId}`);
  svg.appendChild(use);
  return svg;
}

const LOG_CARD_ICONS = [
  "op-skull", "op-hat", "op-ship", "op-sword", "op-map", "op-meat",
  "op-bolt", "op-fruit", "op-anchor", "op-flag", "op-wave", "op-compass",
  "op-chest", "op-sun", "op-xmark", "op-quill",
];

const TAG_ICONS = {
  adventure: "op-map",
  crew: "op-hat",
  treasure: "op-chest",
  fight: "op-sword",
  food: "op-meat",
  focus: "op-bolt",
  code: "op-hammer",
  sea: "op-wave",
  ship: "op-ship",
  devil: "op-fruit",
};

function tagIcon(tag) {
  const key = String(tag || "").toLowerCase();
  return TAG_ICONS[key] || LOG_CARD_ICONS[Math.abs([...key].reduce((h, c) => h + c.charCodeAt(0), 0)) % LOG_CARD_ICONS.length];
}

function renderNotes() {
  elements.notesList.replaceChildren();
  elements.emptyList.hidden = notes.length > 0;
  elements.notesList.hidden = notes.length === 0;

  const hasFilter = Boolean(elements.search.value.trim() || selectedTag);
  elements.emptyList.querySelector("h2").textContent = hasFilter ? "No matching logs" : "Blank parchment";
  elements.emptyList.querySelector("p").textContent = hasFilter
    ? "Try another search or chart a different route stamp."
    : "No voyage entries yet — dip the quill and start the first page.";
  elements.emptyNewButton.hidden = hasFilter;

  notes.forEach((note, index) => {
    const iconId = LOG_CARD_ICONS[index % LOG_CARD_ICONS.length];
    const accent = index % 3;
    const button = document.createElement("button");
    button.className = `note-item note-page note-accent-${accent}${note.id === currentId ? " active" : ""}`;
    button.type = "button";
    button.dataset.id = note.id;
    button.style.animationDelay = `${Math.min(index, 10) * 55}ms`;
    button.style.setProperty("--tilt", `${((index % 5) - 2) * 0.55}deg`);

    const strip = document.createElement("span");
    strip.className = "note-wanted-strip";
    strip.setAttribute("aria-hidden", "true");
    strip.append(opSvg("op-skull", "op-ico note-strip-ico"), document.createTextNode(" VOYAGE LOG "), opSvg(iconId, "op-ico note-strip-ico"));

    const watermark = document.createElement("span");
    watermark.className = "note-page-art";
    watermark.setAttribute("aria-hidden", "true");
    watermark.append(opSvg(iconId, "note-page-art-svg"));

    const corners = document.createElement("span");
    corners.className = "note-corners";
    corners.setAttribute("aria-hidden", "true");
    corners.append(
      opSvg("op-hat", "note-corner note-corner-tl"),
      opSvg("op-xmark", "note-corner note-corner-br"),
    );

    const masthead = document.createElement("span");
    masthead.className = "note-item-masthead";
    const logBadge = document.createElement("span");
    logBadge.className = "note-log-badge";
    logBadge.append(opSvg("op-flag", "op-ico"), document.createTextNode(` LOG ${String(index + 1).padStart(2, "0")}`));
    const date = document.createElement("span");
    date.className = "note-item-date";
    date.append(opSvg("op-sun", "op-ico"), document.createTextNode(` ${displayDate(note.updatedAt)}`));
    masthead.append(logBadge, date);

    const seal = document.createElement("span");
    seal.className = "note-wax-seal";
    seal.setAttribute("aria-hidden", "true");
    seal.append(opSvg(iconId, "note-seal-svg"));

    const titleRow = document.createElement("span");
    titleRow.className = "note-item-title-row";
    const titleIcon = document.createElement("span");
    titleIcon.className = "note-title-ico";
    titleIcon.setAttribute("aria-hidden", "true");
    titleIcon.append(opSvg(iconId, "op-ico op-ico-lg"));
    const title = document.createElement("span");
    title.className = "note-item-title";
    title.textContent = note.title || "Untitled log";
    titleRow.append(titleIcon, title);

    const preview = document.createElement("span");
    preview.className = "note-item-preview";
    preview.textContent = plainPreview(note.content) || "— empty page waiting for ink —";

    button.append(strip, watermark, corners, masthead, seal, titleRow, preview);

    if (note.tags.length) {
      const tags = document.createElement("span");
      tags.className = "note-item-tags";
      for (const tag of note.tags.slice(0, 3)) {
        const label = document.createElement("span");
        label.className = "note-tag";
        label.style.setProperty("--tag-ink", tagColor(tag));
        label.append(opSvg(tagIcon(tag), "op-ico"), document.createTextNode(` ${tag}`));
        tags.append(label);
      }
      button.append(tags);
    }

    const foot = document.createElement("span");
    foot.className = "note-item-foot";
    const waves = document.createElement("span");
    waves.className = "note-foot-waves";
    waves.setAttribute("aria-hidden", "true");
    waves.append(opSvg("op-wave", "note-wave-svg"), opSvg("op-anchor", "op-ico"));
    const openHint = document.createElement("span");
    openHint.className = "note-open-hint";
    openHint.setAttribute("aria-hidden", "true");
    openHint.append(opSvg("op-quill", "op-ico"), document.createTextNode(" Open page"));
    foot.append(waves, openHint);
    button.append(foot);

    button.addEventListener("click", () => openNote(note.id));
    elements.notesList.append(button);
  });
}

function makeTagFilterButton(tag, className) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `${className}${tag === selectedTag ? " active" : ""}`;
  if (className === "sidebar-tag") {
    const dot = document.createElement("span");
    dot.className = "tag-dot";
    dot.style.background = tag ? tagColor(tag) : "#f5c518";
    const label = document.createElement("span");
    label.textContent = tag || "All logs";
    button.append(dot, label);
  } else {
    button.append(opSvg(tag ? tagIcon(tag) : "op-compass", "op-ico"), document.createTextNode(` ${tag || "All"}`));
  }
  button.addEventListener("click", () => {
    selectedTag = tag;
    closeSidebar();
    loadNotes().catch((error) => showToast(error.message, "error"));
  });
  return button;
}

function renderTagFilters(allNotes) {
  const tags = [...new Set(allNotes.flatMap((note) => note.tags))].sort();
  elements.tagFilters.replaceChildren();
  elements.sidebarTags.replaceChildren();
  for (const tag of ["", ...tags]) elements.tagFilters.append(makeTagFilterButton(tag, "tag-filter"));
  elements.sidebarTagsEmpty.hidden = tags.length > 0;
  for (const tag of tags) elements.sidebarTags.append(makeTagFilterButton(tag, "sidebar-tag"));
}

async function loadNotes() {
  const params = new URLSearchParams();
  if (elements.search.value.trim()) params.set("q", elements.search.value.trim());
  if (selectedTag) params.set("tag", selectedTag);
  notes = await api(`/api/notes?${params}`);
  const allNotes = params.size ? await api("/api/notes") : notes;
  elements.headerStatus.textContent = `${allNotes.length} ${allNotes.length === 1 ? "note" : "notes"}`;
  renderNotes();
  renderTagFilters(allNotes);
}

function hasSomethingToSave() {
  return Boolean(currentId || elements.title.value.trim() || elements.tags.value.trim() || elements.content.value.trim());
}

function fillEditor(note = null) {
  clearTimeout(autosaveTimer);
  currentId = note?.id || null;
  elements.title.value = note?.title || "";
  elements.tags.value = note?.tags.join(", ") || "";
  elements.content.value = note?.content || "";
  elements.deleteButton.hidden = !currentId;
  elements.saveStatus.textContent = currentId ? "Saved" : "New note";
  changed = false;
  editVersion += 1;
  setEditorMode(editorMode === "preview" ? "split" : editorMode);
  updateLivePreview();
  renderNotes();
}

async function finishPendingSave() {
  clearTimeout(autosaveTimer);
  if (changed && hasSomethingToSave()) await saveCurrentNote({ quiet: true });
  if (savePromise) await savePromise;
}

async function beginNewNote() {
  await finishPendingSave();
  fillEditor();
  elements.app.classList.add("editing");
  closeSidebar();
  elements.title.focus();
  viewState.notes.editing = true;
  viewState.notes.noteId = null;
  viewState.notes.draft = null;
  persistViewState();
  if (!applyingRoute) syncAppRoute({ push: true });
}

async function openNote(id) {
  if (id === currentId) {
    elements.app.classList.add("editing");
    viewState.notes.editing = true;
    viewState.notes.noteId = currentId;
    persistViewState();
    if (!applyingRoute) syncAppRoute({ push: false });
    return;
  }
  await finishPendingSave();
  const note = await api(`/api/notes/${id}`);
  fillEditor(note);
  elements.app.classList.add("editing");
  closeSidebar();
  viewState.notes.editing = true;
  viewState.notes.noteId = currentId;
  viewState.notes.draft = null;
  persistViewState();
  if (!applyingRoute) syncAppRoute({ push: true });
}

async function saveCurrentNote({ quiet = false } = {}) {
  clearTimeout(autosaveTimer);
  if (savePromise) await savePromise;
  if (!hasSomethingToSave()) return;

  const savedVersion = editVersion;
  const data = {
    title: elements.title.value,
    tags: elements.tags.value.split(","),
    content: elements.content.value,
  };
  const url = currentId ? `/api/notes/${currentId}` : "/api/notes";
  const method = currentId ? "PUT" : "POST";
  elements.saveButton.disabled = true;
  elements.saveStatus.textContent = "Saving...";

  savePromise = api(url, { method, body: JSON.stringify(data) });
  try {
    const saved = await savePromise;
    currentId = saved.id;
    elements.deleteButton.hidden = false;
    if (editVersion === savedVersion) {
      changed = false;
      elements.saveStatus.textContent = "Saved";
    }
    await loadNotes();
    viewState.notes.noteId = currentId;
    viewState.notes.editing = elements.app.classList.contains("editing");
    viewState.notes.draft = null;
    persistViewState();
    if (!applyingRoute) syncAppRoute({ push: false });
    if (!quiet) showToast("Log saved — keep sailing!", "success");
  } catch (error) {
    elements.saveStatus.textContent = "Save failed";
    showToast(error.message, "error");
  } finally {
    savePromise = null;
    elements.saveButton.disabled = false;
  }
}

function scheduleAutosave() {
  changed = true;
  editVersion += 1;
  elements.saveStatus.textContent = "Unsaved";
  clearTimeout(autosaveTimer);
  if (hasSomethingToSave()) {
    autosaveTimer = setTimeout(() => saveCurrentNote({ quiet: true }), 700);
  }
}

async function deleteCurrentNote() {
  clearTimeout(autosaveTimer);
  if (!currentId || !(await showConfirm("Burn this note permanently?", {
    title: "Burn the page?",
    confirmLabel: "Burn it",
    cancelLabel: "Keep log",
    tone: "danger",
    banner: "WANTED · FIRE",
  }))) return;
  await api(`/api/notes/${currentId}`, { method: "DELETE" });
  setPreviewFullscreen(false);
  closePreviewLightbox();
  fillEditor();
  elements.app.classList.remove("editing");
  await loadNotes();
  viewState.notes.editing = false;
  viewState.notes.noteId = null;
  viewState.notes.draft = null;
  persistViewState();
  syncAppRoute({ push: true });
  showToast("Note burned", "warn");
}

/* —— Vault brand icons (Simple Icons + favicon fallback) —— */
const SIMPLE_ICONS_CDN = "https://cdn.simpleicons.org";

const VAULT_BRAND_PICKS = [
  ["github", "GitHub"],
  ["google", "Google"],
  ["apple", "Apple"],
  ["microsoft", "Microsoft"],
  ["amazon", "Amazon"],
  ["discord", "Discord"],
  ["slack", "Slack"],
  ["notion", "Notion"],
  ["figma", "Figma"],
  ["spotify", "Spotify"],
  ["netflix", "Netflix"],
  ["youtube", "YouTube"],
  ["x", "X"],
  ["instagram", "Instagram"],
  ["facebook", "Facebook"],
  ["linkedin", "LinkedIn"],
  ["reddit", "Reddit"],
  ["twitch", "Twitch"],
  ["steam", "Steam"],
  ["epicgames", "Epic"],
  ["dropbox", "Dropbox"],
  ["onedrive", "OneDrive"],
  ["icloud", "iCloud"],
  ["adobe", "Adobe"],
  ["openai", "OpenAI"],
  ["anthropic", "Anthropic"],
  ["vercel", "Vercel"],
  ["cloudflare", "Cloudflare"],
  ["digitalocean", "DigitalOcean"],
  ["docker", "Docker"],
  ["npm", "npm"],
  ["paypal", "PayPal"],
  ["stripe", "Stripe"],
  ["shopify", "Shopify"],
  ["uber", "Uber"],
  ["airbnb", "Airbnb"],
  ["bitcoin", "Bitcoin"],
  ["gitlab", "GitLab"],
  ["bitbucket", "Bitbucket"],
  ["atlassian", "Atlassian"],
  ["jira", "Jira"],
  ["trello", "Trello"],
  ["zoom", "Zoom"],
  ["telegram", "Telegram"],
  ["whatsapp", "WhatsApp"],
  ["signal", "Signal"],
  ["protonmail", "Proton"],
  ["gmail", "Gmail"],
  ["outlook", "Outlook"],
  ["yahoo", "Yahoo"],
];

const DOMAIN_ICON_SLUGS = {
  "github.com": "github",
  "gist.github.com": "github",
  "google.com": "google",
  "accounts.google.com": "google",
  "mail.google.com": "gmail",
  "gmail.com": "gmail",
  "youtube.com": "youtube",
  "youtu.be": "youtube",
  "apple.com": "apple",
  "icloud.com": "icloud",
  "microsoft.com": "microsoft",
  "live.com": "microsoft",
  "outlook.com": "outlook",
  "office.com": "microsoft",
  "onedrive.live.com": "onedrive",
  "amazon.com": "amazon",
  "aws.amazon.com": "amazonaws",
  "discord.com": "discord",
  "discordapp.com": "discord",
  "slack.com": "slack",
  "notion.so": "notion",
  "figma.com": "figma",
  "spotify.com": "spotify",
  "netflix.com": "netflix",
  "x.com": "x",
  "twitter.com": "x",
  "instagram.com": "instagram",
  "facebook.com": "facebook",
  "fb.com": "facebook",
  "linkedin.com": "linkedin",
  "reddit.com": "reddit",
  "twitch.tv": "twitch",
  "steampowered.com": "steam",
  "store.steampowered.com": "steam",
  "epicgames.com": "epicgames",
  "dropbox.com": "dropbox",
  "adobe.com": "adobe",
  "openai.com": "openai",
  "chatgpt.com": "openai",
  "anthropic.com": "anthropic",
  "claude.ai": "anthropic",
  "vercel.com": "vercel",
  "cloudflare.com": "cloudflare",
  "digitalocean.com": "digitalocean",
  "docker.com": "docker",
  "hub.docker.com": "docker",
  "npmjs.com": "npm",
  "paypal.com": "paypal",
  "stripe.com": "stripe",
  "shopify.com": "shopify",
  "uber.com": "uber",
  "airbnb.com": "airbnb",
  "gitlab.com": "gitlab",
  "bitbucket.org": "bitbucket",
  "atlassian.com": "atlassian",
  "atlassian.net": "atlassian",
  "trello.com": "trello",
  "zoom.us": "zoom",
  "telegram.org": "telegram",
  "web.telegram.org": "telegram",
  "whatsapp.com": "whatsapp",
  "web.whatsapp.com": "whatsapp",
  "signal.org": "signal",
  "proton.me": "protonmail",
  "protonmail.com": "protonmail",
  "yahoo.com": "yahoo",
  "mail.yahoo.com": "yahoo",
  "cursor.com": "cursor",
  "stackoverflow.com": "stackoverflow",
};

function simpleIconUrl(slug) {
  return `${SIMPLE_ICONS_CDN}/${encodeURIComponent(slug)}`;
}

function faviconUrl(hostname) {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname)}&sz=128`;
}

function hostnameFromUrl(value) {
  try {
    const withProtocol = /^(https?:)?\/\//i.test(value) ? value : `https://${value}`;
    return new URL(withProtocol).hostname.replace(/^www\./i, "").toLowerCase();
  } catch {
    return "";
  }
}

function guessSimpleIconSlug({ title = "", url = "" } = {}) {
  const host = hostnameFromUrl(url);
  if (host) {
    if (DOMAIN_ICON_SLUGS[host]) return DOMAIN_ICON_SLUGS[host];
    const parts = host.split(".");
    for (let i = 0; i < parts.length - 1; i += 1) {
      const candidate = parts.slice(i).join(".");
      if (DOMAIN_ICON_SLUGS[candidate]) return DOMAIN_ICON_SLUGS[candidate];
    }
    const brand = parts[0];
    if (VAULT_BRAND_PICKS.some(([slug]) => slug === brand)) return brand;
  }

  const normalized = String(title || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
  for (const [slug, label] of VAULT_BRAND_PICKS) {
    const compact = label.toLowerCase().replace(/[^a-z0-9]+/g, "");
    if (normalized === slug || normalized === compact || normalized.includes(slug) || normalized.includes(compact)) {
      return slug;
    }
  }
  return "";
}

function resolveVaultIconSrc(entry = {}) {
  const icon = String(entry.icon || "").trim();
  if (/^https?:\/\//i.test(icon)) return { src: icon, kind: "image" };
  if (/^si:/i.test(icon)) {
    const slug = icon.slice(3).trim().toLowerCase();
    if (slug) return { src: simpleIconUrl(slug), kind: "brand" };
  }
  if (icon && !icon.includes("/") && !icon.includes(".")) {
    return { src: simpleIconUrl(icon.toLowerCase()), kind: "brand" };
  }

  const slug = guessSimpleIconSlug(entry);
  if (slug) return { src: simpleIconUrl(slug), kind: "auto-brand" };

  const host = hostnameFromUrl(entry.url || "");
  if (host) return { src: faviconUrl(host), kind: "favicon" };
  return { src: "", kind: "fallback" };
}

function renderVaultIconElement(target, entry, { fallbackText = "⚜" } = {}) {
  const { src, kind } = resolveVaultIconSrc(entry);
  target.replaceChildren();
  target.classList.toggle("has-image", Boolean(src));
  target.dataset.kind = kind;

  if (!src) {
    const span = document.createElement("span");
    span.className = "vault-icon-fallback";
    span.textContent = fallbackText;
    target.append(span);
    return;
  }

  const img = document.createElement("img");
  img.className = "vault-icon-img";
  img.src = src;
  img.alt = "";
  img.loading = "lazy";
  img.referrerPolicy = "no-referrer";
  img.addEventListener("error", () => {
    const host = hostnameFromUrl(entry.url || "");
    if (kind !== "favicon" && host && !img.dataset.triedFavicon) {
      img.dataset.triedFavicon = "1";
      img.src = faviconUrl(host);
      return;
    }
    target.classList.remove("has-image");
    target.replaceChildren();
    const span = document.createElement("span");
    span.className = "vault-icon-fallback";
    span.textContent = fallbackText;
    target.append(span);
  });
  target.append(img);
}

function getVaultIconValue() {
  return String(elements.vaultIcon.value || "").trim();
}

function setVaultIconValue(value) {
  elements.vaultIcon.value = value || "";
  if (/^https?:\/\//i.test(value || "")) {
    elements.vaultIconUrl.value = value;
  } else if (!value) {
    elements.vaultIconUrl.value = "";
  }
  updateVaultIconPreview();
  highlightVaultIconPick();
}

function updateVaultIconPreview() {
  renderVaultIconElement(elements.vaultIconPreview, {
    icon: getVaultIconValue(),
    title: elements.vaultTitle.value,
    url: elements.vaultUrl.value,
  });
}

function highlightVaultIconPick() {
  const current = getVaultIconValue().replace(/^si:/i, "").toLowerCase();
  elements.vaultIconPicks.querySelectorAll("[data-slug]").forEach((button) => {
    button.classList.toggle("active", Boolean(current) && button.dataset.slug === current);
  });
}

function renderVaultIconPicks() {
  elements.vaultIconPicks.replaceChildren();
  for (const [slug, label] of VAULT_BRAND_PICKS) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "vault-icon-pick";
    button.dataset.slug = slug;
    button.title = label;
    button.setAttribute("aria-label", label);

    const mark = document.createElement("span");
    mark.className = "vault-icon-pick-mark";
    const img = document.createElement("img");
    img.src = simpleIconUrl(slug);
    img.alt = "";
    img.loading = "lazy";
    img.referrerPolicy = "no-referrer";
    img.addEventListener("error", () => { button.hidden = true; });
    mark.append(img);

    const caption = document.createElement("span");
    caption.className = "vault-icon-pick-label";
    caption.textContent = label;

    button.append(mark, caption);
    button.addEventListener("click", () => {
      elements.vaultIconUrl.value = "";
      setVaultIconValue(`si:${slug}`);
    });
    elements.vaultIconPicks.append(button);
  }
}

/* —— Vault —— */
function hideVaultForm() {
  closeToolModal(elements.vaultModal);
  selectedVaultId = null;
  elements.vaultDelete.hidden = true;
}

function showVaultForm(entry = null) {
  selectedVaultId = entry?.id || null;
  elements.vaultId.value = entry?.id || "";
  elements.vaultTitle.value = entry?.title || "";
  elements.vaultUsername.value = entry?.username || "";
  elements.vaultPassword.value = entry?.password || "";
  elements.vaultUrl.value = entry?.url || "";
  elements.vaultNotes.value = entry?.notes || "";
  elements.vaultDelete.hidden = !entry;
  setVaultIconValue(entry?.icon || "");
  openToolModal(elements.vaultModal);
  elements.vaultTitle.focus();
  renderVaultList();
}

function renderVaultList() {
  const query = elements.search.value.trim().toLowerCase();
  const filtered = vaultEntries.filter((entry) => {
    if (!query) return true;
    return [entry.title, entry.username, entry.url, entry.notes].join(" ").toLowerCase().includes(query);
  });

  elements.vaultList.replaceChildren();
  elements.vaultEmpty.hidden = filtered.length > 0 || isToolModalOpen(elements.vaultModal);
  elements.headerStatus.textContent = `${vaultEntries.length} secrets`;

  for (const [index, entry] of filtered.entries()) {
    const row = document.createElement("article");
    row.className = `vault-item page-card-pad${entry.id === selectedVaultId ? " active" : ""}`;
    row.style.animationDelay = `${Math.min(index, 8) * 40}ms`;
    row.append(makeWantedStrip("TREASURE", "op-chest"));

    const icon = document.createElement("div");
    icon.className = "vault-item-seal";
    icon.setAttribute("aria-hidden", "true");
    renderVaultIconElement(icon, entry);

    const body = document.createElement("div");
    body.className = "vault-item-body";

    const title = document.createElement("div");
    title.className = "vault-item-title";
    title.textContent = entry.title;

    const meta = document.createElement("div");
    meta.className = "vault-item-meta";
    meta.textContent = [entry.username, entry.url].filter(Boolean).join(" · ") || "Sealed secret";

    body.append(title, meta);

    const actions = document.createElement("div");
    actions.className = "vault-item-actions";

    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "secondary-btn";
    copyBtn.textContent = "Copy";
    copyBtn.addEventListener("click", async (event) => {
      event.stopPropagation();
      const full = await api(`/api/vault/${entry.id}`);
      await navigator.clipboard.writeText(full.password || "");
      showToast("Password copied", "success");
    });

    const openBtn = document.createElement("button");
    openBtn.type = "button";
    openBtn.className = "secondary-btn";
    openBtn.textContent = "Open";
    openBtn.addEventListener("click", async (event) => {
      event.stopPropagation();
      const full = await api(`/api/vault/${entry.id}`);
      showVaultForm(full);
    });

    actions.append(copyBtn, openBtn);
    row.append(icon, body, actions);
    row.addEventListener("click", async () => {
      const full = await api(`/api/vault/${entry.id}`);
      showVaultForm(full);
    });
    elements.vaultList.append(row);
  }
}

async function loadVault() {
  vaultEntries = await api("/api/vault");
  renderVaultList();
}

/* —— Quests —— */
function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const LEVEL_LABELS = {
  S: "Legendary",
  A: "Extreme",
  B: "Hard",
  C: "Normal",
  D: "Easy",
};

function hideQuestForm() {
  closeToolModal(elements.questModal);
  selectedQuestId = null;
  elements.questDelete.hidden = true;
  elements.questSubquests.replaceChildren();
}

function addSubquestFields(sub = { title: "", description: "", done: false, id: "" }) {
  const row = document.createElement("div");
  row.className = "subquest-editor";
  row.dataset.id = sub.id || "";
  row.innerHTML = `
    <div class="subquest-editor-top">
      <label class="subquest-done-check" title="Done"><input type="checkbox" class="sub-done" ${sub.done ? "checked" : ""}></label>
      <input class="field sub-title" maxlength="200" placeholder="Subquest title" value="${String(sub.title || "").replaceAll('"', "&quot;")}">
      <button type="button" class="danger-text sub-remove">Remove</button>
    </div>
    <textarea class="field sub-description" rows="2" maxlength="1000" placeholder="Subquest description">${String(sub.description || "")}</textarea>
  `;
  row.querySelector(".sub-remove").addEventListener("click", () => row.remove());
  elements.questSubquests.append(row);
}

function readSubquestsFromForm() {
  return [...elements.questSubquests.querySelectorAll(".subquest-editor")].map((row) => ({
    id: row.dataset.id || undefined,
    title: row.querySelector(".sub-title").value,
    description: row.querySelector(".sub-description").value,
    done: row.querySelector(".sub-done").checked,
  }));
}

function showQuestForm(quest = null) {
  selectedQuestId = quest?.id || null;
  elements.questId.value = quest?.id || "";
  elements.questTitle.value = quest?.title || "";
  elements.questLevel.value = quest?.level || "C";
  elements.questDue.value = quest?.dueDate || "";
  elements.questDescription.value = quest?.description || "";
  elements.questNotes.value = quest?.notes || "";
  elements.questDone.checked = Boolean(quest?.done);
  elements.questDelete.hidden = !quest;
  elements.questSubquests.replaceChildren();
  const subs = quest?.subquests?.length ? quest.subquests : [];
  if (subs.length) subs.forEach((sub) => addSubquestFields(sub));
  else addSubquestFields();
  openToolModal(elements.questModal);
  elements.questTitle.focus();
  renderQuests();
}

function questMatchesQuery(quest, query) {
  if (!query) return true;
  const blob = [
    quest.title,
    quest.description,
    quest.notes,
    quest.level,
    ...(quest.subquests || []).flatMap((sub) => [sub.title, sub.description]),
  ].join(" ").toLowerCase();
  return blob.includes(query);
}

function renderQuests() {
  const query = elements.search.value.trim().toLowerCase();
  const filtered = quests.filter((quest) => {
    if (selectedQuestLevel && quest.level !== selectedQuestLevel) return false;
    return questMatchesQuery(quest, query);
  });

  elements.questsList.replaceChildren();
  elements.questsEmpty.hidden = filtered.length > 0 || isToolModalOpen(elements.questModal);
  elements.headerStatus.textContent = `${quests.filter((q) => !q.done).length} open quests`;

  for (const [index, quest] of filtered.entries()) {
    const expanded = expandedQuestIds.has(quest.id);
    const card = document.createElement("article");
    card.className = `quest-card page-card-pad${quest.done ? " done" : ""}${quest.id === selectedQuestId ? " active" : ""}${expanded ? " expanded" : ""}`;
    card.dataset.id = quest.id;
    card.style.animationDelay = `${Math.min(index, 8) * 40}ms`;
    card.append(makeWantedStrip(`RANK ${quest.level || "C"}`, "op-sword"));

    const progress = Number(quest.progress || 0);
    const subTotal = Number(quest.subquestTotal || quest.subquests?.length || 0);
    const subDone = Number(quest.subquestDone || (quest.subquests || []).filter((s) => s.done).length);

    const head = document.createElement("div");
    head.className = "quest-card-head";

    const check = document.createElement("button");
    check.type = "button";
    check.className = "quest-check";
    check.setAttribute("aria-label", quest.done ? "Mark incomplete" : "Mark complete");
    check.addEventListener("click", async (event) => {
      event.stopPropagation();
      await api(`/api/quests/${quest.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...quest,
          done: !quest.done,
          subquests: quest.subquests || [],
        }),
      });
      await loadQuests();
    });

    const main = document.createElement("div");
    main.className = "quest-card-main";
    main.innerHTML = `
      <div class="quest-card-topline">
        <span class="quest-rank rank-${escapeHtml(quest.level || "C")}">Rank ${escapeHtml(quest.level || "C")}</span>
        <span class="quest-rank-label">${escapeHtml(LEVEL_LABELS[quest.level] || "Normal")}</span>
        ${quest.dueDate ? `<span class="quest-due">Due ${escapeHtml(quest.dueDate)}</span>` : ""}
      </div>
      <h3 class="quest-card-title">${escapeHtml(quest.title)}</h3>
      ${quest.description
        ? `<p class="quest-card-desc">${escapeHtml(quest.description)}</p>`
        : `<p class="quest-card-desc muted">No description yet.</p>`}
      <div class="quest-progress">
        <div class="quest-progress-bar"><span style="width:${progress}%"></span></div>
        <span class="quest-progress-text">${subTotal ? `${subDone}/${subTotal} subquests` : quest.done ? "Complete" : "No subquests"}</span>
      </div>
    `;

    const actions = document.createElement("div");
    actions.className = "quest-card-actions";
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "secondary-btn";
    toggle.textContent = expanded ? "Hide" : "Details";
    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      if (expandedQuestIds.has(quest.id)) expandedQuestIds.delete(quest.id);
      else expandedQuestIds.add(quest.id);
      renderQuests();
    });
    const edit = document.createElement("button");
    edit.type = "button";
    edit.className = "secondary-btn";
    edit.textContent = "Edit";
    edit.addEventListener("click", (event) => {
      event.stopPropagation();
      showQuestForm(quest);
    });
    actions.append(toggle, edit);

    head.append(check, main, actions);
    card.append(head);

    if (expanded) {
      const body = document.createElement("div");
      body.className = "quest-card-body";
      if (quest.notes) {
        const notes = document.createElement("p");
        notes.className = "quest-notes";
        notes.textContent = quest.notes;
        body.append(notes);
      }

      const subList = document.createElement("div");
      subList.className = "quest-sublist";
      if (!(quest.subquests || []).length) {
        subList.innerHTML = `<p class="quest-card-desc muted">No subquests — add some in Edit.</p>`;
      } else {
        for (const sub of quest.subquests) {
          const subRow = document.createElement("div");
          subRow.className = `quest-subitem${sub.done ? " done" : ""}`;
          const subCheck = document.createElement("button");
          subCheck.type = "button";
          subCheck.className = "quest-check small";
          subCheck.addEventListener("click", async () => {
            const nextSubs = quest.subquests.map((item) => (
              item.id === sub.id ? { ...item, done: !item.done } : item
            ));
            await api(`/api/quests/${quest.id}`, {
              method: "PUT",
              body: JSON.stringify({ ...quest, subquests: nextSubs }),
            });
            expandedQuestIds.add(quest.id);
            await loadQuests();
          });
          const subCopy = document.createElement("div");
          subCopy.className = "quest-subcopy";
          subCopy.innerHTML = `
            <p class="quest-sub-title">${escapeHtml(sub.title)}</p>
            <p class="quest-sub-desc">${escapeHtml(sub.description || "No description")}</p>
          `;
          subRow.append(subCheck, subCopy);
          subList.append(subRow);
        }
      }
      body.append(subList);
      card.append(body);
    }

    card.addEventListener("click", () => {
      if (expandedQuestIds.has(quest.id)) expandedQuestIds.delete(quest.id);
      else expandedQuestIds.add(quest.id);
      renderQuests();
    });

    elements.questsList.append(card);
  }
}

async function loadQuests() {
  quests = await api("/api/quests");
  renderQuests();
  if (captainProfile) loadCaptainProfile().catch(() => {});
}

/* —— Sea charts (bookmarks) —— */
function hideChartForm() {
  closeToolModal(elements.chartsModal);
  selectedChartId = null;
  elements.chartsDelete.hidden = true;
}

function showChartForm(entry = null) {
  selectedChartId = entry?.id || null;
  elements.chartsId.value = entry?.id || "";
  elements.chartsTitle.value = entry?.title || "";
  elements.chartsUrl.value = entry?.url || "";
  elements.chartsTags.value = entry?.tags?.join(", ") || "";
  elements.chartsNotes.value = entry?.notes || "";
  elements.chartsDelete.hidden = !entry;
  openToolModal(elements.chartsModal);
  elements.chartsTitle.focus();
  renderCharts();
}

function renderCharts() {
  const query = elements.search.value.trim().toLowerCase();
  const filtered = bookmarks.filter((item) => {
    if (!query) return true;
    return [item.title, item.url, item.notes, ...(item.tags || [])].join(" ").toLowerCase().includes(query);
  });

  elements.chartsList.replaceChildren();
  elements.chartsEmpty.hidden = filtered.length > 0 || isToolModalOpen(elements.chartsModal);
  elements.headerStatus.textContent = `${bookmarks.length} charts`;

  for (const [index, item] of filtered.entries()) {
    const card = document.createElement("article");
    card.className = `chart-card page-card-pad${item.id === selectedChartId ? " active" : ""}`;
    card.style.animationDelay = `${Math.min(index, 8) * 40}ms`;
    card.append(makeWantedStrip(item.source === "extension" ? "EXTENSION" : "SEA CHART", "op-map"));

    const head = document.createElement("div");
    head.className = "chart-card-head";
    const title = document.createElement("h3");
    title.className = "chart-card-title";
    title.textContent = item.title;
    head.append(title);

    const url = document.createElement("a");
    url.className = "chart-card-url";
    url.href = item.url || "#";
    url.target = "_blank";
    url.rel = "noopener noreferrer";
    url.textContent = item.url || "No URL";
    url.addEventListener("click", (e) => e.stopPropagation());

    const notes = document.createElement("p");
    notes.className = "chart-card-notes";
    notes.textContent = item.notes || "";

    const actions = document.createElement("div");
    actions.className = "chart-card-actions";
    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "secondary-btn";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showChartForm(item);
    });
    actions.append(editBtn);

    if (item.tags?.length) {
      const tags = document.createElement("div");
      tags.className = "chart-card-tags";
      for (const tag of item.tags) {
        const span = document.createElement("span");
        span.className = "note-tag";
        span.style.setProperty("--tag-ink", tagColor(tag));
        span.append(opSvg(tagIcon(tag), "op-ico"), document.createTextNode(` ${tag}`));
        tags.append(span);
      }
      card.append(head, url, notes, tags, actions);
    } else {
      card.append(head, url, notes, actions);
    }

    card.addEventListener("click", () => showChartForm(item));
    elements.chartsList.append(card);
  }
}

async function loadCharts() {
  bookmarks = await api("/api/bookmarks");
  renderCharts();
}

/* —— Snippets —— */
function hideSnippetForm() {
  closeToolModal(elements.snippetModal);
  selectedSnippetId = null;
  elements.snippetDelete.hidden = true;
}

function showSnippetForm(entry = null) {
  selectedSnippetId = entry?.id || null;
  elements.snippetId.value = entry?.id || "";
  elements.snippetTitle.value = entry?.title || "";
  elements.snippetLanguage.value = entry?.language || "text";
  elements.snippetTags.value = entry?.tags?.join(", ") || "";
  elements.snippetCode.value = entry?.code || "";
  elements.snippetDelete.hidden = !entry;
  openToolModal(elements.snippetModal);
  elements.snippetTitle.focus();
  renderSnippets();
}

function snippetPreview(code) {
  const lines = String(code || "").split("\n").slice(0, 4);
  return lines.join("\n") + (String(code || "").split("\n").length > 4 ? "\n…" : "");
}

function renderSnippets() {
  const query = elements.search.value.trim().toLowerCase();
  const filtered = snippets.filter((item) => {
    if (!query) return true;
    return [item.title, item.language, item.code, ...(item.tags || [])].join(" ").toLowerCase().includes(query);
  });

  elements.snippetsList.replaceChildren();
  elements.snippetsEmpty.hidden = filtered.length > 0 || isToolModalOpen(elements.snippetModal);
  elements.headerStatus.textContent = `${snippets.length} snippets`;

  for (const [index, item] of filtered.entries()) {
    const card = document.createElement("article");
    card.className = `snippet-card page-card-pad${item.id === selectedSnippetId ? " active" : ""}`;
    card.style.animationDelay = `${Math.min(index, 8) * 40}ms`;
    card.append(makeWantedStrip((item.language || "CODE").toUpperCase(), "op-hammer"));

    const head = document.createElement("div");
    head.className = "snippet-card-head";
    const title = document.createElement("h3");
    title.className = "snippet-card-title";
    title.textContent = item.title;
    const lang = document.createElement("span");
    lang.className = "snippet-lang note-tag";
    lang.append(opSvg("op-fruit", "op-ico"), document.createTextNode(` ${item.language || "text"}`));
    head.append(title, lang);

    const pre = document.createElement("pre");
    pre.className = "snippet-preview snippet-code-preview";
    const code = document.createElement("code");
    code.textContent = snippetPreview(item.code);
    pre.append(code);

    const actions = document.createElement("div");
    actions.className = "snippet-card-actions";
    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "btn-primary rounded-lg px-3 py-1.5 text-sm font-extrabold";
    copyBtn.textContent = "Copy";
    copyBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      await navigator.clipboard.writeText(item.code || "");
      showToast("Snippet copied", "success");
    });
    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "secondary-btn";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showSnippetForm(item);
    });
    actions.append(copyBtn, editBtn);

    card.append(head, pre);
    if (item.tags?.length) {
      const tags = document.createElement("div");
      tags.className = "snippet-card-tags";
      for (const tag of item.tags) {
        const span = document.createElement("span");
        span.className = "note-tag";
        span.style.setProperty("--tag-ink", tagColor(tag));
        span.append(opSvg(tagIcon(tag), "op-ico"), document.createTextNode(` ${tag}`));
        tags.append(span);
      }
      card.append(tags);
    }
    card.append(actions);
    card.addEventListener("click", () => showSnippetForm(item));
    elements.snippetsList.append(card);
  }
}

async function loadSnippets() {
  snippets = await api("/api/snippets");
  renderSnippets();
}

/* —— Berry pouch (income + expenses) —— */
const BERRY_EXPENSE_CATEGORIES = {
  food: { label: "Food", mark: "🍖", tone: "food" },
  gear: { label: "Gear", mark: "⚓", tone: "gear" },
  travel: { label: "Travel", mark: "⛵", tone: "travel" },
  lodging: { label: "Lodging", mark: "🏝", tone: "lodging" },
  fun: { label: "Fun", mark: "🎉", tone: "fun" },
  medical: { label: "Medical", mark: "✚", tone: "medical" },
  other: { label: "Other", mark: "₿", tone: "other" },
};

const BERRY_INCOME_CATEGORIES = {
  bounty: { label: "Bounty", mark: "🏴", tone: "bounty" },
  pay: { label: "Pay", mark: "🪙", tone: "pay" },
  loot: { label: "Loot", mark: "💎", tone: "loot" },
  other: { label: "Other", mark: "₿", tone: "other" },
};

const BERRY_CATEGORY_META = { ...BERRY_EXPENSE_CATEGORIES, ...BERRY_INCOME_CATEGORIES };

const BERRY_CHART_PALETTE = ["#c41e3a", "#0c3d87", "#c9a227", "#1e7ef0", "#2f6b3a", "#7a3e12", "#5a4630"];

function berryFlowOf(item) {
  return String(item?.flow || "expense").toLowerCase() === "income" ? "income" : "expense";
}

function berryCategoryMeta(category) {
  const key = String(category || "other").trim().toLowerCase();
  return BERRY_CATEGORY_META[key] || { label: category || "Other", mark: "₿", tone: "other" };
}

function formatBerryAmount(amount, { signed = false, flow = "expense" } = {}) {
  const value = Math.abs(Number(amount) || 0);
  const rounded = Math.round(value * 100) / 100;
  if (!signed) return `${rounded} ₿`;
  const prefix = flow === "income" ? "+" : "−";
  return `${prefix}${rounded} ₿`;
}

function berryDayKey(offsetFromToday = 0) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + offsetFromToday);
  return date.toISOString().slice(0, 10);
}

function berryDayLabel(iso) {
  const date = new Date(`${iso}T12:00:00`);
  return new Intl.DateTimeFormat(undefined, { weekday: "short" }).format(date);
}

function hideBerryForm() {
  closeToolModal(elements.berryModal);
  selectedBerryId = null;
  elements.berryDelete.hidden = true;
}

function syncBerryCategoryOptions(preferred = "") {
  const flow = elements.berryFlow.value === "income" ? "income" : "expense";
  const catalog = flow === "income" ? BERRY_INCOME_CATEGORIES : BERRY_EXPENSE_CATEGORIES;
  const preferredKey = String(preferred || "").toLowerCase();
  const fallback = flow === "income" ? "bounty" : "other";
  const selected = catalog[preferredKey] ? preferredKey : fallback;
  elements.berryCategory.replaceChildren();
  for (const [key, meta] of Object.entries(catalog)) {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = `${meta.mark} ${meta.label}`;
    elements.berryCategory.append(option);
  }
  elements.berryCategory.value = selected;
}

function updateBerryFormChrome() {
  const income = elements.berryFlow.value === "income";
  elements.berryFormHeading.textContent = selectedBerryId
    ? (income ? "Edit income" : "Edit expense")
    : (income ? "Log income" : "Log expense");
  elements.berrySubmit.textContent = "Seal entry";
  elements.berryTitle.placeholder = income ? "Bounty share, wages…" : "Rations, gear, ferry…";
}

function updateBerryRepeatHint() {
  if (!elements.berryRepeatHint || !elements.berryRepeat) return;
  const repeat = elements.berryRepeat.value;
  elements.berryRepeatHint.hidden = repeat === "none";
  if (repeat !== "none") {
    elements.berryRepeatHint.textContent = `Repeats ${repeat}. Next auto seal after this date.`;
  }
}

function resetBerryForm() {
  selectedBerryId = null;
  elements.berryId.value = "";
  elements.berryFlow.value = "expense";
  elements.berryTitle.value = "";
  elements.berryAmount.value = "";
  syncBerryCategoryOptions("other");
  elements.berryDate.value = new Date().toISOString().slice(0, 10);
  if (elements.berryRepeat) elements.berryRepeat.value = "none";
  elements.berryNote.value = "";
  elements.berryDelete.hidden = true;
  updateBerryFormChrome();
  updateBerryRepeatHint();
}

function showBerryForm(entry = null) {
  if (entry) {
    selectedBerryId = entry.id;
    elements.berryId.value = entry.id;
    elements.berryFlow.value = berryFlowOf(entry);
    elements.berryTitle.value = entry.title;
    elements.berryAmount.value = entry.amount;
    syncBerryCategoryOptions(entry.category);
    elements.berryDate.value = entry.date;
    if (elements.berryRepeat) elements.berryRepeat.value = entry.repeat || "none";
    elements.berryNote.value = entry.note || "";
    elements.berryDelete.hidden = false;
    updateBerryFormChrome();
    updateBerryRepeatHint();
  } else {
    resetBerryForm();
  }
  openToolModal(elements.berryModal);
  elements.berryTitle.focus();
  renderBerries();
}

function renderBerryFlowFilters() {
  const flows = [
    { key: "all", label: "All" },
    { key: "income", label: "Income" },
    { key: "expense", label: "Expense" },
  ];
  elements.berryFlowFilters.replaceChildren();
  for (const flow of flows) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `berry-flow-filter tag-filter${selectedBerryFlow === flow.key ? " active" : ""}`;
    button.dataset.flow = flow.key;
    button.textContent = flow.label;
    button.addEventListener("click", () => {
      selectedBerryFlow = flow.key;
      viewState.berries.flow = selectedBerryFlow;
      persistViewState();
      renderBerries();
    });
    elements.berryFlowFilters.append(button);
  }
}

function renderBerryCategoryFilters(sourceItems) {
  const counts = new Map();
  for (const item of sourceItems) {
    const key = String(item.category || "other").toLowerCase();
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  const known = Object.keys(BERRY_CATEGORY_META).filter((key) => counts.has(key));
  const keys = ["", ...known];
  if (!known.includes("other") && counts.size) keys.push("other");

  elements.berryCategoryFilters.replaceChildren();
  for (const key of [...new Set(keys)]) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `berry-cat-filter tag-filter${selectedBerryCategory === key ? " active" : ""}`;
    button.dataset.category = key;
    if (!key) {
      button.textContent = "All categories";
    } else {
      const meta = berryCategoryMeta(key);
      button.textContent = `${meta.mark} ${meta.label}`;
    }
    button.addEventListener("click", () => {
      selectedBerryCategory = key;
      viewState.berries.category = selectedBerryCategory;
      persistViewState();
      renderBerries();
    });
    elements.berryCategoryFilters.append(button);
  }
}

function renderBerryTrendChart(items) {
  const days = Array.from({ length: 7 }, (_, index) => berryDayKey(index - 6));
  const series = days.map((day) => {
    const dayItems = items.filter((item) => item.date === day);
    const income = dayItems.filter((item) => berryFlowOf(item) === "income")
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const expense = dayItems.filter((item) => berryFlowOf(item) !== "income")
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);
    return { day, income, expense };
  });
  const max = Math.max(1, ...series.flatMap((row) => [row.income, row.expense]));
  const width = 360;
  const height = 180;
  const padL = 28;
  const padR = 12;
  const padT = 16;
  const padB = 36;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const groupW = plotW / series.length;
  const barW = Math.max(6, groupW * 0.28);

  const bars = series.map((row, index) => {
    const x0 = padL + index * groupW + groupW / 2;
    const incomeH = (row.income / max) * plotH;
    const expenseH = (row.expense / max) * plotH;
    const incomeY = padT + plotH - incomeH;
    const expenseY = padT + plotH - expenseH;
    return `
      <g class="berry-bar-group">
        <rect class="berry-bar berry-bar-income" x="${(x0 - barW - 2).toFixed(1)}" y="${incomeY.toFixed(1)}" width="${barW.toFixed(1)}" height="${Math.max(incomeH, row.income ? 2 : 0).toFixed(1)}" rx="2"></rect>
        <rect class="berry-bar berry-bar-expense" x="${(x0 + 2).toFixed(1)}" y="${expenseY.toFixed(1)}" width="${barW.toFixed(1)}" height="${Math.max(expenseH, row.expense ? 2 : 0).toFixed(1)}" rx="2"></rect>
        <text class="berry-chart-axis" x="${x0.toFixed(1)}" y="${height - 12}" text-anchor="middle">${escapeHtml(berryDayLabel(row.day))}</text>
      </g>
    `;
  }).join("");

  elements.berryChartTrend.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" class="berry-chart-svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <line class="berry-chart-baseline" x1="${padL}" y1="${padT + plotH}" x2="${width - padR}" y2="${padT + plotH}"></line>
      <text class="berry-chart-axis berry-chart-axis-max" x="${padL - 6}" y="${padT + 4}" text-anchor="end">${Math.round(max)}</text>
      ${bars}
    </svg>
  `;
}

function renderBerryCategoryChart(monthExpenses) {
  const totals = {};
  for (const item of monthExpenses) {
    const key = String(item.category || "other").toLowerCase();
    totals[key] = (totals[key] || 0) + Number(item.amount || 0);
  }
  const slices = Object.entries(totals)
    .map(([key, amount]) => ({ key, amount, meta: berryCategoryMeta(key) }))
    .sort((a, b) => b.amount - a.amount);

  if (!slices.length) {
    elements.berryChartCats.innerHTML = `<p class="berry-chart-empty">No outflows this month — the pouch stays plump.</p>`;
    return;
  }

  const total = slices.reduce((sum, slice) => sum + slice.amount, 0) || 1;
  const size = 180;
  const cx = 90;
  const cy = 90;
  const r = 68;
  const ir = 42;
  let angle = -Math.PI / 2;

  const arcs = slices.map((slice, index) => {
    const sweep = (slice.amount / total) * Math.PI * 2;
    const start = angle;
    const end = angle + sweep;
    angle = end;
    const large = sweep > Math.PI ? 1 : 0;
    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);
    const ix1 = cx + ir * Math.cos(end);
    const iy1 = cy + ir * Math.sin(end);
    const ix2 = cx + ir * Math.cos(start);
    const iy2 = cy + ir * Math.sin(start);
    const color = BERRY_CHART_PALETTE[index % BERRY_CHART_PALETTE.length];
    const d = [
      `M ${x1.toFixed(2)} ${y1.toFixed(2)}`,
      `A ${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`,
      `L ${ix1.toFixed(2)} ${iy1.toFixed(2)}`,
      `A ${ir} ${ir} 0 ${large} 0 ${ix2.toFixed(2)} ${iy2.toFixed(2)}`,
      "Z",
    ].join(" ");
    return `<path d="${d}" fill="${color}" class="berry-donut-slice"><title>${escapeHtml(slice.meta.label)}: ${escapeHtml(formatBerryAmount(slice.amount))}</title></path>`;
  }).join("");

  const legend = slices.slice(0, 5).map((slice, index) => {
    const color = BERRY_CHART_PALETTE[index % BERRY_CHART_PALETTE.length];
    const pct = Math.round((slice.amount / total) * 100);
    return `
      <li class="berry-donut-legend-item">
        <span class="berry-donut-swatch" style="background:${color}"></span>
        <span>${escapeHtml(slice.meta.label)}</span>
        <strong>${pct}%</strong>
      </li>
    `;
  }).join("");

  elements.berryChartCats.innerHTML = `
    <div class="berry-donut-layout">
      <svg viewBox="0 0 ${size} ${size}" class="berry-chart-svg berry-donut-svg" aria-hidden="true">
        ${arcs}
        <circle cx="${cx}" cy="${cy}" r="${ir - 2}" class="berry-donut-hole"></circle>
        <text x="${cx}" y="${cy - 4}" text-anchor="middle" class="berry-donut-center-label">Spend</text>
        <text x="${cx}" y="${cy + 16}" text-anchor="middle" class="berry-donut-center-value">${escapeHtml(formatBerryAmount(total))}</text>
      </svg>
      <ul class="berry-donut-legend">${legend}</ul>
    </div>
  `;
}

function renderBerries() {
  const query = elements.search.value.trim().toLowerCase();
  const month = new Date().toISOString().slice(0, 7);
  const monthItems = expenses.filter((item) => String(item.date).startsWith(month));
  const monthIncome = monthItems
    .filter((item) => berryFlowOf(item) === "income")
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const monthSpend = monthItems
    .filter((item) => berryFlowOf(item) !== "income")
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const monthBalance = Math.round((monthIncome - monthSpend) * 100) / 100;

  const filtered = expenses.filter((item) => {
    const flow = berryFlowOf(item);
    if (selectedBerryFlow !== "all" && flow !== selectedBerryFlow) return false;
    if (selectedBerryCategory && String(item.category || "other").toLowerCase() !== selectedBerryCategory) return false;
    if (!query) return true;
    return [item.title, item.category, item.note, item.flow, String(item.amount)].join(" ").toLowerCase().includes(query);
  }).sort((a, b) => String(b.date).localeCompare(String(a.date)) || String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")));

  const expenseTotals = {};
  for (const entry of monthItems.filter((row) => berryFlowOf(row) !== "income")) {
    const key = String(entry.category || "other").toLowerCase();
    expenseTotals[key] = (expenseTotals[key] || 0) + Number(entry.amount || 0);
  }
  const topCategory = Object.entries(expenseTotals).sort((a, b) => b[1] - a[1])[0];

  if (monthBalance > 0) elements.berryMonthBalance.textContent = `+${Math.round(monthBalance * 100) / 100} ₿`;
  else if (monthBalance < 0) elements.berryMonthBalance.textContent = `−${Math.round(Math.abs(monthBalance) * 100) / 100} ₿`;
  else elements.berryMonthBalance.textContent = "0 ₿";

  elements.berryMonthIncome.textContent = formatBerryAmount(monthIncome);
  elements.berryMonthSpend.textContent = formatBerryAmount(monthSpend);
  elements.berryCount.textContent = String(expenses.length);
  elements.berryTopCategory.textContent = topCategory
    ? `${berryCategoryMeta(topCategory[0]).label} · ${formatBerryAmount(topCategory[1])}`
    : "—";

  renderBerryFlowFilters();
  const filterSource = monthItems.length ? monthItems : expenses;
  const flowScoped = selectedBerryFlow === "all"
    ? filterSource
    : filterSource.filter((item) => berryFlowOf(item) === selectedBerryFlow);
  renderBerryCategoryFilters(flowScoped);
  renderBerryTrendChart(expenses);
  renderBerryCategoryChart(monthItems.filter((item) => berryFlowOf(item) !== "income"));

  elements.berriesList.replaceChildren();
  elements.berriesEmpty.hidden = filtered.length > 0 || isToolModalOpen(elements.berryModal);
  elements.headerStatus.textContent = `+${formatBerryAmount(monthIncome)} in · −${formatBerryAmount(monthSpend)} out · net ${elements.berryMonthBalance.textContent}`;

  for (const [index, item] of filtered.entries()) {
    const flow = berryFlowOf(item);
    const meta = berryCategoryMeta(item.category);
    const card = document.createElement("article");
    card.className = `berry-receipt page-card-pad tone-${meta.tone} flow-${flow}${item.id === selectedBerryId ? " active" : ""}`;
    card.style.animationDelay = `${Math.min(index, 8) * 40}ms`;
    card.append(makeWantedStrip(flow === "income" ? "INCOME" : "EXPENSE", flow === "income" ? "op-chest" : "op-berry"));
    card.insertAdjacentHTML("beforeend", `
      <div class="berry-receipt-seal" aria-hidden="true">${meta.mark}</div>
      <div class="berry-receipt-body">
        <div class="berry-receipt-topline">
          <span class="berry-receipt-cat">${escapeHtml(meta.label)}</span>
          <span class="berry-receipt-date">${escapeHtml(item.date || "")}</span>
        </div>
        <h3 class="berry-receipt-title">${escapeHtml(item.title)}</h3>
        <p class="berry-receipt-note">${escapeHtml(item.note || "No cook's note")}${item.repeat && item.repeat !== "none" ? ` · Repeats ${escapeHtml(item.repeat)}${item.nextDate ? ` · next ${escapeHtml(item.nextDate)}` : ""}` : ""}${item.recurringParentId ? " · Auto" : ""}</p>
      </div>
      <div class="berry-receipt-amount">${escapeHtml(formatBerryAmount(item.amount, { signed: true, flow }))}</div>
    `);
    card.addEventListener("click", () => showBerryForm(item));
    elements.berriesList.append(card);
  }
}

async function loadBerries() {
  expenses = await api("/api/expenses");
  renderBerries();
}

/* —— Watchtower (reminders + alarms) —— */
function toDatetimeLocalValue(iso) {
  const date = new Date(iso || Date.now());
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function formatSignalWhen(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Unset";
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function stopAlarmSound() {
  if (alarmOscTimer) {
    clearInterval(alarmOscTimer);
    alarmOscTimer = null;
  }
}

function playAlarmSound(loops = 8) {
  stopAlarmSound();
  try {
    alarmAudioCtx ||= new (window.AudioContext || window.webkitAudioContext)();
    let count = 0;
    const beep = () => {
      const osc = alarmAudioCtx.createOscillator();
      const gain = alarmAudioCtx.createGain();
      osc.type = "square";
      osc.frequency.value = count % 2 === 0 ? 880 : 660;
      gain.gain.value = 0.05;
      osc.connect(gain);
      gain.connect(alarmAudioCtx.destination);
      osc.start();
      osc.stop(alarmAudioCtx.currentTime + 0.18);
      count += 1;
      if (count >= loops) stopAlarmSound();
    };
    beep();
    alarmOscTimer = setInterval(beep, 320);
  } catch {
    /* audio blocked until gesture */
  }
}

function nextRepeatDue(dueAt, repeat) {
  const date = new Date(dueAt);
  if (Number.isNaN(date.getTime())) return new Date(Date.now() + 86400000).toISOString();
  const now = Date.now();
  const step = repeat === "weekly" ? 7 : 1;
  while (date.getTime() <= now) date.setDate(date.getDate() + step);
  return date.toISOString();
}

async function requestSignalNotifications() {
  if (!("Notification" in window)) {
    showToast("Browser alerts unavailable here", "warn");
    return false;
  }
  if (Notification.permission === "granted") {
    showToast("Browser alerts already armed", "success");
    return true;
  }
  const result = await Notification.requestPermission();
  if (result === "granted") {
    showToast("Watchtower can ping this browser", "success");
    return true;
  }
  showToast("Browser alerts blocked — in-app bells still work", "warn");
  return false;
}

function pushBrowserNotification(item) {
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  try {
    const note = new Notification(item.title || "Ship's bell", {
      body: item.note || (item.kind === "alarm" ? "Alarm from the crow's nest" : "Reminder from the crow's nest"),
      tag: `signal-${item.id}`,
    });
    note.onclick = () => {
      window.focus();
      setView("watchtower");
      note.close();
    };
  } catch {
    /* ignore */
  }
}

function hideSignalForm() {
  closeToolModal(elements.signalModal);
  selectedSignalId = null;
  elements.signalDelete.hidden = true;
}

const voyageClockState = { mode: "hour" };

function parseDatetimeLocal(value) {
  const match = String(value || "").match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!match) {
    const date = new Date(Date.now() + 30 * 60 * 1000);
    return {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      min: date.getMinutes(),
    };
  }
  return {
    y: Number(match[1]),
    m: Number(match[2]),
    d: Number(match[3]),
    h: Number(match[4]),
    min: Number(match[5]),
  };
}

function formatDatetimeLocal(parts) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${parts.y}-${pad(parts.m)}-${pad(parts.d)}T${pad(parts.h)}:${pad(parts.min)}`;
}

function voyageDayOptions() {
  return Array.from({ length: 7 }, (_, offset) => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + offset);
    return {
      offset,
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      label: offset === 0 ? "Today" : offset === 1 ? "Tomorrow" : date.toLocaleDateString(undefined, { weekday: "short" }),
      sub: date.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
    };
  });
}

function syncVoyageClock(fromInput = true) {
  if (!elements.voyageClock || !elements.signalDue) return;
  const parts = parseDatetimeLocal(elements.signalDue.value || toDatetimeLocalValue(new Date(Date.now() + 30 * 60 * 1000).toISOString()));
  if (fromInput) elements.signalDue.value = formatDatetimeLocal(parts);

  const hour12 = ((parts.h + 11) % 12) + 1;
  const isPm = parts.h >= 12;
  const selectedIndex = voyageClockState.mode === "hour"
    ? hour12 % 12
    : Math.round(parts.min / 5) % 12;

  const date = new Date(parts.y, parts.m - 1, parts.d, parts.h, parts.min);
  elements.voyageClockReadout.textContent = date.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  elements.voyageClockDays.replaceChildren();
  for (const day of voyageDayOptions()) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `voyage-clock-day${day.y === parts.y && day.m === parts.m && day.d === parts.d ? " active" : ""}`;
    button.innerHTML = `<strong>${escapeHtml(day.label)}</strong><span>${escapeHtml(day.sub)}</span>`;
    button.addEventListener("click", () => {
      elements.signalDue.value = formatDatetimeLocal({ ...parts, y: day.y, m: day.m, d: day.d });
      syncVoyageClock(false);
    });
    elements.voyageClockDays.append(button);
  }

  elements.voyageClockFace.querySelectorAll(".voyage-clock-tick").forEach((node) => node.remove());
  for (let i = 0; i < 12; i += 1) {
    const angle = ((i * 30 - 90) * Math.PI) / 180;
    const tick = document.createElement("button");
    tick.type = "button";
    tick.className = `voyage-clock-tick${selectedIndex === i ? " active" : ""}`;
    tick.textContent = String(voyageClockState.mode === "hour" ? (i === 0 ? 12 : i) : i * 5);
    const radius = 38;
    tick.style.left = `${50 + Math.cos(angle) * radius}%`;
    tick.style.top = `${50 + Math.sin(angle) * radius}%`;
    tick.addEventListener("click", () => {
      if (voyageClockState.mode === "hour") {
        const h12 = i === 0 ? 12 : i;
        const h24 = isPm ? (h12 % 12) + 12 : h12 % 12;
        elements.signalDue.value = formatDatetimeLocal({ ...parts, h: h24 });
        voyageClockState.mode = "minute";
      } else {
        elements.signalDue.value = formatDatetimeLocal({ ...parts, min: i * 5 });
      }
      syncVoyageClock(false);
    });
    elements.voyageClockFace.append(tick);
  }

  const handDeg = selectedIndex * 30;
  elements.voyageClockHand.style.transform = `rotate(${handDeg}deg)`;
  elements.voyageClockBrand.textContent = voyageClockState.mode === "hour" ? "HOUR" : "MIN";

  elements.voyageClock.querySelectorAll(".voyage-clock-mode").forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === voyageClockState.mode);
  });
  elements.voyageClock.querySelectorAll(".voyage-clock-ampm-btn").forEach((button) => {
    button.classList.toggle("active", (button.dataset.ampm === "pm") === isPm);
  });
}

function bindVoyageClock() {
  if (!elements.voyageClock || elements.voyageClock.dataset.bound === "1") return;
  elements.voyageClock.dataset.bound = "1";
  elements.voyageClock.querySelectorAll(".voyage-clock-mode").forEach((button) => {
    button.addEventListener("click", () => {
      voyageClockState.mode = button.dataset.mode === "minute" ? "minute" : "hour";
      syncVoyageClock(false);
    });
  });
  elements.voyageClock.querySelectorAll(".voyage-clock-ampm-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const parts = parseDatetimeLocal(elements.signalDue.value);
      const hour12 = ((parts.h + 11) % 12) + 1;
      const pm = button.dataset.ampm === "pm";
      const h24 = pm ? (hour12 % 12) + 12 : hour12 % 12;
      elements.signalDue.value = formatDatetimeLocal({ ...parts, h: h24 });
      syncVoyageClock(false);
    });
  });
}

function showSignalForm(entry = null) {
  selectedSignalId = entry?.id || null;
  elements.signalId.value = entry?.id || "";
  elements.signalTitle.value = entry?.title || "";
  elements.signalKind.value = entry?.kind || "reminder";
  elements.signalDue.value = toDatetimeLocalValue(entry?.dueAt || new Date(Date.now() + 30 * 60 * 1000).toISOString());
  elements.signalRepeat.value = entry?.repeat || "none";
  elements.signalNote.value = entry?.note || "";
  elements.signalSound.checked = entry ? Boolean(entry.sound) : entry?.kind === "alarm";
  elements.signalEnabled.checked = entry ? entry.enabled !== false : true;
  elements.signalSnooze.value = entry?.snoozeMinutes || 5;
  elements.signalDelete.hidden = !entry;
  voyageClockState.mode = "hour";
  bindVoyageClock();
  syncVoyageClock(false);
  openToolModal(elements.signalModal);
  elements.signalTitle.focus();
  renderSignals();
}

function renderSignalFilters() {
  document.querySelectorAll("[data-signal-filter]").forEach((button) => {
    button.classList.toggle("active", button.dataset.signalFilter === selectedSignalFilter);
  });
}

function renderSignals() {
  const query = elements.search.value.trim().toLowerCase();
  const filtered = signals.filter((item) => {
    if (selectedSignalFilter === "reminder" && item.kind !== "reminder") return false;
    if (selectedSignalFilter === "alarm" && item.kind !== "alarm") return false;
    if (selectedSignalFilter === "upcoming" && !(item.enabled && item.status === "scheduled")) return false;
    if (!query) return true;
    return [item.title, item.note, item.kind, item.status, item.repeat].join(" ").toLowerCase().includes(query);
  }).sort((a, b) => String(a.dueAt).localeCompare(String(b.dueAt)));

  elements.signalsList.replaceChildren();
  elements.signalsEmpty.hidden = filtered.length > 0 || isToolModalOpen(elements.signalModal);
  const upcoming = signals.filter((item) => item.enabled && item.status === "scheduled").length;
  elements.headerStatus.textContent = `${upcoming} upcoming · ${signals.length} signals`;
  renderSignalFilters();

  for (const [index, item] of filtered.entries()) {
    const card = document.createElement("article");
    card.className = `signal-card page-card-pad kind-${item.kind}${item.id === selectedSignalId ? " active" : ""}${item.enabled ? "" : " disabled"}`;
    card.style.animationDelay = `${Math.min(index, 8) * 40}ms`;
    card.append(makeWantedStrip(item.kind === "alarm" ? "ALARM" : "REMIND", item.kind === "alarm" ? "op-bolt" : "op-compass"));

    const head = document.createElement("div");
    head.className = "signal-card-head";
    const title = document.createElement("h3");
    title.className = "signal-card-title";
    title.textContent = item.title;
    const badge = document.createElement("span");
    badge.className = `signal-status status-${item.status}`;
    badge.textContent = item.status;
    head.append(title, badge);

    const when = document.createElement("p");
    when.className = "signal-card-when";
    when.textContent = formatSignalWhen(item.dueAt);

    const note = document.createElement("p");
    note.className = "signal-card-note";
    note.textContent = item.note || (item.repeat !== "none" ? `Repeats ${item.repeat}` : "One-shot signal");

    const meta = document.createElement("div");
    meta.className = "signal-card-meta";
    meta.textContent = [
      item.kind,
      item.repeat !== "none" ? item.repeat : null,
      item.sound ? "sound" : null,
      item.enabled ? "armed" : "disarmed",
    ].filter(Boolean).join(" · ");

    const actions = document.createElement("div");
    actions.className = "signal-card-actions";
    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "secondary-btn";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      showSignalForm(item);
    });
    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className = "secondary-btn";
    toggleBtn.textContent = item.enabled ? "Disarm" : "Arm";
    toggleBtn.addEventListener("click", async (event) => {
      event.stopPropagation();
      await api(`/api/signals/${item.id}`, {
        method: "PUT",
        body: JSON.stringify({ ...item, enabled: !item.enabled, status: !item.enabled ? "scheduled" : item.status }),
      });
      await loadSignals();
      showToast(item.enabled ? "Signal disarmed" : "Signal armed", "success");
    });
    actions.append(editBtn, toggleBtn);

    card.append(head, when, note, meta, actions);
    card.addEventListener("click", () => showSignalForm(item));
    elements.signalsList.append(card);
  }
}

async function loadSignals() {
  signals = await api("/api/signals");
  renderSignals();
}

async function saveSignalPayload(item) {
  const id = item.id;
  const url = id ? `/api/signals/${id}` : "/api/signals";
  const method = id ? "PUT" : "POST";
  return api(url, { method, body: JSON.stringify(item) });
}

async function handleSignalFire(item) {
  if (firingSignalIds.has(item.id)) return;
  firingSignalIds.add(item.id);
  try {
    pushBrowserNotification(item);
    if (item.sound || item.kind === "alarm") playAlarmSound(item.kind === "alarm" ? 12 : 3);

    if (item.kind === "alarm") {
      const snooze = await showConfirm(item.note || "The crow's nest is ringing.", {
        title: item.title || "Ship alarm",
        confirmLabel: "Dismiss",
        cancelLabel: `Snooze ${item.snoozeMinutes || 5}m`,
        tone: "danger",
        banner: "WANTED · ALARM",
      });
      stopAlarmSound();
      if (snooze) {
        if (item.repeat === "none") {
          await saveSignalPayload({ ...item, status: "done", enabled: false, lastFiredAt: new Date().toISOString() });
        } else {
          await saveSignalPayload({
            ...item,
            status: "scheduled",
            dueAt: nextRepeatDue(item.dueAt, item.repeat),
            lastFiredAt: new Date().toISOString(),
          });
        }
        showToast("Alarm dismissed", "warn");
      } else {
        const mins = item.snoozeMinutes || 5;
        await saveSignalPayload({
          ...item,
          status: "scheduled",
          dueAt: new Date(Date.now() + mins * 60_000).toISOString(),
          lastFiredAt: new Date().toISOString(),
        });
        showToast(`Snoozed ${mins} minutes`, "info");
      }
    } else {
      await showAlert(item.note || "Time to check the nest.", {
        title: item.title || "Reminder",
        tone: "info",
        banner: "WANTED · REMIND",
        confirmLabel: "Aye",
      });
      stopAlarmSound();
      if (item.repeat === "none") {
        await saveSignalPayload({ ...item, status: "fired", lastFiredAt: new Date().toISOString() });
      } else {
        await saveSignalPayload({
          ...item,
          status: "scheduled",
          dueAt: nextRepeatDue(item.dueAt, item.repeat),
          lastFiredAt: new Date().toISOString(),
        });
      }
      showToast("Reminder noted", "success");
    }
    await loadSignals();
  } finally {
    firingSignalIds.delete(item.id);
  }
}

async function checkDueSignals() {
  if (!signals.length) {
    try { signals = await api("/api/signals"); } catch { return; }
  }
  const now = Date.now();
  const due = signals.filter((item) => (
    item.enabled
    && item.status === "scheduled"
    && new Date(item.dueAt).getTime() <= now
    && !firingSignalIds.has(item.id)
  ));
  for (const item of due) {
    await handleSignalFire(item);
  }
  if (currentView === "watchtower") renderSignals();
}

function startSignalWatcher() {
  if (signalCheckTimer) clearInterval(signalCheckTimer);
  checkDueSignals().catch(() => {});
  signalCheckTimer = setInterval(() => {
    checkDueSignals().catch(() => {});
  }, 15000);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") checkDueSignals().catch(() => {});
  });
}

/* —— Focus —— */
function renderFocusHistory() {
  const query = elements.search.value.trim().toLowerCase();
  const filtered = focusSessions.filter((item) => {
    if (!query) return true;
    return [item.label, item.kind, String(item.minutes)].join(" ").toLowerCase().includes(query);
  });

  elements.focusHistory.replaceChildren();
  elements.focusEmpty.hidden = filtered.length > 0;
  elements.headerStatus.textContent = `${focusSessions.length} sessions · ${focusSessions.reduce((s, i) => s + Number(i.minutes || 0), 0)} min`;

  for (const [index, item] of filtered.entries()) {
    const row = document.createElement("div");
    row.className = "focus-history-item page-card-pad";
    row.style.animationDelay = `${Math.min(index, 8) * 35}ms`;
    row.append(makeWantedStrip((item.kind || "FOCUS").toUpperCase(), "op-bolt"));
    row.insertAdjacentHTML("beforeend", `
      <span class="focus-history-label">${item.label}</span>
      <span class="focus-history-meta">${item.minutes} min · ${item.kind}</span>
      <span class="focus-history-date">${displayDate(item.completedAt || item.updatedAt)}</span>
    `);
    elements.focusHistory.append(row);
  }
}

async function loadFocus() {
  focusSessions = await api("/api/focus");
  renderFocusHistory();
}

/* —— Command palette —— */
function openCommandPalette() {
  elements.commandPalette.hidden = false;
  elements.commandPaletteInput.value = "";
  paletteResults = [];
  paletteIndex = 0;
  renderPaletteResults();
  elements.commandPaletteInput.focus();
}

function closeCommandPalette() {
  elements.commandPalette.hidden = true;
}

function renderPaletteResults() {
  elements.commandPaletteResults.replaceChildren();
  if (!paletteResults.length) {
    const empty = document.createElement("li");
    empty.className = "command-palette-empty";
    empty.textContent = elements.commandPaletteInput.value.trim() ? "No matches" : "Type to search across all tools…";
    elements.commandPaletteResults.append(empty);
    return;
  }
  paletteResults.forEach((result, index) => {
    const li = document.createElement("li");
    li.className = `command-palette-item${index === paletteIndex ? " active" : ""}`;
    li.setAttribute("role", "option");
    li.innerHTML = `<span class="command-palette-title">${result.title}</span><span class="command-palette-sub">${result.subtitle}</span><span class="command-palette-type">${result.type}</span>`;
    li.addEventListener("click", () => navigatePaletteResult(result));
    elements.commandPaletteResults.append(li);
  });
}

async function navigatePaletteResult(result) {
  closeCommandPalette();
  await setView(result.type);
  if (result.type === "notes" && result.id) await openNote(result.id);
  else if (result.type === "vault" && result.id) {
    const full = await api(`/api/vault/${result.id}`);
    showVaultForm(full);
  } else if (result.type === "charts" && result.id) {
    const item = bookmarks.find((b) => b.id === result.id);
    if (item) showChartForm(item);
  } else if (result.type === "snippets" && result.id) {
    const item = snippets.find((s) => s.id === result.id);
    if (item) showSnippetForm(item);
  } else if (result.type === "berries" && result.id) {
    const item = expenses.find((e) => e.id === result.id);
    if (item) showBerryForm(item);
  } else if (result.type === "watchtower" && result.id) {
    const item = signals.find((s) => s.id === result.id) || await api(`/api/signals`).then((list) => list.find((s) => s.id === result.id));
    if (item) showSignalForm(item);
  }
}

async function searchPalette(query) {
  paletteResults = query.trim() ? await api(`/api/search?q=${encodeURIComponent(query.trim())}`) : [];
  paletteIndex = 0;
  renderPaletteResults();
}

/* —— Events —— */
elements.voyageAlertConfirm?.addEventListener("click", () => closeVoyageAlert(true));
elements.voyageAlertCancel?.addEventListener("click", () => closeVoyageAlert(false));
elements.voyageAlert?.querySelector("[data-voyage-alert-dismiss]")?.addEventListener("click", () => {
  closeVoyageAlert(elements.voyageAlert.dataset.mode === "alert");
});
elements.voyageAlert?.addEventListener("keydown", (event) => {
  if (elements.voyageAlert.hidden) return;
  if (event.key === "Enter") {
    event.preventDefault();
    closeVoyageAlert(true);
  }
});

elements.lockButton.addEventListener("click", async () => {
  const menu = elements.lockButton.closest("details");
  if (menu) menu.open = false;
  if (!(await showConfirm("Log out and return to the dock?", {
    title: "Leave the ship?",
    confirmLabel: "Log out",
    cancelLabel: "Stay aboard",
    tone: "warn",
    banner: "WANTED · DOCK",
  }))) return;
  await finishPendingSave();
  await api("/api/auth/logout", { method: "POST" }).catch(() => api("/api/lock", { method: "POST" }));
  goToLogin();
});

elements.headerProfileBtn.addEventListener("click", () => setView("profile"));
elements.menuProfileBtn.addEventListener("click", () => {
  const menu = elements.menuProfileBtn.closest("details");
  if (menu) menu.open = false;
  setView("profile");
});
elements.profileEditBtn.addEventListener("click", showProfileForm);
elements.profileFormCancel.addEventListener("click", hideProfileForm);
elements.profileCopyId.addEventListener("click", async () => {
  await navigator.clipboard.writeText(captainProfile?.shareId || "");
  showToast("Captain ID copied", "success");
});
elements.profileForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  captainProfile = await api("/api/profile", {
    method: "PUT",
    body: JSON.stringify({
      username: elements.profileEditUsername.value,
    }),
  });
  hideProfileForm();
  renderCaptainProfile();
  showToast("Captain name saved", "success");
});
elements.friendLookupBtn?.addEventListener("click", () => {
  previewFriendCaptain().catch(() => null);
});
elements.friendShareId?.addEventListener("change", () => {
  elements.friendPreview.hidden = true;
});
elements.friendForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  captainProfile = await api("/api/profile/friends", {
    method: "POST",
    body: JSON.stringify({
      shareId: elements.friendShareId.value,
      username: elements.friendUsername.value,
      note: elements.friendNote.value,
    }),
  });
  elements.friendForm.reset();
  elements.friendPreview.hidden = true;
  renderCaptainProfile();
  showToast("Friend added", "success");
});
elements.discoverForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  await loadDiscoverCaptains(elements.discoverQuery.value);
});

document.addEventListener("click", (event) => {
  document.querySelectorAll("details.captain-menu[open]").forEach((menu) => {
    if (!menu.contains(event.target)) menu.open = false;
  });
});

document.querySelectorAll(".nav-item[data-view]").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

elements.newButton.addEventListener("click", beginNewNote);
elements.emptyNewButton.addEventListener("click", beginNewNote);
elements.backButton.addEventListener("click", async () => {
  await finishPendingSave();
  setPreviewFullscreen(false);
  closePreviewLightbox();
  elements.app.classList.remove("editing");
  viewState.notes.editing = false;
  viewState.notes.noteId = null;
  viewState.notes.draft = null;
  persistViewState();
  syncAppRoute({ push: true });
});
elements.saveButton.addEventListener("click", () => saveCurrentNote());
elements.deleteButton.addEventListener("click", deleteCurrentNote);
elements.writeTab.addEventListener("click", () => {
  if (previewFullscreen) setPreviewFullscreen(false);
  setEditorMode("write");
});
elements.splitTab.addEventListener("click", () => {
  if (previewFullscreen) setPreviewFullscreen(false);
  setEditorMode("split");
});
elements.previewTab.addEventListener("click", () => setEditorMode("preview"));
elements.previewFullscreenBtn.addEventListener("click", () => setPreviewFullscreen(!previewFullscreen));
elements.previewTocBtn.addEventListener("click", () => setPreviewToc(!previewTocOpen));
elements.previewWidthBtn.addEventListener("click", () => setPreviewReaderWidth(!previewReaderWidth));
elements.previewLightboxClose.addEventListener("click", closePreviewLightbox);
elements.previewLightbox.addEventListener("click", (event) => {
  if (event.target === elements.previewLightbox) closePreviewLightbox();
});

document.querySelectorAll(".md-toolbar [data-md]").forEach((button) => {
  button.addEventListener("click", () => insertMarkdown(button.dataset.md));
});

elements.search.addEventListener("input", () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    if (currentView === "overview") loadOverview().catch((error) => showToast(error.message, "error"));
    else if (currentView === "profile") renderCaptainProfile();
    else if (currentView === "notes") loadNotes().catch((error) => showToast(error.message, "error"));
    else if (currentView === "vault") renderVaultList();
    else if (currentView === "quests") renderQuests();
    else if (currentView === "charts") renderCharts();
    else if (currentView === "snippets") renderSnippets();
    else if (currentView === "berries") renderBerries();
    else if (currentView === "watchtower") renderSignals();
    else if (currentView === "focus") renderFocusHistory();
  }, 120);
});

elements.menuButton.addEventListener("click", openSidebar);
elements.sidebarClose.addEventListener("click", closeSidebar);
elements.sidebarBackdrop.addEventListener("click", closeSidebar);

for (const input of [elements.title, elements.tags, elements.content]) {
  input.addEventListener("input", () => {
    scheduleAutosave();
    if (input === elements.content) scheduleLivePreview();
  });
}

elements.vaultNew.addEventListener("click", () => showVaultForm());
elements.vaultCancel.addEventListener("click", hideVaultForm);
elements.vaultIconAuto.addEventListener("click", () => setVaultIconValue(""));
elements.vaultIconClear.addEventListener("click", () => setVaultIconValue(""));
elements.vaultIconUrl.addEventListener("input", () => {
  const url = elements.vaultIconUrl.value.trim();
  setVaultIconValue(/^https?:\/\//i.test(url) ? url : "");
});
elements.vaultTitle.addEventListener("input", () => {
  if (!getVaultIconValue()) updateVaultIconPreview();
});
elements.vaultUrl.addEventListener("input", () => {
  if (!getVaultIconValue()) updateVaultIconPreview();
});
elements.vaultGenerate.addEventListener("click", async () => {
  const { password } = await api("/api/vault/generate", { method: "POST", body: JSON.stringify({ length: 20 }) });
  elements.vaultPassword.value = password;
});
elements.vaultCopy.addEventListener("click", async () => {
  await navigator.clipboard.writeText(elements.vaultPassword.value || "");
  showToast("Password copied", "success");
});
elements.vaultDelete.addEventListener("click", async () => {
  if (!selectedVaultId || !(await showConfirm("Delete this secret permanently?", {
    title: "Dump the treasure?",
    confirmLabel: "Delete",
    cancelLabel: "Keep sealed",
    tone: "danger",
  }))) return;
  await api(`/api/vault/${selectedVaultId}`, { method: "DELETE" });
  hideVaultForm();
  await loadVault();
  showToast("Secret deleted", "warn");
});
elements.vaultForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const payload = {
    id: elements.vaultId.value || undefined,
    title: elements.vaultTitle.value,
    username: elements.vaultUsername.value,
    password: elements.vaultPassword.value,
    url: elements.vaultUrl.value,
    notes: elements.vaultNotes.value,
    icon: getVaultIconValue(),
  };
  const method = payload.id ? "PUT" : "POST";
  const url = payload.id ? `/api/vault/${payload.id}` : "/api/vault";
  await api(url, { method, body: JSON.stringify(payload) });
  hideVaultForm();
  await loadVault();
  showToast("Secret saved", "success");
});

elements.questNew.addEventListener("click", () => showQuestForm());
elements.questCancel.addEventListener("click", hideQuestForm);
elements.questAddSub.addEventListener("click", () => addSubquestFields());
elements.questDelete.addEventListener("click", async () => {
  if (!selectedQuestId || !(await showConfirm("Delete this quest and its subquests?", {
    title: "Scrap the bounty?",
    confirmLabel: "Delete",
    cancelLabel: "Keep quest",
    tone: "danger",
  }))) return;
  await api(`/api/quests/${selectedQuestId}`, { method: "DELETE" });
  hideQuestForm();
  await loadQuests();
  showToast("Quest removed", "warn");
});
elements.questForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const payload = {
    id: elements.questId.value || undefined,
    title: elements.questTitle.value,
    level: elements.questLevel.value,
    dueDate: elements.questDue.value,
    description: elements.questDescription.value,
    notes: elements.questNotes.value,
    done: elements.questDone.checked,
    subquests: readSubquestsFromForm(),
  };
  const method = payload.id ? "PUT" : "POST";
  const url = payload.id ? `/api/quests/${payload.id}` : "/api/quests";
  const saved = await api(url, { method, body: JSON.stringify(payload) });
  if (saved?.id) expandedQuestIds.add(saved.id);
  hideQuestForm();
  await loadQuests();
  showToast("Quest saved", "success");
});
elements.questLevelFilters?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-level]");
  if (!button) return;
  selectedQuestLevel = button.dataset.level || "";
  elements.questLevelFilters.querySelectorAll(".quest-level-filter").forEach((item) => {
    item.classList.toggle("active", item === button);
  });
  renderQuests();
});

elements.chartsNew.addEventListener("click", () => showChartForm());
elements.chartsCancel.addEventListener("click", hideChartForm);
elements.chartsDelete.addEventListener("click", async () => {
  if (!selectedChartId || !(await showConfirm("Delete this chart?", {
    title: "Erase the route?",
    confirmLabel: "Delete",
    cancelLabel: "Keep chart",
    tone: "danger",
  }))) return;
  await api(`/api/bookmarks/${selectedChartId}`, { method: "DELETE" });
  hideChartForm();
  await loadCharts();
  showToast("Chart removed", "warn");
});
elements.chartsForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const payload = {
    title: elements.chartsTitle.value,
    url: elements.chartsUrl.value,
    tags: elements.chartsTags.value.split(","),
    notes: elements.chartsNotes.value,
  };
  const id = elements.chartsId.value;
  const method = id ? "PUT" : "POST";
  const url = id ? `/api/bookmarks/${id}` : "/api/bookmarks";
  await api(url, { method, body: JSON.stringify(id ? { ...payload, id } : payload) });
  hideChartForm();
  await loadCharts();
  showToast("Chart saved", "success");
});

elements.snippetsNew.addEventListener("click", () => showSnippetForm());
elements.snippetCancel.addEventListener("click", hideSnippetForm);
elements.snippetDelete.addEventListener("click", async () => {
  if (!selectedSnippetId || !(await showConfirm("Delete this snippet?", {
    title: "Toss the blueprint?",
    confirmLabel: "Delete",
    cancelLabel: "Keep it",
    tone: "danger",
  }))) return;
  await api(`/api/snippets/${selectedSnippetId}`, { method: "DELETE" });
  hideSnippetForm();
  await loadSnippets();
  showToast("Snippet deleted", "warn");
});
elements.snippetForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const payload = {
    title: elements.snippetTitle.value,
    language: elements.snippetLanguage.value,
    tags: elements.snippetTags.value.split(","),
    code: elements.snippetCode.value,
  };
  const id = elements.snippetId.value;
  const method = id ? "PUT" : "POST";
  const url = id ? `/api/snippets/${id}` : "/api/snippets";
  await api(url, { method, body: JSON.stringify(id ? { ...payload, id } : payload) });
  hideSnippetForm();
  await loadSnippets();
  showToast("Snippet saved", "success");
});

elements.berryNew.addEventListener("click", () => showBerryForm());
elements.berryFlow.addEventListener("change", () => {
  syncBerryCategoryOptions(elements.berryCategory.value);
  updateBerryFormChrome();
});
elements.berryRepeat?.addEventListener("change", updateBerryRepeatHint);
elements.berryCancel.addEventListener("click", () => {
  hideBerryForm();
  renderBerries();
});
elements.berryDelete.addEventListener("click", async () => {
  if (!selectedBerryId || !(await showConfirm("Delete this ledger entry?", {
    title: "Rip the receipt?",
    confirmLabel: "Delete",
    cancelLabel: "Keep it",
    tone: "danger",
  }))) return;
  await api(`/api/expenses/${selectedBerryId}`, { method: "DELETE" });
  hideBerryForm();
  await loadBerries();
  showToast("Entry deleted", "warn");
});
elements.berryForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const flow = elements.berryFlow.value === "income" ? "income" : "expense";
  const repeat = elements.berryRepeat?.value || "none";
  const payload = {
    title: elements.berryTitle.value,
    amount: Number(elements.berryAmount.value),
    flow,
    category: elements.berryCategory.value,
    date: elements.berryDate.value,
    note: elements.berryNote.value,
    repeat,
  };
  const id = elements.berryId.value;
  const method = id ? "PUT" : "POST";
  const url = id ? `/api/expenses/${id}` : "/api/expenses";
  await api(url, { method, body: JSON.stringify(id ? { ...payload, id } : payload) });
  hideBerryForm();
  await loadBerries();
  showToast(
    repeat !== "none"
      ? `${flow === "income" ? "Income" : "Expense"} sealed · repeats ${repeat}`
      : (flow === "income" ? "Income sealed" : "Expense sealed"),
    "success",
  );
});

elements.signalNew.addEventListener("click", () => showSignalForm());
elements.signalCancel.addEventListener("click", () => {
  hideSignalForm();
  renderSignals();
});
elements.signalNotifyBtn.addEventListener("click", () => {
  requestSignalNotifications().catch((error) => showToast(error.message, "error"));
});
elements.signalKind.addEventListener("change", () => {
  if (elements.signalKind.value === "alarm") elements.signalSound.checked = true;
});
document.querySelectorAll("[data-signal-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    selectedSignalFilter = button.dataset.signalFilter || "all";
    viewState.watchtower.filter = selectedSignalFilter;
    persistViewState();
    renderSignals();
  });
});
elements.signalDelete.addEventListener("click", async () => {
  if (!selectedSignalId || !(await showConfirm("Delete this signal permanently?", {
    title: "Silence the bell?",
    confirmLabel: "Delete",
    cancelLabel: "Keep it",
    tone: "danger",
  }))) return;
  await api(`/api/signals/${selectedSignalId}`, { method: "DELETE" });
  hideSignalForm();
  await loadSignals();
  showToast("Signal removed", "warn");
});
elements.signalForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const dueLocal = elements.signalDue.value;
  const dueAt = dueLocal ? new Date(dueLocal).toISOString() : new Date().toISOString();
  const payload = {
    title: elements.signalTitle.value,
    kind: elements.signalKind.value,
    note: elements.signalNote.value,
    dueAt,
    repeat: elements.signalRepeat.value,
    sound: elements.signalSound.checked,
    enabled: elements.signalEnabled.checked,
    snoozeMinutes: Number(elements.signalSnooze.value) || 5,
    status: "scheduled",
  };
  const id = elements.signalId.value;
  await saveSignalPayload(id ? { ...payload, id } : payload);
  hideSignalForm();
  await loadSignals();
  showToast(payload.kind === "alarm" ? "Alarm armed" : "Reminder set", "success");
});

document.querySelectorAll(".focus-preset").forEach((btn) => {
  btn.addEventListener("click", () => {
    selectFocusPreset(Number(btn.dataset.minutes), btn.dataset.kind, btn.textContent.trim());
  });
});
elements.focusStart.addEventListener("click", startFocusTimer);
document.querySelector("#focus-hero-start")?.addEventListener("click", () => elements.focusStart.click());
document.querySelectorAll("[data-view-jump]").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.viewJump));
});
elements.focusPause.addEventListener("click", pauseFocusTimer);
elements.focusReset.addEventListener("click", resetFocusTimer);

elements.focusWidgetToggle.addEventListener("click", () => {
  elements.focusWidgetPanel.hidden = !elements.focusWidgetPanel.hidden;
});
elements.focusWidgetStart.addEventListener("click", startFocusTimer);
elements.focusWidgetPause.addEventListener("click", pauseFocusTimer);
elements.focusWidgetReset.addEventListener("click", resetFocusTimer);
elements.focusWidgetOpen.addEventListener("click", () => {
  elements.focusWidgetPanel.hidden = true;
  setView("focus");
});

elements.commandPaletteBtn.addEventListener("click", openCommandPalette);
elements.commandPaletteBackdrop.addEventListener("click", closeCommandPalette);
elements.commandPaletteInput.addEventListener("input", () => {
  clearTimeout(paletteTimer);
  paletteTimer = setTimeout(() => {
    searchPalette(elements.commandPaletteInput.value).catch((error) => showToast(error.message, "error"));
  }, 120);
});
elements.commandPaletteInput.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    closeCommandPalette();
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    paletteIndex = Math.min(paletteIndex + 1, paletteResults.length - 1);
    renderPaletteResults();
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    paletteIndex = Math.max(paletteIndex - 1, 0);
    renderPaletteResults();
  } else if (event.key === "Enter" && paletteResults[paletteIndex]) {
    event.preventDefault();
    navigatePaletteResult(paletteResults[paletteIndex]);
  }
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    if (elements.commandPalette.hidden) openCommandPalette();
    else closeCommandPalette();
    return;
  }

  const typing = /INPUT|TEXTAREA|SELECT/.test(event.target.tagName) || event.target.isContentEditable;

  if (!typing && event.key.toLowerCase() === "f" && elements.app.classList.contains("editing") && !event.metaKey && !event.ctrlKey && !event.altKey) {
    event.preventDefault();
    setPreviewFullscreen(!previewFullscreen);
    return;
  }

  if (event.key === "Escape") {
    if (elements.voyageAlert && !elements.voyageAlert.hidden) {
      event.preventDefault();
      closeVoyageAlert(elements.voyageAlert.dataset.mode === "alert");
      return;
    }
    if (!elements.commandPalette.hidden) return;
    if (!elements.previewLightbox.hidden) {
      event.preventDefault();
      closePreviewLightbox();
      return;
    }
    if (previewFullscreen) {
      event.preventDefault();
      setPreviewFullscreen(false);
      return;
    }
    if (isToolModalOpen(elements.profileModal)) {
      event.preventDefault();
      hideProfileForm();
      return;
    }
    if (isToolModalOpen(elements.berryModal)) {
      event.preventDefault();
      hideBerryForm();
      renderBerries();
      return;
    }
    if (isToolModalOpen(elements.questModal)) {
      event.preventDefault();
      hideQuestForm();
      renderQuests();
    } else if (isToolModalOpen(elements.vaultModal)) {
      event.preventDefault();
      hideVaultForm();
      renderVaultList();
    } else if (isToolModalOpen(elements.chartsModal)) {
      event.preventDefault();
      hideChartForm();
      renderCharts();
    } else if (isToolModalOpen(elements.snippetModal)) {
      event.preventDefault();
      hideSnippetForm();
      renderSnippets();
    }
  }
});

document.querySelectorAll("[data-close-modal]").forEach((backdrop) => {
  backdrop.addEventListener("click", () => {
    const kind = backdrop.getAttribute("data-close-modal");
    if (kind === "vault") {
      hideVaultForm();
      renderVaultList();
    } else if (kind === "profile") {
      hideProfileForm();
    } else if (kind === "berry") {
      hideBerryForm();
      renderBerries();
    } else if (kind === "quest") {
      hideQuestForm();
      renderQuests();
    } else if (kind === "charts") {
      hideChartForm();
      renderCharts();
    } else if (kind === "snippet") {
      hideSnippetForm();
      renderSnippets();
    } else if (kind === "signal") {
      hideSignalForm();
      renderSignals();
    } else if (kind === "captain") {
      closeCaptainModal();
    }
  });
});

window.addEventListener("beforeunload", (event) => {
  if (changed) event.preventDefault();
});

window.matchMedia("(min-width: 1024px)").addEventListener("change", (event) => {
  if (elements.app.classList.contains("editing")) {
    setEditorMode(event.matches ? "split" : editorMode === "split" ? "write" : editorMode);
  }
});

updateFocusUI();
renderVaultIconPicks();

const session = await api("/api/session");
if (!session.authenticated && !session.unlocked) {
  goToLogin();
} else {
  showApp();
  await applyAppRoute();
  startSignalWatcher();
  loadSignals().catch(() => {});
}

window.addEventListener("popstate", () => {
  applyAppRoute().catch((error) => showToast(error.message, "error"));
});

if ("serviceWorker" in navigator) navigator.serviceWorker.register("/service-worker.js");
