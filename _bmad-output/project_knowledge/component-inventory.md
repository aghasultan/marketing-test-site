# Component Inventory

**Generated:** 2026-01-30

## Layout Components

| Component | Description | Location |
| :--- | :--- | :--- |
| **Layout** | Main application wrapper. Handles the animated background initialization and layout structure. | `src/components/Layout.tsx` |
| **Header** | Responsive navigation bar. Handles scroll states, mobile menu toggling, and theme switching. | `src/components/Header.tsx` |
| **Footer** | Static footer with links and branding. | `src/components/Footer.tsx` |
| **SEO** | Head management wrapper. Auto-generates Open Graph tags. | `src/components/SEO.tsx` |

## UI Primitives

| Component | Description | Location |
| :--- | :--- | :--- |
| **InteractiveBg** | Canvas element for particle animations. | `src/components/ui/InteractiveBg.tsx` |
| **Wizard** | Complex multi-step form with validation. | `src/components/ui/Wizard.tsx` |
| **AnimatedBackground** | (Logic) Canvas controller logic for the gradient background. | `src/components/ui/AnimatedBackground.ts` |

## Feature Components

| Component | Description | Location |
| :--- | :--- | :--- |
| **CaseStudyGrid** | Displays a grid of case studies. Fetches data via `contentService`. Animation on scroll implemented via Framer Motion. | `src/components/CaseStudyGrid.tsx` |
| **AuditForm** | Input form for the "AI Ad Audit" tool. Handles loading states and submission simulation. | `src/components/AuditForm.tsx` |
| **AuditResults** | Displays the results of an "audit" (Grade, Score, Recommendations) in a Bento Grid layout. | `src/components/AuditResults.tsx` |

## Design System Notes

- **Typography:** Sans-serif (via Tailwind default/Inter likely).
- **Colors:** Slate (900/800/etc.) for dark mode backgrounds, Emerald (500/400) for primary actions and accents.
- **Animation:** Heavy use of `framer-motion` for reveal effects (`fade-in`, `slide-up` classes referenced in CSS/components) and `AnimatePresence` for form steps.
- **Glassmorphism:** Used in Wizard and other panels (`glass-panel` class, generic backdrop filters).
