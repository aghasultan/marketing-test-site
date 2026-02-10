import React from 'react';
import { motion } from 'framer-motion';

interface StepIndicatorProps {
    currentStep: number;
    totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

    const formattedStep = currentStep + 1;
    const progressPercentage = Math.round(((currentStep + 1) / totalSteps) * 100);

    return (
        <div className="mb-8" data-testid="step-indicator">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-400" data-testid="step-text" aria-live="polite">
                    Step {formattedStep} of {totalSteps}
                </span>
                <span className="text-sm font-medium text-zinc-500" data-testid="progress-text">
                    {progressPercentage}% Completed
                </span>
            </div>

            {/* Progress Bar Container */}
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>

            {/* Enhanced Step Dots */}
            <div className="mt-4 flex justify-between px-1" role="list">
                {steps.map((step) => {
                    const isCompleted = step < currentStep;
                    const isCurrent = step === currentStep;

                    return (
                        <div
                            key={step}
                            className="flex flex-col items-center"
                            role="listitem"
                            aria-current={isCurrent ? 'step' : undefined}
                        >
                            <motion.div
                                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors duration-300 ${isCompleted
                                    ? 'border-emerald-500 bg-emerald-500 text-white'
                                    : isCurrent
                                        ? 'border-emerald-500 text-emerald-500' // Current
                                        : 'border-zinc-700 bg-zinc-800 text-zinc-500'
                                    }`}
                                animate={isCurrent ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                                transition={{ duration: 0.5, repeat: isCurrent ? Infinity : 0, repeatDelay: 2 }}
                            >
                                {isCompleted ? (
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <span className="text-xs font-semibold">{step}</span>
                                )}
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
