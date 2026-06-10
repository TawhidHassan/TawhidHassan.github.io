"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { ArrowDown, Download, Mail, Sparkles } from "lucide-react";
import { profile, socials } from "@/lib/data";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { Particles } from "@/components/ui/Particles";
import { Typewriter } from "@/components/ui/Typewriter";
import { MagneticButton, Magnetic } from "@/components/ui/MagneticButton";
import { HudCorners, HudTag } from "@/components/ui/Hud";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { ease } from "@/lib/motion";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const isDesktop = useIsDesktop();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  // Cursor-driven 3D tilt for the avatar stack.
  const tiltX = useSpring(useMotionValue(0), { stiffness: 120, damping: 16 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 120, damping: 16 });
  const onAvatarMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(px * 22);
    tiltX.set(-py * 22);
  };
  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16"
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
            <span className="text-flow">{profile.name}</span>
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
            <MagneticButton
              href="/Sifat_Tawhid_Hassan_CV.pdf"
              download
              variant="outline"
              icon={<Download size={16} />}
            >
              Download CV
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

        {/* Right: 3D avatar stack */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease, delay: 0.5 }}
          onMouseMove={onAvatarMove}
          onMouseLeave={resetTilt}
          style={{ perspective: 1200 }}
          className="relative order-1 mx-auto aspect-square w-full max-w-[280px] sm:max-w-xs lg:order-2 lg:max-w-sm"
        >
          <motion.div
            style={{
              rotateX: tiltX,
              rotateY: tiltY,
              transformStyle: "preserve-3d",
            }}
            className="relative h-full w-full"
          >
            {/* rotating conic halo (deep back layer) */}
            <div
              style={{ transform: "translateZ(-80px)" }}
              className="absolute inset-0 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(var(--accent-rgb),0.55),transparent_40%)] blur-md"
            />
            {/* pulsing glow */}
            <div
              style={{ transform: "translateZ(-40px)" }}
              className="absolute inset-2 animate-glow-pulse rounded-full bg-[radial-gradient(circle,rgba(var(--accent-rgb),0.25),transparent_60%)] blur-2xl"
            />
            {/* glass plate */}
            <div
              style={{ transform: "translateZ(10px)" }}
              className="absolute inset-3 rounded-full glass"
            />
            {/* dashed orbit ring */}
            <div
              style={{ transform: "translateZ(30px)" }}
              className="absolute inset-1 animate-spin-slow rounded-full border border-dashed border-accent/25 [animation-direction:reverse]"
            />
            {/* photo */}
            <div
              style={{ transform: "translateZ(60px)" }}
              className="absolute inset-6 overflow-hidden rounded-full bg-gradient-to-br from-background-2 to-background"
            >
              <Image
                src="/sifat.png"
                alt={`${profile.fullName} — ${profile.tagline}`}
                fill
                priority
                sizes="(min-width: 1024px) 24rem, (min-width: 640px) 20rem, 16rem"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
              {/* HUD scan sweep over the photo */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-12 animate-scan bg-gradient-to-b from-accent/25 to-transparent" />
            </div>

            {/* floating badges — raised highest in Z for parallax depth */}
            {[
              { label: "Flutter", className: "left-0 top-10" },
              { label: "5+ yrs", className: "right-0 top-24" },
              { label: "20+ apps", className: "bottom-12 left-2" },
              { label: "Android · iOS", className: "bottom-4 right-6" },
            ].map((b, i) => (
              <motion.span
                key={b.label}
                style={{ z: 120 }}
                className={`absolute ${b.className} z-20 rounded-full glass px-3 py-1.5 text-xs font-medium text-foreground shadow-lg shadow-black/10`}
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

          {/* HUD frame brackets */}
          <HudCorners className="scale-110" />
          <HudTag className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap">
            SYSTEM_ONLINE · BUILD_READY
          </HudTag>
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
