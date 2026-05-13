import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating Mercedes-Benz brand info...');
  
  await prisma.brand.update({
    where: { name: 'Mercedes-Benz' },
    data: {
      country: 'Germany',
      foundedYear: 1926,
      valuation: '$82.4B',
      category: 'Luxury & Performance',
      flagshipModel: 'AMG ONE',
      description: 'The pinnacle of German engineering, luxury, and high-performance automotive excellence.',
      logo: '/images/logos/mercedes-benz.svg'
    }
  });

  console.log('Mercedes-Benz brand info updated.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
