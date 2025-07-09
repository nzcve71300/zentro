self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('zentro-cache-v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/builder.html',
        '/builder.css',
        '/builder.js',
        '/auth.js',
        '/login.html',
        '/register.html',
        '/assets/zentro-logo.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request);
    })
  );
});
