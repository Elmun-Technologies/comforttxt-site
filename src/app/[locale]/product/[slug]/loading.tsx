import { ProductDetailSkeleton } from '@/components/ui/Skeleton';

/**
 * PDP-shaped loading state — the generic grid skeleton in the parent
 * `[locale]/loading.tsx` doesn't match this route's two-column layout.
 */
export default function Loading() {
  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
      <ProductDetailSkeleton />
    </main>
  );
}
