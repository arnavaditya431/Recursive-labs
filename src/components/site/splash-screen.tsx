import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { BRAND } from "@/lib/brand";

// ============================================================
// CONSTANTS
// ============================================================

const SPLASH_KEY = "recursive-lab-splash-v3";

// V3.0 Timings (in seconds)
const T = {
  GENESIS_START: 0.3,
  DUPLICATE_START: 0.6,
  CLOUD_FORMED: 1.2,
  STRUCTURE_START: 1.2,
  LINES_CONNECT: 1.6,
  INNER_FRAMES: 2.0,
  MOSAIC_RESOLVE: 2.8,
  COMPRESSION_START: 3.8,
  VORTEX: 4.2,
  COLLAPSE: 4.5,
  LOGO_ASSEMBLE: 4.5,
  SWEEP: 5.2,
  TYPEWRITER: 5.5,
  INVERSION: 6.2,
  DISSOLVE: 6.5,
};

// ============================================================
// UTILS
// ============================================================

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ============================================================
// TYPES
// ============================================================

interface Particle {
  id: number;
  x: number;
  y: number;
  tx: number; // target x
  ty: number; // target y
  size: number;
  alpha: number;
  vx: number;
  vy: number;
  color: string;
}

// ============================================================
// SPLASH SCREEN COMPONENT
// ============================================================

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"black" | "inverted" | "done">("black");
  const [showTypewriter, setShowTypewriter] = useState(false);
  const animRef = useRef(0);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTimeout(onComplete, 1500); // Quick fade out for reduced motion
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ---- Canvas setup ----
    const dpr = window.devicePixelRatio || 1;
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const CX = W / 2;
    const CY = H / 2;

    // ---- Particle Engine Setup ----
    const MAX_PARTICLES = 256;
    let particles: Particle[] = [];

    // Phase 1: Genesis - Start with 1
    particles.push({
      id: 0, x: CX, y: CY, tx: CX, ty: CY, size: 0, alpha: 0, vx: 0, vy: 0, color: "255, 255, 255"
    });

    const startTime = performance.now();

    // DOM Timers
    const timers = [
      setTimeout(() => setShowTypewriter(true), T.TYPEWRITER * 1000),
      setTimeout(() => setPhase("inverted"), T.INVERSION * 1000),
      setTimeout(onComplete, T.DISSOLVE * 1000),
    ];

    // --- Grid / Frame positions for Phase 2 ---
    const frameSize = Math.min(W * 0.4, H * 0.4);
    const getGridPos = (id: number, max: number) => {
      // Create a recursive nested rectangle structure
      // For simplicity in this engine, we arrange them in concentric squares
      const layer = Math.floor(Math.sqrt(id));
      const angle = (id / max) * Math.PI * 2 * layer;
      const radius = (layer / 16) * frameSize;
      return {
        x: CX + Math.cos(angle) * radius,
        y: CY + Math.sin(angle) * radius
      };
    };

    // --- Logo positions for Phase 4 ---
    // Approximating the "R" logo with particles
    const getLogoPos = (id: number, max: number) => {
      // Simple R shape or circle for the brand
      const angle = (id / max) * Math.PI * 2;
      const r = 80 + Math.random() * 20;
      return {
        x: CX + Math.cos(angle) * r,
        y: CY + Math.sin(angle) * r
      };
    };

    let flashAlpha = 0;

    function draw(now: number) {
      const elapsed = (now - startTime) / 1000;
      if (elapsed > T.DISSOLVE + 0.5) return;

      // Inversion handling
      const isInverted = elapsed >= T.INVERSION;
      const bgColor = isInverted ? "oklch(0.965 0.008 70)" : "#000000"; // Kagaz vs Black
      const fgColor = isInverted ? "oklch(0.10 0.018 255)" : "#FFFFFF"; // Syahi vs White

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, W, H);

      // ==========================================
      // PHASE LOGIC
      // ==========================================

      // PHASE 1: GENESIS (0 - 1.2s)
      if (elapsed >= T.GENESIS_START && elapsed < T.CLOUD_FORMED) {
        particles[0].size = 3;
        particles[0].alpha = 1;
        
        // Duplication
        if (elapsed > T.DUPLICATE_START && particles.length < MAX_PARTICLES) {
          // Double the particles every 80ms
          const expectedCount = Math.pow(2, Math.floor((elapsed - T.DUPLICATE_START) / 0.08) + 1);
          while (particles.length < Math.min(expectedCount, MAX_PARTICLES)) {
            const parent = particles[Math.floor(Math.random() * particles.length)];
            particles.push({
              id: particles.length,
              x: parent.x,
              y: parent.y,
              tx: parent.tx,
              ty: parent.ty,
              size: 3,
              alpha: 1,
              vx: (Math.random() - 0.5) * 10,
              vy: (Math.random() - 0.5) * 10,
              color: "255, 255, 255"
            });
          }
        }
        
        // Explosion drift
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.95; // friction
          p.vy *= 0.95;
        }
      }

      // PHASE 2 & 3: STRUCTURE & MOSAIC (1.2s - 3.8s)
      if (elapsed >= T.STRUCTURE_START && elapsed < T.COMPRESSION_START) {
        const prog = clamp((elapsed - T.STRUCTURE_START) / 1.0, 0, 1);
        const ease = easeOutExpo(prog);
        
        // Move to grid positions
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const target = getGridPos(i, MAX_PARTICLES);
          
          // Rotation applied to target
          const rotAngle = elapsed * 0.2; // Slow rotation
          const dx = target.x - CX;
          const dy = target.y - CY;
          const rotX = CX + dx * Math.cos(rotAngle) - dy * Math.sin(rotAngle);
          const rotY = CY + dx * Math.sin(rotAngle) + dy * Math.cos(rotAngle);

          p.x = lerp(p.x, rotX, ease * 0.1);
          p.y = lerp(p.y, rotY, ease * 0.1);
          p.size = lerp(p.size, 2, ease * 0.1);

          // Phase 2b: Lines connect
          if (elapsed > T.LINES_CONNECT && i > 0 && i % 4 !== 0) {
            const prev = particles[i - 1];
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(prev.x, prev.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${ease * 0.15})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // PHASE 3b: VORTEX & COLLAPSE (3.8s - 4.5s)
      if (elapsed >= T.COMPRESSION_START && elapsed < T.COLLAPSE) {
        const prog = clamp((elapsed - T.COMPRESSION_START) / (T.COLLAPSE - T.COMPRESSION_START), 0, 1);
        const ease = easeInOutCubic(prog);

        for (const p of particles) {
          const angle = Math.atan2(p.y - CY, p.x - CX);
          const dist = Math.sqrt(Math.pow(p.x - CX, 2) + Math.pow(p.y - CY, 2));
          
          // Vortex spin
          const spin = angle + ease * 10;
          // Compression
          const newDist = lerp(dist, 0, ease);
          
          p.x = CX + Math.cos(spin) * newDist;
          p.y = CY + Math.sin(spin) * newDist;
          
          // Color stream (motion blur effect)
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - Math.cos(spin)*15, p.y - Math.sin(spin)*15);
          ctx.strokeStyle = `rgba(82, 36, 268, ${1 - ease})`; // Nila color approx
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Trigger flash exactly at collapse
        if (prog > 0.95 && flashAlpha === 0) {
          flashAlpha = 1;
        }
      }

      // PHASE 4: REVEAL (4.5s+)
      if (elapsed >= T.LOGO_ASSEMBLE) {
        const prog = clamp((elapsed - T.LOGO_ASSEMBLE) / 0.5, 0, 1);
        const ease = easeOutExpo(prog);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const target = getLogoPos(i, MAX_PARTICLES);
          
          // Spring out from center
          if (prog === 0) {
            p.x = CX; p.y = CY;
          }
          
          p.x = lerp(p.x, target.x, ease * 0.2);
          p.y = lerp(p.y, target.y, ease * 0.2);
          p.alpha = lerp(p.alpha, 1, 0.1);
        }
      }

      // Render Particles
      for (const p of particles) {
        if (p.alpha > 0) {
          ctx.beginPath();
          ctx.fillStyle = isInverted ? fgColor : `rgba(${p.color}, ${p.alpha})`;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Flash overlay
      if (flashAlpha > 0) {
        ctx.fillStyle = `rgba(255, 255, 255, ${flashAlpha})`;
        ctx.fillRect(0, 0, W, H);
        flashAlpha = Math.max(0, flashAlpha - 0.05); // Fade out quickly (80ms)
      }

      // Metallic Sweep
      if (elapsed >= T.SWEEP && elapsed < T.SWEEP + 0.8) {
        const sp = (elapsed - T.SWEEP) / 0.8;
        const sx = lerp(CX - 200, CX + 200, sp);
        const sw = 40;
        const sg = ctx.createLinearGradient(sx - sw, 0, sx + sw, 0);
        sg.addColorStop(0, "transparent");
        sg.addColorStop(0.5, isInverted ? "rgba(0,0,0,0.2)" : "rgba(255, 255, 255, 0.6)");
        sg.addColorStop(1, "transparent");
        
        ctx.globalCompositeOperation = "source-atop";
        ctx.fillStyle = sg;
        ctx.fillRect(CX - 150, CY - 150, 300, 300);
        ctx.globalCompositeOperation = "source-over";
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden"
      style={{ backgroundColor: phase === "inverted" ? "var(--kagaz)" : "#000000" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      <AnimatePresence>
        {showTypewriter && (
          <motion.div
            className="absolute inset-x-0 bottom-[15%] z-10 flex flex-col items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.p
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6 }}
              className="font-mono text-sm tracking-widest text-[var(--dhul)]"
            >
              <TypewriterText text="Engineering Ideas. Building Tomorrow." />
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip button for development / impatient users */}
      <button 
        onClick={onComplete}
        className="absolute bottom-6 right-6 font-mono text-[10px] tracking-widest uppercase opacity-30 hover:opacity-100 transition-opacity z-50 mix-blend-difference text-white"
      >
        Skip [Esc]
      </button>
    </motion.div>
  );
}

// Simple typewriter effect for the Fira Code tagline
function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 40); // typing speed
    
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayed}<span className="animate-pulse ml-1 inline-block w-1 h-3 bg-current align-middle" /></span>;
}

// ============================================================
// SPLASH GATE
// ============================================================

export function SplashGate({ children }: { children: React.ReactNode }) {
  // Archiving the splash screen for now so it doesn't run on every load
  return <>{children}</>;
}
