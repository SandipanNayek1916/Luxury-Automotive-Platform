
/**
 * Utility to get the absolute path for a brand's logo SVG.
 * Handles slugification and provides a consistent naming convention.
 * @param name Brand name (e.g., "Mercedes-Benz", "Lamborghini")
 * @returns Path to the logo asset in /public/images/logos/
 */
export function getLogoUrl(name: string): string {
  if (!name) return "";
  
  // Clean the name: remove special characters, replace spaces with hyphens, lowercase
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove everything except alphanumeric, spaces, and hyphens
    .replace(/\s+/g, "-");    // Replace spaces with hyphens
    
  return `/images/logos/${slug}.svg`;
}

/**
 * Maps common brand names to their specific SVG filename if they don't follow the slug pattern.
 * Currently, most brands follow the pattern, but we can add overrides here.
 */
const BRAND_LOGOS_OVERRIDE: Record<string, string> = {
  "Mercedes": "/images/logos/mercedes-benz.svg",
  "Mercedes-AMG": "/images/logos/mercedes-amg.svg",
  "Rolls Royce": "/images/logos/rolls-royce.svg",
};

export function getLogoPath(name: string): string {
  if (BRAND_LOGOS_OVERRIDE[name]) {
    return BRAND_LOGOS_OVERRIDE[name];
  }
  return getLogoUrl(name);
}
