// Change this name when the interface changes so installed PWAs refresh cleanly.
const CACHE_NAME = "private-notes-v3";
const APP_SHELL = ["/app", "/styles.css", "/app.js", "/manifest.json", "/icons/favicon.ico", "/icons/favicon-32.png", "/icons/icon-192.png", "/icons/icon-512.png"];

// Cache only the interface files. Notes always come from the local server.
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) => Promise.all(names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name)))),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || new URL(event.request.url).pathname.startsWith("/api/")) return;
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
