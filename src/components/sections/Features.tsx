import { motion, useInView, type Variants } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import { useMemo, useRef, useState } from 'react'
import {
    Zap,
    MessageSquare,
    CreditCard,
    Database,
    Bell,
    Layers,
    ShieldCheck,
    Smartphone,
    Bot,
    RefreshCw,
    BarChart3,
    Workflow,
    Shield,
} from 'lucide-react'
import './Features.css'

const features = [
    {
        icon: MessageSquare,
        title: 'WhatsApp follow-ups',
        description: 'Send order updates, reminders, and delivery notifications the moment a customer action happens.',
        category: 'Automation',
        accent: 'emerald',
    },
    {
        icon: CreditCard,
        title: 'Payment-triggered flows',
        description: 'Launch receipts, CRM updates, and internal alerts as soon as a payment, refund, or renewal is recorded.',
        category: 'Automation',
        accent: 'blue',
    },
    {
        icon: Database,
        title: 'CRM and sheet sync',
        description: 'Keep Zoho, Airtable, and Google Sheets aligned without manual copy-paste between systems.',
        category: 'Integrations',
        accent: 'violet',
    },
    {
        icon: Smartphone,
        title: 'SMS delivery',
        description: 'Reach customers with fast SMS alerts and OTP-style messages optimized for Indian mobile numbers.',
        category: 'Integrations',
        accent: 'rose',
    },
    {
        icon: Layers,
        title: 'Branching workflow logic',
        description: 'Shape routes with conditions, checks, and transformations so each business case follows the right path.',
        category: 'Automation',
        accent: 'cyan',
    },
    {
        icon: ShieldCheck,
        title: 'Secret protection',
        description: 'Store integration keys and customer data behind encryption and controlled access boundaries.',
        category: 'Security',
        accent: 'emerald',
    },
    {
        icon: Bell,
        title: 'Failure alerts',
        description: 'Send instant notifications to Telegram, email, or Slack when a workflow needs attention.',
        category: 'Analytics',
        accent: 'violet',
    },
    {
        icon: BarChart3,
        title: 'Execution analytics',
        description: 'Review volume, success rate, and failure trends to understand what your automations are doing.',
        category: 'Analytics',
        accent: 'rose',
    },
    {
        icon: Workflow,
        title: 'Reusable playbooks',
        description: 'Start from templates for common ops flows so teams can launch familiar automations faster.',
        category: 'Automation',
        accent: 'amber',
    },
    {
        icon: Bot,
        title: 'AI-assisted routing',
        description: 'Combine structured rules with AI-ready steps to keep decisions flexible but still predictable.',
        category: 'Automation',
        accent: 'orange',
    },
    {
        icon: RefreshCw,
        title: 'Two-way sync',
        description: 'Push updates out and pull changes back in so your systems stay consistent after every action.',
        category: 'Integrations',
        accent: 'blue',
    },
    {
        icon: Shield,
        title: 'Audit-friendly logs',
        description: 'Keep a clear history of each run so support and operations teams can review what happened later.',
        category: 'Security',
        accent: 'cyan',
    },
]

const categories = ['All', 'Automation', 'Integrations', 'Analytics'] as const

type Category = (typeof categories)[number]

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: 'easeOut' as const },
    },
}

export default function Features() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })
    const [activeCategory, setActiveCategory] = useState<Category>('All')

    const filteredFeatures = useMemo(() => {
        if (activeCategory === 'All') {
            return features
        }

        return features.filter((feature) => feature.category === activeCategory)
    }, [activeCategory])

    return (
        <section className="features section" id="features">
            <div className="container">

                {/* Header */}
                <motion.div
                    className="features__header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="section-badge" id="features-badge">
                        <Zap size={14} />
                        Features
                    </div>

                    <h2 className="features__title">
                        Build customer workflows with <span className="gradient-text">one connected system</span>
                    </h2>

                    <p className="features__subtitle">
                        Choose a category, explore the cards below, and see how Pravah connects communication,
                        integrations, automation, and analytics into one operating layer.
                    </p>
                </motion.div>

                <motion.div
                    className="features__tabs"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.08 }}
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            className={`features__tab ${activeCategory === category ? 'features__tab--active' : ''}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                <motion.div
                    className="features__grid"
                    ref={ref}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            className="features__grid-inner"
                            variants={containerVariants}
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -18 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                        >
                            {filteredFeatures.map((feature, i) => {
                                const Icon = feature.icon

                                return (
                                    <motion.article
                                        key={feature.title}
                                        className={`features__card features__card--${feature.accent}`}
                                        variants={itemVariants}
                                        initial={isInView ? undefined : 'hidden'}
                                        animate={isInView ? 'visible' : 'hidden'}
                                        whileHover={{ y: -4 }}
                                        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                                    >
                                        <div className={`features__card-accent features__card-accent--${feature.accent}`} />

                                        <div className={`features__card-icon features__card-icon--${feature.accent}`}>
                                            <Icon size={22} />
                                        </div>

                                        <h3 className="features__card-title">{feature.title}</h3>

                                        <p className="features__card-desc">{feature.description}</p>

                                        <div className={`features__card-glow features__card-glow--${feature.accent}`} />
                                    </motion.article>
                                )
                            })}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

            </div>
        </section>
    )
}