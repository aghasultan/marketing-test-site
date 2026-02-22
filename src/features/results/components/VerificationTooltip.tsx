
import React from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { CaseStudy } from '@/lib/content';
import { ShieldCheck } from 'lucide-react';

interface VerificationTooltipProps {
    claim: CaseStudy['claimReview'];
    children: React.ReactNode;
}

export const VerificationTooltip = ({ claim, children }: VerificationTooltipProps) => {
    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger asChild className="cursor-help">
                    {children}
                </TooltipTrigger>
                <TooltipContent className="bg-zinc-950 border border-emerald-500/20 text-xs p-3 shadow-xl backdrop-blur-md">
                    <div className="space-y-2 min-w-[180px]">
                        <div className="flex items-center text-emerald-500 font-bold border-b border-emerald-500/10 pb-1 mb-1">
                            <ShieldCheck className="w-3 h-3 mr-1.5" />
                            SCHEMA.ORG VERIFIED
                        </div>

                        <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 text-zinc-400 font-mono">
                            <span className="text-zinc-500 text-[10px] uppercase tracking-wider">Verdict</span>
                            <span className="text-white">{claim.verdict}</span>

                            <span className="text-zinc-500 text-[10px] uppercase tracking-wider">Rating</span>
                            <span className="text-white">{claim.rating}/5</span>

                            <span className="text-zinc-500 text-[10px] uppercase tracking-wider">Author</span>
                            <span className="text-white truncate max-w-[120px]">RR Labs</span>

                            <span className="text-zinc-500 text-[10px] uppercase tracking-wider">Date</span>
                            <span className="text-white">Live</span>
                        </div>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
