import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const favorites = await prisma.favorite.findMany({
      where: { userId: session.user.id },
      include: { car: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(favorites);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { carId } = await req.json();

    const existing = await prisma.favorite.findUnique({
      where: { userId_carId: { userId: session.user.id, carId } },
    });

    if (existing) {
      await prisma.favorite.delete({ where: { id: existing.id } });
      return NextResponse.json({ favorited: false });
    }

    await prisma.favorite.create({
      data: { userId: session.user.id, carId },
    });

    return NextResponse.json({ favorited: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to toggle favorite" }, { status: 500 });
  }
}
