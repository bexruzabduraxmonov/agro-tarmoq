import React, { createContext, useContext, useState, useEffect } from 'react';
import { sendListingToTelegram } from '../utils/telegramNotifier';

const UserContext = createContext();
const ACCOUNTS_STORAGE_KEY = 'agro_accounts';

async function hashPassword(password) {
  const raw = String(password || '');
  if (typeof window !== 'undefined' && window.crypto?.subtle) {
    const data = new TextEncoder().encode(raw);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
  return btoa(unescape(encodeURIComponent(raw)));
}

function readAccounts() {
  try {
    const saved = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function writeAccounts(accounts) {
  try {
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
  } catch {
    // ignore
  }
}

export function UserProvider({ children }) {
  // 1. Current User State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('agro_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // 2. User Machinery / Equipment Listings State
  const [userEquip, setUserEquip] = useState(() => {
    try {
      const saved = localStorage.getItem('agro_user_equip');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 3. User Products (Produce) Listings State (with Platform Agreed Price)
  const [userProducts, setUserProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('agro_user_products');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist user
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('agro_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('agro_user');
      }
    } catch {
      // ignore
    }
  }, [user]);

  // Persist equipment
  useEffect(() => {
    try {
      localStorage.setItem('agro_user_equip', JSON.stringify(userEquip));
    } catch {
      // ignore
    }
  }, [userEquip]);

  // Persist products
  useEffect(() => {
    try {
      localStorage.setItem('agro_user_products', JSON.stringify(userProducts));
    } catch {
      // ignore
    }
  }, [userProducts]);

  const login = (userData) => {
    const updated = {
      id: userData.id || 'usr_' + Date.now(),
      name: userData.name || 'Foydalanuvchi',
      phone: userData.phone || '',
      email: userData.email || '',
      role: userData.role || 'fermer',
      region: userData.region || 'Toshkent viloyati',
      avatar: userData.avatar || '',
      joinedDate: userData.joinedDate || new Date().toISOString().split('T')[0],
      isVerified: true
    };
    setUser(updated);
    return updated;
  };

  const register = (userData) => {
    return login(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (patch) => {
    setUser((prev) => (prev ? { ...prev, ...patch } : null));
  };

  const saveAccountRecord = async (userData, password) => {
    const normalizedEmail = (userData?.email || '').trim().toLowerCase();
    if (!normalizedEmail) return;
    const accounts = readAccounts();
    const idx = accounts.findIndex((a) => a.email === normalizedEmail);
    const passwordHash = password ? await hashPassword(password) : accounts[idx]?.passwordHash || '';
    const record = {
      email: normalizedEmail,
      name: userData?.name || accounts[idx]?.name || 'Foydalanuvchi',
      phone: userData?.phone || accounts[idx]?.phone || '',
      role: userData?.role || accounts[idx]?.role || 'fermer',
      region: userData?.region || accounts[idx]?.region || 'Toshkent viloyati',
      passwordHash,
      updatedAt: new Date().toISOString(),
    };
    if (idx >= 0) {
      accounts[idx] = { ...accounts[idx], ...record };
    } else {
      accounts.push(record);
    }
    writeAccounts(accounts);
  };

  const verifyAccountPassword = async (email, password) => {
    const normalizedEmail = (email || '').trim().toLowerCase();
    const accounts = readAccounts();
    const found = accounts.find((a) => a.email === normalizedEmail);
    if (!found || !found.passwordHash) {
      return { ok: true, account: found || null };
    }
    const candidateHash = await hashPassword(password);
    if (candidateHash !== found.passwordHash) {
      return { ok: false, message: "Email yoki parol notoʻgʻri!" };
    }
    return { ok: true, account: found };
  };

  const resetPasswordByEmail = async (email, newPassword) => {
    const normalizedEmail = (email || '').trim().toLowerCase();
    if (!normalizedEmail) {
      return { ok: false, message: "Email manzilingizni kiriting!" };
    }
    if (!newPassword || newPassword.length < 4) {
      return { ok: false, message: "Yangi parol kamida 4 ta belgidan iborat boʻlishi kerak!" };
    }
    const accounts = readAccounts();
    const idx = accounts.findIndex((a) => a.email === normalizedEmail);
    const passwordHash = await hashPassword(newPassword);
    if (idx >= 0) {
      accounts[idx] = {
        ...accounts[idx],
        passwordHash,
        updatedAt: new Date().toISOString(),
      };
    } else {
      accounts.push({
        email: normalizedEmail,
        name: user?.name || 'Foydalanuvchi',
        phone: user?.phone || '',
        role: user?.role || 'fermer',
        region: user?.region || 'Toshkent viloyati',
        passwordHash,
        updatedAt: new Date().toISOString(),
      });
    }
    writeAccounts(accounts);
    return { ok: true };
  };

  // Add equipment (e.g. tractor rental)
  const addEquipment = (item) => {
    const newEquip = {
      id: 'eq_' + Date.now(),
      name: item.name,
      type: item.type || 'traktor',
      emoji: item.emoji || (item.type === 'dron' ? '🛸' : item.type === 'kombayn' ? '🌾' : '🚜'),
      price: Number(item.price) || 500000,
      owner: user?.name || item.owner || 'Texnika egasi',
      region: item.region || user?.region || 'Toshkent viloyati',
      phone: item.phone || user?.phone || '+998 90 000 00 00',
      note: item.note || 'Haydovchisi va barcha agregatlari bilan',
      img: item.img || 'https://files.cdn-files-a.com/uploads/12463689/normal_gi-6ad09c1a2756e.jpg?format=avif',
      status: 'active', // 'active' | 'busy'
      views: 1,
      createdAt: new Date().toLocaleDateString('uz-UZ'),
      isUserListing: true
    };
    setUserEquip((prev) => [newEquip, ...prev]);
    sendListingToTelegram({
      type: 'equipment',
      title: newEquip.name,
      price: newEquip.price,
      region: newEquip.region,
      owner: newEquip.owner,
      phone: newEquip.phone,
    });
    return newEquip;
  };

  const removeEquipment = (id) => {
    setUserEquip((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleEquipmentStatus = (id) => {
    setUserEquip((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'active' ? 'busy' : 'active' }
          : item
      )
    );
  };

  // Add product (with platform agreed price enforcement)
  const addProduct = (item) => {
    const newProd = {
      id: 'prod_' + Date.now(),
      name: item.name,
      cat: item.cat || 'sabzavot',
      emoji: item.emoji || '🥬',
      price: Number(item.price), // Must be platform agreed price
      unit: item.unit || 'kg',
      farmer: user?.name || 'Mahalliy fermer',
      region: item.region || user?.region || 'Toshkent viloyati',
      phone: item.phone || user?.phone || '+998 90 000 00 00',
      trend: 0,
      rating: 5.0,
      reviewsCount: 1,
      desc: item.desc || 'Tabiiy, sifatli agro mahsulot.',
      img: item.img || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
      specs: [
        'Agro Tarmoq nazorati: Tasdiqlangan kelishilgan narx',
        `Yetishtiruvchi: ${user?.name || 'Fermer'}`,
        `Hudud: ${item.region || user?.region || 'Oʻzbekiston'}`,
        'Sifat kafolati: 100% tabiiy mahsulot'
      ],
      isAgreedPrice: true,
      createdAt: new Date().toLocaleDateString('uz-UZ'),
      isUserListing: true
    };
    setUserProducts((prev) => [newProd, ...prev]);
    sendListingToTelegram({
      type: 'product',
      title: newProd.name,
      price: newProd.price,
      region: newProd.region,
      owner: newProd.farmer,
      phone: newProd.phone,
    });
    return newProd;
  };

  const removeProduct = (id) => {
    setUserProducts((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateUser,
        saveAccountRecord,
        verifyAccountPassword,
        resetPasswordByEmail,
        userEquip,
        addEquipment,
        removeEquipment,
        toggleEquipmentStatus,
        userProducts,
        addProduct,
        removeProduct
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export default UserContext;
