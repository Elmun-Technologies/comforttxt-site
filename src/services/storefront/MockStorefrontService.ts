import {
  IStorefrontService,
  HomepageData,
  StorefrontSearchResult,
} from './StorefrontService';
import {
  StorefrontProduct,
  StorefrontCategory,
  StorefrontCollection,
  StorefrontProductFilter,
  StorefrontCartPricing,
  StorefrontCartItemInput,
  StorefrontOrderInput,
  StorefrontOrderResult,
  StorefrontLeadInput,
  StorefrontLeadResult,
  StorefrontCustomer,
  StorefrontCustomerOrder,
} from './types';
import { enrichMockProduct } from './mockEnrichment';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * MOCK (DEVELOPMENT-ONLY) STOREFRONT DATA
 * ─────────────────────────────────────────────────────────────────────────────
 * Everything in this file is DEMO FIXTURE data used to exercise the UI until
 * ShopFlow integration. It is intentionally NEUTRAL:
 *   - no real-looking product claims (Martindale cycles, Easy Clean, densities)
 *   - no invented brands, collections, customers, orders or discounts
 *   - no fake contact/business details (those live in `storefrontConfig`)
 * ShopFlow will replace all of this data in production.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const MOCK_CATEGORIES: StorefrontCategory[] = [
  {
    id: 'cat-fabrics',
    slug: 'mebel-matolari',
    nameUz: 'Mebel matolari',
    nameRu: 'Мебельные ткани',
    descriptionUz: 'Velyur, bukle, shenill, rogojka, mikrofibra va eko-charm matolari',
    descriptionRu: 'Велюр, букле, шенилл, рогожка, микрофибра и эко-кожа',
    iconName: 'Palette',
    image: '/images/categories/fabrics.jpg',
    productCount: 24,
    subcategories: [
      { slug: 'velyur', nameUz: 'Velyur matolar', nameRu: 'Велюровые ткани' },
      { slug: 'bukle', nameUz: 'Bukle matolar', nameRu: 'Букле ткани' },
      { slug: 'shenill', nameUz: 'Shenill matolar', nameRu: 'Шенилл ткани' },
      { slug: 'rogojka', nameUz: 'Rogojka matolar', nameRu: 'Рогожка ткани' },
      { slug: 'mikrofibra', nameUz: 'Mikrofibra', nameRu: 'Микрофибра' },
      { slug: 'eko-charm', nameUz: 'Eko-charm', nameRu: 'Эко-кожа' },
    ],
  },
  {
    id: 'cat-foam',
    slug: 'paralon',
    nameUz: 'Paralon (Porolon)',
    nameRu: 'Поролон (ППУ)',
    descriptionUz: 'ST, EL, HR markali har xil zichlik va qalinlikdagi mebel paralonlari',
    descriptionRu: 'Поролон различной плотности и толщины марок ST, EL, HR',
    iconName: 'Layers',
    image: '/images/categories/foam.jpg',
    productCount: 16,
    subcategories: [
      { slug: 'st-standart', nameUz: 'ST Standart', nameRu: 'ST Стандарт' },
      { slug: 'el-qattiq', nameUz: 'EL Yuqori qattiqlik', nameRu: 'EL Повышенная жесткость' },
      { slug: 'hr-elastik', nameUz: 'HR Yuqori elastik', nameRu: 'HR Высокоэластичный' },
    ],
  },
  {
    id: 'cat-mechanisms',
    slug: 'mexanizmlar',
    nameUz: 'Transformatsiya mexanizmlari',
    nameRu: 'Механизмы трансформации',
    descriptionUz: 'Divan, krovat va stullar uchun transformatsiya mexanizmlari va gaz-liftlar',
    descriptionRu: 'Механизмы трансформации и газ-лифты для диванов, кроватей и стульев',
    iconName: 'Settings',
    image: '/images/categories/mechanisms.jpg',
    productCount: 12,
    subcategories: [
      { slug: 'delfin', nameUz: 'Delfin mexanizmi', nameRu: 'Механизм Дельфин' },
      { slug: 'akkordeon', nameUz: 'Akkordeon', nameRu: 'Аккордеон' },
      { slug: 'gaz-lift', nameUz: 'Gaz-liftlar', nameRu: 'Газ-лифты' },
      { slug: 'tik-tak', nameUz: 'Tik-Tak (Pantograf)', nameRu: 'Тик-Так (Пантограф)' },
    ],
  },
  {
    id: 'cat-hardware',
    slug: 'furnitura-va-oyoqlar',
    nameUz: 'Furnitura va Oyoqlar',
    nameRu: 'Фурнитура и Ножки',
    descriptionUz: 'Mebel oyoqlari, petlyalar, tortma yo‘naltirgichlari va aksessuarlar',
    descriptionRu: 'Мебельные ножки, петли, направляющие для ящиков и аксессуары',
    iconName: 'Wrench',
    image: '/images/categories/hardware.jpg',
    productCount: 30,
    subcategories: [
      { slug: 'oyoqlar', nameUz: 'Mebel oyoqlari', nameRu: 'Мебельные ножки' },
      { slug: 'petlyalar', nameUz: 'Petlyalar', nameRu: 'Петли' },
      { slug: 'napravlyayushie', nameUz: 'Yo‘naltirgichlar', nameRu: 'Направляющие' },
    ],
  },
  {
    id: 'cat-tools',
    slug: 'sarf-materiallar-va-instrumentlar',
    nameUz: 'Asboblar va Sarf materiallari',
    nameRu: 'Инструменты и Расходники',
    descriptionUz: 'Pnevmatik steplerlar, yelimlar, skobalar va montaj anjomlari',
    descriptionRu: 'Пневмостеплеры, клей, скобы и монтажные принадлежности',
    iconName: 'Hammer',
    image: '/images/categories/tools.jpg',
    productCount: 18,
    subcategories: [
      { slug: 'pnevmatik', nameUz: 'Pnevmatik steplerlar', nameRu: 'Пневмостеплеры' },
      { slug: 'yelim', nameUz: 'Mebel yelimlari', nameRu: 'Мебельный клей' },
      { slug: 'skoba', nameUz: 'Skobalar', nameRu: 'Скобы' },
    ],
  },
];

export const MOCK_COLLECTIONS: StorefrontCollection[] = [
  {
    id: 'col-velyur',
    slug: 'velyur-kolleksiyasi',
    name: 'Velyur matolar to‘plami',
    descriptionUz: 'Yumshoq baxmal fakturali velyur matolar tanlovi',
    descriptionRu: 'Подборка велюровых тканей с мягкой бархатистой фактурой',
    image: '/images/categories/fabrics.jpg',
    productCount: 6,
  },
  {
    id: 'col-shenill',
    slug: 'shenill-kolleksiyasi',
    name: 'Shenill matolar to‘plami',
    descriptionUz: 'Qalin va hajmli to‘qimali shenill matolar tanlovi',
    descriptionRu: 'Подборка шенилловых тканей с плотной объемной структурой',
    image: '/images/categories/fabrics.jpg',
    productCount: 4,
  },
  {
    id: 'col-bukle',
    slug: 'bukle-kolleksiyasi',
    name: 'Bukle matolar to‘plami',
    descriptionUz: 'Tugunchali fakturaga ega bukle matolar tanlovi',
    descriptionRu: 'Подборка букле с выразительной узелковой фактурой',
    image: '/images/categories/fabrics.jpg',
    productCount: 5,
  },
  {
    id: 'col-ustaxona',
    slug: 'ustaxona-to-plami',
    name: 'Ustaxona to‘plami',
    descriptionUz: 'Mebel sexlari uchun talabgir sarf materiallari tanlovi',
    descriptionRu: 'Набор востребованных расходных материалов для мебельных цехов',
    image: '/images/categories/tools.jpg',
    productCount: 8,
  },
];

export const MOCK_PRODUCTS: StorefrontProduct[] = [
  {
    id: 'prod-velyur-01',
    slug: 'velyur-mato-premium',
    titleUz: 'Velyur mato (baxmal faktura)',
    titleRu: 'Велюровая ткань (бархатистая фактура)',
    descriptionUz:
      'Yumshoq baxmal fakturali velyur mato. Ranglar palitrasini ko‘rib, mijozingizga mos variantni tanlang.',
    descriptionRu:
      'Велюровая ткань с мягкой бархатистой фактурой. Выберите подходящий оттенок из палитры.',
    categorySlug: 'mebel-matolari',
    categoryNameUz: 'Mebel matolari',
    categoryNameRu: 'Мебельные ткани',
    collectionSlug: 'velyur-kolleksiyasi',
    collectionName: 'Velyur matolar to‘plami',
    unitType: 'meter',
    minQtyStep: 0.5,
    primaryImage: '/images/categories/fabrics.jpg',
    images: ['/images/categories/fabrics.jpg'],
    isFeatured: true,
    isPopular: true,
    isNew: true,
    crossSellProductIds: ['prod-yelim-sprey', 'prod-paralon-st2536', 'prod-pnevmatik-8016'],
    specs: [
      { key: 'texture', labelUz: 'Faktura turi', labelRu: 'Текстура', valueUz: 'Velyur', valueRu: 'Велюр' },
    ],
    variants: [
      {
        id: 'var-velyur-01',
        sku: 'LUNA-01',
        nameUz: 'Sutli krem',
        nameRu: 'Молочный',
        colorHex: '#F5F5DC',
        colorNameUz: 'Sutli krem',
        colorNameRu: 'Молочный',
        price: 68000,
        wholesalePrice: 52000,
        hasWholesale: true,
        stockStatus: 'IN_STOCK',
        quantityStep: 0.5,
        minQuantity: 1.0,
        images: ['/images/categories/fabrics.jpg'],
        isAvailable: true,
      },
      {
        id: 'var-velyur-04',
        sku: 'LUNA-04',
        nameUz: 'Klassik bej',
        nameRu: 'Бежевый',
        colorHex: '#D2B48C',
        colorNameUz: 'Klassik bej',
        colorNameRu: 'Бежевый',
        price: 68000,
        wholesalePrice: 52000,
        hasWholesale: true,
        stockStatus: 'IN_STOCK',
        quantityStep: 0.5,
        minQuantity: 1.0,
        images: ['/images/categories/fabrics.jpg'],
        isAvailable: true,
      },
      {
        id: 'var-velyur-05',
        sku: 'LUNA-05',
        nameUz: 'Zumrad yashil',
        nameRu: 'Изумрудный',
        colorHex: '#004B49',
        colorNameUz: 'Zumrad yashil',
        colorNameRu: 'Изумрудный',
        price: 68000,
        wholesalePrice: 52000,
        hasWholesale: true,
        stockStatus: 'IN_STOCK',
        quantityStep: 0.5,
        minQuantity: 1.0,
        images: ['/images/categories/fabrics.jpg'],
        isAvailable: true,
      },
      {
        id: 'var-velyur-12',
        sku: 'LUNA-12',
        nameUz: 'Grafit kulrang',
        nameRu: 'Графитовый',
        colorHex: '#383E42',
        colorNameUz: 'Grafit kulrang',
        colorNameRu: 'Графитовый',
        price: 68000,
        wholesalePrice: 52000,
        hasWholesale: true,
        stockStatus: 'LOW_STOCK',
        quantityStep: 0.5,
        minQuantity: 1.0,
        images: ['/images/categories/fabrics.jpg'],
        isAvailable: true,
      },
      {
        id: 'var-velyur-18',
        sku: 'LUNA-18',
        nameUz: 'Antrasit',
        nameRu: 'Антрацит',
        colorHex: '#2E2E30',
        colorNameUz: 'Antrasit',
        colorNameRu: 'Антрацит',
        price: 68000,
        wholesalePrice: 52000,
        hasWholesale: true,
        stockStatus: 'ON_ORDER',
        quantityStep: 0.5,
        minQuantity: 1.0,
        images: ['/images/categories/fabrics.jpg'],
        isAvailable: true,
      },
      {
        id: 'var-velyur-21',
        sku: 'LUNA-21',
        nameUz: 'Och kulrang',
        nameRu: 'Светло-серый',
        colorHex: '#B8B8B4',
        colorNameUz: 'Och kulrang',
        colorNameRu: 'Светло-серый',
        price: 68000,
        wholesalePrice: 52000,
        hasWholesale: true,
        stockStatus: 'IN_STOCK',
        quantityStep: 0.5,
        minQuantity: 1.0,
        images: ['/images/categories/fabrics.jpg'],
        isAvailable: true,
      },
      {
        id: 'var-velyur-25',
        sku: 'LUNA-25',
        nameUz: 'Qum rang',
        nameRu: 'Песочный',
        colorHex: '#C9B79A',
        colorNameUz: 'Qum rang',
        colorNameRu: 'Песочный',
        price: 68000,
        wholesalePrice: 52000,
        hasWholesale: true,
        stockStatus: 'IN_STOCK',
        quantityStep: 0.5,
        minQuantity: 1.0,
        images: ['/images/categories/fabrics.jpg'],
        isAvailable: true,
      },
    ],
  },
  {
    id: 'prod-bukle-01',
    slug: 'bukle-mato-cozy',
    titleUz: 'Bukle mato (tugunchali faktura)',
    titleRu: 'Букле (узелковая фактура)',
    descriptionUz:
      'Tugunchali fakturaga ega bukle mato. Zamonaviy yumshoq mebellar uchun tanlov.',
    descriptionRu:
      'Букле с выразительной узелковой фактурой для современной мягкой мебели.',
    categorySlug: 'mebel-matolari',
    categoryNameUz: 'Mebel matolari',
    categoryNameRu: 'Мебельные ткани',
    collectionSlug: 'bukle-kolleksiyasi',
    collectionName: 'Bukle matolar to‘plami',
    unitType: 'meter',
    minQtyStep: 0.5,
    primaryImage: '/images/categories/fabrics.jpg',
    images: ['/images/categories/fabrics.jpg'],
    isFeatured: true,
    isNew: true,
    crossSellProductIds: ['prod-yelim-sprey', 'prod-paralon-el2842'],
    specs: [
      { key: 'texture', labelUz: 'Faktura turi', labelRu: 'Текстура', valueUz: 'Bukle', valueRu: 'Букле' },
    ],
    variants: [
      {
        id: 'var-bukle-01',
        sku: 'BOUCLE-01',
        nameUz: 'Oq qor',
        nameRu: 'Белоснежный',
        colorHex: '#FAFAFA',
        colorNameUz: 'Oq qor',
        colorNameRu: 'Белоснежный',
        price: 95000,
        wholesalePrice: 75000,
        hasWholesale: true,
        stockStatus: 'IN_STOCK',
        quantityStep: 0.5,
        minQuantity: 1.0,
        images: ['/images/categories/fabrics.jpg'],
        isAvailable: true,
      },
      {
        id: 'var-bukle-03',
        sku: 'BOUCLE-03',
        nameUz: 'Kulrang',
        nameRu: 'Серый',
        colorHex: '#9CA3AF',
        colorNameUz: 'Kulrang',
        colorNameRu: 'Серый',
        price: 95000,
        wholesalePrice: 75000,
        hasWholesale: true,
        stockStatus: 'IN_STOCK',
        quantityStep: 0.5,
        minQuantity: 1.0,
        images: ['/images/categories/fabrics.jpg'],
        isAvailable: true,
      },
      {
        id: 'var-bukle-07',
        sku: 'BOUCLE-07',
        nameUz: 'Sutli',
        nameRu: 'Молочный',
        colorHex: '#F3EDE2',
        colorNameUz: 'Sutli',
        colorNameRu: 'Молочный',
        price: 95000,
        wholesalePrice: 75000,
        hasWholesale: true,
        stockStatus: 'OUT_OF_STOCK',
        quantityStep: 0.5,
        minQuantity: 1.0,
        images: ['/images/categories/fabrics.jpg'],
        isAvailable: false,
      },
    ],
  },
  {
    id: 'prod-shenill-01',
    slug: 'shenill-mato-royal',
    titleUz: 'Shenill mato (qalin to‘qima)',
    titleRu: 'Шенилл (плотная структура)',
    descriptionUz:
      'Qalin va hajmli to‘qimali shenill mato. Klassik va zamonaviy mebellar uchun.',
    descriptionRu:
      'Шенилл с плотной объемной структурой для классической и современной мебели.',
    categorySlug: 'mebel-matolari',
    categoryNameUz: 'Mebel matolari',
    categoryNameRu: 'Мебельные ткани',
    collectionSlug: 'shenill-kolleksiyasi',
    collectionName: 'Shenill matolar to‘plami',
    unitType: 'meter',
    minQtyStep: 0.5,
    primaryImage: '/images/categories/fabrics.jpg',
    images: ['/images/categories/fabrics.jpg'],
    isFeatured: true,
    crossSellProductIds: ['prod-yelim-sprey', 'prod-paralon-el2842'],
    specs: [
      { key: 'texture', labelUz: 'Faktura turi', labelRu: 'Текстура', valueUz: 'Shenill', valueRu: 'Шенилл' },
    ],
    variants: [
      {
        id: 'var-shenill-10',
        sku: 'ROYAL-10',
        nameUz: 'Oltinsimon bej',
        nameRu: 'Золотисто-бежевый',
        colorHex: '#D4AF37',
        colorNameUz: 'Oltinsimon bej',
        colorNameRu: 'Золотисто-бежевый',
        price: 85000,
        wholesalePrice: 65000,
        hasWholesale: true,
        stockStatus: 'IN_STOCK',
        quantityStep: 0.5,
        minQuantity: 1.0,
        images: ['/images/categories/fabrics.jpg'],
        isAvailable: true,
      },
      {
        id: 'var-shenill-18',
        sku: 'ROYAL-18',
        nameUz: 'To‘q ko‘k',
        nameRu: 'Темно-синий',
        colorHex: '#1B2A4A',
        colorNameUz: 'To‘q ko‘k',
        colorNameRu: 'Темно-синий',
        price: 85000,
        wholesalePrice: 65000,
        hasWholesale: true,
        stockStatus: 'IN_STOCK',
        quantityStep: 0.5,
        minQuantity: 1.0,
        images: ['/images/categories/fabrics.jpg'],
        isAvailable: true,
      },
    ],
  },
  {
    id: 'prod-paralon-st2536',
    slug: 'paralon-st-2536',
    titleUz: 'Paralon ST-2536 (200x100 sm)',
    titleRu: 'Поролон ST-2536 (200x100 см)',
    descriptionUz:
      'ST markali mebel paraloni. Divan, stul va yumshoq mebel elementlari uchun standart tanlov.',
    descriptionRu:
      'Поролон марки ST для спинок диванов, стульев и элементов мягкой мебели.',
    categorySlug: 'paralon',
    categoryNameUz: 'Paralon',
    categoryNameRu: 'Поролон',
    unitType: 'sheet',
    minQtyStep: 1,
    primaryImage: '/images/categories/foam.jpg',
    images: ['/images/categories/foam.jpg'],
    isPopular: true,
    crossSellProductIds: ['prod-yelim-sprey', 'prod-velyur-01'],
    specs: [
      { key: 'foam_type', labelUz: 'Marka', labelRu: 'Марка ППУ', valueUz: 'ST 2536', valueRu: 'ST 2536' },
      { key: 'size', labelUz: 'List o‘lchami', labelRu: 'Размер листа', valueUz: '200 x 100 sm', valueRu: '200 x 100 см' },
    ],
    variants: [
      {
        id: 'var-st2536-50',
        sku: 'ST2536-50',
        nameUz: 'Qalinligi 50 mm',
        nameRu: 'Толщина 50 мм',
        price: 110000,
        wholesalePrice: 88000,
        hasWholesale: true,
        stockStatus: 'IN_STOCK',
        quantityStep: 1.0,
        minQuantity: 1.0,
        images: ['/images/categories/foam.jpg'],
        isAvailable: true,
      },
      {
        id: 'var-st2536-100',
        sku: 'ST2536-100',
        nameUz: 'Qalinligi 100 mm',
        nameRu: 'Толщина 100 мм',
        price: 215000,
        wholesalePrice: 175000,
        hasWholesale: true,
        stockStatus: 'IN_STOCK',
        quantityStep: 1.0,
        minQuantity: 1.0,
        images: ['/images/categories/foam.jpg'],
        isAvailable: true,
      },
    ],
  },
  {
    id: 'prod-paralon-el2842',
    slug: 'paralon-el-2842',
    titleUz: 'Paralon EL-2842 (200x100 sm)',
    titleRu: 'Поролон EL-2842 (200x100 см)',
    descriptionUz:
      'EL markali yuqori qattiqlikdagi mebel paraloni. O‘rindiq va yuklama ko‘taradigan elementlar uchun.',
    descriptionRu:
      'Поролон марки EL повышенной жесткости для сидений и нагружаемых элементов.',
    categorySlug: 'paralon',
    categoryNameUz: 'Paralon',
    categoryNameRu: 'Поролон',
    unitType: 'sheet',
    minQtyStep: 1,
    primaryImage: '/images/categories/foam.jpg',
    images: ['/images/categories/foam.jpg'],
    isFeatured: true,
    isPopular: true,
    specs: [
      { key: 'foam_type', labelUz: 'Marka', labelRu: 'Марка ППУ', valueUz: 'EL 2842', valueRu: 'EL 2842' },
      { key: 'size', labelUz: 'List o‘lchami', labelRu: 'Размер листа', valueUz: '200 x 100 sm', valueRu: '200 x 100 см' },
    ],
    variants: [
      {
        id: 'var-el2842-80',
        sku: 'EL2842-80',
        nameUz: 'Qalinligi 80 mm',
        nameRu: 'Толщина 80 мм',
        price: 195000,
        wholesalePrice: 160000,
        hasWholesale: true,
        stockStatus: 'IN_STOCK',
        quantityStep: 1.0,
        minQuantity: 1.0,
        images: ['/images/categories/foam.jpg'],
        isAvailable: true,
      },
    ],
  },
  {
    id: 'prod-pnevmatik-f30d',
    slug: 'pnevmatik-mix-qoqqich-f30d',
    titleUz: 'Pnevmatik mix qoqqich F30D',
    titleRu: 'Пневмопистолет гвоздезабивной F30D',
    descriptionUz:
      'Mebel karkaslari va faneralarni mixlash uchun pnevmatik asbob. Xususiyatlarini menejer bilan tasdiqlang.',
    descriptionRu:
      'Пневматический гвоздезабивной пистолет для мебельных каркасов. Уточните характеристики у менеджера.',
    categorySlug: 'sarf-materiallar-va-instrumentlar',
    categoryNameUz: 'Asboblar va Sarf materiallari',
    categoryNameRu: 'Инструменты и Расходники',
    unitType: 'pcs',
    minQtyStep: 1,
    primaryImage: '/images/categories/tools.jpg',
    images: ['/images/categories/tools.jpg'],
    isFeatured: true,
    isPopular: true,
    isNew: true,
    crossSellProductIds: ['prod-pnevmatik-8016', 'prod-yelim-sprey'],
    specs: [
      { key: 'power_type', labelUz: 'Quvvat turi', labelRu: 'Тип питания', valueUz: 'Pnevmatik', valueRu: 'Пневматический' },
    ],
    variants: [
      {
        id: 'var-f30d',
        sku: 'F30D',
        nameUz: 'Pnevmatik mix qoqqich F30D',
        nameRu: 'Пневмопистолет F30D',
        price: 320000,
        wholesalePrice: 260000,
        hasWholesale: true,
        stockStatus: 'IN_STOCK',
        quantityStep: 1.0,
        minQuantity: 1.0,
        images: ['/images/categories/tools.jpg'],
        isAvailable: true,
      },
    ],
  },
  {
    id: 'prod-pnevmatik-8016',
    slug: 'pnevmatik-stepler-8016',
    titleUz: 'Pnevmatik stepler 8016',
    titleRu: 'Пневмостеплер 8016',
    descriptionUz:
      'Mebel qoplash ishlarida ishlatiladigan pnevmatik stepler. Xususiyatlarini menejer bilan tasdiqlang.',
    descriptionRu:
      'Пневмостеплер для обивки мебели. Уточните характеристики у менеджера.',
    categorySlug: 'sarf-materiallar-va-instrumentlar',
    categoryNameUz: 'Asboblar va Sarf materiallari',
    categoryNameRu: 'Инструменты и Расходники',
    unitType: 'pcs',
    minQtyStep: 1,
    primaryImage: '/images/categories/tools.jpg',
    images: ['/images/categories/tools.jpg'],
    isFeatured: true,
    isPopular: true,
    crossSellProductIds: ['prod-pnevmatik-f30d', 'prod-yelim-sprey'],
    specs: [
      { key: 'power_type', labelUz: 'Quvvat turi', labelRu: 'Тип питания', valueUz: 'Pnevmatik', valueRu: 'Пневматический' },
    ],
    variants: [
      {
        id: 'var-8016',
        sku: '8016',
        nameUz: 'Pnevmostepler 8016',
        nameRu: 'Пневмостеплер 8016',
        price: 245000,
        wholesalePrice: 195000,
        hasWholesale: true,
        stockStatus: 'IN_STOCK',
        quantityStep: 1.0,
        minQuantity: 1.0,
        images: ['/images/categories/tools.jpg'],
        isAvailable: true,
      },
    ],
  },
  {
    id: 'prod-yelim-sprey',
    slug: 'mebel-sprey-yelim',
    titleUz: 'Mebel sprey yelim',
    titleRu: 'Клей-спрей мебельный',
    descriptionUz:
      'Paralon va mato yopishtirish uchun sprey yelim. Xususiyatlarini menejer bilan tasdiqlang.',
    descriptionRu:
      'Клей-спрей для склеивания поролона и тканей. Уточните характеристики у менеджера.',
    categorySlug: 'sarf-materiallar-va-instrumentlar',
    categoryNameUz: 'Asboblar va Sarf materiallari',
    categoryNameRu: 'Инструменты и Расходники',
    unitType: 'pcs',
    minQtyStep: 1,
    primaryImage: '/images/categories/tools.jpg',
    images: ['/images/categories/tools.jpg'],
    isFeatured: true,
    isPopular: true,
    specs: [
      { key: 'volume', labelUz: 'Hajmi', labelRu: 'Объем', valueUz: '500 ml', valueRu: '500 мл' },
    ],
    variants: [
      {
        id: 'var-yelim-500',
        sku: 'AKFIX-500',
        nameUz: 'Sprey yelim 500 ml',
        nameRu: 'Клей-спрей 500 мл',
        price: 48000,
        wholesalePrice: 38000,
        hasWholesale: true,
        stockStatus: 'IN_STOCK',
        quantityStep: 1.0,
        minQuantity: 1.0,
        images: ['/images/categories/tools.jpg'],
        isAvailable: true,
      },
    ],
  },
  {
    id: 'prod-mexanizm-delfin',
    slug: 'delfin-transformatsiya-mexanizmi',
    titleUz: 'Delfin transformatsiya mexanizmi',
    titleRu: 'Механизм трансформации «Дельфин»',
    descriptionUz:
      'Burchakli divanlar uchun transformatsiya mexanizmi. O‘lcham va yuklamani menejer bilan tasdiqlang.',
    descriptionRu:
      'Механизм трансформации для угловых диванов. Уточните размеры и нагрузку у менеджера.',
    categorySlug: 'mexanizmlar',
    categoryNameUz: 'Transformatsiya mexanizmlari',
    categoryNameRu: 'Механизмы трансформации',
    unitType: 'pcs',
    minQtyStep: 1,
    primaryImage: '/images/categories/mechanisms.jpg',
    images: ['/images/categories/mechanisms.jpg'],
    isPopular: true,
    specs: [
      { key: 'mechanism_type', labelUz: 'Mexanizm turi', labelRu: 'Тип механизма', valueUz: 'Delfin', valueRu: 'Дельфин' },
    ],
    variants: [
      {
        id: 'var-delfin-pair',
        sku: 'DELFIN-01',
        nameUz: 'Komplekt (o‘ng + chap)',
        nameRu: 'Комплект (правый + левый)',
        price: 180000,
        wholesalePrice: 145000,
        hasWholesale: true,
        stockStatus: 'IN_STOCK',
        quantityStep: 1.0,
        minQuantity: 1.0,
        images: ['/images/categories/mechanisms.jpg'],
        isAvailable: true,
      },
    ],
  },
];

/**
 * `MOCK_PRODUCTS` with derived exact-stock and volume-price-tier fields filled
 * in (UX patterns #20, #29, #36 — see `mockEnrichment.ts`). All read paths in
 * this service use this enriched array; `MOCK_PRODUCTS` itself stays the raw,
 * hand-authored fixture in case a caller ever needs it unmodified.
 */
const MOCK_PRODUCTS_ENRICHED: StorefrontProduct[] = MOCK_PRODUCTS.map(enrichMockProduct);

// ── Development simulation knobs ─────────────────────────────────────────────
// Simulates ShopFlow remote latency & failures in development.
//   NEXT_PUBLIC_MOCK_LATENCY_MS=1500  → 1.5s delay per request
//   NEXT_PUBLIC_MOCK_FAIL_RATE=0.3    → 30% of requests fail
const MOCK_LATENCY_MS = Number(process.env.NEXT_PUBLIC_MOCK_LATENCY_MS || 0);
const MOCK_FAIL_RATE = Number(process.env.NEXT_PUBLIC_MOCK_FAIL_RATE || 0);

function delay(ms = MOCK_LATENCY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function maybeFail(): void {
  if (MOCK_FAIL_RATE > 0 && Math.random() < MOCK_FAIL_RATE) {
    throw new Error('MOCK_SERVICE_FAILURE');
  }
}

export class MockStorefrontService implements IStorefrontService {
  async getHomepage(locale = 'uz'): Promise<HomepageData> {
    await delay();
    maybeFail();
    return {
      heroCategories: MOCK_CATEGORIES,
      popularProducts: MOCK_PRODUCTS_ENRICHED.filter((p) => p.isPopular).slice(0, 4),
      newArrivals: MOCK_PRODUCTS_ENRICHED.filter((p) => p.isNew || p.isFeatured).slice(0, 4),
      featuredFabrics: MOCK_PRODUCTS_ENRICHED.filter((p) => p.categorySlug === 'mebel-matolari'),
      collections: MOCK_COLLECTIONS,
    };
  }

  async getCategories(locale = 'uz'): Promise<StorefrontCategory[]> {
    await delay();
    maybeFail();
    return MOCK_CATEGORIES;
  }

  async getCategory(slug: string, locale = 'uz'): Promise<StorefrontCategory | null> {
    await delay();
    maybeFail();
    return MOCK_CATEGORIES.find((c) => c.slug === slug) || null;
  }

  async getProducts(filter?: StorefrontProductFilter, locale = 'uz'): Promise<StorefrontProduct[]> {
    await delay();
    maybeFail();
    let result = [...MOCK_PRODUCTS_ENRICHED];

    if (!filter) return result;

    if (filter.categorySlug) {
      result = result.filter((p) => p.categorySlug === filter.categorySlug);
    }

    if (filter.collectionSlug) {
      result = result.filter((p) => p.collectionSlug === filter.collectionSlug);
    }

    if (filter.subCategorySlug) {
      const sub = filter.subCategorySlug.toLowerCase();
      result = result.filter((p) =>
        p.specs.some(
          (s) =>
            s.valueUz.toLowerCase().includes(sub) ||
            s.valueRu.toLowerCase().includes(sub)
        )
      );
    }

    if (filter.texture) {
      const t = filter.texture.toLowerCase();
      result = result.filter((p) =>
        p.specs.some((s) => s.key === 'texture' && s.valueUz.toLowerCase().includes(t))
      );
    }

    if (filter.foamType) {
      const f = filter.foamType.toLowerCase();
      result = result.filter((p) =>
        p.specs.some((s) => s.key === 'foam_type' && s.valueUz.toLowerCase().includes(f))
      );
    }

    if (filter.powerType) {
      const pt = filter.powerType.toLowerCase();
      result = result.filter((p) =>
        p.specs.some((s) => s.key === 'power_type' && s.valueUz.toLowerCase().includes(pt))
      );
    }

    if (filter.search) {
      const q = filter.search.toLowerCase();
      result = result.filter((p) =>
        p.titleUz.toLowerCase().includes(q) ||
        p.titleRu.toLowerCase().includes(q) ||
        p.variants.some((v) => v.sku.toLowerCase().includes(q))
      );
    }

    if (filter.minPrice) {
      result = result.filter((p) => p.variants.some((v) => v.price >= filter.minPrice!));
    }

    if (filter.maxPrice) {
      result = result.filter((p) => p.variants.some((v) => v.price <= filter.maxPrice!));
    }

    if (filter.stockOnly) {
      result = result.filter((p) => p.variants.some((v) => v.stockStatus === 'IN_STOCK'));
    }

    if (filter.sort === 'price_asc') {
      result.sort((a, b) => (a.variants[0]?.price || 0) - (b.variants[0]?.price || 0));
    } else if (filter.sort === 'price_desc') {
      result.sort((a, b) => (b.variants[0]?.price || 0) - (a.variants[0]?.price || 0));
    }

    return result;
  }

  async getProduct(slug: string, locale = 'uz'): Promise<StorefrontProduct | null> {
    await delay();
    maybeFail();
    return MOCK_PRODUCTS_ENRICHED.find((p) => p.slug === slug) || null;
  }

  async getRelatedProducts(productId: string, locale = 'uz'): Promise<StorefrontProduct[]> {
    await delay();
    maybeFail();
    const current = MOCK_PRODUCTS_ENRICHED.find((p) => p.id === productId);
    if (!current) return MOCK_PRODUCTS_ENRICHED.slice(0, 3);

    if (current.crossSellProductIds && current.crossSellProductIds.length > 0) {
      const crossSells = MOCK_PRODUCTS_ENRICHED.filter((p) => current.crossSellProductIds?.includes(p.id));
      if (crossSells.length > 0) return crossSells;
    }

    return MOCK_PRODUCTS_ENRICHED.filter((p) => p.id !== productId && p.categorySlug === current.categorySlug).slice(0, 3);
  }

  /**
   * Universal search with SKU-first ranking.
   * An EXACT SKU match (case-insensitive) is always ranked before
   * approximate text matches, so typing "F30D" surfaces the exact product first.
   */
  async searchProducts(query: string, locale = 'uz'): Promise<StorefrontSearchResult> {
    await delay();
    maybeFail();
    const q = (query || '').trim().toLowerCase();
    if (!q) {
      return { products: [], collections: [], categories: [], totalMatches: 0 };
    }

    const exactSkuMatches = MOCK_PRODUCTS_ENRICHED.filter((p) =>
      p.variants.some((v) => v.sku.toLowerCase() === q)
    );

    const textMatches = MOCK_PRODUCTS_ENRICHED.filter(
      (p) =>
        (p.titleUz.toLowerCase().includes(q) || p.titleRu.toLowerCase().includes(q)) &&
        !exactSkuMatches.includes(p)
    );

    const skuPartialMatches = MOCK_PRODUCTS_ENRICHED.filter(
      (p) =>
        p.variants.some((v) => v.sku.toLowerCase().includes(q)) &&
        !exactSkuMatches.includes(p) &&
        !textMatches.includes(p)
    );

    const matchedProducts = [...exactSkuMatches, ...textMatches, ...skuPartialMatches];

    const matchedCollections = MOCK_COLLECTIONS.filter((c) =>
      c.name.toLowerCase().includes(q)
    );

    const matchedCategories = MOCK_CATEGORIES.filter(
      (c) =>
        c.nameUz.toLowerCase().includes(q) ||
        c.nameRu.toLowerCase().includes(q)
    );

    return {
      products: matchedProducts,
      collections: matchedCollections,
      categories: matchedCategories,
      totalMatches: matchedProducts.length + matchedCollections.length + matchedCategories.length,
    };
  }

  async getCollections(locale = 'uz'): Promise<StorefrontCollection[]> {
    await delay();
    maybeFail();
    return MOCK_COLLECTIONS;
  }

  async getCartPricing(items: StorefrontCartItemInput[], isB2B = false): Promise<StorefrontCartPricing> {
    await delay();
    maybeFail();
    let subtotal = 0;
    for (const item of items) {
      const priceToUse = (isB2B && item.wholesalePrice) ? item.wholesalePrice : item.price;
      subtotal += Math.round(priceToUse * item.quantity);
    }

    return {
      subtotal,
      discountAmount: 0,
      deliveryAmount: 0, // Delivery cost is confirmed by the manager after order
      total: subtotal,
      isB2B,
      currency: 'UZS',
    };
  }

  async submitOrder(input: StorefrontOrderInput): Promise<StorefrontOrderResult> {
    await delay();
    maybeFail();
    const todayStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `CT-${todayStr}-${randomSuffix}`;

    return {
      success: true,
      orderNumber,
      orderId: `ord-${Date.now()}`,
      total: input.items.reduce((acc, i) => acc + i.quantity * 50000, 0),
      status: 'NEW',
      createdAt: new Date().toISOString(),
      message: 'Buyurtmangiz qabul qilindi. Menejerimiz tez orada bog‘lanadi.',
    };
  }

  async submitQuickOrder(input: StorefrontLeadInput): Promise<StorefrontLeadResult> {
    await delay();
    maybeFail();
    return {
      success: true,
      referenceId: `QO-${Math.floor(1000 + Math.random() * 9000)}`,
      message: 'Tezkor buyurtmangiz qabul qilindi. Operatorimiz tez orada qo‘ng‘iroq qiladi.',
    };
  }

  async submitSampleRequest(input: StorefrontLeadInput): Promise<StorefrontLeadResult> {
    await delay();
    maybeFail();
    return {
      success: true,
      referenceId: `SB-${Math.floor(1000 + Math.random() * 9000)}`,
      message: 'Namunalar so‘rovingiz qabul qilindi. Menejerimiz tez orada bog‘lanadi.',
    };
  }

  async submitWholesaleRequest(input: StorefrontLeadInput): Promise<StorefrontLeadResult> {
    await delay();
    maybeFail();
    return {
      success: true,
      referenceId: `B2B-${Math.floor(1000 + Math.random() * 9000)}`,
      message: 'Ulgurji hamkorlik arizangiz qabul qilindi. Menejerimiz tez orada bog‘lanadi.',
    };
  }

  /**
   * No fake customer data. Returns null until ShopFlow provides real accounts.
   */
  async getCustomer(id: string): Promise<StorefrontCustomer | null> {
    await delay();
    maybeFail();
    return null;
  }

  /**
   * No fake order history. Returns an empty list until ShopFlow provides real orders.
   */
  async getCustomerOrders(customerId: string): Promise<StorefrontCustomerOrder[]> {
    await delay();
    maybeFail();
    return [];
  }
}
