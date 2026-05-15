const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function checkNames() {
  const cars = await prisma.car.findMany({
    select: { id: true, name: true, brand: true }
  });

  const needsFix = cars.filter(car => {
    // If the name doesn't start with the brand name (case-insensitive check)
    return !car.name.toLowerCase().startsWith(car.brand.toLowerCase());
  });

  console.log(`Total cars: ${cars.length}`);
  console.log(`Cars needing fix: ${needsFix.length}`);
  
  needsFix.forEach(car => {
    console.log(`[${car.id}] Brand: "${car.brand}", Name: "${car.name}" -> Should be: "${car.brand} ${car.name}"`);
  });

  await prisma.$disconnect();
}

checkNames();
