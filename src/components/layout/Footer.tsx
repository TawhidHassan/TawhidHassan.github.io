"use client";

import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { navLinks, profile, socials } from "@/lib/data";
import { Magnetic } from "@/components/ui/MagneticButton";
import { viewportOnce } from "@/lib/motion";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-card-border">
      <div className="pointer-events-none absolute inset-x-0 -bottom-40 mx-auto h-72 w-[60rem] max-w-full rounded-full bg-[radial-gradient(circle,rgba(var(--accent-rgb),0.18),transparent_60%)] blur-3xl" />

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <a href="#home" className="flex items-center gap-2 text-xl font-semibold">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent via-accent-2 to-accent-3 text-sm font-bold text-white">
                {profile.initials}
              </span>
              {profile.name}
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {profile.tagline}. Building scalable, high-performance mobile
              products with a craft mindset.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted">
                Navigate
              </h3>
              <ul className="mt-4 space-y-3">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted">
                Connect
              </h3>
              <ul className="mt-4 space-y-3">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                    >
                      <s.icon size={15} />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-card-border pt-8 sm:flex-row"
        >
          <p className="text-sm text-muted">
            © {year} {profile.fullName}. All rights reserved.
          </p>
          <Magnetic>
            <a
              href="#home"
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-muted transition-colors hover:text-accent"
            >
              Back to top <ArrowUp size={15} />
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </footer>
  );
}
