"use client";
import React from "react";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "anoshaan-theme";
const DEFAULT_THEME: Theme = "light";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/** Safe localStorage read — returns the saved manual choice, or null. */
function readStoredTheme(): Theme | null {
  try {
    const t = localStorage.getItem(STORAGE_KEY);
    return t === "light" || t === "dark" ? t : null;
  } catch {
    return null;
  }
}

/**
 * Reads the theme the no-flash script already committed to <html>, then keeps
 * React state, <html data-theme>, and localStorage in sync.
 *
 * Resolution order (matches the inline no-flash script):
 *   1. Saved manual choice in localStorage.
 *   2. System preference via prefers-color-scheme.
 *   3. Light fallback.
 *
 * When the visitor has NOT made a manual choice, the theme tracks the OS live
 * (e.g. an auto day/night switch). Once they use the toggle, that choice is
 * saved and from then on it wins over the system preference.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);

  // Hydrate from whatever the inline script set on the document (avoids a flash
  // and keeps SSR markup stable — the script runs before React mounts). When no
  // manual choice is saved, follow the system preference and react to changes.
  useEffect(() => {
    const current = document.documentElement.dataset.theme as Theme | undefined;
    if (current === "light" || current === "dark") {
      setThemeState(current);
    }

    if (readStoredTheme() !== null) return; // manual choice wins — don't follow OS

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (readStoredTheme() !== null) return; // user picked since mount — stop following
      const next: Theme = mq.matches ? "dark" : "light";
      setThemeState(next);
      const root = document.documentElement;
      root.dataset.theme = next;
      root.style.colorScheme = next;
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const applyTheme = useCallback((next: Theme) => {
    setThemeState(next);
    const root = document.documentElement;
    root.dataset.theme = next;
    root.style.colorScheme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — fall back to in-memory only */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      const root = document.documentElement;
      root.dataset.theme = next;
      root.style.colorScheme = next;
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme: applyTheme, toggleTheme }),
    [theme, applyTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}

/**
 * Inline, render-blocking script string injected in <head>. Resolves the theme
 * before first paint so there is never a flash of the wrong theme:
 *   1. saved manual choice in localStorage, else
 *   2. system preference via prefers-color-scheme, else
 *   3. light fallback.
 * It writes the result to <html> (data-theme + color-scheme) synchronously.
 */
export const themeNoFlashScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches)?"dark":"light";}document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;}catch(e){document.documentElement.dataset.theme="${DEFAULT_THEME}";document.documentElement.style.colorScheme="${DEFAULT_THEME}";}})();`;
