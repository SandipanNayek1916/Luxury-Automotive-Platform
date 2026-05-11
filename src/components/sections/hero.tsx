"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const HERO_BRANDS = ["Lamborghini", "BMW", "Tesla", "Cadillac", "Porsche", "Mercedes", "Lexus", "Ferrari"];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTransform(`perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg)`);
    };
    const el = containerRef.current;
    el?.addEventListener("mousemove", handleMouseMove);
    return () => el?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-12 pt-28 pb-20 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-foreground/[0.02] blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-foreground/[0.01] blur-[100px] rounded-full translate-y-1/4 -translate-x-1/4 pointer-events-none" />

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[1500px] bg-card rounded-[3rem] lg:rounded-[4.5rem] shadow-elevated overflow-hidden border border-border/50"
      >
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <svg width="100%" height="100%"><defs><pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse"><path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)"/></svg>
        </div>

        <div className="relative z-10 grid lg:grid-cols-2 gap-12 min-h-[750px]">
          <div className="flex flex-col justify-center px-10 sm:px-16 lg:pl-24 py-20 lg:py-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-[1px] bg-foreground/20" />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-muted">Luxury Car Rental</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-foreground leading-[0.9] tracking-tighter"
            >
              Elite<br />Driving<br /><span className="text-muted/30">Freedom.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 text-muted text-lg lg:text-xl max-w-md leading-relaxed font-medium"
            >
              Experience the world's most exclusive automotive collection. Tailored for those who demand absolute perfection.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-14 flex flex-wrap gap-5"
            >
              <Link href="/cars" className="group inline-flex items-center gap-3 bg-foreground text-white px-10 py-5 rounded-full text-[15px] font-bold hover:bg-foreground/90 transition-all hover:scale-[1.03] shadow-elevated">
                Explore Fleet
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/cars" className="inline-flex items-center gap-2 bg-white text-foreground px-10 py-5 rounded-full text-[15px] font-bold border border-border hover:bg-foreground/[0.03] transition-all">
                Our Services
              </Link>
            </motion.div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end lg:pr-20 group">
            <div 
              style={{ transform, transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)" }} 
              className="relative w-full max-w-3xl animate-float"
            >
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[70%] h-14 bg-gradient-to-t from-black/20 to-transparent blur-3xl rounded-full opacity-50" />
              <motion.div 
                initial={{ opacity: 0, x: 100, scale: 0.9 }} 
                animate={{ opacity: 1, x: 0, scale: 1 }} 
                transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
              >
                <Image 
                  src="/images/gt3rs.jpg" 
                  alt="Porsche GT3 RS" 
                  width={1000} 
                  height={600} 
                  className="w-full h-auto object-contain drop-shadow-[0_40px_100px_rgba(0,0,0,0.15)] group-hover:scale-[1.02] transition-transform duration-1000" 
                  priority 
                />
              </motion.div>

              {/* Decorative HUD Element */}
              <div className="absolute -top-10 -right-10 w-40 h-40 border border-foreground/[0.03] rounded-full flex items-center justify-center">
                <div className="w-32 h-32 border border-foreground/[0.05] rounded-full animate-[spin_20s_linear_infinite]" />
                <span className="absolute text-[8px] font-black tracking-[0.4em] text-foreground/20 uppercase">Aero Dynamics</span>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Strip */}
        <div className="relative z-10 border-t border-border/50 px-10 lg:px-24 py-10 bg-foreground/[0.01]">
          <div className="flex items-center justify-between gap-8 overflow-x-auto scrollbar-hide">
            <span className="text-[10px] font-black tracking-[0.5em] text-foreground/20 uppercase whitespace-nowrap">Global Partnerships</span>
            <div className="flex items-center gap-10 lg:gap-16">
              {HERO_BRANDS.map((brand) => (
                <button
                  key={brand}
                  onClick={() => router.push(`/cars?brand=${encodeURIComponent(brand)}`)}
                  className="group relative flex items-center justify-center transition-all cursor-pointer"
                >
                  <span className="text-[11px] font-bold tracking-widest uppercase text-muted/40 group-hover:text-foreground transition-colors duration-500">{brand}</span>
                  <div className="absolute -bottom-2 left-0 w-0 h-[1px] bg-foreground group-hover:w-full transition-all duration-500" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
