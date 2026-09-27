'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import type { Product } from '@/types/product'
import ProductForm from '@/components/admin/ProductForm'
import { ToastContainer, useToast } from '@/components/admin/Toast'
import { ArrowLeft, PlusCircle } from 'lucide-react'
import Link from 'next/link'

function NewProductContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toasts, addToast, dismiss } = useToast()
  const duplicateId = searchParams.get('duplicate')
  const [duplicateData, setDuplicateData] = useState<Partial<Product> | undefined>()
  const [loading, setLoading] = useState(!!duplicateId)

  useEffect(() => {
    if (!duplicateId) return
    fetch(`/api/admin/products/${duplicateId}`)
      .then(r => r.json())
      .then(data => {
        if (data.product) {
          const { id, slug, model, createdAt, updatedAt, ...rest } = data.product
          // Generate new unique id/slug
          setDuplicateData({
            ...rest,
            id: '',
            slug: '',
            model: `${model} Copy`,
          })
        }
      })
      .catch(() => addToast('Could not load product to duplicate.', 'error'))
      .finally(() => setLoading(false))
  }, [duplicateId, addToast])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-400 text-sm">
        Loading product data…
      </div>
    )
  }

  const handleSuccess = (product: Product) => {
    addToast(`${product.model} created successfully.`, 'success')
    setTimeout(() => router.push('/admin/products'), 1500)
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
              <PlusCircle className="w-5 h-5 text-sky-400" />
              <h1 className="text-xl font-black text-white">
                {duplicateId ? 'Duplicate Product' : 'Add New Product'}
              </h1>
            </div>
            <p className="text-slate-400 text-sm mt-0.5">
              {duplicateId ? 'Creating a copy — update the model name and slug.' : 'Fill in the details for your new EV model.'}
            </p>
          </div>
        </div>

        <ProductForm
          mode="create"
          initialData={duplicateData}
          onSuccess={handleSuccess}
        />
      </div>
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </>
  )
}

export default function NewProductPage() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-400 text-sm">Loading…</div>}>
      <NewProductContent />
    </Suspense>
  )
}
