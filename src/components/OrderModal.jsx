import React, { useState } from 'react';
import { X, CheckCircle2, ShoppingBag, Truck } from 'lucide-react';

export default function OrderModal({ isOpen, onClose, product, cartItems, onOrderSuccess }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    comment: ''
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      if (onOrderSuccess) onOrderSuccess();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              Buyurtmangiz Qabul Qilindi!
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Operatorimiz 15 daqiqa ichida siz bilan bog'lanib, yetkazib berish va to'lov tafsilotlarini kelishib oladi.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors text-sm"
              >
                Rahmat, tushunarli
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2.5 text-emerald-700 font-bold text-xs uppercase tracking-wider">
              <ShoppingBag className="w-4 h-4" />
              <span>Buyurtmani rasmiylashtirish</span>
            </div>

            <h3 className="text-xl font-black text-slate-900">
              {product ? product.name : "Savatdagi mahsulotlar"}
            </h3>

            {product && (
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between text-xs">
                <span className="text-slate-700 font-medium">Narxi:</span>
                <span className="font-extrabold text-emerald-800 text-sm">{product.price} so'm / {product.unit}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Ism va Familiyangiz *
              </label>
              <input
                type="text"
                required
                placeholder="Masalan: Jamshid Karimov"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Telefon raqamingiz *
              </label>
              <input
                type="tel"
                required
                placeholder="+998 90 123-45-67"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Yetkazib berish manzili / Tuman *
              </label>
              <input
                type="text"
                required
                placeholder="Viloyat, tuman, mahalla yoki ferma manzili"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Qo'shimcha izoh
              </label>
              <textarea
                rows="2"
                placeholder="Buyurtma miqdori yoki boshqa talablar..."
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2 text-sm focus:bg-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 py-1">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Respublika bo'ylab tezkor yetkazib berish xizmati mavjud.</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-emerald-600/30 text-sm"
            >
              {loading ? "Yuborilmoqda..." : "Buyurtmani Tasdiqlash"}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
