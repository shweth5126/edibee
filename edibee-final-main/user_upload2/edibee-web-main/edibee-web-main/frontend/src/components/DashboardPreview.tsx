import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Folder,
  FileVideo,
  Image as ImageIcon,
  CalendarClock,
  RefreshCw,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Reveal } from "./Reveal";

const projects = [
  { name: "Brand Film — Vela", progress: 82, status: "In Review" },
  { name: "Product Launch — Lumière", progress: 64, status: "Editing" },
  { name: "Social Pack — Apex", progress: 100, status: "Delivered" },
];

const deliverables = [
  { label: "Hero Film (60s)", icon: FileVideo, state: "Approved" },
  { label: "6x Cutdowns", icon: FileVideo, state: "In Review" },
  { label: "12x Stills", icon: ImageIcon, state: "Approved" },
  { label: "Motion Graphics", icon: RefreshCw, state: "Revising" },
];

const timeline = [
  { label: "Discovery", done: true },
  { label: "Pre-production", done: true },
  { label: "Production", done: true },
  { label: "Edit", done: false, active: true },
  { label: "Delivery", done: false },
];

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let frame = 0;
    const duration = 1100;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(to * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}

export function DashboardPreview() {
  return (
    <section className="relative bg-offwhite px-6 py-16 md:px-10 md:pb-20 md:pt-24">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-[0.32em] text-charcoal/50">
              ( Client Portal )
            </span>
            <h2
              className="mt-5 font-display font-extrabold leading-[0.9] tracking-tightest text-ink"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 5.5rem)" }}
            >
              See everything,
              <br />
              in one place<span className="text-honey">.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="max-w-sm md:-mt-5">
            <p className="text-base leading-relaxed text-charcoal/60">
              Every project, deliverable and deadline — visible in real time.
              Calm, transparent, always up to date.
            </p>
          </Reveal>
        </div>

        <motion.div
          className="mt-4 md:-mt-7"
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.97,
            boxShadow: "0 24px 80px -56px rgba(15,17,12,0.08)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
            boxShadow: "0 42px 150px -72px rgba(15,17,12,0.24)",
          }}
          viewport={{ once: true, margin: "-14% 0px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="overflow-hidden rounded-[32px] border border-black/8 bg-[#fcfcf8]">
            {/* top bar */}
            <div className="flex items-center justify-between border-b border-[#f3d111]/20 bg-paper/60 px-6 py-4 md:px-8">
              <div className="flex items-center gap-2.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex items-center gap-2 rounded-full bg-ink/5 px-4 py-1.5 text-xs font-medium text-charcoal/60">
                <span className="h-1.5 w-1.5 rounded-full bg-honey" />
                studio.edibee.co / dashboard
              </div>
              <span className="hidden text-xs font-medium text-charcoal/40 md:block">
                Updated 2m ago
              </span>
            </div>

            <div className="grid gap-px bg-black/5 md:grid-cols-12">
              {/* Project progress */}
              <div className="bg-[#fcfcf8] p-6 md:col-span-7 md:p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <Folder className="h-4 w-4 text-honey" />
                    Project Progress
                  </div>
                  <span className="text-xs font-medium text-charcoal/40">
                    3 active
                  </span>
                </div>
                <div className="mt-6 space-y-5">
                  {projects.map((p, index) => (
                    <div key={p.name}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-ink">{p.name}</span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                            p.progress === 100
                              ? "bg-ink/5 text-charcoal/60"
                              : "bg-honey/20 text-gold"
                          }`}
                        >
                          {p.status}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/8">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${p.progress}%` }}
                            viewport={{ once: true }}
                            transition={{
                              delay: 0.2 + index * 0.08,
                              duration: 1.2,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className={`h-full rounded-full ${
                              p.progress === 100 ? "bg-ink" : "bg-honey"
                            }`}
                          />
                        </div>
                        <span className="w-9 text-right text-xs font-semibold tabular-nums text-charcoal/60">
                          {p.progress}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables + assets */}
              <div className="bg-[#fcfcf8] p-6 md:col-span-5 md:p-8">
                <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <FileVideo className="h-4 w-4 text-honey" />
                  Deliverables
                </div>
                <div className="mt-5 space-y-3">
                  {deliverables.map((d, index) => (
                    <motion.div
                      key={d.label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.12 + index * 0.07,
                        duration: 0.55,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="flex items-center justify-between rounded-xl border border-[#f3d111]/20 bg-offwhite px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <d.icon className="h-4 w-4 text-charcoal/50" />
                        <span className="text-sm font-medium text-ink">
                          {d.label}
                        </span>
                      </div>
                      <span
                        className={`flex items-center gap-1 text-[11px] font-semibold ${
                          d.state === "Approved"
                            ? "text-emerald-600"
                            : d.state === "Revising"
                            ? "text-gold"
                            : "text-charcoal/50"
                        }`}
                      >
                        {d.state === "Approved" ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : (
                          <Clock className="h-3 w-3" />
                        )}
                        {d.state}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-[#fcfcf8] p-6 md:col-span-7 md:p-8">
                <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <CalendarClock className="h-4 w-4 text-honey" />
                  Timeline
                </div>
                <div className="mt-6 flex items-center justify-between">
                  {timeline.map((t, i) => (
                    <div key={t.label} className="flex flex-1 items-center">
                      <div className="flex flex-col items-center gap-2">
                        <motion.span
                          initial={{ opacity: 0, scale: 0.82, y: 8 }}
                          whileInView={{ opacity: 1, scale: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.16 + i * 0.08,
                            duration: 0.5,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ${
                            t.done
                              ? "bg-ink text-white"
                              : t.active
                              ? "bg-honey text-ink ring-4 ring-honey/25"
                              : "bg-ink/8 text-charcoal/40"
                          }`}
                        >
                          {t.done ? "✓" : i + 1}
                        </motion.span>
                        <span
                          className={`text-[10px] font-medium ${
                            t.active ? "text-ink" : "text-charcoal/45"
                          }`}
                        >
                          {t.label}
                        </span>
                      </div>
                      {i < timeline.length - 1 && (
                        <motion.div
                          initial={{ scaleX: 0, opacity: 0 }}
                          whileInView={{ scaleX: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.22 + i * 0.08,
                            duration: 0.55,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className={`mx-1 h-px flex-1 ${
                            t.done ? "bg-ink/40" : "bg-ink/10"
                          }`}
                          style={{ transformOrigin: "left center" }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats: assets + revisions */}
              <div className="grid grid-cols-2 gap-px bg-black/5 md:col-span-5 md:grid-cols-1">
                <div className="bg-[#fcfcf8] p-6 md:p-8">
                  <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <ImageIcon className="h-4 w-4 text-honey" />
                    Assets
                  </div>
                  <p
                    className="mt-3 font-display font-extrabold tracking-tightest text-ink"
                    style={{ fontSize: "clamp(2rem,4vw,3rem)" }}
                  >
                    <CountUp to={248} />
                  </p>
                  <p className="text-xs text-charcoal/50">files delivered</p>
                </div>
                <div className="bg-[#fcfcf8] p-6 md:p-8">
                  <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <RefreshCw className="h-4 w-4 text-honey" />
                    Revisions
                  </div>
                  <p
                    className="mt-3 font-display font-extrabold tracking-tightest text-ink"
                    style={{ fontSize: "clamp(2rem,4vw,3rem)" }}
                  >
                    <CountUp to={3} /><span className="text-charcoal/30">/5</span>
                  </p>
                  <p className="text-xs text-charcoal/50">this cycle</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
