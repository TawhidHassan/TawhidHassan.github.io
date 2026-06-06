"use client";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Full-screen film grain + vignette. Adds analog texture and focuses the eye
 * toward the center — a subtle cinematic / "advanced build" finish.
 */
export function Grain() {
  const reduced = usePrefersReducedMotion();
  return (
    <>
      <div aria-hidden className="vignette" />
      {!reduced && <div aria-hidden className="grain-overlay" />}
    </>
  );
}
