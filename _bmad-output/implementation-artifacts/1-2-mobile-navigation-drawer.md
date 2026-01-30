# Story 1.2: Mobile Navigation Drawer

Status: in-progress

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **Mobile User (Sarah)**,
I want a **slide-out menu**,
so that **I can see all navigation options clearly on my small screen**.

## Acceptance Criteria

1.  **Drawer Trigger:**
    *   Tapping the "Hamburger" icon in the header opens the drawer.
    *   The icon is only visible on mobile screens (<768px).
2.  **Drawer Appearance:**
    *   Slides in from the **right** side of the screen.
    *   Covers the full height of the screen.
    *   Width: Typically 75-100% of screen width on mobile (or standard 300-400px max).
    *   **Background:** "Glassmorphism" effect consistent with the Header (`bg-zinc-950/90` + `backdrop-blur-xl` + `border-l border-white/10`).
3.  **Drawer Content:**
    *   **Header:** "Riffat Labs" Logo (left) and "Close" (X) button (right).
    *   **Navigation Links:** "Services", "Work", "About" (Large, tappable targets, e.g., 44px+ height).
    *   **CTA:** "Apply" button (Prominent, at bottom or top, easily accessible).
4.  **Interaction:**
    *   **Closing:**
        *   Tapping the "X" button.
        *   Tapping the backdrop overlay (outside the drawer).
        *   Tapping any navigation link (automatically closes drawer and navigates).
        *   Pressing `Escape` key.
    *   **Accessibility:** Focus is trapped within the drawer when open. Background content is inert (aria-hidden).
5.  **Animation:** Smooth slide-in/out transition (using Framer Motion or CSS transitions).

## Tasks / Subtasks

- [x] **Scaffold Mobile Drawer Component**
  - [x] Check/Install `Sheet` component from Shadcn/UI (or implement using Radix Dialog + Framer Motion if preferred).
  - [x] Create `MobileNav.tsx` (or similar) in `src/components/layout/`.
- [x] **Implement Drawer Structure**
  - [x] Add `Sheet` (Trigger, Content, Header, Close).
  - [x] Style the `SheetContent` with glassmorphism to match design system.
- [x] **Integrate with Header**
  - [x] Connect the existing Hamburger button in `Header.tsx` to the `SheetTrigger` (or Open state).
- [x] **Render Navigation**
  - [x] Import `NAV_LINKS` from `Header.tsx` (or shared constant).
  - [x] Map links to large vertical buttons/links.
  - [x] Ensure clicking a link closes the sheet (`OpenChange` handler).
  - [x] Add "Apply" CTA.
- [x] **Verify Accessibility & Responsiveness**
  - [x] Test focus trapping.
  - [x] Test screen reader announcements ("Open menu", "Close menu").
  - [x] Verify hidden on Desktop (>768px).

## Dev Notes

### Architecture & Design Compliance

-   **Component Library:** Use **Shadcn/UI Sheet** (which uses Radix UI Dialog) for robust accessibility (focus management, screen reader support).
-   **Styling:** Tailwind CSS.
    -   Use `bg-zinc-950/90` or similar for strong contrast but keeping the "glass" feel.
    -   Ensure text is `text-lg` or `text-xl` for easy tapping.
-   **State Management:** Local state (Shadcn Sheet handles open state, but might need controlled state to close on link click).
-   **Files:**
    -   New: `src/components/layout/MobileNav.tsx` (Optional, or inline in Header if small).
    -   New: `src/components/ui/sheet.tsx` (Shadcn primitive).

### Development Guide (Guardrails)

-   **DO** use `SheetPrimitive.Content` for the slider.
-   **DO** ensure the `z-index` of the drawer is higher than the Header (`z-50` or `z-[60]`).
-   **DON'T** build a custom div overlay; use a Dialog/Sheet primitive to get A11y for free.
-   **DO** remember to close the sheet when a user navigates (Single Page App behavior).

### References

-   PRD FR13 (Mobile Drawer): [PRD](../planning-artifacts/prd.md)
-   UX Spec (Mobile First): [UX Spec](../planning-artifacts/ux-design-specification.md)
-   Story 1.1 (Header Implementation): [1.1](../implementation-artifacts/1-1-global-responsive-header.md)

## Dev Agent Record

### Agent Model Used
Antigravity

### Debug Log References
- Checked `src/components/ui` - Sheet component missing, needs installation/creation.

### Completion Notes
- Implemented `MobileNav` using Shadcn `Sheet` component.
- Installed `shadcn` dependencies and initialized project (Zinc base color).
- Refactored `NAV_LINKS` to `src/lib/constants.ts` to solve circular dependency between Header and MobileNav.
- Updated `tests/header.spec.ts` to include mobile drawer tests (Verify open, links visible, apply button visible, closing behavior).
- Ensured glassmorphism styling (`bg-zinc-950/90 backdrop-blur-xl`).

### File List
- `src/components/layout/MobileNav.tsx` (New)
- `src/components/layout/Header.tsx` (Modified)
- `src/lib/constants.ts` (New)
- `src/components/ui/sheet.tsx` (New)
- `tests/header.spec.ts` (Modified)
- `playwright.config.ts` (Modified - fix webServer)
- `package.json` (Modified - install deps)
- `src/lib/utils.ts` (Modified by Shadcn)
- `tailwind.config.js` (Modified by Shadcn)

### Change Log
- 2026-01-30: Implemented Story 1.2 Mobile Navigation Drawer.
- 2026-01-30: [Code Review] Fixed Z-Index (Sheet > Header), Unified Opacity (90%), Cleaned up Git state.
- 2026-01-30: [Code Review] Outstanding Issue: Desktop Header test failing visibility check despite manual fix attempts.

