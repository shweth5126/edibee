import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { Wordmark } from "./Wordmark";

export function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-offwhite px-8 pb-16 pt-32 md:px-12 md:pb-20 md:pt-36 lg:px-16"
    >
      {/* ambient honey glow — kept subtle so the wordmark stays crisp */}
      <div className="pointer-events-none absolute right-[8%] top-[38%] h-[46vw] w-[46vw] max-w-[560px] max-h-[560px] -translate-y-1/2 rounded-full bg-honey/12 blur-[130px]" />

      <div className="relative mx-auto w-full max-w-[1280px]">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-honey" />
          <span className="text-xs font-medium uppercase tracking-[0.32em] text-charcoal/60">
            A Creative Growth Team 
          </span>
        </motion.div>

        {/* oversized typography + bee */}
        <div className="relative">
<motion.h1
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 40 }}
  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
  className="font-king-rounded leading-[0.82] tracking-[-0.02em] text-ink"
  style={{ fontSize: "clamp(4.5rem, 12vw, 12rem)" }}
>
            <Wordmark />
          </motion.h1>

          {/* Mascot — static vector (crisp at any size); just a soft fade-in */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 14 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="pointer-events-none absolute left-[64%] top-[-8%] z-20 hidden w-[26vw] min-w-[170px] max-w-[340px] md:block"
          >
            <img
              src="/bee.svg"
              alt="Edibee bee mascot"
              className="w-full drop-shadow-[0_28px_36px_rgba(15,17,12,0.16)]"
            />
          </motion.div>

          {/* sub headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 30 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="mt-1 font-display font-bold leading-[0.88] tracking-[-0.02em] text-ink/90"
            style={{ fontSize: "clamp(2.2rem, 6vw, 6rem)" }}
          >
            <span className="block">A Creative</span>
            <span className="block">
              Growth{" "}
              <span className="italic font-light text-charcoal/70">agency.</span>
            </span>
          </motion.div>
        </div>

        {/* bottom row: copy + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 24 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
          className="mt-14 flex flex-col gap-10 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-md text-[15px]
font-medium
tracking-[-0.01em] leading-relaxed text-charcoal/70 md:text-lg">
            We help brands get noticed, remembered, and chosen — through film,
 photography, and ideas that earn attention.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-[15px]
font-medium
tracking-[-0.01em] font-semibold text-white transition-all duration-300 hover:bg-honey hover:text-ink"
            >
              Start a Project
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-[#fcfcf8]/60 px-7 py-3 text-[15px]
font-medium
tracking-[-0.01em] font-semibold text-ink transition-all duration-300 hover:border-ink/40"
            >
              <Play className="h-3.5 w-3.5 fill-ink" />
              View Work
            </a>
          </div>
        </motion.div>
      </div>

      {/* Mascot on phones — own spot (bottom-right, beside the buttons) so it never gets cropped or covers text */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 14 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="pointer-events-none absolute bottom-8 right-5 z-20 w-[34vw] max-w-[170px] md:hidden"
      >
        <img
          src="/bee.svg"
          alt="Edibee bee mascot"
          className="w-full drop-shadow-[0_20px_28px_rgba(15,17,12,0.16)]"
        />
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-charcoal/40">
          Scroll
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-charcoal/40 to-transparent" />
      </motion.div>
    </section>
  );
}
