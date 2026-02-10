
import React from 'react';
import { useWizard } from '../context/WizardContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export const ContactStep = () => {
    const { dispatch } = useWizard();
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 max-w-lg mx-auto"
        >
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white text-center">Where should we send your plan?</h2>
            <div className="space-y-4">
                <Input placeholder="Full Name" className="h-12 bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10" />
                <Input placeholder="Work Email" className="h-12 bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10" />
                <Button
                    onClick={() => dispatch({ type: 'NEXT_STEP' })}
                    className="w-full h-12 font-bold"
                >
                    See My Results
                </Button>
            </div>
        </motion.div>
    );
};
