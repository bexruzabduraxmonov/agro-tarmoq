import React, { useState } from 'react';
import { 
  Newspaper, 
  Calendar, 
  Clock, 
  ArrowRight, 
  X,
  Share2
} from 'lucide-react';
import { mockNews } from '../data/mockData';

export default function NewsSection() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <section id="news" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Newspaper className="w-3.5 h-3.5 text-emerald-600" />
              Agro Yangiliklar & Maqolalar
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Soha Yangiliklari va Foydali Maslahatlar
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Agrotexnologiyalar, davlat subsidiyalari va xalqaro bozor tahlillari haqida so'nggi ma'lumotlar.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-emerald-700 font-bold hover:text-emerald-800 text-sm"
          >
            <span>Barcha yangiliklar</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* News Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {mockNews.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                    {article.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3 group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-2">
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="pt-4 flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-bold text-xs uppercase tracking-wider group-hover:gap-3 transition-all"
                >
                  <span>To'liq o'qish</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
            <div className="relative aspect-video">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3 text-xs text-emerald-700 font-bold uppercase tracking-wider">
                <span>{selectedArticle.category}</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 leading-tight">
                {selectedArticle.title}
              </h3>

              <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 border-t border-slate-100 pt-4">
                <p className="font-semibold text-slate-900">{selectedArticle.excerpt}</p>
                <p>{selectedArticle.fullContent}</p>
                <p>
                  Agrosanoat sohasidagi yangi loyihalar va agromaslahatlar haqida batafsil ma'lumot olish uchun bizning mutaxassislarimiz bilan bog'lanishingiz mumkin.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">Agro Tarmoq Axborot Xizmati</span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl"
                >
                  Yopish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
