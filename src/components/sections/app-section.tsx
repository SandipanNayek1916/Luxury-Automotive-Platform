"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function AppSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 100]);

  return (
    <section id="about" ref={containerRef} className="relative px-6 lg:px-12 py-32 overflow-hidden bg-background">
      
      {/* Background Ambient Haze (Optimized) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          style={{ y: y1, willChange: "transform" }}
          className="absolute top-0 right-0 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-foreground/[0.01] blur-[100px] rounded-full -translate-y-1/4 translate-x-1/4" 
        />
        <motion.div 
          style={{ y: y2, willChange: "transform" }}
          className="absolute bottom-0 left-0 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-foreground/[0.005] blur-[80px] rounded-full translate-y-1/4 -translate-x-1/4" 
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={isInView ? { opacity: 1, y: 0 } : {}} 
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} 
        style={{ willChange: "transform, opacity", transform: "translate3d(0,0,0)" }}
        className="relative z-10 w-full max-w-[1500px] mx-auto bg-card/60 backdrop-blur-sm rounded-[3.5rem] lg:rounded-[5rem] shadow-2xl border border-border/40 overflow-hidden"
      >
        {/* Inner ambient glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none" />

        <div className="grid lg:grid-cols-2 gap-16 min-h-[700px] relative z-20">
          <div className="relative flex items-center justify-center p-12 lg:p-24 overflow-hidden lg:order-2">
            
            {/* Environmental light sweep behind phones (Simplified) */}
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 25, // Slower is cheaper
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ willChange: "transform" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-transparent via-foreground/[0.015] to-transparent blur-[40px] pointer-events-none"
            />

            <div className="relative flex items-center justify-center scale-90 sm:scale-100">
              <motion.div 
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{ willChange: "transform", transform: "rotate(-12deg)" }}
                className="relative z-10" 
              >
                <div className="relative w-[220px] sm:w-[280px] aspect-[9/19] rounded-[3rem] overflow-hidden shadow-2xl border-[6px] border-foreground/[0.03] bg-black">
                  <Image src="https://cdn.dribbble.com/userupload/46777540/file/eca91eeb7415cc1b3e6fa50a9b6ed05d.png?resize=400x300" alt="App" fill className="object-cover opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none mix-blend-overlay" />
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ y: 0 }}
                animate={{ y: [15, -15, 15] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="relative z-20 -ml-20 sm:-ml-28" 
                style={{ transform: "rotate(8deg)" }}
              >
                <div className="relative w-[240px] sm:w-[300px] aspect-[9/19] rounded-[3rem] overflow-hidden shadow-2xl border-[6px] border-foreground/[0.03] bg-black">
                  <Image src="https://cdn.dribbble.com/userupload/44826858/file/4b1ca4034573eb7570e5d07ad7afced7.png?resize=400x0" alt="App" fill className="object-cover opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 pointer-events-none mix-blend-overlay" />
                </div>
              </motion.div>
            </div>
            
            {/* Decorative HUD Elements */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-foreground/[0.02] rounded-full scale-150 pointer-events-none border-dashed" 
            />
          </div>

          <div className="flex flex-col justify-center px-10 sm:px-20 lg:pl-32 py-20 lg:order-1 relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-[1px] bg-foreground/30" />
              <span className="text-[10px] font-black tracking-[0.5em] uppercase text-muted">Digital Companion</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl lg:text-7xl font-bold leading-[0.9] tracking-tighter mb-10"
            >
              Your Fleet, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-muted to-muted/30">In Your Pocket.</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-muted text-lg lg:text-xl max-w-md leading-relaxed font-medium mb-12"
            >
              The Unique mobile experience is designed for seamless, one-touch reservations. Track your journey and manage your collection with absolute precision.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-5 items-center"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden bg-foreground text-white px-10 py-5 rounded-full text-[14px] font-bold tracking-wide shadow-2xl transition-shadow hover:shadow-foreground/20"
              >
                <span className="relative z-10">Download App</span>
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.03)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent text-foreground border border-border/80 px-10 py-5 rounded-full text-[14px] font-bold tracking-wide transition-colors"
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
