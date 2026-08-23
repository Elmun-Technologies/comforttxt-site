# Comfort Textile — Qo'llash Rejasi (Implementation Roadmap)

> `01-TAHLIL.md` dagi topilmalarni amaliy sprintlarga bo'lingan reja.
> Har bir vazifa: **nima → qayerda → qanday tekshiriladi**.

---

## Umumiy ko'rinish

| Faza | Nomi | Vazifalar | Asosiy natija |
| --- | --- | --- | --- |
| **0** | Poydevor va texnik qarz | 6 | Filtrlash reload'siz ✅, tiplar, skeleton ✅ |
| **1** | Professional xarid tajribasi | 12 | Aniq qoldiq ✅, hajmli narx ✅, list-view, kalkulyator |
| **2** | B2B yadro | 10 | Ro'yxatlar/smeta, kabinet, individual narx |
| **3** | Ishonch va kontent | 9 | Gaydlar, sharhlar, brendlar, yangi sahifalar |
| **4** | Kengaytirish | 7 | Excel-buyurtma, EDO, analitika, foto-qidiruv |

**Holat (2026-08-23):** Faza 0 dan 4/6, Faza 1 dan 5/12 vazifa bajarildi — batafsil har bir
bo'limda "✅ BAJARILDI" belgisi bilan. Qolganlar keyingi sessiyalar uchun ochiq.

---

## FAZA 0 — Poydevor (texnik qarz)

> Bularsiz keyingi fazalar sifatli chiqmaydi.

### 0.1 Filtrlashni reload'siz qilish `P0` · Pattern #11 · ✅ BAJARILDI
- **Nima:** `window.location.href` va full `router.push` ni `useRouter` + `scroll: false` +
  `useTransition` ga almashtirish. URL state saqlanadi (SEO + ulashish uchun).
- **Fayllar:** `src/components/catalog/CatalogClient.tsx`, `CategoryFilterSidebar.tsx`,
  `CategoryClient.tsx`
- **Tekshirish:** filtr bosilganda sahifa "sakramaydi", scroll pozitsiya saqlanadi, orqaga tugmasi ishlaydi.
- **Holat:** `CategoryFilterSidebar`ning asosiy filtr tugmalari allaqachon `router.push` ishlatgan
  edi. Haqiqiy og'riq nuqtasi — chip o'chirish va "Barchasini tozalash" `window.location.href`
  bilan to'liq reload qilardi — shu ikkisi `router.push(url, { scroll: false })` ga o'tkazildi
  (`CatalogClient.tsx`, `CategoryClient.tsx`). `useTransition` hozircha qo'shilmadi — server-side
  filtrlash (0.2) amalga oshganda kerak bo'ladi.

### 0.2 Server-side filtrlash
- **Nima:** Filtrlash mantig'ini `CatalogClient` dan `StorefrontService.getProducts()` ga ko'chirish.
  Client faqat render qiladi.
- **Fayllar:** `MockStorefrontService.ts`, `ShopFlowStorefrontService.ts`, `catalog/page.tsx`
- **Tekshirish:** `getProducts({texture:'velyur', minPrice:...})` to'g'ri natija qaytaradi (test).

### 0.3 Tiplarni tiklash
- **Nima:** `product: any` → `StorefrontProduct`. Barcha `any` larni yo'q qilish.
- **Fayllar:** `ProductCard.tsx`, `CatalogClient.tsx`, `CompareClient.tsx`
- **Tekshirish:** `npx tsc --noEmit` toza.

### 0.4 Skeleton komponentlari · ✅ BAJARILDI
- **Nima:** `ui/Skeleton.tsx` + `ProductCardSkeleton`, `PDPSkeleton`, `ListRowSkeleton`.
  `loading.tsx` larda ishlatish.
- **Tekshirish:** `NEXT_PUBLIC_MOCK_LATENCY_MS=1500 npm run dev` — skeleton ko'rinadi.
- **Holat:** `ui/Skeleton.tsx` (`Skeleton`, `ProductCardSkeleton`, `ProductDetailSkeleton`) qurildi.
  Root `[locale]/loading.tsx` shularga o'tkazildi; `/product/[slug]/loading.tsx` yangi qo'shildi
  (`ProductDetailSkeleton`). `ListRowSkeleton` — list-view (1.4) qurilganda kerak bo'ladi.

### 0.5 Umumiy UI primitivlari · ✅ QISMAN
- `ui/Tooltip.tsx` — hover + tap (mobil), klaviatura bilan ochiladi (a11y) — ✅ qurildi
- `ui/CopyButton.tsx` — clipboard + "Nusxalandi" toast — ✅ qurildi (mavjud `useToastStore` orqali)
- `ui/QuantityStepper.tsx` — `step`, `min`, `unit`, klaviaturadan kiritish — ✅ qurildi
- `ui/Sticky.tsx` — sticky konteyner helper — hali yo'q (2.9 bilan birga qurilsin)

### 0.6 Ma'lumot modeli kengaytirish · ✅ BAJARILDI (mock qatlam)
- **Nima:** `types.ts` ga `priceTiers`, `onHandQuantity`, `tooltipUz/Ru`, `analogProductIds`,
  `brandSlug`, `rating`, `reviewCount` qo'shish. `MockStorefrontService` da to'ldirish.
  Prisma sxemasiga mos migratsiya.
- **Tekshirish:** `npm test` o'tadi, seed ishlaydi.
- **Holat:** `types.ts` maydonlari oldingi sessiyada qo'shilgan edi, lekin `MOCK_PRODUCTS` ularni
  to'ldirmasdi — UI hech narsa ko'rsatolmasdi. `src/services/storefront/mockEnrichment.ts`
  (`enrichMockProduct`) endi har bir variant uchun SKU'dan deterministik `onHandQuantity` va
  `wholesalePrice`dan 3-pog'onali `priceTiers` hosil qiladi — ~50 SKUni qo'lda to'ldirmasdan.
  ShopFlow production'da bu qiymatlarni to'g'ridan-to'g'ri beradi, `mockEnrichment.ts` faqat
  mock qatlamda ishlaydi. Prisma migratsiyasi hali qilinmagan (ShopFlow integratsiyasi bilan
  birga).

---

## FAZA 1 — Professional xarid tajribasi

### 1.1 Aniq qoldiq ko'rsatish `P0` · Pattern #29, #36 · ✅ BAJARILDI
- **Nima:** "Omborda bor" → **"Omborda 340 m"**. Kam qolganda: **"Faqat 12 m qoldi"** (sariq).
  Yo'q bo'lganda: "Buyurtma bo'yicha · ~7 kun".
- **Yangi:** `product/StockIndicator.tsx`
- **Fayllar:** `ProductCard.tsx`, `ProductDetailClient.tsx`, `lib/formatters.ts`
- **Tekshirish:** 4 ta stok holati uchun to'g'ri matn va rang.
- **Holat:** Qurildi va ikkala joyda ulandi. `lib/formatters.ts`ga `formatQuantity()` qo'shildi
  (0.5 qadamli metrajni "3.5" kabi toza ko'rsatish uchun). Haqiqiy son `mockEnrichment.ts`dan
  keladi (0.6 ga qarang).

### 1.2 Hajmli narx pog'onalari `P0` · Pattern #20 · ✅ BAJARILDI
- **Nima:** PDP va kartochkada narx jadvali:
  | Miqdor | Narx / m |
  |---|---|
  | 1–9 m | 145 000 |
  | 10–49 m | 132 000 *(−9%)* |
  | 50+ m | 118 000 *(−19%)* |
  Miqdor o'zgarganda **avtomatik** faol pog'ona ajratiladi va yakuniy narx yangilanadi.
- **Yangi:** `product/PriceTierTable.tsx`, `lib/calc.ts` ga `resolveTierPrice()`
- **Tekshirish:** unit test — 9→1-tier, 10→2-tier, 50→3-tier, chegara qiymatlar.
- **Holat:** `resolveTierPrice()` va testlar allaqachon oldingi sessiyada bor edi
  (`lib/pricing/tiers.ts`, `tests/price-tiers.test.ts`). Bu sessiyada `PriceTierTable.tsx`
  qurildi va PDP narx blokiga ulandi, faol pog'ona joriy miqdorga qarab ajratib ko'rsatiladi.
  Kartochkadagi qisqa hint (masalan "10 m dan −24%") hali qo'shilmadi — keyingi qadam.

### 1.3 Kartochkada miqdor + savatga `P0` · Pattern #25 · ✅ BAJARILDI
- **Nima:** `QuantityStepper` ni `ProductCard` ga qo'shish. Savatga qo'shgandan keyin tugma
  "Savatda: 45 m" ga aylanadi va stepper savatni to'g'ridan-to'g'ri boshqaradi.
- **Fayllar:** `ProductCard.tsx`, `store/useCartStore.ts`
- **Holat:** Stepper kartochkada, tanlangan miqdor va "Jami" ko'rsatiladi, savatchaga aynan shu
  miqdor qo'shiladi. "Savatda: N m" holatiga aylanish (savat bilan ikki tomonlama sinxronizatsiya)
  hali qilinmadi — hozircha har bosishda savatga qo'shiladi (mavjud `addItem` mantig'i miqdorlarni
  qo'shib boradi, xato emas, lekin UX sifatida keyingi safar yaxshilash mumkin).

### 1.4 Grid ↔ List ko'rinish `P0` · Pattern #10
- **Nima:** Katalogda ko'rinish almashtirgich. **List qatori:** rasm(64px) · nom+SKU · asosiy
  spetslar · qoldiq · narx pog'onasi · stepper · savat tugmasi. Tanlov `localStorage` da saqlanadi.
- **Yangi:** `catalog/ViewModeToggle.tsx`, `catalog/ProductRow.tsx`
- **Tekshirish:** reload dan keyin tanlangan rejim saqlanadi.

### 1.5 Filtrlarda tooltip `P0` · Pattern #17 · ✅ BAJARILDI
- **Nima:** Har bir texnik parametr yonida `?` ikonkasi:
  - ST/EL/HR — "ST — standart zichlik, kundalik yuk uchun..."
  - Martindale — "Ishqalanishga chidamlilik. 20 000+ — uy mebeli, 40 000+ — kommertsiya"
  - g/m² — "Matoning zichligi. Yuqori — bardoshli"
- **Fayllar:** `CategoryFilterSidebar.tsx`, `ProductDetailClient.tsx` (spetslar tabi)
- **Ma'lumot:** `src/data/spec-glossary.ts` (yangi) — UZ/RU tushuntirishlar
- **Holat:** `spec-glossary.ts` oldingi sessiyada tayyor edi, lekin hech qayerda ishlatilmasdi.
  `ui/Tooltip.tsx` shu sessiyada qurildi va ikkala joyga ulandi: filtr sarlavhalari (tekstura,
  paralon markasi, instrument turi) va PDP xususiyatlar jadvalidagi har bir qator.

### 1.6 Ko'p darajali menyu `P0` · Pattern #4, #3
- **Nima:** MegaMenu ni 3 darajaga kengaytirish + har bir kategoriya yonida **tekstura mini-rasm**.
  Hover da o'ng panelda podkategoriya preview.
- **Fayllar:** `MegaMenu.tsx`, `src/data/navigation.ts` (ierarxik struktura)

### 1.7 Kategoriya sahifasida podkategoriya chip'lari `P0` · Pattern #9
- **Yangi:** `catalog/SubcategoryChips.tsx` — kategoriya sahifasi yuqorisida gorizontal
  scroll qilinadigan plitkalar (rasm + nom + soni).

### 1.8 Qidiruv natijalarini guruhlash `P0` · Pattern #8, #7
- **Nima:** `SearchOverlay` ni qayta tuzish: **SKU aniq mos** (yuqorida, alohida) →
  Mahsulotlar → Kategoriyalar → Kolleksiyalar → Gaydlar. Plus **qidiruv tarixi** (localStorage, 8 ta).
- **Fayllar:** `SearchOverlay.tsx`, `api/search/route.ts`

### 1.9 Mobil tab-bar `P0` · Pattern #2
- **Yangi:** `layout/MobileTabBar.tsx` — pastda fixed: Bosh · Katalog · Qidiruv · Savat(badge) · Kabinet.
  PDP da `StickyMobilePurchaseBar` bilan to'qnashmasligi kerak (z-index + padding-bottom).

### 1.10 SKU nusxalash `P1` · Pattern #21 · ✅ BAJARILDI
- **Nima:** `CopyButton` ni kartochka va PDP dagi SKU chip yoniga.
- **Holat:** Qurildi va ikkala joyga ulandi, `useToastStore` orqali "SKU nusxalandi" tasdig'i bilan.

### 1.11 Material kalkulyatori `P0` · YANGI SAHIFA `/calculator`
- **Nima:** Bizning eng kuchli differensiatorimiz.
  1. Mebel turi: divan (to'g'ri / burchakli) / krovat / stul / bosh taxta
  2. O'lchamlari (sm)
  3. Natija: **kerakli mato (m, en 140 sm hisobga olib) + paralon (list, qalinlik bo'yicha) +
     mexanizm turi + taxminiy skoba/yelim**
  4. → "Hammasini savatga" yoki "Ro'yxat sifatida saqlash"
- **Yangi:** `src/app/[locale]/calculator/page.tsx`, `components/calculator/SofaCalculator.tsx`,
  `src/lib/material-calc.ts`
- **Tekshirish:** unit testlar — ma'lum o'lchamlar uchun kutilgan metraj.

### 1.12 B2B tejamkorlik indikatori `P0`
- **Nima:** B2B foydalanuvchi kirganda savatda: **"Ulgurji narx bilan 1 240 000 so'm tejadingiz"**.
  Kartochkada: "Sizning narxingiz" yorlig'i.
- **Yangi:** `b2b/SavingsBadge.tsx`

---

## FAZA 2 — B2B yadro

### 2.1 Ro'yxatlar / Loyiha smetalari `P0` · Pattern #23, #48 · YANGI `/lists`
- **Nima:** Foydalanuvchi nomlanadigan ro'yxatlar yaratadi ("Divan Luna — 12 dona seriya").
  - Kartochka/PDP dan "Ro'yxatga qo'shish" (dropdown: mavjud ro'yxat yoki yangi)
  - Savatni butunlay "Smeta sifatida saqlash"
  - Ro'yxatdan: hammasini savatga · nusxalash · **PDF eksport** · Telegram orqali ulashish
  - Mehmon uchun localStorage, kirgan uchun server
- **Yangi:** `store/useListsStore.ts`, `components/lists/*`, `app/[locale]/lists/`,
  `api/lists/route.ts`

### 2.2 Savatchani qayta ishlash `P0` · Pattern #47, #49, #51, #52, #53, #46
- Pozitsiyalar oldida **checkbox** — faqat tanlanganlarni rasmiylashtirish
- Kategoriya bo'yicha **guruhlash** (Mato / Paralon / Mexanizm / Furnitura)
- O'chirishda **Undo toast** (5 soniya)
- **Ulashish** — Telegram/nusxalash havolasi
- Har bir pozitsiya yonida **hamroh tovar** tavsiyasi
- Desktop da **sticky yakun** bloki
- **Fayllar:** `CartClient.tsx`, `useCartStore.ts`, yangi `cart/*` komponentlar

### 2.3 To'liq B2B kabinet `P0` · YANGI `/account/*`
| Sahifa | Tarkib |
| --- | --- |
| `/account` | Dashboard: oxirgi buyurtma, balans, menejer, tez havolalar |
| `/account/orders` | Ro'yxat + filtr + status + **"Takrorlash"** tugmasi |
| `/account/orders/[num]` | Detal: pozitsiyalar, status timeline, hujjatlar |
| `/account/lists` | Ro'yxatlar/smetalar |
| `/account/company` | Tashkilot(lar), rekvizitlar, xodimlar va rollar |
| `/account/documents` | Hisob-faktura, sertifikat, shartnoma (PDF) |
| `/account/settings` | Profil, til, bildirishnomalar |

### 2.4 Shaxsiy menejer `P0`
- **Nima:** B2B mijoz uchun header va kabinetda menejer kartasi: foto · ism · telefon · Telegram.
- **Yangi:** `b2b/ManagerCard.tsx`

### 2.5 Individual narxlar `P0`
- **Nima:** `customer.b2bDiscountPercent` yoki shartnoma narx ro'yxati. Server tomonida
  hisoblanadi (`getCartPricing`), client hech qachon narxni o'zi hisoblamaydi.

### 2.6 Cross-sell PDP da `P0` · Pattern #34, #35
- **Nima:** PDP birinchi ekranida: **"Bu bilan birga oladilar"** gorizontal lenta.
  Mato → paralon + yelim + skoba. Pastroqda: "O'xshash matolar".
- **Yangi:** `product/CrossSellStrip.tsx`

### 2.7 Analoglar va stok-alert `P1` · Pattern #27, #28
- Yo'q bo'lganda: **"Analoglarni ko'rish"** (o'xshash tekstura/rang/narx)
- **"Kelganda xabar bering"** — telefon + Telegram, `StockAlert` lead

### 2.8 Checkout yaxshilash `P0` · Pattern #57, #58, #56, #59
- Viloyat → Tuman **kaskad select** (O'zbekiston ma'lumotlari)
- **Real-time validatsiya** (telefon maskasi `+998 (__) ___-__-__`)
- Yetkazish sanasini tanlash (kalendar)
- Mobil sticky "Buyurtma berish"
- **Fayllar:** `CheckoutForm.tsx`, yangi `src/data/uz-regions.ts`

### 2.9 Sticky elementlar `P1` · Pattern #32, #38, #46
- PDP: o'ng ustun sticky, tab-bar sticky
- Savat: yakun bloki sticky

### 2.10 Filtr ichida qidiruv + modal `P1` · Pattern #15, #14, #18
- Uzun ro'yxatlarda (rang, kolleksiya, brend) qidiruv maydoni
- "Barcha filtrlar" modali
- Mobil filtrda sticky "Qo'llash / Tozalash"

---

## FAZA 3 — Ishonch va kontent

### 3.1 Yangi statik sahifalar
| Route | Tarkib |
| --- | --- |
| `/delivery` | Yetkazib berish usullari, muddat, narx, to'lov usullari, qaytarish |
| `/contacts` | Telefon, Telegram, manzil, xarita, ish vaqti, forma |
| `/about` | Kompaniya, ombor fotosuratlari, hamkorlar |
| `/faq` | Kategoriyalar bo'yicha savol-javob (accordion) |
| `/services` | Mato kesish, paralon o'lchamga kesish, yetkazish |

### 3.2 Gaydlar `/guides` · Pattern #30
- "Divan uchun matoni qanday tanlash" · "ST, EL, HR paralon farqi" ·
  "Martindale va zichlik" · "Transformatsiya mexanizmi turlari"
- Kategoriya sahifasi va PDP dan kontekstli havola
- **SEO:** aynan shu so'rovlar bo'yicha organik trafik

### 3.3 Sharhlar `P1` · Pattern #39, #40
- Reyting + fotosuratli sharhlar. **Mebelchi tayyor divan rasmini joylaydi** — bizning nishada
  eng kuchli ijtimoiy dalil. "Tasdiqlangan xarid" belgisi.
- **Yangi:** `product/ReviewsSection.tsx`, `api/reviews/*`, Prisma `ProductReview`

### 3.4 Brendlar `/brands` · Yangi
- Mato ishlab chiqaruvchilar bo'yicha katalog + brend landing sahifalari.

### 3.5 Aksiyalar `/promo` · Yangi
- Stok matolar, mavsumiy chegirmalar. Bosh sahifada banner sloti.

### 3.6 Buyurtma kuzatish `/order-track`
- Mehmonlar uchun: buyurtma raqami + telefon → status timeline.

---

## FAZA 4 — Kengaytirish

| # | Vazifa | Izoh |
| --- | --- | --- |
| 4.1 | **Excel/CSV dan buyurtma** | Fabrika 200 pozitsiyali ro'yxat yuklaydi → savat |
| 4.2 | **Rasm bo'yicha qidiruv** | Divan rasmi → o'xshash mato (embedding qidiruv) |
| 4.3 | EDO integratsiya | Didox / Faktura.uz |
| 4.4 | Kredit limiti va otsrochka | Balans, qarzdorlik bildirishnomalari |
| 4.5 | Reklamatsiya moduli | Pretenziya + chat |
| 4.6 | Ombor/filiallar xaritasi | Qoldiq filial bo'yicha |
| 4.7 | Mijoz analitikasi | "Yilda 4 200 m oldingiz" + tavsiyalar |

---

## Sprint taqsimoti

| Sprint | Faza | Asosiy natija |
| --- | --- | --- |
| **S1** (1 hafta) | 0.1–0.6 | Filtr tez, tiplar toza, primitivlar tayyor |
| **S2** (1 hafta) | 1.1–1.5 | Aniq qoldiq, hajmli narx, list-view, tooltiplar |
| **S3** (1 hafta) | 1.6–1.12 | Menyu, qidiruv, mobil tab-bar, **kalkulyator** |
| **S4** (1.5 hafta) | 2.1–2.2 | **Ro'yxatlar/smeta**, yangi savatcha |
| **S5** (1.5 hafta) | 2.3–2.6 | **B2B kabinet**, menejer, individual narx, cross-sell |
| **S6** (1 hafta) | 2.7–2.10 | Analoglar, checkout, sticky, filtrlar |
| **S7** (1 hafta) | 3.1–3.2 | Statik sahifalar + gaydlar (SEO) |
| **S8** (1 hafta) | 3.3–3.6 | Sharhlar, brendlar, aksiyalar, kuzatish |
| **S9+** | 4.x | Kengaytirish |

---

## Muvaffaqiyat mezonlari (KPI)

| Metrika | Hozir | Maqsad |
| --- | --- | --- |
| Katalog → PDP o'tish | — | +25% (list-view, aniq qoldiq) |
| PDP → savat konversiya | — | +30% (hajmli narx, cross-sell) |
| O'rtacha chek | — | +20% (cross-sell, kalkulyator, ro'yxatlar) |
| Takroriy buyurtma ulushi | — | 40%+ (kabinet, "Takrorlash") |
| Mobil konversiya | — | Desktop bilan tenglashtirish |
| Katalog sahifa yuklanishi | full reload | <200ms (SPA filtr) |

---

## Prinsiplar

1. **Server — narx bo'yicha yagona haqiqat manbai.** Client hech qachon yakuniy narxni hisoblamaydi.
2. **Yangi sahifa = `PageHero` + `EmptyState`.** Qo'lda `<h1>` yozilmaydi.
3. **Har bir yangi tekst ikki tilda** (`messages/uz.json`, `ru.json`).
4. **Tasdiqlanmagan ma'lumot chop etilmaydi.** `storefrontConfig` bo'sh bo'lsa — UI yashiradi.
5. **Har bir P0 vazifa uchun test** (`tests/`).
6. **Mobil birinchi navbatda** — min 44px tap-target, sticky CTA.
