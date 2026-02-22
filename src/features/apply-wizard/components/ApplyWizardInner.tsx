import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useWizard } from '../context/WizardContext';
import { StepIndicator } from './StepIndicator';
import { BasicDetailsStep } from './steps/BasicDetailsStep';
import { BusinessMetricsStep } from './steps/BusinessMetricsStep';
import { DisqualifiedStep } from './steps/DisqualifiedStep';
import { BookingStep } from './steps/BookingStep';
import { ErrorBoundary } from '../../shared/ErrorBoundary';

export const ApplyWizardInner: React.FC = () => {
    const { state } = useWizard();

    const renderStep = () => {
        switch (state.currentStep) {
            case 'BASIC_DETAILS':
                return <BasicDetailsStep key="basic" />;
            case 'BUSINESS_METRICS':
                return <BusinessMetricsStep key="metrics" />;
            case 'DISQUALIFIED':
                return <DisqualifiedStep key="disqualified" />;
            case 'BOOKING':
                return <BookingStep key="booking" />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4 sm:p-8 rounded-3xl bg-zinc-950/40 backdrop-blur-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
            <StepIndicator />
            <div className="min-h-[400px]">
                <ErrorBoundary componentName={`WizardStep-${state.currentStep}`}>
                    <AnimatePresence mode="wait">
                        {renderStep()}
                    </AnimatePresence>
                </ErrorBoundary>
            </div>
        </div>
    );
};
