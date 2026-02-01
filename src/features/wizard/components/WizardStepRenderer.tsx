import React from 'react';
import { useWizard } from '../context/WizardContext';
import { WelcomeStep } from '../steps/WelcomeStep';
import { RevenueStep } from '../steps/RevenueStep';
import { PartnerReferralStep } from '../steps/PartnerReferralStep';
import { GoalsStep } from '../steps/GoalsStep';
import { ContactStep } from '../steps/ContactStep';
import { QualifiedStep } from '../steps/QualifiedStep';

export const WizardStepRenderer = () => {
    const { currentStep } = useWizard();

    switch (currentStep) {
        case 'WELCOME':
            return <WelcomeStep />;
        case 'REVENUE':
            return <RevenueStep />;
        case 'PARTNER_REFERRAL':
            return <PartnerReferralStep />;
        case 'GOALS':
            return <GoalsStep />;
        case 'CONTACT':
            return <ContactStep />;
        case 'COMPLETED':
            return <QualifiedStep />;
        default:
            return <div className="text-red-500">Unknown Step: {currentStep}</div>;
    }
};
