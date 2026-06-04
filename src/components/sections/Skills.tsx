"use client";

import { motion } from "motion/react";
import { skillGroups, skillMarquee, type IconType } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

function SkillBar({
  name,
  level,
  Icon,
  delay,
}: {
  name: string;
  level: number;
  Icon: IconType;
  delay: number;
}) {
  return (
    <motion.div variants={fadeInUp} className="group">
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-medium">
          <span className="text-accent transition-transform duration-300 group-hover:scale-110">
            <Icon size={16} />
          </span>
          {name}
        </span>
        <span className="text-xs tabular-nums text-muted">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-foreground/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={viewportOnce}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
          className="h-full rounded-full bg-gradient-to-r from-accent via-accent-2 to-accent-3"
        />
      </div>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Capabilities"
          title="A toolkit honed in production."
          description="From pixel-perfect Flutter UI to resilient backends and AI integrations — the full stack of shipping mobile products."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {skillGroups.map((group, gi) => (
            <GlowCard key={group.category} tilt={false} className="p-7">
              <h3 className="mb-6 flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-accent">
                <span className="h-px w-6 bg-accent" />
                {group.category}
              </h3>
              <motion.div
                variants={staggerContainer(0.08)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="space-y-5"
              >
                {group.skills.map((s, si) => (
                  <SkillBar
                    key={s.name}
                    name={s.name}
                    level={s.level}
                    Icon={s.icon}
                    delay={0.1 + si * 0.05 + gi * 0.05}
                  />
                ))}
              </motion.div>
            </GlowCard>
          ))}
        </div>
      </div>

      {/* Marquee ticker */}
      <div className="relative mt-20 flex flex-col gap-4">
        <div className="mask-fade-edges flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee gap-4 pr-4">
            {[...skillMarquee, ...skillMarquee].map((s, i) => (
              <span
                key={`a-${s}-${i}`}
                className="whitespace-nowrap rounded-full glass px-5 py-2.5 text-sm font-medium text-muted"
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
                  className="whitespace-nowrap rounded-full glass px-5 py-2.5 text-sm font-medium text-muted"
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
