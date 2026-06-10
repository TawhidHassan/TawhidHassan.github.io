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
        className="mx-auto grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 sm:gap-x-10 sm:gap-y-10 lg:grid-cols-4"
      >
        {customers.map((logo, index) => (
          <div key={index} className="flex items-center justify-center">
            {logo.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="mx-auto h-auto w-fit opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 dark:invert"
                src={logo.src}
                alt={logo.alt}
                height={logo.height}
                width="auto"
              />
            ) : (
              <span className="text-center text-base font-semibold tracking-tight text-muted transition-colors duration-300 hover:text-foreground sm:text-lg">
                {logo.alt}
              </span>
            )}
          </div>
        ))}
      </AnimatedGroup>
    </div>
  );
}
