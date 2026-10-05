// Header.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { KEY_TAP_MS } from '../keyTap';
import ThemePicker from './ThemePicker';

export default function Header({ theme, onThemeChange }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the menu whenever the route changes - once the tapped key has had
  // time to go down, so the press is seen before the menu folds away
  useEffect(() => {
    const t = setTimeout(() => setOpen(false), KEY_TAP_MS * 0.6);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <header className="site-header">
      <nav className={`site-nav ${open ? 'is-open' : ''}`}>
        <div className="site-nav__inner">
          <Link to="/" className="site-logo-link">
            <span className="site-logo" role="img" aria-label="website logo" />
          </Link>
          {/* centered links (desktop), hidden on mobile until toggled */}
          <div id="primary-navigation" className="site-nav__links">
            <Link to="/" className="key">Home</Link>{' '}
            <Link to="/about" className="key">About</Link>{' '}
            <Link to="/portfolio" className="key">Portfolio</Link>{' '}
            <Link to="/publications" className="key">Publications</Link>{' '}
            <Link to="/contact" className="key">Contact</Link>
          </div>

          {/* color theme menu: after the links on desktop, beside the
              hamburger on mobile */}
          <ThemePicker theme={theme} onChange={onThemeChange} onOpen={() => setOpen(false)} />

          {/* hamburger at right (mobile only) */}
          <button
            className="site-nav__toggle"
            aria-controls="primary-navigation"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen(v => !v)}
          >
            <span className="hamburger" />
          </button>
        </div>
      </nav>

      <h1>ETHAN FRAKES</h1>
      <p><small>WELCOME</small></p>
    </header>
  );
}
