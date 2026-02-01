
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';

interface ROICalculatorProps {
    roas: number;
    onBack: () => void;
}

export const ROICalculator = ({ roas, onBack }: ROICalculatorProps) => {
    const [spend, setSpend] = useState([5000]);

    const projectedRevenue = spend[0] * roas;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col h-full justify-between"
        >
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center">
                        <Calculator className="w-5 h-5 mr-2 text-primary" />
                        ROI Projector
                    </h3>
                    <Button variant="ghost" size="sm" onClick={onBack} className="text-zinc-400 hover:text-white">
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                </div>

                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-zinc-400">Monthly Ad Spend</span>
                            <span className="text-white font-mono">${spend[0].toLocaleString()}</span>
                        </div>
                        <Slider
                            defaultValue={[5000]}
                            max={50000}
                            min={1000}
                            step={1000}
                            value={spend}
                            onValueChange={setSpend}
                            className="py-4"
                        />
                    </div>

                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
                        <div className="text-emerald-400 text-xs uppercase tracking-wider mb-1">Projected Revenue</div>
                        <div className="text-3xl font-bold text-white tracking-tight">
                            ${projectedRevenue.toLocaleString()}
                        </div>
                        <div className="text-zinc-500 text-xs mt-1">Based on {roas}x ROAS</div>
                    </div>
                </div>
            </div>

            <Button
                className="w-full mt-6 bg-primary font-bold hover:bg-primary/90"
                onClick={() => {
                    // Dispatch a custom event to open the wizard, since they are in different trees?
                    // Or simple separation: just log for now?
                    // Ideally, we should use a global state (Zustand/Context) to toggle the Wizard modal.
                    // For this task, let's assume `window.dispatchEvent` or similar if simpler, 
                    // BUT we haven't built the global trigger yet.
                    // Let's at least add an ID that the wizard container might listen to,
                    // OR import the WizardContext? No, WizardContext is inside the Container usually.
                    // Let's add an id="open-wizard-trigger" and we can hook it up.

                    // Actually, easiest way is to use a simple custom event for this MVP integration:
                    window.dispatchEvent(new Event('open-wizard'));
                }}
            >
                Book Strategy Call
            </Button>
        </motion.div>
    );
};
