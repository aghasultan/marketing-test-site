# Story 2.1: Serverless Audit Proxy Setup

Status: in-progress

## Story

As a Developer,
I want to create a secure API proxy that bypasses CORS,
so that I can fetch external website metadata from the client-side without browser errors.

## Acceptance Criteria

1.  **Given** I send a POST request to `/api/audit`
    **When** the request includes a valid `url` in the body
    **Then** the function should fetch the target URL from the server-side.
    **And** it should return the target's HTML content (specifically `<head>` and initial `<body>`).

2.  **Given** the target URL is slow or invalid
    **When** the function attempts to fetch
    **Then** it should timeout gracefully after 10 seconds.
    **And** return a clear error message (400 or 504).

3.  **Given** I am running locally (`npm run dev`)
    **When** I call `fetch('/api/audit')`
    **Then** it should work identically to production (using a local proxy or Vercel dev).

4.  **Given** a request from a different origin
    **When** the CORS headers are checked
    **Then** it should only allow requests from `localhost` (dev) and `riffatlabs.com` (prod).

## Tasks / Subtasks

- [x] **Task 1: Serverless Function Setup**
    - [x] Create `api/audit.ts` (Vercel serverless function convention).
    - [x] Install dependencies (`axios` or use native `fetch`, `cheerio` if needed for basic parsing here, though main parsing is Story 2.2). *Note: Story 2.2 handles analysis, this story focuses on FETCHING raw HTML.*
    - [x] Configure `vercel.json` if custom headers/routes are needed.

- [x] **Task 2: Implementation of Fetch Logic**
    - [x] Implement `POST` handler in `api/audit.ts`.
    - [x] Validate input URL (basic Zod check).
    - [x] Fetch target URL with a user-agent string (to avoid bot blocking).
    - [x] Handle 3xx redirects (follow up to 5 redirects).
    - [x] Limit response size (e.g., first 1MB) to prevent abuse.

- [ ] **Task 3: Local Development Proxy**
    - [ ] Configure standard Vite proxy in `vite.config.ts` to forward `/api` to the local Vercel function OR use `vercel dev`.
    - *Decision:* Using `vercel dev` is cleaner, but modifying `vite.config` to act as a fallback proxy to a mock handler is easier for pure frontend devs. Let's aim for `vercel dev`.

- [x] **Task 4: Error Handling & CORS**
    - [x] Add CORS headers to the response.
    - [x] Implement try-catch block for network errors.
    - [x] Return standardized JSON error responses.

- [x] **Task 5: Verification**
    - [x] Test with `curl` or Postman.
    - [x] Test with a simple `fetch` from the browser console.


## Dev Notes

### Architecture Patterns
- **Vercel Functions:** Using the `/api` directory pattern which Vercel automatically deploys as serverless functions.
- **Security:** Do not expose the server's IP address blindly. Use standard headers.
- **Performance:** `Promise.race` with a timeout to ensure we don't hang.

### References
- [Epic 2: The No-Click Audit Engine](_bmad-output/planning-artifacts/epics.md#epic-2-the-no-click-audit-engine)
