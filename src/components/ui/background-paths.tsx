import { cn } from "@/lib/utils";

/**
 * One direction of flowing SVG paths. Inherits `currentColor`, so the parent
 * sets the tint via a `text-*` class.
 *
 * Perf: these are STATIC paths. The previous version animated `pathLength` and
 * `pathOffset` on 36 `motion.path` nodes per layer — that runs on the main
 * thread and, multiplied across every section, tanked scroll on mobile. The
 * gentle "alive" feel now comes from a single GPU-composited opacity pulse on
 * the wrapper (`.bg-paths`), so the whole layer costs one cheap animation.
 */
function FloatingPaths({ position, count }: { position: number; count: number }) {
  const paths = Array.from({ length: count }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.06,
    opacity: 0.1 + i * 0.05,
  }));

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 696 316"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {paths.map((path) => (
        <path
          key={path.id}
          d={path.d}
          stroke="currentColor"
          strokeWidth={path.width}
          strokeOpacity={path.opacity}
        />
      ))}
    </svg>
  );
}

/**
 * Drop-in background layer for a section. Place as the first child of a
 * `relative` container — it sits behind static content via `-z-10`.
 * Server component (no client JS): cheaper bundle, cheaper render.
 */
export function BackgroundPaths({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "bg-paths pointer-events-none absolute inset-0 -z-10 overflow-hidden text-accent opacity-[0.13]",
        className
      )}
    >
      <FloatingPaths position={1} count={14} />
      {/* Second layer doubles the paths — skip it on phones. */}
      <div className="hidden h-full w-full sm:block">
        <FloatingPaths position={-1} count={14} />
      </div>
    </div>
  );
}
