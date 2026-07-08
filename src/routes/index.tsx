import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RecursiveFrame } from "@/components/ui/recursive-frame";
import { BRAND, PRACTICES } from "@/lib/brand";
import { defaultMeta, breadcrumbSchema } from "@/lib/seo";
import { services } from "@/lib/services";
import { team } from "@/lib/team";
import { RecursiveParticleField } from "@/components/ui/recursive-particle-field";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Route = createFileRoute("/")({
  head: () => defaultMeta(),
  component: HomePage,
});

/* 
 * UNPLASH PLACEHOLDERS MATCHING THE 4 REGISTERS 
 */
const REGISTERS = {
  R1_FOUNDERS: [
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
  ],
  R2_WORKSPACE: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
  R3_CITY: "/patna-gate.jpg", // Sabhyata Dwar, Patna
  R4_ABSTRACT: [
    "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=800&q=80"
  ]
};

function HomePage() {
  return (
    <div className="bg-[var(--kagaz)]">
      <Scene01_RecursiveReveal />
      <Scene02_Statement />
      <Scene03_Thesis />
      <Scene04_CinematicParallax />
      <Scene05_HorizontalDrift />
      <Scene06_Counter />
      <Scene07_ConvictionSequence />
      <Scene08_FounderReveal />
      <Scene09_CityBreath />
      <Scene10_ClosingFrame />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SCENE 01: THE RECURSIVE REVEAL (BRAND IDENTITY & MOTION)
   ───────────────────────────────────────────────────────────── */
function Scene01_RecursiveReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  
  // Custom split text helper for GSAP targeting
  const splitText = (text: string, className: string) => (
    <span className="inline-block overflow-hidden pb-2">
      {text.split("").map((char, i) => (
        <span key={i} className={`hero-char inline-block translate-y-[120%] opacity-0 ${className}`}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      timelineRef.current = tl;
      
      gsap.set(frameRef.current, { width: 300, height: 400, opacity: 0 });
      gsap.set(contentRef.current, { opacity: 0 });
      
      // Interactive scroll indicator continuous animation
      gsap.to(".scroll-line", {
        scaleY: 1.5,
        opacity: 0.5,
        transformOrigin: "top",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Background Image Parallax
      gsap.to(".hero-bg-parallax", {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Quick Frame Expansion
      gsap.set(frameRef.current, { width: 40, height: 40, opacity: 1 });
      tl.to(frameRef.current, { 
        width: "calc(100vw - var(--container-px)*2)", 
        height: "calc(100vh - 120px)",
        duration: 0.8, 
        ease: "power3.inOut" 
      });

      tl.to(contentRef.current, { opacity: 1, duration: 0.4 }, "-=0.4");
      
      // Fast Typography Reveal
      tl.to(".hero-char", {
        y: "0%",
        opacity: 1,
        duration: 0.6,
        stagger: 0.015,
        ease: "back.out(1.2)"
      }, "-=0.2");
      
      tl.fromTo(".tagline-anim", {
        opacity: 0,
        y: 10,
        filter: "blur(4px)"
      }, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.4");
      
      // Cinematic transition: Fade out the main text and reveal the background video
      tl.to(contentRef.current, {
        opacity: 0,
        filter: "blur(10px)",
        duration: 1.5,
        ease: "power2.inOut"
      }, "+=4.25");
      
      tl.to(".hero-video-container", {
        opacity: 0.6, // Bring video up slightly so it's clearly visible but not overpowering
        duration: 1.5,
        ease: "power2.inOut"
      }, "<");
      
      tl.to(".hero-bg-parallax", {
        filter: "grayscale(0%)", // Optional: Bring color back to the video
        duration: 1.5,
        ease: "power2.inOut"
      }, "<");
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[85dvh] flex items-center justify-center overflow-hidden pt-20 bg-[var(--kagaz)]">
      
      {/* 1. The Parallax Background Video */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden hero-video-container">
        <video 
          ref={videoRef}
          src="/hero-bg.mp4" 
          autoPlay 
          muted 
          playsInline
          onEnded={() => {
            if (videoRef.current) {
              videoRef.current.play();
            }
            if (timelineRef.current) {
              timelineRef.current.restart();
            }
          }}
          className="absolute w-full h-[120%] -top-[10%] object-cover hero-bg-parallax grayscale"
        />
      </div>

      <div ref={frameRef} className="relative z-10 flex items-center justify-center">
        <div className="absolute inset-0 opacity-20">
          <RecursiveFrame activeColor={false} />
        </div>
        
        {/* 2. The Content Layer */}
        <div 
          ref={contentRef} 
          className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0"
        >
          {/* Top Ticker Space */}
          <div className="absolute top-12 left-0 right-0 flex justify-between items-center px-12 opacity-0 tagline-anim w-full">
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-[var(--dhul)] font-semibold">
              Technology Consultancy · Est. {BRAND.founded}
            </p>
            <div className="hidden md:flex gap-4 font-mono text-[9px] tracking-[0.2em] text-[var(--dhul)]">
              <span>BENGALURU</span><span>•</span>
              <span>PATNA</span><span>•</span>
              <span>CHENNAI</span>
            </div>
          </div>

          <div className="px-4 max-w-4xl mx-auto w-full flex flex-col items-center justify-center">
            <h1 className="font-display text-[clamp(2.5rem,7vw,7rem)] leading-[0.95] tracking-[-0.03em] flex flex-col items-center">
              <span className="text-[var(--syahi)] overflow-hidden block">{splitText("Ideas,", "")}</span>
              <span className="text-[var(--nila)] overflow-hidden block -mt-1">{splitText("Recursively", "")}</span>
              <span className="text-[var(--syahi)] overflow-hidden block -mt-1">{splitText("Engineered.", "")}</span>
            </h1>
          </div>
        </div>
      </div>
      
      {/* 4. Interactive Scroll Indicator */}
      <div 
        ref={scrollRef} 
        className="absolute bottom-8 left-[var(--container-px)] flex flex-col items-center gap-4 cursor-pointer group z-30 tagline-anim opacity-0"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-[var(--dhul)] group-hover:text-[var(--nila)] transition-colors duration-300">scroll</span>
        <div className="w-px h-12 bg-[var(--dhul)]/30 overflow-hidden">
          <div className="w-full h-full bg-[var(--nila)] scroll-line" />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SCENE 02: THE STATEMENT
   ───────────────────────────────────────────────────────────── */
function Scene02_Statement() {
  return (
    <section className="relative min-h-[80vh] flex items-center py-24 px-[var(--container-px)] bg-[var(--syahi)] overflow-hidden">
      {/* Full Bleed Background Video */}
      <video 
        src="/approach-bg.mp4" 
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.3]" 
      />
      
      <div className="relative z-10 max-w-5xl">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--kagaz)] opacity-70 mb-8">
          01 — The Approach
        </p>
        <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.9] tracking-[-0.02em] text-[var(--kagaz)]">
          We treat your platform as a strategic asset, not a cost centre.
        </h2>
        <p className="mt-12 text-lg text-[var(--kagaz)] opacity-80 max-w-lg leading-relaxed">
          By engineers who think in systems. A premium boutique consultancy
          delivering software engineering, AI, and cloud solutions.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SCENE 03: THE THESIS
   ───────────────────────────────────────────────────────────── */
function Scene03_Thesis() {
  return (
    <section className="section-py-lg border-t border-[var(--rekha)] bg-[var(--syahi)] text-[var(--kagaz)]">
      <div className="container-editorial py-24 sm:py-40">
        <p className="font-display text-[clamp(1.8rem,4vw,3.5rem)] leading-[1.1] tracking-[-0.01em] max-w-5xl">
          "The best technology work comes from small teams of senior people who own outcomes end to end, and who stay long enough to see their decisions through."
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SCENE 04: THE CINEMATIC PARALLAX
   ───────────────────────────────────────────────────────────── */
function Scene04_CinematicParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        yPercent: 25,
        ease: "none"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-[70vh] sm:h-[90vh] overflow-hidden relative bg-[var(--syahi)]">
      <video 
        ref={imageRef}
        src="/parallax-bg.mp4" 
        autoPlay loop muted playsInline
        className="absolute top-[-15%] left-0 w-full h-[130%] object-cover grayscale opacity-70" 
      />
      {/* Optional faint overlay to give it texture */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, var(--kagaz) 0, var(--kagaz) 1px, transparent 0, transparent 50%)', backgroundSize: '100px 100px' }} />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SCENE 05: THE HORIZONTAL DRIFT
   ───────────────────────────────────────────────────────────── */
function Scene05_HorizontalDrift() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const scrollEl = scrollRef.current;
      if (!scrollEl) return;
      
      const getScrollAmount = () => -(scrollEl.scrollWidth - window.innerWidth);
      
      const tween = gsap.to(scrollEl, {
        x: getScrollAmount,
        ease: "none"
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen bg-[var(--kagaz)] border-y border-[var(--rekha)] overflow-hidden flex flex-col justify-center">
      <div className="absolute top-12 left-12 z-10">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--dhul)]">02 — Practices</p>
      </div>
      
      <div ref={scrollRef} className="flex h-full items-center pl-[var(--container-px)]">
        {services.map((service, i) => (
          <div key={service.slug} className="w-[85vw] md:w-[60vw] lg:w-[45vw] h-[60vh] flex-shrink-0 flex pr-12 lg:pr-24">
            <div className="w-full h-full flex flex-col justify-between border-l border-[var(--rekha)] pl-8">
              <div>
                <span className="font-mono text-[10px] text-[var(--dhul)]">{service.code}</span>
                <h3 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none mt-6 text-[var(--syahi)]">
                  {service.name}
                </h3>
              </div>
              
              <div className="mt-8 flex gap-8 items-end justify-between">
                <p className="text-base text-[var(--dhul)] max-w-sm leading-relaxed">
                  {service.short}
                </p>
                <div className="w-32 h-32 flex-shrink-0 overflow-hidden relative">
                  <RecursiveFrame activeColor={false} />
                  <img src={REGISTERS.R4_ABSTRACT[i]} className="absolute inset-2 object-cover w-[calc(100%-16px)] h-[calc(100%-16px)] grayscale" alt="" />
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* End padding block */}
        <div className="w-[15vw] flex-shrink-0" />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SCENE 06: THE COUNTER
   ───────────────────────────────────────────────────────────── */
function Scene06_Counter() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState({ practices: 0, core: 0, founded: 0, cities: 0 });

  useEffect(() => {
    let ctx = gsap.context(() => {
      const obj = { p: 0, c: 0, f: 0, cit: 0 };
      
      gsap.to(obj, {
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 80%",
        },
        p: 6,
        c: 5,
        f: 2026,
        cit: 9,
        duration: 2.5,
        ease: "power2.out",
        onUpdate: () => {
          setCounts({
            practices: Math.round(obj.p),
            core: Math.round(obj.c),
            founded: Math.round(obj.f),
            cities: Math.round(obj.cit),
          });
        }
      });
    }, triggerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={triggerRef} className="py-32 sm:py-48 border-b border-[var(--rekha)] bg-[var(--kagaz)]">
      <div className="container-editorial flex justify-center text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-16 md:gap-24">
          <div>
            <div className="font-display text-[clamp(4rem,8vw,8rem)] leading-none text-[var(--syahi)]">
              {counts.practices.toString().padStart(2, '0')}
            </div>
            <div className="mt-4 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--dhul)]">Practices</div>
          </div>
          <div>
            <div className="font-display text-[clamp(4rem,8vw,8rem)] leading-none text-[var(--syahi)]">
              {counts.core.toString().padStart(2, '0')}
            </div>
            <div className="mt-4 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--dhul)]">Principals</div>
          </div>
          <div>
            <div className="font-display text-[clamp(4rem,8vw,8rem)] leading-none text-[var(--syahi)]">
              {counts.founded}
            </div>
            <div className="mt-4 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--dhul)]">Founded</div>
          </div>
          <div>
            <div className="font-display text-[clamp(4rem,8vw,8rem)] leading-none text-[var(--syahi)]">
              {counts.cities.toString().padStart(2, '0')}
            </div>
            <div className="mt-4 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--dhul)]">Cities</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SCENE 07: THE CONVICTION SEQUENCE
   ───────────────────────────────────────────────────────────── */
function Scene07_ConvictionSequence() {
  return (
    <>
      {/* Statement 01: Text Only */}
      <section className="relative h-[100dvh] flex items-center bg-[var(--kagaz)] border-b border-[var(--rekha)] px-[var(--container-px)] overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <video 
            src="/mvp-bg.mp4" 
            autoPlay loop muted playsInline 
            className="w-full h-full object-cover grayscale"
          />
        </div>
        <h2 className="relative z-10 font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.9] tracking-[-0.02em] text-[var(--syahi)] max-w-5xl">
          We don't build MVP's.<br />We build <em className="text-[var(--nila)]">foundations.</em>
        </h2>
      </section>

      {/* Statement 02: 50/50 Split */}
      <section className="h-[100dvh] grid lg:grid-cols-2 border-b border-[var(--rekha)] bg-[var(--kagaz)]">
        <div className="flex items-center px-[var(--container-px)]">
          <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] leading-[0.9] tracking-[-0.02em] text-[var(--syahi)] max-w-2xl">
            Engineering as posture. Documentation as proof.
          </h2>
        </div>
        <div className="relative h-full w-full hidden lg:block p-12">
          <div className="relative w-full h-full">
            <RecursiveFrame activeColor={false} />
            <video 
              src="/posture-bg.mp4" 
              autoPlay loop muted playsInline
              className="absolute inset-3 object-cover w-[calc(100%-24px)] h-[calc(100%-24px)] grayscale" 
            />
          </div>
        </div>
      </section>

      {/* Statement 03: Cinematic Image Overlay */}
      <section className="h-[100dvh] relative flex items-center px-[var(--container-px)] bg-[var(--syahi)]">
        <video 
          src="/patna-bg.mp4" 
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover grayscale brightness-50" 
        />
        <h2 className="relative z-10 font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.9] tracking-[-0.02em] text-[var(--kagaz)] max-w-5xl">
          Designed in Patna.<br />Built for the world.
        </h2>
      </section>

      {/* Statement 04: Centered Conclusion */}
      <section className="relative h-[100dvh] flex items-center justify-center text-center overflow-hidden px-[var(--container-px)] bg-[var(--syahi)]">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <video 
            src="/statement-bg.mp4" 
            autoPlay loop muted playsInline 
            className="w-full h-full object-cover grayscale mix-blend-screen"
          />
        </div>
        <h2 className="relative z-10 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-[-0.01em] text-[var(--kagaz)] max-w-3xl">
          Fashions come and go.<br />Cost and reliability do not.
        </h2>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   SCENE 08: THE FOUNDER REVEAL
   ───────────────────────────────────────────────────────────── */
function Scene08_FounderReveal() {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".founder-photo", {
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 60%",
        },
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.inOut"
      });
      
      gsap.from(".founder-name", {
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 60%",
        },
        opacity: 0,
        y: 10,
        duration: 0.5,
        stagger: 0.15,
        delay: 0.6
      });
    }, triggerRef);
    return () => ctx.revert();
  }, []);

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
            // Editorial layout variables
            let wClass = "w-[70%] md:w-[22%]";
            if (i === 0) wClass = "w-[70%] md:w-[20%]"; // Siddhi
            if (i === 1) wClass = "w-[80%] md:w-[24%]"; // Pragalbh (Larger)
            if (i === 2) wClass = "w-[80%] md:w-[24%]"; // Arnav (Matched to Pragalbh)
            if (i === 3) wClass = "w-[70%] md:w-[20%]"; // Aditya
            if (i === 4) wClass = "w-[65%] md:w-[22%]"; // Sanskriti (Taller)

            let aspectClass = "aspect-[3/4]";
            if (i === 1) aspectClass = "aspect-[4/5]"; // Pragalbh
            if (i === 2) aspectClass = "aspect-[4/5]"; // Arnav (Matched to Pragalbh)
            if (i === 3) aspectClass = "aspect-[3/4]"; // Aditya
            if (i === 4) aspectClass = "aspect-[3/4]"; // Sanskriti

            let mtClass = "mt-0";
            if (i === 1) mtClass = "md:mt-[80px]";
            if (i === 2) mtClass = "md:mt-[20px]";
            if (i === 3) mtClass = "md:mt-[-40px]";
            if (i === 4) mtClass = "md:mt-[100px]";

            // Object position fixes for specific crops
            let objectPos = "object-center";
            if (i === 1) objectPos = "object-top"; // Don't crop Pragalbh's head
            
            // Scattered initial rotation (like photos tossed on a table)
            let rotateClass = "rotate-0";
            if (i === 0) rotateClass = "-rotate-2";
            if (i === 1) rotateClass = "rotate-1";
            if (i === 2) rotateClass = "-rotate-1";
            if (i === 3) rotateClass = "rotate-2";
            if (i === 4) rotateClass = "-rotate-2";

            return (
              <div key={member.slug} className={`flex flex-col group relative ${wClass} ${mtClass}`}>
                
                {/* The Photo Container with Polaroid aesthetic */}
                <Link to={`/team#${member.slug}`} className="block">
                  <div className={`relative ${aspectClass} mb-6 p-3 pb-8 bg-white shadow-sm border border-[var(--rekha)] ${rotateClass} transition-all duration-500 ease-out group-hover:scale-[1.05] group-hover:shadow-2xl group-hover:rotate-0 group-hover:-translate-y-3 cursor-pointer z-10`}>
                    <div 
                      className="founder-photo absolute inset-3 bottom-8 overflow-hidden bg-[var(--dhul)]" 
                      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                    >
                      <img 
                        src={member.photo} 
                        className={`w-full h-full object-cover ${objectPos} grayscale contrast-125 sepia-[0.15] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:contrast-100 group-hover:sepia-0`} 
                        alt={member.name} 
                      />
                    </div>
                  </div>
                </Link>
                
                {/* Minimal Editorial Labels */}
                <div className="founder-name text-center md:text-left md:pl-2">
                  <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--syahi)] font-bold">
                    {member.name}
                  </p>
                  <p className="font-mono text-[9px] tracking-widest uppercase text-[var(--syahi)]/60 mt-1.5">
                    {member.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Call to Action */}
        <div className="flex justify-center mt-8 pb-12">
          <Link to="/team" className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--syahi)] hover:text-black transition-colors relative group overflow-hidden pb-1">
            Discover the Team &rarr;
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black transform translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300"></span>
          </Link>
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SCENE 09: THE CITY BREATH
   ───────────────────────────────────────────────────────────── */
function Scene09_CityBreath() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        yPercent: 20,
        ease: "none"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-[100dvh] overflow-hidden relative">
      <img 
        ref={imageRef}
        src={REGISTERS.R3_CITY} 
        className="absolute top-[-15%] left-0 w-full h-[130%] object-cover contrast-125 sepia-[0.3]" 
        alt="Indian Cityscape" 
      />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SCENE 10: THE CLOSING FRAME
   ───────────────────────────────────────────────────────────── */
function Scene10_ClosingFrame() {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".closing-content", {
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 70%",
        },
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out"
      });
    }, triggerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={triggerRef} className="py-40 bg-[var(--kagaz)] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background texture from Design Bible: barely visible rotated squares */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, var(--syahi) 0, var(--syahi) 1px, transparent 0, transparent 50%)', backgroundSize: '100px 100px' }} />
      
      <div className="relative p-16 sm:p-24 max-w-3xl w-full flex items-center justify-center text-center mx-4">
        <RecursiveFrame activeColor={true} />
        
        <div className="closing-content relative z-10 flex flex-col items-center">
          <h2 className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-[0.9] tracking-[-0.02em] text-[var(--syahi)]">
            Now it's <em className="text-[var(--nila)]">your move.</em>
          </h2>
          <Link to="/contact" className="mt-12 btn-recursive bg-[var(--syahi)] text-[var(--kagaz)] hover:bg-[var(--nila)] hover:border-[var(--nila)] px-8 py-4 text-sm font-medium tracking-wide uppercase font-mono">
            Start a convo →
          </Link>
        </div>
      </div>
      
      {/* The Echo */}
      <div className="mt-32 w-full px-[var(--container-px)]">
        <p className="font-display text-sm text-[var(--dhul)]">Engineering ideas.</p>
      </div>
    </section>
  );
}
