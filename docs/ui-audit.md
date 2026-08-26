# Storefront UI Audit — haqiqiy mahsulotlarga tayyorlik (2026-08-25)

**Maqsad:** sayt hozir mock katalog bilan ishlayapti; endi ustaxonaga **haqiqiy mahsulotlar**
joylanadi. Audit shu o'tish davri uchun UI'ning to'siq bo'ladigan joylarini aniqladi.

**Doira (kelishilgan):** faqat storefront UI. Ma'lumotlar hali mock'da qoladi, admin CRUD
va DB qatlami keyingi bosqich.

---

## 1. Topilmalar (findings)

| # | Topilma | Ta'sir | Holat |
|---|---------|--------|-------|
| 1 | **Rasm qatlami universal emas.** Product rasmlari oddiy `<img>` bilan, `next.config` esa faqat `images.unsplash.com` hostiga ruxsat beradi. Supabase Storage / tashqi CDN URL'i kelganda `next/image` ishlamaydi, xom `<img>` esa optimizatsiyasiz qoladi. | Yuqori | ✅ tuzatildi |
| 2 | **`object-cover`/`object-contain` qarori mo'rt heuristikada.** `ProductCard` da `categorySlug === 'mebel-matolari'` qattiq tekshiruvi bor: haqiqiy slug boshqacha bo'lsa (yoki yangi kategoriya qo'shilsa) paralon mexanizmi kvadratga "cover" bilan kesiladi yoki mato "contain" bilan kichrayib qoladi. | Yuqori | ✅ tuzatildi |
| 3 | **Chegirma (`oldPrice`) hech qayerda ko'rsatilmaydi.** Tipda maydon bor, leken karta, PDP, savatcha — hech birida ustirilgan narx yoki `-X%` nishoni yo'q. Haqiqiy katalogda aksiya narxi oddiy hol. | Yuqori | ✅ tuzatildi |
| 4 | **Bayroqlar to'liq ishlanmagan.** Kartada faqat `isNew` ko'rinadi; `isPopular` (7 productda bor) UI'da umuman ishlatilmaydi. | O'rta | ✅ tuzatildi |
| 5 | **Rasm yuklanish/xato holatlari yo'q.** Sekin yuklangan rasm — bo'sh kvadrat; buzilgan URL — brauzerning "broken image" ikonkasi. Haqiqiy foto-journal bilan bu kunda bir necha marta sodir bo'ladi. | Yuqori | ✅ tuzatildi |
| 6 | **`colorHex` yo'q variant — kulrang doira.** Haqiqiy katalogda har bir variantga HEX yozilmaydi; kulrang doira "kulrang mato" deb o'qiladi. | O'rta | ✅ tuzatildi |
| 7 | **PDP galereyasi kambag'al:** rasm sanog'i yo'q, mobil/klaviatura navigatsiyasi yo'q, matolar uchun tekstura yaqinlashtirish yo'q. | O'rta | ✅ tuzatildi |
| 8 | **Kam ma'lumotli productlar uchun mustahkamlanmagan render:** variantlar ro'yxati bo'sh bo'lsa, kartada bo'sh SKU chipli, narxi `0` bo'lgan karta chiziladi. | Past | ✅ tuzatildi |
| 9 | **DB'ga qo'yilgan product saytda ko'rinmaydi** — storefront faqat `MockStorefrontService`dan o'qiydi (`PrismaStorefrontService` yo'q). Bu UI emas, arxitektura topilmasi; keyingi bosqichda hal qilinadi. | Bloker (keyingi) | ⏳ auditga kiritildi |
| 10 | **Admin panelda product CRUD yo'q** — faqat buyurtma/ombor/ulgurji so'rovlar boshqaruvi bor. Haqiqiy joylashuv boshlanganda kerak bo'ladi. | Bloker (keyingi) | ⏳ auditga kiritildi |

## 2. Nima qilindi (shu branch'da)

### 2.1 Universal `ProductImage` komponenti
`src/components/product/ProductImage.tsx` — barcha product rasmlari uchun yagona komponent:

- **Manbdan qat'i nazar ishlaydi:** lokal `/public`, Supabase Storage, tashqi CDN — URL'ni
  o'zi hal qiladi (optimizatsiyani `next/image`'ga o'tkazishni soddalashtiradi).
- **Yuklanish shimmer'i** — rasm kelguncha brend uslubidagi pulsatsiya (CLS bo'lmaydi,
  konteyner aspect-ratio'ni ushlab turadi).
- **Xatoga chidamlilik** — buzilgan URL hech qachon brauzer "broken image" ikonkasini
  ko'rsatmaydi, brend `MissingImage` holatiga tushadi.
- **Fit mantiqi markazlashgan** — `resolveImageFit()` (`src/lib/media.ts`): kategoriya
  slug'ining qattiq tekshiruvi o'rniga matolari "cover", qolganlari "contain", noma'lum
  kategoriya uchun xavfsiz default.

### 2.2 Chegirma UI (kartochka + PDP)
- Kartochkada: ustirilgan narx + qizil `-X%` nishoni ( chegirma foizi serverdan emas,
  narxdan hisoblanadi).
- PDP narx qutisida: ustirilgan narx, `-X%` chipi va "Tejaysiz: N so'm" qatori.
- `mockEnrichment` endi haqiqiy katalogdagidek ~30% SKU uchun deterministik `oldPrice`
  generatsiya qiladi (UI'ni real stsenariyda sinash uchun; DB ulanganda o'chadi).

### 2.3 Kartochka/PDP detallari
- `isPopular` → "Ommabop / Хит" nishoni; bayroq tartibi: chegirma → Yangi → Ommabop → B2B.
- HEX'i yo'q variant uchun chiziqli "rangsiz" swatch (kulrang doira emas).
- PDP galereyasi: rasm sanog'i (2/5), prev/next tugmalari, matolar uchun sichqoncha
  bilan tekstura zoom'i (transform-origin tracking bilan).
- Bo'sh variantlar ro'yxati uchun himoyalangan render.

### 2.4 Infra
- `next.config.mjs`: `NEXT_PUBLIC_IMAGE_HOSTS` (vergul bilan) va `NEXT_PUBLIC_SUPABASE_URL`
  dan `remotePatterns` avtomatik yig'iladi — keyinchalik `next/image`'ga o'tish to'siqsiz.
- Qolgan product `<img>` joylari (qidiruv, savatcha, drawer, taqqoslash) `ProductImage`ga
  o'tkazildi — bir joyda boshqariladi.

## 3. Keyingi bosqich tavsiyalari (priority tartibida)

1. **`PrismaStorefrontService`** yozish — aks holda DB'dagi haqiqiy productlar saytda
   ko'rinmaydi (topilma #9). Interfeys (`IStorefrontService`) tayyor, faqat implementatsiya kerak.
2. **Admin panelga product CRUD** (topilma #10) + Supabase Storage'ga yuklash.
3. **`next/image`'ga migratsiya** — `ProductImage` bitta joyda bo'lgani uchun endi bir
   komponentni o'zgartirish kifoya; `NEXT_PUBLIC_IMAGE_HOSTS` allaqachon konfiguratsiya qilinadi.
4. **Foto-gideline** (kontent menejer uchun): kvadrat 1:1, min 1200×1200, matolar uchun
   makro tekstura kadri + umumiy plan, bir xil fon. Bu gideline'ni admin yuklash formasi
   validation'iga aylantirish mumkin.
5. Katalog kattalashganda (500+ SKU) klient tomonlama filtrni server pagination'ga o'tkazish.

## 4. Sinov

- `npm run test` — mock-enrichment testlari kengaytirildi (oldPrice determinizmi, chegaralari).
- `npm run build` muvaffaqiyatli.
- Qo'lda: `/uz/catalog`, `/uz/product/*`, savatcha, qidiruv, taqqoslash sahifalari tekshirildi.

---

## 5. Optimizatsiya va fixlar bosqichi (2026-08-26)

Yuqoridagi "Keyingi bosqich" ro'yxatidan mustaqil, storefront UI'ni ishlash tezligi,
to'g'rilik va qulaylik nuqtai nazaridan tekshirgan ikkinchi audit. Arxitektura
o'zgarishlari (DB, admin CRUD, `next/image`) doiradan tashqarida qoldi.

### 5.1 Ishlash tezligi (performance)
- `CatalogClient` va `CategoryClient`: filtr/saralash pipeline'i endi `useMemo` bilan
  o'raladi — mobil filtr panelini ochish kabi aloqador bo'lmagan re-render butun
  mahsulot ro'yxatini qayta filtrlashga majburlamaydi.
- `CategoryFilterSidebar`: narx (min/max) inputlari endi mahalliy state'da debounce
  qilinadi (450ms) — har bir raqam kiritilganda darhol `router.push` chaqirilmaydi,
  fokus yo'qolmaydi.

### 5.2 To'g'rilik (correctness) fixlari
- **Savatchadagi minimal buyurtma hajmi**: `CartItem`ga `minQuantity` maydoni qo'shildi;
  `useCartStore`ning `addItem`/`updateQuantity` metodlari endi variant bo'yicha haqiqiy
  minimal buyurtma hajmini hurmat qiladi — avval faqat qadam (`minQtyStep`) tekshirilardi,
  savatchada "-" tugmasi bilan haqiqiy minimumdan pastga tushirish mumkin edi.
- **Til bo'yicha noto'g'ri toast xabarlari**: `useFavoritesStore`/`useCompareStore`dagi
  toast matnlari qattiq o'zbekcha yozilgan edi; endi `locale` parametri qabul qilinadi va
  ruscha interfeysda ham to'g'ri tilda ko'rsatiladi.
- **Telefon validatsiyasi**: `QuickOrderModal`, `WholesalePortalClient`, `SampleBoxClient`
  formalari `phone.length < 9` kabi zaif tekshiruv o'rniga umumiy `isValidUzPhone`/
  `normalizeUzPhone` (`lib/utils/phone.ts`) dan foydalanadi — `CheckoutForm`dagi bilan bir xil.
- **Xotira sızıntısi**: "Qo'shildi" holatini boshqaruvchi `setTimeout`lar (`ProductCard`,
  `ProductDetailClient`, `StickyMobilePurchaseBar`) endi umumiy `useTimedFlag` hook'i
  orqali boshqariladi — komponent unmount bo'lganda yoki tez-tez bosilganda eski taymer
  tozalanadi.

### 5.3 Qulaylik (UX) fixlari
- Yangi `useOverlay` hook (`lib/hooks/useOverlay.ts`) — fon skrollini bloklash + Escape
  bilan yopish endi bitta joyda; `CartDrawer`, `MobileNav`, `SearchOverlay` va (avval
  buni umuman qilmagan) mobil `CategoryFilterSidebar` shu orqali ishlaydi.
- Ikonka-tugmalarga (`aria-label`): mobil menyu, mobil qidiruv, savatcha/menyu/filtr
  yopish tugmalari uchun qo'shildi.
- Kategoriyalar MegaMenu tetikleyicisi endi klaviatura bilan ham ochiladi (`onFocus`,
  `onClick` toggle) va `aria-haspopup`/`aria-expanded` beriladi — avval faqat sichqoncha
  bilan ishlardi.

### 5.4 Sinov
- `npm run test` — barcha 64 test o'tdi.
- `npm run build` — muvaffaqiyatli (typecheck + lint + prerender).
