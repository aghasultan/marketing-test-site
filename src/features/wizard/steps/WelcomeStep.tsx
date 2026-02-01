
import React from 'react';
import { useWizard } from '../context/WizardContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export const WelcomeStep = () => {
    const { dispatch } = useWizard();
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 max-w-lg mx-auto"
        >
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Qualify for <span className="text-primary">Exponential Growth</span>
            </h1>
            <p className="text-xl text-zinc-400">
                See if you qualify for our Partner Network or Dedicated Growth Teams.
                Takes less than 60 seconds.
            </p>
            <Button
                onClick={() => dispatch({ type: 'NEXT_STEP' })}
                size="lg"
                className="w-full text-lg font-bold h-14"
            >
                Start Qualification
            </Button>
        </motion.div>
    );
};
