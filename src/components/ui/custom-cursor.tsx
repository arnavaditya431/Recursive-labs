import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only run on desktop/devices with a precise pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Quick set for initial position
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      // Use GSAP quickTo for performance
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if we are hovering an interactive element
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'textarea' ||
        target.classList.contains('interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[100] hidden md:block mix-blend-difference"
      style={{ width: '16px', height: '16px' }}
    >
      {/* Outer Square */}
      <div className="absolute inset-0 border border-[var(--kagaz)] transition-transform duration-300" 
           style={{ transform: isHovering ? 'scale(1.2)' : 'scale(1)' }} 
      />
      
      {/* Inner Square */}
      <div 
        className={cn(
          "absolute top-[4px] left-[4px] w-[8px] h-[8px] border transition-all duration-300",
          isHovering 
            ? "bg-[var(--nila)] border-[var(--nila)] scale-150" 
            : "bg-transparent border-[var(--kagaz)] scale-100"
        )} 
      />
    </div>
  );
}
