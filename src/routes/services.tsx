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

/* Curated editorial photos per service discipline */
const serviceImages: Record<string, string> = {
  "software-development": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
  "artificial-intelligence": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
  "web-development": "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=80",
  "business-automation": "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1200&q=80",
  "cloud-solutions": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
  "ux-design": "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
};

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

      {/* Hero */}
      <section className="container-editorial pt-16 sm:pt-24 pb-16 sm:pb-24">
        <p className="text-eyebrow">Our Practices</p>
        <h1 className="mt-6 sm:mt-8 font-display fluid-h1 max-w-5xl">
          Six practices.{" "}
          <span className={`italic ${isLight ? 'text-warm' : 'text-primary/90'}`}>One standard.</span>
        </h1>
        <p className="mt-6 sm:mt-10 max-w-2xl fluid-body-lg text-muted-foreground">
          Each practice is led by people who have done the work themselves — not just
          managed it. We bring engineering depth, not methodology theatre.
        </p>
      </section>

      {/* Service Sections */}
      {services.map((service, i) => {
        const isReversed = i % 2 === 1;
        const image = serviceImages[service.slug];

        return (
          <section
            key={service.slug}
            id={service.slug}
            className={`border-t ${isLight ? 'border-border/30' : 'hairline'} ${isLight && i % 2 === 0 ? 'light-section-warm' : ''}`}
          >
            <div className="container-editorial section-py">
              {isLight ? (
                /* Light: alternating editorial layouts with images */
                <div className={`grid gap-10 lg:gap-20 lg:grid-cols-12 items-start ${isReversed ? '' : ''}`}>
                  {/* Image column */}
                  <Reveal className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : ''}`}>
                    {image && (
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-theme-md photo-warm">
                        <img
                          src={image}
                          alt={service.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </Reveal>

                  {/* Content column */}
                  <div className={`lg:col-span-7 ${isReversed ? 'lg:order-1' : ''}`}>
                    <p className="font-mono text-xs text-warm">{service.code}</p>
                    <h2 className="mt-4 font-display fluid-h2">{service.name}</h2>
                    <p className="mt-2 font-display italic text-lg text-muted-foreground">{service.short}</p>
                    <p className="mt-6 text-base leading-relaxed text-foreground/85 max-w-xl">{service.overview}</p>

                    {/* Benefits as a clean list with check marks */}
                    <Reveal delay={0.1}>
                      <div className="mt-8">
                        <p className="text-eyebrow mb-4">What you get</p>
                        <ul className="space-y-3">
                          {service.benefits.map((b) => (
                            <li key={b} className="flex items-start gap-3">
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-warm shrink-0" />
                              <span className="text-sm text-foreground/80 leading-relaxed">{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>

                    {/* Process — horizontal steps */}
                    <Reveal delay={0.2}>
                      <div className="mt-10">
                        <p className="text-eyebrow mb-5">Process</p>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                          {service.process.map((p) => (
                            <div key={p.step} className="light-card rounded-xl p-4">
                              <p className="font-mono text-xs text-warm">{p.step}</p>
                              <p className="mt-2 font-display text-base">{p.label}</p>
                              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{p.body}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Reveal>

                    {/* Technologies */}
                    <Reveal delay={0.3}>
                      <div className="mt-8 flex flex-wrap gap-2">
                        {service.technologies.map((t) => (
                          <span key={t} className="rounded-full border border-border/50 bg-secondary/50 px-3 py-1.5 text-xs font-mono text-muted-foreground">
                            {t}
                          </span>
                        ))}
                      </div>
                    </Reveal>
                  </div>
                </div>
              ) : (
                /* Dark: original compact layout */
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
              )}
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className={`border-t ${isLight ? 'border-border/30' : 'hairline'}`}>
        <div className="container-editorial section-py text-center">
          <Reveal>
            <p className="text-eyebrow">Ready to begin?</p>
            <h2 className="mt-6 font-display fluid-h2 max-w-3xl mx-auto">
              Tell us about the work.
            </h2>
            <Link
              to="/contact"
              className={`mt-8 inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm transition-all hover:scale-[1.02] active:scale-[0.98] touch-target ${isLight ? 'btn-warm shadow-theme-lg' : 'bg-foreground text-background hover:bg-primary hover:text-primary-foreground'}`}
            >
              Start a conversation <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
