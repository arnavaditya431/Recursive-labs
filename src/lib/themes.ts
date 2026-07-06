export type ThemeId = "light" | "dark";

export type ThemeMode = "light" | "dark" | "system";

export const themes: Record<
  ThemeId,
  { label: string; description: string; dataTheme: string }
> = {
  light: {
    label: "Light",
    description: "Premium light palette for clarity and professionalism.",
    dataTheme: "light",
  },
  dark: {
    label: "Dark",
    description: "Refined dark palette for immersive, cinematic experiences.",
    dataTheme: "dark",
  },
};

export const DEFAULT_THEME: ThemeId = "light";

export const THEME_STORAGE_KEY = "recursive-lab-theme";
export const THEME_MODE_KEY = "recursive-lab-theme-mode";
