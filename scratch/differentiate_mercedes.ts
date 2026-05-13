import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Differentiating Mercedes flagship models...');
  
  await prisma.brand.update({
    where: { name: 'Mercedes-Benz' },
    data: { flagshipModel: 'CLK GTR Roadster' }
  });

  await prisma.brand.update({
    where: { name: 'Mercedes-AMG' },
    data: { flagshipModel: 'AMG ONE' }
  });

  console.log('Mercedes-Benz: CLK GTR Roadster');
  console.log('Mercedes-AMG: AMG ONE');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
