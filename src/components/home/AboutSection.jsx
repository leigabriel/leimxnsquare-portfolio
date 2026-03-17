import { useState, useRef } from 'react'

export function VideoSection() {
    return (
        <section className="relative z-5 bg-black w-full flex items-center justify-center overflow-hidden">
            <div className="w-full aspect-video max-h-dvh">
                <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src="STG_flash.mp4" type="video/mp4" />
                </video>
            </div>
        </section>
    )
}

const FRONT = 'front'
const BACK = 'back'

export default function AboutSection({ navigate }) {
    const [face, setFace] = useState(FRONT)
    const cardRef = useRef(null)
    const flipping = useRef(false)
    const faceRef = useRef(FRONT)

    const flip = (to) => {
        if (flipping.current || faceRef.current === to) return
        flipping.current = true
        const el = cardRef.current
        if (!el) return
        el.style.transition = 'transform 0.25s ease-in'
        el.style.transform = 'rotateX(90deg)'
        setTimeout(() => {
            faceRef.current = to
            setFace(to)
            el.style.transition = 'none'
            el.style.transform = 'rotateX(-90deg)'
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    el.style.transition = 'transform 0.25s ease-out'
                    el.style.transform = 'rotateX(0deg)'
                    setTimeout(() => { flipping.current = false }, 260)
                })
            })
        }, 260)
    }

    const headerRow = (label) => (
        <div className="flex border-b border-black border-dotted text-[10px] sm:text-xs font-medium tracking-widest uppercase">
            <div className="hidden md:flex w-14 border-r border-black border-dotted items-center justify-center py-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-black/50"></div>
            </div>
            <div className="w-full md:w-[35%] lg:w-[30%] border-r-0 md:border-r border-black border-dotted px-3 py-2.5 flex justify-between items-center">
                <span>01</span>
                <span>{label}</span>
            </div>
            <div className="hidden md:flex flex-1 px-3 py-2.5 justify-between items-center">
                <div className="w-1.5 h-1.5 bg-black"></div>
                <span>ABOUT</span>
                <div className="w-1.5 h-1.5 bg-black"></div>
            </div>
        </div>
    )

    const headerRowDark = (label) => (
        <div className="flex border-b border-white/10 border-dotted text-[10px] sm:text-xs font-medium tracking-widest uppercase text-white">
            <div className="hidden md:flex w-14 border-r border-white/10 border-dotted items-center justify-center py-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
            </div>
            <div className="w-full md:w-[35%] lg:w-[30%] border-r-0 md:border-r border-white/10 border-dotted px-3 py-2.5 flex justify-between items-center">
                <span>01</span>
                <span>{label}</span>
            </div>
            <div className="hidden md:flex flex-1 px-3 py-2.5 justify-between items-center">
                <div className="w-1.5 h-1.5 bg-white/20"></div>
                <span>ABOUT</span>
                <div className="w-1.5 h-1.5 bg-white/20"></div>
            </div>
        </div>
    )

    const footerRow = () => (
        <div className="flex flex-col sm:flex-row border-t border-black border-dotted text-[10px] sm:text-xs font-medium tracking-widest uppercase">
            <div className="hidden md:flex w-14 border-r border-black border-dotted items-center justify-center py-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-black/50"></div>
            </div>
            <div className="w-full md:w-[35%] lg:w-[30%] border-b sm:border-b-0 md:border-r border-black border-dotted px-3 py-2 flex justify-between items-center">
                <div className="hidden sm:block w-1.5 h-1.5 bg-black"></div>
                <span>01 / 01</span>
                <div className="hidden sm:block w-1.5 h-1.5 bg-black"></div>
            </div>
            <div className="flex-1 px-3 py-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-0">
                <span>CURRENTLY BASED IN</span>
                <span>ORIENTAL MINDORO, PH</span>
            </div>
        </div>
    )

    const footerRowDark = () => (
        <div className="flex flex-col sm:flex-row border-t border-white/10 border-dotted text-[10px] sm:text-xs font-medium tracking-widest uppercase text-white">
            <div className="hidden md:flex w-14 border-r border-white/10 border-dotted items-center justify-center py-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
            </div>
            <div className="w-full md:w-[35%] lg:w-[30%] border-b sm:border-b-0 md:border-r border-white/10 border-dotted px-3 py-2 flex justify-between items-center">
                <div className="hidden sm:block w-1.5 h-1.5 bg-white/20"></div>
                <span>01 / 01</span>
                <div className="hidden sm:block w-1.5 h-1.5 bg-white/20"></div>
            </div>
            <div className="flex-1 px-3 py-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-0">
                <span>CURRENTLY BASED IN</span>
                <span>ORIENTAL MINDORO, PH</span>
            </div>
        </div>
    )

    const sideDotsYellow = () => (
        <div className="hidden md:flex w-14 border-r border-black border-dotted flex-col justify-between py-12 items-center">
            <div className="w-3 h-3 rounded-full bg-zinc-500 shadow-inner"></div>
            <div className="w-3 h-3 rounded-full bg-zinc-500 shadow-inner"></div>
            <div className="w-3 h-3 rounded-full bg-zinc-500 shadow-inner"></div>
            <div className="w-3 h-3 rounded-full bg-zinc-500 shadow-inner"></div>
        </div>
    )

    const sideDotsGray = () => (
        <div className="hidden md:flex w-14 border-r border-white/10 border-dotted flex-col justify-between py-12 items-center bg-black">
            <div className="w-3 h-3 rounded-full bg-white/10 shadow-inner"></div>
            <div className="w-3 h-3 rounded-full bg-white/10 shadow-inner"></div>
            <div className="w-3 h-3 rounded-full bg-white/10 shadow-inner"></div>
            <div className="w-3 h-3 rounded-full bg-white/10 shadow-inner"></div>
        </div>
    )

    return (
        <section className="sticky top-0 z-20 bg-zinc-500 w-full min-h-screen flex items-center justify-center p-2 sm:p-6 md:p-12 text-black overflow-hidden">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500&display=swap');
                .about-card-scene { perspective: 1200px; }
                .about-card-inner { transform-origin: center center; }
            `}</style>

            <div
                className="about-card-scene w-full max-w-7xl"
                onMouseEnter={() => flip(BACK)}
                onMouseLeave={() => flip(FRONT)}
            >
                <div ref={cardRef} className="about-card-inner w-full">
                    {face === FRONT ? (
                        <div className="w-full bg-[#FFEA00] flex flex-col border border-black shadow-2xl">
                            {headerRow('PROFILE IMAGE')}
                            <div className="flex flex-col-reverse md:flex-row flex-1">
                                {sideDotsYellow()}
                                <div className="w-full md:w-[30%] lg:w-[30%] border-t md:border-t-0 md:border-r border-black border-dotted relative min-h-40 sm:min-h-56 md:min-h-120 bg-[#FFEA00] flex items-center justify-center p-3 md:p-6">
                                    <img
                                        src="/bee.png"
                                        alt="Profile"
                                        className="w-full h-full md:h-auto md:aspect-square object-fill"
                                    />
                                </div>
                                <div className="w-full md:flex-1 flex flex-col relative">
                                    <div className="p-3 sm:p-5 md:p-10 lg:p-12 pb-3 md:pb-6 border-b border-black border-dotted">
                                        <h2 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl xl:text-[7.5rem] font-serif leading-[0.9] tracking-tight">
                                            Leimxnsquare
                                        </h2>
                                    </div>
                                    <div className="p-3 sm:p-5 md:p-10 lg:p-12 flex-1 flex flex-col justify-center relative pr-10 sm:pr-12 lg:pr-24">
                                        <p className="text-[10px] sm:text-xs md:text-base lg:text-lg leading-relaxed uppercase tracking-widest max-w-2xl text-justify">
                                            I'M AN ENTHUSIASTIC AND MULTIFACETED WEB DEVELOPER, GRAPHIC DESIGNER, AND PROGRAMMER. PASSIONATE ABOUT PUSHING CREATIVE BOUNDARIES, I CONSTANTLY SEEK TO EXPAND MY EXPERTISE ACROSS VARIOUS MEDIUMS LIKE MACHINE LEARNING AND DIGITAL ART. I THRIVE ON PROBLEM-SOLVING AND EMBRACE CHALLENGES WITH A PROACTIVE AND OPEN-MINDED APPROACH.
                                        </p>
                                        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-10 lg:w-16 flex items-center justify-center border-l border-black border-dotted md:border-none">
                                            <span className="transform rotate-90 md:-rotate-90 whitespace-nowrap text-[8px] sm:text-[10px] tracking-widest uppercase">
                                                LEIMXNSQUAREWORKS
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {footerRow()}
                            <button
                                onClick={() => flip(BACK)}
                                className="md:hidden w-full border-t border-black border-dotted px-3 py-2.5 text-[10px] tracking-widest uppercase font-medium text-left hover:bg-black hover:text-[#FFEA00] transition-colors"
                            >
                                READ MORE →
                            </button>
                        </div>
                    ) : (
                        <div className="w-full bg-black flex flex-col border border-white/10 shadow-2xl">
                            {headerRowDark('READ MORE')}
                            <div className="flex flex-col md:flex-row flex-1">
                                {sideDotsGray()}
                                <div className="w-full flex-1 flex items-center justify-center relative min-h-40 sm:min-h-56 md:min-h-150 bg-black pr-8 sm:pr-10 lg:pr-16">
                                    <button
                                        onClick={() => navigate('about')}
                                        className="text-white hover:text-[#FFEA00] transition-colors duration-300"
                                        style={{
                                            fontFamily: "'Dancing Script', 'Segoe Script', cursive",
                                            fontSize: 'clamp(2rem, 6vw, 5rem)',
                                            fontWeight: 400,
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        read more
                                    </button>
                                    <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-10 lg:w-16 flex items-center justify-center border-l border-white/10">
                                        <span className="transform -rotate-90 whitespace-nowrap text-[8px] sm:text-[10px] tracking-widest uppercase text-white/30">
                                            LEIMXNSQUAREWORKS
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {footerRowDark()}
                            <button
                                onClick={() => flip(FRONT)}
                                className="md:hidden w-full border-t border-white/10 border-dotted px-3 py-2.5 text-[10px] tracking-widest uppercase font-medium text-left text-white hover:bg-white hover:text-black transition-colors"
                            >
                                ← GO BACK
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}