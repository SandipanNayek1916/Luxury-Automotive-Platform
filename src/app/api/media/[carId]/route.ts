import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { deleteFromCloudinary, deleteManyFromCloudinary } from "@/lib/cloudinary";

/**
 * GET /api/media/[carId]
 * Fetch all media for a specific car, grouped by type.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { carId: string } }
) {
  try {
    const media = await prisma.carMedia.findMany({
      where: { carId: params.carId },
      orderBy: [{ type: "asc" }, { sortOrder: "asc" }],
    });

    // Group by type for easy consumption
    const grouped = media.reduce((acc: Record<string, any[]>, item) => {
      if (!acc[item.type]) acc[item.type] = [];
      acc[item.type].push(item);
      return acc;
    }, {});

    return NextResponse.json({ media, grouped });
  } catch (error) {
    console.error("[MEDIA_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch media" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/media/[carId]
 * Batch update media records — reorder, update captions, toggle primary.
 * Body: { updates: [{ id, sortOrder?, caption?, alt?, isPrimary?, published? }] }
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { carId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { updates } = await req.json();

    if (!Array.isArray(updates)) {
      return NextResponse.json(
        { error: "Expected an array of updates" },
        { status: 400 }
      );
    }

    // Process each update in a transaction
    await prisma.$transaction(
      updates.map((update: any) =>
        prisma.carMedia.update({
          where: { id: update.id },
          data: {
            ...(update.sortOrder !== undefined && { sortOrder: update.sortOrder }),
            ...(update.caption !== undefined && { caption: update.caption }),
            ...(update.alt !== undefined && { alt: update.alt }),
            ...(update.isPrimary !== undefined && { isPrimary: update.isPrimary }),
            ...(update.published !== undefined && { published: update.published }),
          },
        })
      )
    );

    // Re-fetch all media for this car
    const media = await prisma.carMedia.findMany({
      where: { carId: params.carId },
      orderBy: [{ type: "asc" }, { sortOrder: "asc" }],
    });

    // Sync legacy mainImage with the current primary thumbnail/hero
    const primaryImage = media.find(
      (m) => m.isPrimary && (m.type === "thumbnail" || m.type === "hero")
    );
    if (primaryImage) {
      await prisma.car.update({
        where: { id: params.carId },
        data: { mainImage: primaryImage.url },
      });
    }

    return NextResponse.json({ media });
  } catch (error) {
    console.error("[MEDIA_PATCH_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to update media" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/media/[carId]
 * Delete media records and their Cloudinary assets.
 * Body: { mediaIds: string[] }
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { carId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { mediaIds } = await req.json();

    if (!Array.isArray(mediaIds) || mediaIds.length === 0) {
      return NextResponse.json(
        { error: "Expected an array of mediaIds" },
        { status: 400 }
      );
    }

    // Fetch the records to get Cloudinary public IDs
    const mediaToDelete = await prisma.carMedia.findMany({
      where: { id: { in: mediaIds }, carId: params.carId },
    });

    // Delete from Cloudinary
    const publicIds = mediaToDelete.map((m) => m.publicId);
    await deleteManyFromCloudinary(publicIds);

    // Delete from database
    await prisma.carMedia.deleteMany({
      where: { id: { in: mediaIds } },
    });

    return NextResponse.json({
      message: `Deleted ${mediaToDelete.length} media item(s)`,
    });
  } catch (error) {
    console.error("[MEDIA_DELETE_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to delete media" },
      { status: 500 }
    );
  }
}
