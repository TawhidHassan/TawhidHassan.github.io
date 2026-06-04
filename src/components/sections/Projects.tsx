"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Play } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { Magnetic } from "@/components/ui/MagneticButton";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article variants={fadeInUp} className="h-full">
      <GlowCard className="h-full p-6 sm:p-7">
        <div className="flex h-full flex-col">
          {/* gradient cover */}
          <div
            className={cn(
              "relative mb-6 grid h-28 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br",
              project.accent
            )}
          >
            <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(255,255,255,0.25),transparent_45%)]" />
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/20 blur-2xl" />
            <span className="relative text-2xl font-bold tracking-tight text-white drop-shadow-sm font-[family-name:var(--font-display)]">
              {project.name}
            </span>
            <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-black/20 text-xs font-semibold text-white backdrop-blur">
              0{index + 1}
            </span>
          </div>

          <span className="text-xs font-medium uppercase tracking-widest text-accent">
            {project.category}
          </span>
          <h3 className="mt-2 text-xl font-semibold">{project.name}</h3>

          <p className="mt-3 text-sm leading-relaxed text-muted">
            {project.description}
          </p>

          {/* metrics */}
          <div className="mt-5 grid grid-cols-3 gap-2">
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
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full bg-foreground/5 px-2.5 py-1 text-xs text-muted"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-card-border pt-5">
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
    <section id="projects" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Featured Work"
          title="Products shipped to real users."
          description="Enterprise platforms, fintech apps, and consumer products live on the Play Store — built end-to-end with Flutter."
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
