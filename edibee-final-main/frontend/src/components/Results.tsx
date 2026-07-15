import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { Reveal } from "./Reveal";

const stats = [
  { value: 2, suffix: "M+", label: "Views", sub: "Average monthly audience reach" },
  { value: 50, suffix: "+", label: "Projects", sub: "Completed across industries" },
  { value: 5, suffix: "+", label: "Brands", sub: "Strategic collaborations launched" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1800;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3.5);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}



export function Results() {
  return (
<section className="relative overflow-hidden bg-offwhite px-6 pt-12 pb-4 md:px-10 md:pt-16 md:pb-6">      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(243,209,17,0.04), transparent 35%)",
        }}
      />
      <div className="mx-auto max-w-5xl">
        {/* Header - Compact */}
        <Reveal className="flex flex-col items-center text-center">
          <span className="text-xs font-medium uppercase tracking-[0.32em] text-charcoal/50">
            ( By the numbers )
          </span>
          <h2
            className="font-display font-extrabold leading-[0.92] tracking-tightest text-ink"
            style={{ fontSize: "clamp(3rem, 5vw, 4.6rem)", marginTop: "6px" }}
          >
            Attention you can see
            <span className="text-honey">.</span>
          </h2>
          <p
            className="max-w-3xl text-sm leading-6 text-charcoal/70 md:text-base"
            style={{ marginTop: "24px" }}
          >
            A quiet showcase of the traction and campaigns we've helped brands bring to life
            through precision and memorable attention.
          </p>
        </Reveal>

        {/* Unified Statistics Panel - Compact */}
        <Reveal
          delay={0.2}
          className="relative mt-15"
        >
          <div className="relative">
            {/* Top border accent - very subtle */}
            

            <div className="py-10">
              {/* Statistics Grid - Tighter spacing */}
              <div className="grid md:grid-cols-3 gap-20">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="relative py-2 md:py-0">
                    {/* Vertical Dividers - Centered, content-height only */}
                    {index > 0 && (
                      <div className="absolute left-0 top-1/2 hidden h-28 w-px -translate-y-1/2 bg-black/5 md:block" />
                    )}

                    {/* Column Content */}
                    <motion.div
                      className="flex flex-col items-center px-6 md:px-8"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.25 + index * 0.08 }}
                      viewport={{ once: true, margin: "-12%" }}
                    >
                      {/* Number */}
                      <div className="transform transition-transform duration-[450ms] ease-out ">
                        <p
                          className="font-display font-extrabold leading-none tracking-tightest text-ink"
                          style={{ fontSize: "clamp(3rem, 6vw, 4.8rem)" }}
                        >
                          <Counter to={stat.value} suffix={stat.suffix} />
                        </p>
                      </div>

                      {/* Title */}
                      <p
                        className="font-display font-semibold tracking-tight text-ink"
                        style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)", marginTop: "-7px" }}
                      >
                        {stat.label}
                      </p>

                      {/* Description */}
<p className="mt-5 text-sm text-charcoal/55">                        {stat.sub}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </Reveal>
      </div>
      <div className="mt-1 h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />
    </section>
  );
}
