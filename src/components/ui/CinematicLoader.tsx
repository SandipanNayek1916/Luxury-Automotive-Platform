"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { usePathname } from "next/navigation";

// The user will provide these video files. 
// We support an array so multiple intros can rotate.
const VIDEO_SOURCES = [
  "/videos/aventador-svj-loading.mp4"
];

export function CinematicLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const brandingRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const gaugeRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [videoSrc, setVideoSrc] = useState(VIDEO_SOURCES[0]);
  
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);
  const [hasMounted, setHasMounted] = useState(false);
  const [hasPlayedInitial, setHasPlayedInitial] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    // Randomize video source on client side mount
    setVideoSrc(VIDEO_SOURCES[Math.floor(Math.random() * VIDEO_SOURCES.length)]);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    // On route change, reset state and wait for the next render to attach refs
    if (pathname !== prevPathnameRef.current) {
      prevPathnameRef.current = pathname;
      setIsComplete(false);
      setProgress(0);
      return;
    }

    // Do not run animation if it's already complete or refs are not ready
    if (isComplete) return;
    if (!brandingRef.current || !metricsRef.current || !gaugeRef.current) return;
    
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    const isInitial = !hasPlayedInitial;
    // We want the cinematic feel to last a bit even on route changes.
    const timeScale = isInitial ? 1 : 2; 

    const tl = gsap.timeline({
      onComplete: () => {
        // Flash to white/transparent effect right before dissolve
        gsap.to(overlayRef.current, {
          backgroundColor: "rgba(255,255,255,1)",
          duration: 0.15,
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            setIsComplete(true);
            setHasPlayedInitial(true);
            document.body.style.overflow = '';
          }
        });
      }
    });

    // Initial state setup
    gsap.set([brandingRef.current, metricsRef.current, gaugeRef.current], { opacity: 0 });
    if (videoRef.current) {
      gsap.set(videoRef.current, { scale: 1.1, opacity: 0 });
    }

    // Phase 1: Video Fade In & Scale down (Cinematic Reveal)
    if (videoRef.current) {
      tl.to(videoRef.current, {
        opacity: 0.8,
        scale: 1,
        duration: 1.5 / timeScale,
        ease: "power2.out"
      });
    }

    // Phase 2: Center Branding Reveal
    tl.to(brandingRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.0 / timeScale,
      ease: "power3.out"
    }, "-=1.0")
    
    // Phase 3: Performance System & Gauge Boot
    .to(metricsRef.current, {
      opacity: 1,
      duration: 0.5 / timeScale
    }, "-=0.5")
    .fromTo(".metric-item", {
      opacity: 0,
      x: -20
    }, {
      opacity: 1,
      x: 0,
      duration: 0.4 / timeScale,
      stagger: 0.1 / timeScale,
      ease: "power2.out"
    }, "-=0.2")
    
    .to(gaugeRef.current, {
      opacity: 1,
      duration: 0.5 / timeScale
    }, "-=0.8");

    // Speedometer animation
    let progressObj = { value: 0 };
    gsap.to(progressObj, {
      value: 240,
      duration: 3.0 / timeScale,
      ease: "power2.inOut",
      onUpdate: () => {
        setProgress(Math.round(progressObj.value));
      }
    });

    // Parallax branding slightly
    gsap.to(brandingRef.current, {
      y: -20,
      duration: 4.0 / timeScale,
      ease: "none"
    });

    return () => {
      tl.kill();
      gsap.killTweensOf(progressObj);
      if (brandingRef.current) gsap.killTweensOf(brandingRef.current);
      document.body.style.overflow = '';
    };
  }, [pathname, hasMounted, isComplete]); // Re-run on pathname or isComplete change

  if (!hasMounted) return null;

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div
          key="loader"
          ref={containerRef}
          className="fixed inset-0 z-[9999] bg-[#F5F5F5] overflow-hidden font-sans"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            filter: "blur(10px)",
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
          }}
        >
          {/* Fullscreen Background Video */}
          <video 
            ref={videoRef}
            src={videoSrc}
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-0 scale-110"
            // Fallback poster image if video fails or takes time
            poster="/images/hypercar_silhouette.png" 
          />

          {/* Cinematic Dark Overlays -> Light Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F5F5F5]/80 via-transparent to-[#F5F5F5]/90 pointer-events-none" />
          <div className="absolute inset-0 bg-[#F5F5F5]/40 pointer-events-none mix-blend-screen" />
          
          {/* Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none opacity-60" 
               style={{ maskImage: "radial-gradient(circle at center, black, transparent 80%)", WebkitMaskImage: "radial-gradient(circle at center, black, transparent 80%)" }} />

          {/* Flash Overlay for Transition */}
          <div ref={overlayRef} className="absolute inset-0 pointer-events-none bg-transparent" />

          {/* Center Branding */}
          <div 
            ref={brandingRef}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center opacity-0 translate-y-8 px-4"
          >
            <motion.div 
              className="text-black tracking-[0.4em] md:tracking-[0.6em] text-[9px] md:text-[11px] font-semibold mb-4 md:mb-6 uppercase"
            >
              PREMIUM MOBILITY EXPERIENCE
            </motion.div>
            
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-[#0A0A0A] mb-4 md:mb-6 uppercase"
              style={{ textShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
            >
              DRIVE BEYOND <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#0A0A0A] to-[#0A0A0A]/50">ORDINARY</span>
            </h1>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-black/10" />
              <p className="text-black/50 tracking-[0.2em] text-[10px] md:text-xs font-medium uppercase">
                Loading elite automotive collection...
              </p>
              <div className="w-12 h-[1px] bg-black/10" />
            </div>
            
            {/* Minimalist Loading Bar */}
            <div className="mt-12 w-48 md:w-64 h-[1px] bg-black/10 relative overflow-hidden">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-black"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Phase 3: Performance Metrics (Left Side) */}
          <div 
            ref={metricsRef}
            className="absolute left-6 md:left-12 bottom-12 md:top-1/2 md:-translate-y-1/2 flex flex-col gap-3 md:gap-5 opacity-0 z-10"
          >
            {[
              "SYSTEMS NOMINAL", 
              "AWD ACTIVE", 
              "AERO DEPLOYED", 
              "TELEMETRY SYNCED"
            ].map((metric, idx) => (
              <div key={idx} className="metric-item flex items-center gap-3 md:gap-4">
                <div className="relative">
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-black/80 shadow-[0_0_8px_rgba(0,0,0,0.2)]" />
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-black"
                    animate={{ scale: [1, 2.5, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                  />
                </div>
                <span className="text-[8px] md:text-[10px] tracking-[0.25em] md:tracking-[0.3em] text-black/70 font-bold whitespace-nowrap uppercase">
                  {metric}
                </span>
              </div>
            ))}
            
            {/* Ambient Vertical Line connecting dots */}
            <div className="absolute left-[2px] md:left-[3px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-black/10 via-black/5 to-transparent -z-10" />
          </div>

          {/* Loading Indicator: Speedometer */}
          <div 
            ref={gaugeRef}
            className="absolute bottom-8 right-6 md:bottom-12 md:right-12 opacity-0 flex flex-col items-end z-10"
          >
            <div className="flex items-baseline gap-2">
              <motion.div 
                className="text-[42px] md:text-[72px] font-extralight leading-none text-[#0A0A0A] tracking-tighter"
                style={{ textShadow: "0 0 20px rgba(0,0,0,0.1)" }}
                animate={{ filter: progress > 200 ? "blur(0.5px)" : "blur(0px)", x: progress > 220 ? [-0.5, 0.5, -0.5] : 0 }}
                transition={{ repeat: Infinity, duration: 0.05 }}
              >
                {progress}
              </motion.div>
            </div>
            <div className="flex items-center gap-2 mt-1 md:mt-2">
              <motion.div 
                className="w-12 h-[1px]" 
                style={{ background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.4))" }}
              />
              <div className="text-[9px] md:text-[10px] tracking-[0.4em] text-black/50 font-bold uppercase">KM/H</div>
            </div>
            
            {/* High-end HUD Grid Element */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 md:w-36 md:h-36 border-r border-b border-black/10 rounded-full pointer-events-none">
              <motion.div 
                className="absolute inset-0 border-r border-b border-black/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
          
        </motion.div>
      )}
    </AnimatePresence>
  );
}
