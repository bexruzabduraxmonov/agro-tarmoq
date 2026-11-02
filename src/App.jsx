import React, { useState, useEffect } from 'react';
import './site123.css';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartOverlay from './components/CartOverlay';
import HomePage from './pages/HomePage';
import BozorPage from './pages/BozorPage';
import NarxlarPage from './pages/NarxlarPage';
import ObHavoPage from './pages/ObHavoPage';
import TexnikaPage from './pages/TexnikaPage';
import AgronomPage from './pages/AgronomPage';
import DokonPage from './pages/DokonPage';
import XojalikPage from './pages/XojalikPage';
import IshlarPage from './pages/IshlarPage';
import YangiliklarPage from './pages/YangiliklarPage';
import ChorvachilikPage from './pages/ChorvachilikPage';
import AuthPage from './pages/AuthPage';
import SearchPage from './pages/SearchPage';
import PwaInstallBanner from './components/PwaInstallBanner';
import BottomNav from './components/BottomNav';

export default function App() {
  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'home';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastShow, setToastShow] = useState(false);

  // Cart state in localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('agro_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('agro_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Hash route listener
  useEffect(() => {
    const handleHashChange = () => {
      const page = window.location.hash.replace('#', '') || 'home';
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setToastShow(true);
    setTimeout(() => {
      setToastShow(false);
    }, 2800);
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          emoji: product.emoji,
          price: product.price,
          unit: product.unit,
          qty: 1
        }
      ];
    });
    showToast(`${product.name} savatga qoʻshildi ✓`);
  };

  const handleRemoveItem = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
    showToast("Savatdan oʻchirildi");
  };

  const handleClearCart = () => {
    setCart([]);
    showToast("Savat boʻshatildi");
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    handleNavigate('search');
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <LanguageProvider>
      <div className="app-container">
        {/* Header */}
        <Header
          currentPage={currentPage}
          setCurrentPage={handleNavigate}
          cartCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
          onSearch={handleSearch}
        />

      {/* Pages Switcher */}
      {currentPage === 'home' && (
        <HomePage onNavigate={handleNavigate} />
      )}

      {currentPage === 'bozor' && (
        <BozorPage onAddToCart={handleAddToCart} />
      )}

      {currentPage === 'narxlar' && (
        <NarxlarPage onShowToast={showToast} />
      )}

      {currentPage === 'obhavo' && (
        <ObHavoPage onShowToast={showToast} />
      )}

      {currentPage === 'texnika' && (
        <TexnikaPage onShowToast={showToast} />
      )}

      {currentPage === 'agronom' && (
        <AgronomPage />
      )}

      {currentPage === 'dokon' && (
        <DokonPage onShowToast={showToast} />
      )}

      {currentPage === 'xojalik' && (
        <XojalikPage onShowToast={showToast} />
      )}

      {currentPage === 'ishlar' && (
        <IshlarPage onShowToast={showToast} />
      )}

      {currentPage === 'yangiliklar' && (
        <YangiliklarPage />
      )}

      {currentPage === 'chorvachilik' && (
        <ChorvachilikPage onShowToast={showToast} />
      )}

      {currentPage === 'royxatdan-otish' && (
        <AuthPage 
          onShowToast={showToast} 
          onLoginSuccess={() => handleNavigate('home')} 
        />
      )}

      {currentPage === 'search' && (
        <SearchPage 
          query={searchQuery} 
          onAddToCart={handleAddToCart} 
          onNavigate={handleNavigate} 
        />
      )}

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Shopping Cart Drawer */}
      <CartOverlay
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onShowToast={showToast}
      />

      {/* PWA Install Banner */}
      <PwaInstallBanner onShowToast={showToast} />

      {/* Mobile & Installed PWA Bottom Navigation Bar (Uzum Market Style) */}
      <BottomNav
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Toast Notification */}
      <div className={`ag-toast ${toastShow ? 'show' : ''}`} id="toast">
        {toastMsg}
      </div>
    </div>
  </LanguageProvider>
  );
}
