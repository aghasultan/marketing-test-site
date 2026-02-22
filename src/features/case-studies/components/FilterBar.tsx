import React from 'react';
// types not needed here

interface FilterBarProps {
    industries: string[];
    spendRanges: string[];
    activeIndustry: string | null;
    activeSpend: string | null;
    onIndustryChange: (industry: string | null) => void;
    onSpendChange: (spend: string | null) => void;
    resultCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
    industries,
    spendRanges,
    activeIndustry,
    activeSpend,
    onIndustryChange,
    onSpendChange,
    resultCount
}) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full p-4 rounded-xl border border-white/10 bg-zinc-950/40 backdrop-blur-xl relative">
            {/* Results Count Badge */}
            <div className="absolute -top-3 -right-3 bg-zinc-900 border border-white/10 text-zinc-400 text-xs font-bold px-2 py-1 rounded-full shadow-xl">
                {`${resultCount} Result${resultCount !== 1 ? 's' : ''}`}
            </div>

            {/* Industry Filter */}
            <div className="flex-1 flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400">Industry</label>
                <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                    <button
                        onClick={() => onIndustryChange(null)}
                        className={`px-3 py-1.5 text-xs sm:text-sm rounded-full transition-all border ${activeIndustry === null
                            ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                            : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        All
                    </button>
                    {industries.map(ind => (
                        <button
                            key={ind}
                            onClick={() => onIndustryChange(ind)}
                            className={`px-3 py-1.5 text-xs sm:text-sm rounded-full transition-all border w-fit ${activeIndustry === ind
                                ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                                : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            {ind}
                        </button>
                    ))}
                </div>
            </div>

            {/* Ad Spend Filter */}
            <div className="flex-1 flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400">Ad Spend Scale</label>
                <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                    <button
                        onClick={() => onSpendChange(null)}
                        className={`px-3 py-1.5 text-xs sm:text-sm rounded-full transition-all border ${activeSpend === null
                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]'
                            : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        All Sizes
                    </button>
                    {spendRanges.map(range => (
                        <button
                            key={range}
                            onClick={() => onSpendChange(range)}
                            className={`px-3 py-1.5 text-xs sm:text-sm rounded-full transition-all border w-fit ${activeSpend === range
                                ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]'
                                : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
