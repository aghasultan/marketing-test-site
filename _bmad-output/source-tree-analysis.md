# Source Tree Analysis

## Critical Directory Structure

```
/
├── public/                  # Static assets (images, fonts, rss.xml)
├── src/
│   ├── api/                 # API client configurations (Axios, etc.)
│   ├── assets/              # Local assets included in bundle
│   ├── components/          # Shared React Components
│   │   ├── layout/          # Global layout structure (Header, Footer, Hero)
│   │   ├── seo/             # SEO & Meta tag management
│   │   ├── shared/          # Generic shared components (icons, etc.)
│   │   └── ui/              # Design System primitives (Buttons, Cards, Forms)
│   ├── content/             # Markdown/JSON content files
│   ├── data/                # Static data definitions
│   ├── features/            # Feature-Module Architecture
│   │   ├── apply/           # 'Apply' Feature (Forms, Logic)
│   │   ├── audit/           # 'Audit' Feature (Scanner, Analysis)
│   │   ├── results/         # 'Results' Feature (Charts, Grids)
│   │   └── wizard/          # 'Wizard' Feature (Multi-step logic)
│   ├── hooks/               # Custom React Hooks
│   ├── lib/                 # Utilities (constants, utils)
│   ├── pages/               # Top-level Page Views (Home, Scale, etc.)
│   ├── server/              # Server-side logic (Audit proxy, API handlers)
│   ├── services/            # Business logic services
│   ├── App.tsx              # Main Application Entry Component
│   ├── main.tsx             # DOM Entry Point
│   └── i18n.ts              # Localization configuration
├── tests/                   # E2E Tests (Playwright)
├── package.json             # Dependencies and Scripts
├── vite.config.ts           # Build Configuration
└── tailwind.config.js       # Styling Configuration
```

## Key Modules Analysis

### 1. `src/features/` (Domain Logic)
This folder implements the "Feature-based" architecture. Each subdirectory (`apply`, `audit`, `results`) encapsulates:
- Components specific to that feature
- Hooks and state management for that feature
- Types and utilities isolated to that domain

### 2. `src/components/ui/` (Design System)
Contains atomic components (Button, Input, Slider, Card) built with **Radix UI** primitives and styled with **Tailwind CSS**. This ensures consistency and accessibility across the application.

### 3. `src/components/layout/`
Contains the "Frame" of the application:
- **Hero.tsx**: The landing page visual hook (updated to use `#hero` ID).
- **Header/Legacy**: Navigation (Desktop & Mobile).
- **Footer**: Site-wide footer.

### 4. `src/server/` & `src/api/` (Data Layer)
- **src/server/**: Likely contains Node.js/Edge function logic (e.g., Audit Proxy).
- **src/api/**: Client-side API wrappers (Axios instances, fetchers).

### 5. `tests/` (Quality Assurance)
Contains Playwright specifications found in the regression run:
- `home.spec.ts`: Tests Homepage interactions (Hero, Calculator).
- `scale.spec.ts`: Tests Scale page logic.
- `header.spec.ts`: Tests Navigation.
- `seo.spec.ts`, `site.spec.ts`: Validation for metadata and core sanity.
