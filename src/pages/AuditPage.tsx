import React, { useState } from 'react';
import { SEO } from '@/components/seo/Head';
import { AuditForm } from '../components/AuditForm';
import { AuditResults } from '../components/AuditResults';
import { AuditResult } from '../services/auditService';

export const AuditPage = () => {
    const [result, setResult] = useState<AuditResult | null>(null);

    return (
        <>
            <SEO
                title="AI Ad Audit Tool | Riffat Labs"
                description="Get a free AI-powered audit of your ad landing pages."
            />
            <section className="min-h-screen pt-32 pb-20 px-5">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-emerald-500 font-bold tracking-wider text-sm uppercase mb-4 block">Free Tool</span>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-zinc-900 dark:text-white">AI Ad Performance Audit</h1>
                        <p className="text-zinc-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                            Paste your landing page URL below. Our AI mocks an analysis of your copy, keywords, and conversion triggers to give you an estimated quality score.
                        </p>
                    </div>

                    <AuditForm onResult={setResult} />

                    {result && <AuditResults result={result} />}
                </div>
            </section>
        </>
    );
};
