import React from "react";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { cn } from "@/lib/utils";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring" as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export interface CustomerLogo {
  /** Logo image URL. When omitted, a monogram + wordmark is rendered. */
  src?: string;
  alt: string;
  height?: number;
}

interface CustomersSectionProps {
  customers: CustomerLogo[];
  className?: string;
}

/** Monogram tints — cycle through the three theme accents. */
const TINTS = [
  "from-accent/30 to-accent/5 text-accent ring-accent/30",
  "from-accent-2/30 to-accent-2/5 text-accent-2 ring-accent-2/30",
  "from-accent-3/30 to-accent-3/5 text-accent-3 ring-accent-3/30",
];

/** "Samsung Bangladesh" → "SB", "GCB" → "GC". */
function monogram(name: string) {
  const words = name.replace(/\(.*?\)/g, "").match(/[A-Za-z0-9]+/g) ?? [];
  const [first = "", second = ""] = words;
  if (!first) return "•";
  if (!second) return first.slice(0, 2).toUpperCase();
  return (first.charAt(0) + second.charAt(0)).toUpperCase();
}

export function CustomersSection({
  customers = [],
  className,
}: CustomersSectionProps) {
  return (
    <div className={cn("relative m-auto max-w-5xl", className)}>
      <AnimatedGroup
        variants={{
          container: {
            visible: {
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2,
              },
            },
          },
          ...transitionVariants,
        }}
        className="mx-auto grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
      >
        {customers.map((logo, index) => (
          <div
            key={index}
            className="group/card card-surface depth-shadow relative flex min-h-[64px] items-center gap-3 overflow-hidden rounded-2xl border border-card-border px-3 py-3 backdrop-blur-xl transition-[border-color,translate] duration-300 hover:-translate-y-1 hover:border-accent/50 sm:min-h-[84px] sm:px-4 sm:py-4"
          >
            {/* accent glow on hover */}
            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(var(--accent-rgb),0.2),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />
            {logo.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="relative mx-auto h-auto max-h-10 w-fit opacity-80 grayscale transition duration-300 group-hover/card:opacity-100 group-hover/card:grayscale-0 dark:invert"
                src={logo.src}
                alt={logo.alt}
                height={logo.height}
                width="auto"
              />
            ) : (
              <>
                <span
                  aria-hidden
                  className={cn(
                    "relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-xs font-bold tracking-tight ring-1 ring-inset sm:h-11 sm:w-11 sm:text-sm font-[family-name:var(--font-display)]",
                    TINTS[index % TINTS.length]
                  )}
                >
                  {monogram(logo.alt)}
                </span>
                <span className="relative min-w-0 text-left text-xs font-semibold leading-snug tracking-tight text-foreground/90 sm:text-sm">
                  {logo.alt}
                </span>
              </>
            )}
          </div>
        ))}
      </AnimatedGroup>
    </div>
  );
}
