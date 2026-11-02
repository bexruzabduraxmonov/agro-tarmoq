import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Logo from './Logo';

export default function PwaInstallBanner({ onShowToast }) {
  const { t } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if already running as installed standalone PWA
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    setIsStandalone(isStandaloneMode);

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Listen for Android / Chrome beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // If app installed successfully
    window.addEventListener('appinstalled', () => {
      setIsInstallable(false);
      setDeferredPrompt(null);
      if (onShowToast) {
        onShowToast('Agro Tarmoq ilovasi muvaffaqiyatli oʻrnatildi! 🎉');
      }
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [onShowToast]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstallable(false);
      }
      setDeferredPrompt(null);
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };

  // If already installed or dismissed, don't show floating banner
  if (isStandalone) return null;

  return (
    <>
      {/* Discreet Floating Install Bar at bottom-right or header */}
      {!dismissed && (
        <div 
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '20px',
            zIndex: 85,
            background: 'linear-gradient(135deg, #064e3b, #047857)',
            color: '#fff',
            padding: '10px 16px',
            borderRadius: '999px',
            boxShadow: '0 10px 25px rgba(6, 78, 59, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          <div 
            onClick={handleInstallClick} 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
          >
            <span style={{ fontSize: '18px' }}>📲</span>
            <span style={{ fontSize: '0.86rem', fontWeight: 700, letterSpacing: '-0.01em' }}>
              {t('pwa_btn')}
            </span>
          </div>

          <button 
            type="button" 
            onClick={() => setDismissed(true)} 
            style={{ 
              background: 'rgba(255,255,255,0.2)', 
              border: 'none', 
              color: '#fff', 
              width: '20px', 
              height: '20px', 
              borderRadius: '50%', 
              fontSize: '11px', 
              display: 'grid', 
              placeItems: 'center', 
              cursor: 'pointer',
              marginLeft: '4px'
            }}
            title="Yopish"
          >
            ✕
          </button>
        </div>
      )}

      {/* PWA Instruction Modal */}
      {showModal && (
        <div 
          className="ag-overlay open" 
          onClick={() => setShowModal(false)}
          role="dialog"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 120 }}
        >
          <div 
            className="cart-panel" 
            style={{ 
              maxWidth: '460px', 
              width: '100%', 
              height: 'auto', 
              borderRadius: 'var(--radius)', 
              margin: 'auto',
              background: '#fff',
              padding: '28px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.35)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Logo size={36} showTagline={false} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
                  Agro Tarmoq Ilovasi
                </h3>
              </div>
              <button 
                type="button" 
                onClick={() => setShowModal(false)} 
                style={{ fontSize: '22px', border: 'none', background: 'none', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-color)', lineHeight: 1.5, marginBottom: '18px' }}>
              Saytni telefoningizga ilova koʻrinishida oʻrnatib oling. Brauzer ramkasisiz, toʻliq ekran va tezkor ishlaydi!
            </p>

            {/* Android / Desktop Instruction */}
            {!isIOS ? (
              <div style={{ background: 'var(--background-color)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '18px' }}>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--primary-dark)', marginBottom: '6px' }}>
                  🤖 Android va Kompyuter uchun:
                </div>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-color)', lineHeight: 1.5 }}>
                  Quyidagi <strong>"Oʻrnatish"</strong> tugmasini bosing yoki brauzer menyusidagi (3 nuqta) <strong>"Ilovani oʻrnatish"</strong> yoki <strong>"Asosiy ekranga qoʻshish"</strong> bandini tanlang.
                </div>
              </div>
            ) : (
              /* iOS Safari Instruction */
              <div style={{ background: 'var(--yellow-soft)', padding: '16px', borderRadius: '12px', border: '1px solid #eddca0', marginBottom: '18px' }}>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#8c5e00', marginBottom: '6px' }}>
                  🍎 iPhone (iOS) Safari uchun:
                </div>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-color)', lineHeight: 1.6 }}>
                  1. Safari pastki menyusidagi <strong>Ulashish (Share ⎋)</strong> belgisini bosing.<br />
                  2. Roʻyxatdan <strong>"Asosiy ekranga qoʻshish" (Add to Home Screen ⊞)</strong> bandini tanlang.<br />
                  3. Yuqori oʻngdagi <strong>"Qoʻshish"</strong> tugmasini bosing.
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '22px', textAlign: 'center' }}>
              <div style={{ background: 'var(--green-soft)', padding: '10px', borderRadius: '10px' }}>
                <div style={{ fontSize: '18px' }}>⚡</div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary-dark)', marginTop: '2px' }}>Tezkor</div>
              </div>
              <div style={{ background: 'var(--green-soft)', padding: '10px', borderRadius: '10px' }}>
                <div style={{ fontSize: '18px' }}>📱</div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary-dark)', marginTop: '2px' }}>Toʻliq ekran</div>
              </div>
              <div style={{ background: 'var(--green-soft)', padding: '10px', borderRadius: '10px' }}>
                <div style={{ fontSize: '18px' }}>💾</div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary-dark)', marginTop: '2px' }}>Oflayn kesh</div>
              </div>
            </div>

            {deferredPrompt && (
              <button
                type="button"
                className="ag-btn ag-btn-green"
                style={{ width: '100%', padding: '13px', fontWeight: 700, fontSize: '0.95rem' }}
                onClick={handleInstallClick}
              >
                📲 Hozir oʻrnatish
              </button>
            )}

            {!deferredPrompt && (
              <button
                type="button"
                className="ag-btn ag-btn-green"
                style={{ width: '100%', padding: '12px', fontWeight: 700 }}
                onClick={() => setShowModal(false)}
              >
                Tushunarli ✓
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
