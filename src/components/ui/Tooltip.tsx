'use client';

import { useId, useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
  title: string;
  body: string;
  /** Extra classes on the trigger button, e.g. to tweak size/margin in context. */
  className?: string;
}

/**
 * Small "?" glyph that reveals a term explanation on hover, focus, or tap.
 * UX pattern #17 — most buyers do not know what ST/EL/HR, Martindale or g/m²
 * mean; this is the one place that explanation lives, next to the term itself.
 *
 * Keyboard/tap driven via native `:focus-within` + `onClick` toggle rather
 * than a hover-only popover, so it works on mobile and with a keyboard.
 */
export function Tooltip({ title, body, className = '' }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <span className="relative inline-flex group/tooltip">
      <button
        type="button"
        aria-describedby={id}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        onBlur={() => setOpen(false)}
        className={`inline-flex items-center justify-center text-muted hover:text-accent transition ${className}`}
      >
        <HelpCircle className="w-3.5 h-3.5" />
      </button>

      <span
        role="tooltip"
        id={id}
        className={`absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 rounded-xl border border-border bg-surface p-3 text-left shadow-xl transition-opacity duration-150 pointer-events-none ${
          open ? 'opacity-100' : 'opacity-0 group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100'
        }`}
      >
        <span className="block text-[11px] font-black text-heading mb-1">{title}</span>
        <span className="block text-[11px] leading-relaxed text-body font-medium">{body}</span>
      </span>
    </span>
  );
}
