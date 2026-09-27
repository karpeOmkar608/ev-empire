'use client'

import { useEffect, useRef } from 'react'
import { AlertTriangle, X } from 'lucide-react'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  destructive?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) {
      cancelRef.current?.focus()
      // Prevent body scroll
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onCancel()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div className="relative w-full max-w-md bg-[#0d1629] border border-white/10 rounded-2xl shadow-2xl p-6 animate-slide-up">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4 mb-5">
          <div className={`p-2.5 rounded-xl ${destructive ? 'bg-red-500/15' : 'bg-amber-500/15'}`}>
            <AlertTriangle className={`w-5 h-5 ${destructive ? 'text-red-400' : 'text-amber-400'}`} />
          </div>
          <div>
            <h2 id="dialog-title" className="text-white font-bold text-lg leading-tight mb-1">
              {title}
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            ref={cancelRef}
            onClick={onCancel}
            className="px-4 py-2 text-sm font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-bold text-white rounded-xl transition-all ${
              destructive
                ? 'bg-red-600 hover:bg-red-500 shadow-lg shadow-red-500/20'
                : 'bg-sky-600 hover:bg-sky-500 shadow-lg shadow-sky-500/20'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
