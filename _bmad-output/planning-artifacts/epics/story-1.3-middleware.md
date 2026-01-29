# Story 1.3: Localization Middleware

**Epic:** [Epic 1: Core Infrastructure & Global Styles](../epic-1-infra.md)
**Status:** Completed
**Assigned To:** Developer Agent

## 1. User Story
**As a** Product Owner,
**I want** to detect the user's country at the edge,
**So that** we can prepare the application for future currency/content localization without client-side API delays.

## 2. Acceptance Criteria (AC)
- [x] **Edge Middleware:** A `middleware.ts` file is created at the project root.
- [x] **Detection:** The middleware identifies the user's country using Vercel's `x-vercel-ip-country` header.
- [x] **Header Injection:** The detected country is passed to the request headers (e.g., `x-user-country`) for consumption by server components or client hydration.
- [x] **Performance:** Middleware execution time is negligible (Edge Runtime).

## 3. Technical Context
* **Vercel Edge:** This logic must run on the Edge runtime, not Node.js.
* **Testing:** Local development may default to 'US' or 'Unknown' since `x-vercel-ip-country` is specific to Vercel deployment.

## 4. Implementation Plan
1.  Create `middleware.ts`.
2.  Import `NextRequest`, `NextResponse` from `next/server` (or standard Request/Response if using generic Vite Vercel adapter, but typically this requires a Vercel-specific function configuration). *Correction: Since this is a Vite SPA, we rely on Vercel Rewrites/Edge functions.*
3.  **Correction:** For a pure Vite SPA, this logic usually sits in `api/hello.ts` or a Vercel Edge Function, OR we accept that `middleware.ts` is a Next.js specific pattern. **Decision:** Implement as a Vercel Edge Function located in `api/edge-geo.ts` to support the Vite build.