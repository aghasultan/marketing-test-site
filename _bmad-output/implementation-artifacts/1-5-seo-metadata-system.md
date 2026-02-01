# Story 1.5: SEO & Metadata System

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Marketing Manager,
I want each page to have unique Title and Meta descriptions,
so that our site ranks well and looks good when shared on social media.

## Acceptance Criteria

1.  **Given** I navigate between different routes
    **When** I inspect the `<head>` tag
    **Then** the `<title>` should update dynamically (e.g., "Home | Riffat Labs", "Audit | Riffat Labs").

2.  **Given** I am on any page
    **When** the page renders
    **Then** `react-helmet-async` should interpret the SEO metadata.
    **And** standard meta tags (description, keywords, viewport) should be present.

3.  **Given** a social media bot scrapes the site
    **When** it parses the meta tags
    **Then** a default `og:image` should be present.
    **And** `og:title` and `og:description` should match the page content.
    **And** `twitter:card` should be set to `summary_large_image`.

4.  **Given** I am on a simplified "Audit" or "Apply" page
    **When** I view the source
    **Then** `robots` meta tag should be considered (index/follow by default, but configurable).

## Tasks / Subtasks

- [x] **Task 1: Install & Setup Helmet**
    - [x] Install `react-helmet-async`: `npm install react-helmet-async`
    - [x] Wrap `App` (or `Root` in router) with `<HelmetProvider>`.
    - [x] Create `src/components/seo/Head.tsx` (or `SEO.tsx` wrapper).

- [x] **Task 2: Define Default SEO Config**
    - [x] Create `src/lib/seo-config.ts` with default title, description, and OG image.
    - [x] Ensure default OG image exists in `public/` (use a placeholder if needed).

- [x] **Task 3: Implement SEO Component**
    - [x] Build reusable `<SEO />` component accepting `title`, `description`, `image`, `noindex`.
    - [x] Implement Open Graph and Twitter card tags.

- [x] **Task 4: Apply to Routes**
    - [x] Add `<SEO title="Home ..." />` to `Home.tsx`.
    - [x] Add `<SEO title="Design System ..." />` to `DesignSystem.tsx`.
    - [x] Verify dynamic title updates on navigation.

- [x] **Task 5: Verification**
    - [x] Inspect `<head>` elements in DevTools.
    - [x] Verify `og:image` path resolution.

## Dev Notes

### Completion Notes
- Implemented `seo-config.ts` for centralized default values.
- Created `Head.tsx` using `react-helmet-async`, supporting JSON-LD Schema, Canonical URLs, and Open Graph tags.
- Migrated all existing pages (`Home`, `Scale`, `AuditPage`, `BlogIndex`, `BlogPost`, `NotFound`) to use the new `Head` component.
- Deleted legacy `SEO.tsx` component.
- Build verified successfully.

### File List
- src/lib/seo-config.ts
- src/components/seo/Head.tsx
- src/app/router.tsx
- src/pages/Home.tsx
- src/pages/Scale.tsx
- src/pages/AuditPage.tsx
- src/pages/BlogIndex.tsx
- src/pages/BlogPost.tsx
- src/pages/NotFound.tsx
- src/pages/DesignSystem.tsx

### Architecture Patterns
- **HelmetProvider:** Must sit at the top level of the app (Router root).
- **Component Usage:** `<SEO />` should be the first child of every Page component.

### References
- [Epic 1: High-Performance Foundation](_bmad-output/planning-artifacts/epics.md#epic-1-high-performance-foundation--branding)

## Dev Agent Record

### Agent Model Used
Antigravity
