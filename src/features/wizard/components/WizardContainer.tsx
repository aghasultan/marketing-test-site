
import React from 'react';
import { useWizard } from '../context/WizardContext';
import { WizardStepRenderer } from './WizardStepRenderer';

export const WizardContainer = () => {
    const { isOpen, closeWizard } = useWizard();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <button
                onClick={closeWizard}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full backdrop-blur-sm z-[101]"
                aria-label="Close Wizard"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>

            <div className="w-full max-w-2xl text-white relative z-10 dark">
                <WizardStepRenderer />
            </div>
        </div>
    );
};
