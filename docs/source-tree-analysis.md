# Source Tree Analysis

## Directory Structure

```
marketing-test-site/
├── .agent/                  # BMad agent configurations
├── _bmad/                   # BMad core engine and workflows
├── _bmad-output/            # Workflow artifacts and reports
├── docs/                    # Project documentation (Auto-generated)
├── public/                  # Static assets (favicon, robots.txt)
├── src/                     # Source code root
│   ├── api/                 # API handlers (e.g., OpenGraph)
│   ├── components/          # React components
│   │   ├── layout/          # Structural components (Header, Footer)
│   │   └── ui/              # Reusable UI library (Button, Sheet)
│   ├── content/             # Markdown content (Case Studies)
│   ├── features/            # Feature modules
│   │   ├── apply/           # Application Wizard feature
│   │   └── results/         # Results Engine feature
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities and helpers
│   ├── locales/             # i18n translation files
│   ├── pages/               # Route components
│   ├── services/            # Internal services (Audit, Content)
│   ├── App.tsx              # Main App component
│   └── main.tsx             # Entry point
├── tests/                   # Playwright E2E tests
├── components.json          # Shadcn UI configuration
├── package.json             # Project dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite build configuration
```

## Critical Directories

- **src/features/**: Contains the core business logic domains (`apply` and `results`). This modular structure isolates feature-specific code.
- **src/components/ui/**: Hosts the design system primitives. Changes here affect the global look and feel.
- **src/services/**: Abstracts data fetching and business logic from UI components, even for mock/internal data.
- **src/content/**: functions as a flat-file CMS for the site.

## Entry Points

- **Application Entry**: `src/main.tsx` - Bootstraps React and global providers (Helmet, Router).
- **API Entry**: `src/api/og.tsx` - Edge function for generating OpenGraph images.

## Integration

As a monolith, integration is primarily internal via module imports.
- **Features** integrate via `src/pages` importing `features/*`.
- **Pages** depend on `components/layout` and `services`.
