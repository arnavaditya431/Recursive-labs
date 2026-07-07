import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Clock, Users, Layers } from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "@/components/site/reveal";
import { StructuredData } from "@/components/site/structured-data";
import { defaultMeta, breadcrumbSchema } from "@/lib/seo";
import { projects } from "@/lib/projects";

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
  return (
    <div>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />

      {/* Hero */}
      <section className="container-editorial pt-16 sm:pt-24 pb-16 sm:pb-24">
        <p className="text-eyebrow">Selected Work</p>
        <h1 className="mt-8 font-display fluid-h1 max-w-5xl">
          Systems that <span className="italic text-warm">endure.</span>
        </h1>
        <p className="mt-8 max-w-2xl fluid-body-lg text-muted-foreground">
          Every engagement below represents a real commitment — to a client's business,
          to engineering rigour, and to outcomes that outlast the engagement itself.
        </p>
      </section>

      {/* Case Studies */}
      {projects.map((project, index) => (
        <section
          key={project.slug}
          id={project.slug}
          className={`border-t border-border/40 ${index % 2 === 1 ? 'light-section-warm' : ''}`}
        >
          {/* Hero image / preview — full bleed */}
          <Reveal>
            <div className="relative aspect-[21/9] sm:aspect-[3/1] overflow-hidden group bg-slate-900">
              {project.liveUrl ? (
                <div className="absolute inset-0 w-full h-[150%] sm:h-[200%] pointer-events-none select-none overflow-hidden">
                  <iframe
                    src={project.liveUrl}
                    className="w-full h-full border-0 origin-top"
                    tabIndex={-1}
                    title={project.title}
                    scrolling="no"
                  />
                </div>
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
                <p className="font-mono text-xs text-warm">{project.year} · {project.industry}</p>
                <h2 className="mt-3 font-display fluid-h2 text-foreground drop-shadow-lg max-w-3xl">
                  {project.title}
                </h2>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 btn-warm px-6 py-3 rounded-full text-sm font-medium pointer-events-auto transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-theme-lg"
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
              <div className="flex flex-wrap gap-6 sm:gap-10 pb-10 border-b border-border/30">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-warm" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Duration</p>
                    <p className="text-sm font-medium">{project.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-warm" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Team</p>
                    <p className="text-sm font-medium">{project.teamSize}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-warm" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Client</p>
                    <p className="text-sm font-medium">{project.client}</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Narrative — Challenge, Approach, Outcome */}
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

                {/* Testimonial */}
                {project.testimonial && (
                  <Reveal>
                    <blockquote className="border-l-3 border-warm pl-6 sm:pl-8">
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

              {/* Sidebar — Metrics + Tech */}
              <div className="lg:col-span-4">
                <Reveal>
                  <div className="lg:sticky lg:top-28 space-y-10">
                    {/* Metrics */}
                    <div>
                      <p className="text-eyebrow mb-6">Key Metrics</p>
                      <div className="grid grid-cols-2 gap-4">
                        {project.metrics.map((m) => (
                          <div key={m.label} className="light-card rounded-xl p-4">
                            <p className="font-display text-2xl sm:text-3xl text-foreground tracking-tight">{m.value}</p>
                            <p className="mt-1 text-xs text-muted-foreground leading-tight">{m.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div>
                      <p className="text-eyebrow mb-4">Technologies</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-border/50 bg-secondary/50 px-3 py-1.5 text-xs font-mono text-muted-foreground"
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
      ))}

      {/* CTA */}
      <section className="container-editorial section-py-lg">
        <Reveal>
          <div className="text-center">
            <p className="text-eyebrow">Have a similar challenge?</p>
            <h2 className="mt-6 font-display fluid-h2 max-w-3xl mx-auto">
              Let's build something <span className="italic">that matters.</span>
            </h2>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-3 rounded-full btn-warm px-8 py-4 text-sm transition-all hover:scale-[1.02] active:scale-[0.98] touch-target shadow-theme-lg"
            >
              Start a conversation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
