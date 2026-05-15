import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const mapping: Record<string, string> = {
  "Sports Car": "Supercars",
  "Sports Sedans": "Luxury Sedans",
  "Luxury SUVs": "SUVs",
  "Electric Hypercars": "Electric Performance",
  "JDM Legends": "JDM Icons",
  "Retro Classics": "Classics",
  "Motorsport Legends": "Track Monsters",
  "Collector Icons": "Limited Editions",
  "Convertible Icons": "Convertible",
  "Ultra Luxury": "Luxury Sedans",
  "Grand Tourers": "Luxury Sedans",
  "Coupes": "Supercars",
  "Future Concepts": "Limited Editions",
  "Limited Edition": "Limited Editions"
};

async function main() {
  console.log("Rearranging cars into target categories...");

  for (const [oldCat, newCat] of Object.entries(mapping)) {
    const result = await prisma.car.updateMany({
      where: { category: oldCat },
      data: { category: newCat }
    });
    if (result.count > 0) {
      console.log(`✅ Moved ${result.count} cars from "${oldCat}" to "${newCat}"`);
    }
  }

  // Double check if there are any other categories not in target
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

  const remaining = await prisma.car.findMany({
    where: {
      category: { notIn: targetCategories }
    },
    select: { name: true, category: true }
  });

  if (remaining.length > 0) {
    console.log("\n⚠️ Remaining categories to fix:");
    remaining.forEach(c => console.log(`- ${c.name}: ${c.category}`));
  } else {
    console.log("\n✨ All cars successfully categorized!");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
