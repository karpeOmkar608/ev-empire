'use client'

import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Send, CheckCircle, AlertCircle, ChevronDown } from 'lucide-react'
import { enquirySchema, type EnquirySchemaType } from '@/lib/validation'
import { ALL_SCOOTER_MODELS } from '@/data/products'

interface EnquiryFormProps {
  defaultModel?: string
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export default function EnquiryForm({ defaultModel }: EnquiryFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquirySchemaType>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      selectedScooter: defaultModel || '',
      preferredContact: 'phone',
    },
  })

  const onSubmit = useCallback(async (data: EnquirySchemaType) => {
    // Honeypot check
    if (data.honeypot) return

    setStatus('loading')
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        setStatus('success')
        reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }, [reset])

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-emerald-400" />
        </div>
        <h3 className="text-white text-2xl font-bold mb-3">Enquiry Sent!</h3>
        <p className="text-slate-300 text-base max-w-md leading-relaxed mb-8">
          Thank you! Your enquiry has been received. Our team will contact you shortly.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="px-6 py-3 text-sm font-semibold text-sky-300 border border-sky-500/30 rounded-xl hover:bg-sky-500/10 transition-all"
        >
          Send Another Enquiry
        </button>
      </div>
    )
  }

  const inputClass =
    'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-sky-500/60 focus:bg-sky-500/5 transition-all duration-200'
  const labelClass = 'block text-slate-300 text-sm font-medium mb-2'
  const errorClass = 'mt-1.5 text-red-400 text-xs flex items-center gap-1'

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Customer Enquiry Form"
      className="relative"
    >
      {/* Honeypot — hidden from real users, uses position:absolute relative to form */}
      <div aria-hidden="true" className="absolute opacity-0 pointer-events-none h-0 overflow-hidden">
        <input
          {...register('honeypot')}
          tabIndex={-1}
          autoComplete="off"
          type="text"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {/* Full Name — full width on mobile, half-width on sm+ */}
        <div className="sm:col-span-1">
          <label htmlFor="fullName" className={labelClass}>
            Full Name <span className="text-sky-400">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Your full name"
            autoComplete="name"
            {...register('fullName')}
            className={inputClass}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          />
          {errors.fullName && (
            <p id="fullName-error" className={errorClass} role="alert">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Mobile Number */}
        <div>
          <label htmlFor="mobileNumber" className={labelClass}>
            Mobile Number <span className="text-sky-400">*</span>
          </label>
          <input
            id="mobileNumber"
            type="tel"
            placeholder="10-digit Indian mobile"
            autoComplete="tel"
            inputMode="numeric"
            maxLength={10}
            {...register('mobileNumber')}
            className={inputClass}
            aria-invalid={!!errors.mobileNumber}
            aria-describedby={errors.mobileNumber ? 'mobile-error' : undefined}
          />
          {errors.mobileNumber && (
            <p id="mobile-error" className={errorClass} role="alert">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.mobileNumber.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={labelClass}>
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="your@email.com (optional)"
            autoComplete="email"
            {...register('email')}
            className={inputClass}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className={errorClass} role="alert">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className={labelClass}>
            City
          </label>
          <input
            id="city"
            type="text"
            placeholder="Your city (optional)"
            autoComplete="address-level2"
            {...register('city')}
            className={inputClass}
          />
        </div>

        {/* Select Scooter */}
        <div>
          <label htmlFor="selectedScooter" className={labelClass}>
            Select Scooter <span className="text-sky-400">*</span>
          </label>
          <div className="relative">
            <select
              id="selectedScooter"
              {...register('selectedScooter')}
              className={`${inputClass} appearance-none pr-10 cursor-pointer`}
              aria-invalid={!!errors.selectedScooter}
              aria-describedby={errors.selectedScooter ? 'scooter-error' : undefined}
            >
              <option value="" disabled>
                Choose a model...
              </option>
              {ALL_SCOOTER_MODELS.map((model) => (
                <option key={model} value={model} className="bg-[#0f1c35]">
                  {model}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
          {errors.selectedScooter && (
            <p id="scooter-error" className={errorClass} role="alert">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.selectedScooter.message}
            </p>
          )}
        </div>

        {/* Preferred Contact */}
        <div>
          <fieldset>
            <legend className={labelClass}>Preferred Contact Method</legend>
            <div className="flex gap-3">
              {(['phone', 'whatsapp', 'email'] as const).map((method) => (
                <label
                  key={method}
                  className="flex-1 cursor-pointer"
                >
                  <input
                    type="radio"
                    value={method}
                    {...register('preferredContact')}
                    className="sr-only peer"
                  />
                  <div className="flex items-center justify-center py-2.5 px-3 rounded-xl border border-white/10 text-slate-400 text-xs font-medium capitalize transition-all duration-200 peer-checked:border-sky-500/60 peer-checked:text-sky-300 peer-checked:bg-sky-500/10 hover:border-white/20">
                    {method}
                  </div>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClass}>
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="Any questions or additional information... (optional)"
            {...register('message')}
            className={`${inputClass} resize-none`}
            aria-invalid={!!errors.message}
          />
          {errors.message && (
            <p className={errorClass} role="alert">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.message.message}
            </p>
          )}
        </div>
      </div>

      {/* Error message */}
      {status === 'error' && (
        <div
          className="mt-5 flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
          role="alert"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          Something went wrong. Please try again or contact us directly.
        </div>
      )}

      {/* Submit */}
      <div className="mt-7">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-10 py-4 text-base font-bold text-white bg-gradient-to-r from-sky-500 to-blue-700 rounded-xl hover:from-sky-400 hover:to-blue-600 transition-all duration-200 shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          aria-disabled={status === 'loading'}
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending enquiry...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Enquiry
            </>
          )}
        </button>
      </div>
    </form>
  )
}
