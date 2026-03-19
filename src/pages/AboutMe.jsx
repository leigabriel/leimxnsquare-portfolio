import { useState } from 'react'

export default function AboutMe({ setIsMenuOpen, navigate }) {
    const [activeTab, setActiveTab] = useState(null)

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

    const tools = ['Affinity by Canva', 'Canva', 'VSCode']
    const tech = ['React.js', 'Tailwind CSS', 'Node.js']

    const handleTabClick = (index) => {
        const isOpening = activeTab !== index
        if (isOpening) {
            const audio = new Audio('/sounds/folder.mp3')
            audio.volume = 0.5
            audio.play().catch(() => { })
        }
        setActiveTab(activeTab === index ? null : index)
    }

    return (
        <main className="bg-white min-h-screen text-black flex flex-col overflow-x-hidden selection:bg-black selection:text-white">
            <style>{`
                @font-face {
                    font-family: 'SimSunCustom';
                    src: url('/simsunb.ttf') format('truetype');
                    font-weight: normal;
                    font-style: normal;
                    font-display: swap;
                }

                .font-simsun { font-family: 'SimSunCustom', serif; }
                .font-times { font-family: "Times New Roman", Times, serif; }

                .folder-tab {
                    clip-path: polygon(0 0, 360px 0, 400px 5rem, 100% 5rem, 100% 100%, 0 100%);
                    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease;
                }

                @media (max-width: 768px) {
                    .folder-tab {
                        clip-path: polygon(0 0, 240px 0, 270px 4rem, 100% 4rem, 100% 100%, 0 100%);
                    }
                }

                .folder-tab:hover {
                    transform: translateY(-8px);
                    filter: brightness(1.03);
                }

                .dotted-line {
                    background-image: radial-gradient(circle, rgba(0,0,0,0.5) 1.5px, transparent 1.5px);
                    background-size: 8px 8px;
                    height: 3px;
                    width: 100%;
                }
            `}</style>

            <div className="flex justify-between items-start px-6 md:px-12 pt-8 pb-12">
                <h1 className="font-simsun text-4xl sm:text-6xl md:text-[8vw] leading-none">
                    About Me
                </h1>

                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="text-xs md:text-sm uppercase tracking-[0.2em] cursor-pointer transition-all duration-300 ease-out hover:bg-black hover:text-white hover:-translate-y-1"
                >
                    MENU
                </button>
            </div>

            <div className="w-full text-black mt-auto flex flex-col pt-12">

                <div className={`folder-tab bg-[#b3b3b3] w-full relative z-10 ${activeTab === 0 ? 'drop-shadow-2xl' : ''}`}>
                    <button onClick={() => handleTabClick(0)} className="w-full group h-16 md:h-20 flex flex-col justify-end text-left cursor-pointer">
                        <div className="pb-3 md:pb-4">
                            <div className="font-simsun pl-6 md:pl-12 text-3xl md:text-5xl transition-all duration-500 opacity-70 group-hover:opacity-100 group-hover:translate-x-4">
                                Experiences
                            </div>
                        </div>
                        <div className="dotted-line transition-all duration-500 opacity-60 group-hover:opacity-100"></div>
                    </button>

                    <div className="grid transition-all duration-500" style={{ gridTemplateRows: activeTab === 0 ? '1fr' : '0fr' }}>
                        <div className="overflow-hidden">
                            <div className="px-6 md:px-12 pt-8 pb-10">
                                <div className="hidden md:grid grid-cols-3 gap-8 pb-4 border-b-2 border-dotted border-black/40 text-xs tracking-widest uppercase">
                                    <span>Location</span>
                                    <span>Company</span>
                                    <span>Position</span>
                                </div>

                                {experiences.map((exp, i) => (
                                    <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8 py-6 border-b-2 border-dotted border-black/40 hover:bg-black/5 transition-colors">
                                        <span className="text-sm tracking-widest uppercase text-black/70">{exp.location}</span>
                                        <span className="text-sm tracking-widest uppercase">{exp.company}</span>
                                        <span className="text-sm tracking-widest uppercase">{exp.position}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="h-16 md:h-20"></div>
                </div>

                <div className={`folder-tab bg-[#ffff00] w-full relative z-20 -mt-16 md:-mt-20 ${activeTab === 1 ? 'drop-shadow-2xl' : ''}`}>
                    <button onClick={() => handleTabClick(1)} className="w-full group h-16 md:h-20 flex flex-col justify-end text-left cursor-pointer">
                        <div className="pb-3 md:pb-4">
                            <div className="font-simsun pl-6 md:pl-12 text-3xl md:text-5xl transition-all duration-500 opacity-70 group-hover:opacity-100 group-hover:translate-x-4">
                                Skillsets
                            </div>
                        </div>
                        <div className="dotted-line transition-all duration-500 opacity-60 group-hover:opacity-100"></div>
                    </button>

                    <div className="grid transition-all duration-500" style={{ gridTemplateRows: activeTab === 1 ? '1fr' : '0fr' }}>
                        <div className="overflow-hidden">
                            <div className="px-6 md:px-12 pt-8 pb-10">
                                {skills.map((s, i) => (
                                    <div key={i} className="flex gap-6 py-4 border-b-2 border-dotted border-black/40 hover:bg-black/5">
                                        <span className="font-times text-4xl">{`0${i + 1}`}</span>
                                        <span className="font-times text-4xl capitalize">{s.label.toUpperCase()}</span>
                                    </div>
                                ))}

                                <div className="text-left text-xs tracking-[0.2em] uppercase py-4 border-b-2 border-dotted border-black/40 mt-10">
                                    Tools & Technologies
                                </div>

                                <div className="flex flex-col md:flex-row gap-8 mt-4">
                                    <div className="flex-1 flex flex-col gap-2 md:border-r-2 border-dotted border-black/40 pr-4">
                                        <span className="font-times uppercase text-sm tracking-widest mb-2">Tools</span>
                                        {tools.map((t) => (
                                            <div key={t} className="py-2 border-b-2 border-dotted border-black/40 hover:bg-black/5 text-sm tracking-widest uppercase">
                                                {t}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex-1 flex flex-col gap-2 pl-4">
                                        <span className="font-times uppercase text-sm tracking-widest mb-2">Technologies</span>
                                        {tech.map((t) => (
                                            <div key={t} className="py-2 border-b-2 border-dotted border-black/40 hover:bg-black/5 text-sm tracking-widest uppercase">
                                                {t}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-16 md:h-20"></div>
                </div>

                <div className={`folder-tab bg-[#f5f5f5] w-full relative z-30 -mt-16 md:-mt-20 ${activeTab === 2 ? 'drop-shadow-2xl' : ''}`}>
                    <button onClick={() => handleTabClick(2)} className="w-full group h-16 md:h-20 flex flex-col justify-end text-left cursor-pointer">
                        <div className="pb-3 md:pb-4">
                            <div className="font-simsun pl-6 md:pl-12 text-3xl md:text-5xl transition-all duration-500 opacity-70 group-hover:opacity-100 group-hover:translate-x-4">
                                Profile
                            </div>
                        </div>
                        <div className="dotted-line transition-all duration-500 opacity-60 group-hover:opacity-100"></div>
                    </button>

                    <div className="grid transition-all duration-500" style={{ gridTemplateRows: activeTab === 2 ? '1fr' : '0fr' }}>
                        <div className="overflow-hidden">
                            <div className="px-6 md:px-12 pt-10 pb-10">

                                <div className="grid lg:grid-cols-[420px_1fr] gap-12 border-b-2 border-dotted border-black/40 pb-10">

                                    <div className="w-full">
                                        <h3 className="font-simsun text-5xl mb-6">Leimxnsquare</h3>
                                        <div className="w-full aspect-square overflow-hidden">
                                            <img
                                                src="https://scontent.fmnl44-1.fna.fbcdn.net/v/t39.30808-6/633990022_1970971970483090_6269954113401431186_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeFYTJNSQXXPRuuu3dH_sBeLknulmyTBbrqSe6WbJMFuusBI4l6v4tRRmmtxPG-gHfcFz5TTS9v8LY71zqbfB-Ps&_nc_ohc=CmJlaTBFUUYQ7kNvwGfBAGN&_nc_oc=AdoueAGCwiMjnlFcGHr80VIZYMEic8Yqbp5Bpaseo7X4IK4j047HTfz5H2-aV_sCF4EZETVhBbDXdMFhGtAvplS6&_nc_zt=23&_nc_ht=scontent.fmnl44-1.fna&_nc_gid=wC9eV1_bffAWezGQufV6lA&_nc_ss=8&oh=00_Afxz18xhhGoEp_LdL2SSdmFurUewym9oRT7YwriMHLGR_A&oe=69C13AD1"
                                                alt="Profile"
                                                className="w-full h-full object-cover grayscale transition-transform duration-700 hover:scale-105"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-2 lg:mt-18">
                                        <div className="flex flex-col gap-6 max-w-7xl mt-4">
                                            <p className="text-xl md:text-4xl text-black/80 leading-10">
                                                I'm Leimxnsquare, a web developer and graphic designer from Oriental Mindoro, Philippines.
                                            </p>
                                            <p className="text-xl md:text-4xl text-black/80 leading-10">
                                                I have a passion for creating visually clear and user-focused digital experiences. With a background in both graphic and web design, I focus on turning ideas into practical and well-structured solutions, with attention to detail in both visuals and usability.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col">

                                    <div className="flex flex-col md:flex-row border-b-2 border-dotted border-black/40 hover:bg-black/5">
                                        <div className="w-full md:w-1/3 py-4 font-times text-3xl">email</div>
                                        <a href="mailto:malibiranleigabriel@gmail.com" className="w-full md:w-2/3 py-4 text-sm tracking-widest lowercase hover:opacity-60">
                                            malibiranleigabriel@gmail.com
                                        </a>
                                    </div>

                                    <div className="flex flex-col md:flex-row border-b-2 border-dotted border-black/40 hover:bg-black/5">
                                        <div className="w-full md:w-1/3 py-4 font-times text-3xl">instagram</div>
                                        <a href="https://instagram.com/leimxnsquare" target="_blank" rel="noreferrer" className="w-full md:w-2/3 py-4 text-sm tracking-widest lowercase hover:opacity-60">
                                            @leimxnsquare
                                        </a>
                                    </div>

                                    <div className="flex flex-col md:flex-row border-b-2 border-dotted border-black/40 hover:bg-black/5">
                                        <div className="w-full md:w-1/3 py-4 font-times text-3xl">github</div>
                                        <a href="https://github.com/leigabriel" target="_blank" rel="noreferrer" className="w-full md:w-2/3 py-4 text-sm tracking-widest lowercase hover:opacity-60">
                                            github.com/leigabriel
                                        </a>
                                    </div>

                                    <div onClick={() => navigate('works')} className="flex flex-col md:flex-row border-b-2 border-dotted border-black/40 hover:bg-black/5 cursor-pointer">
                                        <div className="w-full md:w-1/3 py-4 font-times text-3xl">portfolio</div>
                                        <div className="w-full md:w-2/3 py-4 text-sm tracking-widest uppercase">
                                            view works
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="h-16 md:h-20"></div>
                </div>

            </div>
        </main>
    )
}