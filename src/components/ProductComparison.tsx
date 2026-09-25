'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CheckCircle2, Minus } from 'lucide-react'
import { motion } from 'framer-motion'
import { products, formatPrice } from '@/data/products'
import type { Product } from '@/types/product'

export default function ProductComparison() {
  const [selected, setSelected] = useState<string[]>(['ep60', 'ed60'])

  const toggle = (slug: string) => {
    setSelected((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((s) => s !== slug)
      }
      if (prev.length >= 3) return prev
      return [...prev, slug]
    })
  }

  const comparedProducts: Product[] = selected
    .map((slug) => products.find((p) => p.slug === slug)!)
    .filter(Boolean)

  const fields: { label: string; key: keyof Product }[] = [
    { label: 'Series', key: 'series' },
    { label: 'Price', key: 'price' },
    { label: 'Controller', key: 'controller' },
    { label: 'Range', key: 'range' },
    { label: 'Max Speed', key: 'maxSpeed' },
    { label: 'Battery', key: 'battery' },
    { label: 'Brake', key: 'brake' },
    { label: 'Charging Time', key: 'chargingTime' },
    { label: 'Loading Capacity', key: 'loadingCapacity' },
    { label: 'Body Type', key: 'bodyType' },
  ]

  return (
    <section
      id="compare"
      className="section-pad bg-[#070d1a]"
      aria-labelledby="compare-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <p className="text-sky-400 text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-3">
            Compare
          </p>
          <h2
            id="compare-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4"
          >
            Compare{' '}
            <span className="gradient-text">Models</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto px-2">
            Select up to 3 scooters to compare side-by-side.
          </p>
        </motion.div>

        {/* Model Selector */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {products.map((p) => {
            const isSelected = selected.includes(p.slug)
            return (
              <button
                key={p.slug}
                onClick={() => toggle(p.slug)}
                disabled={!isSelected && selected.length >= 3}
                aria-pressed={isSelected}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                  isSelected
                    ? 'bg-sky-500/20 border-sky-500/60 text-sky-300'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                } disabled:opacity-30 disabled:cursor-not-allowed`}
              >
                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />}
                {p.model}
              </button>
            )
          })}
        </div>

        {/* Comparison Table */}
        {comparedProducts.length > 0 && (
          <div className="overflow-x-auto rounded-2xl border border-white/5 pb-2 -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left p-3 sm:p-5 text-slate-500 text-[10px] sm:text-xs font-semibold uppercase tracking-wider w-28 sm:w-36 bg-[#0a1020]">
                    Spec
                  </th>
                  {comparedProducts.map((p) => (
                    <th key={p.slug} className="p-3 sm:p-5 text-center bg-[#0a1020]">
                      <div className="flex flex-col items-center gap-2">
                        <div className="relative w-16 h-16 rounded-xl bg-[#0d1629] overflow-hidden border border-white/5">
                          <Image
                            src={p.image.replace('.webp', '.png')}
                            alt={p.model}
                            fill
                            className="object-contain p-1"
                            sizes="64px"
                          />
                        </div>
                        <div>
                          <p className="text-white font-black text-base tracking-wider">
                            {p.model}
                          </p>
                          <p className="text-sky-400 text-[10px] font-medium">
                            {p.seriesLabel}
                          </p>
                        </div>
                      </div>
                    </th>
                  ))}
                  {/* Empty columns to maintain consistent width */}
                  {Array.from({ length: 3 - comparedProducts.length }).map((_, i) => (
                    <th key={`empty-${i}`} className="p-5 bg-[#0a1020] opacity-0 pointer-events-none" />
                  ))}
                </tr>
              </thead>
              <tbody>
                {fields.map((field, rowIdx) => (
                  <tr
                    key={field.key}
                    className={`border-b border-white/5 transition-colors hover:bg-white/2 ${
                      rowIdx % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.01]'
                    }`}
                  >
                    <td className="p-3 sm:p-5 text-slate-500 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                      {field.label}
                    </td>
                    {comparedProducts.map((p) => {
                      const value = p[field.key]
                      const display =
                        field.key === 'price'
                          ? formatPrice(value as number)
                          : (value as string)
                      return (
                        <td key={p.slug} className="p-5 text-center">
                          <span
                            className={`text-xs sm:text-sm font-semibold ${
                              field.key === 'price'
                                ? 'text-sky-300 text-sm sm:text-base font-black'
                                : 'text-white'
                            }`}
                          >
                            {display || <Minus className="w-4 h-4 text-slate-600 mx-auto" />}
                          </span>
                        </td>
                      )
                    })}
                    {Array.from({ length: 3 - comparedProducts.length }).map((_, i) => (
                      <td key={`empty-cell-${i}`} className="p-3 sm:p-5" />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}
