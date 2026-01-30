import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CaseStudyGrid } from '../components/CaseStudyGrid';
import { motion } from 'framer-motion';

export const Home = () => {
  // ROI Calculator State
  const [spend, setSpend] = useState<number | ''>(10000);
  const [hours, setHours] = useState<number | ''>(10);
  const [rate, setRate] = useState<number | ''>(100);

  const totalUpside = ((Number(hours) || 0) * (Number(rate) || 0) * 52) + ((Number(spend) || 0) * 0.2 * 12);
  const annualROI = Number(spend) > 0 ? (totalUpside / ((Number(spend) || 0) * 12)) * 100 : 0;
  const progressPercent = Math.min((totalUpside / 100000) * 100, 100);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <>
      <SEO
        title="Agha Sultan Naseer | Meta & Google Ads Strategist"
        description="Lahore-based media buyer turning ad spend into profit with 7‑figure Meta & Google Ads budgets across the USA, UK & Europe."
        canonical="https://aghasultan.com/"
        image="/img/riffat-labs-transparent.svg"
      />

      {/* Hero Section */}
      <section className="hero-section" id="hero" aria-labelledby="hero-title">
        <motion.div
          className="hero-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="hero-text-col">
            <motion.span className="section-label" variants={itemVariants}>
              01 Performance Paid Media
            </motion.span>
            <motion.h1 id="hero-title" variants={itemVariants}>
              We Turn Paid Ads Into Profit Engines.
            </motion.h1>
            <motion.p variants={itemVariants}>
              I’m <strong>Agha Sultan Naseer</strong> — helping brands across the USA,
              UK &amp; Europe turn <strong>7‑figure ad budgets</strong> into
              predictable revenue.
            </motion.p>
            <motion.div className="hero-cta" variants={itemVariants}>
              <Link to="/services" className="btn btn-primary hover-glow">
                Explore Services
              </Link>
              <Link to="/apply" className="btn hover-glow">
                Book a Strategy Call
              </Link>
            </motion.div>
            <motion.div className="fit-strip" variants={itemVariants}>
              <h4>Good fit if you:</h4>
              <ul className="fit-list">
                <li className="fit-item">Already running ads &amp; want tighter tracking</li>
                <li className="fit-item">Have proven offers &amp; want scale</li>
                <li className="fit-item">Want clear dashboards &amp; reporting</li>
              </ul>
            </motion.div>
          </div>
          <motion.div className="hero-visual-col" variants={itemVariants}>
            <div className="snapshot-card">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center text-xl">
                  🚀
                </div>
                <div>
                  <strong className="block leading-tight">Performance Snapshot</strong>
                  <span className="text-[0.8rem] text-slate-400">Avg. Client Metrics</span>
                </div>
              </div>
              <div className="snapshot-row">
                <span className="snapshot-label">Managed Spend</span>
                <span className="snapshot-val">$5M+ / yr</span>
              </div>
              <div className="snapshot-row">
                <span className="snapshot-label">Avg. ROAS</span>
                <span className="snapshot-val">3.5x – 5.0x</span>
              </div>
              <div className="snapshot-row">
                <span className="snapshot-label">Tracking</span>
                <span className="snapshot-val">Server-Side (CAPI)</span>
              </div>
              <div className="snapshot-row">
                <span className="snapshot-label">Retention</span>
                <span className="snapshot-val">90% +</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Logo Bar */}
      <section className="logo-bar reveal visible pb-0" aria-label="Client logos">
        <div className="text-center mb-5">
          <p className="text-[0.9rem] text-slate-400 uppercase tracking-widest font-bold">
            Brands &amp; Operators I’ve Helped
          </p>
        </div>
        <ul className="logo-list" role="list">
          <li className="logo-card">
            <img className="logo-inverted" src="/img/clients/epic-resource-group.svg" alt="Epic Resource Group" width="160" height="60" loading="lazy" />
          </li>
          <li className="logo-card">
            <img src="/img/clients/gameday-mens-health.svg" alt="Gameday Men’s Health" width="160" height="60" loading="lazy" />
          </li>
          <li className="logo-card">
            <img className="logo-inverted" src="/img/clients/man-with-a-pram.svg" alt="Man With A Pram" width="160" height="60" loading="lazy" />
          </li>
          <li className="logo-card">
            <img src="/img/clients/title-vertical.svg" alt="Wedding Realm" width="160" height="60" loading="lazy" />
          </li>
          <li className="logo-card">
            <img className="logo-inverted" src="/img/clients/peres-siding.svg" alt="Peres Siding" width="160" height="60" loading="lazy" />
          </li>
        </ul>
      </section>

      {/* Services Section */}
      <section className="section shell reveal visible" id="services">
        <div className="section-header">
          <h2 className="section-eyebrow"><span>02</span>Services</h2>
          <h3>How We Scale Growth</h3>
        </div>
        <div className="card-grid">
          {/* Service 1 */}
          <div className="card hover-card group">
            <div className="text-emerald-500 font-mono text-sm mb-4">01</div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-emerald-400 transition-colors">Performance Paid Media</h3>
            <p className="text-slate-400 leading-relaxed">
              Meta, Google, and TikTok ads managed with algorithmic precision. We focus on contribution margin, not just ROAS.
            </p>
          </div>

          {/* Service 2 */}
          <div className="card hover-card group">
            <div className="text-emerald-500 font-mono text-sm mb-4">02</div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-emerald-400 transition-colors">Analytics Engineering</h3>
            <p className="text-slate-400 leading-relaxed">
              Server-side tracking (CAPI), attribution modeling, and custom dashboards. Know exactly where every dollar goes.
            </p>
          </div>

          {/* Service 3 */}
          <div className="card hover-card group">
            <div className="text-emerald-500 font-mono text-sm mb-4">03</div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-emerald-400 transition-colors">Marketing Automation</h3>
            <p className="text-slate-400 leading-relaxed">
              Email & SMS flows that print money while you sleep. Lifecycle marketing designed to maximize LTV.
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="section shell reveal visible" id="skills" aria-labelledby="skills-title">
        <div className="section-header">
          <h2 id="skills-title" className="section-eyebrow">
            <span>03</span>Systematic Authority
          </h2>
          <h3>The Results Engine</h3>
        </div>
        <div className="bento-grid reveal-stagger">
          <div className="bento-item bento-span-2">
            <div>
              <h3 className="bento-title">Paid Media Profit</h3>
              <p className="text-slate-400 max-w-[450px]">
                We don't just run ads; we build full-funnel acquisition systems. From
                creative strategy to server-side attribution, every component is
                engineered for ROI.
              </p>
            </div>
            <div className="bento-badges">
              <span className="badge">Strategy</span>
              <span className="badge">Creative</span>
              <span className="badge">Analytics</span>
            </div>
          </div>
          <div className="bento-item">
            <span className="block text-[0.9rem] text-slate-400 mb-1">Managed Spend</span>
            <span className="text-[2.5rem] font-bold">
              $5M+
            </span>
            <span className="block text-[0.8rem] text-slate-400 mt-1">Annual Budget Under Management</span>
          </div>
          <div className="bento-item">
            <h3 className="bento-title">Platforms</h3>
            <div className="bento-badges mt-4">
              <span className="badge">Meta Ads</span>
              <span className="badge">Google Ads</span>
              <span className="badge">TikTok</span>
              <span className="badge">LinkedIn</span>
            </div>
          </div>
          <div className="bento-item bento-span-2">
            <h3 className="bento-title">Tracking Architecture</h3>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="flex items-center gap-2">
                <span className="text-emerald-500">✓</span>
                <span>Google Tag Manager</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500">✓</span>
                <span>GA4 Server-Side</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500">✓</span> <span>Meta CAPI</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500">✓</span>
                <span>Offline Events</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <CaseStudyGrid />

      {/* ROI Calculator */}
      <section className="section shell reveal visible" id="roi-calculator">
        <div className="section-header">
          <h2 className="section-eyebrow"><span>05</span>Value Engineering</h2>
          <h3>Estimate Your Upside</h3>
        </div>

        <div className="bento-grid">
          <div className="bento-item bento-span-2">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h4 className="bento-title">Plug your numbers</h4>
                <p className="text-slate-400 max-w-2xl">
                  Live calculator that blends time saved with media efficiency. The progress bar on the right fills as you uncover more upside (capped at $100k).
                </p>
              </div>
              <span className="badge bg-emerald-500/10 text-emerald-500">Live</span>
            </div>
            <form className="contact-form grid grid-cols-2 gap-5" onSubmit={e => e.preventDefault()}>
              <div className="form-group">
                <label>Monthly Ad Spend ($)</label>
                <input
                  type="number"
                  placeholder="10000"
                  value={spend}
                  onChange={(e) => setSpend(e.target.value === '' ? '' : parseFloat(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label>Hours Managing Ads (Per Week)</label>
                <input
                  type="number"
                  placeholder="10"
                  value={hours}
                  onChange={(e) => setHours(e.target.value === '' ? '' : parseFloat(e.target.value))}
                />
              </div>
              <div className="form-group wide">
                <label>Your Hourly Rate ($)</label>
                <input
                  type="number"
                  placeholder="100"
                  value={rate}
                  onChange={(e) => setRate(e.target.value === '' ? '' : parseFloat(e.target.value))}
                />
              </div>
            </form>
            <div className="mt-5 text-slate-400 text-sm">
              *Calculates efficiency gains + time saved vs hiring an agency.
            </div>
          </div>

          {/* ROI Result Card with gamified progress */}
          <div className="bento-item relative overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--primary)' }}>
            <div
              className="absolute bottom-0 left-0 h-1 bg-emerald-500 transition-all duration-1000 ease-out"
              style={{ width: `${progressPercent}%`, opacity: 0.5 }}
            />
            <div className="relative z-10">
              <h3 className="bento-title text-emerald-500">Projected Annual Value</h3>
              <div className="text-4xl md:text-5xl font-extrabold text-white my-4 transition-all">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(totalUpside)}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-slate-400">Implied ROI</div>
                  <div className="text-xl font-semibold text-white">{annualROI.toFixed(0)}%</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">Progress to $100k</div>
                  <div className="text-xl font-semibold text-white">{progressPercent.toFixed(0)}%</div>
                </div>
              </div>
              <p className="mt-4 text-slate-400 text-sm">Progress fills while you type. We cap the visual at $100k to keep expectations grounded.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section shell reveal visible" id="about">
        <div className="section-header">
          <h2 className="section-eyebrow"><span>05</span>About</h2>
          <h3>Who We Are</h3>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-slate-400 mb-6 text-lg">
                We are a team of data scientists, engineers, and marketers obsessed with growth.
                We don't just run ads; we build systems that scale.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-white mb-2">$50M+</div>
                  <div className="text-sm text-slate-500">Ad Spend Managed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">10x</div>
                  <div className="text-sm text-slate-500">Average ROI</div>
                </div>
              </div>
            </div>
            <div className="relative">
              {/* TODO: Add about image */}
              <div className="aspect-video bg-slate-800 rounded-lg border border-slate-700 flex items-center justify-center">
                <span className="text-slate-500">About Image</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
