import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

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
      />

      {/* Hero Section */}
      <section className="hero-section" id="hero" aria-labelledby="hero-title">
        <div className="hero-grid fade-in">
          <div className="hero-text-col">
            <span className="section-label slide-up" style={{ '--a-delay': '50ms' } as React.CSSProperties}>
              01 Performance Paid Media
            </span>
            <h1 id="hero-title" className="slide-up" style={{ '--a-delay': '100ms' } as React.CSSProperties}>
              We Turn Paid Ads Into Profit Engines.
            </h1>
            <p className="slide-up" style={{ '--a-delay': '150ms' } as React.CSSProperties}>
              I’m <strong>Agha Sultan Naseer</strong> — helping brands across the USA,
              UK &amp; Europe turn <strong>7‑figure ad budgets</strong> into
              predictable revenue.
            </p>
            <div className="hero-cta slide-up" style={{ '--a-delay': '200ms' } as React.CSSProperties}>
              <Link to="/services" className="btn btn-primary hover-glow">
                Explore Services
              </Link>
              <Link to="/apply" className="btn hover-glow">
                Book a Strategy Call
              </Link>
            </div>
            <div className="fit-strip slide-up" style={{ '--a-delay': '300ms' } as React.CSSProperties}>
              <h4>Good fit if you:</h4>
              <ul className="fit-list">
                <li className="fit-item">Already running ads &amp; want tighter tracking</li>
                <li className="fit-item">Have proven offers &amp; want scale</li>
                <li className="fit-item">Want clear dashboards &amp; reporting</li>
              </ul>
            </div>
          </div>
          <div className="hero-visual-col slide-up" style={{ '--a-delay': '350ms' } as React.CSSProperties}>
            <div className="snapshot-card">
              <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '40px', height: '40px', background: 'var(--primary-soft)', borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '1.2rem' }}>🚀</span>
                </div>
                <div>
                  <strong style={{ display: 'block', lineHeight: 1.2 }}>Performance Snapshot</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Avg. Client Metrics</span>
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
          </div>
        </div>
      </section>

      {/* Logo Bar */}
      <section className="logo-bar reveal visible" aria-label="Client logos" style={{ paddingBottom: 0 }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <p style={{
            fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase',
            letterSpacing: '0.1em', fontWeight: 700
          }}>
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
              <p style={{ color: 'var(--text-muted)', maxWidth: '450px' }}>
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
            <span className="bento-label" style={{display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '4px'}}>Managed Spend</span>
            <span className="bento-value" style={{fontSize: '2.5rem'}}>$5M+</span>
            <span className="bento-sub" style={{display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px'}}>Annual Budget Under Management</span>
          </div>
          <div className="bento-item">
            <h3 className="bento-title">Platforms</h3>
            <div className="bento-badges" style={{ marginTop: '1rem' }}>
              <span className="badge">Meta Ads</span>
              <span className="badge">Google Ads</span>
              <span className="badge">TikTok</span>
              <span className="badge">LinkedIn</span>
            </div>
          </div>
          <div className="bento-item bento-span-2">
            <h3 className="bento-title">Tracking Architecture</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--primary)' }}>✓</span>
                <span>Google Tag Manager</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--primary)' }}>✓</span>
                <span>GA4 Server-Side</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--primary)' }}>✓</span> <span>Meta CAPI</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--primary)' }}>✓</span>
                <span>Offline Events</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="section shell reveal visible" id="roi-calculator">
        <div className="section-header">
          <h2 className="section-eyebrow"><span>04</span>Value Engineering</h2>
          <h3>Estimate Your Upside</h3>
        </div>

        <div className="bento-grid">
          <div className="bento-item bento-span-2">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h4 className="bento-title">Plug your numbers</h4>
                <p style={{ color: 'var(--text-muted)', maxWidth: '640px' }}>
                  Live calculator that blends time saved with media efficiency. The progress bar on the right fills as you uncover more upside (capped at $100k).
                </p>
              </div>
              <span className="badge" style={{ background: 'var(--primary-soft)', color: 'var(--primary)' }}>Live</span>
            </div>
            <form className="contact-form" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} onSubmit={e => e.preventDefault()}>
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
            <div style={{ marginTop: '20px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
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
