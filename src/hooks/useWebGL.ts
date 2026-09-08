"use client";

import { useSyncExternalStore } from "react";
import { supportsWebGL } from "@/lib/webgl";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

const noopSubscribe = () => () => {};

/**
 * True only after mount, on a GPU-capable browser, when the user hasn't asked
 * for reduced motion. Returns false on the server so hydration stays stable
 * (the probe result is cached, so calling it during render is free).
 */
export function useWebGL() {
  const reduced = usePrefersReducedMotion();
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
  return mounted && !reduced && supportsWebGL();
}
