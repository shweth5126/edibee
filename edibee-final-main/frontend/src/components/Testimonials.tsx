import { Star, Quote, ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

type T = { name: string; role: string; text: string; rating?: number; sample?: boolean };

/**
 * Clients submit at /feedback → it lands in your inbox → paste the approved ones
 * here WITHOUT `sample`. While no real entry exists, the demo rows below are shown
 * with a visible "Demo reviews" label (so visitors are never misled); the label
 * and demos disappear automatically once one real testimonial is added.
 */
const TESTIMONIALS: T[] = [
  { name: "Kriti", role: "", rating: 5, text: "Learnt so many new things and had great experience working with the whole team" },
  { name: "Varad", role: "Cafe", rating: 5, text: "Great working with you edibee" },
  { name: "Aarav Gawas", role: "AS Visual Studio", rating: 5, text: "Highly recommend Edibee! They make the process seamless with their innovative concepts and top-tier results" },
  { name: "Anonymous", role: "", rating: 5, text: "Worth working with edibee media 👏" },
  { name: "Natasha Gill", role: "Gill production", rating: 5, text: "Working with you was fantastic! the communication was seamless and the results exceeded my expectations." },
  { name: "Sample Client", role: "Your brand here", sample: true, text: "Quick turnaround and the edits felt genuinely premium." },
  { name: "Sample Client", role: "Your brand here", sample: true, text: "The team made the whole process feel effortless. From the first call to the final reel, everything was clear and on time." },
  { name: "Sample Client", role: "Your brand here", sample: true, text: "Creative, fast, and easy to work with." },
  { name: "Sample Client", role: "Your brand here", sample: true, text: "We came with a rough idea and left with a content plan we could actually run with. The shoot day was smooth, and the videos looked better than we'd imagined." },
  { name: "Sample Client", role: "Your brand here", sample: true, text: "Great communication throughout." },
  { name: "Sample Client", role: "Your brand here", sample: true, text: "Professional, reliable and full of ideas. Would happily work together again." },
];

const real = TESTIMONIALS.filter((t) => !t.sample);
const demo = real.length === 0;
const list = demo ? TESTIMONIALS : real;

function Card({ t, honey, hidden }: { t: T; honey: boolean; hidden: boolean }) {
  return (
    <figure
      aria-hidden={hidden}
      className={`flex w-[300px] shrink-0 flex-col justify-between rounded-[24px] p-6 text-ink md:w-[380px] md:p-8 ${
        honey ? "bg-honey" : "bg-paper"
      }`}
    >
      <div>
        <div className="flex gap-0.5" role="img" aria-label={`${t.rating ?? 5} out of 5 stars`}>
          {Array.from({ length: t.rating ?? 5 }, (_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${honey ? "fill-ink text-ink" : "fill-gold text-gold"}`}
              strokeWidth={0}
            />
          ))}
        </div>
        <blockquote className="mt-4 text-[15px] leading-relaxed md:text-base">{t.text}</blockquote>
      </div>
      <figcaption className="mt-6 flex items-center justify-between gap-3">
        <Quote className="h-7 w-7 shrink-0 fill-current opacity-15" strokeWidth={0} />
        <span className="flex items-center gap-3">
          <span className="text-right">
            <span className="block text-sm font-semibold">{t.name}</span>
            {t.role && <span className="block text-xs text-ink/60">{t.role}</span>}
          </span>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink font-display text-sm font-bold text-honey">
            {t.name[0]}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

// right → left, slow & continuous; pauses on hover; static + swipeable under reduced-motion.
// 4 copies: the track slides -50% (= 2 copies), so it loops seamlessly on any screen width.
function Row({ items, seconds, shift }: { items: T[]; seconds: number; shift: number }) {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] motion-reduce:overflow-x-auto">
      <div
        className="marquee-track flex shrink-0 gap-5 pr-5 group-hover:[animation-play-state:paused] motion-reduce:[animation:none]"
        style={{ animationDuration: `${seconds}s` }}
      >
        {row.map((t, i) => (
          <Card key={i} t={t} honey={(i + shift) % 3 === 1} hidden={i >= items.length} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  if (!list.length) return null;

  return (
    <section id="testimonials" className="relative overflow-hidden bg-ink py-20 md:py-28">
      <div className="mx-auto grid max-w-[1200px] gap-6 px-6 md:grid-cols-2 md:items-end md:px-10">
        <Reveal y={20}>
          <span className="text-xs font-medium uppercase tracking-[0.32em] text-paper/50">
            ( Kind words )
          </span>
          <h2
            className="mt-4 font-display font-extrabold leading-[0.95] tracking-tightest text-paper"
            style={{ fontSize: "clamp(2.2rem, 4.4vw, 3.8rem)" }}
          >
            What our clients
            <br />
            <span className="font-normal italic text-paper/60">say about us</span>
            <span className="text-honey">.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15} y={20} className="md:justify-self-end md:pb-1">
          <p className="max-w-sm text-sm leading-relaxed text-paper/60">
            Kind words from the creators and brands we've made content for.
          </p>
          {demo && (
            <span
              data-testid="testimonials-demo-label"
              className="mt-4 inline-block rounded-full border border-paper/25 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-paper/70"
            >
              Demo reviews — real ones coming soon
            </span>
          )}
        </Reveal>
      </div>

      {list.length < 3 ? (
        // too few to loop without gaps/repeats → static centred cards until there are 3+
        <div className="mt-12 flex flex-wrap justify-center gap-5 px-6 md:mt-16">
          {list.map((t, i) => (
            <Card key={i} t={t} honey={i % 3 === 1} hidden={false} />
          ))}
        </div>
      ) : (
        // two offset rows like the reference; the second only from 4+ so cards don't repeat
        <div className="mt-12 space-y-5 md:mt-16">
          <Row items={list} seconds={list.length * 14} shift={0} />
          {list.length >= 4 && (
            <Row
              items={[...list.slice(Math.floor(list.length / 2)), ...list.slice(0, Math.floor(list.length / 2))]}
              seconds={list.length * 18}
              shift={1}
            />
          )}
        </div>
      )}

      <div className="mt-12 text-center md:mt-16">
        <a
          href="/feedback"
          data-testid="testimonials-cta"
          className="inline-flex items-center gap-2 rounded-full bg-honey px-7 py-3 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-paper"
        >
          Worked with us? Share your feedback
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
