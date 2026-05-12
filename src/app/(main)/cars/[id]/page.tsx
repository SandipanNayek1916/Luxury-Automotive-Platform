"use client";

import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Heart, Calendar, Gauge, Fuel, Users, DoorOpen, Zap, ArrowLeft, Loader2, Play, ChevronRight, Speaker, Wind } from "lucide-react";
import { formatPrice, calculateDays } from "@/lib/utils";
import toast from "react-hot-toast";
import { CarModel } from "@/components/ui/CarModel";

export default function CarDetailPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const router = useRouter();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pickup, setPickup] = useState("Dubai");
  const [activeImage, setActiveImage] = useState(0);
  const [isBooking, setIsBooking] = useState(false);
  const [addons, setAddons] = useState({
    chauffeur: false,
    insurance: false,
    concierge: false,
  });

  const addonPrices = {
    chauffeur: 500,
    insurance: 250,
    concierge: 150,
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const { data: car, isLoading } = useQuery({
    queryKey: ["car", id],
    queryFn: async () => {
      const res = await fetch(`/api/cars/${id}`);
      return res.json();
    },
  });

  const days = startDate && endDate ? calculateDays(new Date(startDate), new Date(endDate)) : 0;
  const basePrice = days * (car?.pricePerDay || 0);
  const addonsTotal = days * (
    (addons.chauffeur ? addonPrices.chauffeur : 0) +
    (addons.insurance ? addonPrices.insurance : 0) +
    (addons.concierge ? addonPrices.concierge : 0)
  );
  const total = basePrice + addonsTotal;

  const handleBook = async () => {
    if (!session) { toast.error("Please sign in to book"); router.push("/login"); return; }
    if (!startDate || !endDate) { toast.error("Select dates"); return; }
    if (days < 1) { toast.error("Minimum 1 day rental"); return; }

    setIsBooking(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carId: id,
          startDate,
          endDate,
          pickupLocation: pickup,
          dropLocation: pickup,
          totalPrice: total,
        }),
      });
      const booking = await res.json();
      if (res.ok) {
        toast.success("Booking created! Proceed to payment.");
        router.push(`/bookings`);
      } else {
        toast.error(booking.error || "Booking failed");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsBooking(false);
    }
  };

  if (isLoading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Loader2 className="w-12 h-12 animate-spin text-white/50" />
    </div>
  );

  const features = car?.features ? car.features : [];
  // Prefer heroImages for the parallax hero, fall back to gallery then legacy images
  const heroImages = car?.heroImages?.length > 0
    ? car.heroImages
    : car?.images && car.images.length > 0
      ? car.images
      : [car?.mainImage];
  const images = heroImages;

  return (
    <main ref={containerRef} className="min-h-screen bg-[#0A0A0A] text-white selection:bg-white/20 pb-32">
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm pointer-events-none">
        <button onClick={() => router.back()} className="pointer-events-auto flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all duration-300 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </nav>

      {/* Cinematic Hero */}
      <div className="relative h-screen w-full overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image 
                src={images[activeImage]} 
                alt={car.name} 
                fill 
                className="object-cover" 
                priority 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-end px-8 lg:px-24 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/50 mb-4 block">
              {car.brand} • {car.category}
            </span>
            <h1 className="text-6xl lg:text-9xl font-bold tracking-tighter mb-6">
              {car.name}
            </h1>
            <div className="flex flex-wrap items-center gap-8 text-white/60">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-white" />
                <span className="text-xl font-medium text-white">{car.horsepower} <span className="text-sm">HP</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-white" />
                <span className="text-xl font-medium text-white">{car.acceleration} <span className="text-sm">0-100</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="w-5 h-5 text-white" />
                <span className="text-xl font-medium text-white">{car.topSpeed}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 lg:px-24 -mt-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-24">
            
            {/* Gallery Navigation */}
            {images.length > 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar"
              >
                {images.map((img: string, i: number) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveImage(i)}
                    className={`relative w-32 aspect-[16/10] rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all duration-300 ${activeImage === i ? "border-white" : "border-transparent opacity-50 hover:opacity-100"}`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </motion.div>
            )}

            {/* Narrative Description */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-white/40 mb-8">The Experience</h2>
              <p className="text-2xl lg:text-4xl font-light leading-snug text-white/90">
                {car.description}
              </p>
            </motion.section>

            {/* 3D Inspection Section */}
            <motion.section
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-[500px] w-full rounded-[3rem] overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent border border-white/5"
            >
              <div className="absolute top-8 left-8 z-20">
                <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-white/40 mb-2">Digital Twin</h2>
                <p className="text-2xl font-bold tracking-tight">3D Inspection</p>
              </div>
              <div className="absolute top-8 right-8 z-20 flex gap-2">
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold tracking-widest uppercase text-white/60">Live Stream</span>
                </div>
              </div>
              
              <div className="w-full h-full">
                <CarModel />
              </div>

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
                <p className="text-[10px] font-bold tracking-widest uppercase text-white/20">Rotate to inspect every detail</p>
              </div>
            </motion.section>

            {/* Specifications Grid */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-white/40 mb-8">Technical Specifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Gauge, label: "Engine", value: car.engine },
                  { icon: Zap, label: "Drivetrain", value: car.drivetrain },
                  { icon: Fuel, label: "Fuel", value: car.fuelType },
                  { icon: Users, label: "Seats", value: car.seats.toString() },
                  { icon: DoorOpen, label: "Doors", value: car.doors.toString() },
                  { icon: Calendar, label: "Year", value: car.year.toString() },
                  { icon: Speaker, label: "Sound", value: car.soundProfile || "Aggressive" },
                ].map((spec, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-sm hover:bg-white/10 transition-colors">
                    <spec.icon className="w-5 h-5 text-white/40 mb-4" />
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-2">{spec.label}</p>
                    <p className="font-medium text-lg">{spec.value}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Sound Profile / Video Preview Section */}
            {(car.soundProfile || car.videoPreview) && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative h-[300px] rounded-[3rem] overflow-hidden bg-black flex items-center justify-center group"
              >
                {car.videoPreview ? (
                  <video
                    src={car.videoPreview}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-70 transition-opacity duration-700"
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                    onMouseLeave={(e) => (e.target as HTMLVideoElement).pause()}
                  />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-black to-black opacity-50" />
                )}
                <div className="relative z-10 flex flex-col items-center">
                  <button className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform duration-500 mb-6 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                    <Play className="w-8 h-8 ml-1" />
                  </button>
                  <p className="text-sm font-bold tracking-[0.2em] uppercase text-white/60">
                    {car.videoPreview ? "Watch Preview" : "Experience the Sound"}
                  </p>
                  {car.soundProfile && (
                    <p className="text-white mt-2 font-medium">{car.soundProfile}</p>
                  )}
                </div>
              </motion.section>
            )}

            {/* Features List */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-white/40 mb-8">Premium Equipment</h2>
              <div className="flex flex-wrap gap-3">
                {features.map((f: string, i: number) => (
                  <span key={i} className="px-5 py-3 bg-white/5 border border-white/10 rounded-full text-sm font-medium backdrop-blur-sm">
                    {f}
                  </span>
                ))}
              </div>
            </motion.section>

          </div>

          {/* Sidebar - Booking Configuration */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-32 bg-white/5 border border-white/10 rounded-[3rem] p-8 backdrop-blur-xl shadow-2xl">
              {/* Urgency Badge */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-red-500">High Demand: 2 slots remaining</span>
              </div>

              <div className="flex items-baseline justify-between mb-8 pb-8 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 block mb-2">Daily Rate</span>
                  <p className="text-5xl font-bold">{formatPrice(car.pricePerDay)}</p>
                </div>
                {days > 0 && (
                  <div className="text-right">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 block mb-2">{days} Days Total</span>
                    <p className="text-2xl font-bold">{formatPrice(total)}</p>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-2 block">Pick-up</label>
                    <input 
                      type="date" 
                      value={startDate} 
                      onChange={(e) => setStartDate(e.target.value)} 
                      className="w-full px-4 py-4 rounded-2xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-white/30 transition-colors [color-scheme:dark]" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-2 block">Drop-off</label>
                    <input 
                      type="date" 
                      value={endDate} 
                      onChange={(e) => setEndDate(e.target.value)} 
                      className="w-full px-4 py-4 rounded-2xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-white/30 transition-colors [color-scheme:dark]" 
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-2 block">Location</label>
                  <select 
                    value={pickup} 
                    onChange={(e) => setPickup(e.target.value)} 
                    className="w-full px-4 py-4 rounded-2xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-white/30 transition-colors appearance-none"
                  >
                    {["Dubai", "Monaco", "London", "Miami", "Los Angeles", "Tokyo", "Zurich"].map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Add-ons Section */}
                <div className="space-y-4 py-6 border-y border-white/10">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-4">Enhance Your Journey</p>
                  
                  {[
                    { id: "chauffeur", label: "Professional Chauffeur", price: addonPrices.chauffeur, icon: Users },
                    { id: "insurance", label: "Insurance Plus", price: addonPrices.insurance, icon: Heart },
                    { id: "concierge", label: "Concierge Delivery", price: addonPrices.concierge, icon: Wind },
                  ].map((addon) => (
                    <button
                      key={addon.id}
                      onClick={() => setAddons(prev => ({ ...prev, [addon.id]: !prev[addon.id as keyof typeof prev] }))}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                        addons[addon.id as keyof typeof addons] 
                          ? "bg-white/10 border-white/30 text-white" 
                          : "bg-transparent border-white/5 text-white/40 hover:border-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <addon.icon className="w-4 h-4" />
                        <span className="text-xs font-medium">{addon.label}</span>
                      </div>
                      <span className="text-xs font-bold">+{formatPrice(addon.price)}<span className="text-[10px] opacity-50 ml-1">/day</span></span>
                    </button>
                  ))}
                </div>

                {/* Price Breakdown */}
                {days > 0 && (
                  <div className="space-y-2 py-4 animate-in fade-in slide-in-from-top-2 duration-500">
                    <div className="flex justify-between text-xs text-white/40">
                      <span>Base Rental ({days} days)</span>
                      <span>{formatPrice(basePrice)}</span>
                    </div>
                    {addonsTotal > 0 && (
                      <div className="flex justify-between text-xs text-white/40">
                        <span>Premium Add-ons</span>
                        <span>{formatPrice(addonsTotal)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-white/5">
                      <span>Total Amount</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                )}

                {/* Trust Markers */}
                <div className="grid grid-cols-3 gap-2 pt-4">
                  {[
                    { icon: Wind, label: "VIP Delivery" },
                    { icon: Heart, label: "Full Cover" },
                    { icon: Zap, label: "Instant" },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                      <item.icon className="w-3 h-3 text-white/40" />
                      <span className="text-[8px] font-bold tracking-widest uppercase text-white/40">{item.label}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={handleBook} 
                  disabled={isBooking}
                  className="w-full bg-white text-black py-6 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-95 mt-4 group relative overflow-hidden disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  {isBooking ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span className="relative z-10">{session ? "Confirm Reservation" : "Sign In to Reserve"}</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                    </>
                  )}
                </button>
                
                <p className="text-center text-[10px] tracking-wide text-white/30 uppercase mt-4">
                  Elite Membership: <span className="text-white/60">Priority Concierge Included</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
