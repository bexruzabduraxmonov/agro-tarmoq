import React, { useState } from 'react';
import { 
  Sprout, 
  Phone, 
  Mail, 
  MapPin, 
  ShoppingCart, 
  Headphones, 
  Search, 
  X,
  Home,
  Info,
  Wrench,
  Package,
  Calculator,
  Newspaper,
  MessageSquareHeart,
  Send
} from 'lucide-react';

export default function Navbar({ 
  currentPage, 
  setCurrentPage, 
  cartCount, 
  onOpenCart, 
  onOpenQuickCall, 
  searchQuery, 
  setSearchQuery 
}) {
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { name: "Bosh sahifa", id: "home", icon: Home },
    { name: "Biz haqimizda", id: "about", icon: Info },
    { name: "Xizmatlar", id: "services", icon: Wrench },
    { name: "Mahsulotlar", id: "products", icon: Package },
    { name: "Agro-Kalkulyator", id: "calculator", icon: Calculator },
    { name: "Yangiliklar", id: "news", icon: Newspaper },
    { name: "Fikrlar", id: "testimonials", icon: MessageSquareHeart },
    { name: "Bog'lanish", id: "contact", icon: Send }
  ];

  const handleNavClick = (id) => {
    setCurrentPage(id);
    window.location.hash = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-md bg-white">
      
      {/* 1. Top Mini Bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 border-b border-emerald-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a href="tel:+998712004488" className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>+998 (71) 200-44-88</span>
            </a>
            <a href="mailto:info@agrotarmoq.uz" className="hidden sm:flex items-center gap-1.5 hover:text-emerald-300 transition-colors">
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>info@agrotarmoq.uz</span>
            </a>
            <div className="hidden md:flex items-center gap-1.5 text-emerald-300/80">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Toshkent sh., Bobur ko'chasi 45</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-emerald-300/90 text-[11px]">
            <span>Dush-Shan: 08:30 - 18:30</span>
            <span className="text-emerald-700">|</span>
            <div className="flex items-center gap-1.5 font-bold">
              <span className="text-emerald-400">UZ</span>
              <span className="text-emerald-700">/</span>
              <span className="hover:text-white cursor-pointer transition-colors">RU</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Middle Brand & Actions Header */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            
            {/* Logo */}
            <button 
              onClick={() => handleNavClick('home')} 
              className="flex items-center gap-2.5 sm:gap-3 group text-left cursor-pointer"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-emerald-700 to-green-500 flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6 sm:w-7 sm:h-7 text-white stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors flex items-center gap-1">
                  AGRO<span className="text-emerald-600">TARMOQ</span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-emerald-700/80 -mt-1">
                  Milliy Agrosanoat Portali
                </span>
              </div>
            </button>

            {/* Quick Actions Right */}
            <div className="flex items-center gap-2 sm:gap-4">
              
              {/* Search Box */}
              <div className="relative">
                {searchOpen ? (
                  <div className="flex items-center bg-slate-100 rounded-full px-3 py-1.5 border border-emerald-400 shadow-inner animate-in fade-in zoom-in-95 duration-200">
                    <Search className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                    <input
                      type="text"
                      placeholder="Qidirish..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (currentPage !== 'products') {
                          setCurrentPage('products');
                        }
                      }}
                      className="bg-transparent border-none outline-none text-xs sm:text-sm text-slate-800 w-28 sm:w-48"
                      autoFocus
                    />
                    <button 
                      onClick={() => { setSearchOpen(false); setSearchQuery(""); }} 
                      className="text-slate-400 hover:text-slate-600 ml-1 font-bold"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-2 sm:p-2.5 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
                    title="Qidiruv"
                  >
                    <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                )}
              </div>

              {/* Shopping Cart Button */}
              <button
                onClick={onOpenCart}
                className="relative p-2 sm:p-2.5 text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
                title="Savat"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center animate-bounce shadow">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Quick Call Button */}
              <button
                onClick={onOpenQuickCall}
                className="flex items-center gap-1.5 sm:gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Headphones className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Tezkor Aloqa</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Alohida Sahifalar Gorizontal Menyu Paneli */}
      <div className="bg-slate-900 text-slate-200 border-b border-emerald-950/80 shadow-inner">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <nav className="flex items-center justify-start lg:justify-center overflow-x-auto py-1.5 scrollbar-none gap-1 sm:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`whitespace-nowrap flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 cursor-pointer ${
                    isActive 
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/50 scale-[1.02]' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                  <span>{link.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

    </header>
  );
}
