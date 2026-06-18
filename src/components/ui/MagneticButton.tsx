"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { useIsDesktop } from "@/hooks/useMediaQuery";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

/** Wraps content and gently pulls it toward the cursor (magnetic effect). */
export function Magnetic({ children, className, strength = 0.4 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.5 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  );
}

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  icon?: ReactNode;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
  download?: boolean | string;
  wrapperClassName?: string;
};

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 will-change-transform";

const variants = {
  primary:
    "text-white shadow-[0_8px_30px_-8px_rgba(var(--accent-rgb),0.6)] bg-gradient-to-r from-accent via-accent-2 to-accent-3",
  outline:
    "glass text-foreground hover:text-accent border border-glass-border",
  ghost: "text-foreground/80 hover:text-foreground",
};

/** Magnetic CTA button with shine sweep and gradient. */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  icon,
  external,
  type = "button",
  disabled,
  ariaLabel,
  download,
  wrapperClassName,
}: ButtonProps) {
  const [hover, setHover] = useState(false);

  const inner = (
    <span
      className={cn(base, variants[variant], disabled && "opacity-50", className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* shine sweep */}
      <span
        className={cn(
          "pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700",
          hover && "translate-x-full"
        )}
      />
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon}
      </span>
    </span>
  );

  if (href) {
    return (
      <Magnetic className={wrapperClassName}>
        <a
          href={href}
          aria-label={ariaLabel}
          download={download}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="flex w-full"
        >
          {inner}
        </a>
      </Magnetic>
    );
  }

  return (
    <Magnetic className={wrapperClassName}>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        className="flex w-full"
      >
        {inner}
      </button>
    </Magnetic>
  );
}
