import { useRef, useState } from "react";
import { Reveal } from "./Reveal";

/* ──────────────────────────────────────────────────────────────────── */
/*  Types                                                               */
/* ──────────────────────────────────────────────────────────────────── */
type AspectRatio = "9/16" | "16/9";

type CaseProject = {
  name: string;
  industry: string;
  outcome: string;
  video: string;
  poster: string;
  aspect: AspectRatio;
};

/* ──────────────────────────────────────────────────────────────────── */
/*  Data — Redesigned according to mockup                               */
/* ──────────────────────────────────────────────────────────────────── */
const projects: CaseProject[] = [
  {
    name: "Rakhandar",
    industry: "REEL EDIT",
    outcome: "18M views",
    video: "/work/work-2.mp4",
    poster: "/portfolio/project-2.jpg",
    aspect: "9/16",
  },
  {
    name: "Goa Tourism",
    industry: "BRAND FILM",
    outcome: "2.3M views",
    video: "/work/work-1.mp4",
    poster: "/portfolio/project-6.jpg",
    aspect: "16/9",
  },
  {
    name: "Northwind Labs",
    industry: "PRODUCT LAUNCH",
    outcome: "+218% qualified demos",
    video: "/work/work-4.mp4",
    poster: "/portfolio/project-4.jpg",
    aspect: "16/9",
  },
  {
    name: "Aether Watches",
    industry: "PRODUCT VIDEO",
    outcome: "5.6x add-to-cart lift",
    video: "/work/work-1.mp4",
    poster: "/portfolio/project-1.jpg",
    aspect: "9/16",
  },
  {
    name: "Mevas Café",
    industry: "RESTAURANT FILM",
    outcome: "3.1M views",
    video: "/work/work-3.mp4",
    poster: "/portfolio/project-5.jpg",
    aspect: "16/9",
  },
  {
    name: "Lumière Beauty",
    industry: "CAMPAIGN",
    outcome: "18M views · 9-day sell-through",
    video: "/work/work-3.mp4",
    poster: "/portfolio/project-3.jpg",
    aspect: "9/16",
  },
  {
    name: "Goa Lifestyle",
    industry: "LIFESTYLE VIDEO",
    outcome: "1.2M views",
    video: "/work/work-1.mp4",
    poster: "/portfolio/project-6.jpg",
    aspect: "16/9",
  },
];

/* ──────────────────────────────────────────────────────────────────── */
/*  Case study tile                                                     */
/* ──────────────────────────────────────────────────────────────────── */
function CaseTile({ project }: { project: CaseProject }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    const v = videoRef.current;
    if (v) {
      v.play().catch((err) => {
        console.log("Video playback interrupted:", err);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0; // Reset to poster frame
    }
  };

  const slug = project.name.toLowerCase().replace(/\s+/g, "-");

  const aspectClasses = {
    "9/16": "aspect-[9/16]",
    "16/9": "aspect-[16/9]",
  };

  return (
    <a
      href="#contact"
      data-testid={`work-tile-${slug}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative block w-full overflow-hidden rounded-[16px] border border-white/5 bg-[#14160f] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-white/20 cursor-pointer ${aspectClasses[project.aspect]}`}
    >
      <video
        ref={videoRef}
        src={project.video}
        poster={project.poster}
        preload="metadata"
        muted
        loop
        playsInline
        className="h-full w-full object-cover opacity-95 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
      />

      {/* Subtle vignettes for high contrast and readability */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/50 to-transparent" />

      {/* TOP LEFT: Industry Category */}
      <div className="absolute top-4 left-4 z-10">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-white/80">
          {project.industry}
        </span>
      </div>

      {/* BOTTOM LEFT: Title & Performance Outcome */}
      <div className="absolute bottom-4 left-4 z-10 pr-4">
        <h3 className="font-display text-lg font-bold leading-tight text-white md:text-xl">
          {project.name}
        </h3>
        <p className="mt-1 text-[11px] font-semibold tracking-wide text-honey">
          {project.outcome}
        </p>
      </div>
    </a>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
export function Portfolio() {
  const rakhandar = projects[0];
  const goaTourism = projects[1];
  const northwindLabs = projects[2];
  const aetherWatches = projects[3];
  const mevasCafe = projects[4];
  const lumiereBeauty = projects[5];
  const goaLifestyle = projects[6];

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

        {/* Mockup-based 4-Column Layout */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4 md:gap-5">
          {/* Column 1 */}
          <div className="flex flex-col">
            <Reveal delay={0} y={20}>
              <CaseTile project={rakhandar} />
            </Reveal>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-5">
            <Reveal delay={0.05} y={20}>
              <CaseTile project={goaTourism} />
            </Reveal>
            <Reveal delay={0.1} y={20}>
              <CaseTile project={northwindLabs} />
            </Reveal>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-5">
            <Reveal delay={0.15} y={20}>
              <CaseTile project={aetherWatches} />
            </Reveal>
            <Reveal delay={0.2} y={20}>
              <CaseTile project={mevasCafe} />
            </Reveal>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-5">
            <Reveal delay={0.25} y={20}>
              <CaseTile project={lumiereBeauty} />
            </Reveal>
            <Reveal delay={0.3} y={20}>
              <CaseTile project={goaLifestyle} />
            </Reveal>
          </div>
        </div>

        {/* Minimal Footer caption */}
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
