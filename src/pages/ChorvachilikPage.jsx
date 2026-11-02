import React, { useState } from 'react';
import { AGRO_DATA } from '../data/agroData';
import { useLanguage } from '../context/LanguageContext';

export default function ChorvachilikPage({ onShowToast }) {
  const { t } = useLanguage();
  const [selectedAnimal, setSelectedAnimal] = useState('sigir');

  const vaccinesList = AGRO_DATA.vaccines[selectedAnimal] || AGRO_DATA.vaccines.sigir;
  const marketList = AGRO_DATA.livestockMarket[selectedAnimal] || AGRO_DATA.livestockMarket.sigir;

  return (
    <main id="top">
      <section id="chorvachilik" className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">{t('livestock_kicker')}</span>
            <h2>{t('livestock_title')}</h2>
            <p className="lead">{t('livestock_lead')}</p>
          </div>

          {/* Animal Selector */}
          <div className="chips-row" style={{ marginBottom: '28px' }}>
            {AGRO_DATA.animals.map((a) => (
              <button
                key={a[0]}
                type="button"
                className={`chip ${selectedAnimal === a[0] ? 'active' : ''}`}
                onClick={() => setSelectedAnimal(a[0])}
              >
                {a[1]}
              </button>
            ))}
          </div>

          {/* Two Tables Layout */}
          <div className="price-layout" style={{ marginBottom: '40px' }}>
            {/* Vaccination Table */}
            <div className="table-box">
              <h3 style={{ fontSize: '1.05rem', marginBottom: '14px' }}>
                💉 {t('vaccine_calendar')}
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table className="ag-table">
                  <thead>
                    <tr>
                      <th>Kasallik / Болезнь / Disease</th>
                      <th>Yoshi / Возраст / Age</th>
                      <th>Davriyligi / Частота / Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vaccinesList.map((v, idx) => (
                      <tr key={idx}>
                        <td><strong>{v.v}</strong></td>
                        <td>{v.age}</td>
                        <td style={{ color: 'var(--primary-color)', fontWeight: 700 }}>{v.per}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Livestock Market Prices */}
            <div className="table-box">
              <h3 style={{ fontSize: '1.05rem', marginBottom: '14px' }}>
                🏷️ {t('market_prices')}
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table className="ag-table">
                  <thead>
                    <tr>
                      <th>Turi / Yoshi</th>
                      <th>{t('current_avg_price')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketList.map((m, idx) => (
                      <tr key={idx}>
                        <td><strong>{m.n}</strong></td>
                        <td style={{ fontWeight: 800, color: 'var(--primary-color)' }}>{m.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Vets Section */}
          <div className="section-head" style={{ marginTop: '20px' }}>
            <span className="kicker">{t('livestock_kicker')}</span>
            <h2>{t('vets_list')}</h2>
            <p className="lead">{t('livestock_lead')}</p>
          </div>

          <div className="grid-cards">
            {AGRO_DATA.vets.map((vet, idx) => (
              <article key={idx} className="ag-card">
                <div className="card-media">
                  <img src={vet.img} alt={vet.name} loading="lazy" />
                </div>

                <div className="row">
                  <span className="tag tag-green">⭐ {vet.rating}</span>
                </div>

                <h3 className="card-title">{vet.name}</h3>
                <p className="sub">🩺 {vet.spec}</p>
                <p className="sub">📍 {vet.region}</p>

                <button
                  type="button"
                  className="ag-btn ag-btn-green ag-btn-sm"
                  style={{ marginTop: '14px' }}
                  onClick={() => onShowToast(`${vet.name} — ${vet.phone}`)}
                >
                  📞 {vet.phone}
                </button>
              </article>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
