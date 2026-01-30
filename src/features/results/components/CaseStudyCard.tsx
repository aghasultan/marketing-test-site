import React from 'react';
import { motion } from 'framer-motion';
import { CaseStudy } from '../types';

interface CaseStudyCardProps {
    caseStudy: CaseStudy;
    onClick: () => void;
}

export function CaseStudyCard({ caseStudy, onClick }: CaseStudyCardProps) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ y: -5 }}
            className="group relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6 text-left backdrop-blur-md transition-colors hover:border-white/20"
        >
            {/* Glow Effect */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl transition-opacity group-hover:opacity-100" />

            <div>
                <div className="mb-4 flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-400">
                        {caseStudy.industry}
                    </span>
                </div>

                <h3 className="mb-2 text-lg font-medium text-zinc-100">
                    {caseStudy.clientName}
                </h3>

                <p className="mb-6 text-sm leading-relaxed text-zinc-400">
                    {caseStudy.summary}
                </p>
            </div>

            <div className="mt-auto border-t border-white/5 pt-4">
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                    {caseStudy.resultMetric}
                </div>
            </div>
        </motion.button>
    );
}
