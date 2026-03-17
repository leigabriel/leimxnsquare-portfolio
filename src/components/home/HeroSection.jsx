import { useEffect, useRef, useState } from 'react'

import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export default function HeroSection({ setIsMenuOpen }) {
    const mountRef = useRef(null)
    const lastYRef = useRef(0)
    const [menuVisible, setMenuVisible] = useState(true)
    const [typedText, setTypedText] = useState('')

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

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setSize(w, h)
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.outputColorSpace = THREE.SRGBColorSpace
        mount.appendChild(renderer.domElement)

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(55, w / h, 0.01, 100)
        camera.position.set(0, 0.3, 2.2)

        scene.add(new THREE.AmbientLight(0xffffff, 1.4))
        const dir = new THREE.DirectionalLight(0xffffff, 2)
        dir.position.set(2, 4, 3)
        scene.add(dir)

        let beeRoot = null
        let rightWing = null
        let leftWing = null
        let rightWingBaseQ = null
        let leftWingBaseQ = null
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
                })
            },
            undefined,
            (err) => console.error('GLTF load error:', err)
        )

        const onMouseMove = (e) => {
            const rect = mount.getBoundingClientRect()
            const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
            const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2
            targetRotY = nx * Math.PI * 0.6
            targetRotX = ny * Math.PI * 0.3
        }

        let isDragging = false
        let prevX = 0
        let prevY = 0

        const onTouchStart = (e) => {
            isDragging = true
            prevX = e.touches[0].clientX
            prevY = e.touches[0].clientY
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
        mount.addEventListener('touchstart', onTouchStart, { passive: true })
        mount.addEventListener('touchmove', onTouchMove, { passive: true })
        mount.addEventListener('touchend', onTouchEnd)

        const clock = new THREE.Clock()

        const animate = () => {
            animId = requestAnimationFrame(animate)
            const t = clock.getElapsedTime()

            if (beeRoot) {
                rotY += (targetRotY - rotY) * 0.08
                rotX += (targetRotX - rotX) * 0.08

                beeRoot.rotation.y = Math.PI + rotY
                beeRoot.rotation.x = rotX
                beeRoot.position.y = Math.sin(t * 1.8) * 0.05

                if (rightWing && rightWingBaseQ) {
                    const flapQ = new THREE.Quaternion().setFromAxisAngle(
                        new THREE.Vector3(0, 1, 0),
                        Math.sin(t * 20) * 0.8
                    )
                    rightWing.quaternion.multiplyQuaternions(rightWingBaseQ, flapQ)
                }

                if (leftWing && leftWingBaseQ) {
                    const flapQ = new THREE.Quaternion().setFromAxisAngle(
                        new THREE.Vector3(0, 1, 0),
                        -Math.sin(t * 20) * 0.8
                    )
                    leftWing.quaternion.multiplyQuaternions(leftWingBaseQ, flapQ)
                }
            }

            renderer.render(scene, camera)
        }

        animate()

        const onResize = () => {
            const w2 = mount.clientWidth
            const h2 = mount.clientHeight
            camera.aspect = w2 / h2
            camera.updateProjectionMatrix()
            renderer.setSize(w2, h2)
        }

        window.addEventListener('resize', onResize)

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', onResize)
            mount.removeEventListener('mousemove', onMouseMove)
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
      `}</style>

            <section className="sticky top-0 z-0 bg-black w-full h-dvh overflow-hidden">
                <div
                    ref={mountRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ cursor: 'grab' }}
                />

                <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 sm:p-6 md:p-10 pointer-events-none">
                    <div className="flex justify-between items-start w-full pointer-events-auto">
                        <span className="fade-a text-white text-xs sm:text-sm tracking-widest uppercase">
                            LEIMXNSQUARE
                        </span>

                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className={`
                fade-b
                text-white text-xs sm:text-sm tracking-widest uppercase
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
                                    className="text-blue-500 hover:underline"
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