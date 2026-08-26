# Comfort Textile — Premium Mebel Matolari va Paralon Platformasi

Comfort Textile — mebel matolari, paralon (ST, EL, HR), transformatsiya mexanizmlari hamda mebelchilik sarf-materiallarini ulgurji va chakana sotish uchun mo'ljallangan zamonaviy e-commerce va B2B platformasi.

---

## 🚀 Texnologik Stak (Tech Stack)

- **Framework:** Next.js 15 (App Router, Server Components & Route Handlers)
- **Til:** TypeScript
- **Kutubxonalar & UI:** React 18, Tailwind CSS, Lucide Icons, Zustand (Cart & UI Store)
- **Ko'p tillilik (i18n):** `next-intl` (O'zbekcha / Ruscha)
- **Ma'lumotlar bazasi & ORM:** PostgreSQL (Supabase), Prisma ORM 5.22
- **Autentifikatsiya & RBAC:** Supabase Auth (SSR Cookie-based session management)
- **Testlash:** Vitest (Unit & Integration tests)

---

## 🎨 Brand Identity

Comfort Textile rebrendingi quyidagi tasdiqlangan korporativ ranglar asosida markazlashtirilgan:

- **Asosiy ko‘k:** `#283593` — primary action, heading va brand elementlari
- **Asosiy iliq neytral:** `#F9F5EC` — umumiy sahifa foni va yumshoq sirtlar
- **Tintlar:** 100 / 80 / 60 / 40 / 20% rang qadamlaridan hosil qilingan `brand-*` va `cream-*` Tailwind tokenlari
- **Konfiguratsiya:** `src/config/brand.ts`; mijozga ko‘rinadigan nom, wordmark va kontaktlar `src/config/storefront.ts` ichida

### Logo

Rasmiy Comfort Textile emblemasi (doira ichidagi divan belgisi) saytga ulangan:

| Fayl | Qayerda ishlatiladi |
| --- | --- |
| `public/images/brand/comfort-textile-logo.png` | Header, favicon, Open Graph — yorug‘ sirtlar |
| `public/images/brand/comfort-textile-logo-white.png` | Footer va to‘q ko‘k/charcoal sirtlar |
| `public/images/brand/apple-touch-icon.png` | iOS "home screen" ikonkasi |

Logo `src/components/layout/BrandLogo.tsx` orqali wordmark bilan birga ko‘rsatiladi va
`storefrontConfig.logo` dan boshqariladi (`image` / `imageDark`).

### Brend patternlari

Guidebookdagi halqa (ring) motivi seamless SVG tile sifatida qayta chizilgan —
tashqi so‘rov yo‘q, faqat `public/images/patterns/`:

- `rings.svg` — korporativ ko‘k halqalar, yorug‘ fon uchun
- `rings-dark.svg` — krem halqalar, to‘q fon uchun

`globals.css` dagi utility klasslar orqali qo‘llanadi:
`.pattern-rings`, `.pattern-rings-dark`, o‘lcham uchun `.pattern-sm` / `.pattern-lg`,
guidebookdagidek yarim-tekis ko‘rinish uchun `.pattern-fade` / `.pattern-fade-y`.

### Umumiy brend komponentlari

Har bir sahifada bir xil brend ko‘rinishi bo‘lishi uchun ikkita umumiy komponent bor —
yangi sahifa qo‘shganda shularni ishlating, qo‘lda `<h1>` yozmang:

| Komponent | Vazifasi |
| --- | --- |
| `src/components/layout/PageHero.tsx` | Sahifa sarlavhasi: kicker + title + subtitle, orqa fonda halqa motivi. `tone="dark"` to‘q variant uchun. O‘ng tomonga tugma/badge qo‘yish mumkin. |
| `src/components/ui/EmptyState.tsx` | "Hech narsa yo‘q" holatlari: ikonka medalyoni, sarlavha, izoh va CTA — halqa motivi bilan. |

Hozir brend motivi qo‘llangan joylar: bosh sahifa, katalog, kategoriya, kolleksiyalar,
blog, savatcha, taqqoslash, tanlanganlar, shaxsiy kabinet, Sample Box, B2B portal,
checkout, admin panel, buyurtma muvaffaqiyati, xatolik sahifasi, mobil menyu, footer
va rasmi yo‘q mahsulot kartalari (`MissingImage`).

---

## ✨ Asosiy Xususiyatlar va Imkoniyatlar

### 🛍️ B2C / Chakana va B2B Portali
* **Katalog va Qidiruv:** PostgreSQL `ILIKE` asosida nom, SKU (`8016`, `K416`), kategoriya va kolleksiya bo'yicha tezkor qidiruv hamda filtratsiyalash.
* **O'lchov Birligi va Zichlik:** Matolar uchun metr (`0.5m` qadam bilan), paralon va mexanizmlar uchun list hamda dona birliklari bo'yicha aniq miqdor hisobi.
* **Valyuta va Narx Aniqligi:** Barcha monetary qiymatlar UZS butun sonlarida (integer) saqlanadi va floating-point xatolarining oldi olingan.
* **B2B Ulgurji Tizim:** Mebel fabrikalari va sexlar uchun maxsus narxlar, shartnoma so'rovlari hamda chegirma tizimi (`B2B_CUSTOMER`).
* **Sample Box & 1-Klik Buyurtma:** Mato namunalari to'plamini so'rash va PDP orqali 1-klikda tezkor buyurtma berish (`QuickOrderRequest`, `SampleRequest`).

### 📦 Ombor va Buyurtma Transaksiyalari
* **Zaxira Boshqaruvi (Inventory System):** Ombordagi amaldagi qoldiq (`onHand`) hamda bron qilingan miqdor (`reserved`). Buyurtma bekor qilinganda bron avtomatik yechiladi.
* **Buyurtma Snapshot modeli:** Buyurtma berilgan paytdagi narx va mahsulot ma'lumotlari tarixdan o'zgarmas saqlanadi (`OrderItem` snapshot).
* **UTM Attributsiya:** Har bir buyurtma va lead so'rovi uchun marketing UTM parametrlari saqlanadi (`utmSource`, `utmMedium`, `utmCampaign`, va h.k.).

### 🛡️ Xavfsizlik va Admin Paneli
* **RBAC Avtorizatsiya:** `CUSTOMER`, `B2B_CUSTOMER`, `MANAGER`, `CONTENT_MANAGER`, `ADMIN`, `SUPER_ADMIN` rollari server tomonida tekshiriladi.
* **Audit Loglar:** Admin panelidagi har bir o'zgarish (narx, stok, buyurtma statusi) `AuditLog` jadvaliga yoziladi.

---

## 🛠️ O'rnatish va Ishga Tushirish (Getting Started)

### 1. Omborni klonlash
```bash
git clone https://github.com/Elmun-Technologies/comforttxt-site.git
cd comforttxt-site
```

### 2. Bog'liqliklarni o'rnatish
```bash
npm install
```

### 3. Atrof-muhit o'zgaruvchilarini (Environment Variables) sozlash
`.env.example` faylidan nusxa olib `.env` yaratasiz:
```bash
cp .env.example .env
```

`.env` faylidagi parametrlarni kiriting:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/comforttxt?schema=public&pgbouncer=true"
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/comforttxt?schema=public"

NEXT_PUBLIC_SUPABASE_URL="https://your-supabase-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
```

### 4. Prisma ORM generatorini yurgizish va Bazani Seed qilish
```bash
npx prisma generate
npm run db:seed
```

### 5. Dasturni dev rejimida ishga tushirish
```bash
npm run dev
```
Dastur `http://localhost:3000` manzilida ishlaydi.

---

## 🧪 Testlarni Ishga Tushirish

Loyihadagi barcha Unit & Integration testlarni yurgizish uchun:
```bash
npm test
```

---

## 🏗️ Production Build

Production uchun loyihani yig'ish va turli sahifalarni tekshirish:
```bash
npm run build
```

---


## 🧪 ShopFlow Tayyorgarlik (Development Simulation)

`MockStorefrontService` ShopFlow masofaviy xizmatining kechikishi va xatolarini simulyatsiya qilishni qo'llab-quvvatlaydi (faqat mock rejimda):

```bash
# Har bir so'rovga 1.5 soniya sun'iy kechikish qo'shish (skeleton holatini tekshirish uchun)
NEXT_PUBLIC_MOCK_LATENCY_MS=1500 npm run dev

# 30% ehtimollik bilan xato simulyatsiyasi (error boundary / retry UX ni tekshirish uchun)
NEXT_PUBLIC_MOCK_FAIL_RATE=0.3 npm run dev
```

ShopFlow-ga ulanish uchun `.env` da `NEXT_PUBLIC_DATA_SOURCE=shopflow` va `SHOPFLOW_API_URL` ni o'rnating.

## 🧹 Kontent va Demo Ma'lumotlar (Phase 3.1)

- Barcha mijozga ko'rinadigan kontakt ma'lumotlari bitta manbadan keladi: `src/config/storefront.ts` (`storefrontConfig`). Tasdiqlanmagan qiymatlar bo'sh — UI ularni avtomatik yashiradi. Ishlab chiqarishga chiqishdan oldin real ma'lumotlarni kiriting.
- Katalog (`src/services/storefront/realCatalog.ts` + `MockStorefrontService`) — Comfort Textile'ning haqiqiy assortimenti: mebel oyoqlari, transformatsiya mexanizmlari, JIN JAN pnevmatik asboblar, skobalar, kley stiklar, paralon buyumlari va mato namunalari. Barcha mahsulot suratlari `public/images/products/` ichida arxivdan joylangan haqiqiy fotosuratlar. Narxlar demo qiymat (UZS) — ishga tushirishdan oldin joriy narxlar bilan almashtiring. Mijozlar, buyurtmalar va chegirmalar soxta emas — Ular ShopFlow/real ombor bilan ishlaydi.
- Brend aktivlari (logo va halqa patternlari) tasdiqlangan va `public/images/brand/` hamda `public/images/patterns/` ichida. Hero surati (`storefrontConfig.heroImage`) ham haqiqiy foto bilan almashtirildi.
- B2B sahifada demo-rejim/test akkaunt mavjud emas.

## 🧬 Prisma enumlari

`src/lib/enums.ts` — `prisma/schema.prisma` dagi enumlarning toza TypeScript nusxasi.
Sabab: `@prisma/client` enum *qiymatlarini* faqat `prisma generate` platforma engine'ini
yuklab olgandan keyin export qiladi; engine'siz muhitda (CI, offline) type-check va
testlar buziladi. `src/lib/enums.ts` hech qanday bog‘liqliksiz ishlaydi va qiymatlari
bazadagi enum a'zolari bilan bir xil, shuning uchun Prisma tiplariga mos keladi.

Ikkalasi bir-biridan uzoqlashib ketmasligi uchun `tests/enums.test.ts` schema'ni parse
qilib solishtiradi — enum qo‘shsangiz, `src/lib/enums.ts` ni ham yangilang.

## 📄 Litsenziya
Comfort Textile © 2026. Barcha huquqlar himoyalangan.
