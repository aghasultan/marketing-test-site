
import React from 'react';
import { useWizard } from '../context/WizardContext';
import { WelcomeStep } from '../steps/WelcomeStep';
import { RevenueStep } from '../steps/RevenueStep';
// Import other steps as created...

export const WizardStepRenderer = () => {
    const { currentStep } = useWizard();

    switch (currentStep) {
        case 'WELCOME':
            return <WelcomeStep />;
        case 'REVENUE':
            return <RevenueStep />;
        case 'PARTNER_REFERRAL':
            return <div className="text-white text-center">Referral Logic (To Be Implemented)</div>;
        case 'GOALS':
            return <div className="text-white text-center">Goals Step (To Be Implemented)</div>;
        case 'CONTACT':
            return <div className="text-white text-center">Contact Step (To Be Implemented)</div>;
        case 'COMPLETED':
            return <div className="text-white text-center">Completed!</div>;
        default:
            return <div className="text-red-500">Unknown Step: {currentStep}</div>;
    }
};
