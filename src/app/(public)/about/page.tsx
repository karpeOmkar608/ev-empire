import type { Metadata } from 'next'
import FeatureSection from '@/components/FeatureSection'
import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'
import { WhatsAppIcon, buildWaUrl } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'About EV Empire — Our Story & Mission',
  description:
    'EV Empire is building a smarter, cleaner approach to everyday mobility through practical electric scooters designed for modern Indian riders.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 bg-[#070d1a] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-sky-600/8 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/6 blur-3xl rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold tracking-widest uppercase mb-6">
              <Zap className="w-3.5 h-3.5 fill-current" />
              Our Story
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight">
              About{' '}
              <span className="gradient-text">EV Empire</span>
            </h1>
            <p className="text-slate-300 text-xl leading-relaxed mb-8">
              EV Empire is building a smarter, cleaner approach to everyday mobility
              through practical electric scooters designed for modern riders.
            </p>
            <p className="text-slate-400 text-base leading-relaxed">
              {/* [PLACEHOLDER — Replace with your company story] */}
              We believe that electric mobility should be accessible, practical, and
              designed specifically for the roads and lifestyles of everyday Indians.
              Our range of electric scooters offers a clean, smart, and economical
              way to travel — whether it&apos;s the morning commute, school run, or weekend
              errands.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-20 bg-[#050b16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Our Mission',
                text:
                  'To make clean, electric mobility accessible to every Indian household through practical, reliable, and affordable electric scooters.',
                accent: 'text-sky-400',
                border: 'border-sky-500/20',
              },
              {
                title: 'Our Vision',
                text:
                  'A future where every Indian commute is powered by clean energy — quieter streets, cleaner air, and smarter everyday mobility for all.',
                accent: 'text-emerald-400',
                border: 'border-emerald-500/20',
              },
              {
                title: 'Our Approach',
                text:
                  'We focus on building scooters that are genuinely useful for everyday life — not just a novelty. Practical range, real-world performance, and honest pricing.',
                accent: 'text-amber-400',
                border: 'border-amber-500/20',
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`card-premium rounded-2xl p-8 border ${item.border}`}
              >
                <h2 className={`text-xl font-bold mb-4 ${item.accent}`}>{item.title}</h2>
                <p className="text-slate-300 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand values */}
      <section className="py-16 sm:py-20 bg-[#070d1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              What We Stand For
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Every decision we make is guided by these core values.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { emoji: '⚡', value: 'Electric Mobility', desc: 'The future of transportation' },
              { emoji: '🌿', value: 'Sustainability', desc: 'Cleaner air for our cities' },
              { emoji: '💡', value: 'Smart Technology', desc: 'Practical innovation' },
              { emoji: '🤝', value: 'Honest Pricing', desc: 'Transparent and fair' },
            ].map((item) => (
              <div
                key={item.value}
                className="text-center card-premium rounded-2xl p-4 sm:p-6 border border-white/5 hover:border-sky-500/20 transition-all hover:-translate-y-1"
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{item.emoji}</div>
                <h3 className="text-white font-bold text-sm mb-1">{item.value}</h3>
                <p className="text-slate-500 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeatureSection />

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-[#050b16] text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 sm:mb-5">
            Ready to go Electric?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mb-8 sm:mb-10">
            Explore our complete range of electric scooters or reach out to enquire about the right model for you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-7 py-4 font-bold text-white bg-gradient-to-r from-sky-500 to-blue-700 rounded-xl hover:-translate-y-1 transition-all shadow-xl shadow-sky-500/25"
            >
              View Scooters <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={buildWaUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 font-bold text-white bg-gradient-to-r from-emerald-500 to-green-700 rounded-xl hover:from-emerald-400 hover:to-green-600 hover:-translate-y-1 transition-all shadow-xl shadow-emerald-500/25"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Enquire Now
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
