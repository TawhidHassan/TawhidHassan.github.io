"use client";

import { motion } from "motion/react";
import { Quote, Mail } from "lucide-react";
import { testimonials } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { HudTag } from "@/components/ui/Hud";
import { Magnetic } from "@/components/ui/MagneticButton";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-16 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by people who ship."
          description="Words from engineering leaders and peers I've built alongside."
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="perspective mt-10 sm:mt-16 grid gap-6 md:grid-cols-2"
        >
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={fadeInUp}>
              <GlowCard className="h-full p-7 sm:p-8">
                <div className="flex h-full flex-col">
                  {/* big quote glyph */}
                  <span
                    style={{ transform: "translateZ(30px)" }}
                    className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${t.accent} text-white shadow-lg shadow-black/10`}
                  >
                    <Quote size={22} fill="currentColor" />
                  </span>

                  <p
                    style={{ transform: "translateZ(20px)" }}
                    className="mt-6 flex-1 text-pretty text-lg leading-relaxed text-foreground/90"
                  >
                    “{t.quote}”
                  </p>

                  {/* author */}
                  <div className="mt-7 flex items-center gap-4 border-t border-card-border pt-6">
                    <span
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br ${t.accent} text-sm font-bold text-white`}
                    >
                      {t.initials}
                    </span>
                    <div className="min-w-0">
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-sm text-muted">
                        {t.role}
                        <span className="text-accent"> · {t.company}</span>
                      </div>
                      {t.meta && (
                        <HudTag className="mt-1">{t.meta}</HudTag>
                      )}
                    </div>
                    {t.email && (
                      <Magnetic className="ml-auto">
                        <a
                          href={`mailto:${t.email}`}
                          aria-label={`Email ${t.name}`}
                          className="grid h-10 w-10 place-items-center rounded-full glass text-muted transition-colors hover:text-accent"
                        >
                          <Mail size={16} />
                        </a>
                      </Magnetic>
                    )}
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
