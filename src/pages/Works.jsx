import { useState } from 'react'

const posterProjects = [
    { id: '01', title: 'Call Me', year: '2026', img: '/posters/callme.png' },
    { id: '02', title: 'Evil J', year: '2026', img: '/posters/evilj.png' },
    { id: '03', title: 'Giselle', year: '2026', img: '/posters/giselle.jpg' },
    { id: '04', title: 'Jennie', year: '2026', img: '/posters/jennie.png' },
    { id: '05', title: 'Kanibalismo', year: '2026', img: '/posters/kanibalismo.png' },
    { id: '06', title: 'Multo', year: '2026', img: '/posters/multo.png' },
    { id: '07', title: 'New J', year: '2026', img: '/posters/newj.png' },
    { id: '08', title: 'Ning', year: '2026', img: '/posters/ning.png' },
    { id: '09', title: 'Perception', year: '2026', img: '/posters/perception.png' },
    { id: '10', title: 'Pusa', year: '2026', img: '/posters/pusa.png' },
    { id: '11', title: 'Rockstar', year: '2026', img: '/posters/rockstar.png' },
    { id: '12', title: 'Thea', year: '2026', img: '/posters/thea.png' },
    { id: '13', title: 'Vintage', year: '2026', img: '/posters/vintage.png' },
    { id: '14', title: 'Yunjin', year: '2026', img: '/posters/yunjin.png' },
    { id: '15', title: 'Yunjin 2', year: '2026', img: '/posters/yunjin2.png' },
]

const webProjects = [
    { id: '01', title: 'Bulusan Zoo', year: '2026', stack: 'REACT.JS · TAILWINDCSS · NODE.JS · MYSQL', img: 'https://cdn-icons-png.flaticon.com/128/12801/12801273.png', link: 'https://bulusanzoo.vercel.app' },
]

export default function Works({ setIsMenuOpen, navigate }) {
    const [activeTab, setActiveTab] = useState(null)
    const [modal, setModal] = useState(null)

    const handleTabClick = (index) => {
        const isOpening = activeTab !== index
        if (isOpening) {
            const audio = new Audio('/folder.mp3')
            audio.volume = 0.5
            audio.play().catch(() => { })
        }
        setActiveTab(activeTab === index ? null : index)
    }

    return (
        <main className="bg-white min-h-screen text-black flex flex-col overflow-x-hidden selection:bg-black selection:text-white">

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');

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

                .dotted-line-white {
                    background-image: radial-gradient(circle, rgba(255,255,255,0.5) 1.5px, transparent 1.5px);
                    background-size: 8px 8px;
                    height: 3px;
                    width: 100%;
                }

                .works-row {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem 1.5rem;
                    cursor: pointer !important;
                    transition: background 0.15s;
                }

                .works-row *,
                .works-row img,
                .works-row span {
                    cursor: pointer !important;
                }

                .works-row-thumb {
                    flex-shrink: 0;
                    object-fit: cover;
                    cursor: pointer !important;
                    transition: opacity 0.2s, transform 0.3s;
                }

                .poster-row {
                    cursor: pointer !important;
                }

                .poster-row *,
                .poster-row img,
                .poster-row span {
                    cursor: pointer !important;
                }

                .tab-btn {
                    cursor: pointer !important;
                }

                .tab-btn *,
                .tab-btn h2,
                .tab-btn div {
                    cursor: pointer !important;
                }

                @keyframes modalIn {
                    from { opacity: 0; transform: scale(0.96) translateY(10px); }
                    to   { opacity: 1; transform: scale(1) translateY(0); }
                }
                .modal-panel { animation: modalIn 0.22s ease-out forwards; }
            `}</style>

            <div className="flex justify-between items-start px-6 md:px-12 pt-8 pb-12">
                <h1 className="font-times text-4xl sm:text-6xl md:text-[8vw] leading-none">
                    Works
                </h1>
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="text-xs md:text-sm uppercase tracking-[0.2em] cursor-pointer transition-all duration-300 ease-out hover:bg-black hover:text-white hover:-translate-y-1 px-2 py-1"
                >
                    MENU
                </button>
            </div>

            <div className="w-full text-black mt-auto flex flex-col pt-12">

                {/* Tab 1 — Web Projects */}
                <div className={`folder-tab bg-[#212121] w-full relative z-10 ${activeTab === 0 ? 'drop-shadow-2xl' : ''}`}>
                    <button
                        onClick={() => handleTabClick(0)}
                        className="tab-btn w-full group h-16 md:h-20 flex flex-col justify-end text-left"
                    >
                        <div className="pb-3 md:pb-4">
                            <h2 className="font-times pl-6 md:pl-12 text-3xl md:text-5xl text-white transition-all duration-500 opacity-70 group-hover:opacity-100 group-hover:translate-x-4">
                                01 Web Projects
                            </h2>
                        </div>
                        <div className="dotted-line-white transition-all duration-500 opacity-60 group-hover:opacity-100"></div>
                    </button>

                    <div className="grid transition-all duration-500" style={{ gridTemplateRows: activeTab === 0 ? '1fr' : '0fr' }}>
                        <div className="overflow-hidden">
                            <div className="px-6 md:px-12 pt-8 pb-10">

                                {webProjects.length === 0 ? (
                                    <div className="flex flex-col items-start gap-3 py-10 border-b-2 border-dotted border-white/20">
                                        <span className="font-times text-5xl text-white/20">—</span>
                                        <p className="text-xs tracking-widest uppercase text-white/30">Coming soon</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="hidden md:grid grid-cols-3 gap-8 pb-4 border-b-2 border-dotted border-white/20 text-xs tracking-widest uppercase text-white/40">
                                            <span>Project</span>
                                            <span>Stack</span>
                                            <span>Year</span>
                                        </div>

                                        {webProjects.map((p) => (
                                            <div
                                                key={p.id}
                                                className="works-row border-b-2 border-dotted border-white/10 hover:bg-white/5"
                                                onClick={() => p.link ? window.open(p.link, '_blank') : setModal({ ...p, type: 'web' })}
                                            >
                                                <img src={p.img} alt={p.title} className="works-row-thumb w-12 h-12 sm:w-14 sm:h-14 opacity-70 hover:opacity-100" />
                                                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                                                    <span className="text-sm tracking-widest uppercase text-white truncate">{p.title}</span>
                                                    <span className="text-[9px] tracking-widest uppercase text-white/30">{p.stack}</span>
                                                </div>
                                                <div className="flex items-center gap-4 shrink-0">
                                                    <span className="text-[9px] tracking-widest uppercase text-white/20 hidden sm:inline">{p.year}</span>
                                                    <span className="text-white/30 text-sm">→</span>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}

                                <div className="pt-6 flex justify-between items-center">
                                    <span className="text-[9px] tracking-widest uppercase text-white/20">{webProjects.length} WORKS</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-16 md:h-20"></div>
                </div>

                {/* Tab 2 — Poster Design */}
                <div className={`folder-tab bg-[#ffff00] w-full relative z-20 -mt-16 md:-mt-20 ${activeTab === 1 ? 'drop-shadow-2xl' : ''}`}>
                    <button
                        onClick={() => handleTabClick(1)}
                        className="tab-btn w-full group h-16 md:h-20 flex flex-col justify-end text-left"
                    >
                        <div className="pb-3 md:pb-4">
                            <h2 className="font-times pl-6 md:pl-12 text-3xl md:text-5xl transition-all duration-500 opacity-70 group-hover:opacity-100 group-hover:translate-x-4">
                                02 Poster Design
                            </h2>
                        </div>
                        <div className="dotted-line transition-all duration-500 opacity-60 group-hover:opacity-100"></div>
                    </button>

                    <div className="grid transition-all duration-500" style={{ gridTemplateRows: activeTab === 1 ? '1fr' : '0fr' }}>
                        <div className="overflow-hidden">
                            <div className="px-6 md:px-12 pt-8 pb-10">
                                <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] gap-8 pb-4 border-b-2 border-dotted border-black/30 text-xs tracking-widest uppercase text-black/50">
                                    <span>Title</span>
                                    <span>Type</span>
                                    <span>Year</span>
                                </div>

                                <div className="grid gap-4">
                                    {posterProjects.map((p) => (
                                        <div
                                            key={p.id}
                                            className="poster-row grid grid-cols-[2fr_1fr_1fr] items-center border-b-2 border-dotted border-black/20 p-2 md:p-0 hover:bg-black/5"
                                            onClick={() => setModal({ ...p, type: 'poster' })}
                                        >
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={p.img}
                                                    alt={p.title}
                                                    className="w-12 h-12 sm:w-14 sm:h-14 object-cover opacity-75 hover:opacity-100"
                                                />
                                                <span className="text-sm tracking-widest uppercase text-black truncate">{p.title}</span>
                                            </div>
                                            <span className="text-[9px] tracking-widest uppercase text-black/35 hidden md:block">
                                                POSTER DESIGN
                                            </span>
                                            <span className="text-[9px] tracking-widest uppercase text-black/25 hidden md:block">{p.year}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-6 flex justify-between items-center">
                                    <span className="text-[9px] tracking-widest uppercase text-black/25">
                                        {posterProjects.length} WORKS
                                    </span>
                                    <button
                                        onClick={() => navigate('about')}
                                        className="text-[9px] tracking-widest uppercase text-black/40 hover:text-black transition-colors cursor-pointer"
                                    >
                                        ABOUT ME →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-16 md:h-20"></div>
                </div>

            </div>

            {modal && (
                <div
                    className="fixed inset-0 z-80 flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
                    onClick={() => setModal(null)}
                >
                    <button
                        onClick={() => setModal(null)}
                        className="absolute top-4 right-4 z-10 text-white/50 hover:text-white text-[9px] tracking-widest uppercase transition-colors cursor-pointer"
                    >
                        CLOSE
                    </button>
                    <img
                        src={modal.img}
                        alt={modal.title}
                        className="modal-panel block"
                        style={{ maxWidth: '90vw', maxHeight: '92dvh', width: 'auto', height: 'auto', objectFit: 'contain', cursor: 'default' }}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </main>
    )
}