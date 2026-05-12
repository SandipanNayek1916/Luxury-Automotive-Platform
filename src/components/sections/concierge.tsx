"use client";

import { motion } from "framer-motion";
import Lanyard from "@/components/ui/Lanyard";
import { Sparkles, Crown, ShieldCheck, Zap } from "lucide-react";

export function ConciergeSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-[#fafafa]">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-foreground/[0.02] rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-foreground/[0.02] rounded-full blur-[120px] translate-y-1/2" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[1px] bg-foreground/20" />
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-muted">Elite Membership</span>
              </div>
              
              <h2 className="font-display text-5xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tighter mb-8">
                The Black Card <br />
                <span className="text-muted/30">Experience.</span>
              </h2>
              
              <p className="text-muted text-lg lg:text-xl max-w-md leading-relaxed font-medium mb-12">
                Join our most exclusive tier. A dedicated concierge, global track access, and priority delivery for every new hypercar in our fleet.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { icon: <Crown className="w-5 h-5" />, title: "VIP Access", desc: "Priority booking for all new arrivals." },
                  { icon: <Sparkles className="w-5 h-5" />, title: "Concierge", desc: "24/7 dedicated personal assistant." },
                  { icon: <ShieldCheck className="w-5 h-5" />, title: "Full Coverage", desc: "No-questions-asked insurance policy." },
                  { icon: <Zap className="w-5 h-5" />, title: "Track Days", desc: "Monthly private track session invites." }
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-foreground/[0.03] border border-border/50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-foreground group-hover:text-white transition-all duration-500">
                      {feature.icon}
                    </div>
                    <h4 className="font-bold text-[15px] mb-2">{feature.title}</h4>
                    <p className="text-muted text-sm leading-relaxed">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Interactive Lanyard */}
          <div className="order-1 lg:order-2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-foreground/[0.02] to-transparent rounded-[3rem] -rotate-3" />
              <Lanyard position={[0, 1.5, 12]} gravity={[0, -40, 0]} />
              
              {/* Floating label */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-foreground text-white px-6 py-3 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase shadow-elevated"
              >
                Drag to Interact
              </motion.div>
            </motion.div>
            
            {/* Background decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial-gradient from-foreground/[0.03] to-transparent pointer-events-none -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}
