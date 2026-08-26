# ВсеИнструменты.ру — Chuqur UX/UI va Funksional Tahlil

> **Maqsad:** Rossiyada 15+ yildan beri ishlab kelayotgan, 1143 ta magazin va 140 000 ta korporativ
> mijozga xizmat qiluvchi DIY/B2B e-commerce tizimidan Comfort Textile uchun mos keladigan barcha
> UX, UI va funksional yechimlarni ajratib olish.
>
> **Sana:** 2026-08-22 · **Analiz obyekti:** vseinstrumenti.ru (desktop + mobile + B2B kabinet)

---

## 0. Nega aynan shu sayt?

| Ko'rsatkich | ВсеИнструменты.ру | Comfort Textile (bugun) |
| --- | --- | --- |
| Assortiment | ~300 000 SKU | ~50 mock SKU |
| Sotuv modeli | B2C + B2B bir platformada | B2C + B2B (asosiy: B2B) |
| Mijoz tipi | Usta, prorab, korxona snabjeniyasi | Mebelchi, sex, fabrika |
| Xarid xarakteri | **Takroriy, ko'p pozitsiyali, professional** | **Takroriy, ko'p pozitsiyali, professional** |
| O'lchov birligi | dona / metr / kg / upakovka | metr / list / dona / kg |
| Filial tarmog'i | 1143 magazin, 319 shahar | Ombor(lar) — kelajakda filiallar |

**Asosiy xulosa:** bizning mijoz profilimiz — impulsiv B2C xaridor emas, balki **professional takroriy
xaridor**. Aynan shu profil uchun ВсеИнструменты 15 yil davomida interfeys optimizatsiya qilgan.
Shuning uchun ularning yechimlari bizga marketplace (Uzum, Wildberries) yechimlaridan ko'ra ancha
mos keladi.

---

## 1. Axborot arxitekturasi (Information Architecture)

### 1.1 ВсеИнструменты sahifa xaritasi

```
BOSH SAHIFA
├── KATALOG (ko'p darajali: Kategoriya → Podkategoriya → Tur → Tavsif)
│   ├── Kategoriya landing (SEO matn + podkategoriya plitkalari + populyar filtrlar)
│   ├── Listing (filtr + saralash + grid/list)
│   └── Mahsulot kartochkasi (PDP)
├── BRENDLAR (brendlar katalogi + har bir brend uchun alohida sahifa)
├── AKSIYALAR / Katta chegirma (aksiya landing sahifalari)
├── XIZMATLAR
│   ├── Yetkazib berish (kuryer / transport kompaniya / o'zi olib ketish)
│   ├── To'lov usullari
│   ├── Servis markazi (ta'mirlash, TO, kafolat)
│   ├── Instrument ijarasi (arenda / prokat)
│   └── Almashtirish va qaytarish
├── BIZNES UCHUN (/b2b/)
│   ├── B2B landing (afzalliklar + FAQ + ro'yxatdan o'tish)
│   ├── Tashkilotlarga
│   ├── Yetkazib beruvchilarga (postavshchik kabineti)
│   └── Franshiza
├── SHAXSIY KABINET (/user/)
│   ├── Profil
│   ├── Buyurtmalar (statuslar, hujjatlar, takroriy buyurtma)
│   ├── Tashkilotlar (bir kabinetga bir necha yuridik shaxs)
│   ├── Hujjatlar (hisob-faktura, akt sverki, sertifikatlar, EDO)
│   ├── Balans va kredit limiti
│   ├── Ro'yxatlar (spiski tovarov) — foydalanuvchi to'plamlari
│   ├── Sevimlilar
│   └── Sozlamalar / xodimlar (rol boshqaruvi)
├── MURSHOAT / Qo'llab-quvvatlash (/treatment/)
│   └── Murojaat qoldirish + status kuzatish
├── MAGAZINLAR (xarita + ro'yxat + filial qoldiqlari)
├── KONTENT
│   ├── Maqolalar / gaydlar ("Qanday tanlash kerak")
│   ├── Yangiliklar
│   └── Video-obzorlar
└── KOMPANIYA (Biz haqimizda, Investorlarga, Vakansiyalar, Kontaktlar)
```

### 1.2 Comfort Textile bugungi sahifa xaritasi

```
/                       ✅ bor
/catalog                ✅ bor
/catalog/[category]     ✅ bor
/product/[slug]         ✅ bor
/collections            ✅ bor
/cart                   ✅ bor
/checkout               ✅ bor
/order-success/[num]    ✅ bor
/favorites              ✅ bor
/compare                ✅ bor
/account                ✅ bor (sodda)
/wholesale              ✅ bor (lead forma)
/sample-box             ✅ bor
/blog, /blog/[slug]     ✅ bor
/admin                  ✅ bor
```

**Yetishmayotgan 14 ta yo'nalish (batafsil §4 da):** brendlar, aksiyalar, yetkazib berish/to'lov,
kalkulyatorlar, gaydlar, xizmatlar, magazinlar/omborlar, kontaktlar, biz haqimizda, FAQ/qo'llab-quvvatlash,
ro'yxatlar (smeta), B2B to'liq kabinet, hujjatlar, buyurtma kuzatish.

---

## 2. UX patternlar registri — 60 ta yechim

Quyida `o2k.ru` (KISLOROD) tomonidan o'tkazilgan DIY-segment UX tadqiqotidan olingan 60 ta pattern.
Har biri bizning kontekstga baholangan.

**Ustunlar:**
- **VI?** — ВсеИнструменты da bormi (✔ = aynan ular misol qilib keltirilgan)
- **Biz?** — bizda hozir bormi
- **Prioritet** — P0 (majburiy) / P1 (muhim) / P2 (yaxshi bo'lardi) / ✗ (bizga mos emas)

### 2.1 Navigatsiya (1–9)

| # | Pattern | VI? | Biz? | Prioritet | Comfort Textile uchun izoh |
| --- | --- | --- | --- | --- | --- |
| 1 | Desktop sticky header | | ✅ | — | `Header.tsx` da `sticky top-0` bor |
| 2 | **Mobil sticky header + savat/qidiruv** | ✔ | ⚠️ qisman | **P0** | Mobil pastki tab-bar yo'q. Qo'shish: Bosh / Katalog / Qidiruv / Savat / Kabinet |
| 3 | Menyuda ikonka va mini-rasm | | ⚠️ | **P1** | MegaMenu da ikonka bor, lekin kategoriya **rasmi** yo'q. Mato uchun tekstura preview juda muhim |
| 4 | **Ko'p darajali menyu** | ✔ | ❌ | **P0** | Hozir 2 daraja. Kerak: Kategoriya → Podkategoriya → Tur (masalan Mato → Velyur → Anti-vandal velyur) |
| 5 | **Mobil sticky qidiruv** | ✔ | ❌ | **P1** | Mobil scrollda qidiruv yo'qoladi |
| 6 | Rasm bo'yicha qidiruv | | ❌ | **P2** | Mato uchun **juda kuchli** g'oya: mijoz divan rasmini yuklaydi → o'xshash mato. Faza 3 |
| 7 | **Qidiruv tarixi** | | ❌ | **P1** | localStorage da oxirgi 5–8 so'rov |
| 8 | **Qidiruv natijalarini kategoriya bo'yicha guruhlash** | ✔ | ⚠️ | **P0** | `SearchOverlay` da bor, lekin "Mahsulotlar / Kategoriyalar / Kolleksiyalar / SKU" bo'limlari aniq ajratilishi kerak |
| 9 | Kategoriya ichida katalog ierarxiyasi | | ❌ | **P0** | Kategoriya sahifasida yuqorida podkategoriya "chip"lari/plitkalari |

### 2.2 Katalog va filtrlar (10–19)

| # | Pattern | VI? | Biz? | Prioritet | Izoh |
| --- | --- | --- | --- | --- | --- |
| 10 | **Grid ↔ List ko'rinish** | ✔ | ❌ | **P0** | B2B uchun list/jadval ko'rinishi kritik: SKU + narx + qoldiq + miqdor bir qatorda |
| 11 | **Filtr sahifani qayta yuklamasdan** | | ✅ | — | Asosiy filtrlar `router.push` orqali edi; chip o'chirish/"Barchasini tozalash" esa `window.location.href` ishlatib to'liq reload qilardi — endi ular ham `useRouter().push` ga o'tkazildi (`CatalogClient.tsx`, `CategoryClient.tsx`) |
| 12 | **Kengaytirilgan filtrlar** | ✔ | ⚠️ | **P0** | Mato uchun: tarkib, zichlik (g/m²), en (sm), Martindale, rang oilasi, suv o'tkazmaslik, hayvon tirnog'iga chidamlilik |
| 13 | Magazin/ombor bo'yicha filtr | ✔ | ❌ | **P2** | Bir necha ombor bo'lganda |
| 14 | To'liq filtrlar alohida modalda | | ❌ | **P1** | "Barcha filtrlar" tugmasi |
| 15 | **Filtr ichida qidiruv** | ✔ | ❌ | **P1** | Rang / kolleksiya ro'yxati uzun bo'lganda |
| 16 | Filtr parametrlari bo'yicha umumiy qidiruv | | ❌ | **P2** | |
| 17 | **Filtrlarda tooltip-tushuntirish** | ✔ | ✅ | — | `ui/Tooltip.tsx` + `spec-glossary.ts` endi `CategoryFilterSidebar` filtr sarlavhalarida va PDP xususiyatlar tabida ulangan |
| 18 | Mobil filtrlarda sticky "Qo'llash/Tozalash" | | ❌ | **P1** | |
| 19 | Tanlangan filtrlar chip ko'rinishida | ✔ | ✅ | — | `CatalogClient` da bor ✔ |

### 2.3 Mahsulot kartochkasi — katalogdagi preview (20–30)

| # | Pattern | VI? | Biz? | Prioritet | Izoh |
| --- | --- | --- | --- | --- | --- |
| 20 | **Hajm/miqdorga qarab turli narx** | | ✅ | — | `PriceTierTable.tsx` PDP da ko'rinadi; mock ma'lumot `mockEnrichment.ts` orqali avtomatik generatsiya qilinadi (real 3-pog'ona: 1–9 / 10–49 / 50+) |
| 21 | **SKU ni nusxalash tugmasi** | ✔ | ✅ | — | `ui/CopyButton.tsx` — kartochka va PDP dagi SKU chip yonida |
| 22 | Hover da rasmlarni varaqlash | | ❌ | **P2** | |
| 23 | **Foydalanuvchi ro'yxatlari (spiski)** | ✔ | ❌ | **P0** | Bizda: "Divan №1 loyihasi" ro'yxati — mato + paralon + mexanizm + skoba. **Killer feature** |
| 24 | Preview dan taqqoslashga o'tish | ✔ | ✅ | — | bor |
| 25 | **Kartochkada miqdor +/− va savatga** | ✔ | ✅ | — | `ui/QuantityStepper.tsx` — kartochkaning o'zida, savatchaga aynan tanlangan miqdor qo'shiladi |
| 26 | Preview da yetkazish sanasi | ✔ | ❌ | **P2** | |
| 27 | **"Analoglar" tugmasi (yo'q bo'lganda)** | ✔ | ❌ | **P1** | Mato tugab qolsa — o'xshash tekstura/rangdagi alternativa |
| 28 | **"Kelganda xabar bering"** | ✔ | ❌ | **P1** | Lead yig'ish + talab analitikasi |
| 29 | **Preview da aniq qoldiq** | ✔ | ✅ | — | `product/StockIndicator.tsx` — "Omborda 340 m" / "Faqat 12 m qoldi" / "Buyurtma asosida" |
| 30 | **Foydali kontentga havola** | ✔ | ❌ | **P1** | "Paralonni qanday tanlash" gaydiga kategoriya sahifasidan havola |

### 2.4 Mahsulot sahifasi — PDP (31–45)

| # | Pattern | VI? | Biz? | Prioritet | Izoh |
| --- | --- | --- | --- | --- | --- |
| 31 | Variantlar bir sahifada | | ✅ | — | swatch lar bor ✔ |
| 32 | Galereya yonida sticky CTA blok | ✔ | ❌ | **P1** | Desktop da o'ng ustun sticky bo'lishi |
| 33 | Kartochkada miqdor +/− | | ✅ | — | bor ✔ |
| 34 | **Birinchi ekranda hamroh mahsulotlar** | ✔ | ❌ | **P0** | Mato sotib olayotganda → paralon, yelim, skoba. **Cross-sell = o'rtacha chek** |
| 35 | Birinchi ekranda o'xshash mahsulotlar | | ❌ | **P1** | |
| 36 | **Qoldiq dona/metrda aniq** | ✔ | ✅ | — | §2.3 №29 bilan bir xil — `StockIndicator` PDP galereyasida ham |
| 37 | Diapazon emas, aniq sana | | ❌ | **P2** | |
| 38 | **PDP da sticky tab navigatsiya** | | ⚠️ | **P1** | Tab lar bor, sticky emas |
| 39 | **Fotosuratli sharhlar** | ✔ | ❌ | **P1** | Mebelchi tayyor divan rasmini joylaydi → boshqa mijozlar matoni **ishda** ko'radi. Bizning nishada eng kuchli ijtimoiy dalil |
| 40 | Sharhga foto/video tez qo'shish | ✔ | ❌ | **P2** | |
| 41 | Sharhlarni o'qiyotib savatga qo'shish | ✔ | ❌ | **P2** | |
| 42 | "Xatolik topdingizmi?" | | ❌ | **P2** | |
| 43 | **Mobil sticky "Savatga"** | ✔ | ✅ | — | `StickyMobilePurchaseBar.tsx` bor ✔ |
| 44 | **Tez buyurtma tugmasi** | ✔ | ✅ | — | `QuickOrderModal` bor ✔ |
| 45 | Xaritada/ro'yxatda ombor qoldig'i | | ❌ | **P2** | |

### 2.5 Savatcha va checkout (46–60)

| # | Pattern | VI? | Biz? | Prioritet | Izoh |
| --- | --- | --- | --- | --- | --- |
| 46 | **Savatchada sticky yakun bloki** | | ❌ | **P1** | |
| 47 | **Pozitsiyalarni checkbox bilan tanlash** | | ❌ | **P0** | 20 pozitsiyali savatdan bugun 8 tasini olish — B2B da normal stsenariy |
| 48 | **Savatni smetaga saqlash** | ✔(Petrovich) | ❌ | **P0** | **Bizning killer feature:** "Divan loyihasi smetasi" — nomlab saqlash, PDF eksport, takrorlash |
| 49 | Savatda kategoriya bo'yicha guruhlash | | ❌ | **P1** | Mato / Paralon / Mexanizm / Furnitura bo'limlariga |
| 50 | Checkout dan chiqmasdan tovar qo'shish | | ❌ | **P1** | "Skoba qo'shishni unutdim" |
| 51 | **O'chirishni tasdiqlash + Undo** | ✔ | ❌ | **P1** | |
| 52 | **Savat tarkibini ulashish** | | ❌ | **P1** | Telegram orqali — O'zbekistonda ideal kanal |
| 53 | **Savatdagi tovarlarga tavsiyalar** | ✔ | ❌ | **P1** | |
| 54 | Mavjudlik bo'yicha guruhlash | | ❌ | **P2** | |
| 55 | Punkt tanlash: ro'yxat + xarita | | ❌ | **P2** | |
| 56 | Aniq yetkazish sanasini tanlash | ✔ | ❌ | **P1** | |
| 57 | **Manzil avtoto'ldirish** | ✔ | ❌ | **P1** | Viloyat → Tuman kaskad select |
| 58 | **Real-time forma validatsiyasi** | | ⚠️ | **P0** | Hozir submit da tekshiriladi |
| 59 | Mobil sticky "Buyurtma berish" | ✔ | ❌ | **P1** | |
| 60 | Ro'yxatdan o'tmasdan buyurtma | ✔ | ✅ | — | guest checkout bor ✔ |

### 2.6 Yakuniy hisob

| Prioritet | Soni | Holat |
| --- | --- | --- |
| ✅ Bizda bor | 15 | 25% (+7 shu sessiyada: #11, #17, #20, #21, #25, #29, #36) |
| **P0 — majburiy** | **11** | Faza 1–2 |
| **P1 — muhim** | **23** | Faza 2–3 |
| **P2 — keyinroq** | **11** | Faza 4 |

---

## 3. B2B kabinet tahlili — eng katta imkoniyat

ВсеИнструменты B2B kabineti (140 000 kompaniya) quyidagi bloklardan iborat. Bizning hozirgi
`/wholesale` — bu faqat **lead forma**, kabinet emas.

| Blok | ВсеИнструменты | Comfort Textile rejasi | Prioritet |
| --- | --- | --- | --- |
| Bir kabinetga bir necha yuridik shaxs | ✔ | Sex + MChJ + JN | P1 |
| **Individual narxlar (shartnoma bo'yicha)** | ✔ | Har bir mijozga % chegirma yoki narx ro'yxati | **P0** |
| **Savatda "tejamkorlik" ko'rsatish** | ✔ | "Siz 1 240 000 so'm tejadingiz" | **P0** |
| Hisob-fakturani tez chiqarish | ✔ | PDF invoice generatsiya | P1 |
| Balans va kredit limiti | ✔ | Otsrochka bilan ishlash | P1 |
| Akt sverki | ✔ | Faza 3 | P2 |
| EDO ulanish | ✔ | O'zbekistonda: Didox / Faktura.uz | P2 |
| **Xodimlar va rollar** | ✔ | Snabjenets buyurtma beradi → rahbar tasdiqlaydi | P1 |
| **Buyurtmalar tarixi + takrorlash** | ✔ | "Yana bir marta buyurtma qilish" 1 tugma | **P0** |
| **Excel/CSV dan buyurtma yuklash** | ✔ | Fabrika 200 pozitsiyali ro'yxat yuklaydi | P1 |
| Fayl bilan so'rov (doc/xls/pdf) | ✔ | Menejerga yuborish | P1 |
| **Shaxsiy menejer kontakti** | ✔ | Header da ism + telefon + Telegram | **P0** |
| Sertifikatlar yuklab olish | ✔ | Mato sertifikatlari (yong'inga chidamlilik va h.k.) | P1 |
| Reklamatsiya (pretenziya) | ✔ | Faza 4 | P2 |
| Sotib olish analitikasi | ✔ | "Yilda 4 200 m mato oldingiz" | P2 |

---

## 4. Yangi sahifalar ro'yxati

### Faza 1 — Biznes uchun kritik (7 ta)

| Route | Nomi | Nega kerak |
| --- | --- | --- |
| `/calculator` | **Material kalkulyatori** | Divan uchun necha metr mato + necha list paralon kerakligini hisoblab beradi. **Eng kuchli differensiator** — VI da bu bor (kraska/laminat kalkulyatorlari) |
| `/lists` va `/lists/[id]` | **Ro'yxatlar / Loyiha smetalari** | Pattern №23 + №48. B2B ning yuragi |
| `/delivery` | Yetkazib berish va to'lov | Ishonch. Bugun mijoz shartlarni bilmaydi |
| `/contacts` | Kontaktlar + ombor xaritasi | Ishonch |
| `/about` | Biz haqimizda | Ishonch |
| `/guides` va `/guides/[slug]` | **Tanlov gaydlari** | "Paralonni qanday tanlash", "Martindale nima" — SEO + pattern №17/№30 |
| `/faq` | Savol-javob | Qo'llab-quvvatlash yukini kamaytiradi |

### Faza 2 — Konversiya (6 ta)

| Route | Nomi | Izoh |
| --- | --- | --- |
| `/brands`, `/brands/[slug]` | Brendlar | Mato ishlab chiqaruvchilar (Turkiya, Xitoy fabrikalari) |
| `/promo`, `/promo/[slug]` | Aksiyalar | Stok mato chegirmalari |
| `/account/orders`, `/account/orders/[num]` | Buyurtmalar + kuzatish | Pattern: takroriy buyurtma |
| `/account/documents` | Hujjatlar | Hisob-faktura, sertifikat |
| `/account/company` | Tashkilot va xodimlar | Rollar |
| `/order-track` | Buyurtma statusini tekshirish (guestlar uchun) | |

### Faza 3 — Kengaytirish (5 ta)

| Route | Nomi |
| --- | --- |
| `/services` | Xizmatlar (mato kesish, paralon o'lchamga kesish, yetkazib berish) |
| `/warehouses` | Ombor/filiallar xaritasi |
| `/reviews` | Barcha sharhlar |
| `/b2b/register` | To'liq B2B onboarding (ko'p qadamli) |
| `/compare/[category]` | Kategoriya bo'yicha taqqoslash jadvali |

---

## 5. UI tahlili — nimani olamiz, nimani olmaymiz

### 5.1 ВсеИнструменты UI kuchli tomonlari

| Yechim | Baho | Bizga |
| --- | --- | --- |
| **Yuqori ma'lumot zichligi** — bitta ekranda ko'p foydali ma'lumot | ✅ Professional auditoriya uchun to'g'ri | **OLAMIZ** |
| **Kuchli aksentli rang faqat CTA da** (qizil) | ✅ | Bizda `#283593` — allaqachon shunday |
| **Doimiy ko'rinadigan telefon + ish vaqti** | ✅ Ishonch | **OLAMIZ** (config to'ldirilishi kerak) |
| **Monospace SKU** | ✅ | Bizda bor ✔ |
| **Yashil "bor" / kulrang "yo'q" statuslari** | ✅ | Bizda bor ✔ |
| **Chap tomonda doimiy katalog daraxti** | ✅ | **OLAMIZ** (mega-menu ni kengaytirish) |
| **Skeleton loading** | ✅ | **OLAMIZ** |

### 5.2 Olmaydigan narsalar

| Yechim | Nega yo'q |
| --- | --- |
| Qizil-oq agressiv rang sxemasi | Bizning brend — `#283593` ko'k + `#F9F5EC` krem. **Premium/hunarmandchilik** pozitsiyasi, "diskaunter" emas |
| Banner va reklama shovqini | Bizda 300k SKU yo'q; toza, sokin interfeys mato tekstursini yaxshiroq ko'rsatadi |
| Kichik shrift (11–12px asosiy matn) | Bizda 13–14px minimal — o'qish qulayligi |
| Bir ekranda 6+ CTA | Ierarxiya: 1 ta asosiy + 1 ta ikkilamchi |
| Burchaksiz "quti" dizayn | Bizda `rounded-xl/2xl` — zamonaviy, yumshoq |

### 5.3 Comfort Textile dizayn tamoyillari (yangilangan)

1. **Tekstura birinchi o'rinda.** Mato — bu tovar emas, bu *sirt*. Rasm katta, `object-cover`,
   hover da zoom. Paralon/mexanizm uchun — `object-contain` oq fonda. (Bugun to'g'ri qilingan ✔)
2. **Raqam — ishonch.** "Bor" emas → "**340 m omborda**". "Chegirma" emas → "**50 m dan 12%**".
3. **Professional zichlik, premium nafosat.** Ma'lumot zich, lekin havo bor: `gap-4`, `p-4`,
   `rounded-2xl`, yumshoq soyalar.
4. **Har bir termin tushuntiriladi.** ST/EL/HR, Martindale, g/m², en — hammasi tooltip bilan.
5. **B2B rejim vizual ajralib turadi.** B2B kirganda: navy aksent chizig'i, "Sizning narxingiz"
   yorlig'i, tejamkorlik ko'rsatkichi.
6. **Mobil — birinchi navbatda.** O'zbekistonda mebelchilar 80%+ telefondan kiradi.
   Pastki tab-bar, sticky CTA, katta tap-target (min 44px).

---

## 6. Ma'lumot modeli o'zgarishlari

Yangi funksiyalar uchun `types.ts` va Prisma sxemasiga qo'shilishi kerak bo'lgan maydonlar:

```ts
// StorefrontVariant ga
onHandQuantity?: number;        // #29, #36 — aniq qoldiq
reservedQuantity?: number;
warehouseId?: string;           // #13, #45
priceTiers?: PriceTier[];       // #20 — hajmli narx pog'onalari

// Yangi tip
interface PriceTier {
  minQty: number;               // 10
  maxQty?: number;              // 49
  price: number;                // UZS
  labelUz: string;              // "10–49 m"
  labelRu: string;
}

// StorefrontProduct ga
brandSlug?: string;             // #brands sahifasi
analogProductIds?: string[];    // #27 — analoglar
guideSlugs?: string[];          // #30 — gaydlar
rating?: number;                // #39
reviewCount?: number;
certificates?: { nameUz, nameRu, fileUrl }[];

// StorefrontSpec ga
tooltipUz?: string;             // #17 — termin tushuntirishi
tooltipRu?: string;
group?: string;                 // spetsifikatsiyalarni guruhlash

// Yangi entitilar
interface SavedList {           // #23, #48
  id: string;
  name: string;                 // "Divan Luna — loyiha"
  items: { variantId, quantity }[];
  createdAt: string;
  isEstimate: boolean;          // smeta rejimi
}

interface StockAlert {          // #28
  variantId: string;
  phone: string;
  createdAt: string;
}

interface ProductReview {       // #39
  id: string; productId: string;
  authorName: string; rating: number;
  textUz?: string; photos: string[];
  createdAt: string; isVerifiedPurchase: boolean;
}
```

---

## 7. Yangi komponentlar ro'yxati

| Komponent | Pattern | Faza | Holat |
| --- | --- | --- | --- |
| `layout/MobileTabBar.tsx` | #2 | 1 | Hali yo'q |
| `ui/Tooltip.tsx` | #17 | 1 | ✅ Qurildi |
| `ui/CopyButton.tsx` | #21 | 1 | ✅ Qurildi |
| `ui/QuantityStepper.tsx` | #25, #33 | 1 | ✅ Qurildi |
| `ui/Skeleton.tsx` | — | 1 | ✅ Qurildi |
| `product/StockIndicator.tsx` | #29, #36 | 1 | ✅ Qurildi |
| `product/PriceTierTable.tsx` | #20 | 1 | ✅ Qurildi |
| `catalog/ViewModeToggle.tsx` | #10 | 1 | Hali yo'q |
| `catalog/ProductRow.tsx` (list view) | #10 | 1 |
| `catalog/SubcategoryChips.tsx` | #9 | 1 |
| `catalog/FilterSearch.tsx` | #15 | 2 |
| `calculator/SofaCalculator.tsx` | yangi | 1 |
| `lists/SaveToListButton.tsx` | #23 | 1 |
| `lists/ListManager.tsx` | #23, #48 | 1 |
| `product/CrossSellStrip.tsx` | #34 | 2 |
| `product/AnalogsButton.tsx` | #27 | 2 |
| `product/StockAlertModal.tsx` | #28 | 2 |
| `product/ReviewsSection.tsx` | #39, #40 | 3 |
| `cart/CartItemCheckbox.tsx` | #47 | 2 |
| `cart/SaveAsEstimate.tsx` | #48 | 2 |
| `cart/ShareCart.tsx` | #52 | 2 |
| `cart/UndoToast.tsx` | #51 | 2 |
| `checkout/AddressCascade.tsx` | #57 | 2 |
| `b2b/ManagerCard.tsx` | B2B | 2 |
| `b2b/SavingsBadge.tsx` | B2B | 1 |
| `b2b/ExcelOrderUpload.tsx` | B2B | 3 |

---

## 8. Texnik qarzlar (birinchi navbatda tuzatish)

| Muammo | Fayl | Ta'sir | Holat |
| --- | --- | --- | --- |
| **`window.location.href` bilan filtr** — to'liq sahifa reload | `CatalogClient.tsx`, `CategoryClient.tsx` | Pattern #11 buziladi, UX sekin | ✅ Tuzatildi — `router.push` ga o'tkazildi |
| **Filtrlash client-side, barcha mahsulot yuklanadi** | `CatalogClient.tsx:33-95` | 500+ SKU da ishlamaydi | Hali ochiq |
| **`product: any`** | `ProductCard.tsx:17` | Type xavfsizligi yo'q | Hali ochiq |
| Sticky element yo'q (PDP tab, cart summary) | bir nechta | #32, #38, #46 | Hali ochiq |
| Skeleton/loading holati yo'q | global | Sekin tarmoqda yomon UX | ✅ Qisman — `ui/Skeleton.tsx` + `ProductCardSkeleton`/`ProductDetailSkeleton`, `loading.tsx` (root va `/product/[slug]`) ulandi |
| Kategoriya rasmi placeholder | `public/images/categories/` | Vizual sifat | ✅ Yopildi — `realCatalog.ts` va bosh sahifa endi `public/images/products/` dagi haqiqiy fotosuratlarni ishlatadi; eski placeholder fayllar va arxivlar olib tashlandi |
| **`onHandQuantity` / `priceTiers` mock ma'lumotda to'ldirilmagan** | `MockStorefrontService.ts` | #20/#29/#36 UI hech narsa ko'rsatolmaydi | ✅ Tuzatildi — `mockEnrichment.ts` har bir variantga deterministik qiymat qo'shadi |

---

## 9. Manbalar

- ВсеИнструменты.ру B2B bo'limi — [vseinstrumenti.ru/b2b](https://www.vseinstrumenti.ru/b2b/)
- ВсеИнструменты shaxsiy kabinet imkoniyatlari — [rasmiy e'lon](https://www.vseinstrumenti.ru/our-news/lichnyj-kabinet-udobnyj-instrument-dlya-vashego-biznesa-455/)
- ВсеИнструменты qo'llab-quvvatlash strukturasi — [vseinstrumenti.ru/treatment](https://www.vseinstrumenti.ru/treatment/)
- **DIY segmentda 60 ta UX yechim tadqiqoti (KISLOROD)** — [workspace.ru](https://workspace.ru/blog/top-10-internet-magazinov-tovarov-dlya-stroitelstva-i-remonta-diy-60-udachnyh-ux-resheniy/)
- B2B portal funksional elementlari gaydi — [b2b.o2k.ru](https://b2b.o2k.ru/blog/funkcionalnye-elementy-b2b-portala)
- B2B shaxsiy kabinet talablari — [omni.korusconsulting.ru](https://omni.korusconsulting.ru/blog/lichnyy-kabinet-b2b-klienta-kakim-on-dolzhen-byt/)
