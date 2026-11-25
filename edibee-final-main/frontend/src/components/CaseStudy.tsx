import { Reveal } from "./Reveal";

/*
 * Featured case study — Sevaco.
 * Every number below comes from the Sevaco campaigns in Meta Ads Manager
 * (Oct–Nov 2026, pulled 25 Nov 2026). Update them when the campaign closes on 30 Nov.
 */
const stats = [
  { value: "1,823", label: "App installs", sub: "from Meta install ads" },
  { value: "₹4.64", label: "Per install", sub: "average cost across install campaigns" },
  { value: "7 lakh+", label: "Ad impressions", sub: "across six campaigns" },
  { value: "1.6 lakh", label: "People reached", sub: "by one awareness campaign, for ₹1,966" },
  { value: "22,000+", label: "Full video watches", sub: "people who watched our reels to the end" },
];

const delivered = [
  "Campaign strategy",
  "Founder story reels",
  "Campus vox-pop",
  "Meta ads, awareness to installs",
  "Daily posts",
  "Push notifications",
  "Moment-marketing posters",
  "Mascot design",
  "Instagram profile refresh",
  "Motion-graphics promo",
  "Brand Ambassador Program",
  "Reel contest",
];

export function CaseStudy() {
  return (
    <section id="case-study" className="relative bg-ink px-6 py-20 text-offwhite md:px-10 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <Reveal y={20}>
          <span className="text-xs font-medium uppercase tracking-[0.32em] text-offwhite/60">
            ( Case study · Sevaco )
          </span>
          <h2
            className="mt-4 max-w-4xl font-display font-extrabold leading-[0.95] tracking-tightest"
            style={{ fontSize: "clamp(2.2rem, 4.6vw, 4rem)" }}
          >
            How we drove <span className="text-honey">1,823 app installs</span> for a Goa
            startup at ₹4.64 each<span className="text-honey">.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-offwhite/70 md:text-base">
            Sevaco, a Goa app for posting everyday tasks, had gone quiet during a funding delay.
            They asked for a real marketing campaign, not just reels. We ran the whole thing for
            two months: the story, the content, the ads and the app itself.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-5 md:gap-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} y={20}>
              <div
                className={`flex h-full flex-col rounded-2xl p-5 ${
                  i === 0 ? "bg-honey text-ink" : "border border-offwhite/12 bg-offwhite/[0.04]"
                }`}
              >
                <p className="font-display text-3xl font-extrabold tracking-[-0.04em] md:text-[2.1rem]">
                  {s.value}
                </p>
                <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.08em]">{s.label}</p>
                <p className={`mt-1 text-[12px] leading-snug ${i === 0 ? "text-ink/70" : "text-offwhite/55"}`}>
                  {s.sub}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} y={20}>
          <div className="mt-12 md:mt-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-offwhite/55">
              What we delivered
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {delivered.map((d) => (
                <li
                  key={d}
                  className="rounded-full border border-offwhite/15 px-3.5 py-1.5 text-[13px] text-offwhite/85"
                >
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[12px] text-offwhite/40">
              Figures from Meta Ads Manager, Oct–Nov 2026.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/*
 * Brands strip. Plain wordmarks for now, in one quiet colour so no brand shouts.
 * Before going live: confirm each brand is happy to be listed. To use real logos,
 * drop monochrome SVG/PNGs in /public/brands/ and swap the <span> for an <img>.
 */
const brands = ["Sevaco", "DNA Fitness", "TechNation", "Nucleus", "AS Visual Studio"];

export function Brands() {
  return (
    <section aria-label="Brands we've worked with" className="bg-offwhite px-6 py-14 md:px-10 md:py-16">
      <div className="mx-auto max-w-[1200px] text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-charcoal/55">
          Brands we've worked with
        </p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-14">
          {brands.map((b) => (
            <li
              key={b}
              className="font-display text-xl font-bold tracking-tightest text-ink/40 transition-colors duration-300 hover:text-ink md:text-2xl"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
