# Component Inventory

## Design System
The project uses a **Glassmorphism** inspired design system (Nebula theme) implemented with Tailwind CSS and Radix UI primitives.

### UI Primitives (`src/components/ui/`)
Reusable styling wrappers, likely based on **shadcn/ui**.

- **Structure**: `Sheet`
- **Inputs**: `Button`, `Input`, `Slider`, `CurrencyInput`
- **Feedback**: `Toast`, `Toaster`
- **Overlay**: `Tooltip`
- **Visual**: `ThemeToggle`, `NebulaBackground`, `InteractiveBg`

### Layout Components (`src/components/layout/`)
Global application structure.

- **Header/Footer**: `Header.tsx`, `Footer.tsx`
- **Navigation**: `MobileNav.tsx`
- **Hero**: `Hero.tsx` (Landing page hero)
- **Wrappers**: `Layout.tsx`

## Feature Components (`src/features/`)

### Apply Feature
- **ReviewStep**: `src/features/apply/components/ReviewStep.tsx`

### Audit Feature
- **AuditForm**: `src/components/AuditForm.tsx` (Legacy location?)
- **AuditResults**: `src/components/AuditResults.tsx` (Legacy location?)

*(Note: Some components seem to be migrating from `src/components` to `src/features`)*

### Content Components
- **Case Studies**: `CaseStudyGrid.tsx`
- **SEO**: `SEO` (`Head.tsx`)

## Technical Implementation
- **Styling**: Tailwind CSS (`app/globals.css` defines root variables)
- **Animation**: Framer Motion used in background elements (`AnimatedBackground.ts`)
- **Icons**: Lucide React
