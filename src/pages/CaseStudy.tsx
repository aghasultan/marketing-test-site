import React, { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { caseStudies } from '@/features/case-studies/data/mockCaseStudies';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ErrorBoundary } from '@/features/shared/ErrorBoundary';
import { SeoMeta } from '@/features/shared/components/SeoMeta';
import { ArrowLeft } from 'lucide-react';

// Note: In a real environment, you'd use a markdown renderer like 'react-markdown'
// and 'rehype-raw' if you allow HTML. For this, we assume pure string content.

export const CaseStudyDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();

    const caseStudy = useMemo(() => {
        return caseStudies.find(cs => cs.slug === slug);
    }, [slug]);

    if (!caseStudy) {
        return <Navigate to="/results" replace />;
    }

    return (
        <ErrorBoundary componentName="CaseStudyDetail">
            <div className="bg-black text-white min-h-screen pt-24 pb-16">
                <SeoMeta
                    title={caseStudy.title}
                    description={caseStudy.excerpt}
                    caseStudy={caseStudy}
                />

                <div className="container mx-auto px-4 max-w-4xl">
                    <Link to="/results" className="inline-flex items-center text-zinc-400 hover:text-white mb-12 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Results
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <header className="space-y-6 pb-8 border-b border-white/10">
                            <div className="flex items-center gap-3 text-sm font-medium text-blue-400">
                                <span>{caseStudy.industry}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                                <span>{caseStudy.adSpendRange}</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                                {caseStudy.title}
                            </h1>

                            <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl">
                                {caseStudy.excerpt}
                            </p>
                        </header>

                        <div className="grid grid-cols-3 gap-6 py-8">
                            {caseStudy.metrics.map(m => (
                                <div key={m.label} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                    <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                                        {m.value}
                                    </div>
                                    <div className="text-sm text-zinc-400 mt-2">{m.label}</div>
                                </div>
                            ))}
                        </div>

                        <article className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-li:marker:text-blue-500 bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 mt-8">
                            <ReactMarkdown>
                                {caseStudy.markdownContent}
                            </ReactMarkdown>
                        </article>

                    </motion.div>
                </div>
            </div>
        </ErrorBoundary>
    );
};
