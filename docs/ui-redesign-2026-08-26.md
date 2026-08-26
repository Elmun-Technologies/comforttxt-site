# Storefront UI Redesign — "Atelye" (2026-08-26)

> **Muammo:** storefront UI "AI-generatsiya qilingan sayt" ko'rinishida edi —
> bir xil `rounded-2xl` kartalar, har joyda bir xil katta harfli kickerlar,
> SaaS ranglari (indigo + oq) va takrorlanuvchi bo'limlar. Baho: 4/10.
> Maqsad: mebelchi birinchi tashrifdayoq saytni eslab qoladigan, qaytib keladigan
> interfeys.

> **Yechim yo'nalishi:** mebel materiallari do'koni uchun **editor / ustaxona
> katalogi** estetikasi — qalin tipografika, asimmetrik layout, issiq "mis"
> aksent, mato fakturalari va kassetali detallar.

---

## 1. Dizayn-tizim o'zgarishlari

| Element | Avval | Endi |
|---|---|---|
| Aksent | faqat ko'k `#283593` | ko'k + **copper** (`#C77F3A` — yog'och/teri/ustaxona nuri) |
| To'q sirt | `charcoal-900` | chuqur `ink-950` (`#0B102C`) + halqa motivi + don (grain) |
| Kickerlar | bir xil uppercase pillalar | yupqa, keng harfli editorial kicker + copper chiziq |
| Kartochkalar | hamma joyda `rounded-2xl` border-karta | rasm-li kartalar, corner-tick (kesish belgilari), dashed choklar |
| Animatsiya | hover scale | marquee ticker, float-kartalar, btn-sheen (diagonal nur) |
| Typografiya | o'rtacha o'lcham | `text-3xl→6xl` qalin sarlavhalar + mono SKU yozuvlari |

Yangi tokenlar `tailwind.config.ts`: `copper` shkalasi, `ink` shkalasi,
`marquee`/`float-slow`/`pulse-dot` animatsiyalari, `shadow-copper-glow`,
`shadow-card-hover`. Yangi utilitylar `globals.css`: `.marquee-track`,
`.paper-grain`, `.corner-tick`, `.stitch-border`, `.rule-dashed`,
`.btn-sheen`, `.section-index` va CSS bilan chizilgan mato fakturalari
(`.tex-velvet/.tex-boucle/.tex-chenille/.tex-rogojka/.tex-foam`) — tashqi
rasm so'rovlarsiz.

## 2. Bosh sahifa (qayta qurildi)

1. **Hero** — to'q `ink-950` qopqoq: ikki qatorli katta sarlavha, copper
   aksent, SKU qidiruv, "B2B shartlari" ikkinchi tugmasi, halol faktlar
   (pozitsiyalar soni, yo'nalishlar, kesish qadami). O'ngda qatlamli
   material still-layf (offset copper ramka, corner-ticklar, suzuvchi
   SKU/ombor chipi, suzuvchi ulgurji narx tagi). Pastda **marquee ticker**
   (Velyur · Bukle · Shenill …). Mobil uchun alohida ixcham vizual qo'shildi.
2. **Kategoriyalar** — 5 ta karta shaxmat tartibida (7/5 → 5/7 → to'liq kenglik),
   raqamlangan (01–05), pozitsiyalar soni bilan, hoverda rasm zoom.
3. **Talabgir pozitsiyalar** — yangilangan `ProductCard` grid'i.
4. **Fakturalar** — CSS-to'qimali svatch + nom + tavsif, gorizontal qatorlar,
   hoverda svatch aylanadi.
5. **B2B "Mebelchilar uchun"** — ustaxona fotosi + 4 raqamlangan qadam
   (artikul bo'yicha buyurtma → hajmga qarab narx → Sample Box → sexga yetkazish).
6. **Sample Box CTA** — chokli (stitch) panel, dashed ramka, 4 qadamli karta.
7. **Mikro-ishonch qatori** — 0,5 m qadam, ST/EL/HR, SKU qayta buyurtma.

## 3. Komponentlar

- **`ProductCard`** — rasm-li, SKU chipi to'q fonda, `swatch-fabric` halqali
  rang doiralari (copper ring), corner-ticklar, hoverda harakat tugmalari
  sirpanib kiradi, chegirma nishoni copper, "Ommabop" ⭐ qora plashkada.
  Barcha funksiyalar (variant almashtirish, savatcha, 1-klik, taqqoslash,
  tanlanganlar) saqlangan.
- **`Header`** — ustki bar to'q `ink-950`, copper aksentlar, ⚡ emoji
  olib tashlandi (pulslanuvchi nuqta + matn), B2B chipi copper.
- **`PageHero`** — barcha ichki sahifalar uchun: katta sarlavha, copper
  chiziqli kicker, corner-ticklar; `tone="dark"` da `ink-950` + issiq nur.
- **`Footer`** — yengil servis qatori (kartasiz), katta brand bloki,
  copper sarlavhali ustunlar, pastda mono matnli yuridik qator.
- **`MegaMenu`** — bandlar hoverda raqam va strelka bilan, promo karta to'q.
- **`PDP`** — narx qutisi to'q `ink-950` panel, copper chegirma nishoni,
  `btn-sheen` asosiy tugma, copper tab-border, corner-ticklar.
- **`WholesalePortalClient`** — banner va segment kartalari yangi uslubda.

## 4. Yangi rasmlar

- `public/images/hero-fabric-rolls.jpg` — to'q ombor sahnasi (hero).
- `public/images/workshop-hands.jpg` — ustaxonada mato o'lchash (B2B bo'lim).

Brend ranglari (ko'k + krem) va Exo 2 shrifti o'zgarishsiz qoldi — faqat
ularning ishlatilishi qayta ko'rib chiqildi.

## 5. Tekshirish

- `npm run test` — 77/77 o'tdi (logika o'zgarmadi).
- `npx next build` — muvaffaqiyatli (barcha route'lar).
- Qo'lda: `/uz`, `/ru`, `/uz/catalog`, kategoriya sahifalari, PDP, savatcha
  drawer'i, ulgurji va Sample Box sahifalari tekshirildi.
