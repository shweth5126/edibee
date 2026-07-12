import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Home } from "lucide-react";
import { smoothScrollTo } from "../lib/useLenis";

const links = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Work", href: "#work" },
  { label: "Team", href: "#team" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-4 z-50 px-4 md:top-6"
      data-testid="floating-navbar"
    >
      <div className="mx-auto flex max-w-fit items-center">
        {/* Floating pill */}
        <nav
          className={`relative flex items-center gap-1 rounded-full border px-2 py-2 transition-all duration-500 md:gap-2 md:px-3 ${
            scrolled
              ? "border-white/45 bg-white/24 shadow-[0_18px_44px_-26px_rgba(15,17,12,0.58),inset_0_1px_0_rgba(255,255,255,0.88),inset_0_-1px_0_rgba(255,255,255,0.22)] backdrop-blur-2xl backdrop-saturate-200"
              : "border-white/55 bg-white/18 shadow-[0_16px_38px_-28px_rgba(15,17,12,0.48),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(255,255,255,0.18)] backdrop-blur-2xl backdrop-saturate-200"
          }`}
          style={{
            WebkitBackdropFilter: "blur(28px) saturate(200%)",
          }}
        >
          {/* Subtle inner sheen */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.24) 38%, rgba(255,255,255,0.08) 100%)",
            }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-px rounded-full ring-1 ring-white/35"
          />

          {/* Center links — desktop */}
          <ul className="relative z-10 hidden items-center md:flex">
            {links.map((l) => {
              const isHome = l.label === "Home";
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    data-testid={`nav-link-${l.label.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      smoothScrollTo(l.href);
                    }}
                    className="group relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold tracking-[-0.005em] text-ink/72 transition-colors duration-300 hover:text-ink"
                  >
                    {isHome && <Home className="h-3.5 w-3.5" strokeWidth={2} />}
                    {l.label}
                    <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-white/0 transition-colors duration-300 group-hover:bg-white/36" />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <a
            href="#contact"
            data-testid="nav-cta"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo("#contact");
            }}
            className="group relative z-10 ml-1 hidden items-center gap-1.5 rounded-full bg-honey px-4 py-2 text-[13px] font-semibold text-ink transition-all duration-300 hover:bg-white hover:text-ink md:inline-flex"
          >
            Start a Project
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setOpen(true)}
            className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/28 text-ink ring-1 ring-white/45 md:hidden"
            aria-label="Open menu"
            data-testid="nav-menu-trigger"
          >
            <Menu className="h-4.5 w-4.5" />
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-xl md:hidden"
            data-testid="nav-mobile-drawer"
          >
            <div className="flex items-center justify-between px-6 py-4">
              <span className="font-display text-2xl font-extrabold tracking-tightest text-white">
                edibee
              </span>
              <button
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white"
                aria-label="Close menu"
                data-testid="nav-menu-close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="mt-10 flex flex-col gap-2 px-6">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                >
                  <a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      setTimeout(() => smoothScrollTo(l.href), 300);
                    }}
                    className="block py-4 font-display text-4xl font-bold tracking-tightest text-white"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
              <li className="mt-6">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    setTimeout(() => smoothScrollTo("#contact"), 300);
                  }}
                  className="inline-flex rounded-full bg-honey px-6 py-3.5 text-base font-semibold text-ink"
                >
                  Start a Project
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export function BeeMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <ellipse cx="32" cy="36" rx="14" ry="10" fill="#f3d111" />
      <path
        d="M21 36h22M21 31.5h22M21 40.5h22"
        stroke="#0f110c"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <ellipse cx="32" cy="20" rx="10" ry="6.6" fill="#0f110c" />
      <circle cx="28.5" cy="19.5" r="1.7" fill="#f3d111" />
      <ellipse cx="23" cy="27" rx="8" ry="5" fill="#ffffff" opacity="0.6" transform="rotate(-25 23 27)" />
      <ellipse cx="41" cy="27" rx="8" ry="5" fill="#ffffff" opacity="0.6" transform="rotate(25 41 27)" />
    </svg>
  );
}
