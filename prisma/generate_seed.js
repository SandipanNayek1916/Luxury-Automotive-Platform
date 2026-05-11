const fs = require('fs');

const generateCars = () => {
  const cars = [];
  
  const addCar = (brand, model, category, year, price, engine, hp, acc, speed, featured = false, img = "") => {
    cars.push({
      name: `${brand} ${model}`,
      brand,
      model,
      year,
      category,
      pricePerDay: price,
      transmission: "Automatic",
      fuelType: category === "Electric Performance" ? "Electric" : (category.includes("Hybrid") || model.includes("Hybrid") ? "Hybrid" : "Petrol"),
      drivetrain: category === "SUVs" ? "AWD" : "RWD",
      seats: category === "SUVs" || category === "Luxury Sedans" ? 5 : 2,
      doors: category === "SUVs" || category === "Luxury Sedans" ? 4 : 2,
      mileage: Math.floor(Math.random() * 5000) + 100 + "",
      engine,
      horsepower: hp,
      acceleration: acc + "s",
      topSpeed: speed + " km/h",
      description: `The ultimate expression of ${brand} performance and luxury. The ${model} redefines the ${category} segment.`,
      soundProfile: category === "Electric Performance" ? "Silent but deadly" : "Aggressive exhaust note",
      features: JSON.stringify(["Premium Audio", "Carbon Fiber Trim", "Active Aerodynamics", "Ceramic Brakes"]),
      tags: JSON.stringify([brand, category.toLowerCase().replace(' ', '-'), "luxury", "performance"]),
      images: JSON.stringify([img || `https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2070&auto=format&fit=crop`]),
      mainImage: img || `https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2070&auto=format&fit=crop`,
      location: ["Dubai", "Monaco", "London", "Miami", "Los Angeles", "Tokyo", "Zurich"][Math.floor(Math.random() * 7)],
      available: Math.random() > 0.2,
      featured
    });
  };

  // HYPERCARS
  addCar("Bugatti", "Chiron Super Sport", "Hypercars", 2022, 4000, "8.0L W16 Quad-Turbo", 1600, 2.4, 440, true, "https://cdn.motor1.com/images/mgl/mrz96/s1/bugatti-chiron-super-sport-300.jpg");
  addCar("Bugatti", "Bolide", "Hypercars", 2024, 5000, "8.0L W16 Quad-Turbo", 1850, 2.1, 500, true, "https://cdn.motor1.com/images/mgl/3WvOx/s1/bugatti-bolide-front-view.jpg");
  addCar("Bugatti", "Mistral", "Hypercars", 2024, 4500, "8.0L W16 Quad-Turbo", 1600, 2.5, 420, false, "/images/bugatti-mistral.jpg");
  addCar("Bugatti", "Divo", "Hypercars", 2021, 4800, "8.0L W16 Quad-Turbo", 1500, 2.4, 380);
  addCar("Bugatti", "Centodieci", "Hypercars", 2022, 5500, "8.0L W16 Quad-Turbo", 1600, 2.4, 380);
  addCar("Bugatti", "Veyron Grand Sport Vitesse", "Hypercars", 2015, 3000, "8.0L W16 Quad-Turbo", 1200, 2.6, 410);

  addCar("Koenigsegg", "Jesko Absolut", "Hypercars", 2024, 5000, "5.0L Twin-Turbo V8", 1600, 2.5, 531, true, "https://cdn.motor1.com/images/mgl/MKZpL/s1/koenigsegg-jesko-absolut.jpg");
  addCar("Koenigsegg", "Jesko Attack", "Hypercars", 2024, 4800, "5.0L Twin-Turbo V8", 1600, 2.5, 480);
  addCar("Koenigsegg", "Gemera", "Hypercars", 2024, 4500, "2.0L Twin-Turbo 3-Cyl Hybrid", 1700, 1.9, 400);
  addCar("Koenigsegg", "Regera", "Hypercars", 2020, 3500, "5.0L Twin-Turbo V8 Hybrid", 1500, 2.8, 400);
  addCar("Koenigsegg", "CC850", "Hypercars", 2024, 4200, "5.0L Twin-Turbo V8", 1385, 2.6, 400);
  addCar("Koenigsegg", "One:1", "Hypercars", 2015, 4000, "5.0L Twin-Turbo V8", 1360, 2.8, 440);

  addCar("Pagani", "Huayra R", "Hypercars", 2022, 5000, "6.0L V12", 850, 2.7, 380);
  addCar("Pagani", "Huayra BC", "Hypercars", 2019, 3800, "6.0L Twin-Turbo V12", 789, 2.8, 380);
  addCar("Pagani", "Utopia", "Hypercars", 2023, 3800, "6.0L V12 Twin-Turbo", 864, 3.0, 350, true, "https://www.netcarshow.com/Pagani-Utopia-2023-1600-01.jpg");
  addCar("Pagani", "Zonda Cinque", "Hypercars", 2010, 4500, "7.3L V12", 678, 3.4, 350);
  addCar("Pagani", "Zonda Revolución", "Hypercars", 2013, 4800, "6.0L V12", 800, 2.7, 350);

  addCar("McLaren", "P1", "Hypercars", 2014, 3200, "3.8L V8 Hybrid", 903, 2.8, 350, false, "https://www.netcarshow.com/McLaren-P1-2014-1600-01.jpg");
  addCar("McLaren", "Senna", "Hypercars", 2019, 3500, "4.0L Twin-Turbo V8", 789, 2.8, 335, true);
  addCar("McLaren", "Speedtail", "Hypercars", 2020, 4000, "4.0L Twin-Turbo V8 Hybrid", 1036, 2.9, 403);
  addCar("McLaren", "765LT", "Supercars", 2021, 1500, "4.0L Twin-Turbo V8", 755, 2.8, 330);
  addCar("McLaren", "Artura", "Supercars", 2023, 1200, "3.0L Twin-Turbo V6 Hybrid", 671, 3.0, 330);
  addCar("McLaren", "750S", "Supercars", 2024, 1400, "4.0L Twin-Turbo V8", 740, 2.8, 332);
  addCar("McLaren", "Elva", "Supercars", 2021, 1800, "4.0L Twin-Turbo V8", 804, 2.8, 326);
  addCar("McLaren", "Solus GT", "Hypercars", 2023, 4500, "5.2L V10", 829, 2.5, 320);

  // FERRARI
  addCar("Ferrari", "LaFerrari", "Hypercars", 2014, 4000, "6.3L V12 Hybrid", 950, 2.6, 350, true, "https://www.netcarshow.com/Ferrari-LaFerrari-2014-1600-01.jpg");
  addCar("Ferrari", "SF90 Stradale", "Hypercars", 2021, 2500, "4.0L Twin-Turbo V8 Hybrid", 986, 2.5, 340, true);
  addCar("Ferrari", "Daytona SP3", "Hypercars", 2023, 3800, "6.5L V12", 829, 2.8, 340);
  addCar("Ferrari", "F80", "Hypercars", 2025, 4500, "V6 Hybrid", 1200, 2.2, 350);
  
  addCar("Ferrari", "296 GTB", "Supercars", 2024, 1100, "3.0L V6 Hybrid", 819, 2.9, 330, false, "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2070&auto=format&fit=crop");
  addCar("Ferrari", "488 Pista", "Supercars", 2020, 1600, "3.9L Twin-Turbo V8", 710, 2.8, 340);
  addCar("Ferrari", "F8 Tributo", "Supercars", 2022, 1400, "3.9L Twin-Turbo V8", 710, 2.9, 340);
  addCar("Ferrari", "812 Superfast", "Supercars", 2021, 1500, "6.5L V12", 789, 2.9, 340);
  addCar("Ferrari", "Roma", "Supercars", 2023, 1000, "3.9L Twin-Turbo V8", 612, 3.4, 320);
  addCar("Ferrari", "Purosangue", "SUVs", 2024, 2000, "6.5L V12", 715, 3.3, 310);
  addCar("Ferrari", "Portofino M", "Convertible", 2023, 900, "3.9L Twin-Turbo V8", 612, 3.4, 320);
  
  addCar("Ferrari", "Enzo Ferrari", "Classics", 2003, 3500, "6.0L V12", 651, 3.1, 350);
  addCar("Ferrari", "F40", "Classics", 1990, 4000, "2.9L Twin-Turbo V8", 471, 4.1, 324);
  addCar("Ferrari", "F50", "Classics", 1995, 3800, "4.7L V12", 512, 3.8, 325);
  addCar("Ferrari", "Testarossa", "Classics", 1989, 1200, "4.9L Flat-12", 385, 5.2, 290);

  // LAMBORGHINI
  addCar("Lamborghini", "Revuelto", "Hypercars", 2024, 2800, "6.5L V12 Hybrid", 1001, 2.5, 350, true, "https://www.netcarshow.com/Lamborghini-Revuelto-2024-1600-01.jpg");
  addCar("Lamborghini", "Aventador SVJ", "Hypercars", 2021, 2500, "6.5L V12", 770, 2.8, 350);
  addCar("Lamborghini", "Sián FKP 37", "Hypercars", 2021, 3500, "6.5L V12 Hybrid", 808, 2.8, 350);
  addCar("Lamborghini", "Centenario", "Hypercars", 2017, 3000, "6.5L V12", 759, 2.8, 350);
  
  addCar("Lamborghini", "Huracán STO", "Supercars", 2023, 1600, "5.2L V10", 631, 3.0, 310);
  addCar("Lamborghini", "Huracán Tecnica", "Supercars", 2023, 1400, "5.2L V10", 631, 3.2, 325);
  addCar("Lamborghini", "Temerario", "Supercars", 2025, 1500, "4.0L Twin-Turbo V8 Hybrid", 907, 2.7, 340);
  addCar("Lamborghini", "Gallardo Superleggera", "Supercars", 2011, 1000, "5.2L V10", 562, 3.4, 325);
  
  addCar("Lamborghini", "Urus Performante", "SUVs", 2024, 1300, "4.0L V8 Twin-Turbo", 666, 3.3, 306, true, "https://www.netcarshow.com/Lamborghini-Urus_Performante-2023-1600-01.jpg");
  addCar("Lamborghini", "Urus SE", "SUVs", 2025, 1400, "4.0L V8 Twin-Turbo Hybrid", 789, 3.4, 312);

  // ASTON MARTIN
  addCar("Aston Martin", "Valkyrie", "Hypercars", 2024, 5500, "6.5L V12 Hybrid", 1160, 2.5, 355, true, "https://www.netcarshow.com/Aston_Martin-Valkyrie-2022-1600-01.jpg");
  addCar("Aston Martin", "Valhalla", "Hypercars", 2024, 2500, "4.0L Twin-Turbo V8 Hybrid", 937, 2.5, 350);
  addCar("Aston Martin", "DBS Superleggera", "Supercars", 2023, 1200, "5.2L Twin-Turbo V12", 715, 3.4, 340);
  addCar("Aston Martin", "DB12", "Supercars", 2024, 1100, "4.0L Twin-Turbo V8", 671, 3.5, 325);
  addCar("Aston Martin", "Vantage F1 Edition", "Supercars", 2023, 1000, "4.0L Twin-Turbo V8", 528, 3.6, 314);
  addCar("Aston Martin", "One-77", "Hypercars", 2012, 2800, "7.3L V12", 750, 3.5, 354);
  addCar("Aston Martin", "DBX707", "SUVs", 2024, 1300, "4.0L Twin-Turbo V8", 697, 3.1, 310);
  addCar("Aston Martin", "Vanquish", "Supercars", 2018, 900, "5.9L V12", 580, 3.6, 324);

  // PORSCHE
  addCar("Porsche", "918 Spyder", "Hypercars", 2015, 2500, "4.6L V8 Hybrid", 887, 2.5, 345);
  addCar("Porsche", "Carrera GT", "Hypercars", 2005, 3000, "5.7L V10", 605, 3.9, 330);
  addCar("Porsche", "911 GT3 RS", "Supercars", 2024, 1200, "4.0L Flat-Six", 518, 3.2, 296, true, "https://www.netcarshow.com/Porsche-911_GT3_RS-2023-1600-01.jpg");
  addCar("Porsche", "911 Turbo S", "Supercars", 2024, 1100, "3.8L Twin-Turbo Flat-Six", 640, 2.6, 330);
  addCar("Porsche", "911 Dakar", "Supercars", 2023, 1500, "3.0L Twin-Turbo Flat-Six", 473, 3.4, 240);
  addCar("Porsche", "Taycan Turbo GT", "Electric Performance", 2025, 1000, "Dual Electric Motors", 1092, 2.2, 305);
  addCar("Porsche", "Panamera Turbo", "Luxury Sedans", 2024, 900, "4.0L Twin-Turbo V8", 670, 3.0, 315);
  addCar("Porsche", "Cayman GT4 RS", "Track Monsters", 2024, 950, "4.0L Flat-Six", 493, 3.2, 315);

  // MERCEDES-BENZ / AMG
  addCar("Mercedes-AMG", "ONE", "Hypercars", 2024, 5000, "1.6L V6 Turbo Hybrid", 1063, 2.9, 352, true, "https://www.netcarshow.com/Mercedes-Benz-AMG_One-2023-1600-01.jpg");
  addCar("Mercedes-AMG", "GT Black Series", "Track Monsters", 2022, 1800, "4.0L Twin-Turbo V8", 720, 3.1, 325);
  addCar("Mercedes-AMG", "SL63", "Convertible", 2024, 850, "4.0L Twin-Turbo V8", 577, 3.5, 315);
  addCar("Mercedes-AMG", "G63", "SUVs", 2024, 900, "4.0L Twin-Turbo V8", 577, 4.5, 220);
  addCar("Mercedes-AMG", "S63", "Luxury Sedans", 2024, 950, "4.0L Twin-Turbo V8 Hybrid", 791, 3.2, 250);
  addCar("Mercedes-AMG", "EQS", "Electric Performance", 2024, 800, "Dual Electric Motors", 751, 3.4, 250);
  addCar("Mercedes-AMG", "CLS63", "Luxury Sedans", 2018, 600, "5.5L Twin-Turbo V8", 577, 3.6, 250);

  // BMW
  addCar("BMW", "M2 Competition", "Track Monsters", 2021, 500, "3.0L Twin-Turbo I6", 405, 4.2, 280);
  addCar("BMW", "M3 CS", "Supercars", 2024, 750, "3.0L Twin-Turbo I6", 543, 3.2, 302);
  addCar("BMW", "M4 CSL", "Track Monsters", 2023, 900, "3.0L Twin-Turbo I6", 543, 3.6, 307);
  addCar("BMW", "M5 CS", "Luxury Sedans", 2022, 1000, "4.4L Twin-Turbo V8", 627, 2.9, 305);
  addCar("BMW", "XM Label Red", "SUVs", 2024, 1100, "4.4L Twin-Turbo V8 Hybrid", 738, 3.7, 290);
  addCar("BMW", "i8 Roadster", "Electric Performance", 2020, 600, "1.5L Turbo 3-Cyl Hybrid", 369, 4.4, 250);
  addCar("BMW", "7 Series", "Luxury Sedans", 2024, 800, "4.4L Twin-Turbo V8", 536, 4.1, 250);
  addCar("BMW", "X7 M60i", "SUVs", 2024, 750, "4.4L Twin-Turbo V8", 523, 4.5, 250);
  addCar("BMW", "Alpina B8", "Luxury Sedans", 2024, 900, "4.4L Twin-Turbo V8", 612, 3.3, 322);

  // AUDI
  addCar("Audi", "R8 V10 Performance", "Supercars", 2023, 950, "5.2L V10", 602, 3.2, 330);
  addCar("Audi", "RS6 Avant", "Luxury Sedans", 2024, 850, "4.0L Twin-Turbo V8", 621, 3.3, 305);
  addCar("Audi", "RS7 Sportback", "Luxury Sedans", 2024, 850, "4.0L Twin-Turbo V8", 621, 3.3, 305);
  addCar("Audi", "RSQ8", "SUVs", 2024, 850, "4.0L Twin-Turbo V8", 591, 3.7, 305);
  addCar("Audi", "RS e-tron GT", "Electric Performance", 2024, 900, "Dual Electric Motors", 637, 3.1, 250, false, "https://www.netcarshow.com/Audi-RS_e-tron_GT-2022-1600-01.jpg");
  addCar("Audi", "TT RS", "Track Monsters", 2022, 500, "2.5L Turbo 5-Cyl", 394, 3.6, 280);

  // ROLLS-ROYCE
  addCar("Rolls-Royce", "Phantom", "Luxury Sedans", 2024, 2000, "6.75L Twin-Turbo V12", 563, 5.1, 250);
  addCar("Rolls-Royce", "Ghost", "Luxury Sedans", 2024, 1500, "6.75L Twin-Turbo V12", 563, 4.6, 250);
  addCar("Rolls-Royce", "Spectre", "Luxury Sedans", 2024, 2500, "Dual Electric Motors", 577, 4.5, 250, true, "https://www.netcarshow.com/Rolls-Royce-Spectre-2024-1600-01.jpg");
  addCar("Rolls-Royce", "Cullinan Black Badge", "SUVs", 2024, 2200, "6.75L Twin-Turbo V12", 592, 4.9, 250);
  addCar("Rolls-Royce", "Wraith", "Luxury Sedans", 2021, 1200, "6.6L Twin-Turbo V12", 624, 4.4, 250);
  addCar("Rolls-Royce", "Dawn", "Convertible", 2021, 1300, "6.6L Twin-Turbo V12", 563, 4.8, 250);

  // BENTLEY
  addCar("Bentley", "Continental GT Speed", "Luxury Sedans", 2025, 1400, "4.0L V8 Hybrid", 771, 3.2, 335);
  addCar("Bentley", "Flying Spur Mulliner", "Luxury Sedans", 2024, 1500, "6.0L Twin-Turbo W12", 626, 3.7, 333);
  addCar("Bentley", "Bentayga S", "SUVs", 2024, 1200, "4.0L Twin-Turbo V8", 542, 4.4, 290);
  addCar("Bentley", "Bacalar", "Limited Editions", 2021, 3500, "6.0L Twin-Turbo W12", 650, 3.5, 322);
  addCar("Bentley", "Batur", "Limited Editions", 2023, 4000, "6.0L Twin-Turbo W12", 740, 3.3, 337);

  // MASERATI
  addCar("Maserati", "MC20", "Supercars", 2023, 950, "3.0L V6 Nettuno", 621, 2.9, 325, false, "https://www.netcarshow.com/Maserati-MC20-2021-1600-01.jpg");
  addCar("Maserati", "GranTurismo Trofeo", "Luxury Sedans", 2024, 850, "3.0L V6 Nettuno", 542, 3.5, 320);
  addCar("Maserati", "Levante Trofeo", "SUVs", 2023, 750, "3.8L Twin-Turbo V8", 580, 3.8, 302);
  addCar("Maserati", "Quattroporte GTS", "Luxury Sedans", 2021, 650, "3.8L Twin-Turbo V8", 523, 4.7, 310);
  addCar("Maserati", "Grecale Folgore", "Electric Performance", 2024, 700, "Dual Electric Motors", 550, 4.1, 220);

  // TESLA
  addCar("Tesla", "Model S Plaid", "Electric Performance", 2024, 800, "Tri-Motor Electric", 1020, 2.1, 322);
  addCar("Tesla", "Model X Plaid", "Electric Performance", 2024, 850, "Tri-Motor Electric", 1020, 2.5, 262);
  addCar("Tesla", "Cybertruck Cyberbeast", "Electric Performance", 2024, 900, "Tri-Motor Electric", 845, 2.6, 209);
  addCar("Tesla", "Roadster", "Electric Performance", 2025, 1500, "Tri-Motor Electric", 1000, 1.9, 400);

  // LEXUS
  addCar("Lexus", "LFA", "JDM Icons", 2012, 2000, "4.8L V10", 552, 3.7, 325, true, "https://www.netcarshow.com/Lexus-LFA-2011-1600-01.jpg");
  addCar("Lexus", "LC500", "Luxury Sedans", 2024, 600, "5.0L V8", 471, 4.4, 270);
  addCar("Lexus", "IS500 F Sport", "Luxury Sedans", 2024, 450, "5.0L V8", 472, 4.4, 240);
  addCar("Lexus", "LX600", "SUVs", 2024, 700, "3.5L Twin-Turbo V6", 409, 6.9, 210);
  addCar("Lexus", "RC F Track Edition", "Track Monsters", 2023, 650, "5.0L V8", 472, 4.0, 270);

  // NISSAN
  addCar("Nissan", "GT-R Nismo", "JDM Icons", 2024, 850, "3.8L Twin-Turbo V6", 600, 2.7, 315, false, "https://www.netcarshow.com/Nissan-GT-R_Nismo-2024-1600-01.jpg");
  addCar("Nissan", "Z Nismo", "JDM Icons", 2024, 400, "3.0L Twin-Turbo V6", 420, 4.1, 250);

  // CHEVROLET
  addCar("Chevrolet", "Corvette Z06", "Supercars", 2024, 800, "5.5L Flat-Plane V8", 670, 2.6, 314);
  addCar("Chevrolet", "Corvette E-Ray", "Supercars", 2024, 750, "6.2L V8 Hybrid", 655, 2.5, 290);
  addCar("Chevrolet", "Camaro ZL1", "Track Monsters", 2024, 500, "6.2L Supercharged V8", 650, 3.5, 318);

  // FORD
  addCar("Ford", "GT", "Supercars", 2022, 1800, "3.5L Twin-Turbo V6", 660, 3.0, 348);
  addCar("Ford", "Mustang Dark Horse", "Track Monsters", 2024, 450, "5.0L V8", 500, 4.1, 260);
  addCar("Ford", "Shelby GT500", "Track Monsters", 2022, 600, "5.2L Supercharged V8", 760, 3.4, 290);
  addCar("Ford", "Bronco Raptor", "SUVs", 2024, 550, "3.0L Twin-Turbo V6", 418, 5.6, 180);

  // DODGE
  addCar("Dodge", "Challenger Demon 170", "Track Monsters", 2023, 900, "6.2L Supercharged V8", 1025, 1.66, 346);
  addCar("Dodge", "Charger Hellcat Redeye", "Luxury Sedans", 2023, 650, "6.2L Supercharged V8", 797, 3.6, 326);
  addCar("Dodge", "Viper ACR", "Track Monsters", 2017, 1200, "8.4L V10", 645, 3.3, 285);

  return cars;
};

const cars = generateCars();
const fileContent = `export const cars = ${JSON.stringify(cars, null, 2)};`;
fs.writeFileSync('prisma/cars-data.ts', fileContent);
console.log('Seed data generated successfully!');
