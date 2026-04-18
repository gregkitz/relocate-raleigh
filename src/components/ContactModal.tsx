'use client'

import { useActionState, useEffect } from 'react'
import {
  submitGuideRequest,
  submitContactMessage,
  type FormState,
} from '@/lib/actions'
import type { ModalVariant } from './ContactModalProvider'

const initialState: FormState = { ok: false }

export default function ContactModal({
  variant,
  onClose,
}: {
  variant: ModalVariant
  onClose: () => void
}) {
  const action = variant === 'guide' ? submitGuideRequest : submitContactMessage
  const [state, formAction, pending] = useActionState(action, initialState)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const title = variant === 'guide' ? 'Get the Relocation Guide' : 'Get In Touch with Nick'
  const subtitle =
    variant === 'guide'
      ? "We'll email you the PDF. No spam — unsubscribe anytime."
      : "Tell Nick a bit about what you're planning. He'll reply within a day or two."

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6 gap-6">
          <div>
            <h3 id="contact-modal-title" className="text-2xl font-black text-white tracking-tight">
              {title}
            </h3>
            <p className="text-sm text-zinc-500 mt-2 font-medium">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors text-xl shrink-0"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {state.ok ? (
          <div className="py-10 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 text-3xl">
              ✓
            </div>
            <p className="text-white font-bold text-lg mb-2">Got it.</p>
            <p className="text-zinc-500 text-sm mb-8">{state.message}</p>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition-all"
            >
              Close
            </button>
          </div>
        ) : (
          <form action={formAction} className="space-y-4">
            <Field
              label="Your name"
              name="name"
              type="text"
              required
              errors={state.fieldErrors?.name}
            />
            <Field
              label="Email"
              name="email"
              type="email"
              required
              errors={state.fieldErrors?.email}
            />

            {variant === 'guide' ? (
              <Field
                label="Where are you moving from? (optional)"
                name="origin"
                type="text"
                placeholder="e.g. San Francisco, Seattle, NYC"
              />
            ) : (
              <>
                <SelectField
                  label="Timeline"
                  name="timeline"
                  options={[
                    { value: '', label: 'When are you hoping to move?' },
                    { value: 'exploring', label: 'Just exploring' },
                    { value: '3-6mo', label: 'Planning in 3–6 months' },
                    { value: 'actively', label: 'Actively looking' },
                  ]}
                />
                <TextareaField
                  label="Message"
                  name="message"
                  required
                  rows={5}
                  errors={state.fieldErrors?.message}
                />
              </>
            )}

            {state.message && !state.ok && (
              <p className="text-red-400 text-sm font-medium" aria-live="polite">
                {state.message}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full px-8 py-4 bg-blue-600 text-white rounded-full font-black hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {pending
                ? 'Sending...'
                : variant === 'guide'
                  ? 'Send me the guide'
                  : 'Send message'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

const fieldClass =
  'w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-colors'

function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
  errors,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  placeholder?: string
  errors?: string[]
}) {
  return (
    <label className="block">
      <span className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={fieldClass}
      />
      {errors?.[0] && <span className="block text-red-400 text-xs mt-1.5">{errors[0]}</span>}
    </label>
  )
}

function TextareaField({
  label,
  name,
  required,
  rows,
  errors,
}: {
  label: string
  name: string
  required?: boolean
  rows?: number
  errors?: string[]
}) {
  return (
    <label className="block">
      <span className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
        {label}
      </span>
      <textarea name={name} required={required} rows={rows} className={fieldClass} />
      {errors?.[0] && <span className="block text-red-400 text-xs mt-1.5">{errors[0]}</span>}
    </label>
  )
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string
  name: string
  options: { value: string; label: string }[]
}) {
  return (
    <label className="block">
      <span className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
        {label}
      </span>
      <select name={name} defaultValue="" className={fieldClass}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}
