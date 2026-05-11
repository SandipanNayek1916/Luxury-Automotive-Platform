import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { z } from "zod";

const brandQuerySchema = z.object({
  category: z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const { success } = rateLimit(ip, 60, 60000);
    if (!success) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const query: any = {};
    if (category && category !== "All") {
      query.category = category;
    }

    const brands = await prisma.brand.findMany({
      where: query,
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json({ brands });
  } catch (error) {
    console.error("Brands fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch brands" }, { status: 500 });
  }
}
