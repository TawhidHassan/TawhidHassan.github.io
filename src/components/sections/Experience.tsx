"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronDown } from "lucide-react";
import { experiences, type ExperienceItem } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { GlowCard } from "@/components/ui/GlowCard";
import { fadeInUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

function ExperienceCard({ exp, left }: { exp: ExperienceItem; left: boolean }) {
  // Mobile-only collapse — full details always visible from md: up.
  const [open, setOpen] = useState(false);

  return (
    <GlowCard tilt={false} className="p-4 sm:p-6">
      <div
        className={cn(
          "flex flex-col gap-2 sm:gap-3",
          left ? "md:items-end" : "md:items-start"
        )}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent sm:px-3 sm:py-1">
            {exp.period}
          </span>
          <span className="rounded-full bg-foreground/5 px-2.5 py-0.5 text-xs text-muted sm:px-3 sm:py-1">
            {exp.type}
          </span>
        </div>
        <h3 className="text-base font-semibold sm:text-xl">{exp.role}</h3>
        <p className="text-sm font-medium text-accent-2">{exp.company}</p>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-accent md:hidden"
        >
          {open ? "Hide details" : `Details · ${exp.projects.length} projects`}
          <ChevronDown
            size={14}
            className={cn("transition-transform", open && "rotate-180")}
          />
        </button>

        <div
          className={cn(
            "flex-col gap-2 sm:gap-3",
            left ? "md:items-end" : "md:items-start",
            open ? "flex" : "hidden md:flex"
          )}
        >
          <p className="text-sm leading-relaxed text-muted">{exp.summary}</p>
          <ul
            className={cn(
              "mt-1 flex flex-wrap gap-1.5 sm:gap-2",
              left && "md:justify-end"
            )}
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
      </div>
    </GlowCard>
  );
}

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
    <section id="experience" className="relative py-10 sm:py-28 lg:py-36">
      <BackgroundPaths />

      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Career Path"
          title="A timeline of building & shipping."
          description="Five-plus years across fintech, HR, ecommerce, edtech, and enterprise automation — leading teams and owning delivery."
        />

        <div ref={container} className="relative mt-8 sm:mt-20">
          {/* track */}
          <div className="absolute left-[14px] top-0 h-full w-px bg-card-border sm:left-[18px] md:left-1/2 md:-translate-x-1/2" />
          {/* animated beam */}
          <div
            ref={beam}
            className="absolute left-[14px] top-0 h-full w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-accent-3 sm:left-[18px] md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-5 sm:space-y-12">
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
                  <span className="absolute left-[14px] top-2 z-10 grid h-7 w-7 -translate-x-1/2 place-items-center rounded-full glass text-accent sm:left-[18px] sm:h-9 sm:w-9 md:left-1/2">
                    <exp.icon size={14} />
                    <span className="absolute inset-0 animate-ping rounded-full border border-accent/40" />
                  </span>

                  {/* spacer for the opposite column on desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  <div
                    className={`pl-9 sm:pl-12 md:w-1/2 md:pl-0 ${
                      left ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <ExperienceCard exp={exp} left={left} />
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
