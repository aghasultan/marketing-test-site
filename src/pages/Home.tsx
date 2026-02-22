import React, { Suspense } from 'react';
import { NebulaBackground } from '@/components/ui/NebulaBackground';
import { Hero } from '@/components/layout/Hero';
import { SEO } from '@/components/seo/Head';

// Lazy load heavy sections below the fold
const ResultsSection = React.lazy(() => import('@/features/case-studies/components/ResultsSection').then(module => ({ default: module.ResultsSection })));
const MediaBuyingCalculator = React.lazy(() => import('@/features/results/components/MediaBuyingCalculator').then(module => ({ default: module.MediaBuyingCalculator })));

// Loading Skeleton
const SectionSkeleton = () => (
  <div className="w-full h-96 animate-pulse bg-zinc-100 dark:bg-white/5 rounded-2xl mx-auto max-w-7xl my-12" />
);

export const Home = () => {
  // ... existing render ...
  return (
    <>
      <SEO
        // ... props ... (keep existing)
        title="Meta & Google Ads Strategist"
        description="Lahore-based media buyer turning ad spend into profit with 7‑figure Meta & Google Ads budgets across the USA, UK & Europe."
        canonical="https://aghasultan.com/"
        image="/img/riffat-labs-transparent.svg"
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "RR Labs",
          "url": "https://riffatlabs.com",
          "logo": "https://riffatlabs.com/img/riffat-labs-transparent.svg",
          "sameAs": [
            "https://www.linkedin.com/company/riffatlabs",
            "https://twitter.com/riffatlabs"
          ]
        }}
      />

      {/* Hero Section - Critical (Eager) */}
      <NebulaBackground />
      <Hero />

      {/* Logo Bar - Critical (Eager) */}
      <section className="py-12 border-y border-zinc-200 dark:border-white/5 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm" aria-label="Client logos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
              Brands &amp; Operators I’ve Helped
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center opacity-75 dark:opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Logo 1: Wedding Realm */}
            <img src="/img/clients/new-logo-1.png" alt="Wedding Realm" width="160" height="60" className="h-12 md:h-14 w-auto brightness-0 dark:brightness-0 dark:invert transition-all" loading="lazy" />
            {/* Logo 2: Dignity Memorial */}
            <img src="/img/clients/new-logo-2.png" alt="Dignity Memorial" width="160" height="60" className="h-10 md:h-12 w-auto brightness-0 dark:brightness-0 dark:invert transition-all" loading="lazy" />
            {/* Logo 3: FPL */}
            <img src="/img/clients/new-logo-5.png" alt="FPL" width="140" height="50" className="h-12 md:h-16 w-auto brightness-0 dark:brightness-0 dark:invert transition-all" loading="lazy" />
            {/* Logo 4: Yellow House */}
            <img src="/img/clients/new-logo-4.png" alt="Real Estate" width="160" height="60" className="h-12 md:h-16 w-auto brightness-0 dark:brightness-0 dark:invert transition-all" loading="lazy" />
            {/* Logo 5: Blank/Other */}
            <img src="/img/clients/new-logo-3.png" alt="Client Partner" width="140" height="50" className="h-10 md:h-14 w-auto brightness-0 dark:brightness-0 dark:invert transition-all" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Services Section - Eager (High up) */}
      <section className="py-24 relative" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-emerald-600 dark:text-emerald-500 font-mono text-sm tracking-wider uppercase mb-3">02 Services</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">How We Scale Growth</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Service 1 */}
            <div className="group relative rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-zinc-900/70 backdrop-blur-md p-8 transition-all duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/90 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/10">
              <div className="text-emerald-600 dark:text-emerald-500 font-mono text-sm mb-6 opacity-100 group-hover:scale-105 transition-all">01</div>
              <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Performance Paid Media</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors">
                Meta, Google, and TikTok ads managed with algorithmic precision. We focus on contribution margin, not just ROAS.
              </p>
            </div>

            {/* Service 2 */}
            <div className="group relative rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-zinc-900/70 backdrop-blur-md p-8 transition-all duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/90 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/10">
              <div className="text-emerald-600 dark:text-emerald-500 font-mono text-sm mb-6 opacity-100 group-hover:scale-105 transition-all">02</div>
              <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Analytics Engineering</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors">
                Server-side tracking (CAPI), attribution modeling, and custom dashboards. Know exactly where every dollar goes.
              </p>
            </div>

            {/* Service 3 */}
            <div className="group relative rounded-2xl border border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-zinc-900/70 backdrop-blur-md p-8 transition-all duration-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/90 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10 dark:hover:shadow-purple-500/10">
              <div className="text-emerald-600 dark:text-emerald-500 font-mono text-sm mb-6 opacity-100 group-hover:scale-105 transition-all">03</div>
              <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Marketing Automation</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors">
                Email & SMS flows that print money while you sleep. Lifecycle marketing designed to maximize LTV.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Eager */}
      <section className="py-24 bg-zinc-50/50 dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-white/5" id="skills" aria-labelledby="skills-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 id="skills-title" className="text-emerald-600 dark:text-emerald-500 font-mono text-sm tracking-wider uppercase mb-3">
              03 Systematic Authority
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">The Results Engine</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* ... Bento Items (Keeping unchanged inline for speed, or could lazy load if heavy, but HTML is cheap) ... */}
            <div className="md:col-span-2 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/70 backdrop-blur-md p-8 flex flex-col justify-between hover:border-zinc-300 dark:hover:border-white/20 transition-colors shadow-sm dark:shadow-none">
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Paid Media Profit</h3>
                <p className="text-zinc-600 dark:text-zinc-400 max-w-lg leading-relaxed mb-8">
                  We don't just run ads; we build full-funnel acquisition systems. From
                  creative strategy to server-side attribution, every component is
                  engineered for ROI.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Strategy', 'Creative', 'Analytics'].map((badge) => (
                  <span key={badge} className="px-3 py-1 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-full text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900/50 backdrop-blur-md p-8 flex flex-col justify-center hover:border-zinc-300 dark:hover:border-white/10 transition-colors shadow-sm dark:shadow-none">
              <span className="block text-sm text-zinc-500 mb-2">Managed Spend</span>
              <span className="text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">
                $5M+
              </span>
              <span className="block text-xs text-zinc-500 mt-2">Annual Budget Under Management</span>
            </div>

            <div className="rounded-2xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900/50 backdrop-blur-md p-8 hover:border-zinc-300 dark:hover:border-white/10 transition-colors shadow-sm dark:shadow-none">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {['Meta Ads', 'Google Ads', 'TikTok', 'LinkedIn'].map((platform) => (
                  <span key={platform} className="px-3 py-1 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-full text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    {platform}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 rounded-2xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900/50 backdrop-blur-md p-8 hover:border-zinc-300 dark:hover:border-white/10 transition-colors shadow-sm dark:shadow-none">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">Tracking Architecture</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {['Google Tag Manager', 'GA4 Server-Side', 'Meta CAPI', 'Offline Events'].map((tech) => (
                  <div key={tech} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 text-xs">
                      ✓
                    </div>
                    <span className="text-zinc-700 dark:text-zinc-300 text-sm">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies - Delayed */}
      <Suspense fallback={<SectionSkeleton />}>
        <ResultsSection />
      </Suspense>

      {/* ROI Calculator - Delayed */}
      <section className="py-24 relative" id="roi-calculator">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-emerald-600 dark:text-emerald-500 font-mono text-sm tracking-wider uppercase mb-3">05 Value Engineering</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">Estimate Your Upside</h3>
          </div>
          <Suspense fallback={<SectionSkeleton />}>
            <MediaBuyingCalculator />
          </Suspense>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 border-t border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-900/30" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-emerald-600 dark:text-emerald-500 font-mono text-sm tracking-wider uppercase mb-3">05 About</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">Who We Are</h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-zinc-600 dark:text-zinc-300 mb-8 text-lg leading-relaxed">
                We are a team of data scientists, engineers, and marketers obsessed with growth.
                We don't just run ads; we build systems that scale.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="p-6 rounded-xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/5 backdrop-blur-sm shadow-sm dark:shadow-none">
                  <div className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">$50M+</div>
                  <div className="text-sm text-zinc-500">Ad Spend Managed</div>
                </div>
                <div className="p-6 rounded-xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/5 backdrop-blur-sm shadow-sm dark:shadow-none">
                  <div className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">10x</div>
                  <div className="text-sm text-zinc-500">Average ROI</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/10 flex items-center justify-center overflow-hidden">
                <div className="text-zinc-400 dark:text-zinc-500 font-mono text-sm">RR Labs Team</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
