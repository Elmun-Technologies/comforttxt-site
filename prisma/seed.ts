import { PrismaClient } from '@prisma/client';
import {
  Role,
  CustomerType,
  UnitType,
  ImageType,
  StockStatus,
  MovementType,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  DeliveryMethod,
  WholesaleStatus,
} from '../src/lib/enums';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed for production PostgreSQL schema...');

  // Clean existing tables
  await prisma.auditLog.deleteMany();
  await prisma.inventoryMovement.deleteMany();
  await prisma.inventory.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.quickOrderRequest.deleteMany();
  await prisma.wholesaleRequest.deleteMany();
  await prisma.sampleRequest.deleteMany();
  await prisma.productSpecification.deleteMany();
  await prisma.specificationDefinition.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productPrice.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.cmsBlock.deleteMany();

  // Users
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@comforttxt.uz',
      phone: '+998901234567',
      firstName: 'Admin',
      lastName: 'Comfort',
      role: Role.SUPER_ADMIN,
      customerType: CustomerType.RETAIL,
    },
  });

  const b2bUser = await prisma.user.create({
    data: {
      email: 'b2b@mebelfabrika.uz',
      phone: '+998939876543',
      firstName: 'Otabek',
      lastName: 'Rixsiyev',
      role: Role.B2B_CUSTOMER,
      customerType: CustomerType.MANUFACTURER,
      companyName: 'Sharq Mebel MCHJ',
      b2bApproved: true,
      b2bDiscount: 15.0,
    },
  });

  const regularUser = await prisma.user.create({
    data: {
      email: 'customer@gmail.com',
      phone: '+998971112233',
      firstName: 'Javohir',
      lastName: 'Toshpulotov',
      role: Role.CUSTOMER,
      customerType: CustomerType.RETAIL,
    },
  });

  // User Addresses
  await prisma.address.create({
    data: {
      userId: regularUser.id,
      region: 'Toshkent shahri',
      city: 'Yunusobod tumani',
      addressLine: 'Amir Temur ko\'chasi, 45-uy',
      landmark: 'Yunusobod dehqon bozori yaqinida',
      isDefault: true,
    },
  });

  // Categories
  const catFabrics = await prisma.category.create({
    data: {
      slug: 'mebel-matolari',
      nameUz: 'Mebel matolari',
      nameRu: 'Мебельные ткани',
      descriptionUz: 'Keng assortimentdagi velur, rogojka, mikrofibra va zamsh matolari',
      descriptionRu: 'Широкий ассортимент велюра, рогожки, микрофибры и замши',
      icon: 'Palette',
      sortOrder: 1,
    },
  });

  const catFoam = await prisma.category.create({
    data: {
      slug: 'paralon',
      nameUz: 'Paralon (Porolon)',
      nameRu: 'Поролон (ППУ)',
      descriptionUz: 'ST, EL, HR brendli har xil zichlik va qalinlikdagi mebel paralonlari',
      descriptionRu: 'Поролон различной плотности и толщины марок ST, EL, HR',
      icon: 'Layers',
      sortOrder: 2,
    },
  });

  const catMechanisms = await prisma.category.create({
    data: {
      slug: 'mexanizmlar',
      nameUz: 'Transformatsiya mexanizmlari',
      nameRu: 'Механизмы трансформации',
      descriptionUz: 'Divan va kravatlar uchun yuklama ko\'taruvchi mustahkam mexanizmlar',
      descriptionRu: 'Надежные механизмы для диванов и кроватей',
      icon: 'Settings',
      sortOrder: 3,
    },
  });

  const catTools = await prisma.category.create({
    data: {
      slug: 'sarf-materiallar-va-instrumentlar',
      nameUz: 'Sarf materiallari va Asboblar',
      nameRu: 'Расходные материалы и Инструменты',
      descriptionUz: 'Mebel yelimik, zımba skobalari, pnevmatik steplerlar',
      descriptionRu: 'Клей мебельный, скобы, пневмостеплеры',
      icon: 'Hammer',
      sortOrder: 4,
    },
  });

  // Specification Definitions
  const specMartindale = await prisma.specificationDefinition.create({
    data: {
      categoryId: catFabrics.id,
      key: 'martindale',
      labelUz: 'Ishqalanishga chidamlilik',
      labelRu: 'Износостойкость (Мартиндейл)',
      unit: 'sikl',
      sortOrder: 1,
    },
  });

  const specWidth = await prisma.specificationDefinition.create({
    data: {
      categoryId: catFabrics.id,
      key: 'width',
      labelUz: 'Eni (Enlik)',
      labelRu: 'Ширина',
      unit: 'sm',
      sortOrder: 2,
    },
  });

  const specDensity = await prisma.specificationDefinition.create({
    data: {
      categoryId: catFabrics.id,
      key: 'density',
      labelUz: 'Zichlik',
      labelRu: 'Плотность',
      unit: 'g/m²',
      sortOrder: 3,
    },
  });

  const specComposition = await prisma.specificationDefinition.create({
    data: {
      categoryId: catFabrics.id,
      key: 'composition',
      labelUz: 'Tarkibi',
      labelRu: 'Состав',
      sortOrder: 4,
    },
  });

  // Brands
  const brandComfortTextile = await prisma.brand.create({
    data: {
      name: 'Comfort Textile',
      slug: 'comfort-textile',
      country: 'Turkiya',
    },
  });

  const brandRoyalLine = await prisma.brand.create({
    data: {
      name: 'Royal Line',
      slug: 'royal-line',
      country: 'Turkiya',
    },
  });

  const brandComfortFoam = await prisma.brand.create({
    data: {
      name: 'Comfort Foam',
      slug: 'comfort-foam',
      country: 'O\'zbekiston',
    },
  });

  // Collections
  const colLuna = await prisma.collection.create({
    data: {
      slug: 'luna-collection',
      name: 'LUNA Premium Velvet',
      brandId: brandComfortTextile.id,
      categoryId: catFabrics.id,
      descriptionUz: 'Suv yuqtirmaydigan va tirnashga chidamli (Pet Friendly) baxmal matolar',
      descriptionRu: 'Водоотталкивающий и износостойкий премиальный велюр',
      coverImage: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop',
    },
  });

  const colRoyal = await prisma.collection.create({
    data: {
      slug: 'royal-chenille',
      name: 'ROYAL Royal Chenille',
      brandId: brandRoyalLine.id,
      categoryId: catFabrics.id,
      descriptionUz: 'Klassik va zamonaviy yumshoq mebellar uchun oliy navli shenill',
      descriptionRu: 'Высококачественный шенилл для мягкой мебели',
      coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop',
    },
  });

  // Product 1: Luna Velvet
  const pLuna = await prisma.product.create({
    data: {
      titleUz: 'Luna Premium Velur Matosi',
      titleRu: 'Велюр Luna Premium',
      slug: 'luna-premium-velur',
      descriptionUz: 'LUNA velur matosi o\'zining yumshoqligi va yuqori chidamliligi (50 000 Martindale) bilan ajralib turadi. Easy Clean va Pet Friendly xususiyatlariga ega.',
      descriptionRu: 'Велюр LUNA отличается высокой износостойкостью (50 000 циклов Мартиндейла). Обладает свойствами Easy Clean и Pet Friendly.',
      categoryId: catFabrics.id,
      brandId: brandComfortTextile.id,
      collectionId: colLuna.id,
      unitType: UnitType.METER,
      isFeatured: true,
      isPopular: true,
      isNew: true,
    },
  });

  await prisma.productSpecification.createMany({
    data: [
      { productId: pLuna.id, definitionId: specMartindale.id, value: '50 000' },
      { productId: pLuna.id, definitionId: specWidth.id, value: '142' },
      { productId: pLuna.id, definitionId: specDensity.id, value: '380' },
      { productId: pLuna.id, definitionId: specComposition.id, value: '100% Poliester' },
    ],
  });

  // Luna Variants
  const vLuna01 = await prisma.productVariant.create({
    data: {
      productId: pLuna.id,
      sku: 'LUNA-01',
      nameUz: 'Luna 01 (Sutli Krem)',
      nameRu: 'Luna 01 (Молочный)',
      colorNameUz: 'Sutli krem',
      colorNameRu: 'Молочный',
      colorHex: '#F5F5DC',
      minOrderQuantity: 1.0,
      quantityStep: 0.5,
    },
  });

  await prisma.productPrice.create({
    data: {
      variantId: vLuna01.id,
      retailPrice: 68000,
      wholesalePrice: 52000,
    },
  });

  const invLuna01 = await prisma.inventory.create({
    data: {
      variantId: vLuna01.id,
      onHand: 450.5,
      reserved: 0.0,
      status: StockStatus.IN_STOCK,
    },
  });

  await prisma.inventoryMovement.create({
    data: {
      inventoryId: invLuna01.id,
      type: MovementType.RECEIPT,
      quantity: 450.5,
      reason: 'Boshlang\'ich ombor qoldig\'i kiritildi',
    },
  });

  await prisma.productImage.create({
    data: {
      productId: pLuna.id,
      variantId: vLuna01.id,
      url: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop',
      imageType: ImageType.MAIN,
      sortOrder: 1,
    },
  });

  const vLuna05 = await prisma.productVariant.create({
    data: {
      productId: pLuna.id,
      sku: 'LUNA-05',
      nameUz: 'Luna 05 (Zumrad Yashil)',
      nameRu: 'Luna 05 (Изумрудный)',
      colorNameUz: 'Zumrad yashil',
      colorNameRu: 'Изумрудный',
      colorHex: '#004B49',
      minOrderQuantity: 1.0,
      quantityStep: 0.5,
    },
  });

  await prisma.productPrice.create({
    data: {
      variantId: vLuna05.id,
      retailPrice: 68000,
      wholesalePrice: 52000,
    },
  });

  const invLuna05 = await prisma.inventory.create({
    data: {
      variantId: vLuna05.id,
      onHand: 310.0,
      reserved: 0.0,
      status: StockStatus.IN_STOCK,
    },
  });

  await prisma.productImage.create({
    data: {
      productId: pLuna.id,
      variantId: vLuna05.id,
      url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop',
      imageType: ImageType.MAIN,
      sortOrder: 1,
    },
  });

  // Product 2: Royal Chenille
  const pRoyal = await prisma.product.create({
    data: {
      titleUz: 'Royal Shenill Mebel Matosi',
      titleRu: 'Шенилл Royal Mebel',
      slug: 'royal-shenill-mebel',
      descriptionUz: 'Hashamatli fakturaga ega Royal Shenill matosi mebellarga oliyjanob ko\'rinish bag\'ishlaydi.',
      descriptionRu: 'Шенилл Royal придаст вашей мебели роскошный вид. Плотная и приятная текстура.',
      categoryId: catFabrics.id,
      brandId: brandRoyalLine.id,
      collectionId: colRoyal.id,
      unitType: UnitType.METER,
      isFeatured: true,
      isPopular: false,
    },
  });

  const vRoyal10 = await prisma.productVariant.create({
    data: {
      productId: pRoyal.id,
      sku: 'ROYAL-10',
      nameUz: 'Royal 10 (Oltinsimon Bej)',
      nameRu: 'Royal 10 (Золотисто-бежевый)',
      colorNameUz: 'Oltinsimon bej',
      colorNameRu: 'Золотисто-бежевый',
      colorHex: '#D4AF37',
      minOrderQuantity: 1.0,
      quantityStep: 0.5,
    },
  });

  await prisma.productPrice.create({
    data: {
      variantId: vRoyal10.id,
      retailPrice: 85000,
      wholesalePrice: 65000,
    },
  });

  await prisma.inventory.create({
    data: {
      variantId: vRoyal10.id,
      onHand: 220.0,
      reserved: 0.0,
      status: StockStatus.IN_STOCK,
    },
  });

  await prisma.productImage.create({
    data: {
      productId: pRoyal.id,
      variantId: vRoyal10.id,
      url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop',
      imageType: ImageType.MAIN,
    },
  });

  // Product 3: Paralon ST-2536
  const pFoamST = await prisma.product.create({
    data: {
      titleUz: 'Paralon ST-2536 Standart List',
      titleRu: 'Поролон ST-2536 Стандарт',
      slug: 'paralon-st-2536',
      descriptionUz: 'ST-2536 markali mebel paraloni divan suyanchig\'i va stullar uchun mos keladi.',
      descriptionRu: 'Поролон ST-2536 идеален для спинок диванов, стульев и подлокотников.',
      categoryId: catFoam.id,
      brandId: brandComfortFoam.id,
      unitType: UnitType.SHEET,
      isFeatured: false,
      isPopular: true,
    },
  });

  const vFoamST50 = await prisma.productVariant.create({
    data: {
      productId: pFoamST.id,
      sku: 'ST2536-50',
      nameUz: 'ST-2536 Qalinligi 50mm (200x100 sm)',
      nameRu: 'ST-2536 Толщина 50мм (200x100 см)',
      minOrderQuantity: 1.0,
      quantityStep: 1.0,
    },
  });

  await prisma.productPrice.create({
    data: {
      variantId: vFoamST50.id,
      retailPrice: 110000,
      wholesalePrice: 88000,
    },
  });

  await prisma.inventory.create({
    data: {
      variantId: vFoamST50.id,
      onHand: 120.0,
      reserved: 0.0,
      status: StockStatus.IN_STOCK,
    },
  });

  await prisma.productImage.create({
    data: {
      productId: pFoamST.id,
      variantId: vFoamST50.id,
      url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop',
      imageType: ImageType.MAIN,
    },
  });

  // Sample Order
  await prisma.order.create({
    data: {
      orderNumber: 'CT-260820-00001',
      userId: b2bUser.id,
      guestName: 'Otabek Rixsiyev',
      guestPhone: '+998939876543',
      guestEmail: 'b2b@mebelfabrika.uz',
      orderStatus: OrderStatus.PROCESSING,
      paymentMethod: PaymentMethod.BANK_TRANSFER,
      paymentStatus: PaymentStatus.PAID,
      deliveryMethod: DeliveryMethod.COURIER,
      deliveryAddress: 'Toshkent, Sergeli sanoat zonasi, 4-bino',
      subtotal: 2600000,
      deliveryAmount: 0,
      total: 2600000,
      currency: 'UZS',
      locale: 'uz',
      items: {
        create: [
          {
            productId: pLuna.id,
            variantId: vLuna01.id,
            productNameUz: pLuna.titleUz,
            productNameRu: pLuna.titleRu,
            sku: vLuna01.sku,
            variantNameUz: vLuna01.nameUz,
            variantNameRu: vLuna01.nameRu,
            unitType: UnitType.METER,
            unitPrice: 52000,
            quantity: 50.0,
            lineSubtotal: 2600000,
          },
        ],
      },
    },
  });

  // Sample Wholesale Request
  await prisma.wholesaleRequest.create({
    data: {
      userId: b2bUser.id,
      name: 'Otabek Rixsiyev',
      phone: '+998939876543',
      companyName: 'Sharq Mebel MCHJ',
      businessType: CustomerType.MANUFACTURER,
      region: 'Toshkent',
      city: 'Sergeli',
      monthlyPurchaseRange: '500+ m',
      notes: 'Sharq Mebel zavodi uchun ulgurji hamkorlik shartnomasi',
      status: WholesaleStatus.APPROVED,
    },
  });

  // CMS Blocks
  await prisma.cmsBlock.create({
    data: {
      key: 'hero_banner',
      titleUz: 'Sifatli Mebel Matolari va Paralon Ulgurji Narxlarda',
      titleRu: 'Качественные Мебельные Ткани и Поролон по Оптовым Ценам',
      contentJson: JSON.stringify({
        subtitleUz: 'Toshkent bo\'ylab tezkor yetkazib berish hamda B2B ustalar uchun maxsus chegirmalar',
        subtitleRu: 'Быстрая доставка по Ташкенту и специальные скидки для B2B мастеров',
        ctaButtonUz: 'Katalogga o\'tish',
        ctaButtonRu: 'Перейти в каталог',
        ctaLink: '/catalog',
      }),
    },
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
