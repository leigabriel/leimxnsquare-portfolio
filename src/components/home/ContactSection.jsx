export default function ContactSection({ navigate, setIsMenuOpen }) {
    const links = [
        { label: 'Home', dest: 'home' },
        { label: 'About', dest: 'about' },
        { label: 'Works', dest: 'works' },
        { label: 'Contact', dest: 'contact' },
    ]

    return (
        <section className="sticky top-0 z-30 bg-black w-full h-dvh flex flex-col overflow-hidden p-5 sm:p-8 md:p-10">

            <div className="flex justify-between items-center w-full">
                <span className="text-white/30 text-[10px] sm:text-xs tracking-widest uppercase">
                    LEIMXNSQUARE — ©2026
                </span>
            </div>

            <nav className="flex flex-col gap-0 flex-1 justify-center py-6 sm:py-8">
                {links.map(({ label, dest }, i) => (
                    <button
                        key={label}
                        onClick={() => navigate(dest)}
                        className="flex items-center justify-between w-full border-b border-white/6 py-3 sm:py-4 px-2 sm:px-4 group hover:bg-[#FFEA00] transition-colors duration-200 text-left"
                    >
                        <span className="text-white/30 text-xs sm:text-sm tracking-widest group-hover:text-black transition-colors">
                            0{i + 1}
                        </span>
                        <span className="text-white text-[8vw] sm:text-[7vw] md:text-[6.5vw] leading-none tracking-tight uppercase group-hover:text-black transition-colors">
                            {label}
                        </span>
                        <span className="text-white/30 text-xs sm:text-sm group-hover:text-black transition-colors">→</span>
                    </button>
                ))}
            </nav>

            <div className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 sm:gap-0">
                    <div className="flex flex-col gap-0.5">
                        <p className="text-white/30 text-[10px] sm:text-xs tracking-widest uppercase">
                            OPEN FOR COLLABORATIONS & FREELANCE WORK
                        </p>
                        <a
                            href="mailto:malibiranleigabriel@gmail.com"
                            className="text-white/60 text-xs sm:text-sm tracking-widest uppercase hover:text-[#FFEA00] transition-colors"
                        >
                            MALIBIRANLEIGABRIEL@GMAIL.COM
                        </a>
                    </div>
                </div>

                <div className="w-full border-t border-white/6"></div>

                <div className="-mx-5 sm:-mx-8 md:-mx-10">
                    <h1
                        className="text-white/90 uppercase px-5 sm:px-8 md:px-10 leading-none"
                        style={{
                            fontSize: 'clamp(3.5rem, 13.5vw, 14rem)',
                            letterSpacing: '-0.04em',
                            fontWeight: 400,
                            marginBottom: '-0.14em',
                        }}
                    >
                        LEIMXNSQUARE
                    </h1>
                </div>
            </div>

        </section>
    )
}