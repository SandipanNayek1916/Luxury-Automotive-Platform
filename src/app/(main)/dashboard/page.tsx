"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, Heart, CreditCard, Settings, Loader2, Car, Shield, Crown, Sparkles, MapPin } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import Lanyard from "@/components/ui/Lanyard";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Loader2 className="w-12 h-12 animate-spin text-white/20" />
    </div>
  );
  
  if (!session) { router.push("/login"); return null; }

  const { data: bookings } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => { const res = await fetch("/api/bookings"); return res.json(); },
  });

  const { data: favorites } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => { const res = await fetch("/api/favorites"); return res.json(); },
  });

  const activeBookings = bookings?.filter((b: any) => ["PENDING", "CONFIRMED", "ACTIVE"].includes(b.status)) || [];
  const totalSpent = bookings?.reduce((acc: number, b: any) => acc + (b.paymentStatus === "PAID" ? b.totalPrice : 0), 0) || 0;

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white pt-32 pb-24 px-4 sm:px-8 lg:px-16 selection:bg-white/20">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-4 h-4 text-white/40" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40">Verified Member</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter">
              Privé <span className="text-white/40">Portal</span>
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-4 rounded-3xl backdrop-blur-xl"
          >
            <div className="text-right">
              <p className="text-[10px] font-bold tracking-widest uppercase text-white/40">Current Tier</p>
              <p className="text-lg font-semibold flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-400" /> Platinum Elite
              </p>
            </div>
          </motion.div>
        </header>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left Column: Stats & Bookings */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Active Bookings", value: activeBookings.length, icon: Calendar },
                { label: "Saved Vehicles", value: favorites?.length || 0, icon: Heart },
                { label: "Miles Traveled", value: "2,480", icon: MapPin },
                { label: "Total Asset Value", value: formatPrice(totalSpent), icon: CreditCard },
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label} 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: i * 0.1 }} 
                  className="bg-white/[0.03] border border-white/5 rounded-[2rem] p-6 hover:bg-white/[0.05] transition-colors group"
                >
                  <stat.icon className="w-5 h-5 text-white/20 mb-4 group-hover:text-white/60 transition-colors" />
                  <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-white/40 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <section className="bg-white/[0.03] border border-white/5 rounded-[3rem] p-8 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold tracking-tight flex items-center gap-3">
                  <Sparkles className="w-5 h-5" /> Recent Expeditions
                </h2>
                <Link href="/bookings" className="text-[10px] font-bold tracking-widest uppercase text-white/40 hover:text-white transition-colors">
                  Full History →
                </Link>
              </div>

              {bookings?.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-white/10 rounded-[2rem]">
                  <Car className="w-12 h-12 text-white/10 mx-auto mb-4" />
                  <p className="text-white/40 text-sm">Your garage is currently empty.</p>
                  <Link href="/cars" className="mt-6 inline-flex px-8 py-3 bg-white text-black rounded-full text-sm font-bold hover:scale-105 transition-transform">
                    Acquire Vehicle
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings?.slice(0, 3).map((booking: any) => (
                    <div key={booking.id} className="flex items-center gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                      <div className="w-20 h-20 rounded-2xl bg-white/5 overflow-hidden flex-shrink-0">
                        {booking.car.mainImage ? (
                          <img src={booking.car.mainImage} className="w-full h-full object-cover" alt="" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Car className="w-8 h-8 text-white/10" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-lg truncate tracking-tight">{booking.car.name}</p>
                        <p className="text-xs text-white/40 mt-1 uppercase tracking-widest">
                          {new Date(booking.startDate).toLocaleDateString()} — {new Date(booking.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xl tracking-tighter">{formatPrice(booking.totalPrice)}</p>
                        <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest mt-2 inline-block ${
                          booking.status === "CONFIRMED" ? "bg-emerald-500/10 text-emerald-500" : 
                          booking.status === "PENDING" ? "bg-amber-500/10 text-amber-500" : 
                          "bg-white/5 text-white/40"
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right Column: Black Card Experience */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              <section className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-[3rem] p-8 backdrop-blur-xl relative overflow-hidden group">
                <div className="relative z-10">
                  <h2 className="text-xl font-bold tracking-tight mb-2">Digital Black Card</h2>
                  <p className="text-xs text-white/40 mb-8 uppercase tracking-widest leading-relaxed">
                    Interactive membership credentials. <br />
                    Securely verified on-chain.
                  </p>
                  
                  <div className="h-[400px] -mx-8 relative">
                    <Lanyard transparent={true} />
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-white/40">Member ID</span>
                      <span className="text-xs font-mono text-white/80">{session.user.id.substring(0, 12).toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-white/40">Status</span>
                      <span className="text-xs text-emerald-400 font-bold uppercase tracking-widest">Active</span>
                    </div>
                  </div>
                </div>
                
                {/* Decorative background light */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:bg-white/10 transition-colors duration-1000" />
              </section>

              {/* Quick Navigation */}
              <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6">
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-white/30 mb-6">Operations</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Inventory", href: "/cars", icon: Car },
                    { label: "Preferences", href: "/dashboard/settings", icon: Settings },
                  ].map((item) => (
                    <Link 
                      key={item.label} 
                      href={item.href}
                      className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group"
                    >
                      <item.icon className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
