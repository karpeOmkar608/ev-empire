import { NextResponse } from 'next/server'
import type { Product, ProductFamily_Data } from '@/types/product'
import fs from 'fs'
import path from 'path'

const FAMILIES_CONFIG = [
  {
    id: 'empire-prime',
    name: 'Empire Prime',
    series: 'Single Light Series',
    seriesLabel: 'SINGLE LIGHT SERIES',
    description: 'A clean, modern single-headlight design built for everyday city commuting. Available in 48V, 60V and 72V configurations.',
    image: '/images/ep60.webp',
    accentColor: 'from-blue-600 to-blue-800',
  },
  {
    id: 'empire-duo',
    name: 'Empire Duo',
    series: 'Double Light Series',
    seriesLabel: 'DOUBLE LIGHT SERIES',
    description: 'Distinguished dual-headlight aesthetics combined with the same reliable electric drivetrain. Stand out on every road.',
    image: '/images/ed60.webp',
    accentColor: 'from-indigo-600 to-purple-800',
  },
  {
    id: 'empire-family',
    name: 'Empire Family',
    series: 'Activa Type Series',
    seriesLabel: 'ACTIVA TYPE SERIES',
    description: 'The familiar scooter silhouette, reinvented for electric mobility. Designed for families with a comfortable, practical ride.',
    image: '/images/ef60.webp',
    accentColor: 'from-emerald-600 to-teal-800',
  },
  {
    id: 'empire-classic',
    name: 'Empire Classic',
    series: 'Chetak Type Series',
    seriesLabel: 'CHETAK TYPE SERIES',
    description: 'Timeless retro-inspired styling with a fully electric drivetrain. The premium expression of the EV Empire range.',
    image: '/images/ec60.webp',
    accentColor: 'from-amber-600 to-orange-800',
  },
]

function isGitHubConfigured(): boolean {
  return !!(process.env.GITHUB_TOKEN && process.env.GITHUB_OWNER && process.env.GITHUB_REPO)
}

async function getActiveProducts(): Promise<Product[]> {
  try {
    if (isGitHubConfigured()) {
      const { fetchProductsFromGitHub } = await import('@/lib/github')
      const { products } = await fetchProductsFromGitHub()
      return products.filter(p => p.active)
    }
    const filePath = path.join(process.cwd(), 'data', 'products.json')
    const raw = fs.readFileSync(filePath, 'utf-8')
    const products: Product[] = JSON.parse(raw)
    return products.filter(p => p.active)
  } catch {
    return []
  }
}

export async function GET() {
  const activeProducts = await getActiveProducts()

  const families: ProductFamily_Data[] = FAMILIES_CONFIG
    .map(config => ({
      ...config,
      models: activeProducts.filter(p => p.family === config.id),
    }))
    .filter(f => f.models.length > 0)

  return NextResponse.json(
    { families },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=10',
      },
    }
  )
}
