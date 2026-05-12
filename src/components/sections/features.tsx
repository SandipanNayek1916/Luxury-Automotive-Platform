"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Clock, Headphones, Zap, Shield } from "lucide-react";

const features = [
  { icon: Clock, title: "24-hour car delivery", desc: "Swift delivery to your doorstep any time of day", color: "bg-emerald-50", iconColor: "text-emerald-600" },
  { icon: Headphones, title: "24/7 technical support", desc: "Round-the-clock assistance for your peace of mind", color: "bg-amber-50", iconColor: "text-amber-600" },
  { icon: Zap, title: "Premium package included", desc: "Every rental comes fully equipped with luxury amenities", color: "bg-blue-50", iconColor: "text-blue-600" },
  { icon: Shield, title: "Absolute confidentiality", desc: "Your privacy and data security is our top priority", color: "bg-rose-50", iconColor: "text-rose-600" },
];

function TactileCard({ f, i, isInView }: any) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }} 
      animate={isInView ? { opacity: 1, y: 0 } : {}} 
      transition={{ delay: 0.2 + i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }} 
      whileHover={{ y: -5, scale: 1.01 }} 
      onMouseMove={handleMouseMove}
      style={{ willChange: "transform, opacity", transform: "translate3d(0,0,0)" }}
      className="group relative bg-card/60 backdrop-blur-sm rounded-[2.5rem] p-10 border border-border/40 shadow-soft hover:shadow-2xl transition-all duration-500 overflow-hidden"
    >
      {/* Spotlight Effect (Optimized with CSS Variables) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(0,0,0,0.025), transparent 60%)`
        }}
      />
      
      <div className="relative z-10 w-16 h-16 rounded-2xl bg-foreground/[0.03] flex items-center justify-center mb-8 group-hover:bg-foreground group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] transition-all duration-500 ease-[0.16,1,0.3,1]">
        <f.icon className="w-6 h-6 text-foreground group-hover:text-white transition-colors" strokeWidth={1.5} />
      </div>
      <h3 className="relative z-10 font-bold text-xl tracking-tight mb-4 group-hover:text-foreground/90 transition-colors">{f.title}</h3>
      <p className="relative z-10 text-muted text-[15px] leading-relaxed font-medium opacity-70 group-hover:opacity-100 transition-opacity">{f.desc}</p>
    </motion.div>
  );
}

export function FeaturesSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="features" ref={containerRef} className="relative px-6 lg:px-12 py-32 bg-background overflow-hidden">
      
      {/* Atmospheric Layering (Optimized) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          style={{ y: y1, willChange: "transform" }}
          className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-foreground/[0.01] blur-[100px] rounded-full" 
        />
        <motion.div 
          style={{ y: y2, willChange: "transform" }}
          className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-foreground/[0.005] blur-[80px] rounded-full" 
        />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-start">
          <div className="lg:sticky lg:top-40">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-12 h-[1px] bg-foreground/20" />
              <span className="text-[10px] font-black tracking-[0.5em] text-muted/60 uppercase block">
                Excellence Redefined
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl lg:text-7xl font-bold tracking-tighter leading-[0.9]"
            >
              Precision <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-muted to-muted/30">In Every Detail.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 text-muted text-lg max-w-md leading-relaxed font-medium"
            >
              We curate more than just a fleet; we engineer an unparalleled ecosystem of luxury, performance, and absolute discretion for the global elite.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 1 }}
              className="mt-14"
            >
              <div className="h-px w-24 bg-gradient-to-r from-foreground/20 to-transparent" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {features.map((f, i) => (
              <TactileCard key={f.title} f={f} i={i} isInView={isInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
