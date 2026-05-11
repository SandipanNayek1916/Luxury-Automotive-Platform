const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateMistral() {
  await prisma.car.updateMany({
    where: {
      name: 'Bugatti Mistral'
    },
    data: {
      mainImage: 'https://cdn.motor1.com/images/mgl/pP9P2P/s1/bugatti-w16-mistral.jpg',
      images: JSON.stringify(['https://cdn.motor1.com/images/mgl/pP9P2P/s1/bugatti-w16-mistral.jpg'])
    }
  });
  console.log('Updated Bugatti Mistral image');
}

updateMistral()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
