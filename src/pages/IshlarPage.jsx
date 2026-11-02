import React, { useState } from 'react';
import { AGRO_DATA } from '../data/agroData';
import { useLanguage } from '../context/LanguageContext';

export default function IshlarPage({ onShowToast }) {
  const { t } = useLanguage();
  const [activeType, setActiveType] = useState('all');

  const filteredJobs = AGRO_DATA.jobs.filter(
    (j) => activeType === 'all' || j.type === activeType
  );

  return (
    <main id="top">
      <section id="ishlar" className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">{t('jobs_kicker')}</span>
            <h2>{t('jobs_title')}</h2>
            <p className="lead">{t('jobs_lead')}</p>
          </div>

          {/* Filter Chips */}
          <div className="chips-row" style={{ marginBottom: '28px' }}>
            {AGRO_DATA.jobTypes.map((typeItem) => (
              <button
                key={typeItem[0]}
                type="button"
                className={`chip ${activeType === typeItem[0] ? 'active' : ''}`}
                onClick={() => setActiveType(typeItem[0])}
              >
                {typeItem[0] === 'all' ? t('all_categories') : typeItem[1]}
              </button>
            ))}
          </div>

          {/* Jobs Grid */}
          <div className="grid-cards">
            {filteredJobs.map((j, idx) => (
              <article key={idx} className="ag-card">
                <div className="card-media">
                  <img src={j.img} alt={j.title} loading="lazy" />
                </div>

                <div className="row">
                  <span className={`tag ${j.type === 'mavsumiy' ? 'tag-yellow' : 'tag-green'}`}>
                    {j.type === 'mavsumiy' ? '🌾 Mavsumiy' : '🏢 Doimiy'}
                  </span>
                </div>

                <h3 className="card-title">{j.title}</h3>
                <p className="sub">🏢 {j.company}</p>
                <p className="sub">📍 {j.region}</p>

                <p className="sub" style={{ marginTop: '8px', color: 'var(--text-color)', fontSize: '0.86rem' }}>
                  {j.desc}
                </p>

                <div className="price-tag" style={{ marginTop: '14px', color: 'var(--primary-color)' }}>
                  {j.pay}
                </div>

                <button
                  type="button"
                  className="ag-btn ag-btn-green ag-btn-sm"
                  style={{ marginTop: '14px' }}
                  onClick={() => onShowToast(`"${j.title}" ✓`)}
                >
                  📝 {t('apply_job')}
                </button>
              </article>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
