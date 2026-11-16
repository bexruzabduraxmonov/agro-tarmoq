import React, { useState, useEffect } from 'react';
import { AGRO_DATA } from '../data/agroData';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header({ currentPage, setCurrentPage, cartCount, onOpenCart, onSearch, onShowToast }) {
  const { t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const { user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const handleThemeToggle = () => {
    toggleTheme();
    if (onShowToast) {
      onShowToast(isDark ? t('theme_light_toast') : t('theme_dark_toast'));
    }
  };

  const navMap = {
    '': 'nav_home',
    'bozor.html': 'nav_bozor',
    'narxlar.html': 'nav_narxlar',
    'obhavo.html': 'nav_obhavo',
    'texnika.html': 'nav_texnika',
    'agronom.html': 'nav_agronom',
    'dokon.html': 'nav_dokon',
    'xojalik.html': 'nav_xojalik',
    'royxatdan-otish.html': 'nav_auth',
    'ishlar.html': 'nav_ishlar',
    'yangiliklar.html': 'nav_yangiliklar',
    'chorvachilik.html': 'nav_chorvachilik'
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.more-wrap')) {
        setMoreMenuOpen(false);
      }
    };
    if (moreMenuOpen) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [moreMenuOpen]);

  const handleNav = (href) => {
    let page = href.replace('.html', '');
    if (page === '') page = 'home';
    setCurrentPage(page);
    window.location.hash = page;
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      onSearch(searchVal.trim());
      setMobileMenuOpen(false);
    }
  };

  const isCurrentActive = (href) => {
    let page = href.replace('.html', '');
    if (page === '') page = 'home';
    return currentPage === page;
  };

  const isMoreActive = AGRO_DATA.navMore.some(i => isCurrentActive(i[0]));

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          {/* Brand */}
          <button 
            type="button" 
            onClick={() => handleNav('')} 
            className="brand" 
            style={{ padding: 0, border: 'none', background: 'none' }}
            aria-label="Agro Tarmoq bosh sahifa"
          >
            <Logo variant="official" size={42} />
          </button>

          {/* Desktop Navigation */}
          <nav className="nav-desktop" id="navDesktop" aria-label="Asosiy menyu">
            {AGRO_DATA.navPrimary.map((item) => (
              <button
                key={item[0]}
                type="button"
                className={`nav-pill ${isCurrentActive(item[0]) ? 'active' : ''}`}
                onClick={() => handleNav(item[0])}
              >
                {item[0] === 'agronom.html' ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ 
                      background: 'linear-gradient(135deg, #16a34a, #22c55e)', 
                      color: '#fff', 
                      fontSize: '10px', 
                      fontWeight: 900, 
                      padding: '1px 6px', 
                      borderRadius: '6px', 
                      letterSpacing: '0.4px',
                      boxShadow: '0 2px 6px rgba(34, 197, 94, 0.4)'
                    }}>
                      AI
                    </span>
                    <span>{t(navMap[item[0]], item[1])}</span>
                  </span>
                ) : (
                  t(navMap[item[0]], item[1])
                )}
              </button>
            ))}

            {/* Yana dropdown */}
            <div className={`more-wrap ${moreMenuOpen ? 'open' : ''}`}>
              <button
                type="button"
                className={`more-btn ${isMoreActive ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setMoreMenuOpen(!moreMenuOpen);
                }}
                aria-label={t('nav_more')}
              >
                {t('nav_more')} <span aria-hidden="true">▾</span>
              </button>
              <div 
                className="more-menu"
                style={{
                  display: moreMenuOpen ? 'flex' : 'none',
                  flexDirection: 'column',
                  gap: '4px',
                  minWidth: '220px',
                  padding: '10px'
                }}
              >
                {AGRO_DATA.navMore.map((item) => (
                  <button
                    key={item[0]}
                    type="button"
                    className={`more-item ${isCurrentActive(item[0]) ? 'active' : ''}`}
                    onClick={() => handleNav(item[0])}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: 'none',
                      background: isCurrentActive(item[0]) ? 'var(--green-soft)' : 'transparent',
                      color: isCurrentActive(item[0]) ? 'var(--primary-color)' : 'var(--text-color)',
                      fontWeight: isCurrentActive(item[0]) ? 700 : 600,
                      cursor: 'pointer',
                      fontSize: '0.92rem',
                      fontFamily: 'inherit'
                    }}
                  >
                    {t(navMap[item[0]], item[1])}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Search form */}
          <form onSubmit={handleSearchSubmit} className="header-search" role="search">
            <input 
              type="text" 
              placeholder={t('search_placeholder')} 
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              aria-label={t('search_placeholder')} 
              required 
            />
            <button type="submit" aria-label={t('search_btn')}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>

          {/* Actions */}
          <div className="header-actions">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Dark/Light Mode Toggle */}
            <button
              type="button"
              className={`theme-toggle-btn ${isDark ? 'is-dark' : 'is-light'}`}
              onClick={handleThemeToggle}
              aria-label={isDark ? 'Kunduzgi rejimga oʻtish' : 'Tungi rejimga oʻtish'}
              title={isDark ? 'Kunduzgi rejimga oʻtish (Hozir tungi)' : 'Tungi rejimga oʻtish (Hozir kunduzgi)'}
            >
              {isDark ? (
                <i className="fa-solid fa-sun" style={{ color: '#f59e0b', fontSize: '1.1rem' }}></i>
              ) : (
                <i className="fa-solid fa-moon" style={{ color: '#334155', fontSize: '1rem' }}></i>
              )}
            </button>

            <button 
              type="button" 
              className={`account-btn ${currentPage === 'royxatdan-otish' ? 'active' : ''}`}
              onClick={() => handleNav('royxatdan-otish.html')}
              aria-label={user ? user.name : t('account')} 
              title={user ? `${user.name} (${t('tab_profile')})` : t('account')}
              style={user ? { 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '6px', 
                padding: '6px 12px', 
                width: 'auto', 
                borderRadius: '12px', 
                background: 'var(--green-soft)', 
                border: '1px solid var(--green-soft-border)', 
                color: 'var(--primary-color)' 
              } : {}}
            >
              {user ? (
                <>
                  <span style={{ fontSize: '1rem' }}>{user.role === 'fermer' ? '🌾' : user.role === 'texnika' ? '🚜' : user.role === 'agronom' ? '🌿' : '🛒'}</span>
                  <span className="hide-on-mobile" style={{ fontSize: '0.86rem', fontWeight: 700, maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.name.split(' ')[0]}
                  </span>
                </>
              ) : (
                <i className="fa-regular fa-user"></i>
              )}
            </button>

            <button 
              type="button" 
              className="cart-btn" 
              onClick={onOpenCart} 
              aria-label={t('cart')}
              title={t('cart')}
            >
              <i className="fa-solid fa-cart-shopping"></i>
              <span className="cart-count" id="cartCount">{cartCount}</span>
            </button>

            <button 
              type="button" 
              className="menu-btn" 
              onClick={() => setMobileMenuOpen(true)} 
              aria-label={t('menu_open')} 
              aria-expanded={mobileMenuOpen}
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div className={`nav-mobile ${mobileMenuOpen ? 'open' : ''}`} aria-hidden={!mobileMenuOpen}>
        <div className="nav-mobile-head">
          <span>{t('sections')}</span>
          <button 
            type="button" 
            onClick={() => setMobileMenuOpen(false)} 
            aria-label={t('menu_close')}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Mobile Language Switcher & Theme Row */}
        <div style={{ padding: '14px 22px 10px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
          <LanguageSwitcher isMobile={true} />
          
          <button
            type="button"
            onClick={handleThemeToggle}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              background: 'var(--surface-color)',
              color: 'var(--text-color)',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {isDark ? (
              <>
                <i className="fa-solid fa-sun" style={{ color: '#f59e0b' }}></i>
                <span>{t('theme_light')}</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-moon" style={{ color: '#334155' }}></i>
                <span>{t('theme_dark')}</span>
              </>
            )}
          </button>
        </div>

        <div style={{ padding: '14px 22px', borderBottom: '1px solid var(--border-color)' }}>
          <form onSubmit={handleSearchSubmit} className="header-search" style={{ display: 'flex', width: '100%' }} role="search">
            <input 
              type="text" 
              placeholder={t('search_placeholder')} 
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              style={{ flex: 1 }} 
              required 
            />
            <button type="submit" aria-label={t('search_btn')}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
        <nav id="navMobileList" aria-label="Mobil menyu">
          {AGRO_DATA.navPrimary.concat(AGRO_DATA.navMore).map((item) => (
            <button
              key={item[0]}
              type="button"
              className={isCurrentActive(item[0]) ? 'active' : ''}
              onClick={() => handleNav(item[0])}
            >
              {item[0] === 'agronom.html' ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>🤖</span>
                    <span>{t(navMap[item[0]], item[1])}</span>
                  </span>
                  <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '10px', padding: '2px 7px', borderRadius: '6px', fontWeight: 800 }}>
                    AI
                  </span>
                </span>
              ) : (
                t(navMap[item[0]], item[1])
              )}
            </button>
          ))}
        </nav>

        {/* Mobile Install App Button */}
        <div style={{ padding: '16px 22px 28px' }}>
          <button
            type="button"
            className="ag-btn ag-btn-green"
            onClick={() => {
              const promptEvent = window.__pwaDeferredPrompt;
              if (promptEvent) {
                promptEvent.prompt();
              } else {
                window.dispatchEvent(new Event('open-pwa-modal'));
              }
              setMobileMenuOpen(false);
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '14px',
              borderRadius: '14px',
              fontWeight: 800,
              fontSize: '0.95rem',
              boxShadow: '0 6px 20px rgba(21, 128, 61, 0.35)',
            }}
          >
            <i className="fa-solid fa-mobile-screen-button"></i>
            <span>{t('install_app_btn')}</span>
          </button>
        </div>
      </div>
    </>
  );
}
