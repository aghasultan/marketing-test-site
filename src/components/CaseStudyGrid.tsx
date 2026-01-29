import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getCaseStudies, CaseStudy } from '../services/contentService';


export const CaseStudyGrid = () => {
    const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);

    useEffect(() => {
        getCaseStudies().then(setCaseStudies);
    }, []);

    if (caseStudies.length === 0) {
        return null;
    }

    return (
        <section className="section shell reveal visible" id="work">
            <div className="section-header">
                <h2 className="section-eyebrow"><span>04</span>Recent Work</h2>
                <h3>Proven Results</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {caseStudies.map((study, index) => (
                    <motion.div
                        key={study.slug}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-colors"
                    >
                        <div className="aspect-video bg-slate-800 relative overflow-hidden">
                            {/* Fallback pattern if no image */}
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-4xl">📈</span>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="flex justify-between items-start mb-4">
                                <div className="text-sm text-emerald-500 font-mono">{study.metric}</div>
                                <div className="text-sm text-slate-400">{study.industry}</div>
                            </div>

                            <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-emerald-400 transition-colors">
                                {study.title}
                            </h3>

                            <p className="text-slate-400 mb-6 line-clamp-2">
                                {study.client} achieved {study.result} using our {study.tags[0]} strategies.
                            </p>

                            <div className="flex gap-2 mb-6">
                                {study.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center text-emerald-500 font-bold text-sm">
                                Read Case Study
                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
