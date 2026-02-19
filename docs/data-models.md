# Data Models

> **Types**: TypeScript Interfaces, Zod Schemas

## Contact & Lead Models

### `ContactPayload` (API)
Used in `/api/contact` for full submissions and abandoned partials.

```typescript
interface ContactPayload {
  fullName?: string;
  email?: string;
  company?: string;
  budget?: string; // Optional budget range
  services?: string[]; // IDs of selected services (meta, google, tiktok, seo, full-stack)
  message?: string;
  partial?: boolean; // True if form was abandoned before submission
  fieldsInteracted?: string[]; // List of fields the user interacted with
  timeOnPage?: number; // Time spent on page in milliseconds
}
```

## Wizard Features

### `ApplyFormSchema` (Zod)
Validation schema for the multi-step application wizard (`src/features/apply/types.ts`).

```typescript
const ApplyFormSchema = z.object({
    // Step 1: Contact
    firstName: z.string().min(2),
    email: z.string().email(),
    website: z.string().url().optional(),

    // Step 2: Business Details
    companyName: z.string().min(2),
    industry: z.enum(['Tech', 'Finance', 'Health', 'Retail', 'Other']),
    customIndustry: z.string().optional(),
    revenueRange: z.enum(['<10k', '10k-50k', '50k-200k', '200k+']),
    goals: z.string().optional(),
    serviceType: z.enum(['paid-advertising', 'data-analytics']),

    // Step 3: Branch Logic (conditional fields based on serviceType)
    // Branch A: Paid Advertising
    monthlyBudget: z.enum(['<10k', '10k-50k', '50k+']).optional(),
    targetRoas: z.string().optional(),

    // Branch B: Data & Analytics
    techStack: z.string().optional(),
    trackingIssues: z.string().optional(),
});
```

### `WizardState` (Store)
State management structure for the wizard flow.

```typescript
interface WizardState {
    currentStep: number;
    totalSteps: number;
    formData: Partial<ApplyFormData>;
    history: number[]; // Navigation stack (for back button support)
    direction: number; // 1 (forward) or -1 (backward)
}
```

## Google Sheets Integration

### Sheet Row Schema
Used by the Apps Script webhook receiving `/api/contact` data.

| Column | Type | Source Field | Notes |
|---|---|---|---|
| Timestamp | ISO 8601 String | `new Date()` | Server time |
| Type | String | `partial ? 'Partial' : 'Full'` | Lead quality |
| Name | String | `fullName` | |
| Email | String | `email` | |
| Company | String | `company` | |
| Budget | String | `budget` | |
| Services | String | `services` | Comma-separated labels |
| Message | String | `message` | |
| Fields Interacted | String | `fieldsInteracted` | For partial leads |
| Time on Page | String | `timeOnPage` | Converted to seconds |
