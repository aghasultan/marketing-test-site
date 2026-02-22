import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, Gauge, FileText, Share2, CornerUpLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface AuditResultData {
    url: string;
    ttfbMs: number;
    pixelFound: boolean;
    seoTitleFound: boolean;
    seoDescriptionFound: boolean;
}

interface AuditResultCardProps {
    data: AuditResultData;
    onReset: () => void;
}

const ResultItem = ({ label, passed, icon: Icon, time }: { label: string, passed: boolean, icon: React.ElementType, time?: number }) => (
    <div className={`p-4 rounded-xl border ${passed ? 'border-emerald-500/20 bg-emerald-500/10' : 'border-rose-500/20 bg-rose-500/10'} backdrop-blur-md flex items-center justify-between transition-all`}>
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${passed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className="font-medium text-white text-sm">{label}</p>
                <p className={`text-xs mt-0.5 ${passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {passed ? 'Passed Standard' : 'Critical Failure'}
                </p>
            </div>
        </div>
        <div className="flex items-center gap-2">
            {time && <span className="text-xs text-zinc-400 font-mono">{time}ms</span>}
            {passed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            ) : (
                <XCircle className="w-5 h-5 text-rose-500" />
            )}
        </div>
    </div>
);

export const AuditResultCard: React.FC<AuditResultCardProps> = ({ data, onReset }) => {
    // Determine passes
    const speedPass = data.ttfbMs < 800; // NFR1 requirement conceptually extended to TTFB/network roundtrip here
    const pixelPass = data.pixelFound;
    const seoPass = data.seoTitleFound && data.seoDescriptionFound;

    const allPassed = speedPass && pixelPass && seoPass;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-3xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950/60 backdrop-blur-2xl"
        >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        Audit Complete
                    </h3>
                    <p className="text-sm text-zinc-400 mt-1 font-mono">{data.url}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium border ${allPassed ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                    {allPassed ? 'Excellent Status' : 'Issues Detected'}
                </div>
            </div>

            {/* Content Grid */}
            <div className="p-6 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <ResultItem
                    label="Page Speed (TTFB)"
                    passed={speedPass}
                    icon={Gauge}
                    time={Math.round(data.ttfbMs)}
                />
                <ResultItem
                    label="Meta Pixel Tracking"
                    passed={pixelPass}
                    icon={Share2}
                />
                <ResultItem
                    label="SEO Baseline Tags"
                    passed={seoPass}
                    icon={FileText}
                />
            </div>

            {/* Footer / CTA */}
            <div className="p-6 border-t border-white/10 bg-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <Button
                    variant="ghost"
                    onClick={onReset}
                    className="text-zinc-400 hover:text-white hover:bg-white/10 w-full sm:w-auto text-sm h-10"
                >
                    <CornerUpLeft className="w-4 h-4 mr-2" />
                    New Audit
                </Button>

                {allPassed ? (
                    <Button
                        className="w-full sm:w-auto h-10 bg-emerald-600 hover:bg-emerald-500 text-white border-none shadow-glow text-sm"
                        onClick={() => window.location.href = '#services'}
                    >
                        Scale Your Success <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                ) : (
                    <Button
                        className="w-full sm:w-auto h-10 bg-blue-600 hover:bg-blue-500 text-white border-none shadow-glow text-sm"
                        onClick={() => window.location.href = '#roi-calculator'}
                    >
                        Fix Issues & Calculate ROI <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                )}
            </div>
        </motion.div>
    );
};
