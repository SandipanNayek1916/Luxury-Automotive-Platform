import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'


export async function POST(req: Request) {
  try {
    const { carId, customerEmail, metadata } = await req.json()

    if (!carId) {
      return NextResponse.json({ error: 'Car ID is required' }, { status: 400 })
    }

    const car = await prisma.car.findUnique({ where: { id: carId } })
    if (!car) {
      return NextResponse.json({ error: 'Car not found' }, { status: 404 })
    }

    // Server-side price calculation
    const start = new Date(metadata.pickupDate)
    const end = new Date(metadata.returnDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const amount = diffDays * car.pricePerDay

    if (amount < 50) {
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
        totalPrice: amount.toString(), // Ensure metadata has the correct price
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
