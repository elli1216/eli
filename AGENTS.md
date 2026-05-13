# AGENTS.md

## Dev Commands

- `pnpm run dev` — Start dev server on port 3000
- `pnpm run build` — Production build (outputs to `dist/`)
- `pnpm run preview` — Preview production build locally

No lint, typecheck, or test scripts are configured.

## Environment

- Requires `GEMINI_API_KEY` in `.env.local` (see `.env.example` if it exists)
- Requires `VITE_LOGO_DEV_PUBLIC_KEY` in `.env.local` for company logos in Experience section (see `.env.example`)
- Vite injects `GEMINI_API_KEY` into `process.env.GEMINI_API_KEY` via `define` in `vite.config.ts`
- Client-side env vars must be prefixed with `VITE_` (e.g., `VITE_LOGO_DEV_PUBLIC_KEY`) and accessed via `import.meta.env.VITE_*`
- Do not commit `.env.local` — it's gitignored as `*.local`

## Path Aliases

- `@/*` maps to the project root (defined in both `tsconfig.json` and `vite.config.ts`)

## Dark/Light & Accent Color

- Dark mode: class-based — add/remove `.dark` on `<html>`
- Accent colors: 6 options (green, blue, red, orange, purple, gray) applied as `.accent-*` class on `<html>`
- Both persist to `localStorage` independently
- Glow effect in Hero dynamically matches accent color

## Content

- Experience, projects, skills, and certificates data live in `constants.tsx`
- Shared TypeScript types are in `types.ts`
- Component sections: `Navbar`, `Hero`, `About`, `Experience`, `Skills`, `Projects`, `Certificates`, `Contact`, `Footer`, `BackToTop`

## Animations

- Smooth scroll uses `Lenis` (wrapped in `SmoothScroll.tsx`)
- Animations via `framer-motion` and `gsap` / `@gsap/react`

## Tech Stack

- React 19, TypeScript, Vite
- Tailwind CSS v4, `tw-animate-css`, `class-variance-authority`, `clsx`, `tailwind-merge`
- Lucide icons, tech-stack-icons
- `ogl` for WebGL
