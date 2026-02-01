import React from 'react';
import { motion } from 'framer-motion';

export const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94] as const,
            },
        },
    };

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none -z-10">
                {/* Fallback gradient if Nebula fails to load */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
            </div>

            <motion.div
                className="w-full max-w-4xl mx-auto text-center space-y-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Badge */}
                <motion.div variants={itemVariants} className="flex justify-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-mono tracking-wide">
                        AI-DRIVEN AUDIT ENGINE
                    </span>
                </motion.div>

                {/* H1 - Inter Tight - Critical LCP Element */}
                <motion.h1
                    variants={itemVariants}
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]"
                >
                    Audit your Agency <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                        AI Readiness
                    </span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    variants={itemVariants}
                    className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
                >
                    Instant analysis of your ad stack, tracking infrastructure, and creative scalability.
                    See what the algorithms see in <span className="text-white font-medium">real-time</span>.
                </motion.p>

                {/* Placeholder Input Area (GlassPanel) */}
                <motion.div variants={itemVariants} className="w-full max-w-xl mx-auto mt-12">
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
                        <div className="relative glass-panel p-2 flex items-center justify-between">
                            <div className="flex-1 bg-white/5 rounded-lg h-12 flex items-center px-4 text-zinc-500 border border-white/5 mx-1">
                                <span className="mr-2 text-zinc-400">https://</span>
                                <span className="font-mono text-zinc-500">example.com</span>
                            </div>
                            <button className="bg-primary hover:bg-primary/90 text-white px-6 h-12 rounded-lg font-medium transition-colors shadow-lg shadow-primary/20 ml-2 whitespace-nowrap">
                                Start Audit
                            </button>
                        </div>
                    </div>
                    <p className="text-xs text-zinc-500 mt-4 text-center">
                        (Interactive Audit Tool coming in Epic 2)
                    </p>
                </motion.div>

                {/* Trust Signals */}
                <motion.div variants={itemVariants} className="pt-16 flex flex-col items-center gap-4 opacity-70">
                    <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Powered by Riffat Labs Intelligence</div>
                </motion.div>

            </motion.div>
        </section>
    );
};
