import { useEffect, useState } from 'react'

export default function Menu({ setIsMenuOpen, navigate }) {
    const [visible, setVisible] = useState(false)
    const [closing, setClosing] = useState(false)

    useEffect(() => {
        requestAnimationFrame(() => setVisible(true))
    }, [])

    const close = () => {
        setClosing(true)
        setTimeout(() => setIsMenuOpen(false), 400)
    }

    const handleNav = (dest) => {
        setClosing(true)
        setTimeout(() => navigate(dest), 400)
    }

    const links = [
        { label: 'Home', dest: 'home' },
        { label: 'About', dest: 'about' },
        { label: 'Works', dest: 'works' },
        { label: 'Contact', dest: 'contact' },
    ]

    return (
        <>
            <style>{`
                @keyframes menuOverlayIn  { from { opacity: 0; } to { opacity: 1; } }
                @keyframes menuOverlayOut { from { opacity: 1; } to { opacity: 0; } }
                @keyframes menuPanelIn    { from { transform: translateY(-100%); } to { transform: translateY(0); } }
                @keyframes menuPanelOut   { from { transform: translateY(0); } to { transform: translateY(-100%); } }
                @keyframes menuItemIn     { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

                .menu-overlay {
                    animation: menuOverlayIn 0.35s ease forwards;
                }
                .menu-overlay.out {
                    animation: menuOverlayOut 0.35s ease forwards;
                }
                .menu-panel {
                    animation: menuPanelIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .menu-panel.out {
                    animation: menuPanelOut 0.4s cubic-bezier(0.7, 0, 0.84, 0) forwards;
                }
                .menu-item {
                    opacity: 0;
                    animation: menuItemIn 0.5s ease forwards;
                }
                .menu-item:nth-child(1) { animation-delay: 0.15s; }
                .menu-item:nth-child(2) { animation-delay: 0.22s; }
                .menu-item:nth-child(3) { animation-delay: 0.29s; }
                .menu-item:nth-child(4) { animation-delay: 0.36s; }
                .menu-item:nth-child(5) { animation-delay: 0.43s; }

                .menu-link {
                    display: block;
                    font-size: clamp(3rem, 10vw, 6rem);
                    line-height: 1;
                    letter-spacing: -0.03em;
                    font-weight: 400;
                    color: black;
                    text-decoration: none;
                    border-bottom: 1px dotted rgba(0,0,0,0.2);
                    padding: 0.3em 0;
                    transition: opacity 0.2s, padding-left 0.3s;
                }
                .menu-link:hover {
                    opacity: 0.5;
                    padding-left: 0.15em;
                }
            `}</style>

            <div
                className={`menu-overlay fixed inset-0 z-60 bg-black/20${closing ? ' out' : ''}`}
                onClick={close}
            />

            <div className={`menu-panel fixed inset-0 z-70 bg-[#FFEA00] flex flex-col justify-between p-5 sm:p-8 md:p-10${closing ? ' out' : ''}`}>

                <div className="menu-item flex justify-between items-center w-full border-b border-black/10 pb-4">
                    <span className="text-black text-xs tracking-widest uppercase">LEIMXNSQUARE</span>
                    <button
                        onClick={close}
                        className="text-black text-xs tracking-widest uppercase hover:opacity-50 transition-opacity"
                    >
                        CLOSE
                    </button>
                </div>

                <nav className="flex flex-col flex-1 justify-center gap-0 -mt-4">
                    {links.map(({ label, dest }) => (
                        <div key={label} className="menu-item">
                            <button
                                onClick={() => handleNav(dest)}
                                className="menu-link w-full text-left"
                            >
                                {label}
                            </button>
                        </div>
                    ))}
                </nav>

                <div className="menu-item flex justify-between items-end w-full border-t border-black/10 pt-4">
                    <div className="flex flex-col gap-0.5">
                        <span className="text-black/40 text-[9px] tracking-widest uppercase">ORIENTAL MINDORO, PH</span>
                        <span className="text-black/40 text-[9px] tracking-widest uppercase">14.2126° N, 121.1636° E</span>
                    </div>
                    <span className="text-black/40 text-[9px] tracking-widest uppercase">©2026</span>
                </div>

            </div>
        </>
    )
}