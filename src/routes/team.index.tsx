import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { StructuredData } from "@/components/site/structured-data";
import { defaultMeta, breadcrumbSchema } from "@/lib/seo";
import { team } from "@/lib/team";
import { RecursiveFrame } from "@/components/ui/recursive-frame";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Route = createFileRoute("/team/")({
  head: () =>
    defaultMeta({
      title: "Leadership",
      description:
        "Meet the leadership team at RECURSIVE LAB — engineers, strategists, and designers building a premium technology consultancy.",
      path: "/team",
    }),
  component: TeamPage,
});

function TeamPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".team-member-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[var(--kagaz)] text-[var(--syahi)] min-h-screen pb-32">
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Leadership", path: "/team" },
        ])}
      />

      {/* Opening */}
      <section className="pt-32 pb-24 container-editorial">
        <h1 className="text-display max-w-4xl">
          The people <span className="italic text-[var(--nila)]">behind</span> the work.
        </h1>
        <p className="text-statement text-[var(--dhul)] mt-8">
          Five people. Five disciplines. One standard.
        </p>
      </section>

      {/* Staggered Vertical Cascade */}
      <section ref={containerRef} className="container-editorial py-24">
        <div className="flex flex-col gap-24 lg:gap-32">
          {team.map((member, index) => {
            // Stagger offsets for desktop cascade
            const margins = ["lg:ml-0", "lg:ml-[20%]", "lg:ml-0", "lg:ml-[40%]", "lg:ml-[10%]"];
            const marginLeft = margins[index % margins.length];

            return (
              <div
                key={member.slug}
                className={`team-member-card w-full lg:w-[45%] ${marginLeft}`}
              >
                <Link to="/team/$slug" params={{ slug: member.slug }} className="group block">
                  <RecursiveFrame>
                    <div className="relative aspect-[3/4] sm:aspect-square lg:aspect-[4/5] overflow-hidden bg-[var(--rekha)]">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover grayscale transition-all duration-800 group-hover:grayscale-0 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--kagaz)]/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <h2 className="text-title text-4xl">{member.name}</h2>
                        <div className="mt-2 flex items-center justify-between">
                           <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--syahi)]">
                             {member.title}
                           </p>
                           <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 text-[var(--nila)]" />
                        </div>
                      </div>
                    </div>
                  </RecursiveFrame>
                  <div className="mt-6">
                    <p className="text-body text-[var(--dhul)] line-clamp-2">
                      {member.mission}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
