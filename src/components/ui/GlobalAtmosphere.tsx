"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function GlobalAtmosphere() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Cinematic Grain - Persistent but extremely subtle */}
      <div
        className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.02]"
        style={{
          backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
          backgroundSize: "200px 200px",
          animation: "grain 1s steps(2) infinite", // Slower grain for less CPU usage
        }}
      />

      {/* Ambient Moving Bloom / Light Sweeps - Disabled on Mobile */}
      {!isMobile && (
        <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden opacity-40">
          <motion.div
            animate={{
              x: ["-10%", "10%", "-10%"],
              y: ["-3%", "3%", "-3%"],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ willChange: "transform" }}
            className="absolute -top-[10%] -left-[5%] w-[60vw] h-[60vw] rounded-full bg-white/[0.005] blur-[60px]" 
          />
          <motion.div
            animate={{
              x: ["10%", "-10%", "10%"],
              y: ["3%", "-3%", "3%"],
            }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ willChange: "transform" }}
            className="absolute -bottom-[10%] -right-[5%] w-[50vw] h-[50vw] rounded-full bg-white/[0.005] blur-[70px]"
          />
        </div>
      )}

      {/* Subtle Vignette for Cinematic Depth - Using Gradient instead of filters */}
      <div
        className="pointer-events-none fixed inset-0 z-[9998]"
        style={{
          background: "radial-gradient(circle at center, transparent 60%, rgba(0,0,0,0.1) 150%)",
        }}
      />
    </>
  );
}
