export function registerSW() {
    if (!('serviceWorker' in navigator)) return

    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/sw.js', { scope: '/' })
            .then((reg) => {
                reg.addEventListener('updatefound', () => {
                    const next = reg.installing
                    if (!next) return
                    next.addEventListener('statechange', () => {
                        if (next.state === 'installed' && navigator.serviceWorker.controller) {
                            console.log('[SW] New version available. Reload to update.')
                        }
                    })
                })
            })
            .catch((err) => console.error('[SW] Registration failed:', err))
    })
}