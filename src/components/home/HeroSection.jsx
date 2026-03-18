import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export default function HeroSection({ setIsMenuOpen }) {
    const mountRef = useRef(null)
    const lastYRef = useRef(0)
    const isHoveringBee = useRef(false)
    const cursorPos = useRef({ x: 0, y: 0 })
    const buzzRef = useRef(null)
    const buzzFadeRef = useRef(null)
    const [menuVisible, setMenuVisible] = useState(true)
    const [typedText, setTypedText] = useState('')
    const [hearts, setHearts] = useState([])

    useEffect(() => {
        const text = 'A COLLECTION\nOF DESIGNS'
        let i = 0
        const timer = setInterval(() => {
            setTypedText(text.substring(0, i + 1))
            i++
            if (i === text.length) clearInterval(timer)
        }, 80)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY
            setMenuVisible(y < lastYRef.current || y < 10)
            lastYRef.current = y
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        let animId
        const mount = mountRef.current
        if (!mount) return

        const w = mount.clientWidth
        const h = mount.clientHeight

        const buzz = new Audio('/beesound.mp3')
        buzz.loop = true
        buzz.volume = 0
        buzzRef.current = buzz

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setSize(w, h)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.outputColorSpace = THREE.SRGBColorSpace
        mount.appendChild(renderer.domElement)

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(55, w / h, 0.01, 100)
        camera.position.set(0, 0.3, window.innerWidth < 768 ? 3.2 : 2.2)

        scene.add(new THREE.AmbientLight(0xffffff, 1.4))
        const dir = new THREE.DirectionalLight(0xffffff, 2)
        dir.position.set(2, 4, 3)
        scene.add(dir)

        let beeRoot = null
        let rightWing = null
        let leftWing = null
        let rightWingBaseQ = null
        let leftWingBaseQ = null
        let legs = []
        let legsBaseQ = []
        let antennae = []
        let antennaeBaseQ = []
        let stinger = null
        let stingerBaseQ = null
        let targetRotY = 0
        let targetRotX = 0
        let rotY = 0
        let rotX = 0

        const loader = new GLTFLoader()
        loader.load(
            '/bee/source/model.gltf',
            (gltf) => {
                beeRoot = gltf.scene
                scene.add(beeRoot)

                const box = new THREE.Box3().setFromObject(beeRoot)
                const size = box.getSize(new THREE.Vector3())
                const maxDim = Math.max(size.x, size.y, size.z)
                beeRoot.scale.setScalar(1.5 / maxDim)

                box.setFromObject(beeRoot)
                const center = box.getCenter(new THREE.Vector3())
                beeRoot.position.sub(center)
                beeRoot.rotation.y = Math.PI

                beeRoot.traverse((obj) => {
                    if (obj.name === 'rightwing_bone' && obj.children.length > 0) {
                        rightWing = obj
                        rightWingBaseQ = obj.quaternion.clone()
                    }
                    if (obj.name === 'leftwing_bone' && obj.children.length > 0) {
                        leftWing = obj
                        leftWingBaseQ = obj.quaternion.clone()
                    }
                    if (obj.name.startsWith('leg_')) {
                        legs.push(obj)
                        legsBaseQ.push(obj.quaternion.clone())
                    }
                    if (obj.name.toLowerCase().includes('lead')) {
                        antennae.push(obj)
                        antennaeBaseQ.push(obj.quaternion.clone())
                    }
                    if (obj.name.toLowerCase().includes('stinger') && !stinger) {
                        stinger = obj
                        stingerBaseQ = obj.quaternion.clone()
                    }
                })
            },
            undefined,
            (err) => console.error(err)
        )

        let heartCounter = 0
        const spawnHeart = (x, y) => {
            const id = heartCounter++
            const spreadX = x + (Math.random() - 0.5) * 30
            const spreadY = y + (Math.random() - 0.5) * 30

            setHearts(prev => [...prev, { id, x: spreadX, y: spreadY }])
            setTimeout(() => {
                setHearts(prev => prev.filter(h => h.id !== id))
            }, 1200)
        }

        const raycaster = new THREE.Raycaster()
        const mouse = new THREE.Vector2()

        const startBuzz = () => {
            const audio = buzzRef.current
            if (!audio || !audio.paused) return
            audio.volume = 0
            audio.play().catch(() => { })
            clearInterval(buzzFadeRef.current)
            buzzFadeRef.current = setInterval(() => {
                if (audio.volume < 0.45) {
                    audio.volume = Math.min(0.45, audio.volume + 0.02)
                } else {
                    clearInterval(buzzFadeRef.current)
                }
            }, 30)
        }

        const onFirstInteraction = () => {
            startBuzz()
            window.removeEventListener('click', onFirstInteraction)
            window.removeEventListener('touchstart', onFirstInteraction)
            window.removeEventListener('keydown', onFirstInteraction)
            window.removeEventListener('scroll', onFirstInteraction)
        }

        window.addEventListener('click', onFirstInteraction, { once: true })
        window.addEventListener('touchstart', onFirstInteraction, { once: true })
        window.addEventListener('keydown', onFirstInteraction, { once: true })
        window.addEventListener('scroll', onFirstInteraction, { once: true, passive: true })

        const updateBuzzVolume = () => {
            const audio = buzzRef.current
            if (!audio || audio.paused) return
            const sectionH = mount.clientHeight
            const scrollY = window.scrollY
            const ratio = Math.max(0, 1 - scrollY / sectionH)
            audio.volume = ratio * 0.45
        }

        window.addEventListener('scroll', updateBuzzVolume, { passive: true })

        const onMouseMove = (e) => {
            const rect = mount.getBoundingClientRect()

            cursorPos.current = { x: e.clientX, y: e.clientY }

            mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

            const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
            const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2
            targetRotY = nx * Math.PI * 0.5
            targetRotX = ny * Math.PI * 0.25

            if (beeRoot) {
                raycaster.setFromCamera(mouse, camera)
                const intersects = raycaster.intersectObject(beeRoot, true)

                if (intersects.length > 0) {
                    isHoveringBee.current = true
                    mount.style.cursor = 'pointer'
                } else {
                    isHoveringBee.current = false
                    mount.style.cursor = 'grab'
                }
            }
        }

        const onMouseLeave = () => {
            isHoveringBee.current = false
        }

        let isDragging = false
        let prevX = 0
        let prevY = 0

        const onTouchStart = (e) => {
            isDragging = true
            isHoveringBee.current = false
            prevX = e.touches[0].clientX
            prevY = e.touches[0].clientY

            const rect = mount.getBoundingClientRect()
            mouse.x = ((prevX - rect.left) / rect.width) * 2 - 1
            mouse.y = -((prevY - rect.top) / rect.height) * 2 + 1

            if (beeRoot) {
                raycaster.setFromCamera(mouse, camera)
                const intersects = raycaster.intersectObject(beeRoot, true)
                if (intersects.length > 0) {
                    spawnHeart(prevX, prevY)
                }
            }
        }

        const onTouchMove = (e) => {
            if (!isDragging) return
            targetRotY += (e.touches[0].clientX - prevX) * 0.012
            targetRotX += (e.touches[0].clientY - prevY) * 0.006
            prevX = e.touches[0].clientX
            prevY = e.touches[0].clientY
        }

        const onTouchEnd = () => {
            isDragging = false
        }

        mount.addEventListener('mousemove', onMouseMove)
        mount.addEventListener('mouseleave', onMouseLeave)
        mount.addEventListener('touchstart', onTouchStart, { passive: true })
        mount.addEventListener('touchmove', onTouchMove, { passive: true })
        mount.addEventListener('touchend', onTouchEnd)

        const clock = new THREE.Clock()
        let lastHeartSpawn = 0

        const animate = () => {
            animId = requestAnimationFrame(animate)
            const t = clock.getElapsedTime()

            if (isHoveringBee.current) {
                const now = Date.now()
                if (now - lastHeartSpawn > 120) {
                    spawnHeart(cursorPos.current.x, cursorPos.current.y)
                    lastHeartSpawn = now
                }
            }

            if (beeRoot) {
                rotY += (targetRotY - rotY) * 0.06
                rotX += (targetRotX - rotX) * 0.06

                beeRoot.rotation.y = Math.PI + rotY
                beeRoot.rotation.x = rotX
                beeRoot.position.y = Math.sin(t * 2.5) * 0.08

                if (rightWing && rightWingBaseQ) {
                    const flapQ = new THREE.Quaternion().setFromAxisAngle(
                        new THREE.Vector3(0, 1, 0),
                        Math.sin(t * 40) * 0.65
                    )
                    rightWing.quaternion.multiplyQuaternions(rightWingBaseQ, flapQ)
                }

                if (leftWing && leftWingBaseQ) {
                    const flapQ = new THREE.Quaternion().setFromAxisAngle(
                        new THREE.Vector3(0, 1, 0),
                        -Math.sin(t * 40) * 0.65
                    )
                    leftWing.quaternion.multiplyQuaternions(leftWingBaseQ, flapQ)
                }

                if (legs.length > 0) {
                    legs.forEach((leg, i) => {
                        const swayQ = new THREE.Quaternion().setFromAxisAngle(
                            new THREE.Vector3(1, 0, 0),
                            Math.sin(t * 5 + i * 1.5) * 0.1
                        )
                        leg.quaternion.multiplyQuaternions(legsBaseQ[i], swayQ)
                    })
                }

                if (antennae.length > 0) {
                    antennae.forEach((ant, i) => {
                        const swayQ = new THREE.Quaternion().setFromAxisAngle(
                            new THREE.Vector3(1, 0, 0),
                            Math.sin(t * 8 + i) * 0.15
                        )
                        ant.quaternion.multiplyQuaternions(antennaeBaseQ[i], swayQ)
                    })
                }

                if (stinger && stingerBaseQ) {
                    const swayQ = new THREE.Quaternion().setFromAxisAngle(
                        new THREE.Vector3(1, 0, 0),
                        Math.sin(t * 10) * 0.1
                    )
                    stinger.quaternion.multiplyQuaternions(stingerBaseQ, swayQ)
                }
            }

            renderer.render(scene, camera)
        }

        animate()

        const onResize = () => {
            const w2 = mount.clientWidth
            const h2 = mount.clientHeight
            camera.aspect = w2 / h2
            camera.position.z = window.innerWidth < 768 ? 3.2 : 2.2
            camera.updateProjectionMatrix()
            renderer.setSize(w2, h2)
        }

        window.addEventListener('resize', onResize)

        return () => {
            cancelAnimationFrame(animId)
            clearInterval(buzzFadeRef.current)
            window.removeEventListener('scroll', updateBuzzVolume)
            window.removeEventListener('click', onFirstInteraction)
            window.removeEventListener('touchstart', onFirstInteraction)
            window.removeEventListener('keydown', onFirstInteraction)
            window.removeEventListener('scroll', onFirstInteraction)
            if (buzzRef.current) {
                buzzRef.current.pause()
                buzzRef.current = null
            }
            window.removeEventListener('resize', onResize)
            mount.removeEventListener('mousemove', onMouseMove)
            mount.removeEventListener('mouseleave', onMouseLeave)
            mount.removeEventListener('touchstart', onTouchStart)
            mount.removeEventListener('touchmove', onTouchMove)
            mount.removeEventListener('touchend', onTouchEnd)
            renderer.dispose()
            if (mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement)
            }
        }
    }, [])

    return (
        <>
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(14px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes scrollBounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(6px); }
                }

                @keyframes cursorBlink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }

                @keyframes popAndFloat {
                    0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0; }
                    15% { transform: translate(-50%, -30px) scale(1); opacity: 1; }
                    100% { transform: translate(-50%, -140px) scale(0.8); opacity: 0; }
                }

                .fade-a { opacity: 0; animation: fadeUp 0.55s ease-out 0.3s forwards; }
                .fade-b { opacity: 0; animation: fadeUp 0.55s ease-out 0.45s forwards; }
                .fade-c { opacity: 0; animation: fadeUp 0.55s ease-out 0.6s forwards; }
                .fade-d { opacity: 0; animation: fadeUp 0.55s ease-out 0.6s forwards; }
                .fade-e { opacity: 0; animation: fadeUp 0.55s ease-out 0.75s forwards; }

                .scroll-bounce { animation: scrollBounce 1.8s ease-in-out infinite; }

                .cursor {
                    display: inline-block;
                    width: 6px;
                    height: 12px;
                    background-color: white;
                    margin-left: 2px;
                    animation: cursorBlink 1s step-end infinite;
                    vertical-align: middle;
                }

                .heart-img-wrapper {
                    position: absolute;
                    pointer-events: none;
                    animation: popAndFloat 5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
                    z-index: 100;
                    width: 80px;
                    height: 80px;
                }

                .heart-img-wrapper img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            `}</style>

            <section className="sticky top-0 z-0 bg-black w-full h-dvh overflow-hidden">
                <div
                    ref={mountRef}
                    className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
                />

                {hearts.map((heart) => (
                    <div
                        key={heart.id}
                        className="heart-img-wrapper"
                        style={{ left: heart.x, top: heart.y }}
                    >
                        <img
                            src="/heart.png"
                            alt="heart"
                        />
                    </div>
                ))}

                <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 sm:p-6 md:p-10 pointer-events-none">
                    <div className="flex justify-between items-start w-full pointer-events-auto">
                        <span className="fade-a text-white text-xs sm:text-sm tracking-widest uppercase">
                            LEIMXNSQUARE
                        </span>

                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className={`
                                fade-b
                                text-white text-xs sm:text-sm tracking-widest uppercase cursor-pointer
                                transition-all duration-300 ease-out
                                hover:bg-white hover:text-black
                                hover:-translate-y-1
                                ${menuVisible
                                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                                    : 'opacity-0 -translate-y-3 pointer-events-none'
                                }
                            `}
                        >
                            MENU
                        </button>
                    </div>

                    <div className="flex justify-between items-center w-full">
                        <div className="fade-c">
                            <p className="text-white text-[10px] sm:text-xs tracking-widest uppercase leading-loose min-h-10">
                                {typedText.split('\n').map((line, index) => (
                                    <span key={index}>
                                        {line}
                                        {index === 0 && typedText.includes('\n') && <br />}
                                    </span>
                                ))}
                                <span className="cursor"></span>
                            </p>
                        </div>

                        <div className="fade-d text-right pointer-events-auto">
                            <p className="text-white text-[10px] sm:text-xs tracking-widest uppercase leading-loose">
                                INSPIRED BY
                                <br />
                                <a
                                    href="https://wildyriftian.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline cursor-pointer"
                                >
                                    WILDYRIFTIAN.COM
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="fade-e flex flex-col items-center gap-1">
                        <span className="text-white text-[10px] sm:text-xs tracking-widest uppercase">
                            SCROLL TO EXPLORE
                        </span>
                        <span className="text-white text-sm scroll-bounce inline-block">
                            ↓
                        </span>
                    </div>
                </div>
            </section>
        </>
    )
}