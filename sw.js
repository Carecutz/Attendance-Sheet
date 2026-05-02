const CACHE = "carewax-v2";
const ASSETS = [
  "/Attendance-Sheet/attendance-app.html",
  "/Attendance-Sheet/manifest.json",
  "/Attendance-Sheet/icon-192.png",
  "/Attendance-Sheet/icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => 
    Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(
    clients.openWindow("/Attendance-Sheet/attendance-app.html")
  );
});
