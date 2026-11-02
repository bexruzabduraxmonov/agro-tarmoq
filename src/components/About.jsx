import React, { useState } from 'react';
import { 
  Award, 
  Target, 
  CheckCircle2, 
  Globe2, 
  Leaf, 
  ArrowRight,
  Shield,
  Building
} from 'lucide-react';

export default function About() {
  const [activeTab, setActiveTab] = useState('mission');

  const tabContents = {
    mission: {
      title: "O'zbekistonda barqaror va raqobatbardosh agrosanoatni shakllantirish",
      desc: "Bizning bosh maqsadimiz — an'anaviy qishloq xo'jaligini innovatsion ilmiy texnologiyalar bilan boyitish. Fermerlarimizga xarajatlarni qisqartirib, hosil sifatini xalqaro standartlarga olib chiqishda tizimli ko'mak berish.",
      points: [
        "Suv tanqisligiga qarshi 100% tejamkor texnologiyalar joriy qilish",
        "Eksportbop organik meva-sabzavot yetishtirish salohiyatini oshirish",
        "Fermerlar uchun yagona ochiq agro-bozor va logistika infratuzilmasi",
        "Xalqaro agronomik tajribani mahalliy sharoitga muvaffaqiyatli tatbiq etish"
      ]
    },
    values: {
      title: "Halollik, Ilmiy Yondashuv va Fermer Bilan Birga O'sish",
      desc: "Biz har bir kelishuvda ochiqlik va ishonch tarafdorimiz. Faqatgina laboratoriya sinovlaridan o'tgan va sertifikatlangan urug', o'g'it va agrotexnikalarni yetkazib beramiz.",
      points: [
        "Sifat kafolati va mahsulotlarning toza kelib chiqishi",
        "Har bir mijozga shaxsiy agronomik yondashuv",
        "Ekologik toza va tuproqni asrovchi organik yechimlar",
        "Uzoq muddatli va o'zaro manfaatli hamkorlik"
      ]
    },
    global: {
      title: "Xalqaro Bozorlar va Yetakchi Jahon Brendlari Bilan Aloqa",
      desc: "Agro Tarmoq Gollandiya, Germaniya, Isroil, Turkiya va Ispaniyaning ilg'or agrotexnologiya ishlab chiqaruvchilari bilan to'g'ridan-to'g'ri shartnomalarga ega.",
      points: [
        "Gollandiya seleksiyasidagi elita gibrid urug'lar",
        "Isroilning yuqori bosimli tomchilatib sug'orish uskunalarini yetkazish",
        "GlobalG.A.P xalqaro sertifikatlash auditiga tayyorgarlik",
        "MDH va Yevropa Ittifoqiga meva-sabzavot eksporti bo'yicha to'g'ridan-to'g'ri shartnomalar"
      ]
    }
  };

  return (
    <section id="about" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Images collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1592417817098-8f3d69103a46?auto=format&fit=crop&w=800&q=80" 
                  alt="Agro Tarmoq dalalari" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 sm:bottom-6 sm:-left-6 bg-white rounded-2xl p-4 sm:p-5 shadow-2xl border border-emerald-100 max-w-[240px] sm:max-w-[260px]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/30">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xl font-extrabold text-slate-900">10+ Yil</div>
                    <div className="text-xs text-slate-600 font-medium leading-snug">
                      Agrosanoat sohasida uzluksiz tajriba
                    </div>
                  </div>
                </div>
              </div>

              {/* Second floating badge */}
              <div className="hidden sm:flex absolute -top-5 -right-5 bg-emerald-900 text-white rounded-xl px-4 py-2.5 shadow-lg items-center gap-2 text-xs font-bold">
                <Leaf className="w-4 h-4 text-emerald-400" />
                <span>100% Ekologik Standart</span>
              </div>
            </div>
          </div>

          {/* Text and Tabs */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
                <Building className="w-3.5 h-3.5 text-emerald-600" />
                Biz Haqimizda
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                O'zbekiston Agrosanoatining Ishonchli Hamkori
              </h2>
              <p className="mt-3 text-slate-600 text-base leading-relaxed">
                "Agro Tarmoq" — respublikamiz qishloq xo'jaligi sohasidagi ilg'or yechimlar va xizmatlarni bitta qulay platformaga jamlagan milliy agro-portal hisoblanadi.
              </p>
            </div>

            {/* Tabs Buttons */}
            <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
              <button
                onClick={() => setActiveTab('mission')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'mission'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-white text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                <Target className="w-4 h-4" />
                <span>Missiyamiz</span>
              </button>

              <button
                onClick={() => setActiveTab('values')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'values'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-white text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>Qadriyatlarimiz</span>
              </button>

              <button
                onClick={() => setActiveTab('global')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'global'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-white text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                <Globe2 className="w-4 h-4" />
                <span>Xalqaro Hamkorlik</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900">
                {tabContents[activeTab].title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {tabContents[activeTab].desc}
              </p>
              <div className="space-y-2.5 pt-2">
                {tabContents[activeTab].points.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificates Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-semibold">
              <span className="text-slate-400">Sertifikatlar:</span>
              <span className="px-2.5 py-1 bg-white rounded-md border border-slate-200 shadow-xs">GlobalG.A.P Certified</span>
              <span className="px-2.5 py-1 bg-white rounded-md border border-slate-200 shadow-xs">ISO 22000 : 2018</span>
              <span className="px-2.5 py-1 bg-white rounded-md border border-slate-200 shadow-xs">Organic Standard</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
