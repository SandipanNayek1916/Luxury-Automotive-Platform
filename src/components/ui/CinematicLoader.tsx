"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { useCinematicBridge } from "@/lib/cinematic-bridge";

const INTRO_DURATION_MS = 10500;
const VIDEO_SRC = "/videos/aventador-svj-loading.mp4";

export function CinematicLoader() {
  const [localIsExiting, setLocalIsExiting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const { isVisible, setIsVisible, signalLoaderExiting } = useCinematicBridge();

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const brandingRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const gaugeRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const gradientOverlayRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gsapCtx = useRef<gsap.Context | null>(null);
  const hasDismissed = useRef(false);

  const dismiss = useCallback(() => {
    if (hasDismissed.current) return;
    hasDismissed.current = true;

    gsapCtx.current?.kill();
    signalLoaderExiting();

    if (sweepRef.current) {
      gsap.fromTo(sweepRef.current, { x: "-110%", opacity: 0 }, { x: "110%", opacity: 1, duration: 1.1, ease: "power2.inOut" });
    }

    const video = videoRef.current;
    if (video && !video.muted && video.volume > 0) {
      gsap.to(video, { volume: 0, duration: 1, onComplete: () => { video.muted = true; } });
    }

    document.body.style.overflow = "";
    document.body.style.height = "";

    setTimeout(() => setLocalIsExiting(true), 400);
  }, [signalLoaderExiting]);

  useEffect(() => {
    if (!isVisible) return;

    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";

    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.volume = 0.85;
      video.load();
      video.play().then(() => setIsMuted(false)).catch(() => {
        video.muted = true;
        setIsMuted(true);
        video.play().catch(() => {});
      });
    }

    gsapCtx.current = gsap.context(() => {
      const tl = gsap.timeline();

      gsap.set([brandingRef.current, metricsRef.current, gaugeRef.current], { 
        opacity: 0, 
        z: 0,
        force3D: true,
        willChange: "opacity, transform" 
      });

      if (video) {
        gsap.set(video, { scale: 1.02, z: 0, force3D: true, willChange: "opacity, transform" });
        tl.to(video, { opacity: 0.85, scale: 1, duration: 1.2, ease: "power2.out" });
      }

      gsap.set(brandingRef.current, { opacity: 1, y: 0 });

      tl.fromTo(".loader-subtitle", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6")
        .fromTo(".loader-title-word", { y: 40, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: "back.out(1.2)" }, "-=0.6")
        .fromTo(".loader-line", { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power3.inOut" }, "-=0.4")
        .fromTo(".loader-status", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.6")
        .fromTo(".loader-bar", { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power3.out" }, "-=0.4")
        .to(metricsRef.current, { opacity: 1, duration: 0.6 }, "-=0.4")
        .fromTo(".loader-metric-item", 
          { opacity: 0, x: -10, z: 0 }, 
          { opacity: 1, x: 0, z: 0, duration: 0.4, stagger: 0.08, ease: "power2.out", force3D: true }, 
          "-=0.4"
        )
        .to(gaugeRef.current, { opacity: 1, duration: 0.8, force3D: true }, "-=0.8");

      const speedObj = { v: 0 };
      gsap.to(speedObj, {
        v: 340,
        duration: 10,
        ease: "power2.inOut",
        onUpdate() {
          const valEl = document.getElementById("loader-speed-value");
          if (valEl) valEl.textContent = Math.round(speedObj.v).toString();
          
          const arcEl = document.getElementById("loader-speed-arc");
          if (arcEl) {
            const offset = 552.92 - (552.92 * (speedObj.v / 400));
            arcEl.setAttribute("stroke-dashoffset", offset.toString());
          }
        }
      });

      gsap.to(brandingRef.current, { y: -15, duration: 11, ease: "none", force3D: true });
      gsap.to([gradientOverlayRef.current, vignetteRef.current], { opacity: 0, duration: 3, delay: 8, ease: "power2.inOut" });
    });

    timerRef.current = setTimeout(dismiss, INTRO_DURATION_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (gsapCtx.current) {
        gsapCtx.current.revert();
      }
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [dismiss, isVisible]);

  if (!isVisible) return null;

  return (
    <AnimatePresence mode="wait" onExitComplete={() => setIsVisible(false)}>
      {!localIsExiting && (
        <motion.div
          key="cinematic-intro"
          ref={containerRef}
          className="fixed inset-0 z-[9999] overflow-hidden select-none bg-[#F2F0ED]"
          style={{ willChange: "opacity" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }}
        >
          <div ref={sweepRef} className="absolute inset-0 pointer-events-none z-30 opacity-0" style={{ background: "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)", willChange: "transform, opacity", transform: "translate3d(-110%, 0, 0)" }} />
          
          <video ref={videoRef} src={VIDEO_SRC} playsInline loop muted={isMuted} preload="auto" className="absolute inset-0 w-full h-full object-cover opacity-0 scale-[1.02]" style={{ willChange: "opacity, transform", transform: "translate3d(0,0,0)" }} />

          <div ref={gradientOverlayRef} className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(242,240,237,0.7) 0%, transparent 40%, rgba(242,240,237,0.8) 100%)" }} />
          <div ref={vignetteRef} className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(242,240,237,0.5) 100%)" }} />

          <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "linear-gradient(to right,rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,0,0,0.04) 1px,transparent 1px)", backgroundSize: "64px 64px", maskImage: "radial-gradient(circle at center, black 20%, transparent 80%)" }} />

          <div ref={brandingRef} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-6">
            <div className="overflow-hidden mb-5">
              <p className="loader-subtitle text-black/60 tracking-[0.5em] text-[10px] font-semibold uppercase">UNIQUE — ELITE AUTOMOTIVE EXPERIENCES</p>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extralight tracking-tight text-[#0A0A0A] mb-5 uppercase leading-none flex gap-3 sm:gap-4">
              <div className="overflow-hidden"><span className="loader-title-word block">EXPERIENCE</span></div>
              <div className="overflow-hidden"><span className="loader-title-word block">ABSOLUTE</span></div>
              <div className="overflow-hidden"><span className="loader-title-word block font-semibold">PERFECTION</span></div>
            </h1>
            <div className="flex items-center gap-4 mb-10">
              <div className="loader-line w-10 h-px bg-black/15 origin-left" />
              <div className="overflow-hidden">
                <p className="loader-status text-black/40 tracking-[0.2em] text-[10px] font-medium uppercase">Curating exclusive hypercar collection</p>
              </div>
              <div className="loader-line w-10 h-px bg-black/15 origin-right" />
            </div>
            <div className="loader-bar w-48 h-px bg-black/10 relative overflow-hidden rounded-full origin-center">
              <motion.div className="absolute inset-y-0 left-0 bg-black/70 rounded-full" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: INTRO_DURATION_MS / 1000, ease: "easeInOut", delay: 1 }} />
            </div>
          </div>

          <div ref={metricsRef} className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-5 z-10" style={{ opacity: 0 }}>
            {["INVENTORY SYNCHRONIZED", "CONCIERGE ACTIVE", "FLEET PREPARED", "ACCESS GRANTED"].map((label, i) => (
              <div key={i} className="loader-metric-item flex items-center gap-3">
                <div className="relative w-1.5 h-1.5 rounded-full bg-black/70" />
                <span className="text-[9px] tracking-[0.28em] text-black/60 font-semibold uppercase whitespace-nowrap">{label}</span>
              </div>
            ))}
          </div>

          <div ref={gaugeRef} className="absolute bottom-8 right-8 md:bottom-12 md:right-12 flex flex-col items-end z-10 w-[240px] md:w-[320px]" style={{ opacity: 0 }}>
            <div className="relative w-full aspect-square flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                <motion.circle cx="100" cy="100" r="95" fill="none" stroke="black" strokeWidth="0.5" strokeOpacity="0.05" animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />
                <g opacity="0.1">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <line key={i} x1="100" y1="10" x2="100" y2="16" stroke="black" strokeWidth="1" transform={`rotate(${i * 9} 100 100)`} />
                  ))}
                </g>
                <circle id="loader-speed-arc" cx="100" cy="100" r="88" fill="none" stroke="black" strokeWidth="2" strokeDasharray="552.92" strokeDashoffset="552.92" strokeLinecap="round" opacity="0.3" style={{ transform: "rotate(-90deg)", transformOrigin: "center" }} />
              </svg>
              <div className="absolute flex flex-col items-center">
                <div id="loader-speed-value" className="text-6xl md:text-8xl font-extralight text-[#0A0A0A] tabular-nums">0</div>
                <div className="flex items-center gap-2 -mt-2">
                  <div className="w-8 h-px bg-black/20" />
                  <span className="text-[8px] tracking-[0.4em] text-black/40 font-black uppercase">KM/H</span>
                  <div className="w-8 h-px bg-black/20" />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-7 right-7 md:top-10 md:right-12 flex items-center gap-4">
            <button onClick={() => {
              const video = videoRef.current;
              if (video) { video.muted = !video.muted; setIsMuted(video.muted); }
            }} className="flex items-center gap-1.5 group cursor-pointer">
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-black/35" /> : <Volume2 className="w-3.5 h-3.5 text-black/60" />}
              <span className="text-[8px] tracking-[0.3em] text-black/35 font-semibold uppercase">{isMuted ? "SOUND OFF" : "SOUND ON"}</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
