# Story 1.2: Serverless Proxy API

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a System Architect,
I want a Vercel Serverless proxy endpoint (`/api/audit`),
so that the application can fetch target HTML and headers without triggering CORS violations.

## Acceptance Criteria

1. **Given** an audit request has been initiated
   **When** the client sends a POST request with the URL to `/api/audit`
   **Then** the serverless function must fetch the target URL
2. **And** it must return the raw HTML and HTTP headers
3. **And** it must return appropriate 400/502 errors if the fetch fails
4. **And** rate limiting logic must enforce fair usage.

## Tasks / Subtasks

- [x] Task 1: Create Serverless Function Skeleton (AC: 1)
  - [x] Initialize `api/audit.ts` (Vercel Serverless Function paradigm).
  - [x] Set up basic POST request handler and input validation for the `url` parameter (use `zod` for validation).
  - [x] Return 400 Bad Request if URL is missing or invalid.
- [x] Task 2: Implement Target Fetch Logic (AC: 1, 2, 3)
  - [x] Use standard `fetch` API on the backend to request the target URL.
  - [x] Set appropriate User-Agent headers to avoid bot blocks if possible.
  - [x] Extract raw HTML text and relevant headers (like Server, Cache-Control).
  - [x] Handle fetch failures, timeouts, and network errors gracefully (return 502 Bad Gateway).
  - [x] Return successful JSON response containing HTML and Header data.
- [x] Task 3: Implement Basic Rate Limiting (AC: 4)
  - [x] Utilize Vercel Edge Middleware (`middleware.ts`) or simple in-memory cache/Upstash Redis (if configured) to rate limit requests.
  - [x] Restrict requests to a reasonable limit (e.g., 5 requests per minute per IP).
  - [x] Return 429 Too Many Requests when limits are exceeded.

## Dev Notes

- **Technical Stack:** Vercel Serverless Functions (`api/` directory in Next.js or Vite projects deployed to Vercel), Node.js runtime, `zod` for validation.
- **Architecture Validation:** Since this is a Vite project (`npm create vite`), Vercel supports Serverless Functions by placing an `api` directory at the *root* of the project (e.g., `/api/audit.ts`). Make sure the endpoint works locally using Vercel CLI (`vercel dev`), so `vercel@latest` should be considered for local invocation, or a simple Express dev server if preferred (but Vercel CLI is more accurate).
- **Rate Limiting:** If Upstash Redis is not available, implement a basic memory-based rate limiter or edge middleware using IP if Vercel provides it in headers (`x-forwarded-for`). Actually, Vercel allows Edge Middleware for rate limiting. Let's start with a simple IP-based check. For local testing, mock the limitation.

### Project Structure Notes

- Create `/api/audit.ts`.
- Ensure Vercel configuration (`vercel.json`) allows the API route if necessary.

### References

- [Source: _bmad-output/planning-artifacts/epics.md] Epic 1, Story 1.2 requirements.

## Dev Agent Record

### Agent Model Used
Antigravity

### Debug Log References
- Implemented `api/audit.ts` with standard fetch, returning 502 if proxy request fails. Validated URL parameters using `zod`.
- Added IP-based rate limiting as a basic in-memory check to prevent abuse per Task 3. 

### Completion Notes List
- Authored node unit tests in `api/audit.test.ts` to fully cover error boundary and success logic, including rate limiting states.
- Handled CORS pre-flight OPTIONS check. 
- Integrated graceful timeout functionality utilizing `AbortSignal.timeout(8000)`.

### File List
- api/audit.ts
- api/audit.test.ts
