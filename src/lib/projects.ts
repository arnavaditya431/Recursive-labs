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
  {
    slug: "enterprise-knowledge-platform",
    title: "Enterprise Knowledge Platform",
    client: "Leading Financial Services Firm",
    industry: "Financial Services",
    year: "2026",
    heroImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=2400&q=80",
    challenge:
      "A large financial services firm with 2,000+ employees was losing hundreds of hours per week searching across disconnected internal knowledge bases, wikis, and document repositories. Critical institutional knowledge was siloed, leading to duplicated work and inconsistent client advice.",
    approach:
      "We designed and built a retrieval-augmented knowledge platform that unified their entire document estate under a single intelligent search interface. The system uses semantic search with strict access controls, citation provenance, and a custom evaluation harness to maintain answer quality over time. We worked directly with compliance to ensure every response is auditable and grounded.",
    outcome:
      "The platform reduced average research time by 60% within the first quarter. Analysts reported higher confidence in their deliverables, and the compliance team gained full visibility into how internal knowledge was being surfaced and used.",
    technologies: ["Python", "LangGraph", "pgvector", "PostgreSQL", "AWS", "React"],
    duration: "16 weeks",
    teamSize: "4 engineers, 1 strategist",
    metrics: [
      { label: "Research time reduction", value: "60%" },
      { label: "Documents indexed", value: "340K" },
      { label: "Daily active users", value: "1,200+" },
      { label: "Compliance audit pass", value: "100%" },
    ],
    testimonial: {
      quote: "Recursive Lab didn't just build us a search tool. They understood how our analysts actually work, and designed a system around that reality. It's the first internal tool our team actually wants to use.",
      author: "VP of Technology",
      role: "Financial Services Firm",
    },
  },
  {
    slug: "multi-tenant-saas-platform",
    title: "Multi-Tenant SaaS Platform",
    client: "B2B SaaS Startup",
    industry: "Technology",
    year: "2026",
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2400&q=80",
    challenge:
      "An early-stage B2B SaaS company needed to evolve from a single-tenant prototype into a production-ready multi-tenant platform capable of serving enterprise clients across three geographies. The existing codebase had significant architectural debt and no observability.",
    approach:
      "We re-architected the platform from the data layer up: tenant-isolated PostgreSQL schemas, a new event-driven service boundary, and a complete CI/CD pipeline with preview environments. We implemented feature flagging, comprehensive telemetry, and a cost model that scales predictably with tenant count.",
    outcome:
      "The platform launched in three regions within 12 weeks. Onboarding time for new enterprise tenants dropped from weeks to hours. Infrastructure costs became predictable and visible to the business for the first time.",
    technologies: ["TypeScript", "Go", "PostgreSQL", "Kubernetes", "Terraform", "AWS"],
    duration: "12 weeks",
    teamSize: "3 engineers, 1 architect",
    metrics: [
      { label: "Tenant onboarding time", value: "< 2 hours" },
      { label: "Regions served", value: "3" },
      { label: "Uptime since launch", value: "99.97%" },
      { label: "Infrastructure cost clarity", value: "Full" },
    ],
  },
  {
    slug: "digital-transformation-retail",
    title: "Retail Digital Transformation",
    client: "National Retail Chain",
    industry: "Retail & E-Commerce",
    year: "2026",
    heroImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=2400&q=80",
    challenge:
      "A national retail chain with 50+ physical stores was struggling with disconnected inventory, order management, and customer data systems. Online and offline experiences felt like separate businesses, and the technology team was stretched thin managing legacy integrations.",
    approach:
      "We led a phased transformation starting with a unified data layer that bridged their point-of-sale, e-commerce, and warehouse systems. We then built a modern headless commerce frontend and automated key operational workflows around inventory synchronisation and order routing. Every phase shipped to production incrementally, with no business disruption.",
    outcome:
      "Unified commerce experience across all channels within 6 months. Inventory accuracy improved from 78% to 97%. The team went from managing integrations to building features.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Cloudflare", "Temporal"],
    duration: "24 weeks",
    teamSize: "5 engineers, 1 designer, 1 strategist",
    metrics: [
      { label: "Inventory accuracy", value: "97%" },
      { label: "Order processing speed", value: "3× faster" },
      { label: "Channel unification", value: "Complete" },
      { label: "Engineering team velocity", value: "+40%" },
    ],
    testimonial: {
      quote: "They treated our legacy systems with respect instead of contempt. The migration was invisible to our store teams, and the new platform lets us move at a pace we never could before.",
      author: "Chief Digital Officer",
      role: "National Retail Chain",
    },
  },
];
