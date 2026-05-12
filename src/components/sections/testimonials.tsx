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
