# Source Tree Analysis

**Generated:** 2026-01-30

## Directory Structure

```
marketing-test-site/
├── api/                     # Vercel Serverless/Edge Functions
│   └── og.tsx               # Dynamic Open Graph Image Generator
├── public/                  # Static Assets
│   └── img/                 # Images (Clients, Logos)
├── src/
│   ├── components/          # Reusable UI Components
│   │   ├── ui/              # Low-level UI primitives (Wizard, Backgrounds)
│   │   ├── AuditForm.tsx    # Feature: Audit Tool Form
│   │   ├── Layout.tsx       # Main App Shell (Header/Footer wrapper)
│   │   └── SEO.tsx          # Meta tag management
│   ├── content/             # Headless Content (Markdown)
│   │   ├── blog/            # Blog Posts
│   │   └── case-studies/    # Case Study Data
│   ├── hooks/               # Custom React Hooks
│   │   ├── useBlog.ts       # Content loading logic
│   │   └── useParticles.ts  # Animation logic
│   ├── pages/               # Route Components
│   │   ├── Home.tsx         # / - Landing Page
│   │   ├── Scale.tsx        # /scale - Services Page
│   │   └── Apply.tsx        # /apply - Wizard Page
│   ├── services/            # Business Logic & Data Fetching
│   │   ├── auditService.ts  # Mock Analysis Logic
│   │   └── contentService.ts # Markdown Parser Adapter
│   ├── App.tsx              # Router Configuration
│   └── main.tsx             # Application Entry Point
├── package.json             # Project Manifest
└── vite.config.ts           # Build Configuration
```

## Critical Directories

### `src/pages/`
Contains the top-level route views. Each file corresponds to a specific URL path defined in `App.tsx`.
- **Key File:** `Home.tsx` - Contains the complex ROI calculator logic locally.
- **Key File:** `Apply.tsx` - Wrapper for the Wizard component.

### `src/content/`
Acts as the database for this project.
- Data is stored in `.md` files with Frontmatter (YAML).
- Accessed via `import.meta.glob` in `services/contentService.ts` and `hooks/useBlog.ts`.
- **Architecture Note:** This avoids the need for an external CMS for simple content needs.

### `src/components/ui/`
Contains complex interactive UI elements.
- **Key File:** `Wizard.tsx` - Implements the multi-step form logic with Zod validation.
- **Key File:** `InteractiveBg.tsx` - Canvas-based particle animation system.

### `api/`
Vercel-specific directory for Serverless Functions.
- `og.tsx`: Uses `@vercel/og` to generate social media preview images on the fly based on URL parameters.
