import React from 'react';
import { motion } from 'framer-motion';

interface StepIndicatorProps {
    currentStep: number;
    totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

    const formattedStep = currentStep + 1;
    const progressPercentage = Math.round((formattedStep / totalSteps) * 100);

    return (
        <div className="mb-8" data-testid="step-indicator">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-400" data-testid="step-text">
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

            {/* Optional: Step Dots (Mobile friendly visual) */}
            <div className="mt-4 flex justify-between px-1">
                {steps.map((step) => (
                    <div
                        key={step}
                        className={`flex h-2 w-2 items-center justify-center rounded-full transition-colors duration-300 ${step <= currentStep ? 'bg-zinc-200' : 'bg-zinc-800'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
