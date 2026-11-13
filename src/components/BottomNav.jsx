import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function BottomNav({
  currentPage,
  onNavigate,
  cartCount,
  onOpenCart,
  favoritesCount = 0,
  onOpenFavorites,
  onOpenAddProduct
}) {
  const { t } = useLanguage();
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const checkStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    setIsStandalone(checkStandalone);

    const media = window.matchMedia("(display-mode: standalone)");
    const listener = (e) => setIsStandalone(e.matches);
    try {
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    } catch {
      media.addListener(listener);
      return () => media.removeListener(listener);
    }
  }, []);

  return (
    <nav
      className={`agro-bottom-nav ${isStandalone ? "is-standalone" : ""}`}
      aria-label="Mobil pastki menyu"
    >
      <div className="bottom-nav-inner" style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
        {/* Bosh sahifa */}
        <button
          type="button"
          className={`bottom-nav-item ${currentPage === "home" ? "active" : ""}`}
          onClick={() => onNavigate("home")}
          aria-label="Bosh sahifa"
        >
          <div className="bottom-nav-icon-wrap">
            <i className="fa-solid fa-house"></i>
          </div>
          <span className="bottom-nav-label">Bosh sahifa</span>
        </button>

        {/* Bozor */}
        <button
          type="button"
          className={`bottom-nav-item ${currentPage === "bozor" ? "active" : ""}`}
          onClick={() => onNavigate("bozor")}
          aria-label="Bozor"
        >
          <div className="bottom-nav-icon-wrap">
            <i className="fa-solid fa-shapes"></i>
          </div>
          <span className="bottom-nav-label">Bozor</span>
        </button>

        {/* + E'lon berish (Center elevated action) */}
        <button
          type="button"
          className="bottom-nav-item"
          onClick={onOpenAddProduct}
          aria-label="E'lon berish"
          style={{ position: "relative", top: "-10px" }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #15803d, #22c55e)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 16px rgba(21, 128, 61, 0.4)",
              fontSize: "1.2rem"
            }}
          >
            <i className="fa-solid fa-plus"></i>
          </div>
          <span className="bottom-nav-label" style={{ fontWeight: 700, color: "var(--primary-color, #15803d)" }}>
            + E'lon
          </span>
        </button>

        {/* Sevimlilar */}
        <button
          type="button"
          className="bottom-nav-item"
          onClick={onOpenFavorites}
          aria-label="Sevimlilar"
        >
          <div className="bottom-nav-icon-wrap">
            <i className="fa-solid fa-heart" style={{ color: favoritesCount > 0 ? "#ef4444" : "inherit" }}></i>
            {favoritesCount > 0 && (
              <span className="bottom-nav-badge" style={{ background: "#ef4444" }}>
                {favoritesCount > 99 ? "99+" : favoritesCount}
              </span>
            )}
          </div>
          <span className="bottom-nav-label">Sevimlilar</span>
        </button>

        {/* Kabinet */}
        <button
          type="button"
          className={`bottom-nav-item ${currentPage === "farmer-dashboard" || currentPage === "royxatdan-otish" ? "active" : ""}`}
          onClick={() => onNavigate("farmer-dashboard")}
          aria-label="Kabinet"
        >
          <div className="bottom-nav-icon-wrap">
            <i className="fa-solid fa-user"></i>
          </div>
          <span className="bottom-nav-label">Kabinet</span>
        </button>
      </div>
    </nav>
  );
}
