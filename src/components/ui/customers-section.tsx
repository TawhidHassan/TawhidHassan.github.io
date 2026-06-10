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
  /** Logo image URL. When omitted, `alt` renders as a text wordmark. */
  src?: string;
  alt: string;
  height?: number;
}

interface CustomersSectionProps {
  customers: CustomerLogo[];
  className?: string;
}

export function CustomersSection({
  customers = [],
  className,
}: CustomersSectionProps) {
  return (
    <div className={cn("group relative m-auto max-w-5xl", className)}>
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
            className="group/card relative flex min-h-[76px] items-center justify-center overflow-hidden rounded-2xl border border-card-border glass px-4 py-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
          >
            {/* accent glow on hover */}
            <span className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_50%_0%,rgba(var(--accent-rgb),0.16),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />
            {logo.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="mx-auto h-auto w-fit opacity-80 grayscale transition duration-300 group-hover/card:opacity-100 group-hover/card:grayscale-0 dark:invert"
                src={logo.src}
                alt={logo.alt}
                height={logo.height}
                width="auto"
              />
            ) : (
              <span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-sm font-semibold tracking-tight text-transparent transition-colors duration-300 group-hover/card:from-accent group-hover/card:to-accent-2 sm:text-base">
                {logo.alt}
              </span>
            )}
          </div>
        ))}
      </AnimatedGroup>
    </div>
  );
}
