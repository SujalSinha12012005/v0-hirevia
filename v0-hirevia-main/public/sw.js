const CACHE_NAME = 'hirevia-cache-v1'
const OFFLINE_URL = '/offline.html'

const PRECACHE_RESOURCES = [
  '/',
  OFFLINE_URL,
  '/manifest.json',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_RESOURCES))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key)
        })
      )
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  // Always try network first, fall back to cache, and finally offline page for navigation
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Put a copy in cache
          const copy = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy))
          return response
        })
        .catch(() => caches.match(OFFLINE_URL))
    )
    return
  }

  // For other requests, try cache first then network
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  )
})
