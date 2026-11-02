import React from 'react';
import Logo from './Logo';

export default function LogoSwitcherModal({ isOpen, onClose, onSelectVariant, currentVariant }) {
  if (!isOpen) return null;

  const variants = [
    {
      id: 'official',
      title: '1. Rasmiy Agro Tarmoq',
      desc: 'Yuklangan rasmiy nishon: traktor, qator dalalar, tonggi oltin quyosh, Wi-Fi tarmoq toʻlqinlari va unib chiqqan yashil novda.',
      tag: 'Asosiy & Rasmiy'
    },
    {
      id: 'infinity',
      title: '2. Agro Infinity & Leaf',
      desc: 'Zamonaviy "A" harfi, cheksiz unumdorlik (Infinity) va yashil bio-barg uygʻunligi. Startaplar uslubida.',
      tag: 'Muqobil'
    },
    {
      id: 'hexagon',
      title: '3. Smart Bio-Hexagon',
      desc: 'Aqlli agrotexnik geksagon katak: yarmi yashil ekologik barg, yarmi tilla rang don va raqamli sensor tugunlari.',
      tag: 'AgroTech'
    },
    {
      id: 'aerowheat',
      title: '4. Minimal Aero-Wheat',
      desc: '3 ta dinamik aerodinamik shoxcha va oltin quyosh. Minimalist, premium va qatʼiy zamonaviy brending.',
      tag: 'Minimalist'
    },
    {
      id: 'network',
      title: '5. Agro Network Shield',
      desc: 'Fermerlar, bozor va texnologiyalarni bitta xavfsiz tarmoqqa birlashtiruvchi zamonaviy ekotizim nishoni.',
      tag: 'Ekosistema'
    }
  ];

  return (
    <div 
      className="ag-overlay open" 
      onClick={onClose}
      role="dialog" 
      aria-label="Logotipni tanlash"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 110 }}
    >
      <div 
        className="cart-panel" 
        style={{ 
          maxWidth: '680px', 
          width: '100%', 
          height: 'auto', 
          maxHeight: '90vh', 
          borderRadius: 'var(--radius)', 
          margin: 'auto',
          background: '#fff',
          padding: '28px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.35)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>🎨 Zamonaviy Logotiplar Kolleksiyasi</h3>
            <p className="sub" style={{ fontSize: '0.86rem', marginTop: '4px' }}>
              Saytingiz uchun eng maʼqul boʻlgan xalqaro darajadagi zamonaviy uslubni tanlang:
            </p>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            style={{ fontSize: '24px', border: 'none', background: 'transparent', cursor: 'pointer', padding: '4px' }}
          >
            ✕
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginTop: '16px' }}>
          {variants.map((v) => {
            const isSelected = currentVariant === v.id;
            return (
              <div
                key={v.id}
                onClick={() => {
                  onSelectVariant(v.id);
                  onClose();
                }}
                style={{
                  border: isSelected ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                  background: isSelected ? 'var(--green-soft)' : '#fff',
                  borderRadius: '14px',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: '0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: isSelected ? '0 6px 18px rgba(22, 101, 52, 0.15)' : 'none'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span 
                      style={{ 
                        fontSize: '0.72rem', 
                        fontWeight: 700, 
                        background: isSelected ? 'var(--primary-color)' : '#e2ece4', 
                        color: isSelected ? '#fff' : 'var(--primary-dark)',
                        padding: '3px 8px',
                        borderRadius: '6px'
                      }}
                    >
                      {v.tag}
                    </span>
                    {isSelected && (
                      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary-color)' }}>
                        ✓ Tanlangan
                      </span>
                    )}
                  </div>

                  <div style={{ padding: '10px 0', display: 'flex', justifyContent: 'center' }}>
                    <Logo variant={v.id} size={48} showTagline={true} />
                  </div>

                  <div style={{ fontWeight: 800, fontSize: '0.98rem', marginTop: '10px', color: 'var(--text-color)' }}>
                    {v.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--muted-color)', marginTop: '4px', lineHeight: 1.5 }}>
                    {v.desc}
                  </div>
                </div>

                <button
                  type="button"
                  className={`ag-btn ${isSelected ? 'ag-btn-green' : 'ag-btn-white'}`}
                  style={{ width: '100%', marginTop: '14px', padding: '8px 12px', fontSize: '0.82rem', fontWeight: 700 }}
                >
                  {isSelected ? 'Oʻrnatilgan' : 'Ushbu logoni tanlash'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
