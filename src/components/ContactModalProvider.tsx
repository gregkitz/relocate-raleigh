'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import ContactModal from './ContactModal'

export type ModalVariant = 'guide' | 'contact'

type Ctx = {
  open: (variant: ModalVariant) => void
  close: () => void
}

const ModalCtx = createContext<Ctx | null>(null)

export function useContactModal() {
  const ctx = useContext(ModalCtx)
  if (!ctx) throw new Error('useContactModal must be used inside <ContactModalProvider>')
  return ctx
}

export default function ContactModalProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<ModalVariant | null>(null)

  return (
    <ModalCtx.Provider
      value={{
        open: (v) => setVariant(v),
        close: () => setVariant(null),
      }}
    >
      {children}
      {variant && <ContactModal variant={variant} onClose={() => setVariant(null)} />}
    </ModalCtx.Provider>
  )
}
