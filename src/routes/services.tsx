import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { StructuredData } from "@/components/site/structured-data";
import { defaultMeta, breadcrumbSchema } from "@/lib/seo";
import { services } from "@/lib/services";

export const Route = createFileRoute("/services")({
  head: () =>
    defaultMeta({
      title: "Services",
      description:
        "Software engineering, artificial intelligence, machine learning, cloud solutions, business automation, and product design from RECURSION LABS.",
      path: "/services",
    }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      {/* Hero */}
      <section className="container-editorial pt-16 sm:pt-24 pb-16 sm:pb-24">
        <p className="text-eyebrow">Practices</p>
        <h1 className="mt-6 sm:mt-8 font-display fluid-h1 max-w-5xl">
          Six practices. <span className="italic text-primary/90">One standard.</span>
        </h1>
        <p className="mt-6 sm:mt-10 max-w-2xl fluid-body-lg text-muted-foreground">
          Our practices are the disciplines we invest in deeply. Engagements often draw on
          more than one, orchestrated by a single principal accountable end to end.
        </p>
      </section>

      {services.map((s, i) => (
        <section
          key={s.slug}
          id={s.slug}
          className={`border-t hairline ${i % 2 === 1 ? "bg-card/40" : ""}`}
        >
          <div className="container-editorial py-16 sm:py-24 md:py-32">
            <div className="grid gap-10 sm:gap-16 lg:grid-cols-12">
              {/* Left — name & subtitle */}
              <div className="lg:col-span-4">
                <p className="font-mono text-sm text-primary">{s.code}</p>
                <h2 className="mt-4 sm:mt-6 font-display fluid-h2">
                  {s.name}
                </h2>
                <p className="mt-4 sm:mt-6 font-display text-lg sm:text-xl italic text-muted-foreground">
                  {s.short}
                </p>
              </div>

              {/* Right — details */}
              <div className="lg:col-span-8 space-y-10 sm:space-y-14">
                <Reveal>
                  <p className="fluid-body-lg text-muted-foreground">
                    {s.overview}
                  </p>
                </Reveal>

                <Reveal>
                  <div>
                    <p className="text-eyebrow">Benefits</p>
                    <ul className="mt-4 sm:mt-6 grid gap-3 sm:gap-4 sm:grid-cols-2">
                      {s.benefits.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-3 border-t hairline pt-3 sm:pt-4 text-sm text-foreground/90"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal>
                  <div>
                    <p className="text-eyebrow">Technologies</p>
                    <div className="mt-4 sm:mt-6 flex flex-wrap gap-2">
                      {s.technologies.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border hairline px-3 py-1.5 text-xs font-mono text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>

                <Reveal>
                  <div>
                    <p className="text-eyebrow">Process</p>
                    <div className="mt-4 sm:mt-6 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                      {s.process.map((p) => (
                        <div key={p.step} className="border-t hairline pt-3 sm:pt-4">
                          <p className="font-mono text-xs text-primary">{p.step}</p>
                          <p className="mt-2 font-display text-lg sm:text-xl">{p.label}</p>
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                            {p.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>

                <Reveal>
                  <Link
                    to="/contact"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border hairline px-5 py-3 sm:py-2.5 text-sm hover:bg-foreground hover:text-background transition touch-target"
                  >
                    Discuss a {s.name.toLowerCase()} engagement
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
