import { motion } from "framer-motion";
import {
  Film,
  Sparkles,
  Megaphone,
  Palette,
  TrendingUp,
  Lightbulb,
  Layers,
} from "lucide-react";
import { Reveal } from "./Reveal";

type Tile = {
  label: string;
  image?: string;
  swatch?: string;
  Icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  row: 1 | 2 | 3;
  col: number;
  size: "xs" | "sm" | "md" | "lg" | "xl";
};

const TILES: Tile[] = [
  // ── TOP row ──────────────────────────────────────────────────────
  { label: "Reels",     swatch: "#1f1b14", Icon: Film,      row: 1, col: 1, size: "xs" },
  { label: "Content",   image: "/services/video-production.jpg", row: 1, col: 2, size: "md" },
  { label: "Films",     image: "/services/video-editing.jpg",    row: 1, col: 3, size: "sm" },
  { label: "Editing",   swatch: "#f3d111", Icon: Layers,    row: 1, col: 4, size: "md" },
  { label: "Photo",     image: "/services/photography.jpg",      row: 1, col: 5, size: "xs" },

  // ── MIDDLE row ───────────────────────────────────────────────────
  { label: "Lens",      image: "/services/photography.jpg",      row: 2, col: 1, size: "sm" },
  { label: "Branding",  swatch: "#0f110c", Icon: Palette,   row: 2, col: 2, size: "md" },
  { label: "Video Production", image: "/services/video-production.jpg", row: 2, col: 3, size: "xl" },
  { label: "Social",    image: "/services/social-media.jpg",     row: 2, col: 4, size: "md" },
  { label: "Strategy",  swatch: "#272727", Icon: Lightbulb, row: 2, col: 5, size: "sm" },

  // ── BOTTOM row ───────────────────────────────────────────────────
  { label: "Creative",  swatch: "#f1b40a", Icon: Sparkles,  row: 3, col: 1, size: "xs" },
  { label: "Marketing", image: "/services/creative-marketing.jpg", row: 3, col: 2, size: "md" },
  { label: "Brand",     image: "/services/brand-strategy.jpg",   row: 3, col: 3, size: "sm" },
  { label: "Campaigns", swatch: "#f3d111", Icon: Megaphone,  row: 3, col: 4, size: "md" },
  { label: "Trends",    swatch: "#1f1b14", Icon: TrendingUp, row: 3, col: 5, size: "xs" },
];

/* size → dimensions — scaled down ~15% to compress the cluster */
const SIZE: Record<Tile["size"], { w: number; h: number }> = {
  xs: { w: 82,  h: 98  },
  sm: { w: 106, h: 126 },
  md: { w: 134, h: 160 },
  lg: { w: 162, h: 188 },
  xl: { w: 204, h: 228 },
};

/* per-col yaw & per-row pitch — unchanged from original */
const COL_YAW   = [22, 11, 0, -11, -22];
const ROW_PITCH = [12,  0, -12];

/*
  Vertical offsets per [row][col] to create the editorial stagger.
  Positive = pushed down, negative = pulled up.
  This gives the "tight cluster with slight offsets" feel.
*/
const STAGGER_Y: Record<number, number[]> = {
  1: [  6, -12,  12,  -8,   8 ],
  2: [ -6,  10,   0,   8, -10 ],
  3: [ 10, -10,   8, -14,   4 ],
};

const STAGGER_X: Record<number, number[]> = {
  1: [ 10,   0,   4,  -7, -20 ],
  2: [ -6,  -8,   0,  -7,   8 ],
  3: [ 16,   2,   6,  -6, -19 ],
};

function TileCard({ tile, index }: { tile: Tile; index: number }) {
  const { w, h } = SIZE[tile.size];
  const yaw      = COL_YAW[tile.col - 1]   ?? 0;
  const pitch    = ROW_PITCH[tile.row - 1] ?? 0;
  const nudgeY   = STAGGER_Y[tile.row]?.[tile.col - 1] ?? 0;
  const nudgeX   = STAGGER_X[tile.row]?.[tile.col - 1] ?? 0;
  const isFeatured = tile.size === "xl";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{
        delay: 0.04 * index,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        scale: 1.08,
        rotateY: 0,
        rotateX: 0,
        z: 60,
        transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
      }}
      style={{
        width: w,
        height: h,
        transform: `translate(${nudgeX}px, ${nudgeY}px) rotateY(${yaw}deg) rotateX(${pitch}deg)`,
        transformStyle: "preserve-3d",
      }}
      className="relative shrink-0"
      data-testid={`service-tile-${tile.label.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {/* honey glow */}
      <div
        aria-hidden
        className="absolute -inset-2 rounded-[28px] opacity-70 blur-xl transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(243,209,17,0.55) 0%, rgba(243,209,17,0) 70%)",
        }}
      />

      {/* card */}
      <div
        className={`group relative h-full w-full overflow-hidden rounded-[22px] border ${
          isFeatured
            ? "border-honey/70 shadow-[0_0_0_1px_rgba(243,209,17,0.4),0_30px_60px_-20px_rgba(243,209,17,0.45)]"
            : "border-white/60 shadow-[0_0_0_1px_rgba(255,255,255,0.5),0_18px_40px_-18px_rgba(15,17,12,0.35)]"
        }`}
        style={{ background: tile.swatch ?? "#f4efdf" }}
      >
        {tile.image && (
          <img
            src={tile.image}
            alt={tile.label}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          />
        )}

        {!tile.image && tile.Icon && (
          <div className="absolute inset-0 flex items-center justify-center">
            <tile.Icon
              className={`${
                tile.swatch === "#f3d111" || tile.swatch === "#f1b40a"
                  ? "text-ink/85"
                  : "text-honey"
              } ${
                tile.size === "xs"
                  ? "h-7 w-7"
                  : tile.size === "sm"
                  ? "h-8 w-8"
                  : "h-10 w-10"
              }`}
              strokeWidth={1.6}
            />
          </div>
        )}

        {tile.image && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        )}

        <div className={`absolute inset-x-0 bottom-0 px-3 pb-2.5 ${isFeatured ? "pb-4" : ""}`}>
          <p
            className={`truncate font-display tracking-tight ${
              tile.image
                ? "text-white"
                : tile.swatch && tile.swatch !== "#f3d111" && tile.swatch !== "#f1b40a"
                ? "text-white"
                : "text-ink"
            }`}
            style={{
              fontSize: isFeatured ? "1.35rem" : tile.size === "md" ? "0.95rem" : "0.78rem",
              fontWeight: 600,
              lineHeight: 1.05,
              textShadow: tile.image ? "0 1px 6px rgba(0,0,0,0.5)" : "none",
            }}
          >
            {tile.label}
          </p>
        </div>

        {isFeatured && (
          <div className="absolute left-3 top-3 rounded-full bg-honey px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">
            Flagship
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 60%)",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  const rows: Tile[][] = [1, 2, 3].map((r) =>
    TILES.filter((t) => t.row === r).sort((a, b) => a.col - b.col),
  );

  return (
    <section
      id="services"
      className="relative overflow-hidden px-6 pb-12 pt-24 md:px-12 md:pb-12 md:pt-28"
      style={{
        background:
          "radial-gradient(circle at 30% 50%, rgba(243,209,17,0.10) 0%, #f5f2e8 40%, #ece7d8 100%)",
      }}
    >
      <div className="mx-auto max-w-[1400px]">
        {/* ── Two-column layout ──────────────────────────────────── */}
        <div className="flex flex-col gap-9 md:flex-row md:items-center md:gap-12">

          {/* ── LEFT: Card cluster ──────────────────────────────── */}
          <div className="relative flex-1">
            {/* honey halo */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(243,209,17,0.30) 0%, rgba(243,209,17,0) 65%)",
                filter: "blur(36px)",
              }}
            />

            {/* faint grid */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(15,17,12,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(15,17,12,0.18) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
                maskImage:
                  "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 80%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 80%)",
              }}
            />

            {/* perspective stage */}
            <Reveal>
              <div
                className="relative flex flex-col items-center gap-[8px]"
                style={{ perspective: "1400px", transformStyle: "preserve-3d" }}
              >
                {rows.map((row, rIdx) => (
                  <div
                    key={rIdx}
                    className="flex items-center justify-center gap-[8px]"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {row.map((tile, tIdx) => (
                      <TileCard
                        key={`${rIdx}-${tIdx}`}
                        tile={tile}
                        index={rIdx * 5 + tIdx}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ── RIGHT: Typography ───────────────────────────────── */}
          <div className="flex-shrink-0 md:w-[39%] md:-translate-y-7">
            <Reveal delay={0.1}>
              <div className="max-w-[540px]">
                {/* eyebrow */}
                <p className="mb-3 text-xs uppercase tracking-[0.35em] text-charcoal/50">
                  What We Build
                </p>

                {/* headline */}
                <h2
                  className="whitespace-nowrap font-display leading-[0.88] tracking-[-0.04em] text-ink"
                  style={{ fontSize: "clamp(2.7rem, 4.35vw, 4.85rem)" }}
                >
                  Get noticed.
                  <br />
                  Stay remembered.
                  <br />
                  Be chosen.
                </h2>

                {/* subhead */}
                <p className="mb-3 mt-6 font-display text-lg font-semibold leading-snug text-ink/90 md:text-xl">
                  One team.{" "}
                  <span className="font-normal text-ink/58">One vision.</span>
                </p>

                {/* body */}
                <p className="max-w-[430px] text-[0.95rem] leading-[1.72] text-charcoal/75">
                  Film, photography, branding, editing and campaigns engineered to make your brand{" "}
                  <em className="bg-honey px-1 font-semibold not-italic text-ink">
                    impossible to ignore.
                  </em>
                </p>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
