# Source Tree Analysis

This document provides a detailed breakdown of the project structure for Riffat Labs.

## Directory Structure

```
marketing-test-site/
├── .agent/              # Configuration for AI agents (workflows present)
├── docs/                # Project documentation assets
├── public/              # Static assets served from root (robots.txt, icons)
├── src/
│   ├── components/      # Shared reusable UI components
│   │   ├── layout/      # Layout wrappers
│   │   └── ui/          # Generic UI primitives (Button, Input, etc.)
│   ├── content/         # Markdown content files (Blog posts)
│   ├── data/            # Static data sets
│   ├── features/        # Feature-specific modules
│   │   ├── apply/       # Logic for "Apply Wizard" (Lead Gen)
│   │   │   ├── components/ # Wizard-specific UI
│   │   │   ├── hooks/      # Local hooks
│   │   │   └── stores/     # Zustand stores for wizard state
│   │   └── results/     # Logic for "Audit Results"
│   ├── hooks/           # Global/Shared Hooks
│   ├── lib/             # Utility functions and helpers
│   ├── locales/         # i18n translation files
│   ├── pages/           # Route-level components (Home, Scale, Blog)
│   ├── services/        # Service layer (API mocks, Business Logic)
│   ├── App.tsx          # Main Application Component (Router)
│   └── main.tsx         # Entry Point
├── tests/               # Playwright E2E tests
├── package.json         # Dependencies and Scripts
├── vite.config.ts       # Vite Build Configuration
└── tailwind.config.js   # Tailwind Configuration
```

## Critical Folders

| Directory | Purpose |
| :--- | :--- |
| `src/features/` | Contains the core business logic. Each folder represents a distinct domain (e.g., `apply` for the wizard). This promotes high cohesion and encapsulation. |
| `src/components/ui/` | Hosts the "Atomic" design tokens and base components, likely implementing the Shadcn/Radix-based design system. |
| `src/services/` | Abstraction layer for data fetching. Currently contains mock implementations (`auditService`) to isolate UI from backend dependency. |
| `src/pages/` | Connects Routes to Features. These files are typically thin composition layers. |
| `tests/` | Contains End-to-End tests ensuring critical flows (like the Apply Wizard) function correctly. |

## Entry Points

- **Application Entry:** `src/main.tsx` - Bootstraps React and global providers.
- **Routing Entry:** `src/App.tsx` - Defines the `react-router-dom` Configuration.
- **Styles Entry:** `src/index.css` - Imports Tailwind layers and global styles.

## Key Files

- `vite.config.ts`: Configures the build system, including path aliases (`@components`, `@features`, etc.).
- `tailwind.config.js`: Defines the design system tokens (colors, spacing, animations).
- `package.json`: Defines the dependency graph and build scripts.
