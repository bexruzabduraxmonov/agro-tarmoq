import React, { useState, useEffect, useRef } from 'react';
import { AGRO_DATA } from '../data/agroData';
import { useLanguage } from '../context/LanguageContext';
import { fmt } from '../utils/helpers';
import ProductDetailModal from '../components/ProductDetailModal';

export default function SearchPage({ query = '', setQuery, onAddToCart, onNavigate }) {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all'); // all | products | tech | disease | news
  const [selectedProduct, setSelectedProduct] = useState(null);
  const inputRef = useRef(null);

  const currentQuery = query || '';
  const q = currentQuery.toLowerCase().trim();

  // Focus input automatically on mobile/desktop when opening search
  useEffect(() => {
    if (inputRef.current && !query) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    if (setQuery) {
      setQuery(val);
    }
  };

  const handleClear = () => {
    if (setQuery) {
      setQuery('');
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleChipClick = (keyword) => {
    if (setQuery) {
      setQuery(keyword);
    }
  };

  // Filter items matching query
  const matchedProducts = q ? AGRO_DATA.products.filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.farmer.toLowerCase().includes(q) || 
    p.region.toLowerCase().includes(q) ||
    p.cat.toLowerCase().includes(q) ||
    (AGRO_DATA.catLabel[p.cat] && AGRO_DATA.catLabel[p.cat].toLowerCase().includes(q))
  ) : [];

  const matchedEquip = q ? AGRO_DATA.equip.filter(e => 
    e.name.toLowerCase().includes(q) || 
    e.owner.toLowerCase().includes(q) || 
    e.note.toLowerCase().includes(q)
  ) : [];

  const matchedDiseases = q ? AGRO_DATA.diseases.filter(d => 
    d.name.toLowerCase().includes(q) || 
    d.crop.toLowerCase().includes(q) || 
    d.sym.toLowerCase().includes(q)
  ) : [];

  const matchedNews = q ? AGRO_DATA.news.filter(n => 
    n.title.toLowerCase().includes(q) || 
    n.text.toLowerCase().includes(q) || 
    n.cat.toLowerCase().includes(q)
  ) : [];

  const totalResults = matchedProducts.length + matchedEquip.length + matchedDiseases.length + matchedNews.length;

  // Popular search keywords
  const popularKeywords = [
    { label: '🍅 Pomidor', term: 'Pomidor' },
    { label: '🥔 Kartoshka', term: 'Kartoshka' },
    { label: '🚜 Traktor', term: 'Traktor' },
    { label: '🌾 Bugʻdoy', term: 'Bugʻdoy' },
    { label: '🥩 Mol goʻshti', term: 'Mol goʻshti' },
    { label: '🌱 Paxta', term: 'Paxta' },
    { label: '🍎 Olma', term: 'Olma' },
    { label: '🍇 Uzum', term: 'Uzum' },
    { label: '🥛 Sigir suti', term: 'Sigir suti' },
    { label: '🌽 Makkajoʻxori', term: 'Makkajoʻxori' },
    { label: '🛸 Dron', term: 'Dron' }
  ];

  // Recommended products when no search yet
  const trendingProducts = AGRO_DATA.products.slice(0, 8);

  return (
    <main id="top" className="search-page-container">
      <section className="section" style={{ paddingTop: '32px' }}>
        <div className="container" style={{ maxWidth: '980px' }}>
          
          {/* Main Search Input Bar */}
          <div className="search-bar-wrap">
            <div className="search-bar-input-box">
              <i className="fa-solid fa-magnifying-glass search-bar-icon"></i>
              <input
                ref={inputRef}
                type="text"
                className="search-main-input"
                placeholder={t('search_input_placeholder')}
                value={currentQuery}
                onChange={handleInputChange}
                aria-label={t('search_btn')}
              />
              {currentQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={handleClear}
                  aria-label="Tozalash"
                  title="Tozalash"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>
          </div>

          {/* Popular Search Chips */}
          <div className="search-popular-row">
            <span className="search-popular-title">{t('search_popular_title')}</span>
            <div className="search-chips-list">
              {popularKeywords.map((item) => (
                <button
                  key={item.term}
                  type="button"
                  className={`search-chip ${q === item.term.toLowerCase() ? 'active' : ''}`}
                  onClick={() => handleChipClick(item.term)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Query Entered State */}
          {q ? (
            <div style={{ marginTop: '28px' }}>
              
              {/* Category Filter Pills (Tabs) */}
              <div className="search-filters-bar">
                <button
                  type="button"
                  className={`chip ${activeFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('all')}
                >
                  {t('search_filter_all')} ({totalResults})
                </button>
                {matchedProducts.length > 0 && (
                  <button
                    type="button"
                    className={`chip ${activeFilter === 'products' ? 'active' : ''}`}
                    onClick={() => setActiveFilter('products')}
                  >
                    🛒 {t('search_filter_products')} ({matchedProducts.length})
                  </button>
                )}
                {matchedEquip.length > 0 && (
                  <button
                    type="button"
                    className={`chip ${activeFilter === 'tech' ? 'active' : ''}`}
                    onClick={() => setActiveFilter('tech')}
                  >
                    🚜 {t('search_filter_tech')} ({matchedEquip.length})
                  </button>
                )}
                {matchedDiseases.length > 0 && (
                  <button
                    type="button"
                    className={`chip ${activeFilter === 'disease' ? 'active' : ''}`}
                    onClick={() => setActiveFilter('disease')}
                  >
                    🌿 {t('search_filter_disease')} ({matchedDiseases.length})
                  </button>
                )}
                {matchedNews.length > 0 && (
                  <button
                    type="button"
                    className={`chip ${activeFilter === 'news' ? 'active' : ''}`}
                    onClick={() => setActiveFilter('news')}
                  >
                    📰 {t('search_filter_news')} ({matchedNews.length})
                  </button>
                )}
              </div>

              {/* Header result info */}
              <div style={{ margin: '22px 0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ fontSize: '1.05rem', color: 'var(--text-color)', fontWeight: 700 }}>
                  "{currentQuery}" — {totalResults} {t('search_results_found')}
                </div>
              </div>

              {/* No results for current query */}
              {totalResults === 0 && (
                <div className="search-not-found-card">
                  <div className="search-not-found-icon">🔍</div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '8px 0' }}>
                    "{currentQuery}" {t('search_not_found')}
                  </h3>
                  <p style={{ color: 'var(--muted-color)', fontSize: '0.92rem', maxWidth: '440px', margin: '0 auto 20px' }}>
                    Soʻzning toʻgʻri yozilganini tekshiring yoki yuqoridagi mashhur soʻzlardan birini tanlang.
                  </p>
                  <button
                    type="button"
                    className="ag-btn ag-btn-green ag-btn-sm"
                    onClick={handleClear}
                  >
                    Qidiruvni tozalash
                  </button>
                </div>
              )}

              {/* 1. Products Section */}
              {matchedProducts.length > 0 && (activeFilter === 'all' || activeFilter === 'products') && (
                <div style={{ marginBottom: '36px' }}>
                  <h3 className="search-section-title">
                    <span>🛒 {t('nav_bozor')}</span>
                    <span className="search-badge-count">{matchedProducts.length}</span>
                  </h3>
                  <div className="uzum-grid">
                    {matchedProducts.map((p) => (
                      <div
                        key={p.id}
                        className="uzum-card"
                        onClick={() => setSelectedProduct(p)}
                      >
                        <div className="uzum-card-img">
                          <img src={p.img} alt={p.name} loading="lazy" />
                          <div className="uzum-card-overlay">
                            <span>Batafsil</span>
                          </div>
                        </div>
                        <div className="uzum-card-body">
                          <div className="uzum-card-cat">{AGRO_DATA.catLabel[p.cat] || p.cat}</div>
                          <h3 className="uzum-card-name" title={p.name}>
                            <span>{p.emoji}</span> {p.name}
                          </h3>
                          <div className="uzum-card-rating-row">
                            <i className="fa-solid fa-star"></i>
                            <span className="rate-val">{p.rating || 4.9}</span>
                            <span className="rate-count">({p.reviewsCount || 120})</span>
                          </div>
                          <div className="uzum-card-monthly">
                            {fmt(Math.round((p.price * 1.12) / 6))} soʻm/oyiga
                          </div>
                          <div className="uzum-card-meta">
                            <i className="fa-solid fa-location-dot"></i>
                            <span className="truncate">{p.region.split(' ')[0]} • {p.farmer}</span>
                          </div>
                          <div className="uzum-card-footer">
                            <div>
                              <div className="uzum-card-price">
                                {fmt(p.price)} <span className="uzum-card-cur">soʻm</span>
                              </div>
                              <div className="uzum-card-unit">1 {p.unit}</div>
                            </div>
                            <button
                              type="button"
                              className="uzum-card-add"
                              onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart(p);
                              }}
                              aria-label="Savatga qoʻshish"
                              title="Savatga qoʻshish"
                            >
                              <i className="fa-solid fa-cart-plus"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Equipment Section */}
              {matchedEquip.length > 0 && (activeFilter === 'all' || activeFilter === 'tech') && (
                <div style={{ marginBottom: '36px' }}>
                  <h3 className="search-section-title">
                    <span>🚜 {t('nav_texnika')}</span>
                    <span className="search-badge-count">{matchedEquip.length}</span>
                  </h3>
                  <div className="grid-cards">
                    {matchedEquip.map((e, idx) => (
                      <article key={idx} className="ag-card">
                        <div className="card-media">
                          <img src={e.img} alt={e.name} loading="lazy" />
                        </div>
                        <h3 className="card-title" style={{ fontSize: '1.05rem' }}>{e.name}</h3>
                        <p className="sub" style={{ fontSize: '0.82rem', marginTop: '4px' }}>{e.note}</p>
                        <div className="price-tag" style={{ marginTop: '10px' }}>
                          {fmt(e.price)} {t('price_unit')} / {t('day_unit')}
                        </div>
                        <button
                          type="button"
                          className="ag-btn ag-btn-yellow ag-btn-sm"
                          style={{ marginTop: '12px', width: '100%', justifyContent: 'center' }}
                          onClick={() => onNavigate('texnika')}
                        >
                          <i className="fa-solid fa-phone" style={{ marginRight: '6px' }}></i>
                          {t('order_tech')}
                        </button>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Diseases Section */}
              {matchedDiseases.length > 0 && (activeFilter === 'all' || activeFilter === 'disease') && (
                <div style={{ marginBottom: '36px' }}>
                  <h3 className="search-section-title">
                    <span>🌿 {t('nav_agronom')}</span>
                    <span className="search-badge-count">{matchedDiseases.length}</span>
                  </h3>
                  <div className="grid-cards">
                    {matchedDiseases.map((d, idx) => (
                      <article key={idx} className="ag-card" style={{ cursor: 'pointer' }} onClick={() => onNavigate('agronom')}>
                        <div className="row" style={{ marginBottom: '6px' }}>
                          <span className="tag" style={{ background: '#fee2e2', color: '#991b1b' }}>
                            {d.crop}
                          </span>
                        </div>
                        <h3 className="card-title" style={{ fontSize: '1.05rem' }}>{d.name}</h3>
                        <p className="sub" style={{ fontSize: '0.84rem', marginTop: '6px', color: 'var(--muted-color)', lineHeight: 1.45 }}>
                          {d.sym}
                        </p>
                        <button
                          type="button"
                          className="ag-btn ag-btn-ghost ag-btn-sm"
                          style={{ marginTop: '12px', width: '100%', justifyContent: 'center' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate('agronom');
                          }}
                        >
                          Tavsiyani koʻrish →
                        </button>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. News Section */}
              {matchedNews.length > 0 && (activeFilter === 'all' || activeFilter === 'news') && (
                <div style={{ marginBottom: '36px' }}>
                  <h3 className="search-section-title">
                    <span>📰 {t('nav_yangiliklar')}</span>
                    <span className="search-badge-count">{matchedNews.length}</span>
                  </h3>
                  <div className="grid-cards">
                    {matchedNews.map((n, idx) => (
                      <article key={idx} className="ag-card" style={{ cursor: 'pointer' }} onClick={() => onNavigate('yangiliklar')}>
                        <span className="tag" style={{ background: 'var(--green-soft)', color: 'var(--primary-color)', alignSelf: 'flex-start', marginBottom: '8px' }}>
                          {n.cat}
                        </span>
                        <h3 className="card-title" style={{ fontSize: '1.05rem' }}>{n.title}</h3>
                        <p className="sub" style={{ fontSize: '0.84rem', marginTop: '6px', color: 'var(--muted-color)', lineHeight: 1.45 }}>
                          {n.text.slice(0, 110)}...
                        </p>
                        <button
                          type="button"
                          className="ag-btn ag-btn-ghost ag-btn-sm"
                          style={{ marginTop: '12px', width: '100%', justifyContent: 'center' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate('yangiliklar');
                          }}
                        >
                          Batafsil oʻqish →
                        </button>
                      </article>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ) : (
            /* When Query is Empty — Show Trending / Recommendations */
            <div style={{ marginTop: '36px' }}>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-color)' }}>
                  🔥 {t('search_trending_title')}
                </h3>
                <p style={{ color: 'var(--muted-color)', fontSize: '0.88rem', marginTop: '4px' }}>
                  Bozordagi eng xaridorgir qishloq xoʻjaligi mahsulotlari
                </p>
              </div>

              <div className="uzum-grid">
                {trendingProducts.map((p) => (
                  <div
                    key={p.id}
                    className="uzum-card"
                    onClick={() => setSelectedProduct(p)}
                  >
                    <div className="uzum-card-img">
                      <img src={p.img} alt={p.name} loading="lazy" />
                      <div className="uzum-card-overlay">
                        <span>Batafsil</span>
                      </div>
                    </div>
                    <div className="uzum-card-body">
                      <div className="uzum-card-cat">{AGRO_DATA.catLabel[p.cat] || p.cat}</div>
                      <h3 className="uzum-card-name" title={p.name}>
                        <span>{p.emoji}</span> {p.name}
                      </h3>
                      <div className="uzum-card-rating-row">
                        <i className="fa-solid fa-star"></i>
                        <span className="rate-val">{p.rating || 4.9}</span>
                        <span className="rate-count">({p.reviewsCount || 100})</span>
                      </div>
                      <div className="uzum-card-monthly">
                        {fmt(Math.round((p.price * 1.12) / 6))} soʻm/oyiga
                      </div>
                      <div className="uzum-card-meta">
                        <i className="fa-solid fa-location-dot"></i>
                        <span className="truncate">{p.region.split(' ')[0]} • {p.farmer}</span>
                      </div>
                      <div className="uzum-card-footer">
                        <div>
                          <div className="uzum-card-price">
                            {fmt(p.price)} <span className="uzum-card-cur">soʻm</span>
                          </div>
                          <div className="uzum-card-unit">1 {p.unit}</div>
                        </div>
                        <button
                          type="button"
                          className="uzum-card-add"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(p);
                          }}
                          aria-label="Savatga qoʻshish"
                          title="Savatga qoʻshish"
                        >
                          <i className="fa-solid fa-cart-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
