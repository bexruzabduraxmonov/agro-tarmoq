import React, { useState } from "react";
import { AGRO_DATA } from "../data/agroData";
import { useLanguage } from "../context/LanguageContext";
import { fmt } from "../utils/helpers";
import ProductDetailModal from "../components/ProductDetailModal";

const trendInfo = {
  "1":  { icon: "▲", cls: "trend-up",   label: "Oshmoqda" },
  "-1": { icon: "▼", cls: "trend-down", label: "Tushmoqda" },
  "0":  { icon: "■", cls: "",           label: "Barqaror" },
};

export default function BozorPage({ onAddToCart }) {
  const { t } = useLanguage();
  const [activeCat, setActiveCat] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addedIds, setAddedIds] = useState({});
  const [favorites, setFavorites] = useState({});

  const filteredProducts = AGRO_DATA.products.filter(
    (p) => activeCat === "all" || p.cat === activeCat
  );

  const handleAddToCart = (e, p) => {
    e.stopPropagation();
    onAddToCart(p);
    setAddedIds((prev) => ({ ...prev, [p.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = { ...prev };
        delete next[p.id];
        return next;
      });
    }, 1800);
  };

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main id="top">
      <section id="bozor" className="section" style={{ paddingTop: "28px" }}>
        <div className="container">
          {/* Section Header */}
          <div className="section-head" style={{ marginBottom: "20px" }}>
            <span className="kicker">{t("market_kicker")}</span>
            <h2>{t("market_title")}</h2>
            <p className="lead">{t("market_lead")}</p>
          </div>

          {/* Uzum-style Sticky Categories Horizontal Scroll */}
          <div className="uzum-cats-scroll">
            {AGRO_DATA.cats.map((c) => (
              <button
                key={c[0]}
                type="button"
                className={`uzum-cat-btn ${activeCat === c[0] ? "active" : ""}`}
                onClick={() => setActiveCat(c[0])}
              >
                {t(`cat_${c[0]}`, c[1])}
              </button>
            ))}
          </div>

          {/* Products Count Indicator */}
          <div style={{ marginBottom: "16px", color: "var(--muted-color)", fontSize: "0.88rem", fontWeight: 600 }}>
            Jami: <strong style={{ color: "var(--text-color)" }}>{filteredProducts.length}</strong> ta saralangan mahsulot
          </div>

          {/* Products Grid — Uzum Market Authentic Card Layout */}
          <div className="uzum-grid">
            {filteredProducts.map((p) => {
              const trend = trendInfo[String(p.trend)];
              const catLabel = AGRO_DATA.catLabel[p.cat] || p.cat;
              const isAdded = addedIds[p.id];
              const isFav = favorites[p.id];
              const rating = p.rating || 4.9;
              const reviews = p.reviewsCount || 110;
              const monthly = Math.round((p.price * 1.12) / 6);

              return (
                <div
                  key={p.id}
                  className="uzum-card"
                  onClick={() => setSelectedProduct(p)}
                >
                  {/* Image Container with Badges & Wishlist */}
                  <div className="uzum-card-img">
                    <img src={p.img} alt={p.name} loading="lazy" />

                    {/* Trend / Discount Badge */}
                    {trend?.cls && (
                      <span className={`uzum-card-trend ${trend.cls}`}>
                        {trend.icon} {trend.label}
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      className={`uzum-card-fav ${isFav ? "active" : ""}`}
                      onClick={(e) => toggleFavorite(e, p.id)}
                      aria-label="Sevimlilarga qoʻshish"
                    >
                      <i className={isFav ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                    </button>

                    {/* Quick Preview Hover Overlay */}
                    <div className="uzum-card-overlay">
                      <span>Batafsil maʼlumot</span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="uzum-card-body">
                    {/* Category Label */}
                    <div className="uzum-card-cat">{catLabel}</div>

                    {/* Title */}
                    <h3 className="uzum-card-name" title={p.name}>
                      <span>{p.emoji}</span> {p.name}
                    </h3>

                    {/* Rating & Reviews */}
                    <div className="uzum-card-rating-row">
                      <i className="fa-solid fa-star"></i>
                      <span className="rate-val">{rating}</span>
                      <span className="rate-count">({reviews})</span>
                    </div>

                    {/* Installment Badge (Uzum Nasiya style) */}
                    <div className="uzum-card-monthly">
                      {fmt(monthly)} soʻm/oyiga
                    </div>

                    {/* Origin / Farmer Tag */}
                    <div className="uzum-card-meta">
                      <i className="fa-solid fa-location-dot"></i>
                      <span className="truncate">{p.region.split(" ")[0]} • {p.farmer}</span>
                    </div>

                    {/* Price and Add to Cart Action */}
                    <div className="uzum-card-footer">
                      <div>
                        <div className="uzum-card-price">
                          {fmt(p.price)} <span className="uzum-card-cur">soʻm</span>
                        </div>
                        <div className="uzum-card-unit">1 {p.unit} narxi</div>
                      </div>

                      <button
                        type="button"
                        className={`uzum-card-add ${isAdded ? "added" : ""}`}
                        onClick={(e) => handleAddToCart(e, p)}
                        aria-label="Savatga qoʻshish"
                        title="Savatga qoʻshish"
                      >
                        {isAdded ? (
                          <i className="fa-solid fa-check"></i>
                        ) : (
                          <i className="fa-solid fa-cart-plus"></i>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Uzum-style Detailed Product Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(item) => onAddToCart(item)}
          t={t}
        />
      )}
    </main>
  );
}
