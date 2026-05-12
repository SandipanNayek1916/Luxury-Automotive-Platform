"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Julian V.", role: "P1 Owner", text: "The handover of the Senna was a masterclass in hospitality. I've used global services in London and Tokyo, but the attention to mechanical detail here is unparalleled. It's rare to find a team that cares about the engine as much as the aesthetics.", rating: 5 },
  { name: "Elena S.", role: "Fashion Director", text: "Logistics are usually the bottleneck in high-end rentals. Unique handled the transport of the 296 GTB to my villa with such precision I didn't even notice them arrive. The car was, quite simply, immaculate.", rating: 5 },
  { name: "Marcus T.", role: "Tech Founder", text: "Finding a service that doesn't just treat these cars like commodities is refreshing. The private track afternoon was perfectly orchestrated—instructor, telemetry, and a car that felt brand new. This is the gold standard.", rating: 5 },
];

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative px-6 lg:px-12 py-32 bg-background overflow-hidden">
      
      {/* Cinematic ambient haze (Optimized) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ x: ["-10%", "10%", "-10%"], y: ["0%", "5%", "0%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ willChange: "transform" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-foreground/[0.01] blur-[100px] rounded-full"
        />
      </div>

      <div ref={ref} className="max-w-[1400px] mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="w-8 h-[1px] bg-foreground/20" />
            <span className="text-[10px] font-black tracking-[0.4em] text-muted uppercase">
              The Standard
            </span>
            <div className="w-8 h-[1px] bg-foreground/20" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.1]"
          >
            Unspoken <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-muted to-muted/40">Excellence.</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              key={t.name} 
              initial={{ opacity: 0, y: 20 }} // Removed blur
              animate={isInView ? { opacity: 1, y: 0 } : {}} 
              transition={{ delay: 0.2 + i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }} 
              whileHover={{ y: -5, scale: 1.01 }}
              style={{ willChange: "transform, opacity", transform: "translate3d(0,0,0)" }}
              className="group relative bg-card/80 backdrop-blur-sm rounded-[2.5rem] p-10 border border-border/50 shadow-soft hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Subtle light sweep on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                <div className="absolute top-0 right-0 w-32 h-32 bg-foreground/[0.03] blur-[40px] rounded-full translate-x-1/2 -translate-y-1/2" />
              </div>

              <div className="flex gap-1.5 mb-8 relative z-10">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-foreground text-foreground opacity-20 group-hover:opacity-100 transition-opacity duration-500 delay-[${j * 100}ms]" />
                ))}
              </div>
              <p className="text-muted leading-relaxed font-medium mb-10 relative z-10 group-hover:text-foreground/90 transition-colors duration-500">
                &quot;{t.text}&quot;
              </p>
              
              <div className="mt-auto flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-foreground/[0.03] border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-white transition-all duration-500">
                  <span className="text-[13px] font-black">{t.name[0]}</span>
                </div>
                <div>
                  <p className="text-[13px] font-bold tracking-tight">{t.name}</p>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-muted/60 uppercase mt-0.5">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
