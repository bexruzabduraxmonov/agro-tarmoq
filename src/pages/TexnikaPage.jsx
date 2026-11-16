import React, { useState } from 'react';
import { AGRO_DATA } from '../data/agroData';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { fmt } from '../utils/helpers';

export default function TexnikaPage({ onShowToast }) {
  const { t } = useLanguage();
  const { userEquip } = useUser();
  const [activeType, setActiveType] = useState('all');

  // Combine user-added rental machinery with base equipment catalog
  const allEquip = [...userEquip, ...AGRO_DATA.equip];

  const filteredEquip = allEquip.filter(
    (e) => activeType === 'all' || e.type === activeType
  );

  return (
    <main id="top">
      <section id="texnika" className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">{t('tech_kicker', 'Agrotexnika va Ijara')}</span>
            <h2>{t('tech_title', 'Texnika ijarasi')}</h2>
            <p className="lead">{t('tech_lead', 'Traktor, kombayn, dron va boshqa qishloq xoʻjaligi texnikalarini bevosita egalaridan ijaraga oling yoki oʻzingiznikini ijaraga bering.')}</p>
          </div>

          {/* Quick CTA to list tractor/machinery */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(21, 128, 61, 0.08), rgba(2, 132, 199, 0.08))',
            border: '1px solid var(--green-soft-border)',
            borderRadius: '18px',
            padding: '16px 22px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '1.8rem' }}>🚜</span>
              <div>
                <strong style={{ fontSize: '1rem', color: 'var(--text-color)' }}>
                  Oʻzingizning traktoringiz yoki texnikangiz bormi?
                </strong>
                <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--muted-color)' }}>
                  Shaxsiy profilingizda bir klikda eʼlon berib, ijaradan daromad oling!
                </p>
              </div>
            </div>

            <a
              href="#royxatdan-otish"
              className="ag-btn ag-btn-green ag-btn-sm"
              style={{ padding: '10px 18px', borderRadius: '12px', fontWeight: 700 }}
            >
              + Texnikani ijaraga berish
            </a>
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
                {typeItem[0] === 'all' ? t('all_categories', 'Barchasi') : (AGRO_DATA.eqLabel[typeItem[0]] || typeItem[1])}
              </button>
            ))}
          </div>

          {/* Equip Grid */}
          <div className="grid-cards" id="equipGrid">
            {filteredEquip.map((e, idx) => (
              <article key={e.id || idx} className="ag-card" style={{ position: 'relative' }}>
                <div className="card-media">
                  <img src={e.img} alt={e.name} loading="lazy" />
                  {e.isUserListing && (
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: '#16a34a',
                      color: '#ffffff',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(22, 163, 74, 0.4)'
                    }}>
                      🧑‍🌾 Fermer eʼloni
                    </span>
                  )}
                </div>

                <div className="row" style={{ marginTop: '10px' }}>
                  <span className="tag tag-blue">{AGRO_DATA.eqLabel[e.type] || e.type}</span>
                  {e.status === 'busy' && (
                    <span className="tag tag-yellow" style={{ marginLeft: '6px' }}>⏳ Band</span>
                  )}
                </div>

                <h3 className="card-title" style={{ marginTop: '8px' }}>{e.name}</h3>
                <p className="sub">{e.note}</p>
                <p className="sub">🧑‍🔧 {e.owner}</p>
                <p className="sub">📍 {e.region}</p>

                <div className="price-tag" style={{ marginTop: '14px' }}>
                  {fmt(e.price)} {t('price_unit', 'soʻm')} <span className="sub">/ {t('day_unit', 'kun')}</span>
                </div>

                <button
                  type="button"
                  className="ag-btn ag-btn-green ag-btn-sm"
                  style={{ marginTop: '14px', width: '100%', justifyContent: 'center' }}
                  onClick={() => onShowToast(`📞 ${e.owner}: ${e.phone}`)}
                >
                  📞 {t('order_tech', 'Aloqa / Buyurtma')}
                </button>
              </article>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
