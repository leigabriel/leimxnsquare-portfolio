export default function AboutMe({ setIsMenuOpen, navigate }) {
    const experiences = [
        {
            company: 'FREELANCE',
            location: 'ORIENTAL MINDORO, PH',
            position: 'POSTER DESIGN FOR FRIENDS & CLIENTS',
        },
    ]

    const skills = [
        { label: 'UI/UX DESIGN' },
        { label: 'GRAPHIC DESIGN' },
        { label: 'WEB DEVELOPMENT' },
    ]

    const tools = [
        'Affinity by Canva',
        'Canva',
        'VSCode',
    ]

    const tech = [
        'React.js',
        'Tailwind CSS',
        'Node.js',
        'MySQL',
    ]

    return (
        <main className="bg-white min-h-screen text-black">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500&display=swap');
                @keyframes amFadeUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .am1 { opacity: 0; animation: amFadeUp 0.5s ease-out 0.05s forwards; }
                .am2 { opacity: 0; animation: amFadeUp 0.5s ease-out 0.12s forwards; }
                .am3 { opacity: 0; animation: amFadeUp 0.5s ease-out 0.2s forwards; }
                .am4 { opacity: 0; animation: amFadeUp 0.5s ease-out 0.28s forwards; }

                .exp-row { border-bottom: 1px dotted rgba(0,0,0,0.12); }
                .dot-sm { width: 6px; height: 6px; border-radius: 50%; background: rgba(0,0,0,0.25); flex-shrink: 0; }
                .dot-circle { width: 9px; height: 9px; border-radius: 50%; border: 1px solid rgba(0,0,0,0.3); flex-shrink: 0; }
                .section-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px dotted rgba(0,0,0,0.12);
                    padding: 0.6rem 1rem;
                    font-size: 0.6rem;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                }
            `}</style>

            <div className="am1 px-4 sm:px-8 md:px-12 pt-10 md:pt-14 pb-4 flex items-end justify-between border-b border-black/10 border-dotted">
                <div className="flex items-end gap-6 md:gap-14">
                    <h1
                        className="font-serif tracking-tight leading-none"
                        style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', fontWeight: 400, letterSpacing: '-0.04em' }}
                    >
                        About
                    </h1>
                    <h1
                        className="font-serif tracking-tight leading-none pb-1"
                        style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', fontWeight: 400, letterSpacing: '-0.04em' }}
                    >
                        me
                    </h1>
                </div>
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="text-[10px] sm:text-xs tracking-widest uppercase text-black/40 hover:text-black transition-colors pb-1"
                >
                    MENU
                </button>
            </div>

            <div className="am2 flex flex-col border-b border-black/10 border-dotted">

                <div className="flex flex-col lg:flex-row border-b border-black/10 border-dotted">

                    <div className="w-full lg:w-[32%] shrink-0 border-b lg:border-b-0 lg:border-r border-black/10 border-dotted">
                        <div className="section-header">
                            <div className="flex items-center gap-2.5">
                                <div className="dot-circle"></div>
                                <span>ABOUT</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <span>DETAILS</span>
                                <div className="dot-sm"></div>
                            </div>
                        </div>
                        <div className="p-4 sm:p-6 flex flex-col gap-4">
                            <div className="aspect-square w-full max-w-65 overflow-hidden bg-zinc-100">
                                <img
                                    src="https://avatars.githubusercontent.com/u/223958636?v=4"
                                    alt="Profile"
                                    className="w-full h-full object-cover grayscale"
                                />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <h2 className="text-xl sm:text-2xl font-serif tracking-tight">Leimxnsquare</h2>
                                <p className="text-[9px] tracking-widest uppercase text-black/35">ORIENTAL MINDORO, PH</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                        <div className="section-header">
                            <div className="flex items-center gap-2.5">
                                <div className="dot-sm"></div>
                                <span>EXPERIENCES</span>
                            </div>
                            <div className="dot-sm"></div>
                        </div>
                        <div className="p-4 sm:p-6">
                            <div className="flex justify-between text-[9px] tracking-widest uppercase text-black/25 border-b border-black/10 border-dotted pb-2 mb-1">
                                <span>COMPANY</span>
                                <span>POSITION</span>
                            </div>
                            {experiences.map(({ company, location, position }, i) => (
                                <div key={i} className="exp-row flex justify-between items-start py-4 gap-4">
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-sm sm:text-base tracking-tight">{company}</span>
                                        <span className="text-[9px] tracking-widest uppercase text-black/30">{location}</span>
                                    </div>
                                    <span className="text-[10px] sm:text-xs tracking-widest uppercase text-right max-w-[55%] text-black/70">{position}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row border-b border-black/10 border-dotted">
                    <div className="w-full lg:w-[32%] shrink-0 bg-[#FFEA00] border-b lg:border-b-0 lg:border-r border-black/10 border-dotted">
                        <div className="section-header" style={{ borderBottomColor: 'rgba(0,0,0,0.15)' }}>
                            <div className="flex items-center gap-2.5">
                                <div className="dot-circle" style={{ borderColor: 'rgba(0,0,0,0.35)' }}></div>
                                <span>SKILLSETS</span>
                            </div>
                            <div className="dot-sm" style={{ background: 'rgba(0,0,0,0.3)' }}></div>
                        </div>
                        <div className="p-4 sm:p-6">
                            <h2
                                className="font-serif tracking-tight leading-tight"
                                style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 400, letterSpacing: '-0.03em' }}
                            >
                                Skillsets
                            </h2>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                        <div className="section-header">
                            <div className="flex items-center gap-2.5">
                                <div className="dot-sm"></div>
                                <span>SKILLS & TOOLS</span>
                            </div>
                            <div className="dot-sm"></div>
                        </div>
                        <div className="p-4 sm:p-6 flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <span className="text-[9px] tracking-widest uppercase text-black/30">DISCIPLINES</span>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map(({ label }) => (
                                        <span key={label} className="border border-black/20 px-3 py-1.5 text-[10px] sm:text-xs tracking-widest uppercase hover:bg-[#FFEA00] hover:border-[#FFEA00] transition-colors cursor-default">
                                            {label}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-[9px] tracking-widest uppercase text-black/30">TOOLS</span>
                                <div className="flex flex-wrap gap-2">
                                    {tools.map((t) => (
                                        <span key={t} className="border border-black/20 px-3 py-1.5 text-[10px] sm:text-xs tracking-widest uppercase hover:bg-[#FFEA00] hover:border-[#FFEA00] transition-colors cursor-default">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-[9px] tracking-widest uppercase text-black/30">TECHNOLOGIES</span>
                                <div className="flex flex-wrap gap-2">
                                    {tech.map((t) => (
                                        <span key={t} className="border border-black/20 px-3 py-1.5 text-[10px] sm:text-xs tracking-widest uppercase hover:bg-[#FFEA00] hover:border-[#FFEA00] transition-colors cursor-default">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-[32%] shrink-0 border-b lg:border-b-0 lg:border-r border-black/10 border-dotted">
                        <div className="section-header">
                            <div className="flex items-center gap-2.5">
                                <div className="dot-circle"></div>
                                <span>PROFILE</span>
                            </div>
                            <div className="dot-sm"></div>
                        </div>
                        <div className="p-4 sm:p-6">
                            <h2
                                className="font-serif tracking-tight leading-tight"
                                style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 400, letterSpacing: '-0.03em' }}
                            >
                                Leimxnsquare
                            </h2>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                        <div className="section-header">
                            <div className="dot-sm"></div>
                            <span>BIO</span>
                            <div className="dot-sm"></div>
                        </div>
                        <div className="p-4 sm:p-6 md:p-8 flex flex-col gap-5">
                            <p
                                className="text-black/75 leading-relaxed"
                                style={{ fontFamily: "'Dancing Script', cursive", fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)' }}
                            >
                                I'm Leimxnsquare, a web developer and graphic designer from Oriental Mindoro, Philippines. I create poster designs for friends and clients, and build modern web experiences with clean, purposeful design.
                            </p>
                            <p
                                className="text-black/45 leading-relaxed"
                                style={{ fontFamily: "'Dancing Script', cursive", fontSize: 'clamp(0.95rem, 1.8vw, 1.3rem)' }}
                            >
                                Passionate about pushing creative boundaries across UI/UX design, graphic design, and web development. I embrace every challenge with an open and proactive mindset.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <button
                                    onClick={() => navigate('works')}
                                    className="border border-black px-6 py-3 text-[10px] sm:text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
                                >
                                    VIEW WORKS →
                                </button>
                                <a
                                    href="mailto:hello@leimxnsquare.com"
                                    className="border border-black/25 px-6 py-3 text-[10px] sm:text-xs tracking-widest uppercase hover:border-black transition-colors text-center"
                                >
                                    GET IN TOUCH
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="am4 px-4 sm:px-8 md:px-12 py-5 flex justify-between items-center">
                <span className="text-[9px] tracking-widest uppercase text-black/25">LEIMXNSQUARE — ©2026</span>
                <span className="text-[9px] tracking-widest uppercase text-black/25">ORIENTAL MINDORO, PH</span>
            </div>
        </main>
    )
}