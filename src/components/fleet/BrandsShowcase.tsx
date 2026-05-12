"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Globe, Flag, TrendingUp, CarFront } from "lucide-react";
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

/** Brand-specific accent colours — extremely subtle, monochrome-first */
const BRAND_ACCENTS: Record<string, { glow: string; ring: string; reflection: string }> = {
  Ferrari:       { glow: "rgba(220,38,38,0.18)",   ring: "rgba(220,38,38,0.35)",   reflection: "rgba(252,211,77,0.12)" },
  Lamborghini:   { glow: "rgba(202,138,4,0.18)",   ring: "rgba(202,138,4,0.35)",   reflection: "rgba(253,224,71,0.14)" },
  Bugatti:       { glow: "rgba(37,99,235,0.18)",   ring: "rgba(37,99,235,0.35)",   reflection: "rgba(147,197,253,0.12)" },
  Koenigsegg:    { glow: "rgba(168,85,247,0.14)",  ring: "rgba(168,85,247,0.30)",  reflection: "rgba(196,181,253,0.10)" },
  McLaren:       { glow: "rgba(234,88,12,0.18)",   ring: "rgba(234,88,12,0.35)",   reflection: "rgba(253,186,116,0.12)" },
  Porsche:       { glow: "rgba(156,163,175,0.20)", ring: "rgba(209,213,219,0.40)", reflection: "rgba(255,255,255,0.14)" },
  "Rolls-Royce": { glow: "rgba(212,175,55,0.16)",  ring: "rgba(212,175,55,0.32)",  reflection: "rgba(255,215,0,0.12)"  },
  Bentley:       { glow: "rgba(5,150,105,0.14)",   ring: "rgba(5,150,105,0.28)",   reflection: "rgba(110,231,183,0.10)" },
  "Aston Martin":{ glow: "rgba(6,182,212,0.14)",   ring: "rgba(6,182,212,0.28)",   reflection: "rgba(103,232,249,0.10)" },
  Maserati:      { glow: "rgba(37,99,235,0.14)",   ring: "rgba(37,99,235,0.28)",   reflection: "rgba(147,197,253,0.10)" },
  Tesla:         { glow: "rgba(239,68,68,0.14)",   ring: "rgba(239,68,68,0.28)",   reflection: "rgba(252,165,165,0.10)" },
  Pagani:        { glow: "rgba(234,179,8,0.14)",   ring: "rgba(234,179,8,0.28)",   reflection: "rgba(253,224,71,0.10)"  },
};

function getBrandAccent(name: string) {
  return (
    BRAND_ACCENTS[name] ?? {
      glow: "rgba(255,255,255,0.10)",
      ring: "rgba(255,255,255,0.25)",
      reflection: "rgba(255,255,255,0.08)",
    }
  );
}

/** Derive the local SVG path from the brand name (mirrors seed_brands.ts logic) */
function getLogoPath(name: string): string {
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  return `/images/logos/${slug}.svg`;
}

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

      {/* Emblem system styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes emblem-sweep {
          0%   { transform: translateX(-200%) skewX(-20deg); opacity: 0; }
          40%  { opacity: 1; }
          100% { transform: translateX(300%) skewX(-20deg); opacity: 0; }
        }
        .emblem-sweep {
          animation: emblem-sweep 1.2s ease forwards;
        }
      ` }} />
    </section>
  );
}

/* ─────────────────────────── BrandCard ─────────────────────────── */

function BrandCard({ brand, index }: { brand: Brand; index: number }) {
  const [logoError, setLogoError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const accent = getBrandAccent(brand.name);
  const logoSrc = getLogoPath(brand.name);

  return (
    <Link href={`/cars?brand=${encodeURIComponent(brand.name)}`} className="block w-full h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }} // Removed blur, reduced distance
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ delay: index * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ transform: "translate3d(0,0,0)" }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="group relative h-[520px] rounded-[3rem] bg-gradient-to-b from-white/[0.04] to-transparent border border-white/5 overflow-hidden transition-all duration-700 hover:shadow-glow hover:border-white/20"
        style={{
          boxShadow: hovered
            ? `0 0 60px ${accent.glow}, 0 32px 64px rgba(0,0,0,0.6)`
            : "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        {/* Background Metallic Sweep — triggers on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.06] to-transparent -translate-x-[150%] skew-x-[-30deg] group-hover:animate-sweep pointer-events-none" />

        {/* Accent glow orb - Optimized blur */}
        <div
          className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-[60px] pointer-events-none transition-all duration-1000"
          style={{
            background: hovered ? accent.glow : "transparent",
            opacity: hovered ? 1 : 0,
            z: 0
          }}
        />

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

            {/* ── Premium Emblem Container ── */}
            <LuxuryEmblem
              brand={brand}
              logoSrc={logoSrc}
              logoError={logoError}
              setLogoError={setLogoError}
              hovered={hovered}
              accent={accent}
            />
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

/* ─────────────────────────── LuxuryEmblem ─────────────────────────── */

interface EmblemProps {
  brand: Brand;
  logoSrc: string;
  logoError: boolean;
  setLogoError: (v: boolean) => void;
  hovered: boolean;
  accent: { glow: string; ring: string; reflection: string };
}

function LuxuryEmblem({ brand, logoSrc, logoError, setLogoError, hovered, accent }: EmblemProps) {
  return (
    <motion.div
      className="relative flex-shrink-0"
      animate={hovered ? { scale: 1.12 } : { scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Outer ambient ring */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={hovered
          ? { opacity: 1, scale: 1.15 }
          : { opacity: 0, scale: 1 }
        }
        transition={{ duration: 0.7 }}
        style={{
          background: `radial-gradient(circle, ${accent.glow} 0%, transparent 70%)`,
          filter: "blur(6px)",
        }}
      />

      {/* Accent ring */}
      <motion.div
        className="absolute inset-[-3px] rounded-full pointer-events-none"
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, ${accent.ring} 40%, transparent 60%, ${accent.ring} 80%, transparent 100%)`,
          borderRadius: "50%",
        }}
      />

      {/* Main emblem circle */}
      <div
        className="relative w-[84px] h-[84px] rounded-full flex items-center justify-center overflow-hidden"
        style={{
          background: hovered
            ? "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.02) 100%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 50%, rgba(0,0,0,0.1) 100%)",
          border: hovered
            ? `1px solid rgba(255,255,255,0.25)`
            : `1px solid rgba(255,255,255,0.10)`,
          boxShadow: hovered
            ? `inset 0 1px 2px rgba(255,255,255,0.3), inset 0 -1px 4px rgba(0,0,0,0.5), 0 0 20px ${accent.glow}, 0 6px 24px rgba(0,0,0,0.4)`
            : `inset 0 1px 1px rgba(255,255,255,0.12), inset 0 -1px 2px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.4)`,
          backdropFilter: "blur(8px)",
          transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Metallic highlight top */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1/3 rounded-b-full pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.22) 0%, transparent 100%)",
            opacity: hovered ? 0.9 : 0.5,
            transition: "opacity 0.5s",
          }}
        />

        {/* Metallic reflection sweep on hover */}
        {hovered && (
          <div
            className="absolute inset-0 pointer-events-none emblem-sweep"
            style={{
              background: `linear-gradient(105deg, transparent 30%, ${accent.reflection} 50%, transparent 70%)`,
              borderRadius: "50%",
            }}
          />
        )}

        {/* The logo itself */}
        <motion.div
          className="relative w-[54px] h-[54px] flex items-center justify-center"
          animate={hovered
            ? { rotate: 2, scale: 1.08, opacity: 1 }
            : { rotate: 0, scale: 1,    opacity: 0.55 }
          }
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ filter: hovered ? "brightness(1.6) contrast(1.1)" : "brightness(0.9) contrast(1)" }}
        >
          {!logoError ? (
            <Image
              src={logoSrc}
              alt={`${brand.name} logo`}
              fill
              sizes="54px"
              className="object-contain"
              style={{
                filter: "invert(1) brightness(2)",
              }}
              onError={() => setLogoError(true)}
            />
          ) : (
            /* Fallback: brand initial monogram */
            <FallbackMonogram name={brand.name} />
          )}
        </motion.div>

        {/* Bottom metallic underlight */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1/4 rounded-t-full pointer-events-none"
          style={{
            background: "linear-gradient(0deg, rgba(255,255,255,0.08) 0%, transparent 100%)",
          }}
        />
      </div>
    </motion.div>
  );
}

/* ─────────────────────────── FallbackMonogram ─────────────────────────── */

function FallbackMonogram({ name }: { name: string }) {
  // Use first letter of brand name
  const initial = name.charAt(0).toUpperCase();
  return (
    <span
      className="text-white font-black select-none"
      style={{
        fontSize: "28px",
        letterSpacing: "-0.02em",
        fontFamily: "serif",
        textShadow: "0 1px 8px rgba(255,255,255,0.4)",
      }}
    >
      {initial}
    </span>
  );
}
