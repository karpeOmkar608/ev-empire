'use client'

import { useEffect, useState } from 'react'
import { use } from 'react'
import type { Product } from '@/types/product'
import ProductForm from '@/components/admin/ProductForm'
import { ToastContainer, useToast } from '@/components/admin/Toast'
import { ArrowLeft, Pencil, RefreshCw } from 'lucide-react'
import Link from 'next/link'

interface Props {
  params: Promise<{ id: string }>
}

export default function EditProductPage({ params }: Props) {
  const { id } = use(params)
  const { toasts, addToast, dismiss } = useToast()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch(`/api/admin/products/${id}`)
      .then(r => {
        if (r.status === 404) { setNotFound(true); return null }
        return r.json()
      })
      .then(data => {
        if (data?.product) setProduct(data.product)
      })
      .catch(() => addToast('Failed to load product.', 'error'))
      .finally(() => setLoading(false))
  }, [id, addToast])

  const handleSuccess = (updated: Product) => {
    setProduct(updated)
    addToast(`${updated.model} updated successfully.`, 'success')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <RefreshCw className="w-6 h-6 text-sky-400 animate-spin" />
      </div>
    )
  }

  if (notFound || !product) {
    return (
      <div className="p-8 text-center">
        <p className="text-4xl mb-3">🔍</p>
        <h1 className="text-white font-bold text-xl mb-2">Product Not Found</h1>
        <p className="text-slate-400 text-sm mb-5">The product with ID &quot;{id}&quot; does not exist.</p>
        <Link href="/admin/products" className="text-sky-400 hover:text-sky-300 text-sm font-semibold transition-colors">
          ← Back to Products
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/products" className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <Pencil className="w-5 h-5 text-sky-400" />
              <h1 className="text-xl font-black text-white">Edit {product.model}</h1>
            </div>
            <p className="text-slate-400 text-sm mt-0.5">
              {product.familyName} · {product.series}
            </p>
          </div>
        </div>

        <ProductForm
          mode="edit"
          productId={product.id}
          initialData={product}
          onSuccess={handleSuccess}
        />
      </div>
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </>
  )
}
