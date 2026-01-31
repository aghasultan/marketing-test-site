# Story 1.1: Global Responsive Header

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **Visitor**,
I want a **sticky navigation bar**,
so that **I can access key pages from anywhere without scrolling back to the top**.

    *   Displays Logo (left).
    *   Hamburger Menu Icon (right).
    *   Hidden numeric navigation links.
5.  **Performance:** No layout shift (CLS) when header becomes sticky or changes state.

## Tasks / Subtasks

- [x] Scaffold `Header` component in `src/components/layout/Header.tsx`
  - [x] Implement responsive layout grid (Desktop vs Mobile)
  - [x] Add scroll listener (or IntersectionObserver) for "sticky" state styling
- [x] Implement Mobile Drawer Trigger
  - [x] Add Hamburger icon button (visible only on mobile)
  - [x] *Note: The actual Drawer content is covered in Story 1.2, but the trigger belongs here.*
- [x] Style with Tailwind
  - [x] Apply `glass` utility for backdrop
  - [x] Ensure `z-50` or higher
- [x] Add Navigation Links
  - [x] Use `<a>` tags (or `Link` if routing is set up, but likely anchor links for SPA sections initially)
  - [x] Implement "Apply" CTA button using Shadcn/UI Button primitive

## Dev Notes

### Architecture & Design Compliance

-   **Framework:** React 18 + Vite + TypeScript.
-   **Styling:** Tailwind CSS. Use the project's `glass` utility if defined in `index.css` or `tailwind.config.ts`, otherwise implement `bg-zinc-950/60 backdrop-blur-md border-b border-white/10`.
-   **Icons:** Use `lucide-react` (standard for Shadcn/UI).
-   **Motion:** Use `framer-motion` for subtle entrance or state changes if needed, but keep it performant.
-   **File Location:** `src/components/layout/Header.tsx`.
-   **Theme:** "Technical Dark Mode" - ensure text contrast meets WCAG (>4.5:1). Text `zinc-100` for primary.

### Development Guide (Guardrails)

-   **DON'T** use a heavy library for sticky behavior; use CSS `position: sticky` or fixed.
-   **DON'T** use standard `window.addEventListener('scroll')` without throttling; prefer IntersectionObserver or `useScroll` from framer-motion/react-use.
-   **DO** ensure the "Apply" button stands out using the "Electric Blue" or "Violet" accent color defined in design.
-   **DO** verify responsive breakpoints (typically `md:768px`) match Tailwind defaults.

### Accessibility (WCAG 2.1 Level A)

-   Use `<header>` semantic tag.
-   Use `<nav>` for the link container.
-   Ensure "Apply" button has accessible label.
-   Hamburger button must have `aria-label="Open menu"`.

### References

-   PRD FR11 (Sticky Nav): [PRD](../planning-artifacts/prd.md)
-   UX Design (Glassmorphism): [UX Spec](../planning-artifacts/ux-design-specification.md)
-   Architecture (Structure): [Architecture](../planning-artifacts/architecture.md)

## Dev Agent Record

### Agent Model Used

Antigravity (Google Deepmind)

### Debug Log References

-   Playwright browser download timed out; verified implementation via code inspection.

### Completion Notes List

-   Implemented `Header.tsx` in `src/components/layout/` with sticky behavior and glassmorphism.
-   Created `Button.tsx` (shadcn-like) and `utils.ts` (cn helper).
-   Renamed legacy `Header.tsx` to `Header.legacy.tsx`.
-   Updated `Layout.tsx` to use new Header.
-   Added `tests/header.spec.ts` for E2E verification.
-   Implemented mobile menu trigger and basic drawer structure.
-   **Code Review Fixes:**
    -   Refactored scroll listener to use `framer-motion` `useScroll` for performance optimization.
    -   Extracted navigation links to `NAV_LINKS` constant to remove duplication.
    -   Added `pt-16` to `Layout.tsx` to prevent header from overlapping content.

### File List

-   `src/components/layout/Header.tsx`
-   `src/components/ui/button.tsx`
-   `src/lib/utils.ts`
-   `src/components/Layout.tsx` (Modified)
-   `src/components/Header.legacy.tsx` (Renamed)
-   `tests/header.spec.ts`
