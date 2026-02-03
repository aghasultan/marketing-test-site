import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/seo/Head';

const SCALE_CONTENT = {
  hero: {
    title: "I Turn Ad Spend into Profit for Brands Ready to Scale",
    description: (
      <>
        7-figure Meta &amp; Google Ads budgets managed across the USA, UK
        &amp; Europe. From water-slide rentals to med-spas, I build
        conversion systems that combine creative, tracking, and CRO for
        predictable growth.
      </>
    ),
    badge: (
      <>
        Best for <strong className="text-zinc-200">founders doing $10k–$100k/mo</strong> who want paid ads to become
        a second sales channel, not a gamble.
      </>
    )
  },
  problem: {
    title: "Scaling is Tough When the Fundamentals Are Fractured",
    items: [
      'CPMs climb, CPCs spike, and acquisition costs balloon without disciplined structure.',
      'Post iOS14 tracking gaps make it impossible to trust the data your team reports.',
      'Agencies optimise for surface-level metrics, not revenue accountability.',
      "Creative fatigue sets in because there's no iterative testing cadence.",
      'Dashboards overwhelm instead of guiding decisive action.'
    ]
  },
  results: {
    title: "Clarity on the upside before we start",
    description: "Every engagement begins with benchmarks so you know exactly what success looks like in the first 90 days.",
    items: [
      { label: "30–50 Qualified Leads", desc: "Typical volume we unlock in the first 90 days with the right offer + funnels." },
      { label: "20–40% CPL Reduction", desc: "Comes from fixing tracking, rebuilding creative, and tightening audience signals." }
    ]
  },
  framework: {
    title: "The Framework Behind Sustainable Growth",
    steps: [
      { title: 'Deep Research & Offer Positioning', desc: 'competitor mapping, audience mining, and offer refinement.' },
      { title: 'Tracking & Attribution Setup', desc: 'GA4, GTM, CAPI, offline conversions, and QA.' },
      { title: 'Campaign Architecture', desc: 'CBO/ABO mix, keyword segmentation, and budgets engineered for rapid learnings.' },
      { title: 'Creative Testing Engine', desc: 'briefs, hooks, and angles to constantly surface new winners.' },
      { title: 'Scale & Stabilise', desc: 'budget ramping, bid strategies, and offer sequencing.' },
      { title: 'Reporting & CRO Loops', desc: 'live dashboards and funnel feedback.' }
    ]
  },
  howItWorks: {
    title: "A clear, accountable path from audit to scale",
    steps: [
      { title: 'Audit', desc: 'deep-dive on offers, tracking, creative, and historical data.' },
      { title: 'Plan', desc: 'a 90-day roadmap with budget pacing, test cadence, and reporting check-points.' },
      { title: 'Launch', desc: 'rebuild campaigns with clean measurement and fresh angles.' },
      { title: 'Optimise', desc: 'weekly creative swaps, bid refinements, and CRO loops.' },
      { title: 'Scale', desc: 'deliberate budget ramps and audience expansion.' }
    ]
  },
  caseStudies: {
    title: "Proof the System Works",
    items: [
      { stat: "18.1% CTR", desc: "Google Ads for regional water-slide rentals with full-funnel tracking cleanup." },
      { stat: "15% Lift", desc: "Traffic & conversions for dental and med-spa clients within 60 days." },
      { stat: "37k Views", desc: "A$1.08 CPC delivering 37k landing-page visits on A$2.3k ad spend." }
    ]
  },
  valueMath: {
    title: "What Would 30 Qualified Opportunities in 90 Days Mean?",
    benefits: ['More predictable pipeline and sales follow-up.', 'Cleaner reporting that connects spend to revenue.', 'Higher LTV thanks to better segmentation and nurture.'],
    revenueText: (
      <>
        Close 20–30% of 30 qualified opportunities at a $1.5k–$3k AOV
        and you're looking at <strong className="text-emerald-400">$9k–$27k in new revenue</strong> within a
        quarter. That's before referrals and retention.
      </>
    )
  },
  services: {
    title: "What's Included When We Partner",
    items: [
      'Meta Ads management & scaling strategies across CBO/ABO structures.',
      'Google Search, Display & Performance Max campaign execution.',
      'Conversion tracking setup via Pixel, CAPI, GTM, GA4, and offline events.',
      'Funnel & CRM automations in GoHighLevel and supporting platforms.',
      'Weekly reporting, dashboards, and conversion rate optimisation guidance.'
    ]
  },
  partners: {
    title: "Designed for Ambitious Founders & Marketing Leads",
    items: [
      'Ecommerce, local services, and info products with proven offers.',
      'Teams investing at least $2k/month in paid ads and ready to scale higher.',
      'Operators who value transparency, collaboration, and speed to implement.',
      'Brands seeking a proactive strategist — not another order taker.'
    ]
  },
  guarantee: {
    title: "Simple, No-Fluff Guarantee",
    items: [
      "Clear expectations before launch — you'll always know what we're testing and why.",
      "Weekly check-ins with transparent reporting so you see exactly how budgets perform.",
      "If I'm not the right fit, you'll hear it upfront with zero pressure or hype."
    ]
  },
  cta: {
    title: "Ready to Scale Profitably?",
    description: "Let's build the roadmap that turns your ad spend into compounding revenue.",
    button: "Apply for Strategy Call",
    note: "Most calls end with a clear 90-day plan, even if we don't work together."
  }
};

export const Scale = () => {
  return (
    <>
      <SEO
        title="Meta & Google Ads Growth Partner | Riffat Labs"
        description="Partner with Riffat Labs to architect full-funnel Meta & Google Ads systems that turn ad spend into profit."
        canonical="https://riffatlabs.com/scale"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Performance Paid Media",
          "provider": {
            "@type": "Organization",
            "name": "Riffat Labs",
            "url": "https://riffatlabs.com"
          },
          "areaServed": ["US", "UK", "Europe"],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Growth Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Meta Ads Management"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Google Ads Management"
                }
              }
            ]
          }
        }}
      />

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-32 px-4 sm:px-6 lg:px-8" id="hero" aria-labelledby="scale-hero-title">
        {/* Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30 animate-pulse" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <h1 id="scale-hero-title" className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            {SCALE_CONTENT.hero.title}
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {SCALE_CONTENT.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/apply" className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium bg-white text-zinc-950 hover:bg-zinc-200 transition-colors">
              Apply for Strategy Call
            </Link>
            <a href="#case-studies" className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors backdrop-blur-sm">
              View Case Studies
            </a>
          </div>

          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mt-8">
            <span aria-hidden="true" className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500 text-xs font-bold">✓</span>
            <p className="text-sm text-zinc-400 m-0">
              {SCALE_CONTENT.hero.badge}
            </p>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="py-8 border-y border-white/5 bg-zinc-900/50 backdrop-blur-sm" aria-label="Platform certifications">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex flex-wrap justify-center gap-4 list-none p-0 m-0">
            {['Meta Partner', 'Google Ads Certified', 'HubSpot Solutions', 'Shopify Plus'].map((cert) => (
              <li key={cert} className="px-6 py-3 rounded-full bg-zinc-900/50 border border-white/10 text-sm font-semibold text-zinc-400">
                {cert}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-24 relative" aria-labelledby="problem-title">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-md p-8 md:p-12 border-l-4 border-l-emerald-500">
            <h2 id="problem-title" className="text-emerald-500 font-mono text-sm tracking-wider uppercase mb-3">01 The Paid Media Problem</h2>
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-6">{SCALE_CONTENT.problem.title}</h3>
            <ul className="space-y-4">
              {SCALE_CONTENT.problem.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-zinc-400">
                  <span className="text-red-500/80 mt-1.5 text-xs">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* EXPECTED RESULTS */}
      <section className="py-24 bg-zinc-900/30 border-y border-white/5" id="expected-results" aria-labelledby="expected-results-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 id="expected-results-title" className="text-emerald-500 font-mono text-sm tracking-wider uppercase">02 What Results You Can Expect</h2>
            <h3 className="text-3xl font-bold text-white">{SCALE_CONTENT.results.title}</h3>
            <p className="text-zinc-400 text-lg">
              {SCALE_CONTENT.results.description}
            </p>
            <ul className="space-y-6 mt-6">
              {SCALE_CONTENT.results.items.map((item, i) => (
                <li key={i}>
                  <strong className="block text-white text-lg">{item.label}</strong>
                  <span className="text-zinc-500">{item.desc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mini Case Card */}
          <div className="rounded-2xl border border-white/10 bg-zinc-900/80 backdrop-blur-md p-8 shadow-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
            <div className="absolute -inset-1 bg-emerald-500/5 blur opacity-0 group-hover:opacity-100 transition-opacity" />

            <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4 block">Med-Spa Lead Gen</span>
            <h4 className="text-xl font-bold text-white mb-8">Booked Appointments</h4>

            <div className="mt-auto">
              <span className="text-4xl font-extrabold text-emerald-500 block mb-2">$22 CPL</span>
              <p className="text-sm text-zinc-500 m-0">
                Reduced from $65 within 4 weeks of full-funnel restructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FRAMEWORK */}
      <section className="py-24 relative" aria-labelledby="framework-title">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="framework-title" className="text-emerald-500 font-mono text-sm tracking-wider uppercase mb-3">03 Profit Scaling System™</h2>
            <h3 className="text-3xl font-bold text-white">{SCALE_CONTENT.framework.title}</h3>
          </div>

          <div className="space-y-4">
            {SCALE_CONTENT.framework.steps.map((step, i) => (
              <div key={i} className="flex gap-6 p-6 rounded-xl border border-white/5 bg-zinc-900/30 backdrop-blur-sm hover:bg-zinc-900/50 transition-colors group">
                <span className="text-emerald-500 font-mono text-xl font-bold opacity-60 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                <div>
                  <strong className="block text-white text-lg mb-1">{step.title}</strong>
                  <p className="text-zinc-400 m-0">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-zinc-900/30 border-y border-white/5" id="how-it-works" aria-labelledby="how-it-works-title">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="how-it-works-title" className="text-emerald-500 font-mono text-sm tracking-wider uppercase mb-3">04 How Working Together Works</h2>
            <h3 className="text-3xl font-bold text-white">{SCALE_CONTENT.howItWorks.title}</h3>
          </div>

          <div className="relative">
            <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-white/10" />
            <div className="space-y-12">
              {SCALE_CONTENT.howItWorks.steps.map((step, i) => (
                <div key={i} className="relative pl-16">
                  <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-zinc-900 border border-emerald-500/30 text-emerald-500 flex items-center justify-center font-bold z-10 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    {i + 1}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-zinc-400 text-lg">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="py-24 relative" id="case-studies" aria-labelledby="case-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="case-title" className="text-emerald-500 font-mono text-sm tracking-wider uppercase mb-3">05 Case Studies &amp; Wins</h2>
            <h3 className="text-3xl font-bold text-white">{SCALE_CONTENT.caseStudies.title}</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SCALE_CONTENT.caseStudies.items.map((study, i) => (
              <div key={i} className="p-8 rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-md hover:border-emerald-500/20 transition-colors">
                <strong className="block text-4xl font-bold text-white mb-2">{study.stat}</strong>
                <span className="text-zinc-400 leading-relaxed">{study.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE MATH */}
      <section className="py-24 bg-zinc-900/30 border-y border-white/5" id="value-math" aria-labelledby="value-math-title">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="value-math-title" className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">{SCALE_CONTENT.valueMath.title}</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-zinc-900/50 backdrop-blur-md p-8 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold text-white mb-4">More than just cheaper leads</h3>
              <ul className="space-y-3">
                {SCALE_CONTENT.valueMath.benefits.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-400">
                    <span className="text-emerald-500 mt-1.5 text-xs">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-emerald-900/20 to-zinc-900/50 backdrop-blur-md p-8 rounded-2xl border border-emerald-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Simple revenue math</h3>
              <p className="text-zinc-300 leading-relaxed text-lg">
                {SCALE_CONTENT.valueMath.revenueText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 relative" aria-labelledby="services-title">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="services-title" className="text-emerald-500 font-mono text-sm tracking-wider uppercase mb-3">06 Services</h2>
            <h3 className="text-3xl font-bold text-white">{SCALE_CONTENT.services.title}</h3>
          </div>

          <ul className="grid md:grid-cols-2 gap-4">
            {SCALE_CONTENT.services.items.map((item, i) => (
              <li key={i} className={`p-6 rounded-xl border border-white/5 bg-zinc-900/30 backdrop-blur-sm flex items-start gap-3 ${i === 4 ? 'md:col-span-2' : ''}`}>
                <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                <span className="text-zinc-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHO YOU WORK WITH */}
      <section className="py-24 bg-zinc-900/30 border-y border-white/5" aria-labelledby="fit-clients-title">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="fit-clients-title" className="text-emerald-500 font-mono text-sm tracking-wider uppercase mb-3">07 Who I Partner With</h2>
            <h3 className="text-3xl font-bold text-white">{SCALE_CONTENT.partners.title}</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {SCALE_CONTENT.partners.items.map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-white font-bold shrink-0">
                  {i + 1}
                </div>
                <p className="text-zinc-400 text-lg m-0 pt-2">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="py-24 relative" id="guarantee" aria-labelledby="guarantee-title">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-3xl p-1 border border-white/10 shadow-2xl">
            <div className="bg-zinc-950/80 backdrop-blur-md rounded-[20px] p-8 md:p-12 text-center">
              <h2 id="guarantee-title" className="text-2xl md:text-3xl font-bold text-white mb-8">{SCALE_CONTENT.guarantee.title}</h2>
              <ul className="space-y-4 text-left mx-auto max-w-lg">
                {SCALE_CONTENT.guarantee.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-300">
                    <span className="text-emerald-500 mt-1">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-32 relative overflow-hidden" aria-labelledby="cta-title">
        <div className="absolute inset-0 bg-emerald-900/10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="cta-title" className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
            {SCALE_CONTENT.cta.title}
          </h2>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            {SCALE_CONTENT.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/apply" className="inline-flex items-center justify-center px-8 py-4 rounded-full text-lg font-bold bg-white text-zinc-950 hover:bg-zinc-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transform hover:-translate-y-1">
              {SCALE_CONTENT.cta.button}
            </Link>
          </div>
          <p className="mt-6 text-sm text-zinc-500">
            {SCALE_CONTENT.cta.note}
          </p>
        </div>
      </section>
    </>
  );
};
