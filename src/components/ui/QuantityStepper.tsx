'use client';

import { useEffect, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { validateQuantity } from '@/lib/calc';

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  step: number;
  unitType: string;
  min?: number;
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * Reusable +/- quantity control (UX pattern #25 — a visible quantity control
 * on the catalogue card, not just on the product page). Fabric is bought by
 * the roll, not by the piece: a workshop buyer needs 45 m, not "one" — a
 * plain "add to cart" button with no quantity input undersells that.
 */
export function QuantityStepper({ value, onChange, step, unitType, min, size = 'md', className = '' }: QuantityStepperProps) {
  const effectiveMin = min ?? step;
  const [inputValue, setInputValue] = useState(value.toString());

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const commit = (raw: number) => {
    const next = validateQuantity(raw, unitType, step);
    onChange(Math.max(next, effectiveMin));
    setInputValue(Math.max(next, effectiveMin).toString());
  };

  const sizeClasses = size === 'sm' ? 'text-xs' : 'text-sm';
  const buttonPad = size === 'sm' ? 'p-1.5' : 'p-2.5';
  const inputWidth = size === 'sm' ? 'w-12' : 'w-16';

  return (
    <div
      className={`inline-flex items-center bg-surface border border-border rounded-xl shadow-xs ${className}`}
      onClick={(e) => e.preventDefault()}
    >
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          commit(value - step);
        }}
        className={`${buttonPad} text-body hover:bg-secondary rounded-l-xl transition`}
      >
        <Minus className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      </button>
      <input
        type="number"
        step={step}
        min={effectiveMin}
        value={inputValue}
        autoComplete="off"
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={() => commit(parseFloat(inputValue))}
        className={`${inputWidth} text-center font-black text-heading ${sizeClasses} focus:outline-none bg-transparent`}
      />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          commit(value + step);
        }}
        className={`${buttonPad} text-body hover:bg-secondary rounded-r-xl transition`}
      >
        <Plus className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      </button>
    </div>
  );
}
