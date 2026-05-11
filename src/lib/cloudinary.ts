import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

// Media type definitions for the fleet media system
export type MediaType = "hero" | "thumbnail" | "gallery" | "showcase" | "mobile" | "video";

export const MEDIA_TYPE_CONFIG: Record<
  MediaType,
  { label: string; maxCount: number; aspectRatio: string; description: string }
> = {
  hero: {
    label: "Hero Banner",
    maxCount: 3,
    aspectRatio: "21:9",
    description: "Full-width cinematic banner displayed on the vehicle detail page",
  },
  thumbnail: {
    label: "Card Thumbnail",
    maxCount: 1,
    aspectRatio: "16:10",
    description: "Primary fleet grid card image — first impression matters",
  },
  gallery: {
    label: "Gallery",
    maxCount: 20,
    aspectRatio: "16:9",
    description: "Showcase gallery images for the detail page carousel",
  },
  showcase: {
    label: "Featured Showcase",
    maxCount: 1,
    aspectRatio: "16:9",
    description: "High-impact render used in the Featured Spotlight section",
  },
  mobile: {
    label: "Mobile Optimized",
    maxCount: 3,
    aspectRatio: "9:16",
    description: "Portrait images optimized for mobile device presentation",
  },
  video: {
    label: "Video Preview",
    maxCount: 2,
    aspectRatio: "16:9",
    description: "Short video clips for cinematic vehicle previews",
  },
};

/**
 * Generate a Cloudinary upload signature for secure client-side uploads.
 * The signature is time-limited and scoped to a specific folder.
 */
export function generateUploadSignature(folder: string) {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const params = {
    timestamp,
    folder,
    upload_preset: "fleet_media",
  };
  const signature = cloudinary.utils.api_sign_request(
    params,
    process.env.CLOUDINARY_API_SECRET!
  );
  return { timestamp, signature, folder };
}

/**
 * Build an optimized Cloudinary URL with automatic format/quality.
 * Supports responsive widths and cinematic crops.
 */
export function getOptimizedUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string | number;
    format?: string;
    gravity?: string;
  } = {}
): string {
  const {
    width,
    height,
    crop = "fill",
    quality = "auto:best",
    format = "auto",
    gravity = "auto",
  } = options;

  return cloudinary.url(publicId, {
    transformation: [
      {
        width,
        height,
        crop,
        quality,
        fetch_format: format,
        gravity,
      },
    ],
    secure: true,
  });
}

/**
 * Generate responsive srcSet for Next.js Image component optimization.
 * Returns URLs for common breakpoints.
 */
export function getResponsiveSrcSet(
  publicId: string,
  widths: number[] = [400, 640, 768, 1024, 1280, 1536, 1920, 2560]
): string {
  return widths
    .map((w) => `${getOptimizedUrl(publicId, { width: w })} ${w}w`)
    .join(", ");
}

/**
 * Delete a media asset from Cloudinary by its public_id.
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

/**
 * Delete multiple media assets from Cloudinary.
 */
export async function deleteManyFromCloudinary(publicIds: string[]): Promise<void> {
  if (publicIds.length === 0) return;
  await cloudinary.api.delete_resources(publicIds);
}
