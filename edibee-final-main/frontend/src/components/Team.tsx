import { Reveal } from "./Reveal";

const team = [
  {
    name: "Aditya",
    role: "Creative Director",
    image: "/portfolio/project-1.jpg",
    position: "left-[7%] top-[14%] h-28 w-20 md:left-[7%] md:top-[24%] md:h-32 md:w-24",
    objectPosition: "18% 48%",
  },
  {
    name: "Shweth",
    role: "Lead Editor",
    image: "/services/video-editing.jpg",
    position: "left-[29%] top-[10%] h-28 w-20 md:left-[17%] md:top-[14%] md:h-36 md:w-28",
    objectPosition: "50% 50%",
  },
  {
    name: "Shreyash",
    role: "Videographer",
    image: "/portfolio/project-3.jpg",
    position: "right-[29%] top-[10%] h-28 w-20 md:right-[18%] md:top-[14%] md:h-36 md:w-28",
    objectPosition: "50% 50%",
  },
  {
    name: "Yutika",
    role: "Brand Strategist",
    image: "/services/brand-strategy.jpg",
    position: "right-[7%] top-[14%] h-28 w-20 md:right-[7%] md:top-[24%] md:h-32 md:w-24",
    objectPosition: "45% 50%",
  },
  {
    name: "Sanyukta",
    role: "Social Media Manager",
    image: "/services/social-media.jpg",
    position: "left-[15%] bottom-[11%] h-28 w-20 md:left-[16%] md:bottom-[15%] md:h-32 md:w-24",
    objectPosition: "50% 50%",
  },
  {
    name: "The Edibee Crew",
    role: "Production Team",
    image: "/portfolio/project-5.jpg",
    position: "right-[15%] bottom-[11%] h-28 w-20 md:right-[16%] md:bottom-[15%] md:h-32 md:w-24",
    objectPosition: "50% 50%",
  },
];

export function Team() {
  return (
    <section
      id="team"
      className="relative overflow-hidden bg-paper px-4 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-[1360px]">
        <Reveal>
          <div className="relative min-h-[640px] overflow-hidden rounded-[32px] border border-ink/10 bg-[#f8f5ea] shadow-[0_28px_80px_rgba(20,22,15,0.16)] md:min-h-[620px]">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.45]"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, transparent 0, transparent calc(12.5% - 1px), rgba(20,22,15,0.08) calc(12.5% - 1px), rgba(20,22,15,0.08) 12.5%, transparent 12.5%)",
                backgroundSize: "12.5% 100%",
              }}
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/70 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f8f5ea] to-transparent" />

            {team.map((member, index) => (
              <Reveal
                key={member.name}
                delay={0.08 + index * 0.06}
                y={24}
                className={`absolute z-10 ${member.position}`}
              >
                <article className="group relative h-full w-full overflow-hidden rounded-[14px] border border-white/70 bg-white shadow-[0_16px_32px_rgba(20,22,15,0.16)] transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(20,22,15,0.22)]">
                  <img
                    src={member.image}
                    alt={`${member.name}, ${member.role}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ objectPosition: member.objectPosition }}
                  />
                  <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/82 to-transparent px-3 pb-3 pt-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <h3 className="truncate text-sm font-bold text-white">
                      {member.name}
                    </h3>
                    <p className="truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-honey">
                      {member.role}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}

            <Reveal
              delay={0.18}
              y={18}
              className="relative z-20 mx-auto flex min-h-[640px] max-w-[580px] flex-col items-center justify-center px-6 text-center md:min-h-[620px]"
            >
              <span className="rounded-full border border-ink/10 bg-white/70 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.26em] text-charcoal/55 shadow-sm">
                The Studio
              </span>
              <h2
                className="mt-6 font-display font-extrabold leading-[0.92] tracking-tightest text-ink"
                style={{ fontSize: "clamp(2.35rem, 5vw, 5.2rem)" }}
              >
                The people
                <br />
                behind the buzz<span className="text-honey">.</span>
              </h2>
              <p className="mt-5 max-w-md text-sm leading-6 text-charcoal/68 md:text-base md:leading-7">
                A small, senior team shaping strategy, shoots, edits, and social
                systems from first call to final cut.
              </p>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(20,22,15,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-honey hover:text-ink"
              >
                Meet the team
              </a>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
