const RUNTIME_CACHE = 'leimxnsquare-runtime'
const ASSET_FILE_RE = /\.(js|css|png|jpg|jpeg|gif|webp|svg|ico|mp4|webm|mp3|ogg|wav|ttf|woff|woff2|otf|gltf|glb|bin)$/i

self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (event) => {
    const { request } = event
    if (request.method !== 'GET') return

    const url = new URL(request.url)
    if (url.origin !== self.location.origin) return

    const isHtml = request.mode === 'navigate' || request.destination === 'document'
    const isAsset = url.pathname.includes('/assets/') || ASSET_FILE_RE.test(url.pathname)

    if (isHtml) {
        event.respondWith(fetch(request))
        return
    }

    if (!isAsset) return

    event.respondWith(
        caches.open(RUNTIME_CACHE).then(async (cache) => {
            const cached = await cache.match(request)
            const network = fetch(request)
                .then((response) => {
                    if (response.ok) cache.put(request, response.clone())
                    return response
                })
                .catch(() => cached)

            return cached || network
        })
    )
})