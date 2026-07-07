import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight, Shield, Users, Award, Globe } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
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

/* Editorial photo for light mode hero */
const LIGHT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80";

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

      {/* ═══════════════════════════════════════════════════════
          HERO
         ═══════════════════════════════════════════════════════ */}
      {isLight ? <HeroLight /> : <HeroDark />}

      {/* ═══════════════════════════════════════════════════════
          STAT BAND / MARQUEE
         ═══════════════════════════════════════════════════════ */}
      {isLight ? <StatBand /> : <Marquee />}

      {/* ═══════════════════════════════════════════════════════
          ABOUT PREVIEW
         ═══════════════════════════════════════════════════════ */}
      {isLight ? <AboutLight /> : <AboutDark />}

      {/* ═══════════════════════════════════════════════════════
          SERVICES
         ═══════════════════════════════════════════════════════ */}
      {isLight ? <ServicesLight /> : <ServicesDark />}

      {/* ═══════════════════════════════════════════════════════
          WHY CHOOSE
         ═══════════════════════════════════════════════════════ */}
      <StrengthsSection isLight={isLight} />

      {/* ═══════════════════════════════════════════════════════
          TEAM PREVIEW
         ═══════════════════════════════════════════════════════ */}
      {isLight ? <TeamLight /> : <TeamDark />}

      {/* ═══════════════════════════════════════════════════════
          FINAL CTA
         ═══════════════════════════════════════════════════════ */}
      {isLight ? <CtaLight /> : <CtaDark />}
    </div>
  );
}

/* ─── LIGHT HERO: Editorial split layout ────────────────────── */
function HeroLight() {
  return (
    <section className="relative min-h-[90dvh] flex items-end pb-16 pt-24 sm:items-center sm:pb-0 sm:pt-0">
      <div className="container-editorial">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-center">
          {/* Text column */}
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-eyebrow"
            >
              {BRAND.shortName} · Technology Consultancy · India
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 font-display text-[clamp(3.5rem,11vw,8rem)] leading-[0.88] tracking-tighter text-foreground"
            >
              Engineering
              <br />
              <span className="italic text-primary">ideas.</span>
              <br />
              Building
              <br />
              tomorrow.
            </motion.h1>

            {/* Editorial horizontal rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 editorial-rule w-24 origin-left"
            />

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground"
            >
              A premium boutique consultancy delivering software engineering,
              AI, cloud solutions, and product design for organisations
              that treat their platforms as strategic assets.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-3 rounded-full btn-warm px-7 py-4 sm:py-3.5 text-sm transition-all hover:scale-[1.02] active:scale-[0.98] touch-target shadow-theme-lg"
              >
                Start a conversation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/projects"
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-foreground/15 px-7 py-4 sm:py-3.5 text-sm hover:border-foreground/40 hover:bg-foreground/5 touch-target transition-all"
              >
                View our work
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>

            {/* Trust line — not icons, just confident text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12 text-xs tracking-wide text-muted-foreground/70"
            >
              Enterprise-grade delivery · Senior-led engagements · Engineering-first culture
            </motion.p>
          </div>

          {/* Photo column — editorial crop, breaks the grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-theme-xl photo-warm">
              <img
                src={LIGHT_HERO_IMAGE}
                alt="Team of Indian engineers collaborating in a modern workspace"
                className="h-full w-full object-cover"
                fetchPriority="high"
              />
            </div>
            {/* Floating accent element */}
            <div className="absolute -bottom-6 -left-6 z-10 rounded-xl bg-card border border-border/50 px-5 py-4 shadow-theme-lg">
              <p className="font-mono text-xs text-warm">Est. {BRAND.founded}</p>
              <p className="mt-1 font-display text-lg">Patna, India</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── DARK HERO: Cinematic skyline (unchanged) ──────────────── */
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

/* ─── STAT BAND (light) ─────────────────────────────────────── */
function StatBand() {
  return (
    <section className="border-y border-border/50 py-10 sm:py-14" aria-label="Key facts">
      <div className="container-editorial">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="text-center sm:text-left">
                <p className="font-display text-4xl sm:text-5xl tracking-tight text-foreground">{s.value}</p>
                <p className="mt-2 text-xs tracking-widest uppercase text-muted-foreground/70">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── MARQUEE (dark — unchanged) ────────────────────────────── */
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

/* ─── ABOUT PREVIEW (light) — Editorial spread ──────────────── */
function AboutLight() {
  return (
    <section className="container-editorial section-py-lg">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 items-center">
        {/* Photo — takes more space, editorial crop */}
        <Reveal className="lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-theme-lg photo-warm">
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80"
              alt="Modern collaborative workspace in India"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </Reveal>

        {/* Text column */}
        <div className="lg:col-span-6 lg:pl-4">
          <p className="text-eyebrow">About</p>
          <h2 className="mt-6 font-display fluid-h2">
            A consultancy,<br />sized for&nbsp;depth.
          </h2>

          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <Reveal>
              <p>
                {BRAND.shortName} was founded on a simple premise — that the best technology work
                comes from small teams of senior people who own outcomes end to end.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              {/* Pull quote */}
              <blockquote className="border-l-3 border-warm pl-5 font-display text-xl italic text-foreground my-6">
                "We stay long enough to see our decisions through."
              </blockquote>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                We partner with founders, functional leaders, and enterprise teams on the
                systems that carry real weight.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 text-foreground font-medium hover:text-warm transition touch-target"
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

/* ─── ABOUT PREVIEW (dark — unchanged) ──────────────────────── */
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

/* ─── SERVICES (light) — Staggered editorial cards ──────────── */
function ServicesLight() {
  const featured = services[0];
  const secondary = services.slice(1, 3);
  const rest = services.slice(3);

  return (
    <section className="light-section-warm border-y border-border/30">
      <div className="container-editorial section-py">
        <div className="flex flex-col items-start justify-between gap-4 sm:gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-eyebrow">Practices</p>
            <h2 className="mt-6 font-display fluid-h2">What we do.</h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition touch-target"
          >
            All services <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Featured service — full width card */}
        <Reveal>
          <Link
            to="/services"
            hash={featured.slug}
            className="group mt-12 block relative overflow-hidden rounded-2xl light-card p-8 sm:p-12 lg:p-16"
          >
            <span className="display-number absolute right-8 top-4 pointer-events-none select-none">{featured.code}</span>
            <div className="relative max-w-2xl">
              <p className="font-mono text-xs text-warm">{featured.code}</p>
              <h3 className="mt-4 font-display fluid-h2 group-hover:text-primary transition-colors">{featured.name}</h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{featured.short}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-warm transition">
                Explore <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Two-column offset */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {secondary.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.1}>
              <Link
                to="/services"
                hash={s.slug}
                className={`group block relative overflow-hidden rounded-2xl light-card p-8 sm:p-10 ${i === 1 ? 'md:mt-12' : ''}`}
              >
                <span className="display-number absolute right-6 top-2 pointer-events-none select-none">{s.code}</span>
                <div className="relative">
                  <p className="font-mono text-xs text-warm">{s.code}</p>
                  <h3 className="mt-4 font-display fluid-h3 group-hover:text-primary transition-colors">{s.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm text-foreground group-hover:text-warm transition">
                    Explore <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Three-column bottom row */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08}>
              <Link
                to="/services"
                hash={s.slug}
                className="group block relative overflow-hidden rounded-2xl light-card p-7 sm:p-8 h-full"
              >
                <p className="font-mono text-xs text-warm">{s.code}</p>
                <h3 className="mt-4 font-display fluid-h4 group-hover:text-primary transition-colors">{s.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground group-hover:text-warm transition">
                  Explore <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICES (dark — unchanged) ───────────────────────────── */
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
                <p className="mt-3 sm:mt-4 text-sm leading-relaxed text-muted-foreground">
                  {s.short}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-muted-foreground group-hover:text-primary transition">
                  Explore
                </span>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── STRENGTHS (shared, theme-adaptive) ────────────────────── */
function StrengthsSection({ isLight }: { isLight: boolean }) {
  return (
    <section className={`container-editorial section-py-lg ${isLight ? '' : ''}`}>
      <div className="grid gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-eyebrow">{isLight ? 'Why us' : `03 — Why ${BRAND.name}`}</p>
          <h2 className="mt-4 sm:mt-6 font-display fluid-h2">
            Chosen for the work that <span className="italic">has to be right.</span>
          </h2>
        </div>
        <div className={`lg:col-span-7 ${isLight ? 'space-y-0' : 'grid gap-px bg-hairline md:grid-cols-2 border hairline'}`}>
          {strengths.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              {isLight ? (
                /* Light: clean editorial rows */
                <div className="flex gap-6 py-8 border-b border-border/40 last:border-0">
                  <span className="font-display text-4xl text-warm/20 leading-none shrink-0 w-12">{s.num}</span>
                  <div>
                    <h3 className="font-display fluid-h4">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ) : (
                /* Dark: unchanged grid cards */
                <div className="bg-background p-6 sm:p-8 h-full">
                  <div className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
                    <h3 className="font-display fluid-h4">{s.title}</h3>
                  </div>
                  <p className="mt-3 sm:mt-4 text-sm text-muted-foreground leading-relaxed pl-5">
                    {s.body}
                  </p>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TEAM (light) — Magazine layout ────────────────────────── */
function TeamLight() {
  const founders = team.slice(0, 2);
  const others = team.slice(2);

  return (
    <section className="light-section-cool border-y border-border/30">
      <div className="container-editorial section-py">
        <div className="flex flex-col items-start justify-between gap-4 sm:gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-eyebrow">Leadership</p>
            <h2 className="mt-6 font-display fluid-h2">The core team.</h2>
          </div>
          <Link
            to="/team"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition touch-target"
          >
            Meet the team <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Founders — large editorial portraits */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {founders.map((m, i) => (
            <Reveal key={m.slug} delay={i * 0.12}>
              <Link to="/team/$slug" params={{ slug: m.slug }} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-theme-lg photo-warm">
                  <Portrait
                    src={m.photo}
                    alt={`${m.name}, ${m.role}`}
                    name={m.name}
                    className="h-full w-full"
                    imageClassName="transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <p className="font-display text-2xl sm:text-3xl text-white drop-shadow-lg">{m.name}</p>
                    <p className="mt-1 text-sm text-white/80">{m.role} · {m.title}</p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Other team — offset smaller portraits */}
        <div className="mt-8 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-3">
          {others.map((m, i) => (
            <Reveal key={m.slug} delay={0.15 + i * 0.08}>
              <Link to="/team/$slug" params={{ slug: m.slug }} className={`group block ${i === 1 ? 'sm:mt-8' : ''}`}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-theme-md photo-warm">
                  <Portrait
                    src={m.photo}
                    alt={`${m.name}, ${m.role}`}
                    name={m.name}
                    className="h-full w-full"
                    imageClassName="transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
                <p className="mt-4 font-display text-lg leading-tight">{m.name}</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{m.title}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TEAM (dark — unchanged) ───────────────────────────────── */
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
            <Link
              to="/team/$slug"
              params={{ slug: m.slug }}
              className="group block"
            >
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
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground mt-1">
                {m.title}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── CTA (light) — Full-width warm band ────────────────────── */
function CtaLight() {
  return (
    <section className="mt-8 sm:mt-16">
      <div className="bg-gradient-to-br from-primary via-primary to-warm py-20 sm:py-28 lg:py-32">
        <div className="container-editorial text-center">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-primary-foreground/60">Let's talk</p>
            <h2 className="mt-6 font-display fluid-h1 text-primary-foreground max-w-4xl mx-auto">
              Have a problem worth <span className="italic">engineering?</span>
            </h2>
            <p className="mt-6 max-w-xl mx-auto text-base text-primary-foreground/75 leading-relaxed">
              We take on a small number of engagements each quarter. If your work has the
              weight to deserve senior attention, we would like to hear from you.
            </p>
            <Link
              to="/contact"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-medium text-primary hover:bg-primary-foreground transition-all hover:scale-[1.02] active:scale-[0.98] touch-target shadow-xl"
            >
              Start a conversation <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA (dark — unchanged) ────────────────────────────────── */
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
