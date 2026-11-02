import React from 'react';
import { AGRO_DATA } from '../data/agroData';
import { useLanguage } from '../context/LanguageContext';
import { fmt } from '../utils/helpers';

export default function SearchPage({ query, onAddToCart, onNavigate }) {
  const { t } = useLanguage();
  const q = (query || '').toLowerCase().trim();

  const matchedProducts = AGRO_DATA.products.filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.farmer.toLowerCase().includes(q) || 
    p.region.toLowerCase().includes(q) ||
    p.cat.toLowerCase().includes(q) ||
    (AGRO_DATA.catLabel[p.cat] && AGRO_DATA.catLabel[p.cat].toLowerCase().includes(q))
  );

  const matchedEquip = AGRO_DATA.equip.filter(e => 
    e.name.toLowerCase().includes(q) || e.owner.toLowerCase().includes(q) || e.note.toLowerCase().includes(q)
  );

  const matchedDiseases = AGRO_DATA.diseases.filter(d => 
    d.name.toLowerCase().includes(q) || d.crop.toLowerCase().includes(q) || d.sym.toLowerCase().includes(q)
  );

  const matchedNews = AGRO_DATA.news.filter(n => 
    n.title.toLowerCase().includes(q) || n.text.toLowerCase().includes(q) || n.cat.toLowerCase().includes(q)
  );

  const totalResults = matchedProducts.length + matchedEquip.length + matchedDiseases.length + matchedNews.length;

  return (
    <main id="top">
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">{t('search_btn')}</span>
            <h2>"{query}"</h2>
            <p className="lead">{totalResults} ta maʼlumot</p>
          </div>

          {totalResults === 0 ? (
            <p className="empty" style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted-color)' }}>
              {t('search_placeholder')}
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              
              {matchedProducts.length > 0 && (
                <div>
                  <h3 style={{ marginBottom: '16px' }}>🛒 {t('nav_bozor')} ({matchedProducts.length})</h3>
                  <div className="grid-cards">
                    {matchedProducts.map(p => (
                      <article key={p.id} className="ag-card">
                        <div className="card-media">
                          <img src={p.img} alt={p.name} loading="lazy" />
                        </div>
                        <h3 className="card-title">{p.name}</h3>
                        <p className="sub">🧑‍🌾 {p.farmer}</p>
                        <div className="price-tag" style={{ marginTop: '10px' }}>{fmt(p.price)} {t('price_unit')}</div>
                        <button
                          type="button"
                          className="ag-btn ag-btn-green ag-btn-sm"
                          style={{ marginTop: '12px' }}
                          onClick={() => onAddToCart(p)}
                        >
                          {t('add_to_cart')}
                        </button>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {matchedEquip.length > 0 && (
                <div>
                  <h3 style={{ marginBottom: '16px' }}>🚜 {t('nav_texnika')} ({matchedEquip.length})</h3>
                  <div className="grid-cards">
                    {matchedEquip.map((e, idx) => (
                      <article key={idx} className="ag-card">
                        <div className="card-media">
                          <img src={e.img} alt={e.name} loading="lazy" />
                        </div>
                        <h3 className="card-title">{e.name}</h3>
                        <p className="sub">{e.note}</p>
                        <div className="price-tag" style={{ marginTop: '10px' }}>{fmt(e.price)} {t('price_unit')} / {t('day_unit')}</div>
                        <button
                          type="button"
                          className="ag-btn ag-btn-green ag-btn-sm"
                          style={{ marginTop: '12px' }}
                          onClick={() => onNavigate('texnika')}
                        >
                          {t('order_tech')}
                        </button>
                      </article>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </section>
    </main>
  );
}
