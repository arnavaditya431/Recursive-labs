import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Mail, Linkedin } from "lucide-react";
import { StructuredData } from "@/components/site/structured-data";
import { BRAND } from "@/lib/brand";
import { breadcrumbSchema, defaultMeta, personSchema } from "@/lib/seo";
import { getMember, team } from "@/lib/team";
import { RecursiveFrame } from "@/components/ui/recursive-frame";

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
      <div className="container-editorial py-32 sm:py-40 text-center bg-[var(--kagaz)] min-h-screen text-[var(--syahi)]">
        <p className="text-eyebrow">Not found</p>
        <h1 className="mt-4 text-title text-4xl sm:text-5xl">No profile for "{slug}".</h1>
        <Link
          to="/team"
          className="mt-8 inline-flex items-center justify-center gap-2 link-animated"
        >
          <ArrowLeft className="h-4 w-4" /> Back to leadership
        </Link>
      </div>
    );
  },
  component: ProfilePage,
});

function ProfilePage() {
  const data = Route.useLoaderData() as { member: (typeof team)[number] };
  const member = data.member;
  
  const currentIndex = team.findIndex((m) => m.slug === member.slug);
  const next = team[(currentIndex + 1) % team.length];

  return (
    <div className="bg-[var(--kagaz)] text-[var(--syahi)] min-h-screen">
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

      {/* Scene 1: Full-bleed Portrait */}
      <section className="relative h-[80vh] w-full">
        <img
          src={member.photo}
          alt={member.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--kagaz)] via-[var(--kagaz)]/20 to-transparent pointer-events-none" />
        
        <div className="absolute bottom-12 left-0 right-0 container-editorial">
          <Link
            to="/team"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[var(--dhul)] hover:text-[var(--syahi)] mb-6 transition"
          >
            <ArrowLeft className="h-3 w-3" /> All leadership
          </Link>
          <h1 className="text-display text-white mix-blend-difference drop-shadow-md">{member.name}</h1>
          <p className="font-mono text-xs uppercase tracking-widest mt-2">{member.title}</p>
        </div>
      </section>

      {/* Scene 2: Bio & Sidebar */}
      <section className="container-editorial py-24 border-t border-[var(--rekha)] flex flex-col lg:flex-row gap-16">
         <div className="lg:w-[55%]">
            <p className="text-eyebrow text-[var(--dhul)] mb-8">{member.focus}</p>
            <h2 className="text-title text-[var(--syahi)] mb-8 italic">{member.role}</h2>
            
            <div className="space-y-6 text-body text-[var(--dhul)] max-w-xl">
               {member.bio.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            
            <blockquote className="mt-16 border-l border-[var(--nila)] pl-8 italic text-title text-[var(--syahi)] max-w-lg">
               "{member.quote}"
            </blockquote>
         </div>
         
         <div className="lg:w-[45%]">
            <RecursiveFrame>
               <div className="bg-[var(--rekha)]/10 p-12">
                 
                 <div className="mb-12">
                   <p className="font-mono text-[10px] uppercase text-[var(--dhul)] tracking-widest mb-6">Expertise</p>
                   <div className="flex flex-wrap gap-2">
                     {member.expertise.map(e => (
                       <span key={e} className="font-mono text-[10px] uppercase border border-[var(--rekha)] px-3 py-1.5 text-[var(--syahi)] bg-[var(--kagaz)]">{e}</span>
                     ))}
                   </div>
                 </div>

                 <div className="mb-12">
                   <p className="font-mono text-[10px] uppercase text-[var(--dhul)] tracking-widest mb-6">Skills</p>
                   <div className="flex flex-wrap gap-2">
                     {member.skills.map(e => (
                       <span key={e} className="font-mono text-[10px] uppercase text-[var(--dhul)] bg-[var(--kagaz)] border border-[var(--rekha)] px-3 py-1">{e}</span>
                     ))}
                   </div>
                 </div>

                 <div>
                   <p className="font-mono text-[10px] uppercase text-[var(--dhul)] tracking-widest mb-6">Education</p>
                   <div className="space-y-6">
                     {member.education.map(e => (
                       <div key={e.school} className="border-t border-[var(--rekha)] pt-4">
                         <p className="font-mono text-[10px] text-[var(--nila)]">{e.year}</p>
                         <p className="text-body font-medium mt-1">{e.school}</p>
                         <p className="text-sm text-[var(--dhul)] mt-1">{e.detail}</p>
                       </div>
                     ))}
                   </div>
                 </div>

               </div>
            </RecursiveFrame>
         </div>
      </section>

      {/* Scene 3: Projects */}
      <section className="container-editorial py-24 border-t border-[var(--rekha)]">
         <p className="text-eyebrow text-[var(--dhul)] mb-12">Selected Projects</p>
         
         <div className="border-t border-[var(--rekha)]">
            {member.projects.map((p, i) => (
              <div key={p.name} className="flex flex-col lg:flex-row gap-8 py-12 border-b border-[var(--rekha)] hover:bg-[var(--rekha)]/30 transition">
                <div className="lg:w-1/3">
                  <span className="font-mono text-[var(--dhul)]">0{i+1}</span>
                  <p className="text-title text-[var(--syahi)] mt-4">{p.name}</p>
                </div>
                <div className="lg:w-2/3 flex items-center">
                  <p className="text-body text-[var(--dhul)] max-w-xl">{p.summary}</p>
                </div>
              </div>
            ))}
         </div>
      </section>

      {/* Scene 4: CTA */}
      <section className="container-editorial py-32 border-t border-[var(--rekha)] text-center">
         <p className="font-mono text-[10px] uppercase text-[var(--dhul)] tracking-widest mb-6">Want to work with {member.name.split(' ')[0]}?</p>
         <h2 className="text-display mb-12">Start a conversation.</h2>
         
         <div className="flex justify-center gap-6">
            <a href={`mailto:${member.email}`} className="inline-flex items-center gap-2 link-animated text-[var(--syahi)] border border-[var(--rekha)] rounded-full px-6 py-3 hover:border-[var(--nila)] hover:text-[var(--nila)] transition">
               <Mail className="w-4 h-4" /> {member.email}
            </a>
            <a href={member.socials.find(s => s.label === "LinkedIn")?.href || "#"} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 link-animated text-[var(--syahi)] border border-[var(--rekha)] rounded-full px-6 py-3 hover:border-[var(--nila)] hover:text-[var(--nila)] transition">
               <Linkedin className="w-4 h-4" /> LinkedIn <ArrowUpRight className="w-3 h-3" />
            </a>
         </div>
      </section>

      {/* Next Profile */}
      <section className="border-t border-[var(--rekha)] bg-[var(--rekha)]/10 hover:bg-[var(--rekha)]/20 transition-colors duration-500">
        <Link
          to="/team/$slug"
          params={{ slug: next.slug }}
          className="group block container-editorial py-24 flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <div>
            <p className="text-eyebrow text-[var(--dhul)]">Next Profile</p>
            <p className="text-title text-6xl mt-4 group-hover:text-[var(--nila)] transition-colors">{next.name}</p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--dhul)] mt-2">{next.role}</p>
          </div>
          
          <RecursiveFrame>
             <div className="w-48 h-64 border border-[var(--rekha)] overflow-hidden">
                <img src={next.photo} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition duration-700" />
             </div>
          </RecursiveFrame>
        </Link>
      </section>
    </div>
  );
}
