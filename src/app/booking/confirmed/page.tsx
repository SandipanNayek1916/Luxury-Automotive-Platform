"use client";

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, Calendar, Car, ArrowRight } from 'lucide-react';

function ConfirmedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentIntent = searchParams.get('payment_intent');
  const redirectStatus = searchParams.get('redirect_status');

  useEffect(() => {
    // You could verify the status here with your backend if needed
  }, [paymentIntent, redirectStatus]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-[#111] border border-white/5 rounded-[2.5rem] p-10 text-center shadow-2xl"
      >
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-tight mb-4">Confirmed</h1>
        <p className="text-white/40 mb-10 leading-relaxed">
          Your reservation has been secured. Our concierge team will reach out shortly to finalize the delivery details.
        </p>

        <div className="space-y-4 mb-10 text-left">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <Car className="w-5 h-5 text-white/40" />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold">Status</p>
              <p className="text-sm font-semibold">Payment Authorized</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <Calendar className="w-5 h-5 text-white/40" />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold">Next Step</p>
              <p className="text-sm font-semibold">Concierge Contact (30 mins)</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => router.push('/dashboard')}
          className="w-full bg-white text-black py-5 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-95 group"
        >
          Go to Dashboard
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
}

export default function BookingConfirmedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
      <ConfirmedContent />
    </Suspense>
  );
}
