import React, { useState } from 'react';
import { AGRO_DATA } from '../data/agroData';
import { useLanguage } from '../context/LanguageContext';

export default function YangiliklarPage() {
  const { t } = useLanguage();
  const [activeType, setActiveType] = useState('all');

  const filteredNews = AGRO_DATA.news.filter(
    (n) => activeType === 'all' || n.cat === activeType
  );

  return (
    <main id="top">
      <section id="yangiliklar" className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">{t('news_kicker')}</span>
            <h2>{t('news_title')}</h2>
            <p className="lead">{t('news_lead')}</p>
          </div>

          {/* Filter Chips */}
          <div className="chips-row" style={{ marginBottom: '28px' }}>
            {AGRO_DATA.newsTypes.map((typeItem) => (
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

          {/* News Grid */}
          <div className="grid-cards">
            {filteredNews.map((n, idx) => (
              <article key={idx} className="ag-card">
                <div className="card-media">
                  <img src={n.img} alt={n.title} loading="lazy" />
                </div>

                <div className="row">
                  <span className="tag tag-green">{n.emoji} {n.cat}</span>
                  <span className="sub" style={{ fontSize: '0.78rem' }}>📅 {n.date}</span>
                </div>

                <h3 className="card-title">{n.title}</h3>

                <p className="sub" style={{ marginTop: '10px', color: 'var(--text-color)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {n.text}
                </p>
              </article>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
