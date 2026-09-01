import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Reveal } from "./Reveal";

type Item = {
  name: string;
  category: string;
  video: string;
  poster: string;
  aspect: "portrait" | "landscape";
};

/* Six selected pieces — mixed portrait / landscape. Rename freely. */
const items: Item[] = [
  { name: "Rakhandar", category: "Devotional film", video: "/work/work-rakhandar.mp4", poster: "/work/work-rakhandar.jpg", aspect: "portrait" },
  { name: "Match Day", category: "Event coverage", video: "/work/work-football.mp4", poster: "/work/work-football.jpg", aspect: "landscape" },
  { name: "Origins", category: "Motion graphics", video: "/work/work-worldmap.mp4", poster: "/work/work-worldmap.jpg", aspect: "portrait" },
  { name: "Teaser Film", category: "Cinematic interview", video: "/work/work-treaser.mp4", poster: "/work/work-treaser.jpg", aspect: "landscape" },
  { name: "Summer Campaign", category: "Social reel", video: "/work/work-summer.mp4", poster: "/work/work-summer.jpg", aspect: "portrait" },
  { name: "Kinetic Titles", category: "Motion graphics", video: "/work/work-motion.mp4", poster: "/work/work-motion.jpg", aspect: "landscape" },
];

const aspectClass = (a: Item["aspect"]) =>
  a === "portrait" ? "aspect-[9/16]" : "aspect-video";

const portraits = items.filter((i) => i.aspect === "portrait");
const landscapes = items.filter((i) => i.aspect === "landscape");

function CtrlBtn({
  onClick,
  ariaLabel,
  testId,
  children,
}: {
  onClick: (e: React.MouseEvent) => void;
  ariaLabel: string;
  testId: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      data-testid={testId}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(e);
      }}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-honey hover:bg-honey hover:text-ink"
    >
      {children}
    </button>
  );
}

function VideoTile({ item }: { item: Item }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 768px)").matches,
  );
  const [active, setActive] = useState(false); // has playback been started
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const slug = item.name.toLowerCase().replace(/\s+/g, "-");

  // Play only while on screen (desktop); always pause when scrolled away.
  useEffect(() => {
    const el = wrapRef.current;
    const v = videoRef.current;
    if (!el || !v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!isMobile) {
            v.play().then(() => { setActive(true); setPlaying(true); }).catch(() => {});
          }
        } else {
          v.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isMobile]);

  const startOnTap = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play().then(() => { setActive(true); setPlaying(true); }).catch(() => {});
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <figure data-testid={`work-tile-${slug}`} className="group">
      <div
        ref={wrapRef}
        onClick={isMobile && !active ? startOnTap : undefined}
        className={`relative w-full overflow-hidden rounded-[14px] border border-black/5 bg-[#14160f] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:border-black/15 ${aspectClass(
          item.aspect,
        )}`}
      >
        <video
          ref={videoRef}
          src={item.video}
          poster={item.poster}
          loop
          muted
          playsInline
          preload="none"
          className="h-full w-full object-cover"
        />

        {/* tap-to-play badge (mobile, before first play) */}
        {isMobile && !active && (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-honey text-ink">
              <Play className="h-4 w-4 fill-ink" />
            </span>
          </span>
        )}

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-2.5">
          <span className="rounded-full bg-black/45 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.16em] text-white/90 backdrop-blur-md">
            {item.category}
          </span>
        </div>

        {active && (
          <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <CtrlBtn onClick={togglePlay} ariaLabel={playing ? "Pause video" : "Play video"} testId={`video-play-${slug}`}>
              {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            </CtrlBtn>
            <CtrlBtn onClick={toggleMute} ariaLabel={muted ? "Unmute video" : "Mute video"} testId={`video-mute-${slug}`}>
              {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            </CtrlBtn>
          </div>
        )}
      </div>

      <figcaption className="mt-3 flex items-baseline justify-between gap-3">
        <span className="font-display text-sm font-bold tracking-tightest text-[#14160f]">
          {item.name}
        </span>
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-honey" />
      </figcaption>
    </figure>
  );
}

export function Portfolio() {
  return (
    <section id="work" className="relative bg-paper px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-end">
          <Reveal y={20}>
            <span className="text-xs font-medium uppercase tracking-[0.32em] text-[#2c2c25]/55">
              ( Selected Work )
            </span>
            <h2
              className="mt-4 font-display font-extrabold leading-[0.92] tracking-tightest text-[#14160f]"
              style={{ fontSize: "clamp(2.2rem, 4.4vw, 3.8rem)" }}
            >
              Case studies,
              <br />
              not showreels<span className="text-honey">.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15} y={20} className="max-w-md md:justify-self-end md:pb-1">
            <p className="text-[14px] leading-relaxed text-[#2c2c25]/65 md:max-w-sm">
              Every project starts with a question — what does success look like?
              Here's what that looked like for a few brands we love.
            </p>
          </Reveal>
        </div>

        {/* Row 1 — vertical reels (9:16), kept phone-sized so the section stays compact */}
        <div className="mx-auto mt-12 grid max-w-[860px] grid-cols-2 gap-4 sm:grid-cols-3 md:mt-16 md:gap-5">
          {portraits.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.06} y={20}>
              <VideoTile item={item} />
            </Reveal>
          ))}
        </div>

        {/* Row 2 — landscape films (16:9) */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 md:mt-5 md:gap-5">
          {landscapes.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.06} y={20}>
              <VideoTile item={item} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} y={20}>
          <div className="mt-16 flex flex-col items-center gap-4 text-center md:mt-20">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#2c2c25]/55">
              The next case study could be yours
            </p>
            <a
              href="#contact"
              data-testid="work-cta-start"
              className="group inline-flex items-center justify-center rounded-full bg-[#14160f] px-8 py-3 text-[14px] font-semibold text-white transition-all duration-300 hover:bg-honey hover:text-[#14160f]"
            >
              Start a Project
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
