import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

interface RecursiveFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** If true, triggers the line-by-line drawing animation on mount */
  animateOnMount?: boolean;
  /** Optional delay before drawing starts */
  delay?: number;
  /** Allows overriding the hover color behavior */
  activeColor?: boolean;
}

export const RecursiveFrame = React.forwardRef<HTMLDivElement, RecursiveFrameProps>(
  ({ children, className, animateOnMount = false, delay = 0, activeColor = false, ...props }, ref) => {
    const frameRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
      if (!animateOnMount || !svgRef.current) return;

      const lines = svgRef.current.querySelectorAll('line, path, rect');
      
      // Reset
      gsap.set(lines, { strokeDasharray: 4000, strokeDashoffset: 4000 });

      // Draw sequence
      gsap.to(lines, {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: "power2.inOut",
        stagger: 0.1,
        delay: delay,
      });

    }, [animateOnMount, delay]);

    return (
      <div 
        ref={ref}
        className={cn("relative group inline-block", className)} 
        {...props}
      >
        {/* Background / Inner Content Wrapper */}
        <div className="relative z-10 p-2">
          {children}
        </div>

        {/* The Frame SVG */}
        <svg 
          ref={svgRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Frame */}
          <rect 
            x="0" y="0" 
            width="100%" height="100%" 
            fill="none" 
            className="stroke-[var(--rekha)] transition-colors duration-300"
            strokeWidth="1" 
          />
          
          {/* Inner Frame */}
          <rect 
            x="8" y="8" 
            width="calc(100% - 16px)" height="calc(100% - 16px)" 
            fill="none" 
            className={cn(
              "stroke-[var(--rekha)] transition-colors duration-300",
              activeColor ? "stroke-[var(--nila)]" : "group-hover:stroke-[var(--nila)]"
            )}
            strokeWidth="1" 
          />
        </svg>
      </div>
    );
  }
);
RecursiveFrame.displayName = 'RecursiveFrame';
