"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Plus, Pencil, Trash2, Loader2, ImageIcon, Camera } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

export default function AdminCarsPage() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["cars-admin"],
    queryFn: async () => { const res = await fetch("/api/cars"); return res.json(); },
  });

  const cars = data?.cars || data || [];

  const deleteCar = async (id: string) => {
    if (!confirm("Delete this car and all its media?")) return;
    const res = await fetch(`/api/cars/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Car deleted"); refetch(); }
    else toast.error("Failed to delete");
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 mb-2">Admin Panel</p>
            <h1 className="text-4xl font-bold tracking-tight">Fleet Manager</h1>
          </div>
          <button className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-white/90 transition-colors">
            <Plus className="w-4 h-4" /> Add Vehicle
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Vehicles", value: Array.isArray(cars) ? cars.length : 0 },
            { label: "Available", value: Array.isArray(cars) ? cars.filter((c: any) => c.available).length : 0 },
            { label: "Featured", value: Array.isArray(cars) ? cars.filter((c: any) => c.featured).length : 0 },
            { label: "With Media", value: Array.isArray(cars) ? cars.filter((c: any) => c.hasCloudinaryMedia).length : 0 },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-2">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-24"><Loader2 className="w-8 h-8 animate-spin text-white/30" /></div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-white/10">
                  <tr className="text-left text-[10px] text-white/30 uppercase tracking-wider">
                    <th className="px-6 py-4">Vehicle</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price/Day</th>
                    <th className="px-6 py-4">Media</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(Array.isArray(cars) ? cars : []).map((car: any) => (
                    <tr key={car.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-10 rounded-xl overflow-hidden relative flex-shrink-0 bg-black/50">
                            <Image src={car.mainImage} alt="" fill className="object-cover" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{car.name}</p>
                            <p className="text-xs text-white/30">{car.brand} • {car.year}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60">
                          {car.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">{formatPrice(car.pricePerDay)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {car.hasCloudinaryMedia ? (
                            <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                              <Camera className="w-3.5 h-3.5" /> Managed
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 text-xs text-amber-400">
                              <ImageIcon className="w-3.5 h-3.5" /> Legacy
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          car.available 
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                            : "bg-white/5 text-white/30"
                        }`}>
                          {car.available ? "Available" : "Unavailable"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/cars/${car.id}/media`}
                            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white/50 hover:text-white"
                            title="Manage Media"
                          >
                            <Camera className="w-3.5 h-3.5" />
                          </Link>
                          <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white/50 hover:text-white">
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => deleteCar(car.id)} className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center hover:bg-red-500/20 transition-colors text-red-400">
                            <Trash2 className="w-3.5 h-3.5" />
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
