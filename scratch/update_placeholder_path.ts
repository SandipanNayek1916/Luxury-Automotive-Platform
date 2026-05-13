import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating cars to use placeholder.png...');
  
  await prisma.car.updateMany({
    where: { mainImage: '/images/placeholder.jpg' },
    data: { mainImage: '/images/placeholder.png' }
  });

  const cars = await prisma.car.findMany({
    select: { id: true, images: true }
  });

  for (const car of cars) {
    if (car.images && car.images.includes('/images/placeholder.jpg')) {
      const updatedImages = car.images.replace(/\/images\/placeholder\.jpg/g, '/images/placeholder.png');
      await prisma.car.update({
        where: { id: car.id },
        data: { images: updatedImages }
      });
    }
  }

  console.log('Update complete.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
