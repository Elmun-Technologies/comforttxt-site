import { describe, it, expect } from 'vitest';
import { validateQuantity, calculateSubtotal, calculateCartTotal } from '../src/lib/calc';
import { normalizeUzPhone, isValidUzPhone } from '../src/lib/utils/phone';

describe('Phase 2.7 Functional & E2E Verification Tests', () => {
  describe('Quantity Validation Rules', () => {
    it('should validate meter quantities in 0.5 step increments', () => {
      expect(validateQuantity(0.3, 'meter', 0.5)).toBe(0.5);
      expect(validateQuantity(1.2, 'meter', 0.5)).toBe(1.0);
      expect(validateQuantity(1.4, 'meter', 0.5)).toBe(1.5);
      expect(validateQuantity(12.5, 'meter', 0.5)).toBe(12.5);
    });

    it('should validate integer quantities for pcs and sheet units', () => {
      expect(validateQuantity(2.7, 'pcs', 1)).toBe(3);
      expect(validateQuantity(0.1, 'sheet', 1)).toBe(1);
      expect(validateQuantity(10, 'sheet', 1)).toBe(10);
    });
  });

  describe('Money & Subtotal Calculations', () => {
    it('should compute exact line subtotal for 12.5m fabric at 85,000 UZS/m', () => {
      const price = 85000;
      const quantity = 12.5;
      const subtotal = calculateSubtotal(price, quantity);
      expect(subtotal).toBe(1062500);
    });

    it('should compute cart total for mixed items', () => {
      const cartItems = [
        { price: 68000, wholesalePrice: 52000, quantity: 10 }, // 680,000
        { price: 110000, wholesalePrice: 88000, quantity: 2 },  // 220,000
      ];

      const retailTotal = calculateCartTotal(cartItems, false);
      const b2bTotal = calculateCartTotal(cartItems, true);

      expect(retailTotal).toBe(900000);
      expect(b2bTotal).toBe(696000);
    });
  });

  describe('Phone Input Normalization', () => {
    it('should normalize user input into +998 canonical format', () => {
      expect(normalizeUzPhone('555880000')).toBe('+998555880000');
      expect(normalizeUzPhone('90 123 45 67')).toBe('+998901234567');
      expect(isValidUzPhone('+998901234567')).toBe(true);
    });
  });
});
