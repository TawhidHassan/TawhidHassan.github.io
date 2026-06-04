"use client";

import { motion } from "motion/react";
import { textReveal, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type AnimatedTextProps = {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  once?: boolean;
};

/**
 * Splits text into words and reveals each from behind a mask. Great for
 * headlines. Each word lives in an overflow-hidden wrapper.
 */
export function AnimatedText({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  as = "span",
  once = true,
}: AnimatedTextProps) {
  const words = text.split(" ");
  const Tag = motion[as];

  return (
    <Tag
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="visible"
      viewport={once ? viewportOnce : { amount: 0.25 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span
            variants={textReveal}
            className={cn("inline-block", wordClassName)}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
