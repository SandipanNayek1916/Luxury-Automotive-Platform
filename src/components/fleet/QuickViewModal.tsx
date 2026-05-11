"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Calendar, MapPin, Gauge, Zap, Fuel, ShieldCheck, ArrowRight } from "lucide-react";
import { Car } from "@/types";
import { useEffect } from "react";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { clsx } from "clsx";

interface QuickViewModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ car, isOpen, onClose }: QuickViewModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!car) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            layoutId={`car-card-${car.id}`}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            className="relative w-full max-w-6xl bg-[#0A0A0A] text-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row h-auto max-h-[90vh] border border-white/10"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 z-20 w-12 h-12 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left: Visuals */}
            <div className="w-full lg:w-3/5 relative aspect-square lg:aspect-auto h-80 lg:h-full bg-black">
              <Image
                src={car.mainImage}
                alt={car.name}
                fill
                className="object-contain p-12"
              />
              <div className="absolute bottom-12 left-12 right-12 flex justify-center gap-3">
                {car.images.slice(0, 4).map((img, i) => (
                  <div key={i} className="w-20 h-14 rounded-xl overflow-hidden border border-white/20 shadow-sm cursor-pointer hover:scale-105 transition-transform">
                    <Image src={img} alt={`${car.name} ${i}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Info */}
            <div className="w-full lg:w-2/5 p-8 lg:p-12 overflow-y-auto">
              <div className="mb-8">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-3 block">
                  {car.brand} • {car.category}
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-white">{car.name}</h2>
                <div className="flex items-center gap-4 text-white/60 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{car.year} Model</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>{car.location}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="p-5 bg-white/5 rounded-3xl border border-white/5">
                  <div className="flex items-center gap-3 text-white/40 mb-2">
                    <Zap className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Performance</span>
                  </div>
                  <div className="text-xl font-bold">{car.horsepower} <span className="text-sm font-normal text-white/40">HP</span></div>
                </div>
                <div className="p-5 bg-white/5 rounded-3xl border border-white/5">
                  <div className="flex items-center gap-3 text-white/40 mb-2">
                    <Gauge className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">0-100 KM/H</span>
                  </div>
                  <div className="text-xl font-bold">{car.acceleration} <span className="text-sm font-normal text-white/40">s</span></div>
                </div>
                <div className="p-5 bg-white/5 rounded-3xl border border-white/5">
                  <div className="flex items-center gap-3 text-white/40 mb-2">
                    <Fuel className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Engine</span>
                  </div>
                  <div className="text-sm font-bold leading-tight">{car.engine}</div>
                </div>
                <div className="p-5 bg-white/5 rounded-3xl border border-white/5">
                  <div className="flex items-center gap-3 text-white/40 mb-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Transmission</span>
                  </div>
                  <div className="text-sm font-bold">{car.transmission}</div>
                </div>
              </div>

              <div className="flex flex-col gap-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-white/40 block uppercase tracking-wider mb-1">Rental Price</span>
                    <div className="text-4xl font-bold text-white">{formatPrice(car.pricePerDay)} <span className="text-lg font-normal text-white/40">/day</span></div>
                  </div>
                  <div className={clsx(
                    "px-4 py-2 rounded-full text-[10px] font-bold tracking-wider uppercase",
                    car.available ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  )}>
                    {car.available ? "Available Now" : "Currently Reserved"}
                  </div>
                </div>

                <Link 
                  href={`/cars/${car.id}`}
                  className="w-full py-5 bg-white text-black rounded-full font-bold flex items-center justify-center gap-3 hover:bg-white/90 transition-all active:scale-[0.98]"
                >
                  Reserve for Tomorrow <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
