import { useState, useMemo } from 'react';
import { CaseStudy, Industry } from '../types';

interface UseResultsFilterReturn {
    filteredStudies: CaseStudy[];
    activeFilter: Industry | 'All';
    setFilter: (industry: Industry | 'All') => void;
    industries: (Industry | 'All')[];
}

export function useResultsFilter(caseStudies: CaseStudy[]): UseResultsFilterReturn {
    const [activeFilter, setFilter] = useState<Industry | 'All'>('All');

    // Derive unique industries from data (or use fixed list if preferred, but dynamic is safer)
    // We explicitly add 'All' to the start.
    const industries = useMemo(() => {
        const uniqueIndustries = Array.from(new Set(caseStudies.map(study => study.industry)));
        return ['All', ...uniqueIndustries] as (Industry | 'All')[];
    }, [caseStudies]);

    const filteredStudies = useMemo(() => {
        if (activeFilter === 'All') {
            return caseStudies;
        }
        return caseStudies.filter((study) => study.industry === activeFilter);
    }, [caseStudies, activeFilter]);

    return {
        filteredStudies,
        activeFilter,
        setFilter,
        industries
    };
}
