'use client';

import { useState } from 'react';
import {
  ShoppingBag,
  Package,
  Building2,
  Inbox,
  Zap,
  TrendingUp,
  Save,
  Edit2,
  ShieldCheck,
} from 'lucide-react';
import { formatPrice, formatUnit } from '@/lib/formatters';
import { storefrontConfig } from '@/config/storefront';
import { PageHero } from '@/components/layout/PageHero';

interface AdminDashboardClientProps {
  orders: any[];
  products: any[];
  wholesaleRequests: any[];
  sampleRequests: any[];
  quickOrders?: any[];
  cmsBlocks: any[];
  locale: string;
}

export function AdminDashboardClient({
  orders: initialOrders,
  products: initialProducts,
  wholesaleRequests: initialWholesaleReqs,
  sampleRequests,
  quickOrders = [],
  locale,
}: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<'orders' | 'quick' | 'products' | 'wholesale' | 'samples'>('orders');
  const [orders, setOrders] = useState(initialOrders);
  const [products, setProducts] = useState(initialProducts);
  const [wholesaleReqs, setWholesaleReqs] = useState(initialWholesaleReqs);

  // Stock edit state
  const [editingVariantId, setEditingVariantId] = useState<string | null>(null);
  const [editStock, setEditStock] = useState<string>('');
  const [editPrice, setEditPrice] = useState<string>('');
  const [editWholesale, setEditWholesale] = useState<string>('');

  const totalRevenue = orders
    .filter((o) => o.orderStatus !== 'CANCELLED' && o.orderStatus !== 'canceled')
    .reduce((sum, o) => sum + (o.total || o.totalAmount || 0), 0);

  const pendingWholesaleCount = wholesaleReqs.filter((r) => r.status === 'NEW' || r.status === 'pending').length;

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/orders/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, orderStatus: newStatus }),
      });
      if (res.ok) {
        setOrders(
          orders.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleApproveWholesale = async (requestId: string, action: 'approved' | 'rejected') => {
    try {
      const res = await fetch('/api/admin/wholesale/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, action }),
      });
      if (res.ok) {
        setWholesaleReqs(
          wholesaleReqs.map((r) => (r.id === requestId ? { ...r, status: action } : r))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveVariant = async (variantId: string) => {
    try {
      const res = await fetch('/api/admin/variants/update-stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          variantId,
          stock: editStock,
          price: editPrice,
          wholesalePrice: editWholesale,
        }),
      });

      if (res.ok) {
        setProducts(
          products.map((p) => ({
            ...p,
            variants: p.variants.map((v: any) =>
              v.id === variantId
                ? {
                    ...v,
                    inventory: { ...v.inventory, onHand: parseFloat(editStock) },
                    stock: parseFloat(editStock),
                    price: v.price ? { ...v.price, retailPrice: parseFloat(editPrice), wholesalePrice: parseFloat(editWholesale) } : parseFloat(editPrice),
                  }
                : v
            ),
          }))
        );
        setEditingVariantId(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <PageHero
        tone="dark"
        icon={ShieldCheck}
        kicker="Admin"
        title={
          locale === 'ru'
            ? `Панель администратора ${storefrontConfig.name}`
            : `${storefrontConfig.name} admin paneli`
        }
        subtitle={
          locale === 'ru'
            ? 'Управление заказами, товарами, оптовыми B2B клиентами и CMS'
            : 'Buyurtmalar, mahsulotlar zaxirasi va B2B so‘rovlarni boshqarish'
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface p-5 rounded-2xl border border-border shadow-brand-sm flex items-center gap-4">
          <div className="p-3 bg-brand-100 text-brand-700 rounded-xl">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-muted/75 uppercase">{locale === 'ru' ? 'Всего заказов' : 'Jami buyurtmalar'}</div>
            <div className="text-xl font-black text-heading">{orders.length}</div>
          </div>
        </div>

        <div className="bg-surface p-5 rounded-2xl border border-border shadow-brand-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-muted/75 uppercase">{locale === 'ru' ? 'Выручка' : 'Jami tushum'}</div>
            <div className="text-lg font-black text-emerald-800">{formatPrice(totalRevenue, locale)}</div>
          </div>
        </div>

        <div className="bg-surface p-5 rounded-2xl border border-border shadow-brand-sm flex items-center gap-4">
          <div className="p-3 bg-amber-100 text-amber-700 rounded-xl">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-muted/75 uppercase">{locale === 'ru' ? 'B2B Заявки' : 'B2B So\'rovlar'}</div>
            <div className="text-xl font-black text-heading">{pendingWholesaleCount} pending</div>
          </div>
        </div>

        <div className="bg-surface p-5 rounded-2xl border border-border shadow-brand-sm flex items-center gap-4">
          <div className="p-3 bg-brand-100 text-brand-700 rounded-xl">
            <Inbox className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-muted/75 uppercase">{locale === 'ru' ? 'Образцы (Sample Box)' : 'Mato namunalari'}</div>
            <div className="text-xl font-black text-heading">{sampleRequests.length}</div>
          </div>
        </div>
      </div>

      {/* Tabs Header */}
      <div className="flex border-b border-border space-x-4">
        {[
          { id: 'orders', label: locale === 'ru' ? 'Заказы' : 'Buyurtmalar', count: orders.length },
          { id: 'quick', label: locale === 'ru' ? 'Быстрые Заказы' : 'Tezkor Buyurtmalar', count: quickOrders.length },
          { id: 'products', label: locale === 'ru' ? 'Товары и Склад' : 'Mahsulotlar va Stok', count: products.length },
          { id: 'wholesale', label: locale === 'ru' ? 'B2B Заявки' : 'B2B So\'rovlar', count: pendingWholesaleCount },
          { id: 'samples', label: locale === 'ru' ? 'Запросы Образцов' : 'Mato Namunasi So\'rovlari', count: sampleRequests.length },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`pb-3 text-sm font-bold border-b-2 transition flex items-center gap-2 ${
              activeTab === t.id
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-muted hover:text-heading'
            }`}
          >
            <span>{t.label}</span>
            <span className="bg-brand-100 text-body text-xs px-2 py-0.5 rounded-full font-mono">
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="bg-surface rounded-2xl border border-border shadow-brand-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-brand-50 text-[11px] font-bold text-muted/75 uppercase border-b border-border">
                <th className="p-4">Raqami & Sana</th>
                <th className="p-4">Mijoz / Telefon</th>
                <th className="p-4">Tafsilotlar / SKU</th>
                <th className="p-4">Jami Summa</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100 text-xs">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-brand-50/70">
                  <td className="p-4 font-mono font-bold text-brand-700">
                    <div>{order.orderNumber}</div>
                    <div className="text-[10px] text-muted/75 font-sans">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-4 font-medium text-heading">
                    <div>{order.guestName}</div>
                    <div className="text-[11px] text-muted font-mono">{order.guestPhone}</div>
                    <div className="text-[10px] text-muted/75">{order.deliveryAddress || order.guestAddress}</div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1 max-w-xs">
                      {order.items?.map((item: any) => (
                        <div key={item.id} className="text-[11px] text-body">
                          • {item.productNameUz || item.variant?.product?.titleUz} ({item.sku || item.variant?.sku}) x {Number(item.quantity)} {item.unitType?.toLowerCase() || item.unitType}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 font-extrabold text-heading">
                    {formatPrice(order.total || order.totalAmount || 0, locale)}
                  </td>
                  <td className="p-4">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                      className="px-2.5 py-1 bg-brand-100 border border-border rounded-lg text-xs font-bold focus:outline-none"
                    >
                      <option value="NEW">NEW (Yangi)</option>
                      <option value="CONFIRMED">CONFIRMED (Tasdiqlandi)</option>
                      <option value="PROCESSING">PROCESSING (Tayyorlanmoqda)</option>
                      <option value="PACKED">PACKED (Qadoqlandi)</option>
                      <option value="SHIPPED">SHIPPED (Jo'natildi)</option>
                      <option value="DELIVERED">DELIVERED (Yetkazildi)</option>
                      <option value="CANCELLED">CANCELLED (Bekor qilindi)</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Quick Orders Tab */}
      {activeTab === 'quick' && (
        <div className="bg-surface rounded-2xl border border-border shadow-brand-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-brand-50 text-[11px] font-bold text-muted/75 uppercase border-b border-border">
                <th className="p-4">Mijoz / Telefon</th>
                <th className="p-4">SKU / Variant</th>
                <th className="p-4">Miqdor</th>
                <th className="p-4">Sana</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100 text-xs">
              {quickOrders.map((qo) => (
                <tr key={qo.id} className="hover:bg-brand-50/70">
                  <td className="p-4 font-bold text-heading">
                    <div>{qo.name}</div>
                    <div className="text-[11px] text-muted font-mono">{qo.phone}</div>
                  </td>
                  <td className="p-4 font-mono font-semibold text-body">
                    {qo.variant?.sku || qo.productId || '1-Click Order'}
                  </td>
                  <td className="p-4 font-bold text-heading">{Number(qo.quantity || 1)}</td>
                  <td className="p-4 text-muted/75">{new Date(qo.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[11px] font-bold">
                      {qo.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Products & Stock Management Tab */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="bg-surface rounded-2xl border border-border p-5 shadow-brand-sm space-y-3">
              <div className="flex justify-between items-center border-b border-brand-100 pb-2">
                <div>
                  <h3 className="font-bold text-sm text-heading">{product.titleUz}</h3>
                  <p className="text-xs text-muted/75">Category: {product.category?.nameUz || product.category?.slug} • Unit: {product.unitType}</p>
                </div>
              </div>

              <div className="space-y-2">
                {product.variants?.map((v: any) => {
                  const isEditing = editingVariantId === v.id;
                  const currentStock = v.inventory ? Number(v.inventory.onHand) : Number(v.stock || 0);
                  const retail = v.price?.retailPrice ?? (typeof v.price === 'number' ? v.price : 0);
                  const wholesale = v.price?.wholesalePrice ?? (typeof v.wholesalePrice === 'number' ? v.wholesalePrice : retail);

                  return (
                    <div
                      key={v.id}
                      className="flex flex-wrap items-center justify-between gap-4 p-3 bg-brand-50 rounded-xl border border-border/70 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-4 h-4 rounded-full border shadow-brand-sm"
                          style={{ backgroundColor: v.colorHex || '#ccc' }}
                        />
                        <div>
                          <span className="font-mono font-bold text-heading mr-2">{v.sku}</span>
                          <span className="text-body/85">{v.nameUz || v.colorNameUz || product.titleUz}</span>
                        </div>
                      </div>

                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            placeholder="Stock"
                            value={editStock}
                            onChange={(e) => setEditStock(e.target.value)}
                            className="w-20 px-2 py-1 bg-surface border border-border rounded font-bold text-xs"
                          />
                          <input
                            type="number"
                            placeholder="Price"
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                            className="w-24 px-2 py-1 bg-surface border border-border rounded font-bold text-xs"
                          />
                          <input
                            type="number"
                            placeholder="Wholesale"
                            value={editWholesale}
                            onChange={(e) => setEditWholesale(e.target.value)}
                            className="w-24 px-2 py-1 bg-surface border border-border rounded font-bold text-xs"
                          />
                          <button
                            onClick={() => handleSaveVariant(v.id)}
                            className="p-1.5 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4">
                          <div>
                            Stok: <strong className="text-brand-700">{currentStock} {formatUnit(product.unitType, locale)}</strong>
                          </div>
                          <div>
                            Chakana: <strong>{formatPrice(retail, locale)}</strong>
                          </div>
                          <div>
                            B2B: <strong className="text-emerald-700">{formatPrice(wholesale, locale)}</strong>
                          </div>
                          <button
                            onClick={() => {
                              setEditingVariantId(v.id);
                              setEditStock(currentStock.toString());
                              setEditPrice(retail.toString());
                              setEditWholesale(wholesale.toString());
                            }}
                            className="p-1 text-muted/75 hover:text-brand-600"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Wholesale Requests Tab */}
      {activeTab === 'wholesale' && (
        <div className="bg-surface rounded-2xl border border-border shadow-brand-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-brand-50 text-[11px] font-bold text-muted/75 uppercase border-b border-border">
                <th className="p-4">Kompaniya & Mas'ul</th>
                <th className="p-4">Telefon</th>
                <th className="p-4">Hudud & Oylik Hajm</th>
                <th className="p-4">Status</th>
                <th className="p-4">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100 text-xs">
              {wholesaleReqs.map((req) => (
                <tr key={req.id} className="hover:bg-brand-50/70">
                  <td className="p-4 font-bold text-heading">
                    <div>{req.companyName}</div>
                    <div className="text-[11px] text-muted font-normal">{req.name || req.contactPerson}</div>
                  </td>
                  <td className="p-4 font-mono font-semibold text-body">{req.phone}</td>
                  <td className="p-4 text-body">
                    <div>{req.region}</div>
                    <div className="text-[10px] text-muted/75">{req.monthlyPurchaseRange || req.monthlyVolume}</div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        req.status === 'APPROVED' || req.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : req.status === 'REJECTED' || req.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {(req.status === 'NEW' || req.status === 'pending') && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApproveWholesale(req.id, 'approved')}
                          className="px-3 py-1 bg-emerald-600 text-white rounded-lg font-bold text-[11px] hover:bg-emerald-700"
                        >
                          Tasdiqlash
                        </button>
                        <button
                          onClick={() => handleApproveWholesale(req.id, 'rejected')}
                          className="px-3 py-1 bg-red-600 text-white rounded-lg font-bold text-[11px] hover:bg-red-700"
                        >
                          Radd etish
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Sample Box Requests Tab */}
      {activeTab === 'samples' && (
        <div className="bg-surface rounded-2xl border border-border shadow-brand-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-brand-50 text-[11px] font-bold text-muted/75 uppercase border-b border-border">
                <th className="p-4">Mijoz</th>
                <th className="p-4">Telefon</th>
                <th className="p-4">Manzil</th>
                <th className="p-4">Sana</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100 text-xs">
              {sampleRequests.map((sr) => (
                <tr key={sr.id} className="hover:bg-brand-50/70">
                  <td className="p-4 font-bold text-heading">{sr.name}</td>
                  <td className="p-4 font-mono font-semibold text-body">{sr.phone}</td>
                  <td className="p-4 text-body">{sr.city ? `${sr.region}, ${sr.city}` : sr.address}</td>
                  <td className="p-4 text-muted/75">{new Date(sr.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
