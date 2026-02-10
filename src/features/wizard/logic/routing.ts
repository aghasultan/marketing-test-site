
import { WizardData, WizardStep } from "../context/WizardContext";

export const getNextStep = (currentStep: WizardStep, data: WizardData): WizardStep => {
    switch (currentStep) {
        case 'WELCOME':
            return 'REVENUE';

        case 'REVENUE': {
            // Branching Logic
            // Threshold: $50k/mo
            let revenue = data.revenue || 0;

            // Fallback: parse revenueRange string (e.g. '50k+', '100k-500k')
            if (!revenue && data.revenueRange) {
                const match = data.revenueRange.match(/(\d+)/);
                if (match) {
                    const num = parseInt(match[1], 10);
                    // Assume 'k' suffix means thousands
                    revenue = data.revenueRange.toLowerCase().includes('k') ? num * 1000 : num;
                }
            }

            if (revenue < 50000) {
                return 'PARTNER_REFERRAL'; // Too small for us
            }
            return 'GOALS'; // Big enough
        }

        case 'PARTNER_REFERRAL':
            // Maybe they can restart? Or it's a dead end?
            // Let's assume they can't go 'Next' from here usually, or it loops to start?
            // For now, let's say it's terminal from a "Next" perspective in the wizard flow
            return 'PARTNER_REFERRAL';

        case 'GOALS':
            return 'CONTACT';

        case 'CONTACT':
            return 'COMPLETED';

        case 'COMPLETED':
            return 'COMPLETED';

        default:
            return 'WELCOME';
    }
};
