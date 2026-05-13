import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const cars = await prisma.car.findMany({
    where: { brand: 'Mercedes-AMG' }
  });
  console.log(`Cars with brand Mercedes-AMG: ${cars.length}`);
  cars.forEach(c => console.log(`- ${c.name}`));
  
  const benzCars = await prisma.car.findMany({
    where: { brand: 'Mercedes-Benz' }
  });
  console.log(`Cars with brand Mercedes-Benz: ${benzCars.length}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
