import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link to="/" className="logo" style={{ marginBottom: '16px' }}>
            <div className="logo-icon-wrapper">
              <img
                src="/img/riffat-labs-transparent.svg"
                alt="Logo"
                height="150"
                width="150"
              />
            </div>
          </Link>
          <p>
            Data-driven paid media strategies that turn ad spend into
            predictable profit.
          </p>
        </div>
        <div className="footer-col">
          <h5>Navigation</h5>
          <ul className="footer-nav">
            <li><Link to="/#about">About</Link></li>
            <li><Link to="/scale">Services</Link></li>
            <li><Link to="/apply">Apply</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Contact</h5>
          <ul className="footer-nav">
            <li>
              <a href="mailto:hello@aghasultan.com">hello@aghasultan.com</a>
            </li>
            <li>
              <a href="https://linkedin.com/in/aghasultannaseer" target="_blank" rel="noopener">LinkedIn</a>
            </li>
            <li>
              <a href="https://twitter.com/aghasultan" target="_blank" rel="noopener">Twitter</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} Agha Sultan Naseer. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '16px' }}>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};
