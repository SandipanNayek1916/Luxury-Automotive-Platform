"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Gauge, Zap, Wind } from "lucide-react";
import { Car } from "@/types";
import { clsx } from "clsx";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

interface FeaturedSpotlightProps {
  cars: Car[];
  loading?: boolean;
}

export function FeaturedSpotlight({ cars, loading }: FeaturedSpotlightProps) {
  if (loading || !cars || cars.length === 0) {
    return (
      <div className="relative w-full h-[600px] lg:h-[700px] bg-black/[0.03] rounded-[48px] animate-pulse mb-20" />
    );
  }

  return (
    <section className="relative w-full mb-32 group rounded-[3rem] lg:rounded-[4.5rem] overflow-hidden bg-black shadow-elevated">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ 
          clickable: true, 
          renderBullet: (index, className) => `<span class="${className} !w-12 !h-1 !rounded-full !bg-white/20 transition-all duration-500"></span>`
        }}
        loop={true}
        className="w-full h-[650px] lg:h-[800px]"
      >
        {cars.map((car) => (
          <SwiperSlide key={car.id}>
            {({ isActive }) => (
              <div className="relative w-full h-full">
                {/* Immersive Background Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    animate={{ scale: isActive ? 1.1 : 1 }}
                    transition={{ duration: 6, ease: "linear" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={car.heroImage || car.showcaseImage || car.mainImage}
                      alt={car.name}
                      fill
                      className="object-cover opacity-70"
                      priority
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  {/* Grain/Texture Overlay */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                </div>

                {/* Floating Content Layer */}
                <div className="relative z-10 h-full flex flex-col justify-center px-10 lg:px-32">
                  <div className="max-w-4xl">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                      className="flex items-center gap-4 mb-10"
                    >
                      <span className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-2xl border border-white/10 text-white text-[10px] font-black tracking-[0.3em] uppercase shadow-soft">
                        Elite Featured Selection
                      </span>
                      <div className="flex items-center gap-3">
                        <div className={clsx(
                          "w-2 h-2 rounded-full",
                          car.available ? "bg-emerald-400" : "bg-amber-400"
                        )} />
                        <span className="text-white/50 text-[10px] font-black tracking-[0.2em] uppercase">{car.available ? "Available Now" : "Reserved"}</span>
                      </div>
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 60 }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                      className="text-6xl lg:text-[10rem] font-bold text-white tracking-tighter leading-[0.85] mb-10"
                    >
                      {car.name}
                    </motion.h1>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                      className="text-lg lg:text-2xl text-white/50 mb-14 leading-relaxed max-w-xl font-medium"
                    >
                      {car.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                      className="flex flex-wrap items-center gap-14 mb-16"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-white/30">
                          <Zap className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Horsepower</span>
                        </div>
                        <p className="text-3xl font-bold text-white tracking-tight">{car.horsepower}<span className="text-sm ml-1 opacity-30 font-medium">HP</span></p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-white/30">
                          <Gauge className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Acceleration</span>
                        </div>
                        <p className="text-3xl font-bold text-white tracking-tight">{car.acceleration}<span className="text-sm ml-1 opacity-30 font-medium">S</span></p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-white/30">
                          <Wind className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Max Speed</span>
                        </div>
                        <p className="text-3xl font-bold text-white tracking-tight">{car.topSpeed}<span className="text-sm ml-1 opacity-30 font-medium">KM/H</span></p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
                      className="flex items-center gap-10"
                    >
                      <Link 
                        href={`/cars/${car.id}`}
                        className="group/btn relative px-12 py-6 bg-white text-black rounded-full font-black text-[15px] overflow-hidden transition-all duration-500 hover:scale-[1.05] active:scale-95 shadow-elevated"
                      >
                        <span className="relative z-10 flex items-center gap-3 tracking-tight">
                          Begin Reservation <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1.5" />
                        </span>
                      </Link>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-1">Starting from</span>
                        <span className="text-4xl font-bold text-white tracking-tight">{formatPrice(car.pricePerDay)}<span className="text-sm font-medium text-white/30 ml-2">/DAY</span></span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
        {/* Cinematic Overlays */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/[0.05] to-transparent pointer-events-none z-20" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-white/[0.02] blur-[150px] rounded-full pointer-events-none z-20" />
      </Swiper>
      
      <style jsx global>{`
        .swiper-pagination-bullet-active {
          width: 3rem !important;
          background: white !important;
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}
