import { loadStripe, Stripe as ClientStripe } from '@stripe/stripe-js'
import Stripe from 'stripe'

// Client-side Stripe
let stripePromise: Promise<ClientStripe | null>

export function getStripe(): Promise<ClientStripe | null> {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  }
  return stripePromise
}

// Server-side Stripe
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
})

