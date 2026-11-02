// Service Worker: offline lernen und sofort starten. Versionierte Dateien (?v=) kommen aus dem Cache,
// alles andere zuerst aus dem Netz mit Cache als Rückfall. build.mjs setzt VERSION.
const VERSION = '495a719424';
const CACHE = 'ap2-' + VERSION;
const CORE = ['./', 'index.html', 'main.js', 'bundle.js?v=' + VERSION, 'manifest.webmanifest', 'icon.svg'];

self.addEventListener('install', (ev) => {
  ev.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (ev) => {
  ev.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith('ap2-') && key !== CACHE).map((key) => caches.delete(key))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (ev) => {
  const req = ev.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  if (url.searchParams.has('v')) {
    ev.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((cache) => cache.put(req, copy));
      return res;
    })));
    return;
  }
  ev.respondWith(fetch(req).then((res) => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((cache) => cache.put(req, copy)); }
    return res;
  }).catch(() => caches.match(req).then((hit) => hit || caches.match('index.html'))));
});
