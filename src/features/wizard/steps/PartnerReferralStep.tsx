
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight } from 'lucide-react';
import { useWizard } from '../context/WizardContext';

export const PartnerReferralStep = () => {
    const { dispatch } = useWizard();

    const handleDownload = () => {
        // Simulating download
        alert("Downloading 'Growth_Roadmap_2025.pdf'...");
        // In real app: window.open('/assets/roadmap.pdf', '_blank');
        dispatch({ type: 'RESET' }); // Reset after "done"
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 max-w-lg mx-auto"
        >
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto border border-blue-500/20">
                <FileText className="w-8 h-8 text-blue-500" />
            </div>

            <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white">Your Growth Roadmap is Ready</h2>
                <p className="text-zinc-400">
                    Based on your current stage, our <strong>Partner Network</strong> and <strong>Self-Serve Resources</strong> are the best fit to help you reach $50k/mo.
                </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-left space-y-4">
                <h3 className="text-white font-semibold flex items-center">
                    <span className="bg-blue-500 w-2 h-2 rounded-full mr-2" />
                    Recommended Strategy: Foundation Building
                </h3>
                <p className="text-sm text-zinc-400">
                    Focus on organic content loops and high-leverage partnerships before scaling paid ads. We've prepared a guide just for this phase.
                </p>
            </div>

            <Button
                onClick={handleDownload}
                className="w-full h-12 text-lg font-bold bg-blue-600 hover:bg-blue-700"
            >
                Download Roadmap PDF <ArrowRight className="ml-2 w-4 h-4" />
            </Button>

            <button
                onClick={() => dispatch({ type: 'PREV_STEP' })}
                className="text-sm text-zinc-500 hover:text-white transition-colors underline"
            >
                Go back and edit
            </button>
        </motion.div>
    );
};
