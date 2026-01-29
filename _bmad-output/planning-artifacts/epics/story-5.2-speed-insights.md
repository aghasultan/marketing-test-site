# Story 5.2: Vercel Speed Insights

**Epic:** [Epic 5: SEO & Performance Monitoring](../epic-5-seo.md)
**Status:** Completed
**Assigned To:** Developer Agent

## 1. User Story
**As a** Developer,
**I want** real-time data on Core Web Vitals (LCP, CLS),
**So that** I can ensure we meet the <2.5s LCP metric defined in the PRD.

## 2. Acceptance Criteria (AC)
- [x] **Installation:** `@vercel/speed-insights` is installed.
- [x] **Integration:** The `<SpeedInsights />` component is placed in the root of the application (e.g., `main.tsx` or `App.tsx`).
- [x] **Configuration:** Verify it is only active in production (or configured to not spam dev logs).

## 3. Technical Context
* **Zero Config:** Vercel handles the backend; we just need the React component to report the metrics.

## 4. Implementation Plan
1.  `npm install @vercel/speed-insights`.
2.  Import and render in `src/main.tsx`.
3.  Deploy and verify on Vercel dashboard.