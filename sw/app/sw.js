const VERSION = 'v0'
const PROTECT = ['v0']
const LIST = [
  '/examples/images/0.png',
  '/examples/images/1.png'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(VERSION).then(cache => cache.addAll(LIST))
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response
        // fetch extract resource and cache them
        return fetchExtract(event.request)
      })
      .catch(() => fetch(event.request))
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => Promise.all(
      keyList.map(key => (PROTECT.includes(key) ? caches.delete(key) : undefined))
    )
  ))
})

self.addEventListener('push', event => {
  console.log(event.data.text())
})

self.addEventListener('message', event => {
  const { ports } = event
  ports[0].postMessage(`sw: receive msg '${event.data}'`)
})

function fetchExtract(request) {
  return fetch(request).then(res => {
    const clone = res.clone()
    caches.open(VERSION).then(cache => cache.put(request, clone))
    return res
  })
}
