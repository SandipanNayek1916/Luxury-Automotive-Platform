import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const brands = await prisma.brand.findMany({
    select: { name: true }
  });
  console.log(brands.map(b => b.name).join(', '));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
