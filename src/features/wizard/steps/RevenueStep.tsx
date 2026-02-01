
import React from 'react';
import { useWizard } from '../context/WizardContext';
import { CurrencyInput } from '@/components/ui/currency-input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export const RevenueStep = () => {
    const { data, dispatch } = useWizard();

    const handleNext = () => {
        dispatch({ type: 'NEXT_STEP' });
    };

    const handleKeypress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleNext();
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 max-w-lg mx-auto w-full"
        >
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-white">What is your current monthly revenue?</h2>
                <p className="text-zinc-400">This helps us recommend the right growth strategy.</p>
            </div>

            <div className="space-y-4">
                <CurrencyInput
                    value={data.revenue}
                    onChange={(val) => dispatch({ type: 'SET_DATA', payload: { revenue: val } })}
                    placeholder="e.g. $50k or $100,000"
                    autoFocus
                />

                <div className="text-xs text-zinc-500 text-center font-mono">
                    Type "10k" for $10,000 or "1m" for $1,000,000
                </div>

                <Button
                    onClick={handleNext}
                    className="w-full h-12 text-lg font-bold"
                    // Disable if revenue is undefined or 0 (unless we allow 0? typically no)
                    disabled={!data.revenue || data.revenue <= 0}
                >
                    Continue
                </Button>
            </div>
        </motion.div>
    );
};
