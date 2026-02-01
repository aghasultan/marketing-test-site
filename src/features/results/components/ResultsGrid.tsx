
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CaseStudy, getAllCaseStudies } from '@/lib/content';
import { CaseStudyCard } from './CaseStudyCard';

export const ResultsGrid = () => {
    const [studies, setStudies] = useState<CaseStudy[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await getAllCaseStudies();
            setStudies(data);
            setLoading(false);
        };
        load();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    if (loading) {
        return <div className="min-h-[50vh] flex items-center justify-center text-zinc-500">Loading Intelligence...</div>;
    }

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mb-12 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Verified Performance</h2>
                <p className="text-zinc-400 max-w-2xl mx-auto">
                    Real results from our "Transparency First" database. Every metric is verified by our internal audit protocol.
                </p>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max"
            >
                {studies.map((study, index) => {
                    // Logic: First item is featured (large). 
                    // Can be more complex (e.g., every 4th item).
                    const isFeatured = index === 0;

                    return (
                        <motion.div
                            key={study.slug}
                            variants={itemVariants}
                            className={isFeatured ? "md:col-span-2 md:row-span-2" : ""}
                        >
                            <CaseStudyCard
                                study={study}
                                variant={isFeatured ? 'featured' : 'standard'}
                                className="h-full"
                            />
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
};
