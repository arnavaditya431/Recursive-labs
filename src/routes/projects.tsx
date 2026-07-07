import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { StructuredData } from "@/components/site/structured-data";
import { defaultMeta, breadcrumbSchema } from "@/lib/seo";
import { projects } from "@/lib/projects";
import { RecursiveFrame } from "@/components/ui/recursive-frame";

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
    <div className="bg-[var(--kagaz)] text-[var(--syahi)] min-h-screen pb-32">
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />

      {/* Opening */}
      <section className="h-[60vh] flex items-center container-editorial">
        <h1 className="text-statement">What we have built.</h1>
      </section>

      <div className="container-editorial">
        {projects.map((project, index) => {
          const isFeatured = index === 0;
          const isTaller = (index + 1) % 3 === 0;

          if (isFeatured) {
            return (
              <div key={project.slug} className="mb-24">
                <RecursiveFrame>
                  <div className="flex flex-col lg:flex-row min-h-[80vh]">
                    {/* Featured Image */}
                    <div className="lg:w-1/2 relative border-r border-[var(--rekha)] bg-[var(--rekha)]">
                      {project.heroImage && (
                        <img
                          src={project.heroImage}
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 mix-blend-multiply"
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="lg:w-1/2 p-12 lg:p-24 flex flex-col justify-between">
                      <div>
                        <p className="font-mono text-[10px] uppercase text-[var(--dhul)] tracking-widest">
                          {project.year} · {project.industry}
                        </p>
                        <h2 className="text-title mt-6">{project.title}</h2>
                        <p className="text-body text-[var(--dhul)] mt-8">
                          {project.challenge}
                        </p>
                      </div>

                      <div className="mt-16">
                        <a
                          href={project.liveUrl || "#"}
                          className="inline-flex items-center gap-2 link-animated text-[var(--nila)] hover:text-[var(--syahi)] font-mono text-xs uppercase tracking-widest"
                        >
                          Read Case Study <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </RecursiveFrame>
              </div>
            );
          }

          return (
            <div
              key={project.slug}
              className={`border-t border-[var(--rekha)] flex flex-col lg:flex-row ${
                isTaller ? "min-h-[60vh]" : "min-h-[40vh]"
              } items-stretch hover:bg-[var(--rekha)]/30 transition-colors duration-500`}
            >
              <div className="lg:w-1/2 py-16 pr-12 flex flex-col justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase text-[var(--dhul)] tracking-widest">
                    {project.year} · {project.industry}
                  </p>
                  <h3 className="text-title text-4xl mt-6">{project.title}</h3>
                  <p className="text-body text-[var(--dhul)] mt-6 line-clamp-3">
                    {project.challenge}
                  </p>
                </div>
                <div className="mt-12">
                  <a
                    href={project.liveUrl || "#"}
                    className="inline-flex items-center gap-2 link-animated text-[var(--nila)] hover:text-[var(--syahi)] font-mono text-xs uppercase tracking-widest"
                  >
                    Read Case Study <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="lg:w-1/2 border-l border-[var(--rekha)] relative p-12 flex items-center">
                {/* Metrics */}
                <div className="grid grid-cols-2 gap-8 w-full relative z-10">
                  {project.metrics.slice(0, 2).map((m) => (
                    <div key={m.label}>
                      <p className="text-display text-4xl">{m.value}</p>
                      <p className="font-mono text-[10px] uppercase text-[var(--dhul)] mt-2">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>

                {isTaller && project.heroImage && (
                  <div className="absolute inset-0 bg-[var(--kagaz)] overflow-hidden z-0">
                    <img
                      src={project.heroImage}
                      alt="Project Environment"
                      className="absolute inset-0 w-full h-full object-cover grayscale opacity-[0.15] mix-blend-multiply"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
