"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import type { SkillGroup } from "@/lib/data";
import { useSiteData } from "@/components/providers/SiteDataProvider";
import { getIcon, Icon } from "@/lib/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BackgroundPaths } from "@/components/ui/background-paths";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { GlowCard } from "@/components/ui/GlowCard";
import { fadeInUp, staggerContainer, viewportOnce, ease } from "@/lib/motion";

const avg = (g: SkillGroup) =>
  g.skills.length
    ? Math.round(g.skills.reduce((a, s) => a + s.level, 0) / g.skills.length)
    : 0;

export function Skills() {
  const { skillGroups, skillMarquee, headings } = useSiteData();

  // Map skill categories onto the orbital timeline's node shape.
  const skillsTimeline = useMemo(
    () =>
      skillGroups.map((g, i) => {
        const energy = avg(g);
        const id = i + 1;
        const relatedIds = [id - 1, id + 1].filter(
          (n) => n >= 1 && n <= skillGroups.length
        );
        return {
          id,
          title: g.category,
          date: `${g.skills.length} skills`,
          content: g.skills.map((s) => s.name).join(" · "),
          category: g.category,
          icon: getIcon(g.skills[0]?.icon ?? ""),
          relatedIds,
          status:
            energy >= 90 ? "completed" : energy >= 82 ? "in-progress" : "pending",
          energy,
        } as const;
      }),
    [skillGroups]
  );

  return (
    <section id="skills" className="relative overflow-hidden py-12 sm:py-20 lg:py-24">
      <BackgroundPaths />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="04"
          {...headings.skills}
        />
      </div>

      {/* Interactive radial orbital map of capabilities */}
      <div className="relative mt-2 overflow-hidden sm:mt-4">
        <RadialOrbitalTimeline timelineData={skillsTimeline} />
      </div>

      {/* Every skill, grouped — the readable companion to the orbit above */}
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="perspective mx-auto mt-2 grid max-w-6xl gap-3 px-6 sm:mt-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
      >
        {skillGroups.map((g) => (
          <motion.div key={g.category} variants={fadeInUp}>
            <GlowCard intensity={8} className="h-full p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent/25 to-accent-2/20 text-accent">
                  <Icon name={g.skills[0]?.icon ?? ""} size={18} />
                </span>
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold sm:text-base">
                    {g.category}
                  </h3>
                  <p className="hud-label text-[10px] text-muted">
                    {g.skills.length} skills · avg {avg(g)}%
                  </p>
                </div>
              </div>

              <ul className="mt-4 space-y-3">
                {g.skills.map((s, i) => (
                  <li key={s.name}>
                    <div className="flex items-baseline justify-between gap-3 text-xs">
                      <span className="truncate font-medium text-foreground/90">
                        {s.name}
                      </span>
                      <span className="shrink-0 font-mono tabular-nums text-muted">
                        {s.level}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-foreground/10">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: s.level / 100 }}
                        viewport={viewportOnce}
                        transition={{ duration: 1, ease, delay: 0.15 + i * 0.06 }}
                        className="h-full origin-left rounded-full bg-gradient-to-r from-accent via-accent-2 to-accent-3"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Marquee ticker */}
      <div className="relative mt-8 flex flex-col gap-3 sm:mt-14 sm:gap-4">
        <div className="mask-fade-edges flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee gap-4 pr-4">
            {[...skillMarquee, ...skillMarquee].map((s, i) => (
              <span
                key={`a-${s}-${i}`}
                className="whitespace-nowrap rounded-full glass px-4 py-2 text-xs font-medium text-muted sm:px-5 sm:py-2.5 sm:text-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="mask-fade-edges flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee-reverse gap-4 pr-4">
            {[...skillMarquee.slice().reverse(), ...skillMarquee.slice().reverse()].map(
              (s, i) => (
                <span
                  key={`b-${s}-${i}`}
                  className="whitespace-nowrap rounded-full glass px-4 py-2 text-xs font-medium text-muted sm:px-5 sm:py-2.5 sm:text-sm"
                >
                  {s}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
