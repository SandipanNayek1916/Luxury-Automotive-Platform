"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useCinematicBridge } from "@/lib/cinematic-bridge";

/**
 * CinematicAtmosphere — a persistent shared atmospheric layer that lives
 * at z-9990 (below the loader, above the page). It carries grain, vignette,
 * and cinematic bands that exist in BOTH the loader world and the hero world,
 * creating zero atmospheric discontinuity on transition.
 *
 * Fades out 0.8s after the loader signals its exit.
 */
export function CinematicAtmosphere() {
  const { loaderExiting } = useCinematicBridge();
  const controls = useAnimation();

  useEffect(() => {
    if (!loaderExiting) return;
    // Small head-start: let the loader's own sweep play (400ms), then dissolve
    const t = setTimeout(() => {
      controls.start({
        opacity: 0,
        transition: { duration: 3.0, ease: [0.16, 1, 0.3, 1] },
      });
    }, 800);
    return () => clearTimeout(t);
  }, [loaderExiting, controls]);

  return (
    <motion.div
      animate={controls}
      initial={{ opacity: 1 }}
      className="fixed inset-0 pointer-events-none select-none"
      style={{ zIndex: 9990, willChange: "opacity" }}
    >
      {/* Cinematic vignette — matches loader radial gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 28%, rgba(242,240,237,0.45) 100%)",
        }}
      />

      {/* Top atmospheric band */}
      <div
        className="absolute top-0 left-0 right-0 h-[15vh]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(242,240,237,0.65) 0%, transparent 100%)",
        }}
      />

      {/* Bottom atmospheric band */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[15vh]"
        style={{
          background:
            "linear-gradient(to top, rgba(242,240,237,0.65) 0%, transparent 100%)",
        }}
      />

      {/* Moving film grain — continuously animated */}
      <div
        className="absolute inset-[-20%] w-[140%] h-[140%] opacity-[0.028]"
        style={{
          backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
          backgroundSize: "200px 200px",
          animation: "grain 0.9s steps(1) infinite",
        }}
      />
    </motion.div>
  );
}
