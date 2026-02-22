import React, { useState, useMemo } from 'react';
import { FilterBar } from './FilterBar';
import { BentoGrid } from './BentoGrid';
import { ErrorBoundary } from '@/features/shared/ErrorBoundary';
import { mockCaseStudies } from '../data/mockCaseStudies';

export const ResultsSection: React.FC = () => {
    const [activeIndustry, setActiveIndustry] = useState<string | null>(null);
    const [activeSpend, setActiveSpend] = useState<string | null>(null);

    // Derive unique options dynamically
    const industries = useMemo(() => Array.from(new Set(mockCaseStudies.map(cs => cs.industry))).sort(), []);
    const spendRanges = useMemo(() => Array.from(new Set(mockCaseStudies.map(cs => cs.adSpendRange))).sort(), []);

    // Filter Logic
    const filteredStudies = useMemo(() => {
        return mockCaseStudies.filter(cs => {
            if (activeIndustry && cs.industry !== activeIndustry) return false;
            if (activeSpend && cs.adSpendRange !== activeSpend) return false;
            return true;
        });
    }, [activeIndustry, activeSpend]);

    return (
        <section className="w-full py-24 min-h-screen flex flex-col items-center">
            <div className="max-w-7xl w-full px-6 flex flex-col gap-8">
                <div className="flex flex-col gap-4 max-w-2xl">
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        Verified Growth Outcomes
                    </h2>
                    <p className="text-zinc-400 text-lg">
                        Explore our audited performance history. Filter by your industry or specific budget tiers to see predictable scaling frameworks in action.
                    </p>
                </div>

                <div className="mb-12">
                    <FilterBar
                        industries={industries}
                        spendRanges={spendRanges}
                        activeIndustry={activeIndustry}
                        activeSpend={activeSpend}
                        onIndustryChange={setActiveIndustry}
                        onSpendChange={setActiveSpend}
                        resultCount={filteredStudies.length}
                    />
                </div>

                {filteredStudies.length === 0 ? (
                    <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-white/5">
                        <h3 className="text-xl font-bold text-white mb-2">No exact matches</h3>
                        <p className="text-zinc-500 text-lg">We don't have a published study matching those precise criteria yet.</p>
                        <button
                            onClick={() => {
                                setActiveIndustry(null);
                                setActiveSpend(null);
                            }}
                            className="mt-4 px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 hover:bg-blue-500/20 rounded-lg"
                        >
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    <ErrorBoundary componentName="BentoGrid Results">
                        <BentoGrid studies={filteredStudies} />
                    </ErrorBoundary>
                )}
            </div>
        </section>
    );
};
