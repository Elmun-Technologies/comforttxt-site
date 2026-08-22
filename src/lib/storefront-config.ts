export const storefrontConfig = {
  brandName: 'Comfort TXT',
  taglineUz: 'Mebel materiallari — Professional tanlov',
  taglineRu: 'Мебельные материалы — Профессиональный выбор',
  
  phone: '+998 (71) 200-88-99',
  phoneRaw: '+998712008899',
  phoneTel: 'tel:+998712008899',
  
  telegramUrl: 'https://t.me/comforttxt',
  telegramChannelUrl: 'https://t.me/comforttxt',
  telegramBotUrl: 'https://t.me/comforttxt_bot',
  
  instagramUrl: null, // Replace when real account is confirmed
  
  workingHoursUz: 'Dush-Shan: 09:00 - 18:00',
  workingHoursRu: 'Пн-Сб: 09:00 - 18:00',
  
  addressUz: 'Toshkent shahri',
  addressRu: 'г. Ташкент',
  
  isDemoMode: false,
};

export type MockProduct = {
  id: string;
  slug: string;
  titleUz: string;
  titleRu: string;
  descriptionUz: string;
  descriptionRu: string;
  categorySlug: string;
  categoryNameUz: string;
  categoryNameRu: string;
  unitType: string;
  minQtyStep: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  specs: { specKey: string; specValueUz: string; specValueRu: string }[];
  variants: {
    id: string;
    sku: string;
    nameUz: string;
    nameRu: string;
    colorHex: string;
    colorName: string;
    price: number;
    wholesalePrice: number;
    stock: number;
    images: string[];
  }[];
};
