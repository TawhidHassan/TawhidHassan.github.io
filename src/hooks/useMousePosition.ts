"use client";

import { useEffect, useState } from "react";

export type MousePosition = { x: number; y: number };

/**
 * Track the global mouse position. Uses passive listeners for performance.
 */
export function useMousePosition() {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return position;
}
