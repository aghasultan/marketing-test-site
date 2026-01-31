import { z } from 'zod';

export const ServiceTypeSchema = z.enum(['paid-advertising', 'data-analytics']);

export const ApplyFormSchema = z.object({
    serviceType: ServiceTypeSchema.optional(),

    // Branch A: Paid Advertising
    monthlyBudget: z.enum(['<10k', '10k-50k', '50k+']).optional(),
    targetRoas: z.string().optional(),

    // Branch B: Data & Analytics
    techStack: z.string().optional(),
    trackingIssues: z.string().optional(), // Text area input usually

    // Common Contact Info (Final Step)
    name: z.string().min(2, "Name is required").optional(),
    email: z.string().email("Invalid email address").optional(),
    companyWebsite: z.string().url("Invalid URL").optional().or(z.literal('')),
});

export type ApplyFormData = z.infer<typeof ApplyFormSchema>;

export interface WizardState {
    currentStep: number;
    totalSteps: number;
    formData: ApplyFormData;
    history: number[]; // Stack for back navigation
    direction: number; // 1 for forward, -1 for backward

    setStep: (step: number) => void;
    updateFormData: (data: Partial<ApplyFormData>) => void;
    goBack: () => void;
    resetWizard: () => void;
}
