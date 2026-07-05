import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

type DataWaveProps = {
  className?: string;
  density?: number;
  interactive?: boolean;
};

export function DataWave({ className, density = 1, interactive = true }: DataWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });
  const frameRef = useRef(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let points: { x: number; y: number; baseY: number }[] = [];

    const buildGrid = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * devicePixelRatio);
      canvas.height = Math.floor(height * devicePixelRatio);
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

      // On mobile, increase spacing (lower density) to reduce particle count and save GPU
      const baseSpacing = Math.max(14, 22 / density);
      const spacing = isMobile ? baseSpacing * 1.5 : baseSpacing;
      
      cols = Math.ceil(width / spacing) + 1;
      rows = Math.ceil(height / spacing) + 1;
      points = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = x * spacing;
          const py = y * spacing;
          points.push({ x: px, y: py, baseY: py });
        }
      }
    };

    buildGrid();
    const ro = new ResizeObserver(buildGrid);
    ro.observe(canvas);

    const onMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
        active: true,
      };
    };
    
    // Support touch interactions for mobile/tablet
    const onTouch = (e: TouchEvent) => {
      if (!interactive || !e.touches[0]) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.touches[0].clientX - rect.left) / rect.width,
        y: (e.touches[0].clientY - rect.top) / rect.height,
        active: true,
      };
    };

    const onLeave = () => {
      mouseRef.current.active = false;
    };

    if (interactive) {
      canvas.addEventListener("mousemove", onMove, { passive: true });
      canvas.addEventListener("mouseleave", onLeave);
      canvas.addEventListener("touchmove", onTouch, { passive: true });
      canvas.addEventListener("touchend", onLeave);
    }

    let t = 0;
    const draw = () => {
      // Slower animation on mobile
      t += isMobile ? 0.008 : 0.012;
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x * width;
      const my = mouseRef.current.y * height;

      for (const p of points) {
        const wave =
          Math.sin(p.x * 0.012 + t) * 8 +
          Math.cos(p.y * 0.01 + t * 1.2) * 6 +
          Math.sin((p.x + p.y) * 0.008 + t * 0.8) * 4;

        let influence = 0;
        if (mouseRef.current.active) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          influence = Math.max(0, 1 - dist / 180) * 24;
        }

        const y = p.baseY + wave - influence;
        const alpha = 0.15 + Math.min(0.55, Math.abs(wave + influence) / 30);

        ctx.beginPath();
        ctx.fillStyle = `rgba(110, 158, 255, ${alpha})`;
        // Slightly larger particles on mobile to compensate for reduced density
        ctx.arc(p.x, y, isMobile ? 1.5 : 1.1, 0, Math.PI * 2);
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(frameRef.current);
      if (interactive) {
        canvas.removeEventListener("mousemove", onMove);
        canvas.removeEventListener("mouseleave", onLeave);
        canvas.removeEventListener("touchmove", onTouch);
        canvas.removeEventListener("touchend", onLeave);
      }
    };
  }, [density, interactive, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("h-full w-full", className)}
      style={{ willChange: "transform" }}
      aria-hidden="true"
    />
  );
}
