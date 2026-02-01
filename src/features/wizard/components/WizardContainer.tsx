
import React from 'react';
import { WizardProvider } from '../context/WizardContext';
import { WizardStepRenderer } from './WizardStepRenderer';

// Placeholder components for debugging visualization


export const WizardContainer = () => {
    return (
        <WizardProvider>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
                {/* Close button could go here */}

                <div className="w-full max-w-2xl text-white">
                    <WizardStepRenderer />
                </div>

                {/* Optional Debug Overlay (hidden in prod) */}
                {/* <div className="absolute bottom-4 left-4 opacity-0 hover:opacity-100 transition-opacity">
                     <StepDebug /> 
                 </div> */}
            </div>
        </WizardProvider>
    );
};
