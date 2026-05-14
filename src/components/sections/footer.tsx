"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export function FooterSection() {
  const [email, setEmail] = useState("");

  return (
    <section className="relative px-6 lg:px-12 pb-12 bg-background">
      <div className="max-w-[1500px] mx-auto">
        <div className="relative overflow-hidden rounded-[3.5rem] lg:rounded-[5rem] bg-[#0A0A0A] text-white shadow-elevated border border-white/5">
          {/* Cinematic Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 800 400" preserveAspectRatio="none">
              <ellipse cx="400" cy="200" rx="350" ry="150" fill="none" stroke="white" strokeWidth="0.5"/>
              <ellipse cx="400" cy="200" rx="250" ry="100" fill="none" stroke="white" strokeWidth="0.5"/>
              <ellipse cx="400" cy="200" rx="150" ry="60" fill="none" stroke="white" strokeWidth="0.5"/>
            </svg>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />
          </div>

          <div className="relative z-10 py-32 sm:py-48 px-10 text-center">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase block mb-8"
            >
              The Ultimate Journey
            </motion.span>
            <h2 className="font-display text-5xl sm:text-7xl lg:text-[8rem] font-bold tracking-tighter leading-[0.85] mb-12">
              Drive with <br />Unique <span className="text-white/20">Today.</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/cars" className="group relative bg-white text-black px-12 py-6 rounded-full text-[15px] font-black transition-all hover:scale-[1.05] active:scale-95 shadow-elevated">
                Browse Collection
              </Link>
              <Link href="/register" className="px-12 py-6 rounded-full text-[15px] font-black text-white border border-white/20 hover:bg-white/5 transition-all">
                Join the Elite
              </Link>
            </div>
          </div>
        </div>

        <footer className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10 items-start border-b border-border/50 pb-16">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center">
                <span className="text-background font-bold text-xs">U</span>
              </div>
              <span className="font-bold text-xl tracking-tighter text-foreground">Unique</span>
            </div>
            <p className="text-muted text-sm max-w-[240px] leading-relaxed font-medium">
              Redefining automotive luxury and elite mobility for the most discerning global clients.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black tracking-[0.2em] uppercase text-muted/60">Explore</h4>
              <nav className="flex flex-col gap-4">
                {["Fleet", "About", "Features", "Partners"].map((link) => (
                  <Link key={link} href={`/#${link.toLowerCase()}`} className="text-[13px] font-bold text-muted hover:text-foreground transition-colors">{link}</Link>
                ))}
              </nav>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-black tracking-[0.2em] uppercase text-muted/60">Legal</h4>
              <nav className="flex flex-col gap-4">
                {["Privacy", "Terms", "Cookies", "Licenses"].map((link) => (
                  <Link key={link} href="#" className="text-[13px] font-bold text-muted hover:text-foreground transition-colors">{link}</Link>
                ))}
              </nav>
            </div>
          </div>

          <div className="flex flex-col md:items-end">
            <h4 className="text-[10px] font-black tracking-[0.2em] uppercase text-muted/60 mb-6">Concierge Updates</h4>
            <div className="flex items-center gap-2 w-full max-w-[320px]">
              <div className="relative flex-1 group">
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Your e-mail" 
                  className="w-full bg-foreground/[0.02] rounded-2xl px-6 py-4 text-sm font-medium placeholder:text-muted/40 border border-border/10 text-foreground focus:bg-foreground/[0.05] focus:border-border/30 transition-all outline-none" 
                />
              </div>
              <button className="w-12 h-12 rounded-2xl bg-foreground text-background flex items-center justify-center hover:scale-[1.05] active:scale-95 transition-all shadow-soft">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </footer>

        <div className="py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-[11px] font-bold text-muted/40 uppercase tracking-widest">© 2026 Unique Elite Automotive Group</p>
          <div className="flex items-center gap-8">
            {["Instagram", "Twitter", "LinkedIn"].map((social) => (
              <Link key={social} href="#" className="text-[11px] font-black uppercase tracking-widest text-muted/40 hover:text-foreground transition-colors">{social}</Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
