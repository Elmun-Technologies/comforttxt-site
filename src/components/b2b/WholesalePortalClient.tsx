'use client';

import { useState } from 'react';
import { storefrontConfig } from '@/config/storefront';
import { isValidUzPhone, normalizeUzPhone } from '@/lib/utils/phone';
import {
  ShieldCheck,
  Building2,
  Phone,
  User,
  CheckCircle2,
  Loader2,
  RefreshCw,
  ArrowRight,
  Hammer,
  Factory,
  Layers,
  PenTool,
  MapPin,
  ClipboardList,
  PackageCheck,
} from 'lucide-react';

interface WholesaleProps {
  locale: string;
}

/**
 * B2B / Wholesale page — customer-facing only.
 * No demo accounts, no fake tiers, no artificial pricing toggles.
 * The form submits a real partnership request handled by the manager.
 */
export function WholesalePortalClient({ locale }: WholesaleProps) {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [region, setRegion] = useState('');
  const [monthlyVolume, setMonthlyVolume] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactPerson || !isValidUzPhone(phone)) return;

    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/wholesale-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactPerson,
          phone: normalizeUzPhone(phone),
          companyName,
          region,
          monthlyPurchaseRange: monthlyVolume,
          notes: note,
        }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const segments = [
    {
      icon: Hammer,
      titleUz: 'Mebel ustasi',
      titleRu: 'Мебельный мастер',
      descUz: 'Kerakli mahsulotlarni bir joydan topish — mato, paralon, mexanizm va sarf materiallari.',
      descRu: 'Все необходимые материалы в одном месте — ткань, поролон, механизмы и расходники.',
    },
    {
      icon: Layers,
      titleUz: 'Sex',
      titleRu: 'Цех',
      descUz: 'Doimiy xarid va qayta buyurtma — artikullar bo‘yicha tezkor takroriy zakazlar.',
      descRu: 'Постоянные закупки и повторные заказы по артикулам без лишних согласований.',
    },
    {
      icon: Factory,
      titleUz: 'Fabrika',
      titleRu: 'Фабрика',
      descUz: 'Katta hajmdagi ta’minot va alohida hamkorlik shartlari bo‘yicha murojaat.',
      descRu: 'Крупнообъёмные поставки и отдельные условия сотрудничества.',
    },
    {
      icon: PenTool,
      titleUz: 'Dizayner',
      titleRu: 'Дизайнер',
      descUz: 'Faktura, rang va namunalar bilan ishlash — Sample Box orqali real matolarni ko‘rish.',
      descRu: 'Работа с фактурами, цветами и образцами — реальные ткани через Sample Box.',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Header Banner */}
      <div className="relative bg-charcoal-950 text-surface rounded-3xl p-8 lg:p-12 shadow-brand border border-charcoal-900 overflow-hidden">
        {/* Decorative weave overlay */}
        <div aria-hidden="true" className="pattern-rings-dark pattern-fade absolute inset-0 pointer-events-none opacity-60" />
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(40,53,147,0.2), transparent 65%)' }}
        />
        <div className="relative space-y-4 max-w-2xl">
          <span className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.3em] text-cream-200/70">
            <span className="h-px w-10 bg-brand-300" />
            <ShieldCheck className="w-4 h-4 text-brand-300" />
            {storefrontConfig.name} B2B
          </span>
          <h1 className="text-3xl lg:text-4xl font-black leading-tight text-balance">
            {locale === 'ru'
              ? 'Оптовые поставки для мебельных производств'
              : 'Mebel ishlab chiqaruvchilar uchun ulgurji ta’minot'}
          </h1>
          <p className="text-surface/70 text-sm leading-relaxed">
            {locale === 'ru'
              ? 'Матовая ткань, поролон, механизмы и расходники для постоянных закупок. Оставьте заявку — менеджер свяжется с вами и уточнит условия под ваш объём.'
              : 'Doimiy xaridlar uchun mato, paralon, mexanizmlar va sarf materiallari. Ariza qoldiring — menejer bog‘lanib, hajmingizga mos shartlarni aniqlashtiradi.'}
          </p>
        </div>
        <span aria-hidden="true" className="corner-tick corner-tick-tr text-brand-300/70" />
        <span aria-hidden="true" className="corner-tick corner-tick-bl text-brand-300/70" />
      </div>

      {/* Customer Segments */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {segments.map((seg, idx) => {
          const Icon = seg.icon;
          return (
            <div key={idx} className="group bg-surface p-5 rounded-2xl border border-border/70 shadow-xs space-y-2.5 hover:border-accent/50 hover:shadow-brand-sm transition">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-cream-200/70 text-accent rounded-xl w-fit">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-accent/60 group-hover:text-accent transition">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="text-sm font-black text-heading">
                {locale === 'ru' ? seg.titleRu : seg.titleUz}
              </h3>
              <p className="text-[11px] text-muted leading-relaxed">
                {locale === 'ru' ? seg.descRu : seg.descUz}
              </p>
            </div>
          );
        })}
      </section>

      {/* Registration Form & How it works */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Form */}
        <div className="brand-wash relative overflow-hidden bg-surface p-8 rounded-3xl border border-border shadow-xs space-y-6">
          <div
            aria-hidden="true"
            className="pattern-rings pattern-sm pattern-fade absolute inset-0 pointer-events-none opacity-70"
          />
          <div className="relative">
            <h2 className="text-xl font-bold text-heading">
              {locale === 'ru' ? 'Заявка на оптовые условия' : 'Ulgurji shartlar uchun ariza'}
            </h2>
            <p className="text-xs text-muted mt-1 font-medium">
              {locale === 'ru'
                ? 'Заполните форму — менеджер свяжется и уточнит детали'
                : 'Shaklni to‘ldiring — menejer bog‘lanib tafsilotlarni aniqlashtiradi'}
            </p>
          </div>

          {success ? (
            <div className="relative bg-emerald-50 p-6 rounded-2xl border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-emerald-900">
                {locale === 'ru' ? 'Заявка принята!' : 'Ariza qabul qilindi!'}
              </h3>
              <p className="text-xs text-emerald-800">
                {locale === 'ru'
                  ? 'Менеджер B2B-направления свяжется с вами для уточнения условий.'
                  : 'B2B yo‘nalishi menejeri shartlarni aniqlashtirish uchun siz bilan bog‘lanadi.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="relative space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-heading">
                  {locale === 'ru' ? 'Компания или цех' : 'Kompaniya yoki sex'} *
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 w-4 h-4 text-muted" />
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder={locale === 'ru' ? 'Название компании' : 'Kompaniya nomi'}
                    className="w-full pl-9 pr-3 py-2.5 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:border-accent"
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
                      placeholder={locale === 'ru' ? 'Имя' : 'Ism'}
                      className="w-full pl-9 pr-3 py-2.5 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:border-accent"
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
                      inputMode="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+998 90 123 45 67"
                      className="w-full pl-9 pr-3 py-2.5 bg-secondary border border-border rounded-xl text-sm font-semibold focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-heading">
                    {locale === 'ru' ? 'Регион' : 'Viloyat / shahar'}
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted" />
                    <input
                      type="text"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      placeholder="Toshkent"
                      className="w-full pl-9 pr-3 py-2.5 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-heading">
                    {locale === 'ru' ? 'Объём закупок в месяц' : 'Oylik xarid hajmi'}
                  </label>
                  <input
                    type="text"
                    value={monthlyVolume}
                    onChange={(e) => setMonthlyVolume(e.target.value)}
                    placeholder={locale === 'ru' ? 'например, 500 м ткани / 100 листов' : 'masalan, 500 m mato / 100 list'}
                    className="w-full px-3.5 py-2.5 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-heading">
                  {locale === 'ru' ? 'Что вас интересует' : 'Qaysi mahsulotlar kerak'}
                </label>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={locale === 'ru' ? 'Ткани, поролон, механизмы…' : 'Matolar, paralon, mexanizmlar…'}
                  className="w-full px-3.5 py-2.5 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:border-accent"
                />
              </div>

              {error && (
                <p className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 rounded-lg p-2.5">
                  {locale === 'ru'
                    ? 'Не удалось отправить заявку. Попробуйте ещё раз.'
                    : 'Arizani yuborib bo‘lmadi. Qayta urinib ko‘ring.'}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-accent hover:bg-accent-hover text-surface font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>{locale === 'ru' ? 'Отправить заявку' : 'Arizani yuborish'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* How procurement works */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-heading">
            {locale === 'ru' ? 'Как строится закупка' : 'Xarid qanday tashkil etiladi'}
          </h2>

          <div className="space-y-4">
            <div className="p-4 bg-surface rounded-2xl border border-border shadow-xs flex items-start gap-4">
              <div className="p-2.5 bg-accent-light text-accent rounded-xl">
                <ClipboardList className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-heading">
                  {locale === 'ru' ? 'Заказ по артикулам (SKU)' : 'Artikul (SKU) bo‘yicha buyurtma'}
                </h4>
                <p className="text-xs text-muted mt-0.5 font-medium">
                  {locale === 'ru'
                    ? 'Постоянные позиции удобно заказывать по кодам — быстрый повторный заказ без долгих согласований.'
                    : 'Doimiy pozitsiyalarni kodlar bo‘yicha buyurtma qilish qulay — uzoq kelishuvlarsiz tezkor qayta buyurtma.'}
                </p>
              </div>
            </div>

            <div className="p-4 bg-surface rounded-2xl border border-border shadow-xs flex items-start gap-4">
              <div className="p-2.5 bg-brand-100 text-brand-700 rounded-xl">
                <PackageCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-heading">
                  {locale === 'ru' ? 'Подбор под вашу мебель' : 'Mebelingizga mos tanlov'}
                </h4>
                <p className="text-xs text-muted mt-0.5 font-medium">
                  {locale === 'ru'
                    ? 'Поможем подобрать ткань, поролон и механизмы под конкретную модель — с образцами до заказа.'
                    : 'Muayyan model uchun mato, paralon va mexanizm tanlashda yordam beramiz — buyurtmadan oldin namunalar bilan.'}
                </p>
              </div>
            </div>

            <div className="p-4 bg-surface rounded-2xl border border-border shadow-xs flex items-start gap-4">
              <div className="p-2.5 bg-cream-300 text-brand-700 rounded-xl">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-heading">
                  {locale === 'ru' ? 'Доставка и отгрузка' : 'Yetkazib berish va jo‘natish'}
                </h4>
                <p className="text-xs text-muted mt-0.5 font-medium">
                  {locale === 'ru'
                    ? 'Способ, сроки и условия доставки подтверждает менеджер под ваш заказ.'
                    : 'Yetkazish usuli, muddati va shartlarini menejer buyurtmangizga mos tasdiqlaydi.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
