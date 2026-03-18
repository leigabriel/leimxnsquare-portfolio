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
        description: 'Raw and visceral poster work exploring the tension between beauty and decay. Designed to provoke discomfort while remaining visually arresting.',
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
        description: 'A moody typographic poster capturing the obsession and devotion of the track. Dark palette and sharp contrast bring the emotional weight of the song to life.',
        image: '/posters/yunjin.png',
        imageAlt: 'Die For You Poster',
        link: null,
        tabBg: '#1a1a2e',
        bodyBg: '#16213e',
        accent: '#e94560',
        isDark: true,
    },
    {
        id: 'f04',
        index: '04',
        title: 'Bulusan Zoo',
        subtitle: 'Wildlife Platform',
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
                        background: 'rgba(0,0,0,0.35)',
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
            className="shrink-0 flex flex-col cursor-pointer transition-shadow duration-300"
            onClick={onClick}
            style={{
                width: `${CARD_W}px`,
                transformOrigin: 'bottom center',
                willChange: 'transform, opacity',
                opacity: 0,
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
                }}
            >
                <span style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500, color: work.accent, opacity: 0.75 }}>
                    {work.index}
                </span>
                <span style={{ fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, color: work.accent, opacity: 0.6 }}>
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
                    border: `1px solid ${work.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'}`,
                    borderTop: 'none',
                }}
            >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: work.tabBg }} />

                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)', fontFamily: 'ui-serif, Georgia, serif', lineHeight: 1.05, letterSpacing: '-0.02em', color: textColor }}>
                            {work.title}
                        </div>
                        <div style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: textColor, opacity: 0.5, marginTop: '4px' }}>
                            {work.subtitle}
                        </div>
                    </div>
                    <span style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: textColor, opacity: 0.35, marginTop: '4px', flexShrink: 0 }}>
                        {work.year}
                    </span>
                </div>

                <div style={{ flex: 1, borderRadius: '8px', overflow: 'hidden', background: work.isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)', minHeight: 0 }}>
                    <img src={work.image} alt={work.imageAlt} className="w-full h-full object-cover block" loading="lazy" />
                </div>

                <div className="mt-4 flex items-end justify-between gap-3">
                    <p className="line-clamp-2 sm:line-clamp-3" style={{ fontSize: '9px', lineHeight: 1.7, letterSpacing: '0.13em', textTransform: 'uppercase', color: textColor, opacity: 0.5, margin: 0 }}>
                        {work.description}
                    </p>
                    <span style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: textColor, opacity: 0.4, flexShrink: 0 }}>
                        Open ↗
                    </span>
                </div>
            </div>
        </div>
    )
})

function WorkModal({ work, onClose }) {
    const textColor = work.isDark ? '#f0f0f0' : work.accent
    const overlayRef = useRef(null)
    const panelRef = useRef(null)

    useEffect(() => {
        const timer = requestAnimationFrame(() => {
            if (overlayRef.current) overlayRef.current.style.opacity = '1'
            if (panelRef.current) {
                panelRef.current.style.opacity = '1'
                panelRef.current.style.transform = 'translateY(0) scale(1)'
            }
        })
        return () => cancelAnimationFrame(timer)
    }, [])

    const handleClose = () => {
        if (overlayRef.current) overlayRef.current.style.opacity = '0'
        if (panelRef.current) {
            panelRef.current.style.opacity = '0'
            panelRef.current.style.transform = 'translateY(20px) scale(0.97)'
        }
        setTimeout(onClose, 300)
    }

    return (
        <div
            ref={overlayRef}
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 opacity-0 transition-opacity duration-300"
            style={{
                background: 'rgba(0,0,0,0.7)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
            }}
        >
            <div
                ref={panelRef}
                onClick={e => e.stopPropagation()}
                className="w-full max-w-5xl max-h-[90vh] sm:max-h-[85vh] rounded-2xl overflow-hidden flex flex-col opacity-0 transition-all duration-300"
                style={{
                    background: work.bodyBg,
                    transform: 'translateY(24px) scale(0.97)',
                    border: `1px solid ${work.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                }}
            >
                <div
                    className="flex items-center justify-between px-4 sm:px-6 py-4 shrink-0"
                    style={{
                        background: work.tabBg,
                        borderBottom: `1px solid ${work.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'}`,
                    }}
                >
                    <div className="flex items-center gap-3 sm:gap-4">
                        <span style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500, color: work.accent, opacity: 0.6 }}>
                            {work.index}
                        </span>
                        <span style={{ fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, color: work.accent, opacity: 0.5 }}>
                            {work.category}
                        </span>
                        <span className="hidden sm:inline" style={{ fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: work.accent, opacity: 0.35 }}>
                            {work.year}
                        </span>
                    </div>
                    <button
                        onClick={handleClose}
                        className="bg-transparent border-none cursor-pointer p-1 sm:px-2 py-1 transition-opacity hover:opacity-100"
                        style={{
                            fontSize: '11px',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: work.accent,
                            opacity: 0.5,
                        }}
                    >
                        Close ✕
                    </button>
                </div>

                <div className="flex flex-col md:flex-row flex-1 overflow-hidden min-h-0">
                    <div className="w-full md:w-[60%] lg:w-[65%] h-[40vh] md:h-auto shrink-0 md:shrink overflow-hidden relative">
                        <img
                            src={work.image}
                            alt={work.imageAlt}
                            className="w-full h-full object-cover block"
                            loading="lazy"
                        />
                    </div>

                    <div
                        className="w-full md:w-[40%] lg:w-[35%] shrink-0 flex flex-col justify-between overflow-y-auto"
                        style={{
                            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                            borderLeft: `1px solid ${work.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'}`,
                        }}
                    >
                        <div>
                            <div style={{
                                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                                fontFamily: 'ui-serif, Georgia, serif',
                                lineHeight: 1.0,
                                letterSpacing: '-0.02em',
                                color: textColor,
                                marginBottom: '8px',
                            }}>
                                {work.title}
                            </div>
                            <div style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: textColor, opacity: 0.45, marginBottom: '24px' }}>
                                {work.subtitle}
                            </div>

                            <div style={{ width: '100%', height: '1px', background: work.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', marginBottom: '20px' }} />

                            <p style={{
                                fontSize: '11px',
                                lineHeight: 1.85,
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                color: textColor,
                                opacity: 0.6,
                                margin: 0,
                            }}>
                                {work.description}
                            </p>
                        </div>

                        <div className="mt-8 pt-6">
                            <div style={{ width: '100%', height: '1px', background: work.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', marginBottom: '16px' }} />
                            {work.link ? (
                                <a
                                    href={work.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full text-center transition-all duration-300 hover:opacity-100"
                                    style={{
                                        fontSize: '10px',
                                        letterSpacing: '0.22em',
                                        textTransform: 'uppercase',
                                        fontWeight: 600,
                                        color: textColor,
                                        textDecoration: 'none',
                                        opacity: 0.85,
                                        padding: '12px 16px',
                                        border: `1px solid ${work.isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
                                        borderRadius: '8px',
                                    }}
                                >
                                    View Project →
                                </a>
                            ) : (
                                <div className="text-center w-full" style={{ padding: '12px 16px' }}>
                                    <span style={{ fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: textColor, opacity: 0.3 }}>
                                        Not yet published
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}