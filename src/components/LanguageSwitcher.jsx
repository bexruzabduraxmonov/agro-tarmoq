import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageSwitcher({ isMobile = false }) {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const languages = [
    { code: 'uz', label: 'Oʻzbekcha', short: 'UZ', flag: '🇺🇿' },
    { code: 'ru', label: 'Русский', short: 'RU', flag: '🇷🇺' },
    { code: 'en', label: 'English', short: 'EN', flag: '🇬🇧' }
  ];

  const current = languages.find((l) => l.code === lang) || languages[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  if (isMobile) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
        {languages.map((l) => {
          const isActive = lang === l.code;
          return (
            <button
              key={l.code}
              type="button"
              onClick={() => setLang(l.code)}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '8px 12px',
                borderRadius: '10px',
                border: isActive ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                background: isActive ? 'var(--green-soft)' : 'var(--surface-color)',
                color: isActive ? 'var(--primary-dark)' : 'var(--text-color)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.86rem',
                cursor: 'pointer',
                transition: 'all 0.18s ease'
              }}
            >
              <span>{l.flag}</span>
              <span>{l.short}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          borderRadius: '999px',
          border: '1px solid var(--border-color)',
          background: 'var(--surface-color)',
          color: 'var(--text-color)',
          fontSize: '0.85rem',
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
        }}
        aria-label="Tilni tanlash / Выбор языка / Select language"
      >
        <span style={{ fontSize: '15px' }}>{current.flag}</span>
        <span>{current.short}</span>
        <span style={{ fontSize: '10px', opacity: 0.6 }}>▾</span>
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            background: 'var(--surface-color)',
            border: '1px solid var(--border-color)',
            borderRadius: '14px',
            padding: '6px',
            boxShadow: '0 12px 28px rgba(0, 0, 0, 0.14)',
            zIndex: 100,
            minWidth: '150px',
            display: 'flex',
            flexDirection: 'column',
            gap: '3px'
          }}
        >
          {languages.map((l) => {
            const isActive = lang === l.code;
            return (
              <button
                key={l.code}
                type="button"
                onClick={() => {
                  setLang(l.code);
                  setIsOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '9px',
                  border: 'none',
                  background: isActive ? 'var(--green-soft)' : 'transparent',
                  color: isActive ? 'var(--primary-dark)' : 'var(--text-color)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'rgba(0,0,0,0.04)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'transparent';
                }}
              >
                <span style={{ fontSize: '17px' }}>{l.flag}</span>
                <span style={{ flex: 1 }}>{l.label}</span>
                {isActive && <span style={{ color: 'var(--primary-color)', fontSize: '13px' }}>✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
