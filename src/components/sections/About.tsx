"use client";

import { motion } from "motion/react";
import { about, education, profile } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { Reveal } from "@/components/ui/Reveal";
import { staggerContainer, fadeInUp, viewportOnce } from "@/lib/motion";

export function About() {
  return (
    <section id="about" className="relative py-16 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="About Me"
          title={about.heading}
          align="left"
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Story */}
          <div className="space-y-6">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-lg leading-relaxed text-muted">{p}</p>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <div className="mt-8 rounded-3xl glass p-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
                  Education
                </h3>
                <div className="space-y-5">
                  {education.map((e) => (
                    <div key={e.degree} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-medium">{e.degree}</span>
                        <span className="shrink-0 text-xs text-muted">
                          {e.period}
                        </span>
                      </div>
                      <span className="text-sm text-muted">{e.institution}</span>
                      <span className="text-xs font-medium text-accent">
                        {e.result}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Highlight cards */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="perspective grid gap-5 sm:grid-cols-2"
          >
            {about.highlights.map((h) => (
              <motion.div key={h.title} variants={fadeInUp}>
                <GlowCard className="h-full p-6">
                  <div className="flex h-full flex-col gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent-2/20 text-accent">
                      <h.icon size={22} />
                    </span>
                    <h3 className="text-lg font-semibold">{h.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {h.description}
                    </p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Signature line */}
        <Reveal delay={0.1}>
          <p className="mt-10 sm:mt-16 text-center text-sm text-muted">
            <span className="font-medium text-foreground">{profile.fullName}</span>{" "}
            · {profile.location} · {profile.experienceYears} years of crafting
            mobile products
          </p>
        </Reveal>
      </div>
    </section>
  );
}
