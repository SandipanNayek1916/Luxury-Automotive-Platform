import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'


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
    case 'payment_intent.amount_capturable_updated': {
      // This fires when capture_method: 'manual' and the card is authorised.
      // Now we verify availability and capture (or cancel) the payment.
      const pi = event.data.object as Stripe.PaymentIntent
      const { carId, pickupDate, returnDate } = pi.metadata

      const available = await checkAvailability(carId, pickupDate, returnDate)

      if (available) {
        await stripe.paymentIntents.capture(pi.id)
        // Note: createBookingRecord will be called by payment_intent.succeeded
      } else {
        await stripe.paymentIntents.cancel(pi.id)
        // TODO: Notify customer of unavailability
      }
      break
    }

    case 'payment_intent.succeeded': {
      const pi = event.data.object as Stripe.PaymentIntent
      const bookingId = pi.metadata.bookingId

      // If we have a bookingId, it was an existing booking flow (automatic capture)
      if (bookingId) {
        await prisma.booking.update({
          where: { id: bookingId },
          data: {
            status: 'CONFIRMED',
            paymentStatus: 'PAID',
            paymentIntentId: pi.id,
          },
        })
        console.log(`[webhook] existing booking ${bookingId} confirmed`)
      } else {
        // If no bookingId, it's the new booking flow (manual capture)
        const newBooking = await createBookingRecord(pi)
        console.log(`[webhook] new booking ${newBooking.id} created and confirmed`)
      }
      break
    }

    case 'payment_intent.payment_failed': {
      const pi = event.data.object as Stripe.PaymentIntent
      const bookingId = pi.metadata.bookingId

      if (bookingId) {
        await prisma.booking.update({
          where: { id: bookingId },
          data: {
            status: 'CANCELLED',
            paymentStatus: 'FAILED',
            paymentIntentId: pi.id,
          },
        })
      }
      console.error('[webhook] payment failed', pi.last_payment_error?.message)
      break
    }
  }

  return NextResponse.json({ received: true })
}

async function checkAvailability(carId: string, pickup: string, returnDate: string): Promise<boolean> {
  const start = new Date(pickup)
  const end = new Date(returnDate)

  const conflicts = await prisma.booking.findFirst({
    where: {
      carId,
      status: { in: ['PENDING', 'CONFIRMED', 'ACTIVE'] },
      OR: [
        { startDate: { lte: start }, endDate: { gte: start } },
        { startDate: { lte: end }, endDate: { gte: end } },
        { startDate: { gte: start }, endDate: { lte: end } },
      ]
    }
  })

  return !conflicts
}

async function createBookingRecord(pi: Stripe.PaymentIntent) {
  const { carId, pickupDate, returnDate, userId, addons, pickupLocation, dropLocation, totalPrice } = pi.metadata

  return await prisma.booking.create({
    data: {
      userId,
      carId,
      startDate: new Date(pickupDate),
      endDate: new Date(returnDate),
      pickupLocation: pickupLocation || 'Elite Terminal',
      dropLocation: dropLocation || 'Elite Terminal',
      totalPrice: parseFloat(totalPrice),
      status: 'CONFIRMED',
      paymentStatus: 'PAID',
      paymentIntentId: pi.id,
      addons: addons || '[]',
    }
  })
}
