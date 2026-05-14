"use client";

import { useState, useEffect } from "react";

export function usePerformance() {
  const [isLowEnd, setIsLowEnd] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkPerformance = () => {
      // Basic mobile check
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // Heuristic for low-end devices
      // 1. Hardware concurrency (CPU cores)
      const cores = navigator.hardwareConcurrency || 4;
      // 2. Device memory (GB) - Not available on all browsers
      const memory = (navigator as any).deviceMemory || 4;
      
      const lowEnd = mobile || (cores <= 4 && memory <= 4);
      setIsLowEnd(lowEnd);
    };

    checkPerformance();
    window.addEventListener("resize", checkPerformance);
    return () => window.removeEventListener("resize", checkPerformance);
  }, []);

  return { isLowEnd, isMobile };
}
