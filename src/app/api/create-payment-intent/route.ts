import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function POST(req: Request) {
  try {
    const { amount, carId, customerEmail, metadata } = await req.json()

    if (!amount || amount < 50) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      // Stripe works in cents
      amount: Math.round(amount * 100),
      currency: 'usd',
      receipt_email: customerEmail,
      metadata: {
        carId,
        platform: 'unique-elite',
        ...metadata,
      },
      // Capture manually after booking confirmation so you can verify
      // availability before charging the card
      capture_method: 'manual',
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (err) {
    console.error('[create-payment-intent]', err)
    const message = err instanceof Error ? err.message : 'Internal error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
