import { z } from 'zod';

export const SERVICE_TYPES = {
    PAID_ADVERTISING: 'paid-advertising',
    DATA_ANALYTICS: 'data-analytics'
} as const;

export const TOTAL_STEPS = 4;

export const ServiceTypeSchema = z.nativeEnum(SERVICE_TYPES);

export const ApplyFormSchema = z.object({
    // Step 1: Contact
    firstName: z.string().min(2, "First name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    website: z.string().url("Invalid URL").optional().or(z.literal('')),

    // Step 2: Business Details
    companyName: z.string().min(2, "Company name is required"),
    industry: z.enum(['Tech', 'Finance', 'Health', 'Retail', 'Other']),
    customIndustry: z.string().optional(),
    revenueRange: z.enum(['<10k', '10k-50k', '50k-200k', '200k+']),
    goals: z.string().optional(),
    serviceType: ServiceTypeSchema,

    // Step 3: Branch Logic
    // Branch A: Paid Advertising
    monthlyBudget: z.enum(['<10k', '10k-50k', '50k+']).optional(),
    targetRoas: z.string().optional(),

    // Branch B: Data & Analytics
    techStack: z.string().optional(),
    trackingIssues: z.string().optional(),
});

export type ApplyFormData = z.infer<typeof ApplyFormSchema>;
export type ApplyFormValues = ApplyFormData; // Alias for consistency

export interface WizardState {
    currentStep: number;
    totalSteps: number;
    formData: Partial<ApplyFormData>;
    history: number[]; // Stack for back navigation
    direction: number; // 1 for forward, -1 for backward

    setStep: (step: number) => void;
    updateFormData: (data: Partial<ApplyFormData>) => void;
    goBack: () => void;
    resetWizard: () => void;
}
