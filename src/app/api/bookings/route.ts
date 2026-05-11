import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const where: any = session.user.role === "ADMIN" ? {} : { userId: session.user.id };
    if (status) where.status = status;

    const bookings = await prisma.booking.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { car: true, user: { select: { id: true, name: true, email: true } } },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { carId, startDate, endDate, pickupLocation, dropLocation, totalPrice } = body;

    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        carId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        pickupLocation,
        dropLocation,
        totalPrice,
        status: "PENDING",
        paymentStatus: "PENDING",
      },
      include: { car: true },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
