"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion, useIsDesktop } from "@/hooks/useMediaQuery";

type ParticlesProps = {
  className?: string;
  quantity?: number;
};

/**
 * Lightweight canvas particle field with cursor-reactive parallax and
 * proximity links. Caps DPR and particle count for performance.
 */
export function Particles({ className, quantity = 60 }: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();
  // Cursor-reactive field is pointless without a fine pointer, and the O(n²)
  // link loop is a frame killer on phones. Desktop only.
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (reduced || !isDesktop) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -999, y: -999 };

    type P = { x: number; y: number; vx: number; vy: number; r: number };
    let particles: P[] = [];

    const accent = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-rgb")
        .trim() || "91,140,255";

    const resize = () => {
      const parent = canvas.parentElement;
      w = parent?.clientWidth ?? window.innerWidth;
      h = parent?.clientHeight ?? window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(
        quantity,
        Math.floor((w * h) / 16000)
      );
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.6 + 0.6,
      }));
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);
      const rgb = accent();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // cursor repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          p.x += (dx / dist) * 0.8;
          p.y += (dy / dist) * 0.8;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},0.6)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${rgb},${0.12 * (1 - d / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(step);
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -999;
      mouse.y = -999;
    };

    resize();
    step();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("mouseout", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [quantity, reduced, isDesktop]);

  if (!isDesktop) return null;

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}
