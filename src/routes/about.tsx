import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/reveal";
import { StructuredData } from "@/components/site/structured-data";
import { BRAND } from "@/lib/brand";
import { breadcrumbSchema, defaultMeta } from "@/lib/seo";
import { useTheme } from "@/components/site/theme-provider";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () =>
    defaultMeta({
      title: "About",
      description:
        "The story, vision, and values of RECURSIVE LAB — a premium boutique technology consultancy engineering long-term systems for ambitious organisations.",
      path: "/about",
    }),
  component: AboutPage,
});

const values = [
  { k: "Craft", v: "We hold ourselves to a standard of work we would be proud to inherit." },
  { k: "Candour", v: "We tell clients what we actually think, especially when it is inconvenient." },
  { k: "Ownership", v: "We take responsibility for outcomes, not just deliverables." },
  { k: "Restraint", v: "We know what to leave out. Simplicity is a discipline, not a style." },
  { k: "Longevity", v: "We design for the systems still running five years from now." },
  { k: "People", v: "We treat every collaborator, client, and teammate with seriousness and care." },
];

const timeline = [
  {
    year: "2026",
    title: "Founded",
    body: "Recursive Lab is officially founded by a team of engineers, designers and strategists with the vision of building modern software and digital products.",
  },
  {
    year: "2026",
    title: "First Engagements",
    body: "The founding team begins delivering technology consulting, software engineering and product design services to early clients.",
  },
  {
    year: "2026",
    title: "Growth",
    body: "Expansion into AI consulting, cloud engineering, automation and digital transformation services while growing a distributed team across India.",
  },
  {
    year: "2026",
    title: "Today",
    body: "Recursive Lab operates as a modern technology consultancy focused on software engineering, AI, cloud solutions and product innovation.",
  },
];

function AboutPage() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      {/* Hero */}
      {isLight ? <AboutHeroLight /> : <AboutHeroDark />}

      {/* Core Values */}
      {isLight ? <ValuesLight /> : <ValuesDark />}

      {/* Timeline */}
      {isLight ? <TimelineLight /> : <TimelineDark />}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   THEME 2 ABOUT HERO — Pure typographic, large stats, staggered
   ───────────────────────────────────────────────────────────── */
function AboutHeroLight() {
  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden relative">
      <div className="rl-vline" aria-hidden="true" />
      <div className="container-editorial">
        <Reveal>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--rl-electric)]">
            About {BRAND.shortName}
          </p>
        </Reveal>

        <div className="mt-8 overflow-hidden">
          <Reveal delay={0.08}>
            <h1 className="font-display text-[clamp(2.5rem,8vw,7.5rem)] leading-[0.85] tracking-[-0.03em] max-w-6xl">
              Small teams.{" "}
              <span className="italic text-[var(--rl-electric)]">Serious work.</span>
              <br />
              Long horizons.
            </h1>
          </Reveal>
        </div>

        <div className="mt-16 sm:mt-24 grid gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5">
            <Reveal delay={0.16}>
              <div className="space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
                <p>
                  We founded {BRAND.shortName} to do the kind of consulting we always
                  wanted to be on the receiving end of. Senior people, unambiguous
                  ownership, and a bias for shipping software that stands the test of time.
                </p>
                <p>
                  What began as independent engagements between friends became a firm the
                  moment we realised we kept being asked to lead the work end to end.
                </p>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="grid gap-12 sm:grid-cols-2">
              <Reveal delay={0.24}>
                <div>
                  <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-foreground/50">Vision</p>
                  <p className="mt-4 font-display text-2xl sm:text-3xl leading-snug text-foreground">
                    To be the technology partner that ambitious organisations trust with the systems they cannot afford to get wrong.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.32}>
                <div>
                  <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-foreground/50">Mission</p>
                  <p className="mt-4 font-display text-2xl sm:text-3xl leading-snug text-foreground">
                    To design, build, and operate durable digital systems. To do it with restraint. And to leave our clients more capable.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   THEME 2 VALUES — Diagonal architectural grid
   ───────────────────────────────────────────────────────────── */
function ValuesLight() {
  return (
    <section className="rl-section-char py-24 sm:py-32 border-y border-white/5">
      <div className="container-editorial">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <Reveal>
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--rl-electric)]">Core values</p>
              <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.9] tracking-[-0.02em]">
                What we hold<br />ourselves to.
              </h2>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'oklch(1 0 0 / 0.05)' }}>
          {values.map((v, i) => (
            <Reveal key={v.k} delay={i * 0.08}>
              <div 
                className="group p-8 sm:p-12 h-full transition-colors duration-500 bg-[var(--rl-char)] hover:bg-[oklch(0.14_0.02_245)]"
              >
                <span className="font-mono text-xs text-[var(--rl-electric)]">0{i + 1}</span>
                <h3 className="mt-6 font-display text-3xl sm:text-4xl text-white/90">{v.k}</h3>
                <p className="mt-4 text-sm text-white/50 leading-relaxed">{v.v}</p>
                
                {/* Diagonal accent line on hover */}
                <div className="mt-10 overflow-hidden h-px w-full bg-white/5 relative">
                  <div className="absolute inset-0 bg-[var(--rl-electric)] -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   THEME 2 TIMELINE — Horizontal/Vertical architectural flow
   ───────────────────────────────────────────────────────────── */
function TimelineLight() {
  return (
    <section className="py-24 sm:py-32 rl-section-breath">
      <div className="container-editorial">
        <Reveal>
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--rl-electric)]">Timeline</p>
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.9] tracking-[-0.02em]">
            Milestones.
          </h2>
        </Reveal>

        <div className="mt-16 sm:mt-24 border-l border-foreground/10 ml-2 sm:ml-0 pl-6 sm:pl-0 sm:border-l-0">
          <div className="space-y-12 sm:space-y-0 sm:grid sm:grid-cols-4 sm:gap-8">
            {timeline.map((t, i) => (
              <Reveal key={`${t.year}-${t.title}`} delay={i * 0.1}>
                <div className="relative">
                  {/* Desktop horizontal line connector */}
                  <div className="hidden sm:block absolute top-2 left-0 w-full h-px bg-foreground/10" />
                  {/* Node marker */}
                  <div className="absolute -left-[1.95rem] sm:left-0 top-1.5 sm:-top-1 h-2 w-2 rounded-full bg-[var(--rl-electric)] ring-4 ring-background" />
                  
                  <div className="sm:pt-8">
                    <p className="font-mono text-xs text-[var(--rl-electric)]">{t.year}</p>
                    <h3 className="mt-3 font-display text-2xl sm:text-3xl text-foreground">{t.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


/* ============================================================
   DARK THEME COMPONENTS (PRESERVED)
   ============================================================ */

function AboutHeroDark() {
  return (
    <>
      <section className="container-editorial pt-16 sm:pt-24 pb-16 sm:pb-20">
        <p className="text-eyebrow">About {BRAND.shortName}</p>
        <h1 className="mt-6 sm:mt-8 font-display fluid-h1 max-w-5xl">
          Small teams. <span className="italic text-primary/90">Serious work.</span> Long horizons.
        </h1>
        <p className="mt-6 sm:mt-10 max-w-2xl fluid-body-lg text-muted-foreground">
          We founded {BRAND.shortName} to do the kind of consulting we always wanted to be on the
          receiving end of. Senior people, unambiguous ownership, and a bias for shipping
          software that stands the test of time.
        </p>
      </section>

      <section className="relative overflow-hidden border-y hairline">
        <img
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=80"
          alt="Modern corporate workspace with collaborative technology teams"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          loading="lazy"
        />
        <div className="relative container-editorial py-16 sm:py-24">
          <div className="grid gap-10 sm:gap-16 lg:grid-cols-3">
            {[
              { label: "Our journey", body: `What began as a set of independent engagements between friends became a firm the moment we realised we kept being asked to lead the work end to end. ${BRAND.name} is the result of that conversation.` },
              { label: "Vision", body: "To be the technology partner that ambitious organisations trust with the systems they cannot afford to get wrong. Chosen not for scale, but for depth." },
              { label: "Mission", body: "To design, build, and operate durable digital systems. To do it with restraint. And to leave our clients more capable than we found them." },
            ].map((b, i) => (
              <Reveal key={b.label} delay={i * 0.1}>
                <div>
                  <p className="text-eyebrow">{b.label}</p>
                  <p className="mt-4 sm:mt-6 font-display text-xl sm:text-2xl leading-snug">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ValuesDark() {
  return (
    <section className="container-editorial section-py-lg">
      <div className="grid gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-eyebrow">Core values</p>
          <h2 className="mt-4 sm:mt-6 font-display fluid-h2">
            What we hold ourselves to.
          </h2>
        </div>
        <div className="lg:col-span-8 grid gap-px bg-hairline sm:grid-cols-2 border hairline">
          {values.map((v, i) => (
            <Reveal key={v.k} delay={i * 0.05}>
              <div className="bg-background p-6 sm:p-8 h-full">
                <p className="font-mono text-xs text-primary">0{i + 1}</p>
                <h3 className="mt-3 sm:mt-4 font-display fluid-h3">{v.k}</h3>
                <p className="mt-2 sm:mt-3 text-sm leading-relaxed text-muted-foreground">{v.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineDark() {
  return (
    <section className="border-t hairline">
      <div className="container-editorial section-py-lg">
        <p className="text-eyebrow">Timeline</p>
        <h2 className="mt-4 sm:mt-6 font-display fluid-h2">Milestones.</h2>

        <div className="mt-10 sm:mt-16 space-y-0">
          {timeline.map((t, i) => (
            <Reveal key={`${t.year}-${t.title}`} delay={i * 0.06}>
              <div className="grid grid-cols-1 items-start gap-2 sm:gap-4 border-t py-6 sm:py-10 md:grid-cols-[120px_1fr_2fr] md:gap-12 hairline">
                <p className="font-mono text-sm text-primary">{t.year}</p>
                <h3 className="font-display fluid-h3">{t.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{t.body}</p>
              </div>
            </Reveal>
          ))}
          <div className="border-t hairline" />
        </div>
      </div>
    </section>
  );
}
