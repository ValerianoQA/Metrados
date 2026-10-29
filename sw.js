// Guarda la página para usarla sin internet. Versión cambia sola con cada actualización.
const CACHE = 'metrados-80999e6414';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'icono-192.png', 'icono-512.png', 'xlsx.full.min.js'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); });
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // primero internet (para recibir versiones nuevas), si no hay conexión usa lo guardado
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(k => k.put(e.request, c)); return r; })
    .catch(() => caches.match(e.request).then(r => r || caches.match('index.html'))));
});
