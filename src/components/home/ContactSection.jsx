import { useEffect, useState } from 'react'

export default function ContactSection({ navigate, setIsMenuOpen }) {
    const [mounted, setMounted] = useState(false)
    const [hoveredLink, setHoveredLink] = useState(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    const navLinks = [
        { label: 'HOME', dest: 'home' },
        { label: 'ABOUT', dest: 'about' },
        { label: 'WORKS', dest: 'works' },
    ]

    const socialLinks = [
        { label: 'email', href: 'mailto:malibiranleigabriel@gmail.com' },
        { label: 'instagram', href: 'https://instagram.com/leimxnsquare' },
        { label: 'facebook', href: 'https://facebook.com/' },
        { label: 'github', href: 'https://github.com/leimxnsquare' },
    ]

    return (
        <section className="relative z-30 bg-black w-full min-h-screen flex flex-col overflow-hidden text-white">
            <style>{`
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');

    @font-face {
        font-family: 'SimSunCustom';
        src: url('/simsunb.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }

    .font-simsun {
        font-family: 'SimSunCustom', serif;
    }

    .font-mono-custom {
        font-family: 'JetBrains Mono', monospace;
    }

    @keyframes fadeSlideIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .reveal {
        opacity: 0;
    }

    .is-mounted .reveal {
        animation: fadeSlideIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .nav-link {
        position: relative;
        display: inline-block;
        transition: color 0.3s ease;
        cursor: pointer;
    }

    .nav-link::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0%;
        height: 3px;
        background: white;
        transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .nav-link:hover::after {
        width: 100%;
    }

    .nav-link:hover {
        color: rgba(255,255,255,0.7);
    }

    .social-link {
        position: relative;
        display: inline-block;
        transition: color 0.25s ease;
        cursor: pointer;
    }

    .social-link::before {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 1px;
        background: white;
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .social-link:hover::before {
        transform: scaleX(1);
        transform-origin: left;
    }

    .social-link:hover {
        color: rgba(255,255,255,0.6);
    }

    .wordmark {
        line-height: 0.82;
        letter-spacing: -0.02em;
    }

    .wordmark-char {
        display: inline-block;
        transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
                    color 0.3s ease;
    }

    .wordmark:hover .wordmark-char {
        color: rgba(255,255,255,0.15);
    }

    .wordmark .wordmark-char:hover {
        transform: translateY(-8px) scale(1.04);
        color: white !important;
    }

    @media (max-width: 640px) {
        .wordmark .wordmark-char:hover {
            transform: translateY(-4px) scale(1.02);
        }
    }
`}</style>

            <div className={`flex flex-col h-full min-h-screen ${mounted ? 'is-mounted' : ''}`}>

                <div className="reveal flex items-start justify-between px-5 sm:px-8 md:px-12 lg:px-16 pt-5 sm:pt-8 md:pt-12" style={{ animationDelay: '0s' }}>
                    <span className="font-mono-custom text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.15em] uppercase text-white/80">
                        PORTFOLIO
                    </span>
                    <span className="font-mono-custom text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.15em] text-white/80">
                        2026
                    </span>
                </div>

                <div className="reveal flex items-center justify-between px-5 sm:px-8 md:px-12 lg:px-16 pt-2 sm:pt-3 md:pt-4" style={{ animationDelay: '0.1s' }}>
                    {navLinks.map(({ label, dest }, i) => (
                        <button
                            key={label}
                            onClick={() => navigate(dest)}
                            className="nav-link font-simsun uppercase text-white font-normal text-left"
                            style={{
                                fontSize: 'clamp(2.5rem, 8vw, 10rem)',
                                lineHeight: '1',
                                letterSpacing: '-0.01em',
                            }}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <div className="flex-1" />

                <div className="px-5 sm:px-8 md:px-12 lg:px-16 pb-0">
                    <div className="reveal flex items-end justify-between w-full pb-1 sm:pb-2" style={{ animationDelay: '0.3s' }}>
                        {socialLinks.map(({ label, href }) => (
                            <a
                                key={label}
                                href={href}
                                target={label !== 'email' ? '_blank' : undefined}
                                rel="noopener noreferrer"
                                className="social-link font-mono-custom text-white/90"
                                style={{
                                    fontSize: 'clamp(0.7rem, 2vw, 2.4rem)',
                                    letterSpacing: '0.05em',
                                }}
                            >
                                {label}
                            </a>
                        ))}
                    </div>

                    <div
                        className="reveal w-full overflow-hidden"
                        style={{ animationDelay: '0.45s' }}
                    >
                        <h1
                            className="wordmark font-simsun uppercase text-white font-normal w-full block"
                            style={{
                                fontSize: 'clamp(3.2rem, 16vw, 24rem)',
                                lineHeight: '0.82',
                                letterSpacing: '-0.02em',
                                whiteSpace: 'nowrap',
                            }}
                            aria-label="LEIMXNSQUARE"
                        >
                            {'LEIMXNSQUARE'.split('').map((char, i) => (
                                <span key={i} className="wordmark-char">{char}</span>
                            ))}
                        </h1>
                    </div>
                </div>
            </div>
        </section>
    )
}