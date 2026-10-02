import { NextResponse } from 'next/server'
import type { Product } from '@/types/product'
import fs from 'fs'
import path from 'path'

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
    // Fallback: local file (development)
    const filePath = path.join(process.cwd(), 'data', 'products.json')
    const raw = fs.readFileSync(filePath, 'utf-8')
    const products: Product[] = JSON.parse(raw)
    return products.filter(p => p.active)
  } catch {
    return []
  }
}

// Public endpoint — no auth required. Returns only active products.
export async function GET() {
  const products = await getActiveProducts()
  return NextResponse.json(
    { products },
    {
      headers: {
        // Cache for 60s on CDN, allow stale for 10s while revalidating
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=10',
      },
    }
  )
}
