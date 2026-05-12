"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCinematicBridge } from "@/lib/cinematic-bridge";
import { CarModel } from "@/components/ui/CarModel";

const HERO_BRANDS = ["Lamborghini", "BMW", "Tesla", "Cadillac", "Porsche", "Mercedes", "Lexus", "Ferrari"];
const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Reveal variants ──────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 20 }, // Removed blur, reduced distance
  visible: (d = 0) => ({ 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease: EASE, delay: d } 
  }),
};

const fadeIn = {
  hidden:  { opacity: 0 }, // Removed blur
  visible: (d = 0) => ({ 
    opacity: 1, 
    transition: { duration: 1, ease: EASE, delay: d } 
  }),
};

const slideRight = {
  hidden:  { opacity: 0, x: 20 }, // Removed blur, reduced distance
  visible: (d = 0) => ({ 
    opacity: 1, 
    x: 0, 
    transition: { duration: 1.2, ease: EASE, delay: d } 
  }),
};

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [showSweep, setShowSweep] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // ── Bridge logic ───────────────────────────────────────────────────────────
  const { loaderExiting } = useCinematicBridge();
  
  // Trigger reveal and check mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (loaderExiting && !revealed) {
      setRevealed(true);
      setTimeout(() => setShowSweep(true), 200);
    }

    return () => window.removeEventListener("resize", checkMobile);
  }, [loaderExiting, revealed]);

  // Fallback for safety
  useEffect(() => {
    const t = setTimeout(() => {
      if (!revealed) setRevealed(true);
    }, 2000);
    return () => clearTimeout(t);
  }, [revealed]);

  // ── Mouse parallax tilt (Optimized to reduce re-renders) ───────────────────
  useEffect(() => {
    if (isMobile) return; // Disable tilt on mobile
    const handleMouse = (e: MouseEvent) => {
      if (!tiltRef.current) return;
      const rect = tiltRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      // Using translate3d for GPU acceleration
      tiltRef.current.style.transform = `perspective(1200px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg) translate3d(0,0,0)`;
    };
    const el = tiltRef.current;
    el?.addEventListener("mousemove", handleMouse);
    return () => el?.removeEventListener("mousemove", handleMouse);
  }, [isMobile]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center px-6 lg:px-12 pt-28 pb-20 overflow-hidden bg-background">
      
      {/* ── Cinematic Overlay (Matches Loader Color #F2F0ED) ────────────────── */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: revealed ? 0 : 1 }}
        transition={{ duration: 1.8, ease: EASE }}
        className="fixed inset-0 z-[9000] pointer-events-none bg-[#F2F0ED]"
      />

      {/* ── Reflection Sweep (Continues Loader Energy) ─────────────────────── */}
      {showSweep && (
        <motion.div
          initial={{ x: "-120%", opacity: 0 }}
          animate={{ 
            x: "120%", 
            opacity: [0, 0.4, 0] 
          }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
          }}
        />
      )}

      {/* ── Environmental Particles (Dust Motes - Disabled on Mobile) ───────────── */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-foreground"
              style={{
                width: Math.random() * 2 + 1 + 'px',
                height: Math.random() * 2 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                opacity: Math.random() * 0.08 + 0.02,
                willChange: "transform, opacity"
              }}
              animate={{
                y: [0, -60],
                opacity: [0, 0.08, 0],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      {/* ── Background Glows & Atmospheric Haze ───────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          style={{ y: y2, scale, z: 0 }}
          className="absolute top-[-5%] right-[-5%] w-[800px] h-[800px] bg-foreground/[0.012] blur-[100px] rounded-full" 
        />
        <motion.div 
          style={{ y: y1, z: 0 }}
          className="absolute bottom-[-5%] left-[-5%] w-[600px] h-[600px] bg-foreground/[0.008] blur-[80px] rounded-full" 
        />
      </div>

      <motion.div
        ref={tiltRef}
        initial="hidden"
        animate={revealed ? "visible" : "hidden"}
        style={{ 
          opacity,
          willChange: "transform, opacity",
          transform: "translate3d(0,0,0)"
        }}
        className="relative z-10 w-full max-w-[1500px] bg-card/60 backdrop-blur-sm rounded-[3rem] lg:rounded-[4.5rem] shadow-2xl overflow-visible border border-border/40"
      >
        {/* Ambient Haze overlay in card */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-[3rem] lg:rounded-[4.5rem] pointer-events-none" />

        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none rounded-[3rem] lg:rounded-[4.5rem] overflow-hidden">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="hero-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)"/>
          </svg>
        </div>

        <div className="relative z-20 grid lg:grid-cols-2 gap-12 min-h-[750px]">
          
          {/* ── Left: Typography ────────────────────────────────────────────── */}
          <div className="flex flex-col justify-center px-10 sm:px-16 lg:pl-24 py-20 lg:py-32">
            
            <motion.div variants={fadeIn} custom={0.2} className="flex items-center gap-4 mb-10">
              <div className="w-12 h-[1px] bg-foreground/30" />
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-muted">
                Luxury Car Rental
              </span>
            </motion.div>

            <div className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-foreground leading-[0.85] tracking-tighter mb-0">
              {["Elite", "Driving", "Freedom."].map((word, i) => (
                <motion.div key={word} variants={fadeUp} custom={0.3 + i * 0.15} className="overflow-hidden pb-2">
                  <span className={word === "Freedom." ? "text-transparent bg-clip-text bg-gradient-to-r from-muted to-muted/30" : ""}>{word}</span>
                </motion.div>
              ))}
            </div>

            <motion.p variants={fadeUp} custom={0.7} className="mt-12 text-muted text-lg lg:text-xl max-w-md leading-relaxed font-medium">
              Experience the world&apos;s most exclusive automotive collection. 
              Tailored for those who demand absolute perfection.
            </motion.p>

            <motion.div variants={fadeUp} custom={0.85} className="mt-16 flex flex-wrap gap-6 items-center">
              <Link href="/cars" passHref>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative overflow-hidden inline-flex items-center gap-4 bg-foreground text-white px-10 py-5 rounded-full text-[14px] font-bold tracking-wide shadow-2xl transition-shadow hover:shadow-foreground/20"
                >
                  <span className="relative z-10">Explore Fleet</span>
                  <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                  {/* Subtle hover sweep */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </motion.button>
              </Link>
              
              <Link href="/services" passHref>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.03)" }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-transparent text-foreground px-10 py-5 rounded-full text-[14px] font-bold tracking-wide border border-border/80 transition-colors"
                >
                  Our Services
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* ── Right: McLaren P1 3D Model ──────────────────────────────────── */}
          <div className="relative flex items-center justify-center lg:justify-end lg:pr-10">
            <motion.div 
              variants={slideRight} 
              custom={0.5}
              className="relative w-full h-[400px] md:h-[600px] lg:h-[750px] flex items-center justify-center overflow-visible"
            >
              <div className="w-[120%] h-full">
                <CarModel />
              </div>

              {/* Decorative HUD Element */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute top-10 right-10 w-48 h-48 border border-foreground/[0.04] rounded-full flex items-center justify-center pointer-events-none hidden md:flex"
              >
                <div className="w-36 h-36 border border-foreground/[0.06] rounded-full border-dashed" />
                <span className="absolute text-[8px] font-black tracking-[0.5em] text-foreground/30 uppercase">Aero Active</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ── Brand strip ──────────────────────────────────────────────────── */}
        <motion.div
          animate={revealed ? "visible" : "hidden"}
          variants={fadeIn}
          custom={1.0}
          className="relative z-20 border-t border-border/40 px-10 lg:px-24 py-10 bg-foreground/[0.015] backdrop-blur-md rounded-b-[3rem] lg:rounded-b-[4.5rem]"
        >
          <div className="flex items-center justify-between gap-8 overflow-x-auto scrollbar-hide">
            <span className="text-[10px] font-black tracking-[0.6em] text-foreground/30 uppercase whitespace-nowrap">
              Global Partnerships
            </span>
            <div className="flex items-center gap-10 lg:gap-16">
              {HERO_BRANDS.map((brand) => (
                <button
                  key={brand}
                  onClick={() => router.push(`/cars?brand=${encodeURIComponent(brand)}`)}
                  className="group relative flex items-center justify-center transition-all cursor-pointer py-2"
                >
                  <span className="text-[11px] font-bold tracking-widest uppercase text-muted/40 group-hover:text-foreground transition-colors duration-500">
                    {brand}
                  </span>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-foreground group-hover:w-full transition-all duration-500 ease-out" />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-muted/60">Discover</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-foreground/40 to-transparent" />
      </motion.div>
    </section>
  );
}

