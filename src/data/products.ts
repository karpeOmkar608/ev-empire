import type { Product, ProductFamily_Data } from '@/types/product'
import productsData from '../../data/products.json'

// Cast JSON data to typed Product array
export const products: Product[] = productsData as Product[]

// Only active products for public-facing pages
export const activeProducts: Product[] = products.filter(p => p.active)

export const productFamilies: ProductFamily_Data[] = [
  {
    id: 'empire-prime',
    name: 'Empire Prime',
    series: 'Single Light Series',
    seriesLabel: 'SINGLE LIGHT SERIES',
    description: 'A clean, modern single-headlight design built for everyday city commuting. Available in 48V, 60V and 72V configurations.',
    models: activeProducts.filter(p => p.family === 'empire-prime'),
    image: '/images/ep60.webp',
    accentColor: 'from-blue-600 to-blue-800',
  },
  {
    id: 'empire-duo',
    name: 'Empire Duo',
    series: 'Double Light Series',
    seriesLabel: 'DOUBLE LIGHT SERIES',
    description: 'Distinguished dual-headlight aesthetics combined with the same reliable electric drivetrain. Stand out on every road.',
    models: activeProducts.filter(p => p.family === 'empire-duo'),
    image: '/images/ed60.webp',
    accentColor: 'from-indigo-600 to-purple-800',
  },
  {
    id: 'empire-family',
    name: 'Empire Family',
    series: 'Activa Type Series',
    seriesLabel: 'ACTIVA TYPE SERIES',
    description: 'The familiar scooter silhouette, reinvented for electric mobility. Designed for families with a comfortable, practical ride.',
    models: activeProducts.filter(p => p.family === 'empire-family'),
    image: '/images/ef60.webp',
    accentColor: 'from-emerald-600 to-teal-800',
  },
  {
    id: 'empire-classic',
    name: 'Empire Classic',
    series: 'Chetak Type Series',
    seriesLabel: 'CHETAK TYPE SERIES',
    description: 'Timeless retro-inspired styling with a fully electric drivetrain. The premium expression of the EV Empire range.',
    models: activeProducts.filter(p => p.family === 'empire-classic'),
    image: '/images/ec60.webp',
    accentColor: 'from-amber-600 to-orange-800',
  },
].filter(f => f.models.length > 0)

export function getProductBySlug(slug: string): Product | undefined {
  return activeProducts.find(p => p.slug === slug)
}

export function getAllProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

export const ALL_SCOOTER_MODELS = activeProducts.map(p => p.model)
