/**
 * Shared helpers for the three.js layers: capability sniffing, theme colour
 * plumbing and a scroll signal every scene can read without its own listener.
 */

let webglSupport: boolean | null = null;

/** Cheap one-time WebGL probe — the context is thrown away immediately. */
export function supportsWebGL() {
  if (webglSupport !== null) return webglSupport;
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    webglSupport = !!gl;
    // Free the context right away; browsers cap how many can live at once.
    (gl as WebGLRenderingContext | null)
      ?.getExtension("WEBGL_lose_context")
      ?.loseContext();
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

/** Devices that will melt if we hand them a full-resolution fragment shader. */
export function isLowPower() {
  if (typeof window === "undefined") return true;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const cores = navigator.hardwareConcurrency ?? 4;
  return coarse || cores <= 4;
}

/** DPR cap: sharp on desktop, deliberately soft on phones. */
export function pixelRatio() {
  const dpr = typeof window === "undefined" ? 1 : window.devicePixelRatio || 1;
  return Math.min(dpr, isLowPower() ? 1.25 : 1.75);
}

export type Palette = {
  accent: [number, number, number];
  accent2: [number, number, number];
  accent3: [number, number, number];
  dark: boolean;
};

function hexToRgb(input: string): [number, number, number] {
  const value = input.trim();
  const hex = value.replace("#", "");
  if (hex.length === 6) {
    return [
      parseInt(hex.slice(0, 2), 16) / 255,
      parseInt(hex.slice(2, 4), 16) / 255,
      parseInt(hex.slice(4, 6), 16) / 255,
    ];
  }
  const match = value.match(/-?\d*\.?\d+/g);
  if (match && match.length >= 3) {
    return [+match[0] / 255, +match[1] / 255, +match[2] / 255];
  }
  return [0.36, 0.55, 1];
}

/** Read the live design tokens so the scenes follow the CSS theme. */
export function readPalette(): Palette {
  const style = getComputedStyle(document.documentElement);
  return {
    accent: hexToRgb(style.getPropertyValue("--accent") || "#5b8cff"),
    accent2: hexToRgb(style.getPropertyValue("--accent-2") || "#a78bfa"),
    accent3: hexToRgb(style.getPropertyValue("--accent-3") || "#22d3ee"),
    dark: document.documentElement.classList.contains("dark"),
  };
}

/** Fire `onChange` whenever next-themes flips the `dark` class. */
export function watchTheme(onChange: (palette: Palette) => void) {
  const observer = new MutationObserver(() => onChange(readPalette()));
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class", "style"],
  });
  return () => observer.disconnect();
}

/**
 * Page-wide scroll signal, sampled once per frame and shared by every scene:
 * `progress` is 0→1 down the document, `velocity` is a decaying warp impulse.
 */
export const scrollSignal = { progress: 0, velocity: 0 };

let scrollSubscribers = 0;
let lastScrollY = 0;

function sampleScroll() {
  const y = window.scrollY;
  const max = Math.max(
    1,
    document.documentElement.scrollHeight - window.innerHeight
  );
  scrollSignal.progress = Math.min(1, Math.max(0, y / max));
  // Normalised jump since the last sample, clamped so a fling can't blow up.
  const delta = Math.min(Math.abs(y - lastScrollY) / 90, 1.6);
  scrollSignal.velocity = Math.max(scrollSignal.velocity * 0.9, delta);
  lastScrollY = y;
}

/** Reference-counted scroll listener; the last detach tears it down. */
export function attachScrollSignal() {
  if (scrollSubscribers === 0) {
    lastScrollY = window.scrollY;
    window.addEventListener("scroll", sampleScroll, { passive: true });
  }
  scrollSubscribers++;
  return () => {
    scrollSubscribers--;
    if (scrollSubscribers === 0) {
      window.removeEventListener("scroll", sampleScroll);
    }
  };
}

/** Per-frame decay so `velocity` falls back to rest when scrolling stops. */
export function decayScrollSignal(dt: number) {
  scrollSignal.velocity *= Math.exp(-dt * 3.2);
}
