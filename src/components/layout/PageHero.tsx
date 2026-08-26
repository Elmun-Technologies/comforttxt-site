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
 * hero has: the guidebook ring motif fading in from the right, the editorial
 * kicker rule, corner ticks and consistent title/subtitle typography.
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
          ? 'bg-ink-950 border-ink-800 text-surface shadow-brand'
          : 'bg-surface border-border shadow-xs'
      } px-6 py-10 sm:px-10 sm:py-14 ${className}`}
    >
      {/* Brand ring motif, feathered in from the right */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none ${
          isDark ? 'pattern-rings-dark opacity-60' : 'pattern-rings'
        } pattern-fade`}
      />

      {/* Warm corner light on dark tone */}
      {isDark && (
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(199,127,58,0.18), transparent 65%)' }}
        />
      )}

      <div className="relative flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-4 min-w-0">
          {kicker && (
            <span
              className={`inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] ${
                isDark ? 'text-cream-200/70' : 'text-muted'
              }`}
            >
              <span className={`h-px w-10 ${isDark ? 'bg-copper-400' : 'bg-copper-500'}`} />
              {Icon && <Icon className="h-3.5 w-3.5 text-copper-500" />}
              <span>{kicker}</span>
            </span>
          )}

          <h1
            className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.06] text-balance ${
              isDark ? 'text-surface' : 'text-ink'
            }`}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className={`max-w-2xl text-sm font-medium leading-relaxed ${
                isDark ? 'text-cream-200/75' : 'text-muted'
              }`}
            >
              {subtitle}
            </p>
          )}
        </div>

        {children && <div className="flex-shrink-0">{children}</div>}
      </div>

      {/* Cutting-guide ticks */}
      <span aria-hidden="true" className={`corner-tick corner-tick-tr ${isDark ? 'text-copper-400/70' : 'text-accent/40'}`} />
      <span aria-hidden="true" className={`corner-tick corner-tick-bl ${isDark ? 'text-copper-400/70' : 'text-accent/40'}`} />
    </section>
  );
}
