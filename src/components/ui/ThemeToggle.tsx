"use client";

import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { Magnetic } from "./MagneticButton";
import { useMounted } from "@/hooks/useMounted";

/**
 * Animated theme switcher. Uses the View Transitions API for a smooth
 * circular wipe where supported, falling back to a crossfade.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = resolvedTheme === "dark";

  const toggle = async (e: React.MouseEvent) => {
    const next = isDark ? "light" : "dark";

    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(next);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const radius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    const transition = document.startViewTransition(() => setTheme(next));
    await transition.ready;
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${radius}px at ${x}px ${y}px)`,
        ],
      },
      { duration: 600, easing: "cubic-bezier(0.16,1,0.3,1)", pseudoElement: "::view-transition-new(root)" }
    );
  };

  if (!mounted) {
    return <div className="h-11 w-11 rounded-full glass" aria-hidden />;
  }

  return (
    <Magnetic>
      <button
        onClick={toggle}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-full glass text-foreground transition-colors hover:text-accent"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            {isDark ? <Moon size={18} /> : <Sun size={18} />}
          </motion.span>
        </AnimatePresence>
      </button>
    </Magnetic>
  );
}
