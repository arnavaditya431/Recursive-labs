import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import gsap from "gsap";

export function PageTransition() {
  const { location } = useRouterState();
  const transitionRef = useRef<HTMLDivElement>(null);
  const [prevPath, setPrevPath] = useState(location.pathname);
  
  useEffect(() => {
    if (location.pathname === prevPath) return;
    setPrevPath(location.pathname);

    if (!transitionRef.current) return;
    
    // Moment 09: The Page Transition
    // "three nested rectangles expand from the centre of the screen in rapid succession (120ms between each), each rotated 1° from the previous. They create a brief spiral-zoom effect. The content of the previous page is hidden behind them. Then the rectangles contract and disappear, revealing the new page. Total transition: 500ms."

    const rects = transitionRef.current.querySelectorAll('.transition-rect');
    const tl = gsap.timeline();
    
    // Initial state: Start big to cover the instant DOM change, then shrink
    // Since intercepting the click before routing is complex, we simulate it by flashing them up instantly and then gracefully shrinking them away to reveal the new page.
    gsap.set(rects, { 
      scale: 1.5, 
      opacity: 1, 
      rotation: (i) => i * 1,
      display: 'block'
    });
    
    // Shrink them away to reveal the new page
    tl.to(rects, {
      scale: 0,
      duration: 0.5,
      stagger: 0.12,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(rects, { display: 'none' });
      }
    });

  }, [location.pathname, prevPath]);

  return (
    <div ref={transitionRef} className="fixed inset-0 pointer-events-none z-[90] flex items-center justify-center overflow-hidden">
       {/* 3 Nested Rectangles */}
       <div className="transition-rect absolute w-[100vw] h-[100vh] border border-[var(--rekha)] bg-[var(--kagaz)] shadow-2xl hidden" />
       <div className="transition-rect absolute w-[80vw] h-[80vh] border border-[var(--rekha)] bg-[var(--kagaz)] shadow-2xl hidden" />
       <div className="transition-rect absolute w-[60vw] h-[60vh] border border-[var(--rekha)] bg-[var(--kagaz)] shadow-2xl hidden" />
    </div>
  );
}
