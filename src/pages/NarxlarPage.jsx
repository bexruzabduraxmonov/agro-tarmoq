import React, { useState } from 'react';
import { AGRO_DATA } from '../data/agroData';
import { useLanguage } from '../context/LanguageContext';
import { fmt, money, getProductMarketPrice, MARKET_FACTORS, generatePriceSeries } from '../utils/helpers';

// Helper to compute clean, financial Y-axis scale with round ticks
function getNiceYScale(minVal, maxVal) {
  let delta = maxVal - minVal;
  if (delta <= 0) delta = maxVal * 0.1 || 1000;

  const rawStep = delta / 4;
  const mag = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const residual = rawStep / mag;
  let step;
  if (residual < 1.5) step = 1 * mag;
  else if (residual < 3.5) step = 2 * mag;
  else if (residual < 7.5) step = 5 * mag;
  else step = 10 * mag;

  if (step < 100 && minVal >= 1000) step = 100;
  if (step < 50 && minVal < 1000) step = 50;

  const niceMin = Math.floor(minVal / step) * step;
  const niceMax = Math.ceil(maxVal / step) * step;
  const ticks = [];
  for (let v = niceMax; v >= niceMin; v -= step) {
    ticks.push(v);
  }
  return { niceMin, niceMax, step, ticks };
}

// Format Y-axis tick values so large numbers (e.g. millions) fit cleanly
function formatYTick(val) {
  if (val >= 1000000) {
    const mln = val / 1000000;
    return `${Number.isInteger(mln) ? mln : mln.toFixed(1)} mln`;
  }
  return fmt(val);
}

export default function NarxlarPage({ onShowToast }) {
  const { t } = useLanguage();
  const [selectedCat, setSelectedCat] = useState('all');
  const [selectedProductId, setSelectedProductId] = useState('pomidor');
  const [selectedMarketIndex, setSelectedMarketIndex] = useState(0);
  const [timeframe, setTimeframe] = useState(7); // 7, 14, 30, 90
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertPhone, setAlertPhone] = useState('');
  const [alertTargetPrice, setAlertTargetPrice] = useState('');

  // Active product
  const activeProduct = AGRO_DATA.products.find((p) => p.id === selectedProductId) || AGRO_DATA.products[0];
  const marketIndex = parseInt(selectedMarketIndex, 10) || 0;
  const currentMarket = MARKET_FACTORS[marketIndex] || MARKET_FACTORS[0];

  // Guaranteed stable current price for chosen market
  const todayPrice = getProductMarketPrice(activeProduct.price, marketIndex);
  const seed = activeProduct.id.length + marketIndex * 5 + activeProduct.name.charCodeAt(0);

  // Generate stable price series going backwards from today
  const series = generatePriceSeries(todayPrice, seed, timeframe);
  const data = series.map((p) => p.val);
  const lastPrice = data[data.length - 1]; // GUARANTEED to match todayPrice
  const firstPrice = data[0];
  const change = lastPrice - firstPrice;
  const pct = firstPrice > 0 ? Math.round((change / firstPrice) * 100) : 0;

  const maxPrice = Math.max(...data);
  const minPrice = Math.min(...data);
  const avgPrice = Math.round(data.reduce((a, b) => a + b, 0) / data.length);

  // SVG Chart Dimensions
  const w = 740;
  const h = 290;
  const padL = 75;
  const padR = 25;
  const padT = 32;
  const padB = 45;

  const scale = getNiceYScale(minPrice, maxPrice);
  const minBound = scale.niceMin;
  const maxBound = scale.niceMax;
  const range = (maxBound - minBound) || 1;

  const stepX = (w - padL - padR) / (series.length - 1);
  const points = series.map((item, i) => {
    const x = padL + i * stepX;
    const y = h - padB - ((item.val - minBound) / range) * (h - padT - padB);
    return {
      x,
      y,
      val: item.val,
      daysAgo: item.daysAgo,
      label: item.label,
      index: i
    };
  });

  const polylineStr = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const polygonStr = `${polylineStr} ${(padL + (series.length - 1) * stepX).toFixed(1)},${h - padB} ${padL},${h - padB}`;

  // Grid lines based on nice scale
  const gridLines = scale.ticks.map((val) => {
    const gy = h - padB - ((val - minBound) / range) * (h - padT - padB);
    return { y: gy, val };
  });

  // Calculate market comparison rows (100% stable & deterministic)
  const marketRows = MARKET_FACTORS.map((mf, i) => {
    const mPrice = getProductMarketPrice(activeProduct.price, i);
    const mSeed = activeProduct.id.length + i * 5 + activeProduct.name.charCodeAt(0);
    const mSeries = generatePriceSeries(mPrice, mSeed, timeframe);
    const mChange = mPrice - mSeries[0].val;
    return {
      index: i,
      name: mf.name,
      region: mf.region,
      price: mPrice,
      change: mChange
    };
  }).sort((a, b) => a.price - b.price);

  const bestMarket = marketRows[0];
  const worstMarket = marketRows[marketRows.length - 1];
  const maxSavings = worstMarket.price - bestMarket.price;

  // Handle product select change
  const handleProductChange = (productId) => {
    setSelectedProductId(productId);
    const found = AGRO_DATA.products.find((p) => p.id === productId);
    if (found && found.cat) {
      setSelectedCat(found.cat);
    }
  };

  // Handle category chip click
  const handleCategoryClick = (catKey) => {
    setSelectedCat(catKey);
    const matching = AGRO_DATA.products.filter((p) => catKey === 'all' || p.cat === catKey);
    if (matching.length > 0) {
      setSelectedProductId(matching[0].id);
    }
  };

  const handleAlertSubmit = (e) => {
    e.preventDefault();
    if (alertPhone.trim()) {
      onShowToast(`${activeProduct.name} narxi boʻyicha bildirishnoma faollashtirildi ✓`);
      setAlertModalOpen(false);
      setAlertPhone('');
      setAlertTargetPrice('');
    }
  };

  // Category names map for optgroup
  const catNames = {
    sabzavot: 'Sabzavotlar',
    meva: 'Mevalar',
    gosh: 'Goʻsht mahsulotlari',
    sut: 'Sut mahsulotlari',
    urug: 'Urugʻlar',
    mineral_ogit: 'Mineral oʻgʻitlar',
    organik_ogit: 'Organik oʻgʻitlar',
    himoya: 'Oʻsimliklarni himoya qilish',
    yoqilgi: 'Yoqilgʻi mahsulotlari',
    sugorish: 'Sugʻorish vositalari',
    texnika_savdo: 'Agrotexnika vositalari',
    parvarish: 'Parvarishlash vositalari'
  };

  // Preset quick products
  const quickPicks = [
    { id: 'pomidor', label: '🍅 Pomidor' },
    { id: 'kartoshka', label: '🥔 Kartoshka' },
    { id: 'urug_bugdoy', label: '🌾 Bugʻdoy urugʻi' },
    { id: 'ogit_azot', label: '🧪 Selitra' },
    { id: 'yoqilgi_dizel', label: '⛽ Dizel' },
    { id: 'texnika_traktor', label: '🚜 Traktor MTZ-82' }
  ];

  return (
    <main id="top">
      <section id="narxlar" className="section">
        <div className="container">
          
          {/* Header */}
          <div className="section-head">
            <span className="kicker">{t('prices_kicker')}</span>
            <h2>{t('prices_title')}</h2>
            <p className="lead">{t('prices_lead')}</p>
          </div>

          {/* Category Filter Chips */}
          <div 
            className="chips-row" 
            style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '8px', 
              marginBottom: '20px' 
            }}
          >
            {AGRO_DATA.cats.map((c) => (
              <button
                key={c[0]}
                type="button"
                className={`chip ${selectedCat === c[0] ? 'active' : ''}`}
                onClick={() => handleCategoryClick(c[0])}
              >
                {t(`cat_${c[0]}`, c[1])}
              </button>
            ))}
          </div>

          {/* 4 KPI Summary Cards */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
              gap: '16px', 
              marginBottom: '24px' 
            }}
          >
            {/* Card 1: Today */}
            <div className="ag-card" style={{ padding: '20px', background: '#fff' }}>
              <div className="sub" style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                Bugungi narx ({activeProduct.unit})
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-color)', marginTop: '4px' }}>
                {fmt(todayPrice)} soʻm
              </div>
              <div style={{ 
                fontSize: '0.85rem', 
                fontWeight: 700, 
                color: change >= 0 ? 'var(--primary-color)' : '#b4482f', 
                marginTop: '6px' 
              }}>
                {change >= 0 ? '▲ +' : '▼ '}{fmt(change)} ({change >= 0 ? '+' : ''}{pct}%) {timeframe} kun ichida
              </div>
            </div>

            {/* Card 2: Highest */}
            <div className="ag-card" style={{ padding: '20px', background: '#fff' }}>
              <div className="sub" style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                📈 Eng baland narx
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-color)', marginTop: '4px' }}>
                {fmt(maxPrice)} soʻm
              </div>
              <div className="sub" style={{ fontSize: '0.8rem', marginTop: '6px' }}>
                {timeframe} kunlik maksimal choʻqqi
              </div>
            </div>

            {/* Card 3: Lowest */}
            <div className="ag-card" style={{ padding: '20px', background: '#fff' }}>
              <div className="sub" style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                📉 Eng past narx
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-color)', marginTop: '4px' }}>
                {fmt(minPrice)} soʻm
              </div>
              <div className="sub" style={{ fontSize: '0.8rem', marginTop: '6px' }}>
                {timeframe} kunlik minimal xarid narxi
              </div>
            </div>

            {/* Card 4: Average */}
            <div className="ag-card" style={{ padding: '20px', background: '#fff' }}>
              <div className="sub" style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                ⚖️ Oʻrtacha narx
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-color)', marginTop: '4px' }}>
                {fmt(avgPrice)} soʻm
              </div>
              <div className="sub" style={{ fontSize: '0.8rem', marginTop: '6px' }}>
                {timeframe} kunlik oʻrtacha bozor koʻrsatkichi
              </div>
            </div>
          </div>

          {/* Main 2-Column Dashboard Grid */}
          <div className="price-layout">
            
            {/* Left Card: Chart Box */}
            <div className="chart-box" style={{ background: '#fff', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)', padding: '24px' }}>
              
              {/* Product and Market selectors */}
              <div className="form-grid" style={{ marginBottom: '16px' }}>
                <div className="field">
                  <label htmlFor="priceProduct" style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                    Mahsulot yoki resurs
                  </label>
                  <select 
                    id="priceProduct"
                    value={activeProduct.id}
                    onChange={(e) => handleProductChange(e.target.value)}
                    style={{ fontWeight: 600, fontSize: '0.92rem' }}
                  >
                    {Object.entries(catNames).map(([catKey, catTitle]) => {
                      const prods = AGRO_DATA.products.filter((p) => p.cat === catKey);
                      if (prods.length === 0) return null;
                      return (
                        <optgroup key={catKey} label={catTitle}>
                          {prods.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.emoji} {p.name} ({fmt(p.price)} soʻm/{p.unit})
                            </option>
                          ))}
                        </optgroup>
                      );
                    })}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="priceMarket" style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                    Asosiy bozor
                  </label>
                  <select 
                    id="priceMarket"
                    value={selectedMarketIndex}
                    onChange={(e) => setSelectedMarketIndex(e.target.value)}
                    style={{ fontWeight: 600, fontSize: '0.92rem' }}
                  >
                    {MARKET_FACTORS.map((mf, idx) => (
                      <option key={idx} value={idx}>
                        {mf.name} ({mf.region})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quick Pick Pills */}
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--muted-color)', fontWeight: 600, marginRight: '4px' }}>
                  Tezkor tanlov:
                </span>
                {quickPicks.map((qp) => (
                  <button
                    key={qp.id}
                    type="button"
                    onClick={() => handleProductChange(qp.id)}
                    style={{
                      border: '1px solid var(--border-color)',
                      background: activeProduct.id === qp.id ? 'var(--green-soft)' : '#fff',
                      color: activeProduct.id === qp.id ? 'var(--primary-dark)' : 'var(--text-color)',
                      borderColor: activeProduct.id === qp.id ? 'var(--primary-color)' : 'var(--border-color)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {qp.label}
                  </button>
                ))}
              </div>

              {/* Timeframe selector tabs */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                <span className="sub" style={{ fontWeight: 700, fontSize: '0.88rem' }}>
                  Vaqt oraligʻi:
                </span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[
                    { days: 7, label: '7 kun' },
                    { days: 14, label: '14 kun' },
                    { days: 30, label: '1 oy' },
                    { days: 90, label: '3 oy' }
                  ].map((tf) => (
                    <button
                      key={tf.days}
                      type="button"
                      onClick={() => setTimeframe(tf.days)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        border: '1px solid var(--border-color)',
                        background: timeframe === tf.days ? 'var(--primary-color)' : 'var(--background-color)',
                        color: timeframe === tf.days ? '#fff' : 'var(--text-color)',
                        cursor: 'pointer',
                        transition: '0.2s'
                      }}
                    >
                      {tf.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart Container with Interactive Hover Tooltip */}
              <div 
                style={{ 
                  position: 'relative', 
                  width: '100%', 
                  overflowX: 'auto',
                  userSelect: 'none'
                }}
              >
                <svg 
                  viewBox={`0 0 ${w} ${h}`} 
                  role="img" 
                  aria-label="Narx grafigi"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  <defs>
                    <linearGradient id="agroChartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#166534" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#166534" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Clean Grid Lines & Y Axis Labels */}
                  {gridLines.map((gl, i) => (
                    <g key={i}>
                      <line 
                        x1={padL} 
                        y1={gl.y.toFixed(1)} 
                        x2={w - padR} 
                        y2={gl.y.toFixed(1)} 
                        stroke="#e3ede6" 
                        strokeWidth="1" 
                      />
                      <text 
                        x={padL - 10} 
                        y={(gl.y + 4).toFixed(1)} 
                        textAnchor="end" 
                        fontSize="11" 
                        fontWeight="600"
                        fill="#5d7266"
                      >
                        {formatYTick(gl.val)}
                      </text>
                    </g>
                  ))}

                  {/* Area fill */}
                  <polygon points={polygonStr} fill="url(#agroChartGrad)" />

                  {/* Line */}
                  <polyline 
                    points={polylineStr} 
                    fill="none" 
                    stroke="var(--primary-color)" 
                    strokeWidth="3.2" 
                    strokeLinejoin="round" 
                    strokeLinecap="round" 
                  />

                  {/* Hover vertical guide line */}
                  {hoveredPoint && (
                    <line
                      x1={hoveredPoint.x}
                      y1={padT}
                      x2={hoveredPoint.x}
                      y2={h - padB}
                      stroke="var(--accent-color)"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                    />
                  )}

                  {/* Interactive Points */}
                  {points.map((p, i) => {
                    const isHovered = hoveredPoint && hoveredPoint.index === i;
                    const isKeyPoint = 
                      timeframe === 7 
                        ? true 
                        : (i === 0 || i === points.length - 1 || i % Math.max(1, Math.floor(points.length / 6)) === 0);

                    return (
                      <g key={i}>
                        {/* Invisible larger hover hit target */}
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r="15"
                          fill="transparent"
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={() => setHoveredPoint(p)}
                        />
                        {/* Visible Point */}
                        {(isKeyPoint || isHovered) && (
                          <circle 
                            cx={p.x.toFixed(1)} 
                            cy={p.y.toFixed(1)} 
                            r={isHovered ? 6.5 : (p.daysAgo === 0 ? 5 : 3.6)} 
                            fill={isHovered ? 'var(--accent-color)' : (p.daysAgo === 0 ? 'var(--primary-dark)' : 'var(--primary-color)')}
                            stroke="#fff"
                            strokeWidth={isHovered ? 2.5 : 1.5}
                          />
                        )}
                      </g>
                    );
                  })}

                  {/* X-axis date labels */}
                  {points.map((p, i) => {
                    let shouldShowLabel = false;
                    if (timeframe === 7) {
                      shouldShowLabel = true;
                    } else if (timeframe === 14) {
                      shouldShowLabel = (i === 0 || i === 4 || i === 8 || i === 13);
                    } else if (timeframe === 30) {
                      shouldShowLabel = (i === 0 || i === 7 || i === 14 || i === 21 || i === 29);
                    } else {
                      shouldShowLabel = (i === 0 || i === 22 || i === 45 || i === 67 || i === 89);
                    }

                    if (!shouldShowLabel) return null;

                    const isToday = p.daysAgo === 0;
                    return (
                      <text 
                        key={i}
                        x={p.x} 
                        y={h - 16} 
                        textAnchor={i === 0 ? 'start' : (isToday ? 'end' : 'middle')} 
                        fontSize="11" 
                        fontWeight={isToday ? 700 : 500}
                        fill={isToday ? 'var(--primary-color)' : '#5d7266'}
                      >
                        {p.label}
                      </text>
                    );
                  })}
                </svg>

                {/* Floating Tooltip Box */}
                {hoveredPoint && (
                  <div
                    style={{
                      position: 'absolute',
                      left: `${(hoveredPoint.x / w) * 100}%`,
                      top: `${Math.max(10, hoveredPoint.y - 45)}px`,
                      transform: 'translate(-50%, -100%)',
                      background: 'rgba(20, 38, 28, 0.96)',
                      color: '#fff',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      pointerEvents: 'none',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                      zIndex: 10,
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ color: '#fff', fontSize: '0.92rem' }}>
                      {fmt(hoveredPoint.val)} soʻm
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.78)', fontWeight: 500, marginTop: '2px' }}>
                      📅 {hoveredPoint.label} {hoveredPoint.daysAgo > 0 ? `(${hoveredPoint.daysAgo} kun oldin)` : '— Bugun'}
                    </div>
                  </div>
                )}
              </div>

              {/* Alert Notification Button */}
              <button
                type="button"
                className="ag-btn ag-btn-yellow"
                style={{ marginTop: '20px', width: '100%', padding: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 700 }}
                onClick={() => setAlertModalOpen(true)}
              >
                <span>🔔 Narx oʻzgarsa xabar bering</span>
              </button>
            </div>

            {/* Right Card: Market Comparison Box */}
            <div 
              className="table-box" 
              style={{ 
                background: '#fff', 
                borderRadius: 'var(--radius)', 
                boxShadow: 'var(--shadow-sm)', 
                border: '1px solid var(--border-color)', 
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                      Bozorlar boʻyicha tahlil
                    </h3>
                    <p className="sub" style={{ fontSize: '0.82rem', marginTop: '2px' }}>
                      Hududiy 5 ta dehqon bozoridagi taqqoslama
                    </p>
                  </div>
                  <span className="tag tag-green">
                    1 {activeProduct.unit}
                  </span>
                </div>

                {/* Best Deal Recommendation Callout */}
                <div 
                  style={{ 
                    background: 'var(--green-soft)', 
                    border: '1px solid #c9e2cf', 
                    borderRadius: 'var(--radius-sm)', 
                    padding: '14px 16px', 
                    marginBottom: '18px' 
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, color: 'var(--primary-color)', fontSize: '0.92rem' }}>
                    <span>⭐ Eng qulay taklif:</span>
                    <span>{bestMarket.name}</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-color)', marginTop: '4px' }}>
                    Eng qimmat bozorga nisbatan <strong>{money(maxSavings)}</strong> gacha tejab qolasiz!
                  </div>
                </div>

                {/* Markets Comparison Table */}
                <div style={{ overflowX: 'auto' }}>
                  <table className="ag-table">
                    <thead>
                      <tr>
                        <th>Bozor</th>
                        <th>Narx</th>
                        <th>{timeframe}k oʻzgarish</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marketRows.map((r, idx) => {
                        const isBest = idx === 0;
                        const isSelected = r.index === marketIndex;

                        return (
                          <tr 
                            key={idx}
                            style={{ 
                              background: isSelected ? 'rgba(22, 101, 52, 0.08)' : 'transparent',
                              cursor: 'pointer',
                              borderLeft: isSelected ? '3px solid var(--primary-color)' : '3px solid transparent'
                            }}
                            onClick={() => setSelectedMarketIndex(r.index)}
                            title="Ushbu bozorni tanlash va grafikni koʻrish uchun bosing"
                          >
                            <td style={{ fontWeight: isSelected ? 800 : 600 }}>
                              <div>
                                {r.name} {isBest ? '⭐' : ''} {isSelected ? '📍' : ''}
                              </div>
                              <div style={{ fontSize: '0.72rem', color: 'var(--muted-color)', fontWeight: 400 }}>
                                {r.region}
                              </div>
                            </td>
                            <td className={isBest ? 'best' : ''} style={{ fontWeight: 800 }}>
                              {fmt(r.price)} soʻm
                            </td>
                            <td style={{ 
                              color: r.change >= 0 ? 'var(--primary-color)' : '#b4482f', 
                              fontWeight: 700 
                            }}>
                              {r.change >= 0 ? '▲ +' : '▼ '}{fmt(r.change)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bottom Market Quick Tip */}
              <div 
                style={{ 
                  marginTop: '20px', 
                  paddingTop: '16px', 
                  borderTop: '1px solid var(--border-color)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  fontSize: '0.8rem',
                  color: 'var(--muted-color)'
                }}
              >
                <span>💡 Maslahat: Roʻyxatdagi istalgan bozor ustiga bosib grafikni oʻzgartiring.</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Price Alert Modal */}
      {alertModalOpen && (
        <div 
          className="ag-overlay open" 
          onClick={() => setAlertModalOpen(false)}
          role="dialog" 
          aria-label="Narx bildirishnomasi"
        >
          <div 
            className="cart-panel" 
            style={{ maxWidth: '420px', height: 'auto', maxHeight: '90vh', borderRadius: 'var(--radius)', margin: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="row" style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.25rem' }}>🔔 Narx xabarnomasi</h3>
              <button 
                type="button" 
                onClick={() => setAlertModalOpen(false)} 
                style={{ fontSize: '22px', border: 'none', background: 'transparent', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <p className="sub" style={{ fontSize: '0.88rem', marginBottom: '18px' }}>
              <strong>{activeProduct.name}</strong> ({currentMarket.name}) narxi oʻzgarganda Telegram yoki SMS orqali darhol xabar beramiz.
            </p>

            <form onSubmit={handleAlertSubmit}>
              <div className="field" style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                  Hozirgi narx
                </label>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-color)' }}>
                  {money(todayPrice)} / {activeProduct.unit}
                </div>
              </div>

              <div className="field" style={{ marginBottom: '14px' }}>
                <label htmlFor="targetPrice" style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                  Kutilayotgan maqsadli narx (soʻmda)
                </label>
                <input
                  type="number"
                  id="targetPrice"
                  placeholder={`Masalan: ${Math.round(todayPrice * 0.9)}`}
                  value={alertTargetPrice}
                  onChange={(e) => setAlertTargetPrice(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                  required
                />
              </div>

              <div className="field" style={{ marginBottom: '20px' }}>
                <label htmlFor="alertPhone" style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                  Telefon raqamingiz yoki Telegram
                </label>
                <input
                  type="text"
                  id="alertPhone"
                  placeholder="+998 90 123 45 67 yoki @username"
                  value={alertPhone}
                  onChange={(e) => setAlertPhone(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                  required
                />
              </div>

              <button
                type="submit"
                className="ag-btn ag-btn-green"
                style={{ width: '100%', padding: '13px' }}
              >
                Obunani faollashtirish
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
