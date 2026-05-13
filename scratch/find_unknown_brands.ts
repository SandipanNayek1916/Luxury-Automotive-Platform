import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const brands = await prisma.brand.findMany({
    where: {
      OR: [
        { country: "Unknown" },
        { valuation: "Unknown" }
      ]
    }
  });
  console.log('Brands with Unknown values:');
  console.log(JSON.stringify(brands, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
