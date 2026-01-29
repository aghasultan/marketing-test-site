# Story 1.1: Zinc-950 Theme Implementation

**Epic:** [Epic 1: Core Infrastructure & Global Styles](../epic-1-infra.md)
**Status:** Ready for Dev
**Assigned To:** Developer Agent

## 1. User Story
**As a** User visiting the portfolio,
**I want** to see a forced "Dark Mode" aesthetic with deep Zinc backgrounds and neon accents,
**So that** the site feels premium, authoritative, and consistent with the "Modern Agency" brand.

## 2. Acceptance Criteria (AC)
- [ ] **Global Background:** The application background is forced to Zinc-950 (`#09090b`).
- [ ] **Tailwind Configuration:** `tailwind.config.js` is updated to include the specific color palette defined in the Product Brief.
- [ ] **Typography:** Font family is verified as `Space Grotesk` (or configured if missing).
- [ ] **Reset:** All default light-mode styles are overridden or removed.
- [ ] **Accents:** Utility classes for Cyan, Purple, and Lime are available in the config.

## 3. Technical Context (Architecture & ADRs)
* **ADR-001 (Styling):** Use Tailwind CSS utility abstractions. Do not use inline styles.
* **Brownfield Constraint:** This is an existing Vite project. You must modify the existing `tailwind.config.js` and `src/styles/globals.css`.
* **Color Palette:**
    * Background: Zinc-950 (`#09090b`)
    * Accents: Neon Cyan, Purple, Lime (Select appropriate Tailwind shades, e.g., Cyan-400/500).

## 4. Implementation Plan
1.  **Analyze Existing Config:** specific check on `tailwind.config.js` to see current theme setup.
2.  **Update Config:** Extend the theme to add the custom colors.
3.  **Global CSS:** Update `src/styles/globals.css` to apply `@apply bg-zinc-950 text-white` to the `body` tag.
4.  **Font Setup:** Ensure `Space Grotesk` is imported (via Google Fonts or local asset) and applied globally.

## 5. Verification Steps
* Run the dev server (`npm run dev`).
* Inspect the `<body>` element to ensure `background-color` is `#09090b`.
* Check that text is legible (white/light gray) against the dark background.