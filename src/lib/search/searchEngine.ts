import {
  StorefrontProduct,
  StorefrontCategory,
  StorefrontCollection,
  StorefrontVariant,
} from '@/services/storefront/types';
import { StorefrontSearchResult } from '@/services/storefront/StorefrontService';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SEARCH ENGINE & RELEVANCE SCORING
 * ─────────────────────────────────────────────────────────────────────────────
 * Intelligent search engine optimized for furniture fabrics, foam (porolon),
 * hardware, and tools in Uzbekistan (supporting Uzbek Latin, Uzbek Cyrillic,
 * Russian, SKU variants, and common manufacturing terminology).
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface ScoredProductResult {
  product: StorefrontProduct;
  score: number;
  matchedVariant?: StorefrontVariant;
  matchedReason?: string;
  matchedField?: 'sku' | 'title' | 'variant' | 'spec' | 'category' | 'description' | 'synonym';
}

export interface EnrichedSearchResult extends StorefrontSearchResult {
  scoredProducts?: ScoredProductResult[];
  query: string;
  suggestions?: string[];
}

/**
 * Transliteration tables
 */
const LATIN_TO_CYRILLIC_PAIRS: [RegExp, string][] = [
  // Digraphs & special vowels first
  [/sh/gi, 'ш'],
  [/ch/gi, 'ч'],
  [/yo‘|yo'|yo`|yoʻ/gi, 'ё'],
  [/yo/gi, 'ё'],
  [/yu/gi, 'ю'],
  [/ya/gi, 'я'],
  [/ye/gi, 'е'],
  [/o‘|o'|o`|oʻ/gi, 'ў'],
  [/g‘|g'|g`|gʻ/gi, 'ғ'],
  [/ts/gi, 'ц'],
  [/zh/gi, 'ж'],
  [/kh/gi, 'х'],
  [/e/gi, 'е'],
  [/a/gi, 'а'],
  [/b/gi, 'б'],
  [/d/gi, 'д'],
  [/f/gi, 'ф'],
  [/g/gi, 'г'],
  [/h/gi, 'ҳ'],
  [/i/gi, 'и'],
  [/j/gi, 'ж'],
  [/k/gi, 'к'],
  [/l/gi, 'л'],
  [/m/gi, 'м'],
  [/n/gi, 'н'],
  [/o/gi, 'о'],
  [/p/gi, 'п'],
  [/q/gi, 'қ'],
  [/r/gi, 'р'],
  [/s/gi, 'с'],
  [/t/gi, 'т'],
  [/u/gi, 'у'],
  [/v/gi, 'в'],
  [/x/gi, 'х'],
  [/y/gi, 'й'],
  [/z/gi, 'з'],
];

const CYRILLIC_TO_LATIN_PAIRS: [RegExp, string][] = [
  [/ш/gi, 'sh'],
  [/щ/gi, 'sh'],
  [/ч/gi, 'ch'],
  [/ё/gi, 'yo'],
  [/ю/gi, 'yu'],
  [/я/gi, 'ya'],
  [/ў/gi, "o'"],
  [/ғ/gi, "g'"],
  [/қ/gi, 'q'],
  [/ҳ/gi, 'h'],
  [/х/gi, 'x'],
  [/ж/gi, 'j'],
  [/ц/gi, 'ts'],
  [/э/gi, 'e'],
  [/е/gi, 'e'],
  [/ы/gi, 'i'],
  [/й/gi, 'y'],
  [/ь|ъ/gi, ''],
  [/а/gi, 'a'],
  [/б/gi, 'b'],
  [/в/gi, 'v'],
  [/г/gi, 'g'],
  [/д/gi, 'd'],
  [/з/gi, 'z'],
  [/и/gi, 'i'],
  [/к/gi, 'k'],
  [/л/gi, 'l'],
  [/м/gi, 'm'],
  [/н/gi, 'n'],
  [/о/gi, 'o'],
  [/п/gi, 'p'],
  [/р/gi, 'r'],
  [/с/gi, 's'],
  [/т/gi, 't'],
  [/у/gi, 'u'],
  [/ф/gi, 'f'],
];

export function latinToCyrillic(str: string): string {
  let result = str.toLowerCase();
  for (const [pattern, replacement] of LATIN_TO_CYRILLIC_PAIRS) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

export function cyrillicToLatin(str: string): string {
  let result = str.toLowerCase();
  for (const [pattern, replacement] of CYRILLIC_TO_LATIN_PAIRS) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

/**
 * Normalizes text: lowercase, removes special accents/apostrophes, collapses spaces.
 */
export function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[`'’‘ʻʼ]/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Normalizes SKU: removes all non-alphanumeric characters (hyphens, spaces, dots).
 * e.g. "ST-2536-50" -> "st253650", "F 30 D" -> "f30d", "80 16" -> "8016".
 */
export function normalizeSku(sku: string): string {
  if (!sku) return '';
  return sku.toLowerCase().replace(/[^a-z0-9]/gi, '');
}

/**
 * Semantic word synonyms dictionary (pure word equivalents, without SKU pollution).
 */
const SYNONYM_GROUPS: string[][] = [
  // Foam
  ['paralon', 'porolon', 'поролон', 'паралон', 'ppu', 'ппу', 'gupka', 'губка', 'spong'],
  // Velvet / Velyur
  ['velyur', 'velur', 'велюр', 'baxmal', 'бархат', 'velvet'],
  // Boucle
  ['bukle', 'boucle', 'букле'],
  // Chenille
  ['shenill', 'shenil', 'chenille', 'шенилл'],
  // Leather / Eko-charm
  ['charm', 'koja', 'dermantin', 'eko-charm', 'ekocharm', 'экокожа', 'кожзам', 'кожа', 'leather', 'eko charm'],
  // Glue / Spray
  ['yelim', 'elim', 'kley', 'клей', 'sprey', 'spray', 'akfix', 'спрей', 'yopishqoq'],
  // Stapler / Staples
  ['stepler', 'stapler', 'степлер', 'skoba', 'skobaurgich', 'скоба', 'скобы', 'pnevmostepler', 'пневмостеплер'],
  // Nailer / Nails
  ['mix', 'gvozd', 'гвоздь', 'гвозди', 'mix qoqqich', 'pistolet', 'pnevmo', 'pnevmatik', 'пневмопистолет', 'нейлер', 'nailer'],
  // Mechanisms
  ['mexanizm', 'mehanizm', 'механизм', 'delfin', 'дельфин', 'akkordeon', 'аккордеон', 'pantograf', 'пантограф', 'tik-tak', 'tiktak', 'gazlift', 'gaz-lift', 'газлифт', 'transformatsiya', 'трансформация', 'divan mexanizmi'],
  // Hardware / Legs
  ['oyoq', 'oyoqlar', 'nozhka', 'ножки', 'ножка', 'furnitura', 'фурнитура'],
  ['petlya', 'petlyalar', 'петля', 'петли'],
  ['napravlyayushie', 'napravlyayushaya', 'yonalttirgich', 'yo‘naltirgich', 'направляющие'],
  // Colors
  ['oq', 'bely', 'beliy', 'белый', 'sutli', 'молочный'],
  ['qora', 'cherniy', 'черный', 'grafit', 'antrasit', 'антрацит'],
  ['krem', 'bej', 'bezheviy', 'бежевый'],
  ['yashil', 'zeleniy', 'зеленый', 'zumrad', 'изумруд'],
  ['kok', 'ko‘k', 'siniy', 'синий'],
  ['sariq', 'jeltiy', 'желтый', 'oltin', 'zolotoy', 'золотой'],
];

/**
 * Expands a query term into related word synonyms.
 */
export function getSynonymsForQuery(query: string): string[] {
  const norm = normalizeText(query);
  const synonyms = new Set<string>();

  for (const group of SYNONYM_GROUPS) {
    const matchesGroup = group.some(
      (term) => norm === term || (norm.length >= 3 && term.startsWith(norm))
    );
    if (matchesGroup) {
      for (const term of group) {
        if (term !== norm) {
          synonyms.add(term);
        }
      }
    }
  }

  return Array.from(synonyms);
}

/**
 * Helper to test if a token matches word boundaries in text.
 */
function matchesWord(text: string, token: string): boolean {
  if (!text || !token) return false;
  const words = text.split(/\s+/);
  if (token.length <= 2) {
    return words.includes(token);
  }
  return words.some((w) => w === token || w.startsWith(token));
}

/**
 * Generates all search tokens and transliterated variations for a given input query.
 */
export function getQueryVariations(rawQuery: string): {
  raw: string;
  normalized: string;
  normalizedSku: string;
  tokens: string[];
  cyrillic: string;
  latin: string;
  synonyms: string[];
} {
  const raw = rawQuery.trim();
  const normalized = normalizeText(raw);
  const normalizedSku = normalizeSku(raw);
  const tokens = normalized.split(/\s+/).filter((t) => t.length > 0);
  const cyrillic = latinToCyrillic(raw);
  const latin = cyrillicToLatin(raw);
  const synonyms = getSynonymsForQuery(raw);

  return {
    raw,
    normalized,
    normalizedSku,
    tokens,
    cyrillic,
    latin,
    synonyms,
  };
}

/**
 * Evaluates and scores a product against a search query.
 */
export function scoreProduct(
  product: StorefrontProduct,
  rawQuery: string,
  locale: string = 'uz'
): ScoredProductResult | null {
  if (!rawQuery || rawQuery.trim().length === 0) return null;

  const variations = getQueryVariations(rawQuery);
  const { raw, normalized, normalizedSku, tokens, cyrillic, latin, synonyms } = variations;

  let totalScore = 0;
  let bestMatchedVariant: StorefrontVariant | undefined;
  let matchedReason = '';
  let matchedField: ScoredProductResult['matchedField'] = 'title';

  const titleUzNorm = normalizeText(product.titleUz);
  const titleRuNorm = normalizeText(product.titleRu);
  const descUzNorm = normalizeText(product.descriptionUz || '');
  const descRuNorm = normalizeText(product.descriptionRu || '');
  const catUzNorm = normalizeText(product.categoryNameUz || '');
  const catRuNorm = normalizeText(product.categoryNameRu || '');
  const colNorm = normalizeText(product.collectionName || '');

  // 1. EXACT & PARTIAL SKU MATCHING (Highest Priority)
  for (const variant of product.variants || []) {
    const varSkuNorm = normalizeSku(variant.sku);
    const varSkuRaw = variant.sku.toLowerCase();
    const varNameUzNorm = normalizeText(variant.nameUz || '');
    const varNameRuNorm = normalizeText(variant.nameRu || '');
    const varColorUzNorm = normalizeText(variant.colorNameUz || '');
    const varColorRuNorm = normalizeText(variant.colorNameRu || '');

    // Exact SKU match (e.g. "F30D" === "F30D" or "ST2536-50")
    if (varSkuRaw === raw.toLowerCase()) {
      totalScore += 2500;
      bestMatchedVariant = variant;
      matchedReason = `SKU: ${variant.sku}`;
      matchedField = 'sku';
      break;
    }

    // Normalized SKU exact match (e.g. "st 2536 50" -> "st253650")
    if (normalizedSku.length >= 2 && varSkuNorm === normalizedSku) {
      totalScore += 2000;
      bestMatchedVariant = variant;
      matchedReason = `SKU: ${variant.sku}`;
      matchedField = 'sku';
      break;
    }

    // Normalized SKU starts with query SKU (e.g. "f30" matches "F30D", "st2536" matches "ST2536-50")
    if (normalizedSku.length >= 2 && varSkuNorm.startsWith(normalizedSku)) {
      const scoreGain = 1400 + (normalizedSku.length / varSkuNorm.length) * 400;
      if (scoreGain > totalScore) {
        totalScore = scoreGain;
        bestMatchedVariant = variant;
        matchedReason = `SKU: ${variant.sku}`;
        matchedField = 'sku';
      }
    }

    // Normalized SKU contains query SKU (minimum 3 chars)
    if (normalizedSku.length >= 3 && varSkuNorm.includes(normalizedSku)) {
      const scoreGain = 950;
      if (scoreGain > totalScore) {
        totalScore = scoreGain;
        bestMatchedVariant = variant;
        matchedReason = `SKU: ${variant.sku}`;
        matchedField = 'sku';
      }
    }

    // Variant color or variant name exact / contains match (e.g. "sutli krem", "oq qor", "grafit")
    if (normalized.length >= 2) {
      if (
        varNameUzNorm === normalized ||
        varNameRuNorm === normalized ||
        varColorUzNorm === normalized ||
        varColorRuNorm === normalized
      ) {
        totalScore += 800;
        if (!bestMatchedVariant) {
          bestMatchedVariant = variant;
          matchedReason = locale === 'ru'
            ? `Цвет / вариант: ${variant.nameRu || variant.nameUz}`
            : `Rang / variant: ${variant.nameUz}`;
          matchedField = 'variant';
        }
      } else if (
        matchesWord(varNameUzNorm, normalized) ||
        matchesWord(varNameRuNorm, normalized) ||
        matchesWord(varColorUzNorm, normalized) ||
        matchesWord(varColorRuNorm, normalized)
      ) {
        totalScore += 500;
        if (!bestMatchedVariant) {
          bestMatchedVariant = variant;
          matchedReason = locale === 'ru'
            ? `Цвет: ${variant.nameRu || variant.nameUz}`
            : `Rang: ${variant.nameUz}`;
          matchedField = 'variant';
        }
      }
    }
  }

  // 2. PRODUCT TITLE MATCHING
  if (normalized.length >= 2) {
    if (titleUzNorm === normalized || titleRuNorm === normalized) {
      totalScore += 1600;
      matchedField = matchedField || 'title';
    } else if (titleUzNorm.startsWith(normalized) || titleRuNorm.startsWith(normalized)) {
      totalScore += 1100;
      matchedField = matchedField || 'title';
    } else if (matchesWord(titleUzNorm, normalized) || matchesWord(titleRuNorm, normalized)) {
      totalScore += 750;
      matchedField = matchedField || 'title';
    } else if (titleUzNorm.includes(normalized) || titleRuNorm.includes(normalized)) {
      totalScore += 500;
      matchedField = matchedField || 'title';
    }
  }

  // 3. TRANSLITERATED MATCHING (Cyrillic <-> Latin)
  const normCyrillic = normalizeText(cyrillic);
  const normLatin = normalizeText(latin);

  if (normCyrillic.length >= 2) {
    if (titleRuNorm === normCyrillic) {
      totalScore += 1400;
      matchedField = matchedField || 'title';
    } else if (matchesWord(titleRuNorm, normCyrillic)) {
      totalScore += 700;
      matchedField = matchedField || 'title';
    } else if (titleRuNorm.includes(normCyrillic)) {
      totalScore += 450;
      matchedField = matchedField || 'title';
    }
  }

  if (normLatin.length >= 2) {
    if (titleUzNorm === normLatin) {
      totalScore += 1400;
      matchedField = matchedField || 'title';
    } else if (matchesWord(titleUzNorm, normLatin)) {
      totalScore += 700;
      matchedField = matchedField || 'title';
    } else if (titleUzNorm.includes(normLatin)) {
      totalScore += 450;
      matchedField = matchedField || 'title';
    }
  }

  // 4. MULTI-TOKEN MATCHING (e.g. "paralon 50", "mexanizm delfin", "velyur krem")
  if (tokens.length > 1) {
    let matchedTokenCount = 0;
    let tokenScore = 0;

    for (const token of tokens) {
      const tokenSku = normalizeSku(token);
      const tokenCyr = latinToCyrillic(token);
      const tokenLat = cyrillicToLatin(token);

      const inTitle =
        matchesWord(titleUzNorm, token) ||
        matchesWord(titleRuNorm, token) ||
        matchesWord(titleRuNorm, tokenCyr) ||
        matchesWord(titleUzNorm, tokenLat);

      const inVariants = (product.variants || []).some((v) =>
        (tokenSku.length >= 2 && normalizeSku(v.sku).includes(tokenSku)) ||
        matchesWord(normalizeText(v.nameUz), token) ||
        matchesWord(normalizeText(v.nameRu), token) ||
        matchesWord(normalizeText(v.colorNameUz || ''), token) ||
        matchesWord(normalizeText(v.colorNameRu || ''), token)
      );

      const inSpecs = (product.specs || []).some((s) =>
        matchesWord(normalizeText(s.valueUz), token) ||
        matchesWord(normalizeText(s.valueRu), token) ||
        (tokenSku.length >= 2 && normalizeSku(s.valueUz).includes(tokenSku))
      );

      const inCategory = matchesWord(catUzNorm, token) || matchesWord(catRuNorm, token);

      if (inTitle) {
        tokenScore += 600;
        matchedTokenCount++;
      } else if (inVariants) {
        tokenScore += 500;
        matchedTokenCount++;
      } else if (inSpecs) {
        tokenScore += 350;
        matchedTokenCount++;
      } else if (inCategory) {
        tokenScore += 200;
        matchedTokenCount++;
      }
    }

    if (matchedTokenCount === tokens.length) {
      // All search words matched across important product fields!
      totalScore += 1200 + tokenScore;
    } else if (matchedTokenCount > 0 && totalScore > 0) {
      totalScore += tokenScore;
    }
  }

  // 5. SPECIFICATIONS & ATTRIBUTES MATCHING
  for (const spec of product.specs || []) {
    const valUz = normalizeText(spec.valueUz || '');
    const valRu = normalizeText(spec.valueRu || '');
    const valSku = normalizeSku(spec.valueUz || '');

    if (normalized.length >= 2 && (valUz === normalized || valRu === normalized)) {
      totalScore += 500;
      if (!matchedReason) {
        matchedReason = `${locale === 'ru' ? spec.labelRu : spec.labelUz}: ${locale === 'ru' ? spec.valueRu : spec.valueUz}`;
        matchedField = 'spec';
      }
    } else if (normalized.length >= 3 && (matchesWord(valUz, normalized) || matchesWord(valRu, normalized))) {
      totalScore += 350;
      if (!matchedReason) {
        matchedReason = `${locale === 'ru' ? spec.labelRu : spec.labelUz}: ${locale === 'ru' ? spec.valueRu : spec.valueUz}`;
        matchedField = 'spec';
      }
    } else if (normalizedSku.length >= 3 && valSku.includes(normalizedSku)) {
      totalScore += 400;
      if (!matchedReason) {
        matchedReason = `${locale === 'ru' ? spec.labelRu : spec.labelUz}: ${locale === 'ru' ? spec.valueRu : spec.valueUz}`;
        matchedField = 'spec';
      }
    }
  }

  // 6. CATEGORY & COLLECTION MATCHING
  if (normalized.length >= 3) {
    if (matchesWord(catUzNorm, normalized) || matchesWord(catRuNorm, normalized)) {
      totalScore += 350;
      if (!matchedReason) {
        matchedReason = locale === 'ru' ? product.categoryNameRu : product.categoryNameUz;
        matchedField = 'category';
      }
    }
    if (colNorm && matchesWord(colNorm, normalized)) {
      totalScore += 250;
    }
  }

  // 7. SYNONYMS MATCHING
  if (synonyms.length > 0 && tokens.length <= 2) {
    for (const syn of synonyms) {
      if (
        matchesWord(titleUzNorm, syn) ||
        matchesWord(titleRuNorm, syn) ||
        matchesWord(catUzNorm, syn) ||
        matchesWord(catRuNorm, syn)
      ) {
        totalScore += 300;
        if (!matchedReason) {
          matchedReason = locale === 'ru' ? 'Похожий материал' : 'Mos material';
          matchedField = 'synonym';
        }
        break;
      }
    }
  }

  // Minimum threshold: discard weak noise matches
  if (totalScore >= 200) {
    if (product.isPopular) totalScore += 15;
    if (product.isFeatured) totalScore += 15;
    if (product.variants?.some((v) => v.stockStatus === 'IN_STOCK' || (typeof v.onHandQuantity === 'number' && v.onHandQuantity > 0))) {
      totalScore += 10;
    }
    return {
      product,
      score: totalScore,
      matchedVariant: bestMatchedVariant || product.variants?.[0],
      matchedReason: matchedReason || (locale === 'ru' ? product.categoryNameRu : product.categoryNameUz),
      matchedField,
    };
  }

  return null;
}

/**
 * Scores Category against query
 */
export function scoreCategory(category: StorefrontCategory, rawQuery: string): number {
  if (!rawQuery || rawQuery.trim().length === 0) return 0;

  const { normalized, cyrillic, latin, synonyms, tokens } = getQueryVariations(rawQuery);
  const nameUzNorm = normalizeText(category.nameUz);
  const nameRuNorm = normalizeText(category.nameRu);
  const descUzNorm = normalizeText(category.descriptionUz || '');
  const descRuNorm = normalizeText(category.descriptionRu || '');
  const normCyr = normalizeText(cyrillic);
  const normLat = normalizeText(latin);

  let score = 0;

  if (nameUzNorm === normalized || nameRuNorm === normalized) score += 1000;
  else if (nameUzNorm.startsWith(normalized) || nameRuNorm.startsWith(normalized)) score += 700;
  else if (matchesWord(nameUzNorm, normalized) || matchesWord(nameRuNorm, normalized)) score += 550;
  else if (matchesWord(nameRuNorm, normCyr) || matchesWord(nameUzNorm, normLat)) score += 450;
  else if (nameUzNorm.includes(normalized) || nameRuNorm.includes(normalized)) score += 350;

  for (const sub of category.subcategories || []) {
    const subUz = normalizeText(sub.nameUz);
    const subRu = normalizeText(sub.nameRu);
    if (subUz === normalized || subRu === normalized) {
      score += 600;
    } else if (matchesWord(subUz, normalized) || matchesWord(subRu, normalized)) {
      score += 450;
    } else if (subUz.includes(normalized) || subRu.includes(normalized)) {
      score += 300;
    }
  }

  for (const syn of synonyms) {
    if (
      matchesWord(nameUzNorm, syn) ||
      matchesWord(nameRuNorm, syn) ||
      (category.subcategories || []).some((s) => matchesWord(normalizeText(s.nameUz), syn) || matchesWord(normalizeText(s.nameRu), syn))
    ) {
      score += 350;
      break;
    }
  }

  if (tokens.length > 1) {
    const matched = tokens.filter((t) => matchesWord(nameUzNorm, t) || matchesWord(nameRuNorm, t) || matchesWord(descUzNorm, t) || matchesWord(descRuNorm, t));
    if (matched.length === tokens.length) score += 400;
  }

  return score;
}

/**
 * Scores Collection against query
 */
export function scoreCollection(collection: StorefrontCollection, rawQuery: string): number {
  if (!rawQuery || rawQuery.trim().length === 0) return 0;

  const { normalized, cyrillic, latin, synonyms } = getQueryVariations(rawQuery);
  const nameNorm = normalizeText(collection.name);
  const descUzNorm = normalizeText(collection.descriptionUz || '');
  const descRuNorm = normalizeText(collection.descriptionRu || '');
  const normCyr = normalizeText(cyrillic);
  const normLat = normalizeText(latin);

  let score = 0;

  if (nameNorm === normalized) score += 1000;
  else if (nameNorm.startsWith(normalized)) score += 700;
  else if (matchesWord(nameNorm, normalized) || matchesWord(nameNorm, normCyr) || matchesWord(nameNorm, normLat)) score += 550;
  else if (nameNorm.includes(normalized)) score += 350;

  for (const syn of synonyms) {
    if (matchesWord(nameNorm, syn) || matchesWord(descUzNorm, syn) || matchesWord(descRuNorm, syn)) {
      score += 300;
      break;
    }
  }

  return score;
}

/**
 * Main Storefront search function: searches and ranks products, categories, and collections.
 */
export function searchStorefront(
  products: StorefrontProduct[],
  categories: StorefrontCategory[],
  collections: StorefrontCollection[],
  rawQuery: string,
  locale: string = 'uz'
): EnrichedSearchResult {
  const q = (rawQuery || '').trim();
  if (!q || q.length < 2) {
    return {
      products: [],
      categories: [],
      collections: [],
      scoredProducts: [],
      totalMatches: 0,
      query: q,
      suggestions: [],
    };
  }

  // 1. Score & Rank Products
  const scoredProducts: ScoredProductResult[] = [];
  for (const prod of products) {
    const scored = scoreProduct(prod, q, locale);
    if (scored && scored.score >= 200) {
      scoredProducts.push(scored);
    }
  }

  // Sort descending by score
  scoredProducts.sort((a, b) => b.score - a.score);

  // Attach enriched metadata onto StorefrontProduct items
  const matchedProducts: StorefrontProduct[] = scoredProducts.map((sp) => ({
    ...sp.product,
    matchedVariant: sp.matchedVariant,
    matchedReason: sp.matchedReason,
    relevanceScore: sp.score,
  } as any));

  // 2. Score & Rank Categories
  const scoredCategories: { category: StorefrontCategory; score: number }[] = [];
  for (const cat of categories) {
    const score = scoreCategory(cat, q);
    if (score >= 200) {
      scoredCategories.push({ category: cat, score });
    }
  }
  scoredCategories.sort((a, b) => b.score - a.score);
  const matchedCategories = scoredCategories.map((c) => c.category);

  // 3. Score & Rank Collections
  const scoredCollections: { collection: StorefrontCollection; score: number }[] = [];
  for (const col of collections) {
    const score = scoreCollection(col, q);
    if (score >= 200) {
      scoredCollections.push({ collection: col, score });
    }
  }
  scoredCollections.sort((a, b) => b.score - a.score);
  const matchedCollections = scoredCollections.map((c) => c.collection);

  // 4. Generate Suggestions (if few matches)
  const suggestions: string[] = [];
  if (matchedProducts.length === 0) {
    const synonyms = getSynonymsForQuery(q);
    for (const syn of synonyms) {
      if (suggestions.length < 4) {
        suggestions.push(syn);
      }
    }
  }

  return {
    products: matchedProducts,
    categories: matchedCategories,
    collections: matchedCollections,
    scoredProducts,
    totalMatches: matchedProducts.length + matchedCategories.length + matchedCollections.length,
    query: q,
    suggestions,
  };
}

/**
 * Text highlighting utility for Search UI: splits string into matching and non-matching chunks.
 */
export function highlightMatch(text: string, query: string): Array<{ text: string; match: boolean }> {
  if (!text) return [{ text: '', match: false }];
  if (!query || query.trim().length < 2) return [{ text, match: false }];

  const { tokens, cyrillic, latin } = getQueryVariations(query);
  const allPatterns = Array.from(new Set([
    ...tokens,
    query.trim(),
    latinToCyrillic(query.trim()),
    cyrillicToLatin(query.trim()),
  ])).filter((p) => p.length >= 2);

  if (allPatterns.length === 0) return [{ text, match: false }];

  // Build regex matching any pattern
  const escaped = allPatterns
    .map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .sort((a, b) => b.length - a.length)
    .join('|');

  try {
    const regex = new RegExp(`(${escaped})`, 'gi');
    const parts = text.split(regex);
    // NB: do NOT use `regex.test(part)` here — a `g`-flagged regex keeps
    // `lastIndex` between calls, which would flip matches on/off across the
    // parts. Compare against the lowercase patterns instead.
    const lowerPatterns = allPatterns.map((p) => p.toLowerCase());
    return parts.filter(Boolean).map((part) => {
      const lower = part.toLowerCase();
      return {
        text: part,
        match: lowerPatterns.some((p) => p && lower.includes(p)),
      };
    });
  } catch {
    return [{ text, match: false }];
  }
}
