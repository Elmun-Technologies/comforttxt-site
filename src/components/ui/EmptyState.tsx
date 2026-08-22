import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  /** Call-to-action slot, usually a Link styled as a button. */
  action?: React.ReactNode;
  className?: string;
}

/**
 * Shared branded empty state.
 *
 * Used by cart, favorites, compare, search and the blog placeholder so every
 * "nothing here yet" screen carries the Comfort Textile ring motif and the
 * same icon medallion, instead of a bare icon on a flat card.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`relative overflow-hidden bg-surface rounded-3xl border border-border shadow-xs px-6 py-12 sm:px-10 sm:py-14 text-center max-w-xl mx-auto ${className}`}
    >
      {/* Brand ring motif, fading out downward so the copy stays legible */}
      <div
        aria-hidden="true"
        className="pattern-rings pattern-sm pattern-fade-y absolute inset-0 pointer-events-none opacity-60"
      />

      <div className="relative space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-light text-accent border border-accent/20 shadow-xs">
          <Icon className="h-8 w-8 stroke-[1.5]" />
        </div>

        <div className="space-y-1.5">
          <h3 className="text-lg font-black text-heading tracking-tight">{title}</h3>
          {description && (
            <p className="mx-auto max-w-sm text-xs text-muted leading-relaxed">{description}</p>
          )}
        </div>

        {action && <div className="pt-1">{action}</div>}
      </div>
    </div>
  );
}
