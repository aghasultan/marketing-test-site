
import React from 'react';
import { useWizard } from '../context/WizardContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export const GoalsStep = () => {
    const { dispatch } = useWizard();
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 max-w-lg mx-auto"
        >
            <h2 className="text-3xl font-bold text-white text-center">What is your primary goal?</h2>
            <div className="grid gap-3">
                {['Scale Revenue', 'Improve ROAS', 'Expand to New Channels'].map((goal) => (
                    <Button
                        key={goal}
                        variant="outline"
                        onClick={() => {
                            dispatch({ type: 'SET_DATA', payload: { goals: [goal] } });
                            dispatch({ type: 'NEXT_STEP' });
                        }}
                        className="h-14 text-lg justify-start px-6 bg-white/5 border-white/10 hover:bg-white/10 hover:text-white"
                    >
                        {goal}
                    </Button>
                ))}
            </div>
        </motion.div>
    );
};
