
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { trackEvent } from '@/lib/tracking';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Calculator, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface ROICalculatorProps {
    roas: number;
    onBack: () => void;
}

export const ROICalculator = ({ roas, onBack }: ROICalculatorProps) => {
    const navigate = useNavigate();
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
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center">
                        <Calculator className="w-5 h-5 mr-2 text-primary" />
                        ROI Projector
                    </h3>
                    <Button variant="ghost" size="sm" onClick={onBack} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                </div>

                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-zinc-400">Monthly Ad Spend</span>
                            <span className="text-zinc-900 dark:text-white font-mono">${spend[0].toLocaleString()}</span>
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
                        <div className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                            ${projectedRevenue.toLocaleString()}
                        </div>
                        <div className="text-zinc-500 text-xs mt-1">Based on {roas}x ROAS</div>
                    </div>
                </div>
            </div>

            <Button
                className="w-full h-12 text-lg font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all"
                onClick={() => {
                    trackEvent('Book Strategy Call Clicked', { location: 'ROI Calculator' });
                    navigate('/apply');
                }}
            >
                Book Strategy Call
                <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
        </motion.div>
    );
};
