"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useSiteData } from "@/components/providers/SiteDataProvider";

/** Boot lines that tick past as the counter climbs — one per 25%. */
const BOOT_LINES = [
  "INIT NEURAL CORE",
  "COMPILING SHADERS",
  "SPINNING UP ORBIT RIG",
  "LINK ESTABLISHED",
] as const;

/**
 * Brief intro overlay: a boot readout that counts to 100, then curtains up.
 * Auto-dismisses; respects a max display time so it never blocks content.
 */
export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const { profile } = useSiteData();

  useEffect(() => {
    const start = performance.now();
    const dur = 1500;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      setCount(Math.round(t * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setLoading(false), 250);
    };
    raf = requestAnimationFrame(tick);
    document.body.style.overflow = "hidden";
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!loading) document.body.style.overflow = "";
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative grid h-24 w-24 place-items-center overflow-hidden rounded-3xl glass"
          >
            <Image
              src={profile.photoUrl}
              alt={profile.name}
              fill
              sizes="96px"
              priority
              className="object-cover"
            />
            <motion.span
              className="absolute inset-0 rounded-3xl border-2 border-accent/50"
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
          </motion.div>

          <div className="mt-8 h-px w-56 overflow-hidden bg-card-border">
            <motion.div
              className="h-full bg-gradient-to-r from-accent via-accent-2 to-accent-3"
              style={{ width: `${count}%` }}
            />
          </div>

          <div className="mt-4 flex w-56 items-center justify-between font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-muted">
            <span className="text-accent">
              {BOOT_LINES[Math.min(BOOT_LINES.length - 1, Math.floor(count / 25))]}
            </span>
            <span className="tabular-nums">{count}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
