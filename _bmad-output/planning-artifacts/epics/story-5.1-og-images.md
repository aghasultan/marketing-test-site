# Story 5.1: Dynamic OG Images

**Epic:** [Epic 5: SEO & Performance Monitoring](../epic-5-seo.md)
**Status:** Ready for Dev
**Assigned To:** Developer Agent

## 1. User Story
**As a** Marketing Manager,
**I want** my shared links to have custom, branded preview images,
**So that** click-through rates on social media are maximized.

## 2. Acceptance Criteria (AC)
- [ ] **Generation:** Uses `@vercel/og` to generate images on the fly.
- [ ] **Design:** The image template includes the post Title, Author, and Riffat Labs branding.
- [ ] **Route:** A resource route (e.g., `/api/og`) is created to serve these images.
- [ ] **Integration:** All pages include the correct `<meta property="og:image">` tags pointing to this route.

## 3. Technical Context
* **Library:** `@vercel/og`.
* **Performance:** Ensure caching headers are set so we don't regenerate on every hit.

## 4. Implementation Plan
1.  `npm install @vercel/og`.
2.  Create `src/api/og.tsx` (using ImageResponse).
3.  Design the JSX template for the image.
4.  Update `index.html` or Helmet config to use the dynamic URL.