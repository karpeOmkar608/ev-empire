import Hero from '@/components/Hero'
import ProductGrid from '@/components/ProductGrid'
import FeatureSection from '@/components/FeatureSection'
import EnvironmentSection from '@/components/EnvironmentSection'
import ProductComparison from '@/components/ProductComparison'
import ContactSection from '@/components/ContactSection'
import { WhatsAppIcon, buildWaUrl } from '@/lib/whatsapp'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductGrid />
      <FeatureSection />
      <ProductComparison />
      <EnvironmentSection />
      <ContactSection />

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
        <div className="px-4 py-3 bg-[#070d1a]/95 backdrop-blur-xl border-t border-emerald-500/10">
          <a
            href={buildWaUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-green-700 rounded-xl shadow-lg shadow-emerald-500/25"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Enquire Now
          </a>
        </div>
      </div>
    </>
  )
}
