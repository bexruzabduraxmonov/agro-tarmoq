import React, { useState } from 'react';
import { 
  Calculator, 
  Droplets, 
  TrendingUp, 
  Sprout, 
  FileSpreadsheet, 
  Sparkles,
  Info
} from 'lucide-react';

export default function AgroCalculator({ onOpenQuickCall }) {
  const [crop, setCrop] = useState('pomidor');
  const [area, setArea] = useState(2); // hectares
  const [irrigation, setIrrigation] = useState('drip'); // drip or flood

  const cropData = {
    pomidor: {
      name: "Pomidor (Issiqxona / Intensiv)",
      baseYield: 85, // tons per ha
      waterPerHa: 4500, // m3 per ha
      pricePerKg: 12000, // uzs
      fertilizerPerHa: 450 // kg
    },
    olma: {
      name: "Intensiv Olma Bog'i",
      baseYield: 45,
      waterPerHa: 5200,
      pricePerKg: 11000,
      fertilizerPerHa: 380
    },
    bugdoy: {
      name: "Kuzgi Bug'doy (G'alla)",
      baseYield: 6.5,
      waterPerHa: 3800,
      pricePerKg: 3200,
      fertilizerPerHa: 280
    },
    paxta: {
      name: "Paxta (G'o'za)",
      baseYield: 4.2,
      waterPerHa: 6000,
      pricePerKg: 7800,
      fertilizerPerHa: 320
    },
    kartoshka: {
      name: "Kartoshka (Elita)",
      baseYield: 35,
      waterPerHa: 4000,
      pricePerKg: 4500,
      fertilizerPerHa: 400
    }
  };

  const currentCrop = cropData[crop];
  
  // Drip irrigation gives +30% yield boost and saves 45% water
  const yieldMultiplier = irrigation === 'drip' ? 1.3 : 1.0;
  const waterMultiplier = irrigation === 'drip' ? 0.55 : 1.0;

  const totalYield = Math.round(currentCrop.baseYield * area * yieldMultiplier);
  const totalWaterSaved = irrigation === 'drip' 
    ? Math.round(currentCrop.waterPerHa * area * 0.45) 
    : 0;
  const estimatedRevenueMln = Math.round((totalYield * 1000 * currentCrop.pricePerKg) / 1000000);
  const totalFertilizerKg = Math.round(currentCrop.fertilizerPerHa * area);

  return (
    <section id="calculator" className="py-20 bg-emerald-950 text-white relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-700 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 text-emerald-400" />
            Interaktiv Fermerlik Vositalari
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Agro-Iqtisodiy Hisob-Kitob Kalkulyatori
          </h2>
          <p className="mt-3 text-slate-300 text-base">
            Ekin maydoni va sug'orish usulini kiriting — tizimimiz kutilayotgan hosil, suv tejalishi va taxminiy daromadni onlayn hisoblab beradi.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Inputs Controls */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Crop select */}
              <div>
                <label className="block text-sm font-bold text-slate-200 mb-2">
                  1. Ekin yoki bog' turini tanlang:
                </label>
                <select
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value="pomidor">🍅 Pomidor (Issiqxona / Intensiv)</option>
                  <option value="olma">🍏 Intensiv Olma Bog'i</option>
                  <option value="bugdoy">🌾 Kuzgi Bug'doy (G'alla)</option>
                  <option value="paxta">🌱 Paxta (G'o'za)</option>
                  <option value="kartoshka">🥔 Kartoshka (Elita nav)</option>
                </select>
              </div>

              {/* Area Slider & Number */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-slate-200">
                    2. Ekin maydoni o'lchami:
                  </label>
                  <span className="text-emerald-400 font-extrabold text-base bg-emerald-950/80 px-3 py-0.5 rounded-lg border border-emerald-800">
                    {area} Gektar
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>1 ga</span>
                  <span>10 ga</span>
                  <span>25 ga</span>
                  <span>50 ga</span>
                </div>
              </div>

              {/* Irrigation radio cards */}
              <div>
                <label className="block text-sm font-bold text-slate-200 mb-2">
                  3. Qo'llaniladigan sug'orish texnologiyasi:
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setIrrigation('drip')}
                    className={`cursor-pointer p-4 rounded-xl border transition-all ${
                      irrigation === 'drip'
                        ? 'bg-emerald-900/60 border-emerald-400 text-white shadow-lg shadow-emerald-900/40'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Droplets className="w-4 h-4 text-emerald-400" />
                      <span className="font-bold text-sm">Tomchilatib sug'orish</span>
                    </div>
                    <p className="text-xs text-slate-400">+30% hosildorlik, 45% suv tejamkorligi</p>
                  </div>

                  <div
                    onClick={() => setIrrigation('flood')}
                    className={`cursor-pointer p-4 rounded-xl border transition-all ${
                      irrigation === 'flood'
                        ? 'bg-emerald-900/60 border-emerald-400 text-white shadow-lg shadow-emerald-900/40'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-4 h-4 rounded-full border border-slate-500 flex items-center justify-center text-[10px]">~</span>
                      <span className="font-bold text-sm">An'anaviy ochiq ariq</span>
                    </div>
                    <p className="text-xs text-slate-400">Oddiy sug'orish usuli</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-emerald-300/80 bg-emerald-950/60 p-3 rounded-xl border border-emerald-900/60">
                <Info className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Hisob-kitoblar O'zbekiston Qishloq xo'jaligi vazirligi va xalqaro tajriba me'yorlariga asoslangan.</span>
              </div>

            </div>

            {/* Right Results Display */}
            <div className="lg:col-span-6 bg-slate-950/80 border border-emerald-500/40 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Hisoblangan Natija</span>
                  <h3 className="text-xl font-bold text-white mt-0.5">{currentCrop.name}</h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                
                <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800">
                  <div className="text-xs text-slate-400 mb-1">Kutilayotgan umumiy hosil</div>
                  <div className="text-2xl font-black text-white">
                    {totalYield} <span className="text-sm font-semibold text-emerald-400">tonna</span>
                  </div>
                  <div className="text-[11px] text-emerald-500 mt-1">
                    {irrigation === 'drip' ? "★ Yuqori hosildorlik" : "Standart ko'rsatkich"}
                  </div>
                </div>

                <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800">
                  <div className="text-xs text-slate-400 mb-1">Tejaladigan suv miqdori</div>
                  <div className="text-2xl font-black text-white">
                    {totalWaterSaved} <span className="text-sm font-semibold text-blue-400">m³</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {irrigation === 'drip' ? "Har mavsum tejaladi" : "Tejamkorlik yo'q"}
                  </div>
                </div>

                <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800">
                  <div className="text-xs text-slate-400 mb-1">Tavsiya etilgan o'g'it</div>
                  <div className="text-2xl font-black text-white">
                    {totalFertilizerKg} <span className="text-sm font-semibold text-amber-400">kg</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">NPK va mikroelementlar</div>
                </div>

                <div className="bg-slate-900/90 rounded-xl p-4 border border-emerald-500/40 bg-gradient-to-br from-slate-900 to-emerald-950">
                  <div className="text-xs text-slate-300 mb-1">Taxminiy yalpi daromad</div>
                  <div className="text-2xl font-black text-emerald-300">
                    ~{estimatedRevenueMln} <span className="text-xs font-bold text-white">mln so'm</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1">Bozor o'rtacha narxlarida</div>
                </div>

              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenQuickCall()}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-600/30 transition-all text-sm"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>To'liq Texnik-Iqtisodiy Smetani Olish</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
