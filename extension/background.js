/* Background proxies API calls so Firefox host permissions apply reliably. */
const ext = globalThis.browser ?? globalThis.chrome;

ext.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (!message || message.type !== "api") return false;

  (async () => {
    try {
      const response = await fetch(`${String(message.url || "").replace(/\/$/, "")}${message.path}`, {
        method: message.method || "GET",
        headers: {
          "Content-Type": "application/json",
          ...(message.token ? { Authorization: `Bearer ${message.token}` } : {}),
        },
        body: message.body === undefined ? undefined : JSON.stringify(message.body),
      });
      if (response.status === 204) {
        sendResponse({ ok: true, status: 204, data: null });
        return;
      }
      const data = await response.json().catch(() => ({}));
      sendResponse({
        ok: response.ok,
        status: response.status,
        data,
        error: response.ok ? null : (data.error || `Request failed (${response.status})`),
      });
    } catch (error) {
      sendResponse({
        ok: false,
        status: 0,
        data: null,
        error: String(error?.message || error || "Network error"),
      });
    }
  })();

  return true; // async response
});
