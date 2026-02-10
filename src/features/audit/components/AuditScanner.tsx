
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, AlertCircle } from 'lucide-react';
import { analyzeUrl, AuditResult } from '@/lib/services/auditService';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ResultCard } from './ResultCard';

const auditSchema = z.object({
    url: z.string().url({ message: "Please enter a valid URL (e.g., https://example.com)" }),
});

type AuditFormValues = z.infer<typeof auditSchema>;

const SCAN_MESSAGES = [
    "Connecting to server...",
    "Scanning HTML structure...",
    "Analyzing pixel configuration...",
    "Measuring server response...",
    "Finalizing report..."
];

export const AuditScanner = () => {
    const [isScanning, setIsScanning] = useState(false);
    const [scanMessage, setScanMessage] = useState(SCAN_MESSAGES[0]);
    const [result, setResult] = useState<AuditResult | null>(null);
    const { toast } = useToast();

    const form = useForm<AuditFormValues>({
        resolver: zodResolver(auditSchema),
        defaultValues: {
            url: '',
        },
    });

    const runScanAnimation = () => {
        let step = 0;
        const interval = setInterval(() => {
            step++;
            if (step < SCAN_MESSAGES.length) {
                setScanMessage(SCAN_MESSAGES[step]);
            } else {
                clearInterval(interval);
            }
        }, 700);
        return interval;
    };

    const onSubmit = async (data: AuditFormValues) => {
        setIsScanning(true);
        setResult(null);
        const animInterval = runScanAnimation();

        try {
            const auditResult = await analyzeUrl(data.url);

            await new Promise(resolve => setTimeout(resolve, 2000));

            clearInterval(animInterval);
            setResult(auditResult);

            if (auditResult.overallScore === 0 && auditResult.checks[0].status === 'error') {
                toast({
                    variant: "destructive",
                    title: "Scan Failed",
                    description: "Could not access the target URL. Please check the address.",
                });
            } else {
                toast({
                    title: "Audit Complete",
                    description: `Score: ${auditResult.overallScore}/100`,
                });
            }

        } catch (error) {
            clearInterval(animInterval);
            toast({
                variant: "destructive",
                title: "Error",
                description: "An unexpected error occurred during the audit.",
            });
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
                {!isScanning && !result ? (
                    <motion.div
                        key="input-state"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="glass-panel p-2 rounded-2xl flex flex-col md:flex-row gap-2 relative z-20"
                    >
                        <div className="relative flex-grow">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                <Search className="w-5 h-5" />
                            </div>
                            <Input
                                {...form.register('url')}
                                placeholder="Enter your website URL (https://...)"
                                className="pl-10 h-14 bg-transparent border-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50"
                                disabled={isScanning}
                            />
                        </div>
                        <Button
                            size="lg"
                            onClick={form.handleSubmit(onSubmit)}
                            className="h-14 px-8 text-lg font-semibold rounded-xl bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all hover:scale-105"
                        >
                            Analyze Now
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>

                        {form.formState.errors.url && (
                            <div className="absolute -bottom-8 left-4 text-red-500 text-sm flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {form.formState.errors.url.message}
                            </div>
                        )}
                    </motion.div>
                ) : isScanning ? (
                    <motion.div
                        key="scanning-state"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="glass-panel p-8 rounded-2xl text-center relative z-20 flex flex-col items-center justify-center min-h-[140px]"
                    >
                        <div className="relative w-16 h-16 mb-4">
                            <motion.div
                                className="absolute inset-0 border-4 border-primary/30 rounded-full"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <motion.div
                                className="absolute inset-0 border-t-4 border-primary rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                        </div>

                        <motion.p
                            key={scanMessage}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-xl font-medium text-foreground"
                        >
                            {scanMessage}
                        </motion.p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="complete-state"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-panel p-6 rounded-2xl z-20"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="text-left">
                                <h3 className="text-2xl font-bold text-foreground">Audit Result</h3>
                                <p className="text-muted-foreground text-sm">Target: {result?.url}</p>
                            </div>
                            <div className="text-right">
                                <span className="block text-3xl font-bold text-foreground tracking-tight">
                                    {result?.overallScore}/100
                                </span>
                                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Score</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            {result?.checks.map((check, index) => (
                                <ResultCard key={check.id} check={check} delay={index * 0.1} />
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            onClick={() => setResult(null)}
                            className="w-full border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-700 dark:text-zinc-300"
                        >
                            Scan Another URL
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
