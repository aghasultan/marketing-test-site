
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { useWizard } from '../context/WizardContext';

export const QualifiedStep = () => {
    const { dispatch } = useWizard();

    const handleBook = () => {
        // Simulating Calendly
        alert("Opening Calendly Modal...");
        dispatch({ type: 'RESET' });
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 max-w-lg mx-auto"
        >
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>

            <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white">You Qualify for Dedicated Growth</h2>
                <p className="text-zinc-400">
                    Your revenue and business model are a perfect match for our <strong>Accelerator Program</strong>. Let's build your custom scaling plan.
                </p>
            </div>

            <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-xl p-6 space-y-2">
                <div className="text-emerald-400 text-sm font-bold uppercase tracking-wider">Next Step</div>
                <div className="text-white text-lg font-semibold">
                    15-Minute Strategy Session
                </div>
                <div className="text-zinc-500 text-sm">
                    Speak directly with a Lead Strategist (No Sales Reps).
                </div>
            </div>

            <Button
                onClick={handleBook}
                className="w-full h-14 text-lg font-bold bg-emerald-600 hover:bg-emerald-700"
            >
                <Calendar className="mr-2 w-5 h-5" />
                Book Strategy Call
            </Button>
        </motion.div>
    );
};
