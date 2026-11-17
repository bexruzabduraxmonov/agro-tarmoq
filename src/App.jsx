import React, { useState, useEffect, Suspense, lazy } from 'react';
import './site123.css';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartOverlay from './components/CartOverlay';
import HomePage from './pages/HomePage';
import PwaInstallBanner from './components/PwaInstallBanner';
import BottomNav from './components/BottomNav';
import AiAgronomBot from './components/AiAgronomBot';

// Sahifalarni lazy import qilish orqali ilk sahifa tez ochilishini ta'minlash
const BozorPage = lazy(() => import('./pages/BozorPage'));
const NarxlarPage = lazy(() => import('./pages/NarxlarPage'));
const ObHavoPage = lazy(() => import('./pages/ObHavoPage'));
const TexnikaPage = lazy(() => import('./pages/TexnikaPage'));
const AgronomPage = lazy(() => import('./pages/AgronomPage'));
const DokonPage = lazy(() => import('./pages/DokonPage'));
const XojalikPage = lazy(() => import('./pages/XojalikPage'));
const IshlarPage = lazy(() => import('./pages/IshlarPage'));
const YangiliklarPage = lazy(() => import('./pages/YangiliklarPage'));
const ChorvachilikPage = lazy(() => import('./pages/ChorvachilikPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));

function PageLoader() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh',
      gap: '12px',
      color: '#059669',
      fontSize: '15px',
      fontWeight: '600'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid rgba(5, 150, 105, 0.2)',
        borderTopColor: '#059669',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite'
      }} />
      <span>Yuklanmoqda...</span>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

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
    <ThemeProvider>
    <LanguageProvider>
    <UserProvider>
      <div className="app-container">
        {/* Header */}
        <Header
          currentPage={currentPage}
          setCurrentPage={handleNavigate}
          cartCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
          onSearch={handleSearch}
          onShowToast={showToast}
        />

      {/* Pages Switcher with Suspense */}
      <Suspense fallback={<PageLoader />}>
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} onAddToCart={handleAddToCart} onShowToast={showToast} />
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
          <AgronomPage onNavigate={handleNavigate} onShowToast={showToast} />
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
            onNavigate={handleNavigate}
            onLoginSuccess={() => handleNavigate('royxatdan-otish')} 
          />
        )}

        {currentPage === 'search' && (
          <SearchPage 
            query={searchQuery}
            setQuery={setSearchQuery}
            onAddToCart={handleAddToCart} 
            onNavigate={handleNavigate} 
          />
        )}
      </Suspense>

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

      {/* Interactive AI Agronom Assistant Bot */}
      <AiAgronomBot 
        onNavigate={handleNavigate}
        onShowToast={showToast}
      />

      {/* Toast Notification */}
      <div className={`ag-toast ${toastShow ? 'show' : ''}`} id="toast">
        {toastMsg}
      </div>
    </div>
    </UserProvider>
  </LanguageProvider>
  </ThemeProvider>
  );
}
