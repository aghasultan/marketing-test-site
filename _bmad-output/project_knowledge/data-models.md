# Data Models

**Generated:** 2026-01-30

## Content Models

Defined in TypeScript for Headless Content.

### `CaseStudy` (`services/contentService.ts`)
| Field | Type | Description |
| :--- | :--- | :--- |
| `slug` | string | URL identifier (filename) |
| `title` | string | Case study headline |
| `client` | string | Client name |
| `industry` | string | Client industry |
| `metric` | string | Key performance indicator (e.g., "300% ROAS") |
| `result` | string | Text summary of result |
| `tags` | string[] | Array of strategy tags |
| `date` | string | Publication date |
| `content` | string | Markdown body content |

### `BlogPost` (`hooks/useBlog.ts`)
| Field | Type | Description |
| :--- | :--- | :--- |
| `slug` | string | URL identifier |
| `title` | string | Article title |
| `date` | string | Publication date ISO string |
| `category` | string | Taxonomy classification |
| `description` | string | Excerpt for listing |
| `content` | string | Markdown body content |

## Application Models

### `AuditResult` (`services/auditService.ts`)
Used for the Audit Tool results.

```typescript
interface AuditResult {
    score: number;
    grade: 'A' | 'B' | 'C' | 'D' | 'F';
    analysis: {
        headlines: string;
        descriptions: string;
        keywords: string;
    };
    recommendations: string[];
}
```

### `ApplicationSchema` (Zod)
Used in `Wizard.tsx` for form validation.

| Field | Validation | Description |
| :--- | :--- | :--- |
| `name` | min(2) | Applicant Name |
| `email` | email() | Contact Email |
| `website` | url() | Business URL |
| `monthlySpend` | enum | Budget Range (under_10k, 10k_50k, 50k_plus) |
| `primaryGoal` | enum | Objective (scale, tracking, full_funnel) |
| `vision` | min(10) | Open text field |
