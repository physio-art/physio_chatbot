// Cache name
const CACHE_NAME = 'physio-chatbot-cache-v1';

// Files to cache
const filesToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/sw.js',
  '/icon-192.png',  // Add your icon paths if you have them
  '/icon-512.png',  // Add your icon paths if you have them
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching Files');
        return cache.addAll(filesToCache);
      })
  );
});

// Activate Service Worker
self.addEventListener('activate', event => {
  console.log('Service Worker: Activated');
});

// Fetch Event: Serve cached files when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cacheResponse => {
        return cacheResponse || fetch(event.request); // If not in cache, fetch from network
      })
  );
});
