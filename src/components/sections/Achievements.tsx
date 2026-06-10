"use client";

import { motion } from "motion/react";
import { achievements, stats } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { GlowCard } from "@/components/ui/GlowCard";
import { CountUp } from "@/components/ui/CountUp";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function Achievements() {
  return (
    <section id="achievements" className="relative py-10 sm:py-28 lg:py-36">
      <BackgroundPaths />

      <div className="mx-auto max-w-6xl px-6">
        {/* Stats band */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="depth-shadow relative grid grid-cols-2 gap-3 overflow-hidden rounded-3xl glass p-4 sm:gap-6 sm:p-8 lg:grid-cols-4"
        >
          <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeInUp}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="text-3xl font-bold text-flow sm:text-5xl font-[family-name:var(--font-display)]">
                <CountUp value={Number(s.value)} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-[10px] font-medium uppercase tracking-wide text-muted sm:mt-2 sm:text-sm">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 sm:mt-24">
          <SectionHeading
            eyebrow="Impact"
            title="Proven across scale & industries."
            description="A track record of shipping reliable products and leading teams from startups to enterprise."
          />

          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="perspective mt-6 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-5 lg:grid-cols-3"
          >
            {achievements.map((a) => (
              <motion.div key={a.title} variants={fadeInUp}>
                <GlowCard className="h-full p-4 sm:p-6">
                  <div className="flex h-full flex-col gap-2.5 sm:gap-4">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-3/20 text-accent sm:h-12 sm:w-12 sm:rounded-2xl">
                      <a.icon size={18} />
                    </span>
                    <h3 className="text-sm font-semibold sm:text-lg">
                      {a.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-muted sm:text-sm">
                      {a.description}
                    </p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
