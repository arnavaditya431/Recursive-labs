import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DEFAULT_THEME, THEME_STORAGE_KEY, themes, type ThemeId } from "@/lib/themes";

type ThemeContextValue = {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  themes: typeof themes;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT_THEME);

  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeId | null;
    if (stored && themes[stored]) setThemeState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = themes[theme].dataTheme;
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = (next: ThemeId) => setThemeState(next);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
