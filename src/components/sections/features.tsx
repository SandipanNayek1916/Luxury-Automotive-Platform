"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, Headphones, Zap, Shield } from "lucide-react";

const features = [
  { icon: Clock, title: "24-hour car delivery", desc: "Swift delivery to your doorstep any time of day", color: "bg-emerald-50", iconColor: "text-emerald-600" },
  { icon: Headphones, title: "24/7 technical support", desc: "Round-the-clock assistance for your peace of mind", color: "bg-amber-50", iconColor: "text-amber-600" },
  { icon: Zap, title: "Premium package included", desc: "Every rental comes fully equipped with luxury amenities", color: "bg-blue-50", iconColor: "text-blue-600" },
  { icon: Shield, title: "Absolute confidentiality", desc: "Your privacy and data security is our top priority", color: "bg-rose-50", iconColor: "text-rose-600" },
];

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="relative px-6 lg:px-12 py-32 bg-[#F8F8F8]">
      <div ref={ref} className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-start">
          <div className="lg:sticky lg:top-40">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="text-[10px] font-black tracking-[0.4em] text-muted/60 uppercase block mb-6"
            >
              Excellence Redefined
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl lg:text-7xl font-bold tracking-tighter leading-[0.9]"
            >
              Precision <br /><span className="text-muted/30">In Every Detail.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="mt-10 text-muted text-lg max-w-md leading-relaxed font-medium"
            >
              We curate more than just a fleet; we engineer an unparalleled ecosystem of luxury, performance, and absolute discretion for the global elite.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="mt-12"
            >
              <div className="h-px w-20 bg-foreground/10" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {features.map((f, i) => (
              <motion.div 
                key={f.title} 
                initial={{ opacity: 0, y: 40 }} 
                animate={isInView ? { opacity: 1, y: 0 } : {}} 
                transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
                whileHover={{ y: -8 }} 
                className="group bg-white rounded-[2.5rem] p-10 border border-border shadow-soft hover:shadow-elevated transition-all duration-700"
              >
                <div className="w-16 h-16 rounded-2xl bg-foreground/[0.03] flex items-center justify-center mb-8 group-hover:bg-foreground group-hover:scale-110 transition-all duration-500">
                  <f.icon className="w-6 h-6 text-foreground group-hover:text-white transition-colors" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-xl tracking-tight mb-4 group-hover:text-foreground/80 transition-colors">{f.title}</h3>
                <p className="text-muted text-[15px] leading-relaxed font-medium opacity-70 group-hover:opacity-100 transition-opacity">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
