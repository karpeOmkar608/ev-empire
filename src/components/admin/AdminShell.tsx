'use client'

import { useState } from 'react'
import AdminSidebar, { AdminMobileHeader } from '@/components/admin/AdminSidebar'
import { ToastContainer, useToast } from '@/components/admin/Toast'

export default function AdminShell({
  email,
  children,
}: {
  email: string
  children: React.ReactNode
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { toasts, addToast, dismiss } = useToast()

  return (
    <div className="flex h-screen bg-[#060b16] text-white overflow-hidden" id="admin-shell">
      <AdminSidebar
        email={email}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminMobileHeader onMenuOpen={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          {/* Inject addToast via context or prop-drilling avoided — 
              child pages call the admin API directly and show their own toasts.
              This shell is the toast renderer. */}
          {children}
        </main>
      </div>

      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </div>
  )
}
