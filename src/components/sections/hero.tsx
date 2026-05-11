"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCinematicBridge } from "@/lib/cinematic-bridge";

const HERO_BRANDS = ["Lamborghini", "BMW", "Tesla", "Cadillac", "Porsche", "Mercedes", "Lexus", "Ferrari"];

// ─── Cinematic easing ────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Reveal variants ─────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: EASE, delay },
  }),
};

const fadeIn = {
  hidden:  { opacity: 0, filter: "blur(4px)" },
  visible: (delay = 0) => ({
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1.0, ease: EASE, delay },
  }),
};

const slideRight = {
  hidden:  { opacity: 0, x: 80, scale: 0.96, filter: "blur(8px)" },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: EASE, delay },
  }),
};

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const router = useRouter();

  // ── Bridge: listen for loader exit signal ──────────────────────────────────
  const { loaderExiting } = useCinematicBridge();
  const [revealed, setRevealed] = useState(false);
  const bgControls     = useAnimation();
  const sweepControls  = useAnimation();
  const badgeControls  = useAnimation();
  const h1Controls     = useAnimation();
  const paraControls   = useAnimation();
  const ctaControls    = useAnimation();
  const carControls    = useAnimation();
  const hudControls    = useAnimation();
  const brandControls  = useAnimation();
  const overlayControls = useAnimation();

  // Fire the staggered cinematic reveal the moment the loader starts exiting
  useEffect(() => {
    if (!loaderExiting || revealed) return;
    setRevealed(true);

    async function runReveal() {
      // 0 — Background + atmospheric overlay materialise
      await bgControls.start({ opacity: 1, transition: { duration: 1.6, ease: EASE } });

      // 0.2 — Light-sweep reflection (inherits the loader's headlight energy)
      sweepControls.start({
        x: ["−110%", "110%"],
        opacity: [0, 0.6, 0],
        transition: { duration: 1.2, ease: [0.4, 0, 0.2, 1] },
      });

      // 0.3 — Badge line
      badgeControls.start("visible");

      // 0.5 — Main headline
      await new Promise(r => setTimeout(r, 200));
      h1Controls.start("visible");

      // 0.8 — Body copy
      await new Promise(r => setTimeout(r, 200));
      paraControls.start("visible");

      // 1.0 — Car image slides in
      carControls.start("visible");

      // 1.2 — CTAs
      await new Promise(r => setTimeout(r, 200));
      ctaControls.start("visible");

      // 1.4 — HUD decorative element
      hudControls.start("visible");

      // 1.6 — Brand strip
      await new Promise(r => setTimeout(r, 200));
      brandControls.start("visible");

      // 1.8 — Remove the cinematic overlay
      overlayControls.start({ opacity: 0, transition: { duration: 1.0 } });
    }

    runReveal();
  }, [loaderExiting, revealed, bgControls, sweepControls, badgeControls, h1Controls,
      paraControls, ctaControls, carControls, hudControls, brandControls, overlayControls]);

  // Fallback: if loader never fires (direct nav to /cars, etc.), reveal immediately
  useEffect(() => {
    const t = setTimeout(() => {
      if (!revealed) {
        setRevealed(true);
        bgControls.start({ opacity: 1, transition: { duration: 0.6 } });
        overlayControls.start({ opacity: 0, transition: { duration: 0.6 } });
        badgeControls.start("visible");
        h1Controls.start("visible");
        paraControls.start("visible");
        carControls.start("visible");
        ctaControls.start("visible");
        hudControls.start("visible");
        brandControls.start("visible");
      }
    }, 300);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Parallax on mouse move
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

      {/* ── Cinematic transition overlay — fades away after reveal ──────────── */}
      <motion.div
        animate={overlayControls}
        initial={{ opacity: 1 }}
        className="fixed inset-0 z-[9990] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(242,240,237,0.92) 0%, rgba(242,240,237,0.0) 40%, rgba(242,240,237,0.92) 100%)",
        }}
      />

      {/* ── Ambient background glows ─────────────────────────────────────────── */}
      <motion.div
        animate={bgControls}
        initial={{ opacity: 0 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-foreground/[0.02] blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-foreground/[0.01] blur-[100px] rounded-full translate-y-1/4 -translate-x-1/4" />
        {/* Cinematic warm glow — echoes loader headlight */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(255,248,220,0.06) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </motion.div>

      {/* ── Reflection sweep — continues loader headlight energy ────────────── */}
      <motion.div
        animate={sweepControls}
        initial={{ x: "-110%", opacity: 0 }}
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.0) 35%, rgba(255,255,255,0.45) 50%, rgba(255,248,230,0.28) 62%, transparent 100%)",
          willChange: "transform, opacity",
        }}
      />

      <motion.div
        ref={containerRef}
        animate={bgControls}
        initial={{ opacity: 0 }}
        className="relative w-full max-w-[1500px] bg-card rounded-[3rem] lg:rounded-[4.5rem] shadow-elevated overflow-hidden border border-border/50"
      >
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
          </svg>
        </div>

        {/* ── Inner reflection sweep — inside the card ─────────────────────── */}
        <motion.div
          animate={sweepControls}
          initial={{ x: "-110%", opacity: 0 }}
          className="absolute inset-0 pointer-events-none z-10 rounded-[3rem] lg:rounded-[4.5rem] overflow-hidden"
          style={{
            background:
              "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
            willChange: "transform, opacity",
          }}
        />

        <div className="relative z-10 grid lg:grid-cols-2 gap-12 min-h-[750px]">

          {/* ── Left: Typography column ─────────────────────────────────────── */}
          <div className="flex flex-col justify-center px-10 sm:px-16 lg:pl-24 py-20 lg:py-32">

            {/* Badge */}
            <motion.div
              variants={fadeIn}
              custom={0}
              animate={badgeControls}
              initial="hidden"
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-[1px] bg-foreground/20" />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-muted">
                Luxury Car Rental
              </span>
            </motion.div>

            {/* Headline — staggered per line */}
            <div className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-foreground leading-[0.9] tracking-tighter mb-0">
              {["Elite", "Driving", "Freedom."].map((word, i) => (
                <motion.div
                  key={word}
                  variants={fadeUp}
                  custom={i * 0.12}
                  animate={h1Controls}
                  initial="hidden"
                  className="overflow-hidden"
                  style={{ display: "block" }}
                >
                  <span className={word === "Freedom." ? "text-muted/30" : ""}>{word}</span>
                </motion.div>
              ))}
            </div>

            {/* Body copy */}
            <motion.p
              variants={fadeUp}
              custom={0}
              animate={paraControls}
              initial="hidden"
              className="mt-10 text-muted text-lg lg:text-xl max-w-md leading-relaxed font-medium"
            >
              Experience the world's most exclusive automotive collection.
              Tailored for those who demand absolute perfection.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              custom={0}
              animate={ctaControls}
              initial="hidden"
              className="mt-14 flex flex-wrap gap-5"
            >
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

          {/* ── Right: Car image ────────────────────────────────────────────── */}
          <div className="relative flex items-center justify-center lg:justify-end lg:pr-20 group">
            <div
              style={{ transform, transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)" }}
              className="relative w-full max-w-3xl"
            >
              {/* Ground shadow */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[70%] h-14 bg-gradient-to-t from-black/20 to-transparent blur-3xl rounded-full opacity-50" />

              {/* Car */}
              <motion.div
                variants={slideRight}
                custom={0}
                animate={carControls}
                initial="hidden"
                className="relative z-10 animate-float"
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

              {/* HUD ring */}
              <motion.div
                variants={fadeIn}
                custom={0}
                animate={hudControls}
                initial="hidden"
                className="absolute -top-10 -right-10 w-40 h-40 border border-foreground/[0.03] rounded-full flex items-center justify-center"
              >
                <div className="w-32 h-32 border border-foreground/[0.05] rounded-full animate-[spin_20s_linear_infinite]" />
                <span className="absolute text-[8px] font-black tracking-[0.4em] text-foreground/20 uppercase">Aero Dynamics</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Brand strip ──────────────────────────────────────────────────── */}
        <motion.div
          variants={fadeIn}
          custom={0}
          animate={brandControls}
          initial="hidden"
          className="relative z-10 border-t border-border/50 px-10 lg:px-24 py-10 bg-foreground/[0.01]"
        >
          <div className="flex items-center justify-between gap-8 overflow-x-auto scrollbar-hide">
            <span className="text-[10px] font-black tracking-[0.5em] text-foreground/20 uppercase whitespace-nowrap">
              Global Partnerships
            </span>
            <div className="flex items-center gap-10 lg:gap-16">
              {HERO_BRANDS.map((brand, i) => (
                <motion.button
                  key={brand}
                  initial={{ opacity: 0, y: 8 }}
                  animate={brandControls}
                  variants={{
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, delay: i * 0.07, ease: EASE },
                    },
                  }}
                  onClick={() => router.push(`/cars?brand=${encodeURIComponent(brand)}`)}
                  className="group relative flex items-center justify-center transition-all cursor-pointer"
                >
                  <span className="text-[11px] font-bold tracking-widest uppercase text-muted/40 group-hover:text-foreground transition-colors duration-500">
                    {brand}
                  </span>
                  <div className="absolute -bottom-2 left-0 w-0 h-[1px] bg-foreground group-hover:w-full transition-all duration-500" />
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
