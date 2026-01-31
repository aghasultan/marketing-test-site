import { useState, useMemo } from 'react';
import { CaseStudy, Industry, INDUSTRIES } from '../types';

export type FilterOption = Industry | 'All';

interface UseResultsFilterReturn {
    activeFilter: FilterOption;
    setFilter: (filter: FilterOption) => void;
    filteredResults: CaseStudy[];
    availableIndustries: Industry[];
}

export function useResultsFilter(caseStudies: CaseStudy[]): UseResultsFilterReturn {
    const [activeFilter, setActiveFilter] = useState<FilterOption>('All');

    const filteredResults = useMemo(() => {
        if (activeFilter === 'All') {
            return caseStudies;
        }
        return caseStudies.filter(study => study.industry === activeFilter);
    }, [caseStudies, activeFilter]);

    // Return all defined industries to allow filtering even if no current results (good for empty state testing)
    const availableIndustries = INDUSTRIES;

    return {
        activeFilter,
        setFilter: setActiveFilter,
        filteredResults,
        availableIndustries
    };
}
