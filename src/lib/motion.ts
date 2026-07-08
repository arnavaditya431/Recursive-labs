import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─────────────────────────────────────────────────────────────
// FOUNDATION: TIMING & EASING
// ─────────────────────────────────────────────────────────────
export const τ = {
  base: 0.3,
  slow: 0.6,
  cinematic: 1.5,
  epic: 2.5,
};

export const EASE = {
  precise: "expo.out",
  ink: "power2.inOut",
  paper: "power3.out",
  inOut: "power2.inOut",
};

export const STAGGER = {
  normal: 0.1,
  slow: 0.15,
  darkroom: 0.25,
};

// ─────────────────────────────────────────────────────────────
// PERFORMANCE & ACCESSIBILITY
// ─────────────────────────────────────────────────────────────
export type MotionTier = "A" | "B" | "C";

export function getMotionTier(): MotionTier {
  if (typeof window === "undefined") return "A";
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
  if (isMobile) return "C";
  if (isTablet) return "B";
  return "A";
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);
  return reduced;
}

// ─────────────────────────────────────────────────────────────
// ENGINES
// ─────────────────────────────────────────────────────────────

type EngineOpts = {
  trigger?: HTMLElement | null;
  start?: string;
  end?: string;
  delay?: number;
  stagger?: number;
  reducedMotion?: boolean;
  tier?: MotionTier;
  scrub?: boolean | number;
};

export const PaperEngine = {
  vellumSlide: (el: HTMLElement | null, opts: EngineOpts) => {
    if (!el || opts.reducedMotion) return;
    gsap.from(el, {
      xPercent: 10,
      opacity: 0,
      duration: τ.slow,
      ease: EASE.paper,
      scrollTrigger: {
        trigger: opts.trigger || el,
        start: opts.start || "top 80%",
      },
    });
  },
  pinDrop: (selector: string | Element[], opts: EngineOpts) => {
    if (opts.reducedMotion) return;
    gsap.from(selector, {
      y: 40,
      opacity: 0,
      duration: τ.slow,
      stagger: opts.stagger || 0.1,
      ease: EASE.precise, // Motion Bible § 9: expo.out, not elastic
      scrollTrigger: {
        trigger: opts.trigger,
        start: opts.start || "top 80%",
      },
    });
  },
};

export const TypographyEngine = {
  labelFlip: (el: HTMLElement | null, opts: EngineOpts) => {
    if (!el || opts.reducedMotion) return;
    gsap.from(el, {
      rotateX: -90,
      opacity: 0,
      duration: τ.slow,
      ease: EASE.precise,
      scrollTrigger: {
        trigger: opts.trigger || el,
        start: opts.start || "top 80%",
      },
    });
  },
};

export const InkEngine = {
  spreadLine: (el: HTMLElement | null, opts: EngineOpts) => {
    if (!el || opts.reducedMotion) return;
    gsap.from(el, {
      scaleX: 0,
      opacity: 0,
      duration: τ.slow,
      delay: opts.delay || 0,
      ease: EASE.ink,
      scrollTrigger: {
        trigger: opts.trigger || el,
        start: opts.start || "top 80%",
      },
    });
  },
  bleedReveal: (selector: string | Element[], opts: EngineOpts) => {
    if (opts.reducedMotion) return;
    gsap.from(selector, {
      opacity: 0,
      filter: "blur(4px)",
      duration: τ.slow,
      delay: opts.delay || 0,
      stagger: opts.stagger || 0.1,
      ease: EASE.ink,
      scrollTrigger: {
        trigger: opts.trigger,
        start: opts.start || "top 80%",
      },
    });
  },
};

export const ParallaxEngine = {
  layer: (el: HTMLElement | null, yPercent: number, opts: EngineOpts) => {
    if (!el || opts.reducedMotion || opts.tier === "C") return;
    gsap.to(el, {
      yPercent,
      ease: "none",
      scrollTrigger: {
        trigger: opts.trigger || el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  },
  develop: (el: HTMLElement | null, opts: EngineOpts) => {
    if (!el || opts.reducedMotion) return;
    gsap.to(el, {
      filter: "brightness(0.5) saturate(0.5)", // brightens from initial dark state
      ease: "none",
      scrollTrigger: {
        trigger: opts.trigger || el,
        start: opts.start || "top bottom",
        end: opts.end || "center center",
        scrub: true,
      },
    });
  },
  focusPull: (el: HTMLElement | null, opts: EngineOpts) => {
    if (!el || opts.reducedMotion) return;
    if (opts.tier === "C") {
      gsap.to(el, { opacity: 1, duration: 1 });
      return;
    }
    gsap.to(el, {
      filter: "brightness(1) saturate(1) contrast(1) blur(0px)",
      ease: "none",
      scrollTrigger: {
        trigger: opts.trigger || el,
        start: opts.start || "top bottom",
        end: opts.end || "center center",
        scrub: opts.scrub || true,
      },
    });
  },
};

export const CounterEngine = {
  stamp: (selector: string | Element[], opts: EngineOpts) => {
    if (opts.reducedMotion) return;
    gsap.from(selector, {
      scale: 1.5,
      opacity: 0,
      duration: τ.base,
      stagger: opts.stagger || 0.1,
      ease: EASE.precise,
      scrollTrigger: {
        trigger: opts.trigger,
        start: opts.start || "top 80%",
      },
    });
  },
  roll: (el: HTMLElement | null, from: number, to: number, opts: EngineOpts) => {
    if (!el || opts.reducedMotion) {
      if (el) el.innerText = to.toString().padStart(2, "0");
      return;
    }
    const obj = { val: from };
    gsap.to(obj, {
      val: to,
      duration: τ.cinematic,
      ease: EASE.precise,
      scrollTrigger: {
        trigger: opts.trigger || el,
        start: opts.start || "top 80%",
      },
      onUpdate: () => {
        let text = Math.round(obj.val).toString();
        if (to < 100) text = text.padStart(2, "0"); // pad only 2-digit max counters
        el.innerText = text;
      },
    });
  },
};

export const PinEngine = {
  stickyStack: (els: (HTMLElement | null)[], container: HTMLElement | null, opts: EngineOpts) => {
    if (!container || els.length === 0 || opts.reducedMotion) return;
    
    // In Tier C, just fade them in sequentially instead of pinning
    if (opts.tier === "C") {
      els.forEach((el, i) => {
        if (!el) return;
        el.style.position = 'relative';
        el.style.zIndex = (10 - i).toString();
        el.style.clipPath = 'none';
        gsap.from(el, {
          opacity: 0,
          y: 20,
          scrollTrigger: { trigger: el, start: "top 80%" }
        });
      });
      return;
    }

    // Tier A/B: Sticky Stack peel away effect
    // elements are 1, 2, 3, 4 (top to bottom of DOM, but reverse z-index)
    // Actually, in DOM: 4 is bottom (z1), 3 is (z2), 2 is (z3), 1 is top (z4)
    // We animate the clip-path of the top elements as user scrolls down container
    
    const validEls = els.filter(Boolean) as HTMLElement[];
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
    
    // Peel off validEls[0] (Page 1, top), then [1] (Page 2), then [2] (Page 3)
    // We leave the last one alone since it reveals itself as others peel
    for (let i = 0; i < validEls.length - 1; i++) {
      tl.to(validEls[i], {
        clipPath: 'inset(100% 0 0% 0)', // Clip from bottom up
        ease: "none",
      });
    }
  },
};

export const PhotoEngine = {
  contactSheet: (selector: string | Element[], opts: EngineOpts & { grainClass?: string }) => {
    if (opts.reducedMotion) return;
    gsap.from(selector, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: τ.cinematic,
      stagger: opts.stagger || STAGGER.darkroom,
      ease: EASE.inOut,
      scrollTrigger: {
        trigger: opts.trigger,
        start: opts.start || "top 80%",
      },
    });
  },
};

export const RevealEngine = {
  fromBelow: (selector: string | Element[], opts: EngineOpts & { y?: number }) => {
    if (opts.reducedMotion) return;
    gsap.from(selector, {
      y: opts.y || 20,
      opacity: 0,
      duration: τ.slow,
      delay: opts.delay || 0,
      ease: EASE.paper,
      scrollTrigger: {
        trigger: opts.trigger,
        start: opts.start || "top 80%",
      },
    });
  },
};
