import React from 'react';
import { 
  Quote, 
  Star, 
  MapPin, 
  MessageSquareHeart, 
  Building2 
} from 'lucide-react';
import { mockTestimonials } from '../data/mockData';

export default function Testimonials() {
  const partners = [
    "O'zbekiston Qishloq Xo'jaligi Vazirligi",
    "Agrobank ATB",
    "GlobalG.A.P Audit",
    "Toshkent Davlat Agrar Universiteti",
    "Uzagroeksport"
  ];

  return (
    <section id="testimonials" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquareHeart className="w-3.5 h-3.5 text-emerald-600" />
            Mijozlarimiz Ishonchi
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hamkor Fermerlar va Agrofirmalar Fikrlari
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Respublikamizning turli viloyatlarida biz bilan birga hosildorlikni oshirayotgan dehqonlarimiz tajribasi.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {mockTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-emerald-200" />
                </div>

                <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
                  "{item.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 border-t border-slate-100 pt-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/30"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                  <p className="text-xs text-emerald-700 font-semibold">{item.role}</p>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trusted Partners Logos / Badges */}
        <div className="mt-20 pt-10 border-t border-slate-200/80">
          <div className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-8">
            Rasmiy va Strategik Hamkorlarimiz
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
            {partners.map((partner, idx) => (
              <div 
                key={idx}
                className="bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-2xs text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-2 hover:border-emerald-400 transition-colors"
              >
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>{partner}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
