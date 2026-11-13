import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Users, 
  Package, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  BarChart3, 
  Trash2,
  Check,
  Search,
  Filter
} from 'lucide-react';
import { fmt } from '../utils/helpers';

export default function AdminDashboardPage({ 
  products, 
  onDeleteProduct, 
  onShowToast,
  onNavigate 
}) {
  const [filterCat, setFilterCat] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [pendingItems, setPendingItems] = useState([
    { id: 'p1', name: 'Gʻoʻza urugʻi (Buxoro-102 elita)', seller: 'Buxoro Paxta Klasteri', cat: 'urug', price: 42000, region: 'Buxoro viloyati', date: 'Bugun, 10:15' },
    { id: 'p2', name: 'Yomgʻirlatib sugʻorish konsoli (Avtomat)', seller: 'AgroTexnika Savdo', cat: 'texnika', price: 145000000, region: 'Toshkent viloyati', date: 'Bugun, 09:30' },
    { id: 'p3', name: 'Bio-gumus toza Kaliforniya chuvalchangi', seller: 'BioEko Oʻgʻit', cat: 'ogit', price: 1800, region: 'Samarqand viloyati', date: 'Kecha, 18:45' }
  ]);

  const handleApprove = (id, name) => {
    setPendingItems(prev => prev.filter(item => item.id !== id));
    onShowToast(`«${name}» tasdiqlandi va bozorga chiqarildi ✓`);
  };

  const handleReject = (id, name) => {
    setPendingItems(prev => prev.filter(item => item.id !== id));
    onShowToast(`«${name}» rad etildi ✕`);
  };

  const filteredProducts = products.filter(p => {
    const matchesCat = filterCat === 'all' || p.cat === filterCat;
    const matchesSearch = !searchTerm || 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.farmer?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <main id="top" className="py-8 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-800 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-emerald-900/50">
              ⚡
            </div>
            <div>
              <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                Boshqaruv Tizimi
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight">
                Agro Tarmoq Admin Paneli
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300">
              🟢 Tizim holati: Barqaror (2026 v2.4)
            </span>
            <button
              type="button"
              onClick={() => onNavigate('bozor')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
            >
              Bozorni koʻrish
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase">Roʻyxatdan oʻtganlar</span>
              <Users className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">1,458</div>
            <div className="text-xs text-emerald-600 font-semibold mt-1">Fermer va xaridorlar</div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase">Bozordagi Eʼlonlar</span>
              <Package className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{products.length}</div>
            <div className="text-xs text-sky-600 font-semibold mt-1">Faol sertifikatlangan</div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase">Moderatsiya Navbati</span>
              <AlertTriangle className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600">{pendingItems.length}</div>
            <div className="text-xs text-amber-600 font-semibold mt-1">Tasdiqlash kutilmoqda</div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase">Oylik Aylanma</span>
              <BarChart3 className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">1.85 Mlrd</div>
            <div className="text-xs text-purple-600 font-semibold mt-1">Tranzaksiyalar hajmi</div>
          </div>
        </div>

        {/* Pending Moderation Queue */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Kutilayotgan Eʼlonlar Moderatsiyasi ({pendingItems.length})
              </h2>
            </div>
            <span className="text-xs text-slate-400">Yangi kelgan arizalar</span>
          </div>

          {pendingItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              Barcha eʼlonlar tekshirilgan. Moderatsiya navbati boʻsh! 🎉
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {pendingItems.map((item) => (
                <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{item.name}</h3>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Sotuvchi: <strong>{item.seller}</strong> • {item.region} • <span className="text-emerald-600 font-bold">{fmt(item.price)} soʻm</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{item.date}</div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleApprove(item.id, item.name)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Tasdiqlash</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReject(item.id, item.name)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-600 hover:text-white font-bold text-xs transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Rad etish</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Existing Products Management Table */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Barcha Eʼlonlar Boshqaruvi ({filteredProducts.length})
            </h2>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Qidirish..." 
                  className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <select
                value={filterCat}
                onChange={(e) => setFilterCat(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs dark:bg-slate-800 dark:text-white focus:outline-none"
              >
                <option value="all">Barcha toifalar</option>
                <option value="texnika">Agro texnikalar</option>
                <option value="urug">Urugʻlar</option>
                <option value="ogit">Oʻgʻitlar</option>
                <option value="hosil">Hosil</option>
                <option value="xizmatlar">Xizmatlar</option>
                <option value="agronom">Agronom</option>
                <option value="elonlar">Eʼlonlar</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider border-y border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4 font-bold">Mahsulot / Xizmat</th>
                  <th className="py-3 px-4 font-bold">Kategoriya</th>
                  <th className="py-3 px-4 font-bold">Narxi</th>
                  <th className="py-3 px-4 font-bold">Fermer / Hudud</th>
                  <th className="py-3 px-4 font-bold text-right">Amal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredProducts.slice(0, 15).map(p => (
                  <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <img src={p.img} alt={p.name} className="w-8 h-8 rounded-lg object-cover" />
                      <span className="truncate max-w-xs">{p.name}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 capitalize">{p.cat}</td>
                    <td className="py-3 px-4 font-extrabold text-emerald-700 dark:text-emerald-400">
                      {fmt(p.price)} soʻm
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                      {p.farmer} <span className="text-[10px] text-slate-400">({p.region})</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`«${p.name}» mahsulotini oʻchirishga rozimisiz?`)) {
                            onDeleteProduct(p.id);
                            onShowToast("Mahsulot oʻchirildi");
                          }
                        }}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                        title="Oʻchirish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}
