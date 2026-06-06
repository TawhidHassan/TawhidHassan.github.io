"use client";

import { cn } from "@/lib/utils";

/**
 * Decorative HUD corner brackets — frames an element with technical "viewport"
 * corners for an engineered, futuristic feel.
 */
export function HudCorners({
  className,
  size = 20,
}: {
  className?: string;
  size?: number;
}) {
  const corner = "absolute h-5 w-5 border-accent/60";
  const s = { width: size, height: size } as const;
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      <span style={s} className={cn(corner, "left-0 top-0 border-l-2 border-t-2")} />
      <span style={s} className={cn(corner, "right-0 top-0 border-r-2 border-t-2")} />
      <span style={s} className={cn(corner, "bottom-0 left-0 border-b-2 border-l-2")} />
      <span style={s} className={cn(corner, "bottom-0 right-0 border-b-2 border-r-2")} />
    </div>
  );
}

/**
 * Monospace HUD tag, e.g.  ▮ SYSTEM_ONLINE
 */
export function HudTag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "hud-label inline-flex items-center gap-2 text-[10px] text-muted",
        className
      )}
    >
      <span className="h-3 w-px bg-accent" />
      {children}
    </span>
  );
}
