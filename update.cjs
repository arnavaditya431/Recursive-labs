const fs = require('fs');

let content = fs.readFileSync('src/routes/index.tsx', 'utf8');

// 1. Imports
content = content.replace(
/import \{ RecursiveParticleField \} from "@\/components\/ui\/recursive-particle-field";\r?\n\r?\nif \(typeof window !== "undefined"\) \{\r?\n  gsap\.registerPlugin\(ScrollTrigger\);\r?\n\}/,
`import { RecursiveParticleField } from "@/components/ui/recursive-particle-field";
import {
  getMotionTier,
  usePrefersReducedMotion,
  PaperEngine,
  InkEngine,
  TypographyEngine,
  PhotoEngine,
  CounterEngine,
  ParallaxEngine,
  RevealEngine,
  PinEngine,
  τ,
  EASE,
  STAGGER,
} from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}`
);

// 2. Scene 02 to 04
const scene2to4 = `/* ─────────────────────────────────────────────────────────────
   SCENE 02: THE STATEMENT (Motion Updated)
   ───────────────────────────────────────────────────────────── */
function Scene02_Statement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tier = getMotionTier();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    let ctx = gsap.context(() => {
      TypographyEngine.labelFlip(".statement-label", { trigger: containerRef.current, reducedMotion: reduced });
      PaperEngine.vellumSlide(".statement-headline", { trigger: containerRef.current, start: "top 70%", reducedMotion: reduced });
      InkEngine.bleedReveal(".statement-body", { trigger: containerRef.current, start: "top 60%", reducedMotion: reduced, tier });
      ParallaxEngine.develop(".statement-bg", { trigger: containerRef.current, start: "top bottom", end: "center center", reducedMotion: reduced });
    }, containerRef);
    return () => ctx.revert();
  }, [tier, reduced]);

  return (
    <section ref={containerRef} className="relative min-h-[80vh] flex items-center py-24 px-[var(--container-px)] bg-[var(--syahi)] overflow-hidden">
      <video 
        src="/approach-bg.mp4" 
        autoPlay loop muted playsInline
        className="statement-bg absolute inset-0 w-full h-full object-cover grayscale brightness-0 saturate-0" 
      />
      <div className="relative z-10 max-w-5xl">
        <p className="statement-label font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--kagaz)] opacity-70 mb-8">
          01 — The Approach
        </p>
        <h2 className="statement-headline font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.9] tracking-[-0.02em] text-[var(--kagaz)]">
          We treat your platform as a strategic asset, not a cost centre.
        </h2>
        <p className="statement-body mt-12 text-lg text-[var(--kagaz)] opacity-80 max-w-lg leading-relaxed">
          By engineers who think in systems. A premium boutique consultancy
          delivering software engineering, AI, and cloud solutions.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SCENE 03: THE THESIS (Motion Updated)
   ───────────────────────────────────────────────────────────── */
function Scene03_Thesis() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    let ctx = gsap.context(() => {
      RevealEngine.fromBelow(".thesis-quote", { trigger: containerRef.current, reducedMotion: reduced, y: 40 });
    }, containerRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={containerRef} className="section-py-lg border-t border-[var(--rekha)] bg-[var(--syahi)] text-[var(--kagaz)]">
      <div className="container-editorial py-24 sm:py-40">
        <p className="thesis-quote font-display text-[clamp(1.8rem,4vw,3.5rem)] leading-[1.1] tracking-[-0.01em] max-w-5xl">
          "The best technology work comes from small teams of senior people who own outcomes end to end, and who stay long enough to see their decisions through."
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SCENE 04: THE CINEMATIC PARALLAX (Motion Updated)
   ───────────────────────────────────────────────────────────── */
function Scene04_CinematicParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tier = getMotionTier();
  const reduced = usePrefersReducedMotion();
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      ParallaxEngine.layer(".parallax-media", 25, { trigger: containerRef.current, tier, reducedMotion: reduced });
      ParallaxEngine.focusPull(".parallax-media", { trigger: containerRef.current, tier, reducedMotion: reduced, scrub: true });
    }, containerRef);
    return () => ctx.revert();
  }, [tier, reduced]);

  return (
    <section ref={containerRef} className="h-[70vh] sm:h-[90vh] overflow-hidden relative bg-[var(--syahi)]">
      <video 
        src="/parallax-bg.mp4" 
        autoPlay loop muted playsInline
        className="parallax-media absolute top-[-15%] left-0 w-full h-[130%] object-cover grayscale brightness-50 contrast-50 blur-sm" 
      />
      <div className="film-grain-overlay" />
    </section>
  );
}`;

content = content.replace(
  /\/\* ─────────────────────────────────────────────────────────────\r?\n   SCENE 02: THE STATEMENT[\s\S]*?\/\* ─────────────────────────────────────────────────────────────\r?\n   SCENE 05: THE HORIZONTAL DRIFT/,
  scene2to4 + '\n\n/* ─────────────────────────────────────────────────────────────\n   SCENE 05: THE HORIZONTAL DRIFT'
);


// 3. Scene 06
const scene6 = `/* ─────────────────────────────────────────────────────────────
   SCENE 06: THE COUNTER (Motion Updated)
   ───────────────────────────────────────────────────────────── */
function Scene06_Counter() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const tier = getMotionTier();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    let ctx = gsap.context(() => {
      CounterEngine.stamp(".counter-label", { trigger: triggerRef.current, reducedMotion: reduced, stagger: STAGGER.slow });
      const digits = gsap.utils.toArray(".counter-digit");
      const targets = [6, 5, 2026, 9];
      digits.forEach((el, i) => {
        CounterEngine.roll(el, 0, targets[i], { trigger: triggerRef.current, reducedMotion: reduced, tier });
      });
    }, triggerRef);
    return () => ctx.revert();
  }, [tier, reduced]);

  return (
    <section ref={triggerRef} className="py-32 sm:py-48 border-b border-[var(--rekha)] bg-[var(--kagaz)]">
      <div className="container-editorial flex justify-center text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-16 md:gap-24">
          <div>
            <div className="counter-digit font-display text-[clamp(4rem,8vw,8rem)] leading-none text-[var(--syahi)]">00</div>
            <div className="counter-label mt-4 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--dhul)]">Practices</div>
          </div>
          <div>
            <div className="counter-digit font-display text-[clamp(4rem,8vw,8rem)] leading-none text-[var(--syahi)]">00</div>
            <div className="counter-label mt-4 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--dhul)]">Principals</div>
          </div>
          <div>
            <div className="counter-digit font-display text-[clamp(4rem,8vw,8rem)] leading-none text-[var(--syahi)]">0000</div>
            <div className="counter-label mt-4 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--dhul)]">Founded</div>
          </div>
          <div>
            <div className="counter-digit font-display text-[clamp(4rem,8vw,8rem)] leading-none text-[var(--syahi)]">00</div>
            <div className="counter-label mt-4 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--dhul)]">Cities</div>
          </div>
        </div>
      </div>
    </section>
  );
}`;

content = content.replace(
  /\/\* ─────────────────────────────────────────────────────────────\r?\n   SCENE 06: THE COUNTER[\s\S]*?\/\* ─────────────────────────────────────────────────────────────\r?\n   SCENE 07: THE CONVICTION SEQUENCE/,
  scene6 + '\n\n/* ─────────────────────────────────────────────────────────────\n   SCENE 07: THE CONVICTION SEQUENCE'
);


// 4. Scene 07 to 10
const scene7to10 = `/* ─────────────────────────────────────────────────────────────
   SCENE 07: THE CONVICTION SEQUENCE (Motion Updated)
   ───────────────────────────────────────────────────────────── */
function Scene07_ConvictionSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tier = getMotionTier();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    let ctx = gsap.context(() => {
      PinEngine.stickyStack(
        gsap.utils.toArray(".conviction-page"),
        containerRef.current,
        { tier, reducedMotion: reduced }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [tier, reduced]);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      {/* Page 1 */}
      <section className="conviction-page z-[4] h-screen sticky top-0 flex items-center justify-center bg-[var(--syahi)] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <video src="/mvp-bg.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover grayscale" />
        </div>
        <h2 className="relative z-10 font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.9] tracking-[-0.02em] text-[var(--kagaz)] text-center max-w-5xl">
          We don't build MVP's.<br />We build <em className="text-[var(--nila)]">foundations.</em>
        </h2>
      </section>

      {/* Page 2 */}
      <section className="conviction-page z-[3] h-screen sticky top-0 grid lg:grid-cols-2 bg-[var(--kagaz)]">
        <div className="flex items-center px-[var(--container-px)]">
          <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] leading-[0.9] tracking-[-0.02em] text-[var(--syahi)] max-w-2xl">
            Engineering as posture.<br />Documentation as proof.
          </h2>
        </div>
        <div className="relative h-full w-full hidden lg:block p-12 bg-[var(--syahi)]">
          <div className="relative w-full h-full">
            <RecursiveFrame activeColor={false} />
            <video src="/posture-bg.mp4" autoPlay loop muted playsInline className="absolute inset-3 object-cover w-[calc(100%-24px)] h-[calc(100%-24px)] grayscale opacity-50" />
          </div>
        </div>
      </section>

      {/* Page 3 */}
      <section className="conviction-page z-[2] h-screen sticky top-0 flex items-center px-[var(--container-px)] bg-[var(--syahi)]">
        <video src="/patna-bg.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover grayscale brightness-50" />
        <h2 className="relative z-10 font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.9] tracking-[-0.02em] text-[var(--kagaz)] max-w-5xl">
          Designed in Patna.<br />Built for the world.
        </h2>
      </section>

      {/* Page 4 */}
      <section className="conviction-page z-[1] h-screen sticky top-0 flex items-center justify-center text-center px-[var(--container-px)] bg-[var(--syahi)]">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <video src="/statement-bg.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover grayscale mix-blend-screen" />
        </div>
        <h2 className="relative z-10 font-display text-[clamp(3.5rem,10vw,12rem)] leading-[0.85] tracking-[-0.03em] text-[var(--kagaz)] uppercase">
          <em className="block text-sm tracking-[0.5em] font-mono text-[var(--dhul)] mb-8 uppercase not-italic">The End Game</em>
          Long Term<br /><span className="text-[var(--nila)]">Value</span>
        </h2>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SCENE 08: THE FOUNDER REVEAL (Motion Updated)
   ───────────────────────────────────────────────────────────── */
function Scene08_FounderReveal() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const tier = getMotionTier();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    let ctx = gsap.context(() => {
      PhotoEngine.contactSheet(".founder-photo", { trigger: triggerRef.current, reducedMotion: reduced, tier });
      TypographyEngine.labelFlip(".founder-name", { trigger: triggerRef.current, reducedMotion: reduced });
    }, triggerRef);
    return () => ctx.revert();
  }, [tier, reduced]);

  return (
    <section ref={triggerRef} className="relative pt-32 pb-16 bg-[var(--kagaz)] border-b border-[var(--rekha)] overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-0 flex items-center justify-center">
        <img src="/hero-bg.png" alt="Background Texture" className="w-full h-full object-cover" />
      </div>

      <div className="container-editorial relative z-10">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--dhul)] mb-24 md:mb-32 text-center md:text-left">
          03 — The Assembly
        </p>
        
        <div className="relative max-w-[90rem] mx-auto flex flex-col md:flex-row items-center md:items-start justify-center gap-12 md:gap-8 lg:gap-12 pb-32">
          {/* Faint Connecting SVG Line (Desktop Only) */}
          <svg className="absolute top-[30%] left-[10%] w-[80%] h-[40%] pointer-events-none hidden md:block opacity-20 -z-10" viewBox="0 0 1000 200" preserveAspectRatio="none">
            <path d="M 0,100 Q 250,20 500,100 T 1000,100" fill="none" stroke="var(--syahi)" strokeWidth="0.5" strokeDasharray="4 4" />
          </svg>

          {team.map((member, i) => {
            let wClass = "w-[70%] md:w-[22%]";
            if (i === 0) wClass = "w-[70%] md:w-[20%]";
            if (i === 1) wClass = "w-[80%] md:w-[24%]";
            if (i === 2) wClass = "w-[80%] md:w-[24%]";
            if (i === 3) wClass = "w-[70%] md:w-[20%]";
            if (i === 4) wClass = "w-[65%] md:w-[22%]";

            let aspectClass = "aspect-[3/4]";
            if (i === 1) aspectClass = "aspect-[4/5]";
            if (i === 2) aspectClass = "aspect-[4/5]";

            let mtClass = "mt-0";
            if (i === 1) mtClass = "md:mt-[80px]";
            if (i === 2) mtClass = "md:mt-[20px]";
            if (i === 3) mtClass = "md:mt-[-40px]";
            if (i === 4) mtClass = "md:mt-[100px]";

            let objectPos = "object-center";
            if (i === 1) objectPos = "object-top";
            
            let rotateClass = "rotate-0";
            if (i === 0) rotateClass = "-rotate-2";
            if (i === 1) rotateClass = "rotate-1";
            if (i === 2) rotateClass = "-rotate-1";
            if (i === 3) rotateClass = "rotate-2";
            if (i === 4) rotateClass = "-rotate-2";
            
            const hoverRotate = i % 2 === 0 ? "hover:rotate-1" : "hover:-rotate-1";

            return (
              <div key={member.slug} className={\`\${wClass} \${mtClass} flex flex-col items-center md:items-start group\`}>
                <Link to={\`/team#\${member.slug}\`} className="w-full relative block">
                  <div className={\`w-full \${aspectClass} \${rotateClass} \${hoverRotate} bg-[var(--syahi)] p-2 sm:p-3 border border-[var(--rekha)] shadow-lg transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] hover:shadow-xl hover:z-20 cursor-pointer\`}>
                    <div className="founder-photo w-full h-full relative overflow-hidden bg-[var(--dhul)]" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
                      <img src={member.photo} className={\`w-full h-full object-cover \${objectPos} grayscale contrast-125 sepia-[0.15] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:contrast-100 group-hover:sepia-0\`} alt={member.name} />
                    </div>
                  </div>
                </Link>
                
                <div className="founder-name mt-6 text-center md:text-left">
                  <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--syahi)] font-bold">{member.name}</p>
                  <p className="font-mono text-[9px] tracking-widest uppercase text-[var(--syahi)]/60 mt-1.5">{member.role}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SCENE 09: THE CITY BREATH (Motion Updated)
   ───────────────────────────────────────────────────────────── */
function Scene09_CityBreath() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tier = getMotionTier();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    let ctx = gsap.context(() => {
      ParallaxEngine.layer(".city-bg", 20, { trigger: containerRef.current, tier, reducedMotion: reduced });
    }, containerRef);
    return () => ctx.revert();
  }, [tier, reduced]);

  return (
    <section ref={containerRef} className="h-[100dvh] overflow-hidden relative">
      <img 
        src={REGISTERS.R3_CITY} 
        className="city-bg absolute top-[-15%] left-0 w-full h-[130%] object-cover contrast-125 sepia-[0.3]" 
        alt="Indian Cityscape" 
      />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SCENE 10: THE CLOSING FRAME (Motion Updated)
   ───────────────────────────────────────────────────────────── */
function Scene10_ClosingFrame() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    let ctx = gsap.context(() => {
      RevealEngine.fromBelow(".closing-content", { trigger: triggerRef.current, reducedMotion: reduced, y: 30 });
    }, triggerRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={triggerRef} className="py-40 bg-[var(--kagaz)] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Dust particles drifting up */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="dust-particle top-1/4 left-1/4" />
        <div className="dust-particle top-1/2 left-2/3" />
        <div className="dust-particle top-3/4 left-1/3" />
        <div className="dust-particle top-1/3 left-3/4" />
      </div>

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, var(--syahi) 0, var(--syahi) 1px, transparent 0, transparent 50%)', backgroundSize: '100px 100px' }} />
      
      <div className="relative p-16 sm:p-24 max-w-3xl w-full flex items-center justify-center text-center mx-4">
        <RecursiveFrame activeColor={true} />
        
        <div className="closing-content relative z-10 flex flex-col items-center">
          <h2 className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-[0.9] tracking-[-0.02em] text-[var(--syahi)]">
            Now it's <em className="text-[var(--nila)]">your move.</em>
          </h2>
          <Link to="/contact" className="mt-12 btn-recursive bg-[var(--syahi)] text-[var(--kagaz)] hover:bg-[var(--nila)] hover:border-[var(--nila)] px-8 py-4 text-sm font-medium tracking-wide uppercase font-mono">
            Start a convo &rarr;
          </Link>
        </div>
      </div>
      
      <div className="mt-32 w-full px-[var(--container-px)]">
        <p className="font-display text-sm text-[var(--dhul)]">Engineering ideas.</p>
      </div>
    </section>
  );
}`;

content = content.replace(
  /\/\* ─────────────────────────────────────────────────────────────\r?\n   SCENE 07: THE CONVICTION SEQUENCE[\s\S]*$/,
  scene7to10 + "\n"
);

fs.writeFileSync('src/routes/index.tsx', content, 'utf8');
