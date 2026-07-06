import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Portrait } from "@/components/site/portrait";
import { Reveal, SplitWords } from "@/components/site/reveal";
import { StructuredData } from "@/components/site/structured-data";
import { BRAND } from "@/lib/brand";
import { defaultMeta, breadcrumbSchema } from "@/lib/seo";
import { team, type TeamMember } from "@/lib/team";
import { useIsMobile } from "@/hooks/use-mobile";

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
  return (
    <div>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Leadership", path: "/team" },
        ])}
      />

      <section className="container-editorial pt-16 sm:pt-24 pb-10 sm:pb-16">
        <p className="text-eyebrow">Leadership</p>
        <h1 className="mt-6 sm:mt-8 font-display fluid-h1 max-w-5xl">
          The people <span className="italic text-primary/90">behind the work.</span>
        </h1>
        <p className="mt-6 sm:mt-10 max-w-2xl fluid-body-lg text-muted-foreground">
          {BRAND.name} is built by a close-knit team of engineers, strategists, and designers.
          Each leader occupies a discipline; all of us stay close to the work.
        </p>
      </section>

      <div>
        {team.map((m, i) => (
          <MemberPanel key={m.slug} member={m} index={i} />
        ))}
      </div>
    </div>
  );
}

function MemberPanel({ member, index }: { member: TeamMember; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* Desktop: scroll-driven grayscale animation */
  const grayscale = useTransform(scrollYProgress, [0.2, 0.55], [1, 0]);
  const filter = useTransform(grayscale, (g) => `grayscale(${g})`);
  const textOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 1]);
  const reverse = index % 2 === 1;

  return (
    <section
      ref={ref}
      className="relative min-h-0 lg:min-h-screen overflow-hidden border-t hairline"
    >
      {/* Background specialization image */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10 sm:opacity-20"
        style={{
          backgroundImage: `url(${member.specializationBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-background/88 backdrop-blur-[2px]" aria-hidden="true" />

      <div className="relative container-editorial flex lg:min-h-screen items-center py-12 sm:py-16 md:py-24">
        <div className="grid w-full items-center gap-8 sm:gap-12 lg:grid-cols-12">
          {/* Portrait */}
          <div className={`lg:col-span-6 ${reverse ? "lg:order-2" : ""}`}>
            {isMobile ? (
              /* Mobile: simple reveal, no scroll-driven filter */
              <Reveal>
                <div className="relative aspect-square w-full sm:aspect-[4/5] max-w-sm sm:max-w-md mx-auto overflow-hidden border hairline rounded-2xl shadow-xl shadow-background/50">
                  <Portrait
                    src={member.photo}
                    alt={`${member.name}, ${member.role}`}
                    name={member.name}
                    className="h-full w-full"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  <div className="absolute left-3 top-3 sm:left-4 sm:top-4 rounded-full bg-background/70 backdrop-blur px-3 py-1 text-xs font-mono text-muted-foreground">
                    0{index + 1} / 0{team.length}
                  </div>
                </div>
              </Reveal>
            ) : (
              /* Desktop: scroll-driven grayscale transition */
              <motion.div style={{ filter }} className="relative aspect-[3/4] w-full max-w-lg overflow-hidden border hairline">
                <Portrait
                  src={member.photo}
                  alt={`${member.name}, ${member.role}`}
                  name={member.name}
                  className="h-full w-full"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 rounded-full bg-background/70 backdrop-blur px-3 py-1 text-xs font-mono text-muted-foreground">
                  0{index + 1} / 0{team.length}
                </div>
              </motion.div>
            )}
          </div>

          {/* Text content */}
          <div className={`lg:col-span-6 flex flex-col justify-center ${reverse ? "lg:order-1" : ""}`}>
            <p className="text-eyebrow mb-2">{member.focus}</p>

            <h2 className="font-display font-bold text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.85] tracking-tighter uppercase text-foreground drop-shadow-sm">
              {member.name}
            </h2>

            {isMobile ? (
              /* Mobile: immediate visibility, no scroll-driven opacity */
              <>
                <p className="mt-4 font-display italic text-xl sm:text-2xl text-muted-foreground">
                  {member.role}
                </p>
                <p className="mt-1 text-sm uppercase tracking-widest text-primary/80">
                  {member.title}
                </p>
                <p className="mt-1 text-xs font-mono text-muted-foreground uppercase">
                  {member.education[0]?.school}
                </p>
                <p className="mt-5 sm:mt-6 fluid-body-lg text-foreground/85 max-w-xl">
                  {member.mission}
                </p>
                <div className="mt-8 sm:mt-10">
                  <Link
                    to="/team/$slug"
                    params={{ slug: member.slug }}
                    className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm text-background hover:bg-primary hover:text-primary-foreground transition touch-target"
                  >
                    View profile
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </>
            ) : (
              /* Desktop: scroll-driven opacity */
              <>
                <motion.p
                  style={{ opacity: textOpacity }}
                  className="mt-6 font-display italic text-2xl lg:text-3xl text-muted-foreground"
                >
                  {member.role}
                </motion.p>
                <motion.p
                  style={{ opacity: textOpacity }}
                  className="mt-2 text-sm uppercase tracking-widest text-primary/80"
                >
                  {member.title}
                </motion.p>
                <motion.p
                  style={{ opacity: textOpacity }}
                  className="mt-1 text-sm font-mono text-muted-foreground uppercase"
                >
                  {member.education[0]?.school}
                </motion.p>
                <motion.p
                  style={{ opacity: textOpacity }}
                  className="mt-6 text-lg leading-relaxed text-foreground/85 max-w-xl"
                >
                  {member.mission}
                </motion.p>
                <motion.div style={{ opacity: textOpacity }} className="mt-10">
                  <Link
                    to="/team/$slug"
                    params={{ slug: member.slug }}
                    className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm text-background hover:bg-primary hover:text-primary-foreground transition"
                  >
                    View profile
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
