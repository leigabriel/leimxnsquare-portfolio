import { useState, useRef } from 'react'
import Home from './pages/Home'
import AboutMe from './pages/AboutMe'
import Works from './pages/Works'
import Menu from './components/Menu'

export default function App() {
    const [page, setPage] = useState('home')
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const contactRef = useRef(null)

    const navigate = (dest) => {
        setIsMenuOpen(false)
        if (dest === 'home') {
            setPage('home')
            setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
        } else if (dest === 'about') {
            setPage('about')
            setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
        } else if (dest === 'works') {
            setPage('works')
            setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
        } else if (dest === 'contact') {
            setPage('home')
            setTimeout(() => {
                contactRef.current?.scrollIntoView({ behavior: 'smooth' })
            }, 100)
        }
    }

    return (
        <>
            {page === 'home' && <Home setIsMenuOpen={setIsMenuOpen} contactRef={contactRef} navigate={navigate} />}
            {page === 'about' && <AboutMe setIsMenuOpen={setIsMenuOpen} navigate={navigate} />}
            {page === 'works' && <Works setIsMenuOpen={setIsMenuOpen} navigate={navigate} />}
            {isMenuOpen && <Menu setIsMenuOpen={setIsMenuOpen} navigate={navigate} />}
        </>
    )
}