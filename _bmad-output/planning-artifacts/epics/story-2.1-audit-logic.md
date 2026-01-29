# Story 2.1: Audit Service Mock Logic

**Epic:** [Epic 2: AI Ad Audit Tool](../epic-2-audit-tool.md)
**Status:** Ready for Dev
**Assigned To:** Developer Agent

## 1. User Story
**As a** Developer,
**I want** a decoupled service to handle the "audit" logic,
**So that** we can easily swap the mock data for a real API in V3 without breaking the UI.

## 2. Acceptance Criteria (AC)
- [ ] **Service Module:** `src/lib/audit-service.ts` is created.
- [ ] **Interface:** Defines `AuditResult` interface with metrics: Tracking Quality, Creative Diversity, Scaling Potential.
- [ ] **Mock Delay:** The `analyzeUrl` function returns a Promise that resolves after 3 seconds to simulate processing.
- [ ] **Data:** Returns plausible mock scores (e.g., "B+", "Low", "High") based on random logic or static return for now.

## 3. Technical Context
* **ADR-002:** Use Service-Mock pattern.
* **Input:** Accepts a URL string.
* **Output:** JSON object conforming to `AuditResult`.

## 4. Implementation Plan
1.  Create `src/lib/types.ts` for shared interfaces.
2.  Create `src/lib/audit-service.ts`.
3.  Implement `async function analyzeUrl(url: string): Promise<AuditResult>`.