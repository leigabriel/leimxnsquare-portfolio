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
    // { id: '01', title: 'Bulusan Zoo Platform', year: '2026', stack: 'REACT.JS · TAILWIND · NODE.JS · MYSQL', img: '/web/bulusan.jpg', link: 'https://bulusanzoo.vercel.app' },
    // { id: '02', title: 'Leimxnsquare Portfolio', year: '2026', stack: 'REACT.JS · TAILWIND · THREE.JS', img: '/web/portfolio.jpg', link: null },
]

export default function Works({ setIsMenuOpen, navigate }) {
    const [modal, setModal] = useState(null)

    return (
        <main className="bg-white text-black min-h-screen">
            <style>{`
                @keyframes wFadeUp {
                    from { opacity: 0; transform: translateY(14px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .wf1 { opacity: 0; animation: wFadeUp 0.45s ease-out 0.05s forwards; }
                .wf2 { opacity: 0; animation: wFadeUp 0.45s ease-out 0.15s forwards; }
                .wf3 { opacity: 0; animation: wFadeUp 0.45s ease-out 0.25s forwards; }

                .poster-row {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem 1.25rem;
                    border-bottom: 1px dotted rgba(0,0,0,0.15);
                    cursor: pointer;
                    transition: background 0.15s;
                    background: transparent;
                }
                .poster-row:hover { background: rgba(0,0,0,0.06); }
                .poster-row:hover .p-thumb { opacity: 1; transform: scale(1.03); }

                .web-row {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem 1.25rem;
                    border-bottom: 1px dotted rgba(255,255,255,0.1);
                    cursor: pointer;
                    transition: background 0.15s;
                    background: transparent;
                }
                .web-row:hover { background: rgba(255,234,0,0.08); }
                .web-row:hover .w-thumb { opacity: 1; transform: scale(1.03); }

                .p-thumb {
                    opacity: 0.75;
                    transition: opacity 0.2s, transform 0.3s;
                    flex-shrink: 0;
                    object-fit: cover;
                }
                .w-thumb {
                    opacity: 0.65;
                    transition: opacity 0.2s, transform 0.3s;
                    flex-shrink: 0;
                    object-fit: cover;
                }

                @keyframes modalIn {
                    from { opacity: 0; transform: scale(0.96) translateY(10px); }
                    to   { opacity: 1; transform: scale(1) translateY(0); }
                }
                .modal-panel { animation: modalIn 0.22s ease-out forwards; }
            `}</style>

            <div className="wf1 sticky top-0 z-20 bg-white border-b border-black/10 px-5 sm:px-8 md:px-12 py-4 flex justify-between items-center">
                <div className="flex items-center gap-6 md:gap-10">
                    <h1 className="font-serif leading-none" style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', fontWeight: 400, letterSpacing: '-0.03em' }}>
                        Works
                    </h1>
                    <span className="text-black/20 text-[10px] tracking-widest uppercase hidden sm:inline">
                        {posterProjects.length + webProjects.length} PROJECTS
                    </span>
                </div>
                <button onClick={() => setIsMenuOpen(true)} className="text-[10px] sm:text-xs tracking-widest uppercase text-black/35 hover:text-black transition-colors">
                    MENU
                </button>
            </div>

            <section className="wf2 bg-black">
                <div className="sticky top-14.25 z-10 bg-black flex items-center justify-between px-5 sm:px-8 md:px-12 py-5 md:py-7 border-b border-white/10 border-dotted">
                    <div className="flex flex-col gap-1">
                        <span className="text-[9px] tracking-widest uppercase text-white/30">01</span>
                        <h2 className="font-serif leading-none text-white" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', fontWeight: 400, letterSpacing: '-0.03em' }}>
                            Web Projects
                        </h2>
                    </div>
                    <span className="text-white/20 text-[10px] tracking-widest uppercase">{webProjects.length} WORKS</span>
                </div>

                {webProjects.map((p) => (
                    <div key={p.id} className="web-row" onClick={() => setModal({ ...p, type: 'web' })}>
                        <img src={p.img} alt={p.title} className="w-thumb w-12 h-12 sm:w-14 sm:h-14" />
                        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                            <span className="text-sm sm:text-base md:text-lg tracking-tight text-white truncate">{p.title}</span>
                            <span className="text-[9px] tracking-widest uppercase text-white/25">{p.stack}</span>
                        </div>
                        <div className="flex items-center gap-4 shrink-0">
                            <span className="text-[9px] tracking-widest uppercase text-white/20 hidden sm:inline">{p.year}</span>
                            <span className="text-white/25 text-sm">→</span>
                        </div>
                    </div>
                ))}
            </section>

            <section className="wf3 bg-[#FFEA00]">
                <div className="sticky top-14.25 z-10 bg-[#FFEA00] flex items-center justify-between px-5 sm:px-8 md:px-12 py-5 md:py-7 border-b border-black/10 border-dotted">
                    <div className="flex flex-col gap-1">
                        <span className="text-[9px] tracking-widest uppercase text-black/40">02</span>
                        <h2 className="font-serif leading-none" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', fontWeight: 400, letterSpacing: '-0.03em' }}>
                            Poster Design
                        </h2>
                    </div>
                    <span className="text-black/25 text-[10px] tracking-widest uppercase">{posterProjects.length} WORKS</span>
                </div>

                {posterProjects.map((p) => (
                    <div key={p.id} className="poster-row" onClick={() => setModal({ ...p, type: 'poster' })}>
                        <img src={p.img} alt={p.title} className="p-thumb w-12 h-12 sm:w-14 sm:h-14" />
                        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                            <span className="text-sm sm:text-base md:text-lg tracking-tight text-black truncate">{p.title}</span>
                            <span className="text-[9px] tracking-widest uppercase text-black/30">POSTER DESIGN</span>
                        </div>
                        <div className="flex items-center gap-4 shrink-0">
                            <span className="text-[9px] tracking-widest uppercase text-black/25 hidden sm:inline">{p.year}</span>
                            <span className="text-black/30 text-sm">→</span>
                        </div>
                    </div>
                ))}

                <div className="px-5 sm:px-8 md:px-12 py-6 flex justify-between items-center border-t border-black/8 border-dotted">
                    <span className="text-black/20 text-[9px] tracking-widest uppercase">LEIMXNSQUARE — ©2026</span>
                    <button onClick={() => navigate('about')} className="text-[9px] tracking-widest uppercase text-black/30 hover:text-black transition-colors">ABOUT ME →</button>
                </div>
            </section>

            {modal && (
                <div
                    className="fixed inset-0 z-80 flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
                    onClick={() => setModal(null)}
                >
                    <button
                        onClick={() => setModal(null)}
                        className="absolute top-4 right-4 z-10 text-white/50 hover:text-white text-[9px] tracking-widest uppercase transition-colors"
                    >
                        CLOSE ✕
                    </button>
                    <img
                        src={modal.img}
                        alt={modal.title}
                        className="modal-panel block"
                        style={{ maxWidth: '90vw', maxHeight: '92dvh', width: 'auto', height: 'auto', objectFit: 'contain' }}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </main>
    )
}