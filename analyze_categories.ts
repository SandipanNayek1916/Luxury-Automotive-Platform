import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const cars = await prisma.car.findMany({
    select: {
      id: true,
      name: true,
      brand: true,
      category: true,
    }
  });

  const categories = [...new Set(cars.map(c => c.category))];
  console.log("Current Categories in DB:", categories);

  const targetCategories = [
    "Hypercars",
    "Supercars",
    "Luxury Sedans",
    "SUVs",
    "Electric Performance",
    "JDM Icons",
    "Classics",
    "Track Monsters",
    "Convertible",
    "Limited Editions"
  ];

  console.log("\nTarget Categories:", targetCategories);

  const analysis = targetCategories.reduce((acc, cat) => {
    acc[cat] = cars.filter(c => c.category === cat).map(c => c.name);
    return acc;
  }, {} as Record<string, string[]>);

  const misaligned = cars.filter(c => !targetCategories.includes(c.category));
  
  console.log("\nMisaligned Cars (Categories not in target list):");
  misaligned.forEach(c => {
    console.log(`- ${c.name} (${c.brand}): "${c.category}"`);
  });

  console.log("\nAnalysis complete.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
