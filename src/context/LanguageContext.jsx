import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('agro_lang');
      if (saved && (saved === 'uz' || saved === 'ru' || saved === 'en')) {
        return saved;
      }
      return 'uz';
    } catch {
      return 'uz';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('agro_lang', lang);
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  }, [lang]);

  const changeLanguage = (newLang) => {
    if (newLang === 'uz' || newLang === 'ru' || newLang === 'en') {
      setLang(newLang);
    }
  };

  const t = (key, fallback = '') => {
    if (!key) return '';
    return (
      translations[lang]?.[key] ||
      translations['uz']?.[key] ||
      translations['en']?.[key] ||
      fallback ||
      key
    );
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default LanguageContext;
