import React, { useState } from "react";
import { AGRO_DATA } from "../data/agroData";
import { fmt } from "../utils/helpers";

const trendInfo = {
  "1":  { icon: "▲", cls: "trend-up",   label: "Narx koʻtarilmoqda" },
  "-1": { icon: "▼", cls: "trend-down", label: "Narx arzonlashmoqda" },
  "0":  { icon: "■", cls: "",           label: "Barqaror narx" },
};

export default function ProductDetailModal({ product, onClose, onAddToCart, t }) {
  const [qty, setQty] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!product) return null;

  const trend = trendInfo[String(product.trend)];
  const catLabel = AGRO_DATA.catLabel[product.cat] || product.cat;
  const rating = product.rating || 4.9;
  const reviewsCount = product.reviewsCount || 128;
  const totalPrice = product.price * qty;
  const monthlyPrice = Math.round((product.price * 1.12) / 6);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `${product.name} — Agro Tarmoq platformasida ${fmt(product.price)} soʻm`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="uzum-modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div className="uzum-modal">
        {/* Top Floating Controls */}
        <div className="uzum-modal-top-bar">
          <button 
            type="button" 
            className={`uzum-icon-circle ${isFavorite ? "active" : ""}`}
            onClick={() => setIsFavorite(!isFavorite)}
            aria-label="Saralanganga qoʻshish"
          >
            <i className={isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
          </button>
          <button 
            type="button" 
            className="uzum-icon-circle"
            onClick={handleShare}
            aria-label="Ulashish"
          >
            <i className={copied ? "fa-solid fa-check" : "fa-solid fa-share-nodes"}></i>
          </button>
          <button 
            type="button" 
            className="uzum-modal-close" 
            onClick={onClose} 
            aria-label="Yopish"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Product Image Header with Trend Tag */}
        <div className="uzum-modal-image">
          <img src={product.img} alt={product.name} />
          {trend && (
            <span className={`uzum-modal-badge ${trend.cls}`}>
              {trend.icon} {trend.label}
            </span>
          )}
          <span className="uzum-modal-views-badge">
            <i className="fa-regular fa-eye"></i> 1.4k marta koʻrildi
          </span>
        </div>

        {/* Product Body */}
        <div className="uzum-modal-body">
          {/* Breadcrumb / Category */}
          <div className="uzum-modal-cat-row">
            <span className="uzum-modal-category">{catLabel}</span>
            <span className="uzum-modal-sku">ID: #{product.id}</span>
          </div>

          {/* Title */}
          <h2 className="uzum-modal-title">
            <span>{product.emoji}</span> {product.name}
          </h2>

          {/* Rating & Reviews */}
          <div className="uzum-modal-meta-row">
            <div className="uzum-modal-rating-badge">
              <i className="fa-solid fa-star"></i>
              <span className="rate-num">{rating}</span>
            </div>
            <span className="uzum-modal-reviews-count">({reviewsCount} ta sharh)</span>
            <span className="uzum-modal-dot">•</span>
            <span className="uzum-modal-sold-count">500+ marta buyurtma qilingan</span>
          </div>

          {/* Price Box — Uzum Style */}
          <div className="uzum-modal-price-card">
            <div className="uzum-price-main">
              <span className="uzum-price-val">{fmt(totalPrice)}</span>
              <span className="uzum-price-cur">soʻm</span>
              <span className="uzum-price-per">/ {qty > 1 ? `${qty} ${product.unit}` : product.unit}</span>
            </div>
            {/* Installment Badge */}
            <div className="uzum-installment-tag">
              <span className="inst-badge">Muddatli toʻlov</span>
              <span className="inst-text">oyiga <strong>{fmt(monthlyPrice)} soʻmdan</strong> / 6 oy</span>
            </div>
          </div>

          {/* Delivery & Assurance Cards */}
          <div className="uzum-delivery-box">
            <div className="uzum-delivery-item">
              <div className="uzum-del-icon green">
                <i className="fa-solid fa-truck-fast"></i>
              </div>
              <div className="uzum-del-content">
                <div className="uzum-del-title">Tezkor yetkazib berish (1 kunda)</div>
                <div className="uzum-del-desc">Topshirish punktiga bepul yoki manzilingizgacha kuryer orqali</div>
              </div>
            </div>
            <div className="uzum-delivery-item">
              <div className="uzum-del-icon amber">
                <i className="fa-solid fa-shield-check"></i>
              </div>
              <div className="uzum-del-content">
                <div className="uzum-del-title">100% Sifat kafolati va qaytarish</div>
                <div className="uzum-del-desc">Qabul qilish paytida mahsulot sifatini tekshirib olish imkoniyati</div>
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="uzum-qty-row">
            <span className="uzum-qty-label">Miqdor ({product.unit}):</span>
            <div className="uzum-qty-counter">
              <button 
                type="button" 
                onClick={() => setQty(Math.max(1, qty - 1))}
                disabled={qty <= 1}
                aria-label="Kamaytirish"
              >
                <i className="fa-solid fa-minus"></i>
              </button>
              <span className="qty-val">{qty}</span>
              <button 
                type="button" 
                onClick={() => setQty(qty + 1)}
                aria-label="Koʻpaytirish"
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>

          {/* Farmer & Origin Box */}
          <div className="uzum-farmer-box">
            <div className="uzum-farmer-avatar">
              <i className="fa-solid fa-user-check"></i>
            </div>
            <div className="uzum-farmer-info">
              <div className="uzum-farmer-name">{product.farmer}</div>
              <div className="uzum-farmer-loc">
                <i className="fa-solid fa-location-dot"></i> {product.region}
              </div>
            </div>
            <div className="uzum-farmer-badge">
              <i className="fa-solid fa-certificate"></i> Tasdiqlangan fermer
            </div>
          </div>

          {/* Description */}
          {product.desc && (
            <div className="uzum-desc-section">
              <h3 className="uzum-subheading">Mahsulot haqida qisqacha</h3>
              <p className="uzum-desc-text">{product.desc}</p>
            </div>
          )}

          {/* Specifications Table */}
          {product.specs && product.specs.length > 0 && (
            <div className="uzum-specs-section">
              <h3 className="uzum-subheading">Xususiyatlari va tafsilotlar</h3>
              <div className="uzum-specs-list">
                {product.specs.map((item, idx) => {
                  const parts = item.split(":");
                  return (
                    <div key={idx} className="uzum-spec-row">
                      <span className="uzum-spec-key">{parts[0]?.trim()}</span>
                      <span className="uzum-spec-dots"></span>
                      <span className="uzum-spec-val">{parts[1]?.trim() || parts[0]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sticky Bottom Actions inside Modal */}
          <div className="uzum-modal-actions-bar">
            <button
              type="button"
              className="uzum-btn-cart-lg"
              onClick={() => {
                for (let i = 0; i < qty; i++) {
                  onAddToCart(product);
                }
                onClose();
              }}
            >
              <i className="fa-solid fa-cart-shopping"></i>
              Savatga qoʻshish ({fmt(totalPrice)} soʻm)
            </button>
            <button
              type="button"
              className="uzum-btn-buy-now"
              onClick={() => {
                for (let i = 0; i < qty; i++) {
                  onAddToCart(product);
                }
                onClose();
                // Go to cart or checkout
                window.location.hash = "cart";
              }}
            >
              1 bosishda xarid
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
