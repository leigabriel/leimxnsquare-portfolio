export default function Feature01Section({ navigate }) {
    return (
        <section className="sticky top-0 z-20 w-full min-h-screen text-black flex flex-col">
            <div className="relative w-full flex-1 flex flex-col">
                <div className="absolute inset-0 bg-[url('background/featured-01-mobile.png')] md:bg-[url('background/featured-01.png')] bg-cover bg-center z-0"></div>

                <div className="relative z-10 w-full flex-1 flex flex-col pt-20 md:pt-30 pb-8 md:pb-10 px-4 md:px-10 gap-4 md:gap-6">

                    <div className="flex justify-between items-center w-full">
                        <span className="text-[10px] sm:text-xs tracking-widest uppercase font-medium">FEATURED WORK 01</span>
                        <button
                            onClick={() => navigate('works')}
                            className="text-[10px] sm:text-xs tracking-widest uppercase font-medium hover:opacity-60 transition-opacity"
                        >
                            SEE ALL WORKS &rarr;
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start gap-3 md:gap-6">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif leading-tight max-w-xl tracking-tight">
                            Multo — Cup of Joe Poster Design
                        </h2>
                        <div className="flex flex-col text-[10px] sm:text-xs tracking-widest gap-1.5 md:w-56 shrink-0 font-medium md:pt-1">
                            <p>2026</p>
                            <p className="uppercase">POSTER DESIGN</p>
                            <p className="uppercase mt-1">AFFINITY BY CANVA</p>
                        </div>
                    </div>

                    <div className="border-t border-black border-dotted w-full my-2"></div>

                    <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12 lg:gap-16 flex-1 min-h-0 pt-2">

                        <div className="w-full md:w-[25%] lg:w-[20%] flex flex-col shrink-0 gap-6">
                            <p className="text-[10px] sm:text-xs leading-relaxed uppercase tracking-widest text-left font-medium">
                                A POSTER DESIGN INSPIRED BY THE SONG "MULTO" BY CUP OF JOE. EXPLORING THEMES OF LONGING AND HAUNTING MEMORIES THROUGH DARK, ATMOSPHERIC TYPOGRAPHY AND VISUAL STORYTELLING.
                            </p>
                            <button
                                onClick={() => navigate('works')}
                                className="text-[10px] sm:text-xs tracking-widest uppercase font-bold hover:opacity-60 transition-opacity text-left"
                            >
                                VIEW PROJECT &rarr;
                            </button>
                        </div>

                        <div className="flex-1 w-full flex items-start justify-end cursor-pointer">
                            <img
                                src="/posters/multo.png"
                                alt="Multo Poster Design"
                                className="w-full max-w-212.5 aspect-square object-contain"
                            />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}