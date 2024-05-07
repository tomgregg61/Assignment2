// You can change the number on the end of the site to refresh the cache
const CACHE_NAME = "my-site-v1";

// add all your files in the CACHE_URLS
const CACHE_URLS = [
  "/",
  "cssdemo.css",
  "cssdemo.html",
  "demos.html",
  "holding.html",
  "index.html",
  "qualifications.html",
  "interests.html",
  "styles.css",
  "manifest.json",
  "404.html",
  "images/demo/cssLogo.svg",
  "images/demo/jsLogo.svg",
  "images/index/flowerImgRemoved.webp",
  "images/index/rodman.webp",
  "images/index/thomasGregg.webp",
  "images/interests/duneSFimg.webp",
  "images/interests/fnafImg.webp",
  "images/interests/heartstopperImg.webp",
  "images/interests/infinWarPostimg.webp",
  "images/interests/KofHmvimg.webp",
  "images/interests/mazeRunnerImg.webp",
  "images/interests/readyP1img.webp",
  "images/interests/womenOnPornImg.webp",
  "icons/android-chrome-192x192.png",
  "icons/android-chrome-256x256.png",
  "icons/apple-touch-icon.png",
  "icons/browserconfig.xml",
  "icons/favicon-16x16.png",
  "icons/favicon-32x32.png",
  "icons/favicon-512x512.png",
  "icons/favicon.ico",
  "icons/maskable_icon_x192.png",
  "icons/maskable_icon.png",
  "icons/mstile-150x150.png",
  "icons/safari-pinned-tab.svg",
  // add all your images in here, in the correct folders. No need to add this file
];
//DO NOT change any of the code below

self.addEventListener("install", function (event) {
  console.log("Service worker installed");
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Cache opened");
      return cache.addAll(CACHE_URLS);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName.startsWith("my-site-") && CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        console.log(`Return ${event.request.url} from cache`);
        return response;
      }
      console.log(`Fetch ${event.request.url} from network`);
      return fetch(event.request);
    })
  );
});
