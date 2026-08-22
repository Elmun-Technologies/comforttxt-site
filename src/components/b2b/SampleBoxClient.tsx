'use client';

import { useState } from 'react';
import { Package, CheckCircle2, User, Phone, MapPin, Loader2, ArrowRight } from 'lucide-react';

interface SampleBoxProps {
  collections: any[];
  fabrics: any[];
  locale: string;
}

export function SampleBoxClient({ collections, fabrics, locale }: SampleBoxProps) {
  const [selectedFabricIds, setSelectedFabricIds] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center mx-auto shadow-md">
          <Package className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          {locale === 'ru' ? 'Заказ Образцов Тканей (Sample Box)' : 'Mato Namunalari To\'plamini (Sample Box) So\'rash'}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
          {locale === 'ru'
            ? 'Выберите интересующие коллекции fabrics и получите каталог образцов прямо в ваш цех или офис.'
            : 'Sizga kerakli mato kolleksiyalarini tanlang va namunalar to\'plamini sexingiz yoki ofisingizga yetkazib beramiz.'}
        </p>
      </div>

      {success ? (
        <div className="bg-white p-8 rounded-3xl border border-emerald-200 shadow-xl text-center space-y-4">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900">
            {locale === 'ru' ? 'Запрос отправлен!' : 'So\'rov qabul qilindi!'}
          </h2>
          <p className="text-xs text-gray-600 max-w-md mx-auto">
            {locale === 'ru'
              ? 'Наш курьер привезет каталог образцов в ближайшее время.'
              : 'Kuryerimiz tez orada mato namunalari katalogini ko\'rsatilgan manzilga yetkazadi.'}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-gray-200 shadow-lg space-y-8">
          {/* Fabric Select Grid */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
              1. {locale === 'ru' ? 'Выберите интересующие matolar:' : 'Sizga kerakli matolarni tanlang:'}
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
                        ? 'border-brand-600 bg-brand-50/70 ring-2 ring-brand-500/20'
                        : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                        isSelected ? 'bg-brand-600 border-brand-600 text-white' : 'border-gray-300 bg-white'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-gray-900 truncate">
                        {locale === 'ru' ? f.titleRu : f.titleUz}
                      </div>
                      <div className="text-[10px] text-gray-400">
                        {f.variants.length} {locale === 'ru' ? 'цветов' : 'xil rang'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contact Fields */}
          <div className="space-y-4 border-t border-gray-100 pt-6">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
              2. {locale === 'ru' ? 'Ваши контакты для доставки:' : 'Yetkazish uchun aloqa ma\'lumotlaringiz:'}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">{locale === 'ru' ? 'Имя' : 'Ism'}</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alisher"
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">{locale === 'ru' ? 'Телефон' : 'Telefon'}</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+998 90 123 45 67"
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">{locale === 'ru' ? 'Адрес доставки цеха/офиса' : 'Sex/Ofis manzili'}</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Toshkent sh., Yangihayot t., Sanoat zonasi"
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>{locale === 'ru' ? 'Отправить Запрос На Образцы' : 'Mato Namunasini So\'rash'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
