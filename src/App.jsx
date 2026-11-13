import React, { useState, useEffect } from 'react';
import './site123.css';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
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
import FarmerDashboardPage from './pages/FarmerDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AddProductModal from './components/AddProductModal';
import FavoritesModal from './components/FavoritesModal';
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
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastShow, setToastShow] = useState(false);

  // Favorites state
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('agro_favorites');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('agro_favorites', JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const handleToggleFavorite = (e, id) => {
    e?.stopPropagation?.();
    setFavorites((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      showToast(next[id] ? "Sevimlilarga qo'shildi ❤️" : "Sevimlilardan olib tashlandi");
      return next;
    });
  };

  const favoritesCount = Object.values(favorites).filter(Boolean).length;

  // Dynamic products (user added)
  const [dynamicProducts, setDynamicProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('agro_dynamic_products');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('agro_dynamic_products', JSON.stringify(dynamicProducts));
    } catch {}
  }, [dynamicProducts]);

  const handleAddProduct = (newProd) => {
    setDynamicProducts((prev) => [newProd, ...prev]);
    showToast("E'loningiz muvaffaqiyatli joylashtirildi! 🎉");
  };

  const handleDeleteProduct = (id) => {
    setDynamicProducts((prev) => prev.filter((p) => p.id !== id));
    showToast("E'lon o'chirildi");
  };

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
    } catch {}
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
        <div className="app-container">
          {/* Header */}
          <Header
            currentPage={currentPage}
            setCurrentPage={handleNavigate}
            cartCount={totalCartCount}
            onOpenCart={() => setIsCartOpen(true)}
            favoritesCount={favoritesCount}
            onOpenFavorites={() => setIsFavoritesOpen(true)}
            onOpenAddProduct={() => setIsAddProductOpen(true)}
            onSearch={handleSearch}
            onShowToast={showToast}
          />

          {/* Pages Switcher */}
          {currentPage === 'home' && (
            <HomePage
              onNavigate={handleNavigate}
              onAddToCart={handleAddToCart}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          )}

          {currentPage === 'bozor' && (
            <BozorPage
              onAddToCart={handleAddToCart}
              products={dynamicProducts}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          )}

          {currentPage === 'farmer-dashboard' && (
            <FarmerDashboardPage
              onNavigate={handleNavigate}
              products={dynamicProducts}
              onDeleteProduct={handleDeleteProduct}
              onOpenAddProduct={() => setIsAddProductOpen(true)}
              onShowToast={showToast}
            />
          )}

          {currentPage === 'admin-dashboard' && (
            <AdminDashboardPage
              onNavigate={handleNavigate}
              products={dynamicProducts}
              onDeleteProduct={handleDeleteProduct}
              onShowToast={showToast}
            />
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
              onLoginSuccess={() => handleNavigate('farmer-dashboard')} 
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

          {/* Favorites Modal */}
          <FavoritesModal
            isOpen={isFavoritesOpen}
            onClose={() => setIsFavoritesOpen(false)}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
          />

          {/* Add Product Modal */}
          <AddProductModal
            isOpen={isAddProductOpen}
            onClose={() => setIsAddProductOpen(false)}
            onAddProduct={handleAddProduct}
          />

          {/* PWA Install Banner */}
          <PwaInstallBanner onShowToast={showToast} />

          {/* Mobile & Installed PWA Bottom Navigation Bar */}
          <BottomNav
            currentPage={currentPage}
            onNavigate={handleNavigate}
            cartCount={totalCartCount}
            onOpenCart={() => setIsCartOpen(true)}
            favoritesCount={favoritesCount}
            onOpenFavorites={() => setIsFavoritesOpen(true)}
            onOpenAddProduct={() => setIsAddProductOpen(true)}
          />

          {/* Toast Notification */}
          <div className={`ag-toast ${toastShow ? 'show' : ''}`} id="toast">
            {toastMsg}
          </div>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
