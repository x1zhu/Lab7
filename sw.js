// sw.js - Service Worker

// You will need 3 e listeners:
//   - One for installation
//   - One for activation ( check out MDN's clients.claim() for this step )
//   - One for fetch requests


self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open("journal_entries")
        .then(function(cache) {
            return cache.add('https://cse110lab6.herokuapp.com/entries');
        })
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(clients.claim());
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request)
        .then(function(response) {
            if (response)
                return response;
            else
                return fetch(e.request);
        }
    ));
});