import type { LucideIcon } from 'lucide-react';

interface PageHeroProps {
  /** Small kicker above the title (already localised). */
  kicker?: string;
  /** Optional icon shown inside the kicker pill. */
  icon?: LucideIcon;
  /** Page title (already localised). */
  title: string;
  /** Supporting sentence under the title (already localised). */
  subtitle?: string;
  /** Right-hand slot — actions, counters, badges. */
  children?: React.ReactNode;
  /** `light` = cream surface with blue rings, `dark` = navy with cream rings. */
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * Shared branded page header.
 *
 * Gives every inner route the same Comfort Textile treatment the homepage
 * hero has: the guidebook ring motif fading in from the right, the corporate
 * kicker rule, and consistent title/subtitle typography. Previously each page
 * hand-rolled a bare `<h1>` with no brand presence at all.
 */
export function PageHero({
  kicker,
  icon: Icon,
  title,
  subtitle,
  children,
  tone = 'light',
  className = '',
}: PageHeroProps) {
  const isDark = tone === 'dark';

  return (
    <section
      className={`relative overflow-hidden rounded-3xl border ${
        isDark
          ? 'bg-charcoal-900 border-charcoal-800 text-surface shadow-xl'
          : 'brand-wash bg-surface border-border shadow-xs'
      } px-6 py-8 sm:px-10 sm:py-10 ${className}`}
    >
      {/* Brand ring motif, feathered in from the right */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none ${
          isDark ? 'pattern-rings-dark' : 'pattern-rings'
        } pattern-fade`}
      />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2 min-w-0">
          {kicker && (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] ${
                isDark
                  ? 'bg-brand-400/10 text-cream-400 border border-brand-400/40'
                  : 'bg-accent-light text-accent border border-accent/25'
              }`}
            >
              {Icon && <Icon className="h-3.5 w-3.5" />}
              <span>{kicker}</span>
            </span>
          )}

          <h1
            className={`text-2xl sm:text-3xl font-black tracking-tight ${
              isDark ? 'text-surface' : 'text-heading'
            }`}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className={`max-w-2xl text-xs sm:text-sm font-medium leading-relaxed ${
                isDark ? 'text-surface/70' : 'text-muted'
              }`}
            >
              {subtitle}
            </p>
          )}
        </div>

        {children && <div className="flex-shrink-0">{children}</div>}
      </div>
    </section>
  );
}
