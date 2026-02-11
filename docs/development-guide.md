# RR Labs — Development Guide

## Prerequisites

- **Node.js** ≥ 18 (LTS recommended)
- **npm** ≥ 9
- **Git**

## Quick Start

```bash
# Clone
git clone https://github.com/aghasultan/marketing-test-site.git
cd marketing-test-site

# Install
npm install

# Run dev server
npm run dev
# → http://localhost:5173/
```

## Available Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start Vite dev server (HMR) |
| `npm run build` | Full production build (RSS → Sitemap → TSC → Vite) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | ESLint check (TS/TSX, zero warnings) |
| `npm run format` | Prettier format all files |
| `npm test` | Run Playwright E2E tests |

## Build Pipeline

The `npm run build` command runs 4 stages sequentially:

1. `npm run build:rss` — Generates RSS feed from blog content (`scripts/generate-rss.ts`)
2. `npm run build:sitemap` — Generates `sitemap.xml` (`scripts/generate-sitemap.ts`)
3. `tsc` — TypeScript type checking
4. `vite build` — Production bundle to `dist/`

Output goes to `dist/` directory, which Vercel serves as static files.

## Project Structure

```
src/
├── app/          # Entry point, router, global CSS
├── components/   # Shared UI (layout + design system)
├── features/     # Domain modules (wizard, audit, results, apply)
├── pages/        # Route-level components
├── services/     # Client-side service layer
├── hooks/        # Custom React hooks
├── lib/          # Utilities, config, tracking
├── data/         # Static data arrays
├── content/      # Markdown content (blog, case studies)
└── locales/      # i18n translations
api/              # Vercel serverless functions
tests/            # Playwright E2E test suites
```

## Path Aliases

Configured in `vite.config.ts` and `tsconfig.json`:

| Alias | Maps To |
|---|---|
| `@/` | `./src/` |
| `@components/` | `./src/components/` |
| `@hooks/` | `./src/hooks/` |
| `@pages/` | `./src/pages/` |
| `@content/` | `./src/content/` |

## Environment Variables

### Vercel (Server-Side)
| Variable | Required | Purpose |
|---|---|---|
| `GMAIL_USER` | Yes (for email) | Gmail sender address |
| `GMAIL_APP_PASSWORD` | Yes (for email) | Gmail App Password (16 chars) |
| `GOOGLE_SHEETS_URL` | Optional | Google Apps Script Web App URL |

### Client-Side
| Variable | Required | Purpose |
|---|---|---|
| `VITE_ADMIN_EMAIL` | Optional | Mock email service recipient |

## Testing

### E2E Tests (Playwright)

```bash
# Run all tests
npm test

# Run specific test file
npx playwright test tests/home.spec.ts

# Run with UI
npx playwright test --ui

# Generate report
npx playwright show-report
```

Test suites:
- `home.spec.ts` — Homepage rendering, navigation
- `header.spec.ts` — Header scroll behavior, nav links, mobile
- `scale.spec.ts` — Services page content
- `results.spec.ts` — Case study grid, filtering
- `wizard.spec.ts` — Qualification wizard flow
- `audit-wizard-integration.spec.ts` — Audit → wizard integration
- `seo.spec.ts` — Meta tags, OG tags validation
- `site.spec.ts` — Site-wide regression tests

### Unit Tests (Vitest)

```bash
npx vitest run
```

Unit test files (co-located with source):
- `src/features/apply/stores/wizardStore.test.ts`
- `src/features/apply/components/WizardLayout.test.tsx`
- `src/features/apply/components/StepIndicator.test.tsx`
- `src/features/apply/hooks/useApplyForm.test.tsx`
- `src/features/wizard/wizard.test.ts`
- `src/lib/content.test.ts`
- `src/lib/services/auditService.test.ts`

## Adding New Pages

1. Create `src/pages/NewPage.tsx`
2. Add lazy import in `src/app/router.tsx`:
   ```tsx
   const NewPage = lazy(() => import('@pages/NewPage').then(m => ({ default: m.NewPage })));
   ```
3. Add route in the `children` array:
   ```tsx
   { path: "new-page", element: <NewPage /> }
   ```
4. Optionally add to `NAV_LINKS` in `src/lib/constants.ts`

## Adding New API Endpoints

1. Create `api/new-endpoint.ts`
2. Export a default `handler(req, res)` function
3. Vercel auto-discovers it at `/api/new-endpoint`
4. Configure memory/timeout in `vercel.json` `functions` if needed

## Common Development Tasks

### Adding a Case Study
1. Create `src/content/case-studies/new-study.md` with frontmatter (see data-models.md)
2. The `contentService.ts` auto-discovers and loads it

### Adding a Blog Post
1. Create `src/content/blog/new-post.md` with frontmatter
2. Auto-discovered by the blog system

### Modifying the Design System
1. Edit CSS custom properties in `src/app/globals.css`
2. Add Tailwind extensions in `tailwind.config.js`
3. Reference the `DesignSystem` page (`/design-system`) for live preview
