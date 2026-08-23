import { ProductCardSkeleton, Skeleton } from '@/components/ui/Skeleton';

/**
 * Route-level loading skeleton — shows while storefront data is being fetched.
 * Keeps the layout stable during simulated ShopFlow latency.
 */
export default function Loading() {
  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full space-y-8">
      {/* Page title skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-7 w-56 rounded-lg" />
        <Skeleton className="h-3.5 w-32" />
      </div>

      {/* Toolbar skeleton */}
      <Skeleton className="h-12 rounded-2xl bg-surface border border-border" />

      {/* Product grid skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </main>
  );
}
