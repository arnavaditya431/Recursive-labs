import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Mail, Linkedin } from "lucide-react";
import { PortraitHero } from "@/components/site/portrait";
import { Reveal } from "@/components/site/reveal";
import { StructuredData } from "@/components/site/structured-data";
import { BRAND } from "@/lib/brand";
import { breadcrumbSchema, defaultMeta, personSchema } from "@/lib/seo";
import { getMember, team } from "@/lib/team";

export const Route = createFileRoute("/team/$slug")({
  loader: ({ params }) => {
    const member = getMember(params.slug);
    if (!member) throw notFound();
    return { member };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return defaultMeta({ title: "Profile not found", noindex: true, path: "/team" });
    }
    const m = loaderData.member;
    return defaultMeta({
      title: `${m.name} — ${m.role}`,
      description: `${m.name}, ${m.role} at ${BRAND.name}. ${m.bio[0]}`,
      path: `/team/${m.slug}`,
    });
  },
  notFoundComponent: () => {
    const { slug } = Route.useParams();
    return (
      <div className="container-editorial py-32 sm:py-40 text-center">
        <p className="text-eyebrow">Not found</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl">No profile for “{slug}”.</h1>
        <Link
          to="/team"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border hairline px-5 py-3 sm:py-2 text-sm hover:bg-foreground hover:text-background transition touch-target"
        >
          <ArrowLeft className="h-4 w-4" /> Back to leadership
        </Link>
      </div>
    );
  },
  errorComponent: ({ reset }) => (
    <div className="container-editorial py-32 sm:py-40 text-center">
      <h1 className="font-display text-3xl sm:text-4xl">Something went wrong.</h1>
      <button
        onClick={reset}
        className="mt-6 rounded-full border hairline px-5 py-3 sm:py-2 text-sm touch-target"
      >
        Try again
      </button>
    </div>
  ),
  component: ProfilePage,
});

function ProfilePage() {
  const data = Route.useLoaderData() as { member: (typeof team)[number] };
  const member = data.member;
  const currentIndex = team.findIndex((m) => m.slug === member.slug);
  const next = team[(currentIndex + 1) % team.length];

  return (
    <div>
      <StructuredData
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Leadership", path: "/team" },
            { name: member.name, path: `/team/${member.slug}` },
          ]),
          personSchema({
            name: member.name,
            role: member.role,
            bio: member.bio[0],
            email: member.email,
            slug: member.slug,
            photo: member.photo,
          }),
        ]}
      />

      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url(${member.specializationBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/70 via-background to-background" aria-hidden="true" />

        <div className="relative container-editorial pt-8 sm:pt-16 pb-16 sm:pb-24">
          <Link
            to="/team"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition touch-target"
          >
            <ArrowLeft className="h-4 w-4" /> All leadership
          </Link>

          <div className="mt-8 sm:mt-12 grid gap-10 sm:gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <PortraitHero
                  src={member.photo}
                  alt={`${member.name}, ${member.role}`}
                  name={member.name}
                />
                <div className="mt-6 flex flex-wrap gap-2">
                  {member.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2 rounded-full border hairline px-4 py-2 sm:px-3.5 sm:py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-foreground/40 transition touch-target"
                    >
                      {s.label === "LinkedIn" && <Linkedin className="h-3.5 w-3.5" />}
                      {s.label === "Email" && <Mail className="h-3.5 w-3.5" />}
                      {s.label} <ArrowUpRight className="h-3 w-3 shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="text-eyebrow mb-2">{member.focus}</p>
              <h1 className="font-display font-bold text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.85] tracking-tighter uppercase text-foreground drop-shadow-sm">
                {member.name}
              </h1>
              <p className="mt-4 font-display italic text-2xl lg:text-3xl text-muted-foreground">
                {member.role}
              </p>
              <p className="mt-2 text-sm uppercase tracking-widest text-primary/80">
                {member.title}
              </p>
              <p className="mt-1 text-sm font-mono text-muted-foreground uppercase">
                {member.education[0]?.school}
              </p>

              <div className="mt-8 sm:mt-10 space-y-4 sm:space-y-5 fluid-body-lg text-foreground/85">
                {member.bio.map((p, i) => <p key={i}>{p}</p>)}
              </div>

              <blockquote className="mt-10 sm:mt-12 border-l-2 border-primary pl-5 sm:pl-6 font-display text-xl sm:text-2xl italic text-foreground/90">
                “{member.quote}”
              </blockquote>

              <Reveal>
                <div className="mt-12 sm:mt-16">
                  <p className="text-eyebrow">Areas of expertise</p>
                  <div className="mt-4 sm:mt-5 flex flex-wrap gap-2">
                    {member.expertise.map((e) => (
                      <span key={e} className="rounded-full bg-secondary px-3.5 py-2 sm:px-3 sm:py-1.5 text-sm">
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="mt-10 sm:mt-12">
                  <p className="text-eyebrow">Skills</p>
                  <div className="mt-4 sm:mt-5 flex flex-wrap gap-2">
                    {member.skills.map((e) => (
                      <span key={e} className="rounded-full border hairline px-3.5 py-2 sm:px-3 sm:py-1.5 text-xs font-mono text-muted-foreground">
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="mt-10 sm:mt-14">
                  <p className="text-eyebrow">Education</p>
                  <div className="mt-4 sm:mt-5 space-y-4">
                    {member.education.map((e) => (
                      <div key={e.school} className="border-t hairline pt-4 flex flex-col sm:flex-row sm:flex-wrap sm:justify-between gap-1 sm:gap-3">
                        <div>
                          <p className="font-display text-lg sm:text-xl">{e.school}</p>
                          <p className="text-sm text-muted-foreground">{e.detail}</p>
                        </div>
                        <p className="font-mono text-xs sm:text-sm text-muted-foreground">{e.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="mt-10 sm:mt-14">
                  <p className="text-eyebrow">Selected projects</p>
                  <div className="mt-4 sm:mt-5 space-y-4">
                    {member.projects.map((p) => (
                      <div key={p.name} className="border-t hairline pt-4">
                        <p className="font-display text-xl sm:text-2xl">{p.name}</p>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="mt-10 sm:mt-14">
                  <p className="text-eyebrow">Timeline</p>
                  <div className="mt-4 sm:mt-5">
                    {member.timeline.map((t) => (
                      <div key={t.year} className="grid grid-cols-[60px_1fr] sm:grid-cols-[80px_1fr] gap-3 sm:gap-4 border-t hairline py-4">
                        <p className="font-mono text-sm text-primary">{t.year}</p>
                        <p className="text-sm sm:text-base text-foreground/85">{t.label}</p>
                      </div>
                    ))}
                    <div className="border-t hairline" />
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="mt-12 sm:mt-14 rounded-lg border hairline p-6 sm:p-8">
                  <p className="text-eyebrow">Get in touch</p>
                  <a
                    href={`mailto:${member.email}`}
                    className="mt-4 inline-flex items-center gap-3 font-display text-xl sm:text-2xl hover:text-primary transition touch-target"
                  >
                    <Mail className="h-5 w-5 shrink-0" />
                    <span className="break-all">{member.email}</span>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t hairline">
        <Link
          to="/team/$slug"
          params={{ slug: next.slug }}
          className="group block container-editorial py-12 sm:py-16"
        >
          <p className="text-eyebrow">Next</p>
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-8">
            <div className="order-2 sm:order-1">
              <p className="font-display fluid-h2 group-hover:text-primary transition">
                {next.name}
              </p>
              <p className="mt-2 text-muted-foreground">{next.role}</p>
            </div>
            <PortraitHero
              src={next.photo}
              alt={next.name}
              name={next.name}
              className="order-1 sm:order-2 h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32 shrink-0 grayscale group-hover:grayscale-0 transition duration-700"
            />
          </div>
        </Link>
      </section>
    </div>
  );
}
