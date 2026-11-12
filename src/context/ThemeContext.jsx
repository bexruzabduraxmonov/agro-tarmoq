import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem("agro_theme");
      if (saved) return saved === "dark";
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("agro_theme", isDark ? "dark" : "light");
      const root = document.documentElement;
      const body = document.body;

      if (isDark) {
        root.setAttribute("data-theme", "dark");
        root.classList.add("dark");
        body.classList.add("dark-theme");
        root.style.colorScheme = "dark";
      } else {
        root.removeAttribute("data-theme");
        root.classList.remove("dark");
        body.classList.remove("dark-theme");
        root.style.colorScheme = "light";
      }
    } catch (e) {
      console.error("Theme toggle error:", e);
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}

export default ThemeContext;
