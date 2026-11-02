import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Check, 
  Star, 
  SlidersHorizontal, 
  Eye, 
  Tag, 
  PackageCheck,
  Search
} from 'lucide-react';
import { mockProducts } from '../data/mockData';

export default function Products({ 
  onAddToCart, 
  onQuickOrder, 
  searchQuery, 
  setSearchQuery 
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [detailProduct, setDetailProduct] = useState(null);

  const categories = [
    { id: 'all', name: "Barcha Mahsulotlar" },
    { id: 'urug', name: "Urug' va ko'chatlar" },
    { id: 'ogit', name: "O'g'it va preparatlar" },
    { id: 'texnika', name: "Agrotexnika" },
    { id: 'meva', name: "Meva va sabzavotlar" }
  ];

  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="products" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              <PackageCheck className="w-3.5 h-3.5 text-emerald-600" />
              Agro-Bozor va Katalog
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Sertifikatlangan Mahsulotlar Katalogi
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              To'g'ridan-to'g'ri ishlab chiqaruvchilardan sifat kafolatlangan urug'lar, o'g'itlar va texnikalar.
            </p>
          </div>

          {/* Quick Search inside products */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Katalogdan qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-xs"
            />
          </div>
        </div>

        {/* Categories Tab Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-100/80'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-500 text-base">
              "{searchQuery}" so'rovi bo'yicha mahsulot topilmadi.
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-3 text-sm font-bold text-emerald-600 hover:underline"
            >
              Filtrlarni tozalash
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-400 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image Container with Badges */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow">
                        {product.badge}
                      </span>
                    )}

                    <button
                      onClick={() => setDetailProduct(product)}
                      className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-slate-700 hover:text-emerald-700 p-2 rounded-full shadow backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Batafsil ko'rish"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                      <span>{product.categoryName}</span>
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{product.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2 mb-2 group-hover:text-emerald-700 transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Short Specs list */}
                    <div className="space-y-1 mb-4">
                      {product.specs.slice(0, 2).map((sp, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="truncate">{sp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer / Price & Add to Cart */}
                <div className="p-5 pt-0 border-t border-slate-100 mt-2">
                  <div className="flex items-baseline justify-between mb-3 pt-3">
                    <div>
                      <span className="text-lg font-black text-emerald-800">
                        {product.price}
                      </span>
                      <span className="text-xs text-slate-500 ml-1">so'm</span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      /{product.unit}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold py-2.5 px-3 rounded-xl transition-colors"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Savatga</span>
                    </button>

                    <button
                      onClick={() => onQuickOrder(product)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-colors shadow-xs"
                    >
                      Buyurtma
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Product Detail Modal */}
      {detailProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
            <div className="relative aspect-video">
              <img 
                src={detailProduct.image} 
                alt={detailProduct.name}
                className="w-full h-full object-cover" 
              />
              <button
                onClick={() => setDetailProduct(null)}
                className="absolute top-3 right-3 bg-black/60 hover:bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                {detailProduct.categoryName}
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2">
                {detailProduct.name}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {detailProduct.description}
              </p>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 mb-6 space-y-2">
                <div className="text-xs font-bold text-slate-700 mb-1">Texnik ko'rsatkichlar:</div>
                {detailProduct.specs.map((sp, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{sp}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-2xl font-black text-emerald-700">
                    {detailProduct.price} <span className="text-sm font-normal text-slate-600">so'm</span>
                  </div>
                  <div className="text-xs text-slate-500">1 {detailProduct.unit} uchun</div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      onAddToCart(detailProduct);
                      setDetailProduct(null);
                    }}
                    className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-sm font-bold py-2.5 px-4 rounded-xl"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Savatga</span>
                  </button>
                  <button
                    onClick={() => {
                      onQuickOrder(detailProduct);
                      setDetailProduct(null);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold py-2.5 px-5 rounded-xl shadow"
                  >
                    Hoziroq Buyurtma
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
