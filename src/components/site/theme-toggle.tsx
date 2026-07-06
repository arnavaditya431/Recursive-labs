import { motion } from "motion/react";
import { useTheme } from "@/components/site/theme-provider";
import type { ThemeMode } from "@/lib/themes";

const modeOrder: ThemeMode[] = ["light", "dark", "system"];
const modeLabels: Record<ThemeMode, string> = {
  light: "Light mode",
  dark: "Dark mode",
  system: "System preference",
};

export function ThemeToggle({ className }: { className?: string }) {
  const { mode, setMode, theme } = useTheme();

  const cycleMode = () => {
    const currentIndex = modeOrder.indexOf(mode);
    const nextIndex = (currentIndex + 1) % modeOrder.length;
    setMode(modeOrder[nextIndex]);
  };

  const isDark = theme === "dark";

  return (
    <button
      onClick={cycleMode}
      className={`group relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-transparent hover:border-border hover:bg-muted/50 transition-all touch-target ${className ?? ""}`}
      aria-label={modeLabels[mode]}
      title={modeLabels[mode]}
    >
      <div className="relative h-4 w-4">
        {/* Sun icon */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute inset-0 h-4 w-4"
          initial={false}
          animate={{
            scale: isDark ? 0 : 1,
            opacity: isDark ? 0 : 1,
            rotate: isDark ? -90 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </motion.svg>

        {/* Moon icon */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute inset-0 h-4 w-4"
          initial={false}
          animate={{
            scale: isDark ? 1 : 0,
            opacity: isDark ? 1 : 0,
            rotate: isDark ? 0 : 90,
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </motion.svg>
      </div>

      {/* Mode indicator dot (visible when in system mode) */}
      {mode === "system" && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary border-2 border-background"
        />
      )}
    </button>
  );
}
