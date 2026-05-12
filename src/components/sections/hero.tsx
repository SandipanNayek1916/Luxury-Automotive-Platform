"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCinematicBridge } from "@/lib/cinematic-bridge";
import { CarModel } from "@/components/ui/CarModel";

const HERO_BRANDS = ["Lamborghini", "BMW", "Tesla", "Cadillac", "Porsche", "Mercedes", "Lexus", "Ferrari"];
const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Reveal variants ──────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: (d = 0) => ({ 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)", 
    transition: { duration: 0.8, ease: EASE, delay: d } 
  }),
};

const fadeIn = {
  hidden:  { opacity: 0, filter: "blur(4px)" },
  visible: (d = 0) => ({ 
    opacity: 1, 
    filter: "blur(0px)", 
    transition: { duration: 0.8, ease: EASE, delay: d } 
  }),
};

const slideRight = {
  hidden:  { opacity: 0, x: 50, filter: "blur(8px)" },
  visible: (d = 0) => ({ 
    opacity: 1, 
    x: 0, 
    filter: "blur(0px)", 
    transition: { duration: 1.2, ease: EASE, delay: d } 
  }),
};

export function HeroSection() {
  const tiltRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState("");
  const router = useRouter();

  // ── Bridge logic ───────────────────────────────────────────────────────────
  const { loaderExiting } = useCinematicBridge();
  const [revealed, setRevealed] = useState(false);
  const [showSweep, setShowSweep] = useState(false);
  
  // Trigger reveal when loader starts exiting
  useEffect(() => {
    if (loaderExiting && !revealed) {
      setRevealed(true);
      // Stagger the sweep slightly
      setTimeout(() => setShowSweep(true), 100);
    }
  }, [loaderExiting, revealed]);

  // Fallback for safety
  useEffect(() => {
    const t = setTimeout(() => {
      if (!revealed) setRevealed(true);
    }, 2000);
    return () => clearTimeout(t);
  }, [revealed]);

  // ── Mouse parallax tilt ───────────────────────────────────────────────────
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!tiltRef.current) return;
      const rect = tiltRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      setTilt(`perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 3}deg)`);
    };
    const el = tiltRef.current;
    el?.addEventListener("mousemove", handleMouse);
    return () => el?.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-12 pt-28 pb-20 overflow-hidden bg-background">
      
      {/* ── Cinematic Overlay (Matches Loader Color #F2F0ED) ────────────────── */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: revealed ? 0 : 1 }}
        transition={{ duration: 1.5, ease: EASE }}
        className="fixed inset-0 z-[9000] pointer-events-none bg-[#F2F0ED]"
      />

      {/* ── Reflection Sweep (Continues Loader Energy) ─────────────────────── */}
      {showSweep && (
        <motion.div
          initial={{ x: "-110%", opacity: 0 }}
          animate={{ 
            x: "110%", 
            opacity: [0, 0.5, 0] 
          }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)",
          }}
        />
      )}

      {/* ── Background Glows ─────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-foreground/[0.02] blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-foreground/[0.01] blur-[100px] rounded-full translate-y-1/4 -translate-x-1/4" />
      </div>

      <motion.div
        ref={tiltRef}
        initial="hidden"
        animate={revealed ? "visible" : "hidden"}
        style={{ transform: tilt, transition: tilt ? "transform 0.4s cubic-bezier(0.16,1,0.3,1)" : undefined }}
        className="relative w-full max-w-[1500px] bg-card rounded-[3rem] lg:rounded-[4.5rem] shadow-elevated overflow-visible border border-border/50"
      >
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none rounded-[3rem] lg:rounded-[4.5rem] overflow-hidden">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="hero-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)"/>
          </svg>
        </div>

        <div className="relative z-10 grid lg:grid-cols-2 gap-12 min-h-[750px]">
          
          {/* ── Left: Typography ────────────────────────────────────────────── */}
          <div className="flex flex-col justify-center px-10 sm:px-16 lg:pl-24 py-20 lg:py-32">
            
            <motion.div variants={fadeIn} custom={0.2} className="flex items-center gap-3 mb-8">
              <div className="w-10 h-[1px] bg-foreground/20" />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-muted">
                Luxury Car Rental
              </span>
            </motion.div>

            <div className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-foreground leading-[0.9] tracking-tighter mb-0">
              {["Elite", "Driving", "Freedom."].map((word, i) => (
                <motion.div key={word} variants={fadeUp} custom={0.3 + i * 0.1} className="overflow-hidden">
                  <span className={word === "Freedom." ? "text-muted/30" : ""}>{word}</span>
                </motion.div>
              ))}
            </div>

            <motion.p variants={fadeUp} custom={0.6} className="mt-10 text-muted text-lg lg:text-xl max-w-md leading-relaxed font-medium">
              Experience the world's most exclusive automotive collection. 
              Tailored for those who demand absolute perfection.
            </motion.p>

            <motion.div variants={fadeUp} custom={0.7} className="mt-14 flex flex-wrap gap-5">
              <Link
                href="/cars"
                className="group inline-flex items-center gap-3 bg-foreground text-white px-10 py-5 rounded-full text-[15px] font-bold hover:bg-foreground/90 transition-all hover:scale-[1.03] shadow-elevated"
              >
                Explore Fleet
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link
                href="/cars"
                className="inline-flex items-center gap-2 bg-white text-foreground px-10 py-5 rounded-full text-[15px] font-bold border border-border hover:bg-foreground/[0.03] transition-all"
              >
                Our Services
              </Link>
            </motion.div>
          </div>

          {/* ── Right: McLaren P1 3D Model ──────────────────────────────────── */}
          <div className="relative flex items-center justify-center lg:justify-end lg:pr-10">
            <motion.div 
              variants={slideRight} 
              custom={0.4}
              className="relative w-full h-[400px] md:h-[600px] lg:h-[700px] flex items-center justify-center overflow-visible"
            >
              <div className="w-[115%] h-full">
                <CarModel />
              </div>

              {/* Decorative HUD Element */}
              <div className="absolute top-0 right-0 w-40 h-40 border border-foreground/[0.03] rounded-full flex items-center justify-center pointer-events-none hidden md:flex">
                <div className="w-32 h-32 border border-foreground/[0.05] rounded-full animate-[spin_20s_linear_infinite]" />
                <span className="absolute text-[8px] font-black tracking-[0.4em] text-foreground/20 uppercase">Aero Active</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Brand strip ──────────────────────────────────────────────────── */}
        <motion.div
          animate={revealed ? "visible" : "hidden"}
          variants={fadeIn}
          custom={0.8}
          className="relative z-10 border-t border-border/50 px-10 lg:px-24 py-10 bg-foreground/[0.01]"
        >
          <div className="flex items-center justify-between gap-8 overflow-x-auto scrollbar-hide">
            <span className="text-[10px] font-black tracking-[0.5em] text-foreground/20 uppercase whitespace-nowrap">
              Global Partnerships
            </span>
            <div className="flex items-center gap-10 lg:gap-16">
              {HERO_BRANDS.map((brand, i) => (
                <button
                  key={brand}
                  onClick={() => router.push(`/cars?brand=${encodeURIComponent(brand)}`)}
                  className="group relative flex items-center justify-center transition-all cursor-pointer"
                >
                  <span className="text-[11px] font-bold tracking-widest uppercase text-muted/40 group-hover:text-foreground transition-colors duration-500">
                    {brand}
                  </span>
                  <div className="absolute -bottom-2 left-0 w-0 h-[1px] bg-foreground group-hover:w-full transition-all duration-500" />
                </button>
              ))}
            </div>
          </div>
          
          {/* Bottom Fade & Scroll Indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background via-background/80 to-transparent z-20 pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted/50">Explore</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-foreground/20 to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
