import React from 'react';
import { X, Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { fmt } from '../utils/helpers';

export default function FavoritesModal({ 
  isOpen, 
  onClose, 
  favorites, 
  products, 
  onToggleFavorite, 
  onAddToCart,
  onOpenProductDetail,
  onNavigate 
}) {
  if (!isOpen) return null;

  // Filter products that are marked as favorite
  const favoriteProducts = products.filter(p => favorites[p.id]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center font-bold">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Sevimlilar (Tanlanganlar)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {favoriteProducts.length} ta mahsulot saqlangan
              </p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List Body */}
        <div className="flex-1 overflow-y-auto p-6 divide-y divide-slate-100 dark:divide-slate-800">
          {favoriteProducts.length === 0 ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-400 mx-auto flex items-center justify-center text-2xl">
                🤍
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">
                  Sevimlilar roʻyxati hozircha boʻsh
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Bozordagi oʻzingizga yoqqan urugʻ, texnika yoki hosil ustidagi yurakcha belgisini bosing va shu yerda saqlang.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigate('bozor');
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-md shadow-emerald-700/20"
              >
                <span>Bozorga oʻtish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-3 pt-1">
              {favoriteProducts.map((p) => (
                <div 
                  key={p.id}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
                >
                  <img 
                    src={p.img} 
                    alt={p.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 cursor-pointer border border-slate-100 dark:border-slate-800"
                    onClick={() => {
                      onClose();
                      onOpenProductDetail(p);
                    }}
                  />
                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => { onClose(); onOpenProductDetail(p); }}>
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mb-0.5">
                      {p.farmer} • {p.region}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {p.name}
                    </h4>
                    <div className="text-sm font-extrabold text-slate-900 dark:text-emerald-300 mt-1">
                      {fmt(p.price)} soʻm <span className="text-xs font-normal text-slate-500">/ {p.unit}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(p);
                      }}
                      className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                      title="Savatga qoʻshish"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(e, p.id);
                      }}
                      className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                      title="Oʻchirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {favoriteProducts.length > 0 && (
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
            <span>Tanlanganlarni toʻgʻridan-toʻgʻri savatga joylashingiz mumkin</span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white font-bold hover:bg-slate-300 transition-colors"
            >
              Yopish
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
