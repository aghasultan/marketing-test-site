import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { caseStudies } from '../../../data/results';
import { CaseStudy } from '../types';
import { CaseStudyCard } from './CaseStudyCard';
import { useResultsFilter } from '../hooks/useResultsFilter';
import { FilterBar } from './FilterBar';
import { ResultModal } from './ResultModal';

export function ResultsGrid() {
    const { filteredStudies, activeFilter, setFilter, industries } = useResultsFilter(caseStudies);
    const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

    const item = {
        hidden: { opacity: 0, scale: 0.9 },
        show: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 }
    };

    return (
        <section className="py-24">
            <div className="container px-4 md:px-6">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Recent Results
                    </h2>
                    <p className="mt-4 text-zinc-400">
                        Real outcomes from recent client partnerships.
                    </p>
                </div>

                <FilterBar
                    industries={industries}
                    activeFilter={activeFilter}
                    onFilterChange={setFilter}
                />

                <motion.div
                    layout
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 min-h-[400px]"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredStudies.length > 0 ? (
                            filteredStudies.map((study) => (
                                <motion.div
                                    key={study.id}
                                    variants={item}
                                    initial="hidden"
                                    animate="show"
                                    exit="exit"
                                    layout
                                >
                                    <CaseStudyCard
                                        caseStudy={study}
                                        onClick={() => setSelectedStudy(study)}
                                    />
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full py-12 text-center"
                            >
                                <div className="inline-block rounded-full bg-zinc-900/50 px-6 py-4 backdrop-blur-md border border-white/5">
                                    <p className="text-zinc-400">
                                        No exact matches for <span className="text-white font-medium">{activeFilter}</span> yet.
                                    </p>
                                    <button
                                        onClick={() => setFilter('All')}
                                        className="mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                                    >
                                        View all results
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            <ResultModal
                isOpen={!!selectedStudy}
                study={selectedStudy}
                onClose={() => setSelectedStudy(null)}
            />
        </section>
    );
}
