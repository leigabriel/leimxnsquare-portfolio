import { useEffect, useRef, forwardRef, useState, useCallback } from 'react'

const WORKS = [
    {
        id: 'f01',
        index: '01',
        title: 'Multo',
        subtitle: 'Cup of Joe',
        year: '2026',
        category: 'Poster Design',
        description: 'Exploring longing and haunting memories through dark atmospheric typography and visual storytelling. A poster inspired by the Filipino song about a ghost who lingers.',
        image: '/posters/multo.png',
        imageAlt: 'Multo Poster Design',
        link: null,
        tabBg: '#e8e0d5',
        bodyBg: '#f5f0ea',
        accent: '#2a1f14',
        isDark: false,
    },
    {
        id: 'f02',
        index: '02',
        title: 'Kanibalismo',
        subtitle: 'Fitterkarma',
        year: '2026',
        category: 'Poster Design',
        description: 'This piece serves as a haunting exploration of the parasitic nature of devotion, where affection and consumption become indistinguishable. By juxtaposing a glowing, ethereal core with jagged, blood-red typography, the design captures the inherent violence of intimacy—the way we both sustain and devour the things we love.',
        image: '/posters/kanibalismo.png',
        imageAlt: 'Kanibalismo Poster',
        link: null,
        tabBg: '#c9d4c0',
        bodyBg: '#dde8d4',
        accent: '#1a2b14',
        isDark: false,
    },
    {
        id: 'f03',
        index: '03',
        title: 'Die For You',
        subtitle: 'The Weeknd',
        year: '2026',
        category: 'Poster Design',
        description: 'This design explores the intersection of idol culture and gritty street art. By layering pop-culture icons with aggressive graphic elements and distorted textures, the piece mimics the feel of a flyer found on a city wall. It’s a collision of devotion and noise, where the polish of a star is filtered through the lens of urban decay.',
        image: '/posters/yunjin.png',
        imageAlt: 'Die For You Poster',
        link: null,
        tabBg: '#1a1a2e',
        bodyBg: '#16213e',
        accent: '#fff000',
        isDark: true,
    },
    {
        id: 'f04',
        index: '04',
        title: 'Bulusan Zoo',
        subtitle: 'Web App',
        year: '2026',
        category: 'Web Dev',
        description: 'ML-powered animal classification bridging data science with modern UX. A full wildlife web platform for Bulusan Zoo, Calapan City.',
        image: '/bulusan.png',
        imageAlt: 'Bulusan Zoo Project',
        link: 'https://bulusanzoo.vercel.app',
        tabBg: '#d4b800',
        bodyBg: '#FFEA00',
        accent: '#1a1400',
        isDark: false,
    },
    {
        id: 'f05',
        index: '05',
        title: 'Daily Motivation',
        subtitle: 'Web App',
        year: '2026',
        category: 'Web Dev',
        description: 'A minimal daily motivation platform designed to spark clarity and momentum. Clean editorial layout with a focus on typographic hierarchy.',
        image: '/bee.png',
        imageAlt: 'Daily Motivation Website',
        link: null,
        tabBg: '#b8c5d6',
        bodyBg: '#dce8f5',
        accent: '#0d1f33',
        isDark: false,
    },
]

const TAB_H = 36
const CARD_W = 340
const GAP = 20

export default function FeaturedSection({ navigate }) {
    const sectionRef = useRef(null)
    const trackRef = useRef(null)
    const rafRef = useRef(null)
    const currentX = useRef(0)
    const targetX = useRef(0)
    const cardRefs = useRef([])
    const [activeWork, setActiveWork] = useState(null)
    const [sectionHeight, setSectionHeight] = useState('300vh')

    const openModal = useCallback((work) => setActiveWork(work), [])
    const closeModal = useCallback(() => setActiveWork(null), [])

    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') closeModal() }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [closeModal])

    useEffect(() => {
        const section = sectionRef.current
        const track = trackRef.current
        if (!section || !track) return

        let sectionTop = 0

        const measure = () => {
            sectionTop = section.getBoundingClientRect().top + window.scrollY
            const totalWidth = (WORKS.length * CARD_W) + ((WORKS.length - 1) * GAP)
            const dynamicHeight = window.innerWidth < 768
                ? totalWidth + window.innerHeight
                : totalWidth + window.innerHeight * 0.5
            setSectionHeight(`${dynamicHeight}px`)
        }

        requestAnimationFrame(measure)
        window.addEventListener('resize', measure, { passive: true })

        const tick = () => {
            if (!section || !track) return

            const scrolled = window.scrollY - sectionTop
            const scrollable = section.offsetHeight - window.innerHeight
            const progress = scrollable > 0 ? Math.max(0, Math.min(1, scrolled / scrollable)) : 0

            if (scrollable > 0) {
                const maxShift = track.scrollWidth - window.innerWidth
                targetX.current = Math.max(0, progress * maxShift)
            }

            currentX.current += (targetX.current - currentX.current) * 0.08
            track.style.transform = `translate3d(-${currentX.current}px, 0, 0)`

            const viewCenterX = currentX.current + window.innerWidth / 2

            cardRefs.current.forEach((card, i) => {
                if (!card) return

                const cardLeft = i * (CARD_W + GAP)
                const cardCenter = cardLeft + CARD_W / 2
                const dist = Math.abs(viewCenterX - cardCenter)
                const normalized = Math.max(0, 1 - dist / (window.innerWidth * 0.8))

                const scale = 0.95 + normalized * 0.05
                const translateY = (1 - normalized) * 12
                const rotateZ = (cardCenter - viewCenterX) / (window.innerWidth * 0.6) * -1.5

                const staggerDelay = i * 0.04
                const entryRaw = Math.max(0, progress * 1.5 - staggerDelay)
                const entryNorm = Math.min(1, entryRaw)
                const eased = 1 - Math.pow(1 - entryNorm, 4)
                const startX = window.innerWidth * 0.8
                const entryX = startX * (1 - eased)

                card.style.transform = `translate3d(${entryX}px, ${translateY}px, 0) scale(${scale}) rotateZ(${rotateZ}deg)`
                card.style.opacity = Math.min(1, eased * 2).toString()
            })

            rafRef.current = requestAnimationFrame(tick)
        }

        rafRef.current = requestAnimationFrame(tick)

        return () => {
            cancelAnimationFrame(rafRef.current)
            window.removeEventListener('resize', measure)
        }
    }, [])

    return (
        <>
            <section
                ref={sectionRef}
                className="relative w-full"
                style={{ height: sectionHeight, zIndex: 25 }}
            >
                <div
                    className="sticky top-0 w-full h-screen flex flex-col justify-center overflow-hidden"
                    style={{
                        backdropFilter: 'blur(32px) saturate(1.2)',
                        WebkitBackdropFilter: 'blur(32px) saturate(1.2)',
                        background: 'rgba(0, 0, 0, 0, 10)',
                    }}
                >
                    <div className="px-5 sm:px-8 md:px-12 lg:px-16 mb-6 flex items-end justify-between w-full max-w-[100vw]">
                        <span className="text-white text-[10px] sm:text-xs tracking-[0.22em] uppercase font-medium opacity-40">
                            Featured Work
                        </span>
                        <button
                            onClick={() => navigate('works')}
                            className="text-white text-[10px] sm:text-xs tracking-[0.22em] uppercase font-medium transition-opacity duration-300 hover:opacity-100 opacity-60"
                        >
                            See All Works →
                        </button>
                    </div>

                    <div className="w-full overflow-visible">
                        <div
                            ref={trackRef}
                            className="flex will-change-transform items-end"
                            style={{
                                gap: `${GAP}px`,
                                paddingLeft: 'clamp(1.25rem, 5vw, 4rem)',
                                paddingRight: 'clamp(1.25rem, 5vw, 4rem)',
                                width: 'max-content',
                            }}
                        >
                            {WORKS.map((work, i) => (
                                <FolderCard
                                    key={work.id}
                                    work={work}
                                    ref={el => { cardRefs.current[i] = el }}
                                    onClick={() => openModal(work)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {activeWork && (
                <WorkModal work={activeWork} onClose={closeModal} />
            )}
        </>
    )
}

const FolderCard = forwardRef(function FolderCard({ work, onClick }, ref) {
    const textColor = work.isDark ? '#f0f0f0' : work.accent

    return (
        <div
            ref={ref}
            className="shrink-0 flex flex-col cursor-pointer"
            onClick={onClick}
            style={{
                width: `${CARD_W}px`,
                transformOrigin: 'bottom center',
                willChange: 'transform, opacity',
                opacity: 0,
                isolation: 'isolate',
                position: 'relative',
                zIndex: 1,
            }}
        >
            <div
                style={{
                    height: `${TAB_H}px`,
                    background: work.tabBg,
                    borderRadius: '10px 10px 0 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingLeft: '14px',
                    paddingRight: '14px',
                    width: '70%',
                    flexShrink: 0,
                }}
            >
                <span style={{ fontSize: '9px', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500, color: work.accent, opacity: 0.75 }}>
                    {work.index}
                </span>
                <span style={{ fontSize: '9px', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, color: work.accent, opacity: 0.6 }}>
                    {work.category}
                </span>
            </div>

            <div
                className="hover:shadow-[0_24px_60px_rgba(0,0,0,0.35)] transition-shadow duration-300"
                style={{
                    height: 'clamp(420px, 60vh, 520px)',
                    background: work.bodyBg,
                    borderRadius: '0 10px 10px 10px',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px',
                    position: 'relative',
                    overflow: 'hidden',
                    border: `1px solid ${work.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
                    borderTop: 'none',
                    boxSizing: 'border-box',
                }}
            >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: work.tabBg }} />

                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)', fontFamily: "'SimSun-ExtB', 'SimSun', 'STSong', serif", lineHeight: 1.05, letterSpacing: '-0.02em', color: textColor }}>
                            {work.title}
                        </div>
                        <div style={{ fontSize: '9px', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.2em', textTransform: 'uppercase', color: textColor, opacity: 0.5, marginTop: '4px' }}>
                            {work.subtitle}
                        </div>
                    </div>
                    <span style={{ fontSize: '9px', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.2em', textTransform: 'uppercase', color: textColor, opacity: 0.35, marginTop: '4px', flexShrink: 0 }}>
                        {work.year}
                    </span>
                </div>

                <div style={{ flex: 1, borderRadius: '6px', overflow: 'hidden', background: work.isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)', minHeight: 0 }}>
                    <img src={work.image} alt={work.imageAlt} className="w-full h-full object-cover block" loading="lazy" />
                </div>

                <div className="mt-4 flex items-end justify-between gap-3">
                    <p className="line-clamp-2" style={{ fontSize: '9px', fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.7, letterSpacing: '0.1em', textTransform: 'uppercase', color: textColor, opacity: 0.45, margin: 0 }}>
                        {work.description}
                    </p>
                    <span style={{ fontSize: '9px', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.2em', textTransform: 'uppercase', color: textColor, opacity: 0.4, flexShrink: 0 }}>
                        Open ↗
                    </span>
                </div>
            </div>
        </div>
    )
})

function WorkModal({ work, onClose }) {
    const overlayRef = useRef(null)
    const panelRef = useRef(null)
    const [showPreview, setShowPreview] = useState(false)
    const accent = work.accent || '#1a1400'
    const bg = work.bodyBg || '#FFEA00'

    useEffect(() => {
        const id = requestAnimationFrame(() => {
            if (overlayRef.current) overlayRef.current.style.opacity = '1'
            if (panelRef.current) {
                panelRef.current.style.opacity = '1'
                panelRef.current.style.transform = 'scale(1)'
            }
        })
        return () => cancelAnimationFrame(id)
    }, [])

    const handleClose = () => {
        if (showPreview) { setShowPreview(false); return }
        if (overlayRef.current) overlayRef.current.style.opacity = '0'
        if (panelRef.current) {
            panelRef.current.style.opacity = '0'
            panelRef.current.style.transform = 'scale(0.96)'
        }
        setTimeout(onClose, 300)
    }

    return (
        <div
            ref={overlayRef}
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
            style={{
                padding: 'clamp(12px, 4vw, 40px)',
                background: 'rgba(0,0,0,0.85)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
            }}
        >
            <style>{`
                @font-face {
                    font-family: 'SimSun-ExtB';
                    src: url('/simsunb.ttf') format('truetype');
                    font-weight: normal;
                    font-style: normal;
                }
                .f-mono { font-family: 'JetBrains Mono', monospace; }
                .f-serif { font-family: 'SimSun-ExtB', 'SimSun', 'STSong', serif; }
                .no-scroll::-webkit-scrollbar { display: none; }
            `}</style>

            {showPreview && (
                <div
                    className="fixed inset-0 z-60 flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.95)', padding: 'clamp(12px, 4vw, 40px)' }}
                    onClick={() => setShowPreview(false)}
                >
                    <img
                        src={work.image}
                        alt={work.imageAlt}
                        onClick={e => e.stopPropagation()}
                        className="block"
                        style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain' }}
                    />
                    <button
                        onClick={() => setShowPreview(false)}
                        className="f-mono absolute top-5 right-5 bg-transparent border-none cursor-pointer text-white text-[10px] tracking-[0.2em] uppercase"
                        style={{ opacity: 0.6 }}
                    >
                        CLOSE
                    </button>
                </div>
            )}

            <div
                onClick={e => e.stopPropagation()}
                ref={panelRef}
                className="relative w-full max-w-125 flex flex-col my-auto"
                style={{
                    background: bg,
                    opacity: 0,
                    transform: 'scale(0.96)',
                    transition: 'opacity 0.3s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)',
                    padding: '16px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                }}
            >
                <div
                    className="relative w-full flex flex-col border-[1.5px] border-dashed"
                    style={{ borderColor: accent }}
                >
                    <div className="absolute w-2.5 h-2.5 rounded-full" style={{ background: accent, top: -5, left: -5 }} />
                    <div className="absolute w-2.5 h-2.5 rounded-full" style={{ background: accent, top: -5, right: -5 }} />
                    <div className="absolute w-2.5 h-2.5 rounded-full" style={{ background: accent, bottom: -5, left: -5 }} />
                    <div className="absolute w-2.5 h-2.5 rounded-full" style={{ background: accent, bottom: -5, right: -5 }} />

                    <div className="flex justify-between items-center px-4 pt-4 pb-1">
                        <span className="f-mono text-[11px] sm:text-xs tracking-[0.2em] uppercase flex items-center gap-2" style={{ color: accent }}>
                            ● {work.category}
                        </span>
                        <span className="f-mono text-[11px] sm:text-xs tracking-[0.2em] uppercase" style={{ color: accent }}>
                            ●
                        </span>
                    </div>

                    <div className="px-4 pb-4">
                        <h2 className="f-serif text-[clamp(2.5rem,8vw,3.5rem)] uppercase leading-[0.9] m-0 tracking-tight" style={{ color: accent }}>
                            {work.title} - {work.subtitle}
                        </h2>
                    </div>

                    <div
                        className="relative w-full border-t-[1.5px] border-dashed cursor-pointer"
                        style={{ borderColor: accent }}
                        onClick={() => setShowPreview(true)}
                    >
                        <div className="absolute w-2.5 h-2.5 rounded-full" style={{ background: accent, top: -5, left: -5 }} />
                        <div className="absolute w-2.5 h-2.5 rounded-full" style={{ background: accent, top: -5, right: -5 }} />

                        <img src={work.image} alt={work.imageAlt} className="w-full h-auto max-h-[55vh] object-cover block" />
                    </div>

                    <div className="relative w-full border-t-[1.5px] border-dashed p-4" style={{ borderColor: accent }}>
                        <div className="absolute w-2.5 h-2.5 rounded-full" style={{ background: accent, top: -5, left: -5 }} />
                        <div className="absolute w-2.5 h-2.5 rounded-full" style={{ background: accent, top: -5, right: -5 }} />

                        <p className="f-mono text-[10px] sm:text-xs uppercase text-justify leading-relaxed m-0" style={{ color: accent, letterSpacing: '0.05em' }}>
                            {work.description}
                        </p>
                    </div>

                    <div className="relative w-full border-t-[1.5px] border-dashed px-4 py-4 flex justify-between items-center" style={{ borderColor: accent }}>
                        <div className="absolute w-2.5 h-2.5 rounded-full" style={{ background: accent, top: -5, left: -5 }} />
                        <div className="absolute w-2.5 h-2.5 rounded-full" style={{ background: accent, top: -5, right: -5 }} />

                        <span className="f-serif text-lg sm:text-xl tracking-widest uppercase flex items-center gap-2" style={{ color: accent }}>
                            ● LEIMXNSQUARE
                        </span>

                        {work.link ? (
                            <a
                                href={work.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="f-serif text-lg sm:text-xl tracking-widest uppercase flex items-center gap-2 hover:opacity-70 transition-opacity"
                                style={{ color: accent, textDecoration: 'none' }}
                            >
                                VISIT ↗ ●
                            </a>
                        ) : (
                            <span className="f-serif text-lg sm:text-xl tracking-widest uppercase flex items-center gap-2" style={{ color: accent }}>
                                {work.year} ●
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}