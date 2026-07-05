import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LogoFull, LogoIcon } from "@/components/brand/logo";
import { BRAND } from "@/lib/brand";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
] as const;

/* Animated hamburger → X morphing icon */
function MenuToggle({ open, toggle }: { open: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      className="relative inline-flex h-11 w-11 items-center justify-center touch-target md:hidden"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
    >
      <div className="flex h-5 w-6 flex-col justify-between">
        <motion.span
          animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="block h-[1.5px] w-full origin-center bg-foreground"
        />
        <motion.span
          animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.2 }}
          className="block h-[1.5px] w-full bg-foreground"
        />
        <motion.span
          animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="block h-[1.5px] w-full origin-center bg-foreground"
        />
      </div>
    </button>
  );
}

/* Stagger children animation config */
const menuVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.03, staggerDirection: -1, duration: 0.2 },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, x: -16, transition: { duration: 0.2 } },
};

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
          ? "backdrop-blur-xl bg-background/75 border-b hairline"
          : "bg-transparent"
      }`}
    >
      <div className="container-editorial flex h-14 items-center justify-between md:h-16 lg:h-20">
        <Link to="/" className="group relative z-[60]" aria-label="RECURSION LABS home">
          <LogoFull className="hidden sm:block h-[36px] md:h-[42px] lg:h-[48px]" />
          <LogoIcon className="block sm:hidden h-[32px]" />
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((l) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative px-4 py-2 text-sm transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute inset-x-4 -bottom-0.5 h-px bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full border hairline px-4 py-2 text-sm hover:bg-foreground hover:text-background transition-colors"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary group-hover:bg-background" />
            Start a conversation
          </Link>
        </div>

        {/* Animated hamburger toggle */}
        <MenuToggle open={open} toggle={toggle} />
      </div>

      {/* Mobile side drawer menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[55] md:hidden"
          >
            {/* Backdrop — close on tap */}
            <div
              className="absolute inset-0 bg-background/40 backdrop-blur-md"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            {/* Menu drawer sliding from right */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="absolute inset-y-0 right-0 w-full max-w-sm bg-background/98 backdrop-blur-3xl border-l hairline flex flex-col justify-between px-6 pt-24 pb-8 shadow-2xl"
              aria-label="Mobile navigation"
            >
              <div className="flex flex-col gap-2">
                {links.map((l, i) => {
                  const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
                  return (
                    <motion.div 
                      key={l.to} 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        to={l.to}
                        className={`group relative flex items-center gap-4 rounded-xl px-5 py-4 font-display text-[2.25rem] transition-colors ${
                          active
                            ? "text-foreground bg-foreground/5"
                            : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                        }`}
                      >
                        {/* Active indicator bar */}
                        {active && (
                          <motion.span
                            layoutId="mobile-active"
                            className="absolute left-0 top-1/2 h-8 w-[4px] -translate-y-1/2 rounded-full bg-primary"
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
                className="space-y-5"
              >
                <Link
                  to="/contact"
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-foreground px-6 py-4 text-sm font-medium text-background transition hover:bg-primary hover:text-primary-foreground touch-target shadow-xl shadow-foreground/5"
                >
                  Start a conversation
                </Link>
                <p className="text-center text-xs text-muted-foreground">
                  <a href={`mailto:${BRAND.email}`} className="hover:text-foreground transition">
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
