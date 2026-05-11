"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import gsap from "gsap";
import { useCinematicBridge } from "@/lib/cinematic-bridge";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
/** Loader shows on EVERY page load / refresh — no storage gate */
const INTRO_DURATION_MS = 10000; // 10 seconds visible
const VIDEO_SRC = "/videos/aventador-svj-loading.mp4";

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export function CinematicLoader() {
  // ── State ──────────────────────────────────────────────────────────────────
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [speedValue, setSpeedValue] = useState(0);
  const [isMuted, setIsMuted] = useState(true); // optimistic — updated after autoplay attempt

  // ── Bridge ──────────────────────────────────────────────────────────────────
  const { signalLoaderExiting } = useCinematicBridge();

  // ── Refs ──────────────────────────────────────────────────────────────────
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const brandingRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const gaugeRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);   // headlight sweep overlay
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gsapCtx = useRef<gsap.Context | null>(null);
  const hasDismissed = useRef(false);

  // ── Dismiss handler ────────────────────────────────────────────────────────
  const dismiss = useCallback(() => {
    if (hasDismissed.current) return;
    hasDismissed.current = true;

    gsapCtx.current?.kill();

    // ── Signal the hero to begin its cinematic entrance immediately ──────────
    signalLoaderExiting();

    // ── Headlight sweep — a horizontal light beam sweeps L→R just before exit ──
    if (sweepRef.current) {
      gsap.fromTo(
        sweepRef.current,
        { x: "-110%", opacity: 0 },
        {
          x: "110%",
          opacity: 1,
          duration: 1.1,
          ease: "power2.inOut",
        }
      );
    }

    // ── Fade out audio gracefully ───────────────────────────────────────
    const video = videoRef.current;
    if (video && !video.muted && video.volume > 0) {
      const fadeAudio = setInterval(() => {
        if (video.volume > 0.05) {
          video.volume = Math.max(0, video.volume - 0.08);
        } else {
          video.volume = 0;
          video.muted = true;
          clearInterval(fadeAudio);
        }
      }, 60);
    }

    // Restore scroll
    document.body.style.overflow = "";
    document.body.style.height = "";

    // Short delay so the sweep plays, then begin visual fade out
    setTimeout(() => setIsExiting(true), 400);
  }, [signalLoaderExiting]);

  // ── Mount: always show on every page load ──────────────────────────────────
  useEffect(() => {
    // Lock scroll while loader is visible
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";

    const video = videoRef.current;

    // ── Start video immediately with audio; fall back to muted if blocked ──
    if (video) {
      video.muted = false;   // attempt with sound
      video.volume = 0.85;
      video.load();

      video.play()
        .then(() => {
          // Sound autoplay succeeded
          setIsMuted(false);
        })
        .catch(() => {
          // Browser blocked audio autoplay — retry muted
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});
        });
    }

    // ── Build GSAP choreography — runs immediately on mount ───────────────
    gsapCtx.current = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial invisible state for HUD elements
      gsap.set([brandingRef.current, metricsRef.current, gaugeRef.current], {
        opacity: 0,
        willChange: "opacity, transform",
      });

      // Phase 1 — Video fade in immediately (0.8s) + subtle scale to 1
      if (video) {
        gsap.set(video, { scale: 1.08, willChange: "opacity, transform" });
        tl.to(video, {
          opacity: 0.82,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        });
      }

      // Phase 2 — Branding reveal
      tl.to(
        brandingRef.current,
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
        "-=0.5"
      );

      // Phase 3 — Metrics + gauge
      tl.to(metricsRef.current, { opacity: 1, duration: 0.5 }, "-=0.5")
        .fromTo(
          ".loader-metric-item",
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, duration: 0.35, stagger: 0.08, ease: "power2.out" },
          "-=0.3"
        )
        .to(gaugeRef.current, { opacity: 1, duration: 0.5 }, "-=0.7");

      // Speedometer count-up with realistic automotive physics (bursts + fluctuations)
      const speedObj = { v: 0 };
      const speedTimeline = gsap.timeline();

      // Start: Initial acceleration
      speedTimeline.to(speedObj, {
        v: 120,
        duration: 3,
        ease: "power2.in",
        onUpdate() { setSpeedValue(Math.round(speedObj.v)); }
      });

      // Mid-phase: High speed push with subtle fluctuation
      speedTimeline.to(speedObj, {
        v: 280,
        duration: 4,
        ease: "none",
        onUpdate() {
          const jitter = Math.sin(Date.now() * 0.01) * 0.5;
          setSpeedValue(Math.round(speedObj.v + jitter));
        }
      });

      // Peak: Final burst before transition
      speedTimeline.to(speedObj, {
        v: 340,
        duration: 2,
        ease: "power4.out",
        onUpdate() { setSpeedValue(Math.round(speedObj.v)); }
      });

      // Subtle branding drift upward over full 10s
      gsap.to(brandingRef.current, { y: -24, duration: 10, ease: "none" });
    });

    // ── 10-second dismiss timer ────────────────────────────────────────────
    timerRef.current = setTimeout(dismiss, INTRO_DURATION_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      gsapCtx.current?.kill();
      // Safety: restore scroll on unmount
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [dismiss]);

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  if (!isVisible) return null;

  return (
    <AnimatePresence mode="wait" onExitComplete={() => setIsVisible(false)}>
      {!isExiting && (
        <motion.div
          key="cinematic-intro"
          ref={containerRef}
          className="fixed inset-0 z-[9999] overflow-hidden select-none"
          style={{
            backgroundColor: "#F2F0ED", // matches hero overlay — zero flash on transition
            willChange: "opacity",
            transform: "translateZ(0)",
          }}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
        >
          {/* ── Headlight sweep overlay — fires during exit ──────────────────── */}
          <div
            ref={sweepRef}
            className="absolute inset-0 pointer-events-none z-30"
            style={{
              opacity: 0,
              background:
                "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.0) 30%, rgba(255,255,255,0.55) 50%, rgba(255,248,230,0.35) 60%, transparent 100%)",
              willChange: "transform, opacity",
            }}
          />
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            playsInline
            loop
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: 0,
              transform: "scale(1.08) translateZ(0)",
              willChange: "opacity, transform",
            }}
          />

          {/* ── Cinematic gradient overlays ──────────────────────────────── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(242,240,237,0.72) 0%, rgba(242,240,237,0.0) 38%, rgba(242,240,237,0.82) 100%)",
            }}
          />
          {/* Side vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 38%, rgba(242,240,237,0.50) 100%)",
            }}
          />

          {/* ── Subtle grid ──────────────────────────────────────────────── */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(to right,rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,0,0,0.04) 1px,transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage:
                "radial-gradient(circle at center, black 20%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(circle at center, black 20%, transparent 80%)",
            }}
          />

          {/* ── Center Branding ──────────────────────────────────────────── */}
          <div
            ref={brandingRef}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-6"
            style={{ opacity: 0, transform: "translateY(28px) translateZ(0)" }}
          >
            <p className="text-black/60 tracking-[0.5em] text-[9px] sm:text-[10px] font-semibold uppercase mb-5">
              PREMIUM MOBILITY EXPERIENCE
            </p>

            <h1
              className="text-4xl sm:text-5xl md:text-7xl font-extralight tracking-tight text-[#0A0A0A] mb-5 uppercase leading-none"
              style={{ textShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
            >
              DRIVE BEYOND{" "}
              <span className="font-semibold">ORDINARY</span>
            </h1>

            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-px bg-black/15" />
              <p className="text-black/40 tracking-[0.2em] text-[10px] sm:text-xs font-medium uppercase">
                Loading elite automotive collection
              </p>
              <div className="w-10 h-px bg-black/15" />
            </div>

            {/* Progress bar — fills exactly over INTRO_DURATION_MS */}
            <div className="w-48 sm:w-64 h-px bg-black/10 relative overflow-hidden rounded-full">
              <motion.div
                className="absolute inset-y-0 left-0 bg-black/70 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: INTRO_DURATION_MS / 1000, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* ── Left: System Metrics ──────────────────────────────────────── */}
          <div
            ref={metricsRef}
            className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-5 z-10"
            style={{ opacity: 0 }}
          >
            {["SYSTEMS NOMINAL", "AWD ACTIVE", "AERO DEPLOYED", "TELEMETRY SYNCED"].map(
              (label, i) => (
                <div key={i} className="loader-metric-item flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-black/70" />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-black/60"
                      animate={{ scale: [1, 2.8, 1], opacity: [0.7, 0, 0.7] }}
                      transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.28 }}
                    />
                  </div>
                  <span className="text-[9px] tracking-[0.28em] text-black/60 font-semibold uppercase whitespace-nowrap">
                    {label}
                  </span>
                </div>
              )
            )}
            {/* Vertical connecting line */}
            <div
              className="absolute left-[3px] top-3 bottom-3 w-px"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.08), rgba(0,0,0,0.04), transparent)",
              }}
            />
          </div>

          {/* ── Right: Futuristic Telemetry HUD ────────────────────────────────── */}
          <div
            ref={gaugeRef}
            className="absolute bottom-8 right-8 md:bottom-12 md:right-12 flex flex-col items-end z-10 w-[240px] md:w-[320px]"
            style={{ opacity: 0 }}
          >
            {/* ── Main SVG Telemetry Gauge ── */}
            <div className="relative w-full aspect-square flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                {/* Outer Ring — subtle rotation */}
                <motion.circle
                  cx="100" cy="100" r="95"
                  fill="none" stroke="black" strokeWidth="0.5" strokeOpacity="0.05"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />

                {/* Tick Marks Ring */}
                <g opacity="0.1">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <line
                      key={i}
                      x1="100" y1="10" x2="100" y2="16"
                      stroke="black" strokeWidth="1"
                      transform={`rotate(${i * 9} 100 100)`}
                    />
                  ))}
                </g>

                {/* Performance Progress Arc — reactive to speedValue */}
                <motion.circle
                  cx="100" cy="100" r="88"
                  fill="none" stroke="black" strokeWidth="2.5"
                  strokeDasharray="552.92"
                  strokeDashoffset={552.92 - (552.92 * (speedValue / 400))}
                  strokeLinecap="round"
                  opacity={0.4 + (speedValue / 340) * 0.4}
                  style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
                />

                {/* Internal HUD elements */}
                <circle cx="100" cy="100" r="70" fill="none" stroke="black" strokeWidth="0.2" strokeOpacity="0.1" />
                <circle cx="100" cy="100" r="50" fill="none" stroke="black" strokeWidth="0.2" strokeOpacity="0.1" />
              </svg>

              {/* Speed Value — Kinetic Centerpiece */}
              <div className="absolute flex flex-col items-center">
                <motion.div
                  className="text-6xl md:text-8xl font-extralight leading-none text-[#0A0A0A] tracking-tighter tabular-nums"
                  style={{ willChange: "transform, opacity" }}
                  animate={
                    speedValue > 280
                      ? {
                          x: [Math.random() * -1, Math.random() * 1, 0],
                          scale: [1, 1.02, 1],
                          transition: { repeat: Infinity, duration: 0.05 }
                        }
                      : {}
                  }
                >
                  {speedValue}
                </motion.div>

                <div className="flex items-center gap-2 -mt-2">
                  <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent" />
                  <span className="text-[8px] md:text-[10px] tracking-[0.4em] text-black/40 font-black uppercase">
                    KM/H
                  </span>
                  <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent" />
                </div>
              </div>

              {/* Rotating Telemetry Markers */}
              <motion.div
                className="absolute inset-0 border-[0.5px] border-black/5 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* ── Sub-metrics: Peripheral Performance Status ── */}
            <div className="w-full grid grid-cols-2 gap-x-8 gap-y-2 mt-6 px-4">
              {[
                { label: "AWD ACTIVE", active: true },
                { label: "PERFORMANCE MODE", active: speedValue > 200 },
                { label: "TELEMETRY SYNC", active: true },
                { label: "BOOST READY", active: speedValue > 300 }
              ].map((m, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[7px] md:text-[8px] tracking-[0.2em] text-black/30 font-bold uppercase">{m.label}</span>
                    <div className={`w-1 h-1 rounded-full transition-colors duration-500 ${m.active ? "bg-black/60 shadow-[0_0_8px_rgba(0,0,0,0.2)]" : "bg-black/10"}`} />
                  </div>
                  <div className="h-[1px] w-full bg-black/[0.04] relative overflow-hidden">
                    {m.active && (
                      <motion.div
                        className="absolute inset-0 bg-black/20"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* ── HUD Corner Accents ── */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-r-[0.5px] border-b-[0.5px] border-black/10 rounded-br-2xl pointer-events-none" />
          </div>

          {/* ── Top-left brand mark ───────────────────────────────────────── */}
          <div className="absolute top-7 left-7 md:top-10 md:left-12 pointer-events-none">
            <p className="text-[8px] md:text-[9px] tracking-[0.4em] text-black/35 font-semibold uppercase">
              UNIQUE ™
            </p>
          </div>

          {/* ── Top-right: session tag + sound toggle ─────────────────────── */}
          <div className="absolute top-7 right-7 md:top-10 md:right-12 flex items-center gap-4">
            {/* Sound toggle — interactive */}
            <button
              onClick={() => {
                const video = videoRef.current;
                if (!video) return;
                if (isMuted) {
                  video.muted = false;
                  video.volume = 0.85;
                  setIsMuted(false);
                } else {
                  video.muted = true;
                  setIsMuted(true);
                }
              }}
              className="flex items-center gap-1.5 group cursor-pointer"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-black/35 group-hover:text-black/60 transition-colors" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-black/60 group-hover:text-black/80 transition-colors" />
              )}
              <span className="text-[8px] md:text-[9px] tracking-[0.3em] text-black/35 group-hover:text-black/55 font-semibold uppercase transition-colors">
                {isMuted ? "SOUND OFF" : "SOUND ON"}
              </span>
            </button>

            {/* Session tag */}
            <div className="pointer-events-none flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-black/30 animate-pulse" />
              <p className="text-[8px] md:text-[9px] tracking-[0.3em] text-black/35 font-semibold uppercase">
                BOOT SEQUENCE
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
