import React from 'react';
import { useWizard } from '../context/WizardContext';
import { WizardStep } from '../types';
import { cn } from '../../../lib/utils';
import { motion } from 'framer-motion';

const STEPS: { id: WizardStep, label: string }[] = [
    { id: 'BASIC_DETAILS', label: 'Basics' },
    { id: 'BUSINESS_METRICS', label: 'Metrics' },
    { id: 'BOOKING', label: 'Review' },
];

export const StepIndicator: React.FC = () => {
    const { state } = useWizard();

    // Re-map DISQUALIFIED to end step visually
    let currentIdx = STEPS.findIndex(s => s.id === state.currentStep);
    if (state.currentStep === 'DISQUALIFIED') currentIdx = 2;

    return (
        <div className="w-full relative mb-12">
            {/* Background Track */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 rounded-full hidden sm:block" />

            <div className="relative flex justify-between items-center z-10 w-full">
                {STEPS.map((step, idx) => {
                    const isActive = idx === currentIdx;
                    const isCompleted = idx < currentIdx;

                    return (
                        <div key={step.id} className="flex flex-col items-center gap-3 bg-zinc-950 px-2">
                            <motion.div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors duration-300",
                                    isActive ? "border-blue-500 bg-blue-500/20 text-blue-400" :
                                        isCompleted ? "border-emerald-500 bg-emerald-500/20 text-emerald-400" :
                                            "border-white/10 bg-zinc-900 text-zinc-600"
                                )}
                                animate={{ scale: isActive ? 1.1 : 1 }}
                            >
                                {isCompleted ? '✓' : idx + 1}
                            </motion.div>
                            <span className={cn(
                                "text-xs font-semibold uppercase tracking-wider",
                                isActive || isCompleted ? "text-zinc-300" : "text-zinc-600"
                            )}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Active Progress line via framer motion */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 hidden sm:block pointer-events-none">
                <motion.div
                    className="h-full bg-blue-500 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(currentIdx / (STEPS.length - 1)) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>
        </div>
    );
};
