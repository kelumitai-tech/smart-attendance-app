// Cache එකට නමක් දෙනවා
const CACHE_NAME = 'smart-attendance-v1';
// Offline වැඩ කරන්න ඕන files ටික
const urlsToCache = [
  'index.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
];

// 1. Install Event: App එක install කරද්දී files ටික cache කරනවා
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Fetch Event: App එක පාවිච්චි කරද්දී, ඉන්ටර්නෙට් නැත්නම් cache එකෙන් data දෙනවා
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache එකේ තියෙනවා නම්, ඒක දෙනවා
        if (response) {
          return response;
        }
        // Cache එකේ නැත්නම්, ඉන්ටර්නෙට් එකෙන් අරන් දෙනවා
        return fetch(event.request);
      }
    )
  );
});