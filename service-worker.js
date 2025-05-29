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

// Pre-cache static resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Delete old caches during activation
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Fetch handler with split strategy
self.addEventListener("fetch", (event) => {
  const requestURL = new URL(event.request.url);

  // Use network-first strategy for lesson pages
  if (requestURL.pathname.startsWith("/Lessons/")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
        .catch(() => caches.match(event.request)) // fallback if offline
    );
  } else {
    // Cache-first strategy for other assets
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
  }
});
