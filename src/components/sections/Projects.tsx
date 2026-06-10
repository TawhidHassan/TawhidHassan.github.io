"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Play } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { GlowCard } from "@/components/ui/GlowCard";
import { Magnetic } from "@/components/ui/MagneticButton";
import { HudCorners } from "@/components/ui/Hud";
import { fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: (index % 3) * 0.08 }}
      className="h-full w-[80vw] max-w-[300px] shrink-0 snap-center sm:w-auto sm:max-w-none sm:shrink"
    >
      <GlowCard className="h-full p-5 sm:p-7">
        <div className="flex h-full flex-col">
          {/* gradient cover */}
          <div
            className={cn(
              "relative mb-4 grid h-20 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br sm:mb-6 sm:h-28",
              project.accent
            )}
          >
            <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(255,255,255,0.25),transparent_45%)]" />
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/20 blur-2xl" />
            <span className="relative text-xl font-bold tracking-tight text-white drop-shadow-sm sm:text-2xl font-[family-name:var(--font-display)]">
              {project.name}
            </span>
            <span className="hud-label absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-black/20 text-[10px] font-semibold text-white backdrop-blur">
              0{index + 1}
            </span>
            <HudCorners className="opacity-40" size={14} />
          </div>

          <span className="text-xs font-medium uppercase tracking-widest text-accent">
            {project.category}
          </span>
          <h3 className="mt-1.5 text-lg font-semibold sm:mt-2 sm:text-xl">
            {project.name}
          </h3>

          <p className="mt-2 text-xs leading-relaxed text-muted sm:mt-3 sm:text-sm">
            {project.description}
          </p>

          {/* metrics */}
          <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-5">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-card-border bg-background-2/40 p-2.5 text-center"
              >
                <div className="text-sm font-semibold text-foreground">
                  {m.value}
                </div>
                <div className="mt-0.5 text-[10px] uppercase tracking-wide text-muted">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* tech */}
          <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full bg-foreground/5 px-2.5 py-1 text-xs text-muted"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-card-border pt-4 sm:mt-6 sm:pt-5">
            <Magnetic>
              <a
                href={project.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent via-accent-2 to-accent-3 px-4 py-2 text-xs font-semibold text-white"
              >
                <Play size={13} fill="currentColor" />
                Play Store
              </a>
            </Magnetic>
            <a
              href={project.playStore}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.name}`}
              className="grid h-9 w-9 place-items-center rounded-full glass text-muted transition-colors hover:text-accent"
            >
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </GlowCard>
    </motion.article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative py-10 sm:py-28 lg:py-36">
      <BackgroundPaths />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Featured Work"
          title="Products shipped to real users."
          description="Enterprise platforms, fintech apps, and consumer products live on the Play Store — built end-to-end with Flutter."
        />

        {/* Mobile: edge-to-edge snap carousel. sm+: original grid. */}
        <div className="perspective scrollbar-none -mx-6 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-6 pb-2 sm:mx-0 sm:mt-16 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        <p className="mt-3 text-center text-xs text-muted sm:hidden">
          Swipe to explore · {projects.length} projects
        </p>
      </div>
    </section>
  );
}
