'use client'

import { useContactModal, type ModalVariant } from './ContactModalProvider'
import type { ReactNode } from 'react'

export default function ModalTriggerButton({
  variant,
  className,
  children,
}: {
  variant: ModalVariant
  className?: string
  children: ReactNode
}) {
  const { open } = useContactModal()
  return (
    <button type="button" className={className} onClick={() => open(variant)}>
      {children}
    </button>
  )
}
