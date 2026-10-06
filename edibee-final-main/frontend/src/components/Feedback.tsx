import { useEffect, useState } from "react";
import { Star, Check, ArrowRight } from "lucide-react";
import { Wordmark } from "./Wordmark";
import { WEB3FORMS_KEY } from "../lib/web3forms";

/**
 * /feedback — phone-first, 3 taps + a name. Send clients the link; pre-fill with
 * /feedback?name=Rahul&brand=Acme so they don't even type that.
 * Submissions are emailed to you via Web3Forms (same key as the contact form).
 */
const TAGS = ["Great communication", "Creative ideas", "Fast delivery", "Premium quality", "Easy to work with"];
const param = (k: string) => new URLSearchParams(window.location.search).get(k) ?? "";

const input =
  "w-full rounded-xl border border-ink/15 bg-white/70 px-4 py-3.5 text-base text-ink outline-none placeholder:text-ink/35 focus:border-honey focus:ring-2 focus:ring-honey/40";

export function Feedback() {
  const [name, setName] = useState(() => param("name"));
  const [brand, setBrand] = useState(() => param("brand"));
  const [rating, setRating] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [bot, setBot] = useState(""); // honeypot
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    document.title = "Share your feedback — Edibee Media";
  }, []);

  const toggleTag = (t: string) =>
    setTags((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bot || !rating || !name.trim() || state === "sending") return;
    setState("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New client feedback — ${rating}/5 from ${name}`,
          from_name: "Edibee feedback page",
          name,
          brand,
          rating: `${rating}/5`,
          liked: tags.join(", "),
          message,
        }),
      });
      const data = await res.json();
      setState(data.success ? "sent" : "error");
    } catch {
      setState("error");
    }
  };

  return (
    <main className="min-h-[100svh] bg-offwhite px-5 py-10 sm:py-16">
      <div className="mx-auto max-w-lg">
        <a
          href="/"
          aria-label="Edibee Media home"
          className="block text-center font-king-rounded leading-none tracking-[-0.02em] text-ink"
          style={{ fontSize: "3.25rem" }}
        >
          <Wordmark />
        </a>

        {state === "sent" ? (
          <div className="mt-12 rounded-[24px] border border-ink/10 bg-paper/60 p-8 text-center" data-testid="feedback-thanks">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-honey text-ink">
              <Check className="h-7 w-7" strokeWidth={3} />
            </span>
            <h1 className="mt-6 font-display text-3xl font-bold tracking-tightest text-ink">
              Thank you{name ? `, ${name.split(" ")[0]}` : ""}<span className="text-honey">.</span>
            </h1>
            <p className="mt-3 text-base leading-relaxed text-ink/70">
              Your feedback genuinely means a lot to us.
            </p>
            <a href="/" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-honey">
              Back to edibee <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        ) : (
          <>
            <h1 className="mt-10 text-center font-display text-3xl font-bold leading-tight tracking-tightest text-ink sm:text-4xl">
              How was working with us<span className="text-honey">?</span>
            </h1>
            <p className="mt-3 text-center text-base text-ink/65">
              Takes under a minute. Tap a star, add a line if you like.
            </p>

            <form onSubmit={submit} className="mt-8 space-y-6 rounded-[24px] border border-ink/10 bg-paper/60 p-5 sm:p-8" data-testid="feedback-form">
              <div>
                <div role="radiogroup" aria-label="Rating" className="flex justify-center">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      role="radio"
                      aria-checked={rating === n}
                      aria-label={`${n} star${n > 1 ? "s" : ""}`}
                      onClick={() => setRating(n)}
                      className="p-1.5 transition-transform active:scale-90"
                    >
                      <Star
                        className={`h-11 w-11 transition-colors sm:h-12 sm:w-12 ${
                          n <= rating ? "fill-honey text-honey" : "text-ink/25"
                        }`}
                        strokeWidth={1.5}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2.5 text-sm font-medium text-ink/70">What stood out? (tap any)</p>
                <div className="flex flex-wrap gap-2">
                  {TAGS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={tags.includes(t)}
                      onClick={() => toggleTag(t)}
                      className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
                        tags.includes(t)
                          ? "border-ink bg-ink text-honey"
                          : "border-ink/20 bg-white/60 text-ink/75"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="In a line or two — how did it feel working with us? (optional)"
                className={`${input} resize-none`}
                data-testid="feedback-message"
              />

              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  placeholder="Your name *"
                  className={input}
                  data-testid="feedback-name"
                />
                <input
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  autoComplete="organization"
                  placeholder="Brand / company"
                  className={input}
                />
              </div>

              {/* honeypot — hidden from real users */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={bot}
                onChange={(e) => setBot(e.target.value)}
                className="hidden"
                aria-hidden="true"
              />

              <button
                type="submit"
                disabled={!rating || !name.trim() || state === "sending"}
                data-testid="feedback-submit"
                className="w-full rounded-full bg-ink py-4 text-base font-semibold text-honey transition-colors hover:bg-honey hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
              >
                {state === "sending" ? "Sending…" : rating ? "Send feedback" : "Tap a star to continue"}
              </button>
              <p className="text-center text-xs text-ink/50">
                By sending, you agree your feedback may appear on our website.
              </p>
              {state === "error" && (
                <p className="text-center text-sm text-red-700" role="alert">
                  Something went wrong — please try again.
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </main>
  );
}
