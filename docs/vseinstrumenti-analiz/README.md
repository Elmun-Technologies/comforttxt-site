# ВсеИнструменты.ру tahlili va Comfort Textile qo'llash rejasi

Bu papkada Rossiyaning yetakchi DIY/B2B e-commerce platformasi (`vseinstrumenti.ru`)
tahlili va undan olingan yechimlarni Comfort Textile ga qo'llash rejasi joylashgan.

## Hujjatlar

| Fayl | Tarkib |
| --- | --- |
| [`01-TAHLIL.md`](./01-TAHLIL.md) | To'liq tahlil: axborot arxitekturasi, **60 ta UX pattern registri** (har biri bizning kontekstda baholangan), B2B kabinet tahlili, UI tamoyillari, ma'lumot modeli, texnik qarzlar |
| [`02-QOLLASH-REJASI.md`](./02-QOLLASH-REJASI.md) | 5 fazaga bo'lingan amaliy reja, 9 ta sprint, har bir vazifa uchun "nima → qayerda → qanday tekshiriladi" |

## Vizual mockuplar

| Fayl | Nima ko'rsatadi |
| --- | --- |
| `mockup-product-card.png` | Yangi mahsulot kartochkasi: SKU nusxalash, aniq qoldiq, swatch'lar, miqdor stepper |
| `mockup-pdp-layout.png` | Mahsulot sahifasi: sticky CTA ustuni, aniq qoldiq, yetkazish bloki, tab navigatsiya |
| `mockup-catalog-filters.png` | Katalog: filtr ichida qidiruv, narx diapazoni, chip'lar, grid/list almashtirgich |
| `mockup-mobile-tabbar.png` | Mobil: pastki tab-bar, sticky savat paneli, checkbox'li savatcha |

## Asosiy xulosa

Bizning mijozimiz — impulsiv B2C xaridor emas, balki **professional takroriy xaridor**
(mebelchi, sex, fabrika). Aynan shu profil uchun ВсеИнструменты 15 yil davomida
interfeysni optimallashtirgan, shuning uchun ularning yechimlari bizga marketplace
yechimlaridan ko'ra ancha mos keladi.

**60 ta UX patterndan:** 8 tasi bizda bor, **17 tasi P0** (majburiy), 24 tasi P1, 11 tasi P2.

### Eng katta 5 ta imkoniyat

1. **Hajmli narx pog'onalari** — 1–9 m / 10–49 m / 50+ m. Biznesning yuragi, hozir yo'q.
2. **Ro'yxatlar / loyiha smetalari** — "Divan Luna" uchun to'liq material to'plami, saqlash va takrorlash.
3. **Material kalkulyatori** — divan o'lchamidan kerakli mato/paralon metrajini hisoblash. Bozorda hech kimda yo'q.
4. **Aniq qoldiq** — "Omborda bor" emas, **"Omborda 340 m"**.
5. **To'liq B2B kabinet** — hozirgi `/wholesale` faqat lead forma, kabinet emas.

### Olmaydigan narsalar

ВсеИнструменты ning qizil-oq agressiv rangi, banner shovqini, 11px shrift va "diskaunter"
pozitsiyasi bizga mos emas. Bizning brend — `#283593` ko'k + `#F9F5EC` krem, **premium
hunarmandchilik** pozitsiyasi. Biz ularning *funksional mantiqini* olamiz, *vizual tilini* emas.

---

## Ushbu sessiyada bajarilgan poydevor ishlari

Reja bilan bir qatorda Faza 0/1 ning eng kritik qismlari kodga tushirildi:

| Fayl | Nima |
| --- | --- |
| `src/lib/pricing/tiers.ts` | **Hajmli narx pog'onalari** — tier tanlash, tejamkorlik, upsell hint, bilingual label. Butun tizimda narx tanlashning yagona manbai |
| `tests/price-tiers.test.ts` | 30+ test: chegara qiymatlar, kasrli metraj, integer UZS, floating-point himoyasi |
| `vitest.config.ts` | `@/*` alias — testlar endi manba bilan bir xil import yo'lidan foydalanadi |
| `src/data/spec-glossary.ts` | **Termin lug'ati** (Pattern #17): ST/EL/HR, Martindale, g/m², zichlik va h.k. — UZ/RU tushuntirishlar |
| `src/services/storefront/types.ts` | Yangi tiplar: `PriceTier`, `SavedList`, `StockAlertInput`, `ProductReview` + `onHandQuantity`, `analogProductIds`, `certificates`, `rating` maydonlari |

**Testlar:** 50/50 o'tdi · **Type-check:** toza.

> Diqqatga sazovor: `tiers.ts` uchun yozilgan testlar real bugni ochib berdi — mato 0.5 m
> qadam bilan sotilgani uchun **9.5 m** kabi miqdorlar `maxQty:9` va `minQty:10` orasidagi
> "teshik"ka tushib, ulgurji narxsiz qolar edi. Mantiq faqat `minQty` bo'yicha ishlashga
> o'zgartirildi — endi pog'ona uzluksiz.
