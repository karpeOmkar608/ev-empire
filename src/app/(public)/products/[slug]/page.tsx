import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProductBySlug, activeProducts, formatPrice } from '@/data/products'
import ProductSpecs from '@/components/ProductSpecs'
import Link from 'next/link'
import { buildWaUrl, WhatsAppIcon } from '@/lib/whatsapp'

interface Props {
  params: Promise<{ slug: string }>
}

// Generate static params for active products only
export async function generateStaticParams() {
  return activeProducts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return {
    title: `${product.model} — ${product.familyName} | Electric Scooter`,
    description: `${product.model} electric scooter from EV Empire. ${product.series}. ${product.range} range, ${product.controller} controller. Price: ${formatPrice(product.price)}.`,
    openGraph: {
      title: `EV Empire ${product.model} — ${product.series}`,
      description: `${product.range} range, ${product.controller} controller. Starting at ${formatPrice(product.price)}.`,
      images: [{ url: product.image.replace('.webp', '.png') }],
    },
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <>
      <div className="bg-[#070d1a] min-h-screen pt-20">
        <ProductSpecs product={product} showEnquiryLink />
      </div>

      {/* Related products strip */}
      <section className="bg-[#050b16] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-white text-2xl font-bold mb-8">
            Also from{' '}
            <span className="text-sky-400">{product.familyName}</span>
          </h2>
          <div className="flex flex-wrap gap-4">
            {activeProducts
              .filter((p) => p.family === product.family && p.slug !== product.slug)
              .map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="flex items-center gap-3 px-5 py-3 rounded-xl card-premium border border-white/5 hover:border-sky-500/30 transition-all hover:-translate-y-0.5 group"
                >
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-sm tracking-wider">{p.model}</span>
                    <span className="text-sky-400 text-xs">{formatPrice(p.price)}</span>
                  </div>
                </Link>
              ))}
            <Link
              href="/products"
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-dashed border-white/10 text-slate-500 text-sm hover:text-sky-400 hover:border-sky-500/30 transition-all"
            >
              View All Scooters
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
        <div className="px-4 py-3 bg-[#070d1a]/95 backdrop-blur-xl border-t border-emerald-500/10">
          <a
            href={buildWaUrl(`Hello! I am interested in the EV Empire ${product.model}. Please share more details.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-green-700 rounded-xl shadow-lg shadow-emerald-500/25"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Enquire about {product.model}
          </a>
        </div>
      </div>
    </>
  )
}
