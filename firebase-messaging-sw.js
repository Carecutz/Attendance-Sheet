importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAZJ_v2ZFhB3NExtlWwGdluZkGDw4h-JbM",
  authDomain: "carewax-attendance.firebaseapp.com",
  databaseURL: "https://carewax-attendance-default-rtdb.firebaseio.com",
  projectId: "carewax-attendance",
  storageBucket: "carewax-attendance.firebasestorage.app",
  messagingSenderId: "910895665667",
  appId: "1:910895665667:web:bd51bd3cedbd7c02c17436"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const title = payload.notification?.title || 'Carewax';
  const body = payload.notification?.body || '';
  self.registration.showNotification(title, {
    body: body,
    icon: '/Attendance-Sheet/icon-192.png',
    badge: '/Attendance-Sheet/icon-192.png',
    tag: 'carewax-notification',
    requireInteraction: true,
    vibrate: [200, 100, 200]
  });
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/Attendance-Sheet/attendance-app.html')
  );
});
