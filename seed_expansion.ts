import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const newBrands = [
  { name: "Rimac", country: "Croatia", foundedYear: 2009, valuation: "$2.2B", category: "Electric Hypercar", flagshipModel: "Nevera", description: "Pioneers of ultra-high-performance electric vehicles.", logo: "rimac", featured: true },
  { name: "Lotus", country: "United Kingdom", foundedYear: 1952, valuation: "$1B", category: "Sports Car", flagshipModel: "Evija", description: "Simplify, then add lightness.", logo: "lotus", featured: false },
  { name: "Hennessey", country: "United States", foundedYear: 1991, valuation: "$500M", category: "Hypercar", flagshipModel: "Venom F5", description: "Making fast cars faster.", logo: "hennessey", featured: true },
  { name: "SSC", country: "United States", foundedYear: 1998, valuation: "$300M", category: "Hypercar", flagshipModel: "Tuatara", description: "American hypercar manufacturer.", logo: "ssc", featured: false },
  { name: "Gordon Murray Automotive", country: "United Kingdom", foundedYear: 2017, valuation: "$400M", category: "Hypercar", flagshipModel: "T.50", description: "Analog perfection in a digital world.", logo: "gordon-murray", featured: true },
  { name: "Apollo", country: "Germany", foundedYear: 2004, valuation: "$200M", category: "Hypercar", flagshipModel: "Intensa Emozione", description: "Intense emotion on four wheels.", logo: "apollo", featured: false },
  { name: "Maybach", country: "Germany", foundedYear: 1909, valuation: "$10B+", category: "Ultra Luxury", flagshipModel: "S680", description: "The ultimate expression of Mercedes-Benz luxury.", logo: "maybach", featured: true },
  { name: "Jaguar", country: "United Kingdom", foundedYear: 1922, valuation: "$3B", category: "Luxury Sports", flagshipModel: "F-Type R", description: "The art of performance.", logo: "jaguar", featured: false },
  { name: "Land Rover", country: "United Kingdom", foundedYear: 1948, valuation: "$15B", category: "Luxury SUV", flagshipModel: "Range Rover SV", description: "Above and beyond.", logo: "land-rover", featured: false },
  { name: "Cadillac", country: "United States", foundedYear: 1902, valuation: "$20B", category: "Luxury", flagshipModel: "Celestiq", description: "Standard of the World.", logo: "cadillac", featured: false },
  { name: "Infiniti", country: "Japan", foundedYear: 1989, valuation: "$5B", category: "Luxury", flagshipModel: "QX80", description: "Luxury performance.", logo: "infiniti", featured: false },
  { name: "Genesis", country: "South Korea", foundedYear: 2015, valuation: "$8B", category: "Luxury", flagshipModel: "G90", description: "Athletic elegance.", logo: "genesis", featured: false },
  { name: "Toyota", country: "Japan", foundedYear: 1937, valuation: "$250B+", category: "JDM Legends", flagshipModel: "Supra GR", description: "Legendary reliability and performance.", logo: "toyota", featured: false },
  { name: "Acura", country: "Japan", foundedYear: 1986, valuation: "$10B", category: "Luxury Performance", flagshipModel: "NSX Type S", description: "Precision crafted performance.", logo: "acura", featured: false },
  { name: "Honda", country: "Japan", foundedYear: 1948, valuation: "$50B", category: "JDM Legends", flagshipModel: "NSX", description: "The power of dreams.", logo: "honda", featured: false },
  { name: "Mazda", country: "Japan", foundedYear: 1920, valuation: "$12B", category: "JDM Legends", flagshipModel: "RX-7 FD", description: "Jinba Ittai.", logo: "mazda", featured: false },
  { name: "Subaru", country: "Japan", foundedYear: 1953, valuation: "$15B", category: "Motorsport Legends", flagshipModel: "WRX STI S209", description: "Confidence in motion.", logo: "subaru", featured: false },
  { name: "Mitsubishi", country: "Japan", foundedYear: 1970, valuation: "$8B", category: "Motorsport Legends", flagshipModel: "Lancer Evolution IX", description: "Drive your ambition.", logo: "mitsubishi", featured: false },
  { name: "Alfa Romeo", country: "Italy", foundedYear: 1910, valuation: "$5B", category: "Sports Luxury", flagshipModel: "Giulia Quadrifoglio", description: "La meccanica delle emozioni.", logo: "alfa-romeo", featured: false },
  { name: "Mercedes-Benz", country: "Germany", foundedYear: 1926, valuation: "$82.4B", category: "Luxury & Performance", flagshipModel: "CLK GTR Roadster", description: "The pinnacle of German engineering, luxury, and high-performance automotive excellence.", logo: "mercedes-benz", featured: true },
];

const newCars = [
  // Rimac
  { brand: "Rimac", name: "Nevera", model: "Nevera", category: "Electric Hypercars", pricePerDay: 5000, estimatedValue: 2500000, horsepower: 1914, acceleration: "1.85", topSpeed: "258 mph", rarity: "ELECTRIC HYPERCAR", featured: true },
  { brand: "Rimac", name: "Concept_One", model: "Concept_One", category: "Electric Hypercars", pricePerDay: 4000, estimatedValue: 1200000, horsepower: 1224, acceleration: "2.5", topSpeed: "221 mph", rarity: "COLLECTOR ICON", featured: false },

  // Gordon Murray Automotive
  { brand: "Gordon Murray Automotive", name: "T.50", model: "T.50", category: "Hypercars", pricePerDay: 7000, estimatedValue: 3000000, horsepower: 654, acceleration: "2.8", topSpeed: "226 mph", rarity: "COLLECTOR ICON", featured: true },
  { brand: "Gordon Murray Automotive", name: "T.33", model: "T.33", category: "Hypercars", pricePerDay: 5500, estimatedValue: 1800000, horsepower: 607, acceleration: "3.0", topSpeed: "208 mph", rarity: "LIMITED EDITION", featured: false },

  // Hennessey
  { brand: "Hennessey", name: "Venom F5", model: "Venom F5", category: "Hypercars", pricePerDay: 6000, estimatedValue: 3000000, horsepower: 1817, acceleration: "2.6", topSpeed: "311 mph", rarity: "LEGENDARY", featured: false },
  { brand: "Hennessey", name: "Venom GT", model: "Venom GT", category: "Hypercars", pricePerDay: 4000, estimatedValue: 1200000, horsepower: 1244, acceleration: "2.7", topSpeed: "270 mph", rarity: "COLLECTOR ICON", featured: false },

  // Lotus
  { brand: "Lotus", name: "Evija", model: "Evija", category: "Electric Hypercars", pricePerDay: 4500, estimatedValue: 2300000, horsepower: 1972, acceleration: "3.0", topSpeed: "200 mph", rarity: "ELECTRIC HYPERCAR", featured: false },
  { brand: "Lotus", name: "Emira", model: "Emira", category: "Sports Car", pricePerDay: 600, estimatedValue: 90000, horsepower: 400, acceleration: "4.2", topSpeed: "180 mph", rarity: "STANDARD", featured: false },
  { brand: "Lotus", name: "Eletre R", model: "Eletre", category: "Luxury SUVs", pricePerDay: 800, estimatedValue: 150000, horsepower: 905, acceleration: "2.9", topSpeed: "165 mph", rarity: "STANDARD", featured: false },

  // SSC
  { brand: "SSC", name: "Tuatara", model: "Tuatara", category: "Hypercars", pricePerDay: 5000, estimatedValue: 1900000, horsepower: 1750, acceleration: "2.5", topSpeed: "295 mph", rarity: "LIMITED EDITION", featured: false },

  // Apollo
  { brand: "Apollo", name: "Intensa Emozione", model: "Intensa Emozione", category: "Track Monsters", pricePerDay: 6000, estimatedValue: 2700000, horsepower: 780, acceleration: "2.7", topSpeed: "208 mph", rarity: "TRACK ONLY", featured: false },

  // Maybach
  { brand: "Maybach", name: "S680", model: "S-Class", category: "Luxury Sedans", pricePerDay: 1200, estimatedValue: 230000, horsepower: 621, acceleration: "4.5", topSpeed: "130 mph", rarity: "STANDARD", featured: false },
  { brand: "Maybach", name: "GLS 600", model: "GLS", category: "Luxury SUVs", pricePerDay: 1300, estimatedValue: 175000, horsepower: 550, acceleration: "4.8", topSpeed: "130 mph", rarity: "STANDARD", featured: false },

  // Jaguar
  { brand: "Jaguar", name: "F-Type R", model: "F-Type", category: "Sports Car", pricePerDay: 700, estimatedValue: 110000, horsepower: 575, acceleration: "3.5", topSpeed: "186 mph", rarity: "STANDARD", featured: false },
  { brand: "Jaguar", name: "XE SV Project 8", model: "XE", category: "Track Monsters", pricePerDay: 1000, estimatedValue: 190000, horsepower: 592, acceleration: "3.3", topSpeed: "200 mph", rarity: "LIMITED EDITION", featured: false },
  { brand: "Jaguar", name: "I-Pace", model: "I-Pace", category: "Luxury SUVs", pricePerDay: 500, estimatedValue: 85000, horsepower: 394, acceleration: "4.5", topSpeed: "124 mph", rarity: "STANDARD", featured: false },

  // Land Rover
  { brand: "Land Rover", name: "Range Rover SV", model: "Range Rover", category: "Luxury SUVs", pricePerDay: 1500, estimatedValue: 250000, horsepower: 606, acceleration: "4.3", topSpeed: "162 mph", rarity: "STANDARD", featured: false },
  { brand: "Land Rover", name: "Defender OCTA", model: "Defender", category: "Luxury SUVs", pricePerDay: 1200, estimatedValue: 160000, horsepower: 626, acceleration: "3.8", topSpeed: "155 mph", rarity: "LIMITED EDITION", featured: false },
  { brand: "Land Rover", name: "Velar SV", model: "Velar", category: "Luxury SUVs", pricePerDay: 800, estimatedValue: 120000, horsepower: 542, acceleration: "4.3", topSpeed: "170 mph", rarity: "STANDARD", featured: false },

  // Cadillac
  { brand: "Cadillac", name: "CT5-V Blackwing", model: "CT5", category: "Sports Sedans", pricePerDay: 900, estimatedValue: 115000, horsepower: 668, acceleration: "3.4", topSpeed: "200 mph", rarity: "STANDARD", featured: false },
  { brand: "Cadillac", name: "Escalade V", model: "Escalade", category: "Luxury SUVs", pricePerDay: 1200, estimatedValue: 160000, horsepower: 682, acceleration: "4.4", topSpeed: "125 mph", rarity: "STANDARD", featured: false },
  { brand: "Cadillac", name: "Celestiq", model: "Celestiq", category: "Ultra Luxury", pricePerDay: 3000, estimatedValue: 340000, horsepower: 600, acceleration: "3.8", topSpeed: "150 mph", rarity: "LIMITED EDITION", featured: false },

  // Infiniti
  { brand: "Infiniti", name: "Q60 Red Sport", model: "Q60", category: "Coupes", pricePerDay: 400, estimatedValue: 60000, horsepower: 400, acceleration: "4.5", topSpeed: "155 mph", rarity: "STANDARD", featured: false },
  { brand: "Infiniti", name: "QX80", model: "QX80", category: "Luxury SUVs", pricePerDay: 600, estimatedValue: 85000, horsepower: 400, acceleration: "5.9", topSpeed: "130 mph", rarity: "STANDARD", featured: false },

  // Genesis
  { brand: "Genesis", name: "G90", model: "G90", category: "Luxury Sedans", pricePerDay: 800, estimatedValue: 100000, horsepower: 409, acceleration: "5.1", topSpeed: "155 mph", rarity: "STANDARD", featured: false },
  { brand: "Genesis", name: "GV80 Coupe", model: "GV80", category: "Luxury SUVs", pricePerDay: 700, estimatedValue: 85000, horsepower: 409, acceleration: "5.3", topSpeed: "149 mph", rarity: "STANDARD", featured: false },
  { brand: "Genesis", name: "X Gran Berlinetta", model: "X Gran", category: "Future Concepts", pricePerDay: 4000, estimatedValue: 1000000, horsepower: 1071, acceleration: "2.5", topSpeed: "220 mph", rarity: "CONCEPT", featured: false },

  // Toyota
  { brand: "Toyota", name: "Supra GR", model: "Supra", category: "JDM Legends", pricePerDay: 400, estimatedValue: 60000, horsepower: 382, acceleration: "3.9", topSpeed: "155 mph", rarity: "STANDARD", featured: false },
  { brand: "Toyota", name: "Century SUV", model: "Century", category: "Luxury SUVs", pricePerDay: 1500, estimatedValue: 170000, horsepower: 406, acceleration: "6.7", topSpeed: "155 mph", rarity: "LIMITED EDITION", featured: false },
  { brand: "Toyota", name: "GR Yaris", model: "Yaris", category: "JDM Legends", pricePerDay: 350, estimatedValue: 45000, horsepower: 268, acceleration: "5.5", topSpeed: "143 mph", rarity: "STANDARD", featured: false },
  { brand: "Toyota", name: "Land Cruiser 300", model: "Land Cruiser", category: "Luxury SUVs", pricePerDay: 600, estimatedValue: 90000, horsepower: 409, acceleration: "6.7", topSpeed: "130 mph", rarity: "STANDARD", featured: false },

  // Acura
  { brand: "Acura", name: "NSX Type S", model: "NSX", category: "Sports Car", pricePerDay: 1500, estimatedValue: 170000, horsepower: 600, acceleration: "2.7", topSpeed: "191 mph", rarity: "LIMITED EDITION", featured: false },
  { brand: "Acura", name: "TLX Type S", model: "TLX", category: "Sports Sedans", pricePerDay: 400, estimatedValue: 55000, horsepower: 355, acceleration: "4.5", topSpeed: "155 mph", rarity: "STANDARD", featured: false },
  { brand: "Acura", name: "Integra", model: "Integra", category: "Sports Sedans", pricePerDay: 300, estimatedValue: 40000, horsepower: 200, acceleration: "7.0", topSpeed: "135 mph", rarity: "STANDARD", featured: false },
  { brand: "Acura", name: "MDX", model: "MDX", category: "Luxury SUVs", pricePerDay: 450, estimatedValue: 65000, horsepower: 355, acceleration: "5.5", topSpeed: "130 mph", rarity: "STANDARD", featured: false },
  { brand: "Acura", name: "ADX", model: "ADX", category: "Luxury SUVs", pricePerDay: 400, estimatedValue: 50000, horsepower: 250, acceleration: "6.5", topSpeed: "130 mph", rarity: "STANDARD", featured: false },

  // Honda
  { brand: "Honda", name: "Civic Type R", model: "Civic", category: "JDM Legends", pricePerDay: 350, estimatedValue: 45000, horsepower: 315, acceleration: "4.9", topSpeed: "170 mph", rarity: "STANDARD", featured: false },
  { brand: "Honda", name: "S2000", model: "S2000", category: "JDM Legends", pricePerDay: 400, estimatedValue: 40000, horsepower: 237, acceleration: "6.0", topSpeed: "150 mph", rarity: "COLLECTOR ICON", featured: false },
  { brand: "Honda", name: "NSX (classic)", model: "NSX", category: "JDM Legends", pricePerDay: 1000, estimatedValue: 120000, horsepower: 290, acceleration: "4.5", topSpeed: "175 mph", rarity: "COLLECTOR ICON", featured: false },

  // Mazda
  { brand: "Mazda", name: "RX-7 FD", model: "RX-7", category: "JDM Legends", pricePerDay: 600, estimatedValue: 60000, horsepower: 276, acceleration: "5.0", topSpeed: "155 mph", rarity: "COLLECTOR ICON", featured: false },
  { brand: "Mazda", name: "RX-8 Spirit R", model: "RX-8", category: "JDM Legends", pricePerDay: 400, estimatedValue: 30000, horsepower: 232, acceleration: "6.0", topSpeed: "145 mph", rarity: "LIMITED EDITION", featured: false },
  { brand: "Mazda", name: "MX-5 RF", model: "MX-5", category: "Convertible Icons", pricePerDay: 300, estimatedValue: 35000, horsepower: 181, acceleration: "5.8", topSpeed: "135 mph", rarity: "STANDARD", featured: false },

  // Subaru
  { brand: "Subaru", name: "WRX STI S209", model: "WRX STI", category: "JDM Legends", pricePerDay: 500, estimatedValue: 65000, horsepower: 341, acceleration: "4.7", topSpeed: "162 mph", rarity: "LIMITED EDITION", featured: false },
  { brand: "Subaru", name: "BRZ tS", model: "BRZ", category: "Sports Car", pricePerDay: 300, estimatedValue: 35000, horsepower: 228, acceleration: "5.4", topSpeed: "140 mph", rarity: "STANDARD", featured: false },

  // Mitsubishi
  { brand: "Mitsubishi", name: "Lancer Evolution IX", model: "Lancer", category: "JDM Legends", pricePerDay: 600, estimatedValue: 55000, horsepower: 286, acceleration: "4.4", topSpeed: "155 mph", rarity: "COLLECTOR ICON", featured: false },
  { brand: "Mitsubishi", name: "3000GT VR-4", model: "3000GT", category: "JDM Legends", pricePerDay: 500, estimatedValue: 45000, horsepower: 320, acceleration: "5.0", topSpeed: "155 mph", rarity: "COLLECTOR ICON", featured: false },

  // Alfa Romeo
  { brand: "Alfa Romeo", name: "Giulia Quadrifoglio", model: "Giulia", category: "Sports Sedans", pricePerDay: 800, estimatedValue: 85000, horsepower: 505, acceleration: "3.8", topSpeed: "191 mph", rarity: "STANDARD", featured: false },
  { brand: "Alfa Romeo", name: "Stelvio Quadrifoglio", model: "Stelvio", category: "Luxury SUVs", pricePerDay: 900, estimatedValue: 90000, horsepower: 505, acceleration: "3.6", topSpeed: "176 mph", rarity: "STANDARD", featured: false },
  { brand: "Alfa Romeo", name: "Tonale", model: "Tonale", category: "Luxury SUVs", pricePerDay: 400, estimatedValue: 45000, horsepower: 285, acceleration: "6.0", topSpeed: "125 mph", rarity: "STANDARD", featured: false },

  // Ferrari Additional
  { brand: "Ferrari", name: "812 Competizione A", model: "812", category: "Convertible Icons", pricePerDay: 4500, estimatedValue: 700000, horsepower: 819, acceleration: "2.8", topSpeed: "211 mph", rarity: "LIMITED EDITION", featured: false },
  { brand: "Ferrari", name: "12Cilindri", model: "12Cilindri", category: "Grand Tourers", pricePerDay: 3500, estimatedValue: 450000, horsepower: 819, acceleration: "2.9", topSpeed: "211 mph", rarity: "STANDARD", featured: false },
  { brand: "Ferrari", name: "Monza SP2", model: "Monza", category: "Collector Icons", pricePerDay: 6000, estimatedValue: 2000000, horsepower: 799, acceleration: "2.9", topSpeed: "186 mph", rarity: "COLLECTOR ICON", featured: true },
  { brand: "Ferrari", name: "599 GTO", model: "599", category: "Collector Icons", pricePerDay: 2500, estimatedValue: 800000, horsepower: 661, acceleration: "3.3", topSpeed: "208 mph", rarity: "COLLECTOR ICON", featured: false },
  { brand: "Ferrari", name: "Testarossa", model: "Testarossa", category: "Retro Classics", pricePerDay: 1500, estimatedValue: 150000, horsepower: 385, acceleration: "5.2", topSpeed: "180 mph", rarity: "COLLECTOR ICON", featured: false },
  { brand: "Ferrari", name: "288 GTO", model: "288", category: "Retro Classics", pricePerDay: 5000, estimatedValue: 3500000, horsepower: 400, acceleration: "4.9", topSpeed: "189 mph", rarity: "LEGENDARY", featured: false },
  { brand: "Ferrari", name: "430 Scuderia", model: "F430", category: "Collector Icons", pricePerDay: 2000, estimatedValue: 250000, horsepower: 503, acceleration: "3.6", topSpeed: "198 mph", rarity: "COLLECTOR ICON", featured: false },
  { brand: "Ferrari", name: "California T", model: "California", category: "Convertible Icons", pricePerDay: 1000, estimatedValue: 120000, horsepower: 553, acceleration: "3.6", topSpeed: "196 mph", rarity: "STANDARD", featured: false },
  { brand: "Ferrari", name: "GTC4Lusso", model: "GTC4Lusso", category: "Grand Tourers", pricePerDay: 1200, estimatedValue: 200000, horsepower: 680, acceleration: "3.4", topSpeed: "208 mph", rarity: "STANDARD", featured: false },
  { brand: "Ferrari", name: "F12tdf", model: "F12", category: "Collector Icons", pricePerDay: 3500, estimatedValue: 1000000, horsepower: 769, acceleration: "2.9", topSpeed: "211 mph", rarity: "LIMITED EDITION", featured: false },
  { brand: "Ferrari", name: "458 Speciale", model: "458", category: "Collector Icons", pricePerDay: 2500, estimatedValue: 400000, horsepower: 597, acceleration: "3.0", topSpeed: "202 mph", rarity: "COLLECTOR ICON", featured: false },
  { brand: "Ferrari", name: "360 Spider", model: "360", category: "Retro Classics", pricePerDay: 800, estimatedValue: 100000, horsepower: 395, acceleration: "4.5", topSpeed: "180 mph", rarity: "STANDARD", featured: false },

  // Lamborghini Additional
  { brand: "Lamborghini", name: "Murciélago SV", model: "Murciélago", category: "Collector Icons", pricePerDay: 2500, estimatedValue: 500000, horsepower: 661, acceleration: "3.2", topSpeed: "212 mph", rarity: "COLLECTOR ICON", featured: false },
  { brand: "Lamborghini", name: "Diablo VT", model: "Diablo", category: "Retro Classics", pricePerDay: 2000, estimatedValue: 250000, horsepower: 492, acceleration: "4.0", topSpeed: "202 mph", rarity: "COLLECTOR ICON", featured: false },
  { brand: "Lamborghini", name: "Reventón", model: "Reventón", category: "Collector Icons", pricePerDay: 4000, estimatedValue: 1500000, horsepower: 641, acceleration: "3.4", topSpeed: "211 mph", rarity: "LIMITED EDITION", featured: false },
  { brand: "Lamborghini", name: "Essenza SCV12", model: "Essenza", category: "Track Monsters", pricePerDay: 7000, estimatedValue: 2600000, horsepower: 820, acceleration: "2.6", topSpeed: "210 mph", rarity: "TRACK ONLY", featured: false },
  { brand: "Lamborghini", name: "Aventador S Roadster", model: "Aventador", category: "Convertible Icons", pricePerDay: 2500, estimatedValue: 450000, horsepower: 730, acceleration: "3.0", topSpeed: "217 mph", rarity: "STANDARD", featured: false },
  { brand: "Lamborghini", name: "Veneno", model: "Veneno", category: "Hypercars", pricePerDay: 8000, estimatedValue: 4500000, horsepower: 740, acceleration: "2.8", topSpeed: "221 mph", rarity: "LEGENDARY", featured: true },
  { brand: "Lamborghini", name: "Countach LPI 800-4", model: "Countach", category: "Collector Icons", pricePerDay: 4500, estimatedValue: 2600000, horsepower: 803, acceleration: "2.8", topSpeed: "221 mph", rarity: "LIMITED EDITION", featured: false },
  { brand: "Lamborghini", name: "Sesto Elemento", model: "Sesto Elemento", category: "Track Monsters", pricePerDay: 6000, estimatedValue: 2500000, horsepower: 570, acceleration: "2.5", topSpeed: "221 mph", rarity: "TRACK ONLY", featured: false },

  // Bugatti Additional
  { brand: "Bugatti", name: "EB110", model: "EB110", category: "Retro Classics", pricePerDay: 4000, estimatedValue: 2000000, horsepower: 552, acceleration: "3.2", topSpeed: "213 mph", rarity: "LEGENDARY", featured: false },
  { brand: "Bugatti", name: "Chiron Pur Sport", model: "Chiron", category: "Track Monsters", pricePerDay: 8000, estimatedValue: 3600000, horsepower: 1479, acceleration: "2.3", topSpeed: "218 mph", rarity: "LIMITED EDITION", featured: false },
  { brand: "Bugatti", name: "Chiron", model: "Chiron", category: "Hypercars", pricePerDay: 7000, estimatedValue: 3000000, horsepower: 1479, acceleration: "2.4", topSpeed: "261 mph", rarity: "STANDARD", featured: false },

  // Koenigsegg Additional
  { brand: "Koenigsegg", name: "Agera RS", model: "Agera", category: "Hypercars", pricePerDay: 6500, estimatedValue: 2500000, horsepower: 1160, acceleration: "2.8", topSpeed: "277 mph", rarity: "LEGENDARY", featured: true },
  { brand: "Koenigsegg", name: "CCX", model: "CCX", category: "Hypercars", pricePerDay: 3500, estimatedValue: 1000000, horsepower: 806, acceleration: "3.2", topSpeed: "245 mph", rarity: "COLLECTOR ICON", featured: false },

  // Pagani Additional
  { brand: "Pagani", name: "Zonda F", model: "Zonda", category: "Collector Icons", pricePerDay: 3000, estimatedValue: 1200000, horsepower: 594, acceleration: "3.6", topSpeed: "214 mph", rarity: "COLLECTOR ICON", featured: false },
  { brand: "Pagani", name: "Zonda HP Barchetta", model: "Zonda", category: "Convertible Icons", pricePerDay: 9000, estimatedValue: 15000000, horsepower: 789, acceleration: "3.1", topSpeed: "220 mph", rarity: "LEGENDARY", featured: false },

  // McLaren Additional
  { brand: "McLaren", name: "720S", model: "720S", category: "Supercars", pricePerDay: 1500, estimatedValue: 300000, horsepower: 710, acceleration: "2.8", topSpeed: "212 mph", rarity: "STANDARD", featured: false },
  { brand: "McLaren", name: "600LT", model: "600LT", category: "Track Monsters", pricePerDay: 1200, estimatedValue: 250000, horsepower: 592, acceleration: "2.8", topSpeed: "204 mph", rarity: "STANDARD", featured: false },
  { brand: "McLaren", name: "MP4-12C", model: "MP4-12C", category: "Supercars", pricePerDay: 800, estimatedValue: 100000, horsepower: 592, acceleration: "3.1", topSpeed: "205 mph", rarity: "STANDARD", featured: false },
  { brand: "McLaren", name: "GT", model: "GT", category: "Grand Tourers", pricePerDay: 1000, estimatedValue: 210000, horsepower: 612, acceleration: "3.1", topSpeed: "203 mph", rarity: "STANDARD", featured: false },
  { brand: "McLaren", name: "F1", model: "F1", category: "Collector Icons", pricePerDay: 10000, estimatedValue: 20000000, horsepower: 618, acceleration: "3.2", topSpeed: "240 mph", rarity: "LEGENDARY", featured: false },
  { brand: "McLaren", name: "W1", model: "W1", category: "Hypercars", pricePerDay: 5000, estimatedValue: 2500000, horsepower: 1258, acceleration: "2.7", topSpeed: "217 mph", rarity: "CONCEPT", featured: false },

  // Porsche Additional
  { brand: "Porsche", name: "911 Sport Classic", model: "911", category: "Limited Editions", pricePerDay: 1500, estimatedValue: 300000, horsepower: 542, acceleration: "4.1", topSpeed: "196 mph", rarity: "LIMITED EDITION", featured: false },
  { brand: "Porsche", name: "911 Targa 4S", model: "911", category: "Convertible Icons", pricePerDay: 1000, estimatedValue: 150000, horsepower: 443, acceleration: "3.4", topSpeed: "188 mph", rarity: "STANDARD", featured: false },
  { brand: "Porsche", name: "911 R", model: "911", category: "Collector Icons", pricePerDay: 2000, estimatedValue: 400000, horsepower: 500, acceleration: "3.7", topSpeed: "200 mph", rarity: "LIMITED EDITION", featured: false },
  { brand: "Porsche", name: "959", model: "959", category: "Retro Classics", pricePerDay: 3500, estimatedValue: 1800000, horsepower: 444, acceleration: "3.6", topSpeed: "197 mph", rarity: "LEGENDARY", featured: false },
  { brand: "Porsche", name: "Macan Turbo EV", model: "Macan", category: "Luxury SUVs", pricePerDay: 600, estimatedValue: 105000, horsepower: 630, acceleration: "3.1", topSpeed: "161 mph", rarity: "STANDARD", featured: false },
  { brand: "Porsche", name: "Cayenne Turbo GT", model: "Cayenne", category: "Luxury SUVs", pricePerDay: 1200, estimatedValue: 200000, horsepower: 650, acceleration: "3.1", topSpeed: "189 mph", rarity: "STANDARD", featured: false },

  // BMW Additional
  { brand: "BMW", name: "M8 Competition", model: "M8", category: "Grand Tourers", pricePerDay: 1000, estimatedValue: 140000, horsepower: 617, acceleration: "3.0", topSpeed: "190 mph", rarity: "STANDARD", featured: false },
  { brand: "BMW", name: "Z4 M40i", model: "Z4", category: "Sports Car", pricePerDay: 500, estimatedValue: 65000, horsepower: 382, acceleration: "3.9", topSpeed: "155 mph", rarity: "STANDARD", featured: false },
  { brand: "BMW", name: "E46 M3 CSL", model: "M3", category: "Collector Icons", pricePerDay: 800, estimatedValue: 120000, horsepower: 355, acceleration: "4.8", topSpeed: "155 mph", rarity: "COLLECTOR ICON", featured: false },
  { brand: "BMW", name: "M1 Procar", model: "M1", category: "Motorsport Legends", pricePerDay: 2500, estimatedValue: 800000, horsepower: 470, acceleration: "4.3", topSpeed: "193 mph", rarity: "LEGENDARY", featured: false },
  { brand: "BMW", name: "X4 M40i", model: "X4", category: "Luxury SUVs", pricePerDay: 450, estimatedValue: 65000, horsepower: 382, acceleration: "4.4", topSpeed: "130 mph", rarity: "STANDARD", featured: false },

  // Audi Additional
  { brand: "Audi", name: "RS3", model: "RS3", category: "Sports Sedans", pricePerDay: 400, estimatedValue: 60000, horsepower: 401, acceleration: "3.6", topSpeed: "155 mph", rarity: "STANDARD", featured: false },
  { brand: "Audi", name: "RS5 Coupe", model: "RS5", category: "Coupes", pricePerDay: 600, estimatedValue: 80000, horsepower: 444, acceleration: "3.7", topSpeed: "174 mph", rarity: "STANDARD", featured: false },
  { brand: "Audi", name: "S8", model: "S8", category: "Luxury Sedans", pricePerDay: 900, estimatedValue: 120000, horsepower: 563, acceleration: "3.8", topSpeed: "155 mph", rarity: "STANDARD", featured: false },
  { brand: "Audi", name: "Quattro Rally Legend", model: "Quattro", category: "Motorsport Legends", pricePerDay: 1500, estimatedValue: 300000, horsepower: 300, acceleration: "4.8", topSpeed: "140 mph", rarity: "LEGENDARY", featured: false },
  { brand: "Audi", name: "Q8", model: "Q8", category: "Luxury SUVs", pricePerDay: 600, estimatedValue: 80000, horsepower: 335, acceleration: "5.6", topSpeed: "130 mph", rarity: "STANDARD", featured: false },
  { brand: "Audi", name: "Q6 e-tron", model: "Q6", category: "Luxury SUVs", pricePerDay: 500, estimatedValue: 70000, horsepower: 456, acceleration: "4.9", topSpeed: "130 mph", rarity: "STANDARD", featured: false },
  { brand: "Audi", name: "A6", model: "A6", category: "Luxury Sedans", pricePerDay: 400, estimatedValue: 60000, horsepower: 335, acceleration: "5.1", topSpeed: "130 mph", rarity: "STANDARD", featured: false },

  // Mercedes / AMG Additional
  { brand: "Mercedes-Benz", name: "CLK GTR", model: "CLK", category: "Motorsport Legends", pricePerDay: 8000, estimatedValue: 8000000, horsepower: 604, acceleration: "3.8", topSpeed: "214 mph", rarity: "LEGENDARY", featured: false },
  { brand: "Mercedes-Benz", name: "SLR McLaren", model: "SLR", category: "Collector Icons", pricePerDay: 2500, estimatedValue: 400000, horsepower: 617, acceleration: "3.8", topSpeed: "208 mph", rarity: "COLLECTOR ICON", featured: false },
  { brand: "Mercedes-Benz", name: "AMG GT 63", model: "AMG GT", category: "Sports Car", pricePerDay: 1200, estimatedValue: 180000, horsepower: 577, acceleration: "3.1", topSpeed: "196 mph", rarity: "STANDARD", featured: false },
  { brand: "Mercedes-Benz", name: "Stirling Moss", model: "SLR", category: "Convertible Icons", pricePerDay: 5000, estimatedValue: 3000000, horsepower: 641, acceleration: "3.5", topSpeed: "217 mph", rarity: "LEGENDARY", featured: false },
  { brand: "Mercedes-Benz", name: "SLS AMG", model: "SLS", category: "Collector Icons", pricePerDay: 1800, estimatedValue: 250000, horsepower: 563, acceleration: "3.7", topSpeed: "197 mph", rarity: "COLLECTOR ICON", featured: false },

  // Aston Martin Additional
  { brand: "Aston Martin", name: "Rapide S", model: "Rapide", category: "Luxury Sedans", pricePerDay: 1000, estimatedValue: 200000, horsepower: 552, acceleration: "4.2", topSpeed: "203 mph", rarity: "STANDARD", featured: false },
  { brand: "Aston Martin", name: "Victor", model: "Victor", category: "Limited Editions", pricePerDay: 7000, estimatedValue: 3000000, horsepower: 836, acceleration: "3.0", topSpeed: "200 mph", rarity: "LIMITED EDITION", featured: false },
  { brand: "Aston Martin", name: "V12 Speedster", model: "Speedster", category: "Convertible Icons", pricePerDay: 3000, estimatedValue: 1000000, horsepower: 690, acceleration: "3.4", topSpeed: "198 mph", rarity: "LIMITED EDITION", featured: false },
  { brand: "Aston Martin", name: "DB5", model: "DB5", category: "Retro Classics", pricePerDay: 2500, estimatedValue: 1000000, horsepower: 282, acceleration: "8.0", topSpeed: "145 mph", rarity: "COLLECTOR ICON", featured: false },

  // Bentley Additional
  { brand: "Bentley", name: "Mulliner Batur Convertible", model: "Batur", category: "Convertible Icons", pricePerDay: 5000, estimatedValue: 2000000, horsepower: 740, acceleration: "3.4", topSpeed: "209 mph", rarity: "LIMITED EDITION", featured: false },
  { brand: "Bentley", name: "Azure", model: "Azure", category: "Convertible Icons", pricePerDay: 1500, estimatedValue: 350000, horsepower: 450, acceleration: "5.5", topSpeed: "150 mph", rarity: "STANDARD", featured: false },
  { brand: "Bentley", name: "Mulsanne", model: "Mulsanne", category: "Ultra Luxury", pricePerDay: 2000, estimatedValue: 350000, horsepower: 505, acceleration: "5.1", topSpeed: "184 mph", rarity: "STANDARD", featured: false },
];

async function main() {
  console.log("Starting massive fleet expansion...");

  for (const b of newBrands) {
    const existing = await prisma.brand.findUnique({ where: { name: b.name } });
    if (!existing) {
      await prisma.brand.create({ data: b });
      console.log(`Created brand: ${b.name}`);
    } else {
      console.log(`Brand already exists: ${b.name}`);
    }
  }

  for (const c of newCars) {
    const existing = await prisma.car.findFirst({ where: { name: c.name } });
    if (!existing) {
      // Check if brand exists to avoid relation error
      const brandObj = await prisma.brand.findUnique({ where: { name: c.brand } });
      if (!brandObj) {
          console.warn(`Warning: Brand ${c.brand} does not exist for car ${c.name}, skipping or creating brand...`);
          // Let's create a minimal brand entry if it's missing just to be safe
          await prisma.brand.create({
              data: {
                  name: c.brand,
                  logo: c.brand.toLowerCase().replace(/\s+/g, '-'),
                  country: "Unknown",
                  foundedYear: 2000,
                  valuation: "Unknown",
                  category: "Automotive",
                  flagshipModel: c.model,
                  description: `Premium vehicles from ${c.brand}.`,
                  featured: false
              }
          })
      }

      await prisma.car.create({
        data: {
          name: c.name,
          brand: c.brand,
          model: c.model,
          year: 2024,
          category: c.category,
          pricePerDay: c.pricePerDay,
          estimatedValue: c.estimatedValue,
          transmission: "Automatic",
          fuelType: c.category.includes("Electric") ? "Electric" : "Petrol",
          drivetrain: "AWD",
          seats: c.category.includes("Sedan") || c.category.includes("SUV") ? 5 : 2,
          doors: c.category.includes("Sedan") || c.category.includes("SUV") ? 4 : 2,
          mileage: "100 miles",
          engine: c.category.includes("Electric") ? "Electric Motors" : "V8/V12",
          horsepower: c.horsepower,
          acceleration: c.acceleration,
          topSpeed: c.topSpeed,
          description: `The spectacular ${c.brand} ${c.name}, available exclusively on the Unique platform.`,
          soundProfile: c.category.includes("Electric") ? "Silent" : "Aggressive",
          features: JSON.stringify(["Leather", "Carbon Fiber", "Premium Audio"]),
          tags: JSON.stringify([c.category, c.rarity]),
          images: JSON.stringify([`/images/placeholder.png`]),
          mainImage: `/images/placeholder.png`,
          location: "New York",
          available: true,
          featured: c.featured,
          rarity: c.rarity
        }
      });
      console.log(`Created car: ${c.name}`);
    } else {
       await prisma.car.update({
          where: { id: existing.id },
          data: { rarity: c.rarity, featured: c.featured, category: c.category }
       });
       console.log(`Updated car: ${c.name}`);
    }
  }

  console.log("Expansion complete!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
