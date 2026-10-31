/* Ambil dari internet dulu (selalu versi terbaru), simpanan hanya dipakai kalau sedang offline.
   Data harga tidak lewat sini: panggilan ke Apps Script (domain lain) dibiarkan langsung. */
var CACHE = 'beriharga-v1';
var FILE = ['./', './index.html', './config.js', './manifest.json', './icon-192.png'];
self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILE); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(function (r) {
    var salin = r.clone();
    caches.open(CACHE).then(function (c) { c.put(e.request, salin); });
    return r;
  }).catch(function () {
    return caches.match(e.request).then(function (r) { return r || caches.match('./index.html'); });
  }));
});
