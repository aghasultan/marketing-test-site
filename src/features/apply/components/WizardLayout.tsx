import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StepIndicator } from './StepIndicator';

interface WizardLayoutProps {
    currentStep: number;
    totalSteps: number;
    title: string;
    description: string;
    children: React.ReactNode;
}

export function WizardLayout({
    currentStep,
    totalSteps,
    title,
    description,
    children
}: WizardLayoutProps) {
    return (
        <div className="min-h-screen bg-zinc-950 px-4 py-20 md:px-6">
            <div className="mx-auto max-w-xl">

                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                        {title}
                    </h1>
                    {description && (
                        <p className="mt-2 text-zinc-400">
                            {description}
                        </p>
                    )}
                </div>

                {/* Card */}
                <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/50 p-6 shadow-2xl backdrop-blur-md md:p-8">

                    <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

                    {/* Step Content with Transition */}
                    <div className="relative mt-8 min-h-[300px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {children}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
