import { Reveal } from "./Reveal";

const steps = [
  {
    n: "01",
    title: "Discover",
    copy: "We dig into your brand, audience and goals. No assumptions — only clarity.",
  },
  {
    n: "02",
    title: "Create",
    copy: "Concepts, scripts, direction and production. Ideas engineered to be felt.",
  },
  {
    n: "03",
    title: "Launch",
    copy: "We ship across every channel, optimized for the platforms that matter.",
  },
  {
    n: "04",
    title: "Grow",
    copy: "We measure, refine and compound. Attention becomes a system, not a moment.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="relative bg-ink px-6 py-20 text-white md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-[0.32em] text-white/40">
              ( How we work )
            </span>
            <h2
              className="mt-5 font-display font-extrabold leading-[0.9] tracking-tightest"
              style={{ fontSize: "clamp(2.6rem, 6vw, 6rem)" }}
            >
              Four steps,
              <br />
              zero noise<span className="text-honey">.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="max-w-sm">
            <p className="text-base leading-relaxed text-white/55">
              A calm, deliberate process. Each phase earns the next — no
              surprises, no bloat, just momentum.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-x-8 gap-y-16 md:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1} y={50}>
              <div className="group">
                <span
                  className="font-display font-extrabold leading-none tracking-tightest text-honey/80 transition-colors duration-500 group-hover:text-honey"
                  style={{ fontSize: "clamp(4rem, 8vw, 7rem)" }}
                >
                  {s.n}
                </span>
                <div className="mt-2 h-px w-full bg-[#fcfcf8]/15" />
                <h3 className="mt-6 font-display text-2xl font-bold tracking-tightest md:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-[15rem] text-sm leading-relaxed text-white/55">
                  {s.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
