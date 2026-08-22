'use client';

import { AlertTriangle, RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Customer-facing failure state for storefront data loading problems.
 * Shows the standard message and offers a retry — never falls back to
 * stale fake prices or stock silently.
 */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const t = useTranslations('errors');

  return (
    <main className="flex-1 min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="brand-wash relative overflow-hidden bg-surface rounded-3xl border border-border p-10 text-center shadow-xs max-w-md w-full space-y-4">
        <div
          aria-hidden="true"
          className="pattern-rings pattern-sm pattern-fade-y absolute inset-0 pointer-events-none opacity-60"
        />
        <div className="relative w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="relative text-xl font-black text-heading">{t('title')}</h1>
        <p className="relative text-xs text-muted">{t('subtitle')}</p>
        <button
          onClick={reset}
          className="relative inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-surface font-black text-xs rounded-xl shadow-md transition"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t('retry')}</span>
        </button>
      </div>
    </main>
  );
}
