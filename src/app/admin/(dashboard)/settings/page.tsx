import type { Metadata } from 'next'
import { Settings, Database, GitBranch, Shield, Mail } from 'lucide-react'
import fs from 'fs'
import path from 'path'
import type { Product } from '@/types/product'

export const metadata: Metadata = { title: 'Settings' }

function getProductCount(): { total: number; active: number } {
  try {
    const filePath = path.join(process.cwd(), 'data', 'products.json')
    const raw = fs.readFileSync(filePath, 'utf-8')
    const products: Product[] = JSON.parse(raw)
    return { total: products.length, active: products.filter(p => p.active).length }
  } catch {
    return { total: 0, active: 0 }
  }
}

function InfoRow({ label, value, code }: { label: string; value: string; code?: boolean }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
      <span className="text-slate-400 text-sm">{label}</span>
      {code ? (
        <code className="text-sky-300 bg-sky-500/10 px-2 py-0.5 rounded text-xs font-mono">{value}</code>
      ) : (
        <span className="text-white text-sm font-medium">{value}</span>
      )}
    </div>
  )
}

export default function AdminSettingsPage() {
  const { total, active } = getProductCount()
  const githubConfigured = !!(process.env.GITHUB_TOKEN && process.env.GITHUB_OWNER && process.env.GITHUB_REPO)

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Settings</h1>
        <p className="text-slate-400 text-sm mt-0.5">Configuration and system information</p>
      </div>

      {/* Data Source */}
      <div className="bg-[#0d1629] border border-white/5 rounded-2xl p-6">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-1.5 rounded-lg bg-sky-500/10">
            <Database className="w-4 h-4 text-sky-400" />
          </div>
          <h2 className="text-white font-bold">Data Source</h2>
        </div>
        <InfoRow label="Product File" value="data/products.json" code />
        <InfoRow label="Total Products" value={String(total)} />
        <InfoRow label="Active Products" value={String(active)} />
        <InfoRow
          label="Storage Mode"
          value={githubConfigured ? 'GitHub-backed JSON' : 'Local file only'}
        />
      </div>

      {/* GitHub Configuration */}
      <div className="bg-[#0d1629] border border-white/5 rounded-2xl p-6">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-1.5 rounded-lg bg-violet-500/10">
            <GitBranch className="w-4 h-4 text-violet-400" />
          </div>
          <h2 className="text-white font-bold">GitHub Integration</h2>
          <span className={`ml-auto px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
            githubConfigured
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
              : 'bg-slate-500/15 text-slate-400 border border-slate-500/20'
          }`}>
            {githubConfigured ? 'Configured' : 'Not configured'}
          </span>
        </div>
        <InfoRow
          label="GITHUB_OWNER"
          value={process.env.GITHUB_OWNER ? '✓ Set' : '✗ Not set'}
        />
        <InfoRow
          label="GITHUB_REPO"
          value={process.env.GITHUB_REPO ? '✓ Set' : '✗ Not set'}
        />
        <InfoRow
          label="GITHUB_BRANCH"
          value={process.env.GITHUB_BRANCH ?? 'main (default)'}
        />
        <InfoRow
          label="GITHUB_TOKEN"
          value={process.env.GITHUB_TOKEN ? '✓ Set (hidden)' : '✗ Not set'}
        />
        {!githubConfigured && (
          <div className="mt-4 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm">
            <strong>Note:</strong> GitHub is not configured. Product changes are saved to local <code className="font-mono text-xs bg-amber-500/10 px-1 rounded">data/products.json</code> only. Configure <code className="font-mono text-xs">GITHUB_TOKEN</code>, <code className="font-mono text-xs">GITHUB_OWNER</code>, and <code className="font-mono text-xs">GITHUB_REPO</code> in your environment variables to enable automatic Git commits.
          </div>
        )}
      </div>

      {/* Admin Auth */}
      <div className="bg-[#0d1629] border border-white/5 rounded-2xl p-6">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-1.5 rounded-lg bg-emerald-500/10">
            <Shield className="w-4 h-4 text-emerald-400" />
          </div>
          <h2 className="text-white font-bold">Authentication</h2>
        </div>
        <InfoRow label="Method" value="JWT / HTTP-only cookie" />
        <InfoRow label="Session Duration" value="8 hours" />
        <InfoRow
          label="ADMIN_EMAIL"
          value={process.env.ADMIN_EMAIL ? '✓ Set' : '✗ Not set'}
        />
        <InfoRow
          label="ADMIN_PASSWORD"
          value={process.env.ADMIN_PASSWORD ? '✓ Set (hidden)' : '✗ Not set'}
        />
        <InfoRow
          label="ADMIN_JWT_SECRET"
          value={process.env.ADMIN_JWT_SECRET ? '✓ Set (hidden)' : '✗ Not set'}
        />
        <p className="text-slate-500 text-xs mt-4">
          To change credentials, update the environment variables in your <code className="font-mono bg-slate-800 px-1 rounded">.env.local</code> file. Never change these from the dashboard.
        </p>
      </div>

      {/* Email */}
      <div className="bg-[#0d1629] border border-white/5 rounded-2xl p-6">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-1.5 rounded-lg bg-amber-500/10">
            <Mail className="w-4 h-4 text-amber-400" />
          </div>
          <h2 className="text-white font-bold">Email & Notifications</h2>
        </div>
        <InfoRow label="SMTP Host" value={process.env.SMTP_HOST ?? 'Not configured'} />
        <InfoRow label="Owner Email" value={process.env.OWNER_EMAIL ?? 'Not configured'} />
      </div>

      {/* Environment vars guide */}
      <div className="bg-[#0d1629]/50 border border-white/5 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Settings className="w-4 h-4 text-slate-400" />
          <h3 className="text-white font-bold text-sm">Required Environment Variables</h3>
        </div>
        <pre className="text-xs text-slate-400 font-mono leading-relaxed bg-[#0a1422] rounded-xl p-4 overflow-x-auto">{`# Admin Auth
ADMIN_EMAIL=admin@evempire.in
ADMIN_PASSWORD=your-secure-password
ADMIN_JWT_SECRET=your-random-secret-min-32-chars

# GitHub Integration (for auto-commits)
GITHUB_TOKEN=ghp_xxxxxxxxxxxx
GITHUB_OWNER=your-github-username
GITHUB_REPO=ev-empire
GITHUB_BRANCH=main`}</pre>
      </div>
    </div>
  )
}
