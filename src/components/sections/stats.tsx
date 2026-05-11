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
    <section className="relative px-6 lg:px-12 py-32 bg-white overflow-hidden">
      <div ref={ref} className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label} 
              initial={{ opacity: 0, y: 30 }} 
              animate={isInView ? { opacity: 1, y: 0 } : {}} 
              transition={{ delay: i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }} 
              className="group relative text-center"
            >
              {/* Circular HUD Background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-foreground/[0.02] rounded-full scale-150 group-hover:scale-[1.6] transition-transform duration-1000 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-foreground/[0.01] rounded-full scale-125 group-hover:scale-[1.3] transition-transform duration-1000 delay-100 pointer-events-none" />
              
              <div className="relative z-10">
                <p className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tighter">
                  {stat.value}
                </p>
                <div className="h-px w-8 bg-foreground/10 mx-auto my-6 group-hover:w-12 transition-all duration-700" />
                <p className="text-[10px] font-black tracking-[0.4em] uppercase text-muted/60 group-hover:text-muted transition-colors duration-700">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
