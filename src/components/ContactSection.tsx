'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MessageCircle, MapPin, Clock } from 'lucide-react'
import EnquiryForm from './EnquiryForm'

interface ContactSectionProps {
  defaultModel?: string
}

const PHONE   = '+917507221221'       // digits only — used in tel: / wa.me links
const PHONE_DISPLAY  = '+91 7507221221'     // formatted display
const EMAIL   = 'evempire.kopargaon@gmail.com'
const WA_URL  = `https://wa.me/${PHONE}?text=${encodeURIComponent('Hello! I am interested in an EV Empire scooter. Please share more details.')}`

const contactItems = [
  {
    icon: Phone,
    label: 'Phone',
    value: PHONE_DISPLAY,
    note: 'Call us during business hours',
    href: `tel:${PHONE}`,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
  },
  {
    icon: Mail,
    label: 'Email',
    value: EMAIL,
    note: 'We reply within 24 hours',
    href: `mailto:${EMAIL}`,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: PHONE_DISPLAY,
    note: 'Tap to open WhatsApp chat',
    href: WA_URL,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: 'J1909, R16, Life Republic, Punawale',
    note: 'Visit us at our showroom',
    href: null,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: 'Mon – Sat, 9 AM – 6 PM',
    note: 'Sunday: Closed',
    href: null,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
  },
]

export default function ContactSection({ defaultModel }: ContactSectionProps) {
  return (
    <section
      id="contact"
      className="section-pad bg-[#050b16] relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-sky-600/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-blue-600/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-sky-400 text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-3">
            Get In Touch
          </p>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4"
          >
            Get in touch with{' '}
            <span className="gradient-text">EV Empire</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto px-2">
            Interested in a scooter? Have a question? Fill in the form and our
            team will get back to you shortly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Contact details — left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            <h3 className="text-white text-xl font-bold mb-6">Contact Details</h3>
            {contactItems.map((item) => {
              const Icon = item.icon
              const inner = (
                <>
                  <div
                    className={`w-10 h-10 rounded-lg ${item.bg} border ${item.border} flex items-center justify-center shrink-0`}
                  >
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-slate-500 text-xs font-semibold tracking-wider uppercase">
                      {item.label}
                    </p>
                    <p className="text-white text-sm font-semibold break-all">
                      {item.value}
                    </p>
                    <p className="text-slate-500 text-xs">{item.note}</p>
                  </div>
                </>
              )

              const baseClass = `flex items-start gap-4 p-4 rounded-xl card-premium border ${item.border} transition-all`

              // Items with links get hover effect + cursor pointer
              if (item.href) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`${baseClass} hover:border-opacity-60 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer`}
                    aria-label={`${item.label}: ${item.value}`}
                  >
                    {inner}
                  </a>
                )
              }

              return (
                <div key={item.label} className={baseClass}>
                  {inner}
                </div>
              )
            })}
          </motion.div>

          {/* Enquiry form — right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 card-premium rounded-2xl p-5 sm:p-8 border border-white/5"
          >
            <h3 className="text-white text-lg sm:text-xl font-bold mb-5 sm:mb-7">Send an Enquiry</h3>
            <EnquiryForm defaultModel={defaultModel} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
