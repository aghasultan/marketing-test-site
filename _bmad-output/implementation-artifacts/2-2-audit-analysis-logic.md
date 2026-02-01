# Story 2.2: Audit Analysis Logic

Status: in-progress

## Story

As a User,
I want the system to analyze my site for technical marketing signals,
so that I get an objective score on my setup.

## Acceptance Criteria

1.  **Given** the raw HTML and metadata from the audit proxy
    **When** the `auditService` processes the data
    **Then** it should return a structured `AuditResult` object.

2.  **Given** the analysis runs
    **When** checking for **Meta Pixel**
    **Then** it should search for common Pixel ID patterns (`fbq('init'`, `connect.facebook.net`).
    **And** perform a "dumb check" via regex (reliable detection requires a headless browser, but regex is sufficient for immediate feedback).

3.  **Given** the analysis runs
    **When** checking for **SEO Health**
    **Then** it should validate the `<title>` tag exists and length is between 10-60 characters.
    **And** it should validate the `<meta name="description">` exists.

4.  **Given** the analysis runs
    **When** checking for **Performance (Speed)**
    **Then** it should use the `response time` from the proxy fetch as a proxy for TTFB.
    **And** Pass if time < 1.0s, Fail if > 1.0s.

5.  **Given** any failure
    **When** the result is generated
    **Then** it should provide a brief "Fix" recommendation string.

## Tasks / Subtasks

- [x] **Task 1: Service Definition**
    - [x] Create `src/lib/services/auditService.ts`.
    - [x] Define types: `AuditResult`, `AuditCheck` (pass/fail, score, message).

- [x] **Task 2: Implementation of Checks**
    - [x] Implement `checkMetaPixel(html: string): CheckResult`.
    - [x] Implement `checkSEO(html: string, meta: Meta): CheckResult`.
    - [x] Implement `checkPerformance(timing: number): CheckResult`.

- [x] **Task 3: Main Analyzer Function**
    - [x] Create `analyzeUrl(url: string): Promise<AuditResult>`.
    - [x] Integrate with the local `/api/audit` proxy (handling the fetch).

- [x] **Task 4: Verification Unit Tests**
    - [x] Create `src/lib/services/auditService.test.ts`.
    - [x] Mock HTML inputs (valid pixel, missing pixel, slow response).
    - [x] Verify logic returns correct Pass/Fail.

## Dev Notes

### Technical Constraints
- **Client-Side Processing:** The heavy lifting of logic actually happens on the client (or in the API). Since we return raw HTML from the proxy, we can process it in `auditService.ts` (Client) to save serverless execution time, OR do it in the API.
- **Decision:** Do the analysis in `auditService.ts` (Client). The API just fetches. This keeps the API dumb and fast. We pass the HTML string to the client. *Risk:* Large HTML strings. *Mitigation:* We truncated HTML in Story 2.1.

### Architecture Patterns
- **Service Pattern:** Isolate logic from UI. The UI (Hero) just calls `auditService.analyze(url)`.

### References
- [Epic 2: The No-Click Audit Engine](_bmad-output/planning-artifacts/epics.md#epic-2-the-no-click-audit-engine)
