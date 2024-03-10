'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "23c19bc5edfdb98470dfe3184e3d7f6d",
"index.html": "d99dcf69f535a3e666484f05a8a5e246",
"/": "d99dcf69f535a3e666484f05a8a5e246",
"favicon.jpeg": "376bae9aa7408be2814087bfcb92a2a6",
"main.dart.js": "fec0a33d572f37b6cf1bc42b4e17d871",
"flutter.js": "c71a09214cb6f5f8996a531350400a9a",
"icons/icon-192.png": "376bae9aa7408be2814087bfcb92a2a6",
"icons/icon-maskable-192.png": "376bae9aa7408be2814087bfcb92a2a6",
"icons/icon-maskable-512.png": "376bae9aa7408be2814087bfcb92a2a6",
"icons/icon-512.png": "376bae9aa7408be2814087bfcb92a2a6",
"manifest.json": "1c580c7a2d994aeb55f240f5e2f08425",
"assets/AssetManifest.json": "43f1847d4c263266d65a314d01c1d190",
"assets/NOTICES": "2b3c24d9183a664eab875b1e0435c4c0",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "ff9fbd0698b97d9334ec29383520f7bd",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "7ed656ab3e734e20f654819bb7996b00",
"assets/fonts/MaterialIcons-Regular.otf": "213ead556766ccafb782b56044fcddaf",
"assets/assets/email.png": "5eb3c4b86aafbee72b8c471b29413a50",
"assets/assets/mappin.png": "9cc090022ae31337336d2024160714b8",
"assets/assets/design.png": "6aaec412d8837ac9a83f03f453877606",
"assets/assets/adopbox.png": "47c22924671146a2e183bb4183102534",
"assets/assets/sifat.png": "376bae9aa7408be2814087bfcb92a2a6",
"assets/assets/arafat.jpeg": "77e7a9ebd849b50a1f6d129635cc32e1",
"assets/assets/eatonomy.png": "6ff27841360c9e8b6901eb22b3417a0f",
"assets/assets/favicon.jpeg": "376bae9aa7408be2814087bfcb92a2a6",
"assets/assets/salesx.png": "8271163cdcc853bea5f8a2062d0c2dd2",
"assets/assets/mohsin.jpeg": "48a76b6ed4f53c87e4ce6fde72c956c3",
"assets/assets/shot.png": "297fcf5ce6cddb5b58b2e6d447795015",
"assets/assets/promote.png": "2bd8adcad79a4ebb80888d1a0583b3c4",
"assets/assets/quote.png": "1a0aa9a06293ac5689bc32012e0e13e6",
"assets/assets/shomriddi.png": "f8a610668ab907dc83f7d85f8de8897c",
"assets/assets/develop.png": "471c2c94d5d04112086eba9fd78c6809",
"assets/assets/regal.png": "692ed141b8663f123d865358f448c487",
"assets/assets/biddabari.png": "f34eca2c8feabdf5fe0b41198ce9c6fa",
"assets/assets/hrx.png": "b1b9d3e03a051c012c078b11e75967a6",
"assets/assets/pmx.png": "f54bc7c4fc108aca18ca17ecd8d5a6a3",
"assets/assets/ios.jpg": "a0506b7985f9613c66f8ce2e520fea27",
"assets/assets/phone.png": "45903a1ffa9ede882171aca9f71c4c29",
"assets/assets/ios.png": "49f79e21da11e96b8cf0e3b8bef6616c",
"assets/assets/maaclogo.svg": "4f3c39fb0cfcd3e2a63005b6bea37939",
"assets/assets/mm.png": "7da1e101515e0f8d68b1b115ca0e4111",
"assets/assets/write.png": "dc4f0d3df06d5fc9b13b9168b88e2560",
"assets/assets/whatsapp.png": "426617ad28567da23a2346566d84b5a6",
"assets/assets/aisky.png": "64c02fdb6c04eedb2446b3dd550488a7",
"assets/assets/cv.pdf": "5cdf6d91f14a81dab0f4a66084cbf65f",
"assets/assets/fieldx.png": "0ccc0fc81ecfed0128d6288b44fb411d",
"canvaskit/skwasm.js": "445e9e400085faead4493be2224d95aa",
"canvaskit/skwasm.js.symbols": "741d50ffba71f89345996b0aa8426af8",
"canvaskit/canvaskit.js.symbols": "38cba9233b92472a36ff011dc21c2c9f",
"canvaskit/skwasm.wasm": "e42815763c5d05bba43f9d0337fa7d84",
"canvaskit/chromium/canvaskit.js.symbols": "4525682ef039faeb11f24f37436dca06",
"canvaskit/chromium/canvaskit.js": "43787ac5098c648979c27c13c6f804c3",
"canvaskit/chromium/canvaskit.wasm": "f5934e694f12929ed56a671617acd254",
"canvaskit/canvaskit.js": "c86fbd9e7b17accae76e5ad116583dc4",
"canvaskit/canvaskit.wasm": "3d2a2d663e8c5111ac61a46367f751ac",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
