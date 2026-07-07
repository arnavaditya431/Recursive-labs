export type Project = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  year: string;
  heroImage: string;
  challenge: string;
  approach: string;
  outcome: string;
  technologies: string[];
  duration: string;
  teamSize: string;
  metrics: { label: string; value: string }[];
  testimonial?: { quote: string; author: string; role: string };
};

export const projects: Project[] = [
  {
    slug: "disha-nucleus-digital-platform",
    title: "Educational Portal & Digital Identity",
    client: "Disha Nucleus School",
    industry: "Education",
    year: "2025",
    heroImage: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2400&q=80",
    challenge:
      "A premier educational institute with over 24 years of excellence and 10,000+ enrolled students needed a modern digital presence to reflect their legacy. Their existing systems lacked a unified portal for students, teachers, parents, and admins, and they needed a high-performance platform to showcase their board and competitive exam results (JEE, NEET, CA).",
    approach:
      "We engineered a blazing-fast, responsive web application using Next.js and React. The platform features an immersive, cinematic hero section, dedicated zones for academic results (Hall of Fame), and a secure multi-role portal login interface. The design system balances the school's traditional values with a modern user experience, utilizing optimized asset loading and seamless animations.",
    outcome:
      "The new platform successfully elevated the school's brand perception, providing a frictionless experience for prospective parents and students. The unified portal architecture laid the groundwork for centralized academic management across all four primary user roles.",
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Vercel"],
    duration: "6 weeks",
    teamSize: "2 engineers, 1 designer",
    metrics: [
      { label: "Performance Score", value: "99" },
      { label: "User Roles Supported", value: "4" },
      { label: "Students Served", value: "10,000+" },
      { label: "Years of Legacy", value: "24+" },
    ],
    testimonial: {
      quote: "The new digital platform perfectly captures our 24 years of excellence. It's fast, modern, and provides exactly what our students, parents, and faculty need to succeed.",
      author: "Founder & Trustee",
      role: "Chandrakala Sinha Gyanoday Trust",
    },
  },
];
