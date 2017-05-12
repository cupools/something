const CONFIG = JSON.parse('<%= stringify(options) %>')
const LIST = JSON.parse('<%= stringify(assets) %>')

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CONFIG.cacheName).then(cache => cache.addAll(LIST))
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response
        // fetch extract resource and cache them
        return fetchAndCache(event.request)
      })
      .catch(() => fetch(event.request))
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => Promise.all(
      keyList.map(key => (LIST.includes(key) ? caches.delete(key) : Promise.resolve()))
    )
  ))
})

self.addEventListener('push', event => {
  event.waitUntil(
    self.self.registration.showNotification('push comming', {
      body: 'Message from push'
    })
  )
})

self.addEventListener('message', event => {
  const { ports } = event
  ports[0].postMessage(`sw: receive msg '${event.data}'`)
})

function fetchAndCache(request) {
  return fetch(request).then(res => {
    const clone = res.clone()
    caches.open(CONFIG.cacheName).then(cache => cache.put(request, clone))
    return res
  })
}
