import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Sprout, 
  Tractor, 
  TrendingUp, 
  Users, 
  MapPin, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function Hero({ onOpenQuickCall }) {
  const stats = [
    { value: "15,000+", label: "Gektar sug'oriladigan maydon", icon: MapPin },
    { value: "1,450+", label: "Hamkor fermer xo'jaliklari", icon: Users },
    { value: "85,000 t", label: "Yillik sifatli hosil aylanmasi", icon: TrendingUp },
    { value: "18 ta", label: "Eksport yo'lga qo'yilgan davlatlar", icon: Tractor }
  ];

  return (
    <section id="home" className="relative overflow-hidden bg-slate-900 text-white">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35 transform scale-105 transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1920&q=80')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/80 via-slate-950/60 to-transparent" />

      {/* Decorative glow circles */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-green-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Content */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-semibold backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Innovatsion Agrosanoat va Qishloq Xo'jaligi Ekotizimi</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              O'zbekiston Qishloq Xo'jaligi va{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-lime-300 bg-clip-text text-transparent">
                Agro-Sanoat Yagona Tarmog'i
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
              Fermerlar, qishloq xo'jaligi korxonalari va xaridorlarni birlashtiruvchi zamonaviy platforma. 
              Sifatli urug'lar, tomchilatib sug'orish tizimlari, agrodronlar va xalqaro eksport yechimlari.
            </p>

            {/* Feature Bullets */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Davlat subsidiyasi va imtiyozli lizing ko'magi</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Gollandiya & Turkiya sifatli urug' va o'g'itlari</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Suvni 50% gacha tejovchi aqlli sug'orish</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Kafolatlangan eksport va agrologistika</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#products"
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Mahsulotlar Katalogi</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#calculator"
                className="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold px-6 py-3.5 rounded-xl border border-slate-700 backdrop-blur-sm transition-all"
              >
                <span>Hosil & Xarajat Kalkulyatori</span>
              </a>

              <button
                onClick={onOpenQuickCall}
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold px-4 py-2 transition-colors"
              >
                <span>Mutaxassis maslahati</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Side Feature Highlight Card */}
          <div className="lg:col-span-4">
            <div className="bg-slate-800/70 border border-emerald-500/30 rounded-2xl p-6 sm:p-7 backdrop-blur-md shadow-2xl relative">
              <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow">
                2026 Yangi Dastur
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Sprout className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-base">Agro-Tarmoq Kafolati</h2>
                  <p className="text-xs text-slate-400">100% Sertifikatlangan xizmatlar</p>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Biz bilan hamkorlik qilayotgan fermer xo'jaliklariga har bir mavsum boshida individual agronomik reja, urug' unuvchanligi kafolati va tayyor hosilni sotib olish bo'yicha forvard shartnomalari taqdim etiladi.
              </p>

              <div className="space-y-3 border-t border-slate-700/60 pt-4">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Hosil unumdorligi o'sishi</span>
                  <span className="text-emerald-400 font-bold">+35% gacha</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-400 to-green-400 h-2 rounded-full w-[85%]" />
                </div>

                <div className="flex justify-between text-xs text-slate-300 pt-1">
                  <span>Suv va o'g'it tejalishi</span>
                  <span className="text-emerald-400 font-bold">-45% gacha</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-lime-400 to-emerald-400 h-2 rounded-full w-[75%]" />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs text-slate-300 font-medium">GlobalG.A.P Standartlari</span>
                </div>
                <a href="#about" className="text-xs font-bold text-emerald-400 hover:text-emerald-300">
                  Batafsil →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx} 
                className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-5 hover:border-emerald-500/40 transition-all hover:bg-slate-800/80 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-white group-hover:text-emerald-300 transition-colors">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-400 mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
