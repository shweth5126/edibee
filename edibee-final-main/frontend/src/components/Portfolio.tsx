import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Plus, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";

/* ──────────────────────────────────────────────────────────────────── */
/*  Types                                                               */
/* ──────────────────────────────────────────────────────────────────── */
type AspectRatio = "9/16" | "16/9";

type VideoItem = {
  kind: "video";
  name: string;
  video: string;
  poster: string;
  aspect: AspectRatio;
};

type PlaceholderItem = {
  kind: "placeholder";
  line: string;
  hint: string;
  aspect: AspectRatio;
};

type Item = VideoItem | PlaceholderItem;

/* ──────────────────────────────────────────────────────────────────── */
/*  Data                                                                */
/* ──────────────────────────────────────────────────────────────────── */
const rakhandar: VideoItem = {
  kind: "video",
  name: "Rakhandar",
  video: "/work/work-2.mp4",
  poster: "/portfolio/project-2.jpg",
  aspect: "9/16",
};

const goaTourism: VideoItem = {
  kind: "video",
  name: "Goa Tourism",
  video: "/work/work-1.mp4",
  poster: "/portfolio/project-6.jpg",
  aspect: "16/9",
};

const northwindLabs: VideoItem = {
  kind: "video",
  name: "Northwind Labs",
  video: "/work/work-4.mp4",
  poster: "/portfolio/project-4.jpg",
  aspect: "16/9",
};

const aetherWatches: VideoItem = {
  kind: "video",
  name: "Aether Watches",
  video: "/work/work-1.mp4",
  poster: "/portfolio/project-1.jpg",
  aspect: "9/16",
};

const mevasCafe: VideoItem = {
  kind: "video",
  name: "Mevas Cafe",
  video: "/work/work-3.mp4",
  poster: "/portfolio/project-5.jpg",
  aspect: "16/9",
};

const lumiereBeauty: VideoItem = {
  kind: "video",
  name: "Lumiere Beauty",
  video: "/work/work-3.mp4",
  poster: "/portfolio/project-3.jpg",
  aspect: "9/16",
};

const goaLifestyle: VideoItem = {
  kind: "video",
  name: "Goa Lifestyle",
  video: "/work/work-1.mp4",
  poster: "/portfolio/project-6.jpg",
  aspect: "16/9",
};

const goaTourism2: VideoItem = {
  kind: "video",
  name: "Goa Tourism 2",
  video: "/work/work-1.mp4",
  poster: "/portfolio/project-6.jpg",
  aspect: "16/9",
};

const placeholderStory: PlaceholderItem = {
  kind: "placeholder",
  line: "Your story comes here.",
  hint: "Editorial film · brand identity",
  aspect: "16/9",
};

const placeholderLaunch: PlaceholderItem = {
  kind: "placeholder",
  line: "Your launch comes here.",
  hint: "Hero film · go-to-market",
  aspect: "16/9",
};

const placeholderCampaign: PlaceholderItem = {
  kind: "placeholder",
  line: "Your campaign comes here.",
  hint: "Always-on social · paid creative",
  aspect: "16/9",
};

/* ──────────────────────────────────────────────────────────────────── */
/*  Tile aspect helper                                                  */
/* ──────────────────────────────────────────────────────────────────── */
const aspectClass = (a: AspectRatio) =>
  a === "9/16" ? "aspect-[9/16]" : "aspect-[16/7.9]";

/* ──────────────────────────────────────────────────────────────────── */
/*  Control button                                                      */
/* ──────────────────────────────────────────────────────────────────── */
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
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-honey hover:text-ink hover:border-honey"
    >
      {children}
    </button>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/*  Video tile                                                          */
/* ──────────────────────────────────────────────────────────────────── */
function VideoTile({ item }: { item: VideoItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

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

  const slug = item.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div
      data-testid={`work-tile-${slug}`}
      className={`group relative block w-full overflow-hidden rounded-[16px] border border-white/5 bg-[#14160f] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-white/15 ${aspectClass(item.aspect)}`}
    >
      <video
        ref={videoRef}
        src={item.video}
        poster={item.poster}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      />
      <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
        <CtrlBtn
          onClick={togglePlay}
          ariaLabel={playing ? "Pause video" : "Play video"}
          testId={`video-play-${slug}`}
        >
          {playing ? (
            <Pause className="h-3.5 w-3.5" />
          ) : (
            <Play className="h-3.5 w-3.5" />
          )}
        </CtrlBtn>
        <CtrlBtn
          onClick={toggleMute}
          ariaLabel={muted ? "Unmute video" : "Mute video"}
          testId={`video-mute-${slug}`}
        >
          {muted ? (
            <VolumeX className="h-3.5 w-3.5" />
          ) : (
            <Volume2 className="h-3.5 w-3.5" />
          )}
        </CtrlBtn>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/*  Placeholder tile                                                    */
/* ──────────────────────────────────────────────────────────────────── */
function PlaceholderTile({ item }: { item: PlaceholderItem }) {
  const slug = item.line
    .toLowerCase()
    .replace(/[^a-z]+/g, "-")
    .replace(/^-|-$/g, "");

  return (
    <a
      href="#contact"
      data-testid={`work-placeholder-${slug}`}
      className={`group relative block w-full overflow-hidden rounded-[16px] transition-all duration-500 hover:-translate-y-1 ${aspectClass(item.aspect)}`}
      style={{
        background:
          "linear-gradient(135deg, rgba(243,209,17,0.04) 0%, rgba(15,17,12,0.03) 100%)",
        border: "1px dashed rgba(15,17,12,0.18)",
      }}
    >
      {/* subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.14] transition-opacity duration-500 group-hover:opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,17,12,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(15,17,12,0.18) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 65% 55% at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 65% 55% at 50% 50%, black 30%, transparent 80%)",
        }}
      />
      {/* honey halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(243,209,17,0.16) 0%, rgba(243,209,17,0) 65%)",
          filter: "blur(28px)",
        }}
      />

      <div className="relative flex h-full w-full flex-col justify-between p-4">
        <div className="flex items-start justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#14160f]/12 bg-paper/60 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.22em] text-[#2c2c25]/55 backdrop-blur-sm">
            <Sparkles className="h-2.5 w-2.5 text-honey" />
            Open Slot
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#14160f]/12 bg-paper/40 text-[#2c2c25]/55 backdrop-blur-sm transition-all duration-300 group-hover:bg-[#14160f] group-hover:text-white group-hover:border-[#14160f]">
            <Plus className="h-3.5 w-3.5" />
          </span>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold leading-tight tracking-tightest text-[#14160f]/85 md:text-xl">
            {item.line}
          </h3>
          <p className="mt-1 text-[11px] font-medium text-[#2c2c25]/55">
            {item.hint}
          </p>
        </div>
      </div>
    </a>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/*  Tile renderer                                                       */
/* ──────────────────────────────────────────────────────────────────── */
function Tile({ item }: { item: Item }) {
  return item.kind === "video" ? (
    <VideoTile item={item} />
  ) : (
    <PlaceholderTile item={item} />
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/*  Portfolio section                                                   */
/* ──────────────────────────────────────────────────────────────────── */
export function Portfolio() {
  return (
    <section
      id="work"
      className="relative bg-paper px-6 pt-10 pb-12 md:px-10 md:pt-14 md:pb-16"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-end">
          <Reveal y={20}>
            <span className="text-xs font-medium uppercase tracking-[0.32em] text-[#2c2c25]/55">
              ( Selected Work )
            </span>
            <h2
              className="mt-3 font-display font-extrabold leading-[0.92] tracking-tightest text-[#14160f]"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4.6rem)" }}
            >
              Case studies,
              <br />
              not showreels<span className="text-honey">.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15} y={20} className="max-w-md md:justify-self-end md:pb-1">
            <p className="text-[14px] leading-relaxed text-[#2c2c25]/65 md:max-w-sm">
              Every project starts with a question — what does success look
              like? Here's what that looked like for a few brands we love.
            </p>
          </Reveal>
        </div>

        {/* 4-Column collage */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4 md:gap-5">

          {/* Column 1 — fixed: 3 items to remove empty space */}
          <div className="flex flex-col gap-5">
            <Reveal delay={0} y={20}>
              <Tile item={rakhandar} />
            </Reveal>
            <Reveal delay={0.05} y={20}>
              <Tile item={placeholderStory} />
            </Reveal>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-10">
            <Reveal delay={0.05} y={20}>
              <Tile item={goaTourism} />
            </Reveal>
            <Reveal delay={0.1} y={20}>
              <Tile item={northwindLabs} />
            </Reveal>
            <Reveal delay={0.15} y={20}>
              <Tile item={placeholderLaunch} />
            </Reveal>
              <Reveal delay={0.35} y={20}>
    <Tile item={placeholderCampaign} />
  </Reveal>

          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-5">
            <Reveal delay={0.15} y={20}>
              <Tile item={aetherWatches} />
            </Reveal>
            
            <Reveal delay={0.2} y={20}>
              <Tile item={mevasCafe} />
            </Reveal>
          </div>

          {/* Column 4 */}
<div className="flex flex-col gap-5">
  <Reveal delay={0.25} y={20}>
    <Tile item={lumiereBeauty} />
  </Reveal>

  <Reveal delay={0.3} y={20}>
    <Tile item={goaTourism2} />
  </Reveal>

</div>
        </div>

        {/* Footer caption */}
        <Reveal delay={0.35} y={20}>
          <div className="mt-8 flex flex-col items-center gap-4 text-center md:mt-10">
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
