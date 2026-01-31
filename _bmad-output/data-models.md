# Data Models

This document outlines the core data structures and types used within the application.

## Domain Models

### Audit Result
Represents the outcome of a marketing audit.
```typescript
interface AuditResult {
    score: number;
    grade: "A" | "B" | "C" | "D" | "F";
    analysis: AuditAnalysis;
    recommendations: string[];
}
```

### Audit Analysis
Granular breakdown of the audit.
```typescript
interface AuditAnalysis {
    headlines: string;
    descriptions: string;
    keywords: string;
}
```

## Feature State Models

### Apply Wizard State (Zustand)
(Inferred from `src/features/apply/stores`)
Manages the multi-step form data for lead qualification.
- **Current Step:** Tracks wizard progression.
- **Form Data:** User inputs from each step.

## Content Models
(Markdown Frontmatter for Blog)
*   **Title:** String
*   **Date:** String/Date
*   **Description:** String
*   **Tags:** Array<String>
