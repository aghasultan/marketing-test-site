import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CaseStudy } from '../types';
import { VerifiedBadge } from './VerifiedBadge';

interface CaseStudyCardProps {
    study: CaseStudy;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ study }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full bg-zinc-950/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-colors group relative"
        >
            {/* Top subtle gradient glow on hover */}
            <div className="absolute inset-x-0 -top-full h-full bg-gradient-to-b from-blue-500/10 to-transparent group-hover:top-0 transition-all duration-500 pointer-events-none" />

            <div className="p-6 flex flex-col flex-1 z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md">
                            {study.industry}
                        </span>
                        {study.isVerified && <VerifiedBadge claimReview={study.claimReview} />}
                    </div>
                    <span className="text-xs text-zinc-400 border border-white/10 px-2 py-1 rounded-md">
                        {study.adSpendRange}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                    {study.title}
                </h3>

                <p className="text-sm text-zinc-400 mb-6 flex-1 line-clamp-3">
                    {study.excerpt}
                </p>

                <div className="grid grid-cols-3 gap-2 mt-auto pt-4 border-t border-white/10">
                    {study.metrics.map((metric, idx) => (
                        <div key={idx} className="flex flex-col">
                            <span className="text-lg font-bold text-white tracking-tight">{metric.value}</span>
                            <span className="text-xs text-zinc-500">{metric.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom action row */}
            <Link
                to={`/?preset=${study.industry.toLowerCase()}#roi-calculator`}
                className="px-6 py-4 bg-white/5 border-t border-white/10 flex items-center justify-between mt-auto z-10 hover:bg-blue-500/5 transition-colors group cursor-pointer"
            >
                <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                    Calculate Your ROI
                </span>
                <ArrowRight className="text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all w-5 h-5" />
            </Link>
        </motion.div>
    );
};
