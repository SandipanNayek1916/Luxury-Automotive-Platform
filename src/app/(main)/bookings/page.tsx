"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Car, Loader2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function BookingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await fetch("/api/bookings");
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

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  return (
    <main className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-8">My Bookings</h1>
        {isLoading ? (
          <div className="flex items-center justify-center py-24"><Loader2 className="w-8 h-8 animate-spin text-muted" /></div>
        ) : bookings?.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[2.5rem] border border-border">
            <Car className="w-16 h-16 text-muted/20 mx-auto mb-4" />
            <p className="text-muted text-lg">No bookings yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings?.map((booking: any, i: number) => (
              <motion.div key={booking.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl p-6 border border-border shadow-soft flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="w-20 h-20 rounded-xl bg-foreground/5 flex items-center justify-center flex-shrink-0">
                  <Car className="w-8 h-8 text-muted" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg">{booking.car.name}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">{formatPrice(booking.totalPrice)}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${booking.status === "CONFIRMED" ? "bg-emerald-50 text-emerald-600" : booking.status === "PENDING" ? "bg-amber-50 text-amber-600" : booking.status === "ACTIVE" ? "bg-blue-50 text-blue-600" : "bg-foreground/5 text-muted"}`}>
                      {booking.status}
                    </span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${booking.paymentStatus === "PAID" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                      {booking.paymentStatus}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
