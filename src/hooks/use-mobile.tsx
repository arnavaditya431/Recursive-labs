import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}

/** Returns the current breakpoint token: xs | sm | md | tab | lg | xl | 2xl | 3xl */
export type Breakpoint = "xs" | "sm" | "md" | "tab" | "lg" | "xl" | "2xl" | "3xl";

const breakpoints: [number, Breakpoint][] = [
  [1920, "3xl"],
  [1440, "2xl"],
  [1280, "xl"],
  [1024, "lg"],
  [768, "tab"],
  [430, "md"],
  [375, "sm"],
  [0, "xs"],
];

export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = React.useState<Breakpoint>("xl");

  React.useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      for (const [min, name] of breakpoints) {
        if (w >= min) {
          setBp(name);
          return;
        }
      }
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return bp;
}

/** Respects user's prefers-reduced-motion setting */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** Detects touch-primary devices via pointer: coarse */
export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia("(pointer: coarse)");
    setIsTouch(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isTouch;
}
