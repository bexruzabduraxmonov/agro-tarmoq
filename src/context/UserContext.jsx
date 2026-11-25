import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

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
