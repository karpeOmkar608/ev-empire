'use client'

import { motion } from 'framer-motion'
import {
  Zap,
  Route,
  Leaf,
  Wrench,
  Star,
  Shield,
} from 'lucide-react'

const features = [
  {
    icon: Route,
    title: 'Long Range',
    description:
      'Travel up to 70 KM on a single charge — comfortably covering daily city commutes without range anxiety.',
    accent: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
  },
  {
    icon: Zap,
    title: 'Fast Charging',
    description:
      '4AMP LED charging technology designed to get you back on the road efficiently. Plug in at home or work.',
    accent: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
  },
  {
    icon: Leaf,
    title: 'Eco Friendly',
    description:
      'Zero tailpipe emissions. Choose electric and contribute to cleaner air for your city and community.',
    accent: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    icon: Wrench,
    title: 'Low Maintenance',
    description:
      'Electric drivetrains have far fewer moving parts than petrol engines — meaning lower running costs for you.',
    accent: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
  },
  {
    icon: Star,
    title: 'Smart & Stylish',
    description:
      'Designed to turn heads on every road. From the single-light Prime to the retro-inspired Classic — there\'s a style for every rider.',
    accent: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
  {
    icon: Shield,
    title: 'Warranty Covered',
    description:
      'Key components — Battery, Motor, Controller and Charger — are covered under EV Empire\'s warranty policy.',
    accent: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
  },
]

export default function FeatureSection() {
  return (
    <section
      id="why-ev-empire"
      className="section-pad bg-[#050b16] relative overflow-hidden"
      aria-labelledby="features-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-sky-600/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-blue-700/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-sky-400 text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-3">
            Why Choose Us
          </p>
          <h2
            id="features-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4"
          >
            Why Choose{' '}
            <span className="gradient-text">EV Empire?</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto px-2">
            Built for Indian roads and Indian riders — practical electric scooters
            you can depend on every day.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`group card-premium rounded-2xl p-5 sm:p-7 border ${feature.border} hover:border-opacity-60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${feature.bg} ${feature.border} border flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-200`}
                >
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${feature.accent}`} />
                </div>
                <h3 className="text-white font-bold text-lg sm:text-xl mb-2 sm:mb-3 tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
