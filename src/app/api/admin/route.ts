import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [totalUsers, totalCars, totalBookings, totalRevenue, recentBookings, topCars] = await Promise.all([
      prisma.user.count(),
      prisma.car.count(),
      prisma.booking.count(),
      prisma.booking.aggregate({ _sum: { totalPrice: true }, where: { paymentStatus: "PAID" } }),
      prisma.booking.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { car: true, user: { select: { name: true, email: true } } },
      }),
      prisma.car.findMany({
        take: 5,
        orderBy: { bookings: { _count: "desc" } },
        include: { _count: { select: { bookings: true } } },
      }),
    ]);

    return NextResponse.json({
      stats: {
        totalUsers,
        totalCars,
        totalBookings,
        totalRevenue: totalRevenue._sum.totalPrice || 0,
      },
      recentBookings,
      topCars,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch admin data" }, { status: 500 });
  }
}
