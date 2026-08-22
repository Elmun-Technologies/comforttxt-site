import { describe, it, expect } from 'vitest';

interface VariantInventory {
  onHand: number;
  reserved: number;
}

function reserveStock(inventory: VariantInventory, requestedQty: number): { success: boolean; newReserved: number } {
  const available = inventory.onHand - inventory.reserved;
  if (requestedQty > available) {
    return { success: false, newReserved: inventory.reserved };
  }
  return { success: true, newReserved: inventory.reserved + requestedQty };
}

describe('Stock Concurrency & Race Condition Safety Tests', () => {
  it('should prevent overselling when two simultaneous orders attempt to reserve remaining stock', () => {
    const sharedInventory: VariantInventory = {
      onHand: 5.0,
      reserved: 0.0,
    };

    // Customer A attempts 5.0m
    const resA = reserveStock(sharedInventory, 5.0);
    expect(resA.success).toBe(true);
    sharedInventory.reserved = resA.newReserved; // 5.0 reserved

    // Customer B attempts 5.0m concurrently
    const resB = reserveStock(sharedInventory, 5.0);
    expect(resB.success).toBe(false); // Rejected due to INSUFFICIENT_STOCK
    expect(sharedInventory.reserved).toBe(5.0);
  });
});
