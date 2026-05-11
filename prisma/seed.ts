import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { cars } from "./cars-data";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data to avoid duplicates
  await prisma.car.deleteMany({});
  
  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "admin@unique.com" },
    update: {},
    create: {
      email: "admin@unique.com",
      name: "Admin User",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  for (const car of cars) {
    await prisma.car.upsert({
      where: { id: car.name },
      update: {},
      create: {
        ...car,
        id: car.name, // Using name as ID for easier seeding, will be unique
      },
    });
  }

  console.log("Seed completed successfully with massive fleet expansion");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
