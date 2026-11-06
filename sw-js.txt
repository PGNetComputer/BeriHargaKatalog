/* Ambil dari internet dulu (selalu versi terbaru), simpanan hanya dipakai kalau sedang offline.
   Data harga tidak lewat sini: panggilan ke Apps Script (domain lain) dibiarkan langsung. */
var CACHE = 'beriharga-v2';
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

/* Notifikasi dari Firebase (pesan data: judul, isi, url). */
self.addEventListener('push', function (e) {
  var d = {};
  try { var j = e.data ? e.data.json() : {}; d = j.data || j; if (j.notification) { d.judul = d.judul || j.notification.title; d.isi = d.isi || j.notification.body; } }
  catch (x) { d = { isi: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.judul || 'PGNet Harga', {
    body: d.isi || '', icon: 'icon-192.png', badge: 'icon-192.png', tag: d.tag || 'pgnet-harga', renotify: true,
    data: { url: d.url || './' }
  }));
});
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var url = (e.notification.data && e.notification.data.url) || './';
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (cs) {
    for (var i = 0; i < cs.length; i++) {
      if (cs[i].url.indexOf(self.registration.scope) === 0 && 'focus' in cs[i]) {
        var c = cs[i];
        return c.focus().then(function () { return c.navigate ? c.navigate(url) : null; }).catch(function () { return clients.openWindow(url); });
      }
    }
    return clients.openWindow(url);
  }));
});
