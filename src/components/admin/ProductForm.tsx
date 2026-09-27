'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Product } from '@/types/product'
import {
  Save,
  Loader2,
  Plus,
  Trash2,
  Info,
  Image as ImageIcon,
  Tag,
  Settings2,
  Star,
  Eye,
} from 'lucide-react'

const PRODUCT_FAMILIES = [
  { value: 'empire-prime', label: 'Empire Prime', series: 'Single Light Series' },
  { value: 'empire-duo', label: 'Empire Duo', series: 'Double Light Series' },
  { value: 'empire-family', label: 'Empire Family', series: 'Activa Type Series' },
  { value: 'empire-classic', label: 'Empire Classic', series: 'Chetak Type Series' },
]

type FormProduct = Omit<Product, 'createdAt' | 'updatedAt'>

interface ProductFormProps {
  initialData?: Partial<FormProduct>
  mode: 'create' | 'edit'
  productId?: string
  onSuccess?: (product: Product) => void
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

interface FieldProps {
  label: string
  required?: boolean
  hint?: string
  children: React.ReactNode
}

function Field({ label, required, hint, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-slate-300">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  )
}

const inputCls = `w-full px-3.5 py-2.5 bg-[#0a1422] border border-white/10 rounded-xl text-sm text-white placeholder-slate-600
  focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all`

const selectCls = `${inputCls} appearance-none`

function SectionHeader({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2.5 pb-3 border-b border-white/5 mb-5">
      <div className="p-1.5 rounded-lg bg-sky-500/10">
        <Icon className="w-4 h-4 text-sky-400" />
      </div>
      <h2 className="text-white font-bold text-base">{title}</h2>
    </div>
  )
}

export default function ProductForm({ initialData, mode, productId, onSuccess }: ProductFormProps) {
  const router = useRouter()

  const [form, setForm] = useState<FormProduct>({
    id: initialData?.id ?? '',
    slug: initialData?.slug ?? '',
    model: initialData?.model ?? '',
    family: initialData?.family ?? 'empire-prime',
    familyName: initialData?.familyName ?? 'Empire Prime',
    series: initialData?.series ?? 'Single Light Series',
    seriesLabel: initialData?.seriesLabel ?? 'SINGLE LIGHT SERIES',
    price: initialData?.price ?? 0,
    shortDescription: initialData?.shortDescription ?? '',
    description: initialData?.description ?? '',
    controller: initialData?.controller ?? '',
    brake: initialData?.brake ?? '',
    chargerType: initialData?.chargerType ?? '',
    chargingTime: initialData?.chargingTime ?? '',
    battery: initialData?.battery ?? '',
    range: initialData?.range ?? '',
    maxSpeed: initialData?.maxSpeed ?? '',
    dimension: initialData?.dimension ?? '',
    loadingCapacity: initialData?.loadingCapacity ?? '',
    bodyType: initialData?.bodyType ?? '',
    image: initialData?.image ?? '',
    badge: initialData?.badge ?? null,
    features: initialData?.features ?? [],
    active: initialData?.active ?? true,
    featured: initialData?.featured ?? false,
  })

  const [newFeature, setNewFeature] = useState('')
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [globalError, setGlobalError] = useState('')

  const set = <K extends keyof FormProduct>(key: K, value: FormProduct[K]) => {
    setForm(prev => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: '' }))
  }

  const handleModelChange = (model: string) => {
    set('model', model)
    if (mode === 'create') {
      const slug = slugify(model)
      set('slug', slug)
      set('id', slug)
    }
  }

  const handleFamilyChange = (familyValue: string) => {
    const family = PRODUCT_FAMILIES.find(f => f.value === familyValue)
    if (!family) return
    set('family', family.value)
    set('familyName', family.label)
    set('series', family.series)
    set('seriesLabel', family.series.toUpperCase())
  }

  const addFeature = () => {
    const trimmed = newFeature.trim()
    if (!trimmed || form.features?.includes(trimmed)) return
    set('features', [...(form.features ?? []), trimmed])
    setNewFeature('')
  }

  const removeFeature = (feat: string) => {
    set('features', (form.features ?? []).filter(f => f !== feat))
  }

  const validate = (): boolean => {
    const errs: Record<string, string> = {}
    if (!form.model.trim()) errs.model = 'Model name is required'
    if (!form.slug.trim()) errs.slug = 'Slug is required'
    if (!/^[a-z0-9-]+$/.test(form.slug)) errs.slug = 'Slug must be lowercase, numbers and hyphens only'
    if (!form.id.trim()) errs.id = 'ID is required'
    if (!form.family) errs.family = 'Product family is required'
    if (!form.price || form.price <= 0) errs.price = 'Enter a valid price'
    if (!form.controller.trim()) errs.controller = 'Controller is required'
    if (!form.battery.trim()) errs.battery = 'Battery type is required'
    if (!form.range.trim()) errs.range = 'Range is required'
    if (!form.maxSpeed.trim()) errs.maxSpeed = 'Max speed is required'
    if (!form.image.trim()) errs.image = 'Image path is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSaving(true)
    setGlobalError('')

    try {
      const url =
        mode === 'create'
          ? '/api/admin/products'
          : `/api/admin/products/${productId}`

      const response = await fetch(url, {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.details) {
          const errs: Record<string, string> = {}
          for (const [key, msgs] of Object.entries(data.details)) {
            errs[key] = (msgs as string[])[0] ?? 'Invalid'
          }
          setErrors(errs)
        } else {
          setGlobalError(data.error ?? 'Unable to save changes. Please try again.')
        }
        return
      }

      onSuccess?.(data.product)

      if (mode === 'create') {
        router.push('/admin/products')
      }
    } catch {
      setGlobalError('Unable to save changes. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>

      {globalError && (
        <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          <Info className="w-4 h-4 mt-0.5 shrink-0" />
          {globalError}
        </div>
      )}

      {/* ── BASIC INFORMATION ─────────────────────────────── */}
      <div className="bg-[#0d1629] border border-white/5 rounded-2xl p-6">
        <SectionHeader icon={Tag} title="Basic Information" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Model Name" required>
            <input
              id="model"
              type="text"
              value={form.model}
              onChange={e => handleModelChange(e.target.value)}
              placeholder="e.g. EP50"
              className={`${inputCls} ${errors.model ? 'border-red-500/50 ring-1 ring-red-500/30' : ''}`}
            />
            {errors.model && <p className="text-xs text-red-400 mt-1">{errors.model}</p>}
          </Field>

          <Field label="Slug" required hint="URL-safe identifier. Auto-generated from model name.">
            <input
              id="slug"
              type="text"
              value={form.slug}
              onChange={e => { set('slug', e.target.value); if (mode === 'create') set('id', e.target.value) }}
              placeholder="e.g. ep50"
              className={`${inputCls} ${errors.slug ? 'border-red-500/50 ring-1 ring-red-500/30' : ''}`}
            />
            {errors.slug && <p className="text-xs text-red-400 mt-1">{errors.slug}</p>}
          </Field>

          <Field label="Product Family" required>
            <select
              id="family"
              value={form.family}
              onChange={e => handleFamilyChange(e.target.value)}
              className={selectCls}
            >
              {PRODUCT_FAMILIES.map(f => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
              <option value="custom">Custom Family…</option>
            </select>
          </Field>

          {form.family === 'custom' && (
            <Field label="Custom Family Name" required>
              <input
                type="text"
                value={form.familyName}
                onChange={e => set('familyName', e.target.value)}
                placeholder="e.g. Empire Sport"
                className={inputCls}
              />
            </Field>
          )}

          <Field label="Series Name" required>
            <input
              type="text"
              value={form.series}
              onChange={e => { set('series', e.target.value); set('seriesLabel', e.target.value.toUpperCase()) }}
              placeholder="e.g. Single Light Series"
              className={inputCls}
            />
          </Field>

          <Field label="Price (₹)" required>
            <input
              id="price"
              type="number"
              value={form.price || ''}
              onChange={e => set('price', parseFloat(e.target.value) || 0)}
              placeholder="e.g. 47990"
              min={0}
              className={`${inputCls} ${errors.price ? 'border-red-500/50 ring-1 ring-red-500/30' : ''}`}
            />
            {errors.price && <p className="text-xs text-red-400 mt-1">{errors.price}</p>}
          </Field>

          <Field label="Badge" hint="Optional highlight label (e.g. Most Popular, Best Value)">
            <input
              type="text"
              value={form.badge ?? ''}
              onChange={e => set('badge', e.target.value || null)}
              placeholder="e.g. Most Popular"
              className={inputCls}
            />
          </Field>
        </div>

        <div className="mt-5 space-y-4">
          <Field label="Short Description" hint="One sentence shown on product card (max 300 chars)">
            <input
              type="text"
              value={form.shortDescription ?? ''}
              onChange={e => set('shortDescription', e.target.value)}
              placeholder="e.g. Mid-range 60V scooter with 50–60 KM range"
              maxLength={300}
              className={inputCls}
            />
          </Field>
          <Field label="Full Description">
            <textarea
              value={form.description ?? ''}
              onChange={e => set('description', e.target.value)}
              placeholder="Detailed product description…"
              rows={4}
              maxLength={2000}
              className={`${inputCls} resize-none`}
            />
          </Field>
        </div>
      </div>

      {/* ── SPECIFICATIONS ────────────────────────────────── */}
      <div className="bg-[#0d1629] border border-white/5 rounded-2xl p-6">
        <SectionHeader icon={Settings2} title="Specifications" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {([
            { key: 'controller' as const, label: 'Controller', placeholder: 'e.g. 72V', required: true as boolean },
            { key: 'brake' as const, label: 'Brake', placeholder: 'e.g. Disc & Drum', required: false as boolean },
            { key: 'chargerType' as const, label: 'Charger Type', placeholder: 'e.g. 4AMP LED', required: false as boolean },
            { key: 'chargingTime' as const, label: 'Charging Time', placeholder: 'e.g. Lead 8–9 Hours', required: false as boolean },
            { key: 'battery' as const, label: 'Battery', placeholder: 'e.g. Lead', required: true as boolean },
            { key: 'range' as const, label: 'Range', placeholder: 'e.g. 50–60 KM', required: true as boolean },
            { key: 'maxSpeed' as const, label: 'Maximum Speed', placeholder: 'e.g. 25 KM/H', required: true as boolean },
            { key: 'dimension' as const, label: 'Dimensions', placeholder: 'e.g. 1371.6 × 1879.6 × 711.2 mm', required: false as boolean },
            { key: 'loadingCapacity' as const, label: 'Loading Capacity', placeholder: 'e.g. 160 KG', required: false as boolean },
            { key: 'bodyType' as const, label: 'Body Type', placeholder: 'e.g. ABS Plastic', required: false as boolean },
          ]).map(({ key, label, placeholder, required }) => (
            <Field key={key} label={label} required={required}>
              <input
                type="text"
                value={form[key] as string ?? ''}
                onChange={e => set(key, e.target.value)}
                placeholder={placeholder}
                className={`${inputCls} ${errors[key] ? 'border-red-500/50 ring-1 ring-red-500/30' : ''}`}
              />
              {errors[key] && <p className="text-xs text-red-400 mt-1">{errors[key]}</p>}
            </Field>
          ))}
        </div>
      </div>

      {/* ── FEATURES ──────────────────────────────────────── */}
      <div className="bg-[#0d1629] border border-white/5 rounded-2xl p-6">
        <SectionHeader icon={Star} title="Product Features" />
        <div className="flex flex-wrap gap-2 mb-4">
          {(form.features ?? []).map(feat => (
            <span key={feat} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-300 text-sm font-medium">
              {feat}
              <button
                type="button"
                onClick={() => removeFeature(feat)}
                className="text-sky-400/60 hover:text-red-400 transition-colors"
                aria-label={`Remove ${feat}`}
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </span>
          ))}
          {(form.features ?? []).length === 0 && (
            <p className="text-slate-500 text-sm">No features added yet.</p>
          )}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newFeature}
            onChange={e => setNewFeature(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addFeature() } }}
            placeholder="e.g. Long Range"
            className={`${inputCls} flex-1`}
          />
          <button
            type="button"
            onClick={addFeature}
            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-xl transition-all shrink-0"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>

      {/* ── IMAGE ─────────────────────────────────────────── */}
      <div className="bg-[#0d1629] border border-white/5 rounded-2xl p-6">
        <SectionHeader icon={ImageIcon} title="Product Image" />
        <Field
          label="Image Path"
          required
          hint="Path relative to /public directory. Images must be placed in /public/images/. e.g. /images/ep50.webp"
        >
          <input
            id="image"
            type="text"
            value={form.image}
            onChange={e => set('image', e.target.value)}
            placeholder="/images/ep50.webp"
            className={`${inputCls} ${errors.image ? 'border-red-500/50 ring-1 ring-red-500/30' : ''}`}
          />
          {errors.image && <p className="text-xs text-red-400 mt-1">{errors.image}</p>}
        </Field>
        {form.image && (
          <div className="mt-4 relative w-32 h-32 rounded-xl bg-[#0a1422] border border-white/5 overflow-hidden flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={form.image.replace('.webp', '.png')}
              alt="Preview"
              className="object-contain w-full h-full p-2"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
            <p className="absolute bottom-1 text-[9px] text-slate-500 text-center w-full px-1 truncate">Preview</p>
          </div>
        )}
      </div>

      {/* ── VISIBILITY ────────────────────────────────────── */}
      <div className="bg-[#0d1629] border border-white/5 rounded-2xl p-6">
        <SectionHeader icon={Eye} title="Visibility & Status" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-300">Status</label>
            <div className="flex gap-3">
              {[
                { value: true, label: 'Active', desc: 'Visible on public site', color: 'emerald' },
                { value: false, label: 'Inactive', desc: 'Hidden from public site', color: 'slate' },
              ].map(opt => (
                <button
                  key={String(opt.value)}
                  type="button"
                  onClick={() => set('active', opt.value)}
                  className={`flex-1 px-4 py-3 rounded-xl border text-sm font-semibold transition-all text-left ${
                    form.active === opt.value
                      ? opt.color === 'emerald'
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                        : 'bg-slate-500/15 border-slate-500/40 text-slate-300'
                      : 'bg-white/3 border-white/10 text-slate-500 hover:border-white/20'
                  }`}
                >
                  <span className="block font-bold">{opt.label}</span>
                  <span className="block text-[11px] font-normal opacity-70 mt-0.5">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-300">Featured</label>
            <div className="flex gap-3">
              {[
                { value: true, label: 'Yes', desc: 'Highlighted product' },
                { value: false, label: 'No', desc: 'Standard listing' },
              ].map(opt => (
                <button
                  key={String(opt.value)}
                  type="button"
                  onClick={() => set('featured', opt.value)}
                  className={`flex-1 px-4 py-3 rounded-xl border text-sm font-semibold transition-all text-left ${
                    form.featured === opt.value
                      ? 'bg-amber-500/15 border-amber-500/40 text-amber-400'
                      : 'bg-white/3 border-white/10 text-slate-500 hover:border-white/20'
                  }`}
                >
                  <span className="block font-bold">{opt.label}</span>
                  <span className="block text-[11px] font-normal opacity-70 mt-0.5">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── SUBMIT ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 text-sm font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center justify-center gap-2 px-8 py-3 text-sm font-bold text-white bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 rounded-xl transition-all shadow-lg shadow-sky-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
          ) : (
            <><Save className="w-4 h-4" /> {mode === 'create' ? 'Create Product' : 'Save Changes'}</>
          )}
        </button>
      </div>
    </form>
  )
}
