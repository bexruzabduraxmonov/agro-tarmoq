import React, { useState } from 'react';
import { 
  Plus, 
  Package, 
  TrendingUp, 
  Eye, 
  ShoppingBag, 
  CheckCircle, 
  Trash2, 
  ShieldCheck, 
  MapPin, 
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { fmt } from '../utils/helpers';

export default function FarmerDashboardPage({ 
  products, 
  onOpenAddModal, 
  onDeleteProduct, 
  onShowToast,
  onNavigate 
}) {
  const [activeTab, setActiveTab] = useState('listings');

  // Filter user's own listings + some demo farmer listings
  const myListings = products.filter(p => p.isUserListing || p.farmer?.includes('Karimov') || p.farmer?.includes('Yusupova'));

  const totalViews = myListings.length * 142 + 280;
  const totalOrders = Math.round(myListings.length * 8.5);
  const totalEstimatedRevenue = myListings.reduce((sum, p) => sum + (p.price * 12), 0);

  return (
    <main id="top" className="py-8 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Profile / Top Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-3xl flex items-center justify-center shadow-lg">
                🧑‍🌾
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Tasdiqlangan Agro-Ishlab Chiqaruvchi
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Fermer Shaxsiy Kabineti
                </h1>
                <p className="text-sm text-emerald-100/80 mt-1 flex items-center gap-3">
                  <span>📍 Toshkent viloyati, Quyi Chirchiq</span>
                  <span>•</span>
                  <span>📅 Aʼzolik: 2026-yildan</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenAddModal}
                className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-sm shadow-lg shadow-emerald-950/40 flex items-center gap-2 transition-all hover:scale-105"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Yangi Eʼlon Joylashtirish</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Mening Eʼlonlarim</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {myListings.length} ta
            </div>
            <div className="text-xs text-emerald-600 font-semibold mt-1">Bozorda faol sotuvda</div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Koʻrishlar Soni</span>
              <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 flex items-center justify-center">
                <Eye className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {fmt(totalViews)}
            </div>
            <div className="text-xs text-sky-600 font-semibold mt-1">Haftalik oʻsish: +18%</div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Xarid Talablari</span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {totalOrders} ta
            </div>
            <div className="text-xs text-amber-600 font-semibold mt-1">Kelib tushgan arizalar</div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Taxminiy Aylanma</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-700 dark:text-emerald-400">
              {fmt(totalEstimatedRevenue)} <span className="text-xs font-normal text-slate-500">soʻm</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">Platformadagi umumiy potensial</div>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('listings')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
              activeTab === 'listings'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Mening Eʼlonlarim ({myListings.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
              activeTab === 'orders'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Kelgan Buyurtmalar (5)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
              activeTab === 'profile'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Xoʻjalik Maʼlumotlari
          </button>
        </div>

        {/* Tab 1: Listings */}
        {activeTab === 'listings' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Joylashtirilgan Mahsulot va Xizmatlar
              </h2>
              <button
                type="button"
                onClick={onOpenAddModal}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>Yangi qoʻshish</span>
              </button>
            </div>

            {myListings.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="text-4xl">🌾</div>
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                  Sizda hali faol eʼlonlar mavjud emas
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Agro Tarmoq orqali mahsulotingizni butun Oʻzbekiston boʻyicha xaridorlarga taklif qiling.
                </p>
                <button
                  type="button"
                  onClick={onOpenAddModal}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-700/20 inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Birinchi eʼlonni joylashtirish</span>
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {myListings.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <img 
                          src={p.img} 
                          alt={p.name}
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-emerald-900/90 text-white text-[11px] font-bold backdrop-blur-sm">
                          {p.region}
                        </div>
                        {p.isUserListing && (
                          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-extrabold shadow">
                            Sizning eʼloningiz
                          </div>
                        )}
                      </div>

                      <div className="p-4 space-y-2">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                          {p.name}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                          {p.desc}
                        </p>
                        <div className="text-base font-extrabold text-emerald-700 dark:text-emerald-400">
                          {fmt(p.price)} soʻm <span className="text-xs font-normal text-slate-500">/ {p.unit}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-2 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Faol sotuvda
                      </span>
                      {p.isUserListing && (
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm("Haqiqatan ham ushbu eʼlonni oʻchirmoqchimisiz?")) {
                              onDeleteProduct(p.id);
                              onShowToast("Eʼlon oʻchirildi");
                            }
                          }}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          title="Eʼlonni oʻchirish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Orders */}
        {activeTab === 'orders' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Xaridorlar Tomonidan Qoldirilgan Talablar
            </h2>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                { id: 1, buyer: 'Samarqand Meva Savdo MCHJ', item: 'Pomidor (Qizil serhosil nav)', qty: '2,500 kg', date: 'Bugun, 09:40', status: 'Yangi soʻrov' },
                { id: 2, buyer: 'Otabek Mirzayev (Fermer)', item: 'Elita bugʻdoy urugʻi F1', qty: '10 qop (500 kg)', date: 'Kecha, 16:20', status: 'Kelishuv jarayonida' },
                { id: 3, buyer: 'AgroLogistika Servis', item: 'Agrodron purkash xizmati', qty: '40 gektar', date: '11-Noyabr', status: 'Bajarildi' }
              ].map(order => (
                <div key={order.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{order.buyer}</div>
                    <div className="text-xs text-slate-500">{order.item} • <strong>{order.qty}</strong></div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{order.date}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                      {order.status}
                    </span>
                    <button
                      type="button"
                      onClick={() => onShowToast("Xaridor bilan chat ochilmoqda...")}
                      className="px-4 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-emerald-600 hover:text-white transition-colors"
                    >
                      Batafsil / Javob berish
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Profile */}
        {activeTab === 'profile' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 max-w-2xl space-y-5">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Fermer Xoʻjaligi Maʼlumotlari
            </h2>
            <div className="space-y-4 text-sm">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Xoʻjalik Nomi</label>
                <div className="font-bold text-slate-900 dark:text-white mt-1">«Agro Baraka Hosil» Fermer Xoʻjaligi</div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Rahbar / Masʼul</label>
                <div className="font-bold text-slate-900 dark:text-white mt-1">Karimov Akmal Rashidovich</div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Asosiy Faoliyat Yoʻnalishi</label>
                <div className="font-bold text-slate-900 dark:text-white mt-1">Sabzavotchilik, Issiqxona va Don ekinlari</div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Ekin Maydoni</label>
                <div className="font-bold text-slate-900 dark:text-white mt-1">45 gektar (sugʻoriladigan unumdor yer)</div>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
