'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
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
} from 'lucide-react';
import Link from 'next/link';

interface WholesaleProps {
  locale: string;
}

export function WholesalePortalClient({ locale }: WholesaleProps) {
  const { user, login, logout, isB2B } = useAuthStore();
  const b2bActive = isB2B();

  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [region, setRegion] = useState('Toshkent shahri');
  const [monthlyVolume, setMonthlyVolume] = useState('300 - 500 metr / list');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDemoB2BLogin = () => {
    login({
      id: 'b2b-demo-id',
      email: 'b2b@mebelfabrika.uz',
      name: 'Otabek Rixsiyev',
      phone: '+998939876543',
      role: 'wholesale_customer',
      companyName: 'Sharq Mebel MCHJ',
      b2bApproved: true,
    });
  };

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
      {/* Header Banner */}
      <div className="bg-charcoal-900 text-surface rounded-3xl p-8 lg:p-12 shadow-xl border border-charcoal-800 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <span className="inline-flex items-center gap-1.5 bg-accent/20 text-accent border border-accent/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Comfort TXT B2B Portal
          </span>
          <h1 className="text-3xl lg:text-4xl font-black leading-tight">
            {locale === 'ru'
              ? 'Оптовые Условия для Мебельных Фабрик и Цехов'
              : 'Mebel Sexlari va Fabrikalar Uchun Ulgurji Portal'}
          </h1>
          <p className="text-muted text-sm leading-relaxed">
            Персональные скидки, поставка по договору счета-фактуры, выделенный менеджер и быстрый ре-ордер.
          </p>
        </div>

        {/* Demo Login Switcher */}
        <div className="bg-surface/10 backdrop-blur-md p-6 rounded-2xl border border-surface/20 text-center space-y-3 min-w-[280px]">
          <div className="text-xs text-muted uppercase tracking-wider font-bold">
            {locale === 'ru' ? 'Тестовый доступ B2B' : 'B2B Test Rejimi'}
          </div>
          {b2bActive ? (
            <div className="space-y-2">
              <div className="text-xs text-emerald-300 font-bold">
                ✓ {user?.companyName} (B2B Hamkor)
              </div>
              <button
                onClick={logout}
                className="w-full py-2.5 bg-accent/80 hover:bg-accent text-surface text-xs font-bold rounded-xl transition"
              >
                {locale === 'ru' ? 'Выйти из B2B' : 'B2B Rejimdan Chiqish'}
              </button>
            </div>
          ) : (
            <button
              onClick={handleDemoB2BLogin}
              className="w-full py-3 bg-accent hover:bg-accent-hover text-surface text-xs font-black uppercase tracking-wider rounded-xl shadow-lg transition"
            >
              ⚡ {locale === 'ru' ? 'Войти как B2B Клиент' : 'B2B Sifatida Kirish'}
            </button>
          )}
        </div>
      </div>

      {/* Account Dashboard if B2B Active */}
      {b2bActive && (
        <div className="bg-surface rounded-3xl border border-emerald-300 p-8 shadow-lg space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
                <Building2 className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-heading">{user?.companyName}</h2>
                <p className="text-xs text-emerald-700 font-bold">
                  {locale === 'ru' ? 'Активный статус B2B партнера' : 'B2B Tasdiqlangan Hamkor Statusi'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-lg">Tasdiqlangan B2B</span>
              <div className="text-[11px] text-muted mt-1">{locale === 'ru' ? 'Спеццены применены' : 'Maxsus ulgurji narxlar'}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-secondary p-4 rounded-2xl border border-border">
              <div className="text-xs font-bold text-muted">{locale === 'ru' ? 'Персональный менеджер' : 'Shaxsiy menejer'}</div>
              <div className="text-sm font-bold text-heading mt-1">Aziz Rahimov</div>
              <div className="text-xs text-accent font-bold mt-1">+998 90 999 88 77</div>
            </div>

            <div className="bg-secondary p-4 rounded-2xl border border-border">
              <div className="text-xs font-bold text-muted">{locale === 'ru' ? 'Условия оплаты' : 'To\'lov shartlari'}</div>
              <div className="text-sm font-bold text-heading mt-1">Bank Transfer / Shartnoma</div>
              <div className="text-xs text-muted mt-1">NDS bilansiz / NDS bilan</div>
            </div>

            <div className="bg-secondary p-4 rounded-2xl border border-border">
              <div className="text-xs font-bold text-muted">{locale === 'ru' ? 'Быстрый повторный заказ' : '1-Klikda Qayta Buyurtma'}</div>
              <Link
                href={`/${locale}/catalog`}
                className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{locale === 'ru' ? 'Повторить прошлый заказ' : 'O\'tgan buyurtmani takrorlash'}</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Registration Form & Benefits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Form */}
        <div className="bg-surface p-8 rounded-3xl border border-border shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-bold text-heading">
              {locale === 'ru' ? 'Регистрация Оптового Клиента' : 'Ulgurji Mijoz Sifatida Ro\'yxatdan O\'tish'}
            </h2>
            <p className="text-xs text-muted mt-1 font-medium">
              {locale === 'ru'
                ? 'Заполните форму для получения оптовых цен'
                : 'Ulgurji narxlarga ega bo\'lish uchun shaklni to\'ldiring'}
            </p>
          </div>

          {success ? (
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-emerald-900">
                {locale === 'ru' ? 'Заявка принята!' : 'Ariza qabul qilindi!'}
              </h3>
              <p className="text-xs text-emerald-800">
                {locale === 'ru'
                  ? 'Наш B2B менеджер свяжется с вами в течение 15 минут для активации оптового кабинета.'
                  : 'B2B menejerimiz 15 daqiqa ichida siz bilan bog\'lanib ulgurji kabinetni faollashtiradi.'}
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
                    className="w-full pl-9 pr-3 py-2.5 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-heading">
                    {locale === 'ru' ? 'Контактное лицо' : 'Mas\'ul shaxs'} *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-muted" />
                    <input
                      type="text"
                      required
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="Otabek Rixsiyev"
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
                    {locale === 'ru' ? 'Регион' : 'Viloyat / Shahar'}
                  </label>
                  <input
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    placeholder="Toshkent shahri"
                    className="w-full px-3.5 py-2.5 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-heading">
                    {locale === 'ru' ? 'Объем закупок в месяц' : 'Oylik hajm'}
                  </label>
                  <input
                    type="text"
                    value={monthlyVolume}
                    onChange={(e) => setMonthlyVolume(e.target.value)}
                    placeholder="500m mato / 100 list paralon"
                    className="w-full px-3.5 py-2.5 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-heading">
                  {locale === 'ru' ? 'Дополнительные пожелания' : 'Qo\'shimcha ma\'lumot'}
                </label>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={locale === 'ru' ? 'Интересующие коллекции...' : 'Qaysi mato turlari kerak...'}
                  className="w-full px-3.5 py-2.5 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:border-accent"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-accent hover:bg-accent-hover text-surface font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>{locale === 'ru' ? 'Отправить Заявку' : 'B2B So\'rovni Yuborish'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Benefits list */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-heading">
            {locale === 'ru' ? 'Преимущества B2B Партнерства' : 'B2B Hamkorlik Afzalliklari'}
          </h2>

          <div className="space-y-4">
            <div className="p-4 bg-surface rounded-2xl border border-border shadow-xs flex items-start gap-4">
              <div className="p-2.5 bg-accent-light text-accent rounded-xl">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-heading">
                  {locale === 'ru' ? 'Оптовая цена до -25%' : 'Ulgurji narxlar va chegirmalar'}
                </h4>
                <p className="text-xs text-muted mt-0.5 font-medium">
                  Velur, ST/EL paralon va mexanizmlar uchun maxsus ulgurji narxlar jadvali.
                </p>
              </div>
            </div>

            <div className="p-4 bg-surface rounded-2xl border border-border shadow-xs flex items-start gap-4">
              <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-heading">
                  {locale === 'ru' ? 'Оплата по счету и НДС' : 'Shartnoma va Schet-Faktura'}
                </h4>
                <p className="text-xs text-muted mt-0.5 font-medium">
                  To'liq huquqiy shaffoflik va bank o'tkazmasi orqali to'lovlar.
                </p>
              </div>
            </div>

            <div className="p-4 bg-surface rounded-2xl border border-border shadow-xs flex items-start gap-4">
              <div className="p-2.5 bg-amber-100 text-amber-700 rounded-xl">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-heading">
                  {locale === 'ru' ? 'Быстрый Re-order' : 'Tezkor Qayta Buyurtma'}
                </h4>
                <p className="text-xs text-muted mt-0.5 font-medium">
                  Sexingiz uchun doimiy xaridlarni 1-klikda qayta rasmiylashtiring.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
