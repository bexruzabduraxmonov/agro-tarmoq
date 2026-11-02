import React, { useState } from 'react';
import { AGRO_DATA } from '../data/agroData';
import { useLanguage } from '../context/LanguageContext';

export default function AgronomPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDiseases = AGRO_DATA.diseases.filter((d) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase().trim();
    return (d.name + ' ' + d.crop + ' ' + d.sym + ' ' + d.cure).toLowerCase().includes(q);
  });

  return (
    <main id="top">
      <section id="agronom" className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">{t('agronom_kicker')}</span>
            <h2>{t('agronom_title')}</h2>
            <p className="lead">{t('agronom_lead')}</p>
          </div>

          {/* Search Bar */}
          <div style={{ maxWidth: '600px', marginBottom: '32px' }}>
            <div className="header-search" style={{ display: 'flex', width: '100%', borderRadius: 'var(--radius-sm)' }}>
              <input
                type="text"
                id="diseaseSearch"
                placeholder={t('search_placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ flex: 1, padding: '12px 18px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}
              />
            </div>
          </div>

          {/* Diseases Grid */}
          <div className="grid-cards" id="diseaseGrid">
            {filteredDiseases.length === 0 ? (
              <p className="empty" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--muted-color)' }}>
                {t('search_placeholder')}
              </p>
            ) : (
              filteredDiseases.map((d, idx) => (
                <article key={idx} className="ag-card">
                  <div className="card-media">
                    <img src={d.img} alt={d.name} loading="lazy" />
                  </div>

                  <div className="row">
                    <span className="tag tag-green">{d.emoji} {d.crop}</span>
                  </div>

                  <h3 className="card-title">{d.name}</h3>
                  
                  <div style={{ marginTop: '10px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#b4452f', marginBottom: '4px' }}>
                      {t('symptoms')}
                    </div>
                    <p className="sub" style={{ fontSize: '0.86rem', color: 'var(--text-color)' }}>
                      {d.sym}
                    </p>
                  </div>

                  <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-color)', marginBottom: '4px' }}>
                      {t('treatment')}
                    </div>
                    <p className="sub" style={{ fontSize: '0.86rem', color: 'var(--text-color)' }}>
                      {d.cure}
                    </p>
                  </div>
                </article>
              ))
            )}
          </div>

        </div>
      </section>
    </main>
  );
}
