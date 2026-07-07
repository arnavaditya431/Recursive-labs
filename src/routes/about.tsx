import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/reveal";
import { StructuredData } from "@/components/site/structured-data";
import { BRAND } from "@/lib/brand";
import { breadcrumbSchema, defaultMeta } from "@/lib/seo";
import { useTheme } from "@/components/site/theme-provider";

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
      <section className="container-editorial pt-16 sm:pt-24 pb-16 sm:pb-20">
        <p className="text-eyebrow">About {BRAND.shortName}</p>
        <h1 className="mt-6 sm:mt-8 font-display fluid-h1 max-w-5xl">
          Small teams. <span className={`italic ${isLight ? 'text-warm' : 'text-primary/90'}`}>Serious work.</span> Long horizons.
        </h1>
        <p className="mt-6 sm:mt-10 max-w-2xl fluid-body-lg text-muted-foreground">
          We founded {BRAND.shortName} to do the kind of consulting we always wanted to be on the
          receiving end of. Senior people, unambiguous ownership, and a bias for shipping
          software that stands the test of time.
        </p>
      </section>

      {/* Photo banner */}
      {isLight && (
        <Reveal>
          <section className="container-editorial pb-16">
            <div className="relative aspect-[21/9] sm:aspect-[3/1] overflow-hidden rounded-2xl shadow-theme-lg photo-warm">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=80"
                alt="Modern collaborative workspace"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </section>
        </Reveal>
      )}

      {/* Vision / Mission / Journey */}
      <section className={`relative overflow-hidden ${isLight ? 'light-section-warm border-y border-border/30' : 'border-y hairline'}`}>
        {!isLight && (
          <img
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=80"
            alt="Modern corporate workspace with collaborative technology teams"
            className="absolute inset-0 h-full w-full object-cover opacity-20"
            loading="lazy"
          />
        )}
        <div className="relative container-editorial py-16 sm:py-24">
          {isLight ? (
            /* Light: Editorial staggered layout */
            <div className="space-y-16">
              <Reveal>
                <div className="max-w-3xl">
                  <p className="text-eyebrow">Our Journey</p>
                  <blockquote className="mt-6 font-display text-2xl sm:text-3xl lg:text-4xl italic text-foreground leading-snug border-l-3 border-warm pl-6 sm:pl-8">
                    What began as independent engagements between friends became a firm the moment
                    we realised we kept being asked to lead the work end to end.
                  </blockquote>
                </div>
              </Reveal>
              <div className="grid gap-12 md:grid-cols-2 max-w-4xl">
                <Reveal delay={0.1}>
                  <div>
                    <p className="text-eyebrow">Vision</p>
                    <p className="mt-4 font-display text-xl sm:text-2xl leading-snug">
                      To be the technology partner that ambitious organisations trust with the systems they cannot afford to get wrong.
                    </p>
                  </div>
                </Reveal>
                <Reveal delay={0.2}>
                  <div>
                    <p className="text-eyebrow">Mission</p>
                    <p className="mt-4 font-display text-xl sm:text-2xl leading-snug">
                      To design, build, and operate durable digital systems. To do it with restraint. And to leave our clients more capable than we found them.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          ) : (
            /* Dark: original grid layout */
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
          )}
        </div>
      </section>

      {/* Core Values */}
      <section className="container-editorial section-py-lg">
        <div className="grid gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-eyebrow">Core values</p>
            <h2 className="mt-4 sm:mt-6 font-display fluid-h2">
              What we hold ourselves to.
            </h2>
          </div>
          <div className={`lg:col-span-8 ${isLight ? 'space-y-0' : 'grid gap-px bg-hairline sm:grid-cols-2 border hairline'}`}>
            {values.map((v, i) => (
              <Reveal key={v.k} delay={i * 0.05}>
                {isLight ? (
                  /* Light: clean editorial rows */
                  <div className="flex gap-5 sm:gap-6 py-7 border-b border-border/30 last:border-0">
                    <span className="font-display text-3xl text-warm/20 leading-none shrink-0 w-10">0{i + 1}</span>
                    <div>
                      <h3 className="font-display fluid-h4">{v.k}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.v}</p>
                    </div>
                  </div>
                ) : (
                  /* Dark: unchanged */
                  <div className="bg-background p-6 sm:p-8 h-full">
                    <p className="font-mono text-xs text-primary">0{i + 1}</p>
                    <h3 className="mt-3 sm:mt-4 font-display fluid-h3">{v.k}</h3>
                    <p className="mt-2 sm:mt-3 text-sm leading-relaxed text-muted-foreground">{v.v}</p>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={`border-t ${isLight ? 'border-border/30 light-section-cool' : 'hairline'}`}>
        <div className="container-editorial section-py-lg">
          <p className="text-eyebrow">Timeline</p>
          <h2 className="mt-4 sm:mt-6 font-display fluid-h2">Milestones.</h2>

          <div className="mt-10 sm:mt-16 space-y-0">
            {timeline.map((t, i) => (
              <Reveal key={`${t.year}-${t.title}`} delay={i * 0.06}>
                <div className={`grid grid-cols-1 items-start gap-2 sm:gap-4 border-t py-6 sm:py-10 md:grid-cols-[120px_1fr_2fr] md:gap-12 ${isLight ? 'border-border/30' : 'hairline'}`}>
                  <p className={`font-mono text-sm ${isLight ? 'text-warm' : 'text-primary'}`}>{t.year}</p>
                  <h3 className="font-display fluid-h3">{t.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t.body}</p>
                </div>
              </Reveal>
            ))}
            <div className={`border-t ${isLight ? 'border-border/30' : 'hairline'}`} />
          </div>
        </div>
      </section>
    </div>
  );
}
