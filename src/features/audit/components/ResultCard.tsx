
import React from 'react';
import { motion } from 'framer-motion';
import { AuditCheck } from '@/lib/services/auditService';
import { CheckCircle, XCircle, AlertTriangle, Zap, Search, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResultCardProps {
    check: AuditCheck;
    delay: number;
}

const getIcon = (id: string, status: string) => {
    // Specific icons per category
    if (id === 'speed') return <Zap className="w-5 h-5 mb-1 text-inherit" />;
    if (id === 'seo') return <Search className="w-5 h-5 mb-1 text-inherit" />;
    if (id === 'pixel') return <Target className="w-5 h-5 mb-1 text-inherit" />;

    // Default fallback
    if (status === 'pass') return <CheckCircle className="w-5 h-5 mb-1" />;
    if (status === 'fail') return <XCircle className="w-5 h-5 mb-1" />;
    return <AlertTriangle className="w-5 h-5 mb-1" />;
};

const getStatusColor = (status: string) => {
    if (status === 'pass') return 'border-emerald-500/30 text-emerald-500 bg-emerald-500/5';
    if (status === 'fail') return 'border-rose-500/30 text-rose-500 bg-rose-500/5';
    return 'border-amber-500/30 text-amber-500 bg-amber-500/5';
};

export const ResultCard = ({ check, delay }: ResultCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
            className={cn(
                "glass-panel p-4 rounded-xl border flex flex-col items-center text-center backdrop-blur-md",
                getStatusColor(check.status)
            )}
        >
            <div className="mb-2 p-3 rounded-full bg-inherit border border-current opacity-80">
                {getIcon(check.id, check.status)}
            </div>

            <h4 className="font-semibold text-white text-sm mb-1">{check.label}</h4>

            {/* Status Text (e.g. "Fast", "Missing") */}
            <p className={cn(
                "font-bold text-lg mb-1"
            )}>
                {check.status === 'pass' ? 'PASSED' : 'FAILED'}
            </p>

            <span className="text-xs text-zinc-400 leading-tight block max-w-[140px]">
                {check.message}
            </span>
        </motion.div>
    );
};
