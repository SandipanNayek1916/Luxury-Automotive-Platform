"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { usePerformance } from "@/hooks/use-performance";

export function GlobalAtmosphere() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const { isLowEnd, isMobile } = usePerformance();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <>
      {/* Cinematic Grain - Only on high-end devices */}
      {!isLowEnd && (
        <div
          className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.01]"
          style={{
            backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
            backgroundSize: "200px 200px",
            animation: "grain 2s steps(2) infinite",
            willChange: "transform"
          }}
        />
      )}

      {/* Theme Transition Overlay (Cinematic Bloom) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: isLowEnd ? 0.1 : 0.2 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className={`pointer-events-none fixed inset-0 z-[100] ${isDark ? "bg-white/5" : "bg-black/5"} ${!isLowEnd ? "blur-3xl" : ""}`}
        />
      </AnimatePresence>

      {/* Ambient Moving Bloom / Light Sweeps - Disabled on Low-end/Mobile */}
      {!isLowEnd && (
        <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
          <motion.div
            animate={{
              x: ["-2%", "2%", "-2%"],
              y: ["-1%", "1%", "-1%"],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ willChange: "transform" }}
            className={`absolute top-[5%] left-[5%] w-[50vw] h-[50vw] rounded-full blur-[120px] transition-colors duration-[2000ms] ${
              isDark ? "bg-white/[0.012]" : "bg-black/[0.004]"
            }`}
          />
        </div>
      )}

      {/* Dynamic Vignette - Reduced intensity for performance */}
      <div
        className={`pointer-events-none fixed inset-0 z-[9998] transition-opacity duration-[1000ms] ${
          isDark ? "opacity-100" : "opacity-30"
        }`}
        style={{
          background: isDark 
            ? "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.5) 150%)"
            : "radial-gradient(circle at center, transparent 70%, rgba(0,0,0,0.05) 150%)",
          willChange: "opacity"
        }}
      />
    </>
  );
}
