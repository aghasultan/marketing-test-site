import React, { useState } from 'react';
import { mockAnalyzeUrl, AuditResult } from '../services/auditService';

interface AuditFormProps {
    onResult: (result: AuditResult) => void;
}

export const AuditForm: React.FC<AuditFormProps> = ({ onResult }) => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) {
            setError('Please enter a URL');
            return;
        }
        setError('');
        setLoading(true);

        try {
            const result = await mockAnalyzeUrl(url);
            onResult(result);
        } catch (err) {
            setError('Failed to analyze URL. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="relative">
                <label htmlFor="audit-url" className="sr-only">Website URL</label>
                <div className="flex gap-4">
                    <input
                        id="audit-url"
                        type="url"
                        placeholder="https://yourwebsite.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full px-6 py-4 bg-zinc-50 dark:bg-slate-900/50 border border-zinc-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-emerald-500 text-foreground placeholder-zinc-400 dark:placeholder-slate-500 transition-colors"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        className={`px-8 py-4 rounded-lg font-semibold whitespace-nowrap bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-md ${loading ? 'opacity-75 cursor-wait' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Analyzing...' : 'Audit Now'}
                    </button>
                </div>
                {error && <p className="text-red-500 mt-2 text-sm absolute">{error}</p>}
            </form>
        </div>
    );
};
