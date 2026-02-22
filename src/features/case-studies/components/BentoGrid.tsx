import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CaseStudy } from '../types';
import { CaseStudyCard } from './CaseStudyCard';

interface BentoGridProps {
    studies: CaseStudy[];
}

export const BentoGrid: React.FC<BentoGridProps> = ({ studies }) => {
    return (
        <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(400px,_auto)]"
        >
            <AnimatePresence>
                {studies.map((study) => (
                    <motion.div
                        key={study.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, type: 'spring', bounce: 0.2 }}
                        className={
                            /* Make the first item span 2 columns on large screens to achieve Bento effect */
                            study.id === studies[0]?.id
                                ? 'md:col-span-2 lg:col-span-2'
                                : ''
                        }
                    >
                        <CaseStudyCard study={study} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    );
};
