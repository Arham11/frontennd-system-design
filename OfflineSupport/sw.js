const CACHE_NAME = "demo/v4";

globalThis.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll([
        "./index.html",
        "./index.css",
        "index.js",
        "./public/painting-mountain-lake-with-mountain-background.jpg",
      ]);
    }),
  );
});

globalThis.addEventListener("activate", (e) => {
  // clean up stale cache
  e.waitUntil(
    caches.keys().then((keylist) => {
      return keylist.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      });
    }),
  );
});

// making a proxy to fetch data from server or cache storage
globalThis.addEventListener("fetch", (e) => {
  // two ways to fetch the data
  // 1. if data is found on cache storage, fetch directly from there, if not
  // fetch it from server and then add it.
  // 2. Always fetch data first from the server, and use SW as a fallback
  // on offline mode or when there is some error on server.
  // using 2 approach below
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const cloneData = res.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, cloneData);
        });
        return res;
      })
      .catch((err) => {
        return caches.match(e.request).then((file) => file);
      }),
  );
});
