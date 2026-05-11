"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Shield, User, Loader2 } from "lucide-react";

export default function AdminUsersPage() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users-admin"],
    queryFn: async () => {
      // In production, add a dedicated users API
      const res = await fetch("/api/admin");
      const data = await res.json();
      return data.recentBookings?.map((b: any) => b.user) || [];
    },
  });

  return (
    <main className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="font-display text-3xl font-bold mb-8">Manage Users</h1>
        <div className="bg-white rounded-[2rem] border border-border shadow-soft p-12 text-center">
          <User className="w-16 h-16 text-muted/20 mx-auto mb-4" />
          <p className="text-muted">User management API endpoint ready.</p>
          <p className="text-sm text-muted mt-2">Add /api/users route to fetch all users with Prisma.</p>
        </div>
      </div>
    </main>
  );
}
