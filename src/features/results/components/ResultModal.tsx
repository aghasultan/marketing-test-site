import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { CaseStudy } from '../types';

interface ResultModalProps {
    caseStudy: CaseStudy | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ResultModal({ caseStudy, isOpen, onClose }: ResultModalProps) {
    return (
        <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <AnimatePresence>
                {isOpen && caseStudy && (
                    <Dialog.Portal forceMount>
                        {/* Overlay */}
                        <Dialog.Overlay asChild>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                            />
                        </Dialog.Overlay>

                        {/* Content */}
                        <Dialog.Content asChild>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
                                className="fixed z-50 left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-2xl translate-x-[-50%] translate-y-[-50%] bg-surface-elevated border border-white/10 rounded-2xl shadow-2xl overflow-y-auto no-scrollbar focus:outline-none"
                            >
                                <div className="relative p-6 md:p-8">
                                    <Dialog.Close className="absolute right-4 top-4 rounded-full p-2 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                                        <XMarkIcon className="h-6 w-6" />
                                        <span className="sr-only">Close</span>
                                    </Dialog.Close>

                                    <div className="mb-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/20">
                                                {caseStudy.industry}
                                            </span>
                                            <span className="text-zinc-400 text-sm font-medium">
                                                Spend: {caseStudy.spend}
                                            </span>
                                        </div>

                                        <Dialog.Title className="text-3xl md:text-4xl font-bold text-white mb-2">
                                            {caseStudy.clientName}
                                        </Dialog.Title>
                                        <Dialog.Description className="sr-only">
                                            Case study details for {caseStudy.clientName} in {caseStudy.industry} industry.
                                        </Dialog.Description>

                                        <div className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                                            {caseStudy.resultMetric}
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="prose prose-invert max-w-none">
                                            <h4 className="text-lg font-semibold text-white mb-2">The Challenge & Solution</h4>
                                            <p className="text-zinc-300 leading-relaxed text-lg">
                                                {caseStudy.summary}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">Strategies Used</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {caseStudy.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-3 py-1.5 rounded-md text-sm bg-white/5 border border-white/10 text-zinc-300"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-8 border-t border-white/10 flex justify-end">
                                        <button
                                            onClick={onClose}
                                            className="px-6 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
                                        >
                                            Close Detail
                                        </button>
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
