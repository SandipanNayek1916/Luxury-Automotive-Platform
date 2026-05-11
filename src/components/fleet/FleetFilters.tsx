"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState, useEffect } from "react";
import { clsx } from "clsx";

const categories = [
  "All",
  "Hypercars",
  "Supercars",
  "Luxury Sedans",
  "SUVs",
  "Electric Performance",
  "JDM Icons",
  "Classics",
  "Track Monsters",
  "Convertible",
  "Limited Editions"
];

const brands = [
  "Lamborghini",
  "BMW",
  "Tesla",
  "Cadillac",
  "Porsche",
  "Mercedes",
  "Lexus",
  "Ferrari",
  "McLaren",
  "Rolls-Royce",
  "Bentley",
  "Aston Martin",
  "Bugatti",
  "Maserati",
];

interface FleetFiltersProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  activeBrand: string;
  setActiveBrand: (brand: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function FleetFilters({ 
  activeCategory, 
  setActiveCategory, 
  activeBrand,
  setActiveBrand,
  searchQuery, 
  setSearchQuery 
}: FleetFiltersProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col gap-10 mb-16">
      {/* Active Brand Indicator */}
      <AnimatePresence>
        {activeBrand && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex items-center gap-4"
          >
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-muted/60">Filtering by Brand</span>
            <button
              onClick={() => setActiveBrand("")}
              aria-label={`Clear brand filter: ${activeBrand}`}
              className="inline-flex items-center gap-3 px-5 py-2 bg-foreground text-white rounded-full text-[11px] font-bold tracking-tight hover:bg-foreground/80 transition-all shadow-soft group"
            >
              {activeBrand}
              <X className="w-3.5 h-3.5 transition-transform group-hover:rotate-90" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Brand Selector Row */}
      <div className="overflow-x-auto scrollbar-hide -mx-2 px-2">
        <div className="flex items-center gap-3 pb-2">
          <button
            onClick={() => setActiveBrand("")}
            aria-label="Filter by all brands"
            className={clsx(
              "relative px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap",
              !activeBrand 
                ? "text-white" 
                : "text-muted/60 hover:text-foreground bg-foreground/[0.02] hover:bg-foreground/[0.05]"
            )}
          >
            {!activeBrand && (
              <motion.div
                layoutId="activeBrand"
                className="absolute inset-0 bg-foreground rounded-full shadow-soft"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">All Manufacturers</span>
          </button>
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setActiveBrand(activeBrand === brand ? "" : brand)}
              aria-label={`Filter by ${brand}`}
              className={clsx(
                "relative px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap",
                activeBrand === brand
                  ? "text-white" 
                  : "text-muted/60 hover:text-foreground bg-foreground/[0.02] hover:bg-foreground/[0.05]"
              )}
            >
              {activeBrand === brand && (
                <motion.div
                  layoutId="activeBrand"
                  className="absolute inset-0 bg-foreground rounded-full shadow-soft"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{brand}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Categories Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 border-t border-border/50 pt-10">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              aria-label={`Filter by category: ${category}`}
              className={clsx(
                "relative px-7 py-3 rounded-full text-[13px] font-bold tracking-tight transition-all duration-500",
                activeCategory === category 
                  ? "text-white shadow-elevated" 
                  : "text-muted hover:text-foreground bg-foreground/[0.02] hover:bg-foreground/[0.05]"
              )}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-foreground rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-96 group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-muted/40 group-focus-within:text-foreground transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search our elite collection..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-foreground/[0.02] border border-transparent rounded-2xl text-[14px] font-medium placeholder:text-muted/40 focus:bg-white focus:border-border focus:shadow-elevated transition-all outline-none"
          />
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity">
            <span className="text-[10px] font-black text-muted/40 uppercase tracking-widest border border-border px-2 py-1 rounded-md">Esc</span>
          </div>
        </div>
      </div>
    </div>
  );
}
