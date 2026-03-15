const CACHE_NAME = 'smartgrow-v1.6';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap'
];

/* Install — cache core assets */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

/* Activate — clean old caches */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

/* Fetch — network first, fall back to cache */
self.addEventListener('fetch', event => {
  // Skip non-GET and MQTT websocket requests
  if(event.request.method !== 'GET') return;
  if(event.request.url.includes('emqxsl.com')) return;

  // Skip Firebase auth/firestore API calls (must always go to network)
  if(event.request.url.includes('googleapis.com/identitytoolkit')) return;
  if(event.request.url.includes('firestore.googleapis.com')) return;
  if(event.request.url.includes('securetoken.googleapis.com')) return;

  if(event.request.url.includes('unpkg.com/mqtt') || event.request.url.includes('gstatic.com/firebasejs')) {
    // Always try network for external libraries, cache as fallback
    event.respondWith(
      fetch(event.request)
        .then(resp => {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return resp;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(resp => {
        // Cache successful responses
        if(resp.status === 200){
          const clone = resp.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return resp;
      })
      .catch(() => caches.match(event.request))
  );
});