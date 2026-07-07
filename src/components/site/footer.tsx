import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { LogoFull } from "@/components/brand/logo";
import { BRAND, SOCIAL_LINKS } from "@/lib/brand";
import { services } from "@/lib/services";
export function SiteFooter() {

  return (
    <footer className="mt-16 sm:mt-32 border-t border-[var(--rekha)] bg-[var(--kagaz)] text-[var(--syahi)]">
      <div className="container-editorial py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="col-span-1 flex flex-col items-center text-center sm:col-span-2 lg:col-span-1 lg:items-start lg:text-left">
            <LogoFull className="h-[36px] md:h-[48px]" />
            <p className="mt-6 max-w-sm text-sm sm:text-base leading-relaxed text-[var(--dhul)]">
              {BRAND.description}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2 lg:justify-start">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="inline-flex items-center gap-1 rounded-full border px-3 py-2 sm:px-3 sm:py-1.5 text-xs transition touch-target border-[var(--rekha)] text-[var(--dhul)] hover:border-[var(--syahi)] hover:text-[var(--syahi)]"
                >
                  {s.label}
                  <ArrowUpRight className="h-3 w-3 shrink-0" />
                </a>
              ))}
            </div>
          </div>

          <div className="text-center lg:text-left">
            <p className="text-eyebrow mb-4 sm:mb-6 text-[var(--dhul)]">Company</p>
            <ul className="space-y-4 sm:space-y-3 text-sm">
              {[
                { to: "/about", label: "About" },
                { to: "/team", label: "Leadership" },
                { to: "/services", label: "Services" },
                { to: "/projects", label: "Projects" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="inline-block py-1 transition touch-target link-animated text-[var(--dhul)] hover:text-[var(--syahi)]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center lg:text-left">
            <p className="text-eyebrow mb-4 sm:mb-6 text-[var(--dhul)]">Practices</p>
            <ul className="space-y-4 sm:space-y-3 text-sm">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services"
                    hash={s.slug}
                    className="inline-block py-1 transition touch-target link-animated text-[var(--dhul)] hover:text-[var(--syahi)]"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center lg:text-left">
            <p className="text-eyebrow mb-4 sm:mb-6 text-[var(--dhul)]">Elsewhere</p>
            <ul className="space-y-4 sm:space-y-3 text-sm">
              <li>
                <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--dhul)]/70">Email</span>
                <a href={`mailto:${BRAND.email}`} className="inline-block py-0.5 transition touch-target link-animated hover:text-[var(--syahi)]">
                  {BRAND.email}
                </a>
              </li>
              <li>
                <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--dhul)]/70">Phone</span>
                <a href={`tel:${BRAND.phone.replace(/\s+/g, "")}`} className="inline-block py-0.5 transition touch-target link-animated hover:text-[var(--syahi)]">
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <span className="block font-mono text-[10px] uppercase tracking-wider mb-1 text-[var(--dhul)]/70">Locations</span>
                <div className="space-y-0.5 text-xs text-[var(--dhul)]">
                  {BRAND.locations.map((city) => (
                    <p key={city}>{city}</p>
                  ))}
                </div>
              </li>
            </ul>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mt-8 sm:mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-5 py-3 text-sm touch-target transition border border-[var(--rekha)] text-[var(--dhul)] hover:text-[var(--syahi)] hover:border-[var(--syahi)]"
            >
              Back to top
              <span className="hidden sm:inline-block h-px w-8 bg-[var(--rekha)]" />
              <ArrowUp className="h-4 w-4 sm:hidden" />
            </button>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-center gap-4 border-t border-[var(--rekha)] pt-8 text-center text-xs md:flex-row md:justify-between md:text-left text-[var(--dhul)]">
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <p className="font-mono">
            Designed & Engineered in India 🇮🇳
          </p>
        </div>

        {/* Moment 12: The Echo */}
        <div className="mt-16 text-left">
          <p className="font-display text-[14px] text-[var(--dhul)]">Engineering <span className="italic text-title text-[var(--nila)] text-[14px]">ideas.</span></p>
        </div>
      </div>
    </footer>
  );
}
