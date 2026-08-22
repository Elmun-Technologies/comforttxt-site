# Brand assets — source files

Original Comfort Textile brand guidebook artwork. These are **reference
originals**, not served to the browser — they live outside `public/` on
purpose.

| File | Nima |
| --- | --- |
| `source/logo-original.jpg` | Rasmiy logo (doira ichida divan belgisi) |
| `source/pattern-navy.jpg` | Halqa patterni — to‘q ko‘k variant |
| `source/pattern-cream.jpg` | Halqa patterni — krem variant |
| `source/pattern-both.jpg` | Ikkala variant yonma-yon |

## Saytda ishlatiladigan aktivlar

Bulardan ishlab chiqarilgan, `public/` ichidagi optimallashtirilgan fayllar:

- `public/images/brand/comfort-textile-logo.png` — korporativ ko‘k emblema, shaffof fon
- `public/images/brand/comfort-textile-logo-white.png` — oq emblema, to‘q fon uchun
- `public/images/brand/apple-touch-icon.png` — iOS ikonkasi
- `public/favicon.ico` — brauzer tab ikonkasi
- `public/images/patterns/rings.svg` — halqa motivi, yorug‘ fon uchun (seamless 120×120 tile)
- `public/images/patterns/rings-dark.svg` — halqa motivi, to‘q fon uchun

Patternlar guidebookdagi motiv asosida vektor (SVG) sifatida qayta chizilgan,
shuning uchun ular har qanday o‘lchamda toza ko‘rinadi va rasm faylidan
ancha yengil.

## Korporativ ranglar

Originaldan olingan qiymatlar (`src/config/brand.ts` bilan bir xil):

- Asosiy ko‘k: `#283593`
- Krem: `#F9F5EC`

Agar rasmiy vektor (SVG / AI / EPS) logo fayli kelsa, uni shu yerga qo‘shing va
`public/images/brand/` dagi PNG larni o‘rniga vektor bilan almashtirish tavsiya
etiladi — hozirgi PNG lar rasmdan (raster) tayyorlangan.
