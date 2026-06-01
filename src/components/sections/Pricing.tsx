import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Check, Zap, Rocket, Sparkles, ChevronDown, MessageCircleQuestion, PhoneCall, BadgePercent, ArrowRight } from 'lucide-react'
import './Pricing.css'

type PlanColor = 'cyan' | 'violet' | 'emerald'
type BillingCycle = 'monthly' | 'yearly'

interface PricingPlan {
  id: string
  name: string
  monthlyPrice: number
  description: string
  icon: React.ElementType
  color: PlanColor
  popular?: boolean
  features: string[]
  comparisonLabel: string
  ctaLabel: string
}

const plans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    monthlyPrice: 0,
    description: 'Best for solo operators and small teams validating their first automations.',
    icon: Zap,
    color: 'cyan',
    comparisonLabel: 'Starter',
    ctaLabel: 'Get Started Free',
    features: [
      '100 tasks / month',
      '5 active workflows',
      'Standard apps (Gmail, Sheets)',
      'WhatsApp (10 messages)',
      'Community support',
      'Basic logs',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 999,
    description: 'For growing teams that need reliable scale, deeper integrations, and faster support.',
    icon: Rocket,
    color: 'violet',
    popular: true,
    comparisonLabel: 'Growth',
    ctaLabel: 'Start Pro Trial',
    features: [
      '5,000 tasks / month',
      'Unlimited active workflows',
      'All Premium Apps',
      'Razorpay & Zoho Priority',
      'Priority Email Support',
      'Advanced Error Handling',
      'Custom Webhooks',
      'Multi-step Workflows',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    monthlyPrice: 2999,
    description: 'Designed for high-volume operations with advanced governance and custom support.',
    icon: Sparkles,
    color: 'emerald',
    comparisonLabel: 'Scale',
    ctaLabel: 'Contact Sales',
    features: [
      '50,000 tasks / month',
      'Dedicated Account Manager',
      'SLA Guarantee',
      'SSO & Team Access',
      'Custom API Builder',
      'On-boarding assistance',
      'White-label options',
      'Quarterly security audits',
    ],
  },
]

const featureRows = [
  { label: 'Tasks / month', free: '100', pro: '5,000', enterprise: '50,000+' },
  { label: 'Active workflows', free: '5', pro: 'Unlimited', enterprise: 'Unlimited' },
  { label: 'WhatsApp notifications', free: '10 msgs', pro: 'Included', enterprise: 'Included' },
  { label: 'Priority support', free: false, pro: true, enterprise: true },
  { label: 'Custom webhooks', free: false, pro: true, enterprise: true },
  { label: 'SLA guarantee', free: false, pro: false, enterprise: true },
  { label: 'SSO / team access', free: false, pro: false, enterprise: true },
]

const faqs = [
  {
    question: 'Can I switch plans later?',
    answer: 'Yes. You can start on Free and upgrade to Pro or Enterprise whenever your workflow needs grow.',
  },
  {
    question: 'How does yearly billing work?',
    answer: 'Yearly billing applies a 20% discount compared with paying month-to-month for the same plan.',
  },
  {
    question: 'What happens when I hit my task limit?',
    answer: 'You will see usage guidance and can upgrade to a higher plan before automations are blocked.',
  },
  {
    question: 'Do all plans include the same integrations?',
    answer: 'Free includes core apps, while Pro and Enterprise unlock broader integration coverage and premium connectors.',
  },
  {
    question: 'Is Enterprise available for custom onboarding?',
    answer: 'Yes. Enterprise includes dedicated support and can be tailored to your rollout and compliance needs.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes. You can change or cancel plans whenever you want, with billing updated for the current cycle.',
  },
]

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: index * 0.08, ease: 'easeOut' as const },
  }),
}

const faqVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.25, ease: 'easeOut' as const } },
}

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')
  const [openFaq, setOpenFaq] = useState<string | null>(faqs[0].question)

  const annualSavings = useMemo(() => {
    return plans.reduce((sum, plan) => {
      return sum + Math.round(plan.monthlyPrice * 12 * 0.2)
    }, 0)
  }, [])

  const getDisplayPrice = (plan: PricingPlan) => {
    if (plan.monthlyPrice === 0) {
      return billingCycle === 'yearly' ? { amount: 0, period: '/year' } : { amount: 0, period: '/month' }
    }

    if (billingCycle === 'monthly') {
      return { amount: plan.monthlyPrice, period: '/month' }
    }

    const yearlyAmount = Math.round(plan.monthlyPrice * 12 * 0.8)
    return { amount: yearlyAmount, period: '/year' }
  }

  const handlePlanClick = (planId: string) => {
    console.log('Selected plan:', planId)
  }

  return (
    <section className="pricing section" id="pricing">
      <div className="container">

        {/* HEADER */}
        <motion.div
          className="pricing__header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="section-badge">
            <Zap size={14} />
            Pricing
          </div>

          <h2 className="section-title">
            Simple, <span className="gradient-text">Affordable</span> Plans
          </h2>

          <p className="section-subtitle">
            Transparent pricing designed for Bharat. Start free, scale when ready, and save more on yearly billing.
          </p>
        </motion.div>

        <motion.div
          className="pricing__toggle"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <button
            type="button"
            className={`pricing__toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`pricing__toggle-btn ${billingCycle === 'yearly' ? 'active' : ''}`}
            onClick={() => setBillingCycle('yearly')}
          >
            Yearly
            <span className="pricing__discount">Save 20%</span>
          </button>
          <motion.div
            className={`pricing__toggle-indicator ${billingCycle === 'yearly' ? 'pricing__toggle-indicator--yearly' : ''}`}
            layout
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        </motion.div>

        {/* GRID */}
        <motion.div className="pricing__grid" initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {plans.map((plan, i) => {
            const Icon = plan.icon
            const displayPrice = getDisplayPrice(plan)

            return (
              <motion.div
                key={plan.id}
                className={`pricing__card ${plan.popular ? 'pricing__card--popular' : ''}`}
                custom={i}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 240, damping: 20 }}
              >
                <div className={`pricing__card-line pricing__card-line--${plan.color}`} />

                {plan.popular && (
                  <div className="pricing__popular-badge">
                    Most Popular
                  </div>
                )}

                <div className={`pricing__card-icon pricing__card-icon--${plan.color}`}>
                  <Icon size={24} />
                </div>

                <h3 className="pricing__card-name">{plan.name}</h3>
                <p className="pricing__card-desc">{plan.description}</p>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${plan.id}-${billingCycle}`}
                    className="pricing__card-price"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                  >
                    <span className="pricing__card-currency">₹</span>
                    <span className="pricing__card-amount">{displayPrice.amount.toLocaleString()}</span>
                    <span className="pricing__card-period">{displayPrice.period}</span>
                  </motion.div>
                </AnimatePresence>

                <ul className="pricing__card-features">
                  {plan.features.map((feature) => (
                    <li key={feature} className="pricing__card-feature">
                      <Check size={16} className={`pricing__check-icon pricing__check-icon--${plan.color}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={plan.popular ? 'btn-primary pricing__card-btn' : 'btn-secondary pricing__card-btn'}
                  onClick={() => handlePlanClick(plan.id)}
                >
                  {plan.ctaLabel}
                </button>

              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          className="pricing__comparison"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <div className="pricing__comparison-header">
            <div className="section-badge">
              <BadgePercent size={14} />
              Compare plans
            </div>
            <h3 className="pricing__comparison-title">Feature comparison</h3>
            <p className="pricing__comparison-subtitle">
              Review the differences across Free, Pro, and Enterprise before you choose a billing cycle.
            </p>
          </div>

          <div className="pricing__table-wrap">
            <table className="pricing__table">
              <thead>
                <tr>
                  <th>Features</th>
                  <th>Free</th>
                  <th>Pro</th>
                  <th>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {featureRows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{typeof row.free === 'boolean' ? (row.free ? '✅' : '❌') : row.free}</td>
                    <td>{typeof row.pro === 'boolean' ? (row.pro ? '✅' : '❌') : row.pro}</td>
                    <td>{typeof row.enterprise === 'boolean' ? (row.enterprise ? '✅' : '❌') : row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          className="pricing__faq"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <div className="pricing__comparison-header">
            <div className="section-badge">
              <MessageCircleQuestion size={14} />
              FAQ
            </div>
            <h3 className="pricing__comparison-title">Common pricing questions</h3>
          </div>

          <div className="pricing__faq-list">
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.question

              return (
                <article key={faq.question} className={`pricing__faq-item ${isOpen ? 'pricing__faq-item--open' : ''}`}>
                  <button
                    type="button"
                    className="pricing__faq-question"
                    onClick={() => setOpenFaq(isOpen ? null : faq.question)}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`pricing__faq-icon ${isOpen ? 'pricing__faq-icon--open' : ''}`} size={18} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key={faq.question}
                        className="pricing__faq-answer"
                        variants={faqVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          className="pricing__cta"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="pricing__cta-copy">
            <div className="section-badge pricing__cta-badge">
              <ArrowRight size={14} />
              Start for free, upgrade anytime
            </div>
            <h3>Move from exploration to scale without changing tools.</h3>
            <p>
              Begin with the Free plan, then upgrade when you need more volume, more support, or enterprise controls.
            </p>
          </div>

          <div className="pricing__cta-actions">
            <button className="btn-primary pricing__cta-button" type="button">
              Get Started Free
            </button>
            <button className="btn-secondary pricing__cta-button" type="button">
              Contact Sales
            </button>
          </div>
        </motion.div>

        {/* PAYMENT NOTE */}
        <motion.div
          className="pricing__crypto-note"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Zap size={16} />
          <span>
            Secure payments via <strong>UPI</strong>, <strong>Net Banking</strong>, or <strong>Cards</strong>.
            {billingCycle === 'yearly' ? ` You are saving about ₹${annualSavings.toLocaleString()} across all yearly plans.` : ' Save 20% on annual billing.'}
          </span>
        </motion.div>

      </div>
    </section>
  )
}