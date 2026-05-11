import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const brands = [
  { name: 'Ferrari', country: 'Italy', foundedYear: 1939, valuation: '$85B+', category: 'Hypercar', flagshipModel: 'SF90 Stradale' },
  { name: 'Lamborghini', country: 'Italy', foundedYear: 1963, valuation: '$11B+', category: 'Hypercar', flagshipModel: 'Revuelto' },
  { name: 'Bugatti', country: 'France', foundedYear: 1909, valuation: '$5B+', category: 'Hypercar', flagshipModel: 'Tourbillon' },
  { name: 'Koenigsegg', country: 'Sweden', foundedYear: 1994, valuation: '$1B+', category: 'Hypercar', flagshipModel: 'Jesko Absolut' },
  { name: 'Pagani', country: 'Italy', foundedYear: 1992, valuation: '$800M+', category: 'Hypercar', flagshipModel: 'Utopia' },
  { name: 'McLaren', country: 'UK', foundedYear: 1985, valuation: '$3B+', category: 'Hypercar', flagshipModel: 'Artura' },
  { name: 'Porsche', country: 'Germany', foundedYear: 1931, valuation: '$95B+', category: 'Motorsport', flagshipModel: '911 GT3 RS' },
  { name: 'Aston Martin', country: 'UK', foundedYear: 1913, valuation: '$2B+', category: 'Grand Touring', flagshipModel: 'Valkyrie' },
  { name: 'Mercedes-AMG', country: 'Germany', foundedYear: 1926, valuation: '$75B+', category: 'Luxury', flagshipModel: 'AMG ONE' },
  { name: 'BMW', country: 'Germany', foundedYear: 1916, valuation: '$65B+', category: 'Luxury', flagshipModel: 'M8 Competition' },
  { name: 'Audi', country: 'Germany', foundedYear: 1909, valuation: '$50B+', category: 'Luxury', flagshipModel: 'R8 V10' },
  { name: 'Rolls-Royce', country: 'UK', foundedYear: 1904, valuation: '$1B+', category: 'Luxury', flagshipModel: 'Phantom' },
  { name: 'Bentley', country: 'UK', foundedYear: 1919, valuation: '$2B+', category: 'Luxury', flagshipModel: 'Continental GT' },
  { name: 'Maserati', country: 'Italy', foundedYear: 1914, valuation: '$3B+', category: 'Luxury', flagshipModel: 'MC20' },
  { name: 'Tesla', country: 'USA', foundedYear: 2003, valuation: '$600B+', category: 'Electric', flagshipModel: 'Model S Plaid' },
  { name: 'Lexus', country: 'Japan', foundedYear: 1989, valuation: '$15B+', category: 'Luxury', flagshipModel: 'LFA' },
  { name: 'Nissan', country: 'Japan', foundedYear: 1933, valuation: '$15B+', category: 'JDM', flagshipModel: 'GT-R Nismo' },
  { name: 'Chevrolet', country: 'USA', foundedYear: 1911, valuation: '$20B+', category: 'Motorsport', flagshipModel: 'Corvette Z06' },
  { name: 'Ford', country: 'USA', foundedYear: 1903, valuation: '$50B+', category: 'Motorsport', flagshipModel: 'Ford GT' },
  { name: 'Dodge', country: 'USA', foundedYear: 1900, valuation: '$10B+', category: 'Motorsport', flagshipModel: 'Viper ACR' },
  { name: 'Toyota', country: 'Japan', foundedYear: 1937, valuation: '$250B+', category: 'JDM', flagshipModel: 'Supra' },
  { name: 'Acura', country: 'Japan', foundedYear: 1986, valuation: '$5B+', category: 'JDM', flagshipModel: 'NSX Type S' },
  { name: 'Jaguar', country: 'UK', foundedYear: 1922, valuation: '$3B+', category: 'Luxury', flagshipModel: 'F-Type SVR' },
  { name: 'Land Rover', country: 'UK', foundedYear: 1948, valuation: '$5B+', category: 'SUV', flagshipModel: 'Range Rover SV' },
  { name: 'Maybach', country: 'Germany', foundedYear: 1909, valuation: '$1B+', category: 'Luxury', flagshipModel: 'S 680' },
  { name: 'Rimac', country: 'Croatia', foundedYear: 2009, valuation: '$2B+', category: 'Electric', flagshipModel: 'Nevera' },
  { name: 'Lotus', country: 'UK', foundedYear: 1948, valuation: '$1B+', category: 'Electric', flagshipModel: 'Evija' },
  { name: 'Alfa Romeo', country: 'Italy', foundedYear: 1910, valuation: '$2B+', category: 'Motorsport', flagshipModel: 'Giulia GTA' },
];

async function main() {
  console.log('Seeding brands...');
  for (const b of brands) {
    const slug = b.name.toLowerCase().replace(/\s+/g, '-');
    const logoUrl = `/images/logos/${slug}.svg`; // We'll just generate these or use simple SVG placeholders
    
    await prisma.brand.upsert({
      where: { name: b.name },
      update: {
        logo: logoUrl,
        country: b.country,
        foundedYear: b.foundedYear,
        valuation: b.valuation,
        category: b.category,
        flagshipModel: b.flagshipModel,
        featured: ['Ferrari', 'Porsche', 'McLaren', 'Bugatti', 'Lamborghini', 'Rolls-Royce'].includes(b.name),
      },
      create: {
        name: b.name,
        logo: logoUrl,
        country: b.country,
        foundedYear: b.foundedYear,
        valuation: b.valuation,
        category: b.category,
        flagshipModel: b.flagshipModel,
        description: `Experience the epitome of automotive excellence with ${b.name}.`,
        featured: ['Ferrari', 'Porsche', 'McLaren', 'Bugatti', 'Lamborghini', 'Rolls-Royce'].includes(b.name),
      }
    });
  }
  console.log('Brands seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
