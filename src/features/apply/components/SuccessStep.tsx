import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function SuccessStep() {
    return (
        <div className="flex flex-col items-center justify-center text-center py-10">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6 rounded-full bg-green-500/20 p-4"
            >
                <div className="rounded-full bg-green-500 p-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-8 w-8 text-white"
                    >
                        <path
                            fillRule="evenodd"
                            d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-9a.75.75 0 011.28-.532l5.36 8.04 8.26-12.394a.75.75 0 011.046-.268z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </motion.div>

            <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-3 text-2xl font-bold text-white"
            >
                Application Received!
            </motion.h2>

            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-8 text-zinc-400 max-w-sm"
            >
                Thanks for applying. We'll review your details and get back to you within 24 hours.
            </motion.p>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <Link
                    to="/"
                    className="rounded-lg bg-white px-6 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200"
                >
                    Back to Home
                </Link>
            </motion.div>
        </div>
    );
}
