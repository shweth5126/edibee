import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";

export function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [landed, setLanded] = useState(false); // bee finished flying in

  // Cursor-driven bee movement (more playful — wider range + scale)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 110, damping: 14, mass: 0.9 });
  const sy = useSpring(my, { stiffness: 110, damping: 14, mass: 0.9 });
  const beeX = useTransform(sx, [-1, 1], [-90, 90]);
  const beeY = useTransform(sy, [-1, 1], [-55, 55]);
  const rotate = useTransform(sx, [-1, 1], [-14, 14]);
  const tilt = useTransform(sy, [-1, 1], [-9, 9]);
  // distance-based scale: far cursor → bigger bee
  const dist = useMotionValue(0);
  const dSpring = useSpring(dist, { stiffness: 80, damping: 18 });
  const beeScale = useTransform(dSpring, [0, 1], [1, 1.18]);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    const onMove = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      mx.set(nx);
      my.set(ny);
      // distance from center 0..1 — bee scales up when cursor is far
      const d = Math.min(1, Math.hypot(nx, ny) / 1.2);
      dist.set(d);
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      clearTimeout(t);
      window.removeEventListener("mousemove", onMove);
    };
  }, [mx, my, dist]);

  return (
    <section
      id="top"
      ref={wrapRef}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-offwhite px-8 pb-16 pt-32 md:px-12 md:pb-20 md:pt-36 lg:px-16"
    >
      {/* ambient honey glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80vw] w-[80vw] max-w-[900px] max-h-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-honey/20 blur-[120px]" />

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
            A Creative Growth Agency
          </span>
        </motion.div>

        {/* oversized typography + bee */}
        <div className="relative">
<motion.h1
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 40 }}
  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
  className="font-sans font-extrabold leading-[0.82] tracking-tightest text-ink"
  style={{ fontSize: "clamp(4.5rem, 12vw, 12rem)" }}
>
            EDIBEE
          </motion.h1>

          {/* Bee — natural curved flight in, smooth landing, plays with cursor */}
          <motion.div
            style={{ x: beeX, y: beeY, rotate: rotate, rotateY: tilt, scale: beeScale }}
            className="pointer-events-none absolute inset-0 z-20"
          >
            {/* Entrance: curved path mimicking a real bee's flight */}
            <motion.div
              className="absolute left-[64%] top-[-8%] w-[28vw] max-w-[360px] min-w-[180px]"
              style={{ willChange: "transform, opacity" }}
              initial={{
                x: "85vw",
                y: "-70vh",
                scale: 5.2,
                rotate: -42,
                opacity: 0,
              }}
              animate={
                loaded
                  ? {
                      // organic curved arc — left/down with subtle zigzag
                      x: ["85vw", "45vw", "12vw", "-4vw", "2vw", "0vw"],
                      y: ["-70vh", "-30vh", "-6vh", "8vh", "-2vh", "0vh"],
                      scale: [5.2, 3.4, 1.9, 1.18, 1.03, 1],
                      rotate: [-42, -28, -8, 6, -2, 0],
                      opacity: [0, 1, 1, 1, 1, 1],
                    }
                  : {}
              }
              transition={{
                duration: 4.2,
                ease: [0.22, 1, 0.36, 1], // ease-out-quint — gentle, no abrupt stop
                times: [0, 0.25, 0.5, 0.75, 0.9, 1],
                delay: 0.3,
                opacity: { duration: 0.7, delay: 0.3, ease: "easeOut" },
              }}
              onAnimationComplete={() => setLanded(true)}
            >
              {/* Idle bob — only AFTER landing */}
              <motion.div
                animate={
                  landed
                    ? { y: [0, -14, 0], rotate: [0, 1.8, 0, -1.8, 0] }
                    : { y: 0, rotate: 0 }
                }
                transition={
                  landed
                    ? {
                        y: { duration: 6.5, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 8.5, repeat: Infinity, ease: "easeInOut" },
                      }
                    : { duration: 0.4 }
                }
              >
                {/* Wing buzz — fast during flight, gently decays on landing */}
                <motion.img
                  src="/bee.png"
                  alt="Edibee bee mascot"
                  className="w-full drop-shadow-[0_40px_60px_rgba(15,17,12,0.28)]"
                  style={{ willChange: "transform", transformOrigin: "center" }}
                  animate={
                    landed
                      ? // ✅ Smooth wing settle — 5 decaying flaps over 1.2s
                        { scaleY: [1, 0.95, 1, 0.97, 1, 0.99, 1] }
                      : { scaleY: [1, 0.9, 1, 0.92, 1] }
                  }
                  transition={
                    landed
                      ? { duration: 1.2, ease: "easeOut" }
                      : {
                          duration: 0.12,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                  }
                />
              </motion.div>

              {/* Honey motion trail during entrance */}
              <motion.div
                aria-hidden
                initial={{ opacity: 0.55 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 4, delay: 0.3, ease: "easeOut" }}
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 150% 35% at 100% 50%, rgba(243,209,17,0.28) 0%, rgba(243,209,17,0) 60%)",
                  filter: "blur(28px)",
                  transform: "translateX(-25%)",
                }}
              />
            </motion.div>
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
