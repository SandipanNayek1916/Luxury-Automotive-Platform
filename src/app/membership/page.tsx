"use client";

import { motion } from "framer-motion";
import { Crown, Sparkles, ShieldCheck, Zap, Globe, Clock, Star, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Lanyard from "@/components/ui/Lanyard";

export default function MembershipPage() {
  const router = useRouter();

  const benefits = [
    {
      icon: <Crown className="w-6 h-6" />,
      title: "Priority Access",
      desc: "Be the first to drive our newest acquisitions before they are available to the public."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Mobility",
      desc: "Seamless transfers and car availability in over 20 major luxury hubs worldwide."
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Dedicated Concierge",
      desc: "Your personal lifestyle manager available 24/7 for all your automotive and travel needs."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Full Protection",
      desc: "Comprehensive elite insurance coverage with zero deductible for total peace of mind."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Invisible Logistics",
      desc: "Door-to-door delivery and collection, anywhere, anytime. We adapt to your schedule."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Track Experiences",
      desc: "Exclusive invitations to private track days and manufacturer-backed driving events."
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-white/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-[1px] bg-white/20" />
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-white/40">The Highest Tier</span>
            </div>

            <h1 className="font-display text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
              Black Card <br />
              <span className="text-white/20 text-5xl lg:text-7xl">Membership.</span>
            </h1>

            <p className="text-xl text-white/60 max-w-lg leading-relaxed mb-12">
              Beyond a rental service. An ecosystem of elite mobility, tailored for the world's most discerning enthusiasts.
            </p>

            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                >
                  <div className="text-white/40 mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-16 flex flex-wrap gap-6 items-center"
            >
              <button className="bg-white text-black px-12 py-5 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-white/90 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                Apply Now
              </button>
              <div className="flex items-center gap-2 text-white/40 text-xs font-bold tracking-widest uppercase">
                <Star className="w-4 h-4 fill-white/20" />
                Invitation Only
              </div>
            </motion.div>
          </motion.div>

          <div className="relative h-[600px] lg:h-[800px] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full"
            >
              <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
            </motion.div>
            
            {/* Holographic Label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[200px] pointer-events-none">
              <div className="flex flex-col items-center gap-4">
                <div className="w-[1px] h-20 bg-gradient-to-t from-white/20 to-transparent" />
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/20">Titanium Grade Core</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
