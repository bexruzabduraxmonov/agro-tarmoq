import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { OFFICIAL_NEWS_CHANNELS, getLiveAgroNews } from '../data/agroNewsFeed';

export default function YangiliklarPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('all'); // all | uzagroministry | hydrometuz | AgrobankChannel | karantinuz
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [newsList, setNewsList] = useState(getLiveAgroNews());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedTime, setLastRefreshedTime] = useState(new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }));

  // 24/7 avtomatik yangilanish - har 60 soniyada tekshirib turadi
  useEffect(() => {
    const timer = setInterval(() => {
      setNewsList(getLiveAgroNews());
      setLastRefreshedTime(new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setNewsList(getLiveAgroNews());
      setLastRefreshedTime(new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }));
      setIsRefreshing(false);
    }, 600);
  };

  // Filterlash: Ham rasmiy kanal bo'yicha, ham mavzu/kategoriya bo'yicha
  const filteredNews = newsList.filter((item) => {
    const matchChannel = activeTab === 'all' || item.sourceId === activeTab;
    const matchCat = activeCategory === 'all' || item.cat === activeCategory;
    return matchChannel && matchCat;
  });

  const categories = [
    { id: 'all', label: 'Barchasi', icon: 'fa-globe' },
    { id: 'Subsidiya', label: 'Subsidiya', icon: 'fa-hand-holding-dollar' },
    { id: 'Ob-havo', label: 'Ob-havo & Ogohlantirish', icon: 'fa-cloud-sun' },
    { id: 'Moliya', label: 'Moliya & Kredit', icon: 'fa-building-columns' },
    { id: 'Karantin', label: 'Karantin & Himoya', icon: 'fa-shield-halved' },
    { id: 'Qonun', label: 'Qonunchilik', icon: 'fa-scale-balanced' },
    { id: 'Grant', label: 'Grantlar', icon: 'fa-gift' },
    { id: 'Texnologiya', label: 'Agro-AI & Texnologiya', icon: 'fa-microchip' }
  ];

  return (
    <main id="top">
      <section id="yangiliklar" className="section" style={{ paddingBottom: '70px' }}>
        <div className="container">
          
          {/* Header */}
          <div className="section-head" style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="kicker" style={{ margin: 0 }}>{t('news_kicker', 'Yangiliklar')}</span>
              <span style={{
                background: '#dcfce7',
                color: '#15803d',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                border: '1px solid #bbf7d0'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', animation: 'pulse 1.8s infinite' }}></span>
                24/7 Jonli yangilanish
              </span>
            </div>
            
            <h2 style={{ fontSize: '2.1rem', fontWeight: 800 }}>Oʻzbekiston Rasmiy Agro-Yangiliklar Lentasi</h2>
            <p className="lead" style={{ maxWidth: '780px', margin: '0 auto' }}>
              Qishloq xoʻjaligi vazirligi, Oʻzgidromet, Agrobank va Karantin agentligining rasmiy Telegram xabarlari asosida Sunʼiy Intellekt (AI) tomonidan tahlil qilingan va fermerlar uchun qisqartirilgan tezkor yangiliklar.
            </p>
          </div>

          {/* Rasmiy Kanallar Banners (Tezkor o'tish va filter) */}
          <div style={{
            background: 'var(--surface-color, #ffffff)',
            borderRadius: '18px',
            padding: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            border: '1px solid var(--border-color, #e2e8f0)',
            marginBottom: '26px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fa-solid fa-satellite-dish" style={{ color: '#16a34a', fontSize: '1.1rem' }}></i>
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--heading-color, #0f172a)' }}>
                  Rasmiy Oʻzbekiston Telegram kanallari integratsiyasi:
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', color: '#64748b' }}>
                <span>Oxirgi yangilanish: <strong>{lastRefreshedTime}</strong></span>
                <button
                  type="button"
                  onClick={handleManualRefresh}
                  disabled={isRefreshing}
                  style={{
                    background: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    padding: '4px 10px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#334155'
                  }}
                  title="Yangiliklarni qayta yuklash"
                >
                  <i className={`fa-solid fa-rotate-right ${isRefreshing ? 'fa-spin' : ''}`} style={{ color: '#16a34a' }}></i>
                  <span>Yangilash</span>
                </button>
              </div>
            </div>

            {/* Channels grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '12px'
            }}>
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  border: activeTab === 'all' ? '2px solid #16a34a' : '1px solid #e2e8f0',
                  background: activeTab === 'all' ? '#f0fdf4' : '#f8fafc',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: activeTab === 'all' ? '#16a34a' : '#cbd5e1',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem'
                }}>
                  <i className="fa-solid fa-layer-group"></i>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: activeTab === 'all' ? '#15803d' : '#1e293b' }}>
                    Barcha kanallar
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    Yagona agro-axborot oqimi
                  </div>
                </div>
              </button>

              {OFFICIAL_NEWS_CHANNELS.map((ch) => {
                const isActive = activeTab === ch.id;
                return (
                  <div
                    key={ch.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: isActive ? `2px solid ${ch.color}` : '1px solid #e2e8f0',
                      background: isActive ? `${ch.color}0d` : '#ffffff',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div
                      onClick={() => setActiveTab(ch.id)}
                      style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', flex: 1 }}
                    >
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: `${ch.color}15`,
                        color: ch.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.1rem'
                      }}>
                        <i className={`fa-solid ${ch.icon}`}></i>
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>
                          {ch.name}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: ch.color, fontWeight: 600 }}>
                          {ch.handle}
                        </div>
                      </div>
                    </div>

                    <a
                      href={ch.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Telegramda ochish"
                      style={{
                        padding: '6px 9px',
                        borderRadius: '8px',
                        background: '#e0f2fe',
                        color: '#0284c7',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <i className="fa-brands fa-telegram"></i>
                      <span>Kanal</span>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Kategoriya bo'yicha filter chips */}
          <div className="chips-row" style={{ marginBottom: '24px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`chip ${activeCategory === c.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(c.id)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <i className={`fa-solid ${c.icon}`}></i>
                <span>{c.label}</span>
              </button>
            ))}
          </div>

          {/* News Grid */}
          <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
            {filteredNews.map((n) => (
              <article
                key={n.id}
                className="ag-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  background: 'var(--surface-color, #ffffff)',
                  border: '1px solid var(--border-color, #e2e8f0)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
              >
                <div>
                  <div className="card-media" style={{ position: 'relative', height: '190px' }}>
                    <img
                      src={n.img}
                      alt={n.title}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'rgba(15, 23, 42, 0.82)',
                        backdropFilter: 'blur(4px)',
                        color: '#ffffff',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <i className="fa-brands fa-telegram" style={{ color: '#38bdf8' }}></i>
                      {n.channel}
                    </span>

                    <span
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        background: 'rgba(255, 255, 255, 0.92)',
                        color: '#0f172a',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: '6px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                      }}
                    >
                      👁️ {n.viewsCount}
                    </span>
                  </div>

                  <div style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', gap: '8px' }}>
                      <span className="tag tag-green" style={{ fontSize: '0.74rem', fontWeight: 700, margin: 0 }}>
                        {n.emoji} {n.badge}
                      </span>
                      <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 500 }}>
                        🕒 {n.relativeTime}
                      </span>
                    </div>

                    <h3
                      className="card-title"
                      style={{
                        fontSize: '1.05rem',
                        lineHeight: 1.4,
                        marginBottom: '10px',
                        fontWeight: 700,
                        color: 'var(--heading-color, #0f172a)'
                      }}
                    >
                      {n.title}
                    </h3>

                    {/* AI Qisqartirilgan xulosa bloki */}
                    <div
                      style={{
                        background: '#f0fdf4',
                        borderLeft: '3px solid #16a34a',
                        padding: '8px 12px',
                        borderRadius: '0 8px 8px 0',
                        marginBottom: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.72rem', fontWeight: 700, color: '#15803d', marginBottom: '3px' }}>
                        <i className="fa-solid fa-robot"></i>
                        <span>AI Qisqartmasi (Fermerlar uchun sodda):</span>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.84rem', color: '#166534', lineHeight: 1.45 }}>
                        {n.aiSummary}
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '0 16px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setSelectedArticle(n)}
                    style={{
                      background: '#16a34a',
                      color: '#ffffff',
                      border: 'none',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>Toʻliq oʻqish</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>

                  <a
                    href={n.channelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: '#f8fafc',
                      color: '#0369a1',
                      border: '1px solid #e2e8f0',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <i className="fa-brands fa-telegram"></i>
                    <span>Rasmiy manba</span>
                  </a>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* To'liq maqola modali */}
      {selectedArticle && (
        <div
          onClick={() => setSelectedArticle(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            zIndex: 9999
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              position: 'relative'
            }}
          >
            <div style={{ position: 'relative', height: '240px' }}>
              <img
                src={selectedArticle.img}
                alt={selectedArticle.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px 20px 0 0' }}
              />
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(15, 23, 42, 0.75)',
                  color: '#ffffff',
                  border: 'none',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem'
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>

              <span
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  background: '#16a34a',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  padding: '4px 10px',
                  borderRadius: '6px'
                }}
              >
                {selectedArticle.emoji} {selectedArticle.badge}
              </span>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#16a34a', fontWeight: 700 }}>
                  <i className="fa-brands fa-telegram"></i>
                  <span>{selectedArticle.sourceName} ({selectedArticle.channel})</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  📅 {selectedArticle.date} ({selectedArticle.time})
                </div>
              </div>

              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.35, marginBottom: '16px' }}>
                {selectedArticle.title}
              </h2>

              {/* AI Xulosa */}
              <div style={{
                background: '#f0fdf4',
                borderLeft: '4px solid #16a34a',
                padding: '12px 16px',
                borderRadius: '0 10px 10px 0',
                marginBottom: '18px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 700, color: '#15803d', marginBottom: '4px' }}>
                  <i className="fa-solid fa-robot"></i>
                  <span>AI Agro-Assistent xulosasi (Asosiy mohiyat):</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.92rem', color: '#166534', lineHeight: 1.5 }}>
                  {selectedArticle.aiSummary}
                </p>
              </div>

              {/* To'liq matn */}
              <div style={{ fontSize: '0.96rem', lineHeight: 1.65, color: '#334155', marginBottom: '24px' }}>
                <p>{selectedArticle.fullContent}</p>
              </div>

              {/* Modal footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <a
                  href={selectedArticle.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#0284c7',
                    color: '#ffffff',
                    padding: '10px 18px',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '0.86rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <i className="fa-brands fa-telegram"></i>
                  <span>Telegram kanalida koʻrish</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: selectedArticle.title,
                        text: selectedArticle.aiSummary,
                        url: window.location.href
                      });
                    } else if (navigator.clipboard) {
                      navigator.clipboard.writeText(`${selectedArticle.title}\n${window.location.href}`);
                      alert("Yangilik havolasi nusxalandi!");
                    }
                  }}
                  style={{
                    background: '#f1f5f9',
                    color: '#334155',
                    border: '1px solid #cbd5e1',
                    padding: '10px 16px',
                    borderRadius: '10px',
                    fontWeight: 600,
                    fontSize: '0.86rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <i className="fa-solid fa-share-nodes"></i>
                  <span>Ulashish</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
