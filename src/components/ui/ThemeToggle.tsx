"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  // Magnetic effect values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 150 };
  const magneticX = useSpring(mouseX, springConfig);
  const magneticY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) * 0.15);
    mouseY.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div className="fixed top-6 right-6 lg:top-8 lg:right-12 z-[100] perspective-1000">
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: magneticX, y: magneticY }}
        className="relative"
      >
        <button
          onClick={toggleTheme}
          className={`
            relative flex items-center h-12 p-1.5 rounded-full overflow-hidden transition-all duration-700 luxury-ease
            border shadow-soft group active:scale-95
            ${isDark 
              ? "bg-[#0A0A0A]/80 border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.4)]" 
              : "bg-white/90 border-black/5 shadow-[0_0_20px_rgba(0,0,0,0.05)]"}
            backdrop-blur-xl
          `}
          style={{ width: "180px" }}
        >
          {/* Internal Glows/Reflections */}
          <div className="absolute inset-0 pointer-events-none">
            <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
            <div className={`absolute -inset-1 blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-1000 ${isDark ? "bg-white" : "bg-black"}`} />
          </div>

          {/* Animated Thumb */}
          <motion.div
            layoutId="theme-thumb"
            className={`
              absolute top-1.5 bottom-1.5 w-[84px] rounded-full shadow-elevated z-10
              ${isDark 
                ? "bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10" 
                : "bg-white border border-black/[0.02] shadow-[0_4px_12px_rgba(0,0,0,0.08)]"}
            `}
            animate={{
              x: isDark ? 88 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 1
            }}
          >
            {/* Subtle Metallic Highlight */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent opacity-50" />
          </motion.div>

          {/* Icons & Labels */}
          <div className="relative z-20 flex items-center justify-between w-full h-full px-3.5">
            {/* Day Side */}
            <div className={`flex items-center gap-2 transition-all duration-700 ${!isDark ? "text-black scale-100" : "text-white/20 scale-95"}`}>
              <Sun className={`w-4 h-4 ${!isDark ? "fill-current" : ""}`} strokeWidth={2.5} />
              <span className="text-[10px] font-black tracking-[0.25em] uppercase">Day</span>
            </div>

            {/* Night Side */}
            <div className={`flex items-center gap-2 transition-all duration-700 ${isDark ? "text-white scale-100" : "text-black/20 scale-95"}`}>
              <span className="text-[10px] font-black tracking-[0.25em] uppercase">Night</span>
              <Moon className={`w-3.5 h-3.5 ${isDark ? "fill-current" : ""}`} strokeWidth={2.5} />
            </div>
          </div>

          {/* Tactile Edge Shadow */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
        </button>

        {/* Cinematic Underglow */}
        <AnimatePresence>
          {isDark && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-white/5 blur-xl rounded-full pointer-events-none z-0"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
