"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Julian V.", role: "P1 Collector", text: "The P1 handover was breathtaking. I've dealt with many agencies, but the technical knowledge and white-glove service at Unique is on another level. Absolutely flawless.", rating: 5 },
  { name: "Elena S.", role: "Lifestyle Curator", text: "Finally, a service that understands the nuances of true luxury. The car was pristine, the logistics were invisible, and the experience was truly 'Unique'.", rating: 5 },
  { name: "Mark Thorne", role: "Venture Partner", text: "From the track-day coordination to the private delivery, everything felt bespoke. This isn't just a rental; it's an entry into a very exclusive world.", rating: 5 },
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
