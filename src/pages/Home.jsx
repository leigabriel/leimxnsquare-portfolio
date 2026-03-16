import { useRef } from 'react'
import HeroSection from '../components/home/HeroSection'
import AboutSection, { VideoSection } from '../components/home/AboutSection'
import Feature01Section from '../components/home/Feature01Section'
import Feature02Section from '../components/home/Feature02Section'
import ContactSection from '../components/home/ContactSection'

export default function Home({ setIsMenuOpen, contactRef, navigate }) {
    return (
        <main className="relative bg-black min-h-screen">
            <HeroSection setIsMenuOpen={setIsMenuOpen} />
            <VideoSection />
            <AboutSection navigate={navigate} />
            <Feature01Section navigate={navigate} />
            <Feature02Section navigate={navigate} />
            <div ref={contactRef}>
                <ContactSection setIsMenuOpen={setIsMenuOpen} navigate={navigate} />
            </div>
        </main>
    )
}