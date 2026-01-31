import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '@components/Layout';
import { Home } from '@pages/Home';
import { Apply } from '@pages/Apply';
import { Scale } from '@pages/Scale';
import { BlogIndex } from '@pages/BlogIndex';
import { BlogPost } from '@pages/BlogPost';
import { NotFound } from '@pages/NotFound';
import { AuditPage } from '@pages/AuditPage';
import { ResultsGrid } from './features/results/components/ResultsGrid';

import { SpeedInsights } from "@vercel/speed-insights/react";

import { ErrorBoundary } from '@components/ErrorBoundary';

import { usePageTracking } from './lib/tracking';

function App() {
  usePageTracking();

  return (
    <>
      <SpeedInsights />
      <ErrorBoundary>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/audit" element={<AuditPage />} />
            <Route path="/results" element={<ResultsGrid />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/scale" element={<Scale />} />
            <Route path="/services" element={<Scale />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </ErrorBoundary>
    </>
  );
}

export default App;
