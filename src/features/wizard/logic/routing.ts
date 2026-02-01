
import { WizardData, WizardStep } from "../context/WizardContext";

export const getNextStep = (currentStep: WizardStep, data: WizardData): WizardStep => {
    switch (currentStep) {
        case 'WELCOME':
            return 'REVENUE';

        case 'REVENUE':
            // Branching Logic
            // Threshold: $50k/mo
            const revenue = data.revenue || 0;
            if (revenue < 50000) {
                return 'PARTNER_REFERRAL'; // Too small for us
            }
            return 'GOALS'; // Big enough

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
