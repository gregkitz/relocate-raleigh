'use server'

import { Resend } from 'resend'
import { z } from 'zod'

const DEST = 'team@relocateraleigh.com'
const FROM = 'Relocate Raleigh <team@relocateraleigh.com>'

const guideSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.email('Please enter a valid email'),
  origin: z.string().max(100).optional(),
})

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.email('Please enter a valid email'),
  message: z.string().min(1, 'Message is required').max(5000),
  timeline: z.string().max(50).optional(),
})

export type FormState = {
  ok: boolean
  message?: string
  fieldErrors?: Record<string, string[] | undefined>
}

const initialStateOk = (message: string): FormState => ({ ok: true, message })
const initialStateErr = (message: string): FormState => ({ ok: false, message })

function getClient() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY is not set')
  return new Resend(key)
}

export async function submitGuideRequest(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = guideSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    origin: formData.get('origin') || undefined,
  })

  if (!parsed.success) {
    return {
      ok: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const { name, email, origin } = parsed.data
  const resend = getClient()

  try {
    await resend.emails.send({
      from: FROM,
      to: DEST,
      replyTo: email,
      subject: `New guide request: ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        origin ? `Moving from: ${origin}` : null,
      ]
        .filter(Boolean)
        .join('\n'),
    })

    // PDF delivery is stubbed until the guide is finalized — send a
    // confirmation so the visitor knows the request landed.
    await resend.emails.send({
      from: FROM,
      to: email,
      replyTo: DEST,
      subject: 'Your Relocate Raleigh Guide is on the way',
      text:
        `Hi ${name},\n\n` +
        `Thanks for requesting the Relocate Raleigh Guide. We're putting the ` +
        `finishing touches on the latest edition and will email you the PDF ` +
        `within the next few days.\n\n` +
        `In the meantime, reply to this email with any questions about the ` +
        `move — we read every response.\n\n` +
        `— The Relocate Raleigh team`,
    })

    return initialStateOk("Check your inbox — we just sent you a confirmation.")
  } catch (err) {
    console.error('submitGuideRequest failed:', err)
    return initialStateErr('Something went wrong sending your request. Please try again.')
  }
}

export async function submitContactMessage(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    timeline: formData.get('timeline') || undefined,
  })

  if (!parsed.success) {
    return {
      ok: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const { name, email, message, timeline } = parsed.data
  const resend = getClient()

  try {
    await resend.emails.send({
      from: FROM,
      to: DEST,
      replyTo: email,
      subject: `New contact: ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        timeline ? `Timeline: ${timeline}` : null,
        '',
        'Message:',
        message,
      ]
        .filter((l) => l !== null)
        .join('\n'),
    })

    return initialStateOk('Thanks — Nick will reply within a day or two.')
  } catch (err) {
    console.error('submitContactMessage failed:', err)
    return initialStateErr('Something went wrong sending your message. Please try again.')
  }
}
