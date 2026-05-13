import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating flagship model for Mercedes brands...');
  
  await prisma.brand.updateMany({
    where: {
      name: { in: ['Mercedes-Benz', 'Mercedes-AMG'] }
    },
    data: {
      flagshipModel: 'CLK GTR Roadster'
    }
  });

  console.log('Flagship model updated to CLK GTR Roadster.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
