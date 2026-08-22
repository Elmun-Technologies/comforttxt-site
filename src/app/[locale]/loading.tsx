/**
 * Route-level loading skeleton — shows while storefront data is being fetched.
 * Keeps the layout stable during simulated ShopFlow latency.
 */
export default function Loading() {
  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full space-y-8">
      {/* Page title skeleton */}
      <div className="space-y-2">
        <div className="h-7 w-56 bg-border/70 rounded-lg animate-pulse" />
        <div className="h-3.5 w-32 bg-border/50 rounded-md animate-pulse" />
      </div>

      {/* Toolbar skeleton */}
      <div className="h-12 bg-surface rounded-2xl border border-border animate-pulse" />

      {/* Product grid skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-surface rounded-2xl border border-border overflow-hidden animate-pulse">
            <div className="aspect-square bg-secondary" />
            <div className="p-4 space-y-3">
              <div className="h-3 w-2/3 bg-border/60 rounded-md" />
              <div className="h-3.5 w-4/5 bg-border/70 rounded-md" />
              <div className="h-4 w-1/2 bg-border/70 rounded-md" />
              <div className="h-9 w-full bg-secondary rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
