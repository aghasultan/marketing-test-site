import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export const Scale = () => {
  return (
    <>
      <SEO
        title="Meta & Google Ads Growth Partner | Agha Sultan Naseer"
        description="Partner with Agha Sultan Naseer to architect full-funnel Meta & Google Ads systems that turn ad spend into profit."
        canonical="https://aghasultan.com/scale"
      />

      {/* HERO */}
      <section className="hero-section" id="hero" aria-labelledby="scale-hero-title">
        <div className="hero-content fade-in">
          <h1 id="scale-hero-title">
            I Turn Ad Spend into Profit for Brands Ready to Scale
          </h1>
          <p className="slide-up" style={{ '--a-delay': '120ms' } as React.CSSProperties}>
            7-figure Meta &amp; Google Ads budgets managed across the USA, UK
            &amp; Europe. From water-slide rentals to med-spas, I build
            conversion systems that combine creative, tracking, and CRO for
            predictable growth.
          </p>
          <div className="hero-cta fade-in" style={{ '--a-delay': '240ms' } as React.CSSProperties}>
            <Link to="/apply" className="btn btn-primary hover-glow">Apply for Strategy Call</Link>
            <a href="#case-studies" className="btn">View Case Studies</a>
          </div>
          <div className="qualify-strip fade-in" style={{ '--a-delay': '360ms' } as React.CSSProperties}>
            <span aria-hidden="true" className="qualify-icon">✓</span>
            <p>
              Best for founders doing $10k–$100k/mo who want paid ads to become
              a second sales channel, not a gamble.
            </p>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="logo-bar reveal visible" aria-label="Platform certifications">
        <ul className="logo-list" role="list">
          <li className="logo-chip" style={{padding: '12px 24px', background: 'var(--surface)', borderRadius: '99px', border: '1px solid var(--border)', fontWeight: 600}}>Meta Partner</li>
          <li className="logo-chip" style={{padding: '12px 24px', background: 'var(--surface)', borderRadius: '99px', border: '1px solid var(--border)', fontWeight: 600}}>Google Ads Certified</li>
          <li className="logo-chip" style={{padding: '12px 24px', background: 'var(--surface)', borderRadius: '99px', border: '1px solid var(--border)', fontWeight: 600}}>HubSpot Solutions</li>
          <li className="logo-chip" style={{padding: '12px 24px', background: 'var(--surface)', borderRadius: '99px', border: '1px solid var(--border)', fontWeight: 600}}>Shopify Plus</li>
        </ul>
      </section>

      {/* PROBLEM */}
      <section className="content-section reveal visible" aria-labelledby="problem-title">
        <div className="section-text">
          <h2 id="problem-title"><span>01</span>The Paid Media Problem</h2>
          <h3>Scaling is Tough When the Fundamentals Are Fractured</h3>
          <ul>
            <li>CPMs climb, CPCs spike, and acquisition costs balloon without disciplined structure.</li>
            <li>Post iOS14 tracking gaps make it impossible to trust the data your team reports.</li>
            <li>Agencies optimise for surface-level metrics, not revenue accountability.</li>
            <li>Creative fatigue sets in because there's no iterative testing cadence.</li>
            <li>Dashboards overwhelm instead of guiding decisive action.</li>
          </ul>
        </div>
      </section>

      {/* EXPECTED RESULTS */}
      <section className="content-section reveal visible" id="expected-results" aria-labelledby="expected-results-title">
        <div className="grid-shell">
          <div className="section-text">
            <h2 id="expected-results-title"><span>02</span>What Results You Can Expect</h2>
            <h3>Clarity on the upside before we start</h3>
            <p>
              Every engagement begins with benchmarks so you know exactly what
              success looks like in the first 90 days.
            </p>
            <ul className="stat-list">
              <li>
                <strong>30–50 Qualified Leads</strong>
                <span>Typical volume we unlock in the first 90 days with the right offer + funnels.</span>
              </li>
              <li>
                <strong>20–40% CPL Reduction</strong>
                <span>Comes from fixing tracking, rebuilding creative, and tightening audience signals.</span>
              </li>
            </ul>
          </div>
          {/* Mini Case Card */}
          <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Med-Spa Lead Gen</span>
            <h4 style={{ margin: '8px 0', fontSize: '1.1rem' }}>Booked Appointments</h4>
            <div style={{ marginTop: 'auto' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', display: 'block' }}>$22 CPL</span>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Reduced from $65 within 4 weeks of full-funnel restructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FRAMEWORK */}
      <section className="content-section reveal visible" aria-labelledby="framework-title">
        <div className="section-text">
          <h2 id="framework-title"><span>03</span>Profit Scaling System™</h2>
          <h3>The Framework Behind Sustainable Growth</h3>
          <ol className="numbered-list">
            <li><strong>Deep Research &amp; Offer Positioning</strong> – competitor mapping, audience mining, and offer refinement.</li>
            <li><strong>Tracking &amp; Attribution Setup</strong> – GA4, GTM, CAPI, offline conversions, and QA.</li>
            <li><strong>Campaign Architecture</strong> – CBO/ABO mix, keyword segmentation, and budgets engineered for rapid learnings.</li>
            <li><strong>Creative Testing Engine</strong> – briefs, hooks, and angles to constantly surface new winners.</li>
            <li><strong>Scale &amp; Stabilise</strong> – budget ramping, bid strategies, and offer sequencing.</li>
            <li><strong>Reporting &amp; CRO Loops</strong> – live dashboards and funnel feedback.</li>
          </ol>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="content-section reveal visible" id="how-it-works" aria-labelledby="how-it-works-title">
        <div className="section-text">
          <h2 id="how-it-works-title"><span>04</span>How Working Together Works</h2>
          <h3>A clear, accountable path from audit to scale</h3>
          <ol className="numbered-list">
            <li><strong>Audit</strong> – deep-dive on offers, tracking, creative, and historical data.</li>
            <li><strong>Plan</strong> – a 90-day roadmap with budget pacing, test cadence, and reporting check-points.</li>
            <li><strong>Launch</strong> – rebuild campaigns with clean measurement and fresh angles.</li>
            <li><strong>Optimise</strong> – weekly creative swaps, bid refinements, and CRO loops.</li>
            <li><strong>Scale</strong> – deliberate budget ramps and audience expansion.</li>
          </ol>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="content-section reveal visible" id="case-studies" aria-labelledby="case-title">
        <div className="section-text">
          <h2 id="case-title"><span>05</span>Case Studies &amp; Wins</h2>
          <h3>Proof the System Works</h3>
          <ul className="stat-list">
            <li>
              <strong>18.1% CTR</strong>
              <span>Google Ads for regional water-slide rentals with full-funnel tracking cleanup.</span>
            </li>
            <li>
              <strong>15% Lift</strong>
              <span>Traffic &amp; conversions for dental and med-spa clients within 60 days.</span>
            </li>
            <li>
              <strong>37k Views</strong>
              <span>A$1.08 CPC delivering 37k landing-page visits on A$2.3k ad spend.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* VALUE MATH */}
      <section className="content-section reveal value-math visible" id="value-math" aria-labelledby="value-math-title">
        <div className="section-text">
          <h2 id="value-math-title">What Would 30 Qualified Opportunities in 90 Days Mean?</h2>
          <div className="two-column">
            <div>
              <h3>More than just cheaper leads</h3>
              <ul>
                <li>More predictable pipeline and sales follow-up.</li>
                <li>Cleaner reporting that connects spend to revenue.</li>
                <li>Higher LTV thanks to better segmentation and nurture.</li>
              </ul>
            </div>
            <div>
              <h3>Simple revenue math</h3>
              <p>
                Close 20–30% of 30 qualified opportunities at a $1.5k–$3k AOV
                and you're looking at $9k–$27k in new revenue within a
                quarter. That's before referrals and retention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="content-section reveal visible" aria-labelledby="services-title">
        <div className="section-text">
          <h2 id="services-title"><span>06</span>Services</h2>
          <h3>What's Included When We Partner</h3>
          <ul>
            <li>Meta Ads management &amp; scaling strategies across CBO/ABO structures.</li>
            <li>Google Search, Display &amp; Performance Max campaign execution.</li>
            <li>Conversion tracking setup via Pixel, CAPI, GTM, GA4, and offline events.</li>
            <li>Funnel &amp; CRM automations in GoHighLevel and supporting platforms.</li>
            <li>Weekly reporting, dashboards, and conversion rate optimisation guidance.</li>
          </ul>
        </div>
      </section>

      {/* WHO YOU WORK WITH */}
      <section className="content-section reveal visible" aria-labelledby="fit-clients-title">
        <div className="section-text">
          <h2 id="fit-clients-title"><span>07</span>Who I Partner With</h2>
          <h3>Designed for Ambitious Founders &amp; Marketing Leads</h3>
          <ul>
            <li>Ecommerce, local services, and info products with proven offers.</li>
            <li>Teams investing at least $2k/month in paid ads and ready to scale higher.</li>
            <li>Operators who value transparency, collaboration, and speed to implement.</li>
            <li>Brands seeking a proactive strategist — not another order taker.</li>
          </ul>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="content-section reveal guarantee-band visible" id="guarantee" aria-labelledby="guarantee-title">
        <div className="section-text">
          <h2 id="guarantee-title">Simple, No-Fluff Guarantee</h2>
          <ul>
            <li>Clear expectations before launch — you'll always know what we're testing and why.</li>
            <li>Weekly check-ins with transparent reporting so you see exactly how budgets perform.</li>
            <li>If I'm not the right fit, you'll hear it upfront with zero pressure or hype.</li>
          </ul>
        </div>
      </section>

      {/* PRE-FOOTER CTA */}
      <section className="pre-footer-cta reveal visible" aria-labelledby="pre-footer-title">
        <div className="pre-footer-content">
          <h2 id="pre-footer-title">Ready to treat paid media like a profit center?</h2>
          <p>Scale your campaigns with a strategy built for ROI, not just vanity metrics.</p>
          <Link to="/apply" className="btn btn-primary hover-glow">Apply to Work With Agha</Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="contact-section reveal visible" aria-labelledby="cta-title">
        <h2 id="cta-title">Ready to Scale Profitably?</h2>
        <p>Let's build the roadmap that turns your ad spend into compounding revenue.</p>
        <Link to="/apply" className="btn btn-primary hover-glow">Apply for Strategy Call</Link>
        <p className="microcopy">Most calls end with a clear 90-day plan, even if we don't work together.</p>
      </section>
    </>
  );
};
