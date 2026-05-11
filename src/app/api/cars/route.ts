import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
export const dynamic = "force-dynamic";
 
export const dynamic = "force-dynamic";
import { carQuerySchema, carCreateSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";

export async function GET(req: NextRequest) {
  try {
    // Rate limiting: 60 requests per minute per IP
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const { success } = rateLimit(ip, 60, 60000);
    
    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const { searchParams } = new URL(req.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    
    const validated = carQuerySchema.safeParse(queryParams);
    if (!validated.success) {
      return NextResponse.json({ error: "Invalid query parameters", details: validated.error.format() }, { status: 400 });
    }

    const { 
      category, brand, minPrice, maxPrice, search, featured, 
      sortBy, order, page, limit 
    } = validated.data;
    
    const skip = (page - 1) * limit;

    const where: any = {};
    if (category && category !== "All") where.category = category;
    if (brand) where.brand = brand;
    if (minPrice) where.pricePerDay = { ...where.pricePerDay, gte: minPrice };
    if (maxPrice) where.pricePerDay = { ...where.pricePerDay, lte: maxPrice };
    if (featured) where.featured = true;
    
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { brand: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const [carsData, total] = await Promise.all([
      prisma.car.findMany({
        where,
        orderBy: { [sortBy]: order },
        skip,
        take: limit,
        include: {
          _count: { select: { reviews: true, favorites: true } },
          media: {
            where: { published: true },
            orderBy: { sortOrder: "asc" },
          },
        },
      }),
      prisma.car.count({ where }),
    ]);

    const cars = carsData.map(car => {
      let parsedFeatures = [];
      let parsedTags = [];
      let parsedImages = [];
      
      try { parsedFeatures = JSON.parse(car.features || "[]"); } catch (e) {}
      try { parsedTags = JSON.parse(car.tags || "[]"); } catch (e) {}
      try { parsedImages = JSON.parse(car.images || "[]"); } catch (e) {}

      const heroMedia = car.media.filter(m => m.type === "hero");
      const thumbnailMedia = car.media.filter(m => m.type === "thumbnail");
      const galleryMedia = car.media.filter(m => m.type === "gallery");
      const showcaseMedia = car.media.filter(m => m.type === "showcase");

      const resolvedMainImage =
        thumbnailMedia.find(m => m.isPrimary)?.url ||
        thumbnailMedia[0]?.url ||
        heroMedia.find(m => m.isPrimary)?.url ||
        heroMedia[0]?.url ||
        car.mainImage;

      const resolvedImages =
        galleryMedia.length > 0
          ? galleryMedia.map(m => m.url)
          : parsedImages;

      return {
        ...car,
        features: parsedFeatures,
        tags: parsedTags,
        images: resolvedImages,
        mainImage: resolvedMainImage,
        heroImage: heroMedia.find(m => m.isPrimary)?.url || heroMedia[0]?.url || null,
        showcaseImage: showcaseMedia.find(m => m.isPrimary)?.url || showcaseMedia[0]?.url || null,
        hasCloudinaryMedia: car.media.length > 0,
      };
    });

    return NextResponse.json({
      cars,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    });
  } catch (error) {
    console.error("[CARS_GET_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch cars" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validated = carCreateSchema.safeParse(body);
    
    if (!validated.success) {
      return NextResponse.json({ error: "Invalid data", details: validated.error.format() }, { status: 400 });
    }

    const car = await prisma.car.create({ data: validated.data });
    return NextResponse.json(car, { status: 201 });
  } catch (error) {
    console.error("[CARS_POST]", error);
    return NextResponse.json({ error: "Failed to create car" }, { status: 500 });
  }
}

