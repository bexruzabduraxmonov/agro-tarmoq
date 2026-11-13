import React, { useState, useMemo } from "react";
import { AGRO_DATA } from "../data/agroData";
import { useLanguage } from "../context/LanguageContext";
import { fmt } from "../utils/helpers";
import ProductDetailModal from "../components/ProductDetailModal";

export default function BozorPage({ onAddToCart, products: dynamicProducts = [], favorites = {}, onToggleFavorite }) {
  const { t } = useLanguage();

  const [activeCat, setActiveCat] = useState(() => {
    try {
      const stored = sessionStorage.getItem("agro_selected_cat");
      if (stored) { sessionStorage.removeItem("agro_selected_cat"); return stored; }
    } catch {}
    return "all";
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addedIds, setAddedIds] = useState({});
  const [searchQ, setSearchQ] = useState("");
  const [region, setRegion] = useState("all");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const allProducts = useMemo(() => [...dynamicProducts, ...AGRO_DATA.products], [dynamicProducts]);

  const filteredProducts = useMemo(() => {
    let arr = allProducts.filter((p) => {
      if (activeCat !== "all" && p.cat !== activeCat) return false;
      if (region !== "all" && !p.region?.includes(region)) return false;
      if (searchQ && !p.name?.toLowerCase().includes(searchQ.toLowerCase()) &&
          !p.farmer?.toLowerCase().includes(searchQ.toLowerCase())) return false;
      if (priceMin && p.price < Number(priceMin)) return false;
      if (priceMax && p.price > Number(priceMax)) return false;
      return true;
    });
    if (sortBy === "price_asc") arr = [...arr].sort((a, b) => a.price - b.price);
    else if (sortBy === "price_desc") arr = [...arr].sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") arr = [...arr].sort((a, b) => (b.rating || 4.5) - (a.rating || 4.5));
    return arr;
  }, [allProducts, activeCat, region, searchQ, priceMin, priceMax, sortBy]);

  const handleAddToCart = (e, p) => {
    e.stopPropagation();
    onAddToCart(p);
    setAddedIds((prev) => ({ ...prev, [p.id]: true }));
    setTimeout(() => setAddedIds((prev) => { const n = { ...prev }; delete n[p.id]; return n; }), 1800);
  };

  const catCounts = useMemo(() => {
    const counts = { all: allProducts.length };
    AGRO_DATA.cats.forEach(([key]) => { counts[key] = allProducts.filter((p) => p.cat === key).length; });
    return counts;
  }, [allProducts]);

  const resetFilters = () => { setRegion("all"); setPriceMin(""); setPriceMax(""); setSearchQ(""); setSortBy("newest"); };

  const regions = AGRO_DATA.regionsList || ["Toshkent","Samarqand","Farg'ona","Andijon","Namangan","Qashqadaryo","Surxondaryo","Buxoro","Navoiy","Xorazm","Sirdaryo","Jizzax","Qoraqalpog'iston"];

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-color)" }}>
      {/* Page Header */}
      <section style={{ background: "linear-gradient(135deg,#15803d 0%,#166534 100%)", padding: "36px 0 28px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.07, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="container" style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: 48, height: 48, borderRadius: "14px", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>🌾</div>
            <div>
              <h1 style={{ color: "#fff", fontSize: "clamp(1.3rem,4vw,1.8rem)", fontWeight: 800, margin: 0 }}>Agro Bozor</h1>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.88rem", margin: 0 }}>{allProducts.length}+ mahsulot · {regions.length} viloyat</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px", maxWidth: "620px" }}>
            <div style={{ flex: 1, position: "relative" }}>
              <i className="fa-solid fa-magnifying-glass" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#6b7280" }} />
              <input type="text" placeholder="Mahsulot, fermer yoki kalit so'z..." value={searchQ} onChange={(e) => setSearchQ(e.target.value)}
                style={{ width: "100%", padding: "12px 14px 12px 42px", borderRadius: "12px", border: "none", fontSize: "0.95rem", outline: "none", background: "rgba(255,255,255,0.95)", color: "#1a2e1a", boxSizing: "border-box" }} />
            </div>
            <button type="button" onClick={() => setFiltersOpen(!filtersOpen)}
              style={{ padding: "12px 18px", borderRadius: "12px", border: "none", background: filtersOpen ? "#fff" : "rgba(255,255,255,0.2)", color: filtersOpen ? "#15803d" : "#fff", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", backdropFilter: "blur(10px)", whiteSpace: "nowrap" }}>
              <i className="fa-solid fa-sliders" /> Filtr
            </button>
          </div>
        </div>
      </section>

      {/* Filters */}
      {filtersOpen && (
        <div style={{ background: "var(--surface-color)", borderBottom: "1px solid var(--border-color)", padding: "16px 0" }}>
          <div className="container">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "flex-end" }}>
              <div style={{ flex: "1", minWidth: "150px" }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--muted-color)", marginBottom: "5px", textTransform: "uppercase" }}>Viloyat</label>
                <select value={region} onChange={(e) => setRegion(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: "10px", border: "1.5px solid var(--border-color)", background: "var(--bg-color)", color: "var(--text-color)", fontSize: "0.9rem" }}>
                  <option value="all">Barcha viloyatlar</option>
                  {regions.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div style={{ flex: "1", minWidth: "120px" }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--muted-color)", marginBottom: "5px", textTransform: "uppercase" }}>Narx min</label>
                <input type="number" placeholder="0" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: "10px", border: "1.5px solid var(--border-color)", background: "var(--bg-color)", color: "var(--text-color)", fontSize: "0.9rem", boxSizing: "border-box" }} />
              </div>
              <div style={{ flex: "1", minWidth: "120px" }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--muted-color)", marginBottom: "5px", textTransform: "uppercase" }}>Narx max</label>
                <input type="number" placeholder="∞" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: "10px", border: "1.5px solid var(--border-color)", background: "var(--bg-color)", color: "var(--text-color)", fontSize: "0.9rem", boxSizing: "border-box" }} />
              </div>
              <div style={{ flex: "1", minWidth: "150px" }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--muted-color)", marginBottom: "5px", textTransform: "uppercase" }}>Tartiblash</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: "10px", border: "1.5px solid var(--border-color)", background: "var(--bg-color)", color: "var(--text-color)", fontSize: "0.9rem" }}>
                  <option value="newest">Eng yangi</option>
                  <option value="price_asc">Arzondan qimmatga</option>
                  <option value="price_desc">Qimmatdan arzonga</option>
                  <option value="rating">Reyting bo'yicha</option>
                </select>
              </div>
              <button type="button" onClick={resetFilters} style={{ padding: "9px 16px", borderRadius: "10px", border: "1.5px solid var(--border-color)", background: "transparent", color: "var(--muted-color)", fontWeight: 700, cursor: "pointer", fontSize: "0.88rem", display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap" }}>
                <i className="fa-solid fa-rotate-left" /> Tozalash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <div style={{ background: "var(--surface-color)", borderBottom: "1px solid var(--border-color)", position: "sticky", top: 0, zIndex: 40 }}>
        <div className="container">
          <div style={{ display: "flex", gap: "6px", overflowX: "auto", padding: "10px 0", scrollbarWidth: "none" }}>
            {[["all", "Barchasi", "🌍"], ...AGRO_DATA.cats.map(c => [c[0], AGRO_DATA.catLabel?.[c[0]] || c[1], c[2] || ""])].map(([key, label, icon]) => {
              const isActive = activeCat === key;
              return (
                <button key={key} type="button" onClick={() => setActiveCat(key)} style={{ flexShrink: 0, padding: "8px 16px", borderRadius: "30px", border: isActive ? "none" : "1.5px solid var(--border-color)", background: isActive ? "linear-gradient(135deg,#15803d,#22c55e)" : "transparent", color: isActive ? "#fff" : "var(--text-color)", fontWeight: 700, cursor: "pointer", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "5px", whiteSpace: "nowrap", transition: "all 0.2s" }}>
                  <span>{icon}</span><span>{label}</span>
                  <span style={{ padding: "1px 7px", borderRadius: "12px", background: isActive ? "rgba(255,255,255,0.3)" : "var(--border-color)", fontSize: "0.72rem" }}>{catCounts[key] || 0}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results info */}
      <div className="container" style={{ paddingTop: "16px", paddingBottom: "6px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
        <span style={{ color: "var(--muted-color)", fontSize: "0.88rem" }}>
          Topildi: <strong style={{ color: "var(--text-color)" }}>{filteredProducts.length}</strong> ta mahsulot
        </span>
        {(searchQ || region !== "all" || priceMin || priceMax) && (
          <button onClick={resetFilters} style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "none", borderRadius: "20px", padding: "4px 12px", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer" }}>
            <i className="fa-solid fa-xmark" /> Filtrlarni tozalash
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="container" style={{ paddingBottom: "100px" }}>
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <div style={{ fontSize: "4rem" }}>🌱</div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-color)" }}>Mahsulot topilmadi</h3>
            <p style={{ color: "var(--muted-color)", maxWidth: "340px" }}>Qidiruv yoki filtr shartlarini o'zgartirib ko'ring</p>
            <button onClick={resetFilters} style={{ padding: "12px 28px", borderRadius: "12px", background: "linear-gradient(135deg,#15803d,#22c55e)", color: "#fff", border: "none", fontWeight: 700, cursor: "pointer" }}>Hammasini ko'rsatish</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: "16px", paddingTop: "12px" }}>
            {filteredProducts.map((p) => {
              const isAdded = addedIds[p.id];
              const isFav = favorites[p.id];
              return (
                <div key={p.id} onClick={() => setSelectedProduct(p)}
                  style={{ background: "var(--surface-color)", borderRadius: "16px", border: "1px solid var(--border-color)", overflow: "hidden", cursor: "pointer", transition: "all 0.25s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(21,128,61,0.15)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                  {/* Image */}
                  <div style={{ position: "relative", height: "170px", background: "#f0fdf4", overflow: "hidden" }}>
                    <img src={p.img} alt={p.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <span style={{ position: "absolute", top: "9px", left: "9px", background: "rgba(21,128,61,0.88)", color: "#fff", padding: "2px 9px", borderRadius: "20px", fontSize: "0.7rem", fontWeight: 700 }}>
                      {AGRO_DATA.catLabel?.[p.cat] || p.cat}
                    </span>
                    <button type="button" onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(e, p.id); }}
                      style={{ position: "absolute", top: "8px", right: "8px", width: "32px", height: "32px", borderRadius: "50%", border: "none", background: isFav ? "rgba(239,68,68,0.9)" : "rgba(255,255,255,0.88)", color: isFav ? "#fff" : "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "0.85rem" }}>
                      <i className={isFav ? "fa-solid fa-heart" : "fa-regular fa-heart"} />
                    </button>
                  </div>
                  {/* Body */}
                  <div style={{ padding: "13px" }}>
                    <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-color)", margin: "0 0 5px", lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {p.emoji} {p.name}
                    </h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "6px" }}>
                      <i className="fa-solid fa-star" style={{ color: "#f59e0b", fontSize: "0.72rem" }} />
                      <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-color)" }}>{p.rating || 4.8}</span>
                      <span style={{ fontSize: "0.75rem", color: "var(--muted-color)" }}>({p.reviewsCount || 94})</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "10px" }}>
                      <i className="fa-solid fa-location-dot" style={{ color: "#15803d", fontSize: "0.72rem" }} />
                      <span style={{ fontSize: "0.75rem", color: "var(--muted-color)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.region?.split(" ")[0]} · {p.farmer}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#15803d" }}>{fmt(p.price)} <span style={{ fontSize: "0.72rem", fontWeight: 600 }}>so'm</span></div>
                        <div style={{ fontSize: "0.7rem", color: "var(--muted-color)" }}>1 {p.unit} narxi</div>
                      </div>
                      <button type="button" onClick={(e) => handleAddToCart(e, p)}
                        style={{ width: "36px", height: "36px", borderRadius: "10px", border: "none", background: isAdded ? "linear-gradient(135deg,#22c55e,#16a34a)" : "linear-gradient(135deg,#15803d,#22c55e)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 12px rgba(21,128,61,0.35)", flexShrink: 0 }}>
                        <i className={isAdded ? "fa-solid fa-check" : "fa-solid fa-cart-plus"} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={(item) => onAddToCart(item)} t={t} />
      )}
    </main>
  );
}
