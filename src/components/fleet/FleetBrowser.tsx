"use client";

import { useState, useMemo, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { FleetCard } from "./FleetCard";
import { FleetFilters } from "./FleetFilters";
import { FeaturedSpotlight } from "./FeaturedSpotlight";
import { QuickViewModal } from "./QuickViewModal";
import { FleetSkeleton } from "./FleetSkeleton";
import { Car } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Mousewheel } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

interface FleetBrowserProps {
  initialBrand?: string;
}

export function FleetBrowser({ initialBrand = "" }: FleetBrowserProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBrand, setActiveBrand] = useState(initialBrand);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync with initialBrand prop changes (e.g. URL navigation)
  useEffect(() => {
    setActiveBrand(initialBrand);
  }, [initialBrand]);

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["cars", activeCategory, activeBrand, searchQuery],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const params = new URLSearchParams();
      if (activeCategory !== "All") params.append("category", activeCategory);
      if (activeBrand) params.append("brand", activeBrand);
      if (searchQuery) params.append("search", searchQuery);
      const res = await fetch(`/api/cars?${params.toString()}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.details || errorData.error || "Failed to fetch");
      }
      return res.json();
    }
  });

  const cars = data?.cars || [];
  
  // Find all featured cars for the rotating spotlight
  const spotlightCars = useMemo(() => {
    const featured = cars.filter((c: Car) => c.featured);
    return featured.length > 0 ? featured : cars.slice(0, 3);
  }, [cars]);

  const handleQuickView = (car: Car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full">
      {/* Editorial Intro */}
      <div className="max-w-4xl mb-16">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted mb-4 block"
        >
          Exclusive Fleet
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl lg:text-7xl font-bold tracking-tighter mb-8"
        >
          {activeBrand ? (
            <>
              {activeBrand} <br />
              <span className="text-muted">Collection.</span>
            </>
          ) : (
            <>
              The Art of <br />
              <span className="text-muted">Elite Mobility.</span>
            </>
          )}
        </motion.h2>
      </div>

      <FleetFilters 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        activeBrand={activeBrand}
        setActiveBrand={setActiveBrand}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Featured Spotlight */}
      <FeaturedSpotlight cars={spotlightCars} loading={isLoading} />

      {/* Horizontal Cinematic Slider */}
      <div className="mb-24 -mx-4 sm:-mx-8 lg:-mx-12">
        <div className="px-4 sm:px-8 lg:px-12 mb-8 flex items-end justify-between">
          <div>
            <h3 className="text-3xl font-bold tracking-tight">
              {activeBrand ? `${activeBrand} Vehicles` : "New Arrivals"}
            </h3>
            <p className="text-muted">
              {activeBrand
                ? `Explore our ${activeBrand} fleet`
                : "Explore our latest additions to the elite collection"
              }
            </p>
          </div>
        </div>
        
        <Swiper
          slidesPerView="auto"
          spaceBetween={30}
          centeredSlides={false}
          grabCursor={true}
          freeMode={true}
          mousewheel={{ forceToAxis: true }}
          modules={[FreeMode, Pagination, Mousewheel]}
          className="fleet-swiper !px-4 sm:!px-8 lg:!px-12 !pb-12"
          breakpoints={{
            640: { slidesPerView: "auto", spaceBetween: 30 },
            1024: { slidesPerView: "auto", spaceBetween: 40 },
          }}
        >
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <SwiperSlide key={i} className="!w-[380px] lg:!w-[450px]">
                <div className="w-full aspect-[16/10] bg-black/[0.03] rounded-[32px] animate-pulse" />
              </SwiperSlide>
            ))
          ) : (
            cars.map((car: Car, i: number) => (
              <SwiperSlide key={car.id} className="!w-[380px] lg:!w-[450px]">
                <FleetCard car={car} index={i} onQuickView={handleQuickView} />
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>

      {/* Main Grid */}
      <div className="mb-32">
        <div className="mb-12">
          <h3 className="text-3xl font-bold tracking-tight">
            {activeBrand ? `All ${activeBrand}` : "Browse All"}
          </h3>
          <p className="text-muted">Find the perfect match for your next journey</p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 transition-opacity duration-300 ${isFetching && !isLoading ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              <div className="col-span-full">
                <FleetSkeleton />
              </div>
            ) : error ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-32 text-center"
              >
                <div className="text-6xl mb-6">⚠️</div>
                <h3 className="text-2xl font-bold mb-2">Failed to load fleet</h3>
                <p className="text-muted max-w-md mx-auto">{error instanceof Error ? error.message : "An error occurred while fetching the vehicles. Please try again later."}</p>
              </motion.div>
            ) : cars.length > 0 ? (
              cars.map((car: Car, i: number) => (
                <FleetCard key={car.id} car={car} index={i} onQuickView={handleQuickView} />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-32 text-center"
              >
                <div className="text-6xl mb-6">🏎️</div>
                <h3 className="text-2xl font-bold mb-2">No vehicles found</h3>
                <p className="text-muted">Try adjusting your filters or search query</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>


      <QuickViewModal 
        car={selectedCar} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <style jsx global>{`
        .fleet-swiper .swiper-slide {
          height: auto;
        }
      `}
      </style>
    </div>
  );
}
