import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ErrorBoundary } from '@components/ErrorBoundary';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { usePageTracking } from '@/lib/tracking';

import { Home } from '@pages/Home';
// Lazy load other pages for performance (NFR3)
const Apply = lazy(() => import('@pages/Apply').then(m => ({ default: m.Apply })));
const Scale = lazy(() => import('@pages/Scale').then(m => ({ default: m.Scale })));
const BlogIndex = lazy(() => import('@pages/BlogIndex').then(m => ({ default: m.BlogIndex })));
const BlogPost = lazy(() => import('@pages/BlogPost').then(m => ({ default: m.BlogPost })));
const NotFound = lazy(() => import('@pages/NotFound').then(m => ({ default: m.NotFound })));
const AuditPage = lazy(() => import('@pages/AuditPage').then(m => ({ default: m.AuditPage })));
const ResultsGrid = lazy(() => import('@/features/results/components/ResultsGrid').then(m => ({ default: m.ResultsGrid })));
const DesignSystem = lazy(() => import('@pages/DesignSystem').then(m => ({ default: m.DesignSystem })));

import { HelmetProvider } from 'react-helmet-async';

import { Toaster } from "@/components/ui/toaster";

import { WizardContainer } from '@/features/wizard/components/WizardContainer';
import { useState, useEffect } from 'react';

function Root() {
    usePageTracking();
    const [wizardOpen, setWizardOpen] = useState(false);

    useEffect(() => {
        const handleOpen = () => setWizardOpen(true);
        window.addEventListener('open-wizard', handleOpen);
        return () => window.removeEventListener('open-wizard', handleOpen);
    }, []);

    return (
        <HelmetProvider>
            <SpeedInsights />
            <Toaster />
            {wizardOpen && (
                <div className="relative z-[100]">
                    {/* Hacky close handling for now: clicking outside handled by Container usually? 
                        Or pass onClose prop? Container doesn't support onClose yet. 
                        Let's just mount it. It covers screen.
                    */}
                    <div style={{ position: 'fixed', inset: 0, zIndex: 100 }}>
                        <WizardContainer />
                        <button
                            onClick={() => setWizardOpen(false)}
                            className="absolute top-4 right-4 text-white z-[101] bg-black/50 p-2 rounded-full hover:bg-black/80"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
            <ErrorBoundary>
                <Layout>
                    {/* Suspense fallback can be a spinner or skeleton, using simple div for now */}
                    <Suspense fallback={<div className="min-h-screen" />}>
                        <Outlet />
                    </Suspense>
                </Layout>
            </ErrorBoundary>
        </HelmetProvider>
    );
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "audit",
                element: <AuditPage />,
            },
            {
                path: "results",
                element: <ResultsGrid />,
            },
            {
                path: "apply",
                element: <Apply />,
            },
            {
                path: "scale",
                element: <Scale />,
            },
            {
                path: "services",
                element: <Scale />,
            },
            {
                path: "blog",
                element: <BlogIndex />,
            },
            {
                path: "blog/:slug",
                element: <BlogPost />,
            },
            {
                path: "design-system",
                element: <DesignSystem />,
            },
            {
                path: "*",
                element: <NotFound />,
            }
        ]
    }
]);
