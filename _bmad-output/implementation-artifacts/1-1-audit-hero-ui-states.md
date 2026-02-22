# Story 1.1: Audit Hero UI & States

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Skeptical CMO,
I want a high-performance, glassmorphic input field in the hero section,
so that I can clearly see where to trigger the audit without leaving the page.

## Acceptance Criteria

1. **Given** the user visits the landing page
   **When** the hero section loads
   **Then** it must render the `<AuditHero />` component using Zinc-950 and frosted glass styling
2. **And** it must display an active focus state (`ring-2 ring-blue-500`) when selected
3. **And** it must accept keyboard `Enter` to submit the URL.

## Tasks / Subtasks

- [x] Task 1: Create `<AuditHero />` Component Shell (AC: 1)
  - [x] Initialize `src/features/audit-tool/components/AuditHero.tsx` and `index.ts`.
  - [x] Implement Glassmorphism styling (`bg-zinc-950/40 backdrop-blur-xl border border-white/10`).
  - [x] Ensure rendering is centered and visually distinct in the Hero section of the Landing Page.
- [x] Task 2: Implement Input Field and Focus States (AC: 2)
  - [x] Integrate an input element, using standard Shadcn `Input` if available, customized for dark mode.
  - [x] Style the resting state with `border-white/20` to ensure visibility.
  - [x] Style the active focus state with an opaque `ring-2 ring-blue-500` and `bg-white/10` fill.
  - [x] Guarantee touch targets are at least `44px` tall for mobile users.
- [x] Task 3: Implement Keyboard Interaction (AC: 3)
  - [x] Add an `onKeyDown` listener to capture the `Enter` key.
  - [x] Wire up a placeholder submission handler (the actual API proxy is built in Story 1.2).

## Dev Notes

- **Technical Stack:** React 18, React Router v7, Tailwind CSS. Framer motion can be used for micro-interactions if necessary but ensure zero layout shift.
- **Architecture Validation:** The component must strictly reside in `src/features/audit-tool/components/`. Use Named Exports only (avoid `default export`).
- **Aesthetic Direction (Deep Glass):** Deep dark backgrounds (`zinc-950`). The primary action color is electric blue (`blue-500`). Ensure strictly compliant text contrast (`text-white` or `text-zinc-50` on glass overlays). 

### Project Structure Notes

- Check if `src/features/audit-tool/components` exists; if not, create the entire feature folder hierarchy.
- The component will eventually be imported into some `Home.tsx` or primary landing page layout.

### References

- [Source: _bmad-output/planning-artifacts/epics.md] Epic 1, Story 1.1 requirements.
- [Source: _bmad-output/planning-artifacts/architecture.md#5-project-structure--boundaries] Defines `src/features/audit-tool/`.
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#11-ux-consistency-patterns] Explicitly defines input borders and focus ring logic.

## Dev Agent Record

### Agent Model Used

Antigravity

### Debug Log References

### Completion Notes List
- Implemented `AuditHero` component strictly under `src/features/audit-tool/components`
- Standardized styling via Tailwind utility classes aligned with UI UX guidelines on Deep Glass format.
- Set up boilerplate submission log mechanism for Story 1.2/1.3 to expand upon.
- Validated via standard `npm run build` compilation to ensure strict Type Safety.
- **[Code Review Resolution]** Integrated `<AuditHero />` into the official `<Hero />` component on the landing page (resolving AC 1 failure).
- **[Code Review Resolution]** Authored comprehensive unit tests via Vitest & React Testing Library covering layout, input change, click-event, enter-event, and empty-url validation blocks.

### File List
- src/components/layout/Hero.tsx
- src/features/audit-tool/components/AuditHero.tsx
- src/features/audit-tool/components/index.ts
- src/features/audit-tool/index.ts
- src/features/audit-tool/components/__tests__/AuditHero.test.tsx
