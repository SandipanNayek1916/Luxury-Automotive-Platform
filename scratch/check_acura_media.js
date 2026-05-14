const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function checkAcuraMedia() {
  const cars = await prisma.car.findMany({
    where: { brand: "Acura" },
    include: { media: true }
  });
  
  cars.forEach(car => {
    console.log(`Car: ${car.name}`);
    console.log(`  mainImage: ${car.mainImage}`);
    console.log(`  Media records: ${car.media.length}`);
    car.media.forEach(m => {
      console.log(`    - Type: ${m.type}, URL: ${m.url}, Primary: ${m.isPrimary}`);
    });
  });
  
  await prisma.$disconnect();
}

checkAcuraMedia();
