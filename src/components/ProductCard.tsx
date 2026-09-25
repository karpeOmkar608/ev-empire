'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Zap, Route, Gauge } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Product } from '@/types/product'
import { formatPrice } from '@/data/products'

interface ProductCardProps {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    // The motion wrapper MUST be h-full so cards in a grid row are equal height
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4) }}
    >
      <div className="group relative card-premium rounded-2xl overflow-hidden border border-transparent hover:border-sky-500/30 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-sky-500/10 glow-blue h-full flex flex-col">

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-20">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-500 text-white text-[10px] font-bold tracking-wider shadow-lg shadow-sky-500/30">
              <Zap className="w-3 h-3 fill-current" />
              {product.badge}
            </span>
          </div>
        )}

        {/* Image area */}
        <div className="relative h-48 sm:h-52 overflow-hidden bg-gradient-to-br from-[#0d1629] to-[#070d1a] shrink-0">
          <Image
            src={product.image.replace('.webp', '.png')}
            alt={`${product.model} — ${product.series}`}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Glow under scooter */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-10 bg-sky-500/10 blur-xl rounded-full" />
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex flex-col flex-1">

          {/* Series label */}
          <p className="text-sky-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">
            {product.seriesLabel}
          </p>

          {/* Model + family */}
          <h3 className="text-white text-xl sm:text-2xl font-black tracking-wider mb-0.5">
            {product.model}
          </h3>
          <p className="text-slate-400 text-sm font-medium mb-4">
            {product.familyName}
          </p>

          {/* Price */}
          <div className="mb-5">
            <p className="text-sky-400 text-[10px] font-semibold mb-1 tracking-widest uppercase">
              Starting at
            </p>
            <p className="text-white text-2xl sm:text-3xl font-black tracking-tight">
              {formatPrice(product.price)}
            </p>
          </div>

          {/* Quick specs */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
            {[
              { icon: Route, value: product.range, label: 'Range' },
              { icon: Gauge, value: product.maxSpeed, label: 'Top Speed' },
              { icon: Zap, value: product.controller, label: 'Controller' },
            ].map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 p-2.5 sm:p-3 rounded-xl bg-white/5 group-hover:bg-sky-500/5 transition-colors text-center"
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 shrink-0" />
                <p className="text-white text-[10px] sm:text-xs font-bold leading-tight">
                  {value}
                </p>
                <p className="text-slate-500 text-[9px] sm:text-[10px]">{label}</p>
              </div>
            ))}
          </div>

          {/* CTAs — pushed to bottom */}
          <div className="flex gap-2 mt-auto">
            <Link
              href={`/products/${product.slug}`}
              className="flex-1 py-2.5 sm:py-3 px-3 text-center text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-sky-600 to-blue-700 rounded-xl hover:from-sky-500 hover:to-blue-600 transition-all duration-200 inline-flex items-center justify-center gap-1"
            >
              View Details
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            </Link>
            <Link
              href={`/contact?model=${product.model}`}
              className="py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-sky-300 border border-sky-500/30 rounded-xl hover:bg-sky-500/10 hover:border-sky-400/50 transition-all duration-200 whitespace-nowrap"
              aria-label={`Enquire about ${product.model}`}
            >
              Enquire
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
