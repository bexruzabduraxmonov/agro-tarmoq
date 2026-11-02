import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function BottomNav({ currentPage, onNavigate, cartCount, onOpenCart }) {
  const { t } = useLanguage();
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detect if running as standalone installed PWA
    const checkStandalone = 
      window.matchMedia('(display-mode: standalone)').matches || 
      window.navigator.standalone === true;
    setIsStandalone(checkStandalone);

    const media = window.matchMedia('(display-mode: standalone)');
    const listener = (e) => setIsStandalone(e.matches);
    try {
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    } catch {
      // Safari legacy fallback
      media.addListener(listener);
      return () => media.removeListener(listener);
    }
  }, []);

  const navItems = [
    {
      id: 'home',
      label: t('tab_home'),
      icon: 'fa-solid fa-house',
      active: currentPage === 'home',
      onClick: () => onNavigate('home')
    },
    {
      id: 'bozor',
      label: t('tab_catalog'),
      icon: 'fa-solid fa-shapes',
      active: currentPage === 'bozor',
      onClick: () => onNavigate('bozor')
    },
    {
      id: 'search',
      label: t('tab_search'),
      icon: 'fa-solid fa-magnifying-glass',
      active: currentPage === 'search',
      onClick: () => onNavigate('search')
    },
    {
      id: 'cart',
      label: t('tab_cart'),
      icon: 'fa-solid fa-cart-shopping',
      active: false,
      badge: cartCount > 0 ? cartCount : null,
      onClick: onOpenCart
    },
    {
      id: 'royxatdan-otish',
      label: t('tab_profile'),
      icon: 'fa-regular fa-user',
      active: currentPage === 'royxatdan-otish',
      onClick: () => onNavigate('royxatdan-otish')
    }
  ];

  return (
    <nav 
      className={`agro-bottom-nav ${isStandalone ? 'is-standalone' : ''}`}
      aria-label="Mobil pastki menyu"
    >
      <div className="bottom-nav-inner">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`bottom-nav-item ${item.active ? 'active' : ''}`}
            onClick={item.onClick}
            aria-label={item.label}
          >
            <div className="bottom-nav-icon-wrap">
              <i className={item.icon}></i>
              {item.badge && (
                <span className="bottom-nav-badge">
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </div>
            <span className="bottom-nav-label">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
