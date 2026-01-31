import React from 'react';
import { motion } from 'framer-motion';
import { CaseStudy } from '../types';

interface CaseStudyCardProps {
    caseStudy: CaseStudy;
    onClick?: () => void;
}

export function CaseStudyCard({ caseStudy, onClick }: CaseStudyCardProps) {
    return (
        <motion.div
            onClick={onClick}
            whileHover={{ scale: 1.02, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-md transition-colors hover:bg-zinc-900/70 hover:border-white/20 ${onClick ? 'cursor-pointer' : ''}`}
        >
            <div>
                <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium uppercase tracking-wider text-blue-400">
                        {caseStudy.industry}
                    </span>
                    <span className="rounded-full bg-white/5 px-2 py-1 text-xs text-zinc-400">
                        {caseStudy.spend}
                    </span>
                </div>

                <h3 className="mb-2 text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {caseStudy.clientName}
                </h3>

                <p className="mb-6 text-sm text-zinc-400 line-clamp-3">
                    {caseStudy.summary}
                </p>
            </div>

            <div className="mt-auto pt-4 border-t border-white/10">
                <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {caseStudy.resultMetric}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                    {caseStudy.tags.map(tag => (
                        <span key={tag} className="text-xs text-zinc-500">#{tag}</span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
