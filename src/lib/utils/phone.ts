/**
 * Normalizes Uzbekistan phone numbers into canonical format: +998XXXXXXXXX
 * Handles formats like:
 * 90 123 45 67 -> +998901234567
 * 998901234567 -> +998901234567
 * +998 (90) 123-45-67 -> +998901234567
 * 8901234567 -> +998901234567
 */
export function normalizeUzPhone(phone: string): string {
  if (!phone) return '';
  const digitsOnly = phone.replace(/\D/g, '');

  if (digitsOnly.length === 9) {
    return `+998${digitsOnly}`;
  }

  if (digitsOnly.length === 12 && digitsOnly.startsWith('998')) {
    return `+${digitsOnly}`;
  }

  if (digitsOnly.length === 10 && digitsOnly.startsWith('8')) {
    return `+998${digitsOnly.slice(1)}`;
  }

  // Fallback for non-standard or international numbers
  return phone.trim().startsWith('+') ? phone.trim() : `+${digitsOnly}`;
}

export function isValidUzPhone(phone: string): boolean {
  const normalized = normalizeUzPhone(phone);
  return /^\+998\d{9}$/.test(normalized);
}
