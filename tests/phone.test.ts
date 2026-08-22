import { describe, it, expect } from 'vitest';
import { normalizeUzPhone, isValidUzPhone } from '../src/lib/utils/phone';

describe('Phone Normalization & Validation', () => {
  it('should normalize various Uzbekistan phone formats into canonical +998XXXXXXXXX format', () => {
    expect(normalizeUzPhone('901234567')).toBe('+998901234567');
    expect(normalizeUzPhone('+998 (90) 123-45-67')).toBe('+998901234567');
    expect(normalizeUzPhone('998901234567')).toBe('+998901234567');
    expect(normalizeUzPhone('8901234567')).toBe('+998901234567');
  });

  it('should validate valid Uzbekistan phone numbers correctly', () => {
    expect(isValidUzPhone('+998901234567')).toBe(true);
    expect(isValidUzPhone('90 123 45 67')).toBe(true);
    expect(isValidUzPhone('12345')).toBe(false);
    expect(isValidUzPhone('invalid')).toBe(false);
  });
});
