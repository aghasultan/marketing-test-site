# UI Component Inventory

> **Style System**: Tailwind CSS v3
> **Primitives**: Radix UI + Custom

## 1. Design System Primitives (`src/components/ui/`)

| Component | Description | Dependencies |
|---|---|---|
| `button.tsx` | Primary, secondary, ghost (cn) | Lucide |
| `input.tsx` | Text inputs (cn) | Lucide |
| `currency-input.tsx` | Numeric input with formatter | |
| `schema-slider.tsx` | Range input (Radix) | @radix-ui/react-slider |
| `sheet.tsx` | Side drawers/modals (Radix) | @radix-ui/react-dialog |
| `toast.tsx` | Notification toasts (Radix) | @radix-ui/react-toast |
| `tooltip.tsx` | Tooltip overlays (Radix) | @radix-ui/react-tooltip |
| `theme-toggle.tsx` | Light/Dark mode switch | Lucide |
| `animated-background.ts` | Animation logic | Framer Motion |
| `nebula-background.tsx` | Hero background | Three.js / Canvas |

## 2. Layout Components (`src/components/layout/`)

| Component | Description | Usage |
|---|---|---|
| `Header.tsx` | Global navigation bar | Top of every page |
| `Footer.tsx` | Global footer | Bottom of every page |
| `Hero.tsx` | Landing page hero section | Home Page |
| `MobileNav.tsx` | Responsive menu drawer | Mobile View (Sheet) |
| `Layout.tsx` | Wrapper (Container) | Common Pages |

## 3. Feature Components (`src/features/`)

### Audit (`src/features/audit/`)
- `AuditForm.tsx`: Input form for URL submission.
- `AuditResults.tsx`: Card grid displaying SEO/Pixel data.

### Apply Wizard (`src/features/apply/`)
- Multi-step form components for qualification flow.
- Relies on `src/features/wizard/` logic engine.

### Results Grid (`src/features/results/`)
- `CaseStudyGrid.tsx`: Filterable grid of Markdown case studies.

## 4. Pages (`src/pages/`)

| Page | Route | Description |
|---|---|---|
| `Home.tsx` | `/` | Marketing LP + Audit Tool |
| `Scale.tsx` | `/scale` | Services Overview |
| `AuditPage.tsx` | `/audit` | Standalone Audit Page |
| `Contact.tsx` | `/contact` | Contact Form + Map |
| `BlogIndex.tsx` | `/blog` | Blog List |
| `BlogPost.tsx` | `/blog/:slug` | Individual Post |
| `Apply.tsx` | `/apply` | Qualification Wizard |
