import React, { useState, useEffect } from 'react';
import { NebulaBackground } from '@/components/ui/NebulaBackground';
import { Hero } from '@/components/layout/Hero';
import { SEO } from '../components/SEO';
import { CaseStudyGrid } from '../components/CaseStudyGrid';
import { motion, useSpring, useTransform } from 'framer-motion';

// Helper for smooth number counting
function NumberCounter({ value, currency = false }: { value: number; currency?: boolean }) {
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => {
    if (currency) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.round(current));
    }
    return Math.round(current).toLocaleString();
  });

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
}

export const Home = () => {
  // ROI Calculator State
  const [spend, setSpend] = useState<number | ''>(10000);
  const [hours, setHours] = useState<number | ''>(10);
  const [rate, setRate] = useState<number | ''>(100);

  const totalUpside = ((Number(hours) || 0) * (Number(rate) || 0) * 52) + ((Number(spend) || 0) * 0.2 * 12);
  const annualROI = Number(spend) > 0 ? (totalUpside / ((Number(spend) || 0) * 12)) * 100 : 0;
  const progressPercent = Math.min((totalUpside / 100000) * 100, 100);



  return (
    <>
      <SEO
        title="Agha Sultan Naseer | Meta & Google Ads Strategist"
        description="Lahore-based media buyer turning ad spend into profit with 7‑figure Meta & Google Ads budgets across the USA, UK & Europe."
        canonical="https://aghasultan.com/"
        image="/img/riffat-labs-transparent.svg"
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Agha Sultan Naseer",
          "url": "https://aghasultan.com",
          "logo": "https://aghasultan.com/img/riffat-labs-transparent.svg",
          "sameAs": [
            "https://www.linkedin.com/in/aghasultan",
            "https://twitter.com/aghasultan"
          ]
        }}
      />

      {/* Hero Section */}
      <NebulaBackground />
      <Hero />

      {/* Logo Bar */}
      <section className="py-12 border-y border-white/5 bg-zinc-900/50 backdrop-blur-sm" aria-label="Client logos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
              Brands &amp; Operators I’ve Helped
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <img src="/img/clients/epic-resource-group.svg" alt="Epic Resource Group" className="h-8 md:h-10 w-auto brightness-0 invert" loading="lazy" />
            <img src="/img/clients/gameday-mens-health.svg" alt="Gameday Men’s Health" className="h-8 md:h-10 w-auto brightness-0 invert" loading="lazy" />
            <img src="/img/clients/man-with-a-pram.svg" alt="Man With A Pram" className="h-8 md:h-10 w-auto brightness-0 invert" loading="lazy" />
            <img src="/img/clients/title-vertical.svg" alt="Wedding Realm" className="h-8 md:h-10 w-auto brightness-0 invert" loading="lazy" />
            <img src="/img/clients/peres-siding.svg" alt="Peres Siding" className="h-8 md:h-10 w-auto brightness-0 invert" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 relative" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-emerald-500 font-mono text-sm tracking-wider uppercase mb-3">02 Services</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">How We Scale Growth</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Service 1 */}
            <div className="group relative rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-md p-8 transition-all duration-300 hover:bg-zinc-800/80 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10">
              <div className="text-emerald-500 font-mono text-sm mb-6 opacity-60 group-hover:opacity-100 transition-opacity">01</div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-emerald-400 transition-colors">Performance Paid Media</h3>
              <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                Meta, Google, and TikTok ads managed with algorithmic precision. We focus on contribution margin, not just ROAS.
              </p>
            </div>

            {/* Service 2 */}
            <div className="group relative rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-md p-8 transition-all duration-300 hover:bg-zinc-800/80 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10">
              <div className="text-emerald-500 font-mono text-sm mb-6 opacity-60 group-hover:opacity-100 transition-opacity">02</div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">Analytics Engineering</h3>
              <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                Server-side tracking (CAPI), attribution modeling, and custom dashboards. Know exactly where every dollar goes.
              </p>
            </div>

            {/* Service 3 */}
            <div className="group relative rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-md p-8 transition-all duration-300 hover:bg-zinc-800/80 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10">
              <div className="text-emerald-500 font-mono text-sm mb-6 opacity-60 group-hover:opacity-100 transition-opacity">03</div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-purple-400 transition-colors">Marketing Automation</h3>
              <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                Email & SMS flows that print money while you sleep. Lifecycle marketing designed to maximize LTV.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-24 bg-zinc-900/30 border-y border-white/5" id="skills" aria-labelledby="skills-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 id="skills-title" className="text-emerald-500 font-mono text-sm tracking-wider uppercase mb-3">
              03 Systematic Authority
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">The Results Engine</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Item 1: Span 2 */}
            <div className="md:col-span-2 rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-md p-8 flex flex-col justify-between hover:border-white/10 transition-colors">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Paid Media Profit</h3>
                <p className="text-zinc-400 max-w-lg leading-relaxed mb-8">
                  We don't just run ads; we build full-funnel acquisition systems. From
                  creative strategy to server-side attribution, every component is
                  engineered for ROI.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Strategy', 'Creative', 'Analytics'].map((badge) => (
                  <span key={badge} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-zinc-300">
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Bento Item 2: Managed Spend */}
            <div className="rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-md p-8 flex flex-col justify-center hover:border-white/10 transition-colors">
              <span className="block text-sm text-zinc-500 mb-2">Managed Spend</span>
              <span className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
                $5M+
              </span>
              <span className="block text-xs text-zinc-500 mt-2">Annual Budget Under Management</span>
            </div>

            {/* Bento Item 3: Platforms */}
            <div className="rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-md p-8 hover:border-white/10 transition-colors">
              <h3 className="text-xl font-bold text-white mb-6">Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {['Meta Ads', 'Google Ads', 'TikTok', 'LinkedIn'].map((platform) => (
                  <span key={platform} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-zinc-300">
                    {platform}
                  </span>
                ))}
              </div>
            </div>

            {/* Bento Item 4: Tracking (Span 2) */}
            <div className="md:col-span-2 rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-md p-8 hover:border-white/10 transition-colors">
              <h3 className="text-xl font-bold text-white mb-6">Tracking Architecture</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {['Google Tag Manager', 'GA4 Server-Side', 'Meta CAPI', 'Offline Events'].map((tech) => (
                  <div key={tech} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-xs">
                      ✓
                    </div>
                    <span className="text-zinc-300 text-sm">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <CaseStudyGrid />

      {/* ROI Calculator */}
      <section className="py-24 relative" id="roi-calculator">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-emerald-500 font-mono text-sm tracking-wider uppercase mb-3">05 Value Engineering</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">Estimate Your Upside</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="md:col-span-2 p-8 rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-md">
              <div className="flex items-start justify-between gap-4 mb-8">
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Plug your numbers</h4>
                  <p className="text-zinc-400 max-w-2xl text-sm leading-relaxed">
                    Live calculator that blends time saved with media efficiency. The progress bar on the right fills as you uncover more upside (capped at $100k).
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">Live</span>
              </div>

              <form className="grid sm:grid-cols-2 gap-6" onSubmit={e => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Monthly Ad Spend ($)</label>
                  <input
                    type="number"
                    placeholder="10000"
                    value={spend}
                    onChange={(e) => setSpend(e.target.value === '' ? '' : Math.max(0, parseFloat(e.target.value)))}
                    className="w-full rounded-md border border-white/10 bg-zinc-800 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Hours Managing Ads (Per Week)</label>
                  <input
                    type="number"
                    placeholder="10"
                    value={hours}
                    onChange={(e) => setHours(e.target.value === '' ? '' : Math.max(0, parseFloat(e.target.value)))}
                    className="w-full rounded-md border border-white/10 bg-zinc-800 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium text-zinc-300">Your Hourly Rate ($)</label>
                  <input
                    type="number"
                    placeholder="100"
                    value={rate}
                    onChange={(e) => setRate(e.target.value === '' ? '' : Math.max(0, parseFloat(e.target.value)))}
                    className="w-full rounded-md border border-white/10 bg-zinc-800 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                  />
                </div>
              </form>

              <div className="mt-6 text-zinc-500 text-xs italic">
                *Calculates efficiency gains + time saved vs hiring an agency.
              </div>
            </div>

            {/* ROI Result Card with gamified progress */}
            <div className="md:col-span-2 relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-zinc-900/80 backdrop-blur-md p-8">
              <div
                className="absolute bottom-0 left-0 h-1 bg-emerald-500 transition-all duration-1000 ease-out"
                style={{ width: `${progressPercent}%`, opacity: 0.5 }}
              />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h3 className="text-lg font-bold text-emerald-500 mb-2">Projected Annual Value</h3>
                  <p className="text-sm text-zinc-400 max-w-sm">
                    Progress fills while you type. We cap the visual at $100k to keep expectations grounded.
                  </p>
                </div>

                <div className="text-right">
                  <div data-testid="roi-result" className="text-4xl md:text-6xl font-extrabold text-white mb-2 transition-all">
                    <NumberCounter value={totalUpside} currency />
                  </div>
                  <div className="flex gap-6 justify-end">
                    <div>
                      <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Implied ROI</div>
                      <div className="text-lg font-mono font-semibold text-white">{annualROI.toFixed(0)}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Progress to $100k</div>
                      <div className="text-lg font-mono font-semibold text-white">{progressPercent.toFixed(0)}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 border-t border-white/5 bg-zinc-900/30" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-emerald-500 font-mono text-sm tracking-wider uppercase mb-3">05 About</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">Who We Are</h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-zinc-400 mb-8 text-lg leading-relaxed">
                We are a team of data scientists, engineers, and marketers obsessed with growth.
                We don't just run ads; we build systems that scale.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="p-6 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-white mb-2">$50M+</div>
                  <div className="text-sm text-zinc-500">Ad Spend Managed</div>
                </div>
                <div className="p-6 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-white mb-2">10x</div>
                  <div className="text-sm text-zinc-500">Average ROI</div>
                </div>
              </div>
            </div>
            <div className="relative">
              {/* TODO: Add about image */}
              <div className="aspect-video bg-zinc-800 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden">
                <div className="text-zinc-600 font-mono text-sm">About Image Placeholder</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
