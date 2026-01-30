import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { CaseStudy } from '../types';

interface ResultModalProps {
    isOpen: boolean;
    onClose: () => void;
    study: CaseStudy | null;
}

export function ResultModal({ isOpen, onClose, study }: ResultModalProps) {
    if (!study) return null;

    return (
        <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <AnimatePresence>
                {isOpen && (
                    <Dialog.Portal forceMount>
                        {/* Overlay */}
                        <Dialog.Overlay asChild>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                            />
                        </Dialog.Overlay>

                        {/* Content */}
                        <Dialog.Content asChild>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ duration: 0.2 }}
                                className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 p-4 outline-none"
                            >
                                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-6 shadow-2xl md:p-10">
                                    {/* Close Button */}
                                    <div className="absolute right-4 top-4">
                                        <Dialog.Close asChild>
                                            <button className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white">
                                                <X size={20} />
                                            </button>
                                        </Dialog.Close>
                                    </div>

                                    {/* Header */}
                                    <div className="mb-6">
                                        <div className="mb-4 inline-flex items-center rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-400">
                                            {study.industry}
                                        </div>
                                        <Dialog.Title className="text-2xl font-bold text-white md:text-3xl">
                                            {study.clientName}
                                        </Dialog.Title>
                                    </div>

                                    {/* Result Metric */}
                                    <div className="mb-8 rounded-xl bg-zinc-900/50 p-6 backdrop-blur-sm border border-white/5">
                                        <h3 className="mb-2 text-sm font-medium text-zinc-400 uppercase tracking-wider">
                                            Key Result
                                        </h3>
                                        <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                                            {study.resultMetric}
                                        </p>
                                    </div>

                                    {/* Body Text */}
                                    <div className="mb-8 space-y-4 text-zinc-300 leading-relaxed">
                                        <p>{study.summary}</p>
                                        <p className="text-zinc-500 italic">
                                            More detailed "How we did it" content would go here in a full implementation, leveraging rich text or a 'details' field in the CMS.
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex justify-end">
                                        <Dialog.Close asChild>
                                            <button className="rounded-lg border border-white/10 bg-white/5 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10">
                                                Close
                                            </button>
                                        </Dialog.Close>
                                    </div>
                                </div>
                            </motion.div>
                        </Dialog.Content>
                    </Dialog.Portal>
                )}
            </AnimatePresence>
        </Dialog.Root>
    );
}
