"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success("Account created! Please sign in.");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
      <div className="bg-white rounded-[2.5rem] shadow-elevated p-8 sm:p-12">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold">Get Started</h1>
          <p className="mt-2 text-muted text-sm">Create your account to start renting</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:border-foreground/20 transition-colors text-sm" placeholder="John Doe" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:border-foreground/20 transition-colors text-sm" placeholder="you@example.com" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Password</label>
            <div className="relative">
              <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:border-foreground/20 transition-colors text-sm pr-10" placeholder="Min 6 characters" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-foreground text-white py-3.5 rounded-xl font-medium hover:bg-foreground/90 transition-all disabled:opacity-50">
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-muted">
          Already have an account? <Link href="/login" className="text-foreground font-medium hover:underline">Sign in</Link>
        </div>
      </div>
    </motion.div>
  );
}
