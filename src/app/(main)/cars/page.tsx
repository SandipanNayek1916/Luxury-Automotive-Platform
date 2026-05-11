"use client";

import { FleetBrowser } from "@/components/fleet/FleetBrowser";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CarsPageContent() {
  const searchParams = useSearchParams();
  const initialBrand = searchParams.get("brand") || "";

  return (
    <main className="min-h-screen pt-32 pb-12 px-4 sm:px-6 lg:px-12 bg-[#F5F5F5]">
      <div className="max-w-[1400px] mx-auto">
        <FleetBrowser initialBrand={initialBrand} />
      </div>
    </main>
  );
}

export default function CarsPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen pt-32 pb-12 px-4 sm:px-6 lg:px-12 bg-[#F5F5F5]">
        <div className="max-w-[1400px] mx-auto">
          <div className="animate-pulse">
            <div className="h-12 w-64 bg-black/[0.05] rounded-2xl mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[16/10] bg-black/[0.05] rounded-[32px]" />
              ))}
            </div>
          </div>
        </div>
      </main>
    }>
      <CarsPageContent />
    </Suspense>
  );
}
