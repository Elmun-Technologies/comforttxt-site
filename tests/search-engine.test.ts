import { describe, it, expect } from 'vitest';
import {
  latinToCyrillic,
  cyrillicToLatin,
  normalizeSku,
  normalizeText,
  scoreProduct,
  searchStorefront,
  highlightMatch,
} from '../src/lib/search/searchEngine';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_COLLECTIONS } from '../src/services/storefront/MockStorefrontService';

describe('Search Engine Algorithm Tests', () => {
  describe('Transliteration & Normalization', () => {
    it('should transliterate Latin to Cyrillic correctly', () => {
      expect(latinToCyrillic('porolon')).toBe('поролон');
      expect(latinToCyrillic('kley')).toBe('клей');
      expect(latinToCyrillic('velyur')).toBe('велюр');
      expect(latinToCyrillic('shenill')).toBe('шенилл');
      expect(latinToCyrillic('chiroyli')).toBe('чиройли');
    });

    it('should transliterate Cyrillic to Latin correctly', () => {
      expect(cyrillicToLatin('поролон')).toBe('porolon');
      expect(cyrillicToLatin('велюр')).toBe('velyur');
      expect(cyrillicToLatin('клей')).toBe('kley');
      expect(cyrillicToLatin('шенилл')).toBe('shenill');
    });

    it('should normalize SKU codes by stripping spaces and hyphens', () => {
      expect(normalizeSku('ST-2536-50')).toBe('st253650');
      expect(normalizeSku('F 30 D')).toBe('f30d');
      expect(normalizeSku('80-16')).toBe('8016');
      expect(normalizeSku('LUNA - 01')).toBe('luna01');
    });

    it('should normalize general text', () => {
      expect(normalizeText("O'rindiq va Ko'rpacha!")).toBe('orindiq va korpacha');
      expect(normalizeText('  Velyur   Mato  ')).toBe('velyur mato');
    });
  });

  describe('Product Scoring & Ranking', () => {
    it('should match exact SKU F30D with highest score', () => {
      const f30Product = MOCK_PRODUCTS.find((p) => p.id === 'prod-pnevmatik-f30d')!;
      const result = scoreProduct(f30Product, 'F30D', 'uz');
      expect(result).not.toBeNull();
      expect(result?.score).toBeGreaterThan(2000);
      expect(result?.matchedVariant?.sku).toBe('F30D');
    });

    it('should match normalized SKU with spaces "f 30 d" or "f-30"', () => {
      const f30Product = MOCK_PRODUCTS.find((p) => p.id === 'prod-pnevmatik-f30d')!;
      const resultSpace = scoreProduct(f30Product, 'f 30 d', 'uz');
      const resultHyphen = scoreProduct(f30Product, 'f-30', 'uz');
      expect(resultSpace).not.toBeNull();
      expect(resultHyphen).not.toBeNull();
    });

    it('should match foam SKU "st 2536" and "ST2536-50"', () => {
      const stProduct = MOCK_PRODUCTS.find((p) => p.id === 'prod-paralon-st2536')!;
      const result = scoreProduct(stProduct, 'st 2536', 'uz');
      expect(result).not.toBeNull();
      expect(result?.product.id).toBe('prod-paralon-st2536');
    });

    it('should match Russian search "поролон" and Latin search "paralon" and "porolon"', () => {
      const searchRu = searchStorefront(MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_COLLECTIONS, 'поролон', 'ru');
      const searchUz = searchStorefront(MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_COLLECTIONS, 'paralon', 'uz');
      const searchAlt = searchStorefront(MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_COLLECTIONS, 'porolon', 'uz');

      expect(searchRu.products.length).toBeGreaterThan(0);
      expect(searchUz.products.length).toBeGreaterThan(0);
      expect(searchAlt.products.length).toBeGreaterThan(0);
    });

    it('should find products by variant color name e.g. "sutli krem" or "oq qor"', () => {
      const searchColor = searchStorefront(MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_COLLECTIONS, 'sutli krem', 'uz');
      expect(searchColor.products.length).toBeGreaterThan(0);
      expect(searchColor.products[0].id).toBe('prod-velyur-01');
    });

    it('should rank exact SKU match above generic text match', () => {
      const searchResult = searchStorefront(MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_COLLECTIONS, 'F30D', 'uz');
      expect(searchResult.products.length).toBeGreaterThan(0);
      expect(searchResult.products[0].id).toBe('prod-pnevmatik-f30d');
    });

    it('should match multi-word queries e.g. "paralon 50"', () => {
      const searchResult = searchStorefront(MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_COLLECTIONS, 'paralon 50', 'uz');
      expect(searchResult.products.length).toBeGreaterThan(0);
      expect(searchResult.products[0].id).toBe('prod-paralon-st2536');
    });

    it('should match synonyms e.g. "kley" to yelim product', () => {
      const searchResult = searchStorefront(MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_COLLECTIONS, 'kley', 'uz');
      expect(searchResult.products.length).toBeGreaterThan(0);
      expect(searchResult.products[0].id).toBe('prod-yelim-sprey');
    });
  });

  describe('Highlighting Function', () => {
    it('should split text into matching and non-matching parts', () => {
      const highlighted = highlightMatch('Velyur mato (baxmal faktura)', 'velyur');
      expect(highlighted.length).toBeGreaterThan(0);
      expect(highlighted.some((h) => h.match && h.text.toLowerCase() === 'velyur')).toBe(true);
    });
  });
});
