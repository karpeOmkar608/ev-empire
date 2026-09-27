import type { Metadata } from 'next'
import { getSessionFromCookies } from '@/lib/admin-auth'
import { redirect } from 'next/navigation'
import ProductStats from '@/components/admin/ProductStats'
import Link from 'next/link'
import { PlusCircle, Package, ArrowRight, Clock, GitBranch } from 'lucide-react'
import fs from 'fs'
import path from 'path'
import type { Product } from '@/types/product'

export const metadata: Metadata = { title: 'Dashboard' }

async function getProductsLocally(): Promise<Product[]> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'products.json')
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw) as Product[]
  } catch {
    return []
  }
}

export default async function AdminDashboardPage() {
  const session = await getSessionFromCookies()
  if (!session) redirect('/admin/login')

  const products = await getProductsLocally()
  const recentProducts = [...products]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5)

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Dashboard</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Welcome back, <span className="text-sky-400">{session.email}</span>
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 rounded-xl transition-all shadow-lg shadow-sky-500/20"
        >
          <PlusCircle className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {/* Stats */}
      <ProductStats products={products} />

      {/* Two-column section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent products */}
        <div className="bg-[#0d1629] border border-white/5 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-400" />
              <h2 className="text-white font-bold text-sm">Recently Updated</h2>
            </div>
            <Link href="/admin/products" className="text-sky-400 text-xs hover:text-sky-300 transition-colors flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {recentProducts.length === 0 ? (
              <p className="text-slate-500 text-sm py-4 text-center">No products yet</p>
            ) : (
              recentProducts.map(p => (
                <Link
                  key={p.id}
                  href={`/admin/products/${p.id}/edit`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <div className={`w-2 h-2 rounded-full shrink-0 ${p.active ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-bold tracking-wide">{p.model}</span>
                      <span className="text-slate-500 text-xs">{p.familyName}</span>
                    </div>
                    <p className="text-slate-500 text-xs truncate">
                      Updated {new Date(p.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-sky-400 transition-colors shrink-0" />
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-[#0d1629] border border-white/5 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-4 h-4 text-sky-400" />
            <h2 className="text-white font-bold text-sm">Quick Actions</h2>
          </div>
          <div className="space-y-2">
            {[
              {
                href: '/admin/products/new',
                icon: PlusCircle,
                label: 'Add New Product',
                desc: 'Create a new EV model',
                color: 'text-sky-400',
              },
              {
                href: '/admin/products',
                icon: Package,
                label: 'Manage Products',
                desc: 'Edit, activate or delete models',
                color: 'text-violet-400',
              },
              {
                href: '/admin/settings',
                icon: GitBranch,
                label: 'Settings',
                desc: 'View data source & configuration',
                color: 'text-amber-400',
              },
              {
                href: '/',
                icon: ArrowRight,
                label: 'View Public Site',
                desc: 'Opens in new tab',
                color: 'text-emerald-400',
                target: '_blank',
              },
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                target={item.target}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <div className={`p-2 rounded-lg bg-white/5 group-hover:bg-white/8 transition-colors`}>
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{item.label}</p>
                  <p className="text-slate-500 text-xs">{item.desc}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors ml-auto shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Data source info */}
      <div className="bg-[#0d1629]/50 border border-white/5 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-sky-500/10">
            <GitBranch className="w-4 h-4 text-sky-400" />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm mb-1">Data Source</h3>
            <p className="text-slate-400 text-sm">
              Products are stored in <code className="text-sky-300 bg-sky-500/10 px-1.5 py-0.5 rounded text-xs font-mono">data/products.json</code>.
              {process.env.GITHUB_TOKEN
                ? ' Changes are committed to your GitHub repository automatically.'
                : ' Changes are saved locally. Configure GitHub to enable automatic commits to your repository.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
