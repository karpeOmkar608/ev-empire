import { redirect } from 'next/navigation'
import { getSessionFromCookies } from '@/lib/admin-auth'
import AdminShell from '@/components/admin/AdminShell'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSessionFromCookies()

  if (!session) {
    redirect('/admin/login')
  }

  return <AdminShell email={session.email}>{children}</AdminShell>
}
