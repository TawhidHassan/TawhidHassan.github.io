# Sifat Hasan — Premium Developer Portfolio

An ultra-premium, highly animated personal portfolio for **Sifat Hasan (Tawhid Hassan Sifat)**, Senior Flutter Developer & Software Engineer.

Built for polish: glassmorphism, smooth scrolling, scroll-linked animations, a magnetic custom cursor, particle fields, and seamless dark/light theming.

## Tech Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first tokens) |
| Animation | Motion (Framer Motion v12) + GSAP ScrollTrigger |
| Smooth scroll | Lenis (synced to GSAP ticker) |
| Theming | next-themes — **dark by default**, View Transitions wipe |
| Icons | lucide-react + custom brand SVGs |

## Features

- 🎬 Preloader, animated page reveals, text-mask reveals, stagger animations
- 🧲 Magnetic buttons, premium dual-ring cursor, spotlight/3D-tilt cards
- 🌌 Aurora gradient background, lightweight reactive particle canvas
- 📜 Scroll progress bar, GSAP-driven experience timeline beam
- 🌗 Smooth animated theme switch (circular View Transition)
- ♿ Reduced-motion aware, semantic HTML, keyboard-friendly
- 🚀 SEO: metadata, OpenGraph (dynamic image), JSON-LD, sitemap, robots, manifest
- 📱 Fully responsive (mobile / tablet / desktop)

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve production build
```

## Editing Content

All content lives in a single source of truth:

```
src/lib/data.ts
```

Update profile, social links, experience, skills, projects, achievements,
education, and SEO metadata there — every section reads from it.

Set your production domain in `siteMeta.url` (used by metadata, sitemap, robots).

## Project Structure

```
src/
├── app/                 # routes, layout, globals, SEO (sitemap/robots/manifest/og)
├── components/
│   ├── providers/       # ThemeProvider, SmoothScroll (Lenis + GSAP)
│   ├── layout/          # Navbar, Footer, Preloader
│   ├── sections/        # Hero, About, Experience, Skills, Projects, Achievements, Contact
│   └── ui/              # reusable primitives (cards, cursor, buttons, text, ...)
├── hooks/               # useMediaQuery, useMounted, useMousePosition
├── lib/                 # data.ts (content), motion.ts (variants), utils.ts
└── types/               # global type augmentations
```

## Contact Form

The contact form composes a `mailto:` to the configured email. Swap the handler
in `src/components/sections/Contact.tsx` for an API route or a service like
Resend / Formspree when a backend is available.

---

© Tawhid Hassan Sifat
