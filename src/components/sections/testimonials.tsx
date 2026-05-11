"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "James Richardson", role: "CEO, TechVentures", text: "The most seamless luxury car rental experience I've ever had. The Porsche 911 was immaculate.", rating: 5 },
  { name: "Sarah Chen", role: "Creative Director", text: "Unique delivers on every promise. From booking to return, everything was flawless.", rating: 5 },
  { name: "Marcus Webb", role: "Investor", text: "I've rented from every premium service. Unique stands alone in quality and attention to detail.", rating: 5 },
];

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-32">
      <div ref={ref} className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">Testimonials</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-4 tracking-tight">What Our Clients Say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.15 }} className="bg-white rounded-3xl p-8 border border-border shadow-soft">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed">"{t.text}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center">
                  <span className="text-sm font-semibold">{t.name[0]}</span>
                </div>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
