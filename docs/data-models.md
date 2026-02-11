# RR Labs — Data Models

## Overview

This project does not use a traditional database. Data is managed through:
1. **Client-side static data** — TypeScript arrays and inline content
2. **Markdown content** — Blog posts and case studies with frontmatter
3. **External storage** — Google Sheets for CRM, Gmail for notifications
4. **Browser storage** — localStorage for wizard state persistence

---

## Core Data Models

### ContactPayload (API Layer)

```typescript
// api/contact.ts
interface ContactPayload {
    fullName?: string;
    email?: string;
    company?: string;
    budget?: string;
    services?: string[];       // ['meta', 'google', 'tiktok', 'seo', 'full-stack']
    message?: string;
    partial?: boolean;          // true = abandoned form
    fieldsInteracted?: string[];
    timeOnPage?: number;        // milliseconds
}
```

### WizardData (Wizard Context)

```typescript
// src/features/wizard/context/WizardContext.tsx
interface WizardData {
    website?: string;
    revenue?: number;         // Exact monthly revenue
    revenueRange?: string;    // Derived display string
    goals?: string[];
    name?: string;
    email?: string;
}
```

### WizardState (State Machine)

```typescript
interface WizardState {
    currentStep: WizardStep;  // 'WELCOME'|'REVENUE'|'PARTNER_REFERRAL'|'GOALS'|'CONTACT'|'COMPLETED'
    history: WizardStep[];    // Navigation history stack
    data: WizardData;
    isSubmitting: boolean;
    isOpen: boolean;
}
```

### CrmLead (CRM Service)

```typescript
// src/services/crmService.ts
interface CrmLead {
    email: string;            // Primary key
    firstName?: string;
    lastName?: string;
    website?: string;
    monthlyRevenue?: number;
    goals?: string;           // Semicolon-separated
    status: 'New' | 'Qualified' | 'Partner_Referral' | 'Disqualified';
    source: string;           // 'Website Wizard'
    createdAt: string;        // ISO timestamp
    customFields: {
        revenue_range?: string;
        outcome?: string;
    }
}
```

### CaseStudy (Results Feature)

```typescript
// src/features/results/types.ts
interface CaseStudy {
    id: string;
    clientName: string;
    industry: string;         // 'E-commerce' | 'SaaS' | 'FinTech' | etc.
    spend: string;            // '$10k-$50k' | '$50k+'
    resultMetric: string;     // '+300% ROAS' | '-40% CAC' | '2.5M+ Reach'
    summary: string;
    tags: string[];           // ['Meta Ads', 'Scaling', 'Creative Testing']
}
```

### CaseStudy (Content Service)

```typescript
// src/services/contentService.ts
interface CaseStudy {
    slug: string;
    title: string;
    client: string;
    industry: string;
    metric: string;
    result: string;
    tags: string[];
    coverImage: string;
    date: string;
    content: string;          // Markdown body
}
```

### AuditResult

```typescript
// src/services/auditService.ts
interface AuditResult {
    score: number;            // 0-100
    grade: 'A' | 'B' | 'C' | 'D' | 'F';
    analysis: {
        headlines: string;
        descriptions: string;
        keywords: string;
    };
    recommendations: string[];
}
```

### EmailPayload

```typescript
// src/services/emailService.ts
interface EmailPayload {
    to: string;
    subject: string;
    html: string;
    text?: string;
}
```

---

## Content Schema (Markdown Frontmatter)

### Case Study Frontmatter

```yaml
---
title: "Scale Health: 15% Traffic Lift in 60 Days"
client: Scale Health
industry: Healthcare
metric: "+15% Traffic"
result: "Qualified leads up 23%"
tags: [Google Ads, Healthcare, Lead Gen]
coverImage: /img/case-studies/scale-health.jpg
date: 2025-12-01
---
```

### Blog Post Frontmatter

```yaml
---
title: "Hello World"
date: 2025-01-15
author: RR Labs Intelligence
tags: [Introduction]
---
```

---

## Google Sheets CRM Schema

Rows logged to Google Sheets via the `/api/contact` endpoint:

| Column | Source | Example |
|---|---|---|
| Timestamp | Server-generated ISO | `2026-02-11T14:00:00Z` |
| Type | `data.partial ? 'Partial' : 'Full'` | `Full` |
| Name | `data.fullName` | `John Smith` |
| Email | `data.email` | `john@example.com` |
| Company | `data.company` | `Acme Corp` |
| Budget | `data.budget` | `$5,000 – $15,000/mo` |
| Services | Mapped labels joined | `Meta Ads, Google Ads` |
| Message | `data.message` | `Looking for...` |
| Fields Interacted | Joined array | `fullName, email, budget` |
| Time on Page | Formatted | `45s` |

---

## localStorage Keys

| Key | Contents | Used By |
|---|---|---|
| `wizard_state` | Serialized `WizardState` | `WizardContext` persistence.ts |
