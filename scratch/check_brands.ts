import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const brands = await prisma.brand.findMany();
  console.log(JSON.stringify(brands, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
