
import React from 'react';
import { WizardProvider, useWizard } from '../context/WizardContext';


// Placeholder components for debugging visualization
const StepDebug = () => {
    const { currentStep, history, dispatch, data } = useWizard();

    return (
        <div className="p-8 text-white max-w-md mx-auto bg-zinc-900 rounded-xl border border-zinc-800">
            <div className="mb-4 text-xs text-zinc-500 uppercase tracking-widest font-mono">
                Step {history.length}: {currentStep}
            </div>

            <div className="h-40 flex items-center justify-center bg-zinc-950 rounded-lg mb-6 border border-zinc-800">
                <p className="text-zinc-400">Content for {currentStep}</p>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={() => dispatch({ type: 'PREV_STEP' })}
                    className="px-4 py-2 bg-zinc-800 rounded hover:bg-zinc-700 transition-colors text-sm"
                    disabled={history.length <= 1}
                >
                    Back
                </button>
                <button
                    onClick={() => dispatch({ type: 'NEXT_STEP' })}
                    className="px-4 py-2 bg-primary rounded hover:bg-primary/90 transition-colors text-sm font-bold flex-1"
                >
                    Next
                </button>
            </div>

            <pre className="mt-8 text-[10px] text-zinc-600 font-mono bg-black p-2 rounded">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
};

export const WizardContainer = () => {
    return (
        <WizardProvider>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                <StepDebug />
            </div>
        </WizardProvider>
    );
};
