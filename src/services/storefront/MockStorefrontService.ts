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

export const MOCK_CATEGORIES: StorefrontCategory[] = [
  {
    id: 'cat-fabrics',
    slug: 'mebel-matolari',
    nameUz: 'Mebel matolari',
    nameRu: 'Мебельные ткани',
    descriptionUz: 'Keng assortimentdagi baxmal velyur, bukle, shenill, rogojka va zamsh matolari',
    descriptionRu: 'Широкий ассортимент велюра, букле, шенилла, рогожки и замши',
    iconName: 'Palette',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop',
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
    descriptionUz: 'Divan, krovat va stullar uchun yuklama ko‘taruvchi po‘lat mexanizmlar',
    descriptionRu: 'Надежные стальные механизмы для диванов, кроватей и стульев',
    iconName: 'Settings',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&auto=format&fit=crop',
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
    descriptionUz: 'Pnevmatik steplerlar, Akfix yelimlar, zımba skobalar va montaj anjomlari',
    descriptionRu: 'Пневмостеплеры, клей Akfix, скобы и монтажные принадлежности',
    iconName: 'Hammer',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop',
    productCount: 18,
    subcategories: [
      { slug: 'pnevmatik', nameUz: 'Pnevmatik steplerlar', nameRu: 'Пневмостеплеры' },
      { slug: 'yelim', nameUz: 'Mebel yelimlar (Akfix)', nameRu: 'Мебельный клей (Akfix)' },
      { slug: 'skoba', nameUz: 'Zımba skobalar', nameRu: 'Скобы забивные' },
    ],
  },
];

export const MOCK_COLLECTIONS: StorefrontCollection[] = [
  {
    id: 'col-luna',
    slug: 'luna-collection',
    name: 'LUNA Premium Velvet',
    descriptionUz: 'Suv yuqtirmaydigan va tirnashga chidamli (Pet Friendly) baxmal matolar',
    descriptionRu: 'Водоотталкивающий и износостойкий премиальный велюр Easy Clean',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop',
    productCount: 6,
  },
  {
    id: 'col-royal',
    slug: 'royal-chenille',
    name: 'ROYAL Chenille Line',
    descriptionUz: 'Klassik va zamonaviy yumshoq mebellar uchun oliy navli shenill',
    descriptionRu: 'Высококачественный шенилл для классической и современной мебели',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop',
    productCount: 4,
  },
  {
    id: 'col-nordic',
    slug: 'nordic-boucle',
    name: 'NORDIC Cozy Boucle',
    descriptionUz: 'Skandinaviya uslubidagi xushbichim bukle matolar to‘plami',
    descriptionRu: 'Коллекция уютного фактурного букле в скандинавском стиле',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop',
    productCount: 5,
  },
  {
    id: 'col-industrial',
    slug: 'pro-production-kit',
    name: 'PRO Furniture Workshop Kit',
    descriptionUz: 'Sex va ustaxonalar uchun eng talabgir sarf materiallari to‘plami',
    descriptionRu: 'Набор самых востребованных расходников для мебельных цехов',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop',
    productCount: 8,
  },
];

export const MOCK_PRODUCTS: StorefrontProduct[] = [
  {
    id: 'prod-luna-velur',
    slug: 'luna-premium-velur',
    titleUz: 'Luna Premium Velur Matosi',
    titleRu: 'Велюр Luna Premium',
    descriptionUz: 'LUNA velur matosi o‘zining baxmal yumshoqligi va yuqori chidamliligi (50 000 Martindale) bilan ajralib turadi. Easy Clean va Pet Friendly xususiyatlariga ega bo‘lib, tozalanishi juda oson.',
    descriptionRu: 'Велюр LUNA отличается высокой износостойкостью (50 000 циклов Мартиндейла). Обладает водоотталкивающим эффектом Easy Clean и защитой от когтей Pet Friendly.',
    categorySlug: 'mebel-matolari',
    categoryNameUz: 'Mebel matolari',
    categoryNameRu: 'Мебельные ткани',
    collectionSlug: 'luna-collection',
    collectionName: 'LUNA Premium Velvet',
    brand: 'Comfort Textile',
    unitType: 'meter',
    minQtyStep: 0.5,
    primaryImage: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop',
    ],
    isFeatured: true,
    isPopular: true,
    isNew: true,
    crossSellProductIds: ['prod-akfix-glue', 'prod-foam-st2536', 'prod-pneumatic-stapler-8016'],
    specs: [
      { key: 'martindale', labelUz: 'Ishqalanishga chidamlilik', labelRu: 'Износостойкость', valueUz: '50 000 sikl', valueRu: '50 000 циклов' },
      { key: 'width', labelUz: 'Eni (Enlik)', labelRu: 'Ширина', valueUz: '142 sm', valueRu: '142 см' },
      { key: 'density', labelUz: 'Zichlik', labelRu: 'Плотность', valueUz: '380 g/m²', valueRu: '380 г/м²' },
      { key: 'composition', labelUz: 'Tarkibi', labelRu: 'Состав', valueUz: '100% Poliester', valueRu: '100% Полиэстер' },
      { key: 'texture', labelUz: 'Faktura turi', labelRu: 'Текстура', valueUz: 'Velyur', valueRu: 'Велюр' },
    ],
    variants: [
      {
        id: 'var-luna-01',
        sku: 'LUNA-01',
        nameUz: 'Luna 01 (Sutli Krem)',
        nameRu: 'Luna 01 (Молочный)',
        colorHex: '#F5F5DC',
        colorNameUz: 'Sutli krem',
        colorNameRu: 'Молочный',
        price: 68000,
        oldPrice: 75000,
        wholesalePrice: 52000,
        hasWholesale: true,
        stockStatus: 'IN_STOCK',
        quantityStep: 0.5,
        minQuantity: 1.0,
        images: ['https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop'],
        isAvailable: true,
      },
      {
        id: 'var-luna-04',
        sku: 'LUNA-04',
        nameUz: 'Luna 04 (Klassik Bej)',
        nameRu: 'Luna 04 (Бежевый)',
        colorHex: '#D2B48C',
        colorNameUz: 'Klassik bej',
        colorNameRu: 'Бежевый',
        price: 68000,
        wholesalePrice: 52000,
        hasWholesale: true,
        stockStatus: 'IN_STOCK',
        quantityStep: 0.5,
        minQuantity: 1.0,
        images: ['https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop'],
        isAvailable: true,
      },
      {
        id: 'var-luna-05',
        sku: 'LUNA-05',
        nameUz: 'Luna 05 (Zumrad Yashil)',
        nameRu: 'Luna 05 (Изумрудный)',
        colorHex: '#004B49',
        colorNameUz: 'Zumrad yashil',
        colorNameRu: 'Изумрудный',
        price: 68000,
        wholesalePrice: 52000,
        hasWholesale: true,
        stockStatus: 'IN_STOCK',
        quantityStep: 0.5,
        minQuantity: 1.0,
        images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop'],
        isAvailable: true,
      },
      {
        id: 'var-luna-12',
        sku: 'LUNA-12',
        nameUz: 'Luna 12 (Grafit Kulrang)',
        nameRu: 'Luna 12 (Графит)',
        colorHex: '#383E42',
        colorNameUz: 'Grafit kulrang',
        colorNameRu: 'Графитовый',
        price: 68000,
        wholesalePrice: 52000,
        hasWholesale: true,
        stockStatus: 'LOW_STOCK',
        quantityStep: 0.5,
        minQuantity: 1.0,
        images: ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop'],
        isAvailable: true,
      },
    ],
  },
  {
    id: 'prod-royal-shenill',
    slug: 'royal-shenill-mebel',
    titleUz: 'Royal Shenill Mebel Matosi',
    titleRu: 'Шенилл Royal Mebel',
    descriptionUz: 'Hashamatli hajmdor fakturaga ega Royal Shenill matosi mebellarga oliyjanob ko‘rinish bag‘ishlaydi. Qalin va chidamli to‘qima.',
    descriptionRu: 'Шенилл Royal придаст вашей мебели роскошный фактурный вид. Плотная износостойкая ткань.',
    categorySlug: 'mebel-matolari',
    categoryNameUz: 'Mebel matolari',
    categoryNameRu: 'Мебельные ткани',
    collectionSlug: 'royal-chenille',
    collectionName: 'ROYAL Chenille Line',
    brand: 'Royal Line',
    unitType: 'meter',
    minQtyStep: 0.5,
    primaryImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop'],
    isFeatured: true,
    isPopular: false,
    isNew: false,
    crossSellProductIds: ['prod-akfix-glue', 'prod-foam-el2842'],
    specs: [
      { key: 'martindale', labelUz: 'Ishqalanishga chidamlilik', labelRu: 'Износостойкость', valueUz: '45 000 sikl', valueRu: '45 000 циклов' },
      { key: 'width', labelUz: 'Eni', labelRu: 'Ширина', valueUz: '140 sm', valueRu: '140 см' },
      { key: 'density', labelUz: 'Zichlik', labelRu: 'Плотность', valueUz: '420 g/m²', valueRu: '420 г/м²' },
      { key: 'texture', labelUz: 'Faktura turi', labelRu: 'Текстура', valueUz: 'Shenill', valueRu: 'Шенилл' },
    ],
    variants: [
      {
        id: 'var-royal-10',
        sku: 'ROYAL-10',
        nameUz: 'Royal 10 (Oltinsimon Bej)',
        nameRu: 'Royal 10 (Золотисто-бежевый)',
        colorHex: '#D4AF37',
        colorNameUz: 'Oltinsimon bej',
        colorNameRu: 'Золотисто-бежевый',
        price: 85000,
        wholesalePrice: 65000,
        hasWholesale: true,
        stockStatus: 'IN_STOCK',
        quantityStep: 0.5,
        minQuantity: 1.0,
        images: ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop'],
        isAvailable: true,
      },
      {
        id: 'var-royal-18',
        sku: 'ROYAL-18',
        nameUz: 'Royal 18 (To‘q Ko‘k)',
        nameRu: 'Royal 18 (Темно-синий)',
        colorHex: '#1B2A4A',
        colorNameUz: 'To‘q ko‘k',
        colorNameRu: 'Темно-синий',
        price: 85000,
        wholesalePrice: 65000,
        hasWholesale: true,
        stockStatus: 'IN_STOCK',
        quantityStep: 0.5,
        minQuantity: 1.0,
        images: ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop'],
        isAvailable: true,
      },
    ],
  },
  {
    id: 'prod-foam-st2536',
    slug: 'paralon-st-2536',
    titleUz: 'Paralon ST-2536 Standart List (200x100 sm)',
    titleRu: 'Поролон ST-2536 Стандарт (200x100 см)',
    descriptionUz: 'ST-2536 markali mebel paraloni divan suyanchig‘i, stullar va yumshoq mebel elementlari uchun eng maqbul standart zichlikka ega.',
    descriptionRu: 'Поролон марки ST-2536 идеален для спинок диванов, стульев и подлокотников. Стандартная плотность и упругость.',
    categorySlug: 'paralon',
    categoryNameUz: 'Paralon',
    categoryNameRu: 'Поролон',
    brand: 'Comfort Foam',
    unitType: 'sheet',
    minQtyStep: 1,
    primaryImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop'],
    isFeatured: false,
    isPopular: true,
    isNew: false,
    crossSellProductIds: ['prod-akfix-glue', 'prod-luna-velur'],
    specs: [
      { key: 'foam_type', labelUz: 'Marka', labelRu: 'Марка ППУ', valueUz: 'ST 2536', valueRu: 'ST 2536' },
      { key: 'density', labelUz: 'Zichlik', labelRu: 'Плотность', valueUz: '25 kg/m³', valueRu: '25 кг/м³' },
      { key: 'hardness', labelUz: 'Qattiqlik', labelRu: 'Жесткость', valueUz: '3.6 kPa', valueRu: '3.6 кПа' },
      { key: 'size', labelUz: 'List o‘lchami', labelRu: 'Размер листа', valueUz: '200 x 100 sm', valueRu: '200 x 100 см' },
    ],
    variants: [
      {
        id: 'var-st2536-50',
        sku: 'ST2536-50',
        nameUz: 'ST-2536 Qalinligi 50mm',
        nameRu: 'ST-2536 Толщина 50мм',
        price: 110000,
        wholesalePrice: 88000,
        hasWholesale: true,
        stockStatus: 'IN_STOCK',
        quantityStep: 1.0,
        minQuantity: 1.0,
        images: ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop'],
        isAvailable: true,
      },
      {
        id: 'var-st2536-100',
        sku: 'ST2536-100',
        nameUz: 'ST-2536 Qalinligi 100mm',
        nameRu: 'ST-2536 Толщина 100мм',
        price: 215000,
        wholesalePrice: 175000,
        hasWholesale: true,
        stockStatus: 'IN_STOCK',
        quantityStep: 1.0,
        minQuantity: 1.0,
        images: ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop'],
        isAvailable: true,
      },
    ],
  },
  {
    id: 'prod-foam-el2842',
    slug: 'paralon-el-2842-qattiq',
    titleUz: 'Paralon EL-2842 Yuqori Qattiqlik (200x100 sm)',
    titleRu: 'Поролон EL-2842 Повышенной Жесткости (200x100 см)',
    descriptionUz: 'EL-2842 yuqori qattiqlikdagi paralon divan va matras o‘rindiqlari uchun uzoq muddat o‘tirmaslik va yuklamani ko‘tarish uchun mo‘ljallangan.',
    descriptionRu: 'Поролон повышенной жесткости EL-2842 для сидений диванов и ортопедических матрасов.',
    categorySlug: 'paralon',
    categoryNameUz: 'Paralon',
    categoryNameRu: 'Поролон',
    brand: 'Comfort Foam',
    unitType: 'sheet',
    minQtyStep: 1,
    primaryImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop'],
    isFeatured: true,
    isPopular: true,
    isNew: false,
    specs: [
      { key: 'foam_type', labelUz: 'Marka', labelRu: 'Марка ППУ', valueUz: 'EL 2842', valueRu: 'EL 2842' },
      { key: 'density', labelUz: 'Zichlik', labelRu: 'Плотность', valueUz: '28 kg/m³', valueRu: '28 кг/м³' },
      { key: 'hardness', labelUz: 'Qattiqlik', labelRu: 'Жесткость', valueUz: '4.2 kPa', valueRu: '4.2 кПа' },
    ],
    variants: [
      {
        id: 'var-el2842-80',
        sku: 'EL2842-80',
        nameUz: 'EL-2842 Qalinligi 80mm',
        nameRu: 'EL-2842 Толщина 80мм',
        price: 195000,
        wholesalePrice: 160000,
        hasWholesale: true,
        stockStatus: 'IN_STOCK',
        quantityStep: 1.0,
        minQuantity: 1.0,
        images: ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop'],
        isAvailable: true,
      },
    ],
  },
  {
    id: 'prod-pneumatic-stapler-f30d',
    slug: 'pnevmatik-stepler-f30d',
    titleUz: 'Pnevmatik Mix Qoqqich F30D (Pneumatic Brad Nailer)',
    titleRu: 'Пневмопистолет гвоздезабивной F30D',
    descriptionUz: 'Professional mebel karkaslari, moldinglar va orqa faneralarni mixlash uchun yuqori bosimli qulay pnevmatik asbob.',
    descriptionRu: 'Профессиональный гвоздезабивной пневмопистолет F30D для мебельных каркасов и молдингов.',
    categorySlug: 'sarf-materiallar-va-instrumentlar',
    categoryNameUz: 'Asboblar va Sarf materiallari',
    categoryNameRu: 'Инструменты и Расходники',
    brand: 'ProTool',
    unitType: 'pcs',
    minQtyStep: 1,
    primaryImage: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop'],
    isFeatured: true,
    isPopular: true,
    isNew: true,
    crossSellProductIds: ['prod-pneumatic-stapler-8016', 'prod-akfix-glue'],
    specs: [
      { key: 'power_type', labelUz: 'Quvvat turi', labelRu: 'Тип питания', valueUz: 'Pnevmatik (Havo bosimi)', valueRu: 'Пневматический' },
      { key: 'pressure', labelUz: 'Ishchi bosim', labelRu: 'Рабочее давление', valueUz: '4 - 7 bar', valueRu: '4 - 7 бар' },
      { key: 'capacity', labelUz: 'Magazin sig‘imi', labelRu: 'Емкость магазина', valueUz: '100 ta mix (10-30 mm)', valueRu: '100 гвоздей (10-30 мм)' },
    ],
    variants: [
      {
        id: 'var-f30d',
        sku: 'F30D',
        nameUz: 'Pnevmatik Mix Qoqqich F30D Pro',
        nameRu: 'Пневмопистолет F30D Pro',
        price: 320000,
        wholesalePrice: 260000,
        hasWholesale: true,
        stockStatus: 'IN_STOCK',
        quantityStep: 1.0,
        minQuantity: 1.0,
        images: ['https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop'],
        isAvailable: true,
      },
    ],
  },
  {
    id: 'prod-pneumatic-stapler-8016',
    slug: 'pnevmatik-stepler-8016',
    titleUz: 'Pnevmatik Stepler 8016 (Mato va Paralon uchun)',
    titleRu: 'Пневмостеплер 8016 для обивки мебели',
    descriptionUz: 'Mebel qoplash (obivka) sexlarida eng ko‘p ishlatiladigan universal pnevmatik stepler. Tip 80 skobalar bilan ishlaydi.',
    descriptionRu: 'Самый популярный обивочный пневмостеплер 8016 для крепления ткани, поролона и картона к каркасу.',
    categorySlug: 'sarf-materiallar-va-instrumentlar',
    categoryNameUz: 'Asboblar va Sarf materiallari',
    categoryNameRu: 'Инструменты и Расходники',
    brand: 'ProTool',
    unitType: 'pcs',
    minQtyStep: 1,
    primaryImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop'],
    isFeatured: true,
    isPopular: true,
    isNew: false,
    crossSellProductIds: ['prod-pneumatic-stapler-f30d', 'prod-akfix-glue'],
    specs: [
      { key: 'power_type', labelUz: 'Quvvat turi', labelRu: 'Тип питания', valueUz: 'Pnevmatik', valueRu: 'Пневматический' },
      { key: 'staple_type', labelUz: 'Skoba turi', labelRu: 'Тип скобы', valueUz: 'Tip 80 (6-16 mm)', valueRu: 'Тип 80 (6-16 мм)' },
    ],
    variants: [
      {
        id: 'var-8016',
        sku: '8016',
        nameUz: 'Pnevmostepler 8016 Universal',
        nameRu: 'Пневмостеплер 8016',
        price: 245000,
        wholesalePrice: 195000,
        hasWholesale: true,
        stockStatus: 'IN_STOCK',
        quantityStep: 1.0,
        minQuantity: 1.0,
        images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop'],
        isAvailable: true,
      },
    ],
  },
  {
    id: 'prod-akfix-glue',
    slug: 'akfix-sprey-yelim-paralon-mato',
    titleUz: 'Akfix Mebel Sprey Yelim (Paralon va Mato uchun)',
    titleRu: 'Клей-спрей Akfix для поролона и тканей',
    descriptionUz: 'Tez quriydigan va hid chiqarmaydigan yuqori yopishish quvvatiga ega mebel sprey yelimi.',
    descriptionRu: 'Быстросохнущий контактный клей-спрей Akfix для склеивания поролона, ткани, дерева и пластика.',
    categorySlug: 'sarf-materiallar-va-instrumentlar',
    categoryNameUz: 'Asboblar va Sarf materiallari',
    categoryNameRu: 'Инструменты и Расходники',
    brand: 'Akfix',
    unitType: 'pcs',
    minQtyStep: 1,
    primaryImage: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&auto=format&fit=crop'],
    isFeatured: true,
    isPopular: true,
    isNew: false,
    specs: [
      { key: 'volume', labelUz: 'Hajmi', labelRu: 'Объем', valueUz: '500 ml', valueRu: '500 мл' },
      { key: 'drying_time', labelUz: 'Qurish vaqti', labelRu: 'Время схватывания', valueUz: '1-3 daqiqa', valueRu: '1-3 мин' },
    ],
    variants: [
      {
        id: 'var-akfix-500',
        sku: 'AKFIX-500',
        nameUz: 'Akfix Sprey Yelim 500ml',
        nameRu: 'Клей Akfix 500мл',
        price: 48000,
        wholesalePrice: 38000,
        hasWholesale: true,
        stockStatus: 'IN_STOCK',
        quantityStep: 1.0,
        minQuantity: 1.0,
        images: ['https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&auto=format&fit=crop'],
        isAvailable: true,
      },
    ],
  },
  {
    id: 'prod-mechanism-dolphin',
    slug: 'delfin-mexanizmi-po-lat',
    titleUz: 'Delfin Transformatsiya Mexanizmi (Po‘lat, Mustahkam)',
    titleRu: 'Механизм трансформации Дельфин (Стальной)',
    descriptionUz: 'Burchakli divanlar uchun qulay va uzoq xizmat qiluvchi qalin po‘latli Delfin yig‘ish mexanizmi.',
    descriptionRu: 'Надежный механизм трансформации Дельфин из толстостенной стали для угловых диванов.',
    categorySlug: 'mexanizmlar',
    categoryNameUz: 'Transformatsiya mexanizmlari',
    categoryNameRu: 'Механизмы трансформации',
    brand: 'ProMechanisms',
    unitType: 'pcs',
    minQtyStep: 1,
    primaryImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop'],
    isFeatured: false,
    isPopular: true,
    isNew: false,
    specs: [
      { key: 'material', labelUz: 'Material', labelRu: 'Материал', valueUz: 'Qotirilgan po‘lat', valueRu: 'Легированная сталь' },
      { key: 'load_capacity', labelUz: 'Yuk ko‘tarish quvvati', labelRu: 'Нагрузка', valueUz: '200 kg gacha', valueRu: 'до 200 кг' },
    ],
    variants: [
      {
        id: 'var-delfin-pair',
        sku: 'DELFIN-01',
        nameUz: 'Delfin Mexanizm Juft (O‘ng + Chap)',
        nameRu: 'Механизм Дельфин (Комплект)',
        price: 180000,
        wholesalePrice: 145000,
        hasWholesale: true,
        stockStatus: 'IN_STOCK',
        quantityStep: 1.0,
        minQuantity: 1.0,
        images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop'],
        isAvailable: true,
      },
    ],
  },
];

export class MockStorefrontService implements IStorefrontService {
  async getHomepage(locale = 'uz'): Promise<HomepageData> {
    return {
      heroCategories: MOCK_CATEGORIES,
      popularProducts: MOCK_PRODUCTS.filter((p) => p.isPopular).slice(0, 4),
      newArrivals: MOCK_PRODUCTS.filter((p) => p.isNew || p.isFeatured).slice(0, 4),
      featuredFabrics: MOCK_PRODUCTS.filter((p) => p.categorySlug === 'mebel-matolari'),
      collections: MOCK_COLLECTIONS,
    };
  }

  async getCategories(locale = 'uz'): Promise<StorefrontCategory[]> {
    return MOCK_CATEGORIES;
  }

  async getCategory(slug: string, locale = 'uz'): Promise<StorefrontCategory | null> {
    return MOCK_CATEGORIES.find((c) => c.slug === slug) || null;
  }

  async getProducts(filter?: StorefrontProductFilter, locale = 'uz'): Promise<StorefrontProduct[]> {
    let result = [...MOCK_PRODUCTS];

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
    return MOCK_PRODUCTS.find((p) => p.slug === slug) || null;
  }

  async getRelatedProducts(productId: string, locale = 'uz'): Promise<StorefrontProduct[]> {
    const current = MOCK_PRODUCTS.find((p) => p.id === productId);
    if (!current) return MOCK_PRODUCTS.slice(0, 3);

    if (current.crossSellProductIds && current.crossSellProductIds.length > 0) {
      const crossSells = MOCK_PRODUCTS.filter((p) => current.crossSellProductIds?.includes(p.id));
      if (crossSells.length > 0) return crossSells;
    }

    return MOCK_PRODUCTS.filter((p) => p.id !== productId && p.categorySlug === current.categorySlug).slice(0, 3);
  }

  async searchProducts(query: string, locale = 'uz'): Promise<StorefrontSearchResult> {
    const q = (query || '').trim().toLowerCase();
    if (!q) {
      return { products: [], collections: [], categories: [], totalMatches: 0 };
    }

    const matchedProducts = MOCK_PRODUCTS.filter(
      (p) =>
        p.titleUz.toLowerCase().includes(q) ||
        p.titleRu.toLowerCase().includes(q) ||
        p.variants.some((v) => v.sku.toLowerCase().includes(q))
    );

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
    return MOCK_COLLECTIONS;
  }

  async getCartPricing(items: StorefrontCartItemInput[], isB2B = false): Promise<StorefrontCartPricing> {
    let subtotal = 0;
    for (const item of items) {
      const priceToUse = (isB2B && item.wholesalePrice) ? item.wholesalePrice : item.price;
      subtotal += Math.round(priceToUse * item.quantity);
    }

    return {
      subtotal,
      discountAmount: 0,
      deliveryAmount: 0, // Managed by logistics / free for threshold
      total: subtotal,
      isB2B,
      currency: 'UZS',
    };
  }

  async submitOrder(input: StorefrontOrderInput): Promise<StorefrontOrderResult> {
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
    return {
      success: true,
      referenceId: `QO-${Math.floor(1000 + Math.random() * 9000)}`,
      message: 'Tezkor buyurtmangiz qabul qilindi. Operatorimiz 5-10 daqiqa ichida qo‘ng‘iroq qiladi.',
    };
  }

  async submitSampleRequest(input: StorefrontLeadInput): Promise<StorefrontLeadResult> {
    return {
      success: true,
      referenceId: `SB-${Math.floor(1000 + Math.random() * 9000)}`,
      message: 'Sample Box so‘rovingiz qabul qilindi. Tez orada namunalarni tayyorlaymiz.',
    };
  }

  async submitWholesaleRequest(input: StorefrontLeadInput): Promise<StorefrontLeadResult> {
    return {
      success: true,
      referenceId: `B2B-${Math.floor(1000 + Math.random() * 9000)}`,
      message: 'Ulgurji hamkorlik arizangiz qabul qilindi. B2B menejerimiz taklif bilan bog‘lanadi.',
    };
  }

  async getCustomer(id: string): Promise<StorefrontCustomer | null> {
    return {
      id: 'demo-customer-01',
      name: 'Otabek Rixsiyev',
      phone: '+998 (93) 987-65-43',
      email: 'otabek.mebel@gmail.com',
      companyName: 'Sharq Mebel MCHJ',
      isB2B: true,
      b2bApproved: true,
      b2bDiscountPercent: 15,
    };
  }

  async getCustomerOrders(customerId: string): Promise<StorefrontCustomerOrder[]> {
    return [
      {
        id: 'demo-ord-1',
        orderNumber: 'CT-260820-84912',
        createdAt: '2026-08-20T10:30:00Z',
        status: 'DELIVERED',
        total: 2600000,
        itemCount: 2,
        items: [
          {
            sku: 'LUNA-01',
            productTitle: 'Luna Premium Velur Matosi',
            variantName: 'Sutli krem',
            quantity: 50,
            unitType: 'meter',
            unitPrice: 52000,
            lineTotal: 2600000,
            image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop',
          },
        ],
      },
      {
        id: 'demo-ord-2',
        orderNumber: 'CT-260815-19402',
        createdAt: '2026-08-15T14:15:00Z',
        status: 'PROCESSING',
        total: 1540000,
        itemCount: 3,
        items: [
          {
            sku: 'ST2536-50',
            productTitle: 'Paralon ST-2536 Standart List',
            quantity: 10,
            unitType: 'sheet',
            unitPrice: 88000,
            lineTotal: 880000,
            image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop',
          },
          {
            sku: 'F30D',
            productTitle: 'Pnevmatik Mix Qoqqich F30D',
            quantity: 2,
            unitType: 'pcs',
            unitPrice: 330000,
            lineTotal: 660000,
            image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop',
          },
        ],
      },
    ];
  }
}
