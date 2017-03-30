const VERSION = 'v0'
const PROTECT = ['v0']
const LIST = [
  '/images/0.png',
  '/images/1.png'
]

this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(VERSION).then(cache => cache.addAll(LIST))
  )
})

this.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response
        // fetch extract resource and cache them
        return fetchExtract(event.request)
      })
      .catch(() => {
        fetch(event.request)
      })
  )
})

this.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keyList => Promise.all(
      keyList.map(key => (PROTECT.includes(key) ? caches.delete(key) : undefined))
    )
  ))
})

function fetchExtract(request) {
  fetch(request).then(res => {
    const clone = res.clone()
    caches.open(VERSION).then(cache => cache.put(request, clone))
    return res
  })
}
