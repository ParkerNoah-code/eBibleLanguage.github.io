const CACHE_NAME = "ebible-cache-v1";
const URLS_TO_CACHE = [
  "./index.html",
  "./Styles.css",
  "./manifest.json",
  "./cross_image.png",
  "./script.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
