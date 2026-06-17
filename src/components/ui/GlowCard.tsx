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
  glare?: boolean;
  /** Max tilt in degrees. */
  intensity?: number;
};

/**
 * Spatial card with cursor-following spotlight, glare sheen and 3D tilt.
 * Children sit on a raised Z-plane so they appear to float above the surface.
 */
export function GlowCard({
  children,
  className,
  tilt = true,
  spotlight = true,
  glare = true,
  intensity = 14,
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  // pointer position (px) for the spotlight + glare
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
      ry.set((px / rect.width - 0.5) * intensity);
      rx.set(-(py / rect.height - 0.5) * intensity);
    }
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  const background = useMotionTemplate`radial-gradient(280px circle at ${mx}px ${my}px, rgba(var(--accent-rgb),0.18), transparent 70%)`;
  const glareBg = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, rgba(255,255,255,0.14), transparent 60%)`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={
        tilt
          ? {
              rotateX: rx,
              rotateY: ry,
              transformPerspective: 1000,
              transformStyle: "preserve-3d",
            }
          : undefined
      }
      whileHover={tilt && isDesktop ? { z: 30 } : undefined}
      className={cn(
        "group neon-ring holo depth-shadow relative overflow-hidden rounded-3xl border border-card-border bg-card backdrop-blur-xl",
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
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glareBg }}
        />
      )}
      <div
        style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
        className="relative z-10 h-full"
      >
        {children}
      </div>
    </motion.div>
  );
}
