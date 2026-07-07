import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Clock, Users, Layers } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/site/reveal";
import { StructuredData } from "@/components/site/structured-data";
import { defaultMeta, breadcrumbSchema } from "@/lib/seo";
import { projects } from "@/lib/projects";
import { useTheme } from "@/components/site/theme-provider";

export const Route = createFileRoute("/projects")({
  head: () =>
    defaultMeta({
      title: "Projects",
      description:
        "Selected work from RECURSIVE LAB — enterprise case studies in software engineering, AI, cloud infrastructure, and digital transformation.",
      path: "/projects",
    }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />

      {/* Hero */}
      <section className={`pt-24 sm:pt-32 pb-16 sm:pb-24 ${isLight ? 'relative overflow-hidden' : 'container-editorial'}`}>
        {isLight ? (
          <>
            <div className="rl-vline" aria-hidden="true" />
            <div className="container-editorial">
              <Reveal>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--rl-electric)]">Selected Work</p>
              </Reveal>
              <div className="mt-8 overflow-hidden">
                <Reveal delay={0.08}>
                  <h1 className="font-display text-[clamp(2.5rem,8vw,7.5rem)] leading-[0.85] tracking-[-0.03em] max-w-5xl">
                    Systems that
                    <br />
                    <span className="italic text-[var(--rl-electric)]">endure.</span>
                  </h1>
                </Reveal>
              </div>
              <Reveal delay={0.16}>
                <p className="mt-10 sm:mt-12 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Every engagement below represents a real commitment — to a client's business,
                  to engineering rigour, and to outcomes that outlast the engagement itself.
                </p>
              </Reveal>
            </div>
          </>
        ) : (
          <>
            <p className="text-eyebrow">Selected Work</p>
            <h1 className="mt-8 font-display fluid-h1 max-w-5xl">
              Systems that <span className="italic text-primary/90">endure.</span>
            </h1>
            <p className="mt-8 max-w-2xl fluid-body-lg text-muted-foreground">
              Every engagement below represents a real commitment — to a client's business,
              to engineering rigour, and to outcomes that outlast the engagement itself.
            </p>
          </>
        )}
      </section>

      {/* Case Studies */}
      {projects.map((project, index) => (
        isLight ? (
          <LightCaseStudy key={project.slug} project={project} index={index} />
        ) : (
          <DarkCaseStudy key={project.slug} project={project} index={index} />
        )
      ))}

      {/* CTA */}
      {isLight ? (
        <section className="py-24 sm:py-32 rl-section-char text-center">
          <div className="container-editorial">
            <Reveal>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--rl-electric)]">
                Have a similar challenge?
              </p>
              <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] text-white/95 leading-[0.9] tracking-[-0.02em] max-w-3xl mx-auto">
                Let's build something{" "}
                <span className="italic text-[var(--rl-electric)]">that matters.</span>
              </h2>
              <div className="mt-12 flex justify-center">
                <Link
                  to="/contact"
                  className="rl-btn-primary touch-target"
                >
                  Start a conversation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      ) : (
        <section className="container-editorial section-py-lg">
          <Reveal>
            <div className="text-center">
              <p className="text-eyebrow">Have a similar challenge?</p>
              <h2 className="mt-6 font-display fluid-h2 max-w-3xl mx-auto">
                Let's build something <span className="italic">that matters.</span>
              </h2>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-foreground text-background px-8 py-4 text-sm transition-all hover:bg-primary hover:text-primary-foreground hover:scale-[1.02] active:scale-[0.98] touch-target shadow-theme-lg"
              >
                Start a conversation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </section>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LIGHT MODE — Architectural typographic layout
   ═══════════════════════════════════════════════════════════════ */
function LightCaseStudy({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <section id={project.slug} className="border-t border-border/30 bg-background pt-20 pb-20 sm:pt-28 sm:pb-28">
      <div className="container-editorial">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Left Column: Title & Meta */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-12">
            <Reveal>
              <div>
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--rl-electric)]">
                  {project.year} · {project.industry}
                </p>
                <h2 className="mt-4 font-display text-[clamp(2.5rem,4vw,4rem)] leading-[0.9] tracking-tight text-foreground">
                  {project.title}
                </h2>
                
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 rl-btn-text"
                  >
                    Visit Live Site
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </Reveal>

            {/* Meta Grid */}
            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-y-8 border-t border-border/30 pt-8">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--rl-electric)]">Duration</p>
                  <p className="mt-2 text-sm font-medium">{project.duration}</p>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--rl-electric)]">Team</p>
                  <p className="mt-2 text-sm font-medium">{project.teamSize}</p>
                </div>
                <div className="col-span-2">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--rl-electric)]">Client</p>
                  <p className="mt-2 text-sm font-medium">{project.client}</p>
                </div>
              </div>
            </Reveal>

            {/* Metrics */}
            <Reveal delay={0.15}>
              <div className="border-t border-border/30 pt-8">
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--rl-electric)] mb-6">Key Metrics</p>
                <div className="space-y-6">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="flex justify-between items-end border-b border-border/10 pb-4">
                      <p className="text-sm text-muted-foreground leading-tight max-w-[60%]">{m.label}</p>
                      <p className="font-display text-2xl tracking-tight text-foreground">{m.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-6 lg:col-start-7 space-y-16 lg:mt-0 mt-8">
            <Reveal delay={0.1}>
              <div>
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--rl-electric)]">
                  The Challenge
                </p>
                <p className="mt-6 text-base sm:text-lg leading-relaxed text-foreground/85">
                  {project.challenge}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div>
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--rl-electric)]">
                  Our Approach
                </p>
                <p className="mt-6 text-base sm:text-lg leading-relaxed text-foreground/85">
                  {project.approach}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div>
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--rl-electric)]">
                  The Outcome
                </p>
                <p className="mt-6 text-base sm:text-lg leading-relaxed text-foreground/85">
                  {project.outcome}
                </p>
              </div>
            </Reveal>

            {/* Technologies */}
            <Reveal delay={0.4}>
              <div className="pt-8 border-t border-border/30">
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--rl-electric)] mb-6">
                  Technologies Used
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border/40 bg-[oklch(0.97_0.003_50)] px-3 py-1.5 text-xs font-mono text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Testimonial */}
            {project.testimonial && (
              <Reveal delay={0.5}>
                <div className="relative py-8 mt-12">
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-[var(--rl-electric)]" />
                  <blockquote className="pl-8">
                    <p className="font-display text-2xl italic text-foreground/90 leading-[1.3]">
                      "{project.testimonial.quote}"
                    </p>
                    <footer className="mt-6">
                      <p className="text-sm font-medium text-foreground">{project.testimonial.author}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{project.testimonial.role}</p>
                    </footer>
                  </blockquote>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DARK MODE — Original case study layout (LOCKED)
   ═══════════════════════════════════════════════════════════════ */
function DarkCaseStudy({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <section
      id={project.slug}
      className={`border-t hairline bg-background`}
    >
      {/* Hero image / preview — full bleed */}
      <Reveal>
        <div className="relative aspect-[21/9] sm:aspect-[3/1] overflow-hidden group bg-card">
          {project.previewVideo ? (
            <video
               src={project.previewVideo}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-80"
            />
          ) : (
            <img
              src={project.heroImage}
              alt={project.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 container-editorial pb-8 sm:pb-12 pointer-events-none">
            <p className="font-mono text-xs text-primary">{project.year} · {project.industry}</p>
            <h2 className="mt-3 font-display fluid-h2 text-foreground drop-shadow-lg max-w-3xl">
              {project.title}
            </h2>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-full text-sm font-medium pointer-events-auto transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-theme-lg"
              >
                Visit Live Site <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </Reveal>

      <div className="container-editorial py-12 sm:py-20">
        {/* Meta bar */}
        <Reveal>
          <div className="flex flex-wrap gap-6 sm:gap-10 pb-10 border-b hairline">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Duration</p>
                <p className="text-sm font-medium">{project.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Team</p>
                <p className="text-sm font-medium">{project.teamSize}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Client</p>
                <p className="text-sm font-medium">{project.client}</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Narrative */}
        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-8 space-y-12">
            <Reveal>
              <div>
                <p className="text-eyebrow">The Challenge</p>
                <p className="mt-4 text-lg leading-relaxed text-foreground/85">{project.challenge}</p>
              </div>
            </Reveal>
            <Reveal>
              <div>
                <p className="text-eyebrow">Our Approach</p>
                <p className="mt-4 text-lg leading-relaxed text-foreground/85">{project.approach}</p>
              </div>
            </Reveal>
            <Reveal>
              <div>
                <p className="text-eyebrow">The Outcome</p>
                <p className="mt-4 text-lg leading-relaxed text-foreground/85">{project.outcome}</p>
              </div>
            </Reveal>
            {project.testimonial && (
              <Reveal>
                <blockquote className="border-l-3 border-primary pl-6 sm:pl-8">
                  <p className="font-display text-xl sm:text-2xl italic text-foreground/90 leading-relaxed">
                    "{project.testimonial.quote}"
                  </p>
                  <footer className="mt-4">
                    <p className="text-sm font-medium">{project.testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{project.testimonial.role}</p>
                  </footer>
                </blockquote>
              </Reveal>
            )}
          </div>
          <div className="lg:col-span-4">
            <Reveal>
              <div className="lg:sticky lg:top-28 space-y-10">
                <div>
                  <p className="text-eyebrow mb-6">Key Metrics</p>
                  <div className="grid grid-cols-2 gap-4">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="bg-card rounded-xl p-4 border hairline">
                        <p className="font-display text-2xl sm:text-3xl text-foreground tracking-tight">{m.value}</p>
                        <p className="mt-1 text-xs text-muted-foreground leading-tight">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-eyebrow mb-4">Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border hairline bg-card px-3 py-1.5 text-xs font-mono text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
