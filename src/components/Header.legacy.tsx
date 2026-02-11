import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) =>
    location.pathname === path || location.pathname === `${path}/` ? 'active' : '';

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDark = saved === 'dark' || (!saved && prefersDark);

    setIsDark(initialDark);
    if (initialDark) {
      document.body.classList.add('theme-dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.body.classList.remove('theme-dark');
      document.documentElement.style.colorScheme = 'light';
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.body.classList.add('theme-dark');
      document.documentElement.style.colorScheme = 'dark';
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('theme-dark');
      document.documentElement.style.colorScheme = 'light';
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className={`main-header ${scrolled ? 'navbar--scrolled' : ''}`}>
      <nav id="navbar" className={`navbar ${mobileMenuOpen ? 'active' : ''}`} aria-label="Primary">
        <Link to="/" className="logo" aria-label="Agha Sultan Home">
          <div className="logo-icon-wrapper">
            <img
              src="/img/riffat-labs-transparent.svg"
              alt="RR Labs Logo"
              height="150"
              width="150"
            />
          </div>
        </Link>

        <button
          className={`mobile-nav-toggle ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </button>

        <ul className="nav-links">
          <li><Link to="/#about" onClick={() => setMobileMenuOpen(false)}>About</Link></li>
          <li><Link to="/#skills" onClick={() => setMobileMenuOpen(false)}>Skills</Link></li>
          <li><Link to="/scale" className={isActive('/scale')} onClick={() => setMobileMenuOpen(false)}>Services</Link></li>
          <li>
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            >
              <span className="dot" aria-hidden="true"></span>
              <span className="label">{isDark ? 'Light' : 'Dark'}</span>
            </button>
          </li>
          <li>
            <Link to="/apply" className="btn shimmer" onClick={() => setMobileMenuOpen(false)}>Apply</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
