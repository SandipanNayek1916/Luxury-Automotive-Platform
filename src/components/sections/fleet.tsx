"use client";

import { FleetBrowser } from "../fleet/FleetBrowser";

export function FleetSection() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-12 py-32 bg-[#F5F5F5]">
      <div className="max-w-[1400px] mx-auto">
        <FleetBrowser />
      </div>
    </section>
  );
}
