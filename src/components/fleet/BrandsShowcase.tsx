"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Building2, Globe, Flag, TrendingUp, CarFront } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

export interface Brand {
  id: string;
  name: string;
  logo: string;
  country: string;
  foundedYear: number;
  valuation: string;
  category: string;
  flagshipModel: string;
  description: string;
  featured: boolean;
}

const CATEGORIES = ["All", "Hypercar", "Luxury", "Electric", "Motorsport", "JDM", "SUV", "Grand Touring"];

export function BrandsShowcase() {
  const [activeCategory, setActiveCategory] = useState("All");

  const { data, isLoading } = useQuery({
    queryKey: ["brands", activeCategory],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (activeCategory !== "All") params.append("category", activeCategory);
      const res = await fetch(`/api/brands?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch brands");
      return res.json();
    },
  });

  const brands: Brand[] = data?.brands || [];

  return (
    <section className="py-32 bg-black text-white relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-black to-black blur-3xl" />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 flex flex-col items-center text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 mb-4 block"
          >
            Billionaire Automotive Index
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-7xl font-bold tracking-tighter mb-8"
          >
            The Global <span className="text-white/40">Ecosystem.</span>
          </motion.h2>
        </div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-500 backdrop-blur-md ${
                activeCategory === cat 
                  ? "bg-white text-black scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]" 
                  : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Brands Grid / Scroller */}
        {isLoading ? (
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-[400px] h-[500px] bg-white/5 animate-pulse rounded-3xl flex-shrink-0" />
            ))}
          </div>
        ) : (
          <Swiper
            slidesPerView="auto"
            spaceBetween={24}
            freeMode={true}
            mousewheel={{ forceToAxis: true }}
            grabCursor={true}
            modules={[FreeMode, Mousewheel]}
            className="!overflow-visible"
          >
            <AnimatePresence mode="popLayout">
              {brands.map((brand, i) => (
                <SwiperSlide key={brand.id} className="!w-[320px] sm:!w-[400px]">
                  <BrandCard brand={brand} index={i} />
                </SwiperSlide>
              ))}
            </AnimatePresence>
          </Swiper>
        )}
      </div>
    </section>
  );
}

function BrandCard({ brand, index }: { brand: Brand; index: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link href={`/cars?brand=${encodeURIComponent(brand.name)}`} className="block w-full h-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ delay: index * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="group relative h-[520px] rounded-[3rem] bg-gradient-to-b from-white/[0.04] to-transparent border border-white/5 overflow-hidden transition-all duration-700 hover:shadow-glow hover:border-white/20"
      >
        {/* Background Metallic Sweep */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent -translate-x-[150%] skew-x-[-30deg] group-hover:animate-sweep pointer-events-none" />

        <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
        
        {/* Top Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h3 className="text-4xl font-bold tracking-tighter text-white group-hover:text-white transition-colors duration-500">
              {brand.name}
            </h3>
            <p className="text-[10px] font-black tracking-[0.3em] uppercase text-white/30">
              {brand.category}
            </p>
          </div>
          <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center p-4 transition-all duration-700 group-hover:bg-white/10 group-hover:scale-110 group-hover:shadow-glow">
            {!imgError ? (
              <div className="relative w-full h-full opacity-40 group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0">
                <Image 
                  src={brand.logo} 
                  alt={`${brand.name} logo`} 
                  fill 
                  className="object-contain"
                  onError={() => setImgError(true)}
                />
              </div>
            ) : (
              <Building2 className="w-full h-full text-white/30 group-hover:text-white transition-colors" />
            )}
          </div>
        </div>

        {/* Center valuation area that floats up */}
        <div className="flex flex-col transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-luxury">
          <span className="text-[9px] font-black tracking-[0.4em] uppercase text-white/30 mb-3 flex items-center gap-2">
            <TrendingUp className="w-3 h-3 text-emerald-400" /> Market Valuation
          </span>
          <span className="text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40">
            {brand.valuation}
          </span>
        </div>

        {/* Bottom Details */}
        <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-8">
          <div className="space-y-1">
            <span className="text-[9px] font-black tracking-[0.3em] uppercase text-white/20 flex items-center gap-2">
              <Globe className="w-3 h-3" /> Origin
            </span>
            <p className="text-[13px] font-bold text-white/80 tracking-tight">{brand.country}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] font-black tracking-[0.3em] uppercase text-white/20 flex items-center gap-2">
              <Flag className="w-3 h-3" /> Founded
            </span>
            <p className="text-[13px] font-bold text-white/80 tracking-tight">{brand.foundedYear}</p>
          </div>
          <div className="col-span-2 mt-2 space-y-1">
            <span className="text-[9px] font-black tracking-[0.3em] uppercase text-white/20 flex items-center gap-2">
              <CarFront className="w-3 h-3" /> Flagship Masterpiece
            </span>
            <p className="text-[13px] font-black text-white group-hover:text-amber-400 transition-colors duration-500 tracking-tight">
              {brand.flagshipModel}
            </p>
          </div>
        </div>
      </div>

      {/* Decorative HUD Glow */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/[0.02] blur-[60px] rounded-full group-hover:bg-white/[0.05] transition-colors duration-1000" />
      </motion.div>
    </Link>
  );
}
