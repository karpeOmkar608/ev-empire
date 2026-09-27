'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { Product } from '@/types/product'
import ProductTable from '@/components/admin/ProductTable'
import ProductStats from '@/components/admin/ProductStats'
import { ToastContainer, useToast } from '@/components/admin/Toast'
import { PlusCircle, RefreshCw, Filter, Search } from 'lucide-react'

export default function AdminProductsPage() {
  const router = useRouter()
  const { toasts, addToast, dismiss } = useToast()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterFamily, setFilterFamily] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  // Stable ref for addToast so it never causes fetchProducts to re-create
  const addToastRef = useRef(addToast)
  useEffect(() => { addToastRef.current = addToast }, [addToast])

  // fetchProducts has no external deps — runs only when explicitly called
  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/products')
      if (!res.ok) throw new Error('Failed to load')
      const data = await res.json()
      setProducts(data.products)
    } catch {
      addToastRef.current('Failed to load products.', 'error')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  const handleToggleActive = async (id: string, active: boolean) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active }),
      })
      if (!res.ok) throw new Error()
      const { product } = await res.json()
      setProducts(prev => prev.map(p => p.id === id ? product : p))
      addToast(active ? 'Product activated.' : 'Product deactivated.', active ? 'success' : 'info')
    } catch {
      addToast('Unable to update product. Please try again.', 'error')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      setProducts(prev => prev.filter(p => p.id !== id))
      addToast('Product permanently deleted.', 'success')
    } catch {
      addToast('Unable to delete product. Please try again.', 'error')
    }
  }

  const handleDuplicate = (product: Product) => {
    const params = new URLSearchParams({ duplicate: product.id })
    router.push(`/admin/products/new?${params}`)
  }

  // Derived families
  const families = ['all', ...Array.from(new Set(products.map(p => p.family)))]

  const filtered = products.filter(p => {
    const matchSearch =
      !searchTerm ||
      p.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.familyName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchFamily = filterFamily === 'all' || p.family === filterFamily
    const matchStatus =
      filterStatus === 'all' ||
      (filterStatus === 'active' && p.active) ||
      (filterStatus === 'inactive' && !p.active)
    return matchSearch && matchFamily && matchStatus
  })

  return (
    <>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Products</h1>
            <p className="text-slate-400 text-sm mt-0.5">Manage your EV Empire catalogue</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchProducts}
              className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 border border-white/10 rounded-xl transition-all"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <Link
              href="/admin/products/new"
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 rounded-xl transition-all shadow-lg shadow-sky-500/20"
            >
              <PlusCircle className="w-4 h-4" />
              Add Product
            </Link>
          </div>
        </div>

        {/* Stats */}
        {!loading && <ProductStats products={products} />}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search models…"
              className="w-full pl-9 pr-4 py-2.5 bg-[#0d1629] border border-white/10 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/40 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500 shrink-0" />
            <select
              value={filterFamily}
              onChange={e => setFilterFamily(e.target.value)}
              className="px-3 py-2.5 bg-[#0d1629] border border-white/10 rounded-xl text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/40 transition-all appearance-none"
            >
              <option value="all">All Families</option>
              {families.filter(f => f !== 'all').map(f => (
                <option key={f} value={f}>{f.replace('empire-', 'Empire ').replace(/\b\w/g, c => c.toUpperCase())}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="px-3 py-2.5 bg-[#0d1629] border border-white/10 rounded-xl text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/40 transition-all appearance-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <RefreshCw className="w-8 h-8 text-sky-400 animate-spin" />
              <p className="text-slate-400 text-sm">Loading products…</p>
            </div>
          </div>
        ) : (
          <>
            {filtered.length !== products.length && (
              <p className="text-slate-500 text-sm">
                Showing {filtered.length} of {products.length} products
              </p>
            )}
            <ProductTable
              products={filtered}
              onToggleActive={handleToggleActive}
              onDelete={handleDelete}
              onDuplicate={handleDuplicate}
            />
          </>
        )}
      </div>

      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </>
  )
}
