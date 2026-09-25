'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Zap } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/#why-ev-empire', label: 'Why EV Empire' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? 'bg-[#070d1a]/95 backdrop-blur-xl border-b border-sky-500/10 shadow-lg shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* ── Top bar ────────────────────────────────── */}
        <div className="flex items-center justify-between h-16 md:h-18">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0 group"
            aria-label="EV Empire — Home"
          >
            {/*
              mix-blend-mode: screen makes the white logo background
              invisible against the dark navy, revealing only the coloured
              logo artwork. We wrap it in a dark-bg container so it also
              works when the navbar is transparent.
            */}
            <div className="relative w-[130px] sm:w-[150px] h-[44px] sm:h-[50px] shrink-0">
              <Image
                src="/logo.png"
                alt="EV Empire — Electric Scooty & E-Bikes"
                fill
                className="object-contain object-left"
                sizes="(max-width: 640px) 130px, 150px"
                priority
                style={{ mixBlendMode: 'screen' }}
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 xl:px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'text-sky-400'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-sky-600 to-blue-700 rounded-lg hover:from-sky-500 hover:to-blue-600 transition-all duration-200 shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            >
              <Zap className="w-4 h-4" />
              Enquire Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all shrink-0"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* ── Mobile menu ──────────────────────────────── */}
        <div
          id="mobile-menu"
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pb-5 pt-2 border-t border-white/5 mt-1">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-3.5 text-sm font-medium rounded-lg transition-all ${
                      isActive
                        ? 'text-sky-400 bg-sky-500/10'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}

              <Link
                href="/contact"
                className="mt-2 flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-sky-600 to-blue-700 rounded-lg shadow-lg shadow-sky-500/20"
              >
                <Zap className="w-4 h-4" />
                Enquire Now
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
