const CACHE_NAME = 'leimxnsquare-v1'
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/simsunb.ttf',
    '/bee.png',
    '/bulusan.png',
    '/flash.mp4',
    '/bee/source/model.gltf',
    '/sounds/beesound.mp3',
    '/sounds/folder.mp3',
    '/posters/callme.png',
    '/posters/evilj.png',
    '/posters/giselle.jpg',
    '/posters/jennie.png',
    '/posters/kanibalismo.png',
    '/posters/multo.png',
    '/posters/newj.png',
    '/posters/ning.png',
    '/posters/perception.png',
    '/posters/pusa.png',
    '/posters/rockstar.png',
    '/posters/thea.png',
    '/posters/vintage.png',
    '/posters/yunjin.png',
    '/posters/yunjin2.png',
]

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
    )
    self.skipWaiting()
})

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
        )
    )
    self.clients.claim()
})

self.addEventListener('fetch', (e) => {
    const { request } = e
    const url = new URL(request.url)

    if (request.method !== 'GET') return
    if (url.origin !== location.origin && !url.href.startsWith('https://fonts.')) return

    if (
        url.pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico|mp4|webm|mp3|ogg|wav|ttf|woff|woff2|otf|gltf|glb|bin)$/i)
    ) {
        e.respondWith(
            caches.open(CACHE_NAME).then(async (cache) => {
                const cached = await cache.match(request)
                if (cached) return cached
                const res = await fetch(request)
                if (res.ok) cache.put(request, res.clone())
                return res
            })
        )
        return
    }

    if (url.origin === location.origin && (url.pathname === '/' || url.pathname.endsWith('.html'))) {
        e.respondWith(
            caches.open(CACHE_NAME).then(async (cache) => {
                try {
                    const res = await fetch(request)
                    if (res.ok) cache.put(request, res.clone())
                    return res
                } catch {
                    const cached = await cache.match(request)
                    return cached || cache.match('/index.html')
                }
            })
        )
        return
    }

    if (url.pathname.match(/\.(js|css|jsx|ts|tsx)$/i) || url.pathname.includes('/assets/')) {
        e.respondWith(
            caches.open(CACHE_NAME).then(async (cache) => {
                const cached = await cache.match(request)
                if (cached) {
                    fetch(request).then((res) => { if (res.ok) cache.put(request, res.clone()) }).catch(() => { })
                    return cached
                }
                const res = await fetch(request)
                if (res.ok) cache.put(request, res.clone())
                return res
            })
        )
        return
    }

    if (url.href.startsWith('https://fonts.')) {
        e.respondWith(
            caches.open(CACHE_NAME).then(async (cache) => {
                const cached = await cache.match(request)
                if (cached) return cached
                const res = await fetch(request)
                if (res.ok) cache.put(request, res.clone())
                return res
            })
        )
        return
    }
})