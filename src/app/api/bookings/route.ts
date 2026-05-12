import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
export const dynamic = "force-dynamic";

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
    const { carId, startDate, endDate, pickupLocation, dropLocation } = body;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      return NextResponse.json({ error: "End date must be after start date" }, { status: 400 });
    }

    // Check for overlapping bookings
    const overlappingBooking = await prisma.booking.findFirst({
      where: {
        carId,
        status: { in: ["PENDING", "CONFIRMED", "ACTIVE"] },
        OR: [
          {
            startDate: { lte: start },
            endDate: { gte: start },
          },
          {
            startDate: { lte: end },
            endDate: { gte: end },
          },
          {
            startDate: { gte: start },
            endDate: { lte: end },
          },
        ],
      },
    });

    if (overlappingBooking) {
      return NextResponse.json({ error: "Car is already booked for these dates" }, { status: 400 });
    }

    const car = await prisma.car.findUnique({ where: { id: carId } });
    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    // Server-side price calculation
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalPrice = diffDays * car.pricePerDay;

    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        carId,
        startDate: start,
        endDate: end,
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
    console.error("[BOOKING_POST]", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
