import { useEffect, useState } from 'react'

export default function ContactSection({ navigate, setIsMenuOpen }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const links = [
        { label: 'HOME', dest: 'home' },
        { label: 'ABOUT', dest: 'about' },
        { label: 'WORKS', dest: 'works' },
    ]

    return (
        <section className="relative z-30 bg-black w-full min-h-screen flex flex-col justify-between overflow-hidden p-5 sm:p-8 md:p-12 lg:p-16 text-white">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Space+Mono:ital@0;1&display=swap');
                
                .font-serif-custom {
                    font-family: 'Playfair Display', ui-serif, Georgia, serif;
                }

                @keyframes revealUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .reveal-item {
                    opacity: 0;
                }

                .mounted .reveal-item {
                    animation: revealUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }

                .link-item {
                    transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                                color 0.25s ease,
                                text-shadow 0.25s ease;
                    transform-origin: left center;
                }

                .link-item:hover {
                    transform: translateX(18px) scale(1.03);
                    color: #FFEA00;
                    font-style: italic;
                    text-shadow: 0 8px 24px rgba(255, 234, 0, 0.25);
                }

                @media (max-width: 768px) {
                    .link-item:hover {
                        transform: translateX(10px) scale(1.01);
                    }
                }
            `}</style>

            <div className={`flex flex-col md:flex-row w-full flex-1 relative z-10 ${mounted ? 'mounted' : ''}`}>
                <nav className="flex flex-col justify-center items-start w-full md:w-1/2 z-20 mt-10 md:mt-0">
                    {links.map(({ label, dest }, i) => (
                        <button
                            key={label}
                            onClick={() => navigate(dest)}
                            className="reveal-item link-item font-serif-custom text-[18vw] sm:text-[15vw] md:text-[11vw] lg:text-[10vw] leading-[0.8] tracking-tight uppercase m-0 p-0 text-left"
                            style={{ animationDelay: `${i * 0.15}s` }}
                        >
                            {label}
                        </button>
                    ))}
                </nav>
            </div>

            <div className={`flex flex-col w-full z-30 mt-20 md:mt-10 ${mounted ? 'mounted' : ''}`}>
                <div
                    className="reveal-item flex flex-col mb-2 sm:mb-4 relative z-30"
                    style={{ animationDelay: '0.6s' }}
                >
                    <p className="text-[9px] sm:text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/90">
                        OPEN FOR COLLABORATIONS & FREELANCE WORK
                    </p>

                    <a
                        href="mailto:malibiranleigabriel@gmail.com"
                        className="text-[9px] sm:text-[10px] md:text-xs tracking-[0.2em] lowercase text-blue-400 hover:text-[#FFEA00] transition-colors duration-300 w-fit cursor-pointer"
                    >
                        malibiranleigabriel@gmail.com
                    </a>
                </div>

                <div
                    className="reveal-item w-full -ml-1 sm:-ml-2"
                    style={{ animationDelay: '0.7s' }}
                >
                    <h1
                        className="font-serif-custom uppercase text-white"
                        style={{
                            fontSize: 'clamp(3rem, 13vw, 20rem)',
                            lineHeight: '0.8',
                            letterSpacing: '-0.02em',
                        }}
                    >
                        LEIMXNSQUARE
                    </h1>
                </div>
            </div>
        </section>
    )
}