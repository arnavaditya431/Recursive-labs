import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LogoIcon } from "@/components/brand/logo";
import { BRAND } from "@/lib/brand";

const SPLASH_KEY = "recursive-lab-splash-seen-v2";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"void" | "pulse" | "etching" | "impact" | "dive">("void");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("pulse"), 400);
    const t2 = setTimeout(() => setPhase("etching"), 1200);
    const t3 = setTimeout(() => setPhase("impact"), 2800);
    const t4 = setTimeout(() => setPhase("dive"), 4200);
    const t5 = setTimeout(onComplete, 5000);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030407] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "dive" ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* The Geometric Grid Background */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ 
          opacity: (phase === "pulse" || phase === "etching" || phase === "impact") ? 0.3 : 0,
          scale: phase === "dive" ? 1.5 : 1 
        }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        <div 
          className="absolute inset-[-100%] w-[300%] h-[300%]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "4rem 4rem",
            transform: "perspective(1000px) rotateX(60deg) translateY(-20vh)",
            transformOrigin: "center center",
          }}
        />
        {/* Horizon fade out */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030407] via-transparent to-[#030407]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030407] via-transparent to-[#030407]" />
      </motion.div>

      {/* The Pulse (Shockwave) */}
      <AnimatePresence>
        {phase === "pulse" && (
          <motion.div
            className="absolute z-10 rounded-full border border-primary/50"
            initial={{ width: 0, height: 0, opacity: 1, borderWidth: "8px" }}
            animate={{ width: "200vw", height: "200vw", opacity: 0, borderWidth: "1px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* The Container for Dive */}
      <motion.div
        className="relative z-20 flex flex-col items-center"
        initial={{ scale: 1 }}
        animate={{ 
          scale: phase === "dive" ? 4 : 1,
          y: phase === "dive" ? "20vh" : 0 
        }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="relative flex flex-col items-center">
          
          {/* The Logo Etching */}
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 50% 50%)", rotate: -45 }}
            animate={{ 
              opacity: phase !== "void" && phase !== "pulse" ? 1 : 0,
              clipPath: phase !== "void" && phase !== "pulse" ? "circle(100% at 50% 50%)" : "circle(0% at 50% 50%)",
              rotate: phase !== "void" && phase !== "pulse" ? 0 : -45
            }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative p-4"
          >
            <LogoIcon className="h-[96px] sm:h-[120px] md:h-[144px] lg:h-[160px] invert drop-shadow-2xl" />
            
            {/* The Metallic Impact Sweep */}
            {(phase === "impact" || phase === "dive") && (
              <motion.div
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg]"
                initial={{ x: "-150%" }}
                animate={{ x: "150%" }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            )}
          </motion.div>

          {/* The Identity (Text Reveal) */}
          <AnimatePresence>
            {(phase === "impact" || phase === "dive") && (
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(10px)", scale: 0.95 }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 flex flex-col items-center text-center"
              >
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-ivory tracking-wide">
                  Recursive Lab
                </h1>
                <p className="mt-4 max-w-[280px] sm:max-w-md font-display text-sm sm:text-base italic text-ivory/60 tracking-wider drop-shadow-md">
                  {BRAND.tagline}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>
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
    return <div className="fixed inset-0 z-[100] bg-[#030407]" aria-hidden="true" />;
  }

  if (state === "splash") {
    return <SplashScreen onComplete={handleComplete} />;
  }

  return <>{children}</>;
}
