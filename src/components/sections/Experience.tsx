"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { experiences } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { fadeInUp, viewportOnce } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const container = useRef<HTMLDivElement>(null);
  const beam = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!beam.current || !container.current) return;
      gsap.fromTo(
        beam.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top 65%",
            end: "bottom 70%",
            scrub: 0.6,
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <section id="experience" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Career Path"
          title="A timeline of building & shipping."
          description="Five-plus years across fintech, HR, ecommerce, edtech, and enterprise automation — leading teams and owning delivery."
        />

        <div ref={container} className="relative mt-20">
          {/* track */}
          <div className="absolute left-[18px] top-0 h-full w-px bg-card-border md:left-1/2 md:-translate-x-1/2" />
          {/* animated beam */}
          <div
            ref={beam}
            className="absolute left-[18px] top-0 h-full w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-accent-3 md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-12">
            {experiences.map((exp, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={exp.company + exp.period}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className={`relative flex flex-col gap-6 md:flex-row md:items-center ${
                    left ? "" : "md:flex-row-reverse"
                  }`}
                >
                  {/* node */}
                  <span className="absolute left-[18px] top-2 z-10 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full glass text-accent md:left-1/2">
                    <exp.icon size={16} />
                    <span className="absolute inset-0 animate-ping rounded-full border border-accent/40" />
                  </span>

                  {/* spacer for the opposite column on desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  <div
                    className={`pl-12 md:w-1/2 md:pl-0 ${
                      left ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <GlowCard tilt={false} className="p-6">
                      <div
                        className={`flex flex-col gap-3 ${
                          left ? "md:items-end" : "md:items-start"
                        }`}
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                            {exp.period}
                          </span>
                          <span className="rounded-full bg-foreground/5 px-3 py-1 text-xs text-muted">
                            {exp.type}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold">{exp.role}</h3>
                        <p className="text-sm font-medium text-accent-2">
                          {exp.company}
                        </p>
                        <p className="text-sm leading-relaxed text-muted">
                          {exp.summary}
                        </p>
                        <ul
                          className={`mt-1 flex flex-wrap gap-2 ${
                            left ? "md:justify-end" : ""
                          }`}
                        >
                          {exp.projects.map((p) => (
                            <li
                              key={p}
                              className="rounded-lg border border-card-border bg-background-2/50 px-2.5 py-1 text-xs text-muted"
                            >
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </GlowCard>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
