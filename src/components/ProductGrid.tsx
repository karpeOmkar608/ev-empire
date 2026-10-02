'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import type { ProductFamily_Data } from '@/types/product'

export default function ProductGrid() {
  const [families, setFamilies] = useState<ProductFamily_Data[]>([])

  useEffect(() => {
    fetch('/api/products/families')
      .then(r => r.json())
      .then(data => setFamilies(data.families ?? []))
      .catch(() => {})
  }, [])

  return (
    <section
      id="products"
      className="section-pad bg-[#070d1a]"
      aria-labelledby="products-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-sky-400 text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-3">
            Our Range
          </p>
          <h2
            id="products-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4"
          >
            Meet the{' '}
            <span className="gradient-text">EV Empire Range</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto px-2">
            Electric scooters designed for different lifestyles and everyday
            mobility needs.
          </p>
        </motion.div>

        {/* Family groups */}
        {families.map((family, familyIdx) => (
          <div key={family.id} id={family.id} className="mb-14 last:mb-0">

            {/* Family header */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 sm:mb-8"
            >
              <div>
                <span className="text-sky-400 text-[9px] sm:text-[10px] font-bold tracking-[0.3em] uppercase block mb-1">
                  {family.seriesLabel}
                </span>
                <h3 className="text-white text-2xl sm:text-3xl font-black tracking-wide">
                  {family.name}
                </h3>
                <p className="text-slate-400 text-sm mt-1 max-w-lg">
                  {family.description}
                </p>
              </div>
              {family.models.length > 1 && (
                <p className="text-slate-500 text-sm shrink-0">
                  {family.models.length} models available
                </p>
              )}
            </motion.div>

            {/*
                - 1 model  → single centered card capped at ~400px
                - 2 models → 2-col on sm+
                - 3 models → 2-col on sm, 3-col on lg
            */}
            <div
              className={
                family.models.length === 1
                  ? 'grid grid-cols-1 gap-5 max-w-sm sm:max-w-md'
                  : family.models.length === 2
                  ? 'grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl'
                  : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
              }
            >
              {family.models.map((product, idx) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  index={familyIdx * 10 + idx}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
