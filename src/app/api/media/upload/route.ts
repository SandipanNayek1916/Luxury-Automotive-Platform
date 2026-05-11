import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

/**
 * POST /api/media/upload
 * Server-side upload handler for vehicle media.
 * Accepts multipart/form-data with a single "file" field.
 * Uploads to Cloudinary and creates a CarMedia record.
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const carId = formData.get("carId") as string;
    const type = formData.get("type") as string;
    const alt = (formData.get("alt") as string) || "";
    const caption = (formData.get("caption") as string) || "";
    const isPrimary = formData.get("isPrimary") === "true";

    if (!file || !carId || !type) {
      return NextResponse.json(
        { error: "Missing required fields: file, carId, type" },
        { status: 400 }
      );
    }

    // Verify the car exists
    const car = await prisma.car.findUnique({ where: { id: carId } });
    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    // Convert file to buffer for Cloudinary upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Determine the folder structure: fleet/{brand}/{model-slug}/{type}
    const brandSlug = car.brand.toLowerCase().replace(/\s+/g, "-");
    const modelSlug = car.model.toLowerCase().replace(/\s+/g, "-");
    const folder = `fleet/${brandSlug}/${modelSlug}/${type}`;

    // Upload to Cloudinary
    const uploadResult = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: type === "video" ? "video" : "image",
          transformation:
            type !== "video"
              ? [{ quality: "auto:best", fetch_format: "auto" }]
              : undefined,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    // Get the next sort order for this car + type combo
    const maxOrder = await prisma.carMedia.aggregate({
      where: { carId, type },
      _max: { sortOrder: true },
    });
    const nextOrder = (maxOrder._max.sortOrder ?? -1) + 1;

    // If this is marked as primary, unset any existing primary for this type
    if (isPrimary) {
      await prisma.carMedia.updateMany({
        where: { carId, type, isPrimary: true },
        data: { isPrimary: false },
      });
    }

    // Create the CarMedia record
    const media = await prisma.carMedia.create({
      data: {
        carId,
        type,
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        width: uploadResult.width,
        height: uploadResult.height,
        format: uploadResult.format,
        alt,
        caption,
        sortOrder: nextOrder,
        isPrimary,
      },
    });

    // If this is a thumbnail or hero marked as primary, also update legacy fields
    if (isPrimary && (type === "thumbnail" || type === "hero")) {
      await prisma.car.update({
        where: { id: carId },
        data: { mainImage: uploadResult.secure_url },
      });
    }

    return NextResponse.json(media, { status: 201 });
  } catch (error: any) {
    console.error("[MEDIA_UPLOAD_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to upload media", details: error.message },
      { status: 500 }
    );
  }
}
