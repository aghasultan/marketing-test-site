import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export const Home = () => {
  // ROI Calculator State
  const [spend, setSpend] = useState<number | ''>(10000);
  const [hours, setHours] = useState<number | ''>(10);
  const [rate, setRate] = useState<number | ''>(100);

  const safeSpend = Number(spend) || 0;
  const safeHours = Number(hours) || 0;
  const safeRate = Number(rate) || 0;

  const annualLaborSavings = safeHours * safeRate * 52;
  const adWasteSavings = safeSpend * 0.2 * 12; // 20% efficiency
  const totalUpside = annualLaborSavings + adWasteSavings;
  const annualROI = safeSpend > 0 ? (totalUpside / (safeSpend * 12)) * 100 : 0;

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <>
      <SEO
        title="Agha Sultan Naseer | Meta & Google Ads Strategist"
        description="Lahore-based media buyer turning ad spend into profit with 7‑figure Meta & Google Ads budgets across the USA, UK & Europe."
        canonical="https://aghasultan.com/"
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
            <img className="logo-inverted" src="/img/clients/epic-resource-group.webp" alt="Epic Resource Group" width="160" height="60" loading="lazy" />
          </li>
          <li className="logo-card">
            <img src="/img/clients/gameday-mens-health.svg" alt="Gameday Men’s Health" width="160" height="60" loading="lazy" />
          </li>
          <li className="logo-card">
            <img className="logo-inverted" src="/img/clients/man-with-a-pram.avif" alt="Man With A Pram" width="160" height="60" loading="lazy" />
          </li>
          <li className="logo-card">
            <img src="/img/clients/title-vertical.svg" alt="Wedding Realm" width="160" height="60" loading="lazy" />
          </li>
          <li className="logo-card">
            <img className="logo-inverted" src="/img/clients/peres-siding.avif" alt="Peres Siding" width="160" height="60" loading="lazy" />
          </li>
        </ul>
      </section>

      {/* ROI Calculator */}
      <section className="section shell reveal visible" id="roi-calculator">
        <div className="section-header">
          <h2 className="section-eyebrow"><span>05</span>Value Engineering</h2>
          <h3>Estimate Your Upside</h3>
        </div>

        <div className="bento-grid">
          <div className="bento-item bento-span-2">
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

          <div className="bento-item" style={{ background: 'var(--surface)', borderColor: 'var(--primary)' }}>
            <div>
              <h3 className="bento-title" style={{ color: 'var(--primary)' }}>Projected Annual Value</h3>
              <div className="bento-value">{formatCurrency(totalUpside)}</div>
              <div style={{ marginTop: '10px', fontWeight: 700 }}>
                ROI: <span style={{ color: 'var(--success)' }}>{annualROI.toFixed(0)}%</span>
              </div>
            </div>
            <div className="bento-badges">
              <span className="badge" style={{ background: 'var(--primary-soft)', color: 'var(--primary)' }}>High Leverage</span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="section shell reveal visible" id="skills" aria-labelledby="skills-title">
        <div className="section-header">
          <h2 id="skills-title" className="section-eyebrow">
            <span>04</span>Systematic Authority
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
    </>
  );
};
