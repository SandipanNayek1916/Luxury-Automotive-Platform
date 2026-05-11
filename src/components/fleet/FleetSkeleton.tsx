"use client";

export function FleetSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div 
          key={i} 
          className="bg-white rounded-[32px] overflow-hidden border border-black/[0.03] animate-pulse"
        >
          <div className="aspect-[16/10] bg-black/[0.03]" />
          <div className="p-8">
            <div className="h-2 w-20 bg-black/[0.03] rounded mb-4" />
            <div className="flex justify-between items-end mb-8">
              <div className="h-8 w-40 bg-black/[0.03] rounded" />
              <div className="h-10 w-20 bg-black/[0.03] rounded" />
            </div>
            <div className="grid grid-cols-3 gap-4 border-t border-black/[0.06] pt-6">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="h-12 bg-black/[0.03] rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
