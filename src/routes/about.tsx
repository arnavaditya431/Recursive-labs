import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/reveal";
import { StructuredData } from "@/components/site/structured-data";
import { BRAND } from "@/lib/brand";
import { breadcrumbSchema, defaultMeta } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    defaultMeta({
      title: "About",
      description:
        "The story, vision, and values of RECURSION LABS — a premium boutique technology consultancy engineering long-term systems for ambitious organisations.",
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
    body: "Recursion Labs is officially founded by a team of engineers, designers and strategists with the vision of building modern software and digital products.",
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
    body: "Recursion Labs operates as a modern technology consultancy focused on software engineering, AI, cloud solutions and product innovation.",
  },
];

function AboutPage() {
  return (
    <div>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      {/* Hero */}
      <section className="container-editorial pt-16 sm:pt-24 pb-16 sm:pb-32">
        <p className="text-eyebrow">About {BRAND.name}</p>
        <h1 className="mt-6 sm:mt-8 font-display fluid-h1 max-w-5xl">
          Small teams. <span className="italic text-primary/90">Serious work.</span> Long horizons.
        </h1>
        <p className="mt-6 sm:mt-10 max-w-2xl fluid-body-lg text-muted-foreground">
          We founded {BRAND.name} to do the kind of consulting we always wanted to be on the
          receiving end of. Senior people, unambiguous ownership, and a bias for shipping
          software that stands the test of time.
        </p>
      </section>

      {/* Vision / Mission / Journey */}
      <section className="relative border-y hairline overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=80"
          alt="Modern corporate workspace with collaborative technology teams"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          loading="lazy"
        />
        <div className="relative container-editorial grid gap-10 sm:gap-16 py-16 sm:py-24 lg:grid-cols-3">
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

      {/* Timeline */}
      <section className="border-t hairline">
        <div className="container-editorial section-py-lg">
          <p className="text-eyebrow">Timeline</p>
          <h2 className="mt-4 sm:mt-6 font-display fluid-h2">Milestones.</h2>

          <div className="mt-10 sm:mt-16 space-y-0">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.06}>
                <div className="grid grid-cols-1 items-start gap-2 sm:gap-4 border-t hairline py-6 sm:py-10 md:grid-cols-[120px_1fr_2fr] md:gap-12">
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
    </div>
  );
}
