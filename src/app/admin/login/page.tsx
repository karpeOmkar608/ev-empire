'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Zap, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react'
import { Suspense } from 'react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from') ?? '/admin'
  const expired = searchParams.get('expired') === '1'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(expired ? 'Your session has expired. Please sign in again.' : '')

  // If already logged in, redirect
  useEffect(() => {
    fetch('/api/admin/auth/me').then(res => {
      if (res.ok) router.replace('/admin')
    })
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (res.ok) {
        router.push(from)
        router.refresh()
      } else {
        setError('Invalid credentials. Please try again.')
        setPassword('')
      }
    } catch {
      setError('Unable to connect. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#060b16] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-sky-600/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-800/8 blur-[80px] rounded-full" />
      </div>

      {/* Floating dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-sky-500/30 animate-float"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 1.2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-[420px]">
        {/* Card */}
        <div className="bg-[#0d1629]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/40">

          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 shadow-xl shadow-sky-500/25 mb-4">
              <Zap className="w-8 h-8 text-white fill-white" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-widest uppercase">EV Empire</h1>
            <p className="text-sky-400 text-sm font-semibold tracking-widest uppercase mt-1">Admin Portal</p>
          </div>

          {/* Error state */}
          {error && (
            <div className="flex items-start gap-2.5 px-4 py-3 mb-5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <label htmlFor="admin-email" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@evempire.in"
                autoComplete="email"
                required
                disabled={loading}
                className="w-full px-4 py-3 bg-[#0a1422] border border-white/10 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/50 transition-all disabled:opacity-50"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="admin-password" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 pr-11 bg-[#0a1422] border border-white/10 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/50 transition-all disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1"
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 rounded-xl transition-all shadow-xl shadow-sky-500/20 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-600 text-xs mt-5">
          Protected area. Authorised personnel only.
        </p>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#060b16]" />}>
      <LoginForm />
    </Suspense>
  )
}
