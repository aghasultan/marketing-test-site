import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ClaimReviewSchema } from '../types';

interface VerifiedBadgeProps {
    className?: string;
    claimReview?: ClaimReviewSchema;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ className = '', claimReview }) => {
    const badgeElement = (
        <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold tracking-wide backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:bg-emerald-500/20 transition-all cursor-help ${className}`}
        // The title attribute is removed here because the Radix tooltip will provide the information
        >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Results</span>
        </div>
    );

    if (!claimReview) {
        return (
            <div title="Results verified by structural data.">
                {badgeElement}
            </div>
        );
    }

    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild aria-label="View verification details">
                    {badgeElement}
                </TooltipTrigger>
                <TooltipContent
                    sideOffset={8}
                    className="z-50 max-w-xs rounded-xl border border-emerald-500/30 bg-zinc-950/90 backdrop-blur-2xl p-4 shadow-2xl text-zinc-300 font-mono text-xs overflow-hidden"
                >
                    <div className="flex flex-col gap-3 relative">
                        {/* Background subtle glow */}
                        <div className="absolute inset-0 bg-emerald-500/5 blur-2xl pointer-events-none" />

                        <div className="border-b border-emerald-500/20 pb-2 mb-1 z-10">
                            <h4 className="flex items-center gap-1.5 font-bold text-emerald-400 text-sm tracking-widest uppercase">
                                <ShieldCheck className="w-4 h-4" /> ClaimReview Data
                            </h4>
                        </div>

                        <div className="flex flex-col gap-1.5 z-10">
                            <span className="text-zinc-500">Claim:</span>
                            <span className="text-white font-semibold">"{claimReview.claimReviewed}"</span>
                        </div>

                        <div className="flex flex-col gap-1.5 z-10">
                            <span className="text-zinc-500">Source Material:</span>
                            <div className="flex flex-col">
                                <span className="text-emerald-300">{claimReview.itemReviewed.name}</span>
                                <span className="text-zinc-400">Published: {claimReview.itemReviewed.datePublished}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5 z-10">
                            <span className="text-zinc-500">Verification Authority:</span>
                            <span className="text-zinc-300">{claimReview.author.name}</span>
                        </div>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
