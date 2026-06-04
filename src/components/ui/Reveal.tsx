"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { fadeInUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "span";
};

/** Generic in-view reveal wrapper. */
export function Reveal({
  children,
  className,
  variants = fadeInUp,
  delay = 0,
  as = "div",
}: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </Tag>
  );
}
