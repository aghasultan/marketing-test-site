import React from 'react';
import { motion } from 'framer-motion';

import { SEO } from '@/components/seo/Head';

export const DesignSystem = () => {
    return (
        <div className="min-h-screen bg-background p-10 space-y-12">
            <SEO title="Design System" noindex />
            <h1 className="text-4xl font-sans font-bold text-white mb-8">Glassmorphism Design System</h1>

            {/* Colors */}
            <section className="space-y-4">
                <h2 className="text-2xl font-mono text-zinc-400">01. Colors</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                        <div className="h-20 w-full rounded-lg bg-background border border-white/10"></div>
                        <p className="font-mono text-xs text-zinc-500">bg-background (#09090b)</p>
                    </div>
                    <div className="space-y-2">
                        <div className="h-20 w-full rounded-lg bg-primary"></div>
                        <p className="font-mono text-xs text-zinc-500">bg-primary (#3b82f6)</p>
                    </div>
                    <div className="space-y-2">
                        <div className="h-20 w-full rounded-lg bg-verified"></div>
                        <p className="font-mono text-xs text-zinc-500">bg-verified (#fbbf24)</p>
                    </div>
                    <div className="space-y-2">
                        <div className="h-20 w-full rounded-lg bg-card"></div>
                        <p className="font-mono text-xs text-zinc-500">bg-card</p>
                    </div>
                </div>
            </section>

            {/* Typography */}
            <section className="space-y-4">
                <h2 className="text-2xl font-mono text-zinc-400">02. Typography</h2>
                <div className="space-y-4 border border-white/10 p-6 rounded-lg bg-white/5">
                    <h1 className="text-5xl font-sans font-bold text-white">Display Heading (Inter Tight)</h1>
                    <h2 className="text-3xl font-sans font-semibold text-white">Section Heading</h2>
                    <p className="text-lg text-zinc-300 font-sans">
                        Body copy using Inter Tight. The quick brown fox jumps over the lazy dog.
                        High legibility on dark backgrounds is critical for readability.
                    </p>
                    <div className="p-4 bg-zinc-900 rounded border border-white/10">
                        <code className="text-sm font-mono text-primary">
                            const auditResult = await api.analyze(url); // JetBrains Mono
                        </code>
                    </div>
                </div>
            </section>

            {/* Glass Utilities */}
            <section className="space-y-4">
                <h2 className="text-2xl font-mono text-zinc-400">03. Glass Utilities</h2>
                <div className="grid md:grid-cols-3 gap-6 relative">
                    {/* Background blob for glass effect visibility */}
                    <div className="absolute top-0 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10"></div>
                    <div className="absolute bottom-0 right-10 w-64 h-64 bg-verified/20 rounded-full blur-3xl -z-10"></div>

                    <div className="glass p-8 rounded-xl h-48 flex items-center justify-center">
                        <span className="text-white font-medium">.glass</span>
                    </div>

                    <div className="glass-panel p-8 h-48 flex items-center justify-center">
                        <span className="text-white font-medium">.glass-panel</span>
                    </div>

                    <div className="glass glass-hover p-8 rounded-xl h-48 flex items-center justify-center cursor-pointer">
                        <span className="text-white font-medium">.glass-hover (Hover Me)</span>
                    </div>
                </div>
            </section>

            {/* Interactive Elements */}
            <section className="space-y-4">
                <h2 className="text-2xl font-mono text-zinc-400">04. Interactive</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-blue-600 transition-colors">
                        Primary Button
                    </button>
                    <button className="px-6 py-3 glass glass-hover text-white rounded-lg font-medium">
                        Secondary Glass
                    </button>
                    <div className="relative">
                        <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-verified"></span>
                        <div className="px-6 py-3 border border-white/10 rounded-lg text-white font-mono text-sm">
                            Verified Badge Test
                        </div>
                    </div>
                </div>
            </section>

            {/* Animations */}
            <section className="space-y-4">
                <h2 className="text-2xl font-mono text-zinc-400">05. Animations</h2>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-6 border border-primary/20 bg-primary/5 rounded-lg text-center"
                >
                    <p className="text-primary">Framer Motion fade-in</p>
                </motion.div>
            </section>
        </div>
    );
};
