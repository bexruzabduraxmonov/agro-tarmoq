import React, { useState } from 'react';
import { AGRO_DATA } from '../data/agroData';
import { useLanguage } from '../context/LanguageContext';
import { fmt } from '../utils/helpers';

export default function DokonPage({ onShowToast }) {
  const { t } = useLanguage();
  const [activeCat, setActiveCat] = useState('all');

  const filteredShop = AGRO_DATA.shop.filter(
    (item) => activeCat === 'all' || item.cat === activeCat
  );

  return (
    <main id="top">
      <section id="dokon" className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">{t('shop_kicker')}</span>
            <h2>{t('shop_title')}</h2>
            <p className="lead">{t('shop_lead')}</p>
          </div>

          {/* Filter Chips */}
          <div className="chips-row" style={{ marginBottom: '28px' }}>
            <button
              type="button"
              className={`chip ${activeCat === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCat('all')}
            >
              {t('all_categories')}
            </button>
            {Object.keys(AGRO_DATA.shopCat).map((catKey) => (
              <button
                key={catKey}
                type="button"
                className={`chip ${activeCat === catKey ? 'active' : ''}`}
                onClick={() => setActiveCat(catKey)}
              >
                {t(`cat_${catKey}`, AGRO_DATA.shopCat[catKey])}
              </button>
            ))}
          </div>

          {/* Shop Products Grid */}
          <div className="grid-cards">
            {filteredShop.map((item, idx) => (
              <article key={idx} className="ag-card">
                <div className="card-media">
                  <img src={item.img} alt={item.name} loading="lazy" />
                </div>

                <div className="row">
                  <span className="tag tag-green">{item.emoji} {t(`cat_${item.cat}`, AGRO_DATA.shopCat[item.cat])}</span>
                </div>

                <h3 className="card-title">{item.name}</h3>

                <div style={{ marginTop: '14px', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                  <div className="sub" style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>
                    {t('compare_stores')}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {item.offers.map((off, oIdx) => (
                      <div 
                        key={oIdx} 
                        style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          padding: '6px 10px',
                          background: oIdx === 0 ? 'var(--green-soft)' : 'var(--background-color)',
                          borderRadius: '8px',
                          fontSize: '0.85rem'
                        }}
                      >
                        <div>
                          <strong>{off.store}</strong>
                          <span style={{ fontSize: '0.75rem', color: '#e0a516', marginLeft: '6px' }}>
                            ⭐ {off.rating}
                          </span>
                        </div>
                        <div style={{ fontWeight: 800, color: 'var(--primary-color)' }}>
                          {fmt(off.price)} {t('price_unit')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className="ag-btn ag-btn-green ag-btn-sm"
                  style={{ marginTop: '16px', width: '100%' }}
                  onClick={() => onShowToast(`${item.name} — ${item.offers[0].store} (${fmt(item.offers[0].price)} ${t('price_unit')})`)}
                >
                  🛒 {t('add_to_cart')}
                </button>
              </article>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
