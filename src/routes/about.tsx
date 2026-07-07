import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RecursiveFrame } from "@/components/ui/recursive-frame";
import { StructuredData } from "@/components/site/structured-data";
import { breadcrumbSchema, defaultMeta } from "@/lib/seo";
import { BRAND } from "@/lib/brand";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

function AboutPage() {
  return (
    <div className="bg-[var(--kagaz)] text-[var(--syahi)] min-h-screen">
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <Movement01_Founding />
      <Movement02_ImageWall />
      <Movement03_Principles />
      <Movement04_Timeline />
    </div>
  );
}

function Movement01_Founding() {
  return (
    <section className="pt-32 pb-24 container-editorial">
      <div className="max-w-5xl">
        <h1 className="text-display">
          The best engineering should come from{" "}
          <span className="italic text-[var(--nila)]">India.</span>
        </h1>
      </div>

      <div className="mt-24">
        <RecursiveFrame>
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
            alt="Recursive Lab founding team working in the studio"
            className="w-full h-[60vh] object-cover"
          />
        </RecursiveFrame>
      </div>
    </section>
  );
}

function Movement02_ImageWall() {
  const wallRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".wall-img",
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: wallRef.current,
            start: "top 70%",
          },
        }
      );
    }, wallRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={wallRef} className="container-editorial py-24">
      <RecursiveFrame>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 p-1 bg-[var(--rekha)] h-[60vh] md:h-[80vh]">
          <div className="wall-img md:col-span-2 relative h-full">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="Indian architecture"
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-125"
            />
          </div>
          <div className="wall-img relative h-full">
            <img
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
              alt="Cyber security concept"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="wall-img relative h-full">
            <img
              src="https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&w=800&q=80"
              alt="Code on screen"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="wall-img md:col-span-2 relative h-full">
            <img
              src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80"
              alt="Financial data"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </RecursiveFrame>

      <div className="mt-32 max-w-4xl mx-auto">
        <p className="text-statement">
          We founded {BRAND.name} to do the kind of consulting we always wanted
          to be on the receiving end of. Senior people, unambiguous ownership,
          and a bias for shipping software that stands the test of time.
        </p>
        <p className="text-statement mt-12 text-[var(--dhul)]">
          What began as independent engagements between friends became a firm the
          moment we realised we kept being asked to lead the work end to end.
        </p>
      </div>
    </section>
  );
}

const values = [
  {
    k: "Craft",
    v: "We hold ourselves to a standard of work we would be proud to inherit.",
    img: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&w=400&q=80",
  },
  {
    k: "Candour",
    v: "We tell clients what we actually think, especially when it is inconvenient.",
    img: null,
  },
  {
    k: "Ownership",
    v: "We take responsibility for outcomes, not just deliverables.",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80",
  },
  {
    k: "Restraint",
    v: "We know what to leave out. Simplicity is a discipline, not a style.",
    img: null,
  },
  {
    k: "Longevity",
    v: "We design for the systems still running five years from now.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
  },
  {
    k: "People",
    v: "We treat every collaborator, client, and teammate with seriousness and care.",
    img: null,
  },
];

function Movement03_Principles() {
  return (
    <section className="container-editorial py-24">
      <p className="text-eyebrow text-[var(--dhul)] mb-12">
        Operating Principles
      </p>
      <div className="border-t border-[var(--rekha)]">
        {values.map((v, i) => (
          <div
            key={i}
            className="group border-b border-[var(--rekha)] py-12 flex flex-col md:flex-row gap-8 items-start hover:bg-[var(--rekha)]/30 transition-colors duration-500"
          >
            <div className="md:w-1/3">
              <span className="font-mono text-[var(--dhul)] group-hover:text-[var(--nila)] transition-colors">
                0{i + 1}
              </span>
              <h3 className="text-title mt-4 group-hover:text-[var(--nila)] transition-colors">
                {v.k}
              </h3>
            </div>
            <div className="md:w-1/3">
              <p className="text-body text-[var(--dhul)]">{v.v}</p>
            </div>
            {v.img && (
              <div className="md:w-1/3 flex justify-end w-full">
                <img
                  src={v.img}
                  alt={v.k}
                  className="w-32 h-32 object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

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

function Movement04_Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".timeline-node",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
          },
        }
      );
    }, timelineRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={timelineRef} className="container-editorial py-24 pb-48">
      <p className="text-eyebrow text-[var(--dhul)] mb-24">Timeline</p>

      <div className="relative ml-4 md:ml-24">
        {/* Double line recursive frame edge */}
        <div className="absolute top-0 bottom-0 left-0 w-px bg-[var(--rekha)]" />
        <div className="absolute top-0 bottom-0 left-2 w-px bg-[var(--rekha)]" />

        <div className="space-y-24">
          {timeline.map((t, i) => (
            <div key={i} className="timeline-node relative pl-12 md:pl-24">
              {/* Connector dot */}
              <div className="absolute left-[3px] top-2 w-1.5 h-1.5 bg-[var(--nila)] rounded-full" />

              <p className="text-eyebrow text-[var(--nila)]">{t.year}</p>
              <h3 className="text-title mt-4">{t.title}</h3>
              <p className="text-body text-[var(--dhul)] mt-4 max-w-lg">
                {t.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
