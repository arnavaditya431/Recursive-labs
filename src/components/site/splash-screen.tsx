import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BRAND } from "@/lib/brand";

// ============================================================
// CONSTANTS
// ============================================================

const SPLASH_KEY = "recursive-lab-splash-v4";

// Phase timing (seconds)
const T = {
  AMBIENT_START: 0,
  GRID_START: 0.8,
  GRID_HOLD: 2.2,
  VORTEX_START: 2.6,
  DISSOLVE_MID: 4.0,
  LOGO_ASSEMBLED: 5.0,
  SWEEP_START: 5.1,
  TEXT_START: 5.5,
  TAGLINE_START: 6.0,
  HOLD_END: 6.8,
  EXIT_END: 7.4,
};

// Tech/business stock images from Unsplash (tiny thumbnails for fast loading)
const IMAGE_URLS = [
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=150&h=100&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=150&h=100&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=150&h=100&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&h=100&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&h=100&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=150&h=100&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=150&h=100&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=150&h=100&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=150&h=100&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=150&h=100&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=150&h=100&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=150&h=100&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&h=100&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=150&h=100&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=150&h=100&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=150&h=100&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=150&h=100&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=150&h=100&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=150&h=100&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=150&h=100&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=150&h=100&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=150&h=100&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=100&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&h=100&fit=crop&auto=format&q=50",
];

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function clamp(v: number, min: number, max: number) { return Math.max(min, Math.min(max, v)); }
function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }
function easeInOutCubic(t: number) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

// ============================================================
// LOGO SPIRAL DOT GENERATION (Archimedean spiral)
// ============================================================

function generateLogoDots(cx: number, cy: number, maxR: number) {
  const dots: { x: number; y: number; size: number }[] = [];
  const n = 72;
  const turns = 3.0;
  
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  
  for (let i = 1; i <= n; i++) {
    const t = i / n;
    const theta = t * turns * Math.PI * 2 + Math.PI * 0.5;
    const r = t * maxR;
    const x = cx + Math.cos(theta) * r;
    const y = cy + Math.sin(theta) * r;
    const size = Math.max(1.2, (1.5 + t * 6) * (maxR / 140));
    
    dots.push({ x, y, size });
    
    minX = Math.min(minX, x - size);
    maxX = Math.max(maxX, x + size);
    minY = Math.min(minY, y - size);
    maxY = Math.max(maxY, y + size);
  }
  
  // Center the spiral optically by aligning its bounding box to CX, CY
  const bboxCenterX = (minX + maxX) / 2;
  const bboxCenterY = (minY + maxY) / 2;
  const offsetX = cx - bboxCenterX;
  const offsetY = cy - bboxCenterY;
  
  for (const dot of dots) {
    dot.x += offsetX;
    dot.y += offsetY;
  }
  
  return dots;
}

// ============================================================
// FALLBACK TILE GENERATOR (used if Unsplash images fail)
// ============================================================

function createFallbackTile(index: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = 150; c.height = 100;
  const ctx = c.getContext("2d")!;
  const hue = 200 + (index * 17) % 60;
  const grad = ctx.createLinearGradient(0, 0, 150, 100);
  grad.addColorStop(0, `hsl(${hue}, 60%, 12%)`);
  grad.addColorStop(1, `hsl(${hue + 30}, 50%, 22%)`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 150, 100);
  ctx.strokeStyle = `hsla(${hue}, 80%, 40%, 0.12)`;
  ctx.lineWidth = 0.5;
  for (let x = 0; x < 150; x += 15) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 100); ctx.stroke(); }
  for (let y = 0; y < 100; y += 15) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(150, y); ctx.stroke(); }
  ctx.fillStyle = `hsla(${hue}, 90%, 60%, 0.25)`;
  for (let j = 0; j < 4; j++) { ctx.beginPath(); ctx.arc(20 + j * 35, 50, 2.5, 0, Math.PI * 2); ctx.fill(); }
  return c;
}

// ============================================================
// TYPES
// ============================================================

interface AmbientParticle { x: number; y: number; vx: number; vy: number; size: number; alpha: number; }

interface TileState {
  img: HTMLImageElement | HTMLCanvasElement;
  gridX: number; gridY: number;
  spiralAngle: number; spiralSpeed: number;
  stagger: number;
  dissolved: boolean;
}

interface LogoParticle {
  sx: number; sy: number;   // start
  tx: number; ty: number;   // target
  ts: number;               // target size
  x: number; y: number;     // current
  size: number;
  born: number;             // elapsed time when spawned
  spiralOff: number;
}

interface FillerParticle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; alpha: number; decay: number;
}

// ============================================================
// SPLASH SCREEN COMPONENT
// ============================================================

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showText, setShowText] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [exiting, setExiting] = useState(false);
  const animRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ---- Canvas setup ----
    const dpr = window.devicePixelRatio || 1;
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const CX = W / 2;
    const CY = H / 2;
    const isMobile = W < 768;

    // ---- Grid layout ----
    const cols = isMobile ? 4 : 6;
    const rows = isMobile ? 3 : 4;
    const numTiles = cols * rows;
    const tileW = isMobile ? 60 : Math.min(120, W * 0.065);
    const tileH = tileW * 0.67;
    const gap = tileW * 0.12;
    const gridTotalW = cols * tileW + (cols - 1) * gap;
    const gridTotalH = rows * tileH + (rows - 1) * gap;
    const gridX0 = CX - gridTotalW / 2;
    const gridY0 = CY - gridTotalH / 2;

    // ---- Logo dots ----
    const logoScale = isMobile ? 80 : 140;
    const logoDots = generateLogoDots(CX, CY, logoScale);

    // ---- Ambient particles ----
    const ambientCount = isMobile ? 120 : 280;
    const ambient: AmbientParticle[] = Array.from({ length: ambientCount }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      size: Math.random() * 1.6 + 0.3,
      alpha: Math.random() * 0.35 + 0.05,
    }));

    // ---- Tiles (initialised with fallbacks, swapped when real images load) ----
    const tiles: TileState[] = Array.from({ length: numTiles }, (_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      return {
        img: createFallbackTile(i),
        gridX: gridX0 + col * (tileW + gap) + tileW / 2,
        gridY: gridY0 + row * (tileH + gap) + tileH / 2,
        spiralAngle: (i / numTiles) * Math.PI * 2,
        spiralSpeed: 0.9 + Math.random() * 0.6,
        stagger: i,
        dissolved: false,
      };
    });

    // Load real images asynchronously, swap them in as they arrive
    IMAGE_URLS.slice(0, numTiles).forEach((url, i) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => { tiles[i].img = img; };
      img.src = url;
    });

    // ---- Particle arrays ----
    const logoParticles: LogoParticle[] = [];
    const fillerParticles: FillerParticle[] = [];

    // ---- Schedule DOM text reveals ----
    const timers = [
      setTimeout(() => setShowText(true), T.TEXT_START * 1000),
      setTimeout(() => setShowTagline(true), T.TAGLINE_START * 1000),
      setTimeout(() => setExiting(true), T.HOLD_END * 1000),
      setTimeout(onComplete, T.EXIT_END * 1000),
    ];

    const startTime = performance.now();

    // ============================================================
    // MAIN ANIMATION LOOP
    // ============================================================

    function draw(now: number) {
      const elapsed = (now - startTime) / 1000;
      if (elapsed > T.EXIT_END + 0.5) return; // stop after exit

      ctx.clearRect(0, 0, W, H);

      // ---- 1. BACKGROUND ----
      ctx.fillStyle = "#030407";
      ctx.fillRect(0, 0, W, H);

      // ---- 2. BLUE AMBIENT GLOW ----
      const glowFade = clamp(elapsed / 1.2, 0, 1);
      const glowOut = elapsed > T.LOGO_ASSEMBLED ? Math.max(0, 1 - (elapsed - T.LOGO_ASSEMBLED) / 2) : 1;
      const glowA = 0.12 * glowFade * glowOut;
      const glow = ctx.createRadialGradient(CX, CY, 0, CX, CY, Math.max(W, H) * 0.55);
      glow.addColorStop(0, `rgba(30, 70, 220, ${glowA})`);
      glow.addColorStop(0.4, `rgba(20, 50, 160, ${glowA * 0.4})`);
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      // ---- 3. AMBIENT PARTICLES ----
      const pAlpha = glowFade * glowOut;
      for (const p of ambient) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

        // Vortex pull during spiral phase
        if (elapsed > T.VORTEX_START && elapsed < T.LOGO_ASSEMBLED) {
          const dx = CX - p.x, dy = CY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          p.vx += (dx / dist) * 0.004 + (-dy / dist) * 0.006;
          p.vy += (dy / dist) * 0.004 + (dx / dist) * 0.006;
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(70, 130, 255, ${p.alpha * pAlpha})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // ---- 4. IMAGE TILES ----
      const hw = tileW / 2, hh = tileH / 2;
      for (const tile of tiles) {
        if (tile.dissolved) continue;

        const sd = tile.stagger * 0.055; // stagger delay
        let opacity = 0, tx = tile.gridX, ty = tile.gridY, sc = 1, rot = 0;

        // A) GRID FADE-IN
        if (elapsed >= T.GRID_START + sd) {
          const fp = clamp((elapsed - T.GRID_START - sd) / 0.5, 0, 1);
          opacity = easeOutCubic(fp);
          sc = lerp(1.15, 1, easeOutCubic(fp));
        }

        // B) GRID HOLD — gentle float + activation shake
        if (elapsed >= T.GRID_HOLD && elapsed < T.VORTEX_START) {
          const at = clamp((elapsed - T.GRID_HOLD) / (T.VORTEX_START - T.GRID_HOLD), 0, 1);
          const floatX = Math.cos(elapsed * 1.2 + tile.stagger * 0.5) * 2;
          const floatY = Math.sin(elapsed * 1.5 + tile.stagger * 0.7) * 2;
          const shake = at * 3;
          tx = tile.gridX + floatX + Math.sin(elapsed * 22 + tile.stagger) * shake;
          ty = tile.gridY + floatY + Math.cos(elapsed * 22 + tile.stagger * 1.5) * shake;
          opacity = 1;
        }

        // C) SPIRAL VORTEX
        if (elapsed >= T.VORTEX_START) {
          const vDur = T.DISSOLVE_MID - T.VORTEX_START + 0.6;
          const vp = clamp((elapsed - T.VORTEX_START) / vDur, 0, 1);
          const eased = easeInOutCubic(vp);

          const angle = tile.spiralAngle + eased * Math.PI * 5 * tile.spiralSpeed;
          const radius = (1 - eased) * Math.max(W, H) * 0.35;

          tx = lerp(tile.gridX, CX + Math.cos(angle) * radius * (1 - eased * 0.7), eased);
          ty = lerp(tile.gridY, CY + Math.sin(angle) * radius * (1 - eased * 0.7), eased);
          sc = lerp(1, 0.08, eased);
          rot = eased * Math.PI * 4;
          opacity = lerp(1, 0, clamp((eased - 0.55) / 0.45, 0, 1));

          // D) DISSOLVE — spawn particles
          if (opacity <= 0.02 && !tile.dissolved) {
            tile.dissolved = true;
            // Logo particles
            const perTile = Math.ceil(logoDots.length / numTiles);
            const start = tile.stagger * perTile;
            for (let d = start; d < Math.min(start + perTile, logoDots.length); d++) {
              logoParticles.push({
                sx: tx, sy: ty,
                tx: logoDots[d].x, ty: logoDots[d].y,
                ts: logoDots[d].size,
                x: tx, y: ty, size: 1,
                born: elapsed,
                spiralOff: Math.random() * Math.PI * 2,
              });
            }
            // Filler scatter particles
            const fillerCount = isMobile ? 6 : 14;
            for (let f = 0; f < fillerCount; f++) {
              const a = Math.random() * Math.PI * 2;
              const spd = 0.5 + Math.random() * 2.5;
              fillerParticles.push({
                x: tx, y: ty,
                vx: Math.cos(a) * spd, vy: Math.sin(a) * spd,
                size: Math.random() * 2 + 0.5,
                alpha: 0.7,
                decay: 0.012 + Math.random() * 0.008,
              });
            }
          }
        }

        if (opacity < 0.01) continue;

        // DRAW TILE
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.translate(tx, ty);
        ctx.rotate(rot);
        ctx.scale(sc, sc);
        // Rounded clip
        ctx.beginPath();
        ctx.roundRect(-hw, -hh, tileW, tileH, 4);
        ctx.clip();
        ctx.drawImage(tile.img, -hw, -hh, tileW, tileH);
        // Blue tint overlay
        ctx.fillStyle = "rgba(20, 50, 180, 0.12)";
        ctx.fillRect(-hw, -hh, tileW, tileH);
        ctx.restore();
      }

      // ---- 5. FILLER PARTICLES (scatter + fade) ----
      for (let i = fillerParticles.length - 1; i >= 0; i--) {
        const fp = fillerParticles[i];
        fp.x += fp.vx; fp.y += fp.vy;
        fp.alpha -= fp.decay;
        if (fp.alpha <= 0) { fillerParticles.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.fillStyle = `rgba(90, 150, 255, ${fp.alpha})`;
        ctx.arc(fp.x, fp.y, fp.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // ---- 6. LOGO PARTICLES (converge to spiral logo positions) ----
      for (const lp of logoParticles) {
        const dur = 1.1;
        const p = clamp((elapsed - lp.born) / dur, 0, 1);
        const e = easeOutCubic(p);

        // Spiral convergence (rotate while approaching target)
        const spiralR = (1 - e) * 35;
        const spiralA = lp.spiralOff + (1 - e) * Math.PI * 4;

        lp.x = lerp(lp.sx, lp.tx, e) + Math.cos(spiralA) * spiralR;
        lp.y = lerp(lp.sy, lp.ty, e) + Math.sin(spiralA) * spiralR;
        lp.size = lerp(1, lp.ts, e);

        const alpha = clamp(p * 2.5, 0, 1);
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.arc(lp.x, lp.y, lp.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // ---- 7. LOGO GLOW (after full assembly) ----
      if (elapsed >= T.LOGO_ASSEMBLED) {
        const gp = clamp((elapsed - T.LOGO_ASSEMBLED) / 0.6, 0, 1);
        // Pulse: fast bright → settle
        const ga = gp < 0.3 ? easeOutCubic(gp / 0.3) * 0.35 : 0.35 * (1 - (gp - 0.3) / 0.7 * 0.7);
        const lg = ctx.createRadialGradient(CX, CY, 0, CX, CY, logoScale * 1.6);
        lg.addColorStop(0, `rgba(60, 120, 255, ${ga})`);
        lg.addColorStop(1, "transparent");
        ctx.fillStyle = lg;
        ctx.fillRect(CX - logoScale * 2, CY - logoScale * 2, logoScale * 4, logoScale * 4);
      }

      // ---- 8. METALLIC SWEEP ----
      if (elapsed >= T.SWEEP_START && elapsed < T.SWEEP_START + 0.7) {
        const sp = (elapsed - T.SWEEP_START) / 0.7;
        const sx = lerp(CX - logoScale * 2, CX + logoScale * 2, sp);
        const sw = 50;
        const sg = ctx.createLinearGradient(sx - sw, 0, sx + sw, 0);
        sg.addColorStop(0, "transparent");
        sg.addColorStop(0.5, `rgba(255, 255, 255, ${0.35 * (1 - sp)})`);
        sg.addColorStop(1, "transparent");
        ctx.fillStyle = sg;
        ctx.fillRect(CX - logoScale * 2, CY - logoScale * 2, logoScale * 4, logoScale * 4);
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  // ---- RENDER ----
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#030407] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1, scale: exiting ? 1.08 : 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      <AnimatePresence>
        {showText && (
          <motion.div
            className="absolute inset-x-0 z-10 flex flex-col items-center justify-start pointer-events-none"
            style={{ top: "50%", marginTop: isMobileSafe() ? "90px" : "160px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 22, filter: "blur(14px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-wider"
            >
              Recursive Lab
            </motion.h1>

            <AnimatePresence>
              {showTagline && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.65, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-4 font-display text-sm sm:text-base italic text-white/50 tracking-widest"
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

/** Simple check for mobile without the hook (since we're outside the canvas effect) */
function isMobileSafe() {
  return typeof window !== "undefined" && window.innerWidth < 768;
}

// ============================================================
// SPLASH GATE (session-based, shows splash once per session)
// ============================================================

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
    return <div className="fixed inset-0 z-[100] bg-[#030407]" aria-hidden="true" />;
  }

  if (state === "splash") {
    return <SplashScreen onComplete={handleComplete} />;
  }

  return <>{children}</>;
}
