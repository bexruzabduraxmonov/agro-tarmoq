import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Heart, 
  ShoppingCart, 
  Star, 
  MapPin, 
  Truck, 
  CheckCircle2, 
  Layers, 
  Award, 
  Plus, 
  TrendingUp,
  BarChart3,
  Building2,
  Users
} from 'lucide-react';
import { AGRO_DATA } from '../data/agroData';
import { fmt } from '../utils/helpers';

export default function HomePage({ 
  onNavigate, 
  products = AGRO_DATA.products, 
  onAddToCart, 
  onOpenProductDetail,
  favorites = {},
  onToggleFavorite,
  onOpenAddModal 
}) {
  const [searchVal, setSearchVal] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('Barcha viloyatlar');
  const [activeTab, setActiveTab] = useState('all');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      window.location.hash = 'bozor';
      onNavigate('bozor');
    } else {
      onNavigate('bozor');
    }
  };

  const handleCategoryClick = (catId) => {
    sessionStorage.setItem('agro_selected_cat', catId);
    onNavigate('bozor');
  };

  // Filter products for the featured section
  const displayProducts = products.filter(p => {
    if (activeTab === 'all') return true;
    if (activeTab === 'texnika') return p.cat === 'texnika' || p.cat === 'texnika_savdo';
    if (activeTab === 'urug') return p.cat === 'urug';
    if (activeTab === 'ogit') return p.cat === 'ogit' || p.cat === 'mineral_ogit' || p.cat === 'parvarish';
    if (activeTab === 'hosil') return p.cat === 'hosil' || p.cat === 'sabzavot' || p.cat === 'meva';
    if (activeTab === 'xizmatlar') return p.cat === 'xizmatlar';
    return p.cat === activeTab;
  }).slice(0, 8);

  return (
    <main id="top" className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
      
      {/* ─── 1. HERO BANNER ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-6 pb-16 lg:py-20 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Oʻzbekiston №1 Raqamli Agro Marketplace
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Qishloq Xoʻjaligi <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-green-400">
                  Mahsulot va Xizmatlari
                </span> Bozori
              </h1>

              <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Sertifikatlangan urugʻlar, zamonaviy agrotexnika, mineral oʻgʻitlar va bevosita fermerlardan yangi hosil. Vositachisiz shaffof narxlar va ishonchli bitimlar.
              </p>

              {/* Advanced Search Form */}
              <form 
                onSubmit={handleHeroSearch}
                className="bg-white dark:bg-slate-900 p-2 sm:p-2.5 rounded-3xl shadow-2xl border border-emerald-500/30 flex flex-col sm:flex-row items-center gap-2 max-w-2xl mx-auto lg:mx-0"
              >
                <div className="flex-1 flex items-center gap-2 px-3.5 w-full">
                  <Search className="w-5 h-5 text-emerald-600 shrink-0" />
                  <input 
                    type="text" 
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    placeholder="Qidiruv: Bugʻdoy urugʻi, Traktor, NPK oʻgʻit..." 
                    className="w-full py-2.5 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none"
                  />
                </div>

                <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-700" />

                <div className="w-full sm:w-auto flex items-center gap-2">
                  <select 
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full sm:w-44 py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold focus:outline-none"
                  >
                    {AGRO_DATA.regionsList.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold text-sm shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 shrink-0 transition-all hover:scale-105"
                  >
                    <span>Topish</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Quick Tags */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs">
                <span className="text-emerald-300/70 font-semibold">Ommabop:</span>
                {['Elita Urugʻlar', 'Traktor Ijarasi', 'Bio-Gumus', 'Agrodron', 'Pomidor F1', 'CA Ombor'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSearchVal(tag);
                      onNavigate('bozor');
                    }}
                    className="px-3 py-1 rounded-full bg-emerald-800/60 hover:bg-emerald-700 border border-emerald-700/60 text-emerald-200 text-[11px] font-semibold transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-emerald-800/60 text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white">15,000+ ga</div>
                  <div className="text-[11px] text-emerald-300/80">Ekin maydoni</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white">1,450+</div>
                  <div className="text-[11px] text-emerald-300/80">Fermer & Klaster</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white">85,000 t</div>
                  <div className="text-[11px] text-emerald-300/80">Hosil savdosi</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white">100%</div>
                  <div className="text-[11px] text-emerald-300/80">Sertifikatlangan</div>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-emerald-500/30 group">
                <img 
                  src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1000&q=80" 
                  alt="Agro Tarmoq Zamonaviy Texnika va Fermerlik"
                  className="w-full aspect-[4/3] sm:aspect-[16/11] object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/30 to-transparent" />
                
                {/* Floating pill badge on image */}
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-emerald-900 dark:text-emerald-300 text-xs font-bold shadow-lg flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  Zamonaviy Agrosanoat Ekotizimi
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="text-xs text-emerald-300 font-bold uppercase tracking-wider mb-1">
                    Fermerlar uchun qulaylik
                  </div>
                  <h3 className="text-lg font-bold leading-snug">
                    Oʻz mahsulotingizni bevosita soting yoki eng qulay ijara texnikasini toping
                  </h3>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={onOpenAddModal}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Eʼlon Joylashtirish</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate('bozor')}
                      className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-xs transition-all"
                    >
                      Bozorga Oʻtish
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 2. 7 TA ASOSIY BO'LIM / MASHHUR KATEGORIYALAR ───────────── */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              Asosiy Boʻlimlar
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Mashhur Agro Kategoriyalar
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Oʻzingizga kerakli yoʻnalishni tanlang va barcha takliflarni koʻring
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('bozor')}
            className="inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm hover:underline"
          >
            <span>Barcha toifalarni koʻrish</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Categories Grid (7 Key Sections) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {AGRO_DATA.marketplaceSections.map((sec, idx) => (
            <div
              key={sec.id}
              onClick={() => handleCategoryClick(sec.id)}
              className={`group relative rounded-3xl overflow-hidden p-6 cursor-pointer border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between ${
                idx === 0 ? 'sm:col-span-2 lg:col-span-2 aspect-[16/9]' : 'aspect-square sm:aspect-auto'
              }`}
            >
              {/* Background preview image on hover */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundImage: `url(${sec.img})` }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 text-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    {sec.emoji}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold">
                    {sec.count} eʼlon
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {sec.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {sec.desc}
                </p>
              </div>

              <div className="relative z-10 pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400">
                <span>Katalogga oʻtish</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 3. ENG YANGI VA SARA MAHSULOTLAR VITRINASI ────────────── */}
      <section className="py-16 bg-slate-100/70 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                Sara Takliflar
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Eng Yangi va Ommabop Mahsulotlar
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Sifat kafolati va yuqori reytingga ega boʻlgan saralangan agro-mahsulotlar
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {[
                { id: 'all', label: 'Barchasi' },
                { id: 'hosil', label: 'Hosil' },
                { id: 'urug', label: 'Urugʻlar' },
                { id: 'ogit', label: 'Oʻgʻitlar' },
                { id: 'texnika', label: 'Texnika' },
                { id: 'xizmatlar', label: 'Xizmatlar' }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {displayProducts.map((p) => {
              const isFav = !!favorites[p.id];

              return (
                <div
                  key={p.id}
                  onClick={() => onOpenProductDetail && onOpenProductDetail(p)}
                  className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Image Box */}
                    <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img 
                        src={p.img} 
                        alt={p.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" 
                      />
                      
                      {/* Region pill */}
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold">
                        {p.region?.replace(' viloyati', '') || 'Oʻzbekiston'}
                      </div>

                      {/* Favorite button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onToggleFavorite) onToggleFavorite(e, p.id);
                        }}
                        className={`absolute top-2.5 right-2.5 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                          isFav
                            ? 'bg-rose-500 text-white shadow-md shadow-rose-500/40'
                            : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:bg-white hover:text-rose-500 backdrop-blur-md'
                        }`}
                        title="Sevimlilarga qoʻshish"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold truncate">
                          {p.farmer}
                        </span>
                        <span className="flex items-center gap-1 text-amber-500 font-extrabold text-[11px]">
                          ★ {p.rating}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {p.name}
                      </h3>

                      <div className="pt-1">
                        <div className="text-base sm:text-lg font-black text-slate-900 dark:text-emerald-300">
                          {fmt(p.price)} soʻm
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium">
                          1 {p.unit} uchun narx
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 pt-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(p);
                      }}
                      className="w-full py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-600 text-emerald-800 dark:text-emerald-300 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Savatga</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <button
              type="button"
              onClick={() => onNavigate('bozor')}
              className="px-8 py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-900/20 inline-flex items-center gap-2 transition-all hover:scale-105"
            >
              <span>Barcha 1,200+ Mahsulotlarni Koʻrish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* ─── 4. AFZALLIKLAR VA ISHONCH ─────────────────────────────── */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Nega Aynan Agro Tarmoq?
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Fermerlar va Xaridorlar Uchun Kafolatlar
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Har bir bitimda halollik, shaffoflik va zamonaviy texnologiyalarga tayanamiz
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl">
              🤝
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Toʻgʻridan-toʻgʻri Savdo
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Vositachilar ustamasisiz bevosita dehqon va fermerdan xarid qiling. Har ikki tomon uchun eng maqbul narxlar.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-xl">
              🔬
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Sertifikatlangan Sifat
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Urugʻ, koʻchat va oʻgʻitlar akkreditatsiyadan oʻtgan laboratoriyalarda tahlil qilingan va davlat standartlariga mos.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xl">
              🛡️
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Xavfsiz Bitim Kafolati
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Shartnomalar, elektron toʻlovlar va yetkazib berish nazorati. Mablagʻingiz mahsulot tekshirilguncha xavfsiz saqlanadi.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xl">
              🚚
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Tezkor Agro-Logistika
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Muzlatgichli furgonlar (refrijerator) va CA sovutgich omborlari orqali hosil sifatini yoʻqotmasdan yetkaziladi.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 5. HAMKORLAR VA SERTIFIKATLAR ───────────────────────────── */}
      <section className="py-12 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Davlat tashkilotlari va xalqaro sifat standartlari
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-700 dark:text-slate-300">
              <Building2 className="w-5 h-5 text-emerald-600" />
              <span>Oʻzbekiston Fermerlar Kengashi</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-sm text-slate-700 dark:text-slate-300">
              <Award className="w-5 h-5 text-emerald-600" />
              <span>GlobalG.A.P. Standarti</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-sm text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>ISO 22000 Oziq-ovqat Xavfsizligi</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-sm text-slate-700 dark:text-slate-300">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span>Organic Standard</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. CALL TO ACTION FOR FARMERS ─────────────────────────── */}
      <section className="py-16 bg-gradient-to-r from-emerald-900 to-teal-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Siz Ham Mahsulot Yoki Xizmatlaringizni Sotmoqchimisiz?
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto">
            Agro Tarmoq orqali oʻz hosilingiz, urugʻingiz yoki ijaradagi texnikangizni joylashtiring. Butun Oʻzbekiston boʻylab minglab xaridorlar sizni topadi.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={onOpenAddModal}
              className="px-6 py-3.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-extrabold text-sm shadow-xl flex items-center gap-2 transition-transform hover:scale-105"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Bepul Eʼlon Berish</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('farmer-dashboard')}
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm backdrop-blur-md transition-colors"
            >
              Fermer Kabinetiga Oʻtish
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
