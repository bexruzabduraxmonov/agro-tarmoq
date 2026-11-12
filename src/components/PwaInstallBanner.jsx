import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function PwaInstallBanner({ onShowToast }) {
  const { t } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if already running as installed standalone PWA
    const isStandaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true ||
      document.referrer.includes("android-app://");
    setIsStandalone(isStandaloneMode);

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent) && !window.MSStream;
    setIsIOS(isIosDevice);

    // Check if prompt was already captured in index.html
    if (window.__pwaDeferredPrompt) {
      setDeferredPrompt(window.__pwaDeferredPrompt);
    }

    const handlePromptReady = () => {
      if (window.__pwaDeferredPrompt) {
        setDeferredPrompt(window.__pwaDeferredPrompt);
      }
    };

    const handleBeforeInstall = (e) => {
      e.preventDefault();
      window.__pwaDeferredPrompt = e;
      setDeferredPrompt(e);
    };

    window.addEventListener("pwa-prompt-ready", handlePromptReady);
    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    window.addEventListener("appinstalled", () => {
      setDeferredPrompt(null);
      window.__pwaDeferredPrompt = null;
      setIsStandalone(true);
      setShowModal(false);
      if (onShowToast) {
        onShowToast("Agro Tarmoq ilovasi telefoningizga muvaffaqiyatli oʻrnatildi! 🎉");
      }
    });

    const handleOpenModal = () => setShowModal(true);
    window.addEventListener("open-pwa-modal", handleOpenModal);

    return () => {
      window.removeEventListener("pwa-prompt-ready", handlePromptReady);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("open-pwa-modal", handleOpenModal);
    };
  }, [onShowToast]);

  const handleInstallClick = async () => {
    const promptEvent = deferredPrompt || window.__pwaDeferredPrompt;

    if (promptEvent) {
      try {
        promptEvent.prompt();
        const choice = await promptEvent.userChoice;
        if (choice.outcome === "accepted") {
          setDeferredPrompt(null);
          window.__pwaDeferredPrompt = null;
          setShowModal(false);
          if (onShowToast) {
            onShowToast("Ilova oʻrnatilmoqda... 📲");
          }
        }
      } catch (err) {
        console.error("PWA install error:", err);
        setShowModal(true);
      }
    } else {
      // If browser has not fired beforeinstallprompt (e.g. iOS or already installed or desktop)
      setShowModal(true);
    }
  };

  // If already installed in standalone mode, do not show install banner
  if (isStandalone) return null;

  return (
    <>
      {/* Floating Install Capsule at Bottom */}
      {!dismissed && (
        <aside
          className="pwa-floating-banner"
          style={{
            position: "fixed",
            bottom: "84px",
            left: "16px",
            zIndex: 90,
            background: "linear-gradient(135deg, #15803d, #166534)",
            color: "#fff",
            padding: "8px 14px",
            borderRadius: "999px",
            boxShadow: "0 10px 30px rgba(21, 128, 61, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.2)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            animation: "pwaPulse 3s infinite ease-in-out",
          }}
          aria-label="Ilovani oʻrnatish"
        >
          <div
            onClick={handleInstallClick}
            style={{ display: "flex", alignItems: "center", gap: "9px" }}
          >
            <img
              src="/logo.png"
              alt="Agro Tarmoq"
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "1.5px solid rgba(255,255,255,0.9)",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
              <span style={{ fontSize: "0.86rem", fontWeight: 800 }}>
                {t("pwa_btn") || "Ilovani oʻrnatish"}
              </span>
              <span style={{ fontSize: "0.68rem", opacity: 0.85 }}>
                Tez va qulay ishlash
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setDismissed(true);
            }}
            style={{
              background: "rgba(255,255,255,0.22)",
              border: "none",
              color: "#fff",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              fontSize: "12px",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              marginLeft: "4px",
            }}
            title="Yopish"
            aria-label="Yopish"
          >
            ✕
          </button>
        </aside>
      )}

      {/* PWA Step-by-Step Instruction Modal (when native prompt cannot be triggered directly) */}
      {showModal && (
        <div
          className="uzum-modal-backdrop"
          onClick={() => setShowModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="uzum-modal"
            style={{ maxWidth: "460px", borderRadius: "24px", padding: "26px", margin: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <img
                  src="/logo.png"
                  alt="Agro Tarmoq"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid var(--primary-color)",
                    boxShadow: "0 4px 14px rgba(21, 128, 61, 0.25)",
                  }}
                />
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "var(--text-color)" }}>
                    Agro Tarmoq
                  </h3>
                  <span style={{ fontSize: "0.78rem", color: "var(--primary-color)", fontWeight: 700 }}>
                    Rasmiy mobil ilova
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="uzum-modal-close"
                style={{ position: "static", width: "32px", height: "32px" }}
                aria-label="Yopish"
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: "0.88rem", color: "var(--muted-color)", lineHeight: 1.5, marginBottom: "18px" }}>
              Agro Tarmoq platformasini telefoningizning asosiy ekraniga ilova sifatida oʻrnatib oling. Brauzersiz, toʻliq ekranda tezkor ishlaydi!
            </p>

            {/* If native deferred prompt is available right now */}
            {(deferredPrompt || window.__pwaDeferredPrompt) ? (
              <div style={{ marginBottom: "20px" }}>
                <button
                  type="button"
                  className="ag-btn ag-btn-green"
                  style={{
                    width: "100%",
                    padding: "14px",
                    fontWeight: 800,
                    fontSize: "1rem",
                    borderRadius: "14px",
                    boxShadow: "0 6px 20px rgba(21, 128, 61, 0.35)",
                    cursor: "pointer",
                  }}
                  onClick={handleInstallClick}
                >
                  📲 Hozir telefonimga oʻrnatish
                </button>
              </div>
            ) : isIOS ? (
              /* iOS Safari Manual Guide */
              <div
                style={{
                  background: "var(--yellow-soft)",
                  padding: "16px",
                  borderRadius: "14px",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                  marginBottom: "20px",
                }}
              >
                <div style={{ fontWeight: 800, fontSize: "0.92rem", color: "#b45309", marginBottom: "8px" }}>
                  🍎 iPhone (iOS Safari) da oʻrnatish:
                </div>
                <div style={{ fontSize: "0.84rem", color: "var(--text-color)", lineHeight: 1.65 }}>
                  1. Safari pastki menyusidagi <strong>Ulashish (Share <i className="fa-solid fa-arrow-up-from-bracket"></i>)</strong> tugmasini bosing.<br />
                  2. Roʻyxatdan <strong>"Bosh ekranga qoʻshish" (Add to Home Screen ⊞)</strong> bandini tanlang.<br />
                  3. Yuqori oʻngdagi <strong>"Qoʻshish"</strong> tugmasini bosing.
                </div>
              </div>
            ) : (
              /* Android Chrome Manual Guide */
              <div
                style={{
                  background: "var(--green-soft)",
                  padding: "16px",
                  borderRadius: "14px",
                  border: "1px solid var(--green-soft-border)",
                  marginBottom: "20px",
                }}
              >
                <div style={{ fontWeight: 800, fontSize: "0.92rem", color: "var(--primary-color)", marginBottom: "8px" }}>
                  🤖 Android (Chrome) da oʻrnatish:
                </div>
                <div style={{ fontSize: "0.84rem", color: "var(--text-color)", lineHeight: 1.65 }}>
                  1. Brauzerning yuqori oʻng burchagidagi <strong>3 nuqta (⋮)</strong> menyusini bosing.<br />
                  2. <strong>"Ilovani oʻrnatish"</strong> yoki <strong>"Asosiy ekranga qoʻshish"</strong> bandini tanlang.<br />
                  3. <strong>"Oʻrnatish"</strong> tugmasini tasdiqlang.
                </div>
              </div>
            )}

            {/* Benefits 3 badges */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "20px", textAlign: "center" }}>
              <div style={{ background: "var(--green-soft)", padding: "10px 6px", borderRadius: "12px" }}>
                <div style={{ fontSize: "1.2rem" }}>⚡</div>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-color)", marginTop: "2px" }}>Tezkor</div>
              </div>
              <div style={{ background: "var(--green-soft)", padding: "10px 6px", borderRadius: "12px" }}>
                <div style={{ fontSize: "1.2rem" }}>📱</div>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-color)", marginTop: "2px" }}>Toʻliq ekran</div>
              </div>
              <div style={{ background: "var(--green-soft)", padding: "10px 6px", borderRadius: "12px" }}>
                <div style={{ fontSize: "1.2rem" }}>🔔</div>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-color)", marginTop: "2px" }}>Bildirishnomalar</div>
              </div>
            </div>

            <button
              type="button"
              className="ag-btn ag-btn-ghost"
              style={{ width: "100%", padding: "12px", borderRadius: "12px", fontWeight: 700 }}
              onClick={() => setShowModal(false)}
            >
              Yopish
            </button>
          </div>
        </div>
      )}
    </>
  );
}
