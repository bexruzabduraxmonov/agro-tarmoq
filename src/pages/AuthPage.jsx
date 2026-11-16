import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { fmt } from '../utils/helpers';
import { AGRO_DATA } from '../data/agroData';
import { generateAiAgronomAnswer } from '../utils/aiAgronomEngine';
import officialLogoImg from '../assets/logo.png';

// Preset sample equipment images
const EQUIPMENT_PRESET_IMAGES = [
  { id: 'mtz', label: 'MTZ Belarus Traktor', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a2756e.jpg?format=avif' },
  { id: 'jd', label: 'John Deere Traktor', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a27573.jpg?format=avif' },
  { id: 'claas', label: 'Claas Kombayn', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a2757a.jpg?format=avif' },
  { id: 'don', label: 'Don-1500 Kombayn', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a27581.jpg?format=avif' },
  { id: 'agras', label: 'Agras T40 Dron', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a27587.jpg?format=avif' },
  { id: 'dji', label: 'DJI T20 Dron', img: 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a2758f.jpg?format=avif' }
];

// Official benchmark products with platform-agreed prices
const OFFICIAL_MARKET_PRODUCTS = [
  { id: 'pomidor', name: 'Pomidor (Qizil, serhosil)', cat: 'sabzavot', emoji: '🍅', benchmarkPrice: 12000, unit: 'kg', minAllowed: 10500, maxAllowed: 13500, img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80' },
  { id: 'bodring', name: 'Bodring (Navroʻz navi)', cat: 'sabzavot', emoji: '🥒', benchmarkPrice: 9000, unit: 'kg', minAllowed: 8000, maxAllowed: 10500, img: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=600&q=80' },
  { id: 'kartoshka', name: 'Kartoshka (Qizil, qumloq)', cat: 'sabzavot', emoji: '🥔', benchmarkPrice: 6500, unit: 'kg', minAllowed: 5800, maxAllowed: 7200, img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80' },
  { id: 'piyoz', name: 'Piyoz (Zarafshon sariq)', cat: 'sabzavot', emoji: '🧅', benchmarkPrice: 5500, unit: 'kg', minAllowed: 4800, maxAllowed: 6200, img: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80' },
  { id: 'sabzi', name: 'Sabzi (Sariq va qizil mirzoyi)', cat: 'sabzavot', emoji: '🥕', benchmarkPrice: 7000, unit: 'kg', minAllowed: 6000, maxAllowed: 8000, img: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80' },
  { id: 'bugdoy', name: 'Bugʻdoy (1-nav, toza)', cat: 'don', emoji: '🌾', benchmarkPrice: 3800, unit: 'kg', minAllowed: 3400, maxAllowed: 4200, img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80' },
  { id: 'olma', name: 'Olma (Besh yulduz qizil)', cat: 'meva', emoji: '🍎', benchmarkPrice: 14000, unit: 'kg', minAllowed: 12500, maxAllowed: 15500, img: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80' },
  { id: 'uzum', name: 'Uzum (Qora kishmish)', cat: 'meva', emoji: '🍇', benchmarkPrice: 18000, unit: 'kg', minAllowed: 16000, maxAllowed: 20000, img: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=600&q=80' }
];

const REGIONS = [
  'Toshkent viloyati', 'Toshkent shahri', 'Samarqand viloyati', 
  'Fargʻona viloyati', 'Andijon viloyati', 'Namangan viloyati', 
  'Buxoro viloyati', 'Qashqadaryo viloyati', 'Surxondaryo viloyati', 
  'Xorazm viloyati', 'Navoiy viloyati', 'Jizzax viloyati', 
  'Sirdaryo viloyati', 'Qoraqalpogʻiston Respublikasi'
];

export default function AuthPage({ onShowToast, onNavigate, onLoginSuccess }) {
  const { t, lang } = useLanguage();
  const { 
    user, login, register: registerUser, logout, updateUser,
    userEquip, addEquipment, removeEquipment, toggleEquipmentStatus,
    userProducts, addProduct, removeProduct 
  } = useUser();

  // Auth form states (when user is not logged in)
  const [authTab, setAuthTab] = useState('register');
  const [role, setRole] = useState('fermer');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [region, setRegion] = useState('Toshkent viloyati');

  // Profile active section view ('listings' | 'add-tractor' | 'add-produce' | 'orders' | 'chat' | 'stats' | 'settings' | 'help')
  const [activeView, setActiveView] = useState('listings');
  const [mobileModalOpen, setMobileModalOpen] = useState(false);

  // Tractor / Equipment Rental form states
  const [eqName, setEqName] = useState('');
  const [eqType, setEqType] = useState('traktor');
  const [eqPrice, setEqPrice] = useState('');
  const [eqRegion, setEqRegion] = useState(user?.region || 'Toshkent viloyati');
  const [eqPhone, setEqPhone] = useState(user?.phone || '');
  const [eqNote, setEqNote] = useState('Haydovchisi bilan, plug va kultivator bor');
  const [eqSelectedImg, setEqSelectedImg] = useState(EQUIPMENT_PRESET_IMAGES[0].img);

  // Produce Selling form states (with platform agreed price)
  const [prodSelectId, setProdSelectId] = useState(OFFICIAL_MARKET_PRODUCTS[0].id);
  const selectedMarketProd = OFFICIAL_MARKET_PRODUCTS.find(p => p.id === prodSelectId) || OFFICIAL_MARKET_PRODUCTS[0];
  const [prodCustomPrice, setProdCustomPrice] = useState(selectedMarketProd.benchmarkPrice.toString());
  const [prodAmount, setProdAmount] = useState('500 kg');
  const [prodRegion, setProdRegion] = useState(user?.region || 'Toshkent viloyati');
  const [prodPhone, setProdPhone] = useState(user?.phone || '');
  const [prodDesc, setProdDesc] = useState('Toza, yangi uzilgan tabiiy hosil. Dala maydonidan toʻgʻridan-toʻgʻri yuklab beriladi.');
  const [isAgreedConfirmed, setIsAgreedConfirmed] = useState(true);

  // Profile Settings form states
  const [editName, setEditName] = useState(user?.name || 'Akmal');
  const [editPhone, setEditPhone] = useState(user?.phone || '+998 90 123 45 67');
  const [editRegion, setEditRegion] = useState(user?.region || 'Toshkent viloyati');
  const [editRole, setEditRole] = useState(user?.role || 'fermer');

  // Interactive Chat & Bot state
  const [activeChatId, setActiveChatId] = useState('agronom'); // 'agronom' | 'tractor' | 'support'
  const [chatInput, setChatInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatMessagesEndRef = useRef(null);

  const [chatThreads, setChatThreads] = useState({
    agronom: [
      {
        id: 1,
        sender: 'bot',
        title: "🤖 AI Agronom Yordamchisi",
        text: "Assalomu alaykum! Men Agro Tarmoq sunʼiy intellekt agronomiman. Ekin kasalliklarini aniqlash, oʻgʻit meʼyorlari, zararkunandalarga qarshi kurash va traktor/texnika boʻyicha qanday yordam bera olaman?",
        time: "10:24"
      }
    ],
    tractor: [
      {
        id: 1,
        sender: 'partner',
        title: "🚜 Bekzod Toshev (MTZ)",
        text: "Assalomu alaykum! MTZ-82 Belarus traktorim ijaraga boʻsh. Plug, kultivator va haydovchisi bilan birga boradi. Qaysi viloyatga va qachonga kerak edi?",
        time: "09:40"
      }
    ],
    support: [
      {
        id: 1,
        sender: 'partner',
        title: "🛡️ Agro Tarmoq Qoʻllab-quvvatlash",
        text: "Assalomu alaykum! Agro Tarmoq maʼmuriyati. Eʼlon berish, traktor ijarasi yoki mahsulotlarni rasmiy kelishilgan narxda sotish boʻyicha savolingiz bormi?",
        time: "Kecha"
      }
    ]
  });

  const chatQuickPrompts = [
    { label: '🍅 Pomidor fitoftorasi', text: 'Pomidor bargida qora-jigarrang dogʻlar paydo boʻldi, qanday dori sepish kerak?' },
    { label: '🌾 Bugʻdoy zang kasalligi', text: 'Bugʻdoy barglarida sariq zang dogʻlari bor, davolash usullari qanday?' },
    { label: '🚜 Traktorni ijaraga olish', text: 'Traktorni haydovchisi bilan birga qanday shartlarda ijaraga olish mumkin?' },
    { label: '💧 Sugʻorish meʼyori', text: 'Issiqxonada bodring va pomidorni sugʻorish meʼyori va davriyligi qanday?' },
    { label: '💰 Kelishilgan narx', text: 'Platformada hosil sotishda narx qanday kelishiladi va tasdiqlanadi?' }
  ];

  const roles = [
    { id: 'fermer', label: `🌾 ${t('role_farmer', 'Fermer')}` },
    { id: 'texnika', label: `🚜 ${t('role_machinery', 'Texnika egasi')}` },
    { id: 'xaridor', label: `🛒 ${t('role_buyer', 'Xaridor')}` },
    { id: 'agronom', label: `🌿 ${t('role_agronom', 'Agronom')}` }
  ];

  useEffect(() => {
    if (activeView === 'chat') {
      chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatThreads, activeChatId, activeView, isBotTyping]);

  // Open view helper (on mobile triggers modal, on desktop changes pane)
  const openSection = (sectionKey) => {
    setActiveView(sectionKey);
    setMobileModalOpen(true);
  };

  // Handle Login & Register submission
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!phone.trim() || !password.trim()) {
      onShowToast("Telefon raqami va parolni kiriting!");
      return;
    }

    if (authTab === 'register') {
      const newUser = registerUser({
        name: name.trim() || 'Akmal',
        phone: phone.trim(),
        role,
        region
      });
      onShowToast(`Xush kelibsiz, ${newUser.name}! Shaxsiy kabinetingiz ochildi ✓`);
    } else {
      const loggedUser = login({
        name: name.trim() || 'Akmal',
        phone: phone.trim(),
        role: role || 'fermer',
        region: region || 'Toshkent viloyati'
      });
      onShowToast(`Tizimga muvaffaqiyatli kirdingiz ✓`);
    }

    if (onLoginSuccess) onLoginSuccess();
  };

  // Handle Equipment Addition
  const handleAddEquipment = (e) => {
    e.preventDefault();
    if (!eqName.trim() || !eqPrice) {
      onShowToast("Iltimos, texnika nomi va narxini kiriting!");
      return;
    }

    const added = addEquipment({
      name: eqName.trim(),
      type: eqType,
      price: Number(eqPrice),
      region: eqRegion,
      phone: eqPhone || user?.phone,
      note: eqNote,
      img: eqSelectedImg
    });

    onShowToast(`🚜 "${added.name}" ijaraga berish uchun joylashtirildi! ✓`);
    setEqName('');
    setEqPrice('');
    setActiveView('listings');
  };

  // Handle Product Addition with Platform Agreed Price Enforcement
  const handleAddProduct = (e) => {
    e.preventDefault();
    const enteredPrice = Number(prodCustomPrice);

    if (enteredPrice > selectedMarketProd.maxAllowed) {
      onShowToast(`⚠️ Narx Agro Tarmoq kelishilgan narxidan (${fmt(selectedMarketProd.maxAllowed)} soʻm) yuqori!`);
      return;
    }

    if (!isAgreedConfirmed) {
      onShowToast("Iltimos, platforma kelishilgan narx shartini tasdiqlang!");
      return;
    }

    const added = addProduct({
      name: `${selectedMarketProd.name} (${prodAmount})`,
      cat: selectedMarketProd.cat,
      emoji: selectedMarketProd.emoji,
      price: enteredPrice,
      unit: selectedMarketProd.unit,
      region: prodRegion,
      phone: prodPhone || user?.phone,
      desc: prodDesc,
      img: selectedMarketProd.img
    });

    onShowToast(`🌾 "${added.name}" kelishilgan narxda Bozorga joylashtirildi! ✓`);
    setActiveView('listings');
  };

  // Handle Profile Update
  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUser({
      name: editName,
      phone: editPhone,
      region: editRegion,
      role: editRole
    });
    onShowToast("Profil maʼlumotlari muvaffaqiyatli yangilandi ✓");
    if (window.innerWidth < 992) {
      setMobileModalOpen(false);
    }
  };

  // Handle Share Profile
  const handleShare = () => {
    const url = window.location.origin + window.location.pathname + '#royxatdan-otish';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      onShowToast("Profil havolasi nusxalandi! 📋✓");
    } else {
      onShowToast("Havola: " + url);
    }
  };

  // Handle Interactive Chat Message Send
  const handleSendChatMessage = (textToSend = null) => {
    const text = (textToSend || chatInput).trim();
    if (!text) return;

    const currentTime = new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });

    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text,
      time: currentTime
    };

    setChatThreads((prev) => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMsg]
    }));
    setChatInput('');

    if (activeChatId === 'agronom') {
      setIsBotTyping(true);
      setTimeout(() => {
        const aiResponse = generateAiAgronomAnswer(text, lang || 'uz');
        const botReply = {
          id: Date.now() + 1,
          sender: 'bot',
          title: aiResponse.title,
          text: aiResponse.text,
          action: aiResponse.action,
          time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
        };
        setChatThreads((prev) => ({
          ...prev,
          agronom: [...(prev.agronom || []), botReply]
        }));
        setIsBotTyping(false);
      }, 700);
    } else if (activeChatId === 'tractor') {
      setIsBotTyping(true);
      setTimeout(() => {
        const tractorReply = {
          id: Date.now() + 1,
          sender: 'partner',
          title: "🚜 Bekzod Toshev (MTZ)",
          text: "Rahmat! Ekin maydoningiz necha gektar? Haydovchisi va barcha agregatlari bilan tayyormiz. Telefonlashib shartnomani aniqlashtiramiz: +998 90 123 45 67.",
          time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
        };
        setChatThreads((prev) => ({
          ...prev,
          tractor: [...(prev.tractor || []), tractorReply]
        }));
        setIsBotTyping(false);
      }, 900);
    } else {
      setIsBotTyping(true);
      setTimeout(() => {
        const supportReply = {
          id: Date.now() + 1,
          sender: 'partner',
          title: "🛡️ Agro Tarmoq Qoʻllab-quvvatlash",
          text: "Murojaatingiz qabul qilindi! Barcha eʼlonlar va kelishilgan narxlar 10 daqiqada tasdiqlanadi. Qoʻshimcha savolingiz boʻlsa, bemalol yozing.",
          time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
        };
        setChatThreads((prev) => ({
          ...prev,
          support: [...(prev.support || []), supportReply]
        }));
        setIsBotTyping(false);
      }, 800);
    }
  };

  // ==========================================
  // VIEW 1: NOT LOGGED IN (REGISTER / LOGIN)
  // ==========================================
  if (!user) {
    return (
      <main id="top">
        <section className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
          <div className="container" style={{ maxWidth: '520px' }}>
            <div className="section-head" style={{ textAlign: 'center', marginBottom: '24px' }}>
              <span className="kicker">{t('auth_kicker', 'Agro Tarmoq')}</span>
              <h2 style={{ fontSize: '1.9rem', marginTop: '6px' }}>
                {authTab === 'register' ? "Roʻyxatdan oʻtish" : "Tizimga kirish"}
              </h2>
              <p className="lead" style={{ fontSize: '0.98rem' }}>
                {authTab === 'register' 
                  ? "Traktor va texnikangizni ijaraga bering, hosilingizni kelishilgan narxda soting!" 
                  : "Shaxsiy kabinetingizga kirib, eʼlonlaringizni boshqaring."}
              </p>
            </div>

            <div className="chart-box" style={{ 
              padding: '30px', 
              borderRadius: '24px', 
              boxShadow: 'var(--shadow)', 
              background: 'var(--surface-color)',
              border: '1px solid var(--border-color)' 
            }}>
              {/* Tabs */}
              <div className="chips-row" style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px', gap: '8px' }}>
                <button
                  type="button"
                  className={`chip ${authTab === 'register' ? 'active' : ''}`}
                  onClick={() => setAuthTab('register')}
                  style={{ padding: '10px 24px', flex: 1, textAlign: 'center', justifyContent: 'center' }}
                >
                  {t('register_btn', 'Roʻyxatdan oʻtish')}
                </button>
                <button
                  type="button"
                  className={`chip ${authTab === 'login' ? 'active' : ''}`}
                  onClick={() => setAuthTab('login')}
                  style={{ padding: '10px 24px', flex: 1, textAlign: 'center', justifyContent: 'center' }}
                >
                  {t('login_btn', 'Kirish')}
                </button>
              </div>

              <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {authTab === 'register' && (
                  <>
                    <div>
                      <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', marginBottom: '6px' }}>
                        Ism va familiyangiz
                      </label>
                      <input 
                        type="text" 
                        className="header-search" 
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}
                        placeholder="Akmal Karimov"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', marginBottom: '6px' }}>
                        Platformadagi faoliyatingiz (Rolingiz)
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        {roles.map((r) => (
                          <button
                            key={r.id}
                            type="button"
                            className={`chip ${role === r.id ? 'active' : ''}`}
                            onClick={() => setRole(r.id)}
                            style={{ textAlign: 'center', justifyContent: 'center', padding: '10px', fontSize: '0.88rem' }}
                          >
                            {r.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', marginBottom: '6px' }}>
                        Hududingiz (Viloyat)
                      </label>
                      <select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--surface-color)', color: 'var(--text-color)', fontWeight: 600 }}
                      >
                        {REGIONS.map(reg => (
                          <option key={reg} value={reg}>{reg}</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', marginBottom: '6px' }}>
                    Telefon raqamingiz
                  </label>
                  <input 
                    type="tel" 
                    className="header-search" 
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}
                    placeholder="+998 90 123 45 67"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', marginBottom: '6px' }}>
                    Parol
                  </label>
                  <input 
                    type="password" 
                    className="header-search" 
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="ag-btn ag-btn-green" 
                  style={{ marginTop: '10px', width: '100%', padding: '14px', borderRadius: '14px', fontWeight: 800, fontSize: '1rem' }}
                >
                  {authTab === 'register' ? "Roʻyxatdan oʻtish va Kabinetni ochish" : "Tizimga kirish"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // ==========================================
  // VIEW 2: AUTHENTIC PROFILE SCREEN (PHONE & DESKTOP)
  // ==========================================
  const totalUserAdsCount = 128 + userEquip.length + userProducts.length;
  const userUserId = user.id ? user.id.replace('usr_', 'AM') : 'AM52606';

  // Renders the specific active workspace content (listings, forms, chat, etc.)
  const renderActiveWorkspace = () => {
    switch (activeView) {
      case 'add-tractor':
        return (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div>
                <span className="kicker">Ijara eʼloni berish</span>
                <h3 style={{ margin: '4px 0 0', fontSize: '1.35rem', fontWeight: 800 }}>🚜 Traktorni ijaraga berish</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveView('listings')}
                className="ag-btn ag-btn-sm"
                style={{ background: 'var(--background-color)', border: '1px solid var(--border-color)', borderRadius: '10px' }}
              >
                Orqaga
              </button>
            </div>

            <form onSubmit={handleAddEquipment} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.86rem', marginBottom: '6px' }}>
                  Texnika nomi va modeli *
                </label>
                <input
                  type="text"
                  placeholder="Masalan: MTZ-82 Belarus yoki John Deere 6130M"
                  value={eqName}
                  onChange={(e) => setEqName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--background-color)', color: 'var(--text-color)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.86rem', marginBottom: '6px' }}>
                  Texnika turi
                </label>
                <select
                  value={eqType}
                  onChange={(e) => setEqType(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--background-color)', color: 'var(--text-color)', fontWeight: 600 }}
                >
                  <option value="traktor">🚜 Traktor</option>
                  <option value="kombayn">🌾 Kombayn</option>
                  <option value="dron">🛸 Dron (Dori sepuvchi)</option>
                  <option value="agregat">⚙️ Plug, kultivator yoki seyalka</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.86rem', marginBottom: '6px' }}>
                  Kunlik ijara narxi (soʻm / kun) *
                </label>
                <input
                  type="number"
                  placeholder="Masalan: 550000"
                  value={eqPrice}
                  onChange={(e) => setEqPrice(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--background-color)', color: 'var(--text-color)' }}
                />
                {eqPrice && (
                  <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700, marginTop: '3px', display: 'block' }}>
                    {fmt(eqPrice)} soʻm / kun
                  </span>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.86rem', marginBottom: '6px' }}>
                  Hudud (Viloyat)
                </label>
                <select
                  value={eqRegion}
                  onChange={(e) => setEqRegion(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--background-color)', color: 'var(--text-color)', fontWeight: 600 }}
                >
                  {REGIONS.map(reg => (
                    <option key={reg} value={reg}>{reg}</option>
                  ))}
                </select>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.86rem', marginBottom: '6px' }}>
                  Aloqa telefoni *
                </label>
                <input
                  type="tel"
                  placeholder="+998 90 123 45 67"
                  value={eqPhone}
                  onChange={(e) => setEqPhone(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--background-color)', color: 'var(--text-color)' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.86rem', marginBottom: '6px' }}>
                  Qoʻshimcha shartlar va agregatlar
                </label>
                <input
                  type="text"
                  placeholder="Masalan: Tajribali haydovchisi bilan, plug va freza qoʻshib beriladi"
                  value={eqNote}
                  onChange={(e) => setEqNote(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--background-color)', color: 'var(--text-color)' }}
                />
              </div>

              {/* Preset image select */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.86rem', marginBottom: '8px' }}>
                  Texnika rasmini tanlang:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '10px' }}>
                  {EQUIPMENT_PRESET_IMAGES.map((preset) => (
                    <div
                      key={preset.id}
                      onClick={() => setEqSelectedImg(preset.img)}
                      style={{
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: eqSelectedImg === preset.img ? '3px solid #10b981' : '1px solid var(--border-color)',
                        cursor: 'pointer',
                        position: 'relative'
                      }}
                    >
                      <img src={preset.img} alt={preset.label} style={{ width: '100%', height: '70px', objectFit: 'cover', display: 'block' }} />
                      <div style={{ padding: '4px', fontSize: '0.7rem', fontWeight: 700, textAlign: 'center', background: 'var(--surface-color)', color: 'var(--text-color)' }}>
                        {preset.label}
                      </div>
                      {eqSelectedImg === preset.img && (
                        <div style={{ position: 'absolute', top: '4px', right: '4px', background: '#10b981', color: '#fff', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem' }}>
                          ✓
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ gridColumn: '1 / -1', marginTop: '6px' }}>
                <button
                  type="submit"
                  className="ag-btn ag-btn-green"
                  style={{ width: '100%', padding: '14px', borderRadius: '14px', fontWeight: 800 }}
                >
                  🚜 Texnikani ijaraga joylashtirish
                </button>
              </div>
            </form>
          </div>
        );

      case 'add-produce':
        return (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <span className="kicker">Rasmiy Narx Nazorati</span>
                <h3 style={{ margin: '4px 0 0', fontSize: '1.35rem', fontWeight: 800 }}>🌾 Mahsulot sotish (Kelishilgan narx)</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveView('listings')}
                className="ag-btn ag-btn-sm"
                style={{ background: 'var(--background-color)', border: '1px solid var(--border-color)', borderRadius: '10px' }}
              >
                Orqaga
              </button>
            </div>

            {/* Official Rule Notice */}
            <div style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '16px',
              padding: '14px 18px',
              marginBottom: '20px',
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start'
            }}>
              <span style={{ fontSize: '1.5rem', color: '#10b981' }}>🛡️</span>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-color)', lineHeight: 1.45 }}>
                <strong style={{ color: '#047857', display: 'block', marginBottom: '2px' }}>
                  Agro Tarmoq rasmiy kelishilgan narx tartibi:
                </strong>
                Mahsulotlar spekulyatsiyasiz, xaridorlar va fermerlar manfaati uchun <strong>bizning rasmiy narximizda (biz bilan kelishilgan holda)</strong> qabul qilinadi.
              </div>
            </div>

            <form onSubmit={handleAddProduct} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.86rem', marginBottom: '6px' }}>
                  Sotiladigan mahsulot turi *
                </label>
                <select
                  value={prodSelectId}
                  onChange={(e) => {
                    const id = e.target.value;
                    setProdSelectId(id);
                    const p = OFFICIAL_MARKET_PRODUCTS.find(item => item.id === id);
                    if (p) setProdCustomPrice(p.benchmarkPrice.toString());
                  }}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--background-color)', color: 'var(--text-color)', fontWeight: 600 }}
                >
                  {OFFICIAL_MARKET_PRODUCTS.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.emoji} {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.86rem', marginBottom: '6px' }}>
                  Platforma bilan kelishilgan rasmiy narx *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    value={prodCustomPrice}
                    onChange={(e) => setProdCustomPrice(e.target.value)}
                    required
                    style={{ 
                      width: '100%', 
                      padding: '12px 14px', 
                      borderRadius: '12px', 
                      border: Number(prodCustomPrice) > selectedMarketProd.maxAllowed ? '2px solid #ef4444' : '1px solid #10b981', 
                      background: 'var(--background-color)', 
                      color: 'var(--text-color)',
                      fontWeight: 700
                    }}
                  />
                  <span style={{ position: 'absolute', right: '12px', top: '12px', color: 'var(--muted-color)', fontSize: '0.82rem' }}>
                    soʻm / {selectedMarketProd.unit}
                  </span>
                </div>

                <div style={{ marginTop: '5px', fontSize: '0.8rem' }}>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>
                    ✓ Tavsiya etilgan kelishuv narxi: {fmt(selectedMarketProd.benchmarkPrice)} soʻm/{selectedMarketProd.unit}
                  </span>
                  <span style={{ display: 'block', color: 'var(--muted-color)' }}>
                    Oraliq: {fmt(selectedMarketProd.minAllowed)} – {fmt(selectedMarketProd.maxAllowed)} soʻm
                  </span>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.86rem', marginBottom: '6px' }}>
                  Hosil hajmi / Miqdori
                </label>
                <input
                  type="text"
                  placeholder="Masalan: 500 kg, 2 tonna"
                  value={prodAmount}
                  onChange={(e) => setProdAmount(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--background-color)', color: 'var(--text-color)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.86rem', marginBottom: '6px' }}>
                  Yetishtirilgan hudud
                </label>
                <select
                  value={prodRegion}
                  onChange={(e) => setProdRegion(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--background-color)', color: 'var(--text-color)', fontWeight: 600 }}
                >
                  {REGIONS.map(reg => (
                    <option key={reg} value={reg}>{reg}</option>
                  ))}
                </select>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    checked={isAgreedConfirmed}
                    onChange={(e) => setIsAgreedConfirmed(e.target.checked)}
                    style={{ width: '18px', height: '18px', accentColor: '#10b981' }}
                  />
                  <span>Mahsulotimni <strong>Agro Tarmoq bilan kelishilgan rasmiy narxda</strong> sotuvga qoʻyish shartiga roziman.</span>
                </label>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <button
                  type="submit"
                  className="ag-btn ag-btn-green"
                  style={{ width: '100%', padding: '14px', borderRadius: '14px', fontWeight: 800 }}
                >
                  🛡️ Mahsulotni kelishilgan narxda Bozorga joylashtirish
                </button>
              </div>
            </form>
          </div>
        );

      case 'orders':
        return (
          <div>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.3rem', fontWeight: 800 }}>🛍️ Buyurtmalarim va Ijara soʻrovlari</h3>
            <div style={{ background: 'var(--background-color)', borderRadius: '16px', padding: '24px', textAlign: 'center', color: 'var(--muted-color)' }}>
              <div style={{ fontSize: '2.4rem', marginBottom: '8px' }}>📦</div>
              <p style={{ margin: 0, fontWeight: 600 }}>Hozircha faol buyurtmalar mavjud emas.</p>
              <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>Mijozlar traktor yoki mahsulotingiz boʻyicha bogʻlanganda bu yerda xabar chiqadi.</p>
            </div>
          </div>
        );

      // ==========================================
      // REAL INTERACTIVE CHAT & BOT SECTION
      // ==========================================
      case 'chat': {
        const activeMsgs = chatThreads[activeChatId] || [];

        return (
          <div style={{ display: 'flex', flexDirection: 'column', height: '640px', background: 'var(--surface-color)', borderRadius: '20px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
            
            {/* 1. Chat Channels Selector Tabs */}
            <div style={{ display: 'flex', background: 'var(--background-color)', borderBottom: '1px solid var(--border-color)', padding: '6px 8px', gap: '6px', overflowX: 'auto' }}>
              <button
                type="button"
                onClick={() => setActiveChatId('agronom')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  borderRadius: '12px',
                  border: 'none',
                  background: activeChatId === 'agronom' ? 'var(--surface-color)' : 'transparent',
                  color: activeChatId === 'agronom' ? '#10b981' : 'var(--text-color)',
                  fontWeight: 700,
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                  boxShadow: activeChatId === 'agronom' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none'
                }}
              >
                <span>🤖</span>
                <span>AI Agronom</span>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
              </button>

              <button
                type="button"
                onClick={() => setActiveChatId('tractor')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  borderRadius: '12px',
                  border: 'none',
                  background: activeChatId === 'tractor' ? 'var(--surface-color)' : 'transparent',
                  color: activeChatId === 'tractor' ? '#10b981' : 'var(--text-color)',
                  fontWeight: 700,
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                  boxShadow: activeChatId === 'tractor' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none'
                }}
              >
                <span>🚜</span>
                <span>Bekzod (MTZ)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveChatId('support')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  borderRadius: '12px',
                  border: 'none',
                  background: activeChatId === 'support' ? 'var(--surface-color)' : 'transparent',
                  color: activeChatId === 'support' ? '#10b981' : 'var(--text-color)',
                  fontWeight: 700,
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                  boxShadow: activeChatId === 'support' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none'
                }}
              >
                <span>🛡️</span>
                <span>Qoʻllab-quvvatlash</span>
              </button>
            </div>

            {/* 2. Active Channel Header */}
            <div style={{ padding: '12px 18px', background: 'var(--surface-color)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: activeChatId === 'agronom' ? '#dcfce7' : '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                  {activeChatId === 'agronom' ? '🤖' : activeChatId === 'tractor' ? '🚜' : '🛡️'}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.96rem', fontWeight: 800 }}>
                    {activeChatId === 'agronom' ? 'Agro Tarmoq AI Agronom Bot' : activeChatId === 'tractor' ? 'Bekzod Toshev (Traktor egasi)' : 'Agro Tarmoq Qoʻllab-quvvatlash'}
                  </h4>
                  <div style={{ fontSize: '0.74rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></span>
                    Online · Tezkor javob
                  </div>
                </div>
              </div>

              {activeChatId === 'agronom' && (
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('agronom')}
                  className="ag-btn ag-btn-sm ag-btn-green"
                  style={{ borderRadius: '10px', fontSize: '0.78rem', padding: '6px 12px' }}
                >
                  📸 Skaner
                </button>
              )}
            </div>

            {/* 3. Quick Prompts Bar (when agronom is active) */}
            {activeChatId === 'agronom' && (
              <div style={{ padding: '8px 14px', background: 'var(--background-color)', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '8px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                {chatQuickPrompts.map((qp, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendChatMessage(qp.text)}
                    style={{
                      background: 'var(--surface-color)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '20px',
                      padding: '5px 12px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      color: 'var(--text-color)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {qp.label}
                  </button>
                ))}
              </div>
            )}

            {/* 4. Chat Messages Scrollable Body */}
            <div style={{ flex: 1, padding: '18px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', background: 'var(--background-color)' }}>
              {activeMsgs.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: isUser ? 'flex-end' : 'flex-start',
                      maxWidth: '85%',
                      alignSelf: isUser ? 'flex-end' : 'flex-start'
                    }}
                  >
                    {msg.title && (
                      <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--muted-color)', marginBottom: '3px', paddingLeft: isUser ? 0 : '4px' }}>
                        {msg.title}
                      </span>
                    )}
                    <div
                      style={{
                        padding: '12px 16px',
                        borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                        background: isUser ? '#15803d' : 'var(--surface-color)',
                        color: isUser ? '#ffffff' : 'var(--text-color)',
                        border: isUser ? 'none' : '1px solid var(--border-color)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        fontSize: '0.92rem',
                        lineHeight: 1.5,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word'
                      }}
                    >
                      {msg.text}

                      {msg.action && (
                        <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: isUser ? '1px solid rgba(255,255,255,0.2)' : '1px solid var(--border-color)' }}>
                          <button
                            type="button"
                            onClick={() => onNavigate && onNavigate(msg.action.page || 'agronom')}
                            style={{
                              background: isUser ? '#ffffff' : '#10b981',
                              color: isUser ? '#15803d' : '#ffffff',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '6px 12px',
                              fontSize: '0.8rem',
                              fontWeight: 800,
                              cursor: 'pointer'
                            }}
                          >
                            {msg.action.label || "Koʻrish"}
                          </button>
                        </div>
                      )}
                    </div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--muted-color)', marginTop: '3px', padding: '0 4px' }}>
                      {msg.time}
                    </span>
                  </div>
                );
              })}

              {/* Bot Typing Indicator */}
              {isBotTyping && (
                <div style={{ alignSelf: 'flex-start', background: 'var(--surface-color)', border: '1px solid var(--border-color)', padding: '10px 16px', borderRadius: '18px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--muted-color)' }}>
                  <span>🤖</span>
                  <span>AI agronom javob tayyorlamoqda...</span>
                </div>
              )}

              <div ref={chatMessagesEndRef} />
            </div>

            {/* 5. Chat Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendChatMessage();
              }}
              style={{ padding: '12px 16px', background: 'var(--surface-color)', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <button
                type="button"
                onClick={() => onShowToast("Rasm yoki fayl biriktirish")}
                style={{ background: 'var(--background-color)', border: '1px solid var(--border-color)', width: '40px', height: '40px', borderRadius: '50%', color: 'var(--muted-color)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title="Rasm yuklash"
              >
                <i className="fa-solid fa-paperclip"></i>
              </button>

              <input
                type="text"
                placeholder={activeChatId === 'agronom' ? "Ekin kasalligi yoki savolingizni yozing..." : "Xabaringizni yozing..."}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '24px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--background-color)',
                  color: 'var(--text-color)',
                  fontSize: '0.92rem'
                }}
              />

              <button
                type="submit"
                style={{
                  background: '#15803d',
                  color: '#ffffff',
                  border: 'none',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  boxShadow: '0 4px 12px rgba(21, 128, 61, 0.3)'
                }}
                title="Yuborish"
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>

          </div>
        );
      }

      case 'stats':
        return (
          <div>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.3rem', fontWeight: 800 }}>📊 Profil Statistikasi va Koʻrishlar</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
              <div style={{ background: 'var(--background-color)', padding: '16px', borderRadius: '16px' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted-color)' }}>Jami koʻrishlar soni</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-color)', marginTop: '4px' }}>24 780 ta</div>
              </div>
              <div style={{ background: 'var(--background-color)', padding: '16px', borderRadius: '16px' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted-color)' }}>Qoʻngʻiroq / Murojaatlar</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>312 ta</div>
              </div>
              <div style={{ background: 'var(--background-color)', padding: '16px', borderRadius: '16px' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted-color)' }}>Faol eʼlonlar</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0284c7', marginTop: '4px' }}>{totalUserAdsCount} ta</div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.3rem', fontWeight: 800 }}>⚙️ Profil maʼlumotlarini tahrirlash</h3>
            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.86rem', marginBottom: '6px' }}>Ismingiz</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--background-color)', color: 'var(--text-color)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.86rem', marginBottom: '6px' }}>Telefon raqami</label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--background-color)', color: 'var(--text-color)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.86rem', marginBottom: '6px' }}>Hudud</label>
                <select
                  value={editRegion}
                  onChange={(e) => setEditRegion(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--background-color)', color: 'var(--text-color)', fontWeight: 600 }}
                >
                  {REGIONS.map(reg => (
                    <option key={reg} value={reg}>{reg}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.86rem', marginBottom: '6px' }}>Rolingiz</label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--background-color)', color: 'var(--text-color)', fontWeight: 600 }}
                >
                  {roles.map(r => (
                    <option key={r.id} value={r.id}>{r.label}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="ag-btn ag-btn-green"
                style={{ marginTop: '8px', padding: '12px', borderRadius: '12px', fontWeight: 800 }}
              >
                Saqlash
              </button>
            </form>
          </div>
        );

      case 'help':
        return (
          <div>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.3rem', fontWeight: 800 }}>ℹ️ Yordam va qoʻllab-quvvatlash</h3>
            <p style={{ color: 'var(--muted-color)', fontSize: '0.92rem' }}>
              Agro Tarmoq platformasi boʻyicha har qanday savolingiz boʻlsa, bizning mutaxassislarimiz yordamga tayyor:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '14px' }}>
              <div style={{ background: 'var(--background-color)', padding: '14px', borderRadius: '14px' }}>
                📞 <strong>Ishonch telefoni:</strong> +998 71 200 45 45
              </div>
              <div style={{ background: 'var(--background-color)', padding: '14px', borderRadius: '14px' }}>
                ✈️ <strong>Telegram aloqa:</strong> @agrotarmoq_support
              </div>
              <div style={{ background: 'var(--background-color)', padding: '14px', borderRadius: '14px' }}>
                🕒 <strong>Ish vaqti:</strong> Dushanba - Shanba, 08:00 dan 20:00 gacha
              </div>
            </div>
          </div>
        );

      case 'listings':
      default:
        return (
          <div>
            {/* Header with Quick Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '20px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800 }}>📢 Mening eʼlonlarim</h3>
                <p style={{ margin: '3px 0 0', color: 'var(--muted-color)', fontSize: '0.86rem' }}>
                  Ijaraga berilgan texnikalar va sotuvdagi kelishilgan mahsulotlar
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setActiveView('add-tractor')}
                  className="ag-btn ag-btn-sm ag-btn-green"
                  style={{ borderRadius: '10px' }}
                >
                  + 🚜 Traktorni ijaraga berish
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView('add-produce')}
                  className="ag-btn ag-btn-sm"
                  style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#047857', border: '1px solid #a7f3d0', borderRadius: '10px' }}
                >
                  + 🌾 Mahsulot sotish
                </button>
              </div>
            </div>

            {/* Equipment listings section */}
            <div style={{ marginBottom: '28px' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', fontWeight: 800 }}>
                🚜 Ijaradagi texnikalarim ({userEquip.length})
              </h4>
              {userEquip.length === 0 ? (
                <div style={{ background: 'var(--background-color)', padding: '24px', borderRadius: '16px', textAlign: 'center', color: 'var(--muted-color)' }}>
                  <p style={{ margin: 0, fontWeight: 600 }}>Hozircha ijaraga texnika qoʻshmadingiz.</p>
                  <button
                    type="button"
                    onClick={() => setActiveView('add-tractor')}
                    className="ag-btn ag-btn-sm ag-btn-green"
                    style={{ marginTop: '8px' }}
                  >
                    + Traktorni ijaraga berish
                  </button>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
                  {userEquip.map((item) => (
                    <div key={item.id} style={{ background: 'var(--background-color)', borderRadius: '16px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                      <div style={{ height: '120px', position: 'relative' }}>
                        <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', top: '8px', left: '8px', background: item.status === 'active' ? '#10b981' : '#f59e0b', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: '6px' }}>
                          {item.status === 'active' ? "✓ Ijaraga tayyor" : "⏳ Band"}
                        </span>
                      </div>
                      <div style={{ padding: '12px' }}>
                        <h5 style={{ margin: '0 0 4px 0', fontSize: '0.98rem', fontWeight: 800 }}>{item.name}</h5>
                        <p style={{ margin: '0 0 6px 0', fontSize: '0.8rem', color: 'var(--muted-color)' }}>{item.note}</p>
                        <div style={{ fontSize: '0.8rem', color: 'var(--muted-color)', marginBottom: '8px' }}>
                          <span>📍 {item.region}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--border-color)' }}>
                          <span style={{ fontWeight: 800, color: '#10b981', fontSize: '0.98rem' }}>{fmt(item.price)} soʻm/kun</span>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button
                              type="button"
                              onClick={() => {
                                toggleEquipmentStatus(item.id);
                                onShowToast(item.status === 'active' ? "Holat: Band" : "Holat: Ijaraga tayyor");
                              }}
                              style={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '4px 8px', fontSize: '0.75rem', cursor: 'pointer' }}
                            >
                              {item.status === 'active' ? "Band" : "Boʻsh"}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                removeEquipment(item.id);
                                onShowToast("Eʼlon oʻchirildi");
                              }}
                              style={{ background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer' }}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Produce listings section */}
            <div>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', fontWeight: 800 }}>
                🌾 Kelishilgan narxdagi mahsulotlarim ({userProducts.length})
              </h4>
              {userProducts.length === 0 ? (
                <div style={{ background: 'var(--background-color)', padding: '24px', borderRadius: '16px', textAlign: 'center', color: 'var(--muted-color)' }}>
                  <p style={{ margin: 0, fontWeight: 600 }}>Hozircha sotuvga mahsulot qoʻshmadingiz.</p>
                  <button
                    type="button"
                    onClick={() => setActiveView('add-produce')}
                    className="ag-btn ag-btn-sm"
                    style={{ marginTop: '8px', background: 'rgba(16, 185, 129, 0.1)', color: '#047857', border: '1px solid #a7f3d0' }}
                  >
                    + Kelishilgan narxda mahsulot sotish
                  </button>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
                  {userProducts.map((p) => (
                    <div key={p.id} style={{ background: 'var(--background-color)', borderRadius: '16px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                      <div style={{ height: '120px', position: 'relative' }}>
                        <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', top: '8px', left: '8px', background: '#059669', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '2px 8px', borderRadius: '6px' }}>
                          🛡️ Kelishilgan narx
                        </span>
                      </div>
                      <div style={{ padding: '12px' }}>
                        <h5 style={{ margin: '0 0 4px 0', fontSize: '0.98rem', fontWeight: 800 }}>{p.name}</h5>
                        <p style={{ margin: '0 0 6px 0', fontSize: '0.8rem', color: 'var(--muted-color)' }}>{p.desc}</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--border-color)' }}>
                          <span style={{ fontWeight: 800, color: '#059669', fontSize: '0.98rem' }}>{fmt(p.price)} soʻm/{p.unit}</span>
                          <button
                            type="button"
                            onClick={() => {
                              removeProduct(p.id);
                              onShowToast("Mahsulot oʻchirildi");
                            }}
                            style={{ background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer' }}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <main id="top">
      <div className="agro-profile-wrapper">
        <div className="agro-profile-layout">
          
          {/* ========================================================
              LEFT COLUMN: AUTHENTIC MOBILE APP CARD (MATCHES SCREENSHOT)
              ======================================================== */}
          <div className="agro-phone-card">
            
            {/* 1. Header Banner Landscape */}
            <div className="agro-profile-banner">
              <div className="agro-banner-top-row">
                {/* Brand Logo with Official Agro Tarmoq Emblem */}
                <div className="agro-banner-logo">
                  <div className="agro-banner-logo-img-wrap">
                    <img 
                      src={officialLogoImg} 
                      alt="Agro Tarmoq" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                  <span className="agro-banner-brand-text">
                    Agro Tarmoq
                  </span>
                </div>

                {/* Settings Gear Icon */}
                <button
                  type="button"
                  onClick={() => openSection('settings')}
                  className="agro-banner-gear-btn"
                  aria-label="Sozlamalar"
                  title="Sozlamalar"
                >
                  <i className="fa-solid fa-gear"></i>
                </button>
              </div>
            </div>

            {/* 2. Profile Body Container (Curved Top Cutout) */}
            <div className="agro-profile-body">
              
              {/* User Identity: Avatar + Greeting + ID */}
              <div className="agro-profile-id-row">
                
                {/* High-Fidelity Handsome Illustrated Farmer Avatar */}
                <div className="agro-avatar-wrapper" onClick={() => openSection('settings')}>
                  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', borderRadius: '50%', display: 'block' }}>
                    <defs>
                      <linearGradient id="avatarBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#a7f3d0"/>
                        <stop offset="100%" stopColor="#34d399"/>
                      </linearGradient>
                      <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#064e3b"/>
                        <stop offset="100%" stopColor="#022c22"/>
                      </linearGradient>
                    </defs>

                    {/* Mint Green Background Circle */}
                    <circle cx="50" cy="50" r="50" fill="url(#avatarBgGrad)"/>

                    {/* Body / Dark Green Hoodie */}
                    <path d="M14 100 C15 70, 28 62, 50 62 C72 62, 85 70, 86 100 Z" fill="url(#hoodieGrad)"/>

                    {/* Inner Dark Collar / Hood Opening */}
                    <path d="M35 62 C35 78, 65 78, 65 62 Z" fill="#03221b"/>

                    {/* Neck */}
                    <path d="M42 50 L42 66 C42 70, 58 70, 58 66 L58 50 Z" fill="#fbd2b3"/>
                    <path d="M42 58 C46 63, 54 63, 58 58 Z" fill="#f4b595" opacity="0.5"/>

                    {/* Ears */}
                    <ellipse cx="32" cy="45" rx="3.5" ry="5.5" fill="#fbd2b3"/>
                    <ellipse cx="68" cy="45" rx="3.5" ry="5.5" fill="#fbd2b3"/>

                    {/* Face Contour */}
                    <path d="M33 42 C33 26, 67 26, 67 42 C67 56, 58 62, 50 62 C42 62, 33 56, 33 42 Z" fill="#fed7aa"/>

                    {/* Eyes and subtle brows (minimalist clean style) */}
                    <path d="M41 42 Q44 40 46 42" stroke="#475569" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                    <path d="M54 42 Q56 40 59 42" stroke="#475569" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                    <circle cx="44" cy="44" r="1.5" fill="#1e293b"/>
                    <circle cx="56" cy="44" r="1.5" fill="#1e293b"/>

                    {/* Stylish Haircut (black, sweeping naturally over forehead) */}
                    <path d="M30 40 C30 20, 44 14, 68 18 C72 24, 70 33, 68 38 C64 30, 54 28, 42 32 C36 35, 32 37, 30 40 Z" fill="#0f172a"/>
                    <path d="M30 38 C31 25, 42 19, 58 19 C66 19, 71 23, 70 28 C64 24, 46 24, 34 30 Z" fill="#1e293b"/>
                    <path d="M31 38 L33 45 L35 41 Z" fill="#0f172a"/>
                    <path d="M69 36 L67 45 L65 40 Z" fill="#0f172a"/>

                    {/* Hoodie White Drawstrings */}
                    <line x1="47" y1="64" x2="47" y2="76" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="53" y1="64" x2="53" y2="78" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>

                    {/* Mint Leaf on Left Chest */}
                    <path d="M67 76 C62 72, 66 66, 72 68 C74 74, 70 78, 67 76 Z" fill="#34d399"/>
                    <line x1="67" y1="76" x2="71" y2="70" stroke="#064e3b" strokeWidth="0.8"/>
                  </svg>
                  <button type="button" className="agro-avatar-camera-btn" aria-label="Rasm almashtirish">
                    <i className="fa-solid fa-camera" style={{ color: '#ffffff', fontSize: '12px' }}></i>
                  </button>
                </div>

                {/* User Name and Phone Number */}
                <div className="agro-profile-name-info">
                  <h2 className="agro-profile-greeting" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                    {user.name || 'Akmal'}
                  </h2>

                  {/* Phone number directly below name */}
                  <div className="agro-phone-subrow" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', color: 'var(--muted-color)', fontSize: '0.9rem', fontWeight: 600 }}>
                    <i className="fa-solid fa-phone" style={{ fontSize: '0.78rem', color: '#10b981' }}></i>
                    <span>{user.phone || '+998 90 123 45 67'}</span>
                  </div>
                </div>

              </div>

              {/* 3. Stats Row (E'lonlar, Followers, Following) */}
              <div className="agro-stats-cards-row">
                <div className="agro-stat-card" onClick={() => openSection('listings')} style={{ cursor: 'pointer' }}>
                  <div className="agro-stat-val">
                    <i className="fa-solid fa-box"></i>
                    <span>{totalUserAdsCount}</span>
                  </div>
                  <div className="agro-stat-label">Eʼlonlar</div>
                </div>

                <div className="agro-stat-card" onClick={() => openSection('stats')} style={{ cursor: 'pointer' }}>
                  <div className="agro-stat-val">
                    <i className="fa-solid fa-bookmark"></i>
                    <span>24.7K</span>
                  </div>
                  <div className="agro-stat-label">Followers</div>
                </div>

                <div className="agro-stat-card" onClick={() => openSection('stats')} style={{ cursor: 'pointer' }}>
                  <div className="agro-stat-val">
                    <i className="fa-solid fa-users"></i>
                    <span>312</span>
                  </div>
                  <div className="agro-stat-label">Following</div>
                </div>
              </div>

              {/* 4. Action Buttons: [Profilni tahrirlash] and [Ulashish] */}
              <div className="agro-action-buttons-row">
                <button
                  type="button"
                  onClick={() => openSection('settings')}
                  className="agro-btn-edit-profile"
                >
                  <i className="fa-solid fa-pen"></i>
                  <span>Profilni tahrirlash</span>
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="agro-btn-share-profile"
                >
                  <i className="fa-solid fa-share"></i>
                  <span>Ulashish</span>
                </button>
              </div>

              {/* 5. Vertical Menu List */}
              <div className="agro-profile-menu-container">
                
                {/* Buyurtmalarim */}
                <button
                  type="button"
                  className={`agro-profile-menu-btn ${activeView === 'orders' ? 'active' : ''}`}
                  onClick={() => openSection('orders')}
                >
                  <div className="agro-menu-left">
                    <i className="fa-solid fa-bag-shopping agro-menu-icon"></i>
                    <span className="agro-menu-title">Buyurtmalarim</span>
                  </div>
                  <div className="agro-menu-right">
                    <i className="fa-solid fa-chevron-right agro-menu-chevron"></i>
                  </div>
                </button>

                {/* E'lonlarim */}
                <button
                  type="button"
                  className={`agro-profile-menu-btn ${activeView === 'listings' ? 'active' : ''}`}
                  onClick={() => openSection('listings')}
                >
                  <div className="agro-menu-left">
                    <i className="fa-solid fa-bullhorn agro-menu-icon"></i>
                    <span className="agro-menu-title">Eʼlonlarim</span>
                  </div>
                  <div className="agro-menu-right">
                    <i className="fa-solid fa-chevron-right agro-menu-chevron"></i>
                  </div>
                </button>

                {/* Saqlanganlar */}
                <button
                  type="button"
                  className={`agro-profile-menu-btn ${activeView === 'saved' ? 'active' : ''}`}
                  onClick={() => onShowToast("Saqlangan eʼlonlar roʻyxati")}
                >
                  <div className="agro-menu-left">
                    <i className="fa-solid fa-bookmark agro-menu-icon"></i>
                    <span className="agro-menu-title">Saqlanganlar</span>
                  </div>
                  <div className="agro-menu-right">
                    <i className="fa-solid fa-chevron-right agro-menu-chevron"></i>
                  </div>
                </button>

                {/* Chat */}
                <button
                  type="button"
                  className={`agro-profile-menu-btn ${activeView === 'chat' ? 'active' : ''}`}
                  onClick={() => openSection('chat')}
                >
                  <div className="agro-menu-left">
                    <i className="fa-solid fa-comment-dots agro-menu-icon"></i>
                    <span className="agro-menu-title">Chat</span>
                  </div>
                  <div className="agro-menu-right">
                    <i className="fa-solid fa-chevron-right agro-menu-chevron"></i>
                  </div>
                </button>

                {/* Statistika */}
                <button
                  type="button"
                  className={`agro-profile-menu-btn ${activeView === 'stats' ? 'active' : ''}`}
                  onClick={() => openSection('stats')}
                >
                  <div className="agro-menu-left">
                    <i className="fa-solid fa-chart-simple agro-menu-icon"></i>
                    <span className="agro-menu-title">Statistika</span>
                  </div>
                  <div className="agro-menu-right">
                    <i className="fa-solid fa-chevron-right agro-menu-chevron"></i>
                  </div>
                </button>

                {/* Sozlamalar */}
                <button
                  type="button"
                  className={`agro-profile-menu-btn ${activeView === 'settings' ? 'active' : ''}`}
                  onClick={() => openSection('settings')}
                >
                  <div className="agro-menu-left">
                    <i className="fa-solid fa-gear agro-menu-icon"></i>
                    <span className="agro-menu-title">Sozlamalar</span>
                  </div>
                  <div className="agro-menu-right">
                    <i className="fa-solid fa-chevron-right agro-menu-chevron"></i>
                  </div>
                </button>

                {/* Yordam va qo'llab-quvvatlash */}
                <button
                  type="button"
                  className={`agro-profile-menu-btn ${activeView === 'help' ? 'active' : ''}`}
                  onClick={() => openSection('help')}
                >
                  <div className="agro-menu-left">
                    <i className="fa-solid fa-circle-info agro-menu-icon"></i>
                    <span className="agro-menu-title">Yordam va qoʻllab-quvvatlash</span>
                  </div>
                  <div className="agro-menu-right">
                    <i className="fa-solid fa-chevron-right agro-menu-chevron"></i>
                  </div>
                </button>

              </div>

              {/* 7. Logout Button */}
              <button
                type="button"
                onClick={() => {
                  logout();
                  onShowToast("Tizimdan chiqildi");
                }}
                className="agro-btn-logout-full"
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <span>Chiqish</span>
              </button>

            </div>

          </div>

          {/* ========================================================
              RIGHT COLUMN: EXPANDED WORKSPACE (ON DESKTOP / TABLET)
              ======================================================== */}
          <div className="agro-profile-content-pane hide-on-mobile">
            {renderActiveWorkspace()}
          </div>

        </div>
      </div>

      {/* ========================================================
          MOBILE BOTTOM SHEET / MODAL (FOR MOBILE DEVICES < 992px)
          ======================================================== */}
      {mobileModalOpen && (
        <div 
          className="agro-mobile-modal-overlay" 
          onClick={() => setMobileModalOpen(false)}
          style={{ display: window.innerWidth >= 992 ? 'none' : 'flex' }}
        >
          <div 
            className="agro-mobile-modal-card" 
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
              <button
                type="button"
                onClick={() => setMobileModalOpen(false)}
                style={{ background: 'var(--background-color)', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '1rem', color: 'var(--text-color)' }}
              >
                ✕
              </button>
            </div>
            {renderActiveWorkspace()}
          </div>
        </div>
      )}

    </main>
  );
}
