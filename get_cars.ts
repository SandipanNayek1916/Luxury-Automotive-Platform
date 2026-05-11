import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const cars = await prisma.car.findMany({ select: { id: true, name: true, brand: true, model: true } });
  console.log(JSON.stringify(cars, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
