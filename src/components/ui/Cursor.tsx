"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { useMounted } from "@/hooks/useMounted";

/**
 * Premium dual-ring cursor: a precise dot plus a lagging ring that grows
 * over interactive elements. Desktop / fine-pointer only.
 */
export function Cursor() {
  const isDesktop = useIsDesktop();
  const mounted = useMounted();
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 });

  useEffect(() => {
    if (!isDesktop) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const el = e.target as HTMLElement;
      setHovering(
        !!el.closest('a, button, [data-cursor="hover"], input, textarea')
      );
    };
    const leave = () => setHidden(true);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.documentElement.classList.add("cursor-none-desktop");

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("cursor-none-desktop");
    };
  }, [isDesktop, x, y]);

  if (!mounted || !isDesktop) return null;

  return (
    <AnimatePresence>
      {!hidden && (
        <>
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-accent mix-blend-difference"
            style={{ x, y, translateX: "-50%", translateY: "-50%" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: hovering ? 0 : 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-accent/70 mix-blend-difference"
            style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              width: hovering ? 56 : 30,
              height: hovering ? 56 : 30,
              backgroundColor: hovering
                ? "rgba(var(--accent-rgb),0.12)"
                : "rgba(var(--accent-rgb),0)",
            }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
