
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { CaseStudy } from '@/lib/content';
import { cn } from '@/lib/utils';


interface CaseStudyCardProps {
    study: CaseStudy;
    variant?: 'standard' | 'featured';
    className?: string;
}

export const CaseStudyCard = ({ study, variant = 'standard', className }: CaseStudyCardProps) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={cn(
                "glass-panel p-6 rounded-2xl relative overflow-hidden group border border-white/10 hover:border-primary/50 transition-colors",
                variant === 'featured' ? 'md:col-span-2 md:row-span-2 flex flex-col justify-between' : 'flex flex-col',
                className
            )}
        >
            {/* Background Glow for Featured */}
            {variant === 'featured' && (
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
            )}

            <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                    <span className="text-xs font-mono text-primary mb-2 block uppercase tracking-wider">
                        {study.industry} • {study.service}
                    </span>
                    <h3 className={cn("font-bold text-white", variant === 'featured' ? "text-3xl md:text-4xl" : "text-xl")}>
                        {study.title}
                    </h3>
                    <p className="text-zinc-400 mt-1">{study.client}</p>
                </div>

                {study.claimReview.verdict === 'Verified' && (
                    <div className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-full text-xs font-medium flex items-center border border-emerald-500/20">
                        <ShieldCheck className="w-3 h-3 mr-1" />
                        Verified
                    </div>
                )}
            </div>

            <div className={cn("grid gap-4 mt-auto relative z-10", variant === 'featured' ? "grid-cols-3" : "grid-cols-2")}>
                {study.metrics.map((metric, i) => (
                    <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/5">
                        <div className="text-zinc-400 text-xs uppercase tracking-wide mb-1">{metric.label}</div>
                        <div className="text-white font-bold text-xl sm:text-2xl">{metric.value}</div>
                        <div className="text-emerald-400 text-xs font-mono mt-1">{metric.change}</div>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-6 h-6 text-white" />
            </div>
        </motion.div>
    );
};
