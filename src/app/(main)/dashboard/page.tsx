"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, Heart, CreditCard, Settings, Loader2, Car } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { data: bookings } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await fetch("/api/bookings");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    enabled: status === "authenticated",
  });

  const { data: favorites } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const res = await fetch("/api/favorites");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    enabled: status === "authenticated",
  });

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (status === "unauthenticated" || !session) {
    router.push("/login");
    return null;
  }

  const activeBookings = bookings?.filter((b: any) => ["PENDING", "CONFIRMED", "ACTIVE"].includes(b.status)) || [];
  const totalSpent = bookings?.reduce((acc: number, b: any) => acc + (b.paymentStatus === "PAID" ? b.totalPrice : 0), 0) || 0;

  return (
    <main className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-10">
          <h1 className="font-display text-3xl sm:text-4xl font-bold">Dashboard</h1>
          <p className="mt-2 text-muted">Welcome back, {session.user.name}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Active Bookings", value: activeBookings.length, icon: Calendar },
            { label: "Favorites", value: favorites?.length || 0, icon: Heart },
            { label: "Total Spent", value: formatPrice(totalSpent), icon: CreditCard },
            { label: "Total Trips", value: bookings?.length || 0, icon: Car },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl p-6 border border-border shadow-soft">
              <stat.icon className="w-5 h-5 text-muted mb-3" />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2rem] p-6 border border-border shadow-soft">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-lg">Recent Bookings</h2>
                <Link href="/bookings" className="text-sm text-muted hover:text-foreground">View All</Link>
              </div>
              {bookings?.length === 0 ? (
                <div className="text-center py-12">
                  <Car className="w-12 h-12 text-muted/30 mx-auto mb-4" />
                  <p className="text-muted">No bookings yet</p>
                  <Link href="/cars" className="text-sm text-foreground font-medium mt-2 inline-block hover:underline">Browse Fleet</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings?.slice(0, 5).map((booking: any) => (
                    <div key={booking.id} className="flex items-center gap-4 p-4 rounded-2xl bg-background/50">
                      <div className="w-16 h-16 rounded-xl bg-foreground/5 flex items-center justify-center">
                        <Car className="w-6 h-6 text-muted" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{booking.car.name}</p>
                        <p className="text-xs text-muted">{new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatPrice(booking.totalPrice)}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${booking.status === "CONFIRMED" ? "bg-emerald-50 text-emerald-600" : booking.status === "PENDING" ? "bg-amber-50 text-amber-600" : "bg-foreground/5 text-muted"}`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div className="bg-white rounded-[2rem] p-6 border border-border shadow-soft">
              <h2 className="font-semibold text-lg mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Link href="/cars" className="flex items-center gap-3 p-3 rounded-xl hover:bg-background transition-colors text-sm">
                  <Car className="w-4 h-4" /> Browse Cars
                </Link>
                <Link href="/favorites" className="flex items-center gap-3 p-3 rounded-xl hover:bg-background transition-colors text-sm">
                  <Heart className="w-4 h-4" /> My Favorites
                </Link>
                <Link href="/bookings" className="flex items-center gap-3 p-3 rounded-xl hover:bg-background transition-colors text-sm">
                  <Calendar className="w-4 h-4" /> My Bookings
                </Link>
                <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-background transition-colors text-sm w-full text-left">
                  <Settings className="w-4 h-4" /> Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
