# Story 1.3: Client-Side Analysis & Presentation

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Skeptical CMO,
I want to see real-time pass/fail feedback for Speed (TTFB), Pixel, and SEO,
So that I immediately understand the value and competence of the agency.

## Acceptance Criteria

1. **Given** the URL has been submitted and HTML payload is received
   **When** the client parses the response
   **Then** it must analyze the HTML string for Meta Pixel tags (Facebook) and basic SEO tags (Title/Desc)
2. **And** it must visually transition from "Scanning" to "Complete" via animated feedback
3. **And** it must flip the UI to reveal the specific Audit Result card without reloading the page.

## Tasks / Subtasks

- [x] Task 1: Connect AuditHero to Proxy API (AC: 1)
  - [x] Update `AuditHero.tsx` to call `/api/audit` via `fetch` or `TanStack Query`.
  - [x] Implement loading state ("Scanning...") while awaiting the response.
- [x] Task 2: Implement Client-Side Parsing Logic (AC: 1)
  - [x] Create utility functions to parse the returned HTML string (e.g., using DOMParser or regex).
  - [x] Detect presence of Meta Pixel (`fbq`, `connect.facebook.net`).
  - [x] Detect presence of basic SEO tags (`<title>`, `<meta name="description">`).
  - [x] Evaluate performance (TTFB representation or mock score based on proxy response time).
- [x] Task 3: Create Animated Result UI (AC: 2, 3)
  - [x] Design and implement `<AuditResultCard />` component using Deep Glass styling.
  - [x] Use `framer-motion` to create a smooth transition from the input field to the result card.
  - [x] Display clear Pass/Fail indicators for the 3 audit criteria.
  - [x] Add a Call-to-Action to schedule a consultation if the audit shows areas for improvement.

## Dev Notes

- **Technical Stack:** React, TanStack Query (optional but good for caching), standard DOM API for parsing, framer-motion for UI transitions.
- **Parsing Strategy:** Since the proxy returns raw HTML string, we can use `DOMParser` in the browser to safely parse it into a document: `new DOMParser().parseFromString(html, "text/html")`. Then query selectors can be used (`doc.querySelector('title')`).
- **Performance consideration:** The exact TTFB of the target site is hard to measure from a serverless proxy unless the proxy returns it. If the proxy doesn't, we can simulate it or rely on the proxy's total request duration as a proxy for speed.

### File List
- src/features/audit-tool/components/AuditHero.tsx
- src/features/audit-tool/components/AuditResultCard.tsx
- src/features/audit-tool/components/index.ts
- src/features/audit-tool/utils/parser.ts
- src/features/audit-tool/components/__tests__/AuditHero.test.tsx
