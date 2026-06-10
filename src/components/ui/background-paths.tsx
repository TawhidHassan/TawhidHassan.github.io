"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * One direction of animated flowing SVG paths. Inherits `currentColor`, so the
 * parent sets the tint via a `text-*` class.
 */
function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 696 316"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <title>Background Paths</title>
      {paths.map((path) => (
        <motion.path
          key={path.id}
          d={path.d}
          stroke="currentColor"
          strokeWidth={path.width}
          strokeOpacity={0.1 + path.id * 0.03}
          initial={{ pathLength: 0.3, opacity: 0.6 }}
          animate={{
            pathLength: 1,
            opacity: [0.3, 0.6, 0.3],
            pathOffset: [0, 1, 0],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </svg>
  );
}

/**
 * Drop-in animated background layer for a section. Place as the first child of
 * a `relative` container — it sits behind static content via `-z-10` and is
 * tinted with the accent color at low opacity.
 */
export function BackgroundPaths({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden text-accent opacity-[0.13]",
        className
      )}
    >
      <FloatingPaths position={1} />
      {/* Second layer doubles the animated paths — skip it on phones. */}
      <div className="hidden h-full w-full sm:block">
        <FloatingPaths position={-1} />
      </div>
    </div>
  );
}
