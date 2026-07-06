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
  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "system";
    const stored = localStorage.getItem(THEME_MODE_KEY) as ThemeMode | null;
    if (stored && (stored === "light" || stored === "dark" || stored === "system")) return stored;
    return "system";
  });

  const theme = useMemo(() => resolveTheme(mode), [mode]);

  // Apply theme to DOM
  useEffect(() => {
    const resolved = resolveTheme(mode);
    document.documentElement.dataset.theme = themes[resolved].dataTheme;
    localStorage.setItem(THEME_MODE_KEY, mode);
    localStorage.setItem(THEME_STORAGE_KEY, resolved);
  }, [mode]);

  // Listen for OS preference changes when in "system" mode
  useEffect(() => {
    if (mode !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const resolved = getSystemTheme();
      document.documentElement.dataset.theme = themes[resolved].dataTheme;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [mode]);

  const setMode = (next: ThemeMode) => setModeState(next);

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
