"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { about, education, profile } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { GlowCard } from "@/components/ui/GlowCard";
import { Reveal } from "@/components/ui/Reveal";
import { staggerContainer, fadeInUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function About() {
  // Mobile-only "read more" — the full story is always visible from sm: up.
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" className="relative py-10 sm:py-28 lg:py-36">
      <BackgroundPaths />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="About Me"
          title={about.heading}
          align="left"
        />

        <div className="mt-6 grid gap-6 sm:mt-14 sm:gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          {/* Story */}
          <div className="space-y-3 sm:space-y-6">
            {about.paragraphs.map((p, i) => (
              <Reveal
                key={i}
                delay={i * 0.08}
                className={cn(i > 0 && !expanded && "hidden sm:block")}
              >
                <p className="text-sm leading-relaxed text-muted sm:text-lg">
                  {p}
                </p>
              </Reveal>
            ))}

            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent sm:hidden"
            >
              {expanded ? "Show less" : "Read more"}
              <ChevronDown
                size={15}
                className={cn("transition-transform", expanded && "rotate-180")}
              />
            </button>

            <Reveal delay={0.2}>
              <div className="mt-4 rounded-3xl glass p-5 sm:mt-8 sm:p-6">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent sm:mb-4">
                  Education
                </h3>
                <div className="space-y-4 sm:space-y-5">
                  {education.map((e) => (
                    <div key={e.degree} className="flex flex-col gap-0.5 sm:gap-1">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm font-medium sm:text-base">
                          {e.degree}
                        </span>
                        <span className="shrink-0 text-xs text-muted">
                          {e.period}
                        </span>
                      </div>
                      <span className="text-xs text-muted sm:text-sm">
                        {e.institution}
                      </span>
                      <span className="text-xs font-medium text-accent">
                        {e.result}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Highlight cards — horizontal rows on mobile, vertical cards from sm: */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="perspective grid gap-3 sm:grid-cols-2 sm:gap-5"
          >
            {about.highlights.map((h) => (
              <motion.div key={h.title} variants={fadeInUp}>
                <GlowCard className="h-full p-4 sm:p-6">
                  <div className="flex h-full items-start gap-3 sm:flex-col sm:gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-2/20 text-accent sm:h-12 sm:w-12 sm:rounded-2xl">
                      <h.icon size={20} />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold sm:text-lg">
                        {h.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted sm:mt-2 sm:text-sm">
                        {h.description}
                      </p>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Signature line */}
        <Reveal delay={0.1}>
          <p className="mt-8 sm:mt-16 text-center text-sm text-muted">
            <span className="font-medium text-foreground">{profile.fullName}</span>{" "}
            · {profile.location} · {profile.experienceYears} years of crafting
            mobile products
          </p>
        </Reveal>
      </div>
    </section>
  );
}
