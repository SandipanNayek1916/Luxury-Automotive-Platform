import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const amg = await prisma.brand.findUnique({ where: { name: 'Mercedes-AMG' } });
  console.log('Mercedes-AMG brand info:');
  console.log(JSON.stringify(amg, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
