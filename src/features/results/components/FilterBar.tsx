import React from 'react';
import { motion } from 'framer-motion';
import { Industry } from '../types';

interface FilterBarProps {
    industries: (Industry | 'All')[];
    activeFilter: Industry | 'All';
    onFilterChange: (filter: Industry | 'All') => void;
}

export function FilterBar({ industries, activeFilter, onFilterChange }: FilterBarProps) {
    return (
        <div className="mb-12 flex flex-wrap justify-center gap-3">
            {industries.map((industry) => {
                const isActive = activeFilter === industry;

                return (
                    <button
                        key={industry}
                        onClick={() => onFilterChange(industry)}
                        className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${isActive
                                ? 'text-zinc-950'
                                : 'text-zinc-400 hover:text-zinc-200'
                            }`}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="activeFilter"
                                className="absolute inset-0 rounded-full bg-white"
                                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{industry}</span>
                    </button>
                );
            })}
        </div>
    );
}
