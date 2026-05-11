"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, Loader2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function FavoritesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  if (!session) { router.push("/login"); return null; }

  const { data: favorites, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => { const res = await fetch("/api/favorites"); return res.json(); },
  });

  return (
    <main className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-8">My Favorites</h1>
        {isLoading ? (
          <div className="flex items-center justify-center py-24"><Loader2 className="w-8 h-8 animate-spin text-muted" /></div>
        ) : favorites?.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[2.5rem] border border-border">
            <Heart className="w-16 h-16 text-muted/20 mx-auto mb-4" />
            <p className="text-muted text-lg">No favorites yet</p>
            <Link href="/cars" className="text-foreground font-medium mt-2 inline-block hover:underline">Browse Fleet</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {favorites?.map((fav: any, i: number) => (
              <motion.div key={fav.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link href={`/cars/${fav.car.id}`} className="group bg-white rounded-3xl overflow-hidden shadow-soft border border-border block hover:shadow-elevated transition-all">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={fav.car.mainImage} alt={fav.car.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold">{fav.car.name}</h3>
                    <p className="text-sm text-muted">{fav.car.brand}</p>
                    <p className="mt-2 font-bold">{formatPrice(fav.car.pricePerDay)}<span className="text-xs text-muted font-normal">/day</span></p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
