# Data Models (web-app)

## Overview
This document defines the core data structures and schemas used in the application.

## Domain Entities

### CaseStudy
**Source:** `src/features/results/types.ts` & `src/services/contentService.ts`
Represents a customer success story or project portfolio item.

| Field | Type | Description |
|-------|------|-------------|
| `slug` | string | URL-friendly identifier |
| `title` | string | Case study title |
| `client` | string | Client name |
| `industry` | string | Industry sector (e.g., 'E-commerce', 'SaaS') |
| `metric` | string | Key performance metric highlighted |
| `result` | string | Outcome description |
| `tags` | string[] | Categorization tags |
| `coverImage` | string | Path to cover image |
| `date` | string | Publication date |
| `content` | string | Markdown content body |

### AuditResult
**Source:** `src/services/auditService.ts`
Represents the outcome of a marketing site audit.

| Field | Type | Description |
|-------|------|-------------|
| `score` | number | Overall score (0-100) |
| `grade` | 'A'\|'B'\|'C'\|'D'\|'F' | Letter grade classification |
| `analysis` | object | Detailed analysis of headlines, descriptions, keywords |
| `recommendations` | string[] | List of actionable improvements |

## Validation Schemas (Zod)

### ApplyFormSchema
**Source:** `src/features/apply/types.ts`
Validates user input for the multi-step application wizard.

**Validation Rules:**
- `firstName`: Required (min 2 chars)
- `email`: Valid email format
- `website`: Valid URL (optional)
- `companyName`: Required (min 2 chars)
- `industry`: Enum ('Tech', 'Finance', 'Health', 'Retail', 'Other')
- `customIndustry`: Required if industry is 'Other'
- `revenueRange`: Enum ('<10k', '10k-50k', '50k-200k', '200k+')
- `goals`: Optional text
