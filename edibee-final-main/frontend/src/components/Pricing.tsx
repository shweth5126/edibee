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
    description: "Perfect for businesses getting started.",
    featured: false,
    features: ["1 Shoot Day", "4 Reels", "3 Graphics", "5 Stories", "Monthly Report"],
  },
  {
    name: "Elevate",
    price: "₹16,000",
    description: "Our most popular growth package.",
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
    description: "Built for brands ready to scale.",
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
      className={`relative overflow-hidden rounded-[28px] border transition-all duration-500 ${
        plan.featured
          ? "border-honey/30 bg-ink/95 shadow-[0_18px_40px_rgba(20,22,15,0.12)]"
          : "border-black/10 bg-paper"
      }`}
    >
      {plan.featured && (
        <div className="absolute right-5 top-5 rounded-full bg-honey/95 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink shadow-sm">
          Most Popular
        </div>
      )}

      <div className="p-6">
        <p className={`mb-4 text-[10px] uppercase tracking-[0.35em] ${plan.featured ? "text-honey" : "text-charcoal/60"}`}>
          {plan.name}
        </p>

        <div className="flex items-end gap-3">
          <h3 className={`font-display text-3xl tracking-tight md:text-4xl ${plan.featured ? "text-paper" : "text-ink"}`}>
            {plan.price}
          </h3>
          <span className="pb-1 text-sm text-charcoal/60">/month</span>
        </div>

        <p className={`mt-3 text-sm leading-6 ${plan.featured ? "text-paper/70" : "text-charcoal/70"}`}>
          {plan.description}
        </p>

        <div className={`my-6 h-px ${plan.featured ? "bg-paper/20" : "bg-black/10"}`} />

        <div className="space-y-3">
          {plan.features.map((feature) => (
            <div key={feature} className="flex items-start gap-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${plan.featured ? "bg-honey" : "bg-ink"}`}>
                <Check className={`h-4 w-4 ${plan.featured ? "text-ink" : "text-paper"}`} strokeWidth={2.2} />
              </div>
              <span className={`text-sm ${plan.featured ? "text-paper" : "text-charcoal"}`}>{feature}</span>
            </div>
          ))}
        </div>

        <a
          href="#contact"
          className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition duration-300 ${
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
      className="relative overflow-hidden bg-offwhite px-6 py-10 md:px-10 md:py-14"
      style={{
        background:
          "radial-gradient(circle at top, rgba(243,209,17,0.12), transparent 45%), #f3edd9",
      }}
    >
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="mb-10 space-y-4">
            <p className="text-[10px] uppercase tracking-[0.35em] text-charcoal/50">
              GROWTH PACKAGES
            </p>

            <h2 className="font-display text-4xl leading-tight tracking-[-0.03em] text-ink md:text-5xl">
              Simple packages.
              <span className="text-honey"> Real growth.</span>
            </h2>

            <p className="max-w-xl text-sm leading-6 text-charcoal/70">
              Choose the partnership that fits your business.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
