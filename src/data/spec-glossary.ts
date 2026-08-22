/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SPEC GLOSSARY — technical term explanations
 * ─────────────────────────────────────────────────────────────────────────────
 * UX pattern #17 ("tooltips on filter parameters") from the DIY-segment study.
 *
 * Our buyers are furniture makers, not textile engineers: a large share of them
 * do not know what ST/EL/HR, Martindale or g/m² actually mean. Surfacing a short
 * plain-language explanation next to every technical parameter removes the main
 * source of hesitation in the catalogue and on the product page.
 *
 * Consumed by:
 *   - `CategoryFilterSidebar` — `?` icon next to each filter group heading
 *   - `ProductDetailClient`   — specs tab, next to each spec row
 *
 * Keys match `StorefrontSpec.key` / filter query-parameter names.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface SpecGlossaryEntry {
  /** Short human label, shown as the tooltip heading. */
  titleUz: string;
  titleRu: string;
  /** One or two sentences in plain language — no marketing claims. */
  bodyUz: string;
  bodyRu: string;
  /** Optional unit hint rendered after numeric values, e.g. "g/m²". */
  unit?: string;
}

export const specGlossary: Record<string, SpecGlossaryEntry> = {
  // ── Fabric ────────────────────────────────────────────────────────────────
  martindale: {
    titleUz: 'Martindale (ishqalanishga chidamlilik)',
    titleRu: 'Мартиндейл (устойчивость к истиранию)',
    bodyUz:
      'Mato yeyilishgacha necha marta ishqalanishga chidashini ko‘rsatadi. 20 000 dan yuqori — uy mebeli uchun, 40 000 dan yuqori — kafe, ofis kabi yuqori yuklamali joylar uchun mos.',
    bodyRu:
      'Показывает, сколько циклов трения ткань выдерживает до износа. Выше 20 000 — для домашней мебели, выше 40 000 — для мест с высокой нагрузкой: кафе, офисы.',
    unit: 'sikl',
  },

  density: {
    titleUz: 'Zichlik (g/m²)',
    titleRu: 'Плотность (г/м²)',
    bodyUz:
      'Bir kvadrat metr matoning og‘irligi. Zichlik qancha yuqori bo‘lsa, mato shuncha qalin va bardoshli bo‘ladi, lekin qoplashda egiluvchanligi kamayadi.',
    bodyRu:
      'Вес одного квадратного метра ткани. Чем выше плотность, тем плотнее и прочнее ткань, но тем меньше её гибкость при обтяжке.',
    unit: 'g/m²',
  },

  width: {
    titleUz: 'Rulon eni',
    titleRu: 'Ширина рулона',
    bodyUz:
      'Rulonning ko‘ndalang o‘lchami. Kerakli metrajni hisoblashda hal qiluvchi: en qancha keng bo‘lsa, shuncha kam metr ketadi. Odatiy en — 140 sm.',
    bodyRu:
      'Поперечный размер рулона. Ключевой параметр при расчёте метража: чем шире рулон, тем меньше метров потребуется. Стандартная ширина — 140 см.',
    unit: 'sm',
  },

  texture: {
    titleUz: 'Tekstura (mato turi)',
    titleRu: 'Текстура (тип ткани)',
    bodyUz:
      'Matoning to‘qilish usuli va sirt ko‘rinishi: velyur — yumshoq va tukli, rogojka — dag‘al to‘qilgan, shenill — barxatsimon, bukle — halqali sirt.',
    bodyRu:
      'Способ плетения и внешний вид поверхности: велюр — мягкий ворсовый, рогожка — грубого плетения, шенилл — бархатистый, букле — петельчатая поверхность.',
  },

  composition: {
    titleUz: 'Tarkib',
    titleRu: 'Состав',
    bodyUz:
      'Tolalarning nisbati. Poliester — bardoshli va rangi so‘lmaydi; paxta — nafas oladi; akril — quyoshga chidamli.',
    bodyRu:
      'Соотношение волокон. Полиэстер — прочный и не выцветает; хлопок — дышит; акрил — устойчив к солнцу.',
  },

  petFriendly: {
    titleUz: 'Hayvon tirnog‘iga chidamlilik',
    titleRu: 'Устойчивость к когтям животных',
    bodyUz:
      'Tирnoq izi va tortilishga chidamli, halqasiz zich to‘qilgan matolar. Uyida mushuk yoki it bor mijozlar uchun muhim.',
    bodyRu:
      'Плотное плетение без петель, устойчивое к затяжкам и следам когтей. Важно для клиентов с кошками или собаками.',
  },

  waterRepellent: {
    titleUz: 'Suv o‘tkazmaslik qoplamasi',
    titleRu: 'Водоотталкивающая пропитка',
    bodyUz:
      'Suyuqlik matoga singib ketmasdan sirtda tomchi bo‘lib qoladi va artib olinadi. Bolalar xonasi va oshxona mebeli uchun tavsiya etiladi.',
    bodyRu:
      'Жидкость не впитывается, а остаётся каплей на поверхности и вытирается. Рекомендуется для детской и кухонной мебели.',
  },

  // ── Foam (paralon / PPU) ──────────────────────────────────────────────────
  foam_type: {
    titleUz: 'Paralon markasi (ST / EL / HR)',
    titleRu: 'Марка поролона (ST / EL / HR)',
    bodyUz:
      'ST — standart, kundalik o‘rtacha yuk uchun. EL — yuqori qattiqlik, o‘tirish qismi va katta yuk uchun. HR — yuqori elastik, shaklini uzoq saqlaydi, premium mebel uchun.',
    bodyRu:
      'ST — стандартный, для повседневной средней нагрузки. EL — повышенная жёсткость, для сидений и большой нагрузки. HR — высокоэластичный, долго держит форму, для премиум-мебели.',
  },

  foam_density: {
    titleUz: 'Paralon zichligi (kg/m³)',
    titleRu: 'Плотность поролона (кг/м³)',
    bodyUz:
      'Belgidagi birinchi raqam (masalan ST2536 dagi 25) — zichlik. Yuqori zichlik = uzoq xizmat muddati va cho‘kib qolmaslik.',
    bodyRu:
      'Первое число в маркировке (например 25 в ST2536) — плотность. Выше плотность = дольше срок службы и меньше проседание.',
    unit: 'kg/m³',
  },

  foam_hardness: {
    titleUz: 'Paralon qattiqligi',
    titleRu: 'Жёсткость поролона',
    bodyUz:
      'Belgidagi ikkinchi raqam (masalan ST2536 dagi 36) — qattiqlik. Qancha yuqori bo‘lsa, o‘tirganda shuncha kam botadi.',
    bodyRu:
      'Второе число в маркировке (например 36 в ST2536) — жёсткость. Чем выше, тем меньше продавливается при посадке.',
  },

  thickness: {
    titleUz: 'Qalinlik',
    titleRu: 'Толщина',
    bodyUz:
      'List qalinligi. O‘tirish qismi uchun odatda 6–10 sm, suyanchiq uchun 3–5 sm ishlatiladi.',
    bodyRu:
      'Толщина листа. Для сиденья обычно 6–10 см, для спинки — 3–5 см.',
    unit: 'sm',
  },

  // ── Mechanisms ────────────────────────────────────────────────────────────
  mechanism_type: {
    titleUz: 'Transformatsiya turi',
    titleRu: 'Тип трансформации',
    bodyUz:
      'Divanning yotoqqa aylanish usuli: yevrokitob, akkordeon, delfin, klik-klak va boshqalar. Har biri turli yig‘ish balandligi va yotoq o‘lchamini beradi.',
    bodyRu:
      'Способ раскладывания дивана: еврокнижка, аккордеон, дельфин, клик-кляк и др. Каждый даёт свою высоту сборки и размер спального места.',
  },

  load_capacity: {
    titleUz: 'Ruxsat etilgan yuk',
    titleRu: 'Допустимая нагрузка',
    bodyUz:
      'Mexanizm buzilmasdan ko‘tara oladigan maksimal og‘irlik. Ikki kishilik yotoq uchun kamida 200 kg tavsiya etiladi.',
    bodyRu:
      'Максимальный вес, который механизм выдерживает без поломки. Для двуспального места рекомендуется не менее 200 кг.',
    unit: 'kg',
  },

  power_type: {
    titleUz: 'Quvvat manbai',
    titleRu: 'Тип питания',
    bodyUz:
      'Instrument qanday ishlashi: pnevmatik (kompressor kerak), elektr tarmoqli yoki akkumulyatorli.',
    bodyRu:
      'Как работает инструмент: пневматический (нужен компрессор), сетевой электрический или аккумуляторный.',
  },
};

/** Safe lookup — returns `undefined` when a key has no glossary entry yet. */
export function getSpecGlossary(key: string): SpecGlossaryEntry | undefined {
  return specGlossary[key];
}

/** Localised tooltip text, or `null` when the term is not documented. */
export function getSpecTooltip(
  key: string,
  locale: string
): { title: string; body: string } | null {
  const entry = specGlossary[key];
  if (!entry) return null;
  return locale === 'ru'
    ? { title: entry.titleRu, body: entry.bodyRu }
    : { title: entry.titleUz, body: entry.bodyUz };
}
