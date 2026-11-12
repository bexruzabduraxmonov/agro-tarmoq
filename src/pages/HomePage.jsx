import React, { useState, useEffect, useCallback } from 'react';
import { AGRO_DATA } from '../data/agroData';
import { useLanguage } from '../context/LanguageContext';
import { fmt } from '../utils/helpers';

// ─── Slider ma'lumotlari ───────────────────────────────────────────────────
const SLIDES = [
  {
    id: 1,
    bg: 'https://files.cdn-files-a.com/admin/system_photos_stock/2000_69757996f1a68.jpg?format=avif',
    title: 'Texnikani ijaraga oling',
    sub: 'Kunlik yoki mavsumiy ijara,\nqulay shartlarda',
    card: {
      badge: 'TEXNIKA',
      badgeColor: '#f59e0b',
      title: "Traktor va Kombayn\nijarasi",
      desc: 'Sertifikatlangan texnikalar, tajribali haydovchilar bilan birga.',
      btn: 'Texnikaga o\'tish',
      href: 'texnika',
    },
  },
  {
    id: 2,
    bg: 'https://files.cdn-files-a.com/admin/system_photos_stock/2000_6af568c249666.jpg?format=avif',
    title: "Urug' va ko'chatlar",
    sub: 'Sertifikatlangan urug\'lar,\nyetkazib beruvchilardan.',
    card: {
      badge: "DO'KON",
      badgeColor: '#22c55e',
      title: "Urug' va ko'chatlarda\nkatta chegirma",
      desc: "Sertifikatlangan urug'lar va ko'chatlar yetkazib beruvchilardan.",
      btn: "Do'konga o'tish",
      href: 'dokon',
    },
  },
  {
    id: 3,
    bg: 'https://files.cdn-files-a.com/admin/system_photos_stock/2000_6970e9d133c02.jpg?format=avif',
    title: "Narxlarni kuzating",
    sub: "14 kunlik grafik va\nbozor solishtirmasi",
    card: {
      badge: 'NARXLAR',
      badgeColor: '#6366f1',
      title: "Qishloq xo'jaligi\nnarxlari",
      desc: "Real vaqt rejimida narx monitoringi. Eng qulay narxda soting.",
      btn: "Narxlarga o'tish",
      href: 'narxlar',
    },
  },
  {
    id: 4,
    bg: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1600&q=80',
    title: "Chorvachilik bozori",
    sub: "Mol-qo'y, parrandachilik\nva veterinar xizmatlar",
    card: {
      badge: 'CHORVA',
      badgeColor: '#f43f5e',
      title: "Chorva mollari\nsotish va sotib olish",
      desc: "Veterinar tekshiruvidan o'tgan sog'lom chorva mollari bozori.",
      btn: "Chorvachilikka o'tish",
      href: 'chorvachilik',
    },
  },
];

const TAG_LINE = 'Fermer · Xaridor · Texnika egasi · Agronom · Fermer · Xaridor · Texnika egasi · Agronom';

// ─── HeroSlider komponenti ─────────────────────────────────────────────────
function HeroSlider({ onNavigate }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((idx) => {
    if (animating) return;
    setAnimating(true);
    setCurrent((idx + SLIDES.length) % SLIDES.length);
    setTimeout(() => setAnimating(false), 500);
  }, [animating]);

  // Auto-slide har 5 soniyada
  useEffect(() => {
    const timer = setInterval(() => goTo(current + 1), 5000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const s = SLIDES[current];

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
          {SLIDES.map((_, i) => (
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
          🌱 {TAG_LINE} &nbsp;&nbsp;&nbsp; 🌱 {TAG_LINE}
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
