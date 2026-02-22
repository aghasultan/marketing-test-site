
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CaseStudy } from '@/lib/content';
import { cn } from '@/lib/utils';
import { VerifiedBadge } from './VerifiedBadge';

import { useState } from 'react';
import { ROICalculator } from './ROICalculator';
import { Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CaseStudyCardProps {
    study: CaseStudy;
    variant?: 'standard' | 'featured';
    className?: string;
}

export const CaseStudyCard = ({ study, variant = 'standard', className }: CaseStudyCardProps) => {
    const [showCalculator, setShowCalculator] = useState(false);

    // Helper to find ROAS
    const roasMetric = study.metrics.find(m => m.label.toUpperCase() === 'ROAS');
    const roasValue = roasMetric ? parseFloat(roasMetric.value.replace(/[^0-9.]/g, '')) : 0;
    const hasRoas = roasValue > 0;

    return (
        <motion.div
            whileHover={!showCalculator ? { y: -5 } : {}}
            className={cn(
                "glass-panel p-6 rounded-2xl relative overflow-hidden group border border-zinc-200 dark:border-white/10 hover:border-primary/50 transition-colors",
                variant === 'featured' ? 'md:col-span-2 md:row-span-2 flex flex-col justify-between' : 'flex flex-col',
                className
            )}
        >
            {/* Background Glow for Featured */}
            {variant === 'featured' && (
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
            )}

            {showCalculator ? (
                <ROICalculator roas={roasValue} onBack={() => setShowCalculator(false)} />
            ) : (
                <>
                    <div className="flex justify-between items-start mb-6 relative z-10">
                        <div>
                            <span className="text-xs font-mono text-primary mb-2 block uppercase tracking-wider">
                                {study.industry} • {study.adSpendRange}
                            </span>
                            <h3 className={cn("font-bold text-zinc-900 dark:text-white", variant === 'featured' ? "text-3xl md:text-4xl" : "text-xl")}>
                                {study.title}
                            </h3>
                            <p className="text-zinc-500 dark:text-zinc-400 mt-1">{study.clientName}</p>
                        </div>

                        <VerifiedBadge claim={study.claimReview} />
                    </div>

                    <div className={cn("grid gap-4 mt-auto relative z-10", variant === 'featured' ? "grid-cols-3" : "grid-cols-2")}>
                        {study.metrics.map((metric, i) => (
                            <div key={i} className="bg-zinc-100 dark:bg-white/5 rounded-lg p-3 border border-zinc-200 dark:border-white/5">
                                <div className="text-zinc-500 dark:text-zinc-400 text-xs uppercase tracking-wide mb-1">{metric.label}</div>
                                <div className="text-zinc-900 dark:text-white font-bold text-xl sm:text-2xl">{metric.value}</div>
                                <div className="text-emerald-400 text-xs font-mono mt-1">{metric.change}</div>
                            </div>
                        ))}
                    </div>

                    {/* Action Area */}
                    <div className="absolute bottom-6 right-6 flex items-center gap-2">
                        {hasRoas && (
                            <Button
                                size="sm"
                                variant="secondary"
                                className="opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-200 dark:bg-white/10 hover:bg-zinc-300 dark:hover:bg-white/20 text-zinc-900 dark:text-white border-0"
                                onClick={() => setShowCalculator(true)}
                            >
                                <Calculator className="w-4 h-4 mr-2" />
                                ROI Projector
                            </Button>
                        )}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowUpRight className="w-6 h-6 text-zinc-900 dark:text-white" />
                        </div>
                    </div>
                </>
            )}
        </motion.div>
    );
};
