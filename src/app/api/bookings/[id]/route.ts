import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: { car: true, user: { select: { id: true, name: true, email: true } } },
    });

    if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    if (session.user.role !== "ADMIN" && booking.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch booking" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const booking = await prisma.booking.update({
      where: { id: params.id },
      data: body,
      include: { car: true },
    });

    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}
