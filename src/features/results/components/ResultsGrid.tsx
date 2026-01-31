import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { caseStudies as defaultCaseStudies } from '../../../data/results';
import { CaseStudy } from '../types';
import { CaseStudyCard } from './CaseStudyCard';
import { useResultsFilter } from '../hooks/useResultsFilter';
import { FilterBar } from './FilterBar';
import { ResultModal } from './ResultModal';

interface ResultsGridProps {
    caseStudies?: CaseStudy[];
}

export function ResultsGrid({ caseStudies = defaultCaseStudies }: ResultsGridProps) {
    // Hook handles filtering logic
    const { filteredResults, activeFilter, setFilter, availableIndustries } = useResultsFilter(caseStudies);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const selectedStudy = caseStudies.find(s => s.id === selectedId) || null;

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95 }
    };

    return (
        <section className="py-24 px-4 container mx-auto" id="results">
            <div className="mb-16 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                    Recent Results
                </h1>
                <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                    See how we've helped brands scale their revenue through data-driven performance marketing.
                </p>
            </div>

            <FilterBar
                industries={availableIndustries}
                activeFilter={activeFilter}
                onFilterChange={setFilter}
            />

            <AnimatePresence mode="wait">
                {filteredResults.length > 0 ? (
                    <motion.div
                        key={activeFilter} // Re-trigger stagger animation on filter change
                        variants={container}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredResults.map((study) => (
                            <motion.div key={study.id} variants={item} layout>
                                <CaseStudyCard
                                    caseStudy={study}
                                    onClick={() => {
                                        setSelectedId(study.id);
                                    }}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <p className="text-xl text-zinc-500">
                            No exact matches found for this filter.
                        </p>
                        <button
                            onClick={() => setFilter('All')}
                            className="mt-4 text-blue-400 hover:text-blue-300 font-medium"
                        >
                            Clear all filters
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <ResultModal
                caseStudy={selectedStudy}
                isOpen={!!selectedId}
                onClose={() => setSelectedId(null)}
            />
        </section>
    );
}
