import { useEffect, useState, useRef, useCallback } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789*#@!'

function playSound(type) {
    try {
        if (type === 'open') {
            const a = new Audio('/menuopen.mp3')
            a.volume = 1.0
            a.play().catch(() => { })
        } else if (type === 'close') {
            const a = new Audio('/menuclose.mp3')
            a.volume = 1.0
            a.play().catch(() => { })
        } else if (type === 'nav') {
            const a = new Audio('/menuopen.mp3')
            a.volume = 0.45
            a.playbackRate = 1.6
            a.play().catch(() => { })
        }
    } catch (_) { }
}

function ScrambleLink({ label, onClick }) {
    const [display, setDisplay] = useState(label)
    const [hovered, setHovered] = useState(false)
    const frameRef = useRef(null)
    const iterRef = useRef(0)
    const labelUpper = label.toUpperCase()

    const scramble = () => {
        cancelAnimationFrame(frameRef.current)
        iterRef.current = 0
        const total = labelUpper.length
        const maxIter = total * 3

        const step = () => {
            iterRef.current++
            const progress = iterRef.current / maxIter
            const resolved = Math.floor(progress * total)
            const next = labelUpper
                .split('')
                .map((char, i) => i < resolved ? char : CHARS[Math.floor(Math.random() * CHARS.length)])
                .join('')
            setDisplay(next)
            if (iterRef.current < maxIter) {
                frameRef.current = requestAnimationFrame(step)
            } else {
                setDisplay(labelUpper)
            }
        }

        frameRef.current = requestAnimationFrame(step)
    }

    const restore = () => {
        cancelAnimationFrame(frameRef.current)
        setDisplay(label)
    }

    useEffect(() => () => cancelAnimationFrame(frameRef.current), [])

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => { setHovered(true); scramble() }}
            onMouseLeave={() => { setHovered(false); restore() }}
            className="w-full text-left group cursor-pointer"
            style={{ background: 'none', border: 'none', padding: 0 }}
        >
            <span
                className="cursor-pointer"
                style={{
                    display: 'block',
                    fontSize: 'clamp(3rem, 10vw, 6rem)',
                    lineHeight: 1,
                    letterSpacing: hovered ? '0.02em' : '-0.03em',
                    fontWeight: 400,
                    color: '#000',
                    paddingTop: '0.25em',
                    paddingBottom: '0.25em',
                    borderBottom: '1.5px dotted rgba(0,0,0,0.25)',
                    position: 'relative',
                    transition: 'letter-spacing 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                    userSelect: 'none',
                }}
            >
                <span
                    style={{
                        display: 'inline-block',
                        transform: hovered ? 'translateX(8px)' : 'translateX(0)',
                        transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                    }}
                >
                    {display}
                </span>

                <span style={{
                    position: 'absolute',
                    left: 0,
                    bottom: -1,
                    height: 0,
                    borderBottom: '2px dotted rgba(0,0,0,0.6)',
                    width: hovered ? '100%' : '0%',
                    transition: hovered
                        ? 'width 0.45s cubic-bezier(0.34,1.56,0.64,1)'
                        : 'width 0.25s ease',
                    display: 'block',
                }} />

                <span style={{
                    position: 'absolute',
                    right: 8,
                    top: '50%',
                    transform: hovered
                        ? 'translateY(-50%) scale(1) rotate(20deg)'
                        : 'translateY(-50%) scale(0) rotate(-20deg)',
                    transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                    fontSize: 'clamp(0.8rem, 2vw, 1.4rem)',
                    lineHeight: 1,
                    pointerEvents: 'none',
                }}>
                    ✦
                </span>
            </span>
        </button>
    )
}

export function MenuButton({ setIsMenuOpen, className = '', style = {} }) {
    const handleOpen = useCallback(() => {
        playSound('open')
        setIsMenuOpen(true)
    }, [setIsMenuOpen])

    return (
        <button
            onClick={handleOpen}
            className={`text-white text-xs sm:text-sm tracking-widest uppercase cursor-pointer transition-all duration-300 ease-out hover:bg-white hover:text-black hover:-translate-y-1 ${className}`}
            style={style}
        >
            MENU
        </button>
    )
}

export default function Menu({ setIsMenuOpen, navigate }) {
    const [closing, setClosing] = useState(false)

    const close = useCallback(() => {
        playSound('close')
        setClosing(true)
        setTimeout(() => setIsMenuOpen(false), 400)
    }, [setIsMenuOpen])

    const handleNav = useCallback((dest) => {
        playSound('nav')
        setClosing(true)
        setTimeout(() => navigate(dest), 400)
    }, [navigate])

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
            `}</style>

            <div
                className={`menu-overlay fixed inset-0 z-60 bg-black/20 cursor-pointer${closing ? ' out' : ''}`}
                onClick={close}
            />

            <div className={`menu-panel fixed inset-0 z-70 bg-[#FFEA00] flex flex-col justify-between p-5 sm:p-8 md:p-10${closing ? ' out' : ''}`}>

                <div className="menu-item flex justify-between items-center w-full border-b border-black/10 pb-4">
                    <span className="text-black text-xs tracking-widest uppercase">LEIMXNSQUARE</span>
                    <button
                        onClick={close}
                        className="text-black text-xs tracking-widest uppercase cursor-pointer transition-all duration-300 ease-out hover:bg-white hover:text-black hover:-translate-y-1"
                    >
                        CLOSE
                    </button>
                </div>

                <nav className="flex flex-col flex-1 justify-center gap-0 -mt-4">
                    {links.map(({ label, dest }) => (
                        <div key={label} className="menu-item">
                            <ScrambleLink label={label} onClick={() => handleNav(dest)} />
                        </div>
                    ))}
                </nav>

                <div className="menu-item flex justify-between items-end w-full border-t border-black/10 pt-4">
                    <div className="flex flex-col gap-0.5">
                        <span className="text-black/40 text-[9px] tracking-widest uppercase">ORIENTAL MINDORO, PH</span>
                    </div>
                    <span className="text-black/40 text-[9px] tracking-widest uppercase">©2026</span>
                </div>

            </div>
        </>
    )
}