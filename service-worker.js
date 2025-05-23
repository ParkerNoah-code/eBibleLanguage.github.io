const CACHE_NAME = "ebible-language-cache-v1";
const URLS_TO_CACHE = [
  "./index.html",
  "./Styles.css",
  "./manifest.json",
  "./cross_image.png",
  "./script.js",
  "./Lessons/lesson1.html",
  "./Lessons/lesson2.html",
  "./Lessons/lesson3.html",
  "./Lessons/lesson4.html",
  "./Lessons/lesson5.html",
  "./Lessons/lesson6.html",
  "./Lessons/lesson7.html",
  "./Lessons/lesson8.html",
  "./Lessons/lesson9.html",
  "./Lessons/lesson10.html",
  "./Lessons/lesson11.html",
  "./Lessons/lesson12.html",
  "./Lessons/lesson13.html",
  "./Lessons/lesson14.html",
  "./Lessons/lesson15.html",
  "./Lessons/lesson16.html",
  "./Lessons/lesson17.html",
  "./Lessons/lesson18.html",
  "./Lessons/lesson19.html",
  "./Lessons/lesson20.html",
  "./Lessons/lesson21.html",
  "./Lessons/lesson22.html",
  "./Lessons/lesson23.html",
  "./Lessons/lesson24.html",
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
