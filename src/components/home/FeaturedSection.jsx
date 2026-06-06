import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const WORKS = [
    { id: 'p1', image: '/posters/multo.png', title: 'Multo' },
    { id: 'p2', image: '/posters/kanibalismo.png', title: 'Kanibalismo' },
    { id: 'p3', image: '/posters/yunjin.png', title: 'Die For You' },
    { id: 'p4', image: '/posters/callme.png', title: 'Call Me' },
    { id: 'p5', image: '/posters/rockstar.png', title: 'Rockstar' },
    { id: 'p6', image: '/posters/evilj.png', title: 'Evil J' },
    { id: 'p7', image: '/posters/newj.png', title: 'New J' },
    { id: 'p8', image: '/posters/ning.png', title: 'Ning' },
    { id: 'p9', image: '/posters/thea.png', title: 'Thea' },
    { id: 'p10', image: '/posters/yunjin2.png', title: 'Yunjin II' },
    { id: 'p11', image: '/posters/perception.png', title: 'Perception' },
    { id: 'p12', image: '/posters/jennie.png', title: 'Jennie' },
    { id: 'p13', image: '/posters/pusa.png', title: 'Pusa' },
    { id: 'p14', image: '/posters/giselle.jpg', title: 'Giselle' },
    { id: 'p15', image: '/posters/vintage.png', title: 'Vintage' },
]

const SLIDE_W = 400
const GAP = 100

export default function FeaturedSection({ navigate }) {
    const sectionRef = useRef(null)
    const wrapperRef = useRef(null)
    const slidesRef = useRef([])
    const target = useRef(0)
    const current = useRef(0)
    const [sectionHeight, setSectionHeight] = useState('100vh')

    useEffect(() => {
        const section = sectionRef.current
        const wrapper = wrapperRef.current
        if (!section || !wrapper) return

        let sectionTop = 0

        const measure = () => {
            sectionTop = section.getBoundingClientRect().top + window.scrollY
            const total = (WORKS.length * 2) * SLIDE_W + ((WORKS.length * 2) - 1) * GAP
            const extraPad = window.innerWidth < 768 ? window.innerHeight : window.innerHeight * 0.5
            setSectionHeight(`${total + extraPad}px`)
        }

        requestAnimationFrame(measure)
        window.addEventListener('resize', measure, { passive: true })

        const tick = () => {
            const scrolled = window.scrollY - sectionTop
            const scrollable = section.offsetHeight - window.innerHeight
            const progress = scrollable > 0 ? Math.max(0, Math.min(1, scrolled / scrollable)) : 0

            const maxShift = wrapper.scrollWidth - window.innerWidth
            target.current = progress * maxShift
            current.current += (target.current - current.current) * 0.075

            gsap.set(wrapper, { x: -current.current })

            slidesRef.current.forEach((slide) => {
                if (!slide) return
                const rect = slide.getBoundingClientRect()
                const center = (rect.left + rect.right) / 2
                const dist = center - window.innerWidth / 2

                let scale, offsetX
                if (dist > 0) {
                    scale = Math.min(1.75, 1 + dist / window.innerWidth)
                    offsetX = (scale - 1) * 300
                } else {
                    scale = Math.max(0.5, 1 - Math.abs(dist) / window.innerWidth)
                    offsetX = 0
                }

                gsap.set(slide, { scale, x: offsetX })
            })

            requestAnimationFrame(tick)
        }

        const raf = requestAnimationFrame(tick)

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('resize', measure)
        }
    }, [])

    const allSlides = [...WORKS, ...WORKS]

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-black"
            style={{ height: sectionHeight, zIndex: 25 }}
        >
            <div
                className="sticky top-0 w-full h-screen overflow-hidden"
            >
                <div className="fixed top-0 left-0 z-10 p-6">
                    <span className="text-white text-xs tracking-widest uppercase font-medium">
                    </span>
                </div>

                <div
                    className="fixed left-0 top-0 z-10"
                    style={{
                        width: '100vh',
                        height: 'max-content',
                        display: 'flex',
                        alignItems: 'flex-start',
                        transform: 'rotate(-90deg) translate(-100%, 0)',
                        transformOrigin: 'left top',
                        padding: '1.5em 3em',
                    }}
                >
                    <div style={{ flex: 2 }}>
                        <span className="text-white/40 text-[10px] tracking-[0.22em] uppercase font-medium">
                        </span>
                    </div>
                    <div style={{ flex: 2 }}>
                        <span className="text-white/40 text-[10px] tracking-[0.22em] uppercase font-medium">
                        </span>
                    </div>
                </div>

                <div className="w-full h-full overflow-hidden">
                    <div
                        ref={wrapperRef}
                        className="flex items-center h-full"
                        style={{
                            width: 'max-content',
                            padding: '0 600px',
                            gap: `${GAP}px`,
                        }}
                    >
                        {allSlides.map((work, i) => (
                            <div
                                key={`${work.id}-${i}`}
                                ref={(el) => { slidesRef.current[i] = el }}
                                className="shrink-0 relative overflow-hidden cursor-pointer"
                                style={{
                                    width: `${SLIDE_W}px`,
                                    height: '500px',
                                    background: '#e3e3e3',
                                }}
                                onClick={() => navigate('works')}
                            >
                                <img
                                    src={work.image}
                                    alt={work.title}
                                    className="w-full h-full object-cover block"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
