import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/sections/Hero'
import LiveStats from '../components/sections/LiveStats'
import Features from '../components/sections/Features'
import HowItWorks from '../components/sections/HowItWorks'
import LearnAutomation from '../components/sections/LearnAutomation'
import Integrations from '../components/sections/Integrations'
import Testimonials from '../components/sections/Testimonials'
import Pricing from '../components/sections/Pricing'
import CTA from '../components/sections/CTA'

export default function HomePage() {
    const location = useLocation()

    useEffect(() => {
        if (!location.hash) {
            window.scrollTo({ top: 0, behavior: 'auto' })
            return
        }

        const target = document.getElementById(location.hash.slice(1))
        if (!target) return

        const navHeight = 92
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight
        window.scrollTo({ top, behavior: 'smooth' })
    }, [location.hash])

    return (
        <main>
            <Hero />
            <LiveStats />
            <Features />
            <HowItWorks />
            <LearnAutomation />
            <Integrations />
            <Testimonials />
            <Pricing />
            <CTA />
        </main>
    )
}
