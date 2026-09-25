'use client'

import { motion } from 'framer-motion'
import { Leaf, Wind, TreePine, Sun } from 'lucide-react'
import Link from 'next/link'

export default function EnvironmentSection() {
  return (
    <section
      id="environment"
      className="section-pad relative overflow-hidden bg-[#030b08]"
      aria-labelledby="env-heading"
    >
      {/* Green atmospheric glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-emerald-600/6 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-teal-600/8 blur-3xl" />
        {/* Floating leaf particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-20"
            style={{
              left: `${15 + i * 14}%`,
              top: `${10 + (i % 3) * 30}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${7 + i * 0.5}s`,
            }}
          >
            <Leaf
              className="text-emerald-400"
              style={{ width: `${12 + i * 2}px`, height: `${12 + i * 2}px` }}
            />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-emerald-400 text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-4">
              Sustainability
            </p>
            <h2
              id="env-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6 leading-tight"
            >
              Ride Smart.{' '}
              <span
                className="text-transparent"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                }}
              >
                Live Green.
              </span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
              Every kilometre you ride on an EV Empire scooter is a step towards
              cleaner air, quieter streets, and a better tomorrow for our cities.
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 sm:mb-10">
              Electric mobility is the future of everyday transportation in India.
              By choosing electric, you reduce your dependence on fossil fuels and
              contribute to a cleaner environment for everyone around you.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-7 py-4 text-base font-bold text-white rounded-xl transition-all duration-200 hover:-translate-y-1"
              style={{
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                boxShadow: '0 10px 30px rgba(16, 185, 129, 0.25)',
              }}
            >
              <Leaf className="w-5 h-5" />
              Explore Electric Scooters
            </Link>
          </motion.div>

          {/* Right: Stats cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
          >
            {[
              {
                icon: Wind,
                title: 'Zero Tailpipe Emissions',
                desc: 'No exhaust gases from the scooter during operation.',
                color: 'text-emerald-400',
                bg: 'bg-emerald-500/10',
                border: 'border-emerald-500/20',
              },
              {
                icon: Sun,
                title: 'Home Charging',
                desc: 'Charge conveniently overnight from a standard home socket.',
                color: 'text-yellow-400',
                bg: 'bg-yellow-500/10',
                border: 'border-yellow-500/20',
              },
              {
                icon: TreePine,
                title: 'Cleaner Cities',
                desc: 'Electric scooters contribute to reduced urban air pollution.',
                color: 'text-teal-400',
                bg: 'bg-teal-500/10',
                border: 'border-teal-500/20',
              },
              {
                icon: Leaf,
                title: 'Eco Friendly Choice',
                desc: 'Choose clean transportation for yourself and your community.',
                color: 'text-emerald-400',
                bg: 'bg-emerald-500/10',
                border: 'border-emerald-500/20',
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                  className={`card-premium rounded-2xl p-5 sm:p-6 border ${item.border} hover:border-opacity-60 transition-all duration-300 hover:-translate-y-1`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl ${item.bg} border ${item.border} flex items-center justify-center mb-3 sm:mb-4`}
                  >
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <h3 className="text-white font-bold text-sm mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
