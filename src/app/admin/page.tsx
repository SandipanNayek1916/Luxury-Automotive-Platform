"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Link from "next/link";
import { Users, Car, Calendar, DollarSign, TrendingUp, Loader2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function AdminPage() {
  const { data: adminData, isLoading } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => { const res = await fetch("/api/admin"); return res.json(); },
  });

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div>;

  const stats = adminData?.stats || {};

  return (
    <main className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-10">
          <h1 className="font-display text-3xl sm:text-4xl font-bold">Admin Dashboard</h1>
          <p className="mt-2 text-muted">Manage your luxury car rental platform</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Users", value: stats.totalUsers || 0, icon: Users, color: "bg-blue-50 text-blue-600" },
            { label: "Total Cars", value: stats.totalCars || 0, icon: Car, color: "bg-emerald-50 text-emerald-600" },
            { label: "Total Bookings", value: stats.totalBookings || 0, icon: Calendar, color: "bg-amber-50 text-amber-600" },
            { label: "Revenue", value: formatPrice(stats.totalRevenue || 0), icon: DollarSign, color: "bg-rose-50 text-rose-600" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl p-6 border border-border shadow-soft">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <div className="bg-white rounded-[2rem] p-6 border border-border shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-lg">Recent Bookings</h2>
              <Link href="/admin/bookings" className="text-sm text-muted hover:text-foreground">View All</Link>
            </div>
            <div className="space-y-3">
              {adminData?.recentBookings?.map((booking: any) => (
                <div key={booking.id} className="flex items-center gap-4 p-3 rounded-xl bg-background/50">
                  <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center">
                    <Car className="w-4 h-4 text-muted" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{booking.car.name}</p>
                    <p className="text-xs text-muted">{booking.user.name || booking.user.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{formatPrice(booking.totalPrice)}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${booking.status === "CONFIRMED" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>{booking.status}</span>
                  </div>
                </div>
              )) || <p className="text-muted text-sm py-4">No recent bookings</p>}
            </div>
          </div>

          {/* Top Cars */}
          <div className="bg-white rounded-[2rem] p-6 border border-border shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-lg">Top Rented Cars</h2>
              <Link href="/admin/cars" className="text-sm text-muted hover:text-foreground">Manage</Link>
            </div>
            <div className="space-y-3">
              {adminData?.topCars?.map((car: any) => (
                <div key={car.id} className="flex items-center gap-4 p-3 rounded-xl bg-background/50">
                  <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-muted" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{car.name}</p>
                    <p className="text-xs text-muted">{car.brand}</p>
                  </div>
                  <p className="text-sm font-semibold">{car._count.bookings} rentals</p>
                </div>
              )) || <p className="text-muted text-sm py-4">No data</p>}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <Link href="/admin/cars" className="bg-white rounded-2xl p-6 border border-border shadow-soft hover:shadow-elevated transition-all">
            <Car className="w-6 h-6 mb-3" />
            <h3 className="font-semibold">Manage Cars</h3>
            <p className="text-sm text-muted mt-1">Add, edit, or remove vehicles</p>
          </Link>
          <Link href="/admin/bookings" className="bg-white rounded-2xl p-6 border border-border shadow-soft hover:shadow-elevated transition-all">
            <Calendar className="w-6 h-6 mb-3" />
            <h3 className="font-semibold">Manage Bookings</h3>
            <p className="text-sm text-muted mt-1">View and update reservations</p>
          </Link>
          <Link href="/admin/users" className="bg-white rounded-2xl p-6 border border-border shadow-soft hover:shadow-elevated transition-all">
            <Users className="w-6 h-6 mb-3" />
            <h3 className="font-semibold">Manage Users</h3>
            <p className="text-sm text-muted mt-1">View registered customers</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
