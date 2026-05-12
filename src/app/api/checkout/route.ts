import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { bookingId } = await req.json();

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId, userId: session.user.id },
      include: { car: true }
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(booking.totalPrice * 100),
      currency: "usd",
      metadata: { bookingId, userId: session.user.id },
      description: `Booking for ${booking.car.name}`,
    });

    // Update booking with payment intent ID
    await prisma.booking.update({
      where: { id: bookingId },
      data: { paymentIntentId: paymentIntent.id }
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error("[CHECKOUT_POST]", error);
    return NextResponse.json({ error: "Payment creation failed", details: error.message }, { status: 500 });
  }
}
