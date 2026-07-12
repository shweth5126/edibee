import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, Linkedin, Youtube } from "lucide-react";
import { BeeMark } from "./Navbar";
import { Reveal } from "./Reveal";

const nav = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Studio", href: "#team" },
];

const socials = [
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "YouTube", href: "#", icon: Youtube },
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-ink px-6 pt-16 text-white md:px-10 md:pt-20"
    >
      <div className="relative z-10 mx-auto max-w-[1500px]">
        {/* CTA block */}
        <Reveal y={20}>
          <div className="flex flex-col gap-6 border-b border-white/8 pb-8 md:flex-row md:items-end md:justify-between md:pb-10">
            <h2
              className="font-display font-extrabold leading-[0.88] tracking-tightest"
              style={{ fontSize: "clamp(2.4rem, 6vw, 5.8rem)" }}
            >
              Let's make
              <br />
              something loud<span className="text-honey">.</span>
            </h2>
            <a
              href="mailto:hello@edibee.co"
              className="group inline-flex items-center gap-2 self-start rounded-full bg-honey px-6 py-2.5 text-sm font-semibold text-ink transition-all duration-450 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-[#fcfcf8] hover:shadow-[0_12px_24px_-6px_rgba(243,209,17,0.35)] md:self-auto"
            >
              Start a Project
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>

        {/* statement */}
        <Reveal y={20} className="py-8 md:py-10">
          <p
            className="font-display font-bold leading-[0.88] tracking-tightest text-white"
            style={{ fontSize: "clamp(1.8rem, 4.5vw, 4.2rem)" }}
          >
            We don't create content.
            <br />
            <span className="text-honey">We create growth.</span>
          </p>
        </Reveal>

        {/* links */}
        <div className="grid gap-8 border-t border-white/8 py-8 md:grid-cols-12 md:gap-x-12 md:py-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <BeeMark className="h-7 w-7" />
              <span className="font-display text-lg font-extrabold tracking-tightest">
                edibee
              </span>
            </div>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-white/50">
              A creative growth agency building attention, trust and momentum
              for brands that refuse to be ignored.
            </p>
          </div>

          <div className="md:col-span-3">
            <span className="text-xs font-medium uppercase tracking-[0.28em] text-white/35">
              Navigate
            </span>
            <ul className="mt-3 space-y-2">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="inline-block text-sm text-white/70 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-0.5 hover:text-honey"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <span className="text-xs font-medium uppercase tracking-[0.28em] text-white/35">
              Contact
            </span>
            <a
              href="mailto:hello@edibee.co"
              className="mt-3 block font-display text-lg font-bold tracking-tight text-white transition-colors duration-300 hover:text-honey"
            >
              hello@edibee.co
            </a>
            <p className="mt-1 text-xs text-white/50">Mumbai · Remote worldwide</p>
            <div className="mt-4 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 hover:border-honey hover:bg-honey hover:text-ink"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-between gap-2 border-t border-white/8 py-6 text-xs text-white/50 md:flex-row md:py-8">
          <span>© {new Date().getFullYear()} Edibee. All rights reserved.</span>
          <span>Crafted with intent — not templates.</span>
        </div>
      </div>

      {/* oversized wordmark as absolute background element */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 select-none overflow-hidden translate-y-[20%] md:translate-y-[22%]">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold leading-[0.72] tracking-[-0.06em] text-white/5"
            style={{ fontSize: "clamp(3.5rem, 16vw, 14rem)" }}
          >
            EDIBEE
          </motion.h2>
        </div>
      </div>
    </footer>
  );
}
