"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "motion/react";
import { cn } from "@/lib/utils";
import { useIsDesktop } from "@/hooks/useMediaQuery";

type GlowCardProps = {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  spotlight?: boolean;
};

/**
 * Interactive card with a cursor-following spotlight and optional 3D tilt.
 */
export function GlowCard({
  children,
  className,
  tilt = true,
  spotlight = true,
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  // pointer position (px) for the spotlight
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // normalized (-0.5..0.5) for tilt
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !isDesktop) return;
    const rect = ref.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    mx.set(px);
    my.set(py);
    if (tilt) {
      ry.set(((px / rect.width) - 0.5) * 10);
      rx.set(-((py / rect.height) - 0.5) * 10);
    }
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  const background = useMotionTemplate`radial-gradient(280px circle at ${mx}px ${my}px, rgba(var(--accent-rgb),0.16), transparent 70%)`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={
        tilt
          ? { rotateX: rx, rotateY: ry, transformPerspective: 1000 }
          : undefined
      }
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-card-border bg-card backdrop-blur-xl",
        className
      )}
    >
      {spotlight && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background }}
        />
      )}
      {/* hairline gradient border on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/30 via-transparent to-accent-3/30 [mask:linear-gradient(#000,#000)_content-box,linear-gradient(#000,#000)] [mask-composite:exclude] p-px" />
      </div>
      <div style={{ transform: "translateZ(40px)" }} className="relative h-full">
        {children}
      </div>
    </motion.div>
  );
}
