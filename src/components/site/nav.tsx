import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LogoFull, LogoIcon } from "@/components/brand/logo";
import { BRAND } from "@/lib/brand";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
] as const;

/* Animated hamburger → X morphing icon */
function MenuToggle({ open, toggle }: { open: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      className="relative inline-flex h-11 w-11 items-center justify-center touch-target xl:hidden"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
    >
      <div className="flex h-5 w-6 flex-col justify-between">
        <motion.span
          animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="block h-[1.5px] w-full origin-center bg-[var(--syahi)]"
        />
        <motion.span
          animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.2 }}
          className="block h-[1.5px] w-full bg-[var(--syahi)]"
        />
        <motion.span
          animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="block h-[1.5px] w-full origin-center bg-[var(--syahi)]"
        />
      </div>
    </button>
  );
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close menu on route change */
  useEffect(() => setOpen(false), [pathname]);

  /* Body scroll lock */
  useEffect(() => {
    if (open) {
      document.body.classList.add("body-scroll-locked");
    } else {
      document.body.classList.remove("body-scroll-locked");
    }
    return () => document.body.classList.remove("body-scroll-locked");
  }, [open]);

  /* Close on ESC */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggle = useCallback(() => setOpen((v) => !v), []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-[var(--kagaz)]/85 border-b border-[var(--rekha)]/30"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-editorial flex h-16 items-center justify-between md:h-20 lg:h-24 px-6 md:px-12">
        <Link to="/" className="group relative z-[60]" aria-label="RECURSIVE LAB home">
          <LogoFull className="hidden sm:block h-[36px] md:h-[44px]" />
          <LogoIcon className="block sm:hidden h-[32px]" />
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-2 xl:flex" aria-label="Primary">
          {links.map((l) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`link-animated px-4 py-2 text-sm font-medium ${
                  active 
                    ? "text-[var(--nila)]" 
                    : "text-[var(--dhul)] hover:text-[var(--syahi)]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden xl:flex items-center gap-4">
          <Link
            to="/contact"
            className="btn-recursive bg-[var(--syahi)] text-[var(--kagaz)] hover:bg-[var(--nila)] hover:border-[var(--nila)]"
          >
            Start a conversation
          </Link>
        </div>

        {/* Animated hamburger toggle */}
        <MenuToggle open={open} toggle={toggle} />
      </div>

      {/* Mobile drawer menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[55] xl:hidden"
          >
            {/* Backdrop — close on tap */}
            <div
              className="absolute inset-0 bg-[var(--syahi)]/20 backdrop-blur-md"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            {/* Menu drawer: slides from bottom in V3 theme */}
            <motion.nav
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="absolute flex flex-col justify-between px-6 pb-12 shadow-2xl bg-[var(--kagaz)]/98 backdrop-blur-3xl inset-x-0 bottom-0 top-20 border-t border-[var(--rekha)] rounded-t-none pt-12"
              aria-label="Mobile navigation"
            >
              <div className="flex flex-col gap-2">
                {links.map((l, i) => {
                  const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
                  return (
                    <motion.div 
                      key={l.to} 
                      initial={{ opacity: 0, y: 20, x: 0 }}
                      animate={{ opacity: 1, y: 0, x: 0 }}
                      exit={{ opacity: 0, y: 10, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        to={l.to}
                        className={`group relative flex items-center gap-4 px-5 py-4 font-display text-4xl transition-colors ${
                          active
                            ? "text-[var(--nila)] bg-[var(--rekha)]/20" 
                            : "text-[var(--dhul)] hover:text-[var(--syahi)] hover:bg-[var(--rekha)]/10"
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="mobile-active"
                            className="absolute left-0 top-1/2 h-8 w-[4px] -translate-y-1/2 bg-[var(--nila)]"
                          />
                        )}
                        {l.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="space-y-6 mt-8"
              >
                <Link
                  to="/contact"
                  className="flex w-full items-center justify-center gap-3 btn-recursive bg-[var(--syahi)] text-[var(--kagaz)] hover:bg-[var(--nila)] py-5"
                >
                  Start a conversation
                </Link>
                <p className="text-center text-xs text-[var(--dhul)]">
                  <a href={`mailto:${BRAND.email}`} className="transition hover:text-[var(--nila)]">
                    {BRAND.email}
                  </a>
                </p>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
