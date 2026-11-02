import React from 'react';
import officialLogoImg from '../assets/logo.png';

export default function Logo({ 
  size = 44, 
  variant = 'official', // 'official', 'infinity', 'hexagon', 'aerowheat', 'network'
  isDark = false, 
  showTagline = true, 
  className = '' 
}) {
  // Check localStorage for user-selected logo variant if not explicitly passed
  let activeVariant = variant;
  try {
    const saved = localStorage.getItem('agro_logo_style_v2') || localStorage.getItem('agro_logo_style');
    if (saved && saved !== 'infinity') {
      activeVariant = saved;
    } else {
      activeVariant = 'official';
    }
  } catch {
    activeVariant = 'official';
  }

  return (
    <div className={`agro-brand-logo ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', userSelect: 'none' }}>
      
      {/* ---------------- VARIANT 0: Official Agro Tarmoq Emblem ---------------- */}
      {activeVariant === 'official' && (
        <div 
          className="agro-official-emblem"
          style={{ 
            width: size, 
            height: size, 
            borderRadius: '50%', 
            overflow: 'hidden', 
            flexShrink: 0,
            background: '#09150f',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(10, 40, 20, 0.35)',
            border: '2px solid #22c55e',
            transition: 'transform 0.2s ease'
          }}
        >
          <img 
            src={officialLogoImg} 
            alt="Agro Tarmoq" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              objectPosition: 'center 12%',
              transform: 'scale(1.22)'
            }} 
          />
        </div>
      )}

      {/* ---------------- VARIANT 1: The Infinity Agro Loop (A + Leaf + Network) ---------------- */}
      {activeVariant === 'infinity' && (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0, filter: 'drop-shadow(0 4px 10px rgba(16, 120, 60, 0.22))' }}
        >
          <defs>
            <linearGradient id="infGreen" x1="6" y1="42" x2="38" y2="8" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#047857" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            <linearGradient id="infGold" x1="20" y1="42" x2="44" y2="10" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
            <linearGradient id="infBg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#064e3b" />
              <stop offset="100%" stopColor="#022c22" />
            </linearGradient>
          </defs>

          {/* Squircle Background Badge */}
          <rect width="48" height="48" rx="14" fill="url(#infBg)" />
          <rect x="0.75" y="0.75" width="46.5" height="46.5" rx="13.25" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />

          {/* Left Leaf Loop (Forms left stem of "A") */}
          <path 
            d="M24 8C14 8 8 16 8 26C8 36 17 40 24 40C30 40 33 36 33 30C33 22 24 18 20 22C16 26 18 32 23 32" 
            stroke="url(#infGreen)" 
            strokeWidth="3.8" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />

          {/* Right Golden Loop & Leaf Shoot (Forms right stem & crossbar of "A") */}
          <path 
            d="M24 8C34 8 40 16 40 25C40 35 32 40 24 40" 
            stroke="url(#infGold)" 
            strokeWidth="3.8" 
            strokeLinecap="round" 
          />

          {/* Center Bio-Sprout Core */}
          <path 
            d="M24 16C24 16 29 20 28 26C27 29 24 30 24 30C24 30 21 29 20 26C19 20 24 16 24 16Z" 
            fill="url(#infGreen)" 
          />

          {/* Glowing Golden Sprout Node */}
          <circle cx="24" cy="14" r="3" fill="#fde047" />
          <circle cx="24" cy="14" r="1.5" fill="#ffffff" />
        </svg>
      )}

      {/* ---------------- VARIANT 2: Smart Bio-Hexagon (Agri-Tech Cell) ---------------- */}
      {activeVariant === 'hexagon' && (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0, filter: 'drop-shadow(0 4px 10px rgba(16, 120, 60, 0.22))' }}
        >
          <defs>
            <linearGradient id="hexGrad1" x1="10" y1="10" x2="38" y2="38" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="hexGold" x1="14" y1="10" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>

          {/* Hexagon Body */}
          <path 
            d="M24 4L42 14.4V35.6L24 46L6 35.6V14.4L24 4Z" 
            fill="#064e3b" 
            stroke="rgba(255,255,255,0.18)" 
            strokeWidth="1.5" 
          />

          {/* Left Geometric Leaf Facet */}
          <path 
            d="M24 10C24 10 14 18 14 28C14 34 19 38 24 40V10Z" 
            fill="url(#hexGrad1)" 
          />

          {/* Right Geometric Golden Grain Facet */}
          <path 
            d="M24 10C24 10 34 18 34 28C34 34 29 38 24 40V10Z" 
            fill="url(#hexGold)" 
          />

          {/* Center Dividing Vein */}
          <path d="M24 12V39" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.85" />
          
          {/* Tech Nodes */}
          <circle cx="24" cy="11" r="2.5" fill="#fde047" />
          <circle cx="34" cy="28" r="2" fill="#fde047" />
          <circle cx="14" cy="28" r="2" fill="#a7f3d0" />
        </svg>
      )}

      {/* ---------------- VARIANT 3: The Minimalist Aero-Wheat Arcs ---------------- */}
      {activeVariant === 'aerowheat' && (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0, filter: 'drop-shadow(0 4px 10px rgba(16, 120, 60, 0.22))' }}
        >
          <defs>
            <linearGradient id="aeroGrad" x1="8" y1="40" x2="40" y2="8" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#047857" />
              <stop offset="40%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>

          {/* Dark Background */}
          <rect width="48" height="48" rx="14" fill="#032b1f" />
          <rect x="0.75" y="0.75" width="46.5" height="46.5" rx="13.25" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />

          {/* 3 Sweeping Aerodynamic Arcs forming a Modern Wheat Shoot */}
          <path 
            d="M13 38C13 25 21 15 35 11" 
            stroke="#10b981" 
            strokeWidth="3.6" 
            strokeLinecap="round" 
          />
          <path 
            d="M17 39C19 28 27 20 40 17" 
            stroke="#34d399" 
            strokeWidth="3.2" 
            strokeLinecap="round" 
          />
          <path 
            d="M10 36C10 28 14 22 24 18" 
            stroke="#059669" 
            strokeWidth="2.8" 
            strokeLinecap="round" 
          />

          {/* Golden Sun & Grain Nucleus */}
          <circle cx="36" cy="11" r="4.5" fill="#f59e0b" />
          <circle cx="36" cy="11" r="2.2" fill="#fde047" />
        </svg>
      )}

      {/* ---------------- VARIANT 4: Agro Network Shield (Nodes & Connections) ---------------- */}
      {activeVariant === 'network' && (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0, filter: 'drop-shadow(0 4px 10px rgba(16, 120, 60, 0.22))' }}
        >
          <rect width="48" height="48" rx="14" fill="#064e3b" />
          <rect x="0.75" y="0.75" width="46.5" height="46.5" rx="13.25" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

          {/* Connecting Circuit / Network lines */}
          <line x1="15" y1="33" x2="24" y2="18" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="33" y1="33" x2="24" y2="18" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="15" y1="33" x2="33" y2="33" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="3 3" />

          {/* Sprouting central leaf */}
          <path d="M24 16C24 16 28 22 26 27C25 30 24 30 24 30C24 30 23 30 22 27C20 22 24 16 24 16Z" fill="#34d399" />

          {/* Network Nodes */}
          <circle cx="24" cy="17" r="5" fill="#f59e0b" />
          <circle cx="24" cy="17" r="2.2" fill="#ffffff" />

          <circle cx="15" cy="33" r="4" fill="#10b981" />
          <circle cx="15" cy="33" r="1.8" fill="#ffffff" />

          <circle cx="33" cy="33" r="4" fill="#f59e0b" />
          <circle cx="33" cy="33" r="1.8" fill="#ffffff" />
        </svg>
      )}

      {/* Modern High-End Typography */}
      <div className="brand-text" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.12, textAlign: 'left' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', letterSpacing: '-0.035em' }}>
          <span 
            style={{ 
              fontSize: '1.32rem', 
              fontWeight: 800, 
              color: isDark ? '#ffffff' : '#064e3b', 
              fontFamily: 'var(--font-heading)' 
            }}
          >
            Agro
          </span>
          <span 
            style={{ 
              fontSize: '1.32rem', 
              fontWeight: 800, 
              color: activeVariant === 'official' ? (isDark ? '#4ade80' : '#16a34a') : '#d97706', 
              fontFamily: 'var(--font-heading)' 
            }}
          >
            Tarmoq
          </span>
        </div>
        {showTagline && (
          <small 
            style={{ 
              fontSize: '0.62rem', 
              color: isDark ? 'rgba(255,255,255,0.68)' : 'var(--muted-color)', 
              letterSpacing: '0.06em',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginTop: '1px'
            }}
          >
            Agrotech Platformasi
          </small>
        )}
      </div>

    </div>
  );
}
