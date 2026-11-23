import { Reveal } from "./Reveal";

const lines = [
  "Everyone creates content.",
  "Few earn attention.",
  "Even fewer build trust.",
];

// Black + yellow statement band — the same look as the ediBee outro card on the reels.
export function Story() {
  return (
    <section className="relative bg-ink px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="space-y-3 md:space-y-4">
          {lines.map((l, i) => (
            <Reveal key={l} delay={i * 0.1} y={40}>
              <h2
                className="font-display font-extrabold leading-[0.98] tracking-[-0.04em] text-offwhite/45"
                style={{ fontSize: "clamp(2.4rem, 5.4vw, 5.6rem)" }}
              >
                {l}
              </h2>
            </Reveal>
          ))}
          <Reveal delay={0.3} y={40}>
            <h2
              className="font-display font-extrabold leading-[0.98] tracking-[-0.04em] text-offwhite"
              style={{ fontSize: "clamp(2.4rem, 5.4vw, 5.6rem)" }}
            >
              That's where <span className="text-honey">Edibee</span> comes in.
            </h2>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
