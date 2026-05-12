import { PrismaClient } from "@prisma/client";
const p = new PrismaClient();
p.car.findMany({ where: { brand: { in: ["Lamborghini","Porsche"] } }, select: { name: true } })
  .then(r => { r.forEach(c => console.log(c.name)); })
  .finally(() => p.$disconnect());
