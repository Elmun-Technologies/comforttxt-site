import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  REAL_PRODUCTS,
  REAL_CATEGORIES,
  REAL_COLLECTIONS,
} from '@/services/storefront/realCatalog';

/**
 * Real catalogue integrity — guards against the exact breakage that makes a
 * storefront look broken:
 *   1. image paths that do not exist (broken cards / missing photos)
 *   2. dangling cross-sell / collection / category references
 *   3. duplicate ids, slugs and SKUs (cart collisions)
 *   4. nonsense pricing (wholesale >= retail, non-integer UZS, zero/NaN)
 *   5. empty variant lists or variants without photos
 */

const productIds = new Set(REAL_PRODUCTS.map((p) => p.id));
const productSlugs = new Set(REAL_PRODUCTS.map((p) => p.slug));
const categorySlugs = new Set(REAL_CATEGORIES.map((c) => c.slug));
const collectionSlugs = new Set(REAL_COLLECTIONS.map((c) => c.slug));

describe('realCatalog — product data integrity', () => {
  it('has a non-empty assortment across all five categories', () => {
    expect(REAL_PRODUCTS.length).toBeGreaterThanOrEqual(30);
    expect(REAL_CATEGORIES.length).toBe(5);
    for (const cat of REAL_CATEGORIES) {
      expect(
        REAL_PRODUCTS.some((p) => p.categorySlug === cat.slug),
        `category ${cat.slug} has no products`
      ).toBe(true);
    }
  });

  it('keeps product ids and slugs unique', () => {
    expect(productIds.size).toBe(REAL_PRODUCTS.length);
    expect(productSlugs.size).toBe(REAL_PRODUCTS.length);
  });

  it('keeps variant ids and SKUs unique across the whole catalogue', () => {
    const variantIds = new Set<string>();
    const skus = new Set<string>();
    for (const p of REAL_PRODUCTS) {
      for (const v of p.variants) {
        expect(variantIds.has(v.id), `duplicate variant id ${v.id}`).toBe(false);
        expect(skus.has(v.sku), `duplicate SKU ${v.sku}`).toBe(false);
        variantIds.add(v.id);
        skus.add(v.sku);
      }
    }
  });

  it('references only existing category and collection slugs', () => {
    for (const p of REAL_PRODUCTS) {
      expect(categorySlugs.has(p.categorySlug), `${p.id} bad category`).toBe(true);
      if (p.collectionSlug) {
        expect(collectionSlugs.has(p.collectionSlug), `${p.id} bad collection`).toBe(true);
      }
    }
  });

  it('resolves every cross-sell / analog reference to a real product', () => {
    for (const p of REAL_PRODUCTS) {
      for (const ref of [...(p.crossSellProductIds || []), ...(p.analogProductIds || [])]) {
        expect(productIds.has(ref), `${p.id} -> broken ref ${ref}`).toBe(true);
        expect(ref).not.toBe(p.id);
      }
    }
  });

  it('has sane demo prices: positive integers, wholesale below retail', () => {
    for (const p of REAL_PRODUCTS) {
      for (const v of p.variants) {
        expect(Number.isInteger(v.price), `${v.sku} price not integer`).toBe(true);
        expect(v.price).toBeGreaterThan(0);
        if (v.wholesalePrice != null) {
          expect(v.wholesalePrice).toBeLessThan(v.price);
          expect(Number.isInteger(v.wholesalePrice)).toBe(true);
        }
        expect(v.quantityStep).toBeGreaterThan(0);
        expect(v.minQuantity).toBeGreaterThan(0);
      }
    }
  });

  it('gives every product at least one variant with a photo', () => {
    for (const p of REAL_PRODUCTS) {
      expect(p.variants.length, `${p.id} has no variants`).toBeGreaterThan(0);
      for (const v of p.variants) {
        expect(v.images.length, `${v.sku} has no photo`).toBeGreaterThan(0);
      }
    }
  });
});

describe('realCatalog — image files exist on disk', () => {
  it('resolves every referenced /images/products/... photo to a real file', () => {
    const referenced = new Set<string>();
    for (const p of REAL_PRODUCTS) {
      for (const img of [p.primaryImage, ...p.images, ...p.variants.flatMap((v) => v.images)]) {
        referenced.add(img);
      }
    }
    expect(referenced.size).toBeGreaterThan(100);

    for (const img of referenced) {
      expect(img.startsWith('/images/products/'), `unexpected path ${img}`).toBe(true);
      const file = join(__dirname, '..', 'public', img);
      expect(existsSync(file), `missing image file ${img}`).toBe(true);
      // Not an empty file — a corrupted/truncated photo must fail this check.
      expect(readFileSync(file).length, `${img} is empty`).toBeGreaterThan(1_000);
    }
  });

  it('does not leave unused photos in public/images/products', () => {
    // Category and collection cover images live in the same folder and are
    // legitimate (non-product) references, so they count as wired too.
    const referenced = new Set<string>();
    for (const img of [
      ...REAL_CATEGORIES.map((c) => c.image || ''),
      ...REAL_COLLECTIONS.map((c) => c.image),
    ]) {
      if (img.startsWith('/images/products/')) {
        referenced.add(img.replace('/images/products/', ''));
      }
    }
    for (const p of REAL_PRODUCTS) {
      for (const img of [p.primaryImage, ...p.images, ...p.variants.flatMap((v) => v.images)]) {
        referenced.add(img.replace('/images/products/', ''));
      }
    }

    const { readdirSync, statSync } = require('node:fs') as typeof import('node:fs');

    function walk(dir: string): string[] {
      return readdirSync(dir).flatMap((entry) => {
        const full = join(dir, entry);
        return statSync(full).isDirectory() ? walk(full) : [full];
      });
    }

    const onDisk = walk(join(__dirname, '..', 'public', 'images', 'products'))
      .filter((f) => f.endsWith('.jpg'))
      .map((f) => f.split('products/')[1]);

    expect(onDisk.length).toBeGreaterThan(100);
    for (const file of onDisk) {
      expect(referenced.has(file), `unused photo ${file} (not wired to any product)`).toBe(true);
    }
  });
});
