// Simple service worker that doesn't interfere with network requests
// Version 1.0

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

// Don't intercept network requests - let them go through normally
self.addEventListener('fetch', event => {
  // Just let the network handle it
  return;
}); 