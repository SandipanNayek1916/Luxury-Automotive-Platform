"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const SESSION_KEY = "unique_intro_played";
const INTRO_DURATION_MS = 5000; // exact 5 seconds
const VIDEO_SRC = "/videos/aventador-svj-loading.mp4";
const VIDEO_POSTER = "/images/hypercar_silhouette.png";

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export function CinematicLoader() {
  // ── State ──────────────────────────────────────────────────────────────────
  const [shouldShow, setShouldShow] = useState<boolean | null>(null); // null = not yet determined
  const [isExiting, setIsExiting] = useState(false);
  const [speedValue, setSpeedValue] = useState(0);

  // ── Refs ───────────────────────────────────────────────────────────────────
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const brandingRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const gaugeRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gsapCtx = useRef<gsap.Context | null>(null);
  const hasDismissed = useRef(false);

  // ── Dismiss handler ────────────────────────────────────────────────────────
  const dismiss = useCallback(() => {
    // Guard: only run once
    if (hasDismissed.current) return;
    hasDismissed.current = true;

    // Mark in sessionStorage so navigations don't re-trigger
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}

    // Kill all GSAP animations cleanly
    gsapCtx.current?.kill();

    // Restore scroll before framer exit animation starts
    document.body.style.overflow = "";
    document.body.style.height = "";

    setIsExiting(true);
  }, []);

  // ── Mount: check sessionStorage ────────────────────────────────────────────
  useEffect(() => {
    let alreadyPlayed = false;
    try { alreadyPlayed = sessionStorage.getItem(SESSION_KEY) === "1"; } catch {}

    if (alreadyPlayed) {
      // Skip loader entirely — never block the page
      setShouldShow(false);
      return;
    }

    setShouldShow(true);
    // Lock body scroll only during actual first-time intro
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
  }, []); // ← empty deps: runs exactly ONCE per mount, not on route changes

  // ── GSAP Animation (only when shouldShow becomes true) ────────────────────
  useEffect(() => {
    if (shouldShow !== true) return;
    if (!brandingRef.current || !metricsRef.current || !gaugeRef.current) return;

    // ── Video preload ──────────────────────────────────────────────────────
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {}); // autoplay may be blocked silently
    }

    // ── Build GSAP context (scoped, auto-cleanup) ──────────────────────────
    gsapCtx.current = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial invisible state
      gsap.set([brandingRef.current, metricsRef.current, gaugeRef.current], {
        opacity: 0,
        willChange: "opacity, transform",
      });
      if (videoRef.current) {
        gsap.set(videoRef.current, { scale: 1.08, opacity: 0, willChange: "opacity, transform" });
      }

      // Phase 1 — Video fade in + subtle scale to 1
      if (videoRef.current) {
        tl.to(videoRef.current, {
          opacity: 0.82,
          scale: 1,
          duration: 1.6,
          ease: "power2.out",
        });
      }

      // Phase 2 — Branding reveal
      tl.to(
        brandingRef.current,
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
        "-=1.0"
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

      // Speedometer count-up animation (0 → 240 over 4s)
      const speedObj = { v: 0 };
      gsap.to(speedObj, {
        v: 240,
        duration: 4.2,
        ease: "power2.inOut",
        onUpdate() {
          setSpeedValue(Math.round(speedObj.v));
        },
      });

      // Subtle branding drift
      gsap.to(brandingRef.current, { y: -18, duration: 5, ease: "none" });
    });

    // ── Exact 5-second timer ──────────────────────────────────────────────
    timerRef.current = setTimeout(dismiss, INTRO_DURATION_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      gsapCtx.current?.kill();
    };
  }, [shouldShow, dismiss]);

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────

  // Don't render anything until we've determined if it should show
  if (shouldShow === null || shouldShow === false) return null;

  return (
    <AnimatePresence mode="wait" onExitComplete={() => setShouldShow(false)}>
      {!isExiting && (
        <motion.div
          key="cinematic-intro"
          ref={containerRef}
          className="fixed inset-0 z-[9999] overflow-hidden select-none"
          style={{
            backgroundColor: "#F2F0ED",
            willChange: "opacity, filter",
            transform: "translateZ(0)", // GPU layer
          }}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 1.4,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
        >
          {/* ── Fullscreen Video ─────────────────────────────────────── */}
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            poster={VIDEO_POSTER}
            muted
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

          {/* ── Cinematic gradient overlays ──────────────────────────── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(242,240,237,0.78) 0%, rgba(242,240,237,0.0) 40%, rgba(242,240,237,0.85) 100%)",
            }}
          />
          {/* Side vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(242,240,237,0.55) 100%)",
            }}
          />

          {/* ── Subtle grid ──────────────────────────────────────────── */}
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

          {/* ── Center Branding ──────────────────────────────────────── */}
          <div
            ref={brandingRef}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-6"
            style={{ opacity: 0, transform: "translateY(28px) translateZ(0)" }}
          >
            <p
              className="text-black/60 tracking-[0.5em] text-[9px] sm:text-[10px] font-semibold uppercase mb-5"
            >
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

            {/* Progress bar — Framer Motion drives this independently */}
            <div className="w-48 sm:w-64 h-px bg-black/10 relative overflow-hidden rounded-full">
              <motion.div
                className="absolute inset-y-0 left-0 bg-black/70 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: INTRO_DURATION_MS / 1000, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* ── Left: System Metrics ─────────────────────────────────── */}
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

          {/* ── Right: Speedometer ───────────────────────────────────── */}
          <div
            ref={gaugeRef}
            className="absolute bottom-10 right-6 md:bottom-12 md:right-12 flex flex-col items-end z-10"
            style={{ opacity: 0 }}
          >
            <motion.div
              className="text-5xl md:text-7xl font-extralight leading-none text-[#0A0A0A] tracking-tighter tabular-nums"
              style={{ textShadow: "0 0 24px rgba(0,0,0,0.08)", willChange: "transform" }}
              animate={
                speedValue > 215
                  ? { x: [-0.6, 0.6, -0.6], transition: { repeat: Infinity, duration: 0.06 } }
                  : {}
              }
            >
              {speedValue}
            </motion.div>

            <div className="flex items-center gap-2 mt-1.5">
              <div
                className="w-12 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.35))" }}
              />
              <span className="text-[9px] tracking-[0.4em] text-black/45 font-bold uppercase">
                KM/H
              </span>
            </div>

            {/* HUD arc */}
            <div className="absolute -bottom-5 -right-5 w-28 h-28 border-r border-b border-black/10 rounded-full pointer-events-none">
              <motion.div
                className="absolute inset-0 border-r border-b border-black/15 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>

          {/* ── Top-left brand mark ──────────────────────────────────── */}
          <div className="absolute top-7 left-7 md:top-10 md:left-12 pointer-events-none">
            <p className="text-[8px] md:text-[9px] tracking-[0.4em] text-black/35 font-semibold uppercase">
              UNIQUE ™
            </p>
          </div>

          {/* ── Top-right session tag ────────────────────────────────── */}
          <div className="absolute top-7 right-7 md:top-10 md:right-12 pointer-events-none flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-black/30 animate-pulse" />
            <p className="text-[8px] md:text-[9px] tracking-[0.3em] text-black/35 font-semibold uppercase">
              BOOT SEQUENCE
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
