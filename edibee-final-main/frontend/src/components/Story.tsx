import { Reveal } from "./Reveal";

export function Story() {
  return (
    <section className="relative bg-offwhite px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1500px]">
        <div className="max-w-7xl space-y-4 md:space-y-5">
          <Reveal y={50}>
            <h2
              className="font-display font-bold leading-[0.95] tracking-tightest text-ink"
              style={{ fontSize: "clamp(2.8rem, 6vw, 6.5rem)" }}
            >
              Everyone creates content.
            </h2>
          </Reveal>

          <Reveal delay={0.1} y={50}>
            <h2
              className="font-display font-bold leading-[0.95] tracking-tightest text-ink"
              style={{ fontSize: "clamp(2.8rem, 6vw, 6.5rem)" }}
            >
              Few earn attention.
            </h2>
          </Reveal>

          <Reveal delay={0.2} y={50}>
            <h2
              className="font-display font-bold leading-[0.95] tracking-tightest text-ink"
              style={{ fontSize: "clamp(2.8rem, 6vw, 6.5rem)" }}
            >
              Even fewer build trust.
            </h2>
          </Reveal>

          <Reveal delay={0.3} y={50}>
            <h2
              className="font-display font-bold leading-[0.95] tracking-tightest text-ink"
              style={{ fontSize: "clamp(2.8rem, 6vw, 6.5rem)" }}
            >
              That's where{" "}
              <span className="text-honey">Edibee</span> comes in.
            </h2>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
