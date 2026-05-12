"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "500+", label: "Premium Vehicles" },
  { value: "12K+", label: "Happy Clients" },
  { value: "99%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Support Available" },
];

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative px-6 lg:px-12 py-32 bg-background overflow-hidden border-y border-border/30">
      
      {/* Background cinematic elements (Optimized) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
         <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
            style={{ willChange: "transform" }}
            className="w-[120vw] h-[120vw] max-w-[1200px] max-h-[1200px] border border-foreground/[0.015] rounded-full border-dashed opacity-40"
         />
      </div>

      <div ref={ref} className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label} 
              initial={{ opacity: 0, y: 15 }} // Removed blur
              animate={isInView ? { opacity: 1, y: 0 } : {}} 
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
              style={{ willChange: "transform, opacity", transform: "translate3d(0,0,0)" }}
              className="group relative text-center py-10"
            >
              {/* Circular HUD Background (Optimized) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-foreground/[0.005] rounded-full scale-50 opacity-0 group-hover:scale-[1.1] group-hover:opacity-100 transition-all duration-1000 ease-[0.16,1,0.3,1] pointer-events-none blur-md" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-foreground/[0.015] rounded-full scale-100 group-hover:scale-[1.25] group-hover:border-foreground/[0.04] transition-all duration-1000 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-foreground/[0.005] rounded-full scale-100 group-hover:scale-[1.05] transition-transform duration-1000 delay-100 pointer-events-none" />
              
              <div className="relative z-10">
                <p className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tighter mix-blend-difference">
                  {stat.value}
                </p>
                <div className="h-px w-8 bg-foreground/10 mx-auto my-6 group-hover:w-16 group-hover:bg-foreground/30 transition-all duration-700 ease-[0.16,1,0.3,1]" />
                <p className="text-[10px] font-black tracking-[0.4em] uppercase text-muted/60 group-hover:text-foreground/80 transition-colors duration-700">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
