import React from 'react';
import { motion } from 'framer-motion';
import { Industry } from '../types';
import { FilterOption } from '../hooks/useResultsFilter';

interface FilterBarProps {
    industries: Industry[];
    activeFilter: FilterOption;
    onFilterChange: (filter: FilterOption) => void;
}

export function FilterBar({ industries, activeFilter, onFilterChange }: FilterBarProps) {
    const filters: FilterOption[] = ['All', ...industries];

    return (
        <div className="flex justify-center mb-12">
            <div className="flex overflow-x-auto pb-4 md:pb-0 gap-2 no-scrollbar max-w-full px-4 mask-fade-sides">
                {filters.map((filter) => {
                    const isActive = activeFilter === filter;
                    return (
                        <button
                            key={filter}
                            onClick={() => onFilterChange(filter)}
                            className={`
                                relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap
                                ${isActive
                                    ? 'text-white bg-primary/20 ring-1 ring-primary/50 shadow-[0_0_15px_rgba(0,168,107,0.2)]'
                                    : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                                }
                            `}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeFilter"
                                    className="absolute inset-0 rounded-full bg-primary/10"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            {filter}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
