import React, { useState } from "react";
import { AGRO_DATA } from "../data/agroData";
import { useLanguage } from "../context/LanguageContext";
import { fmt } from "../utils/helpers";

export default function ProductDetailModal({ product, onClose, onAddToCart }) {
  const { t, lang } = useLanguage();
  const [qty, setQty] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!product) return null;

  const trendMap = {
    "1":  { icon: "▲", cls: "trend-up",   label: t('trend_label_up') || "Narx oshmoqda" },
    "-1": { icon: "▼", cls: "trend-down", label: t('trend_label_down') || "Narx tushmoqda" },
    "0":  { icon: "■", cls: "",           label: t('trend_label_stable') || "Barqaror narx" },
  };

  const trend = trendMap[String(product.trend)];
  const catLabel = (AGRO_DATA.catLabel && product.cat && AGRO_DATA.catLabel[product.cat]) || product.cat || 'Mahsulot';
  const rating = product.rating || 4.9;
  const reviewsCount = product.reviewsCount || 128;
  const totalPrice = product.price * qty;
  const monthlyPrice = Math.round((product.price * 1.12) / 6);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `${product.name} — Agro Tarmoq (${fmt(product.price)} ${t('price_unit')})`,
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
            aria-label="Wishlist"
          >
            <i className={isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
          </button>
          <button 
            type="button" 
            className="uzum-icon-circle"
            onClick={handleShare}
            aria-label="Share"
          >
            <i className={copied ? "fa-solid fa-check" : "fa-solid fa-share-nodes"}></i>
          </button>
          <button 
            type="button" 
            className="uzum-modal-close" 
            onClick={onClose} 
            aria-label={t('menu_close')}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Product Image Header with Trend Tag */}
        <div className="uzum-modal-image">
          <img 
            src={product.img || product.image} 
            alt={product.name || product.title} 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80';
            }}
          />
          {trend && (
            <span className={`uzum-modal-badge ${trend.cls}`}>
              {trend.icon} {trend.label}
            </span>
          )}
          <span className="uzum-modal-views-badge">
            <i className="fa-regular fa-eye"></i> 1.4k {t('modal_views')}
          </span>
        </div>

        {/* Product Body */}
        <div className="uzum-modal-body">
          {/* Breadcrumb / Category */}
          <div className="uzum-modal-cat-row">
            <span className="uzum-modal-category">{t(`cat_${product.cat}`, catLabel)}</span>
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
            <span className="uzum-modal-reviews-count">({reviewsCount} {t('modal_reviews')})</span>
            <span className="uzum-modal-dot">•</span>
            <span className="uzum-modal-sold-count">{t('modal_orders')}</span>
          </div>

          {/* Price Box — Uzum Style */}
          <div className="uzum-modal-price-card">
            <div className="uzum-price-main">
              <span className="uzum-price-val">{fmt(totalPrice)}</span>
              <span className="uzum-price-cur">{t('price_unit')}</span>
              <span className="uzum-price-per">/ {qty > 1 ? `${qty} ${product.unit}` : product.unit}</span>
            </div>
            {/* Installment Badge */}
            <div className="uzum-installment-tag">
              <span className="inst-badge">{t('modal_installment')}</span>
              <span className="inst-text">
                {t('modal_installment_per_month')} <strong>{fmt(monthlyPrice)} {t('price_unit')}</strong> {t('modal_installment_for')}
              </span>
            </div>
          </div>

          {/* Delivery & Assurance Cards */}
          <div className="uzum-delivery-box">
            <div className="uzum-delivery-item">
              <div className="uzum-del-icon green">
                <i className="fa-solid fa-truck-fast"></i>
              </div>
              <div className="uzum-del-content">
                <div className="uzum-del-title">{t('modal_fast_delivery')}</div>
                <div className="uzum-del-desc">{t('modal_fast_delivery_desc')}</div>
              </div>
            </div>
            <div className="uzum-delivery-item">
              <div className="uzum-del-icon amber">
                <i className="fa-solid fa-shield-check"></i>
              </div>
              <div className="uzum-del-content">
                <div className="uzum-del-title">{t('modal_quality_guarantee')}</div>
                <div className="uzum-del-desc">{t('modal_quality_guarantee_desc')}</div>
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="uzum-qty-row">
            <span className="uzum-qty-label">{t('modal_qty')} ({product.unit}):</span>
            <div className="uzum-qty-counter">
              <button 
                type="button" 
                onClick={() => setQty(Math.max(1, qty - 1))}
                disabled={qty <= 1}
                aria-label="Decrease"
              >
                <i className="fa-solid fa-minus"></i>
              </button>
              <span className="qty-val">{qty}</span>
              <button 
                type="button" 
                onClick={() => setQty(qty + 1)}
                aria-label="Increase"
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
              <i className="fa-solid fa-certificate"></i> {t('modal_verified_farmer')}
            </div>
          </div>

          {/* Description */}
          {product.desc && (
            <div className="uzum-desc-section">
              <h3 className="uzum-subheading">{t('modal_about_product') || "Mahsulot haqida"}</h3>
              <p className="uzum-desc-text">{product.desc}</p>
            </div>
          )}

          {/* Foydalanish va Agrotexnik Qo'llanma (Instruction / Manual) */}
          <div className="uzum-desc-section" style={{ background: '#f0fdf4', padding: '16px', borderRadius: '16px', border: '1px solid #bbf7d0', marginTop: '16px' }}>
            <h3 className="uzum-subheading" style={{ color: '#166534', display: 'flex', itemsCenter: 'center', gap: '8px', marginBottom: '10px' }}>
              <span>📋 Qo'llanma va Saqlash / Foydalanish qoidalari</span>
            </h3>
            <div style={{ fontSize: '0.88rem', color: '#14532d', lineHeight: '1.6' }}>
              {product.cat === 'uruglar' || product.cat === 'urug' ? (
                <div>
                  <p style={{ margin: '0 0 6px' }}><strong>🌱 Ekish chuqurligi:</strong> 1.5 - 2.5 sm chuqurlikda nam tuproqqa ekiladi.</p>
                  <p style={{ margin: '0 0 6px' }}><strong>🌡 Harorat:</strong> Tuproq harorati +14°C dan yuqori bo'lganda tez unib chiqadi.</p>
                  <p style={{ margin: '0 0 6px' }}><strong>💧 Sug'orish:</strong> Unib chiqqunga qadar tuproq yuzasi qurib qolmasligi zarur.</p>
                  <p style={{ margin: 0 }}><strong>📦 Saqlash:</strong> Quruq, qorong'u va salqin (10-15°C) xonada saqlansin.</p>
                </div>
              ) : product.cat === 'ogitlar' || product.cat === 'mineral_ogit' || product.cat === 'organik_ogit' || product.cat === 'himoya' ? (
                <div>
                  <p style={{ margin: '0 0 6px' }}><strong>🧪 Qo'llash me'yori:</strong> 10 litr suvga 25-30 gr aralashtirib tomir yoki barg orqali sepiladi.</p>
                  <p style={{ margin: '0 0 6px' }}><strong>⏰ Qulay vaqt:</strong> Quyosh botgandan so'ng yoki erta tongda sepish tavsiya etiladi.</p>
                  <p style={{ margin: '0 0 6px' }}><strong>🛡 Xavfsizlik:</strong> Rezina qo'lqop va respirator niqobdan foydalaning.</p>
                  <p style={{ margin: 0 }}><strong>📦 Saqlash:</strong> Bolalar yetmaydigan, quruq va yopiq idishda saqlansin.</p>
                </div>
              ) : product.cat === 'texnika' ? (
                <div>
                  <p style={{ margin: '0 0 6px' }}><strong>⚙️ Ishga tushirish:</strong> Moy va sovutish suyuqligi sathi har smena oldidan tekshiriladi.</p>
                  <p style={{ margin: '0 0 6px' }}><strong>⛽ Yoqilg'i:</strong> Tozalangan dizel yoki standart moylash moylaridan foydalaning.</p>
                  <p style={{ margin: 0 }}><strong>🛠 Texnik xizmat:</strong> Har 50 moto-soatda havo filtri va shlanglar ko'rikdan o'tkaziladi.</p>
                </div>
              ) : (
                <div>
                  <p style={{ margin: '0 0 6px' }}><strong>❄️ Saqlash sharoiti:</strong> +4°C dan +10°C gacha salqin, qorong'u va shamollatiladigan joyda saqlang.</p>
                  <p style={{ margin: '0 0 6px' }}><strong>⏳ Yangilik muddati:</strong> Terilgandan so'ng 10-14 kun davomida tabiiy xususiyatini to'liq saqlaydi.</p>
                  <p style={{ margin: '0 0 6px' }}><strong>🥗 Tavsiya:</strong> Iste'mol qilishdan oldin oqar toza suvda yuvib oling.</p>
                  <p style={{ margin: 0 }}><strong>🚚 Tashish:</strong> Mahsulot ezilmasligi uchun qattiq yashik yoki to'r qoplarda tashiladi.</p>
                </div>
              )}
            </div>
          </div>

          {/* Specifications Table */}
          {product.specs && product.specs.length > 0 && (
            <div className="uzum-specs-section">
              <h3 className="uzum-subheading">{t('modal_specs')}</h3>
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
              {t('add_to_cart')} ({fmt(totalPrice)} {t('price_unit')})
            </button>
            <button
              type="button"
              className="uzum-btn-buy-now"
              onClick={() => {
                for (let i = 0; i < qty; i++) {
                  onAddToCart(product);
                }
                onClose();
                window.location.hash = "cart";
              }}
            >
              {t('checkout_btn')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
