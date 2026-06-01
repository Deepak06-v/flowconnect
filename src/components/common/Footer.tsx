import { Zap, Github, Twitter, MessageCircle, Linkedin, Mail } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Footer.css'

const footerLinks = {
    'Product Links': [
        { label: 'Features', href: '/#features', type: 'section' },
        { label: 'Pricing', href: '/pricing', type: 'page' },
        { label: 'Integrations', href: '/#integrations', type: 'section' },
        { label: 'Documentation', href: '/how-it-works', type: 'page' },
    ],
    'Solutions Links': [
        { label: 'E-commerce', href: '/about#company', type: 'page' },
        { label: 'Fintech', href: '/about#company', type: 'page' },
        { label: 'Operations', href: '/about#company', type: 'page' },
        { label: 'Support', href: '/about#company', type: 'page' },
    ],
    Resources: [
        { label: 'Blog', href: '/about#blog', type: 'page' },
        { label: 'Documentation', href: '/how-it-works', type: 'page' },
        { label: 'Privacy', href: '/privacy', type: 'page' },
        { label: 'Terms', href: '/terms', type: 'page' },
    ],
    'Company Links': [
        { label: 'About', href: '/about', type: 'page' },
        { label: 'Contact', href: '/about#contact', type: 'page' },
        { label: 'Careers', href: '/about#resources', type: 'page' },
        { label: 'Security', href: '/privacy', type: 'page' },
    ],
    'Social Links': [
        { label: 'GitHub', href: '/about#resources', type: 'page' },
        { label: 'X', href: '/about#blog', type: 'page' },
        { label: 'LinkedIn', href: '/about#company', type: 'page' },
        { label: 'Email', href: '/about#contact', type: 'page' },
    ],
}

export default function Footer() {
    const location = useLocation()
    const navigate = useNavigate()
    const isHome = location.pathname === '/'

    const handleFooterClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, type: string) => {
        if (type !== 'section') return

        const hash = href.substring(href.indexOf('#'))
        if (!isHome) return

        e.preventDefault()
        const element = document.querySelector(hash)
        if (!element) return

        const navHeight = 80
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        window.scrollTo({
            top: elementPosition - navHeight,
            behavior: 'smooth',
        })
    }

    return (
        <footer className="footer" id="footer">
            <div className="container">
                <div className="footer__top">
                    {/* Logo & desc */}
                    <div className="footer__brand">
                        <Link to="/" className="footer__logo">
                            <div className="footer__logo-icon">
                                <Zap size={18} />
                            </div>
                            <span className="footer__logo-text">
                                <span className="gradient-text">Pravah</span>
                            </span>
                        </Link>
                        <p className="footer__brand-desc">
                            Pravah helps you automate business workflows
                            across WhatsApp, Razorpay, Zoho, and 500+ Indian apps.
                        </p>
                        <div className="footer__socials">
                            <button
                                type="button"
                                className="footer__social"
                                aria-label="GitHub"
                                id="footer-github"
                                onClick={() => navigate('/about#resources')}
                            >
                                <Github size={18} />
                            </button>
                            <button
                                type="button"
                                className="footer__social"
                                aria-label="X"
                                id="footer-twitter"
                                onClick={() => navigate('/about#blog')}
                            >
                                <Twitter size={18} />
                            </button>
                            <button
                                type="button"
                                className="footer__social"
                                aria-label="LinkedIn"
                                id="footer-linkedin"
                                onClick={() => navigate('/about#company')}
                            >
                                <Linkedin size={18} />
                            </button>
                            <button
                                type="button"
                                className="footer__social"
                                aria-label="Contact"
                                id="footer-contact"
                                onClick={() => navigate('/about#contact')}
                            >
                                <MessageCircle size={18} />
                            </button>
                            <button
                                type="button"
                                className="footer__social"
                                aria-label="Email"
                                id="footer-email"
                                onClick={() => window.location.assign('mailto:hello@pravah.app')}
                            >
                                <Mail size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title} className="footer__col">
                            <h4 className="footer__col-title">{title}</h4>
                            <ul className="footer__col-links">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            to={link.href}
                                            className="footer__link"
                                            onClick={(e) => handleFooterClick(e, link.href, link.type)}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>          

                <div className="footer__bottom">
                    <p className="footer__copyright">
                        © 2026 Pravah. All rights reserved. Made in India.
                    </p>
                    <div className="footer__chain-badge">
                        <span className="footer__chain-dot" />
                        Infrastructure optimized for Bharat
                    </div>
                </div>
            </div>
        </footer>
    )
}
