import { z } from 'zod';

export const ApplyFormSchema = z.object({
    // Step 1: Contact
    firstName: z.string().min(2, 'First name is required'),
    email: z.string().email('Invalid email address'),
    website: z.string().url('Invalid URL').optional().or(z.literal('')),

    // Step 2: Details
    companyName: z.string().min(2, 'Company name is required'),
    industry: z.enum(['Tech', 'Finance', 'Health', 'Retail', 'Other'], {
        errorMap: () => ({ message: 'Please select an industry' }),
    }),
    customIndustry: z.string().optional(),
    revenueRange: z.enum(['<10k', '10k-50k', '50k-200k', '200k+']),
    goals: z.string().optional(),
}).refine((data) => {
    if (data.industry === 'Other' && !data.customIndustry) {
        return false;
    }
    return true;
}, {
    message: "Please specify your industry",
    path: ["customIndustry"],
});

export type ApplyFormValues = z.infer<typeof ApplyFormSchema>;
