import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const stats = [
  { value: "2M+", label: "Views generated" },
  { value: "1,800+", label: "App installs driven" },
  { value: "7L+", label: "Ad impressions" },
  { value: "50+", label: "Projects delivered" },
];

/* Real work, first screen: a reel playing in the middle, two stills fanned behind. */
function ReelFan({ loaded }: { loaded: boolean }) {
  const card =
    "absolute overflow-hidden rounded-[22px] bg-ink shadow-[0_30px_60px_-28px_rgba(11,11,10,0.55)] ring-1 ring-black/10";
  return (
    <div className="relative mx-auto aspect-[10/9] w-full max-w-[560px] lg:max-w-none">
      {/* left still — Dahi Handi */}
      <motion.div
        initial={{ opacity: 0, x: 30, rotate: 0 }}
        animate={{ opacity: loaded ? 1 : 0, x: loaded ? 0 : 30, rotate: loaded ? -8 : 0 }}
        transition={{ duration: 1.1, ease, delay: 0.35 }}
        className={`${card} left-[4%] top-[12%] z-10 aspect-[9/16] w-[34%]`}
      >
        <img src="/work/work-dahihandi.jpg" alt="Dahi Handi event coverage by Edibee" className="h-full w-full object-cover object-center" />
      </motion.div>

      {/* right still — Teaser Film */}
      <motion.div
        initial={{ opacity: 0, x: -30, rotate: 0 }}
        animate={{ opacity: loaded ? 1 : 0, x: loaded ? 0 : -30, rotate: loaded ? 8 : 0 }}
        transition={{ duration: 1.1, ease, delay: 0.45 }}
        className={`${card} right-[4%] top-[12%] z-10 aspect-[9/16] w-[34%]`}
      >
        <img src="/work/work-treaser.jpg" alt="Cinematic interview teaser film by Edibee" className="h-full w-full object-cover object-[42%_50%]" />
      </motion.div>

      {/* centre reel — plays */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 30 }}
        transition={{ duration: 1.1, ease, delay: 0.2 }}
        className={`${card} left-1/2 top-0 z-20 aspect-[9/16] w-[42%] -translate-x-1/2 ring-4 ring-offwhite`}
      >
        <video
          src="/work/work-summer.mp4"
          poster="/work/work-summer.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Summer Campaign social reel by Edibee"
          className="h-full w-full object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
          Social reel
        </span>
      </motion.div>

      {/* mascot — small, tucked at the corner of the stack */}
      <motion.img
        src="/bee.webp"
        width="1012"
        height="924"
        alt="Edibee bee mascot"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.8 }}
        transition={{ duration: 0.9, ease, delay: 0.7 }}
        className="pointer-events-none absolute bottom-[2%] right-[-2%] z-30 w-[24%] drop-shadow-[0_18px_24px_rgba(11,11,10,0.22)]"
      />
    </div>
  );
}

export function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-offwhite px-6 pb-16 pt-28 md:px-12 md:pb-20 md:pt-36 lg:flex lg:min-h-[100svh] lg:items-center lg:px-16"
    >
      {/* ambient yellow glow behind the reels */}
      <div className="pointer-events-none absolute right-[6%] top-[40%] h-[44vw] w-[44vw] max-h-[620px] max-w-[620px] -translate-y-1/2 rounded-full bg-honey/25 blur-[140px]" />

      <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-x-10 lg:gap-y-0">
        {/* ── copy ── */}
        <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
            transition={{ duration: 1, ease }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-2 w-2 rounded-full bg-ink" />
            <span className="text-xs font-semibold uppercase tracking-[0.26em] text-charcoal/80">
              Creative Growth Partner · Goa
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 36 }}
            transition={{ duration: 1.1, ease, delay: 0.05 }}
            className="font-display font-semibold leading-[0.96] tracking-[-0.025em] text-ink text-balance"
            style={{ fontSize: "clamp(2.75rem, 6.2vw, 6rem)" }}
          >
            Content that{" "}
            <span className="relative z-0 inline-block whitespace-nowrap">
              <span
                aria-hidden="true"
                className="absolute inset-x-[-0.06em] bottom-[0.08em] -z-10 h-[0.4em] rounded-[0.08em] bg-honey"
              />
              performs,
            </span>{" "}
            <span className="text-ink/35">not just looks good.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 24 }}
            transition={{ duration: 1, ease, delay: 0.2 }}
            className="mt-7 max-w-xl text-[16px] font-medium leading-relaxed tracking-[-0.01em] text-charcoal/85 md:text-lg"
          >
            Edibee is a creative growth partner for brands, creators and local
            businesses in Goa. Campaigns, Meta ads, film and social media built to
            get you noticed, remembered and chosen.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 24 }}
            transition={{ duration: 1, ease, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3.5 text-[15px] font-semibold tracking-[-0.01em] text-honey sm:px-7 transition-all duration-300 hover:bg-honey hover:text-ink"
            >
              Start a Project
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full border border-ink/20 bg-white/60 px-5 py-3.5 text-[15px] font-semibold tracking-[-0.01em] text-ink sm:px-7 transition-all duration-300 hover:border-ink/50"
            >
              <Play className="h-3.5 w-3.5 fill-ink" />
              View Work
            </a>
          </motion.div>

        </div>

        {/* ── real work ── */}
        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <ReelFan loaded={loaded} />
        </div>

        {/* proof, on the first screen */}
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 1, ease, delay: 0.42 }}
          className="grid max-w-xl lg:col-start-1 lg:row-start-2 lg:mt-12 lg:self-start grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4 border-t border-ink/12 pt-6"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-3xl font-semibold tracking-[-0.025em] text-ink md:text-4xl">
                {s.value}
              </dd>
              <dd className="mt-1 text-[12px] font-semibold uppercase leading-snug tracking-[0.08em] text-charcoal/75">
                {s.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
