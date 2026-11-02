import React from 'react';
import { AGRO_DATA } from '../data/agroData';
import { useLanguage } from '../context/LanguageContext';
import { fmt } from '../utils/helpers';

export default function HomePage({ onNavigate }) {
  const { t } = useLanguage();
  const tickerProducts = AGRO_DATA.products.slice(0, 4);

  return (
    <main id="top">
      {/* Hero Section */}
      <section className="hero">
        <div className="sun" aria-hidden="true"></div>
        <div className="container hero-inner">
          <span className="hero-badge">{t('hero_badge')}</span>
          <h1>{t('hero_title')}</h1>
          <p className="hero-sub">
            {t('hero_sub')}
          </p>

          <div className="hero-cta">
            <button 
              type="button"
              onClick={() => onNavigate('bozor')} 
              className="ag-btn ag-btn-yellow"
            >
              {t('hero_cta_market')}
            </button>
            <button 
              type="button"
              onClick={() => onNavigate('narxlar')} 
              className="ag-btn ag-btn-ghost"
            >
              {t('hero_cta_prices')}
            </button>
          </div>

          <div className="hero-stats">
            <div>
              <strong>{t('stat_farmers_count')}</strong>
              <span>{t('hero_stat_farmers')}</span>
            </div>
            <div>
              <strong>{t('stat_regions_val')}</strong>
              <span>{t('hero_stat_regions')}</span>
            </div>
            <div>
              <strong>{t('stat_daily_val')}</strong>
              <span>{t('hero_stat_daily')}</span>
            </div>
          </div>

          {/* Price Ticker */}
          <div className="ticker" id="priceTicker">
            {tickerProducts.map((p) => (
              <div 
                key={p.id} 
                className="ticker-card"
                onClick={() => onNavigate('narxlar')}
                style={{ cursor: 'pointer' }}
              >
                <span className="t-thumb">
                  <img src={p.img} alt={p.name} loading="lazy" />
                </span>
                <div>
                  <div className="t-name">{p.name}</div>
                  <div className="t-price">
                    {fmt(p.price)} {t('price_unit')}{' '}
                    <span className={AGRO_DATA.trendClass[p.trend]}>
                      {AGRO_DATA.trendIcon[p.trend]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Home Cards Section */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">{t('home_sections_kicker')}</span>
            <h2>{t('home_sections_title')}</h2>
            <p className="lead">{t('home_sections_lead')}</p>
          </div>

          <div className="cards-home" id="homeCards">
            {AGRO_DATA.homeCards.map((c) => (
              <button
                key={c.id}
                type="button"
                className="home-card text-left"
                onClick={() => onNavigate(c.href.replace('.html', ''))}
                style={{ 
                  backgroundImage: c.img ? `url("${c.img}")` : 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <span className="hc-emoji">{c.e}</span>
                <div>
                  <h3>{t(`card_${c.id}_title`, c.t)}</h3>
                  <p>{t(`card_${c.id}_desc`, c.d)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
