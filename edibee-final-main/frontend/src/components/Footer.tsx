import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Instagram, Linkedin, Youtube } from "lucide-react";
import { Reveal } from "./Reveal";

export function Footer() {
  return (
    <footer id="contact" className="bg-ink px-4 py-10 md:px-6 md:py-14">
      {/* The single rounded "card" — MATRE-inspired but personalised for Edibee */}
      <Reveal y={30}>
        <div
          className="relative mx-auto max-w-[1500px] overflow-hidden rounded-[32px] border border-honey/15 px-6 pt-10 pb-6 md:px-12 md:pt-16 md:pb-10"
          style={{
            background:
              "radial-gradient(120% 80% at 0% 100%, rgba(243,209,17,0.10) 0%, transparent 55%), #f1ead5",
          }}
        >
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            {/* ── LEFT — oversized wordmark ─────────────────────── */}
            <div className="relative md:col-span-7 overflow-hidden">
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-extrabold leading-[0.78] tracking-[-0.06em] text-honey"
                style={{ fontSize: "clamp(4.5rem, 13vw, 13rem)" }}
                data-testid="footer-wordmark"
              >
                EDIBEE
              </motion.h2>
              <Reveal delay={0.2} y={20}>
                <p
                  className="mt-4 font-display italic text-ink/80"
                  style={{ fontSize: "clamp(1rem, 1.4vw, 1.4rem)" }}
                >
                  Created for attention.
                </p>
              </Reveal>
            </div>

            {/* ── RIGHT — Let's connect contact form ────────────── */}
            <div className="md:col-span-5 md:pl-2">
              <Reveal delay={0.1} y={20}>
                <span
                  data-testid="footer-form-eyebrow"
                  className="text-[10px] font-semibold uppercase tracking-[0.32em] text-ink/55"
                >
                  ( Let's connect )
                </span>
                <h3
                  className="mt-3 font-display font-extrabold leading-[0.95] tracking-tightest text-ink"
                  style={{ fontSize: "clamp(1.5rem, 2.2vw, 2.2rem)" }}
                >
                  Start a project,
                  <br />
                  start a conversation<span className="text-honey">.</span>
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/65">
                  Tell us a little about your brand and we'll get back within 24
                  hours.
                </p>
              </Reveal>

              <ContactForm />
            </div>
          </div>

          {/* ── Bottom row: contact / socials / copy ───────────── */}
          <div className="mt-12 grid grid-cols-2 gap-6 border-t border-ink/8 pt-6 text-[12px] text-ink/55 md:mt-16 md:grid-cols-4 md:pt-7">
            {/* Studio */}
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/45">
                Studio
              </span>
              <a
                href="mailto:hello@edibee.co"
                className="mt-2 block font-medium text-ink transition-colors duration-300 hover:text-honey"
                data-testid="footer-email"
              >
                hello@edibee.co
              </a>
              <p className="mt-1">Goa · Remote worldwide</p>
            </div>

            {/* Follow */}
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/45">
                Follow
              </span>
              <div className="mt-2 flex gap-2.5">
                {[
                  { label: "Instagram", icon: Instagram },
                  { label: "LinkedIn", icon: Linkedin },
                  { label: "YouTube", icon: Youtube },
                ].map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={s.label}
                    data-testid={`footer-social-${s.label.toLowerCase()}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/12 text-ink/60 transition-all duration-300 hover:scale-105 hover:border-ink hover:bg-ink hover:text-honey"
                  >
                    <s.icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                  </a>
                ))}
              </div>
            </div>

            {/* Language placeholder column */}
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/45">
                Language
              </span>
              <p className="mt-2 font-medium text-ink">English</p>
              <p className="mt-1 text-ink/45">हिन्दी (soon)</p>
            </div>

            {/* Copyright */}
            <div className="md:text-right">
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/45">
                © {new Date().getFullYear()}
              </span>
              <p className="mt-2 font-medium text-ink">Edibee Studio</p>
              <p className="mt-1">Crafted with intent</p>
            </div>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  Inline minimal contact form                                 */
/* ─────────────────────────────────────────────────────────── */
function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Open the user's mail client with prefilled content
    const subject = encodeURIComponent(
      `Project enquiry${name ? ` — ${name}` : ""}`,
    );
    const body = encodeURIComponent(
      `${message}\n\n— ${name || "—"}\nReply to: ${email}`,
    );
    window.location.href = `mailto:hello@edibee.co?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-testid="footer-contact-form"
      className="mt-7 space-y-4"
    >
      <Field
        label="Name"
        testId="footer-name"
        value={name}
        onChange={setName}
        type="text"
      />
      <Field
        label="Email"
        testId="footer-email-input"
        value={email}
        onChange={setEmail}
        type="email"
        required
      />
      <Field
        label="What's the project?"
        testId="footer-message"
        value={message}
        onChange={setMessage}
        type="text"
      />

      <button
        type="submit"
        data-testid="footer-submit"
        className="group mt-2 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-honey transition-all duration-300 hover:bg-honey hover:text-ink"
      >
        {sent ? "Sent — we'll be in touch" : "Send enquiry"}
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  testId,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  testId: string;
}) {
  return (
    <label className="group relative block">
      <span className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/45 transition-colors duration-300 group-focus-within:text-ink">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        data-testid={testId}
        className="w-full border-0 border-b border-ink/15 bg-transparent py-1.5 font-display text-lg text-ink placeholder-ink/30 outline-none transition-colors duration-300 focus:border-honey md:text-xl"
        placeholder=""
      />
    </label>
  );
}
