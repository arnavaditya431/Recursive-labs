import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { StructuredData } from "@/components/site/structured-data";
import { BRAND } from "@/lib/brand";
import { defaultMeta, breadcrumbSchema } from "@/lib/seo";
import { services } from "@/lib/services";
import { useTheme } from "@/components/site/theme-provider";

export const Route = createFileRoute("/services")({
  head: () =>
    defaultMeta({
      title: "Services",
      description:
        "Software engineering, AI, cloud solutions, business automation, web development, and UI/UX design — six practices, one standard.",
      path: "/services",
    }),
  component: ServicesPage,
});

function ServicesPage() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      {isLight ? (
        <>
          {/* THEME 2: Services Hero */}
          <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden relative border-b border-border/30">
            <div className="rl-vline" aria-hidden="true" />
            <div className="container-editorial">
              <Reveal>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--rl-electric)]">Our Practices</p>
              </Reveal>
              <div className="mt-8 overflow-hidden">
                <Reveal delay={0.08}>
                  <h1 className="font-display text-[clamp(2.5rem,8vw,7.5rem)] leading-[0.85] tracking-[-0.03em] max-w-5xl">
                    Six practices.
                    <br />
                    <span className="italic text-[var(--rl-electric)]">One standard.</span>
                  </h1>
                </Reveal>
              </div>
              <Reveal delay={0.16}>
                <p className="mt-10 sm:mt-12 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Each practice is led by people who have done the work themselves — not just managed it. We bring engineering depth, not methodology theatre.
                </p>
              </Reveal>
            </div>
          </section>

          {/* THEME 2: Services List — Architectural Sticky Panels */}
          <div className="rl-section-breath">
            {services.map((service, i) => (
              <section
                key={service.slug}
                id={service.slug}
                className="border-b border-border/30 last:border-b-0 py-20 sm:py-28"
              >
                <div className="container-editorial">
                  <div className="grid gap-12 lg:gap-20 lg:grid-cols-12 items-start">
                    {/* Left Column (Sticky) */}
                    <div className="lg:col-span-5 lg:sticky lg:top-32">
                      <Reveal>
                        <p className="font-mono text-xs text-[var(--rl-electric)]">{service.code}</p>
                        <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] tracking-tight">{service.name}</h2>
                        <p className="mt-4 font-display italic text-xl sm:text-2xl text-muted-foreground leading-snug">{service.short}</p>
                        
                        <div className="mt-8 flex flex-wrap gap-2">
                          {service.technologies.map((t) => (
                            <span key={t} className="rounded-full border border-border/50 bg-background/50 px-3 py-1.5 text-xs font-mono text-muted-foreground">
                              {t}
                            </span>
                          ))}
                        </div>
                      </Reveal>
                    </div>

                    {/* Right Column (Scrolls) */}
                    <div className="lg:col-span-7">
                      <Reveal delay={0.1}>
                        <p className="text-base sm:text-lg leading-relaxed text-foreground max-w-xl">
                          {service.overview}
                        </p>
                      </Reveal>

                      {/* What you get */}
                      <Reveal delay={0.15}>
                        <div className="mt-12 sm:mt-16">
                          <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-[var(--rl-electric)] mb-6">What you get</p>
                          <ul className="space-y-4 border-t border-border/30 pt-6">
                            {service.benefits.map((b) => (
                              <li key={b} className="flex items-start gap-4">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--rl-electric)] shrink-0" />
                                <span className="text-base text-foreground/80 leading-relaxed">{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Reveal>

                      {/* Process Grid */}
                      <Reveal delay={0.25}>
                        <div className="mt-12 sm:mt-16">
                          <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-[var(--rl-electric)] mb-6">Process</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {service.process.map((p) => (
                              <div key={p.step} className="p-6 bg-background border border-border/30 rounded-xl hover:border-[var(--rl-electric)]/50 transition-colors">
                                <p className="font-mono text-[10px] tracking-widest text-[var(--rl-electric)]">{p.step}</p>
                                <p className="mt-3 font-display text-xl">{p.label}</p>
                                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Reveal>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* THEME 2: CTA */}
          <section className="py-24 sm:py-32 rl-section-char text-center">
            <div className="container-editorial">
              <Reveal>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--rl-electric)]">Ready to begin?</p>
                <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] text-white/95 leading-[0.9] tracking-[-0.02em] max-w-3xl mx-auto">
                  Tell us about the work.
                </h2>
                <div className="mt-12 flex justify-center">
                  <Link
                    to="/contact"
                    className="rl-btn-primary touch-target"
                  >
                    Start a conversation <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </section>
        </>
      ) : (
        <>
          {/* DARK THEME: Original structure preserved */}
          <section className="container-editorial pt-16 sm:pt-24 pb-16 sm:pb-24">
            <p className="text-eyebrow">Our Practices</p>
            <h1 className="mt-6 sm:mt-8 font-display fluid-h1 max-w-5xl">
              Six practices.{" "}
              <span className="italic text-primary/90">One standard.</span>
            </h1>
            <p className="mt-6 sm:mt-10 max-w-2xl fluid-body-lg text-muted-foreground">
              Each practice is led by people who have done the work themselves — not just
              managed it. We bring engineering depth, not methodology theatre.
            </p>
          </section>

          {services.map((service) => (
            <section
              key={service.slug}
              id={service.slug}
              className="border-t hairline"
            >
              <div className="container-editorial section-py">
                <div className="grid gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-16">
                  <div className="lg:col-span-4">
                    <p className="font-mono text-xs text-muted-foreground">{service.code}</p>
                    <h2 className="mt-4 sm:mt-6 font-display fluid-h2">{service.name}</h2>
                    <p className="mt-2 font-display italic text-lg text-primary/80">{service.short}</p>
                    <div className="mt-6 sm:mt-8 flex flex-wrap gap-2">
                      {service.technologies.map((t) => (
                        <span key={t} className="rounded-full border hairline px-3 py-1.5 text-xs font-mono text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-8 space-y-8 sm:space-y-12">
                    <div>
                      <p className="text-eyebrow mb-4">Overview</p>
                      <p className="fluid-body-lg text-foreground/85">{service.overview}</p>
                    </div>
                    <div>
                      <p className="text-eyebrow mb-4">What you get</p>
                      <ul className="space-y-3">
                        {service.benefits.map((b) => (
                          <li key={b} className="flex items-start gap-3">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                            <span className="text-muted-foreground leading-relaxed">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-eyebrow mb-4">Process</p>
                      <div className="grid gap-px bg-hairline sm:grid-cols-2 md:grid-cols-4 border hairline">
                        {service.process.map((p) => (
                          <div key={p.step} className="bg-background p-4 sm:p-6">
                            <p className="font-mono text-xs text-primary">{p.step}</p>
                            <p className="mt-2 font-display text-lg">{p.label}</p>
                            <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}

          <section className="border-t hairline">
            <div className="container-editorial section-py text-center">
              <Reveal>
                <p className="text-eyebrow">Ready to begin?</p>
                <h2 className="mt-6 font-display fluid-h2 max-w-3xl mx-auto">
                  Tell us about the work.
                </h2>
                <Link
                  to="/contact"
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground px-8 py-4 text-sm transition-all hover:scale-[1.02] active:scale-[0.98] touch-target"
                >
                  Start a conversation <ArrowRight className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
