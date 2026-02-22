import React from 'react';
import { WizardProvider } from '../context/WizardContext';
import { ApplyWizardInner } from './ApplyWizardInner';

export const ApplyWizard: React.FC = () => {
    return (
        <WizardProvider>
            <div className="w-full relative isolate py-24">
                {/* Background ambient lighting */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 space-y-4">
                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white">
                            Ready to scale?
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                            Submit your metrics below. We'll run them against our growth models
                            to see if you qualify for our performance architecture.
                        </p>
                    </div>

                    <ApplyWizardInner />
                </div>
            </div>
        </WizardProvider>
    );
};
