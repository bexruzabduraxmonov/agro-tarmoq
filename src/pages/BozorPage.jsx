import React, { useState } from 'react';
import { AGRO_DATA } from '../data/agroData';
import { useLanguage } from '../context/LanguageContext';
import { fmt } from '../utils/helpers';

export default function BozorPage({ onAddToCart }) {
  const { t } = useLanguage();
  const [activeCat, setActiveCat] = useState('all');

  const filteredProducts = AGRO_DATA.products.filter(
    (p) => activeCat === 'all' || p.cat === activeCat
  );

  return (
    <main id="top">
      <section id="bozor" className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">{t('market_kicker')}</span>
            <h2>{t('market_title')}</h2>
            <p className="lead">{t('market_lead')}</p>
          </div>

          {/* Filter Chips */}
          <div className="chips-row" id="marketFilters" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
            {AGRO_DATA.cats.map((c) => (
              <button
                key={c[0]}
                type="button"
                className={`chip ${activeCat === c[0] ? 'active' : ''}`}
                onClick={() => setActiveCat(c[0])}
              >
                {t(`cat_${c[0]}`, c[1])}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid-cards" id="marketGrid">
            {filteredProducts.map((p) => (
              <article key={p.id} className="ag-card">
                <div className="card-media">
                  <img src={p.img} alt={p.name} loading="lazy" />
                </div>
                
                <div className="row">
                  <span className="tag tag-green">{t(`cat_${p.cat}`, AGRO_DATA.catLabel[p.cat])}</span>
                  <span 
                    className={AGRO_DATA.trendClass[p.trend]} 
                    style={{ fontWeight: 800 }}
                  >
                    {AGRO_DATA.trendIcon[p.trend]}
                  </span>
                </div>

                <h3 className="card-title">{p.name}</h3>
                <p className="sub">🧑‍🌾 {p.farmer}</p>
                <p className="sub">📍 {p.region}</p>

                <div className="row" style={{ marginTop: '14px' }}>
                  <div>
                    <div className="price-tag">{fmt(p.price)} {t('price_unit')}</div>
                    <span className="sub">{t('for_unit').replace('{unit}', p.unit)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="ag-btn ag-btn-green ag-btn-sm"
                  style={{ marginTop: '14px' }}
                  onClick={() => onAddToCart(p)}
                >
                  {t('add_to_cart')}
                </button>
              </article>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
