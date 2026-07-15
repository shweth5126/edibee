import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Reveal } from "./Reveal";

type Plan = {
  name: string;
  price: string;
  description: string;
  featured: boolean;
  features: string[];
};

const plans: Plan[] = [
  {
    name: "Launch",
    price: "₹8,000",
    description: "A sharp starting point for brands that need momentum.",
    featured: false,
    features: ["1 Shoot Day", "4 Reels", "3 Graphics", "5 Stories", "Monthly Report"],
  },
  {
    name: "Elevate",
    price: "₹16,000",
    description: "Our most popular growth partnership for sustained visibility.",
    featured: true,
    features: [
      "Branding Kit",
      "2 Shoot Days",
      "7 Reels",
      "6 Graphics",
      "8 Stories",
      "Strategy Call",
    ],
  },
  {
    name: "Dominate",
    price: "₹25,000",
    description: "A full-service partnership built for larger campaigns.",
    featured: false,
    features: [
      "Advanced Branding",
      "3 Shoot Days",
      "10 Reels",
      "12 Stories",
      "Campaign Planning",
      "Analytics Dashboard",
    ],
  },
];

function PricingCard({ plan, index }: { plan: Plan; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: index === 0 ? -2 : index === 1 ? 0 : 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -10, scale: 1.01 }}
      className={`relative overflow-hidden rounded-[32px] border transition-all duration-500 ${
        plan.featured
          ? "border-honey bg-ink shadow-[0_0_60px_rgba(243,209,17,.25)]"
          : "border-black/10 bg-paper"
      }`}
    >
      {plan.featured && (
        <div className="absolute right-5 top-5 rounded-full bg-honey px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink">
          Most Popular
        </div>
      )}

      <div className="p-8 md:p-10">
        <p
          className={`mb-3 text-xs uppercase tracking-[0.35em] ${
            plan.featured ? "text-honey" : "text-charcoal/50"
          }`}
        >
          {plan.name}
        </p>

        <h3
          className={`font-display text-5xl leading-none tracking-tight md:text-6xl ${
            plan.featured ? "text-paper" : "text-ink"
          }`}
        >
          {plan.price}
        </h3>

        <p className={`mt-4 text-sm leading-6 ${plan.featured ? "text-paper/70" : "text-charcoal/70"}`}>
          {plan.description}
        </p>

        <div className={`my-8 h-px ${plan.featured ? "bg-paper/20" : "bg-black/10"}`} />

        <div className="space-y-4">
          {plan.features.map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <div className={`flex h-7 w-7 items-center justify-center rounded-full ${plan.featured ? "bg-honey" : "bg-ink"}`}>
                <Check className={`h-4 w-4 ${plan.featured ? "text-ink" : "text-paper"}`} strokeWidth={2.2} />
              </div>
              <span className={plan.featured ? "text-paper" : "text-charcoal"}>{feature}</span>
            </div>
          ))}
        </div>

        <a
          href="#contact"
          className={`mt-10 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ${
            plan.featured
              ? "bg-honey text-ink hover:scale-[1.01]"
              : "bg-ink text-paper hover:bg-honey hover:text-ink"
          }`}
        >
          Get Started
        </a>
      </div>
    </motion.div>
  );
}

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-offwhite px-6 py-24 md:px-10 md:py-28"
      style={{
        background:
          "radial-gradient(circle at top, rgba(243,209,17,0.12), transparent 45%), #f3edd9",
      }}
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-charcoal/50">
                Pricing
              </p>
              <h2 className="font-display leading-[0.88] tracking-[-0.05em] text-ink" style={{ fontSize: "clamp(2.8rem, 5vw, 4.6rem)" }}>
                Choose your
                <br />
                growth partner.
              </h2>
            </div>

            <p className="max-w-md text-lg leading-relaxed text-charcoal/70">
              Every package is built around strategy, production, and marketing—not just content creation.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
