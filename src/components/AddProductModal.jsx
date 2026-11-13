import React, { useState } from 'react';
import { X, Plus, Sparkles, Image, Check, AlertCircle } from 'lucide-react';
import { AGRO_DATA } from '../data/agroData';

const DEFAULT_IMAGES = {
  texnika: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80',
  urug: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80',
  ogit: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=600&q=80',
  hosil: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80',
  xizmatlar: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80',
  agronom: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80',
  elonlar: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=600&q=80'
};

const CATEGORY_OPTIONS = [
  { id: 'texnika', label: '🚜 Agro texnikalar' },
  { id: 'urug', label: '🌱 Urugʻ va koʻchatlar' },
  { id: 'ogit', label: '🧪 Mineral oʻgʻitlar' },
  { id: 'hosil', label: '🍎 Qishloq xoʻjaligi mahsulotlari' },
  { id: 'xizmatlar', label: '🛠️ Fermerlar uchun xizmatlar' },
  { id: 'agronom', label: '🌿 Agronom maslahatlari' },
  { id: 'elonlar', label: '📢 Eʼlonlar va savdo' }
];

export default function AddProductModal({ isOpen, onClose, onAddProduct, onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    cat: 'hosil',
    price: '',
    unit: 'kg',
    region: 'Toshkent viloyati',
    farmer: '',
    desc: '',
    img: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Mahsulot nomini kiriting';
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = 'Toʻgʻri narx kiriting';
    if (!formData.farmer.trim()) newErrors.farmer = 'Fermer yoki xoʻjalik nomini kiriting';
    if (!formData.desc.trim()) newErrors.desc = 'Qisqacha tavsif yozing';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const chosenImg = formData.img.trim() || DEFAULT_IMAGES[formData.cat] || DEFAULT_IMAGES.hosil;

    const newProduct = {
      id: 'custom_' + Date.now(),
      name: formData.name.trim(),
      cat: formData.cat,
      emoji: formData.cat === 'texnika' ? '🚜' : formData.cat === 'urug' ? '🌱' : formData.cat === 'ogit' ? '🧪' : formData.cat === 'xizmatlar' ? '🛠️' : formData.cat === 'agronom' ? '🌿' : '🍎',
      price: Number(formData.price),
      unit: formData.unit,
      farmer: formData.farmer.trim(),
      region: formData.region,
      trend: 1,
      rating: 5.0,
      reviewsCount: 1,
      desc: formData.desc.trim(),
      specs: [
        `Kategoriya: ${CATEGORY_OPTIONS.find(c => c.id === formData.cat)?.label || 'Agro'}`,
        `Hudud: ${formData.region}`,
        `Holati: Yangi eʼlon`,
        `Yetkazib berish: Kelishuv asosida`
      ],
      img: chosenImg,
      isUserListing: true,
      createdAt: new Date().toISOString()
    };

    setTimeout(() => {
      onAddProduct(newProduct);
      setLoading(false);
      onShowToast("Eʼlon muvaffaqiyatli joylashtirildi! 🎉");
      onClose();
      // Reset form
      setFormData({
        name: '',
        cat: 'hosil',
        price: '',
        unit: 'kg',
        region: 'Toshkent viloyati',
        farmer: '',
        desc: '',
        img: ''
      });
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800"
        style={{ scrollbarWidth: 'thin' }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Yangi Eʼlon / Mahsulot Joylashtirish
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Agro Tarmoq bozoriga toʻgʻridan-toʻgʻri mahsulotingizni chiqaring
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Category Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
              Asosiy Boʻlim / Kategoriya *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CATEGORY_OPTIONS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, cat: c.id }))}
                  className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all border ${
                    formData.cat === c.id
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Name & Farmer */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Mahsulot yoki Xizmat Nomi *
              </label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Masalan: Elita bugʻdoy urugʻi F1" 
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-slate-800 dark:text-white ${
                  errors.name ? 'border-rose-400' : 'border-slate-200 dark:border-slate-700'
                }`}
              />
              {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Fermer / Xoʻjalik / Sotuvchi Nomi *
              </label>
              <input 
                type="text" 
                name="farmer" 
                value={formData.farmer} 
                onChange={handleChange} 
                placeholder="Masalan: Yangi Hayot Agro MCHJ" 
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-slate-800 dark:text-white ${
                  errors.farmer ? 'border-rose-400' : 'border-slate-200 dark:border-slate-700'
                }`}
              />
              {errors.farmer && <p className="text-xs text-rose-500 mt-1">{errors.farmer}</p>}
            </div>
          </div>

          {/* Price, Unit, Region */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Narxi (soʻmda) *
              </label>
              <input 
                type="number" 
                name="price" 
                value={formData.price} 
                onChange={handleChange} 
                placeholder="15000" 
                min="100"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-slate-800 dark:text-white ${
                  errors.price ? 'border-rose-400' : 'border-slate-200 dark:border-slate-700'
                }`}
              />
              {errors.price && <p className="text-xs text-rose-500 mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Oʻlchov Birligi *
              </label>
              <select 
                name="unit" 
                value={formData.unit} 
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="kg">kg</option>
                <option value="tonna">tonna</option>
                <option value="dona">dona</option>
                <option value="litr">litr</option>
                <option value="qop (50 kg)">qop (50 kg)</option>
                <option value="paket (1 kg)">paket (1 kg)</option>
                <option value="ga">ga (gektar)</option>
                <option value="kun">kunlik ijara</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Viloyat / Hudud *
              </label>
              <select 
                name="region" 
                value={formData.region} 
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {AGRO_DATA.regionsList.filter(r => r !== 'Barcha viloyatlar').map(reg => (
                  <option key={reg} value={reg}>{reg}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Mahsulot Haqida Batafsil Tavsif *
            </label>
            <textarea 
              name="desc" 
              rows="3" 
              value={formData.desc} 
              onChange={handleChange} 
              placeholder="Mahsulot navi, yetishtirilgan sharoit, kafolat va yetkazib berish haqida yozing..." 
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-slate-800 dark:text-white ${
                errors.desc ? 'border-rose-400' : 'border-slate-200 dark:border-slate-700'
              }`}
            />
            {errors.desc && <p className="text-xs text-rose-500 mt-1">{errors.desc}</p>}
          </div>

          {/* Image URL (Optional) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Rasm havolasi (URL - Ixtiyoriy, boʻsh qolsa standart rasm qoʻyiladi)
            </label>
            <div className="flex gap-2 items-center">
              <input 
                type="url" 
                name="img" 
                value={formData.img} 
                onChange={handleChange} 
                placeholder="https://images.unsplash.com/..." 
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-slate-800 dark:text-white"
              />
              {formData.img && (
                <img 
                  src={formData.img} 
                  alt="Preview" 
                  className="w-10 h-10 rounded-lg object-cover border border-slate-200 dark:border-slate-700"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              )}
            </div>
          </div>

          {/* Submit buttons */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-800 hover:to-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-700/20 flex items-center gap-2 transition-all"
            >
              {loading ? (
                <span>Yuklanmoqda...</span>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Eʼlonni Joylashtirish</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
