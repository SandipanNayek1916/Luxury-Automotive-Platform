"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export function AppSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative px-6 lg:px-12 py-32 overflow-hidden">
      <motion.div 
        ref={ref} 
        initial={{ opacity: 0, y: 60 }} 
        animate={isInView ? { opacity: 1, y: 0 } : {}} 
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} 
        className="relative w-full max-w-[1500px] mx-auto bg-card rounded-[3.5rem] lg:rounded-[5rem] shadow-elevated border border-border/50 overflow-hidden"
      >
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-foreground/[0.01] blur-[100px] rounded-full translate-x-1/4 -translate-y-1/4 pointer-events-none" />

        <div className="grid lg:grid-cols-2 gap-16 min-h-[700px]">
          <div className="relative flex items-center justify-center p-12 lg:p-24 overflow-hidden lg:order-2">
            <div className="relative flex items-center justify-center scale-90 sm:scale-100">
              <div className="relative z-10 animate-float" style={{ transform: "rotate(-12deg)" }}>
                <div className="relative w-[220px] sm:w-[280px] aspect-[9/19] rounded-[3rem] overflow-hidden shadow-elevated border-[6px] border-foreground/5 bg-black">
                  <Image src="https://cdn.dribbble.com/userupload/46777540/file/eca91eeb7415cc1b3e6fa50a9b6ed05d.png?resize=400x300" alt="App" fill className="object-cover opacity-90" />
                </div>
              </div>
              <div className="relative z-20 -ml-20 sm:-ml-28 animate-float" style={{ transform: "rotate(8deg)", animationDelay: "-2s" }}>
                <div className="relative w-[240px] sm:w-[300px] aspect-[9/19] rounded-[3rem] overflow-hidden shadow-elevated border-[6px] border-foreground/5 bg-black">
                  <Image src="https://cdn.dribbble.com/userupload/44826858/file/4b1ca4034573eb7570e5d07ad7afced7.png?resize=400x0" alt="App" fill className="object-cover opacity-90" />
                </div>
              </div>
            </div>
            
            {/* Decorative HUD Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-foreground/[0.02] rounded-full scale-150 pointer-events-none" />
          </div>

          <div className="flex flex-col justify-center px-10 sm:px-20 lg:pl-32 py-20 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-[1px] bg-foreground/20" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-muted">Digital Companion</span>
            </motion.div>

            <h2 className="font-display text-5xl lg:text-7xl font-bold leading-[0.9] tracking-tighter mb-10">
              Your Fleet, <br /><span className="text-muted/30">In Your Pocket.</span>
            </h2>
            <p className="text-muted text-lg lg:text-xl max-w-md leading-relaxed font-medium mb-12">
              The Unique mobile experience is designed for seamless, one-touch reservations. Track your journey and manage your collection with absolute precision.
            </p>

            <div className="flex flex-wrap gap-5">
              <button className="bg-foreground text-white px-10 py-5 rounded-full text-[15px] font-bold shadow-soft hover:scale-[1.03] transition-all">
                Download App
              </button>
              <button className="bg-white text-foreground border border-border px-10 py-5 rounded-full text-[15px] font-bold hover:bg-foreground/[0.03] transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
