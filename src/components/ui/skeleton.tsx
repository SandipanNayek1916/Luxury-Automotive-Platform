"use client";

export function CarCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-soft border border-border animate-pulse">
      <div className="aspect-[4/3] bg-foreground/5" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-foreground/10 rounded-lg w-3/4" />
        <div className="h-4 bg-foreground/5 rounded-lg w-1/2" />
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 bg-foreground/10 rounded-lg w-20" />
          <div className="h-8 bg-foreground/10 rounded-full w-24" />
        </div>
      </div>
    </div>
  );
}
