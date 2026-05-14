
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Mirroring the logic from src/lib/brand-utils.ts (since we can't easily import TS in a raw JS script without setup)
function getLogoUrl(name) {
  if (!name) return "";
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
  return `/images/logos/${slug}.svg`;
}

const BRAND_LOGOS_OVERRIDE = {
  "Mercedes": "/images/logos/mercedes-benz.svg",
  "Mercedes-AMG": "/images/logos/mercedes-amg.svg",
  "Rolls Royce": "/images/logos/rolls-royce.svg",
};

function getLogoPath(name) {
  if (BRAND_LOGOS_OVERRIDE[name]) {
    return BRAND_LOGOS_OVERRIDE[name];
  }
  return getLogoUrl(name);
}

async function main() {
  console.log("🚀 Starting brand logo sync...");

  const brands = await prisma.brand.findMany();
  console.log(`Found ${brands.length} brands in database.`);

  const logosDir = path.join(process.cwd(), 'public', 'images', 'logos');
  if (!fs.existsSync(logosDir)) {
    console.error(`❌ Logos directory not found: ${logosDir}`);
    return;
  }

  const files = fs.readdirSync(logosDir).filter(f => f.endsWith('.svg'));
  console.log(`Found ${files.length} logo files in ${logosDir}.`);

  let updatedCount = 0;
  let missingCount = 0;

  for (const brand of brands) {
    const expectedPath = getLogoPath(brand.name);
    const fileName = path.basename(expectedPath);
    const absolutePath = path.join(logosDir, fileName);

    if (fs.existsSync(absolutePath)) {
      await prisma.brand.update({
        where: { id: brand.id },
        data: { logo: expectedPath }
      });
      console.log(`✅ Updated ${brand.name} -> ${expectedPath}`);
      updatedCount++;
    } else {
      console.warn(`⚠️  Missing logo for ${brand.name} (Expected: ${fileName})`);
      missingCount++;
    }
  }

  console.log("\n--- Sync Summary ---");
  console.log(`Updated: ${updatedCount}`);
  console.log(`Missing: ${missingCount}`);
  console.log("--------------------\n");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
