import { Star, Quote, ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

type T = { name: string; role: string; text: string; rating?: number; sample?: boolean };

/**
 * Real client words only. Clients submit at /feedback → it lands in your inbox →
 * paste the approved ones here (drop `sample`).
 * `sample: true` rows show in `npm run dev` only and are stripped from the
 * production build, so placeholder copy can never go live by accident.
 */
const TESTIMONIALS: T[] = [
  { name: "Client One", role: "Brand · Role", sample: true, text: "Sample — replace with real feedback. Short lines look great here." },
  { name: "Client Two", role: "Brand · Role", sample: true, text: "Sample — a slightly longer one so you can see how a medium card sits. The team made the whole process feel effortless and the reels actually moved the needle for us." },
  { name: "Client Three", role: "Brand · Role", sample: true, text: "Sample — quick and punchy." },
  { name: "Client Four", role: "Brand · Role", sample: true, text: "Sample — long-form feedback wraps inside the card, so there's room for a proper story about what working together felt like, what changed after, and why you'd recommend it." },
  { name: "Client Five", role: "Brand · Role", sample: true, text: "Sample — creative, fast, and easy to work with." },
  { name: "Client Six", role: "Brand · Role", sample: true, text: "Sample — the edits felt premium and the turnaround was quicker than we expected." },
];

const list = TESTIMONIALS.filter((t) => import.meta.env.DEV || !t.sample);

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
            <span className="block text-xs text-ink/60">{t.role}</span>
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
        </Reveal>
      </div>

      {/* two offset rows like the reference; a second row only once there's enough to avoid repeats */}
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
