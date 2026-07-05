import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LogoLockup } from "@/components/brand/logo";
import { BRAND } from "@/lib/brand";
import { useIsMobile } from "@/hooks/use-mobile";

const SPLASH_KEY = "recursion-labs-splash-seen";

type Particle = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  size: number;
  alpha: number;
};

function useSplashParticles(canvasRef: React.RefObject<HTMLCanvasElement | null>, active: boolean) {
  const frameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const startRef = useRef(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    
    // Reduce particle count on mobile
    const baseCount = Math.floor((canvas.width * canvas.height) / 900);
    const count = isMobile ? Math.min(400, baseCount) : Math.min(1200, baseCount);
    
    particlesRef.current = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * Math.max(canvas.width, canvas.height) * (isMobile ? 0.7 : 0.5);
      return {
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        tx: cx + (Math.random() - 0.5) * (isMobile ? 30 : 50),
        ty: cy + (Math.random() - 0.5) * (isMobile ? 30 : 50),
        size: Math.random() * (isMobile ? 2.0 : 1.6) + 0.4,
        alpha: Math.random() * 0.5 + 0.1,
      };
    });

    startRef.current = performance.now();

    const draw = (now: number) => {
      const elapsed = now - startRef.current;
      // Fade out particles as logo appears
      const globalAlpha = Math.max(0, 1 - (elapsed / 2500));
      
      const progress = Math.min(elapsed / 1500, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particlesRef.current) {
        // Converge towards the center
        p.x += (p.tx - p.x) * (0.05 + ease * 0.1);
        p.y += (p.ty - p.y) * (0.05 + ease * 0.1);
        
        ctx.beginPath();
        // Use the new primary blue for particles
        ctx.fillStyle = `rgba(100, 140, 255, ${p.alpha * globalAlpha})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (globalAlpha > 0) {
        frameRef.current = requestAnimationFrame(draw);
      }
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [active, canvasRef, isMobile]);
}

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"ambient" | "particles" | "logo" | "tagline" | "exit">("ambient");
  const isMobile = useIsMobile();
  
  useSplashParticles(canvasRef, phase === "ambient" || phase === "particles" || phase === "logo");

  useEffect(() => {
    const speedMultiplier = isMobile ? 0.8 : 1;
    
    // T1: particles begin converging intensely
    const t1 = setTimeout(() => setPhase("particles"), 200 * speedMultiplier);
    
    // T2: Logo fades in with scale and sweep
    const t2 = setTimeout(() => setPhase("logo"), 1200 * speedMultiplier);
    
    // T3: Tagline fades in
    const t3 = setTimeout(() => setPhase("tagline"), 2200 * speedMultiplier);
    
    // T4: Exit transition begins
    const t4 = setTimeout(() => setPhase("exit"), 3600 * speedMultiplier);
    
    // T5: Complete and unmount
    const t5 = setTimeout(onComplete, 4200 * speedMultiplier);
    
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5);
    };
  }, [onComplete, isMobile]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05060A]"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "exit" ? 0 : 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Soft blue ambient glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,100,255,0.06)_0%,transparent_60%)]"
      />

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />

      <AnimatePresence>
        {(phase === "logo" || phase === "tagline" || phase === "exit") && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center px-6 text-center"
          >
            <div className="relative">
              {/* Premium Blue Glow beneath the logo */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.2 }}
                className="absolute inset-0 scale-125 bg-primary/25 blur-3xl rounded-full"
              />
              
              <div className="relative overflow-hidden p-2">
                <LogoLockup />
                {/* Subtle metallic light sweep */}
                <motion.div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
                  initial={{ x: "-150%" }}
                  animate={{ x: "150%" }}
                  transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
                />
              </div>
            </div>

            <AnimatePresence>
              {(phase === "tagline" || phase === "exit") && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-6 sm:mt-8 max-w-[280px] sm:max-w-md font-display text-base sm:text-lg italic text-ivory/80 md:text-xl drop-shadow-md"
                >
                  {BRAND.tagline}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function SplashGate({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<"pending" | "splash" | "ready">("pending");

  useEffect(() => {
    const seen = sessionStorage.getItem(SPLASH_KEY);
    setState(seen ? "ready" : "splash");
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem(SPLASH_KEY, "1");
    setState("ready");
  };

  if (state === "pending") {
    return <div className="fixed inset-0 z-[100] bg-[#05060A]" aria-hidden="true" />;
  }

  if (state === "splash") {
    return <SplashScreen onComplete={handleComplete} />;
  }

  return <>{children}</>;
}
