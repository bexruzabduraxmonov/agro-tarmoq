import React, { useState, useEffect, useCallback } from 'react';
import { AGRO_DATA } from '../data/agroData';
import { useLanguage } from '../context/LanguageContext';
import { fmt, getProductMarketPrice, getTodayFormatted } from '../utils/helpers';

// ─── HeroSlider komponenti ─────────────────────────────────────────────────
function HeroSlider({ onNavigate }) {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const slides = [
    {
      id: 1,
      bg: 'https://files.cdn-files-a.com/admin/system_photos_stock/2000_69757996f1a68.jpg?format=avif',
      title: t('slide_1_title'),
      sub: t('slide_1_sub'),
      card: {
        badge: t('slide_1_badge'),
        badgeColor: '#f59e0b',
        title: t('slide_1_card_title'),
        desc: t('slide_1_card_desc'),
        btn: t('slide_1_card_btn'),
        href: 'texnika',
      },
    },
    {
      id: 2,
      bg: 'https://files.cdn-files-a.com/admin/system_photos_stock/2000_6af568c249666.jpg?format=avif',
      title: t('slide_2_title'),
      sub: t('slide_2_sub'),
      card: {
        badge: t('slide_2_badge'),
        badgeColor: '#22c55e',
        title: t('slide_2_card_title'),
        desc: t('slide_2_card_desc'),
        btn: t('slide_2_card_btn'),
        href: 'dokon',
      },
    },
    {
      id: 3,
      bg: 'https://files.cdn-files-a.com/admin/system_photos_stock/2000_6970e9d133c02.jpg?format=avif',
      title: t('slide_3_title'),
      sub: t('slide_3_sub'),
      card: {
        badge: t('slide_3_badge'),
        badgeColor: '#6366f1',
        title: t('slide_3_card_title'),
        desc: t('slide_3_card_desc'),
        btn: t('slide_3_card_btn'),
        href: 'narxlar',
      },
    },
    {
      id: 4,
      bg: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1600&q=80',
      title: t('slide_4_title'),
      sub: t('slide_4_sub'),
      card: {
        badge: t('slide_4_badge'),
        badgeColor: '#f43f5e',
        title: t('slide_4_card_title'),
        desc: t('slide_4_card_desc'),
        btn: t('slide_4_card_btn'),
        href: 'chorvachilik',
      },
    },
  ];

  const goTo = useCallback((idx) => {
    if (animating) return;
    setAnimating(true);
    setCurrent((idx + slides.length) % slides.length);
    setTimeout(() => setAnimating(false), 500);
  }, [animating, slides.length]);

  // Auto-slide har 5 soniyada
  useEffect(() => {
    const timer = setInterval(() => goTo(current + 1), 5000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const s = slides[current];
  const tagLineText = t('tag_line') || 'Fermer · Xaridor · Texnika egasi · Agronom';

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden', borderRadius: '0' }}>
      {/* Background image */}
      <div
        key={s.id}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '420px',
          backgroundImage: `url(${s.bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 0.5s ease',
        }}
      >
        {/* Dark overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 100%)',
        }} />

        {/* Content row */}
        <div style={{
          position: 'relative', zIndex: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '48px 48px 80px',
          minHeight: '420px',
          gap: '24px',
        }}>
          {/* Left — title */}
          <div style={{ flex: '1 1 55%', color: '#fff' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              margin: '0 0 12px',
              color: '#fff',
              textShadow: '0 2px 12px rgba(0,0,0,0.5)',
            }}>
              {s.title}
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'rgba(255,255,255,0.88)',
              margin: 0,
              whiteSpace: 'pre-line',
              fontWeight: 400,
              textShadow: '0 1px 6px rgba(0,0,0,0.4)',
            }}>
              {s.sub}
            </p>
          </div>

          {/* Right — floating card */}
          <div style={{
            flex: '0 0 auto',
            width: '260px',
            background: 'rgba(10,10,10,0.72)',
            backdropFilter: 'blur(14px)',
            borderRadius: '20px',
            padding: '24px 20px',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}>
            <span style={{
              display: 'inline-block',
              background: s.card.badgeColor,
              color: '#000',
              borderRadius: '20px',
              padding: '3px 12px',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.5px',
              marginBottom: '12px',
            }}>
              {s.card.badge}
            </span>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: 800,
              margin: '0 0 10px',
              color: '#fff',
              lineHeight: 1.25,
              whiteSpace: 'pre-line',
            }}>
              {s.card.title}
            </h3>
            <p style={{
              fontSize: '0.82rem',
              color: 'rgba(255,255,255,0.72)',
              margin: '0 0 18px',
              lineHeight: 1.5,
            }}>
              {s.card.desc}
            </p>
            <button
              type="button"
              onClick={() => onNavigate(s.card.href)}
              style={{
                width: '100%',
                background: s.card.badgeColor,
                color: '#000',
                border: 'none',
                borderRadius: '28px',
                padding: '11px 0',
                fontSize: '14px',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              {s.card.btn} →
            </button>
          </div>
        </div>

        {/* Prev arrow */}
        <button
          type="button"
          aria-label="Oldingi"
          onClick={() => goTo(current - 1)}
          style={{
            position: 'absolute', left: '16px', top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: '50%',
            width: '42px', height: '42px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: '22px', cursor: 'pointer', zIndex: 5,
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
        >‹</button>

        {/* Next arrow */}
        <button
          type="button"
          aria-label="Keyingi"
          onClick={() => goTo(current + 1)}
          style={{
            position: 'absolute', right: '16px', top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: '50%',
            width: '42px', height: '42px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: '22px', cursor: 'pointer', zIndex: 5,
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
        >›</button>

        {/* Pagination dots */}
        <div style={{
          position: 'absolute', bottom: '20px', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', gap: '8px', zIndex: 5,
        }}>
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Slayd ${i + 1}`}
              style={{
                width: i === current ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === current ? '#fff' : 'rgba(255,255,255,0.45)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>
      </div>

      {/* Tag line marquee */}
      <div style={{
        background: 'rgba(0,0,0,0.85)',
        padding: '10px 0',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}>
        <div style={{
          display: 'inline-block',
          animation: 'marquee-scroll 20s linear infinite',
          color: 'rgba(255,255,255,0.7)',
          fontSize: '13px',
          fontWeight: 500,
          letterSpacing: '0.3px',
        }}>
          🌱 {tagLineText} &nbsp;&nbsp;&nbsp; 🌱 {tagLineText}
        </div>
        <style>{`
          @keyframes marquee-scroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </div>
  );
}

// ─── HomePage ──────────────────────────────────────────────────────────────
export default function HomePage({ onNavigate }) {
  const { t } = useLanguage();
  const tickerProducts = AGRO_DATA.products.slice(0, 4);

  return (
    <main id="top">
      {/* ── Hero Slider ── */}
      <HeroSlider onNavigate={onNavigate} />

      {/* Hero Section (badge, title, stats, ticker) */}
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

          {/* Daily Price Ticker Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '24px', marginBottom: '-14px' }}>
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              fontSize: '0.8rem', 
              fontWeight: 700, 
              color: 'var(--primary-dark)', 
              background: 'var(--green-soft)', 
              padding: '4px 14px', 
              borderRadius: '999px', 
              border: '1px solid var(--green-soft-border)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }}></span>
              {t('today_market_prices') || 'Bugungi bozor narxlari:'} {getTodayFormatted()}
            </span>
          </div>

          {/* Price Ticker */}
          <div className="ticker" id="priceTicker">
            {tickerProducts.map((p) => {
              const curPrice = getProductMarketPrice(p.price, 0, 0);
              const prevPrice = getProductMarketPrice(p.price, 0, 1);
              const diff = curPrice - prevPrice;
              const trendIcon = diff > 0 ? '▲' : (diff < 0 ? '▼' : '▬');
              const trendClass = diff > 0 ? 'up' : (diff < 0 ? 'down' : 'stable');

              return (
                <div 
                  key={p.id} 
                  className="ticker-card"
                  onClick={() => onNavigate('narxlar')}
                  style={{ cursor: 'pointer' }}
                  title={`${p.name}: ${fmt(curPrice)} ${t('price_unit')}`}
                >
                  <span className="t-thumb">
                    <img src={p.img} alt={p.name} loading="lazy" />
                  </span>
                  <div>
                    <div className="t-name">{p.name}</div>
                    <div className="t-price">
                      {fmt(curPrice)} {t('price_unit')}{' '}
                      <span className={trendClass}>
                        {trendIcon}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── Key Platform Steps / Capabilities (Including Step 3: AI Agronom) ── */}
      <section className="section" style={{ paddingTop: '10px', paddingBottom: '36px' }}>
        <div className="container">
          <div className="section-head" style={{ marginBottom: '28px' }}>
            <span className="kicker">{t('steps_kicker')}</span>
            <h2>{t('steps_title')}</h2>
            <p className="lead">{t('steps_lead')}</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px'
          }}>
            {/* Step 1: Market & Prices */}
            <div 
              onClick={() => onNavigate('bozor')}
              style={{
                background: 'var(--surface-color)',
                border: '1px solid var(--border-color)',
                borderRadius: '18px',
                padding: '24px 20px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'var(--primary-color)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
            >
              <div>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: '#22c55e',
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(34,197,94,0.3)',
                  marginBottom: '14px'
                }}>
                  1
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 6px', color: 'var(--text-color)' }}>
                  {t('step_1_title')}
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--muted-color)', margin: 0, lineHeight: 1.5 }}>
                  {t('step_1_desc')}
                </p>
              </div>
              <div style={{ marginTop: '16px', fontSize: '0.82rem', fontWeight: 700, color: '#22c55e' }}>
                {t('hero_cta_market')} →
              </div>
            </div>

            {/* Step 2: Machinery */}
            <div 
              onClick={() => onNavigate('texnika')}
              style={{
                background: 'var(--surface-color)',
                border: '1px solid var(--border-color)',
                borderRadius: '18px',
                padding: '24px 20px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#6366f1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
            >
              <div>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: '#6366f1',
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(99,102,241,0.3)',
                  marginBottom: '14px'
                }}>
                  2
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 6px', color: 'var(--text-color)' }}>
                  {t('step_2_title')}
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--muted-color)', margin: 0, lineHeight: 1.5 }}>
                  {t('step_2_desc')}
                </p>
              </div>
              <div style={{ marginTop: '16px', fontSize: '0.82rem', fontWeight: 700, color: '#6366f1' }}>
                {t('slide_1_card_btn')} →
              </div>
            </div>

            {/* Step 3: Exact AI Agronom Card Matching User Screenshot */}
            <div 
              onClick={() => onNavigate('agronom')}
              style={{
                background: 'var(--surface-color)',
                border: '2px solid rgba(217, 119, 6, 0.5)',
                borderRadius: '18px',
                padding: '24px 20px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 6px 20px rgba(217,119,6,0.12)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#d97706';
                e.currentTarget.style.boxShadow = '0 10px 28px rgba(217,119,6,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(217, 119, 6, 0.5)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(217,119,6,0.12)';
              }}
            >
              <div>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: '#d97706',
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(217,119,6,0.38)',
                  marginBottom: '14px'
                }}>
                  3
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 6px', color: 'var(--text-color)' }}>
                  {t('ai_agronom_title')}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--muted-color)', margin: 0, lineHeight: 1.5 }}>
                  {t('ai_agronom_subtitle')}
                </p>
              </div>
              <div style={{ marginTop: '16px', fontSize: '0.84rem', fontWeight: 800, color: '#d97706', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <i className="fa-solid fa-microchip"></i>
                <span>{t('ai_diagnose_btn')} →</span>
              </div>
            </div>

            {/* Step 4: Farm & Store */}
            <div 
              onClick={() => onNavigate('dokon')}
              style={{
                background: 'var(--surface-color)',
                border: '1px solid var(--border-color)',
                borderRadius: '18px',
                padding: '24px 20px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#10b981';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
            >
              <div>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: '#10b981',
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
                  marginBottom: '14px'
                }}>
                  4
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 6px', color: 'var(--text-color)' }}>
                  {t('step_4_title')}
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--muted-color)', margin: 0, lineHeight: 1.5 }}>
                  {t('step_4_desc')}
                </p>
              </div>
              <div style={{ marginTop: '16px', fontSize: '0.82rem', fontWeight: 700, color: '#10b981' }}>
                {t('slide_2_card_btn')} →
              </div>
            </div>

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
