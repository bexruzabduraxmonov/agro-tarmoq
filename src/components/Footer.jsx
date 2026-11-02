import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Logo from './Logo';

export default function Footer({ onNavigate }) {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <button 
              type="button" 
              onClick={() => onNavigate('home')} 
              className="brand" 
              style={{ marginBottom: '16px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
            >
              <Logo size={46} isDark={true} />
            </button>
            <p style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.75)', maxWidth: '340px' }}>
              {t('footer_tagline')}
            </p>
          </div>

          <div>
            <h4>{t('sections')}</h4>
            <button type="button" onClick={() => onNavigate('bozor')} className="footer-link">{t('nav_bozor')}</button>
            <button type="button" onClick={() => onNavigate('narxlar')} className="footer-link">{t('nav_narxlar')}</button>
            <button type="button" onClick={() => onNavigate('obhavo')} className="footer-link">{t('nav_obhavo')}</button>
            <button type="button" onClick={() => onNavigate('texnika')} className="footer-link">{t('nav_texnika')}</button>
            <button type="button" onClick={() => onNavigate('agronom')} className="footer-link">{t('nav_agronom')}</button>
          </div>

          <div>
            <h4>{t('nav_more')}</h4>
            <button type="button" onClick={() => onNavigate('xojalik')} className="footer-link">{t('nav_xojalik')}</button>
            <button type="button" onClick={() => onNavigate('dokon')} className="footer-link">{t('nav_dokon')}</button>
            <button type="button" onClick={() => onNavigate('ishlar')} className="footer-link">{t('nav_ishlar')}</button>
            <button type="button" onClick={() => onNavigate('yangiliklar')} className="footer-link">{t('nav_yangiliklar')}</button>
            <button type="button" onClick={() => onNavigate('chorvachilik')} className="footer-link">{t('nav_chorvachilik')}</button>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 {t('footer_rights')}
        </div>
      </div>
    </footer>
  );
}
