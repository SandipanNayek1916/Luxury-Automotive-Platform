"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCinematicBridge } from "@/lib/cinematic-bridge";
import { CarModel } from "@/components/ui/CarModel";

const HERO_BRANDS = ["Lamborghini", "BMW", "Tesla", "Cadillac", "Porsche", "Mercedes", "Lexus", "Ferrari"];
const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Reveal variants ──────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 48, filter: "blur(8px)" },
  visible: (d = 0) => ({ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.1, ease: EASE, delay: d } }),
};
const fadeIn = {
  hidden:  { opacity: 0, filter: "blur(4px)" },
  visible: (d = 0) => ({ opacity: 1, filter: "blur(0px)", transition: { duration: 1.0, ease: EASE, delay: d } }),
};
const slideRight = {
  hidden:  { opacity: 0, x: 80, scale: 0.96, filter: "blur(10px)" },
  visible: (d = 0) => ({ opacity: 1, x: 0, scale: 1, filter: "blur(0px)", transition: { duration: 1.5, ease: EASE, delay: d } }),
};

export function HeroSection() {
  const tiltRef   = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState("");
  const router = useRouter();

  // ── Bridge ─────────────────────────────────────────────────────────────────
  const { loaderExiting } = useCinematicBridge();
  const [revealed, setRevealed] = useState(false);

  // Content controls — all start hidden
  const overlayCtrl = useAnimation(); // atmospheric overlay (matches loader colour)
  const badgeCtrl   = useAnimation();
  const h1Ctrl      = useAnimation();
  const paraCtrl    = useAnimation();
  const ctaCtrl     = useAnimation();
  const carCtrl     = useAnimation();
  const hudCtrl     = useAnimation();
  const brandCtrl   = useAnimation();

  // ── Cinematic reveal triggered by loader exit signal ───────────────────────
  useEffect(() => {
    if (!loaderExiting || revealed) return;
    setRevealed(true);

    async function runReveal() {
      // 1. Atmospheric overlay fades out — this is the critical continuity moment.
      //    The overlay colour exactly matches the loader's exit colour, so there
      //    is zero perceptible flash or cut.
      overlayCtrl.start({ opacity: 0, transition: { duration: 2.8, ease: EASE, delay: 0.2 } });

      // 2. Badge
      await new Promise(r => setTimeout(r, 380));
      badgeCtrl.start("visible");

      // 3. Headline — one word at a time
      await new Promise(r => setTimeout(r, 160));
      h1Ctrl.start("visible");

      // 4. Body copy
      await new Promise(r => setTimeout(r, 220));
      paraCtrl.start("visible");

      // 5. Car reveal
      carCtrl.start("visible");

      // 6. CTAs
      await new Promise(r => setTimeout(r, 180));
      ctaCtrl.start("visible");

      // 7. HUD ring
      hudCtrl.start("visible");

      // 8. Brand strip
      await new Promise(r => setTimeout(r, 180));
      brandCtrl.start("visible");
    }

    runReveal();
  }, [loaderExiting, revealed, overlayCtrl, badgeCtrl, h1Ctrl, paraCtrl, ctaCtrl, carCtrl, hudCtrl, brandCtrl]);

  // ── Fallback: reveal immediately if no loader fires (direct navigation) ────
  useEffect(() => {
    const t = setTimeout(() => {
      if (revealed) return;
      setRevealed(true);
      overlayCtrl.start({ opacity: 0, transition: { duration: 0.8 } });
      badgeCtrl.start("visible");
      h1Ctrl.start("visible");
      paraCtrl.start("visible");
      carCtrl.start("visible");
      ctaCtrl.start("visible");
      hudCtrl.start("visible");
      brandCtrl.start("visible");
    }, 320);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Mouse parallax tilt on the card ───────────────────────────────────────
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
    <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-12 pt-28 pb-20 overflow-hidden">

      {/* ── Cinematic transition overlay ────────────────────────────────────
          Exactly matches the loader background (#F2F0ED) and the CinematicAtmosphere
          bands. It starts fully opaque and fades out when bridge fires, so the
          hero "emerges from" the same atmospheric world as the loader.          */}
      <motion.div
        animate={overlayCtrl}
        initial={{ opacity: 1 }}
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 9989, // just below CinematicAtmosphere (9990)
          background: "linear-gradient(to bottom, rgba(242,240,237,0.92) 0%, rgba(242,240,237,0.6) 50%, rgba(242,240,237,0.92) 100%)",
          willChange: "opacity",
        }}
      />

      {/* ── Always-visible ambient glows (render immediately, no gate) ──────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Pulsing warm bloom — continues loader headlight energy */}
        <div
          className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full -translate-y-1/2 translate-x-1/4"
          style={{
            background: "radial-gradient(circle, rgba(255,248,230,0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "glow-pulse 5s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full translate-y-1/4 -translate-x-1/4"
          style={{
            background: "radial-gradient(circle, rgba(200,200,200,0.04) 0%, transparent 70%)",
            filter: "blur(60px)",
            animation: "glow-pulse 7s ease-in-out infinite 2s",
          }}
        />

        {/* Persistent film grain — continues across the transition */}
        <div
          className="absolute inset-[-20%] w-[140%] h-[140%] opacity-[0.022]"
          style={{
            backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
            backgroundSize: "200px 200px",
            animation: "grain 0.85s steps(1) infinite",
          }}
        />

        {/* Slow reflection drift — continues the headlight sweep momentum */}
        <div
          className="absolute top-0 bottom-0 w-[30%]"
          style={{
            background: "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.035) 50%, transparent 100%)",
            animation: "reflection-drift 12s ease-in-out infinite",
            animationDelay: "3s",
          }}
        />
      </div>

      {/* ── Main card — camera-push continuation from loader video ─────────── */}
      {/* scale: 1.015 → 1 over 8s mimics the camera push that was in the loader */}
      <motion.div
        ref={tiltRef}
        initial={{ scale: 1.015 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: [0.16, 1, 0.3, 1] }}
        style={{ transform: tilt, transition: tilt ? "transform 0.4s cubic-bezier(0.16,1,0.3,1)" : undefined }}
        className="relative w-full max-w-[1500px] bg-card rounded-[3rem] lg:rounded-[4.5rem] shadow-elevated overflow-visible border border-border/50"
      >
        {/* Card grid texture */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="hero-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)"/>
          </svg>
        </div>

        {/* Slow reflection sweep inside card */}
        <div
          className="absolute inset-0 pointer-events-none z-0 rounded-[3rem] lg:rounded-[4.5rem] overflow-hidden"
          style={{
            background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)",
            animation: "reflection-drift 18s ease-in-out infinite",
            animationDelay: "1s",
          }}
        />

        <div className="relative z-10 grid lg:grid-cols-2 gap-12 min-h-[750px]">

          {/* ── Left: Typography column ──────────────────────────────────────── */}
          <div className="flex flex-col justify-center px-10 sm:px-16 lg:pl-24 py-20 lg:py-32">

            <motion.div
              variants={fadeIn} custom={0}
              animate={badgeCtrl} initial="hidden"
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-[1px] bg-foreground/20" />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-muted">Luxury Car Rental</span>
            </motion.div>

            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-foreground leading-[0.9] tracking-tighter">
              {(["Elite", "Driving", "Freedom."] as const).map((word, i) => (
                <motion.div
                  key={word}
                  variants={fadeUp} custom={i * 0.11}
                  animate={h1Ctrl} initial="hidden"
                  style={{ display: "block", overflow: "hidden" }}
                >
                  <span className={word === "Freedom." ? "text-muted/30" : ""}>{word}</span>
                </motion.div>
              ))}
            </h1>

            <motion.p
              variants={fadeUp} custom={0}
              animate={paraCtrl} initial="hidden"
              className="mt-10 text-muted text-lg lg:text-xl max-w-md leading-relaxed font-medium"
            >
              Experience the world's most exclusive automotive collection.
              Tailored for those who demand absolute perfection.
            </motion.p>

            <motion.div
              variants={fadeUp} custom={0}
              animate={ctaCtrl} initial="hidden"
              className="mt-14 flex flex-wrap gap-5"
            >
              <Link href="/cars" className="group inline-flex items-center gap-3 bg-foreground text-white px-10 py-5 rounded-full text-[15px] font-bold hover:bg-foreground/90 transition-all hover:scale-[1.03] shadow-elevated">
                Explore Fleet
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link href="/cars" className="inline-flex items-center gap-2 bg-white text-foreground px-10 py-5 rounded-full text-[15px] font-bold border border-border hover:bg-foreground/[0.03] transition-all">
                Our Services
              </Link>
            </motion.div>
          </div>

          {/* ── Right: Car image ─────────────────────────────────────────────── */}
          <div className="relative flex items-center justify-center lg:justify-end lg:pr-20 group">
            <div className="relative w-full max-w-none overflow-visible">
              <motion.div
                variants={slideRight} custom={0}
                animate={carCtrl} initial="hidden"
                className="relative z-10 w-[150%] -ml-[25%] h-[400px] md:h-[600px] flex items-center justify-center overflow-visible"
              >
                <div className="w-full h-full">
                  <CarModel />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Brand strip ─────────────────────────────────────────────────── */}
        <motion.div
          variants={fadeIn} custom={0}
          animate={brandCtrl} initial="hidden"
          className="relative z-10 border-t border-border/50 px-10 lg:px-24 py-10 bg-foreground/[0.01]"
        >
          <div className="flex items-center justify-between gap-8 overflow-x-auto scrollbar-hide">
            <span className="text-[10px] font-black tracking-[0.5em] text-foreground/20 uppercase whitespace-nowrap">Global Partnerships</span>
            <div className="flex items-center gap-10 lg:gap-16">
              {HERO_BRANDS.map((brand, i) => (
                <motion.button
                  key={brand}
                  variants={fadeIn} custom={i * 0.07}
                  animate={brandCtrl} initial="hidden"
                  onClick={() => router.push(`/cars?brand=${encodeURIComponent(brand)}`)}
                  className="group relative flex items-center justify-center cursor-pointer"
                >
                  <span className="text-[11px] font-bold tracking-widest uppercase text-foreground group-hover:text-foreground/70 transition-colors duration-500">{brand}</span>
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
