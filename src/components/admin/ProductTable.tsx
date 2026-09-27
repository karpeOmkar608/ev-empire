'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/types/product'
import { formatPrice } from '@/data/products'
import {
  Pencil,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  MoreVertical,
  Star,
  IndianRupee,
} from 'lucide-react'
import ConfirmDialog from './ConfirmDialog'

interface ProductTableProps {
  products: Product[]
  onToggleActive: (id: string, active: boolean) => Promise<void>
  onDelete: (id: string) => Promise<void>
  onDuplicate: (product: Product) => void
}

export default function ProductTable({
  products,
  onToggleActive,
  onDelete,
  onDuplicate,
}: ProductTableProps) {
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)

  const handleToggleActive = async (product: Product) => {
    setLoadingId(product.id)
    try {
      await onToggleActive(product.id, !product.active)
    } finally {
      setLoadingId(null)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setLoadingId(deleteTarget.id)
    try {
      await onDelete(deleteTarget.id)
    } finally {
      setLoadingId(null)
      setDeleteTarget(null)
    }
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-slate-500">
        <p className="text-4xl mb-3">📦</p>
        <p className="font-semibold text-lg text-slate-400">No products yet</p>
        <p className="text-sm mt-1">Add your first EV model to get started.</p>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 text-sm font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-xl transition-all shadow-lg shadow-sky-500/20"
        >
          Add Product
        </Link>
      </div>
    )
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-white/5">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#0a1422] border-b border-white/5">
              <th className="text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wider">Model</th>
              <th className="text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wider">Family</th>
              <th className="text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wider">Price</th>
              <th className="text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wider">Range</th>
              <th className="text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wider">Speed</th>
              <th className="text-left px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wider">Status</th>
              <th className="text-right px-4 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {products.map((product) => (
              <tr key={product.id} className="bg-[#0d1629] hover:bg-[#101d35] transition-colors">
                {/* Model */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#0a1422] border border-white/5 flex items-center justify-center shrink-0 overflow-hidden">
                      <Image
                        src={product.image.replace('.webp', '.png')}
                        alt={product.model}
                        width={40}
                        height={40}
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-white font-bold tracking-wider">{product.model}</span>
                        {product.featured && <Star className="w-3 h-3 text-amber-400 fill-amber-400" />}
                        {product.badge && (
                          <span className="px-1.5 py-0.5 text-[9px] font-bold bg-sky-500/20 text-sky-400 rounded-full uppercase tracking-wide">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-500 text-xs">{product.series}</p>
                    </div>
                  </div>
                </td>
                {/* Family */}
                <td className="px-4 py-3">
                  <span className="text-slate-300 font-medium">{product.familyName}</span>
                </td>
                {/* Price */}
                <td className="px-4 py-3">
                  <span className="text-emerald-400 font-bold">{formatPrice(product.price)}</span>
                </td>
                {/* Range */}
                <td className="px-4 py-3 text-slate-400">{product.range}</td>
                {/* Speed */}
                <td className="px-4 py-3 text-slate-400">{product.maxSpeed}</td>
                {/* Status */}
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                      product.active
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                        : 'bg-slate-500/15 text-slate-400 border border-slate-500/20'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${product.active ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                    {product.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="p-1.5 text-slate-400 hover:text-sky-400 hover:bg-sky-500/10 rounded-lg transition-all"
                      title="Edit"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => onDuplicate(product)}
                      className="p-1.5 text-slate-400 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-all"
                      title="Duplicate"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleToggleActive(product)}
                      disabled={loadingId === product.id}
                      className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-all disabled:opacity-40"
                      title={product.active ? 'Deactivate' : 'Activate'}
                    >
                      {product.active ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => setDeleteTarget(product)}
                      className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {products.map((product) => (
          <div key={product.id} className="bg-[#0d1629] border border-white/5 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#0a1422] border border-white/5 shrink-0 overflow-hidden flex items-center justify-center">
                <Image
                  src={product.image.replace('.webp', '.png')}
                  alt={product.model}
                  width={48}
                  height={48}
                  className="object-contain p-1"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-white font-bold tracking-wider">{product.model}</span>
                  {product.featured && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      product.active
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : 'bg-slate-500/15 text-slate-400'
                    }`}
                  >
                    {product.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-slate-400 text-xs mt-0.5">{product.familyName} · {product.series}</p>
                <div className="flex items-center gap-1 mt-1">
                  <IndianRupee className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 font-bold text-sm">{formatPrice(product.price)}</span>
                </div>
              </div>
              {/* Mobile menu button */}
              <div className="relative">
                <button
                  onClick={() => setOpenMenuId(openMenuId === product.id ? null : product.id)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
                {openMenuId === product.id && (
                  <div className="absolute right-0 top-full mt-1 w-40 bg-[#0a1422] border border-white/10 rounded-xl shadow-xl z-20 py-1">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                      onClick={() => setOpenMenuId(null)}
                    >
                      <Pencil className="w-3.5 h-3.5" /> Edit
                    </Link>
                    <button
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                      onClick={() => { onDuplicate(product); setOpenMenuId(null) }}
                    >
                      <Copy className="w-3.5 h-3.5" /> Duplicate
                    </button>
                    <button
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
                      onClick={() => { handleToggleActive(product); setOpenMenuId(null) }}
                    >
                      {product.active ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      {product.active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                      onClick={() => { setDeleteTarget(product); setOpenMenuId(null) }}
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/5">
              <div className="text-center">
                <p className="text-[10px] text-slate-500 uppercase tracking-wide">Range</p>
                <p className="text-xs font-semibold text-slate-300 mt-0.5">{product.range}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-slate-500 uppercase tracking-wide">Speed</p>
                <p className="text-xs font-semibold text-slate-300 mt-0.5">{product.maxSpeed}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-slate-500 uppercase tracking-wide">Controller</p>
                <p className="text-xs font-semibold text-slate-300 mt-0.5">{product.controller}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Confirm delete dialog */}
      <ConfirmDialog
        open={!!deleteTarget}
        title={`Delete ${deleteTarget?.model}?`}
        message={`This will permanently remove ${deleteTarget?.model} from the product catalogue. This action cannot be undone. Consider deactivating instead.`}
        confirmLabel="Delete Permanently"
        destructive
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  )
}
