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

function Root() {
    usePageTracking();
    return (
        <>
            <SpeedInsights />
            <ErrorBoundary>
                <Layout>
                    {/* Suspense fallback can be a spinner or skeleton, using simple div for now */}
                    <Suspense fallback={<div className="min-h-screen" />}>
                        <Outlet />
                    </Suspense>
                </Layout>
            </ErrorBoundary>
        </>
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
