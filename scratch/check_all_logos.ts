import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  const brands = await prisma.brand.findMany({
    select: { name: true, logo: true }
  });
  
  console.log('Checking brand logos...');
  let missingCount = 0;
  
  for (const brand of brands) {
    // If logo is a local path like /images/logos/name.svg
    if (brand.logo && brand.logo.startsWith('/')) {
      const fullPath = path.join(process.cwd(), 'public', brand.logo);
      if (!fs.existsSync(fullPath)) {
        console.log(`Missing logo for ${brand.name}: ${brand.logo}`);
        missingCount++;
      }
    } else {
        // If it's just a name, check the standard path
        const slug = brand.name.toLowerCase().replace(/\s+/g, '-');
        const standardPath = path.join(process.cwd(), 'public', 'images', 'logos', `${slug}.svg`);
        if (!fs.existsSync(standardPath)) {
             console.log(`Missing logo for ${brand.name}: (standard path) ${slug}.svg`);
             missingCount++;
        }
    }
  }
  
  if (missingCount === 0) {
    console.log('All brand logos exist locally.');
  } else {
    console.log(`${missingCount} logos are missing locally.`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
