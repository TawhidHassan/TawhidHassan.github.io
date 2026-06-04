"use client";

import { motion } from "motion/react";
import { AnimatedText } from "./AnimatedText";
import { viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {eyebrow}
      </motion.span>

      <AnimatedText
        as="h2"
        text={title}
        className="max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl font-[family-name:var(--font-display)]"
      />

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.15 }}
          className={cn(
            "max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
