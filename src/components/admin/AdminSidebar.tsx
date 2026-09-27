'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Settings,
  LogOut,
  Zap,
  X,
  Menu,
  ChevronRight,
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/products/new', label: 'Add Product', icon: PlusCircle },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

interface AdminSidebarProps {
  email?: string
  mobileOpen?: boolean
  onMobileClose?: () => void
}

export default function AdminSidebar({ email, mobileOpen, onMobileClose }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href
    return pathname === href || pathname.startsWith(href + '/')
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' })
      router.push('/admin/login')
    } catch {
      setLoggingOut(false)
    }
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2.5 group" onClick={onMobileClose}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center shadow-lg shadow-sky-500/25">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <div>
            <p className="text-white font-black text-sm tracking-widest uppercase leading-none">EV Empire</p>
            <p className="text-sky-400 text-[10px] font-semibold tracking-widest uppercase">Admin</p>
          </div>
        </Link>
        {onMobileClose && (
          <button onClick={onMobileClose} className="lg:hidden text-slate-400 hover:text-white transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(href, exact)
          return (
            <Link
              key={href}
              href={href}
              onClick={onMobileClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 group ${
                active
                  ? 'bg-sky-500/15 text-sky-400 border border-sky-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-sky-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
              {label}
              {active && <ChevronRight className="w-3.5 h-3.5 ml-auto text-sky-400/60" />}
            </Link>
          )
        })}
      </nav>

      {/* Bottom: user info + logout */}
      <div className="px-3 pb-4 border-t border-white/5 pt-4 space-y-2">
        {email && (
          <div className="px-3 py-2.5 rounded-xl bg-white/3 border border-white/5">
            <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-widest mb-0.5">Signed in as</p>
            <p className="text-slate-300 text-xs font-medium truncate">{email}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-150 disabled:opacity-50"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {loggingOut ? 'Signing out…' : 'Logout'}
        </button>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all duration-150"
        >
          <Zap className="w-4 h-4 shrink-0" />
          View Public Site ↗
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-[#0a1422] border-r border-white/5 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[150] flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onMobileClose} aria-hidden="true" />
          <aside className="relative w-64 bg-[#0a1422] border-r border-white/5 h-full flex flex-col shadow-2xl">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  )
}

// Mobile header with hamburger
export function AdminMobileHeader({ onMenuOpen }: { onMenuOpen: () => void }) {
  return (
    <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-[#0a1422] border-b border-white/5 sticky top-0 z-40">
      <button
        onClick={onMenuOpen}
        className="p-2 text-slate-400 hover:text-white transition-colors"
        aria-label="Open navigation menu"
      >
        <Menu className="w-5 h-5" />
      </button>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center">
          <Zap className="w-3 h-3 text-white fill-white" />
        </div>
        <span className="text-white font-black text-sm tracking-widest uppercase">EV Empire Admin</span>
      </div>
    </header>
  )
}
