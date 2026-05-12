import { PrismaClient } from "@prisma/client";
const p = new PrismaClient();
p.car.findMany({ select: { name: true, soundProfile: true, features: true } })
  .then(cars => {
    const generic = cars.filter(c => 
      c.soundProfile === "Aggressive exhaust note" || 
      c.soundProfile === "" ||
      c.features === '["Premium Audio","Carbon Fiber Trim","Active Aerodynamics","Ceramic Brakes"]'
    );
    console.log(`Total cars: ${cars.length}`);
    console.log(`Still generic: ${generic.length}`);
    generic.forEach(c => console.log(" -", c.name));
  })
  .finally(() => p.$disconnect());
