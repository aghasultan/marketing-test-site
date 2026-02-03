
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CaseStudy, getAllCaseStudies } from '@/lib/content';
import { CaseStudyCard } from './CaseStudyCard';
import { SEO } from '@/components/seo/Head';

export const ResultsGrid = () => {
    const [studies, setStudies] = useState<CaseStudy[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const load = async () => {
            const data = await getAllCaseStudies();
            setStudies(data);
            setLoading(false);
        };
        load();
    }, []);

    const categories = ['All', 'E-commerce', 'SaaS', 'Healthcare'];
    const visibleStudies = studies.filter(s => filter === 'All' || s.industry === filter);

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



    // Construct Schema
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": visibleStudies.map((study, index) => ({
            "@type": "ClaimReview",
            "position": index + 1,
            "url": `https://riffatlabs.com/results#${study.slug}`,
            "claimReviewed": study.title,
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": study.claimReview.rating,
                "bestRating": 5,
                "worstRating": 1
            },
            "author": {
                "@type": "Organization",
                "name": "Riffat Labs Audit Protocol"
            },
            "itemReviewed": {
                "@type": "CreativeWork",
                "author": {
                    "@type": "Organization",
                    "name": study.client
                }
            }
        }))
    };

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <SEO
                title="Verified Results & Case Studies"
                description="Browse our verified database of marketing results. Every claim is audited and backed by raw data."
                schema={schemaData}
            />
            <div className="mb-12 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Verified Performance</h2>
                <p className="text-zinc-400 max-w-2xl mx-auto mb-8">
                    Real results from our "Transparency First" database. Every metric is verified by our internal audit protocol.
                </p>

                {/* Filter Bar */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat
                                ? 'bg-white/10 text-white border border-primary/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                                : 'bg-transparent text-zinc-400 border border-transparent hover:bg-white/5 hover:text-zinc-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <motion.div
                key={filter} // Force re-render animation on filter change
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max"
            >
                {visibleStudies.map((study, index) => {
                    // Logic: First item is featured (large) ONLY if we are finding "All" or if it's the first in the filtered list
                    // Actually, maintaining grid layout with filters can be tricky for "featured" spans.
                    // Simplified: Only feature if 'All' is selected and it's 0.
                    const isFeatured = filter === 'All' && index === 0;

                    return (
                        <motion.div
                            key={study.slug}
                            variants={itemVariants}
                            layout
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

            {visibleStudies.length === 0 && (
                <div className="text-center py-12 text-zinc-500">
                    No verified results found for this category yet.
                </div>
            )}
        </section>
    );
};
