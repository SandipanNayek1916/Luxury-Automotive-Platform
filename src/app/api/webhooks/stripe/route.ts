// app/api/webhooks/stripe/route.ts
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Webhook error'
    return NextResponse.json({ error: msg }, { status: 400 })
  }

  switch (event.type) {
    case 'payment_intent.created': {
      // Log or store the intent in your DB
      const pi = event.data.object as Stripe.PaymentIntent
      console.log('[webhook] payment_intent.created', pi.id)
      break
    }

    case 'payment_intent.amount_capturable_updated': {
      // This fires when capture_method: 'manual' and the card is authorised.
      // Now you can verify availability and capture (or cancel) the payment.
      const pi = event.data.object as Stripe.PaymentIntent
      const { carId, pickupDate, returnDate } = pi.metadata

      const available = await checkAvailability(carId, pickupDate, returnDate)

      if (available) {
        await stripe.paymentIntents.capture(pi.id)
        await createBookingRecord(pi)
      } else {
        await stripe.paymentIntents.cancel(pi.id)
        // Notify customer of unavailability
      }
      break
    }

    case 'payment_intent.succeeded':
      // Send confirmation email, update booking status
      break

    case 'payment_intent.payment_failed': {
      const pi = event.data.object as Stripe.PaymentIntent
      console.error('[webhook] payment failed', pi.last_payment_error?.message)
      break
    }
  }

  return NextResponse.json({ received: true })
}

import { prisma } from '@/lib/prisma'

async function checkAvailability(
  carId: string,
  pickup: string,
  returnDate: string
): Promise<boolean> {
  const start = new Date(pickup)
  const end = new Date(returnDate)

  const conflicts = await prisma.booking.findFirst({
    where: {
      carId,
      status: { notIn: ['CANCELLED', 'FAILED'] },
      OR: [
        { startDate: { lte: end }, endDate: { gte: start } },
      ]
    }
  })

  return !conflicts
}

async function createBookingRecord(pi: Stripe.PaymentIntent) {
  const { carId, pickupDate, returnDate, userId, addons, pickupLocation, dropLocation, totalPrice } = pi.metadata

  await prisma.booking.create({
    data: {
      userId,
      carId,
      startDate: new Date(pickupDate),
      endDate: new Date(returnDate),
      pickupLocation: pickupLocation || 'Dubai',
      dropLocation: dropLocation || 'Dubai',
      totalPrice: parseFloat(totalPrice),
      status: 'CONFIRMED',
      paymentStatus: 'PAID',
      paymentIntentId: pi.id,
      addons: addons || '[]',
    }
  })
}
