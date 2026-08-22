'use client';

import { useState } from 'react';
import { Package, CheckCircle2, User, Phone, MapPin, Loader2, ArrowRight, ClipboardCheck, Layers, Handshake, Search } from 'lucide-react';

interface SampleBoxProps {
  fabrics: any[];
  locale: string;
}

/**
 * Sample Box — sample fabric swatches request.
 * Explains what the customer receives and how the request works,
 * without claiming free samples, free delivery or exact delivery times.
 */
export function SampleBoxClient({ fabrics, locale }: SampleBoxProps) {
  const [selectedFabricIds, setSelectedFabricIds] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const toggleFabric = (id: string) => {
    if (selectedFabricIds.includes(id)) {
      setSelectedFabricIds(selectedFabricIds.filter((f) => f !== id));
    } else {
      setSelectedFabricIds([...selectedFabricIds, id]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || phone.length < 9) return;

    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/sample-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          address,
          selectedFabrics: selectedFabricIds,
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

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-accent-light text-accent rounded-2xl flex items-center justify-center mx-auto shadow-md">
          <Package className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-black text-heading tracking-tight">
          {locale === 'ru' ? 'Sample Box — образцы тканей' : 'Sample Box — mato namunalari'}
        </h1>
        <p className="text-xs sm:text-sm text-muted max-w-xl mx-auto">
          {locale === 'ru'
            ? 'Реальные цвет и фактура ткани — до того, как принимать решение о заказе.'
            : 'Matoning haqiqiy rangi va fakturasi — buyurtma qilishdan oldin.'}
        </p>
      </div>

      {/* What / Who / What you get / How it works */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-surface p-5 rounded-2xl border border-border shadow-xs space-y-2">
          <div className="p-2 bg-accent-light text-accent rounded-xl w-fit">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-heading">
            {locale === 'ru' ? 'Что это такое' : 'Bu nima?'}
          </h3>
          <p className="text-[11px] text-muted leading-relaxed">
            {locale === 'ru'
              ? 'Раскладка образцов выбранных тканей — чтобы оценить цвет и фактуру вживую, а не по фото.'
              : 'Tanlangan matolarning namunalari to‘plami — rang va fakturani suratdan emas, qo‘lda ko‘rib baholash uchun.'}
          </p>
        </div>

        <div className="bg-surface p-5 rounded-2xl border border-border shadow-xs space-y-2">
          <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl w-fit">
            <Handshake className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-heading">
            {locale === 'ru' ? 'Кому это нужно' : 'Kimga kerak?'}
          </h3>
          <p className="text-[11px] text-muted leading-relaxed">
            {locale === 'ru'
              ? 'Мебельным цехам, мастерам и дизайнерам — для согласования с клиентом и проверки материала перед закупкой.'
              : 'Mebel sexlari, ustalar va dizaynerlarga — mijoz bilan kelishish va xariddan oldin materialni tekshirish uchun.'}
          </p>
        </div>

        <div className="bg-surface p-5 rounded-2xl border border-border shadow-xs space-y-2">
          <div className="p-2 bg-amber-100 text-amber-700 rounded-xl w-fit">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-heading">
            {locale === 'ru' ? 'Что вы получите' : 'Nima olasiz?'}
          </h3>
          <p className="text-[11px] text-muted leading-relaxed">
            {locale === 'ru'
              ? 'Образцы выбранных позиций с указанием артикулов — по ним легко оформить точный заказ.'
              : 'Tanlangan pozitsiyalar namunalari, artikullari bilan — ular bo‘yicha aniq buyurtma berish oson.'}
          </p>
        </div>

        <div className="bg-surface p-5 rounded-2xl border border-border shadow-xs space-y-2">
          <div className="p-2 bg-blue-100 text-blue-700 rounded-xl w-fit">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-heading">
            {locale === 'ru' ? 'Как это работает' : 'Qanday ishlaydi?'}
          </h3>
          <p className="text-[11px] text-muted leading-relaxed">
            {locale === 'ru'
              ? 'Выберите ткани → оставьте контакты → менеджер свяжется и согласует состав и условия передачи образцов.'
              : 'Matolarni tanlang → kontaktlarni qoldiring → menejer bog‘lanib, namunalar tarkibi va berish shartlarini kelishadi.'}
          </p>
        </div>
      </div>

      {success ? (
        <div className="bg-surface p-8 rounded-3xl border border-emerald-200 shadow-xs text-center space-y-4">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
          <h2 className="text-2xl font-bold text-heading">
            {locale === 'ru' ? 'Заявка отправлена!' : 'So‘rov qabul qilindi!'}
          </h2>
          <p className="text-xs text-muted max-w-md mx-auto">
            {locale === 'ru'
              ? 'Менеджер свяжется с вами и согласует состав и способ передачи образцов.'
              : 'Menejer siz bilan bog‘lanib, namunalar tarkibi va yetkazish usulini kelishadi.'}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-surface p-8 rounded-3xl border border-border shadow-xs space-y-8">
          {/* Fabric Select Grid */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-heading uppercase tracking-wider block">
              1. {locale === 'ru' ? 'Выберите ткани:' : 'Matolarni tanlang:'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {fabrics.map((f) => {
                const isSelected = selectedFabricIds.includes(f.id);
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => toggleFabric(f.id)}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition ${
                      isSelected
                        ? 'border-accent bg-accent-light ring-2 ring-accent/20'
                        : 'border-border bg-secondary hover:bg-border/50'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'bg-accent border-accent text-surface' : 'border-muted bg-surface'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-heading truncate">
                        {locale === 'ru' ? f.titleRu : f.titleUz}
                      </div>
                      <div className="text-[10px] text-muted">
                        {f.variants?.length || 0} {locale === 'ru' ? 'цветов' : 'xil rang'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contact Fields */}
          <div className="space-y-4 border-t border-border pt-6">
            <label className="text-xs font-bold text-heading uppercase tracking-wider block">
              2. {locale === 'ru' ? 'Контакты для связи:' : 'Bog‘lanish uchun ma’lumotlar:'}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-heading">{locale === 'ru' ? 'Имя' : 'Ism'}</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-muted" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={locale === 'ru' ? 'Имя' : 'Ism'}
                    className="w-full pl-9 pr-3 py-2.5 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-heading">{locale === 'ru' ? 'Телефон' : 'Telefon'}</label>
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

            <div className="space-y-1">
              <label className="text-xs font-bold text-heading">
                {locale === 'ru' ? 'Цех / офис / адрес' : 'Sex / ofis / manzil'}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={locale === 'ru' ? 'Город, адрес' : 'Shahar, manzil'}
                  className="w-full pl-9 pr-3 py-2.5 bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:border-accent"
                />
              </div>
            </div>
          </div>

          {error && (
            <p className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 rounded-lg p-2.5">
              {locale === 'ru'
                ? 'Не удалось отправить заявку. Попробуйте ещё раз.'
                : 'So‘rovni yuborib bo‘lmadi. Qayta urinib ko‘ring.'}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-accent hover:bg-accent-hover text-surface font-bold text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>{locale === 'ru' ? 'Отправить запрос' : 'So‘rovni yuborish'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
