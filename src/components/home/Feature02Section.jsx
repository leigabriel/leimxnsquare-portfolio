export default function Feature02Section({ navigate }) {
    return (
        <section className="sticky top-0 z-20 w-full min-h-screen text-black flex flex-col">
            <div className="relative w-full flex-1 flex flex-col">
                <div className="absolute inset-0 bg-[url('/background/fm2.png')] md:bg-[url('/background/f2.png')] bg-cover bg-center z-0" />

                <div className="relative z-10 w-full flex-1 flex flex-col px-5 sm:px-8 md:px-12 lg:px-16 pt-20 md:pt-28 lg:pt-32 pb-10 md:pb-12 gap-6 md:gap-8">

                    <div className="flex items-center justify-between">
                        <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase font-medium">
                            Featured Work 02
                        </span>
                        <button
                            onClick={() => navigate('works')}
                            className="text-[10px] sm:text-xs tracking-[0.2em] uppercase font-medium transition-opacity duration-300 hover:opacity-60"
                        >
                            See All Works →
                        </button>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 lg:gap-10">
                        <h2 className="font-serif leading-[1.05] tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl">
                            Bulusan Zoo
                        </h2>

                        <div className="flex flex-col text-[10px] sm:text-xs tracking-[0.2em] gap-1.5 font-medium lg:text-right lg:min-45">
                            <p>2026</p>
                            <p className="uppercase">Web Dev</p>
                        </div>
                    </div>

                    <div className="border-t border-black/60 border-dotted w-full" />

                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 flex-1 pt-2">

                        <div className="w-full lg:w-[22%] flex flex-col justify-start gap-4">
                            <p className="text-[10px] sm:text-xs leading-relaxed uppercase tracking-[0.18em] font-medium max-w-xs">
                                A wildlife web platform for Bulusan Zoo featuring an ML-powered animal classification system. Bridging data science with an intuitive, modern user experience.
                            </p>

                            <a
                                href="https://bulusanzoo.vercel.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] sm:text-xs tracking-[0.2em] uppercase font-semibold transition-opacity duration-300 hover:opacity-60 inline-block"
                            >
                                View Project →
                            </a>
                        </div>

                        <div className="flex-1 w-full flex items-center justify-center lg:justify-end">
                            <div className="w-full max-w-130 md:max-w-160 lg:max-w-180 aspect-square">
                                <img
                                    src="/bulusan.png"
                                    alt="Bulusan Zoo Project"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}