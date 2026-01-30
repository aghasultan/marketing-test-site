import { useState } from 'react';

interface UseWizardReturn {
    currentStep: number;
    totalSteps: number;
    nextStep: () => void;
    prevStep: () => void;
    goToStep: (step: number) => void;
    isFirstStep: boolean;
    isLastStep: boolean;
    progress: number;
}

export function useWizard(totalSteps: number): UseWizardReturn {
    const [currentStep, setCurrentStep] = useState(1);

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const goToStep = (step: number) => {
        if (step >= 1 && step <= totalSteps) {
            setCurrentStep(step);
        }
    };

    const progress = (currentStep / totalSteps) * 100;

    return {
        currentStep,
        totalSteps,
        nextStep,
        prevStep,
        goToStep,
        isFirstStep: currentStep === 1,
        isLastStep: currentStep === totalSteps,
        progress
    };
}
