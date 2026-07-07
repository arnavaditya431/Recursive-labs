import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LogoFull, LogoIcon } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { BRAND } from "@/lib/brand";
import { useTheme } from "@/components/site/theme-provider";

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

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { theme } = useTheme();
  const isLight = theme === "light";

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
          ? "backdrop-blur-xl bg-background/85 border-b border-border/30"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-editorial flex h-16 items-center justify-between md:h-20 lg:h-24">
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
                className={`relative px-4 py-2 text-sm transition-colors font-medium ${
                  active 
                    ? isLight ? "text-[var(--rl-electric)]" : "text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
                {active && (
                  <span className={`absolute inset-x-4 -bottom-0.5 h-px ${isLight ? 'bg-[var(--rl-electric)]' : 'bg-primary'}`} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA + Theme Toggle */}
        <div className="hidden xl:flex items-center gap-4">
          <ThemeToggle />
          <Link
            to="/contact"
            className={isLight ? "rl-btn-primary touch-target" : "group inline-flex items-center gap-2 rounded-full border hairline px-5 py-2.5 text-sm hover:bg-foreground hover:text-background transition-colors touch-target"}
          >
            {!isLight && <span className="h-1.5 w-1.5 rounded-full bg-primary group-hover:bg-background" />}
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
              className="absolute inset-0 bg-background/40 backdrop-blur-md"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            {/* Menu drawer: slides from bottom in Light theme, right in Dark theme */}
            <motion.nav
              initial={isLight ? { y: "100%" } : { x: "100%" }}
              animate={isLight ? { y: 0 } : { x: 0 }}
              exit={isLight ? { y: "100%" } : { x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className={`absolute flex flex-col justify-between px-6 pb-12 shadow-2xl bg-background/98 backdrop-blur-3xl ${
                isLight
                  ? "inset-x-0 bottom-0 top-20 border-t border-border/30 rounded-t-3xl pt-12"
                  : "inset-y-0 right-0 w-full max-w-sm border-l hairline pt-24"
              }`}
              aria-label="Mobile navigation"
            >
              <div className="flex flex-col gap-2">
                {links.map((l, i) => {
                  const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
                  return (
                    <motion.div 
                      key={l.to} 
                      initial={{ opacity: 0, y: isLight ? 20 : 0, x: isLight ? 0 : 20 }}
                      animate={{ opacity: 1, y: 0, x: 0 }}
                      exit={{ opacity: 0, y: isLight ? 10 : 0, x: isLight ? 0 : 10 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        to={l.to}
                        className={`group relative flex items-center gap-4 rounded-xl px-5 py-4 font-display text-[2.25rem] transition-colors ${
                          active
                            ? isLight 
                                ? "text-[var(--rl-electric)] bg-[oklch(0.58_0.22_262/0.05)]" 
                                : "text-foreground bg-foreground/5"
                            : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                        }`}
                      >
                        {/* Active indicator bar */}
                        {active && (
                          <motion.span
                            layoutId="mobile-active"
                            className={`absolute left-0 top-1/2 h-8 w-[4px] -translate-y-1/2 rounded-full ${
                              isLight ? "bg-[var(--rl-electric)]" : "bg-primary"
                            }`}
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
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs uppercase tracking-widest ${isLight ? 'text-[var(--rl-electric)]' : 'text-muted-foreground'}`}>Theme</span>
                  <ThemeToggle />
                </div>
                <Link
                  to="/contact"
                  className={
                    isLight
                      ? "flex w-full items-center justify-center gap-3 rl-btn-primary shadow-theme-lg py-5"
                      : "flex w-full items-center justify-center gap-3 rounded-full bg-foreground px-6 py-4 text-sm font-medium text-background transition hover:bg-primary hover:text-primary-foreground touch-target shadow-xl shadow-foreground/5"
                  }
                >
                  Start a conversation
                </Link>
                <p className="text-center text-xs text-muted-foreground">
                  <a href={`mailto:${BRAND.email}`} className={`transition ${isLight ? 'hover:text-[var(--rl-electric)]' : 'hover:text-foreground'}`}>
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
