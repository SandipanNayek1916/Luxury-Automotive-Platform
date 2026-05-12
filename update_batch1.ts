import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const data: Record<string, { s: string; d: string; f: string[] }> = {
  "Bugatti Veyron Grand Sport Vitesse": {
    s: "8.0L W16 quad-turbo open-top roar — wind and 1,200hp in visceral harmony",
    d: "The world's fastest open-top production car at launch. The Veyron Grand Sport Vitesse produces 1,200 hp from its W16 engine with the roof removed — a sensory overload of speed, wind, and Bugatti excess at 410 km/h.",
    f: ["1200hp W16 Quad-Turbo","Open-Air Targa Architecture","Carbon Ceramic Brakes","Titanium Exhaust","Removable Fabric Roof","Michelin PAX Run-Flat","7-Speed DSG Gearbox","Hand-Stitched Leather Interior"],
  },
  "Koenigsegg Jesko Attack": {
    s: "5.0L twin-turbo V8 flat-plane — razor-sharp shriek optimised for cornering downforce",
    d: "Where the Absolut chases top speed, the Jesko Attack hunts lap records. 1,600 hp, 1,400 kg of downforce, and the 9-speed Light Speed Transmission deliver a cornering weapon built to destroy racetracks.",
    f: ["1,400kg Peak Downforce","LST 9-Speed Gearbox","Freevalve Engine Tech","Carbon Monocoque","Pushrod Triplex Suspension","E85 Bi-Fuel","Michelin Pilot Sport Cup 2","Track Telemetry System"],
  },
  "Koenigsegg CC850": {
    s: "5.0L twin-turbo V8 — Engera Light Speed Transmission shriek meets manual feel",
    d: "A living tribute to the CC8S that started it all. The CC850 uniquely offers both manual and automatic modes in its Engage Shift System — 1,385 hp with the soul of a purist's gearbox and the speed of a hypercar.",
    f: ["Engage Shift System (Manual+Auto)","1385hp Twin-Turbo V8","Anniversary Carbon Livery","Triplex Rear Suspension","E85 Compatible","Naked Carbon Interior","Only 50 Units","Heritage Plaque"],
  },
  "Koenigsegg One:1": {
    s: "5.0L twin-turbo V8 — 1,341hp screaming megacar, one horsepower per kilogram",
    d: "The world's first megacar — 1,341 hp matched to 1,341 kg for a perfect 1:1 power-to-weight ratio. Only 7 were built. The One:1 was the first production car to target a sub-6-minute Nürburgring lap.",
    f: ["1:1 Power-to-Weight Ratio","Active Aero Top Wing","Carbon Fibre Body","Dihedral Synchro-Helix Doors","Only 7 Built","Track-Only Spec Available","Pushrod Suspension","Michelin Cup Tires"],
  },
  "Pagani Huayra BC": {
    s: "6.0L AMG twin-turbo V12 — torque-rich Italian thunderclap with titanium exhaust song",
    d: "Named in honour of Benny Caiola, Pagani's first client. The Huayra BC is 132 kg lighter than the standard Huayra, with a stiffer chassis, titanium exhaust, and active aerodynamics that pin it to the road at speed.",
    f: ["132kg Lighter Than Standard","Titanium Exhaust System","Active Aero Four Flaps","Carbo-Titanium Monocoque","Magnesium Wheels","Brembo Carbon Brakes","Pagani Huayra Heritage Interior","Named Benny Caiola"],
  },
  "Pagani Zonda Revolución": {
    s: "6.0L AMG V12 naturally aspirated — 800hp track scream, no road compromises",
    d: "The most extreme Zonda ever built and the final chapter of the model. The Revolución is a track-only machine producing 800 hp from its naturally aspirated AMG V12 — only 5 were built, each one a rolling masterpiece.",
    f: ["800hp NA V12","Track-Only Configuration","KERS Hybrid System","Carbon Fibre Monocoque","Racing Harness","Slick Pirelli Tires","Only 5 Units Built","Pagani Heritage Certificate"],
  },
  "McLaren Artura": {
    s: "3.0L twin-turbo V6 hybrid — punchy mid-engine pop with electric torque fill",
    d: "McLaren's new chapter. The Artura introduces a completely new V6 hybrid architecture — lighter than any McLaren before it thanks to a new carbon fibre tub, and sharper thanks to instant electric torque filling every gap in the powerband.",
    f: ["PHEV Twin-Turbo V6","All-New Carbon Tub","E-Motor Instant Torque","McLaren Track Telemetry","Driver-Focused Cockpit","Touring Pack Option","Heated Sport Seats","Electrochromic Roof"],
  },
  "McLaren 750S": {
    s: "4.0L twin-turbo V8 — sharpened 720S howl, louder and more aggressive exhaust note",
    d: "The 720S evolved. The 750S is 30 hp stronger, 30 kg lighter, and aerodynamically optimised — new active rear wing from the 765LT, carbon ceramic brakes standard, and a recalibrated chassis that makes every corner a reward.",
    f: ["750hp Twin-Turbo V8","Active Rear Wing","Carbon Ceramic Brakes","Folding Driver Display","Bowers & Wilkins Audio","Lightweight Carbon Doors","Track + Comfort Modes","McLaren Orange Brake Calipers"],
  },
  "McLaren Elva": {
    s: "4.0L twin-turbo V8 open-air — pure wind-in-face 804hp roadster intensity",
    d: "No windscreen. No roof. No limits. The Elva is McLaren's most extreme open-air experience — an active air management system directs airflow over the cockpit, letting 804 hp of twin-turbo V8 propel you without barrier to the sky.",
    f: ["Active Air Management System","No Windscreen Design","804hp V8 Open-Air","Lightest McLaren Road Car","Carbon Fibre Monocoque","Bespoke Soft Luggage","Elva Heritage Livery","Named After Bruce McLaren's Race Car"],
  },
  "McLaren Solus GT": {
    s: "5.2L naturally aspirated V10 — single-seater race car shriek, unfiltered Formula 1 soul",
    d: "From Gran Turismo to reality. The Solus GT was originally designed as a video game car — McLaren built 25 real ones. A naturally aspirated V10, a single seat, and a bubble canopy deliver the closest legal road-to-race experience.",
    f: ["Single-Seat Configuration","5.2L NA V10","Bubble Canopy Cockpit","Formula-Derived Pushrod Suspension","Only 25 Units Built","HANS Device Standard","Carbon Monocoque","Gran Turismo Heritage"],
  },
  "Ferrari F80": {
    s: "V6 hybrid 1,200hp — electric-boosted high-revving Ferrari war cry",
    d: "Ferrari's most powerful road car ever. The F80 uses a Le Mans-derived V6 hybrid powertrain producing 1,200 hp — an aerodynamic body generating over 1,000 kg of downforce and a driving experience calibrated from F1 data.",
    f: ["1,200hp V6 Hybrid","1,000kg Downforce","Le Mans-Derived Technology","Carbon Fibre Monocoque","Active Ground Effect","Formula 1 Aerodynamics","Only 799 Units","Ferrari Personalisation Program"],
  },
  "Ferrari 488 Pista": {
    s: "3.9L twin-turbo V8 — competition-tuned roar with titanium exhaust fury",
    d: "Pista means track in Italian. The 488 Pista uses the most powerful Ferrari V8 engine in history — 710 hp with 50% of its components derived from the Ferrari Challenge race series. Every detail exists to lap faster.",
    f: ["50% Racing Components","710hp Race-Derived V8","Carbon Fibre Bumpers","Titanium Connecting Rods","Side Slip Angle Control 6.0","Track-Tuned Suspension","Racing Harness Option","Michelin Pilot Sport Cup 2"],
  },
  "Ferrari Portofino M": {
    s: "3.9L twin-turbo V8 convertible — refined GT bark with roof-down Italian theatre",
    d: "La Dolce Vita in open-top form. The Portofino M adds a Manettino with Race mode, an 8-speed dual-clutch gearbox, and a folding hardtop that retracts in 14 seconds — grand touring elevated to the Ferrari standard.",
    f: ["8-Speed DCT Gearbox","Retractable Hardtop 14s","Race Manettino Mode","4-Point Rear Spoiler","Passenger Display Screen","Apple CarPlay Integration","Ferrari Leather Interior","Rear-Seat Comfort System"],
  },
  "Ferrari Enzo Ferrari": {
    s: "6.0L V12 naturally aspirated — raw, mechanical, F1-road-car scream at 8,200rpm",
    d: "The apex of Ferrari's early 2000s engineering. Named after the Commendatore himself, the Enzo Ferrari used active aerodynamics, carbon ceramic brakes, and F1-derived traction control in a naturally aspirated V12 that defined an era.",
    f: ["660hp 6.0L V12","Carbon Ceramic Brakes Pioneer","F1-Derived Traction Control","Carbon Fibre Monocoque","Active Aero Rear Wing","Only 399 Built","Brembo CCM Brakes","Sequential Manual Gearbox"],
  },
  "Ferrari F40": {
    s: "2.9L twin-turbo V8 — raw turbo lag then savage power, no electronics to save you",
    d: "The last Ferrari personally approved by Enzo Ferrari. No ABS, no traction control, no carpet — just 478 hp of turbocharged V8 in a Kevlar and carbon body weighing 1,100 kg. Pure, uncompromising speed made physical.",
    f: ["No ABS, No TC, No Aids","Kevlar & Carbon Body","Twin-Turbo V8 478hp","Plexiglass Side Windows","Racing Bucket Seats","Exposed Carbon Interior","Last Enzo-Approved Ferrari","Collector's Benchmark"],
  },
  "Ferrari F50": {
    s: "4.7L naturally aspirated V12 — Formula 1 road car howl, engine mounted to chassis",
    d: "A Formula 1 car for the road. The F50's V12 is bolted directly to the carbon tub as a structural member — exactly as in F1. The result is a mechanical feedback loop between engine and driver that no other road car has replicated.",
    f: ["V12 Structural Engine Mount","F1-Derived Carbon Tub","355 Units Only","Removable Hard Top","Push-Rod Suspension","Open-Gate Gearbox Feel","Hand-Built V12","Ferrari Classiche Eligible"],
  },
  "Ferrari Testarossa": {
    s: "4.9L flat-12 horizontally opposed — iconic straked-intake rumble, 1980s cinema",
    d: "An icon of the 1980s. The Testarossa's flat-12 engine, side strakes, and wide rear haunches made it the poster car of a generation. Its horizontally opposed engine produces a unique soundtrack unlike anything before or since.",
    f: ["4.9L Flat-12 Engine","Iconic Side Strake Design","5-Speed Manual Gearbox","Two Exterior Mirrors","Hand-Built at Maranello","Ferrari Classiche Eligible","Pinin Farina Design","No Electronic Aids"],
  },
  "Ferrari Purosangue": {
    s: "6.5L V12 naturally aspirated SUV — Ferrari opera at all heights, all speeds",
    d: "Ferrari's first four-door, four-seat car ever. The Purosangue uses the same naturally aspirated V12 as the 812 Superfast — in a body that accommodates four adults yet handles with the precision of a sports car from Maranello.",
    f: ["6.5L NA V12 SUV","Active Suspension","Four-Door Four-Seat Layout","Active Aero Rear Spoiler","Rear-Biased V12 Placement","Carbon Ceramic Brakes","Ferrari HELE System","Bespoke Leather Interior"],
  },
  "Aston Martin Valkyrie": {
    s: "6.5L Cosworth V12 naturally aspirated — F1 engine note at 11,100rpm, nothing else like it",
    d: "Designed with Red Bull Racing by Adrian Newey. The Valkyrie's Cosworth V12 revs to 11,100 rpm and generates 1,160 hp with hybrid assistance — a road car with more aerodynamic downforce than most actual racing cars.",
    f: ["Cosworth 6.5L V12 NA","11,100 RPM Redline","Red Bull Racing Partnership","Full Carbon Fibre Body","Active Aerodynamics","Adrian Newey Design","Hybrid Motor Assist","Isofix-Free Cockpit"],
  },
  "Aston Martin Valhalla": {
    s: "Twin-turbo V8 hybrid — precise British performance bark with electric surge",
    d: "Born from the Valkyrie programme. The Valhalla brings hypercar aerodynamics and mid-engine hybrid power to a road car you can actually use — 1,000 hp, e-axle AWD, and Aston Martin's most advanced chassis ever.",
    f: ["1,000hp Hybrid V8","E-Axle Front AWD","Active Aerodynamics","Carbon Fibre Monocoque","Dihedral Doors","Track + Road Modes","Aston Martin Racing DNA","Limited Production Run"],
  },
  "Aston Martin DBS Superleggera": {
    s: "5.2L twin-turbo V12 — sonorous British GT thunder, deep and authoritative",
    d: "The most powerful production Aston Martin ever at launch. The DBS Superleggera puts 715 hp from a twin-turbo V12 into a GT body of breathtaking proportions — covering continents in comfort while capable of 340 km/h.",
    f: ["715hp Twin-Turbo V12","Carbon Fibre Bodywork","Aeroblade III Rear Wing","Adaptive Damping System","Bang & Olufsen Audio","Full Leather Interior","21-inch Diamond Wheels","Aston Martin Racing Stripes"],
  },
  "Aston Martin DB12": {
    s: "4.0L AMG twin-turbo V8 — refined GT howl with sharper, more urgent character",
    d: "Aston Martin calls it the world's first Super Tourer. The DB12 brings 680 hp, a new infotainment system, and a chassis recalibrated for sharper dynamics — the DB lineage elevated into the modern era.",
    f: ["680hp AMG V8","New Gen Infotainment","Adaptive Damping Suspension","Slim-Profile LED Lights","Driver Personalization System","Apple CarPlay + Android Auto","Sports Plus Seats","Aston Martin Bespoke Program"],
  },
  "Aston Martin Vantage F1 Edition": {
    s: "4.0L AMG twin-turbo V8 — Safety Car aggression, track-tuned bark",
    d: "The official F1 Safety Car made road-legal. Every Vantage F1 Edition wears the same Lime Green of the Safety Car it shadows on race days — with uprated aerodynamics, sticky Pirelli Cup tyres, and a sport exhaust that commands respect.",
    f: ["F1 Safety Car Spec","Pirelli P Zero Trofeo R","Sport Exhaust System","Satin Black Roof","Carbon Fibre Pack","Adaptive Damping","Lime Essence Green Option","F1-Branded Interior"],
  },
  "Aston Martin One-77": {
    s: "7.3L Cosworth V12 naturally aspirated — hand-assembled 750hp masterpiece scream",
    d: "Only 77 were built. The One-77 was Aston Martin's first carbon fibre monocoque road car — its 7.3L V12 was hand-assembled by Cosworth, producing 750 hp and a sound that is equal parts mechanical art and automotive history.",
    f: ["Only 77 Built","7.3L Cosworth V12","750hp Hand-Built Engine","Carbon Fibre Monocoque","Bespoke Interior Per Owner","Carbon Ceramic Brakes","Aston Martin Racing Heritage","Forged Aluminium Suspension"],
  },
  "Aston Martin DBX707": {
    s: "4.0L AMG twin-turbo V8 SUV — 707hp sophisticated growl, surprising urgency",
    d: "The world's most powerful luxury SUV. 707 hp from an AMG-derived V8, wet-clutch 9-speed transmission, and Bilstein adaptive dampers make the DBX707 the benchmark for any luxury SUV that dares to call itself sporty.",
    f: ["707hp AMG V8","Wet-Clutch 9-Speed ZF","Bilstein Adaptive Dampers","Carbon Ceramic Brakes","22-inch Forged Wheels","Meridian Sound System","Air Suspension","Aston Martin Bespoke Interior"],
  },
  "Aston Martin Vanquish": {
    s: "5.2L twin-turbo V12 — reborn GT thunder, 2024 architecture and timeless Aston soul",
    d: "The Vanquish name returns with Aston Martin's most advanced GT yet — a new bonded aluminium platform, 835 hp from a twin-turbo V12, and a body designed by Aston's Gaydon studio to make every road feel like a grand tour.",
    f: ["835hp Twin-Turbo V12","New Bonded Aluminium Platform","Rear-Wheel Drive Only","8-Speed Torque Converter","Carbon Ceramic Brakes","Aston Martin Bespoke Program","Adaptive Suspension","Ultra-Wide Track Chassis"],
  },
  "Mercedes-AMG ONE": {
    s: "1.6L F1 hybrid turbo V6 — literal Formula 1 road car, 11,000rpm shriek",
    d: "The only road car with an actual Formula 1 power unit. The AMG ONE uses Lewis Hamilton's 2017 championship engine — modified for road use, producing 1,063 hp and revving to 11,000 rpm. The most significant AMG ever built.",
    f: ["F1 Power Unit Road Car","11,000 RPM Redline","1063hp Hybrid System","Active Aerodynamics DRS","Carbon Fibre Monocoque","Push-Rod Suspension","Only 275 Units Built","Active Ride Height System"],
  },
  "Mercedes-AMG GT Black Series": {
    s: "4.0L twin-turbo V8 flat-plane — most extreme AMG note, aggressive and theatrical",
    d: "AMG's most powerful naturally aspirated... wait, it's turbocharged — but feels naturally aspirated in its ferocity. The GT Black Series uses a flat-plane crankshaft V8, generating 730 hp and setting the Nürburgring production car record.",
    f: ["730hp Flat-Plane V8","Nürburgring Record Holder","Carbon Fibre Aero Package","Fixed Rear Wing","Carbon Ceramic Brakes","Recaro Carbon Seats","AMG Track Pace App","Fixed Roll Cage Option"],
  },
  "Mercedes-AMG SL63": {
    s: "4.0L twin-turbo V8 roadster — refined AMG thunder in open-air luxury",
    d: "The SL reborn as a proper AMG. The new SL63 has rear-wheel steering, an all-new AMG-developed chassis, and 585 hp from a twin-turbo V8 — all in a four-seat soft-top roadster that honours 70 years of SL heritage.",
    f: ["585hp AMG V8","Rear-Wheel Steering","4-Seat Soft-Top Layout","AMG Ride Control+","Burmester High-End Audio","Powered Soft Top","AMG Night Package","Digital Light Headlights"],
  },
  "Mercedes-AMG G63": {
    s: "4.0L twin-turbo V8 box — thunderous G-Wagen war cry, unmistakable authority",
    d: "The icon that refuses to modernise its silhouette. The G63 keeps the G-Class's boxy shape and adds 585 hp, three locking differentials, and a twin-turbo V8 that makes every traffic light a performance art installation.",
    f: ["585hp AMG V8","Three Locking Differentials","360° Camera","AMG Ride Control","Nappa Leather Interior","Burmester Surround Sound","21-inch AMG Wheels","Off-Road Pro Package"],
  },
  "Mercedes-AMG S63": {
    s: "4.0L twin-turbo V8 PHEV — silent luxury then 802hp eruption in S-Class refinement",
    d: "AMG performance in the world's most luxurious saloon. The S63 uses a plug-in hybrid system with an electric axle on the rear, producing 802 hp — the most powerful S-Class production car ever, with standard S-Class interior opulence.",
    f: ["802hp PHEV V8","Electric Rear Axle AWD","4D Surround Sound System","Rear-Axle Steering","Energizing Coach Program","Executive Rear Seats","MBUX Hyperscreen Option","AMG Night Package"],
  },
  "Mercedes-AMG EQS": {
    s: "Dual-motor electric — near-silent surge with AMG electric sport sound enhancement",
    d: "AMG meets full electric luxury. The EQS 53 AMG produces 761 hp from dual motors with AMG Dynamic Plus — range of over 500 km meets hypercar acceleration in the most aerodynamic production car ever built (Cd 0.20).",
    f: ["761hp Dual Motor AWD","0.20 Cd Aerodynamics","AMG Dynamic Plus Mode","Hyperscreen 56-inch Display","AMG Electric Sport Sound","Rear-Axle Steering","Air Suspension","500km+ Range"],
  },
  "Mercedes-AMG CLS63": {
    s: "4.0L bi-turbo V8 — four-door coupe elegance with AMG V8 soundtrack",
    d: "The car that invented the four-door coupé segment. The CLS63 AMG combined S-Class power with coupé proportions — a format that every manufacturer now copies, but none have matched in original character.",
    f: ["4.0L Bi-Turbo V8","Four-Door Coupé Pioneer","AMG Performance Exhaust","Air Body Control","Burmester Audio","Heated Front & Rear Seats","AMG Track Pace App","AMG Speedshift MCT"],
  },
  "BMW M2 Competition": {
    s: "3.0L twin-turbo S58 straight-six — sharp, urgent, driver's car at full throttle",
    d: "The purest M car money can buy. The new M2 gets the S58 engine from the M3/M4 Competition, rear-wheel drive only, and no all-wheel drive option — a deliberate choice that keeps the M2 honest, raw, and endlessly rewarding.",
    f: ["S58 530hp Straight-Six","RWD Only – No AWD Option","6-Speed Manual Available","M Traction Control","Carbon Roof Option","M Sport Brakes","Harman Kardon Audio","Track Mode with Drift Analyser"],
  },
  "BMW M3 CS": {
    s: "3.0L S58 twin-turbo straight-six — CS-spec aggression, intake and exhaust theatre",
    d: "The most hardcore M3 ever built. The CS loses weight obsessively — carbon roof, carbon front splitter, carbon boot lid — while gaining 550 hp. Only 1,000 were made, and every one sold before the press drive.",
    f: ["550hp S58 CS-Tuned","Only 1,000 Units Built","Carbon Fibre Roof","Carbon Front Splitter","Michelin Cup 2R Tires","Fixed Carbon Rear Wing","M Carbon Ceramic Brakes","M CS Racing Seats"],
  },
  "BMW M4 CSL": {
    s: "3.0L S58 twin-turbo — CSL exhaust orchestra, lightest and loudest M4 ever",
    d: "CSL — Coupe Sport Lightweight. A BMW legend revived. The M4 CSL deletes rear seats, adds a carbon roof, and extracts 550 hp from the S58 engine — only 1,000 exist, each one a spiritual successor to the original E9 CSL.",
    f: ["550hp S58 Engine","No Rear Seats","Carbon Fibre Roof","Carbon Front Bumper","Michelin Pilot Cup 2R","Carbon Bucket Seats","M Track Package","Only 1,000 Units"],
  },
  "BMW M5 CS": {
    s: "4.4L V8 twin-turbo — CS-spec howl with quad exhaust authority, fastest M ever",
    d: "The fastest BMW M car ever produced at its launch. The M5 CS extracts 635 hp from the V8, adds carbon everywhere, and removes 70 kg — a track-capable super-saloon that can lap circuits while seating four in comfort.",
    f: ["635hp V8 Twin-Turbo","70kg Weight Reduction","Carbon Fibre Roof","M Carbon Ceramic Brakes","M CS Bucket Seats","Gold-Coloured Brake Calipers","Laser Headlights","Only 1,000 Units"],
  },
  "BMW XM Label Red": {
    s: "4.4L V8 PHEV — 748hp electrified M thunder, hybrid muscle in luxury SUV form",
    d: "BMW M's most controversial and most powerful SUV ever. The XM Label Red produces 748 hp from its V8 hybrid system — an M car designed by an M division with complete independence, and a statement that divides opinion as sharply as it accelerates.",
    f: ["748hp PHEV V8 Hybrid","AWD xDrive System","M-Specific Air Suspension","23-inch Forged Wheels","Merino Leather Interior","Bowers & Wilkins Diamond Sound","M Drive Professional","Sky Lounge Panoramic Roof"],
  },
  "BMW i8 Roadster": {
    s: "1.5L turbo 3-cyl hybrid — futuristic synthetic sound sculpted by BMW sound designers",
    d: "The supercar of the hybrid era. The i8 Roadster's dramatic scissor doors, carbon fibre passenger cell, and futuristic design previewed BMW's electric future — while its 3-cylinder hybrid delivered genuine sports car performance.",
    f: ["Carbon Fibre Life Module","Scissor Doors","Plug-In Hybrid System","Run-Flat Soft Top","Laser Headlights","Harman Kardon Audio","20-inch Light Alloy Wheels","BMW IconicSounds Sport"],
  },
  "BMW 7 Series": {
    s: "3.0L mild-hybrid straight-six — whisper-quiet executive serenity with crystalline refinement",
    d: "BMW's flagship redefined for the software era. The G70 7 Series features a 31-inch Theatre Screen in the rear, the largest ever fitted to a BMW, paired with executive comfort that competes directly with Rolls-Royce's entry offerings.",
    f: ["31-inch Rear Theatre Screen","Executive Rear Lounge","Bowers & Wilkins Diamond Sound","Rear-Axle Steering","Automated Lane Change","Four-Zone Climate Control","Merino Leather Seats","Augmented Reality Navigation"],
  },
  "BMW X7 M60i": {
    s: "4.4L V8 twin-turbo — commanding luxury SUV thunder, six-seat effortless power",
    d: "BMW's largest and most opulent SUV with genuine performance pretensions. The X7 M60i delivers 530 hp from its V8 in a three-row SUV that can tow 3,500 kg, seat six adults, and hit 100 km/h in 4.7 seconds.",
    f: ["530hp V8 Twin-Turbo","Three-Row Six-Seat Layout","Air Suspension Standard","Bowers & Wilkins Audio","Sky Lounge Panoramic Roof","Curved iDrive Screen","22-inch M Light Alloy Wheels","Comfort Access Keyless"],
  },
  "BMW Alpina B8": {
    s: "4.4L V8 twin-turbo Alpina — refined thunder, more musical and cultured than M8",
    d: "Where BMW M builds race cars, Alpina builds gentleman's express machines. The B8 Gran Coupé uses the M8's V8 but retuned for effortless speed — a car that covers 0-100 in 3.3 seconds while remaining supremely comfortable.",
    f: ["617hp Alpina-Tuned V8","Alpina 20-Spoke Wheels","Lavalina Leather Interior","Alpina Suspension Setup","3.3s 0-100 km/h","xDrive AWD System","Alpina Switch-Tronic","Bowers & Wilkins Audio"],
  },
};

async function main() {
  let ok = 0, miss = 0;
  for (const [name, d] of Object.entries(data)) {
    const car = await prisma.car.findFirst({ where: { name } });
    if (!car) { console.log(`⚠️  ${name}`); miss++; continue; }
    await prisma.car.update({
      where: { id: car.id },
      data: { soundProfile: d.s, description: d.d, features: JSON.stringify(d.f) },
    });
    console.log(`✅ ${name}`);
    ok++;
  }
  console.log(`\n✅ ${ok}  ⚠️  ${miss}`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
