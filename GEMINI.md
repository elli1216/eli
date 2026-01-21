# GEMINI.md

This file provides a comprehensive overview of the project, its structure, and how to work with it. It is intended to be used as a quick reference for developers and as context for AI assistants.

## Project Overview

This project is a single-page personal portfolio website for a web developer named Eli. It showcases their skills, experience, and projects.

*   **Framework:** React
*   **Language:** TypeScript
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **Animations:** Framer Motion
*   **Icons:** Lucide React

The application is structured into several components, each representing a section of the portfolio:

*   `Navbar`: Navigation bar
*   `Hero`: Introduction section
*   `About`: About section
*   `Experience`: Work experience
*   `Skills`: Technical skills
*   `Projects`: Portfolio projects
*   `Contact`: Contact information
*   `Footer`: Page footer

The content for the experience, projects, and skills sections is stored in the `constants.tsx` file.

## Building and Running

### Prerequisites

*   Node.js
*   `pnpm` is used in this project, but `npm` or `yarn` can also be used.

### Installation

Install the project dependencies:

```bash
pnpm install
```

### Environment Variables

The project requires a Gemini API key to be set as an environment variable. Create a `.env.local` file in the root of the project and add the following line:

```
GEMINI_API_KEY=your_api_key
```

### Development

To start the development server, run:

```bash
pnpm run dev
```

This will start the development server, typically at `http://localhost:3000`.

### Production Build

To build the application for production, run:

```bash
pnpm run build
```

This will create a `dist` directory with the production-ready files.

### Previewing the Production Build

To preview the production build locally, run:

```bash
pnpm run preview
```

## Development Conventions

*   **TypeScript:** The project is written in TypeScript. All new components and logic should be written in TypeScript.
*   **Component-Based Architecture:** The application is built with a component-based architecture. Each section of the portfolio is a separate component.
*   **Styling:** Styling is done using Tailwind CSS utility classes. Avoid writing custom CSS files where possible.
*   **Data Separation:** The data for the portfolio sections (experience, projects, skills) is kept in the `constants.tsx` file. This separates the data from the UI components.
*   **Types:** Custom types are defined in the `types.ts` file.
*   **Path Aliases:** The project uses the `@/*` path alias to refer to the root directory. For example, instead of `import { Navbar } from '../components/Navbar'`, you can use `import { Navbar } from '@/components/Navbar'`.
*   **Linting and Formatting:** This project does not have explicit linting and formatting configuration. It is recommended to use a tool like Prettier or ESLint to maintain code consistency.
