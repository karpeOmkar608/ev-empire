import type { Metadata } from 'next'
import ContactSection from '@/components/ContactSection'

interface Props {
  searchParams: Promise<{ model?: string }>
}

export const metadata: Metadata = {
  title: 'Contact & Enquire — EV Empire',
  description:
    'Get in touch with EV Empire. Send an enquiry about any of our electric scooters and our team will contact you shortly.',
}

export default async function ContactPage({ searchParams }: Props) {
  const { model } = await searchParams

  return (
    <>
      {/* Page header */}
      <section className="pt-36 pb-4 bg-[#070d1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sky-400 text-xs font-bold tracking-[0.3em] uppercase mb-3">
              Contact Us
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
              Let&apos;s Talk{' '}
              <span className="gradient-text">Electric</span>
            </h1>
          </div>
        </div>
      </section>

      <ContactSection defaultModel={model} />
    </>
  )
}
