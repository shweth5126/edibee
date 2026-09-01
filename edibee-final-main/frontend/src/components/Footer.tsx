import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Instagram, MessageCircle, Mail, Phone } from "lucide-react";
import { Reveal } from "./Reveal";
import { Wordmark } from "./Wordmark";

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
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            {/* ── LEFT — wordmark + contact details ─────────────── */}
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-ink/50">
                ( Let's connect )
              </span>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="mt-3 font-king-rounded leading-[0.85] tracking-[-0.03em] text-honey"
                style={{ fontSize: "clamp(3.2rem, 9vw, 6.5rem)" }}
                data-testid="footer-wordmark"
              >
                <Wordmark />
              </motion.div>
              <p
                className="mt-3 font-display italic text-ink/75"
                style={{ fontSize: "clamp(1rem, 1.3vw, 1.3rem)" }}
              >
                Ideas create impact.
              </p>

              <div className="mt-8 flex flex-col gap-3 text-sm">
                <a
                  href={`mailto:${EMAIL}`}
                  data-testid="footer-email"
                  className="inline-flex items-center gap-2.5 font-medium text-ink transition-colors duration-300 hover:text-honey"
                >
                  <Mail className="h-4 w-4 text-ink/45" strokeWidth={1.8} />
                  {EMAIL}
                </a>
                <a
                  href={`tel:${PHONE_TEL}`}
                  data-testid="footer-phone"
                  className="inline-flex items-center gap-2.5 font-medium text-ink transition-colors duration-300 hover:text-honey"
                >
                  <Phone className="h-4 w-4 text-ink/45" strokeWidth={1.8} />
                  {PHONE_DISPLAY}
                </a>
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="footer-social-instagram"
                  className="inline-flex items-center gap-2.5 font-medium text-ink transition-colors duration-300 hover:text-honey"
                >
                  <Instagram className="h-4 w-4 text-ink/45" strokeWidth={1.8} />
                  @edibee.media
                </a>
              </div>
            </div>

            {/* ── RIGHT — contact form ─────────────────────────── */}
            <div className="rounded-[24px] border border-ink/10 bg-paper/50 p-6 md:p-8">
              <Reveal delay={0.1} y={20}>
                <h3
                  className="font-display font-extrabold leading-[0.95] tracking-tightest text-ink"
                  style={{ fontSize: "clamp(1.5rem, 2.2vw, 2.2rem)" }}
                >
                  Start a project,
                  <br />
                  start a conversation<span className="text-honey">.</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">
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

          {/* ── Bottom bar ───────────────────────────────────── */}
          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-ink/10 pt-6 text-[12px] text-ink/55 sm:flex-row md:mt-14">
            <span>© {new Date().getFullYear()} Edibee Media</span>
            <a
              href="/privacy.html"
              className="transition-colors duration-300 hover:text-ink"
            >
              Privacy Policy
            </a>
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
