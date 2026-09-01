import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Instagram, MessageCircle } from "lucide-react";
import { Reveal } from "./Reveal";

const EMAIL = "edibee.grow@gmail.com";
const PHONE_DISPLAY = "+91 97663 58698";
const PHONE_TEL = "+919766358698";
const INSTAGRAM = "https://www.instagram.com/edibee.media/";
const WHATSAPP =
  "https://wa.me/919766358698?text=Hi%20Edibee%2C%20I%27d%20like%20to%20discuss%20a%20project.";

export function Footer() {
  return (
    <footer id="contact" className="bg-ink px-4 py-10 md:px-6 md:py-14">
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
                className="font-king-rounded leading-[0.78] tracking-[-0.03em] text-honey"
                style={{ fontSize: "clamp(4.5rem, 13vw, 13rem)" }}
                data-testid="footer-wordmark"
              >
                edi<span className="font-king-light">Bee</span>
              </motion.h2>
              <Reveal delay={0.2} y={20}>
                <p
                  className="mt-4 font-display italic text-ink/80"
                  style={{ fontSize: "clamp(1rem, 1.4vw, 1.4rem)" }}
                >
                  Ideas create impact.
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

              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-whatsapp"
                className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-ink/70 transition-colors duration-300 hover:text-ink"
              >
                <MessageCircle className="h-3.5 w-3.5" strokeWidth={2} />
                or message us on WhatsApp
              </a>
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
                href={`mailto:${EMAIL}`}
                className="mt-2 block font-medium text-ink transition-colors duration-300 hover:text-honey"
                data-testid="footer-email"
              >
                {EMAIL}
              </a>
              <a
                href={`tel:${PHONE_TEL}`}
                className="mt-1 block transition-colors duration-300 hover:text-honey"
                data-testid="footer-phone"
              >
                {PHONE_DISPLAY}
              </a>
            </div>

            {/* Follow */}
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/45">
                Follow
              </span>
              <div className="mt-2 flex gap-2.5">
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  data-testid="footer-social-instagram"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/12 text-ink/60 transition-all duration-300 hover:scale-105 hover:border-ink hover:bg-ink hover:text-honey"
                >
                  <Instagram className="h-3.5 w-3.5" strokeWidth={1.8} />
                </a>
              </div>
              <p className="mt-2">@edibee.media</p>
            </div>

            {/* Chat */}
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/45">
                Chat
              </span>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block font-medium text-ink transition-colors duration-300 hover:text-honey"
              >
                WhatsApp us
              </a>
            </div>

            {/* Copyright */}
            <div className="md:text-right">
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/45">
                © {new Date().getFullYear()}
              </span>
              <p className="mt-2 font-medium text-ink">Edibee Media</p>
              <a
                href="/privacy.html"
                className="mt-1 block transition-colors duration-300 hover:text-honey"
              >
                Privacy
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  Inline contact form — Web3Forms (emails submissions to us)  */
/* ─────────────────────────────────────────────────────────── */
const WEB3FORMS_KEY =
  (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined) ??
  "27ccc7b7-c021-43c0-934c-36d87d38f139";

type FormState = "idle" | "sending" | "sent" | "error";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [botcheck, setBotcheck] = useState(""); // honeypot
  const [state, setState] = useState<FormState>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || state === "sending") return;
    if (botcheck) return; // bot filled the honeypot

    setState("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New project enquiry${name ? ` — ${name}` : ""}`,
          from_name: "Edibee website",
          name,
          email,
          message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setState("sent");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  };

  const label =
    state === "sending"
      ? "Sending…"
      : state === "sent"
        ? "Sent — we'll be in touch"
        : state === "error"
          ? "Something went wrong — retry"
          : "Send enquiry";

  return (
    <form
      onSubmit={handleSubmit}
      data-testid="footer-contact-form"
      className="mt-7 space-y-4"
    >
      <Field label="Name" testId="footer-name" value={name} onChange={setName} type="text" />
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

      {/* honeypot — hidden from real users */}
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        value={botcheck}
        onChange={(e) => setBotcheck(e.target.value)}
        className="hidden"
        aria-hidden="true"
      />

      <button
        type="submit"
        disabled={state === "sending"}
        data-testid="footer-submit"
        className="group mt-2 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-honey transition-all duration-300 hover:bg-honey hover:text-ink disabled:opacity-60"
      >
        {label}
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
