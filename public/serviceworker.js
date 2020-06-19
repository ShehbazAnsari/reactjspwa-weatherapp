const CACHE_NAME = 'version-1'
const urlToCache = ['index.html', 'offline.html']

const self = this

//Install Service Workers
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened Caches')
        return cache.addAll(urlToCache)
      })
  )
})

//Listening For Requests
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then(() => {
        return fetch(e.request)
          .catch(() => caches.match('offline.html'))
      })
  )
})

//Activate Service Workers
self.addEventListener('activate', (e) => {
  const cacheWhitelist = []
  cacheWhitelist.push(CACHE_NAME)
  e.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        if (!cacheWhitelist.includes(cacheName)) {
          return caches.delete(cacheName)
        }
      })
    ))
  )
})