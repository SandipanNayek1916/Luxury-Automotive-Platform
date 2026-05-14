const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function checkAcura() {
  const cars = await prisma.car.findMany({
    where: { brand: "Acura" },
    select: { name: true, mainImage: true, images: true }
  });
  console.log(JSON.stringify(cars, null, 2));
  await prisma.$disconnect();
}

checkAcura();
