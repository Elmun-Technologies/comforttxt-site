/**
 * Centralized utility for validating and manipulating quantities
 * and performing money calculations.
 */

export function validateQuantity(value: number, unitType: string, minQtyStep: number = 1): number {
  if (isNaN(value) || value <= 0) return minQtyStep;

  if (unitType === 'meter') {
    // Round to nearest 0.5 step
    return Math.max(minQtyStep, Math.round(value * 2) / 2);
  }

  // Pieces, sheets, packs, kg - generally integers, but respect minQtyStep
  return Math.max(minQtyStep, Math.round(value / minQtyStep) * minQtyStep);
}

export function calculateSubtotal(price: number, quantity: number): number {
  // Use Math.round to prevent floating point issues with currency
  return Math.round(price * quantity);
}

export function calculateCartTotal(
  items: Array<{ price: number; wholesalePrice: number; quantity: number }>,
  isB2B: boolean = false
): number {
  return items.reduce((total, item) => {
    const effectivePrice = isB2B ? item.wholesalePrice : item.price;
    return total + calculateSubtotal(effectivePrice, item.quantity);
  }, 0);
}
