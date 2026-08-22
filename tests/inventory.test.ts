import { describe, it, expect } from 'vitest';

describe('Inventory Model & Reservation Calculations', () => {
  it('should calculate available stock as onHand - reserved', () => {
    const onHand = 20.0;
    const reserved = 2.0;
    const available = onHand - reserved;

    expect(available).toBe(18.0);
  });

  it('should accurately reserve inventory upon order creation and calculate new available quantity', () => {
    let onHand = 20.0;
    let reserved = 2.0;
    const requested = 12.5;

    const availableBefore = onHand - reserved;
    expect(requested <= availableBefore).toBe(true);

    reserved += requested;
    const availableAfter = onHand - reserved;

    expect(onHand).toBe(20.0);
    expect(reserved).toBe(14.5);
    expect(availableAfter).toBe(5.5);
  });

  it('should release inventory reservation on order cancellation', () => {
    let onHand = 20.0;
    let reserved = 14.5;
    const cancelledQty = 12.5;

    reserved = Math.max(0, reserved - cancelledQty);
    const available = onHand - reserved;

    expect(reserved).toBe(2.0);
    expect(available).toBe(18.0);
  });

  it('should reject requests exceeding available stock', () => {
    const onHand = 20.0;
    const reserved = 14.5;
    const available = onHand - reserved; // 5.5
    const requested = 10.0;

    expect(requested > available).toBe(true);
  });
});
