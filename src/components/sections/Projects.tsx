"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, ChevronDown, Play } from "lucide-react";
import type { Project } from "@/lib/data";
import { useSiteData } from "@/components/providers/SiteDataProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { GlowCard } from "@/components/ui/GlowCard";
import { fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ALL = "All";
/** Cards shown before "Show all" is pressed (on the unfiltered view). */
const PAGE_SIZE = 6;

/** "Enterprise · HR" → "Enterprise" — the group a project is filtered by. */
const groupOf = (p: Project) => p.category.split("·")[0].trim();

/** Abstract app screens for the cover phone — one of three per project. */
function PhoneScreen({ variant }: { variant: number }) {
  if (variant === 1) {
    // dashboard: stat tiles + bar chart
    return (
      <>
        <div className="grid grid-cols-2 gap-1">
          <span className="h-7 rounded-md bg-white/30" />
          <span className="h-7 rounded-md bg-white/15" />
        </div>
        <div className="mt-1.5 flex h-14 items-end gap-1 rounded-md bg-white/10 p-1.5">
          {[45, 70, 35, 90, 60, 80].map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}%` }}
              className="flex-1 rounded-sm bg-white/45"
            />
          ))}
        </div>
        <span className="mt-1.5 block h-2 w-3/4 rounded-full bg-white/25" />
        <span className="mt-1 block h-2 w-1/2 rounded-full bg-white/15" />
      </>
    );
  }
  if (variant === 2) {
    // storefront: banner + product grid
    return (
      <>
        <span className="block h-9 rounded-md bg-white/30" />
        <div className="mt-1.5 grid grid-cols-2 gap-1">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-9 rounded-md bg-white/15" />
          ))}
        </div>
        <span className="mt-1.5 block h-4 rounded-full bg-white/40" />
      </>
    );
  }
  // feed: avatar rows
  return (
    <>
      <span className="block h-8 rounded-md bg-white/30" />
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="mt-1.5 flex items-center gap-1.5">
          <span className="h-4 w-4 shrink-0 rounded-full bg-white/40" />
          <div className="flex-1">
            <span className="block h-1.5 w-full rounded-full bg-white/30" />
            <span className="mt-1 block h-1.5 w-2/3 rounded-full bg-white/15" />
          </div>
        </div>
      ))}
    </>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: (index % 3) * 0.08 }}
      className="h-full w-[82vw] max-w-[320px] shrink-0 snap-center sm:w-auto sm:max-w-none sm:shrink"
    >
      <GlowCard className="h-full p-3 sm:p-3.5">
        <div className="flex h-full flex-col">
          {/* cover: gradient stage, project title, and a phone peeking in */}
          <div
            className={cn(
              "relative h-40 overflow-hidden rounded-2xl bg-gradient-to-br sm:h-44",
              project.accent
            )}
          >
            {project.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.imageUrl}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-[radial-gradient(110%_110%_at_0%_0%,rgba(255,255,255,0.3),transparent_48%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

            {!project.imageUrl && (
              <div
                aria-hidden
                className="absolute -bottom-12 right-4 w-[104px] rotate-[9deg] rounded-[20px] border border-white/35 bg-black/50 p-1.5 shadow-2xl shadow-black/40 transition-transform duration-500 ease-out group-hover:-translate-y-3 group-hover:rotate-[4deg] sm:right-6"
              >
                <div className="h-[150px] rounded-[14px] bg-gradient-to-b from-white/20 to-white/5 p-2">
                  <span className="mx-auto mb-2 block h-1.5 w-8 rounded-full bg-black/45" />
                  <PhoneScreen variant={index % 3} />
                </div>
              </div>
            )}

            <span className="hud-label absolute left-3 top-3 rounded-full bg-black/25 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="absolute inset-x-4 bottom-3.5 pr-[42%]">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/80">
                {project.category}
              </span>
              <h3 className="mt-0.5 text-xl font-bold leading-tight tracking-tight text-white drop-shadow sm:text-2xl font-[family-name:var(--font-display)]">
                {project.name}
              </h3>
            </div>
          </div>

          <div className="flex flex-1 flex-col px-2 pb-2 pt-4 sm:px-3 sm:pb-3 sm:pt-5">
            <p className="text-sm leading-relaxed text-muted">
              {project.description}
            </p>

            {/* metrics */}
            <dl className="mt-4 grid grid-cols-3 divide-x divide-card-border rounded-xl border border-card-border bg-background-2/40">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="flex flex-col-reverse justify-end px-2 py-2.5 text-center"
                >
                  <dt className="mt-0.5 text-[10px] uppercase tracking-wide text-muted">
                    {m.label}
                  </dt>
                  <dd className="text-sm font-semibold text-foreground">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* tech */}
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-card-border bg-foreground/5 px-2.5 py-1 text-xs text-muted"
                >
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-5">
              <a
                href={project.playStore}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} on the Play Store`}
                className="group/link flex items-center justify-between border-t border-card-border pt-4 text-sm font-medium text-foreground"
              >
                <span className="inline-flex items-center gap-2 transition-colors duration-200 group-hover/link:text-accent">
                  <Play size={13} fill="currentColor" className="text-accent" />
                  View on Play Store
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-card-border text-muted transition-all duration-200 group-hover/link:border-transparent group-hover/link:bg-accent group-hover/link:text-white">
                  <ArrowUpRight size={16} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </GlowCard>
    </motion.article>
  );
}

export function Projects() {
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState(ALL);
  const [expanded, setExpanded] = useState(false);
  const { projects, headings } = useSiteData();

  // Filter tabs, in order of first appearance, with a count each.
  const groups = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach((p) => counts.set(groupOf(p), (counts.get(groupOf(p)) ?? 0) + 1));
    return [
      { name: ALL, count: projects.length },
      ...Array.from(counts, ([name, count]) => ({ name, count })),
    ];
  }, [projects]);

  const matching =
    filter === ALL ? projects : projects.filter((p) => groupOf(p) === filter);
  const capped = filter === ALL && !expanded && matching.length > PAGE_SIZE;
  const visible = capped ? matching.slice(0, PAGE_SIZE) : matching;

  const pickFilter = (name: string) => {
    setFilter(name);
    setActive(0);
  };

  // Track which card sits in the center of the mobile carousel.
  const onRailScroll = () => {
    const el = rail.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const c = child as HTMLElement;
      const dist = Math.abs(c.offsetLeft + c.offsetWidth / 2 - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(best);
  };

  const scrollToCard = (i: number) => {
    const el = rail.current?.children[i] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <section id="projects" className="relative py-12 sm:py-20 lg:py-24">
      <BackgroundPaths />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="05"
          {...headings.projects}
        />

        {/* Category filter */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="scrollbar-none -mx-6 mt-6 flex gap-2 overflow-x-auto px-6 sm:mx-0 sm:mt-10 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
        >
          {groups.map((g) => {
            const on = g.name === filter;
            return (
              <button
                key={g.name}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => pickFilter(g.name)}
                className={cn(
                  "relative inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
                  on
                    ? "border-transparent text-white"
                    : "border-card-border bg-foreground/5 text-muted hover:text-foreground"
                )}
              >
                {on && (
                  <motion.span
                    layoutId="project-filter"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-accent via-accent-2 to-accent-3 shadow-[0_6px_24px_-8px_rgba(var(--accent-rgb),0.7)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative">{g.name}</span>
                <span
                  className={cn(
                    "relative rounded-full px-1.5 text-[11px] tabular-nums",
                    on ? "bg-white/20" : "bg-foreground/10"
                  )}
                >
                  {g.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile: edge-to-edge snap carousel (touch-pan-x keeps the gesture
            horizontal — no vertical page scroll from inside the rail). sm+: grid.
            Keyed by filter so a new selection re-runs the staggered reveal. */}
        <div
          key={filter}
          ref={rail}
          onScroll={onRailScroll}
          className="perspective scrollbar-none -mx-6 mt-6 flex touch-pan-x snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-[9vw] pb-2 sm:mx-0 sm:mt-10 sm:grid sm:touch-auto sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
        >
          {visible.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* Carousel controls — dots + counter, mobile only */}
        <div className="mt-4 flex flex-col items-center gap-2 sm:hidden">
          <div className="flex items-center gap-1.5">
            {visible.map((p, i) => (
              <button
                key={p.id}
                type="button"
                aria-label={`Go to ${p.name}`}
                onClick={() => scrollToCard(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === active ? "w-5 bg-accent" : "w-1.5 bg-foreground/20"
                )}
              />
            ))}
          </div>
          <p className="text-xs text-muted">
            {Math.min(active + 1, visible.length)} / {visible.length} · swipe for
            more
          </p>
        </div>

        {filter === ALL && matching.length > PAGE_SIZE && (
          <div className="mt-6 flex justify-center sm:mt-10">
            <button
              type="button"
              onClick={() => {
                // Collapsing would strand the reader far below the grid.
                if (expanded) {
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }
                setExpanded((v) => !v);
              }}
              aria-expanded={expanded}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium text-foreground transition-colors duration-200 hover:text-accent"
            >
              {expanded
                ? "Show fewer"
                : `Show all ${matching.length} projects`}
              <ChevronDown
                size={16}
                className={cn(
                  "transition-transform duration-300",
                  expanded && "rotate-180"
                )}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
