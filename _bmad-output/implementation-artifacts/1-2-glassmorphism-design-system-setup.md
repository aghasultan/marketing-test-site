# Story 1.2: Glassmorphism Design System Setup

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Designer,
I want to configure a custom Tailwind CSS theme with "Glassmorphism" utilities and typography,
so that I can easily apply the unified aesthetic across the app without writing custom CSS for every component.

## Acceptance Criteria

1.  **Given** the Tailwind configuration file
    **When** I define the color palette
    **Then** I can use `bg-zinc-950` (background), `text-zinc-50` (text), `blue-500` (primary), and `amber-400` (verified) classes.

2.  **Given** the global CSS file
    **When** I add the custom utility layer
    **Then** I can use a `.glass` class that applies:
    -   `bg-zinc-950/40` (or appropriate opacity)
    -   `backdrop-filter: blur(24px)` (xl blur)
    -   `border: 1px solid white/10`
    -   `box-shadow` (subtle glow)

3.  **Given** the project font assets
    **When** I install and configure the font packages
    **Then** `Inter Tight` is applied to headings/body
    **And** `JetBrains Mono` is applied to `<code />` and data elements.

4.  **Given** I am building a component
    **When** I use the `glass` utility
    **Then** it should render correctly in both light and dark contexts (though site is Dark Mode native).

## Tasks / Subtasks

- [x] **Task 1: Dependency Installation** (AC: 3)
    - [x] Install `@fontsource/inter-tight` and `@fontsource/jetbrains-mono`
    - [x] Install `tailwindcss-animate` (for potential animations)

- [x] **Task 2: Tailwind Configuration** (AC: 1, 3)
    - [x] Update `tailwind.config.js` with `theme.extend.colors`:
        - `background: #09090b` (zinc-950)
        - `primary: #3b82f6` (blue-500)
        - `verified: #fbbf24` (amber-400)
    - [x] Update `tailwind.config.js` with `theme.extend.fontFamily`:
        - `sans: ['"Inter Tight"', ...fontFamily.sans]`
        - `mono: ['"JetBrains Mono"', ...fontFamily.mono]`

- [x] **Task 3: Global CSS & Glass Utility** (AC: 2)
    - [x] Rename/Move `index.css` to `src/app/globals.css` (align with architecture)
    - [x] Update `src/app/main.tsx` import
    - [x] Define `.glass` utility in `@layer utilities`
    - [x] Define `.glass-hover` utility for interactive elements
    - [x] Define data-driven verified badge styles

- [x] **Task 4: Shared Tokens** (Architecture Requirement)
    - [x] Create `src/lib/design-system.ts` (or similar) to export constants if needed, or rely on Tailwind config.

- [x] **Task 5: Verification Component**
    - [x] Create a temporary `src/pages/DesignSystem.tsx` route to visually verify:
        - Typography (Sans vs Mono)
        - Colors (Zinc-950 background)
        - Glass Effect (Overlays)

### Completion Notes List
- Configured Tailwind CSS with HSL variables for proper opacity support (Shadcn standard).
- Implemented `globals.css` with Glassmorphism utilities (`.glass`, `.glass-panel`, `.glass-input`).
- Installed and linked `Inter Tight` and `JetBrains Mono` via `@fontsource`.
- Created `src/lib/design-system.ts` for shared constants.
- Verified system via `src/pages/DesignSystem.tsx` (Route: `/design-system`).
- Verified build success.

### File List
- tailwind.config.js
- src/app/globals.css
- src/app/main.tsx
- src/app/router.tsx
- src/lib/design-system.ts
- src/pages/DesignSystem.tsx
- package.json

## Dev Notes

### Architecture Patterns
- **Tailwind-First:** Do not write separate `.css` files for components. Use utility classes or `cva` (Class Variance Authority) for complex variations.
- **Dark Mode Native:** The site is "Dark Mode Only" effectively. Configure Tailwind `darkMode: 'class'` but default to dark variables.
- **Glassmorphism Spec:**
  - Surface: `bg-white/5`
  - Border: `border-white/10`
  - Blur: `backdrop-blur-xl`

### References
- [UX Spec Section 7: Visual Design Foundation](_bmad-output/planning-artifacts/ux-design-specification.md#7-visual-design-foundation)
- [Architecture Section 4: Implementation Patterns](_bmad-output/planning-artifacts/architecture.md#4-implementation-patterns--consistency-rules)

## Dev Agent Record

### Agent Model Used
Antigravity
