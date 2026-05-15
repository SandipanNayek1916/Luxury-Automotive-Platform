const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function fixNames() {
  const cars = await prisma.car.findMany({
    select: { id: true, name: true, brand: true }
  });

  let updateCount = 0;

  for (const car of cars) {
    const brandLower = car.brand.toLowerCase();
    const nameLower = car.name.toLowerCase();

    // If the name doesn't already start with the brand name
    if (!nameLower.startsWith(brandLower)) {
      const newName = `${car.brand} ${car.name}`;
      console.log(`Updating [${car.id}]: "${car.name}" -> "${newName}"`);
      
      await prisma.car.update({
        where: { id: car.id },
        data: { name: newName }
      });
      
      updateCount++;
    }
  }

  console.log(`\n✅ Finished. Updated ${updateCount} cars.`);
  await prisma.$disconnect();
}

fixNames();
