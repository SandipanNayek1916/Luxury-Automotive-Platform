import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const updates = [
  // Acura
  { name: "Acura NSX Type S", image: "Acura-NSX-Type-S.jpg" },
  { name: "Acura TLX Type S", image: "Acura-TLX-Type-S.jpg" },
  { name: "Acura Integra", image: "Acura-Integra.jpg" },
  { name: "Acura MDX", image: "Acura-MDX.jpg" },
  { name: "Acura ADX", image: "acura_adx.jpg" },
  
  // Alfa Romeo
  { name: "Alfa Romeo Giulia Quadrifoglio", image: "Alfa-Romeo-Giulia-Quadrifoglio.jpg" },
  { name: "Alfa Romeo Tonale", image: "Alfa-Romeo-Tonale.jpg" },
  { name: "Alfa Romeo Stelvio Quadrifoglio", image: "alfa_romeo_stelvio_quadrifoglio.jpg" },
  
  // Lexus
  { name: "Lexus LFA", image: "Lexus-LFA.jpg" },
  { name: "Lexus LC500", image: "lexus-lc-500.jpg" },
  { name: "Lexus LX600", image: "lexus-lx-600.jpg" },
  { name: "Lexus RC F Track Edition", image: "lexus-rc-f.jpg" },
  
  // Maserati
  { name: "Maserati Quattroporte GTS", image: "Maserati-Quattroporte-GTS.jpg" },
  { name: "Maserati MC20", image: "maserati-mc20.jpg" },
  { name: "Maserati GranTurismo Trofeo", image: "maserati-granturismo-trofeo.jpg" },
  { name: "Maserati Levante Trofeo", image: "maserati-levante-trofeo.jpg" },
  { name: "Maserati Grecale Folgore", image: "maserati_grecale_folgore.jpg" },
  
  // Audi (some missed ones)
  { name: "Audi RS e-tron GT", image: "Audi-RS-E-Tron-GT.jpg" },
  
  // Nissan
  { name: "Nissan Z Nismo", image: "Nissan-Z-Nismo.jpg" },
  
  // Porsche
  { name: "Porsche Cayenne Turbo GT", image: "Porsche-Cayenne-Turbo-GT.jpg" },
  
  // Tesla
  { name: "Tesla Roadster", image: "tesla-roadster.jpg" },
  { name: "Tesla Model X Plaid", image: "Tesla-Model-X-Plaid.jpg" }
];

async function main() {
  console.log("Updating car images...");
  for (const update of updates) {
    const car = await prisma.car.findFirst({
      where: { name: { contains: update.name } }
    });
    
    if (car) {
      const imageUrl = `/images/${update.image}`;
      let currentImages = [];
      try {
        currentImages = JSON.parse(car.images || "[]");
      } catch (e) {
        currentImages = [];
      }
      
      if (!currentImages.includes(imageUrl)) {
        currentImages.unshift(imageUrl);
      }
      
      await prisma.car.update({
        where: { id: car.id },
        data: {
          mainImage: imageUrl,
          images: JSON.stringify(currentImages)
        }
      });
      console.log(`✅ Updated ${car.name} with ${update.image}`);
    } else {
      console.log(`⚠️ Car not found: ${update.name}`);
    }
  }
  console.log("Done!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
