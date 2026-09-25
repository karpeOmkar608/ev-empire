import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/#why-ev-empire', label: 'Why EV Empire' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
]

const productFamilies = [
  { href: '/products#empire-prime', label: 'Empire Prime' },
  { href: '/products#empire-duo', label: 'Empire Duo' },
  { href: '/products#empire-family', label: 'Empire Family' },
  { href: '/products#empire-classic', label: 'Empire Classic' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#04080f] border-t border-sky-500/10">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4 group" aria-label="EV Empire — Home">
              <div className="relative w-[160px] h-[56px]">
                <Image
                  src="/logo.png"
                  alt="EV Empire — Electric Scooty & E-Bikes"
                  fill
                  className="object-contain object-left"
                  sizes="160px"
                  style={{ mixBlendMode: 'screen' }}
                />
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Building a smarter, cleaner approach to everyday mobility through
              practical electric scooters designed for modern riders.
            </p>
            <p className="text-sky-400 text-xs font-semibold tracking-widest uppercase">
              Charge. Ride. Vibe.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 text-sm hover:text-sky-400 transition-colors duration-200 animated-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Families */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-5">
              Our Range
            </h3>
            <ul className="space-y-3">
              {productFamilies.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-400 text-sm hover:text-sky-400 transition-colors duration-200 animated-underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-5">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-slate-400 text-sm">Phone</p>
                  <p className="text-slate-300 text-sm font-medium">
                    {/* Replace with actual phone number */}
                    +91 XXXXX XXXXX
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-slate-400 text-sm">Email</p>
                  <p className="text-slate-300 text-sm font-medium">
                    {/* Replace with actual email */}
                    info@evempire.in
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-slate-400 text-sm">Address</p>
                  <p className="text-slate-300 text-sm font-medium">
                    {/* Replace with actual address */}
                    India
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-slate-400 text-sm">Business Hours</p>
                  <p className="text-slate-300 text-sm font-medium">
                    {/* Replace with actual hours */}
                    Mon – Sat, 9 AM – 6 PM
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Warranty notice */}
      <div className="border-t border-sky-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-slate-500 text-xs text-center leading-relaxed max-w-3xl mx-auto">
            <span className="font-semibold text-slate-400">Warranty Information:</span>{' '}
            Warranty is applicable only for the following components: Battery • Motor •
            Controller • Charger. Warranty is subject to the company&apos;s warranty policy and
            applicable terms &amp; conditions.
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-sky-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs">
            © {year} EV Empire. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            Smart Ride. Better Future.
          </p>
        </div>
      </div>
    </footer>
  )
}
