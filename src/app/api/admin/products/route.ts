import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/admin-auth'
import { fetchProductsFromGitHub, updateProductsOnGitHub } from '@/lib/github'
import { createProductSchema } from '@/lib/admin-validation'
import type { Product } from '@/types/product'
import fs from 'fs'
import path from 'path'

// Helper: read local products.json as fallback when GitHub is not configured
function readLocalProducts(): Product[] {
  const filePath = path.join(process.cwd(), 'data', 'products.json')
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as Product[]
}

function writeLocalProducts(products: Product[]): void {
  const filePath = path.join(process.cwd(), 'data', 'products.json')
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2) + '\n', 'utf-8')
}

function isGitHubConfigured(): boolean {
  return !!(process.env.GITHUB_TOKEN && process.env.GITHUB_OWNER && process.env.GITHUB_REPO)
}

async function getProducts(): Promise<{ products: Product[]; sha?: string }> {
  if (isGitHubConfigured()) {
    const result = await fetchProductsFromGitHub()
    return result
  }
  return { products: readLocalProducts() }
}

async function saveProducts(
  products: Product[],
  sha: string | undefined,
  message: string
): Promise<void> {
  if (isGitHubConfigured() && sha) {
    const { commitProductsToGitHub } = await import('@/lib/github')
    await commitProductsToGitHub(products, sha, message)
  }
  // Always write locally (for dev and as fallback)
  writeLocalProducts(products)
}

// GET /api/admin/products — list all products
export async function GET(request: NextRequest) {
  const session = await getSessionFromRequest(request)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { products } = await getProducts()
    return NextResponse.json({ products })
  } catch (error) {
    console.error('[Admin Products GET] Error:', error)
    return NextResponse.json({ error: 'Failed to load products' }, { status: 500 })
  }
}

// POST /api/admin/products — create new product
export async function POST(request: NextRequest) {
  const session = await getSessionFromRequest(request)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()

    const parsed = createProductSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { products, sha } = await getProducts()

    // Check uniqueness of id and slug
    if (products.some(p => p.id === parsed.data.id)) {
      return NextResponse.json({ error: 'A product with this ID already exists' }, { status: 409 })
    }
    if (products.some(p => p.slug === parsed.data.slug)) {
      return NextResponse.json({ error: 'A product with this slug already exists' }, { status: 409 })
    }

    const now = new Date().toISOString()
    const newProduct: Product = {
      ...parsed.data,
      createdAt: now,
      updatedAt: now,
    }

    const updated = [...products, newProduct]
    await saveProducts(updated, sha, `Admin: Added EV model ${newProduct.model}`)

    return NextResponse.json({ product: newProduct }, { status: 201 })
  } catch (error) {
    console.error('[Admin Products POST] Error:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
