"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Fuel, Gauge, Zap } from "lucide-react";
import { Car } from "@/types";
import { useState, useRef } from "react";
import { clsx } from "clsx";
import { formatPrice } from "@/lib/utils";

interface FleetCardProps {
  car: Car;
  index: number;
  onQuickView: (car: Car) => void;
}

export function FleetCard({ car, index, onQuickView }: FleetCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.02,
        ease: [0.16, 1, 0.3, 1]
      }}
      style={{ transform: "translate3d(0,0,0)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden border border-border/50 shadow-soft transition-all duration-500 hover:shadow-elevated hover:-translate-y-1"
    >
      {/* Favorite Button */}
      <button className="absolute top-6 right-6 z-10 w-11 h-11 rounded-full bg-white/70 backdrop-blur-sm border border-white/20 flex items-center justify-center text-foreground/40 hover:text-red-500 hover:bg-white transition-all duration-500 shadow-soft">
        <Heart className="w-5 h-5 transition-transform active:scale-125" />
      </button>

      {/* Availability Badge */}
      <div className="absolute top-6 left-6 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-white/20 shadow-soft">
        <div className={clsx(
          "w-1.5 h-1.5 rounded-full",
          car.available ? "bg-emerald-500" : "bg-amber-500"
        )} />
        <span className="text-[9px] font-black tracking-[0.2em] uppercase text-foreground/70">
          {car.available ? "Available" : "Reserved"}
        </span>
      </div>

      {/* Rarity Badge */}
      {car.rarity && car.rarity !== "STANDARD" && (
        <div className="absolute top-6 left-36 z-10 flex items-center px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          <span className="text-[9px] font-black tracking-[0.2em] uppercase bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500">
            {car.rarity}
          </span>
        </div>
      )}

      {/* Image Section */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#F0F0F0]">
        <Image
          src={car.showcaseImage || car.heroImage || car.mainImage}
          alt={car.name}
          fill
          className="object-cover transition-all duration-[1.5s] ease-[0.16,1,0.3,1] scale-[1.01] group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-40" />
        
        {/* Quick View Button (Visible on Hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700">
          <button 
            onClick={() => onQuickView(car)}
            className="px-10 py-4 bg-foreground text-white rounded-full font-bold text-[13px] tracking-tight transform translate-y-6 group-hover:translate-y-0 transition-all duration-700 hover:scale-[1.05] active:scale-95 shadow-elevated"
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-10 pt-4">
        <div className="mb-8">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-5 h-5 relative opacity-30 group-hover:opacity-100 transition-all duration-700">
              <Image 
                src={`/images/logos/${car.brand.toLowerCase().replace(/\s+/g, '-')}.svg`}
                alt={`${car.brand} logo`}
                fill
                className="object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-muted/60 group-hover:text-muted transition-colors duration-700">
              {car.brand}
            </span>
          </div>
          
          <div className="flex justify-between items-end gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-3xl font-bold tracking-tighter text-foreground truncate group-hover:text-foreground/80 transition-colors">{car.name}</h3>
              <p className="text-[10px] text-muted font-bold mt-2 uppercase tracking-[0.15em] opacity-60">
                Market Value • {formatPrice(car.estimatedValue || (car.pricePerDay * 250))}
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[9px] text-muted font-black block mb-1 uppercase tracking-[0.2em] opacity-40">Per Day</span>
              <span className="text-3xl font-bold text-foreground leading-none">{formatPrice(car.pricePerDay)}</span>
            </div>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-6 border-t border-border/50 pt-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted/40 group-hover:text-muted/60 transition-colors">
              <Zap className="w-3 h-3" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">Power</span>
            </div>
            <p className="text-[13px] font-bold tracking-tight text-foreground">{car.horsepower}<span className="text-[9px] ml-0.5 opacity-40">HP</span></p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted/40 group-hover:text-muted/60 transition-colors">
              <Gauge className="w-3 h-3" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">Speed</span>
            </div>
            <p className="text-[13px] font-bold tracking-tight text-foreground">{car.acceleration}<span className="text-[9px] ml-0.5 opacity-40">S</span></p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted/40 group-hover:text-muted/60 transition-colors">
              <Fuel className="w-3 h-3" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">Fuel</span>
            </div>
            <p className="text-[13px] font-bold tracking-tight text-foreground truncate">{car.fuelType}</p>
          </div>
        </div>
      </div>

      {/* Spotlight Effect (Cursor Follow) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,0,0,0.03), transparent 60%)`
        }}
      />
    </motion.div>
  );
}
