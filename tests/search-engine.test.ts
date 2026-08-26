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
      expect(normalizeSku('K-416')).toBe('k416');
      expect(normalizeSku('F 30')).toBe('f30');
      expect(normalizeSku('80-16')).toBe('8016');
      expect(normalizeSku('PK - R')).toBe('pkr');
    });

    it('should normalize general text', () => {
      expect(normalizeText("O'rindiq va Ko'rpacha!")).toBe('orindiq va korpacha');
      expect(normalizeText('  Velyur   Mato  ')).toBe('velyur mato');
    });
  });

  describe('Product Scoring & Ranking', () => {
    it('should match exact SKU F30 with highest score', () => {
      const f30Product = MOCK_PRODUCTS.find((p) => p.id === 'prod-pnevmatik-f30')!;
      const result = scoreProduct(f30Product, 'F30', 'uz');
      expect(result).not.toBeNull();
      expect(result?.score).toBeGreaterThan(2000);
      expect(result?.matchedVariant?.sku).toBe('F30');
    });

    it('should match normalized SKU with spaces "f 3 0" or "f-30"', () => {
      const f30Product = MOCK_PRODUCTS.find((p) => p.id === 'prod-pnevmatik-f30')!;
      const resultSpace = scoreProduct(f30Product, 'f 3 0', 'uz');
      const resultHyphen = scoreProduct(f30Product, 'f-30', 'uz');
      expect(resultSpace).not.toBeNull();
      expect(resultHyphen).not.toBeNull();
    });

    it('should match foam SKU "pk r" and "PK-R"', () => {
      const kornerProduct = MOCK_PRODUCTS.find((p) => p.id === 'prod-paralon-korner')!;
      const result = scoreProduct(kornerProduct, 'pk r', 'uz');
      expect(result).not.toBeNull();
      expect(result?.product.id).toBe('prod-paralon-korner');
    });

    it('should match Russian search "поролон" and Latin search "paralon" and "porolon"', () => {
      const searchRu = searchStorefront(MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_COLLECTIONS, 'поролон', 'ru');
      const searchUz = searchStorefront(MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_COLLECTIONS, 'paralon', 'uz');
      const searchAlt = searchStorefront(MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_COLLECTIONS, 'porolon', 'uz');

      expect(searchRu.products.length).toBeGreaterThan(0);
      expect(searchUz.products.length).toBeGreaterThan(0);
      expect(searchAlt.products.length).toBeGreaterThan(0);
    });

    it('should find products by variant color name e.g. "oq sutli"', () => {
      const searchColor = searchStorefront(MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_COLLECTIONS, 'oq sutli', 'uz');
      expect(searchColor.products.length).toBeGreaterThan(0);
      expect(searchColor.products[0].id).toBe('prod-bukle');
    });

    it('should rank exact SKU match above generic text match', () => {
      const searchResult = searchStorefront(MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_COLLECTIONS, 'F30', 'uz');
      expect(searchResult.products.length).toBeGreaterThan(0);
      expect(searchResult.products[0].id).toBe('prod-pnevmatik-f30');
    });

    it('should match multi-word queries e.g. "paralon korner"', () => {
      const searchResult = searchStorefront(MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_COLLECTIONS, 'paralon korner', 'uz');
      expect(searchResult.products.length).toBeGreaterThan(0);
      expect(searchResult.products[0].id).toBe('prod-paralon-korner');
    });

    it('should match synonyms e.g. "kley stik" to glue stick product', () => {
      const searchResult = searchStorefront(MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_COLLECTIONS, 'kley stik', 'uz');
      expect(searchResult.products.length).toBeGreaterThan(0);
      expect(searchResult.products[0].id).toBe('prod-kley-stik');
    });
  });

  describe('Highlighting Function', () => {
    it('should split text into matching and non-matching parts', () => {
      const highlighted = highlightMatch('Velyur mato (baxmal faktura)', 'velyur');
      expect(highlighted.length).toBeGreaterThan(0);
      expect(highlighted.some((h) => h.match && h.text.toLowerCase() === 'velyur')).toBe(true);
    });

    it('should highlight every occurrence of the same token, including adjacent duplicates', () => {
      // Regression: a global `/gi` regex reused across `test()` calls advanced
      // `lastIndex`, so a second back-to-back match was mis-reported as a
      // non-match (e.g. "paralonparalon" showed only one highlight).
      const highlighted = highlightMatch('paralonparalon', 'paralon');
      expect(highlighted.filter((h) => h.match).map((h) => h.text)).toEqual(['paralon', 'paralon']);
    });
  });
});
