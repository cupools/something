'use strict';

var CONFIG = JSON.parse('<%= JSON.stringify(options).replace(/\\\\\\\\/g, "\\\\") %>');
var LIST = JSON.parse('<%= JSON.stringify(assets) %>');

self.addEventListener('install', function (event) {
  event.waitUntil(caches.open(CONFIG.cacheName).then(function (cache) {
    return cache.addAll(LIST);
  }));
});

self.addEventListener('fetch', function (event) {
  event.respondWith(caches.match(event.request).then(function (response) {
    if (response) return response;
    // fetch extract resource and cache them
    return fetchAndCache(event.request);
  }).catch(function () {
    return fetch(event.request);
  }));
});

self.addEventListener('activate', function (event) {
  event.waitUntil(caches.keys().then(function (keyList) {
    return Promise.all(keyList.map(function (key) {
      return CONFIG.assets.includes(key) ? caches.delete(key) : Promise.resolve();
    }));
  }));
});

self.addEventListener('push', function (event) {
  event.waitUntil(self.self.registration.showNotification('push comming', {
    body: 'Message from push'
  }));
});

self.addEventListener('message', function (event) {
  var ports = event.ports;

  ports[0].postMessage('sw: receive msg \'' + event.data + '\'');
});

function fetchAndCache(request) {
  return fetch(request).then(function (res) {
    var clone = res.clone();
    caches.open(CONFIG.cacheName).then(function (cache) {
      return cache.put(request, clone);
    });
    return res;
  });
}