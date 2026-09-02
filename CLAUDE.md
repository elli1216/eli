# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Single-page personal portfolio site for Darl Ellison Floresca — a BSIT graduate and Custom Software Engineer at Accenture. Built with React 19, TypeScript, Vite, and Tailwind CSS v4. Deployed on Vercel with a serverless Gemini AI chat endpoint.

## Commands

```bash
pnpm run dev        # Dev server on http://localhost:3000
pnpm run build      # Production build → dist/
pnpm run preview    # Preview production build locally
```

No lint, typecheck, or test scripts are configured. Prettier is available via IDE integration (100 char width, 2-space tabs, single quotes, semicolons).

## Environment Variables

Set in `.env.local` (gitignored):

- `GEMINI_API_KEY` — Required for the AI chat widget. Injected into `process.env` via Vite `define` in `vite.config.ts`.
- `VITE_LOGO_DEV_PUBLIC_KEY` — Used for company logos in the Experience section (Logodev API). Accessed via `import.meta.env.VITE_LOGO_DEV_PUBLIC_KEY`.

## Architecture

### Single-Page Layout (no router)

There is no React Router. The app is a single page with hash-based navigation (`#about`, `#experience`, `#projects`, etc.). Sections are rendered sequentially in `App.tsx`. Non-root paths show a `NotFound` component.

All section components except `Hero` are lazy-loaded via `React.lazy()` + `Suspense` for code splitting.

### Component Organization

```
src/
├── components/
│   ├── home/          # Hero, particles (OGL/WebGL), custom cursor
│   ├── about/         # ProfileCard
│   ├── experience/    # Timeline, company logos
│   ├── projects/      # Project cards, modal
│   ├── skills/        # Skill display with tech-stack-icons
│   ├── hackathons/    # Hackathon projects
│   ├── certificates/  # Certificate gallery
│   ├── contact/       # Contact form/links
│   ├── chat/          # Gemini AI chat widget (Nova)
│   ├── layout/        # Navbar, Footer, SmoothScroll, BackToTop, SectionLoader
│   ├── shared/        # Reusable: TechStack, GithubStats, Terminal UI, WeatherTimeWidget
│   └── ui/            # shadcn components (button, message, message-scroller)
├── contexts/          # ThemeContext, AccentContext
├── constants/         # All data: EXPERIENCE_DATA, PROJECT_DATA, SKILL_DATA, certificates
├── types/             # TypeScript interfaces (types.ts)
└── lib/               # Utilities: cn() helper, useMobile() hook
```

### Data Separation

All portfolio content (experience, projects, skills, certificates, personal info) lives in `src/constants/constants.ts`. Components are purely presentational — they consume data from constants via props. When adding or updating portfolio content, edit `constants.ts`, not the components.

### Theming System

Two independent contexts, both persisted to `localStorage`:

- **ThemeContext** — Dark/light mode via `.dark` class on `<html>`. Defaults to system preference.
- **AccentContext** — Six accent colors (green, blue, red, orange, purple, gray) applied as `.accent-*` class on `<html>`. Defaults to green.

Custom CSS variables in `globals.css` use these classes to define accent-aware colors (`--accent`, `--accent-rgb`, etc.).

### Animation Stack

- **Lenis** — Smooth scrolling (wrapped in `SmoothScroll.tsx`, duration 1.2s, lerp 0.07)
- **Framer Motion** — Component enter/exit animations, staggered reveals, layout transitions
- **GSAP + @gsap/react** — Complex timeline animations, particle manipulation
- **OGL** — WebGL particle system in Hero section (customizable colors, hover effects)

### Serverless API

`api/chat.ts` — POST `/api/chat` endpoint for the Gemini-powered chat widget (Nova assistant):

- Accepts `{ message, history }` payload
- Rate limited: 5 messages/minute per IP
- Input capped at 200 characters
- Handles Gemini function calls with max 5 loops
- System instructions and tool definitions in `api/utils.ts`

### Path Aliases

`@/*` maps to `./src/*` (configured in both `tsconfig.json` and `vite.config.ts`). Always use `@/` imports rather than relative paths.

### Build Configuration

- Vite with `@vitejs/plugin-react` and `@tailwindcss/vite`
- `tech-stack-icons` is isolated into its own chunk (`stack-icons`) to keep main bundle under 7000kB warning limit
- `vercel.json` rewrites all routes to `index.html` for SPA support

## Code Conventions

- **Single Responsibility**: One export per file. Split complex functions into atomic units.
- **Logic/UI Separation**: State management and calculations stay out of UI components. Pass data via props or hooks.
- **Modularity**: Reusable utilities go in `src/lib/`. Avoid large files.
- **TypeScript**: All new code in TypeScript. Types in `src/types/types.ts`.
- **Styling**: Tailwind CSS v4 utility classes. Custom CSS only in `globals.css`. Use `cn()` from `@/lib/utils` for conditional class merging (wraps `clsx` + `tailwind-merge`).
- **shadcn UI**: Components in `src/components/ui/`. Uses New York style with slate base color (see `components.json`).
