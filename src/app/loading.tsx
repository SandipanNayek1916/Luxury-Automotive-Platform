// Route-level loading fallback — intentionally invisible.
// The cinematic intro is handled by CinematicLoader in root layout (first visit only).
// Between pages we rely on Next.js prefetching for instant navigation.
export default function Loading() {
  return null;
}
