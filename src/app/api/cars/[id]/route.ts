import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const car = await prisma.car.findUnique({
      where: { id: params.id },
      include: {
        reviews: { include: { user: { select: { id: true, name: true, image: true } } }, orderBy: { createdAt: "desc" } },
        _count: { select: { reviews: true, favorites: true, bookings: true } },
        media: {
          where: { published: true },
          orderBy: { sortOrder: "asc" },
        },
      },
    });
    if (!car) return NextResponse.json({ error: "Car not found" }, { status: 404 });

    const parsedFeatures = JSON.parse(car.features || "[]");
    const parsedTags = JSON.parse(car.tags || "[]");
    const parsedImages = JSON.parse(car.images || "[]");

    // Resolve media by type
    const heroMedia = car.media.filter(m => m.type === "hero");
    const thumbnailMedia = car.media.filter(m => m.type === "thumbnail");
    const galleryMedia = car.media.filter(m => m.type === "gallery");
    const showcaseMedia = car.media.filter(m => m.type === "showcase");
    const mobileMedia = car.media.filter(m => m.type === "mobile");
    const videoMedia = car.media.filter(m => m.type === "video");

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

    const formattedCar = {
      ...car,
      features: parsedFeatures,
      tags: parsedTags,
      images: resolvedImages,
      mainImage: resolvedMainImage,
      heroImage: heroMedia.find(m => m.isPrimary)?.url || heroMedia[0]?.url || null,
      heroImages: heroMedia.map(m => m.url),
      showcaseImage: showcaseMedia.find(m => m.isPrimary)?.url || showcaseMedia[0]?.url || null,
      mobileImages: mobileMedia.map(m => m.url),
      videoPreview: videoMedia[0]?.url || null,
      hasCloudinaryMedia: car.media.length > 0,
    };

    return NextResponse.json(formattedCar);
  } catch (error) {
    console.error("[CAR_GET]", error);
    return NextResponse.json({ error: "Failed to fetch car" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const car = await prisma.car.update({ where: { id: params.id }, data: body });
    return NextResponse.json(car);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update car" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await prisma.car.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Car deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete car" }, { status: 500 });
  }
}
