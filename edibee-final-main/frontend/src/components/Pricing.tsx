import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, MessageCircle } from "lucide-react";
import { Reveal } from "./Reveal";

/**
 * Pricing — "Creator" vs "Brand" package sets (toggle), prices hidden by design,
 * every CTA opens WhatsApp. Below the packages: à-la-carte single-project options.
 * Edit the `CREATOR`, `BRAND` and `PROJECTS` arrays — plain data, no other config.
 */
const WA = "https://wa.me/919766358698";
const wa = (msg: string) => `${WA}?text=${encodeURIComponent(msg)}`;

type Plan = {
  name: string;
  tagline: string;
  features: string[];
  popular?: boolean;
};

const CREATOR: Plan[] = [
  {
    name: "Starter",
    tagline: "Kickstart your content",
    features: [
      "4 Mobile-Shot Reels",
      "2 Custom Thumbnails",
      "Script Assistance",
      "Monthly Performance Report",
    ],
  },
  {
    name: "Growth",
    tagline: "Accelerate your presence",
    popular: true,
    features: [
      "9 Camera-Shoot Reels",
      "9 Thumbnails",
      "Script & Hook Assistance",
      "Content Calendar",
      "Trend & Competitor Research",
      "Basic Personal Branding Strategy",
    ],
  },
  {
    name: "Scale",
    tagline: "Own your niche",
    features: [
      "13 Multi-Camera Reels",
      "13 Custom Thumbnails",
      "Full Monthly Content",
      "3 Dedicated Shoot Days",
      "Trend & Competitor Research",
      "Advanced Personal Branding Strategy",
    ],
  },
];

const BRAND: Plan[] = [
  {
    name: "Starter",
    tagline: "Small steps, big buzz",
    features: [
      "4 Short Reels (incl. 1 Talking-Head)",
      "Phone Shoots",
      "4 Graphic Posts",
      "5 Interactive Stories",
      "1 Dedicated Shoot Day",
      "Basic Performance Report",
    ],
  },
  {
    name: "Growth",
    tagline: "Strategy today, growth tomorrow",
    popular: true,
    features: [
      "9 Short-Form Reels (incl. 3 Talking-Head)",
      "Camera Shoots",
      "6 Graphic Posts",
      "7 Interactive Stories",
      "Script Writing",
      "2 Dedicated Shoot Days",
      "Meta Marketing",
    ],
  },
  {
    name: "Scale",
    tagline: "Full-scale production",
    features: [
      "14 Short-Form Reels (incl. 8 Talking-Head + 1 Storytelling)",
      "Multi-Camera Shoot & Drone",
      "8 Graphic Posts",
      "10 Interactive Stories",
      "Professional Scriptwriting",
      "3 Dedicated Shoot Days",
      "Product Photography",
      "Advanced Branding & Research",
      "Strategic Marketing & Paid Ads",
    ],
  },
];

const PROJECTS: { name: string; from: string }[] = [
  { name: "Cinematography / Video Shoot", from: "from ₹8,000 / day" },
  { name: "Video Editing", from: "from ₹1,500 / video" },
  { name: "Motion Graphics & Animation", from: "from ₹3,000" },
  { name: "Product & Brand Photography", from: "from ₹5,000" },
  { name: "Thumbnail Design", from: "from ₹400" },
  { name: "Scriptwriting & Hooks", from: "from ₹800" },
];

type Segment = "creator" | "brand";

function PlanCard({
  plan,
  index,
  segment,
}: {
  plan: Plan;
  index: number;
  segment: Segment;
}) {
  const label = segment === "creator" ? "Creator" : "Brand";
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className={`relative flex flex-col overflow-hidden rounded-[24px] p-6 ${
        plan.popular
          ? "border-2 border-honey/40 bg-ink/95"
          : "border border-black/10 bg-paper"
      }`}
    >
      {plan.popular && (
        <div className="absolute right-0 top-0 flex items-center gap-1 rounded-bl-xl rounded-tr-[24px] bg-honey px-3 py-1.5 text-ink">
          <Star className="h-3.5 w-3.5 fill-ink" strokeWidth={0} />
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">
            Popular
          </span>
        </div>
      )}

      <p
        className={`text-[10px] font-semibold uppercase tracking-[0.32em] ${
          plan.popular ? "text-honey" : "text-charcoal/55"
        }`}
      >
        {plan.name}
      </p>
      <h3
        className={`mt-2 font-display text-xl font-bold tracking-tight md:text-2xl ${
          plan.popular ? "text-paper" : "text-ink"
        }`}
      >
        {plan.tagline}
      </h3>

      <div className={`my-5 h-px w-full ${plan.popular ? "bg-paper/20" : "bg-black/10"}`} />

      <ul className="flex flex-1 flex-col gap-2.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <span
              className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                plan.popular ? "bg-honey" : "bg-ink"
              }`}
            >
              <Check
                className={`h-3 w-3 ${plan.popular ? "text-ink" : "text-paper"}`}
                strokeWidth={3}
              />
            </span>
            <span className={`text-sm ${plan.popular ? "text-paper/90" : "text-charcoal"}`}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      <a
        href={wa(`Hi Edibee, I'm interested in the ${label} — ${plan.name} plan.`)}
        target="_blank"
        rel="noopener noreferrer"
        data-testid={`pricing-cta-${segment}-${plan.name.toLowerCase()}`}
        className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
          plan.popular
            ? "bg-honey text-ink hover:bg-paper"
            : "bg-ink text-paper hover:bg-honey hover:text-ink"
        }`}
      >
        <MessageCircle className="h-4 w-4" strokeWidth={2} />
        Book a Call
      </a>
    </motion.div>
  );
}

export function Pricing() {
  const [segment, setSegment] = useState<Segment>("creator");
  const plans = segment === "creator" ? CREATOR : BRAND;

  return (
    <section
      id="pricing"
      className="relative overflow-hidden px-6 py-14 md:px-10 md:py-20"
      style={{
        background:
          "radial-gradient(circle at top, rgba(243,209,17,0.12), transparent 45%), #f3edd9",
      }}
    >
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="mb-8 space-y-4 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-charcoal/50">
              Packages
            </p>
            <h2 className="mx-auto max-w-2xl font-display text-3xl leading-tight tracking-[-0.03em] text-ink md:text-5xl">
              Built to get you noticed<span className="text-honey">.</span>
            </h2>
            <p className="mx-auto max-w-xl text-sm leading-6 text-charcoal/70">
              Whether you're a creator building an audience or a brand scaling
              presence — pick a lane, book a call, we'll tailor the rest.
            </p>
          </div>
        </Reveal>

        {/* segment toggle */}
        <div className="mb-10 flex justify-center">
          <div className="inline-flex rounded-full border border-black/10 bg-paper p-1">
            {(["creator", "brand"] as Segment[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSegment(s)}
                aria-pressed={segment === s}
                data-testid={`pricing-toggle-${s}`}
                className={`rounded-full px-6 py-2 text-sm font-semibold capitalize transition-all duration-300 ${
                  segment === s
                    ? "bg-ink text-paper"
                    : "text-charcoal/60 hover:text-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {plans.map((plan, i) => (
            <PlanCard key={`${segment}-${plan.name}`} plan={plan} index={i} segment={segment} />
          ))}
        </div>

        {/* à-la-carte single projects */}
        <Reveal delay={0.1}>
          <div className="mt-14">
            <div className="mb-6 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-charcoal/50">
                Single projects
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
                Just need one thing?
              </h3>
              <p className="mt-2 text-sm text-charcoal/65">
                One-off work, priced per project. Indicative starting rates — final quote on a call.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.map((p) => (
                <a
                  key={p.name}
                  href={wa(`Hi Edibee, I'd like a quote for: ${p.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`pricing-project-${p.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-black/10 bg-paper px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/30"
                >
                  <span>
                    <span className="block text-sm font-semibold text-ink">{p.name}</span>
                    <span className="block text-xs text-charcoal/55">{p.from}</span>
                  </span>
                  <MessageCircle
                    className="h-4 w-4 flex-shrink-0 text-charcoal/40 transition-colors duration-300 group-hover:text-honey"
                    strokeWidth={2}
                  />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
