// ============================================
// 🏎️ UPDATE CAR IMAGE — Quick Script
// ============================================
// Usage:  node update_car_image.js "Car Name" "image-filename.jpg"
// Example: node update_car_image.js "Bugatti Mistral" "bugatti-mistral.jpg"
//
// The image file must be in: public/images/
// ============================================

const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const prisma = new PrismaClient();

async function main() {
  const carName = process.argv[2];
  const imageFile = process.argv[3];

  if (!carName || !imageFile) {
    console.log("\n❌ Missing arguments!\n");
    console.log('Usage:  node update_car_image.js "Car Name" "image-filename.jpg"');
    console.log('Example: node update_car_image.js "Bugatti Mistral" "bugatti-mistral.jpg"\n');

    // Show all car names for reference
    const cars = await prisma.car.findMany({
      select: { name: true },
      orderBy: { brand: "asc" },
    });
    console.log("Available cars:");
    cars.forEach((c) => console.log(`  - ${c.name}`));
    return;
  }

  // Check if the image file exists
  const imagePath = path.join(__dirname, "public", "images", imageFile);
  if (!fs.existsSync(imagePath)) {
    console.log(`\n❌ Image not found: public/images/${imageFile}`);
    console.log("Make sure the file is saved in the public/images/ folder.\n");
    return;
  }

  // Find the car
  const car = await prisma.car.findFirst({
    where: { name: { contains: carName } },
  });

  if (!car) {
    console.log(`\n❌ Car not found: "${carName}"`);
    console.log("Run this script without arguments to see all car names.\n");
    return;
  }

  // Update the car's image
  const imageUrl = `/images/${imageFile}`;
  const currentImages = JSON.parse(car.images || "[]");

  // Add the new image to the gallery if not already there
  if (!currentImages.includes(imageUrl)) {
    currentImages.unshift(imageUrl); // Add to front
  }

  await prisma.car.update({
    where: { id: car.id },
    data: {
      mainImage: imageUrl,
      images: JSON.stringify(currentImages),
    },
  });

  console.log(`\n✅ Updated "${car.name}"`);
  console.log(`   Main image: ${imageUrl}`);
  console.log(`   Gallery: ${currentImages.length} image(s)\n`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
