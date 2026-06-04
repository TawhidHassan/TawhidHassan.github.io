"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";
import { useIsDesktop } from "@/hooks/useMediaQuery";

/**
 * Floating gradient "aurora" blobs that drift on their own and subtly
 * parallax toward the cursor. Pure CSS gradients — very cheap to render.
 */
export function AuroraBackground() {
  const isDesktop = useIsDesktop();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });

  const x1 = useTransform(sx, [-0.5, 0.5], [-40, 40]);
  const y1 = useTransform(sy, [-0.5, 0.5], [-40, 40]);
  const x2 = useTransform(sx, [-0.5, 0.5], [30, -30]);
  const y2 = useTransform(sy, [-0.5, 0.5], [30, -30]);

  useEffect(() => {
    if (!isDesktop) return;
    const handle = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, [isDesktop, mx, my]);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg mask-fade-b opacity-70" />

      <motion.div
        style={{ x: x1, y: y1 }}
        className="absolute -left-32 -top-32 h-[42rem] w-[42rem] animate-float rounded-full bg-[radial-gradient(circle,rgba(var(--accent-rgb),0.35),transparent_60%)] blur-3xl"
      />
      <motion.div
        style={{ x: x2, y: y2 }}
        className="absolute -right-40 top-20 h-[38rem] w-[38rem] animate-float rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.3),transparent_60%)] blur-3xl [animation-delay:-3s]"
      />
      <div className="absolute bottom-[-12rem] left-1/3 h-[34rem] w-[34rem] animate-float rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.22),transparent_60%)] blur-3xl [animation-delay:-6s]" />
    </div>
  );
}
