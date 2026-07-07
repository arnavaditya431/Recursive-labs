import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { LogoFull } from "@/components/brand/logo";
import { BRAND, SOCIAL_LINKS } from "@/lib/brand";
import { services } from "@/lib/services";
import { useTheme } from "@/components/site/theme-provider";

export function SiteFooter() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <footer className={`mt-16 sm:mt-32 ${isLight ? 'rl-footer-dark border-t border-white/5' : 'border-t hairline'}`}>
      <div className="container-editorial py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="col-span-1 flex flex-col items-center text-center sm:col-span-2 lg:col-span-1 lg:items-start lg:text-left">
            <LogoFull className={`h-[36px] md:h-[48px] ${isLight ? 'invert' : ''}`} />
            <p className={`mt-6 max-w-sm text-sm sm:text-base leading-relaxed ${isLight ? 'text-white/60' : 'text-muted-foreground'}`}>
              {BRAND.description}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2 lg:justify-start">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className={`inline-flex items-center gap-1 rounded-full border px-3 py-2 sm:px-3 sm:py-1.5 text-xs transition touch-target ${
                    isLight 
                      ? 'border-white/10 text-white/50 hover:border-[var(--rl-electric)] hover:text-[var(--rl-electric)]' 
                      : 'border-hairline text-muted-foreground hover:border-foreground/50 hover:text-foreground'
                  }`}
                >
                  {s.label}
                  <ArrowUpRight className="h-3 w-3 shrink-0" />
                </a>
              ))}
            </div>
          </div>

          <div className="text-center lg:text-left">
            <p className={`text-eyebrow mb-4 sm:mb-6 ${isLight ? '!text-[var(--rl-electric)]' : ''}`}>Company</p>
            <ul className="space-y-4 sm:space-y-3 text-sm">
              {[
                { to: "/about", label: "About" },
                { to: "/team", label: "Leadership" },
                { to: "/services", label: "Services" },
                { to: "/projects", label: "Projects" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={`inline-block py-1 transition touch-target ${isLight ? 'text-white/50 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center lg:text-left">
            <p className={`text-eyebrow mb-4 sm:mb-6 ${isLight ? '!text-[var(--rl-electric)]' : ''}`}>Practices</p>
            <ul className="space-y-4 sm:space-y-3 text-sm">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services"
                    hash={s.slug}
                    className={`inline-block py-1 transition touch-target ${isLight ? 'text-white/50 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center lg:text-left">
            <p className={`text-eyebrow mb-4 sm:mb-6 ${isLight ? '!text-[var(--rl-electric)]' : ''}`}>Elsewhere</p>
            <ul className="space-y-4 sm:space-y-3 text-sm">
              <li>
                <span className={`block font-mono text-[10px] uppercase tracking-wider ${isLight ? 'text-white/30' : 'text-muted-foreground/60'}`}>Email</span>
                <a href={`mailto:${BRAND.email}`} className={`inline-block py-0.5 transition touch-target ${isLight ? 'text-white/60 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}>
                  {BRAND.email}
                </a>
              </li>
              <li>
                <span className={`block font-mono text-[10px] uppercase tracking-wider ${isLight ? 'text-white/30' : 'text-muted-foreground/60'}`}>Phone</span>
                <a href={`tel:${BRAND.phone.replace(/\s+/g, "")}`} className={`inline-block py-0.5 transition touch-target ${isLight ? 'text-white/60 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}>
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <span className={`block font-mono text-[10px] uppercase tracking-wider mb-1 ${isLight ? 'text-white/30' : 'text-muted-foreground/60'}`}>Locations</span>
                <div className={`space-y-0.5 text-xs ${isLight ? 'text-white/50' : 'text-muted-foreground'}`}>
                  {BRAND.locations.map((city) => (
                    <p key={city}>{city}</p>
                  ))}
                </div>
              </li>
            </ul>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={`mt-8 sm:mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-5 py-3 text-sm touch-target transition ${
                isLight 
                  ? 'border border-white/10 text-white/50 hover:text-white hover:border-[var(--rl-electric)] sm:border-0 sm:p-0'
                  : 'border hairline text-foreground/80 hover:text-foreground sm:border-0 sm:p-0'
              }`}
            >
              Back to top
              <span className={`hidden sm:inline-block h-px w-8 ${isLight ? 'bg-white/20' : 'bg-foreground/50'}`} />
              <ArrowUp className="h-4 w-4 sm:hidden" />
            </button>
          </div>
        </div>

        <div className={`mt-16 flex flex-col items-center justify-center gap-4 border-t pt-8 text-center text-xs md:flex-row md:justify-between md:text-left ${isLight ? 'border-white/5 text-white/40' : 'border-hairline text-muted-foreground'}`}>
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <p className="font-mono">
            Designed & Engineered in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
