import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VerificationTooltip } from './VerificationTooltip';
import { CaseStudy } from '@/lib/content';

interface VerifiedBadgeProps {
    claim: CaseStudy['claimReview'];
}

export const VerifiedBadge = ({ claim }: VerifiedBadgeProps) => {
    const { verdict } = claim;

    if (verdict === 'Pending') return null;

    const isVerified = verdict === 'Verified';

    // Styles
    const containerClass = isVerified
        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20"
        : "bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20"; // Trusted

    const Icon = isVerified ? ShieldCheck : CheckCircle2;

    return (
        <VerificationTooltip claim={claim}>
            <div className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium flex items-center border transition-colors cursor-help relative whitespace-nowrap shrink-0",
                containerClass
            )}>
                {/* Pulse Effect for Verified only */}
                {isVerified && (
                    <span className="absolute inset-0 bg-emerald-500/10 animate-pulse rounded-full" />
                )}

                <Icon className="w-3 h-3 mr-1 relative z-10" />
                <span className="relative z-10">{verdict}</span>
            </div>
        </VerificationTooltip>
    );
};
