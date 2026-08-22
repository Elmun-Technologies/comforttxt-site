import { describe, it, expect } from 'vitest';

describe('Money Model & UZS Integer Calculation Integrity', () => {
  it('should calculate UZS item line subtotal using exact integer rounding without floating point currency errors', () => {
    const pricePerMeterUZS = 85000; // Integer UZS
    const requestedMeters = 12.5; // Decimal fabric stock

    const lineSubtotal = Math.round(pricePerMeterUZS * requestedMeters);
    expect(lineSubtotal).toBe(1062500);
    expect(Number.isInteger(lineSubtotal)).toBe(true);
  });

  it('should sum multiple order item line subtotals accurately', () => {
    const items = [
      { unitPrice: 68000, quantity: 12.5 },  // 850000
      { unitPrice: 110000, quantity: 3.0 },  // 330000
      { unitPrice: 54000, quantity: 10.0 },  // 540000
    ];

    const subtotal = items.reduce((sum, item) => sum + Math.round(item.unitPrice * item.quantity), 0);
    expect(subtotal).toBe(1720000);
  });
});
