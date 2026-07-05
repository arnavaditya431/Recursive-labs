export type ThemeId = "corporate-blue" | "midnight-dark" | "clean-light";

export const themes: Record<
  ThemeId,
  { label: string; description: string; className?: string; dataTheme: string }
> = {
  "corporate-blue": {
    label: "Corporate Blue",
    description: "Default enterprise palette with refined navy and cobalt accents.",
    dataTheme: "corporate-blue",
  },
  "midnight-dark": {
    label: "Midnight Dark",
    description: "Deep charcoal foundation for immersive, cinematic experiences.",
    dataTheme: "midnight-dark",
  },
  "clean-light": {
    label: "Clean Light",
    description: "Bright editorial layout for presentations and print-friendly contexts.",
    dataTheme: "clean-light",
  },
};

export const DEFAULT_THEME: ThemeId = "corporate-blue";

export const THEME_STORAGE_KEY = "recursion-labs-theme";
