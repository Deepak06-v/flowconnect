import { motion } from 'framer-motion'
import { Star, Blocks, Quote } from 'lucide-react'
import './Testimonials.css'

const testimonials = [
    {
        name: 'Alex Rivera',
        role: 'Operations Lead',
        text: 'Pravah replaced our fragile cron setup with reliable automations. Payments, alerts, and reports now run on time without manual follow-up.',
        rating: 5,
    },
    {
        name: 'Priya Sharma',
        role: 'Growth Operations Manager',
        text: 'We run 30+ workflows across Razorpay, WhatsApp, and Sheets using Pravah. What used to take a dedicated engineering queue now takes minutes.',
        rating: 5,
    },
    {
        name: 'Marcus Chen',
        role: 'Product Engineering Lead',
        text: 'The visual builder is excellent. We automated onboarding, invoice reminders, and team notifications without writing custom backend glue code.',
        rating: 5,
    },
    {
        name: 'Elena Volkov',
        role: 'Automation Engineer',
        text: 'Pravah helped us connect multiple tools into one dependable flow. The logs are clear, retries are predictable, and setup is straightforward.',
        rating: 5,
    },
]

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.12,
            duration: 0.5,
        },
    })
}

export default function Testimonials() {
    return (
        <section className="testimonials section" id="testimonials">
            <div className="container">

                {/* Header */}
                <motion.div
                    className="testimonials__header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="section-badge">
                        <Blocks size={14} />
                        Testimonials
                    </div>

                    <h2 className="section-title">
                        Loved by <span className="gradient-text">Builders</span> Everywhere
                    </h2>

                    <p className="section-subtitle">
                        From solo founders to growing teams, Pravah powers reliable and scalable automation workflows.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="testimonials__grid" role="list">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.name}
                            className={`testimonials__card glass-card ${i === 1 ? 'featured' : ''}`}
                            role="listitem"
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={cardVariants}
                            whileHover={{ y: -6, scale: 1.01 }}
                        >
                            {/* Quote Icon */}
                            <div className="testimonials__quote-icon" aria-hidden="true">
                                <Quote size={22} />
                            </div>

                            {/* Stars */}
                            <div className="testimonials__stars" aria-label={`Rating: ${t.rating} out of 5 stars`}>
                                {Array.from({ length: 5 }).map((_, si) => (
                                    <Star
                                        key={si}
                                        size={14}
                                        fill={si < (t.rating ?? 0) ? "var(--warning-400)" : "transparent"}
                                        color="var(--warning-400)"
                                    />
                                ))}
                            </div>

                            {/* Text */}
                            <p className="testimonials__text" aria-label={`Testimonial from ${t.name}`}>
                                “{t.text}”
                            </p>

                            {/* Author */}
                            <div className="testimonials__author">
                                <div className={`testimonials__avatar avatar-${i}`} aria-hidden="true">
                                    {t.name.split(' ').map(n => n[0]).join('')}
                                </div>

                                <div>
                                    <div className="testimonials__name">{t.name}</div>
                                    <div className="testimonials__role">{t.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}