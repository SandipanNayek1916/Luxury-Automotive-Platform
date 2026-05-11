"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User, LogOut, Heart, Calendar, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Cars", href: "/cars" },
  { label: "About", href: "/#about" },
  { label: "Features", href: "/#features" },
];

export function Navbar() {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "py-3 bg-white/80 backdrop-blur-xl shadow-soft" : "py-5 bg-transparent"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <span className="font-semibold text-foreground text-lg tracking-tight">Unique</span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-[13px] font-medium tracking-wide transition-colors relative py-1 px-1",
                  pathname === link.href ? "text-foreground" : "text-muted hover:text-foreground"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-foreground"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-6">
            {session ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 px-4 py-2 rounded-full bg-foreground/[0.03] border border-border/50 hover:bg-foreground/[0.05] transition-all"
                >
                  {session.user.image ? (
                    <img src={session.user.image} alt="" className="w-6 h-6 rounded-full border border-border" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-foreground/60" />
                    </div>
                  )}
                  <span className="text-[13px] font-semibold tracking-tight">{session.user.name?.split(" ")[0]}</span>
                </motion.button>
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-60 bg-white/90 backdrop-blur-2xl rounded-[1.5rem] shadow-elevated border border-border p-2 z-50"
                    >
                      <div className="space-y-1">
                        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-foreground/5 transition-colors text-[13px] font-medium">
                          <User className="w-4 h-4 text-muted" /> Dashboard
                        </Link>
                        <Link href="/bookings" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-foreground/5 transition-colors text-[13px] font-medium">
                          <Calendar className="w-4 h-4 text-muted" /> My Bookings
                        </Link>
                        <Link href="/favorites" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-foreground/5 transition-colors text-[13px] font-medium">
                          <Heart className="w-4 h-4 text-muted" /> Favorites
                        </Link>
                        {isAdmin && (
                          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-foreground/5 transition-colors text-[13px] font-medium">
                            <Shield className="w-4 h-4 text-muted" /> Admin Panel
                          </Link>
                        )}
                        <div className="h-px bg-border/50 my-1 mx-2" />
                        <button
                          onClick={() => signOut()}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-danger/5 transition-colors text-[13px] font-medium w-full text-left text-danger"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-[13px] font-medium text-muted hover:text-foreground transition-colors px-2">Sign In</Link>
                <Link href="/register" className="bg-foreground text-white px-7 py-2.5 rounded-full text-[13px] font-semibold hover:bg-foreground/90 transition-all hover:scale-[1.03] shadow-soft">
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            className="md:hidden p-2 rounded-full bg-foreground/[0.03] active:scale-90 transition-transform"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col pt-32 px-8"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link href={link.href} onClick={() => setMobileOpen(false)} className="text-4xl font-bold tracking-tight py-2 border-b border-border/50 block">
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                className="mt-8 flex flex-col gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {session ? (
                  <>
                    <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="text-xl font-semibold">Dashboard</Link>
                    <Link href="/bookings" onClick={() => setMobileOpen(false)} className="text-xl font-semibold">My Bookings</Link>
                    <button onClick={() => { signOut(); setMobileOpen(false); }} className="text-xl font-semibold text-left text-danger">Sign Out</button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setMobileOpen(false)} className="text-xl font-semibold">Sign In</Link>
                    <Link href="/register" onClick={() => setMobileOpen(false)} className="inline-flex items-center justify-center bg-foreground text-white px-8 py-4 rounded-full text-lg font-bold mt-4 shadow-elevated">
                      Get Started
                    </Link>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
