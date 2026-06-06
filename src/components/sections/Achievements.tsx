"use client";

import { motion } from "motion/react";
import { achievements, stats } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { CountUp } from "@/components/ui/CountUp";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function Achievements() {
  return (
    <section id="achievements" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        {/* Stats band */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="depth-shadow relative grid grid-cols-2 gap-4 overflow-hidden rounded-3xl glass p-6 sm:gap-6 sm:p-8 lg:grid-cols-4"
        >
          <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeInUp}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="text-4xl font-bold text-flow sm:text-5xl font-[family-name:var(--font-display)]">
                <CountUp value={Number(s.value)} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-xs font-medium uppercase tracking-wide text-muted sm:text-sm">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-24">
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
            className="perspective mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {achievements.map((a) => (
              <motion.div key={a.title} variants={fadeInUp}>
                <GlowCard className="h-full p-6">
                  <div className="flex h-full flex-col gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent-3/20 text-accent">
                      <a.icon size={22} />
                    </span>
                    <h3 className="text-lg font-semibold">{a.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">
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
