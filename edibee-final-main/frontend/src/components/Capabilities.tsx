import { Reveal } from "./Reveal";

/*
 * What we do, by service, each with real work behind it.
 * Only facts we can stand behind: delivered work and Meta Ads figures.
 * Remove or edit any row freely.
 */
type Cap = { name: string; proof: string; where: string };

const caps: Cap[] = [
  {
    name: "Campaign strategy",
    proof: "A two-month launch plan, from the founder's story to app installs.",
    where: "Sevaco",
  },
  {
    name: "Meta ads",
    proof: "₹4.64 per install. Our own reel reached 41,552 people for ₹74.",
    where: "Sevaco · Edibee",
  },
  {
    name: "Reels & content",
    proof: "2M+ views across client and Edibee reels. Daily posts and moment-marketing posters.",
    where: "Sevaco · Nucleus",
  },
  {
    name: "Podcasts",
    proof: "A four-episode podcast run, plus episodes featuring Goa MLAs.",
    where: "Rane · Goa MLAs",
  },
  {
    name: "Events",
    proof: "Event-day coverage with 10 days of awareness marketing and influencer collabs before it.",
    where: "Rane · DNA Fitness",
  },
  {
    name: "Brand & mascot design",
    proof: "The Sevaco boy mascot, an Instagram profile refresh and the Edibee bee.",
    where: "Sevaco · Edibee",
  },
  {
    name: "App marketing",
    proof: "Three push notifications a day, a Brand Ambassador Program and a reel contest.",
    where: "Sevaco",
  },
  {
    name: "Websites & tools",
    proof: "This site, and Edibee OS, the dashboard we run every client on.",
    where: "Edibee",
  },
];

export function Capabilities() {
  return (
    <section id="services" className="relative bg-offwhite px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-end">
          <Reveal y={20}>
            <span className="text-xs font-medium uppercase tracking-[0.32em] text-charcoal/65">
              ( What we do )
            </span>
            <h2
              className="mt-4 font-display font-semibold leading-[0.95] tracking-tightest text-ink"
              style={{ fontSize: "clamp(2.2rem, 4.4vw, 3.8rem)" }}
            >
              More than edits<span className="text-honey">.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15} y={20} className="max-w-md md:justify-self-end md:pb-1">
            <p className="text-[14px] leading-relaxed text-charcoal/70 md:max-w-sm">
              Reels are one part of it. Here's everything else we've done for real brands,
              and where we did it.
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid grid-cols-1 border-t border-ink/10 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {caps.map((c, i) => (
            <Reveal key={c.name} delay={(i % 4) * 0.06} y={16}>
              <li className="flex h-full flex-col border-b border-ink/10 py-6 sm:pr-6 lg:min-h-[200px]">
                <span className="text-[12px] font-semibold tabular-nums text-charcoal/55">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-[-0.02em] text-ink">
                  {c.name}
                </h3>
                <p className="mt-2 text-[14px] leading-snug text-charcoal/75">{c.proof}</p>
                <p className="mt-auto pt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-charcoal/65">
                  {c.where}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
