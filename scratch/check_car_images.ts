import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const cars = await prisma.car.findMany({
    select: {
      id: true,
      name: true,
      mainImage: true,
      images: true
    }
  });
  
  const carsWithNoImage = cars.filter(c => !c.mainImage);
  if (carsWithNoImage.length > 0) {
    console.log('Cars with no mainImage:');
    carsWithNoImage.forEach(c => console.log(`- ${c.name} (${c.id})`));
  } else {
    console.log('All cars have a mainImage.');
  }

  const carsWithPlaceholder = cars.filter(c => c.mainImage === '/images/placeholder.jpg');
  console.log(`Cars with placeholder image: ${carsWithPlaceholder.length}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
