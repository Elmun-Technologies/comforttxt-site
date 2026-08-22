# Comfort TXT — Premium Mebel Matolari va Paralon Platformasi

Comfort TXT — mebel matolari, paralon (ST, EL, HR), transformatsiya mexanizmlari hamda mebelchilik sarf-materiallarini ulgurji va chakana sotish uchun mo'ljallangan zamonaviy e-commerce va B2B platformasi.

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

## ✨ Asosiy Xususiyatlar va Imkoniyatlar

### 🛍️ B2C / Chakana va B2B Portali
* **Katalog va Qidiruv:** PostgreSQL `ILIKE` asosida nom, SKU (`LUNA-01`, `ST2536`), kategoriya va kolleksiya bo'yicha tezkor qidiruv hamda filtratsiyalash.
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
- Mock mahsulotlar (`MockStorefrontService`) — faqat development uchun neytral fixture ma'lumotlar: soxta brendlar, kolleksiyalar, chegirmalar, mijozlar va buyurtmalar yo'q.
- B2B sahifada demo-rejim/test akkaunt mavjud emas.
- Vaqtinchalik vizual aktivlar: `public/images/` (kategoriya teksturalari va hero). Real Comfort TXT suratlari kelganda `storefrontConfig.heroImage` va `public/images/comfort-txt-logo.svg` orqali almashtiriladi.

## 📄 Litsenziya
Comfort TXT © 2026. Barcha huquqlar himoyalangan.
