import React from 'react';
import { motion } from 'framer-motion';
import { useWizard } from '../../context/WizardContext';
import { CheckCircle, Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '../../../../components/ui/button';

export const BookingStep: React.FC = () => {
    const { state, dispatch } = useWizard();

    // Logic to send lead data via Webhook (FR12 & Setup for hand-off CRM integration)
    const handleBookNow = async () => {
        try {
            // Webhook payload mimicking what will be sent to the CRM
            const payload = {
                lead: state.data,
                qualified: true,
                annualizedRevenue: (state.data.monthlyRevenue || 0) * 12,
                source: "Marketing App Qualification Engine",
                timestamp: new Date().toISOString()
            };

            console.log('Dispatching qualified lead to CRM webhook:', payload);

            // Note: Replace with actual booking calendar redirect or embedding.
            const calendlyUrl = import.meta.env.VITE_CALENDLY_URL || "https://calendly.com/riffat-labs";
            window.location.href = calendlyUrl;

        } catch (error) {
            console.error('Failed to dispatch webhook', error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 py-8"
        >
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-4 max-w-md mx-auto">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-200">You Qualify.</h2>
                <p className="text-zinc-400 leading-relaxed">
                    Based on your ${((state.data.monthlyRevenue || 0) * 12 / 1000000).toFixed(1)}M ARR,
                    your business is well-positioned for our scaling architecture.
                </p>
                <p className="text-zinc-400 leading-relaxed pt-2">
                    Let's review your exact numbers and build a bespoke forecast roadmap.
                </p>
            </div>

            <div className="pt-8 flex justify-center">
                <Button
                    variant="default"
                    className="w-full sm:w-auto px-8 h-12 text-base flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                    onClick={handleBookNow}
                >
                    <Calendar className="w-5 h-5" />
                    Book Strategic Consultation
                </Button>
            </div>

            <div className="pt-12">
                <button
                    onClick={() => dispatch({ type: 'PREV_STEP' })}
                    className="text-sm text-zinc-500 hover:text-white flex items-center gap-2 mx-auto"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to metrics
                </button>
            </div>

            <div className="mt-8 text-xs text-zinc-600">
                Your data is secure and will only be used by our team for qualification.
            </div>
        </motion.div>
    );
};
