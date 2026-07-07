import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { StructuredData } from "@/components/site/structured-data";
import { defaultMeta, breadcrumbSchema } from "@/lib/seo";
import { services } from "@/lib/services";
import { RecursiveFrame } from "@/components/ui/recursive-frame";

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

const SERVICE_IMAGES: Record<string, string> = {
  "software-engineering": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
  "ai-machine-learning": "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
  "cloud-architecture": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  "business-automation": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  "web-applications": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  "ui-ux-design": "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
};

function ServicesPage() {
  return (
    <div className="bg-[var(--kagaz)] text-[var(--syahi)] min-h-screen">
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      {/* Opening */}
      <section className="h-screen flex items-center justify-center container-editorial">
        <h1 className="text-statement max-w-2xl text-center">
          Everything we build is built to hold.
        </h1>
      </section>

      {/* The Deep Dives */}
      <div className="pb-32">
        {services.map((service, index) => (
          <section
            key={service.slug}
            id={service.slug}
            className="container-editorial py-24 border-t border-[var(--rekha)] flex flex-col lg:flex-row gap-16"
          >
            <div className="lg:w-3/5">
              <p className="font-mono text-[var(--dhul)] mb-4">{service.code}</p>
              <h2 className="text-title text-[var(--syahi)]">{service.name}</h2>

              <p className="text-body text-[var(--dhul)] mt-8 max-w-xl">
                {service.overview}
              </p>

              {/* Horizontal Stepped Bar */}
              <div className="mt-16">
                <p className="text-eyebrow text-[var(--dhul)] mb-8">Process</p>
                <div className="flex flex-col sm:flex-row gap-8 sm:gap-4">
                  {service.process.map((p) => (
                    <div key={p.step} className="flex-1 relative">
                      <div className="h-px w-full bg-[var(--rekha)] mb-4 hidden sm:block">
                        <div className="h-px w-1/4 bg-[var(--nila)]" />
                      </div>
                      <p className="font-mono text-[10px] text-[var(--nila)]">
                        {p.step}
                      </p>
                      <p className="text-body font-medium mt-2">{p.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Badges */}
              <div className="mt-16">
                <p className="text-eyebrow text-[var(--dhul)] mb-4">
                  Technologies
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] uppercase border border-[var(--rekha)] px-2 py-1 text-[var(--dhul)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-16">
                <Link
                  to="/contact"
                  className="text-body font-medium link-animated hover:text-[var(--nila)] inline-flex items-center gap-2"
                >
                  Discuss this with us <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:w-2/5">
              <RecursiveFrame>
                <img
                  src={
                    SERVICE_IMAGES[service.slug] ||
                    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
                  }
                  alt={service.name}
                  className="w-full h-[400px] lg:h-[600px] object-cover grayscale opacity-90"
                />
              </RecursiveFrame>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
