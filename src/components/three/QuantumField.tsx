"use client";

import { useEffect, useRef } from "react";
import { useWebGL } from "@/hooks/useWebGL";
import {
  decayScrollSignal,
  isLowPower,
  pixelRatio,
  readPalette,
  scrollSignal,
  attachScrollSignal,
  watchTheme,
} from "@/lib/webgl";

/* -------------------------------------------------------------------------- */
/*                                  SHADERS                                    */
/* -------------------------------------------------------------------------- */

const QUAD_VERT = /* glsl */ `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

/**
 * Deep-space plate: domain-warped fbm nebula plus a procedural starfield whose
 * points stretch into hyperspace streaks the faster you scroll.
 */
const QUAD_FRAG = /* glsl */ `
  precision highp float;

  uniform vec2  uRes;
  uniform vec2  uMouse;
  uniform float uTime;
  uniform float uScroll;
  uniform float uWarp;
  uniform float uDark;
  uniform vec3  uA;
  uniform vec3  uB;
  uniform vec3  uC;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float sum = 0.0;
    float amp = 0.5;
    for (int i = 0; i < OCTAVES; i++) {
      sum += amp * noise(p);
      p = p * 2.03 + vec2(1.7, 9.2);
      amp *= 0.5;
    }
    return sum;
  }

  // One tier of stars. Cells are stretched along the radial direction so a
  // fast scroll reads as light-speed travel rather than a static sky.
  float starTier(vec2 p, float scale, float seed, float warp) {
    vec2 sp = p * scale + seed;
    vec2 id = floor(sp);
    vec2 f = fract(sp) - 0.5;
    float h = hash21(id + seed);
    if (h < 0.90) return 0.0;

    vec2 dir = normalize(p + vec2(1e-4));
    float along = dot(f, dir);
    float across = length(f - dir * along);
    float stretch = 1.0 + warp * 7.0 * smoothstep(0.2, 1.4, length(p));
    float d = length(vec2(along / stretch, across));

    float twinkle = 0.55 + 0.45 * sin(uTime * 2.4 + h * 63.0);
    return smoothstep(0.085, 0.0, d) * twinkle;
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
    vec2 p = uv + uMouse * 0.06;

    float t = uTime * 0.035;
    float warp = uWarp;

    // --- nebula ------------------------------------------------------------
    vec2 q = p * 1.15 + vec2(0.0, uScroll * 1.9);
    vec2 flow = vec2(
      fbm(q + vec2(0.0, t)),
      fbm(q + vec2(5.2, 1.3) - t)
    );
    float n1 = fbm(q + flow * 1.5);
    float n2 = fbm(q * 2.3 + flow * 2.4 - t * 0.8);

    vec3 col = mix(uA, uB, smoothstep(0.25, 0.85, n1));
    col = mix(col, uC, smoothstep(0.45, 1.0, n2) * 0.75);

    float density = pow(smoothstep(0.28, 0.92, n1 * 0.75 + n2 * 0.5), 1.7);

    // --- starfield ---------------------------------------------------------
    float stars =
        starTier(p, 9.0, 0.0, warp) * 0.9
      + starTier(p, 17.0, 3.7, warp * 0.6) * 0.55
      + starTier(p, 31.0, 8.1, warp * 0.35) * 0.32;

    col += stars * mix(vec3(1.0), uC, 0.35);

    // --- shaping -----------------------------------------------------------
    float vignette = smoothstep(1.45, 0.1, length(uv));
    float alpha = density * 0.5 * vignette + stars * 0.85;

    // Scroll bursts flare the whole plate for a beat.
    alpha *= 1.0 + warp * 0.5;
    // Light theme keeps the same motion at a whisper.
    alpha *= mix(0.30, 1.0, uDark);

    gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
  }
`;

const DUST_VERT = /* glsl */ `
  attribute float aScale;
  attribute float aSeed;
  uniform float uTime;
  uniform float uWarp;
  uniform float uSize;
  varying float vFade;
  varying float vSeed;

  void main() {
    vec3 pos = position;
    // Travel toward the camera, then wrap — an endless drift through dust.
    float span = 26.0;
    pos.z = mod(pos.z + uTime * (1.1 + uWarp * 14.0) + aSeed * span, span) - span * 0.55;
    pos.x += sin(uTime * 0.35 + aSeed * 12.0) * 0.35;
    pos.y += cos(uTime * 0.28 + aSeed * 9.0) * 0.35;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    float dist = -mv.z;
    vFade = smoothstep(0.2, 3.0, dist) * smoothstep(16.0, 7.0, dist);
    vSeed = aSeed;
    gl_PointSize = uSize * aScale * (7.0 / max(dist, 0.15));
    gl_Position = projectionMatrix * mv;
  }
`;

const DUST_FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3 uA;
  uniform vec3 uC;
  uniform float uOpacity;
  varying float vFade;
  varying float vSeed;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float mask = smoothstep(0.5, 0.05, d);
    vec3 col = mix(uA, uC, fract(vSeed * 7.3));
    gl_FragColor = vec4(col, mask * vFade * uOpacity);
  }
`;

/* -------------------------------------------------------------------------- */
/*                                 COMPONENT                                   */
/* -------------------------------------------------------------------------- */

/**
 * Fixed, page-wide WebGL backdrop: nebula + hyperspace starfield on a
 * fullscreen quad, with a perspective dust field flying through it. One
 * context, two passes, `three` pulled in lazily so it never blocks first paint.
 */
export function QuantumField() {
  const hostRef = useRef<HTMLDivElement>(null);
  const enabled = useWebGL();

  useEffect(() => {
    if (!enabled) return;
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      if (disposed || !hostRef.current) return;

      const low = isLowPower();
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(pixelRatio());
      renderer.setClearColor(0x000000, 0);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.autoClear = false;
      renderer.domElement.style.cssText =
        "position:absolute;inset:0;width:100%;height:100%;display:block;";
      host.appendChild(renderer.domElement);

      const palette = readPalette();
      const A = new THREE.Color(...palette.accent);
      const B = new THREE.Color(...palette.accent2);
      const C = new THREE.Color(...palette.accent3);

      // ---- pass 1: fullscreen nebula plate --------------------------------
      const plateScene = new THREE.Scene();
      const plateCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const plateUniforms = {
        uRes: { value: new THREE.Vector2(1, 1) },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uWarp: { value: 0 },
        uDark: { value: palette.dark ? 1 : 0 },
        uA: { value: A },
        uB: { value: B },
        uC: { value: C },
      };
      const plate = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.ShaderMaterial({
          vertexShader: QUAD_VERT,
          fragmentShader: QUAD_FRAG,
          uniforms: plateUniforms,
          transparent: true,
          depthWrite: false,
          defines: { OCTAVES: low ? 3 : 5 },
        })
      );
      plate.frustumCulled = false;
      plateScene.add(plate);

      // ---- pass 2: perspective dust ---------------------------------------
      const dustScene = new THREE.Scene();
      const dustCam = new THREE.PerspectiveCamera(
        62,
        window.innerWidth / window.innerHeight,
        0.1,
        60
      );
      dustCam.position.z = 6;

      const count = low ? 420 : 1400;
      const positions = new Float32Array(count * 3);
      const scales = new Float32Array(count);
      const seeds = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 22;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 26;
        scales[i] = 0.4 + Math.random() * 1.6;
        seeds[i] = Math.random();
      }
      const dustGeo = new THREE.BufferGeometry();
      dustGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      dustGeo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
      dustGeo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

      const dustUniforms = {
        uTime: { value: 0 },
        uWarp: { value: 0 },
        uSize: { value: low ? 2.2 : 3.0 },
        uOpacity: { value: palette.dark ? 0.75 : 0.32 },
        uA: { value: A },
        uC: { value: C },
      };
      const dust = new THREE.Points(
        dustGeo,
        new THREE.ShaderMaterial({
          vertexShader: DUST_VERT,
          fragmentShader: DUST_FRAG,
          uniforms: dustUniforms,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      );
      dust.frustumCulled = false;
      dustScene.add(dust);

      // ---- input ------------------------------------------------------------
      const mouse = { x: 0, y: 0 };
      const smooth = { x: 0, y: 0 };
      const onPointer = (e: PointerEvent) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      const resize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        renderer.setPixelRatio(pixelRatio());
        renderer.setSize(w, h);
        plateUniforms.uRes.value.set(
          w * renderer.getPixelRatio(),
          h * renderer.getPixelRatio()
        );
        dustCam.aspect = w / h;
        dustCam.updateProjectionMatrix();
      };
      resize();
      window.addEventListener("resize", resize);

      const stopTheme = watchTheme((next) => {
        A.setRGB(...next.accent);
        B.setRGB(...next.accent2);
        C.setRGB(...next.accent3);
        plateUniforms.uDark.value = next.dark ? 1 : 0;
        dustUniforms.uOpacity.value = next.dark ? 0.75 : 0.32;
      });
      const stopScroll = attachScrollSignal();

      // ---- loop -------------------------------------------------------------
      let raf = 0;
      let last = performance.now();
      let time = 0;
      let warp = 0;
      let paused = document.hidden;

      const step = (dt: number) => {
        time += dt;
        decayScrollSignal(dt);
        warp += (scrollSignal.velocity - warp) * Math.min(1, dt * 6);
        smooth.x += (mouse.x - smooth.x) * Math.min(1, dt * 2.4);
        smooth.y += (mouse.y - smooth.y) * Math.min(1, dt * 2.4);

        plateUniforms.uTime.value = time;
        plateUniforms.uWarp.value = warp;
        plateUniforms.uScroll.value = scrollSignal.progress;
        plateUniforms.uMouse.value.set(smooth.x, -smooth.y);

        dustUniforms.uTime.value = time;
        dustUniforms.uWarp.value = warp;
        dustCam.position.x += (smooth.x * 1.4 - dustCam.position.x) * dt * 2.0;
        dustCam.position.y += (-smooth.y * 1.0 - dustCam.position.y) * dt * 2.0;
        dustCam.lookAt(0, 0, -4);

        renderer.clear();
        renderer.render(plateScene, plateCam);
        renderer.clearDepth();
        renderer.render(dustScene, dustCam);
      };

      const frame = (now: number) => {
        raf = requestAnimationFrame(frame);
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        if (paused) return;
        step(dt);
      };
      // Paint one frame synchronously so the backdrop is never blank while we
      // wait for the first animation callback.
      step(0);
      raf = requestAnimationFrame(frame);

      const onVisibility = () => {
        paused = document.hidden;
        last = performance.now();
      };
      document.addEventListener("visibilitychange", onVisibility);

      const onLost = (e: Event) => {
        // A lost context can't be rendered into; stop the loop instead of
        // spamming WebGL warnings every frame.
        e.preventDefault();
        cancelAnimationFrame(raf);
      };
      renderer.domElement.addEventListener("webglcontextlost", onLost);

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("resize", resize);
        document.removeEventListener("visibilitychange", onVisibility);
        renderer.domElement.removeEventListener("webglcontextlost", onLost);
        stopTheme();
        stopScroll();
        plate.geometry.dispose();
        (plate.material as import("three").Material).dispose();
        dustGeo.dispose();
        (dust.material as import("three").Material).dispose();
        renderer.domElement.remove();
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [enabled]);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    />
  );
}
