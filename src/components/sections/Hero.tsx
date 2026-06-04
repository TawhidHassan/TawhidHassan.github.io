"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { ArrowDown, Mail, Sparkles } from "lucide-react";
import { profile, socials } from "@/lib/data";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { Particles } from "@/components/ui/Particles";
import { Typewriter } from "@/components/ui/Typewriter";
import { MagneticButton, Magnetic } from "@/components/ui/MagneticButton";
import { ease } from "@/lib/motion";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      <AuroraBackground />
      <Particles className="-z-10 opacity-70" quantity={70} />

      <motion.div
        style={{ y, opacity, scale }}
        className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.15fr_0.85fr]"
      >
        {/* Left: copy */}
        <div className="order-2 flex flex-col items-start lg:order-1">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted"
          >
            <Sparkles size={14} className="text-accent" />
            {profile.availability}
            <span className="ml-1 flex h-2 w-2">
              <span className="absolute h-2 w-2 animate-ping rounded-full bg-emerald-400/70" />
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </span>
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.4 }}
            className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl font-[family-name:var(--font-display)]"
          >
            Hi, I&apos;m{" "}
            <span className="text-gradient">{profile.name}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.55 }}
            className="mt-4 flex min-h-[2.5rem] items-center text-xl font-medium text-muted sm:text-2xl"
          >
            <Typewriter words={[...profile.roles]} className="text-foreground" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.7 }}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
          >
            {profile.shortBio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.85 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#projects" icon={<ArrowDown size={16} />}>
              View My Work
            </MagneticButton>
            <MagneticButton href="#contact" variant="outline" icon={<Mail size={16} />}>
              Get in Touch
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-10 flex items-center gap-3"
          >
            <span className="text-xs uppercase tracking-widest text-muted">
              Find me
            </span>
            <span className="h-px w-8 bg-card-border" />
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <Magnetic key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-full glass text-muted transition-colors hover:text-accent"
                  >
                    <s.icon size={17} />
                  </a>
                </Magnetic>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease, delay: 0.5 }}
          className="relative order-1 mx-auto aspect-square w-full max-w-[260px] sm:max-w-xs lg:order-2 lg:max-w-sm"
        >
          <div className="absolute inset-0 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(var(--accent-rgb),0.5),transparent_40%)] blur-md" />
          <div className="absolute inset-3 rounded-full glass" />
          <div className="absolute inset-6 overflow-hidden rounded-full bg-gradient-to-br from-background-2 to-background">
            <Image
              src="/sifat.png"
              alt={`${profile.fullName} — ${profile.tagline}`}
              fill
              priority
              sizes="(min-width: 1024px) 24rem, (min-width: 640px) 20rem, 16rem"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
          </div>

          {/* floating badges */}
          {[
            { label: "Flutter", className: "left-0 top-10" },
            { label: "5+ yrs", className: "right-0 top-24" },
            { label: "20+ apps", className: "bottom-12 left-2" },
            { label: "Android · iOS", className: "bottom-4 right-6" },
          ].map((b, i) => (
            <motion.span
              key={b.label}
              className={`absolute ${b.className} rounded-full glass px-3 py-1.5 text-xs font-medium text-foreground`}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            >
              {b.label}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-card-border p-1">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-accent"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </span>
      </motion.a>
    </section>
  );
}
