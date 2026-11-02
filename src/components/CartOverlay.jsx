import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { fmt, money } from '../utils/helpers';

export default function CartOverlay({ isOpen, onClose, cart, onRemoveItem, onClearCart, onShowToast }) {
  const { t } = useLanguage();
  if (!isOpen) return null;

  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <div className="ag-overlay open" onClick={onClose} role="dialog" aria-label={t('cart_title')}>
      <div 
        className="cart-panel" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="row" style={{ marginBottom: '16px' }}>
          <h3>{t('cart_title')}</h3>
          <button 
            type="button" 
            onClick={onClose} 
            aria-label={t('menu_close')} 
            style={{ fontSize: '22px' }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div id="cartItems">
          {cart.length === 0 ? (
            <p className="empty">{t('cart_empty')}</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="card-top" style={{ gap: '10px' }}>
                  <span className="emoji-circle ec-green" style={{ width: '42px', height: '42px', fontSize: '20px' }}>
                    {item.emoji}
                  </span>
                  <div>
                    <strong>{item.name}</strong>
                    <div className="sub">
                      {item.qty} {item.unit} × {fmt(item.price)}
                    </div>
                  </div>
                </div>

                <div className="row" style={{ gap: '10px' }}>
                  <strong>{fmt(item.price * item.qty)} {t('price_unit')}</strong>
                  <button 
                    type="button" 
                    className="del" 
                    onClick={() => onRemoveItem(item.id)} 
                    aria-label={t('toast_deleted')}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <>
            <div id="cartTotal" style={{ marginTop: '14px', fontWeight: 800, fontSize: '1.1rem' }}>
              {t('cart_total')} {fmt(total)} {t('price_unit')}
            </div>
            
            <button
              type="button"
              className="ag-btn ag-btn-yellow"
              style={{ marginTop: '14px', width: '100%' }}
              onClick={() => {
                onShowToast(t('order_success'));
                onClearCart();
                onClose();
              }}
            >
              {t('checkout_btn')}
            </button>

            <button 
              type="button" 
              className="ag-btn ag-btn-green" 
              onClick={onClearCart} 
              style={{ marginTop: '10px', width: '100%' }}
            >
              {t('clear_cart')}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
