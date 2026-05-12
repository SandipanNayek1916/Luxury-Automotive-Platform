import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const carData: Record<string, { soundProfile: string; description: string; features: string[] }> = {
  "Lamborghini Urus SE": {
    soundProfile: "4.0L twin-turbo V8 hybrid — commanding SUV authority with pop-and-bang exhaust",
    description: "The Super SUV elevated. The Urus SE plugs-in a hybrid system to the mighty twin-turbo V8, delivering even sharper response, electric-only capability, and the same Lamborghini theatre that redefined the luxury SUV segment.",
    features: ["Plug-In Hybrid AWD","800V Charging Architecture","Active Torque Vectoring","Carbon Ceramic Brakes","Air Suspension + RCAS","Panoramic Carbon Roof","Bang & Olufsen 3D Sound","Off-Road Terrain Modes"],
  },
  "Lamborghini Urus Performante": {
    soundProfile: "4.0L twin-turbo V8 — sharpened, lighter, angrier Urus bark with crackle on lift",
    description: "The sharpest Urus ever. The Performante sheds 47 kg over the standard car, gains recalibrated suspension, and adds Pirelli P Zero Trofeo R tyres — transforming the Super SUV into a genuine track day participant.",
    features: ["47kg Weight Reduction","Pirelli Trofeo R Tires","Titanium Exhaust System","Carbon Fiber Body Kit","Lifted Suspension Mode","Lamborghini Bicolore Interior","Increased Rear Downforce","Sport Exhaust with Valves"],
  },
  "Lamborghini Revuelto": {
    soundProfile: "6.5L V12 PHEV — naturally aspirated V12 opera with three electric motors",
    description: "The successor to the Aventador. The Revuelto combines Lamborghini's final naturally aspirated V12 with three electric motors for 1,015 hp of hybrid power — all-wheel drive, all-wheel steering, and an emotional intensity unlike anything else.",
    features: ["1015hp PHEV V12 Hybrid","All-Wheel Drive + Steering","Carbon Fibre Monocoque","Vertical Dihedral Doors","800V Architecture","Lamborghini Infotainment UNICA","Track + Road Drive Modes","Carbon Ceramic 10-Piston Brakes"],
  },
  "Lamborghini Centenario": {
    soundProfile: "6.5L V12 naturally aspirated — thunderous celebration of Ferruccio's centenary",
    description: "Built to celebrate Ferruccio Lamborghini's 100th birthday. Only 40 exist — 20 coupés, 20 roadsters. The Centenario pairs the Aventador's legendary V12 with aerodynamic artwork that is simultaneously a tribute and a statement.",
    features: ["Limited to 40 Units","6.5L NA V12 770hp","Active Rear Steering","Carbon Fiber Monocoque","Pirelli P Zero Corsa","Personalised Heritage Plaque","Carbon Fiber Interior","Rear Diffuser Aero System"],
  },
  "Lamborghini Temerario": {
    soundProfile: "4.0L twin-turbo V8 hybrid — high-revving compact mid-engine ferocity",
    description: "The Huracán's successor. The Temerario introduces Lamborghini's new twin-turbo V8 paired with electric motors — a compact mid-engine architecture that is lighter, faster, and more focused than anything before it in its class.",
    features: ["V8 Twin-Turbo Hybrid","Three Electric Motors","Carbon Fiber Monocoque","Active Aerodynamics","Lamborghini Dynamic Steering","Carbon Ceramic Brakes","Track Telemetry Integration","Bespoke Interior Program"],
  },
  "Lamborghini Sián FKP 37": {
    soundProfile: "6.5L V12 + supercapacitor — Aventador soul with instant electric torque overlay",
    description: "Lamborghini's first hybrid is also its most exclusive. Named in honour of Lamborghini Chairman Stephan Winkelmann's initials, the Sián uses supercapacitor technology for immediate torque, never seen before in a Lamborghini road car.",
    features: ["Supercapacitor Hybrid Tech","63 Units Only","6.5L NA V12","Titanium 3D-Printed Parts","Hexagonal Design Language","Lamborghini Ad Personam","Carbon Fiber Body","Named Stephan Winkelmann"],
  },
  "Lamborghini Gallardo Superleggera": {
    soundProfile: "5.0L V10 naturally aspirated — sharp, racy Italian wail at full throttle",
    description: "Superleggera — Italian for 'super light'. The Gallardo LP 570-4 stripped weight relentlessly: polycarbonate windows, carbon doors, titanium exhaust — making it the most driver-focused Gallardo ever produced.",
    features: ["100kg Weight Reduction","5.0L LP570-4 V10","Polycarbonate Side Windows","Titanium Exhaust System","Carbon Fiber Doors","Sport Bucket Seats","Alcantara Interior","Track-Tuned Suspension"],
  },
  "Lamborghini Huracán Tecnica": {
    soundProfile: "5.2L V10 naturally aspirated — rear-drive shriek with open-gate sharpness",
    description: "The purist's Huracán. Rear-wheel drive only — the Tecnica delivers the most analogue, driver-focused Huracán experience with a high-mounted rear wing, a refined EVO chassis, and no front-axle assistance to catch your mistakes.",
    features: ["Rear-Wheel Drive Only","5.2L NA V10 640hp","Fixed High Rear Wing","Lamborghini Dynamic Steering","MagneRide Suspension","Alcantara + Carbon Interior","Haldex-Free RWD Chassis","Sport Exhaust Standard"],
  },
  "Porsche 918 Spyder": {
    soundProfile: "4.6L V8 hybrid — race-bred scream meets instant electric thrust",
    description: "The car that proved hybrid technology could be pure performance. The 918 Spyder completed the Nürburgring in 6:57 — 887 hp from a V8 and two electric motors in a carbon fibre roadster that redefined the possible.",
    features: ["887hp V8 + Hybrid System","Nürburgring 6:57 Record","Carbon Fibre Monocoque","Weissach Package Option","Ceramic Composite Brakes","Porsche Torque Vectoring","Front + Rear Electric Motors","Formula 1-Inspired Aero"],
  },
  "Porsche 911 Turbo S": {
    soundProfile: "Twin-turbo flat-six — iconic whistle and thrust, refined but devastating",
    description: "The everyman's supercar. The 911 Turbo S has launched a thousand rivalries and won them all — all-weather AWD, launch control, 640 hp, and the unshakable Porsche reliability that makes every day feel like a racetrack.",
    features: ["640hp Twin-Turbo Flat-Six","Sport Chrono Package","PCCB Ceramic Brakes","Rear-Axle Steering","Porsche Surface Coated Brakes","21-inch Turbo Wheels","Burmester High-End Audio","Adaptive Sport Seats Plus"],
  },
  "Porsche 911 Dakar": {
    soundProfile: "Carrera 4S flat-six — crisp and purposeful, built for any terrain",
    description: "The 911 that can go anywhere. Inspired by René Metge's 1984 Paris-Dakar victory, the 911 Dakar raises the ride height, adds knobby all-terrain tyres, and proves that sports car purity is not limited to tarmac.",
    features: ["50mm Raised Ride Height","Michelin Pilot Alpin 5 Tires","Lightweight Roof Rack Option","Rallye Design Package","Off-Road Driving Mode","Underbody Protection","Retro-Dakar Livery Option","Sport Chrono Package"],
  },
  "Porsche Taycan Turbo GT": {
    soundProfile: "Electric Turbo GT surge — Porsche Sport Sound system, near-silent warp speed",
    description: "The most powerful Porsche ever built. The Taycan Turbo GT produces 1,108 hp in overboost with launch control engaged — it lapped the Nürburgring faster than the 918 Spyder, making it the quickest Porsche of all time.",
    features: ["1,108hp Overboost Mode","Nürburgsburg EV Lap Record","800V Dual Motor AWD","Carbon Fibre Weave Bucket Seats","Porsche Ceramic Composite Brakes","Adaptive Air Suspension","21-inch Turbo GT Wheels","Porsche Track Precision App"],
  },
  "Porsche Panamera Turbo": {
    soundProfile: "4.0L twin-turbo V8 — cultured, deep GT note with unexpected savagery",
    description: "The sports car for five. The Panamera Turbo delivers 620 hp in a four-door body that handles like a 911, carries five in limousine comfort, and covers distance with an effortless authority that no pure sports car can match.",
    features: ["4.0L Twin-Turbo V8 620hp","Rear-Axle Steering","Porsche Active Suspension","4-Seat Executive Layout","Burmester 3D-Surround Sound","Panoramic Sunroof","Night Vision Assist","Power Sport Seats with Memory"],
  },
  "Porsche Cayman GT4 RS": {
    soundProfile: "4.0L naturally aspirated flat-six — high-revving, motorsport-derived howl",
    description: "The most driver-focused Porsche you can buy without a roll cage. The GT4 RS borrows the Carrera S engine and places it mid-car — the result is a naturally aspirated flat-six screaming to 9,000 rpm in a chassis of absolute purity.",
    features: ["9,000 RPM Flat-Six","GT3 RS-Derived Aero","Weissach Package Carbon","Porsche Torque Vectoring","PDK Gearbox Only","Michelin Pilot Cup 2R","CFRP Rear Wing","Full Carbon Interior Trim"],
  },
};

async function main() {
  let updated = 0, skipped = 0;
  for (const [name, data] of Object.entries(carData)) {
    const car = await prisma.car.findFirst({ where: { name } });
    if (!car) { console.log(`⚠️  Not found: ${name}`); skipped++; continue; }
    await prisma.car.update({
      where: { id: car.id },
      data: { soundProfile: data.soundProfile, description: data.description, features: JSON.stringify(data.features) },
    });
    console.log(`✅ ${name}`);
    updated++;
  }
  console.log(`\nDone — ${updated} updated, ${skipped} skipped.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
