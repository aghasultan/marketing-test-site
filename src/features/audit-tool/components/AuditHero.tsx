import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AuditResultCard, type AuditResultData } from './AuditResultCard';
import { useAudit } from '../api/useAudit';

export const AuditHero: React.FC = () => {
    const [url, setUrl] = useState('');
    const [status, setStatus] = useState<'idle' | 'scanning' | 'complete' | 'error'>('idle');
    const [result, setResult] = useState<AuditResultData | null>(null);
    const [errorMsg, setErrorMsg] = useState('');

    const auditMutation = useAudit();

    const handleSubmit = async () => {
        if (!url || status === 'scanning') return;

        // Ensure https scheme
        let targetUrl = url;
        if (!/^https?:\/\//i.test(targetUrl)) {
            targetUrl = `https://${url}`;
            setUrl(targetUrl);
        }

        setStatus('scanning');
        setErrorMsg('');

        try {
            const data = await auditMutation.mutateAsync(targetUrl);
            setResult(data);
            setStatus('complete');
        } catch (err: unknown) {
            setStatus('error');
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred. Verify URL is reachable.';
            setErrorMsg(errorMessage);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleReset = () => {
        setStatus('idle');
        setResult(null);
        setErrorMsg('');
    };

    return (
        <div className="w-full relative min-h-[160px] flex items-center justify-center">
            <AnimatePresence mode="wait">
                {status !== 'complete' ? (
                    <motion.div
                        key="input-form"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="w-full max-w-3xl border border-white/10 rounded-xl shadow-2xl bg-zinc-950/40 backdrop-blur-xl p-6 md:p-8"
                    >
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            <Input
                                type="url"
                                placeholder="Enter your website URL (e.g., example.com)"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                onKeyDown={handleKeyDown}
                                disabled={status === 'scanning'}
                                className="flex-1 h-12 bg-zinc-950/40 border-white/20 text-white placeholder:text-zinc-500 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:bg-white/10 transition-all rounded-lg text-base"
                            />
                            <Button
                                onClick={handleSubmit}
                                disabled={status === 'scanning' || !url}
                                className="h-12 px-8 w-full md:w-auto bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white rounded-lg shadow-glow transition-all font-medium text-base min-w-[140px]"
                            >
                                {status === 'scanning' ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Scanning...
                                    </>
                                ) : (
                                    'Scan Now'
                                )}
                            </Button>
                        </div>
                        {status === 'error' && (
                            <motion.p
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 text-sm text-rose-400 font-medium"
                                role="alert"
                            >
                                {errorMsg}
                            </motion.p>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="result-card"
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                        className="w-full"
                        aria-live="polite"
                    >
                        {result && <AuditResultCard data={result} onReset={handleReset} />}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
