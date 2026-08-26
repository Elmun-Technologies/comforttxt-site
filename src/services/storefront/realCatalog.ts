import {
  StorefrontCategory,
  StorefrontCollection,
  StorefrontProduct,
  StorefrontSpec,
  StorefrontUnitType,
  StorefrontVariant,
  StockStatus,
} from './types';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * COMFORT TEXTILE — REAL PRODUCT CATALOGUE
 * ─────────────────────────────────────────────────────────────────────────────
 * This is the actual assortment photographed for Comfort Textile
 * (public/images/products). Every product below maps 1:1 to real photos from
 * the shop archive: mebel oyoqlari, transformatsiya mexanizmlari, JIN JAN
 * pnevmatik asboblar, skoba/kley/rezina sarf materiallari, paralon buyumlari
 * and mato namunalari.
 *
 * Prices are demo values (UZS) for storefront development — replace with the
 * current price list before production. Descriptions are written from the
 * photos; precise technical parameters are confirmed with a manager.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const img = (path: string) => `/images/products/${path}`;

type VariantOpts = Partial<StorefrontVariant>;

/** Variant factory with sane defaults (pcs, 1 pc step, in stock). */
function v(
  id: string,
  sku: string,
  nameUz: string,
  nameRu: string,
  price: number,
  images: string[],
  opts: VariantOpts = {}
): StorefrontVariant {
  return {
    id,
    sku,
    nameUz,
    nameRu,
    price,
    wholesalePrice: Math.round((price * 82) / 100 / 500) * 500,
    hasWholesale: true,
    stockStatus: 'IN_STOCK',
    quantityStep: 1,
    minQuantity: 1,
    images,
    isAvailable: true,
    ...opts,
  };
}

type ProductOpts = Partial<StorefrontProduct>;

function p(
  id: string,
  slug: string,
  titleUz: string,
  titleRu: string,
  descriptionUz: string,
  descriptionRu: string,
  categorySlug: string,
  categoryNameUz: string,
  categoryNameRu: string,
  unitType: StorefrontUnitType,
  primaryImage: string,
  images: string[],
  variants: StorefrontVariant[],
  specs: StorefrontSpec[],
  opts: ProductOpts = {}
): StorefrontProduct {
  return {
    id,
    slug,
    titleUz,
    titleRu,
    descriptionUz,
    descriptionRu,
    categorySlug,
    categoryNameUz,
    categoryNameRu,
    unitType,
    minQtyStep: unitType === 'meter' ? 0.5 : 1,
    primaryImage,
    images,
    variants,
    specs,
    ...opts,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────────────────────────────────────
export const REAL_CATEGORIES: StorefrontCategory[] = [
  {
    id: 'cat-fabrics',
    slug: 'mebel-matolari',
    nameUz: 'Mebel matolari',
    nameRu: 'Мебельные ткани',
    descriptionUz: 'Velyur, bukle, shenill, rogojka va naqshli matolar — ranglarini namunalar bo‘yicha tanlaysiz',
    descriptionRu: 'Велюр, букле, шенилл, рогожка и ткани с рисунком — выбор по образцам',
    iconName: 'Palette',
    image: img('fabric/fabric-samplers-rangli.jpg'),
    productCount: 6,
    subcategories: [
      { slug: 'velyur', nameUz: 'Velyur', nameRu: 'Велюр' },
      { slug: 'bukle', nameUz: 'Bukle', nameRu: 'Букле' },
      { slug: 'shenill', nameUz: 'Shenill', nameRu: 'Шенилл' },
      { slug: 'rogojka', nameUz: 'Rogojka', nameRu: 'Рогожка' },
      { slug: 'mikrofibra', nameUz: 'Mikrofibra', nameRu: 'Микрофибра' },
      { slug: 'naqshli', nameUz: 'Naqshli matolar', nameRu: 'Ткани с рисунком' },
    ],
  },
  {
    id: 'cat-foam',
    slug: 'paralon',
    nameUz: 'Paralon (Porolon)',
    nameRu: 'Поролон (ППУ)',
    descriptionUz: 'Yumshoq mebel uchun paralon buyumlari: burchak (korner), taroq va qirqim detallar',
    descriptionRu: 'Изделия из поролона для мягкой мебели: уголки, гребенки и фигурные детали',
    iconName: 'Layers',
    image: img('foam/paralon-korner-rangli.jpg'),
    productCount: 2,
    subcategories: [
      { slug: 'korner', nameUz: 'Burchak buyumlar (korner)', nameRu: 'Уголки (корнер)' },
      { slug: 'taroq', nameUz: 'Taroq buyumlar', nameRu: 'Гребенки' },
    ],
  },
  {
    id: 'cat-mechanisms',
    slug: 'mexanizmlar',
    nameUz: 'Transformatsiya mexanizmlari',
    nameRu: 'Механизмы трансформации',
    descriptionUz: 'Divan, evrokitob, delfin va stullar uchun mustahkam transformatsiya mexanizmlari',
    descriptionRu: 'Прочные механизмы трансформации для диванов, еврокнижек и кресел',
    iconName: 'Settings',
    image: img('mechanisms/delfin-mexanizmi-01.jpg'),
    productCount: 4,
    subcategories: [
      { slug: 'delfin', nameUz: 'Delfin mexanizmi', nameRu: 'Механизм Дельфин' },
      { slug: 'evrokitob', nameUz: 'Evrokitob mexanizmi', nameRu: 'Механизм Еврокнижка' },
      { slug: 'universal', nameUz: 'Universal mexanizm', nameRu: 'Универсальный механизм' },
      { slug: 'stul', nameUz: 'Stul mexanizmi', nameRu: 'Механизм для кресла' },
    ],
  },
  {
    id: 'cat-hardware',
    slug: 'furnitura-va-oyoqlar',
    nameUz: 'Furnitura va Oyoqlar',
    nameRu: 'Фурнитура и Ножки',
    descriptionUz: 'Divan, kreslo, stol va shkaflar uchun oyoqlar: konus, piramida, X-oyoq, metall karkas',
    descriptionRu: 'Ножки для диванов, кресел, столов и шкафов: конус, пирамида, X-ножки, металлокаркас',
    iconName: 'Wrench',
    image: img('legs/x-oyoq-qora.jpg'),
    productCount: 10,
    subcategories: [
      { slug: 'konus', nameUz: 'Konus oyoqlar', nameRu: 'Конусные ножки' },
      { slug: 'piramida', nameUz: 'Piramida oyoqlar', nameRu: 'Пирамидальные ножки' },
      { slug: 'x-shakl', nameUz: 'X-shaklli oyoqlar', nameRu: 'X-образные ножки' },
      { slug: 'tulpan', nameUz: 'Tulpan oyoqlar', nameRu: 'Ножки тюльпан' },
      { slug: 'karkas', nameUz: 'Metall karkas oyoqlar', nameRu: 'Металлические каркасные ножки' },
      { slug: 'figura', nameUz: 'Figura oyoq to‘plamlari', nameRu: 'Фигурные наборы ножек' },
      { slug: 'balyasin', nameUz: 'Balyasin oyoqlar', nameRu: 'Балясины' },
      { slug: 't-shakl', nameUz: 'T-shaklli oyoqlar', nameRu: 'T-образные ножки' },
      { slug: 'ribka', nameUz: 'Ribka kolonka', nameRu: 'Рибка колонка' },
      { slug: 'dekor', nameUz: 'Dekor oyoqlar', nameRu: 'Декоративные ножки' },
    ],
  },
  {
    id: 'cat-tools',
    slug: 'sarf-materiallar-va-instrumentlar',
    nameUz: 'Asboblar va Sarf materiallari',
    nameRu: 'Инструменты и Расходники',
    descriptionUz: 'JIN JAN pnevmatik steplerlar, skobalar, kley stiklar, rezina tasma va burchak plastinalar',
    descriptionRu: 'Пневмостеплеры JIN JAN, скобы, клеевые стики, резиновые стяжки и уголки',
    iconName: 'Hammer',
    image: img('tools/jinjan-qutilar-01.jpg'),
    productCount: 13,
    subcategories: [
      { slug: 'pnevmatik', nameUz: 'Pnevmatik asboblar', nameRu: 'Пневмоинструменты' },
      { slug: 'skoba', nameUz: 'Skobalar', nameRu: 'Скобы' },
      { slug: 'kley', nameUz: 'Yelim va kley stiklar', nameRu: 'Клей и стики' },
      { slug: 'rezina', nameUz: 'Rezina tasmalar', nameRu: 'Резиновые стяжки' },
      { slug: 'metall', nameUz: 'Metall plastinalar', nameRu: 'Металлические уголки' },
      { slug: 'purkagich', nameUz: 'Bo‘yoq purkagichlar', nameRu: 'Краскопульты' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COLLECTIONS
// ─────────────────────────────────────────────────────────────────────────────
export const REAL_COLLECTIONS: StorefrontCollection[] = [
  {
    id: 'col-namunalar',
    slug: 'mato-namunalar-to-plami',
    name: 'Mato namunalar to‘plami',
    descriptionUz: 'Real rang va fakturani qo‘lda ko‘rish uchun mato namunalari',
    descriptionRu: 'Образцы тканей для живого подбора цвета и фактуры',
    image: img('fabric/fabric-samplers-rangli.jpg'),
    productCount: 6,
  },
  {
    id: 'col-oyoqlar',
    slug: 'mebel-oyoqlar-kolleksiyasi',
    name: 'Mebel oyoqlar kolleksiyasi',
    descriptionUz: 'Konus, piramida, X-oyoq va metall karkas oyoqlar — barcha ranglarda',
    descriptionRu: 'Конусные, пирамидальные, X-образные и каркасные ножки всех цветов',
    image: img('legs/x-oyoq-qora.jpg'),
    productCount: 10,
  },
  {
    id: 'col-jinjan',
    slug: 'jinjan-pnevmatika-kolleksiyasi',
    name: 'JIN JAN pnevmatika kolleksiyasi',
    descriptionUz: 'Mebel ishlab chiqarish uchun pnevmatik stepler va nailerlar',
    descriptionRu: 'Пневмостеплеры и гвоздезабивные пистолеты для мебельного производства',
    image: img('tools/jinjan-qutilar-01.jpg'),
    productCount: 5,
  },
  {
    id: 'col-ustaxona',
    slug: 'ustaxona-sarf-materiallari',
    name: 'Ustaxona sarf materiallari',
    descriptionUz: 'Skobalar, kley stiklar, rezina tasmalar va burchak plastinalar',
    descriptionRu: 'Скобы, клеевые стики, резиновые стяжки и металлические уголки',
    image: img('consumables/skoba-orange-quti-01.jpg'),
    productCount: 9,
  },
  {
    id: 'col-mexanizmlar',
    slug: 'transformatsiya-kolleksiyasi',
    name: 'Transformatsiya mexanizmlari',
    descriptionUz: 'Delfin, evrokitob va universal mexanizmlar — divan uchastkalari uchun',
    descriptionRu: 'Механизмы «Дельфин», «Еврокнижка» и универсальные для диванов',
    image: img('mechanisms/delfin-mexanizmi-01.jpg'),
    productCount: 4,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCTS
// ─────────────────────────────────────────────────────────────────────────────

const FABRIC_SPEC = (texture: string): StorefrontSpec[] => [
  {
    key: 'texture',
    labelUz: 'Faktura turi',
    labelRu: 'Тип фактуры',
    valueUz: texture,
    valueRu: texture,
    group: 'Material',
  },
  {
    key: 'sample',
    labelUz: 'Namunalar',
    labelRu: 'Образцы',
    valueUz: 'Namunalar to‘plami bilan',
    valueRu: 'С набором образцов',
    group: 'Material',
  },
];

export const REAL_PRODUCTS: StorefrontProduct[] = [
  // ── MATOLAR ────────────────────────────────────────────────────────────────
  p(
    'prod-velyur',
    'velyur-mato-namunalar',
    'Velyur mato — namunalar bo‘yicha tanlov',
    'Велюровая ткань — подбор по образцам',
    'Yumshoq baxmal fakturali velyur mato. Rang palitrasi namunalar stendida: krem, kulrang, jigarrang va boshqa neytral tonlar. Mebel ishlab chiqarishda divan, kreslo va bog‘ mebellari uchun ishlatiladi. Rang va rulon narxi menejer bilan tasdiqlanadi.',
    'Велюровая ткань с мягкой бархатистой фактурой. Цветовая палитра на стенде образцов: кремовые, серые, коричневые и другие нейтральные тона. Применяется для диванов, кресел и садовой мебели. Цвет и цену рулона уточняйте у менеджера.',
    'mebel-matolari',
    'Mebel matolari',
    'Мебельные ткани',
    'meter',
    img('fabric/fabric-samplers-rangli.jpg'),
    [img('fabric/fabric-samplers-rangli.jpg'), img('fabric/fabric-samplers-bej.jpg'), img('fabric/fabric-samplers-devori.jpg'), img('fabric/mato-namunalar-divanda.jpg'), img('showroom/yashash-xonasi-divani.jpg')],
    [
      v('var-velyur-a', 'VEL-01', 'Namunalar palitrasi A (rangli)', 'Палитра образцов A (цветная)', 78000, [img('fabric/fabric-samplers-rangli.jpg')], {
        colorHex: '#9A8478', colorNameUz: 'Rangli palitra', colorNameRu: 'Цветная палитра', quantityStep: 0.5,
      }),
      v('var-velyur-b', 'VEL-02', 'Namunalar palitrasi B (bej)', 'Палитра образцов B (бежевая)', 73000, [img('fabric/fabric-samplers-bej.jpg')], {
        colorHex: '#D8C8B0', colorNameUz: 'Bej palitra', colorNameRu: 'Бежевая палитра', quantityStep: 0.5,
      }),
      v('var-velyur-c', 'VEL-03', 'Namunalar palitrasi C (kulrang)', 'Палитра образцов C (серая)', 73000, [img('fabric/fabric-samplers-devori.jpg')], {
        colorHex: '#9CA3AF', colorNameUz: 'Kulrang palitra', colorNameRu: 'Серая палитра', quantityStep: 0.5,
      }),
    ],
    FABRIC_SPEC('Velyur'),
    { collectionSlug: 'mato-namunalar-to-plami', collectionName: 'Mato namunalar to‘plami', isFeatured: true, isPopular: true, isNew: true, crossSellProductIds: ['prod-bukle', 'prod-paralon-korner'] }
  ),
  p(
    'prod-bukle',
    'bukle-mato-namunalar',
    'Bukle mato — namunalar bo‘yicha tanlov',
    'Букле — подбор по образцам',
    'Zamonaviy tugunchali fakturaga ega bukle mato. Oq, sutli va och kulrang namunalar stendda. Yumshoq mebel va dekorativ yostiqlar uchun tanlanadi. Narx rulon va partiya hajmiga qarab aniqlanadi.',
    'Букле с выразительной узелковой фактурой. На стенде образцы белого, молочного и светло-серого тона. Подходит для мягкой мебели и декоративных подушек. Цена зависит от рулона и объёма партии.',
    'mebel-matolari',
    'Mebel matolari',
    'Мебельные ткани',
    'meter',
    img('fabric/fabric-samplers-ok.jpg'),
    [img('fabric/fabric-samplers-ok.jpg'), img('fabric/fabric-samplers-krem.jpg'), img('fabric/mato-namunalar-divanda.jpg')],
    [
      v('var-bukle-ok', 'BUK-01', 'Oq va sutli tonlar', 'Белые и молочные тона', 87000, [img('fabric/fabric-samplers-ok.jpg')], {
        colorHex: '#F5F0E8', colorNameUz: 'Oq / sutli', colorNameRu: 'Белый / молочный', quantityStep: 0.5,
      }),
      v('var-bukle-krem', 'BUK-02', 'Krem tonlar', 'Кремовые тона', 85000, [img('fabric/fabric-samplers-krem.jpg')], {
        colorHex: '#EFE6D8', colorNameUz: 'Krem', colorNameRu: 'Кремовый', quantityStep: 0.5,
      }),
    ],
    FABRIC_SPEC('Bukle'),
    { collectionSlug: 'mato-namunalar-to-plami', collectionName: 'Mato namunalar to‘plami', isFeatured: true, isNew: true, crossSellProductIds: ['prod-velyur', 'prod-kley-stik'] }
  ),
  p(
    'prod-shenill',
    'shenill-mato-namunalar',
    'Shenill mato — namunalar bo‘yicha tanlov',
    'Шенилл — подбор по образцам',
    'Qalin va hajmli to‘qimali shenill mato. Namunalar devoriy stendda: jigarrang, kulrang va pista tonlari. Klassik va zamonaviy mebellar uchun mustahkam tanlov.',
    'Шенилл с плотной объемной структурой. На стенде образцы коричневых, серых и фисташковых тонов. Надежный выбор для классической и современной мебели.',
    'mebel-matolari',
    'Mebel matolari',
    'Мебельные ткани',
    'meter',
    img('fabric/fabric-samplers-devori.jpg'),
    [img('fabric/fabric-samplers-devori.jpg'), img('fabric/fabric-samplers-bej.jpg')],
    [
      v('var-shenill-ok', 'SHE-01', 'Kulrang / jigarrang palitra', 'Серо-коричневая палитра', 91000, [img('fabric/fabric-samplers-devori.jpg')], {
        colorHex: '#8D8D8D', colorNameUz: 'Kulrang palitra', colorNameRu: 'Серая палитра', quantityStep: 0.5,
      }),
    ],
    FABRIC_SPEC('Shenill'),
    { collectionSlug: 'mato-namunalar-to-plami', collectionName: 'Mato namunalar to‘plami', isPopular: true, crossSellProductIds: ['prod-oyoq-ribka', 'prod-paralon-korner'] }
  ),
  p(
    'prod-rogojka',
    'rogojka-mato-namunalar',
    'Rogojka mato — namunalar bo‘yicha tanlov',
    'Рогожка — подбор по образцам',
    'Zich to‘qilgan rogojka mato. Keng neytral ranglar stendi: bej, qum, kulrang. Mebel ustaxonalari uchun kundalik talabgir pozitsiya.',
    'Плотная тканая рогожка. Широкая палитра нейтральных тонов: бежевый, песочный, серый. Востребованная позиция для мебельных цехов.',
    'mebel-matolari',
    'Mebel matolari',
    'Мебельные ткани',
    'meter',
    img('fabric/fabric-samplers-krem.jpg'),
    [img('fabric/fabric-samplers-krem.jpg'), img('fabric/fabric-samplers-bej.jpg')],
    [
      v('var-rogojka-bej', 'ROG-01', 'Bej / qum palitra', 'Бежево-песочная палитра', 64000, [img('fabric/fabric-samplers-krem.jpg')], {
        colorHex: '#CBB79A', colorNameUz: 'Bej palitra', colorNameRu: 'Бежевая палитра', quantityStep: 0.5,
      }),
    ],
    FABRIC_SPEC('Rogojka'),
    { collectionSlug: 'mato-namunalar-to-plami', collectionName: 'Mato namunalar to‘plami', isPopular: true, crossSellProductIds: ['prod-velyur', 'prod-oyoq-x-shakl'] }
  ),
  p(
    'prod-mikrofibra',
    'mikrofibra-mato-namunalar',
    'Mikrofibra mato — namunalar bo‘yicha tanlov',
    'Микрофибра — подбор по образцам',
    'Yumshoq va amaliy mikrofibra mato. Namunalar qatorida kulrang va ko‘k tonlar mavjud. Ulgurji partiyalar uchun raqobatbardosh narx.',
    'Мягкая и практичная микрофибра. В линейке образцов серые и синие тона. Конкурентная цена на оптовые партии.',
    'mebel-matolari',
    'Mebel matolari',
    'Мебельные ткани',
    'meter',
    img('fabric/fabric-samplers-bej.jpg'),
    [img('fabric/fabric-samplers-bej.jpg'), img('fabric/fabric-samplers-rangli.jpg')],
    [
      v('var-mikro-a', 'MIC-01', 'Neytral palitra', 'Нейтральная палитра', 58000, [img('fabric/fabric-samplers-bej.jpg')], {
        colorHex: '#B9B2A8', colorNameUz: 'Neytral', colorNameRu: 'Нейтральный', quantityStep: 0.5,
      }),
    ],
    FABRIC_SPEC('Mikrofibra'),
    { collectionSlug: 'mato-namunalar-to-plami', collectionName: 'Mato namunalar to‘plami', crossSellProductIds: ['prod-shenill', 'prod-burchak-plastina'] }
  ),
  p(
    'prod-zebra-mato',
    'naqshli-zebra-mato',
    'Naqshli zebra mato (monoxrom)',
    'Ткань с рисунком «зебра» (монохром)',
    'Oq-qora zebra naqshli aksent mato. Divan kushandalari va tayyor divanlarning fason qismlari uchun ishlatiladi. Naqsh yo‘nalishi rulonda bir xil, kesishda hisobga olinadi.',
    'Акцентная ткань с черно-белым рисунком «зебра». Используется для подушек и фасонных элементов диванов. Направление рисунка в рулоне однородное, учитывается при раскрое.',
    'mebel-matolari',
    'Mebel matolari',
    'Мебельные ткани',
    'meter',
    img('fabric/zebra-mato.jpg'),
    [img('fabric/zebra-mato.jpg'), img('showroom/koq-divan.jpg'), img('showroom/kreslo-shouroom.jpg'), img('showroom/yashash-xonasi-divani.jpg')],
    [
      v('var-zebra', 'ZBR-01', 'Oq-qora zebra', 'Черно-белая зебра', 95000, [img('fabric/zebra-mato.jpg')], {
        colorHex: '#F2F2F2', colorNameUz: 'Oq-qora', colorNameRu: 'Черно-белый', quantityStep: 0.5,
      }),
    ],
    FABRIC_SPEC('Naqshli'),
    { collectionSlug: 'mato-namunalar-to-plami', collectionName: 'Mato namunalar to‘plami', isNew: true, isFeatured: true, crossSellProductIds: ['prod-velyur', 'prod-oyoq-konus-chiziqli'] }
  ),

  // ── PARALON ────────────────────────────────────────────────────────────────
  p(
    'prod-paralon-korner',
    'paralon-burchak-buyumlar-korner',
    'Paralon burchak buyumlari (korner)',
    'Поролоновые уголки (корнер)',
    'Yumshoq mebel uchun paralon burchak buyumlari: divan yostiqlari va kushandalar tayanch qismlari. To‘plamda turli rang va o‘lchamdagi kornerlar bor. Qalinlik va o‘lcham menejer bilan aniqlashtiriladi.',
    'Поролоновые уголки для мягкой мебели: опорные элементы подушек и спинок диванов. В наборе корнеры разных цветов и размеров. Толщину и размеры уточняйте у менеджера.',
    'paralon',
    'Paralon',
    'Поролон (ППУ)',
    'pcs',
    img('foam/paralon-korner-rangli.jpg'),
    [img('foam/paralon-korner-rangli.jpg'), img('foam/paralon-korner-ok.jpg'), img('foam/paralon-korner-qora.jpg'), img('foam/paralon-korner-aralash.jpg')],
    [
      v('var-korner-rangli', 'PK-R', 'Rangli to‘plam (6 dona)', 'Цветной набор (6 шт.)', 48000, [img('foam/paralon-korner-rangli.jpg')], {
        nameUz: 'Rangli to‘plam', nameRu: 'Цветной набор', colorHex: '#8A8A8A', colorNameUz: 'Rangli', colorNameRu: 'Цветной',
      }),
      v('var-korner-ok', 'PK-W', 'Oq to‘plam (4 dona)', 'Белый набор (4 шт.)', 42000, [img('foam/paralon-korner-ok.jpg')], {
        colorHex: '#F1F1F1', colorNameUz: 'Oq', colorNameRu: 'Белый',
      }),
      v('var-korner-qora', 'PK-B', 'Qora to‘plam (4 dona)', 'Черный набор (4 шт.)', 42000, [img('foam/paralon-korner-qora.jpg')], {
        colorHex: '#1F1F1F', colorNameUz: 'Qora', colorNameRu: 'Черный',
      }),
      v('var-korner-aralash', 'PK-M', 'Aralash to‘plam', 'Смешанный набор', 45000, [img('foam/paralon-korner-aralash.jpg')], {
        colorHex: '#5B5B5B', colorNameUz: 'Aralash', colorNameRu: 'Смешанный',
      }),
    ],
    [
      { key: 'foam_type', labelUz: 'Buyum turi', labelRu: 'Тип изделия', valueUz: 'Korner', valueRu: 'Корнер', group: 'Material' },
      { key: 'use', labelUz: 'Qo‘llanishi', labelRu: 'Применение', valueUz: 'Yumshoq mebel tayanchlari', valueRu: 'Опоры мягкой мебели', group: 'Material' },
    ],
    { collectionSlug: 'ustaxona-sarf-materiallari', collectionName: 'Ustaxona sarf materiallari', isPopular: true, isFeatured: true, crossSellProductIds: ['prod-paralon-taroq', 'prod-kley-stik'] }
  ),
  p(
    'prod-paralon-taroq',
    'paralon-taroq-buyumlar',
    'Paralon taroq buyumlari',
    'Поролоновые гребенки',
    'Yumshoq mebel detallari uchun paralon taroq buyumlar. Qirqim va qadoqlash to‘plamlari. Mebel fabrikalari uchun dona va to‘plam narxlari mavjud.',
    'Поролоновые гребенки для деталей мягкой мебели. Поставляются нарезкой и наборами. Для фабрик действуют оптовые цены.',
    'paralon',
    'Paralon',
    'Поролон (ППУ)',
    'pcs',
    img('foam/paralon-taroq-qora.jpg'),
    [img('foam/paralon-taroq-qora.jpg'), img('foam/paralon-korner-qora.jpg')],
    [
      v('var-taroq', 'PT-01', 'Taroq to‘plami', 'Набор гребенок', 55000, [img('foam/paralon-taroq-qora.jpg')], {
        colorHex: '#1F1F1F', colorNameUz: 'Qora', colorNameRu: 'Черный',
      }),
    ],
    [
      { key: 'foam_type', labelUz: 'Buyum turi', labelRu: 'Тип изделия', valueUz: 'Taroq', valueRu: 'Гребенка', group: 'Material' },
    ],
    { collectionSlug: 'ustaxona-sarf-materiallari', collectionName: 'Ustaxona sarf materiallari', crossSellProductIds: ['prod-paralon-korner', 'prod-rezina-tasma'] }
  ),

  // ── MEXANIZMLAR ────────────────────────────────────────────────────────────
  p(
    'prod-mexanizm-delfin',
    'delfin-transformatsiya-mexanizmi',
    'Delfin transformatsiya mexanizmi',
    'Механизм трансформации «Дельфин»',
    'Burchakli divanlar uchun delfin mexanizmi. Qora metall karkas, yotish joyi mustahkam. O‘ng va chap variantlari mavjud. Mebel ustaxonasi uchun komplekt narxi alohida kelishiladi.',
    'Механизм «Дельфин» для угловых диванов. Черный металлический каркас, надежное спальное место. Есть правые и левые исполнения. Комплект для цеха обсуждается отдельно.',
    'mexanizmlar',
    'Transformatsiya mexanizmlari',
    'Механизмы трансформации',
    'pcs',
    img('mechanisms/delfin-mexanizmi-01.jpg'),
    [img('mechanisms/delfin-mexanizmi-01.jpg'), img('mechanisms/delfin-mexanizmi-02.jpg'), img('mechanisms/delfin-mexanizmi-03.jpg'), img('mechanisms/mexanizm-qora-01.jpg')],
    [
      v('var-delfin-komplekt', 'MDF-K', 'Komplekt (o‘ng + chap)', 'Комплект (правый + левый)', 890000, [img('mechanisms/delfin-mexanizmi-01.jpg')], {
        stockStatus: 'IN_STOCK' as StockStatus, onHandQuantity: 24,
      }),
      v('var-delfin-bitta', 'MDF-1', 'Bitta mexanizm', 'Один механизм', 465000, [img('mechanisms/delfin-mexanizmi-02.jpg')], {
        stockStatus: 'IN_STOCK' as StockStatus, onHandQuantity: 51,
      }),
    ],
    [
      { key: 'mechanism_type', labelUz: 'Mexanizm turi', labelRu: 'Тип механизма', valueUz: 'Delfin', valueRu: 'Дельфин', group: 'Texnik' },
      { key: 'frame', labelUz: 'Karkas', labelRu: 'Каркас', valueUz: 'Metall, qora', valueRu: 'Металл, черный', group: 'Texnik' },
    ],
    { collectionSlug: 'transformatsiya-kolleksiyasi', collectionName: 'Transformatsiya mexanizmlari', isFeatured: true, isPopular: true, crossSellProductIds: ['prod-mexanizm-evrokitob', 'prod-kley-stik'] }
  ),
  p(
    'prod-mexanizm-evrokitob',
    'evrokitob-mexanizmi',
    'Evrokitob transformatsiya mexanizmi',
    'Механизм трансформации «Еврокнижка»',
    'Oqlangan metall qismlardan yig‘iladigan evrokitob mexanizmi. To‘g‘ri va burchakli divanlar uchun. Komplekt barcha kronshteyn va yo‘naltirgichlar bilan yetkaziladi.',
    'Механизм «Еврокнижка» из оцинкованных металлических частей. Подходит для прямых и угловых диванов. Поставляется в комплекте с кронштейнами и направляющими.',
    'mexanizmlar',
    'Transformatsiya mexanizmlari',
    'Механизмы трансформации',
    'pcs',
    img('mechanisms/evrokitob-qismlar-01.jpg'),
    [img('mechanisms/evrokitob-qismlar-01.jpg'), img('mechanisms/evrokitob-qismlar-02.jpg'), img('mechanisms/evrokitob-qismlar-03.jpg'), img('mechanisms/evrokitob-qismlar-04.jpg'), img('mechanisms/mexanizm-evrokitob-ok.jpg')],
    [
      v('var-evrokitob', 'MEV-K', 'Komplekt (4 dona)', 'Комплект (4 шт.)', 620000, [img('mechanisms/evrokitob-qismlar-01.jpg')], {
        onHandQuantity: 18,
      }),
    ],
    [
      { key: 'mechanism_type', labelUz: 'Mexanizm turi', labelRu: 'Тип механизма', valueUz: 'Evrokitob', valueRu: 'Еврокнижка', group: 'Texnik' },
      { key: 'frame', labelUz: 'Karkas', labelRu: 'Каркас', valueUz: 'Metall, oq', valueRu: 'Металл, белый', group: 'Texnik' },
    ],
    { collectionSlug: 'transformatsiya-kolleksiyasi', collectionName: 'Transformatsiya mexanizmlari', isNew: true, crossSellProductIds: ['prod-mexanizm-delfin', 'prod-oyoq-karkas'] }
  ),
  p(
    'prod-mexanizm-universal',
    'universal-transformatsiya-mexanizmi',
    'Universal transformatsiya mexanizmi (qora)',
    'Универсальный механизм трансформации (черный)',
    'Yig‘iladigan universal mexanizm: divan o‘rindig‘ini yotish joyiga aylantiradi. Qora mustahkam karkas, tez o‘rnatiladi. Turli modellarga mos qilib sozlanadi.',
    'Складной универсальный механизм: превращает сиденье дивана в спальное место. Прочный черный каркас, быстрый монтаж. Настраивается под разные модели.',
    'mexanizmlar',
    'Transformatsiya mexanizmlari',
    'Механизмы трансформации',
    'pcs',
    img('mechanisms/mexanizm-qora-01.jpg'),
    [img('mechanisms/mexanizm-qora-01.jpg'), img('mechanisms/mexanizm-qora-02.jpg'), img('mechanisms/mexanizm-qora-03.jpg'), img('mechanisms/mexanizm-qora-04.jpg')],
    [
      v('var-universal', 'MUN-01', 'Komplekt', 'Комплект', 520000, [img('mechanisms/mexanizm-qora-01.jpg')], {
        onHandQuantity: 33,
      }),
    ],
    [
      { key: 'mechanism_type', labelUz: 'Mexanizm turi', labelRu: 'Тип механизма', valueUz: 'Universal', valueRu: 'Универсальный', group: 'Texnik' },
      { key: 'frame', labelUz: 'Karkas', labelRu: 'Каркас', valueUz: 'Metall, qora', valueRu: 'Металл, черный', group: 'Texnik' },
    ],
    { collectionSlug: 'transformatsiya-kolleksiyasi', collectionName: 'Transformatsiya mexanizmlari', isPopular: true, crossSellProductIds: ['prod-mexanizm-delfin', 'prod-oyoq-konus-chiziqli'] }
  ),
  p(
    'prod-mexanizm-stul',
    'stul-transformatsiya-mexanizmi',
    'Stul (kreslo) transformatsiya mexanizmi',
    'Механизм трансформации для кресла',
    'Yig‘iladigan stul-kreslo mexanizmi. Kichik xonalar uchun yotish funksiyali kreslolar ishlab chiqarishda ishlatiladi. Bitta kreslo uchun komplekt yetarli.',
    'Складной механизм для кресла-кровати. Используется при производстве кресел со спальным местом для небольших комнат. Комплекта хватает на одно кресло.',
    'mexanizmlar',
    'Transformatsiya mexanizmlari',
    'Механизмы трансформации',
    'pcs',
    img('mechanisms/stul-mexanizmi.jpg'),
    [img('mechanisms/stul-mexanizmi.jpg'), img('mechanisms/mexanizm-qora-04.jpg')],
    [
      v('var-stul', 'MST-01', 'Komplekt', 'Комплект', 380000, [img('mechanisms/stul-mexanizmi.jpg')], {
        onHandQuantity: 42,
      }),
    ],
    [
      { key: 'mechanism_type', labelUz: 'Mexanizm turi', labelRu: 'Тип механизма', valueUz: 'Stul', valueRu: 'Кресло', group: 'Texnik' },
    ],
    { collectionSlug: 'transformatsiya-kolleksiyasi', collectionName: 'Transformatsiya mexanizmlari', crossSellProductIds: ['prod-mexanizm-universal', 'prod-oyoq-baluster'] }
  ),

  // ── OYOQLAR ────────────────────────────────────────────────────────────────
  p(
    'prod-oyoq-konus-chiziqli',
    'konus-oyoqlar-chiziqli',
    'Konus oyoqlar (chiziqli)',
    'Конусные ножки (рифленые)',
    'Divan va kreslolar uchun toraygan konus shaklidagi oyoqlar. Chiziqli (ribka) dizayn, plastik/metal qoplama. Har bir rang alohida sotiladi, 4 dona to‘plam qilinadi. Vintli o‘rnatish.',
    'Конусные ножки для диванов и кресел. Рифленый дизайн, покрытие пластик/металл. Каждый цвет продается отдельно, комплектуется по 4 шт. Крепление на винт.',
    'furnitura-va-oyoqlar',
    'Furnitura va Oyoqlar',
    'Фурнитура и Ножки',
    'pcs',
    img('legs/konus-oyoq-qora-oltin-uqli.jpg'),
    [img('legs/konus-oyoq-qora-oltin-uqli.jpg'), img('legs/konus-oyoq-oltin-chiziqli.jpg'), img('legs/konus-oyoq-jigarrang-chiziqli.jpg'), img('legs/konus-oyoq-kulrang-chiziqli.jpg'), img('legs/konus-oyoq-qora-oltin-uq-2.jpg'), img('legs/konus-oyoq-qora-oltin-uq-3.jpg'), img('legs/konus-oyoq-qora-oltin-chiziqli.jpg'), img('legs/konus-oyoq-kulrang-oltin-uq.jpg'), img('legs/konus-oyoq-jigarrang-baland.jpg'), img('legs/konus-oyoq-jigarrang-ingichka.jpg'), img('legs/konus-oyoq-qora-ingichka.jpg'), img('legs/konus-oyoq-krem-keng.jpg')],
    [
      v('var-konus-qora-oltin', 'KL-01', 'Qora + oltin uch', 'Черный + золотой наконечник', 28000, [img('legs/konus-oyoq-qora-oltin-uqli.jpg')], {
        colorHex: '#1F1F1F', colorNameUz: 'Qora / oltin', colorNameRu: 'Черный / золото',
      }),
      v('var-konus-oltin', 'KL-02', 'Oltin', 'Золотой', 28000, [img('legs/konus-oyoq-oltin-chiziqli.jpg')], {
        colorHex: '#C9A227', colorNameUz: 'Oltin', colorNameRu: 'Золото',
      }),
      v('var-konus-jigarrang', 'KL-03', 'Jigarrang', 'Коричневый', 26000, [img('legs/konus-oyoq-jigarrang-chiziqli.jpg')], {
        colorHex: '#5B4234', colorNameUz: 'Jigarrang', colorNameRu: 'Коричневый',
      }),
      v('var-konus-kulrang', 'KL-04', 'Kulrang', 'Серый', 26000, [img('legs/konus-oyoq-kulrang-chiziqli.jpg')], {
        colorHex: '#6B7280', colorNameUz: 'Kulrang', colorNameRu: 'Серый',
      }),
      v('var-konus-qora', 'KL-05', 'Qora', 'Черный', 26000, [img('legs/konus-oyoq-qora-oltin-uq-2.jpg')], {
        colorHex: '#111111', colorNameUz: 'Qora', colorNameRu: 'Черный', stockStatus: 'LOW_STOCK' as StockStatus, onHandQuantity: 6,
      }),
    ],
    [
      { key: 'leg_type', labelUz: 'Oyoq turi', labelRu: 'Тип ножки', valueUz: 'Konus', valueRu: 'Конус', group: 'O‘lcham' },
      { key: 'finish', labelUz: 'Qoplama', labelRu: 'Покрытие', valueUz: 'Chiziqli (ribka)', valueRu: 'Рифленое', group: 'Material' },
      { key: 'mount', labelUz: 'O‘rnatish', labelRu: 'Крепление', valueUz: 'Vintli', valueRu: 'Винтовое', group: 'Montaj' },
    ],
    { collectionSlug: 'mebel-oyoqlar-kolleksiyasi', collectionName: 'Mebel oyoqlar kolleksiyasi', isPopular: true, isFeatured: true, crossSellProductIds: ['prod-oyoq-x-shakl', 'prod-mexanizm-universal'] }
  ),
  p(
    'prod-oyoq-piramida',
    'piramida-oyoqlar',
    'Piramida oyoqlar',
    'Пирамидальные ножки',
    'To‘rt burchakli asosli piramida oyoqlar. Divan, shkaf va stol uchun. Jigarrang, bej va kulrang ranglarda mavjud. 4 dona to‘plam uchun buyurtma qilinadi.',
    'Пирамидальные ножки с квадратным основанием. Для диванов, шкафов и столов. Доступны в коричневом, бежевом и сером цветах. Заказываются комплектом по 4 шт.',
    'furnitura-va-oyoqlar',
    'Furnitura va Oyoqlar',
    'Фурнитура и Ножки',
    'pcs',
    img('legs/piramida-oyoq-toq-jigarrang.jpg'),
    [img('legs/piramida-oyoq-toq-jigarrang.jpg'), img('legs/piramida-oyoq-jigarrang.jpg'), img('legs/piramida-oyoq-bej.jpg'), img('legs/piramida-oyoq-kulrang.jpg'), img('legs/piramida-oyoq-bej-yumaloq.jpg'), img('legs/piramida-oyoq-jigarrang-2.jpg')],
    [
      v('var-pir-jigarrang', 'PIR-01', 'Jigarrang', 'Коричневый', 22000, [img('legs/piramida-oyoq-toq-jigarrang.jpg')], {
        colorHex: '#4A3428', colorNameUz: 'Jigarrang', colorNameRu: 'Коричневый',
      }),
      v('var-pir-bej', 'PIR-02', 'Bej', 'Бежевый', 22000, [img('legs/piramida-oyoq-bej.jpg')], {
        colorHex: '#C8B89E', colorNameUz: 'Bej', colorNameRu: 'Бежевый',
      }),
      v('var-pir-kulrang', 'PIR-03', 'Kulrang', 'Серый', 22000, [img('legs/piramida-oyoq-kulrang.jpg')], {
        colorHex: '#8B8B8B', colorNameUz: 'Kulrang', colorNameRu: 'Серый',
      }),
    ],
    [
      { key: 'leg_type', labelUz: 'Oyoq turi', labelRu: 'Тип ножки', valueUz: 'Piramida', valueRu: 'Пирамида', group: 'O‘lcham' },
      { key: 'mount', labelUz: 'O‘rnatish', labelRu: 'Крепление', valueUz: 'Vintli', valueRu: 'Винтовое', group: 'Montaj' },
    ],
    { collectionSlug: 'mebel-oyoqlar-kolleksiyasi', collectionName: 'Mebel oyoqlar kolleksiyasi', isPopular: true, crossSellProductIds: ['prod-oyoq-konus-chiziqli', 'prod-oyoq-tulpan'] }
  ),
  p(
    'prod-oyoq-x-shakl',
    'x-shaklli-oyoqlar',
    'X-shaklli oyoqlar',
    'X-образные ножки',
    'Krujka shaklidagi X-oyoqlar: qora, oltin, bej, krem va kulrang. Divan va kreslolarning zamonaviy modellari uchun. Metalla biriktiriladigan keng tayanch.',
    'X-образные ножки-рюмки: черный, золотой, бежевый, кремовый и серый. Для современных моделей диванов и кресел. Широкое основание под металлический каркас.',
    'furnitura-va-oyoqlar',
    'Furnitura va Oyoqlar',
    'Фурнитура и Ножки',
    'pcs',
    img('legs/x-oyoq-qora.jpg'),
    [img('legs/x-oyoq-qora.jpg'), img('legs/x-oyoq-oltin.jpg'), img('legs/x-oyoq-bej.jpg'), img('legs/x-oyoq-krem.jpg'), img('legs/x-oyoq-kulrang.jpg'), img('legs/x-oyoq-jigarrang.jpg'), img('legs/x-oyoq-ok.jpg'), img('legs/x-oyoq-toq-jigarrang.jpg'), img('legs/x-oyoq-oltin-baland.jpg')],
    [
      v('var-x-qora', 'X-01', 'Qora', 'Черный', 32000, [img('legs/x-oyoq-qora.jpg')], {
        colorHex: '#1B1B1B', colorNameUz: 'Qora', colorNameRu: 'Черный',
      }),
      v('var-x-oltin', 'X-02', 'Oltin', 'Золотой', 35000, [img('legs/x-oyoq-oltin.jpg')], {
        colorHex: '#C9A227', colorNameUz: 'Oltin', colorNameRu: 'Золото',
      }),
      v('var-x-bej', 'X-03', 'Bej', 'Бежевый', 30000, [img('legs/x-oyoq-bej.jpg')], {
        colorHex: '#C2B294', colorNameUz: 'Bej', colorNameRu: 'Бежевый',
      }),
      v('var-x-krem', 'X-04', 'Krem', 'Кремовый', 30000, [img('legs/x-oyoq-krem.jpg')], {
        colorHex: '#E8DFCC', colorNameUz: 'Krem', colorNameRu: 'Кремовый',
      }),
      v('var-x-jigarrang', 'X-05', 'Jigarrang', 'Коричневый', 30000, [img('legs/x-oyoq-jigarrang.jpg')], {
        colorHex: '#4A3428', colorNameUz: 'Jigarrang', colorNameRu: 'Коричневый', stockStatus: 'LOW_STOCK' as StockStatus, onHandQuantity: 8,
      }),
      v('var-x-kulrang', 'X-06', 'Kulrang', 'Серый', 30000, [img('legs/x-oyoq-kulrang.jpg')], {
        colorHex: '#7A7A7A', colorNameUz: 'Kulrang', colorNameRu: 'Серый',
      }),
      v('var-x-ok', 'X-07', 'Oq', 'Белый', 30000, [img('legs/x-oyoq-ok.jpg')], {
        colorHex: '#E9E9E9', colorNameUz: 'Oq', colorNameRu: 'Белый',
      }),
    ],
    [
      { key: 'leg_type', labelUz: 'Oyoq turi', labelRu: 'Тип ножки', valueUz: 'X-shakl', valueRu: 'X-образная', group: 'O‘lcham' },
      { key: 'mount', labelUz: 'O‘rnatish', labelRu: 'Крепление', valueUz: 'Vintli', valueRu: 'Винтовое', group: 'Montaj' },
    ],
    { collectionSlug: 'mebel-oyoqlar-kolleksiyasi', collectionName: 'Mebel oyoqlar kolleksiyasi', isFeatured: true, isPopular: true, crossSellProductIds: ['prod-oyoq-konus-chiziqli', 'prod-oyoq-karkas'] }
  ),
  p(
    'prod-oyoq-tulpan',
    'tulpan-oyoqlar',
    'Tulpan oyoqlar',
    'Ножки «тюльпан»',
    'Yumaloq aylanasimon asosli tulpan oyoqlar. Oltin va kumush qoplama. Luks mebel va kofe stollari uchun.',
    'Ножки «тюльпан» с круглым основанием. Золотое и серебряное покрытие. Для премиальной мебели и журнальных столиков.',
    'furnitura-va-oyoqlar',
    'Furnitura va Oyoqlar',
    'Фурнитура и Ножки',
    'pcs',
    img('legs/tulpan-oyoq-oltin.jpg'),
    [img('legs/tulpan-oyoq-oltin.jpg'), img('legs/tulpan-oyoq-kumush.jpg'), img('legs/tulpan-oyoq-oltin-2.jpg')],
    [
      v('var-tulpan-oltin', 'TUL-01', 'Oltin', 'Золотой', 45000, [img('legs/tulpan-oyoq-oltin.jpg')], {
        colorHex: '#C9A227', colorNameUz: 'Oltin', colorNameRu: 'Золото',
      }),
      v('var-tulpan-kumush', 'TUL-02', 'Kumush', 'Серебро', 45000, [img('legs/tulpan-oyoq-kumush.jpg')], {
        colorHex: '#B9BCC1', colorNameUz: 'Kumush', colorNameRu: 'Серебро',
      }),
    ],
    [
      { key: 'leg_type', labelUz: 'Oyoq turi', labelRu: 'Тип ножки', valueUz: 'Tulpan', valueRu: 'Тюльпан', group: 'O‘lcham' },
    ],
    { collectionSlug: 'mebel-oyoqlar-kolleksiyasi', collectionName: 'Mebel oyoqlar kolleksiyasi', crossSellProductIds: ['prod-oyoq-baluster', 'prod-oyoq-piramida'] }
  ),
  p(
    'prod-oyoq-karkas',
    'karkas-oyoqlar',
    'Metall karkas oyoqlar',
    'Металлические каркасные ножки',
    'Stol, divan va kreslolar uchun mustahkam metall karkas oyoqlar. Oltin va kumush. U-shakl va poyali variantlar. Bola va kattalar mebelida barqaror o‘rnatiladi.',
    'Прочные металлические каркасные ножки для столов, диванов и кресел. Золото и серебро. Варианты U-образные и на ножках-стойках. Устойчивый монтаж.',
    'furnitura-va-oyoqlar',
    'Furnitura va Oyoqlar',
    'Фурнитура и Ножки',
    'pcs',
    img('legs/u-oyoq-oltin.jpg'),
    [img('legs/u-oyoq-oltin.jpg'), img('legs/u-oyoq-kumush.jpg'), img('legs/karkas-oyoq-oltin.jpg'), img('legs/karkas-oyoq-kumush.jpg'), img('legs/karkas-oyoq-oltin-2.jpg'), img('legs/oltin-karkas-oyoq-01.jpg'), img('legs/karkas-oyoq-kumush-2.jpg'), img('legs/y-oyoq-kumush.jpg')],
    [
      v('var-karkas-u-oltin', 'KAR-01', 'U-shakl oltin', 'U-образная золото', 68000, [img('legs/u-oyoq-oltin.jpg')], {
        colorHex: '#C9A227', colorNameUz: 'Oltin', colorNameRu: 'Золото',
      }),
      v('var-karkas-u-kumush', 'KAR-02', 'U-shakl kumush', 'U-образная серебро', 64000, [img('legs/u-oyoq-kumush.jpg')], {
        colorHex: '#B9BCC1', colorNameUz: 'Kumush', colorNameRu: 'Серебро',
      }),
      v('var-karkas-oltin', 'KAR-03', 'Poyali oltin', 'На стойке золото', 78000, [img('legs/karkas-oyoq-oltin.jpg')], {
        colorHex: '#C9A227', colorNameUz: 'Oltin', colorNameRu: 'Золото', stockStatus: 'LOW_STOCK' as StockStatus, onHandQuantity: 7,
      }),
      v('var-karkas-kumush', 'KAR-04', 'Poyali kumush', 'На стойке серебро', 74000, [img('legs/karkas-oyoq-kumush.jpg')], {
        colorHex: '#B9BCC1', colorNameUz: 'Kumush', colorNameRu: 'Серебро',
      }),
    ],
    [
      { key: 'leg_type', labelUz: 'Oyoq turi', labelRu: 'Тип ножки', valueUz: 'Karkas', valueRu: 'Каркас', group: 'O‘lcham' },
      { key: 'material', labelUz: 'Material', labelRu: 'Материал', valueUz: 'Metall', valueRu: 'Металл', group: 'Material' },
    ],
    { collectionSlug: 'mebel-oyoqlar-kolleksiyasi', collectionName: 'Mebel oyoqlar kolleksiyasi', isFeatured: true, crossSellProductIds: ['prod-oyoq-x-shakl', 'prod-mexanizm-evrokitob'] }
  ),
  p(
    'prod-oyoq-figura',
    'figura-oyoqlar-to-plami',
    'Figura oyoqlar to‘plami (4 dona)',
    'Фигурные ножки, набор (4 шт.)',
    'Haykalcha shaklidagi figura oyoqlar to‘plami. Oltin, kumush, qora va rozoviy ranglarda. Bitta to‘plam bitta kreslo yoki stol uchun yetarli.',
    'Набор фигурных ножек. Золотые, серебряные, черные и розовые. Одного набора достаточно на кресло или стол.',
    'furnitura-va-oyoqlar',
    'Furnitura va Oyoqlar',
    'Фурнитура и Ножки',
    'pcs',
    img('legs/figure-oyoqlar-to-plami-01.jpg'),
    [img('legs/figure-oyoqlar-to-plami-01.jpg'), img('legs/figure-oyoqlar-to-plami-02.jpg')],
    [
      v('var-figura-oltin', 'FIG-01', 'Oltin to‘plam', 'Золотой набор', 145000, [img('legs/figure-oyoqlar-to-plami-01.jpg')], {
        colorHex: '#C9A227', colorNameUz: 'Oltin', colorNameRu: 'Золото',
      }),
      v('var-figura-aralash', 'FIG-02', 'Aralash to‘plam', 'Смешанный набор', 135000, [img('legs/figure-oyoqlar-to-plami-02.jpg')], {
        colorHex: '#6B7280', colorNameUz: 'Aralash', colorNameRu: 'Смешанный', stockStatus: 'LOW_STOCK' as StockStatus, onHandQuantity: 5,
      }),
    ],
    [
      { key: 'leg_type', labelUz: 'Oyoq turi', labelRu: 'Тип ножки', valueUz: 'Figura', valueRu: 'Фигурная', group: 'O‘lcham' },
      { key: 'qty', labelUz: 'To‘plamda', labelRu: 'В наборе', valueUz: '4 dona', valueRu: '4 шт.', group: 'O‘lcham' },
    ],
    { collectionSlug: 'mebel-oyoqlar-kolleksiyasi', collectionName: 'Mebel oyoqlar kolleksiyasi', isNew: true, crossSellProductIds: ['prod-oyoq-baluster', 'prod-oyoq-tulpan'] }
  ),
  p(
    'prod-oyoq-baluster',
    'balyasin-oyoq',
    'Baluster (balyasin) oyoq',
    'Балясина (балясина ножка)',
    'Klassik shakldagi o‘ymakor baluster oyoq. Luks divanlar, stollar va kreslolar uchun. Oltin qoplama.',
    'Балясина классической резной формы. Для премиальных диванов, столов и кресел. Золотое покрытие.',
    'furnitura-va-oyoqlar',
    'Furnitura va Oyoqlar',
    'Фурнитура и Ножки',
    'pcs',
    img('legs/balyasin-oyoq-oltin.jpg'),
    [img('legs/balyasin-oyoq-oltin.jpg')],
    [
      v('var-baluster', 'BAL-01', 'Oltin', 'Золото', 52000, [img('legs/balyasin-oyoq-oltin.jpg')], {
        colorHex: '#C9A227', colorNameUz: 'Oltin', colorNameRu: 'Золото',
      }),
    ],
    [
      { key: 'leg_type', labelUz: 'Oyoq turi', labelRu: 'Тип ножки', valueUz: 'Balyasin', valueRu: 'Балясина', group: 'O‘lcham' },
    ],
    { collectionSlug: 'mebel-oyoqlar-kolleksiyasi', collectionName: 'Mebel oyoqlar kolleksiyasi', crossSellProductIds: ['prod-oyoq-figura', 'prod-oyoq-tulpan'] }
  ),
  p(
    'prod-oyoq-t-shakl',
    't-shaklli-oyoqlar',
    'T-shaklli oyoqlar',
    'T-образные ножки',
    'T-shakldagi poyali oyoqlar: qora va bronza. Stol va kreslolarning libos qismlari uchun. Keng tayanch kartagi bilan.',
    'T-образные ножки на стойке: черные и бронзовые. Для столов и кресел. С широкой опорной планкой.',
    'furnitura-va-oyoqlar',
    'Furnitura va Oyoqlar',
    'Фурнитура и Ножки',
    'pcs',
    img('legs/t-oyoq-qora.jpg'),
    [img('legs/t-oyoq-qora.jpg'), img('legs/t-oyoq-bronza.jpg'), img('legs/egilgan-oyoq-oltin.jpg')],
    [
      v('var-t-qora', 'T-01', 'Qora', 'Черный', 38000, [img('legs/t-oyoq-qora.jpg')], {
        colorHex: '#1B1B1B', colorNameUz: 'Qora', colorNameRu: 'Черный',
      }),
      v('var-t-bronza', 'T-02', 'Bronza', 'Бронза', 40000, [img('legs/t-oyoq-bronza.jpg')], {
        colorHex: '#6F4E37', colorNameUz: 'Bronza', colorNameRu: 'Бронза',
      }),
    ],
    [
      { key: 'leg_type', labelUz: 'Oyoq turi', labelRu: 'Тип ножки', valueUz: 'T-shakl', valueRu: 'T-образная', group: 'O‘lcham' },
    ],
    { collectionSlug: 'mebel-oyoqlar-kolleksiyasi', collectionName: 'Mebel oyoqlar kolleksiyasi', crossSellProductIds: ['prod-oyoq-karkas', 'prod-oyoq-konus-chiziqli'] }
  ),
  p(
    'prod-oyoq-ribka',
    'ribka-kolonka-oyoq',
    'Ribka kolonka oyoqlar',
    'Ножки-колонки «рибка»',
    'Vertikal chiziqli (ribka) kolonka oyoqlar. Oltin rang, kvadrat asos. Zamonaviy divan va jurnallar stoli uchun.',
    'Колонки с вертикальным рифлением. Золотой цвет, квадратное основание. Для современных диванов и журнальных столиков.',
    'furnitura-va-oyoqlar',
    'Furnitura va Oyoqlar',
    'Фурнитура и Ножки',
    'pcs',
    img('legs/oltin-ribka-kolonka-oyoq.jpg'),
    [img('legs/oltin-ribka-kolonka-oyoq.jpg'), img('legs/konus-oyoq-oltin-keng.jpg')],
    [
      v('var-ribka', 'RIB-01', 'Oltin', 'Золото', 48000, [img('legs/oltin-ribka-kolonka-oyoq.jpg')], {
        colorHex: '#C9A227', colorNameUz: 'Oltin', colorNameRu: 'Золото',
      }),
    ],
    [
      { key: 'leg_type', labelUz: 'Oyoq turi', labelRu: 'Тип ножки', valueUz: 'Ribka', valueRu: 'Рибка', group: 'O‘lcham' },
    ],
    { collectionSlug: 'mebel-oyoqlar-kolleksiyasi', collectionName: 'Mebel oyoqlar kolleksiyasi', isNew: true, crossSellProductIds: ['prod-oyoq-konus-chiziqli', 'prod-oyoq-tulpan'] }
  ),
  p(
    'prod-oyoq-dekor',
    'dekor-oyoqlar',
    'Dekor oyoqlar (premium)',
    'Декоративные ножки (премиум)',
    'Ko‘k, jigarrang va qora dekor oyoqlar — marmar fonli namuna suratlar asosida. Turmush xonalari va premium kreslolar uchun. Bitta to‘plam 4 dona.',
    'Декоративные ножки синего, коричневого и черного цветов — образцы на мраморе. Для гостиных и премиальных кресел. Комплект из 4 шт.',
    'furnitura-va-oyoqlar',
    'Furnitura va Oyoqlar',
    'Фурнитура и Ножки',
    'pcs',
    img('legs/konus-oyoq-koq-marmar.jpg'),
    [img('legs/konus-oyoq-koq-marmar.jpg'), img('legs/konus-oyoq-jigarrang-marmar.jpg'), img('legs/konus-oyoq-qora-marmar.jpg')],
    [
      v('var-dekor-koq', 'DEK-01', 'To‘q ko‘k', 'Темно-синий', 36000, [img('legs/konus-oyoq-koq-marmar.jpg')], {
        colorHex: '#1E2C4C', colorNameUz: 'To‘q ko‘k', colorNameRu: 'Темно-синий',
      }),
      v('var-dekor-jigarrang', 'DEK-02', 'Jigarrang', 'Коричневый', 34000, [img('legs/konus-oyoq-jigarrang-marmar.jpg')], {
        colorHex: '#4A3428', colorNameUz: 'Jigarrang', colorNameRu: 'Коричневый',
      }),
      v('var-dekor-qora', 'DEK-03', 'Qora / oltin halqa', 'Черный / золотое кольцо', 38000, [img('legs/konus-oyoq-qora-marmar.jpg')], {
        colorHex: '#141414', colorNameUz: 'Qora', colorNameRu: 'Черный',
      }),
    ],
    [
      { key: 'leg_type', labelUz: 'Oyoq turi', labelRu: 'Тип ножки', valueUz: 'Dekor', valueRu: 'Декоративная', group: 'O‘lcham' },
    ],
    { collectionSlug: 'mebel-oyoqlar-kolleksiyasi', collectionName: 'Mebel oyoqlar kolleksiyasi', isPopular: true }
  ),

  // ── ASBOBLAR VA SARF ───────────────────────────────────────────────────────
  p(
    'prod-pnevmatik-8016',
    'pnevmatik-stepler-8016',
    'Pnevmatik stepler 8016',
    'Пневмостеплер 8016',
    'Mebel qoplash ishlari uchun JIN JAN pnevmatik stepler. 16 mm skoba bilan ishlaydi, yengil va tezkor. Kompressor bilan ishlatiladi. Ustaxonalar uchun asosiy ish quroli.',
    'Пневмостеплер JIN JAN для обивки мебели. Работает скобой 16 мм, легкий и быстрый. Работает от компрессора. Основной инструмент цеха.',
    'sarf-materiallar-va-instrumentlar',
    'Asboblar va Sarf materiallari',
    'Инструменты и Расходники',
    'pcs',
    img('tools/stepler-8016-sariq.jpg'),
    [img('tools/stepler-8016-sariq.jpg'), img('tools/pnevmatik-komplekt-01.jpg'), img('tools/pnevmatik-komplekt-02.jpg'), img('tools/stepler-sariq-yon.jpg'), img('tools/jinjan-stepler-quti.jpg')],
    [
      v('var-8016', '8016', 'Pnevmatik stepler 8016', 'Пневмостеплер 8016', 390000, [img('tools/stepler-8016-sariq.jpg')], {
        onHandQuantity: 46,
      }),
    ],
    [
      { key: 'power_type', labelUz: 'Quvvat turi', labelRu: 'Тип питания', valueUz: 'Pnevmatik', valueRu: 'Пневматический', group: 'Texnik' },
      { key: 'brand', labelUz: 'Brend', labelRu: 'Бренд', valueUz: 'JIN JAN', valueRu: 'JIN JAN', group: 'Texnik' },
    ],
    { brand: 'JIN JAN', collectionSlug: 'jinjan-pnevmatika-kolleksiyasi', collectionName: 'JIN JAN pnevmatika kolleksiyasi', isFeatured: true, isPopular: true, crossSellProductIds: ['prod-pnevmatik-f30', 'prod-skoba-8016', 'prod-pnevmatik-komplekt'] }
  ),
  p(
    'prod-pnevmatik-f30',
    'pnevmatik-nailer-f30',
    'Pnevmatik nailer F30',
    'Пневмогвоздезабивной пистолет F30',
    'Mebel karkaslari va fanerani mixlash uchun pnevmatik nailer. 30 mm gacha tirnoq bilan ishlaydi. Qizil va sariq korpusli variantlar mavjud.',
    'Пневматический гвоздезабивной пистолет для мебельных каркасов и фанеры. Работает гвоздем до 30 мм. Есть варианты в красном и желтом корпусе.',
    'sarf-materiallar-va-instrumentlar',
    'Asboblar va Sarf materiallari',
    'Инструменты и Расходники',
    'pcs',
    img('tools/pnevmatik-nayler-juftlik.jpg'),
    [img('tools/pnevmatik-nayler-juftlik.jpg'), img('tools/stepler-qizil-komplekt.jpg'), img('tools/pnevmatik-komplekt-04.jpg')],
    [
      v('var-f30', 'F30', 'Pnevmatik nailer F30', 'Пневмопистолет F30', 480000, [img('tools/pnevmatik-nayler-juftlik.jpg')], {
        onHandQuantity: 28,
      }),
    ],
    [
      { key: 'power_type', labelUz: 'Quvvat turi', labelRu: 'Тип питания', valueUz: 'Pnevmatik', valueRu: 'Пневматический', group: 'Texnik' },
      { key: 'brand', labelUz: 'Brend', labelRu: 'Бренд', valueUz: 'JIN JAN', valueRu: 'JIN JAN', group: 'Texnik' },
    ],
    { brand: 'JIN JAN', collectionSlug: 'jinjan-pnevmatika-kolleksiyasi', collectionName: 'JIN JAN pnevmatika kolleksiyasi', isFeatured: true, isNew: true, crossSellProductIds: ['prod-pnevmatik-8016', 'prod-pnevmatik-st64', 'prod-skoba-k416'] }
  ),
  p(
    'prod-pnevmatik-st64',
    'pnevmatik-stepler-st64',
    'Pnevmatik stepler ST64',
    'Пневмостеплер ST64',
    'Og‘ir ishlar uchun pnevmatik stepler ST64: qalin mato va charm, ichki karkas. Uzun kronshteynli modifikatsiya mavjud.',
    'Пневмостеплер ST64 для тяжелых работ: плотные ткани и кожа, внутренний каркас. Есть модификация с длинным носиком.',
    'sarf-materiallar-va-instrumentlar',
    'Asboblar va Sarf materiallari',
    'Инструменты и Расходники',
    'pcs',
    img('tools/uzun-stepler-sariq.jpg'),
    [img('tools/uzun-stepler-sariq.jpg'), img('tools/pnevmatik-komplekt-03.jpg'), img('tools/stepler-sariq-yon.jpg')],
    [
      v('var-st64', 'ST64', 'Pnevmatik stepler ST64', 'Пневмостеплер ST64', 520000, [img('tools/uzun-stepler-sariq.jpg')], {
        onHandQuantity: 17,
      }),
    ],
    [
      { key: 'power_type', labelUz: 'Quvvat turi', labelRu: 'Тип питания', valueUz: 'Pnevmatik', valueRu: 'Пневматический', group: 'Texnik' },
      { key: 'brand', labelUz: 'Brend', labelRu: 'Бренд', valueUz: 'JIN JAN', valueRu: 'JIN JAN', group: 'Texnik' },
    ],
    { brand: 'JIN JAN', collectionSlug: 'jinjan-pnevmatika-kolleksiyasi', collectionName: 'JIN JAN pnevmatika kolleksiyasi', crossSellProductIds: ['prod-pnevmatik-8016', 'prod-skoba-koq'] }
  ),
  p(
    'prod-pnevmatik-komplekt',
    'pnevmatik-asboblar-komplekti',
    'Pnevmatik asboblar komplekti (to‘liq)',
    'Комплект пневмоинструментов (полный)',
    'Ustaxona uchun to‘liq komplekt: steplerlar, nailerlar va zaxira qismlar. Yirik fabrikalarga maxsus narx. Klient talabiga qarab tuziladi.',
    'Полный комплект для цеха: степлеры, гвоздезабивные пистолеты и запасные части. Спеццены для крупных фабрик. Собирается по запросу клиента.',
    'sarf-materiallar-va-instrumentlar',
    'Asboblar va Sarf materiallari',
    'Инструменты и Расходники',
    'pcs',
    img('tools/pnevmatik-komplekt-01.jpg'),
    [img('tools/pnevmatik-komplekt-01.jpg'), img('tools/pnevmatik-komplekt-02.jpg'), img('tools/pnevmatik-komplekt-03.jpg'), img('tools/pnevmatik-komplekt-04.jpg'), img('tools/pnevmatik-komplekt-05.jpg')],
    [
      v('var-komplekt', 'PKT-01', 'Komplekt (5 asbob)', 'Комплект (5 инструментов)', 1850000, [img('tools/pnevmatik-komplekt-01.jpg')], {
        onHandQuantity: 9,
      }),
    ],
    [
      { key: 'power_type', labelUz: 'Quvvat turi', labelRu: 'Тип питания', valueUz: 'Pnevmatik', valueRu: 'Пневматический', group: 'Texnik' },
    ],
    { brand: 'JIN JAN', collectionSlug: 'jinjan-pnevmatika-kolleksiyasi', collectionName: 'JIN JAN pnevmatika kolleksiyasi', isPopular: true, crossSellProductIds: ['prod-pnevmatik-8016', 'prod-pnevmatik-f30', 'prod-skoba-8016'] }
  ),
  p(
    'prod-otvyortka',
    'otvyortka-to-plami',
    'Otvyortka to‘plami',
    'Набор отверток',
    'Mebel yig‘ish va ta’mirlash uchun otvyortka to‘plami. Qizil tutqichli, 3 dona. Ustaxona ish stoli uchun zarur.',
    'Набор отверток для сборки и ремонта мебели. Красные рукоятки, 3 шт. Необходим на верстаке цеха.',
    'sarf-materiallar-va-instrumentlar',
    'Asboblar va Sarf materiallari',
    'Инструменты и Расходники',
    'pcs',
    img('tools/otvyortka-to-plami-01.jpg'),
    [img('tools/otvyortka-to-plami-01.jpg'), img('tools/otvyortka-to-plami-02.jpg'), img('tools/otvyortka-to-plami-03.jpg')],
    [
      v('var-otvyortka', 'OTV-01', 'To‘plam (3 dona)', 'Набор (3 шт.)', 45000, [img('tools/otvyortka-to-plami-01.jpg')], {
        onHandQuantity: 64,
      }),
    ],
    [
      { key: 'power_type', labelUz: 'Turi', labelRu: 'Тип', valueUz: 'Qo‘l asbobi', valueRu: 'Ручной инструмент', group: 'Texnik' },
    ],
    { crossSellProductIds: ['prod-burchak-plastina', 'prod-skoba-8016'] }
  ),
  p(
    'prod-bo-yoq-purkagich',
    'pnevmatik-bo-yoq-purkagich',
    'Pnevmatik bo‘yoq purkagich (2 dona)',
    'Пневмокраскопульт (2 шт.)',
    'Mebel qismlarini bo‘yash uchun pnevmatik purkagich. Ikki kassetali, metall emallar va laklar bilan ishlaydi.',
    'Пневматический краскопульт для окраски мебельных деталей. Двухбачковый, работает с эмалями и лаками.',
    'sarf-materiallar-va-instrumentlar',
    'Asboblar va Sarf materiallari',
    'Инструменты и Расходники',
    'pcs',
    img('tools/bo-yoq-purkagich.jpg'),
    [img('tools/bo-yoq-purkagich.jpg')],
    [
      v('var-purkagich', 'BPK-01', 'Komplekt (2 dona)', 'Комплект (2 шт.)', 890000, [img('tools/bo-yoq-purkagich.jpg')], {
        onHandQuantity: 6,
      }),
    ],
    [
      { key: 'power_type', labelUz: 'Quvvat turi', labelRu: 'Тип питания', valueUz: 'Pnevmatik purkagich', valueRu: 'Пневматический краскопульт', group: 'Texnik' },
    ],
    { collectionSlug: 'jinjan-pnevmatika-kolleksiyasi', collectionName: 'JIN JAN pnevmatika kolleksiyasi', crossSellProductIds: ['prod-pnevmatik-8016'] }
  ),

  // ── SKOBALAR ───────────────────────────────────────────────────────────────
  p(
    'prod-skoba-8016',
    'skobalar-80-seriya',
    'Skobalar 80 seriya (16–20 mm)',
    'Скобы 80 серии (16–20 мм)',
    'Pnevmatik steplerlar uchun skoba kassalari: ko‘k, sariq va apelsin qutilarda. 16, 18 va 20 mm. Bir quti 1000 ta skoba.',
    'Кассеты скоб для пневмостеплеров: синие, желтые и оранжевые коробки. 16, 18 и 20 мм. В коробке 1000 скоб.',
    'sarf-materiallar-va-instrumentlar',
    'Asboblar va Sarf materiallari',
    'Инструменты и Расходники',
    'pack',
    img('consumables/skoba-orange-quti-01.jpg'),
    [img('consumables/skoba-orange-quti-01.jpg'), img('consumables/skoba-orange-quti-02.jpg'), img('consumables/skoba-orange-quti-03.jpg'), img('consumables/skoba-fst20-01.jpg'), img('consumables/skoba-fst20-02.jpg')],
    [
      v('var-skoba-16', 'SK-16', '16 mm (1000 dona)', '16 мм (1000 шт.)', 25000, [img('consumables/skoba-orange-quti-01.jpg')], {
        onHandQuantity: 180,
      }),
      v('var-skoba-20', 'SK-20', '20 mm (1000 dona)', '20 мм (1000 шт.)', 28000, [img('consumables/skoba-orange-quti-02.jpg')], {
        onHandQuantity: 140,
      }),
      v('var-skoba-fst20', 'SK-FST', 'FST-20 (1000 dona)', 'FST-20 (1000 шт.)', 30000, [img('consumables/skoba-fst20-01.jpg')], {
        onHandQuantity: 95,
      }),
    ],
    [
      { key: 'power_type', labelUz: 'Guruh', labelRu: 'Группа', valueUz: 'Skoba', valueRu: 'Скобы', group: 'Texnik' },
      { key: 'brand', labelUz: 'Brend', labelRu: 'Бренд', valueUz: 'JIN JAN', valueRu: 'JIN JAN', group: 'Texnik' },
    ],
    { collectionSlug: 'ustaxona-sarf-materiallari', collectionName: 'Ustaxona sarf materiallari', isFeatured: true, isPopular: true, crossSellProductIds: ['prod-pnevmatik-8016', 'prod-pnevmatik-f30', 'prod-kley-stik'] }
  ),
  p(
    'prod-skoba-k416',
    'skobalar-k416',
    'Skobalar K416 (yuqori sifatli)',
    'Скобы K416 (высокоуглеродистые)',
    'Yuqori uglerodli K416 markali mustahkam skobalar. Qalin po‘stin qoplamalar va zımbalash ishlari uchun. Og‘ir yuklamaga chidaydi.',
    'Высокоуглеродистые скобы K416. Для плотных обивок и степлерных работ. Выдерживают тяжелые нагрузки.',
    'sarf-materiallar-va-instrumentlar',
    'Asboblar va Sarf materiallari',
    'Инструменты и Расходники',
    'pack',
    img('consumables/skoba-k416.jpg'),
    [img('consumables/skoba-k416.jpg'), img('consumables/skoba-qutilar-tarozi.jpg'), img('consumables/skoba-qutilar-01.jpg')],
    [
      v('var-k416', 'SK-K416', 'K416 (1000 dona)', 'K416 (1000 шт.)', 35000, [img('consumables/skoba-k416.jpg')], {
        onHandQuantity: 110,
      }),
    ],
    [
      { key: 'power_type', labelUz: 'Guruh', labelRu: 'Группа', valueUz: 'Skoba', valueRu: 'Скобы', group: 'Texnik' },
    ],
    { collectionSlug: 'ustaxona-sarf-materiallari', collectionName: 'Ustaxona sarf materiallari', crossSellProductIds: ['prod-pnevmatik-f30', 'prod-skoba-8016'] }
  ),
  p(
    'prod-skoba-koq',
    'skobalar-koq-seriya',
    'Skobalar ko‘k seriya (10–25 mm)',
    'Скобы синей серии (10–25 мм)',
    'Turli o‘lchamdagi ko‘k kassali skobalar: 10, 15, 20 va 25 mm. Standard steplerlar bilan mos. Fabrikalar uchun korobka xaridida chegirma.',
    'Скобы в синих кассетах разных размеров: 10, 15, 20 и 25 мм. Совместимы со стандартными степлерами. Скидка при коробочной закупке.',
    'sarf-materiallar-va-instrumentlar',
    'Asboblar va Sarf materiallari',
    'Инструменты и Расходники',
    'pack',
    img('consumables/skoba-koq-01.jpg'),
    [img('consumables/skoba-koq-01.jpg'), img('consumables/skoba-koq-02.jpg'), img('consumables/skoba-koq-03.jpg'), img('consumables/skoba-koq-04.jpg'), img('consumables/skoba-jinjan-k414.jpg')],
    [
      v('var-skok-10', 'SKS-10', '10 mm (1000 dona)', '10 мм (1000 шт.)', 18000, [img('consumables/skoba-koq-01.jpg')], {
        onHandQuantity: 220,
      }),
      v('var-skok-15', 'SKS-15', '15 mm (1000 dona)', '15 мм (1000 шт.)', 21000, [img('consumables/skoba-koq-02.jpg')], {
        onHandQuantity: 195,
      }),
      v('var-skok-20', 'SKS-20', '20 mm (1000 dona)', '20 мм (1000 шт.)', 24000, [img('consumables/skoba-koq-03.jpg')], {
        onHandQuantity: 150,
      }),
      v('var-skok-25', 'SKS-25', '25 mm (1000 dona)', '25 мм (1000 шт.)', 27000, [img('consumables/skoba-koq-04.jpg')], {
        onHandQuantity: 88, stockStatus: 'LOW_STOCK' as StockStatus,
      }),
    ],
    [
      { key: 'power_type', labelUz: 'Guruh', labelRu: 'Группа', valueUz: 'Skoba', valueRu: 'Скобы', group: 'Texnik' },
    ],
    { collectionSlug: 'ustaxona-sarf-materiallari', collectionName: 'Ustaxona sarf materiallari', isPopular: true, crossSellProductIds: ['prod-pnevmatik-8016', 'prod-pnevmatik-st64'] }
  ),

  // ── YELIM, REZINA, METALL ──────────────────────────────────────────────────
  p(
    'prod-kley-stik',
    'kley-stiklar',
    'Kley stiklar (to‘plam)',
    'Клеевые стики (набор)',
    'Termo kley stiklar: uzun va qisqa paketlarda. Mato, paralon va yog‘och qismlarni yopishtirishda ishlatiladi. Paketda 12–30 dona.',
    'Термоклеевые стики в длинных и коротких упаковках. Для склеивания ткани, поролона и деревянных деталей. В упаковке 12–30 шт.',
    'sarf-materiallar-va-instrumentlar',
    'Asboblar va Sarf materiallari',
    'Инструменты и Расходники',
    'pack',
    img('consumables/kley-stiklar-01.jpg'),
    [img('consumables/kley-stiklar-01.jpg'), img('consumables/kley-stiklar-02.jpg'), img('consumables/kley-stiklar-03.jpg'), img('consumables/kley-stiklar-04.jpg'), img('consumables/kley-stiklar-05.jpg')],
    [
      v('var-stik-12', 'KL-12', 'Paket 12 dona', 'Упаковка 12 шт.', 12000, [img('consumables/kley-stiklar-01.jpg')], {
        onHandQuantity: 260,
      }),
      v('var-stik-24', 'KL-24', 'Paket 24 dona', 'Упаковка 24 шт.', 20000, [img('consumables/kley-stiklar-02.jpg')], {
        onHandQuantity: 180,
      }),
      v('var-stik-30', 'KL-30', 'Paket 30 dona', 'Упаковка 30 шт.', 24000, [img('consumables/kley-stiklar-03.jpg')], {
        onHandQuantity: 120,
      }),
    ],
    [
      { key: 'power_type', labelUz: 'Guruh', labelRu: 'Группа', valueUz: 'Kley', valueRu: 'Клей', group: 'Texnik' },
    ],
    { collectionSlug: 'ustaxona-sarf-materiallari', collectionName: 'Ustaxona sarf materiallari', isFeatured: true, isPopular: true, crossSellProductIds: ['prod-makrofix-yelim', 'prod-oyoq-ribka', 'prod-paralon-korner'] }
  ),
  p(
    'prod-makrofix-yelim',
    'makrofix-kontakt-yelim',
    'Makrofix kontakt yelim',
    'Контактный клей Makrofix',
    'Makrofix kontakt yelim — mato, charm va paralonni yopishtirish uchun. Katta hajmli bochkalarda yetkaziladi. Fabrikalar uchun alohida narx.',
    'Контактный клей Makrofix для ткани, кожи и поролона. Поставляется в больших емкостях. Для фабрик — отдельная цена.',
    'sarf-materiallar-va-instrumentlar',
    'Asboblar va Sarf materiallari',
    'Инструменты и Расходники',
    'pack',
    img('consumables/makrofix-yelim.jpg'),
    [img('consumables/makrofix-yelim.jpg')],
    [
      v('var-makrofix', 'MFX-01', 'Katta hajm (bochka)', 'Большая емкость (бочка)', 75000, [img('consumables/makrofix-yelim.jpg')], {
        onHandQuantity: 35,
      }),
    ],
    [
      { key: 'power_type', labelUz: 'Guruh', labelRu: 'Группа', valueUz: 'Kley', valueRu: 'Клей', group: 'Texnik' },
    ],
    { collectionSlug: 'ustaxona-sarf-materiallari', collectionName: 'Ustaxona sarf materiallari', isNew: true, crossSellProductIds: ['prod-kley-stik', 'prod-pnevmatik-8016'] }
  ),
  p(
    'prod-rezina-tasma',
    'rezina-tasmalar',
    'Rezina tasmalar (bog‘ich)',
    'Резиновые стяжки',
    'Divan o‘rindig‘i va yotish joyi uchun elastik rezina tasmalar. Kichik, o‘rta va katta rulonlarda. Kuchlanish darajasi turlicha.',
    'Эластичные резиновые стяжки для сидений и спальных мест диванов. В малых, средних и больших бухтах. Разная степень натяжения.',
    'sarf-materiallar-va-instrumentlar',
    'Asboblar va Sarf materiallari',
    'Инструменты и Расходники',
    'meter',
    img('consumables/rezina-tasma-01.jpg'),
    [img('consumables/rezina-tasma-01.jpg'), img('consumables/rezina-tasma-02.jpg'), img('consumables/rezina-tasma-03.jpg')],
    [
      v('var-rezina-1', 'RZ-1', 'Ingichka (rulon)', 'Тонкая (бухта)', 8500, [img('consumables/rezina-tasma-01.jpg')], {
        onHandQuantity: 420, quantityStep: 0.5,
      }),
      v('var-rezina-2', 'RZ-2', 'O‘rta (rulon)', 'Средняя (бухта)', 10500, [img('consumables/rezina-tasma-02.jpg')], {
        onHandQuantity: 310, quantityStep: 0.5,
      }),
      v('var-rezina-3', 'RZ-3', 'Qalin (rulon)', 'Толстая (бухта)', 13500, [img('consumables/rezina-tasma-03.jpg')], {
        onHandQuantity: 175, quantityStep: 0.5,
      }),
    ],
    [
      { key: 'power_type', labelUz: 'Guruh', labelRu: 'Группа', valueUz: 'Rezina', valueRu: 'Резина', group: 'Texnik' },
    ],
    { collectionSlug: 'ustaxona-sarf-materiallari', collectionName: 'Ustaxona sarf materiallari', isPopular: true, crossSellProductIds: ['prod-paralon-korner', 'prod-mexanizm-universal'] }
  ),
  p(
    'prod-burchak-plastina',
    'mebel-burchak-plastinalari',
    'Metall burchak plastinalar',
    'Металлические уголки',
    'Mebel karkaslarini mustahkamlash uchun o‘yilgan burchak plastinalar. O‘lchamlari har xil, kuchli qotishmali metall. Quti bilan sotiladi.',
    'Перфорированные металлические уголки для усиления мебельных каркасов. Разные размеры, прочный сплав. Продаются коробками.',
    'sarf-materiallar-va-instrumentlar',
    'Asboblar va Sarf materiallari',
    'Инструменты и Расходники',
    'pack',
    img('consumables/burchak-plastina-01.jpg'),
    [img('consumables/burchak-plastina-01.jpg'), img('consumables/burchak-plastina-02.jpg'), img('consumables/burchak-plastina-03.jpg'), img('consumables/burchak-plastina-04.jpg')],
    [
      v('var-burchak', 'BP-01', 'Quti (100 dona)', 'Коробка (100 шт.)', 65000, [img('consumables/burchak-plastina-01.jpg')], {
        onHandQuantity: 90,
      }),
    ],
    [
      { key: 'power_type', labelUz: 'Guruh', labelRu: 'Группа', valueUz: 'Metall', valueRu: 'Металл', group: 'Texnik' },
    ],
    { collectionSlug: 'ustaxona-sarf-materiallari', collectionName: 'Ustaxona sarf materiallari', crossSellProductIds: ['prod-otvyortka', 'prod-mexanizm-universal'] }
  ),
];
