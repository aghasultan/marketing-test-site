# Data Models

## Core Entities

### Case Study
Defined in `src/features/results/types` and instantiated in `src/data/results.ts`.

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier |
| `clientName` | string | Name of the client |
| `industry` | string | Vertical (e.g., E-commerce, SaaS) |
| `spend` | string | Monthly ad spend range |
| `resultMetric` | string | Key performance indicator (e.g., +300% ROAS) |
| `summary` | string | Brief description of the engagement |
| `tags` | string[] | Categories for filtering |

### Audit Result
Defined in `src/lib/services/auditService.ts`.

| Field | Type | Description |
|-------|------|-------------|
| `url` | string | The audited URL |
| `timestamp` | string | ISO Date string of audit time |
| `overallScore` | number | 0-100 aggregate score |
| `checks` | AuditCheck[] | List of individual pass/fail checks |

### Audit Check

| Field | Type | Description |
|-------|------|-------------|
| `id` | enum | 'pixel' \| 'seo' \| 'speed' |
| `status` | enum | 'pass' \| 'fail' \| 'loading' \| 'error' |
| `score` | number | 0-100 score for this item |
| `message` | string | User-facing status message |
