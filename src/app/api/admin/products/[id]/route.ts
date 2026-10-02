import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/admin-auth'
import { fetchProductsFromGitHub, commitProductsToGitHub } from '@/lib/github'
import { updateProductSchema } from '@/lib/admin-validation'
import type { Product } from '@/types/product'
import fs from 'fs'
import path from 'path'

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
    return fetchProductsFromGitHub()
  }
  return { products: readLocalProducts() }
}

async function saveProducts(
  products: Product[],
  sha: string | undefined,
  message: string
): Promise<void> {
  if (isGitHubConfigured() && sha) {
    await commitProductsToGitHub(products, sha, message)
    // Only write locally in development — Vercel's filesystem is read-only
    if (process.env.NODE_ENV !== 'production') {
      try { writeLocalProducts(products) } catch { /* ignore */ }
    }
  } else {
    // No GitHub configured — write to local file only (development)
    writeLocalProducts(products)
  }
}

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/admin/products/[id]
export async function GET(request: NextRequest, { params }: RouteParams) {
  const session = await getSessionFromRequest(request)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await params
    const { products } = await getProducts()
    const product = products.find(p => p.id === id)
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    return NextResponse.json({ product })
  } catch (error) {
    console.error('[Admin Product GET]', error)
    return NextResponse.json({ error: 'Failed to load product' }, { status: 500 })
  }
}

// PUT /api/admin/products/[id] — full update
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const session = await getSessionFromRequest(request)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await params
    const body = await request.json()

    const parsed = updateProductSchema.safeParse({ ...body, id })
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { products, sha } = await getProducts()
    const index = products.findIndex(p => p.id === id)
    if (index === -1) return NextResponse.json({ error: 'Product not found' }, { status: 404 })

    // Check slug uniqueness (allow same slug for same product)
    if (parsed.data.slug && products.some(p => p.slug === parsed.data.slug && p.id !== id)) {
      return NextResponse.json({ error: 'A product with this slug already exists' }, { status: 409 })
    }

    const existing = products[index]
    const updated: Product = {
      ...existing,
      ...parsed.data,
      id, // ensure ID cannot be changed
      updatedAt: new Date().toISOString(),
    }

    const updatedProducts = [...products]
    updatedProducts[index] = updated

    // Determine commit message based on what changed
    let commitMsg = `Admin: Updated ${updated.model}`
    if (body.price !== undefined && body.price !== existing.price) {
      commitMsg = `Admin: Updated ${updated.model} price`
    } else if (body.active === false && existing.active === true) {
      commitMsg = `Admin: Deactivated ${updated.model}`
    } else if (body.active === true && existing.active === false) {
      commitMsg = `Admin: Activated ${updated.model}`
    }

    await saveProducts(updatedProducts, sha, commitMsg)

    return NextResponse.json({ product: updated })
  } catch (error) {
    console.error('[Admin Product PUT]', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

// PATCH /api/admin/products/[id] — partial update (e.g. toggle active)
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const session = await getSessionFromRequest(request)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await params
    const body = await request.json()

    const { products, sha } = await getProducts()
    const index = products.findIndex(p => p.id === id)
    if (index === -1) return NextResponse.json({ error: 'Product not found' }, { status: 404 })

    const existing = products[index]
    const updated: Product = {
      ...existing,
      ...body,
      id, // prevent ID change
      updatedAt: new Date().toISOString(),
    }

    const updatedProducts = [...products]
    updatedProducts[index] = updated

    let commitMsg = `Admin: Updated ${updated.model}`
    if (body.active === false) commitMsg = `Admin: Deactivated ${updated.model}`
    if (body.active === true) commitMsg = `Admin: Activated ${updated.model}`

    await saveProducts(updatedProducts, sha, commitMsg)
    return NextResponse.json({ product: updated })
  } catch (error) {
    console.error('[Admin Product PATCH]', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

// DELETE /api/admin/products/[id] — permanent delete
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const session = await getSessionFromRequest(request)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await params
    const { products, sha } = await getProducts()
    const product = products.find(p => p.id === id)
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })

    const updatedProducts = products.filter(p => p.id !== id)
    await saveProducts(updatedProducts, sha, `Admin: Permanently deleted ${product.model}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Admin Product DELETE]', error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
