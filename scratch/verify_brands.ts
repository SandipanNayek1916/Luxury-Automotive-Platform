import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const brands = await prisma.brand.findMany();
  const unknownBrands = brands.filter(b => b.country === 'Unknown' || b.valuation === 'Unknown');
  
  if (unknownBrands.length > 0) {
    console.log('Unknown brands found:');
    unknownBrands.forEach(b => console.log(`- ${b.name}`));
  } else {
    console.log('No more unknown brands found.');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
