import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'EV Empire Admin',
    template: '%s | EV Empire Admin',
  },
  robots: { index: false, follow: false },
}

// Top-level admin layout — just a pass-through shell.
// Auth is enforced at the (dashboard) route group level.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
