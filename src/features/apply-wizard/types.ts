import { z } from 'zod';

// Step 1: Basic Details
export const basicDetailsSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    companyName: z.string().min(2, "Company name is required"),
    email: z.string().email("Valid email is required"),
});

export type BasicDetails = z.infer<typeof basicDetailsSchema>;

// Step 2: Business Metrics
export const businessMetricsSchema = z.object({
    monthlyRevenue: z.number().min(0, "Revenue must be a positive number"),
    cac: z.number().min(0, "CAC must be a positive number").optional(),
    ltv: z.number().min(0, "LTV must be a positive number").optional(),
    consentGiven: z.boolean().refine(val => val === true, "You must agree to the data processing policy"),
});

export type BusinessMetrics = z.infer<typeof businessMetricsSchema>;

// Full Wizard State
export type WizardData = Partial<BasicDetails> & Partial<BusinessMetrics>;

export type WizardStep = 'BASIC_DETAILS' | 'BUSINESS_METRICS' | 'DISQUALIFIED' | 'BOOKING';

export interface WizardState {
    currentStep: WizardStep;
    data: WizardData;
    isComplete: boolean;
    timestamp?: number;
}

export type WizardAction =
    | { type: 'NEXT_STEP'; payload?: Partial<WizardData> }
    | { type: 'PREV_STEP' }
    | { type: 'UPDATE_DATA'; payload: Partial<WizardData> }
    | { type: 'RESET' };

export const WIZARD_STORAGE_KEY = 'riffat_labs_wizard_state';
