import { createContext, useContext, useEffect, useState, useMemo, type ReactNode } from "react";
import { DEFAULT_THEME, THEME_STORAGE_KEY, THEME_MODE_KEY, themes, type ThemeId, type ThemeMode } from "@/lib/themes";

type ThemeContextValue = {
  /** The resolved theme currently applied (always "light" or "dark") */
  theme: ThemeId;
  /** The user's mode preference ("light", "dark", or "system") */
  mode: ThemeMode;
  /** Set the mode preference */
  setMode: (mode: ThemeMode) => void;
  themes: typeof themes;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): ThemeId {
  if (typeof window === "undefined") return DEFAULT_THEME;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolveTheme(mode: ThemeMode): ThemeId {
  if (mode === "system") return getSystemTheme();
  return mode;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const mode: ThemeMode = "light";
  const theme: ThemeId = "light";

  // Apply theme to DOM globally
  useEffect(() => {
    document.documentElement.dataset.theme = themes[theme].dataTheme;
    localStorage.setItem(THEME_MODE_KEY, "light");
    localStorage.setItem(THEME_STORAGE_KEY, "light");
  }, [theme]);

  // Mock setMode to prevent runtime errors if used
  const setMode = () => {};

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) return { mode: "system", setMode: () => {}, theme: "light" };
  return ctx;
}
