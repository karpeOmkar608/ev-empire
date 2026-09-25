import type { Metadata } from 'next'
import ProductGrid from '@/components/ProductGrid'
import ProductComparison from '@/components/ProductComparison'
import Link from 'next/link'
import { Zap, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Products — Browse All Electric Scooters',
  description:
    'Browse the complete EV Empire electric scooter range. Empire Prime, Empire Duo, Empire Family, and Empire Classic — starting from ₹44,990.',
}

export default function ProductsPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="pt-36 pb-12 bg-[#070d1a] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-600/8 blur-3xl rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold tracking-widest uppercase mb-6">
              <Zap className="w-3.5 h-3.5 fill-current" />
              EV Empire Range
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
              Our Electric{' '}
              <span className="gradient-text">Scooter Range</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-xl">
              From the sleek Empire Prime to the retro Empire Classic — find the
              electric scooter that fits your life.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#empire-prime" className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-sky-300 border border-sky-500/30 rounded-lg hover:bg-sky-500/10 transition-all">Empire Prime</a>
              <a href="#empire-duo" className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-sky-300 border border-sky-500/30 rounded-lg hover:bg-sky-500/10 transition-all">Empire Duo</a>
              <a href="#empire-family" className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-sky-300 border border-sky-500/30 rounded-lg hover:bg-sky-500/10 transition-all">Empire Family</a>
              <a href="#empire-classic" className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-sky-300 border border-sky-500/30 rounded-lg hover:bg-sky-500/10 transition-all">Empire Classic</a>
            </div>
          </div>
        </div>
      </section>

      <ProductGrid />
      <ProductComparison />

      {/* CTA Banner */}
      <section className="bg-[#050b16] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sky-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">Ready to Ride?</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            Find Your Perfect{' '}
            <span className="gradient-text">EV Empire</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            Have questions about a specific model? Our team is ready to help you choose the right scooter.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-sky-500 to-blue-700 rounded-xl hover:from-sky-400 hover:to-blue-600 transition-all duration-200 shadow-xl shadow-sky-500/25 hover:-translate-y-1"
          >
            <Zap className="w-5 h-5" />
            Enquire Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
        <div className="px-4 py-3 bg-[#070d1a]/95 backdrop-blur-xl border-t border-sky-500/10">
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-blue-700 rounded-xl"
          >
            <Zap className="w-4 h-4 fill-current" />
            Enquire Now
          </Link>
        </div>
      </div>
    </>
  )
}
