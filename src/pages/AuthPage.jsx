import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function AuthPage({ onShowToast, onLoginSuccess }) {
  const { t } = useLanguage();
  const [tab, setTab] = useState('register');
  const [role, setRole] = useState('fermer');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone.trim() || !password.trim()) {
      onShowToast(t('phone_label') + " & " + t('password_label'));
      return;
    }

    if (tab === 'register') {
      onShowToast(`${name || 'User'} ✓`);
    } else {
      onShowToast(t('login_btn') + " ✓");
    }
    if (onLoginSuccess) onLoginSuccess();
  };

  const roles = [
    { id: 'fermer', label: `🌾 ${t('role_farmer')}` },
    { id: 'xaridor', label: `🛒 ${t('role_buyer')}` },
    { id: 'texnika', label: `🚜 ${t('role_machinery')}` },
    { id: 'agronom', label: `🌿 ${t('role_agronom')}` }
  ];

  return (
    <main id="top">
      <section className="section">
        <div className="container" style={{ maxWidth: '560px' }}>
          <div className="section-head" style={{ textAlign: 'center' }}>
            <span className="kicker">{t('auth_kicker')}</span>
            <h2>{t('auth_title')}</h2>
            <p className="lead">{t('auth_lead')}</p>
          </div>

          <div className="chart-box" style={{ padding: '32px' }}>
            {/* Tabs */}
            <div className="chips-row" style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <button
                type="button"
                className={`chip ${tab === 'register' ? 'active' : ''}`}
                onClick={() => setTab('register')}
                style={{ padding: '10px 24px' }}
              >
                {t('register_btn')}
              </button>
              <button
                type="button"
                className={`chip ${tab === 'login' ? 'active' : ''}`}
                onClick={() => setTab('login')}
                style={{ padding: '10px 24px' }}
              >
                {t('login_btn')}
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {tab === 'register' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '6px' }}>
                      {t('name_label')}
                    </label>
                    <input 
                      type="text" 
                      className="header-search" 
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px' }}
                      placeholder="Akmal Karimov"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '6px' }}>
                      {t('role_label')}
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      {roles.map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          className={`chip ${role === r.id ? 'active' : ''}`}
                          onClick={() => setRole(r.id)}
                          style={{ textAlign: 'center', justifyContent: 'center', padding: '10px' }}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '6px' }}>
                  {t('phone_label')}
                </label>
                <input 
                  type="tel" 
                  className="header-search" 
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px' }}
                  placeholder="+998 90 123 45 67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.9rem', marginBottom: '6px' }}>
                  {t('password_label')}
                </label>
                <input 
                  type="password" 
                  className="header-search" 
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px' }}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="ag-btn ag-btn-yellow" 
                style={{ marginTop: '12px', width: '100%', padding: '14px' }}
              >
                {tab === 'register' ? t('register_btn') : t('login_btn')}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
