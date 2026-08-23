/**
 * Base shimmer block for loading states. `loading.tsx` route files compose
 * these into page-shaped skeletons so layout stays stable while data loads
 * (matters most under `NEXT_PUBLIC_MOCK_LATENCY_MS`, and on real ShopFlow
 * network latency in production).
 */
export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`bg-border/60 rounded-md animate-pulse ${className}`} />;
}

/** Mirrors `ProductCard`'s layout: image, tag row, title, price row, CTA row. */
export function ProductCardSkeleton() {
  return (
    <div className="bg-surface rounded-2xl border border-border overflow-hidden">
      <Skeleton className="aspect-square rounded-none bg-secondary" />
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-2.5 w-16" />
          <Skeleton className="h-2.5 w-10" />
        </div>
        <Skeleton className="h-3.5 w-4/5" />
        <div className="flex items-center gap-1.5">
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="w-4 h-4 rounded-full" />
        </div>
        <div className="pt-2.5 border-t border-border/80 space-y-2.5">
          <Skeleton className="h-4 w-2/3" />
          <div className="grid grid-cols-2 gap-2">
            <Skeleton className="h-9 rounded-xl" />
            <Skeleton className="h-9 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Mirrors `ProductDetailClient`'s two-column layout above the fold. */
export function ProductDetailSkeleton() {
  return (
    <div className="bg-surface rounded-3xl border border-border p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div className="lg:col-span-7 space-y-4">
        <Skeleton className="aspect-square rounded-2xl bg-secondary" />
        <div className="flex gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="w-20 h-20 rounded-xl bg-secondary" />
          ))}
        </div>
      </div>
      <div className="lg:col-span-5 space-y-4">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-20 w-full rounded-2xl" />
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="w-9 h-9 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    </div>
  );
}
