import type { Product } from '@/types/product'
import { BarChart2, CheckCircle2, XCircle, Layers } from 'lucide-react'

interface ProductStatsProps {
  products: Product[]
}

export default function ProductStats({ products }: ProductStatsProps) {
  const total = products.length
  const active = products.filter(p => p.active).length
  const inactive = total - active
  const families = new Set(products.map(p => p.family)).size

  const stats = [
    {
      label: 'Total Models',
      value: total,
      icon: BarChart2,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10',
      border: 'border-sky-500/20',
    },
    {
      label: 'Active',
      value: active,
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    {
      label: 'Inactive',
      value: inactive,
      icon: XCircle,
      color: 'text-slate-400',
      bg: 'bg-slate-500/10',
      border: 'border-slate-500/20',
    },
    {
      label: 'Product Families',
      value: families,
      icon: Layers,
      color: 'text-violet-400',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/20',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ label, value, icon: Icon, color, bg, border }) => (
        <div
          key={label}
          className={`relative overflow-hidden rounded-2xl bg-[#0d1629] border ${border} p-5`}
        >
          <div className={`inline-flex p-2.5 rounded-xl ${bg} mb-3`}>
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
          <p className="text-3xl font-black text-white mb-1">{value}</p>
          <p className="text-slate-400 text-sm font-medium">{label}</p>
          {/* Subtle decorative glow */}
          <div className={`absolute -right-4 -bottom-4 w-20 h-20 rounded-full ${bg} blur-2xl opacity-60`} />
        </div>
      ))}
    </div>
  )
}
