import React from 'react';
import { 
  Scan, 
  Warehouse, 
  Droplets, 
  FlaskConical, 
  Truck, 
  Globe, 
  ArrowRight, 
  Check, 
  Wrench
} from 'lucide-react';
import { mockServices } from '../data/mockData';

export default function Services({ onSelectService }) {
  const iconMap = {
    Scan: Scan,
    Warehouse: Warehouse,
    Droplets: Droplets,
    FlaskConical: FlaskConical,
    Truck: Truck,
    Globe: Globe
  };

  return (
    <section id="services" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Wrench className="w-3.5 h-3.5 text-emerald-600" />
            Bizning Xizmatlar
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Professional Agrosanoat Xizmatlari Majmui
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Ekin ekishdan to tayyor hosilni eksport qilishgacha bo'lgan barcha bosqichlarda yuqori malakali servis va texnik yordam.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockServices.map((srv) => {
            const IconComponent = iconMap[srv.icon] || Scan;
            return (
              <div 
                key={srv.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-7 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {srv.desc}
                  </p>

                  <div className="space-y-2.5 border-t border-slate-100 pt-5 mb-6">
                    {srv.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onSelectService(srv.title)}
                  className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-emerald-600 text-slate-800 hover:text-white font-semibold py-2.5 px-4 rounded-xl border border-slate-200 hover:border-emerald-600 transition-all text-sm group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600"
                >
                  <span>Xizmatga buyurtma berish</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-gradient-to-r from-emerald-900 to-green-950 rounded-2xl p-8 sm:p-10 text-white flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center lg:text-left">
            <h3 className="text-2xl font-bold">Maxsus korporativ yoki yirik agroloyihangiz bormi?</h3>
            <p className="text-slate-300 text-sm max-w-2xl">
              100 gektardan ortiq ekin maydonlari va yirik klasterlar uchun maxsus chegirmalar, shaxsiy agronom va individual to'lov jadvallari mavjud.
            </p>
          </div>
          <button
            onClick={() => onSelectService("Yirik korporativ loyiha")}
            className="bg-white hover:bg-slate-100 text-emerald-900 font-bold px-6 py-3 rounded-xl shadow-lg shrink-0 transition-transform transform hover:scale-105 active:scale-95"
          >
            Tijoriy Taklif Olish
          </button>
        </div>

      </div>
    </section>
  );
}
