"use client";

import { motion } from "motion/react";
import { AnimatedText } from "./AnimatedText";
import { viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Two-digit section number shown ahead of the eyebrow, e.g. "03". */
  index?: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2.5 sm:gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        className="hud-label neon-ring neon-ring--on relative inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[11px] font-medium text-accent"
      >
        {index ? (
          <>
            <span className="text-foreground/80">{index}</span>
            <span className="h-3 w-px bg-accent/40" />
          </>
        ) : (
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
        )}
        {eyebrow}
      </motion.span>

      <div
        className={cn(
          "flex flex-col gap-2.5 sm:gap-3.5",
          align === "center" ? "items-center" : "items-start"
        )}
      >
        <AnimatedText
          as="h2"
          text={title}
          className="max-w-3xl text-balance text-2xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl font-[family-name:var(--font-display)]"
        />
        <motion.span
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "neon-underline h-[3px] w-20 rounded-full",
            align === "center" ? "origin-center" : "origin-left"
          )}
        />
      </div>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.15 }}
          className={cn(
            "max-w-2xl text-pretty text-sm leading-relaxed text-muted sm:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
