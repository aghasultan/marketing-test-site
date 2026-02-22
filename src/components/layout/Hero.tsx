import React from 'react';
import { motion } from 'framer-motion';
import { AuditHero } from '@/features/audit-tool';

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
        <section id="hero" aria-labelledby="hero-title" className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none -z-10">
                {/* Fallback gradient if Nebula fails to load */}
                <motion.div
                    className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 dark:bg-blue-500/10 blur-[120px]"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
                <motion.div
                    className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 dark:bg-emerald-500/10 blur-[120px]"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 1
                    }}
                />
            </div>

            <motion.div
                className="w-full max-w-4xl mx-auto text-center space-y-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Badge */}
                <motion.div variants={itemVariants} className="flex justify-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 font-mono tracking-wide backdrop-blur-sm">
                        AI-DRIVEN AUDIT ENGINE
                    </span>
                </motion.div>

                {/* H1 - Inter Tight - Critical LCP Element */}
                <motion.h1
                    id="hero-title"
                    variants={itemVariants}
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.1] drop-shadow-sm"
                >
                    Audit your Agency <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500 dark:from-blue-400 dark:to-emerald-400 drop-shadow-sm">
                        AI Readiness
                    </span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    variants={itemVariants}
                    className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed drop-shadow-sm"
                >
                    Instant analysis of your ad stack, tracking infrastructure, and creative scalability.
                    See what the algorithms see in <span className="text-zinc-900 dark:text-white font-medium">real-time</span>.
                </motion.p>

                {/* Audit Scanner Feature */}
                <motion.div variants={itemVariants} className="w-full mt-12">
                    <AuditHero />
                </motion.div>

                {/* Trust Signals */}
                <motion.div variants={itemVariants} className="pt-16 flex flex-col items-center gap-4 opacity-100">
                    <div className="text-xs font-mono text-zinc-400 dark:text-zinc-500 font-medium uppercase tracking-widest drop-shadow-sm">Powered by RR Labs Intelligence</div>
                </motion.div>

            </motion.div>
        </section>
    );
};
