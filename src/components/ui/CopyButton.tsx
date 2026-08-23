'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useToastStore } from '@/store/useToastStore';

interface CopyButtonProps {
  value: string;
  locale: string;
  className?: string;
}

/**
 * Copies `value` (a SKU) to the clipboard — UX pattern #21. A furniture
 * workshop manager forwards the exact SKU to a colleague or supplier over
 * chat constantly; retyping it from a screenshot is a real point of friction.
 */
export function CopyButton({ value, locale, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const addToast = useToastStore((s) => s.addToast);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      addToast(locale === 'ru' ? 'SKU скопирован' : 'SKU nusxalandi', 'success');
      setTimeout(() => setCopied(false), 1500);
    } catch {
      addToast(locale === 'ru' ? 'Не удалось скопировать' : 'Nusxalab bo‘lmadi', 'error');
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={locale === 'ru' ? 'Скопировать SKU' : 'SKU ni nusxalash'}
      className={`inline-flex items-center justify-center text-muted hover:text-accent transition ${className}`}
    >
      {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
    </button>
  );
}
