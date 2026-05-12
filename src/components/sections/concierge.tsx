"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import Image from "next/image";
import Lanyard from "@/components/ui/Lanyard";
import { Sparkles, Crown, ShieldCheck, Zap } from "lucide-react";

export function ConciergeSection() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  return (
    <section ref={containerRef} className="relative py-24 lg:py-32 overflow-hidden bg-[#0A0A0A] text-white">
      {/* Premium Background Elements with Ambient Drift */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          style={{ y, scale, willChange: "transform" }}
          className="absolute inset-[-10%] w-[120%] h-[120%]"
        >
          <Image 
            src="/images/black-card-bg.jpg" 
            alt="Elite background" 
            fill
            className="object-cover opacity-30 mix-blend-screen grayscale"
          />
        </motion.div>
        
        {/* Cinematic Fog / Haze Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-transparent z-0" />
        
        {/* Soft Light Sweeps (Optimized Blur) */}
        <motion.div
          animate={{
            x: ["-100%", "200%"],
            opacity: [0, 0.1, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ willChange: "transform, opacity" }}
          className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-30deg] z-0 blur-[60px]"
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }} // Removed blur
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-white/30" />
                <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-white/50">Elite Membership</span>
              </div>
              
              <h2 className="font-display text-5xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tighter mb-8">
                The Black Card <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/40 to-white/10">Experience.</span>
              </h2>
              
              <p className="text-white/60 text-lg lg:text-xl max-w-md leading-relaxed font-medium mb-12">
                Join our most exclusive tier. A dedicated concierge, global track access, and priority delivery for every new hypercar in our fleet.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8 mb-12">
                {[
                  { icon: <Crown className="w-5 h-5" />, title: "The Founders Club", desc: "Guaranteed access to the first production units of any new fleet additions." },
                  { icon: <Sparkles className="w-5 h-5" />, title: "Elite Concierge", desc: "A dedicated 24/7 personal manager for logistics, track days, and travel." },
                  { icon: <ShieldCheck className="w-5 h-5" />, title: "Full Shield", desc: "Comprehensive zero-liability protection and private transport security." },
                  { icon: <Zap className="w-5 h-5" />, title: "Private Tracks", desc: "Unlimited invitations to private testing sessions at international circuits." }
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }} // Removed blur, reduced distance
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="group cursor-default"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-white group-hover:text-black group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-700 ease-[0.16,1,0.3,1]">
                      {feature.icon}
                    </div>
                    <h4 className="font-bold text-[15px] mb-2 text-white/90">{feature.title}</h4>
                    <p className="text-white/40 text-sm leading-relaxed">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 1 }}
              >
                <button 
                  onClick={() => router.push('/membership')}
                  className="group relative overflow-hidden bg-white text-black px-10 py-5 rounded-full text-[13px] font-bold tracking-widest uppercase transition-all hover:scale-[1.05] active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
                >
                  <span className="relative z-10">Apply for Membership</span>
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Interactive Lanyard */}
          <div className="order-1 lg:order-2 relative h-[500px] lg:h-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} // Removed blur, simplified initial state
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: "transform, opacity", transform: "translate3d(0,0,0)" }}
              className="relative z-10 h-full w-full"
            >
              {/* Subtle ambient bloom behind the 3D element - Optimized */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-white/[0.03] blur-[60px] rounded-full pointer-events-none" />
              
              <Lanyard position={[0, 1.5, 12]} gravity={[0, -40, 0]} />
              
              {/* Floating label (Optimized) */}
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ willChange: "transform" }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white border border-white/20 px-6 py-3 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase shadow-2xl"
              >
                Drag to Interact
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
