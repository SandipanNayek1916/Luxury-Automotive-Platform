import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const carData: Record<string, { soundProfile: string; description: string; features: string[] }> = {
  // ── BUGATTI ──────────────────────────────────────────────────────────────
  "Bugatti Chiron Super Sport": {
    soundProfile: "Quad-turbo W16 thunder — deep subsonic roar with turbo surge",
    description: "Beyond the limits of physics. The Chiron Super Sport couples 1,600 horsepower with a top speed architecture that redefines what a road car can be. Every drive is a controlled detonation.",
    features: ["Quad-Turbo W16 Engine","Magnesium Wheels","Active Rear Wing","Exposed Carbon Monocoque","Sky View Glass Roof","Titanium Exhaust","Adaptive Damping","Bespoke Leather Interior"],
  },
  "Bugatti Bolide": {
    soundProfile: "Screaming W16 at 9,000 rpm — raw, unfiltered track fury",
    description: "Pure track weapon with zero compromise. The Bolide strips the Chiron to its essence — a 1,850 hp W16 wrapped in a razor-thin exoskeleton built for absolute lap times.",
    features: ["1850hp W16 Quad-Turbo","Full Carbon Bodywork","Pushrod Suspension","Racing Harness","Titanium Roll Cage","Motorsport ABS","Slick-Ready Brakes","Aero Ground Effect"],
  },
  "Bugatti Mistral": {
    soundProfile: "Open-air W16 symphony — wind and engine in perfect orchestration",
    description: "The final expression of the W16 engine, breathed into an open-top roadster. The Mistral delivers the full Chiron powertrain with the sky as your roof — a final curtain call for an era.",
    features: ["W16 Roadster Architecture","Retractable Aero System","Carbon Tonneau Cover","Bespoke Soft Tonneau","Michelin Sport Cup 2R","Titanium Aero Fins","Illuminated Grille","Hermès Upholstery Option"],
  },
  "Bugatti Divo": {
    soundProfile: "W16 with tuned lateral aero — howl intensifies through corners",
    description: "Built for the driver who has mastered everything else. The Divo sacrifices 8 km/h of top speed for cornering forces that feel physically impossible in a road car.",
    features: ["Chiron-Based W16 Platform","8G Lateral Force Engineering","Active Aero Splitter","Rear Wing with 90kg Downforce","Michelin Cup 2 Tires","Carbon Fiber Monocoque","Bespoke Interior","Named Owner Delivery"],
  },
  "Bugatti Centodieci": {
    soundProfile: "EB110 spiritual howl reborn — W16 channeling racing heritage",
    description: "A living tribute to the legendary EB110. Only 10 exist. The Centodieci honours Bugatti's Italian racing spirit with modern W16 performance dressed in retro-futurist proportions.",
    features: ["EB110 Homage Design","1600hp W16 Engine","10-Unit Production","Signature X Rear Graphic","Exposed Carbon Roof","Titanium Bolts Throughout","Individually Numbered","Heritage Certificate"],
  },
  // ── FERRARI ──────────────────────────────────────────────────────────────
  "Ferrari LaFerrari": {
    soundProfile: "6.3L V12 KERS hybrid — operatic scream with electric torque fill",
    description: "The pinnacle of Ferrari's naturally aspirated era. LaFerrari fuses a 6.3L V12 with HY-KERS hybrid technology — the closest road car to the F1 experience ever built in Maranello.",
    features: ["HY-KERS Hybrid System","F1-Derived Traction Control","Active Aerodynamics","Carbon Fibre Monocoque","Brembo CCM-R Brakes","Michelin Pilot Sport Cup 2","Body-Hugging Seats","Prancing Horse Heritage Badge"],
  },
  "Ferrari SF90 Stradale": {
    soundProfile: "V8 turbo hybrid — electric silence then combustion explosion",
    description: "Ferrari's most powerful production car. Three electric motors and a twin-turbo V8 create a hybrid powertrain that produces 986 hp — deployable in full electric stealth or full combustion fury.",
    features: ["PHEV 4WD Architecture","eManettino Drive Selector","Retractable Hard Top","HMI Touchscreen Steering","Side Slip Control 6.1","Carbon Fiber Aerobody","Assetto Fiorano Package","Michelin Pilot Sport 4S"],
  },
  "Ferrari Daytona SP3": {
    soundProfile: "6.5L naturally aspirated V12 — pure screaming stratospheric revs",
    description: "The last of the Icona series. The Daytona SP3 houses Ferrari's most powerful naturally aspirated engine ever — 829 hp from a 6.5L V12 that screams to 9,500 rpm in a targa body of sublime beauty.",
    features: ["829hp Naturally Aspirated V12","9,500 RPM Redline","Icona Series Membership","Targa Removable Roof","Full Carbon Bodywork","Ferrari Genuine Leather","Electronic Limited Slip Diff","Personalization Atelier Program"],
  },
  "Ferrari Roma": {
    soundProfile: "3.9L twin-turbo V8 — refined GT growl with a passionate Italian bark",
    description: "La Nuova Dolce Vita on four wheels. The Roma captures the carefree spirit of 1950s and 60s Rome — effortlessly elegant, devastatingly fast, and wrapped in coachwork that turns every street into a catwalk.",
    features: ["3.9L Twin-Turbo V8","8-Speed DCT Gearbox","2+ GT Cabin Layout","Ferrari Dynamic Enhancer","Passenger Display Screen","Daytona Racing Seats","Carbon Fibre Roof","Maranello Crafted Interior"],
  },
  "Ferrari 296 GTB": {
    soundProfile: "V6 turbo hybrid — snappy mid-engine rev matched with electric punch",
    description: "A new chapter for the mid-rear engine berlinetta. The 296 GTB introduces Ferrari's first V6 production car in decades, paired with a hybrid system for 818 hp that redefines everyday exhilaration.",
    features: ["V6 Turbo + Electric Hybrid","Assetto Fiorano Option","eManettino System","Carbon Ceramic Brakes","Full Carbon Aero Package","Adjustable Suspension","Ferrari Telemetry App","Pirelli P Zero Trofeo R"],
  },
  "Ferrari 812 Superfast": {
    soundProfile: "6.5L V12 front-engine roar — thunderous, operatic, unmistakably Ferrari",
    description: "The ultimate front-engined Ferrari. 789 hp from a 6.5L naturally aspirated V12 housed in a long bonnet that pays homage to the great GT Ferraris of the 1960s — with 340 km/h in its arsenal.",
    features: ["789hp 6.5L V12","8,900 RPM Redline","Virtual Short Wheelbase","Electric Power Steering","Carbon Ceramic Brake System","Front Bumper Aero Splitter","Alcantara Headliner","Personalisation Programme"],
  },
  "Ferrari F8 Tributo": {
    soundProfile: "3.9L twin-turbo V8 — mid-engine bark with intercooler hiss",
    description: "The F8 Tributo is Ferrari's tribute to its most powerful V8 engine ever. Every line is shaped by aerodynamic function — 710 hp of turbocharged excellence in a body that generates 10% more downforce than its predecessor.",
    features: ["710hp Twin-Turbo V8","Increased Downforce Body","S-Duct Front Aero","Ferrari Dynamic Enhancer+","Rosso Corsa Brake Calipers","Racing Bucket Seats","Racing Exhaust Option","Apple CarPlay Integration"],
  },
  // ── LAMBORGHINI ──────────────────────────────────────────────────────────
  "Lamborghini Aventador SVJ": {
    soundProfile: "6.5L V12 naturally aspirated — apocalyptic roar, raw and unfiltered",
    description: "The Aventador SVJ holds the Nürburgring production car record. Its 6.5L V12 is connected directly to your soul — no turbos, no hybrid assistance, just 770 hp of pure naturally aspirated fury.",
    features: ["ALA 2.0 Active Aerodynamics","770hp Naturally Aspirated V12","Nürburgring Record Holder","Carbon Fiber Monocoque","All-Wheel Drive System","Lamborghini Dinamica Veicolo Attiva","Sensonum Sound System","Ad Personam Bespoke Program"],
  },
  "Lamborghini Huracán STO": {
    soundProfile: "5.2L V10 — high-pitched wail, spine-tingling at full throttle",
    description: "Super Trofeo Omologata. The Huracán STO is a race car wearing a number plate — 80% of its body panels are carbon fibre, and the chassis geometry is lifted directly from Lamborghini's Super Trofeo race series.",
    features: ["80% Carbon Body Panels","Race-Derived Aero","Single-Duct Front End","Carbon Ceramic Brakes","Racing Harness Option","Pirelli Trofeo R Tires","MagneRide Suspension","Track Telemetry System"],
  },
  "Lamborghini Urus": {
    soundProfile: "4.0L twin-turbo V8 — authoritative SUV thunder with exhaust pops",
    description: "The Super SUV that redefined an entire segment. The Urus delivers Lamborghini performance in a four-seat, four-wheel-drive package — complete with carbon aero, torque vectoring, and 650 hp on demand.",
    features: ["650hp Twin-Turbo V8","Torque Vectoring Rear Diff","Carbon Ceramic Brakes","Air Suspension","Driving Mode Selector","Panoramic Glass Roof","21-Speaker Bang & Olufsen","Lamborghini Telemetry"],
  },
  // ── PORSCHE ──────────────────────────────────────────────────────────────
  "Porsche 911 GT3 RS": {
    soundProfile: "4.0L flat-six naturally aspirated — mechanical howl, race-car intensity",
    description: "The most extreme road-going 911 ever built. Motorsport aerodynamics generate 409 kg of downforce. The 4.0L flat-six revs to 9,000 rpm — each drive is a reminder that Porsche has never forgotten its racing DNA.",
    features: ["409kg Downforce Package","Weissach Aero Kit","9,000 RPM Flat-Six","Carbon Fiber Wings","PDCC Sport Anti-Roll","Michelin Pilot Cup 2R","Carbon Fiber Bucket Seats","Track Telemetry App"],
  },
  "Porsche Taycan Turbo S": {
    soundProfile: "Porsche Electric Sport Sound — synthesized surge with twin-motor thrust",
    description: "The electric 911 for the next century. The Taycan Turbo S delivers 761 hp in overboost mode, 0-100 in 2.4 seconds, and a battery architecture that can sustain that performance lap after lap — unlike any EV before it.",
    features: ["761hp Overboost Mode","Dual Motor AWD","800V Architecture","Porsche Active Suspension","Carbon Ceramic Brakes","Burmester 3D Sound","Head-Up Display","Porsche Charging Service"],
  },
  "Porsche Carrera GT": {
    soundProfile: "V10 naturally aspirated — legendary wail, possibly the greatest engine sound ever made",
    description: "The most visceral Porsche ever produced. The Carrera GT's 5.7L V10 was derived from a Le Mans prototype — it has a ceramic clutch, push-rod suspension, and a sound that automotive journalists call the greatest ever recorded.",
    features: ["5.7L V10 Le Mans-Derived","Ceramic Composite Clutch","Carbon Fiber Monocoque","Push-Rod Suspension","Manual Gearbox Only","Natural Maple Gear Knob","Only 1,270 Built","No Driver Aids"],
  },
  // ── TESLA ────────────────────────────────────────────────────────────────
  "Tesla Model S Plaid": {
    soundProfile: "Tri-motor electric surge — near-silent then instant warp acceleration",
    description: "The world's quickest production car accelerates to 100 km/h in 1.99 seconds. Three independent motors deliver 1,020 hp with no warmup, no delay — just physics-bending acceleration at the touch of a pedal.",
    features: ["Tri-Motor 1020hp","Autopilot + FSD","17-inch Cinematic Display","Yoke Steering Wheel","HEPA Air Filtration","Gaming Console Built-in","22-Speaker Audio","Bioweapon Defense Mode"],
  },
  // ── MCLAREN ──────────────────────────────────────────────────────────────
  "McLaren P1": {
    soundProfile: "3.8L V8 hybrid — turbocharged roar with electric whistle overlay",
    description: "The Holy Trinity. McLaren's P1 is one of three hypercars that defined the hybrid hypercar era — IPAS hybrid power gives 903 hp, DRS-activated aerodynamics, and F1-derived suspension in a car you can drive to the shops.",
    features: ["IPAS Hybrid System","DRS Rear Wing","RaceActive Suspension","Carbon Fiber Monocoque","P Zero Corsa Tires","Brembo CCM Brakes","Alcantara Interior","MonoCage Carbon Tub"],
  },
  "McLaren Senna": {
    soundProfile: "4.0L twin-turbo V8 — high-revving shriek, named for a legend",
    description: "Named after the greatest Formula 1 driver of all time. The Senna is McLaren's most track-focused road car — every aesthetic decision is an aerodynamic one, generating 800 kg of downforce at speed.",
    features: ["800kg Downforce","Electrochromic Glass Doors","Full Carbon Fiber Body","Dihedral Opening Doors","Carbon Fiber Monocoque","Motorsport ABS","Racing Harness","Senna Heritage Plaque"],
  },
  "McLaren Speedtail": {
    soundProfile: "Hybrid V8 whisper to roar — grand touring power in silence then fury",
    description: "The fastest McLaren ever built. The Speedtail's central driving position and teardrop silhouette are pure aerodynamic sculpture. It reaches 403 km/h not with drama, but with absolute composure.",
    features: ["Central Driver Position","Flexible Carbon Rear Fenders","Electrochromic Camera Mirrors","Bespoke Luggage Set","Front Wheel Fairings","Titanium Exhaust","McLaren Track Telemetry","Only 106 Built"],
  },
  "McLaren 765LT": {
    soundProfile: "Twin-turbo V8 with titanium exhaust — light, sharp, theatrical bark",
    description: "LT means Longtail — McLaren's philosophy of less weight, more track focus. The 765LT is 80 kg lighter than the 720S with a titanium exhaust, upgraded aero, and suspension calibrated for pure driver reward.",
    features: ["Titanium Lightweight Exhaust","80kg Weight Reduction","Track-Tuned Suspension","Carbon Fiber Aero Kit","Senna Bucket Seats","Michelin Cup 2R Tires","Carbon Brake System","Sport Exhaust Valve Control"],
  },
  // ── KOENIGSEGG ───────────────────────────────────────────────────────────
  "Koenigsegg Jesko Absolut": {
    soundProfile: "5.0L twin-turbo V8 — explosive flat-plane crank shriek to 8,500 rpm",
    description: "The fastest Koenigsegg ever conceived — theoretically capable of 531 km/h. The Jesko Absolut's aerodynamic body has zero drag in mind: every surface slices air to reach a number no other production car has touched.",
    features: ["531 km/h Top Speed Target","9-Speed LST Gearbox","Triplex Rear Suspension","Freevalve Engine Technology","Carbon Fiber Monocoque","E85 Compatible","Naked Carbon Interior","Only 125 Units Total"],
  },
  "Koenigsegg Gemera": {
    soundProfile: "Freevalve 3-cyl hybrid — exotic mechanical staccato meets electric silence",
    description: "Four seats. 1,700 hp. No camshafts. The Gemera is unlike anything on the road — a family hypercar with Koenigsegg's revolutionary Freevalve engine technology and three electric motors for instant AWD torque.",
    features: ["4-Seat Hypercar Layout","Freevalve 3-Cyl Engine","E85 Bio-Fuel Compatible","Three Electric Motors","Ghost Package Interior","Koenigsegg SmartWheel","Retractable Rear Seats","Individual Climate Zones"],
  },
  "Koenigsegg Regera": {
    soundProfile: "V8 hybrid with Koenigsegg Direct Drive — seamless power surge, no gear shifts",
    description: "No gearbox. The Regera uses Koenigsegg Direct Drive — the V8 and three electric motors work in harmony without traditional transmission, delivering 1,500 hp in one unbroken, intoxicating wave of acceleration.",
    features: ["Direct Drive Technology","Hydraulic Coupling System","Pneumatic Doors","Carbon Fiber Body","1500hp Combined Output","Electric Torque Fill","Retractable Hardtop","Bespoke Audio System"],
  },
  // ── PAGANI ───────────────────────────────────────────────────────────────
  "Pagani Huayra R": {
    soundProfile: "6.0L Mercedes-AMG V12 naturally aspirated — screaming orchestral symphony at 9,000 rpm",
    description: "The Huayra R is Pagani's most extreme creation — a naturally aspirated V12 track machine built to rules that don't exist. Every surface is functional art, every component hand-crafted in San Cesario sul Panaro.",
    features: ["6.0L NA V12 9,000 RPM","Full Titanium Exhaust","Pagani Tricolore Finish","Carbo-Titanium Monocoque","Push-Rod Motorsport Suspension","Slick Pirelli Tires","Racing Harness System","Handcrafted AMG Engine"],
  },
  "Pagani Utopia": {
    soundProfile: "V12 twin-turbo — muscular torque rumble with Mercedes-AMG DNA",
    description: "Pagani's answer to the eternal question: what comes after perfection? The Utopia reduces technology to serve the driver — manual gearbox option, analogue instruments, 864 hp, and Horacio Pagani's obsessive craftsmanship.",
    features: ["Manual or Auto Gearbox","Carbo-Titanium Monocoque","AMG Twin-Turbo V12","Titanium Wheel Bolts","Hand-Stitched Leather","Billet Aluminium Pedals","Exposed Mechanical Linkages","Certified Artwork Certificate"],
  },
  "Pagani Zonda Cinque": {
    soundProfile: "7.3L Mercedes-AMG V12 naturally aspirated — pure mechanical thunder, no filter",
    description: "Only five were ever built. The Zonda Cinque represents the purest expression of Horacio Pagani's philosophy — aerospace-grade materials, a screaming V12, and hand-assembled Italian artistry in the most extreme Zonda ever.",
    features: ["Only 5 Units Built","7.3L AMG V12","Carbo-Titanium Body","Magnesium Wheels","Sequential Gearbox","Racing Harness Belts","Pagani Handcrafted Interior","Collector Certificate"],
  },
};

async function main() {
  let updated = 0;
  let skipped = 0;

  for (const [name, data] of Object.entries(carData)) {
    const car = await prisma.car.findFirst({ where: { name } });
    if (!car) { console.log(`⚠️  Not found: ${name}`); skipped++; continue; }

    await prisma.car.update({
      where: { id: car.id },
      data: {
        soundProfile: data.soundProfile,
        description: data.description,
        features: JSON.stringify(data.features),
      },
    });
    console.log(`✅ ${name}`);
    updated++;
  }

  console.log(`\nDone — ${updated} updated, ${skipped} skipped.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
