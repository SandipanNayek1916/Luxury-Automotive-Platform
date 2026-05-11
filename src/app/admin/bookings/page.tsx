"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Check, X, Loader2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

export default function AdminBookingsPage() {
  const { data: bookings, isLoading, refetch } = useQuery({
    queryKey: ["bookings-admin"],
    queryFn: async () => { const res = await fetch("/api/bookings"); return res.json(); },
  });

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/bookings/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    if (res.ok) { toast.success("Updated"); refetch(); }
    else toast.error("Failed");
  };

  return (
    <main className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="font-display text-3xl font-bold mb-8">Manage Bookings</h1>
        {isLoading ? <div className="flex justify-center py-24"><Loader2 className="w-8 h-8 animate-spin" /></div> : (
          <div className="bg-white rounded-[2rem] border border-border shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr className="text-left text-xs text-muted uppercase tracking-wider">
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Car</th>
                    <th className="px-6 py-4">Dates</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings?.map((booking: any) => (
                    <tr key={booking.id} className="border-b border-border last:border-0 hover:bg-background/50">
                      <td className="px-6 py-4 text-sm">{booking.user.name || booking.user.email}</td>
                      <td className="px-6 py-4 text-sm font-medium">{booking.car.name}</td>
                      <td className="px-6 py-4 text-sm text-muted">{new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-sm font-semibold">{formatPrice(booking.totalPrice)}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${booking.status === "CONFIRMED" ? "bg-emerald-50 text-emerald-600" : booking.status === "PENDING" ? "bg-amber-50 text-amber-600" : "bg-foreground/5 text-muted"}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => updateStatus(booking.id, "CONFIRMED")} className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100">
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => updateStatus(booking.id, "CANCELLED")} className="w-8 h-8 rounded-lg bg-danger/10 text-danger flex items-center justify-center hover:bg-danger/20">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
