import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Connect GSAP ScrollTrigger to Lenis
    // (GSAP ScrollTrigger needs to be synced with Lenis)
    lenis.on('scroll', () => {
      // In a real app we would import ScrollTrigger and update it here:
      // ScrollTrigger.update();
    });

    // RequestAnimationFrame loop
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return <>{children}</>;
}
