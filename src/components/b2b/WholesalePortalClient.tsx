'use client';

import { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  Phone,
  User,
  CheckCircle2,
  Loader2,
  RefreshCw,
  Zap,
  ArrowRight,
  Hammer,
  Palette,
  Truck,
  FileText,
} from 'lucide-react';
import { storefrontConfig } from '@/config/storefront';

interface WholesaleProps {
  locale: string;
}

export function WholesalePortalClient({ locale }: WholesaleProps) {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [businessType, setBusinessType] = useState('WORKSHOP');
  const [region, setRegion] = useState('Toshkent shahri');
  const [monthlyVolume, setMonthlyVolume] = useState('300 - 500 metr / list');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactPerson || phone.length < 9) return;

    setLoading(true);
    try {
      const res = await fetch('/api/wholesale-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactPerson,
          phone,
          companyName,
          businessType,
          region,
          monthlyPurchaseRange: monthlyVolume,
          notes: note,
        }),
      });

      if (res.ok) {
        setSuccess(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Header Hero */}
      <div className="bg-charcoal-950 text-surface rounded-3xl p-8 lg:p-12 shadow-xl border border-charcoal-800 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-accent/15 text-accent border border-accent/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Comfort TXT B2B Hamkorlik</span>
          </div>
          <h1 className="text-2xl lg:text-4xl font-black leading-tight text-surface">
            {locale === 'ru'
              ? 'Оптовые Поставки для Мебельных Фабрик, Цехов и Мастеров'
              : 'Mebel Fabrikalari, Sexlar va Ustalar Uchun Ulgurji Ta’minot'}
          </h1>
          <p className="text-surface/70 text-xs sm:text-sm leading-relaxed max-w-xl">
            {locale === 'ru'
              ? 'Прямые поставки мебельных тканей, поролона, механизмов и фурнитуры. Работаем по договору с НДС, предоставляем образцы и организуем доставку до вашего производства.'
              : 'Mebel matolari, paralon, mexanizmlar va professional furniturani to‘g‘ridan-to‘g‘ri ta’minoti. Shartnoma va hisob-faktura asosida, namunalarni taqdim etish va ustaxonagacha yetkazish.'}
          </p>
        </div>

        <div className="bg-charcoal-900/90 border border-charcoal-800 p-6 rounded-2xl text-center space-y-3 min-w-[280px]">
          <div className="text-xs text-surface/60 font-bold uppercase tracking-wider">
            {locale === 'ru' ? 'Связь с B2B отделом' : 'B2B bo‘limi bilan aloqa'}
          </div>
          <a
            href={`tel:${storefrontConfig.phoneRaw}`}
            className="block text-lg font-black text-accent hover:underline"
          >
            {storefrontConfig.phone}
          </a>
          <a
            href={storefrontConfig.telegramChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-surface text-xs font-bold rounded-xl transition shadow-xs"
          >
            <span>Telegram orqali bog‘lanish</span>
          </a>
        </div>
      </div>

      {/* 4 Audience Segments */}
      <div className="space-y-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-accent">
            {locale === 'ru' ? 'Сегменты партнеров' : 'Hamkorlik yo‘nalishlari'}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-heading tracking-tight mt-0.5">
            {locale === 'ru' ? 'Кому мы поставляем материалы?' : 'Kimlar bilan ishlaymiz?'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Mebel Ustasi */}
          <div className="bg-surface rounded-2xl p-6 border border-border shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-accent-light text-accent flex items-center justify-center">
                <Hammer className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-heading">
                {locale === 'ru' ? 'Мебельные мастера' : 'Mebel ustalari'}
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                {locale === 'ru'
                  ? 'Все необходимые материалы в одном месте: отрезы ткани, поролон нужной марки, клей и крепеж без переплат.'
                  : 'Kerakli barcha mahsulotlarni bir joydan xarid qilish: mato, paralon, mexanizm, yelim va furnituralar.'}
              </p>
            </div>
            <div className="text-[11px] font-bold text-accent pt-2 border-t border-border">
              {locale === 'ru' ? 'Быстрый подбор и отрез' : 'Tez tanlov va aniq o‘lcham'}
            </div>
          </div>

          {/* 2. Mebel Sexi */}
          <div className="bg-surface rounded-2xl p-6 border border-border shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-heading">
                {locale === 'ru' ? 'Мебельные цеха' : 'Mebel sexlari'}
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                {locale === 'ru'
                  ? 'Регулярные поставки рулонами и листами, стабильное наличие на складе и быстрый повторный заказ по артикулам.'
                  : 'Doimiy ta’minot, barqaror ombor qoldig‘i va artikul (SKU) bo‘yicha tezkor qayta buyurtma.'}
              </p>
            </div>
            <div className="text-[11px] font-bold text-emerald-700 pt-2 border-t border-border">
              {locale === 'ru' ? 'Оптовый прайс и доставка' : 'Ulgurji narx va yetkazish'}
            </div>
          </div>

          {/* 3. Fabrika */}
          <div className="bg-surface rounded-2xl p-6 border border-border shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-heading">
                {locale === 'ru' ? 'Фабрики и производства' : 'Fabrikalar'}
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                {locale === 'ru'
                  ? 'Крупнооптовые партии, работа по контракту с НДС, персональный менеджер и согласованный график отгрузок.'
                  : 'Katta hajmdagi ta’minot, rasmiy shartnoma, hisob-faktura (QQS), shaxsiy menejer va yetkazish grafigi.'}
              </p>
            </div>
            <div className="text-[11px] font-bold text-blue-700 pt-2 border-t border-border">
              {locale === 'ru' ? 'Индивидуальные условия' : 'Maxsus shartnoma'}
            </div>
          </div>

          {/* 4. Dizayner */}
          <div className="bg-surface rounded-2xl p-6 border border-border shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-heading">
                {locale === 'ru' ? 'Дизайнеры мебели' : 'Mebel dizaynerlari'}
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                {locale === 'ru'
                  ? 'Каталоги образцов, актуальные палитры трендовых велюров, букле и шениллов для презентации клиентам.'
                  : 'Mato namunalari (Sample Box), trenddagi ranglar palitrasi va buyurtmachiga taqdim qilish uchun kataloglar.'}
              </p>
            </div>
            <div className="text-[11px] font-bold text-purple-700 pt-2 border-t border-border">
              {locale === 'ru' ? 'Каталоги и образцы' : 'Katalog va namunalar'}
            </div>
          </div>
        </div>
      </div>

      {/* Registration Form & Operational Facts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Form */}
        <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-xs space-y-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-heading">
              {locale === 'ru' ? 'Заявка на Оптовое Сотрудничество' : 'Ulgurji Hamkorlik Uchun Ariza'}
            </h2>
            <p className="text-xs text-muted mt-1 font-medium">
              {locale === 'ru'
                ? 'Заполните форму, и наш менеджер свяжется с вами для согласования условий и цен.'
                : 'Formani to‘ldiring, menejerimiz narxlar va hamkorlik shartlarini kelishish uchun bog‘lanadi.'}
            </p>
          </div>

          {success ? (
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-base sm:text-lg font-bold text-emerald-900">
                {locale === 'ru' ? 'Заявка принята!' : 'Ariza qabul qilindi!'}
              </h3>
              <p className="text-xs text-emerald-800 max-w-md mx-auto">
                {locale === 'ru'
                  ? 'Наш B2B менеджер свяжется с вами в течение рабочего времени для подтверждения условий.'
                  : 'B2B menejerimiz ish vaqti davomida siz bilan bog‘lanib, narxlar va shartlarni taqdim etadi.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-heading">
                  {locale === 'ru' ? 'Название компании или цеха' : 'Kompaniya yoki Sex nomi'} *
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 w-4 h-4 text-muted" />
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Sharq Mebel MCHJ"
                    className="w-full pl-9 pr-3 py-2.5 bg-secondary border border-border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-heading">
                    {locale === 'ru' ? 'Контактное лицо' : 'Mas’ul shaxs'} *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-muted" />
                    <input
                      type="text"
                      required
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="Otabek Rixsiyev"
                      className="w-full pl-9 pr-3 py-2.5 bg-secondary border border-border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-heading">
                    {locale === 'ru' ? 'Телефон' : 'Aloqa telefoni'} *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-muted" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+998 90 123 45 67"
                      className="w-full pl-9 pr-3 py-2.5 bg-secondary border border-border rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-heading">
                    {locale === 'ru' ? 'Тип деятельности' : 'Faoliyat turi'}
                  </label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-secondary border border-border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-accent font-medium"
                  >
                    <option value="WORKSHOP">{locale === 'ru' ? 'Мебельный цех / Мастерская' : 'Mebel sexi / Ustaxona'}</option>
                    <option value="MANUFACTURER">{locale === 'ru' ? 'Мебельная фабрика' : 'Mebel fabrikasi'}</option>
                    <option value="DESIGNER">{locale === 'ru' ? 'Дизайнер / Архитектор' : 'Dizayner / Arxitektor'}</option>
                    <option value="RETAILER">{locale === 'ru' ? 'Магазин мебельных материалов' : 'Materiallar do‘koni'}</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-heading">
                    {locale === 'ru' ? 'Регион' : 'Viloyat / Shahar'}
                  </label>
                  <input
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    placeholder="Toshkent shahri"
                    className="w-full px-3.5 py-2.5 bg-secondary border border-border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-heading">
                  {locale === 'ru' ? 'Ориентировочный объем закупок' : 'Taxminiy oylik hajm'}
                </label>
                <input
                  type="text"
                  value={monthlyVolume}
                  onChange={(e) => setMonthlyVolume(e.target.value)}
                  placeholder="Masalan: 300-500m mato, 50 list paralon"
                  className="w-full px-3.5 py-2.5 bg-secondary border border-border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-heading">
                  {locale === 'ru' ? 'Интересующие материалы' : 'Qiziqtirgan mahsulotlar'}
                </label>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={locale === 'ru' ? 'Укажите интересующие категории...' : 'Masalan: Velyur matolar, ST-2536 paralon, Akfix...'}
                  className="w-full px-3.5 py-2.5 bg-secondary border border-border rounded-xl text-xs sm:text-sm focus:outline-none focus:border-accent"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-accent hover:bg-accent-hover text-surface font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>{locale === 'ru' ? 'Отправить Заявку' : 'Arizani Yuborish'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Concrete B2B Operational Facts */}
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-heading">
            {locale === 'ru' ? 'Условия работы с Comfort TXT' : 'Comfort TXT bilan ishlash shartlari'}
          </h2>

          <div className="space-y-3">
            <div className="p-4 bg-surface rounded-2xl border border-border shadow-xs flex items-start gap-4">
              <div className="p-2.5 bg-accent-light text-accent rounded-xl flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-heading">
                  {locale === 'ru' ? 'Официальный договор и счет-фактура' : 'Rasmiy shartnoma va hisob-faktura'}
                </h4>
                <p className="text-xs text-muted mt-0.5 leading-relaxed">
                  {locale === 'ru'
                    ? 'Работаем юридически прозрачно по безналичному расчету с НДС и всеми закрывающими документами.'
                    : 'To‘liq qonuniy shaffoflik: bank o‘tkazmasi, QQS (NDS) bilan ishlash va hisobot hujjatlari.'}
                </p>
              </div>
            </div>

            <div className="p-4 bg-surface rounded-2xl border border-border shadow-xs flex items-start gap-4">
              <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl flex-shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-heading">
                  {locale === 'ru' ? 'Повторный заказ по артикулу (SKU)' : 'Artikul (SKU) bo‘yicha qayta buyurtma'}
                </h4>
                <p className="text-xs text-muted mt-0.5 leading-relaxed">
                  {locale === 'ru'
                    ? 'Заказывайте нужные партии материалов напрямую по артикулу без необходимости повторного согласования.'
                    : 'Sexingiz uchun kerakli rang va zichlikdagi mahsulotlarni SKU kodi orqali tezkor qayta buyurtma qilish.'}
                </p>
              </div>
            </div>

            <div className="p-4 bg-surface rounded-2xl border border-border shadow-xs flex items-start gap-4">
              <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl flex-shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-heading">
                  {locale === 'ru' ? 'Доставка по Ташкенту и в регионы' : 'Toshkent va viloyatlarga yetkazib berish'}
                </h4>
                <p className="text-xs text-muted mt-0.5 leading-relaxed">
                  {locale === 'ru'
                    ? 'Организуем доставку партий материалов прямо в ваш цех или склад по согласованному графику.'
                    : 'Katta va kichik partiyalarni to‘g‘ridan-to‘g‘ri ustaxonangizga yoki omboringizga yetkazish xizmati.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
