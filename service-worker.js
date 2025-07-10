const CACHE_NAME = "ebible-language-cache-v1";
const URLS_TO_CACHE = [
  "./index.html",
  "./Styles.css",
  "./manifest.json",
  "./cross_image.png",
  "./script.js",
  "./Memory/Adjectives.html",
  "./Memory/Adverbs.html",
  "./Memory/Alphabet.html",
  "./Memory/BasicPronouns.html",
  "./Memory/FirstDeclension.html",
  "./Memory/Imperative.html",
  "./Memory/Indicative.html",
  "./Memory/Infinitives.html",
  "./Memory/Optative.html",
  "./Memory/OtherPronouns.html",
  "./Memory/Participles.html",
  "./Memory/Particles.html",
  "./Memory/Prepositions.html",
  "./Memory/SecondDeclension.html",
  "./Memory/Subjunctive.html",
  "./Memory/ThirdDeclension.html",
];

self.addEventListener("install", (event) => {
  self.skipWaiting(); // ⬅ Forces activation immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

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
    ).then(() => self.clients.claim()) // ⬅ Take control of open pages
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

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});