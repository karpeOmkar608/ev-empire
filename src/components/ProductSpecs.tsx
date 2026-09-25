import Image from 'next/image'
import Link from 'next/link'
import {
  Zap,
  Disc,
  BatteryCharging,
  Clock,
  Battery,
  Route,
  Gauge,
  Ruler,
  Weight,
  Box,
  ArrowLeft,
} from 'lucide-react'
import type { Product } from '@/types/product'
import { formatPrice } from '@/data/products'

interface ProductSpecsProps {
  product: Product
  showEnquiryLink?: boolean
}

const specItems = (product: Product) => [
  { icon: Zap,             label: 'Controller',      value: product.controller },
  { icon: Disc,            label: 'Brake System',    value: product.brake },
  { icon: BatteryCharging, label: 'Charger Type',    value: product.chargerType },
  { icon: Clock,           label: 'Charging Time',   value: product.chargingTime },
  { icon: Battery,         label: 'Battery',         value: product.battery },
  { icon: Route,           label: 'Range',           value: product.range },
  { icon: Gauge,           label: 'Max Speed',       value: product.maxSpeed },
  { icon: Ruler,           label: 'Dimensions',      value: product.dimension },
  { icon: Weight,          label: 'Loading Capacity',value: product.loadingCapacity },
  { icon: Box,             label: 'Body Type',       value: product.bodyType },
]

export default function ProductSpecs({ product, showEnquiryLink = true }: ProductSpecsProps) {
  const specs = specItems(product)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">

      {/* Back link */}
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-slate-400 text-sm hover:text-sky-400 transition-colors mb-8 sm:mb-10 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">

        {/* ── Image ──────────────────────────────────── */}
        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0d1629] to-[#070d1a] aspect-square border border-sky-500/10 max-w-sm sm:max-w-md mx-auto lg:mx-0">
            <Image
              src={product.image.replace('.webp', '.png')}
              alt={`${product.model} — ${product.series}`}
              fill
              className="object-contain p-6 sm:p-8"
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
            />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-2/3 h-14 bg-sky-500/10 blur-2xl rounded-full" />
          </div>
          {/* Family badge */}
          <div className="absolute -top-3 right-4 sm:-top-4 sm:-right-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-sky-500 text-white text-[10px] sm:text-xs font-bold tracking-wider shadow-lg shadow-sky-500/30 max-w-[150px] sm:max-w-none truncate">
            {product.seriesLabel}
          </div>
        </div>

        {/* ── Details ────────────────────────────────── */}
        <div>
          <p className="text-sky-400 text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase mb-2">
            {product.familyName}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-wider mb-2">
            {product.model}
          </h1>
          <p className="text-slate-400 text-base sm:text-lg mb-6">{product.series}</p>

          {/* Price */}
          <div className="mb-7">
            <p className="text-slate-400 text-sm mb-1">Price</p>
            <p className="text-3xl sm:text-4xl font-black text-white">
              {formatPrice(product.price)}
            </p>
          </div>

          {/* Short intro */}
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 border-l-2 border-sky-500/40 pl-4 sm:pl-5">
            The {product.model} is part of the{' '}
            <span className="text-white font-semibold">{product.familyName}</span>{' '}
            range — {product.series.toLowerCase()}. Designed for practical everyday
            electric mobility with a {product.controller} controller delivering{' '}
            {product.range} per charge.
          </p>

          {/* Specifications heading */}
          <h2 className="text-white text-lg sm:text-xl font-bold mb-4 tracking-wide">
            Specifications
          </h2>

          {/* Spec grid — 1 column on mobile, 2 on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-8 sm:mb-10">
            {specs.map((spec) => {
              const Icon = spec.icon
              return (
                <div
                  key={spec.label}
                  className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl card-premium border border-white/5 hover:border-sky-500/20 transition-all duration-200 group"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0 group-hover:bg-sky-500/15 transition-colors">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-slate-500 text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase">
                      {spec.label}
                    </p>
                    <p className="text-white font-bold text-xs sm:text-sm truncate">
                      {spec.value}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Enquiry CTA */}
          {showEnquiryLink && (
            <div className="border-t border-white/5 pt-7">
              <p className="text-slate-300 font-semibold text-sm sm:text-base mb-4">
                Interested in the {product.model}?
              </p>
              <Link
                href={`/contact?model=${product.model}`}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-sky-500 to-blue-700 rounded-xl hover:from-sky-400 hover:to-blue-600 transition-all duration-200 shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5"
              >
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                Send Enquiry
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
