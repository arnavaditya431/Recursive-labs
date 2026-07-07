import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight, Shield, Users, Award, Globe } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import { Reveal, SplitWords } from "@/components/site/reveal";
import { DataWave } from "@/components/site/data-wave";
import { Portrait } from "@/components/site/portrait";
import { StructuredData } from "@/components/site/structured-data";
import { BRAND, PRACTICES } from "@/lib/brand";
import { defaultMeta, breadcrumbSchema } from "@/lib/seo";
import { services } from "@/lib/services";
import { team } from "@/lib/team";
import { useTheme } from "@/components/site/theme-provider";

export const Route = createFileRoute("/")(
  {
    head: () => defaultMeta(),
    component: HomePage,
  }
);

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=80";

const trustIndicators = [
  { icon: Shield, label: "Enterprise-grade delivery" },
  { icon: Users, label: "Senior-led engagements" },
  { icon: Award, label: "Engineering-first culture" },
  { icon: Globe, label: "Global client footprint" },
];

const strengths = [
  {
    num: "01",
    title: "Senior by default",
    body: "Every engagement is led by principals who own outcomes, not decks. No layers between you and the people doing the work.",
  },
  {
    num: "02",
    title: "Engineering as posture",
    body: "We treat delivery as a craft discipline. Test coverage, observability, and honest documentation are the floor, not the ceiling.",
  },
  {
    num: "03",
    title: "Small on purpose",
    body: "We stay deliberately small so we can be selective. Fewer clients, deeper relationships, better work.",
  },
  {
    num: "04",
    title: "Long time horizons",
    body: "We build for the systems you will still be operating in five years. Fashions come and go. Cost and reliability do not.",
  },
];

const stats = [
  { value: "6", label: "Practices" },
  { value: "5", label: "Core Team" },
  { value: "2026", label: "Founded" },
  { value: "India", label: "Headquartered" },
];

/* Service editorial images */
const SERVICE_IMAGES = [
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
];

function HomePage() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div className="overflow-hidden">
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
        ])}
      />

      {/* ═══ HERO ═══ */}
      {isLight ? <HeroLight /> : <HeroDark />}

      {/* ═══ MARQUEE / TENSION BREAK ═══ */}
      {isLight ? <TensionBreak /> : <Marquee />}

      {/* ═══ ABOUT / ORIGIN ═══ */}
      {isLight ? <OriginLight /> : <AboutDark />}

      {/* ═══ SERVICES ═══ */}
      {isLight ? <ServicesAccordionLight /> : <ServicesDark />}

      {/* ═══ PHILOSOPHY / MANIFESTO ═══ */}
      {isLight ? <ManifestoLight /> : <StrengthsDark />}

      {/* ═══ PEOPLE ═══ */}
      {isLight ? <PeopleStripLight /> : <TeamDark />}

      {/* ═══ CTA / CONVERSATION ═══ */}
      {isLight ? <ConversationLight /> : <CtaDark />}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   THEME 2 HERO — Typographic architecture, no photograph.
   The brand is the message.
   ───────────────────────────────────────────────────────────── */
function HeroLight() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-background">
      {/* Thin vertical rule — right side architectural accent */}
      <div className="rl-vline" aria-hidden="true" />

      {/* Electric accent dot */}
      <motion.div
        className="absolute right-[10%] top-1/2 -translate-y-1/2 -translate-x-1/2 hidden lg:block z-20"
        aria-hidden="true"
      >
        <div className="h-2 w-2 rounded-full bg-[var(--rl-electric)] rl-pulse-dot" />
      </motion.div>

      {/* Right Side Video Placeholder */}
      <motion.div
        initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
        animate={{ opacity: 1, clipPath: 'inset(0 0 0 0)' }}
        transition={{ delay: 0.8, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block border-l border-border/30 z-0 bg-muted/10 overflow-hidden"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover grayscale opacity-50 mix-blend-multiply dark:mix-blend-screen scale-105"
          src="https://cdn.coverr.co/videos/coverr-abstract-blue-and-purple-waves-2641/1080p.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background border-l border-transparent" />
      </motion.div>

      <div className="container-editorial relative z-10">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-muted-foreground"
        >
          Technology Consultancy · Est. {BRAND.founded} · India
        </motion.p>

        {/* Main statement — architectural typographic reveal */}
        <div className="mt-6 sm:mt-8 overflow-hidden">
          <motion.h1
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(3.5rem,13vw,13rem)] leading-[0.82] tracking-[-0.04em] text-foreground"
          >
            Built for
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.38, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-display italic text-[clamp(3.5rem,13vw,13rem)] leading-[0.82] tracking-[-0.04em] text-[var(--rl-electric)]">
              tomorrow.
            </span>
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 sm:mt-14 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed"
        >
          By engineers who think in systems. A premium boutique consultancy
          delivering software engineering, AI, and cloud solutions for organisations
          that treat their platforms as strategic assets.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05 }}
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-4 items-start"
        >
          <Link to="/contact" className="rl-btn-primary touch-target">
            Start a conversation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to="/services" className="rl-btn-ghost touch-target">
            See what we do
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Mini stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-16 sm:mt-24 flex flex-wrap gap-10 sm:gap-16"
        >
          {[
            { num: "06", label: "Practices" },
            { num: "05", label: "Team Members" },
            { num: "2026", label: "Founded" },
            { num: "IN", label: "India" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display text-2xl sm:text-3xl tracking-tight text-foreground">{s.num}</p>
              <p className="mt-1 font-mono text-[9px] tracking-[0.28em] uppercase text-muted-foreground/70">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator — thin vertical line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-[var(--container-px)] flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground/40">scroll</span>
        <motion.div
          animate={{ scaleY: [0, 1, 1, 0], y: [0, 0, 10, 10] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", times: [0, 0.3, 0.7, 1] }}
          className="w-px h-10 bg-[var(--rl-electric)]/40 origin-top"
        />
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   DARK HERO: Cinematic skyline (unchanged)
   ───────────────────────────────────────────────────────────── */
function HeroDark() {
  return (
    <section className="relative min-h-[100dvh] md:min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-5rem)]">
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Modern corporate skyline representing enterprise technology infrastructure"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>
      <div className="relative container-editorial flex min-h-[100dvh] flex-col justify-end pb-12 pt-24 sm:justify-center md:min-h-[calc(100vh-4rem)] md:py-16 lg:min-h-[calc(100vh-5rem)]">
        <div className="flex w-full max-w-5xl flex-col items-start justify-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-eyebrow"
          >
            {BRAND.name} · Est. {BRAND.founded} · Technology Consultancy
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 sm:mt-8 font-display font-bold text-[clamp(4rem,14vw,9.5rem)] leading-[0.82] tracking-tighter uppercase text-foreground drop-shadow-xl"
          >
            Recursive
            <br />
            Lab
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 sm:mt-8 font-display italic text-2xl sm:text-3xl lg:text-4xl text-primary/90"
          >
            Engineering ideas. Building tomorrow.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-6 sm:mt-8 max-w-2xl fluid-body-lg text-muted-foreground/90"
          >
            {BRAND.shortName} is a premium boutique consultancy delivering software engineering,
            artificial intelligence, cloud solutions, and product design for organisations
            that treat their platforms as strategic assets.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 sm:mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-foreground px-6 py-4 sm:py-3.5 text-sm text-background transition hover:bg-primary hover:text-primary-foreground touch-target shadow-lg shadow-foreground/10"
            >
              Start a conversation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/services"
              className="group inline-flex items-center justify-center gap-3 rounded-full border hairline bg-background/5 backdrop-blur-sm px-6 py-4 sm:py-3.5 text-sm hover:border-foreground/60 hover:bg-background/20 touch-target"
            >
              See what we do
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-10 sm:mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6"
          >
            {trustIndicators.map((item) => (
              <div key={item.label} className="flex items-start gap-2.5">
                <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary drop-shadow-md" aria-hidden="true" />
                <span className="text-xs sm:text-sm leading-snug text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   THEME 2 TENSION BREAK — Mono marquee, minimal, fast
   ───────────────────────────────────────────────────────────── */
function TensionBreak() {
  return (
    <section
      className="border-y border-border/30 py-5 sm:py-6 overflow-hidden"
      aria-label="Practice areas"
    >
      <div className="marquee flex whitespace-nowrap gap-0 font-mono text-[11px] sm:text-xs tracking-[0.18em] uppercase text-muted-foreground/55">
        {Array.from({ length: 2 }).map((_, r) => (
          <div key={r} className="flex gap-0">
            {PRACTICES.map((t) => (
              <span key={t} className="flex items-center">
                {t}
                <span className="text-[var(--rl-electric)] mx-8 sm:mx-12 opacity-70" aria-hidden="true">/</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── DARK MARQUEE (unchanged) ─────────────────────────────── */
function Marquee() {
  return (
    <section className="border-y hairline py-4 sm:py-6 overflow-hidden" aria-label="Practice areas">
      <div className="marquee flex whitespace-nowrap gap-8 sm:gap-16 font-display text-lg sm:text-2xl text-muted-foreground">
        {Array.from({ length: 2 }).map((_, r) => (
          <div key={r} className="flex gap-8 sm:gap-16">
            {PRACTICES.map((t) => (
              <span key={t} className="flex items-center gap-8 sm:gap-16">
                {t}
                <span className="text-primary" aria-hidden="true">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   THEME 2 ORIGIN — Editorial photo + pull quote
   ───────────────────────────────────────────────────────────── */
function OriginLight() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const photo1Y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const photo2Y = useTransform(scrollYProgress, [0, 1], ["-3%", "8%"]);

  return (
    <section ref={sectionRef} className="section-py-lg overflow-hidden">
      <div className="container-editorial">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-24 items-start">
          {/* Photography cluster */}
          <div className="lg:col-span-5 relative pb-16 lg:pb-0">
            <Reveal>
              <motion.div
                style={{ y: photo1Y }}
                className="relative aspect-[4/5] overflow-hidden shadow-dramatic rl-photo-electric"
              >
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                  alt="Indian engineers collaborating"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            </Reveal>
            {/* Second photo — offset, rotated */}
            <Reveal delay={0.15}>
              <motion.div
                style={{ y: photo2Y }}
                className="absolute -bottom-4 -right-4 sm:-right-8 w-[52%] aspect-[3/4] overflow-hidden shadow-theme-xl border-4 border-background z-10 -rotate-2"
              >
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
                  alt="Design sprint"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            </Reveal>
          </div>

          {/* Text column */}
          <div className="lg:col-span-7 lg:pt-4">
            <Reveal>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--rl-electric)]">
                01 — About
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-[clamp(2rem,5.5vw,5rem)] leading-[0.9] tracking-[-0.02em]">
                A consultancy,<br />
                <em>sized for depth.</em>
              </h2>
            </Reveal>

            {/* Pull quote */}
            <Reveal delay={0.14}>
              <blockquote className="mt-10 sm:mt-12 border-l-2 border-[var(--rl-electric)] pl-6 sm:pl-8">
                <p className="font-display italic text-xl sm:text-2xl lg:text-3xl text-foreground/80 leading-[1.25]">
                  "We stay long enough to see our decisions through."
                </p>
              </blockquote>
            </Reveal>

            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground max-w-lg">
              <Reveal delay={0.20}>
                <p>
                  {BRAND.name} was founded on a simple premise — that the best technology work
                  comes from small teams of senior people who own outcomes end to end.
                </p>
              </Reveal>
              <Reveal delay={0.26}>
                <p>
                  We partner with founders, functional leaders, and enterprise teams on the
                  systems that carry real weight. Our engagements are measured in quarters, not weeks.
                </p>
              </Reveal>
            </div>

            {/* Stats */}
            <Reveal delay={0.32}>
              <div className="mt-10 flex flex-wrap gap-8 sm:gap-12">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-3xl sm:text-4xl tracking-tight text-foreground">{s.value}</p>
                    <p className="mt-1 font-mono text-[9px] tracking-[0.25em] uppercase text-muted-foreground/70">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.38}>
              <Link to="/about" className="mt-10 rl-btn-text inline-flex items-center gap-2 text-sm">
                Read our story <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── DARK ABOUT (unchanged) ────────────────────────────────── */
function AboutDark() {
  return (
    <section className="container-editorial section-py-lg">
      <div className="grid gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-eyebrow">01 — About</p>
          <h2 className="mt-4 sm:mt-6 font-display fluid-h2">
            A consultancy, sized&nbsp;for depth.
          </h2>
        </div>
        <div className="lg:col-span-7 lg:col-start-6 space-y-5 sm:space-y-6 fluid-body-lg text-muted-foreground">
          <Reveal>
            <p>
              {BRAND.name} was founded on a simple premise. That the best technology work
              comes from small teams of senior people who own outcomes end to end, and who
              stay long enough to see their decisions through.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              We partner with founders, functional leaders, and enterprise teams on the
              systems that carry real weight. Our engagements tend to be measured in
              quarters, not weeks, and we structure them so that our clients emerge with
              capability, not just deliverables.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              to="/about"
              className="mt-4 inline-flex items-center gap-2 text-foreground hover:text-primary transition touch-target"
            >
              Read our story
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   THEME 2 SERVICES — Accordion with photo reveal on hover
   ───────────────────────────────────────────────────────────── */
function ServicesAccordionLight() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="rl-section-breath border-y border-border/30">
      <div className="container-editorial section-py">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:gap-6 sm:flex-row sm:items-end mb-14 sm:mb-20">
          <Reveal>
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--rl-electric)]">02 — Practices</p>
              <h2 className="mt-6 font-display text-[clamp(2rem,5.5vw,5rem)] leading-[0.9] tracking-[-0.02em]">
                What we do.
              </h2>
            </div>
          </Reveal>
          <Link to="/services" className="rl-btn-text text-sm shrink-0">
            All services <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Accordion rows */}
        <div role="list">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.04}>
              <Link
                to="/services"
                hash={service.slug}
                role="listitem"
                className="group block border-t border-border/25 last:border-b last:border-border/25 cursor-pointer rl-service-row transition-colors duration-300"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 py-7 sm:py-9 lg:items-center">
                  {/* Code + Name */}
                  <div className="lg:col-span-9 flex items-start gap-5 sm:gap-8">
                    <span className="font-mono text-[10px] text-muted-foreground/40 pt-2 sm:pt-3 shrink-0 w-7">
                      {service.code}
                    </span>
                    <div className="flex-1">
                      <h3
                        className="font-display text-[clamp(1.6rem,3.5vw,3.2rem)] leading-[1.05] tracking-tight text-foreground transition-colors duration-500"
                        style={{ color: hovered === i ? 'var(--rl-electric)' : undefined }}
                      >
                        {service.name}
                      </h3>
                      <AnimatePresence>
                        {hovered === i && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden text-sm text-muted-foreground leading-relaxed max-w-xl mt-3"
                          >
                            {service.short}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Right: image + arrow */}
                  <div className="hidden lg:flex lg:col-span-3 items-center justify-end gap-6">
                    <AnimatePresence>
                      {hovered === i && (
                        <motion.div
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: 144, opacity: 1 }}
                          exit={{ width: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="rl-accordion-img h-20 overflow-hidden flex-shrink-0"
                        >
                          <img
                            src={SERVICE_IMAGES[i] ?? SERVICE_IMAGES[0]}
                            alt=""
                            aria-hidden="true"
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <ArrowUpRight
                      className="h-5 w-5 flex-shrink-0 transition-all duration-500"
                      style={{
                        color: hovered === i ? 'var(--rl-electric)' : 'var(--color-muted-foreground)',
                        transform: hovered === i ? 'translate(2px,-2px)' : undefined,
                        opacity: hovered === i ? 1 : 0.4,
                      }}
                    />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── DARK SERVICES (unchanged) ─────────────────────────────── */
function ServicesDark() {
  return (
    <section className="container-editorial section-py border-t hairline">
      <div className="flex flex-col items-start justify-between gap-4 sm:gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-eyebrow">02 — Practices</p>
          <h2 className="mt-4 sm:mt-6 font-display fluid-h2">What we do.</h2>
        </div>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition touch-target"
        >
          All services <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-10 sm:mt-16 grid gap-px bg-hairline md:grid-cols-2 lg:grid-cols-3 border hairline">
        {services.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.05}>
            <Link
              to="/services"
              hash={s.slug}
              className="group relative flex h-full flex-col justify-between gap-6 sm:gap-10 bg-background p-6 sm:p-8 transition-colors hover:bg-card md:p-10 lg:min-h-[340px]"
            >
              <div>
                <p className="font-mono text-xs text-muted-foreground">{s.code}</p>
                <h3 className="mt-4 sm:mt-6 font-display fluid-h3">{s.name}</h3>
                <p className="mt-3 sm:mt-4 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-muted-foreground group-hover:text-primary transition">Explore</span>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   THEME 2 MANIFESTO — Dark section within alternate theme.
   "Chosen for the work that has to be right."
   ───────────────────────────────────────────────────────────── */
function ManifestoLight() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: 'var(--rl-char)' }}>
      <div className="container-editorial section-py-lg">
        <Reveal>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--rl-electric)]">
            03 — Philosophy
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-8 font-display text-[clamp(2rem,6.5vw,6rem)] leading-[0.9] tracking-[-0.02em] text-white/95 max-w-4xl">
            Chosen for the work that{" "}
            <em className="text-[var(--rl-electric)]">has to be right.</em>
          </h2>
        </Reveal>

        <div className="mt-16 sm:mt-24 grid gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: 'oklch(1 0 0 / 0.07)' }}>
          {strengths.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07}>
              <div
                className="group p-8 sm:p-10 h-full transition-colors duration-500 cursor-default"
                style={{ backgroundColor: 'var(--rl-char)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'oklch(0.14 0.02 245)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--rl-char)'; }}
              >
                <span
                  className="font-display text-[5rem] sm:text-[6rem] leading-none select-none block transition-colors duration-700 text-white/20 group-hover:text-[var(--rl-electric)]/40"
                >
                  {s.num}
                </span>
                <h3 className="mt-4 font-display text-xl sm:text-2xl text-white/95">{s.title}</h3>
                <p className="mt-3 text-sm text-white/75 leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Closing line */}
        <Reveal delay={0.3}>
          <div className="mt-16 sm:mt-20 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
            <p className="font-display italic text-xl sm:text-2xl text-white/50 max-w-md leading-snug">
              "We hold ourselves to a standard of work we would be proud to inherit."
            </p>
            <Link to="/about" className="shrink-0 rl-btn-ghost touch-target" style={{ borderColor: 'oklch(1 0 0 / 0.18)', color: 'oklch(0.88 0.007 90)' }}>
              Our values
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── DARK STRENGTHS (unchanged) ────────────────────────────── */
function StrengthsDark() {
  return (
    <section className="section-py-lg">
      <div className="container-editorial">
        <div className="grid gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-eyebrow">03 — Why {BRAND.name}</p>
              <h2 className="mt-4 sm:mt-6 font-display fluid-h2">
                Chosen for the work that <span className="italic">has to be right.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 grid gap-px bg-hairline md:grid-cols-2 border hairline">
            {strengths.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="bg-background p-6 sm:p-8 h-full">
                  <div className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
                    <h3 className="font-display fluid-h4">{s.title}</h3>
                  </div>
                  <p className="mt-3 sm:mt-4 text-sm text-muted-foreground leading-relaxed pl-5">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   THEME 2 PEOPLE — Portrait-first, electric hover accent
   ───────────────────────────────────────────────────────────── */
function PeopleStripLight() {
  return (
    <section className="section-py-lg overflow-hidden">
      <div className="container-editorial">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end mb-14 sm:mb-20">
          <Reveal>
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--rl-electric)]">04 — People</p>
              <h2 className="mt-6 font-display text-[clamp(2rem,5.5vw,5rem)] leading-[0.9] tracking-[-0.02em]">
                The core team.
              </h2>
            </div>
          </Reveal>
          <Link to="/team" className="rl-btn-text text-sm shrink-0">
            Meet everyone <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
          {team.map((m, i) => (
            <Reveal key={m.slug} delay={i * 0.08}>
              <Link to="/team/$slug" params={{ slug: m.slug }} className="rl-person-card group block">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Portrait
                    src={m.photo}
                    alt={`${m.name}, ${m.role}`}
                    name={m.name}
                    className="h-full w-full"
                    imageClassName="rl-img-scale grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div
                    className="rl-person-overlay absolute inset-0 transition-opacity duration-700"
                    style={{ background: `linear-gradient(to top, var(--rl-char) 0%, transparent 55%)`, opacity: 0.75 }}
                  />
                  <div
                    className="rl-person-bar absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ background: 'var(--rl-electric)' }}
                  />
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5">
                    <p className="font-display text-base sm:text-lg text-white leading-tight">{m.name}</p>
                    <p className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-white/50 mt-1 hidden sm:block">{m.title}</p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── DARK TEAM (unchanged) ─────────────────────────────────── */
function TeamDark() {
  return (
    <section className="container-editorial section-py border-t hairline">
      <div className="flex flex-col items-start justify-between gap-4 sm:gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-eyebrow">04 — Leadership</p>
          <h2 className="mt-4 sm:mt-6 font-display fluid-h2">The core team.</h2>
        </div>
        <Link
          to="/team"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition touch-target"
        >
          Meet the team <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-10 sm:mt-16 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
        {team.map((m, i) => (
          <Reveal key={m.slug} delay={i * 0.08}>
            <Link to="/team/$slug" params={{ slug: m.slug }} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden border hairline">
                <Portrait
                  src={m.photo}
                  alt={`${m.name}, ${m.role}`}
                  name={m.name}
                  grayscale
                  className="h-full w-full"
                  imageClassName="transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
              <p className="mt-3 sm:mt-4 font-display text-base sm:text-lg leading-tight">{m.name}</p>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground mt-1">{m.title}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   THEME 2 CTA — "Now it's your move." Typographic, left-aligned.
   The most confident moment on the page.
   ───────────────────────────────────────────────────────────── */
function ConversationLight() {
  return (
    <section className="rl-section-breath border-t border-border/30">
      <div className="container-editorial section-py-lg">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <Reveal>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--rl-electric)]">
                05 — Let's talk
              </p>
            </Reveal>

            <div className="mt-8 overflow-hidden">
              <Reveal delay={0.08}>
                <h2 className="font-display text-[clamp(3rem,8vw,11rem)] lg:text-[clamp(3rem,6vw,8rem)] xl:text-[9rem] leading-[0.82] tracking-[-0.04em] text-foreground">
                  Now it's
                </h2>
              </Reveal>
            </div>
            <div className="overflow-hidden">
              <Reveal delay={0.16}>
                <h2 className="font-display italic text-[clamp(3rem,8vw,11rem)] lg:text-[clamp(3rem,6vw,8rem)] xl:text-[9rem] leading-[0.82] tracking-[-0.04em] text-[var(--rl-electric)]">
                  your move.
                </h2>
              </Reveal>
            </div>

            <Reveal delay={0.28}>
              <p className="mt-12 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
                We take on a small number of engagements each quarter. If your work has the
                weight to deserve senior attention, we would like to hear from you.
              </p>
            </Reveal>

            <Reveal delay={0.38}>
              <div className="mt-12 flex flex-col sm:flex-row items-start gap-5 sm:gap-8">
                <Link to="/contact" className="rl-btn-primary touch-target">
                  Start a conversation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="rl-btn-text inline-flex items-center gap-2 text-sm"
                >
                  {BRAND.email}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.4} className="hidden lg:block h-full min-h-[500px]">
            <div className="relative h-full w-full overflow-hidden border border-border/30 bg-muted/10">
              <video 
                autoPlay loop muted playsInline
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 mix-blend-multiply dark:mix-blend-screen scale-105"
                src="https://cdn.coverr.co/videos/coverr-abstract-blue-and-purple-waves-2641/1080p.mp4"
              />
              <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px]" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── DARK CTA (unchanged) ──────────────────────────────────── */
function CtaDark() {
  return (
    <section className="container-editorial section-py-lg">
      <div className="relative overflow-hidden rounded-lg border hairline p-6 sm:p-10 md:p-16 lg:p-20">
        <div className="absolute -right-16 -top-16 sm:-right-32 sm:-top-32 h-48 w-48 sm:h-96 sm:w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 sm:-bottom-24 sm:-left-24 h-36 w-36 sm:h-72 sm:w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative">
          <p className="text-eyebrow">05 — Let's talk</p>
          <h2 className="mt-4 sm:mt-6 font-display fluid-h2 max-w-4xl">
            Have a problem worth <span className="italic">engineering?</span>
          </h2>
          <p className="mt-5 sm:mt-8 max-w-2xl fluid-body-lg text-muted-foreground">
            We take on a small number of engagements each quarter. If your work has the
            weight to deserve senior attention, we would like to hear from you.
          </p>
          <Link
            to="/contact"
            className="mt-8 sm:mt-10 inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3.5 sm:py-3 text-sm text-background hover:bg-primary hover:text-primary-foreground transition touch-target"
          >
            Start a conversation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
