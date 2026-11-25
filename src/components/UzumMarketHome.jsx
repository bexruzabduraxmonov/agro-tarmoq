import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Heart, 
  ChevronRight, 
  ChevronLeft, 
  ChevronDown,
  ShoppingBag, 
  Check, 
  Sparkles,
  Truck,
  Sprout,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Tractor,
  Calendar
} from 'lucide-react';
import { AGRO_DATA } from '../data/agroData';
import ProductDetailModal from './ProductDetailModal';
import { useLanguage } from '../context/LanguageContext';
import { fmt, getProductMarketPrice, getTodayFormatted } from '../utils/helpers';

// ─── Agro Hero Banner Slider ────────────────────────────────────────────────
function AgroHeroBanner({ onNavigate }) {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'bahor-ekini',
      badge: '🌱 Bahorgi Mavsum 2026',
      title: 'Hosil Barakasini Biz Bilan Boshlang!',
      desc: "Sertifikatlangan urug'lar, organik o'g'itlar va innovatsion tomchilatib sug'orish tizimlari — 40% gacha chegirma bilan",
      cta: "Urug'lar katalogi",
      page: 'dokon',
      gradient: 'linear-gradient(115deg, #064e3b 0%, #065f46 35%, #047857 70%, #0d9488 100%)',
      img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
      floatingBadge: '🌾 100% Saralangan navlar',
      stats: '5 000+ fermerlar tanlovi'
    },
    {
      id: 'ai-agronom',
      badge: '🤖 Sun\'iy Intellekt Texnologiyasi',
      title: 'Ekin Kasalliklarini AI Orqali Tashxis Qiling',
      desc: "Zararkunanda yoki kasallangan bargni rasmga oling — AI Agronom 3 soniyada to'g'ri dori va o'g'itni tavsiya qiladi",
      cta: 'AI Agronomni sinash',
      page: 'agronom',
      gradient: 'linear-gradient(115deg, #1e1b4b 0%, #312e81 35%, #4338ca 70%, #6366f1 100%)',
      img: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1200&q=80',
      floatingBadge: '⚡ 98.4% aniqlik darajasi',
      stats: '24/7 Bepul konsultatsiya'
    },
    {
      id: 'texnika-lizing',
      badge: '🚜 Agrotexnika va Dronlar',
      title: 'Traktor va Zamonaviy Agregatlar Ijarasi',
      desc: "Yer haydash, ekin purkash va o'rim-yig'im texnikalari: tajribali mexanizatorlar bilan dalangizga yetkazamiz",
      cta: 'Texnikalar ro\'yxati',
      page: 'texnika',
      gradient: 'linear-gradient(115deg, #78350f 0%, #92400e 35%, #b45309 70%, #d97706 100%)',
      img: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80',
      floatingBadge: '⏱ 1 kunda yetkazish',
      stats: '120+ faol traktor va dron'
    },
    {
      id: 'bozor-fresh',
      badge: '📦 Daladan To\'g\'ridan-to\'g\'ri',
      title: 'Yangi Uzilgan Tabiiy Hosil — 24 Soatda',
      desc: "O'rtakashlarsiz, to'g'ridan-to'g'ri dehqon va fermerlardan arzon narxda yangi meva-sabzavotlar",
      cta: 'Bozorni ko\'rish',
      page: 'bozor',
      gradient: 'linear-gradient(115deg, #14532d 0%, #166534 35%, #15803d 70%, #22c55e 100%)',
      img: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=1200&q=80',
      floatingBadge: '🚚 Bepul yetkazib berish',
      stats: '100% kafolatlangan yangilik'
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-xl select-none mb-6 group">
      <div 
        className="w-full min-h-[280px] sm:min-h-[340px] md:min-h-[390px] flex items-center transition-all duration-700 relative px-6 sm:px-12 py-8 overflow-hidden"
        style={{ background: slide.gradient }}
      >
        {/* Subtle background photo overlay */}
        <div 
          className="absolute inset-0 opacity-20 mix-blend-overlay bg-cover bg-center pointer-events-none transition-all duration-1000 scale-105"
          style={{ backgroundImage: `url(${slide.img})` }}
        />

        {/* Ambient glow circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-black/20 rounded-full blur-2xl pointer-events-none" />

        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 z-10">
          {/* Left Column: Info & CTA */}
          <div className="flex-1 text-white max-w-2xl text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-bold px-3.5 py-1 rounded-full mb-3 shadow-sm border border-white/30">
              <Sparkles size={14} className="text-yellow-300" />
              {slide.badge}
            </span>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-3 text-white drop-shadow-md">
              {slide.title}
            </h1>

            <p className="text-white/90 text-xs sm:text-sm md:text-base font-normal leading-relaxed mb-5 max-w-xl">
              {slide.desc}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                type="button"
                onClick={() => onNavigate(slide.page)}
                className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-gray-950 font-black text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{slide.cta}</span>
                <ChevronRight size={16} />
              </button>

              <span className="text-xs text-white/80 font-medium px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-xs border border-white/10 hidden sm:inline-block">
                ✓ {slide.stats}
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Graphic */}
          <div className="relative shrink-0 w-full md:w-[380px] h-[180px] sm:h-[220px] md:h-[260px] flex items-center justify-center">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
              <img 
                src={slide.img} 
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                <span className="bg-emerald-600/90 backdrop-blur-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  {slide.floatingBadge}
                </span>
                <span className="text-[11px] font-semibold text-white/90 bg-black/40 px-2.5 py-1 rounded-md">
                  Agro Tarmoq
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Prev/Next Buttons */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Oldingi slayd"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/35 hover:bg-black/65 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md z-20 cursor-pointer opacity-85 group-hover:opacity-100"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Keyingi slayd"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/35 hover:bg-black/65 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md z-20 cursor-pointer opacity-85 group-hover:opacity-100"
        >
          <ChevronRight size={22} />
        </button>

        {/* Carousel Pagination Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Slayd ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === currentSlide 
                  ? 'w-7 h-2 bg-amber-400' 
                  : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Agro Phone-App Style Icon Buttons Grid (1-2 Rows) ──────────────────────
function AgroQuickNavCards({ onNavigate }) {
  const apps = [
    { 
      id: 'bozor', 
      page: 'bozor', 
      e: '🛒', 
      t: 'Bozor', 
      img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a27458.jpg?format=avif' 
    },
    { 
      id: 'narxlar', 
      page: 'narxlar', 
      e: '📊', 
      t: 'Narxlar', 
      img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a2746d.jpg?format=avif' 
    },
    { 
      id: 'obhavo', 
      page: 'obhavo', 
      e: '📅', 
      t: 'Ob-havo', 
      img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a27477.jpg?format=avif' 
    },
    { 
      id: 'texnika', 
      page: 'texnika', 
      e: '🚜', 
      t: 'Texnika', 
      img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a274aa.jpg?format=avif' 
    },
    { 
      id: 'agronom', 
      page: 'agronom', 
      e: '🤖', 
      t: 'AI Agronom', 
      isAi: true,
      img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a274b2.jpg?format=avif' 
    },
    { 
      id: 'xojalik', 
      page: 'xojalik', 
      e: '💰', 
      t: 'Xoʻjaligim', 
      img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a274b8.jpg?format=avif' 
    },
    { 
      id: 'dokon', 
      page: 'dokon', 
      e: '🌱', 
      t: 'Doʻkon', 
      img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a274bf.jpg?format=avif' 
    },
    { 
      id: 'ishlar', 
      page: 'ishlar', 
      e: '🧑‍🌾', 
      t: 'Ishlar', 
      img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a274c6.jpg?format=avif' 
    },
    { 
      id: 'yangiliklar', 
      page: 'yangiliklar', 
      e: '📰', 
      t: 'Yangiliklar', 
      img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a274cc.jpg?format=avif' 
    },
    { 
      id: 'chorvachilik', 
      page: 'chorvachilik', 
      e: '🐄', 
      t: 'Chorvachilik', 
      img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a274d3.jpg?format=avif' 
    }
  ];

  return (
    <div className="w-full mb-6">
      <div className="bg-white rounded-2xl p-3 sm:p-4 md:p-5 border border-gray-100 shadow-xs">
        <div className="grid grid-cols-5 lg:grid-cols-10 gap-2.5 sm:gap-3.5 md:gap-4 justify-items-center">
          {apps.map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={() => onNavigate(app.page)}
              className="flex flex-col items-center justify-start group cursor-pointer text-center w-full max-w-[80px] sm:max-w-[88px] active:scale-90 transition-transform duration-150 focus:outline-none"
            >
              {/* App Icon (Squircle shape with depth, photo, and emoji) */}
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-15 md:h-15 rounded-2xl sm:rounded-[20px] overflow-hidden shadow-xs group-hover:shadow-md group-hover:scale-108 transition-all duration-200 border border-black/5 bg-gray-50 flex items-center justify-center">
                {/* Background photo */}
                <img 
                  src={app.img} 
                  alt={app.t}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-115 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                
                {/* Gradient tint */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/10 group-hover:from-emerald-950/70 transition-colors" />

                {/* Emoji Icon */}
                <span className="relative z-10 text-xl sm:text-2xl filter drop-shadow-md group-hover:scale-115 transition-transform duration-200">
                  {app.e}
                </span>

                {/* AI Badge for Agronom */}
                {app.isAi && (
                  <span className="absolute top-1 right-1 z-20 bg-emerald-500 text-white text-[8px] font-black px-1 py-0.2 rounded-md shadow-xs leading-none">
                    AI
                  </span>
                )}
              </div>

              {/* App Label under Icon */}
              <span className="text-[11px] sm:text-xs font-bold text-gray-800 group-hover:text-emerald-700 transition-colors text-center mt-1.5 leading-tight truncate w-full">
                {app.t}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Uzum-style Agro Product Card ───────────────────────────────────────────
function AgroProductCard({ product, onAddToCart, onShowToast, onProductClick }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [added, setAdded] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    if (onShowToast) {
      onShowToast(!isFavorite ? "Sevimlilarga saqlandi ❤️" : "Sevimlilardan o'chirildi");
    }
  };

  const handleBuy = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        unit: product.unit || 'dona',
        emoji: product.emoji || '🌱',
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative cursor-pointer"
      onClick={() => onProductClick && onProductClick(product)}
    >
      {/* Product Image Area */}
      <div className="relative w-full aspect-[4/4.5] overflow-hidden bg-[#f4f7f5] flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            const fallbacks = {
              mevalar: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=500&q=80',
              chorva: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=500&q=80',
              texnika: 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=500&q=80',
              uruglar: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=500&q=80',
              ogitlar: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=500&q=80',
              sugorish: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=500&q=80',
              asalarichilik: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=500&q=80',
            };
            e.target.src = fallbacks[product.category] || 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=500&q=80';
          }}
        />

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          aria-label="Sevimlilarga qo'shish"
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-gray-400 hover:text-red-500 backdrop-blur-xs flex items-center justify-center transition-all shadow-xs z-10 cursor-pointer"
        >
          <Heart
            size={18}
            className={`transition-colors ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'
            }`}
          />
        </button>

        {/* ORIGINAL badge */}
        {product.isOriginal && (
          <div className="absolute bottom-2 left-2 bg-white/95 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            ORIGINAL
          </div>
        )}

        {/* Discount Badge */}
        {product.discountPercent && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-md shadow-sm">
            -{product.discountPercent}%
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-2.5 sm:p-3 flex flex-col justify-between flex-1">
        <div>
          {/* Price & Old Price & Unit */}
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-sm sm:text-base font-black text-gray-950 leading-none">
              {fmt(product.price)} so'm
            </span>
            {product.oldPrice && (
              <span className="text-[11px] sm:text-xs text-gray-400 line-through">
                {fmt(product.oldPrice)}
              </span>
            )}
            {product.unit && (
              <span className="text-[10px] text-gray-500 font-semibold bg-gray-100 px-1.5 py-0.5 rounded">
                /{product.unit}
              </span>
            )}
          </div>

          {/* Yellow Installment Pill */}
          {product.installment && (
            <div className="mt-1.5">
              <span className="inline-block bg-[#ffea00] text-black text-[11px] font-bold px-1.5 py-0.5 rounded-sm">
                {product.installment}
              </span>
            </div>
          )}

          {/* Product Title (min-height ensures grid alignment) */}
          <h3 className="text-xs sm:text-[13px] text-gray-800 font-medium leading-snug line-clamp-2 mt-2 min-h-[34px] group-hover:text-emerald-700 transition-colors">
            {product.title}
          </h3>

          {/* Origin / Farmer Region Tag */}
          {product.region && (
            <div className="text-[10px] text-emerald-700 font-semibold mt-1 truncate">
              📍 {product.region}
            </div>
          )}

          {/* Rating and Reviews */}
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
            <span className="text-amber-400 font-bold">★</span>
            <span className="font-bold text-gray-800">{product.rating}</span>
            <span className="text-gray-400">({product.reviewsCount} sharhlar)</span>
          </div>
        </div>

        {/* Delivery / Buy Button (Uzum style purple pill button) */}
        <button
          type="button"
          onClick={handleBuy}
          className={`w-full mt-3 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold transition-all shadow-sm cursor-pointer ${
            added 
              ? 'bg-emerald-600 text-white' 
              : 'bg-[#7000ff] hover:bg-[#5f00da] active:scale-[0.98] text-white'
          }`}
        >
          {added ? (
            <>
              <Check size={14} className="stroke-[3]" />
              <span>Savatda ✓</span>
            </>
          ) : (
            <>
              <ShoppingBag size={14} />
              <span>Ertaga</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Main UzumMarketHome Export ─────────────────────────────────────────────
export default function UzumMarketHome({ onNavigate, onAddToCart, onShowToast }) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedModal, setSelectedModal] = useState(null);

  // 100% Genuine, verified Agricultural Products with accurate images & 1 kg prices
  const agroProducts = [
    {
      id: 'agro-pomidor-fresh',
      category: 'sabzavot',
      title: "Issiqxona qizil saralangan pomidori (Volgograd elita navi)",
      price: 18000,
      oldPrice: 24000,
      discountPercent: 25,
      installment: "1 275 so'm/oyiga",
      rating: 4.9,
      reviewsCount: 142,
      isOriginal: true,
      region: 'Toshkent viloyati',
      unit: 'kg',
      emoji: '🍅',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'agro-cucumber-fresh',
      category: 'sabzavot',
      title: "Navro'z F1 barra bodringi (Qisir-qisir, mayda tikanli)",
      price: 14000,
      oldPrice: 19000,
      discountPercent: 26,
      installment: "990 so'm/oyiga",
      rating: 4.8,
      reviewsCount: 98,
      isOriginal: false,
      region: "Farg'ona viloyati",
      unit: 'kg',
      emoji: '🥒',
      image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'agro-gala-potato',
      category: 'sabzavot',
      title: "Samarqand tog' etagi Gala saralangan kartoshkasi",
      price: 5800,
      oldPrice: 7500,
      discountPercent: 23,
      installment: "410 so'm/oyiga",
      rating: 4.9,
      reviewsCount: 1240,
      isOriginal: false,
      region: 'Samarqand viloyati',
      unit: 'kg',
      emoji: '🥔',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'agro-onion-zarafshon',
      category: 'sabzavot',
      title: "Zarafshon sariq saralangan qishki piyozi",
      price: 3500,
      oldPrice: 4800,
      discountPercent: 27,
      installment: "248 so'm/oyiga",
      rating: 4.7,
      reviewsCount: 430,
      isOriginal: false,
      region: 'Buxoro viloyati',
      unit: 'kg',
      emoji: '🧅',
      image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'agro-carrot-andijan',
      category: 'sabzavot',
      title: "Andijon sariq mirzoyi sabzisi (Oshbop, toza yuvilgan)",
      price: 4000,
      oldPrice: 5500,
      discountPercent: 27,
      installment: "283 so'm/oyiga",
      rating: 4.8,
      reviewsCount: 275,
      isOriginal: false,
      region: 'Andijon viloyati',
      unit: 'kg',
      emoji: '🥕',
      image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'agro-urug-pomidor',
      category: 'uruglar',
      title: "Gollandiya seleksiyasi pomidor va sabzavot urug'lari to'plami",
      price: 48000,
      oldPrice: 65000,
      discountPercent: 26,
      installment: "3 400 so'm/oyiga",
      rating: 4.9,
      reviewsCount: 420,
      isOriginal: true,
      region: 'Toshkent viloyati',
      unit: 'paket',
      emoji: '🌱',
      image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'agro-wheat-seed',
      category: 'uruglar',
      title: 'Bug\'doy urug\'i "Yaksart" elita navi, unuvchanligi 98%',
      price: 5200,
      oldPrice: 6500,
      discountPercent: 20,
      installment: "368 so'm/oyiga",
      rating: 4.9,
      reviewsCount: 310,
      isOriginal: true,
      region: "G'allachilik instituti",
      unit: 'kg',
      emoji: '🌾',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'agro-cotton-seeds',
      category: 'uruglar',
      title: 'Paxta chigit urug\'i "Buxoro-102" sertifikatlangan',
      price: 14000,
      oldPrice: 17500,
      discountPercent: 20,
      installment: "990 so'm/oyiga",
      rating: 4.8,
      reviewsCount: 145,
      isOriginal: true,
      region: 'Buxoro viloyati',
      unit: 'kg',
      emoji: '🌱',
      image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'agro-npk-fertilizer',
      category: 'ogitlar',
      title: "NPK 16:16:16 kompleks mineral o'g'it (Fosfor, Azot, Kaliy)",
      price: 7000,
      oldPrice: 9000,
      discountPercent: 22,
      installment: "495 so'm/oyiga",
      rating: 4.8,
      reviewsCount: 890,
      isOriginal: true,
      region: 'NavoiyAzot AJ',
      unit: 'kg',
      emoji: '🧪',
      image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'agro-biogumus',
      category: 'ogitlar',
      title: "Organik toza BioGumus (Kaliforniya chuvalchang)",
      price: 2400,
      oldPrice: 3200,
      discountPercent: 25,
      installment: "170 so'm/oyiga",
      rating: 4.9,
      reviewsCount: 380,
      isOriginal: false,
      region: "Farg'ona vodiysi",
      unit: 'kg',
      emoji: '🪱',
      image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'agro-red-apples',
      category: 'mevalar',
      title: "Namangan qizil beshyulduz olmasi (Shirin, shirali)",
      price: 16000,
      oldPrice: 20000,
      discountPercent: 20,
      installment: "1 133 so'm/oyiga",
      rating: 4.9,
      reviewsCount: 512,
      isOriginal: true,
      region: "Namangan bog'lari",
      unit: 'kg',
      emoji: '🍎',
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'agro-grapes-kishmish',
      category: 'mevalar',
      title: "Samarqand qora kishmish va Husayni uzumlari (24 Brix)",
      price: 22000,
      oldPrice: 28000,
      discountPercent: 21,
      installment: "1 558 so'm/oyiga",
      rating: 4.9,
      reviewsCount: 205,
      isOriginal: true,
      region: 'Samarqand viloyati',
      unit: 'kg',
      emoji: '🍇',
      image: 'https://images.unsplash.com/photo-1596363505729-4190a9506133?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'agro-melon-mirzachol',
      category: 'sabzavot',
      title: "Mirzacho'l asal qovuni (Obi novvot navi)",
      price: 6000,
      oldPrice: 8000,
      discountPercent: 25,
      installment: "425 so'm/oyiga",
      rating: 5.0,
      reviewsCount: 180,
      isOriginal: false,
      region: "Mirzacho'l dashti",
      unit: 'kg',
      emoji: '🍈',
      image: 'https://images.unsplash.com/photo-1598511726623-d2e9996892f0?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'agro-fresh-beef',
      category: 'chorva',
      title: "Barra yaylov mol go'shti (Halol yosh buqa lahmi)",
      price: 98000,
      oldPrice: 115000,
      discountPercent: 15,
      installment: "6 941 so'm/oyiga",
      rating: 4.9,
      reviewsCount: 340,
      isOriginal: true,
      region: 'Samarqand yaylovlari',
      unit: 'kg',
      emoji: '🥩',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'agro-fresh-milk',
      category: 'chorva',
      title: "Fermer sigir suti (Tabiiy yog'li, yangi sog'ilgan 4.2%)",
      price: 8500,
      oldPrice: 11000,
      discountPercent: 22,
      installment: "602 so'm/oyiga",
      rating: 5.0,
      reviewsCount: 410,
      isOriginal: true,
      region: 'Toshkent viloyati',
      unit: 'litr',
      emoji: '🥛',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'agro-drip-tape',
      category: 'sugorish',
      title: "Tomchilatib sug'orish lentasi (16mm, masofa 20sm, 1000m g'altak)",
      price: 380000,
      oldPrice: 460000,
      discountPercent: 17,
      installment: "26 916 so'm/oyiga",
      rating: 4.9,
      reviewsCount: 310,
      isOriginal: true,
      region: "O'zbekiston kafolati",
      unit: "g'altak",
      emoji: '💧',
      image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'agro-zomin-honey',
      category: 'asalarichilik',
      title: "Tabiiy Zomin tog' asali (100% sof, laboratoriya sertifikati)",
      price: 85000,
      oldPrice: 110000,
      discountPercent: 23,
      installment: "6 020 so'm/oyiga",
      rating: 5.0,
      reviewsCount: 650,
      isOriginal: true,
      region: "Jizzax, Zomin tog'lari",
      unit: 'kg',
      emoji: '🍯',
      image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'agro-sprayer-electric',
      category: 'texnika',
      title: "Elektr akkumulyatorli bog'dorchilik purkagichi (16 litr, 12V 8Ah)",
      price: 320000,
      oldPrice: 390000,
      discountPercent: 18,
      installment: "22 666 so'm/oyiga",
      rating: 4.8,
      reviewsCount: 520,
      isOriginal: true,
      region: '1 yil kafolat',
      unit: 'dona',
      emoji: '⚙️',
      image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'agro-bread-wheat',
      category: 'uruglar',
      title: "Bug'doy urug'i \"SuperGrow\" max 99% unuvchanlik",
      price: 5200,
      oldPrice: 6500,
      discountPercent: 20,
      installment: "368 so'm/oyiga",
      rating: 4.9,
      reviewsCount: 120,
      isOriginal: true,
      region: "Farg'ona viloyati",
      unit: 'kg',
      emoji: '🌾',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'agro-organic-fertilizer',
      category: 'ogitlar',
      title: 'Organik biokompost "EcoSoil" boyitilgan',
      price: 1800,
      oldPrice: 2500,
      discountPercent: 28,
      installment: "128 so'm/oyiga",
      rating: 4.8,
      reviewsCount: 80,
      isOriginal: false,
      region: 'Namangan',
      unit: 'kg',
      emoji: '🪴',
      image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'agro-apple-golden',
      category: 'mevalar',
      title: 'Golden Delicious sariq olma (Shirin, saralangan)',
      price: 15000,
      oldPrice: 19000,
      discountPercent: 21,
      installment: "1 062 so'm/oyiga",
      rating: 4.9,
      reviewsCount: 300,
      isOriginal: true,
      region: 'Sirdaryo',
      unit: 'kg',
      emoji: '🍏',
      image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'agro-broccoli',
      category: 'sabzavot',
      title: 'Yangi uzilgan barra brokoli (Saralangan)',
      price: 15000,
      oldPrice: 19000,
      discountPercent: 21,
      installment: "1 062 so'm/oyiga",
      rating: 4.8,
      reviewsCount: 150,
      isOriginal: false,
      region: 'Jizzax',
      unit: 'kg',
      emoji: '🥦',
      image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'agro-chicken-farm',
      category: 'chorva',
      title: 'Ekologik qishloq xonaki tuxumi (Organik saralangan)',
      price: 1500,
      oldPrice: 2000,
      discountPercent: 25,
      installment: "106 so'm/oyiga",
      rating: 4.9,
      reviewsCount: 210,
      isOriginal: true,
      region: 'Buxoro',
      unit: 'dona',
      emoji: '🥚',
      image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'agro-goat-milk',
      category: 'chorva',
      title: "Tabiiy echki va qo'y suti (Shifobaxsh parhezbop)",
      price: 15000,
      oldPrice: 20000,
      discountPercent: 25,
      installment: "1 062 so'm/oyiga",
      rating: 4.9,
      reviewsCount: 320,
      isOriginal: true,
      region: 'Navoiy',
      unit: 'litr',
      emoji: '🥛',
      image: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'agro-solar-pump',
      category: 'sugorish',
      title: "Quyosh energiyali agrosug'orish nasosi (120W, 12V DC)",
      price: 680000,
      oldPrice: 850000,
      discountPercent: 20,
      installment: "48 166 so'm/oyiga",
      rating: 4.8,
      reviewsCount: 140,
      isOriginal: true,
      region: 'Qashqadaryo',
      unit: 'dona',
      emoji: '⚙️',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'agro-tractor-mini',
      category: 'texnika',
      title: 'Mini traktor agregati (25 ot kuchi, 4x4, 2 yil kafolat)',
      price: 38000000,
      oldPrice: 44000000,
      discountPercent: 14,
      installment: "2 691 000 so'm/oyiga",
      rating: 4.7,
      reviewsCount: 95,
      isOriginal: true,
      region: 'Toshkent',
      unit: 'dona',
      emoji: '🚜',
      image: 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'agro-honey-wild',
      category: 'asalarichilik',
      title: 'Tog\' asali (Tabiiy asalari mumi bilan ramkada)',
      price: 110000,
      oldPrice: 145000,
      discountPercent: 24,
      installment: "7 791 so'm/oyiga",
      rating: 5.0,
      reviewsCount: 210,
      isOriginal: true,
      region: 'Sirdaryo',
      unit: 'kg',
      emoji: '🍯',
      image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=600&q=80',
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? agroProducts 
    : agroProducts.filter(p => p.category === selectedCategory);

  const tickerProducts = AGRO_DATA.products.slice(0, 4);

  return (
    <div className="bg-[#fbfcff] min-h-screen pb-16">
      {/* ── Main Container matching the Uzum Market structure for Agro Tarmoq ── */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 pt-3 sm:pt-5">
        
        {/* 1. Agricultural Hero Promo Slider */}
        <AgroHeroBanner onNavigate={onNavigate} />

        {/* 2. Main Agro Quick Nav Cards Grid matching user screenshot */}
        <AgroQuickNavCards onNavigate={onNavigate} />

        {/* 3. Section Title: "Mashhur Agro Mahsulotlar >" */}
        <div className="flex items-center justify-between mt-2 mb-4">
          <button
            type="button"
            onClick={() => onNavigate('dokon')}
            className="flex items-center gap-1.5 text-xl sm:text-2xl font-black text-gray-900 hover:text-emerald-700 transition-colors group cursor-pointer"
          >
            <span>Mashhur agro mahsulotlar</span>
            <ChevronRight 
              size={24} 
              className="text-gray-400 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all" 
            />
          </button>

          {/* Quick tab filters */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-semibold overflow-x-auto no-scrollbar scrollbar-none py-1 max-w-full sm:max-w-2xl">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === 'all' 
                  ? 'bg-emerald-600 text-white shadow-xs' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Barchasi ({agroProducts.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('uruglar')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === 'uruglar' 
                  ? 'bg-emerald-600 text-white shadow-xs' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Urug'lar
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('ogitlar')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === 'ogitlar' 
                  ? 'bg-emerald-600 text-white shadow-xs' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              O'g'itlar
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('sabzavot')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === 'sabzavot' 
                  ? 'bg-emerald-600 text-white shadow-xs' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Sabzavot & Poliz
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('mevalar')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === 'mevalar' 
                  ? 'bg-emerald-600 text-white shadow-xs' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Meva & Bog'dorchilik
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('sugorish')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === 'sugorish' 
                  ? 'bg-emerald-600 text-white shadow-xs' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Sug'orish
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('texnika')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === 'texnika' 
                  ? 'bg-emerald-600 text-white shadow-xs' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Texnika & Asboblar
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('chorva')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === 'chorva' 
                  ? 'bg-emerald-600 text-white shadow-xs' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Chorvachilik & Yem
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('asalarichilik')}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === 'asalarichilik' 
                  ? 'bg-emerald-600 text-white shadow-xs' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Asal
            </button>
          </div>
        </div>

        {/* 4. Products Grid (5 columns on desktop, Uzum Market layout) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3.5 mb-12">
          {filteredProducts.map((prod) => (
            <AgroProductCard
              key={prod.id}
              product={prod}
              onAddToCart={onAddToCart}
              onShowToast={onShowToast}
              onProductClick={(p) => setSelectedModal(p)}
            />
          ))}
        </div>

        {/* Product Detail Modal */}
        {selectedModal && (
          <ProductDetailModal
            product={{
              ...selectedModal,
              name: selectedModal.name || selectedModal.title,
              img: selectedModal.img || selectedModal.image,
              cat: selectedModal.cat || selectedModal.category,
              desc: selectedModal.desc || '',
              specs: selectedModal.specs || [],
              farmer: selectedModal.farmer || selectedModal.region || '',
              region: selectedModal.region || '',
              emoji: selectedModal.emoji || '🌱',
              trend: selectedModal.trend || 0,
            }}
            onClose={() => setSelectedModal(null)}
            onAddToCart={(item) => {
              if (onAddToCart) onAddToCart(item);
              setSelectedModal(null);
            }}
          />
        )}

        {/* ── Agro Tarmoq: Bugungi bozor narxlari (Daily Ticker) ── */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-base sm:text-lg font-bold text-gray-900">
                Bugungi qishloq xo'jaligi bozor narxlari: {getTodayFormatted()}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('narxlar')}
              className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
            >
              Barcha 14 kunlik kotirovkalar →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {tickerProducts.map((p) => {
              const curPrice = getProductMarketPrice(p.price, 0, 0);
              const prevPrice = getProductMarketPrice(p.price, 0, 1);
              const diff = curPrice - prevPrice;
              const trendUp = diff > 0;
              const trendDown = diff < 0;

              return (
                <div
                  key={p.id}
                  onClick={() => onNavigate('narxlar')}
                  className="bg-gray-50 hover:bg-emerald-50/70 p-3 rounded-xl border border-gray-100 transition-all cursor-pointer flex items-center gap-3"
                >
                  <img src={p.img} alt={p.name} className="w-11 h-11 rounded-lg object-cover" />
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-gray-800 truncate">{p.name}</div>
                    <div className="text-xs font-bold text-gray-900 mt-0.5">
                      {fmt(curPrice)} {t('price_unit')}{' '}
                      <span className={`text-[10px] font-bold ${trendUp ? 'text-emerald-600' : trendDown ? 'text-red-500' : 'text-gray-400'}`}>
                        {trendUp ? '▲' : trendDown ? '▼' : '▬'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Key Agro Capabilities: AI Agronom, Texnika, Ob-havo ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {/* AI Agronom */}
          <div
            onClick={() => onNavigate('agronom')}
            className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 rounded-2xl p-5 text-white shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden group"
          >
            <div className="relative z-10">
              <span className="bg-white/20 backdrop-blur-sm text-white text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Sun'iy intellekt
              </span>
              <h3 className="text-xl font-black mt-2 mb-1 flex items-center gap-2">
                <span>AI Agronom Shifokori</span>
                <Cpu size={20} className="text-yellow-300" />
              </h3>
              <p className="text-white/90 text-xs leading-relaxed mb-4">
                Ekin kasalliklari va zararkunandalarini rasm orqali 3 soniyada aniqlang va davolash rejasini oling.
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-black bg-white text-emerald-900 px-4 py-1.5 rounded-full shadow-sm group-hover:bg-amber-300 transition-colors">
                Tashxis qo'yish →
              </span>
            </div>
          </div>

          {/* Texnika Ijarasi */}
          <div
            onClick={() => onNavigate('texnika')}
            className="bg-gradient-to-br from-amber-600 via-orange-700 to-amber-900 rounded-2xl p-5 text-white shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden group"
          >
            <div className="relative z-10">
              <span className="bg-white/20 backdrop-blur-sm text-white text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Qishloq xo'jaligi texnikasi
              </span>
              <h3 className="text-xl font-black mt-2 mb-1 flex items-center gap-2">
                <span>Traktor va Dronlar</span>
                <Tractor size={20} className="text-yellow-300" />
              </h3>
              <p className="text-white/90 text-xs leading-relaxed mb-4">
                Traktor, kombayn va purkagich dronlar ijarasi. Mexanizator xizmati bilan dalangizga yetkazamiz.
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-black bg-white text-amber-950 px-4 py-1.5 rounded-full shadow-sm group-hover:bg-amber-300 transition-colors">
                Texnikalarni ko'rish →
              </span>
            </div>
          </div>

          {/* Ob-havo va Kalendar */}
          <div
            onClick={() => onNavigate('obhavo')}
            className="bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-900 rounded-2xl p-5 text-white shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden group"
          >
            <div className="relative z-10">
              <span className="bg-white/20 backdrop-blur-sm text-white text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Agro Kalendar
              </span>
              <h3 className="text-xl font-black mt-2 mb-1 flex items-center gap-2">
                <span>Hosil va Ob-havo</span>
                <Calendar size={20} className="text-yellow-300" />
              </h3>
              <p className="text-white/90 text-xs leading-relaxed mb-4">
                14 kunlik agrometeorologik bashorat, ekish-yig'im va sug'orish oylik tavsiyalari.
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-black bg-white text-blue-950 px-4 py-1.5 rounded-full shadow-sm group-hover:bg-amber-300 transition-colors">
                Kalendarni ochish →
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
