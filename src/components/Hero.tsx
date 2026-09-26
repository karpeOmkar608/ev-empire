'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Zap, ArrowRight, ChevronDown, Route, Gauge, Battery } from 'lucide-react'
import { motion } from 'framer-motion'
import { WhatsAppIcon, buildWaUrl } from '@/lib/whatsapp'

const stats = [
  { value: '4', label: 'Scooter Families' },
  { value: '8', label: 'Models' },
  { value: '70 KM', label: 'Max Range' },
  { value: '₹44,990', label: 'Starting At' },
]

const specTicker = [
  { icon: Route,   text: 'Up to 70 KM Range' },
  { icon: Gauge,   text: '25 KM/H Top Speed' },
  { icon: Battery, text: 'Lead Battery Tech' },
  { icon: Zap,     text: '4AMP LED Charging' },
  { icon: Route,   text: '40–70 KM Per Charge' },
  { icon: Gauge,   text: 'Disc & Drum Brakes' },
  { icon: Battery, text: '160 KG Load Capacity' },
  { icon: Zap,     text: 'ABS Plastic Body' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const itemVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* ── Deep layered background ─────────────────── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          className="object-cover object-center opacity-25"
          priority
          sizes="100vw"
          aria-hidden="true"
        />
        {/* Multi-layer dark overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070d1a] via-[#070d1a]/95 to-[#070d1a]/50 lg:to-[#070d1a]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070d1a] via-transparent to-[#070d1a]/60" />
        {/* Diagonal accent stripe */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #38bdf8 0px, #38bdf8 1px, transparent 1px, transparent 60px)',
          }}
        />
      </div>

      {/* ── Atmospheric glows ───────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Large left glow anchoring the text side */}
        <div className="absolute -left-32 top-1/4 w-[500px] h-[500px] rounded-full bg-sky-700/10 blur-[100px]" />
        {/* Central accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-blue-600/6 blur-[80px]" />
        {/* Right scooter glow */}
        <div
          className="absolute right-10 top-1/3 w-96 h-96 rounded-full bg-sky-500/12 blur-3xl animate-pulse-glow"
        />
        <div
          className="absolute right-32 bottom-1/4 w-64 h-64 rounded-full bg-indigo-600/10 blur-3xl animate-pulse-glow"
          style={{ animationDelay: '2s' }}
        />

        {/* Floating micro-particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-sky-400/50 animate-float"
            style={{
              width:  `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              left:   `${8 + i * 8}%`,
              top:    `${15 + (i % 4) * 20}%`,
              animationDelay:    `${i * 0.7}s`,
              animationDuration: `${6 + i * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* ── Scooter showcase (right) ────────────────── */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[58%] z-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {/* Outer spotlight ring — spinning slowly */}
          <div
            className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[420px] h-[420px] hero-ring animate-spin-slow hidden lg:block"
            style={{ transform: 'translateY(-50%)' }}
          />
          {/* Inner ring */}
          <div
            className="absolute top-1/2 right-[18%] -translate-y-1/2 w-[340px] h-[340px] hero-ring hidden lg:block"
            style={{
              transform: 'translateY(-50%)',
              animationDirection: 'reverse',
              animationDuration: '14s',
            }}
          />

          {/* Scooter with floating animation */}
          <div className="absolute inset-0 animate-hero-float">
            <Image
              src="/images/ep60.png"
              alt="EV Empire EP60 electric scooter"
              fill
              className="object-contain object-right opacity-15 sm:opacity-35 lg:opacity-90"
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </div>

          {/* Scan line effect */}
          <div className="absolute inset-0 overflow-hidden opacity-[0.06] hidden lg:block pointer-events-none">
            <div
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent animate-scan-line"
            />
          </div>

          {/* Ground glow under scooter */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-2/3 h-16 bg-sky-500/15 blur-2xl rounded-full" />

          {/* Gradient edge masks */}
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#070d1a] to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#070d1a] to-transparent" />
          <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-[#070d1a] to-transparent" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#070d1a] to-transparent" />
        </motion.div>
      </div>

      {/* ── Hero content ─────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-32 lg:py-44">
        <motion.div
          className="max-w-xl lg:max-w-[600px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-6">
              <Zap className="w-3 h-3 fill-current" />
              India&apos;s Practical EV Scooters
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-6"
          >
            <span className="block text-white">DRIVE A</span>
            <span className="block shimmer-text mt-1">CLEANER</span>
            <span className="block text-white mt-1">TOMORROW</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={itemVariants}
            className="text-slate-300/90 text-base sm:text-lg leading-relaxed mb-8 max-w-[420px]"
          >
            Smart electric scooters designed for everyday Indian mobility —
            practical, clean and built for the roads you ride every day.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-10">
            <Link
              href="/products"
              className="relative inline-flex items-center gap-2 px-7 py-3.5 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl hover:from-sky-400 hover:to-blue-500 transition-all duration-200 shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:-translate-y-0.5 active:translate-y-0 overflow-hidden group"
            >
              {/* Shine sweep on hover */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 ease-in-out" />
              Explore Scooters
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href={buildWaUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl hover:from-emerald-400 hover:to-green-500 border border-emerald-500/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              Enquire Now
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/8"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-white text-xl sm:text-2xl font-black tracking-tight leading-none">
                  {stat.value}
                </span>
                <span className="text-slate-500 text-[10px] sm:text-xs font-medium mt-1 tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Spec ticker bar ─────────────────────────── */}
      <div className="absolute bottom-12 sm:bottom-16 left-0 right-0 z-10 overflow-hidden">
        <div
          className="flex gap-10 whitespace-nowrap"
          style={{
            animation: 'ticker 30s linear infinite',
          }}
        >
          {[...specTicker, ...specTicker].map((item, i) => {
            const Icon = item.icon
            return (
              <span
                key={i}
                className="inline-flex items-center gap-2 text-slate-500 text-[10px] sm:text-xs font-medium tracking-widest uppercase shrink-0"
              >
                <Icon className="w-3 h-3 text-sky-600/70 shrink-0" />
                {item.text}
                <span className="ml-8 w-1 h-1 rounded-full bg-sky-700/50 shrink-0" />
              </span>
            )
          })}
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-4 right-6 z-10 hidden sm:flex flex-col items-center gap-1 text-slate-600"
        aria-hidden="true"
      >
        <span className="text-[9px] tracking-[0.25em] uppercase">Scroll</span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
      </motion.div>
    </section>
  )
}
