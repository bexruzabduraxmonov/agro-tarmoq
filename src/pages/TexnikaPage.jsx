import React, { useState } from 'react';
import { AGRO_DATA } from '../data/agroData';
import { useLanguage } from '../context/LanguageContext';
import { fmt } from '../utils/helpers';

export default function TexnikaPage({ onShowToast }) {
  const { t } = useLanguage();
  const [activeType, setActiveType] = useState('all');

  const filteredEquip = AGRO_DATA.equip.filter(
    (e) => activeType === 'all' || e.type === activeType
  );

  return (
    <main id="top">
      <section id="texnika" className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">{t('tech_kicker')}</span>
            <h2>{t('tech_title')}</h2>
            <p className="lead">{t('tech_lead')}</p>
          </div>

          {/* Filter Chips */}
          <div className="chips-row" id="equipFilters" style={{ marginBottom: '28px' }}>
            {AGRO_DATA.eqTypes.map((typeItem) => (
              <button
                key={typeItem[0]}
                type="button"
                className={`chip ${activeType === typeItem[0] ? 'active' : ''}`}
                onClick={() => setActiveType(typeItem[0])}
              >
                {typeItem[0] === 'all' ? t('all_categories') : (AGRO_DATA.eqLabel[typeItem[0]] || typeItem[1])}
              </button>
            ))}
          </div>

          {/* Equip Grid */}
          <div className="grid-cards" id="equipGrid">
            {filteredEquip.map((e, idx) => (
              <article key={idx} className="ag-card">
                <div className="card-media">
                  <img src={e.img} alt={e.name} loading="lazy" />
                </div>

                <div className="row">
                  <span className="tag tag-blue">{AGRO_DATA.eqLabel[e.type] || e.type}</span>
                </div>

                <h3 className="card-title">{e.name}</h3>
                <p className="sub">{e.note}</p>
                <p className="sub">🧑‍🔧 {e.owner}</p>
                <p className="sub">📍 {e.region}</p>

                <div className="price-tag" style={{ marginTop: '14px' }}>
                  {fmt(e.price)} {t('price_unit')} <span className="sub">/ {t('day_unit')}</span>
                </div>

                <button
                  type="button"
                  className="ag-btn ag-btn-green ag-btn-sm"
                  style={{ marginTop: '14px' }}
                  onClick={() => onShowToast(`${e.owner} — ${e.phone}`)}
                >
                  📞 {t('order_tech')}
                </button>
              </article>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
